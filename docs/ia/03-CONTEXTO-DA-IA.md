# IA — 03 — Contexto da IA

---

## 1. Por que o Contexto é Fundamental?

LLMs como Llama 3 não têm acesso nativo aos dados do seu banco de dados. Para que a IA responda com informações reais da empresa, precisamos **injetar os dados no prompt** a cada requisição.

O contexto é montado pela Vercel Function antes de chamar a Groq.

---

## 2. Estrutura do Contexto

```
[SYSTEM PROMPT]
    │
    ├── Identidade e comportamento da IA
    ├── Informações da empresa
    ├── Data e hora atual
    ├── Resumo dos dados relevantes:
    │     ├── Agendamentos de hoje
    │     ├── Agendamentos da semana
    │     ├── Resumo financeiro recente
    │     ├── Total de clientes
    │     └── Profissionais e serviços disponíveis
    └── Instruções de formato de resposta
```

---

## 3. Exemplo de System Prompt

```js
// api/ai.js — Montagem do contexto

async function buildSystemPrompt(tenantId, supabase) {
  const today = new Date().toISOString().split('T')[0]

  // Buscar dados relevantes em paralelo
  const [
    tenant,
    todayAppointments,
    weekAppointments,
    financialSummary,
    customers,
    professionals,
    services
  ] = await Promise.all([
    supabase.from('tenants').select('name, phone').eq('id', tenantId).single(),
    supabase.from('appointments').select('*, customers(name), services(name), professionals(name)')
      .eq('tenant_id', tenantId).eq('date', today),
    supabase.from('appointments').select('id, status, price')
      .eq('tenant_id', tenantId).gte('date', getStartOfWeek()),
    supabase.from('financial_transactions').select('amount, status')
      .eq('tenant_id', tenantId).gte('created_at', getStartOfMonth()),
    supabase.from('customers').select('id, name').eq('tenant_id', tenantId).eq('active', true),
    supabase.from('professionals').select('id, name, specialty').eq('tenant_id', tenantId).eq('active', true),
    supabase.from('services').select('id, name, price, duration').eq('tenant_id', tenantId).eq('active', true)
  ])

  return `
Você é a assistente virtual da empresa "${tenant.data.name}".
Sua função é ajudar o(a) gestor(a) com informações sobre agendamentos, clientes, finanças e comunicação.

DATA E HORA ATUAL: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}

DADOS DA EMPRESA:
- Nome: ${tenant.data.name}
- Total de clientes ativos: ${customers.data?.length || 0}
- Profissionais ativos: ${professionals.data?.map(p => p.name).join(', ')}
- Serviços: ${services.data?.map(s => `${s.name} (R$${s.price}, ${s.duration}min)`).join(', ')}

AGENDA DE HOJE (${today}):
${todayAppointments.data?.length > 0
  ? todayAppointments.data.map(a =>
      `- ${a.start_time} | ${a.customers.name} | ${a.services.name} | ${a.professionals.name} | Status: ${a.status}`
    ).join('\n')
  : 'Nenhum agendamento para hoje.'}

AGENDA DA SEMANA:
- Total: ${weekAppointments.data?.length || 0} agendamentos
- Confirmados: ${weekAppointments.data?.filter(a => a.status === 'confirmado').length || 0}
- Concluídos: ${weekAppointments.data?.filter(a => a.status === 'concluido').length || 0}
- Cancelados: ${weekAppointments.data?.filter(a => a.status === 'cancelado').length || 0}

FINANCEIRO (mês atual):
- Total: R$ ${financialSummary.data?.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
- Recebido: R$ ${financialSummary.data?.filter(t => t.status === 'pago').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
- Pendente: R$ ${financialSummary.data?.filter(t => t.status === 'pendente').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}

INSTRUÇÕES:
- Responda sempre em português brasileiro
- Seja direta, útil e amigável
- Use emojis com moderação para tornar a conversa mais agradável
- Se não souber algo, diga que não tem os dados disponíveis
- Para criar agendamentos, confirme os dados antes de executar
- Não invente dados — use somente as informações fornecidas acima
  `.trim()
}
```

---

## 4. Histórico de Conversa

Para manter o contexto da conversa, enviamos as últimas N mensagens:

```js
// Buscar últimas 10 mensagens da conversa atual
const { data: history } = await supabase
  .from('ai_messages')
  .select('role, content')
  .eq('conversation_id', conversationId)
  .order('created_at', { ascending: true })
  .limit(10)

const messages = [
  { role: 'system', content: systemPrompt },
  ...history,
  { role: 'user', content: userMessage }
]
```

---

## 5. Contexto Sob Demanda (Query Intent)

Para perguntas específicas, a Vercel Function pode buscar dados mais detalhados **antes** de chamar a Groq:

```js
// Detectar intenção para carregar dados extras
function detectIntent(message) {
  const lower = message.toLowerCase()

  if (lower.includes('inativ')) return 'inactive_customers'
  if (lower.includes('aniversário') || lower.includes('aniversariante')) return 'birthdays'
  if (lower.includes('faturamento') || lower.includes('financeiro')) return 'financial_detail'
  if (lower.includes('agende') || lower.includes('marque')) return 'create_appointment'

  return 'general'
}
```

---

*Próximo: [`04-PROMPTS.md`](./04-PROMPTS.md)*

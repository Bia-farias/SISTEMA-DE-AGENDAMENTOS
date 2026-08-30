# Funcionalidades — 03 — Clientes

---

## 1. Visão Geral

O módulo de Clientes é o CRM do sistema. Permite gerenciar todos os clientes da empresa com seus dados pessoais, histórico de atendimentos e ações rápidas de comunicação.

---

## 2. Dados do Cliente

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | TEXT | ✅ | Nome completo |
| `phone` | TEXT | ✅ | WhatsApp (com DDD) |
| `email` | TEXT | ❌ | E-mail |
| `cpf` | TEXT | ❌ | CPF (único por tenant) |
| `birthdate` | DATE | ❌ | Data de nascimento |
| `notes` | TEXT | ❌ | Observações internas |

---

## 3. Lista de Clientes

```
┌──────────────────────────────────────────────────────┐
│ Clientes                          [+ Novo Cliente]   │
│ Buscar por nome ou telefone...  [🔍]                 │
├──────────────────────────────────────────────────────┤
│ 👤 João Silva                   📱 (11) 98765-4321   │
│    Último atendimento: 18/08/26  [Ver] [WhatsApp]    │
├──────────────────────────────────────────────────────┤
│ 👤 Maria Oliveira               📱 (11) 91234-5678   │
│    Último atendimento: 20/08/26  [Ver] [WhatsApp]    │
├──────────────────────────────────────────────────────┤
│ 👤 Carlos Pereira               📱 (11) 99876-5432   │
│    ⚠️ Inativo há 65 dias         [Ver] [WhatsApp]    │
└──────────────────────────────────────────────────────┘
```

---

## 4. Perfil do Cliente (Detalhe)

```
┌──────────────────────────────────────────────────────┐
│ ← Voltar                              [Editar] [...] │
│                                                      │
│ 👤 João Silva                                        │
│    📱 (11) 98765-4321                                │
│    📧 joao@email.com                                 │
│    🎂 15/03/1990 (36 anos)                          │
│    📋 Cliente fiel, prefere horário pela manhã       │
│                                                      │
│ [Agendar]  [WhatsApp]  [Histórico]                  │
│                                                      │
├──────────────────────────────────────────────────────┤
│ Histórico de Atendimentos                            │
│                                                      │
│ 18/08/26  Corte Masculino     R$ 80,00   ✅ Pago    │
│ 05/08/26  Corte + Barba       R$ 80,00   ✅ Pago    │
│ 20/07/26  Coloração           R$ 180,00  ❌ Cancel.  │
│ 01/07/26  Corte Masculino     R$ 80,00   ✅ Pago    │
└──────────────────────────────────────────────────────┘
```

---

## 5. Identificação de Clientes Especiais

### 5.1 Aniversariantes do Dia

```js
// Clientes que fazem aniversário hoje
export async function getBirthdaysToday(tenantId) {
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const { data } = await supabase
    .from('customers')
    .select('id, name, phone, birthdate')
    .eq('tenant_id', tenantId)
    .eq('active', true)
    .filter('birthdate', 'not.is', null)

  return data?.filter(c => {
    const birth = new Date(c.birthdate)
    return birth.getMonth() + 1 === month && birth.getDate() === day
  })
}
```

### 5.2 Clientes Inativos

```js
// Clientes sem agendamento há mais de 60 dias
export async function getInactiveCustomers(tenantId, daysSince = 60) {
  const cutoffDate = subDays(new Date(), daysSince).toISOString()

  const { data } = await supabase.rpc('get_inactive_customers', {
    p_tenant_id: tenantId,
    p_cutoff_date: cutoffDate
  })

  return data
}
```

---

## 6. Ações Disponíveis

| Ação | Descrição |
|------|-----------|
| **Ver perfil** | Abre detalhes e histórico |
| **Novo agendamento** | Cria agendamento com cliente pré-selecionado |
| **Enviar WhatsApp** | Gera link wa.me ou mensagem via IA |
| **Editar** | Altera dados cadastrais |
| **Excluir** | Remove cliente (somente se sem agendamentos ativos) |

---

## 7. Busca e Filtros

| Filtro | Tipo |
|--------|------|
| Busca por nome ou telefone | Input de texto (busca em tempo real) |
| Status | Ativo / Inativo |
| Aniversariantes | Toggle |
| Inativos | Toggle |

---

*Próximo: [`04-PROFISSIONAIS.md`](./04-PROFISSIONAIS.md)*

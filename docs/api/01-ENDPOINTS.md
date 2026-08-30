# API — 01 — Endpoints

---

## 1. Visão Geral das APIs

A aplicação utiliza duas formas de comunicação:

1. **Supabase PostgREST (Direto)**: Para todas as operações CRUD padrão protegidas por Row Level Security (RLS).
2. **Vercel Serverless Functions (`/api/*`)**: Para operações que exigem segredos no servidor (Groq API, Webhooks externos, etc.).

---

## 2. Tabela de Endpoints Serverless (Vercel)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/api/ai` | Chat conversacional contextualizado com a Groq | JWT Bearer Token |
| `POST` | `/api/ai/create-appointment` | Interpretador de linguagem natural para novo agendamento | JWT Bearer Token |
| `POST` | `/api/ai/generate-message` | Geração de templates dinâmicos de WhatsApp | JWT Bearer Token |
| `GET`  | `/api/health` | Verificação de status dos serviços | Pública |

---

## 3. Endpoints Supabase PostgREST (CRUD Principal)

Exemplos de rotas automáticas do Supabase consumidas via `@supabase/supabase-js`:

| Entidade | Ação | Método JS |
|----------|------|-----------|
| **Agendamentos** | Listar por dia | `supabase.from('appointments').select('*').eq('date', data)` |
| **Agendamentos** | Criar | `supabase.from('appointments').insert({...})` |
| **Clientes** | Buscar por nome | `supabase.from('customers').select('*').ilike('name', '%termo%')` |
| **Financeiro** | Resumo do mês | `supabase.from('financial_transactions').select('*').gte('created_at', inicio)` |
| **Profissionais** | Listar ativos | `supabase.from('professionals').select('*').eq('active', true)` |

---

## 4. Contrato de Requisição e Resposta — `/api/ai`

### Requisição (POST)

```json
{
  "messages": [
    { "role": "user", "content": "Quantos agendamentos temos hoje?" }
  ],
  "conversationId": "uuid-opcional"
}
```

**Headers:**
```
Authorization: Bearer <SUPABASE_JWT_TOKEN>
Content-Type: application/json
```

### Resposta de Sucesso (200 OK)

```json
{
  "response": {
    "role": "assistant",
    "content": "Você possui 12 agendamentos hoje. 9 estão confirmados e 3 aguardam confirmação."
  },
  "conversationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

*Próximo: [`02-AUTENTICACAO.md`](./02-AUTENTICACAO.md)*

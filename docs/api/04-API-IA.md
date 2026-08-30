# API — 04 — Endpoints de Inteligência Artificial

---

## 1. POST `/api/ai` — Conversação e Análise

Endpoint principal para perguntas contextuais, resumos e análises de negócio.

### Payload de Entrada

```json
{
  "messages": [
    { "role": "user", "content": "Qual serviço teve maior faturamento este mês?" }
  ],
  "conversationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Resposta

```json
{
  "response": {
    "role": "assistant",
    "content": "O serviço com maior faturamento este mês foi **Coloração** (R$ 2.700,00 em 15 atendimentos), seguido por **Corte Masculino** (R$ 2.100,00 em 42 atendimentos)."
  },
  "usage": {
    "prompt_tokens": 420,
    "completion_tokens": 64
  }
}
```

---

## 2. POST `/api/ai/create-appointment` — Agendamento via IA

Endpoint especializado em processar intenções de marcação de horário através de linguagem natural.

### Payload de Entrada

```json
{
  "prompt": "Agende um corte para o João amanhã às 14:00 com o Carlos"
}
```

### Processamento do Endpoint:
1. Extrai entidades com a Groq (`cliente`, `data`, `hora`, `servico`, `profissional`)
2. Valida existência das entidades no banco do tenant
3. Checa conflito de horário
4. Insere no Supabase

### Resposta de Sucesso

```json
{
  "success": true,
  "appointment": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "customer": "João Silva",
    "professional": "Carlos Eduardo",
    "service": "Corte Masculino",
    "date": "2026-08-31",
    "start_time": "14:00",
    "end_time": "14:30",
    "price": 50.00
  },
  "message": "Agendamento confirmado para João Silva amanhã (31/08) às 14:00 com Carlos Eduardo."
}
```

### Resposta com Ambiguidade / Falha

```json
{
  "success": false,
  "requiresAction": "CUSTOMER_NOT_FOUND",
  "message": "Não encontrei nenhum cliente cadastrado com o nome 'João'. Deseja cadastrá-lo agora?"
}
```

---

*Próximo: [`../seguranca/01-SEGURANCA.md`](../seguranca/01-SEGURANCA.md)*

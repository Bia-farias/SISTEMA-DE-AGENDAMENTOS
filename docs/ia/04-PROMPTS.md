# IA — 04 — Prompts

---

## 1. System Prompt Base

O system prompt define a personalidade e comportamento da IA. Ele é montado dinamicamente com os dados do tenant.

> Ver implementação completa em [`03-CONTEXTO-DA-IA.md`](./03-CONTEXTO-DA-IA.md)

---

## 2. Prompts de Exemplo por Cenário

### 2.1 Consulta de Agenda

**Usuário:** "Quantos agendamentos eu tenho hoje?"

**Contexto enviado:**
```
AGENDA DE HOJE (30/08/2026):
- 09:00 | João Silva | Corte Masculino | Carlos | Status: confirmado
- 10:30 | Maria Oliveira | Coloração | Ana | Status: pendente
- 14:00 | Pedro Costa | Barba | Carlos | Status: confirmado
...
```

**Resposta esperada da IA:**
```
Você tem 12 agendamentos para hoje! 📅

✅ 9 confirmados
⏳ 3 aguardando confirmação

Seu primeiro cliente é João Silva às 09:00 para Corte Masculino com Carlos.
```

---

### 2.2 Análise Financeira

**Usuário:** "Qual foi meu faturamento essa semana?"

**Contexto enviado:**
```
AGENDA DA SEMANA:
- Total: 38 agendamentos
- Concluídos: 31
- Cancelados: 3

FINANCEIRO (semana):
- Total: R$ 4.850,00
- Recebido: R$ 4.200,00
- Pendente: R$ 650,00
```

**Resposta esperada:**
```
Essa semana foi boa! 💰

Seu faturamento total foi de R$ 4.850,00 com 31 atendimentos concluídos.

📊 Resumo:
- ✅ Recebido: R$ 4.200,00
- ⏳ Pendente: R$ 650,00
- ❌ Cancelamentos: 3 (possível perda de R$ 390,00)

Ticket médio: R$ 156,45 por atendimento.
```

---

### 2.3 Criação de Agendamento por Linguagem Natural

**Usuário:** "Agende João amanhã às 15h para corte"

**Resposta da IA (antes de criar):**
```json
{
  "action": "create_appointment",
  "data": {
    "customer_name": "João",
    "date": "2026-08-31",
    "start_time": "15:00",
    "service_name": "Corte Masculino",
    "needs_confirmation": true
  }
}
```

**Mensagem ao usuário:**
```
Encontrei o seguinte para o agendamento:

👤 Cliente: João Silva
📅 Data: Amanhã, 31/08/2026
⏰ Horário: 15:00
✂️ Serviço: Corte Masculino (30min) — R$ 50,00

O profissional Carlos está disponível neste horário.

Confirmo o agendamento? ✅ Sim / ❌ Não
```

---

### 2.4 Geração de Mensagem WhatsApp

**Usuário:** "Crie uma mensagem de lembrete para João sobre o agendamento de amanhã"

**Resposta:**
```
Aqui está a mensagem:

---
Olá, João! 👋

Passando para lembrar que seu atendimento está marcado para amanhã!

📅 31/08/2026 às 15:00
✂️ Corte Masculino com Carlos
📍 NGB Barbearia

Te esperamos! Caso precise reagendar, é só nos chamar. 😊
---

[Copiar] [Enviar pelo WhatsApp]
```

---

### 2.5 Identificação de Clientes Inativos

**Usuário:** "Quais clientes não vêm há mais de 30 dias?"

**Resposta:**
```
Encontrei 8 clientes inativos há mais de 30 dias:

1. Pedro Souza — último atendimento: 25/07 (35 dias atrás)
2. Carla Mendes — último atendimento: 20/07 (40 dias atrás)
3. Rafael Lima — último atendimento: 15/07 (45 dias atrás)
...

Quer que eu gere uma mensagem de reativação para enviá-los? 📩
```

---

## 3. Prompt para Criação de Agendamento (Function Calling)

```js
// Instruct the model to return structured JSON
const systemAddition = `
Quando o usuário pedir para criar, marcar ou agendar algo, responda em JSON:
{
  "action": "create_appointment",
  "data": {
    "customer_name": "...",
    "date": "YYYY-MM-DD",
    "start_time": "HH:MM",
    "service_name": "...",
    "professional_name": "..." (opcional)
  }
}
`
```

---

*Próximo: [`05-FERRAMENTAS-DA-IA.md`](./05-FERRAMENTAS-DA-IA.md)*

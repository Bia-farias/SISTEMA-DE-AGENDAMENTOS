# WhatsApp — 04 — Webhooks (Planejamento V2)

---

## 1. Visão Geral

Na versão 2 (V2), o sistema contará com integração oficial via **WhatsApp Business API (Meta)** ou provedores homologados (Z-API, Evolution API, Baileys/WppConnect, etc.).

Para receber eventos do WhatsApp (mensagens recebidas, status de entrega, leitura), a aplicação utilizará **Webhooks**.

---

## 2. Diagrama de Fluxo do Webhook

```
┌──────────────────┐
│   Cliente no     │
│    WhatsApp      │
└────────┬─────────┘
         │ Envia "Confirmar agendamento"
         ▼
┌──────────────────┐
│  WhatsApp Cloud  │
│    API (Meta)    │
└────────┬─────────┘
         │ POST /api/webhooks/whatsapp
         ▼
┌──────────────────────────────────────────┐
│             Vercel Function              │
│       (/api/webhooks/whatsapp.js)        │
│  - Valida assinatura (X-Hub-Signature)   │
│  - Identifica tenant por número/origem   │
│  - Processa intenção (NLP / IA / Trigger)│
└────────┬─────────────────────────────────┘
         │
         ├── 1. Atualiza Status
         ▼
┌──────────────────────────────────────────┐
│                 Supabase                 │
│  - appointments (status: confirmado)     │
│  - appointment_status_history            │
└────────┬─────────────────────────────────┘
         │
         ├── 2. Notifica Operador (Realtime)
         ▼
┌──────────────────────────────────────────┐
│          Dashboard / Frontend            │
│  Notificação Toast em tempo real         │
└──────────────────────────────────────────┘
```

---

## 3. Endpoints do Webhook

### 3.1 Verificação do Webhook (GET)

A Meta exige um endpoint GET para validação do token de verificação na configuração inicial:

```javascript
// api/webhooks/whatsapp.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).json({ error: 'Token de verificação inválido' });
    }
  }
}
```

### 3.2 Recepção de Eventos (POST)

```javascript
  if (req.method === 'POST') {
    const body = req.body;

    // Verificar se é uma mensagem do WhatsApp
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          const value = change.value;
          
          if (value.messages && value.messages.length > 0) {
            const message = value.messages[0];
            const fromNumber = message.from;
            const messageText = message.text?.body;

            await handleIncomingMessage(fromNumber, messageText);
          }
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    }
    return res.status(404).end();
  }
```

---

## 4. Tratamento de Intenções Automáticas

| Mensagem do Cliente | Intenção Detectada | Ação no Sistema |
|---------------------|--------------------|-----------------|
| "SIM", "Confirmo", "1" | Confirmação | Atualiza status do agendamento para `confirmado` |
| "NÃO", "Cancelar", "2" | Cancelamento | Atualiza status para `cancelado` e notifica equipe |
| "Reagendar", "Outro horário" | Reagendamento | Dispara fluxo de opções de horários livres |
| Texto livre (ex: "Tem horário quinta?") | Dúvida / Atendimento | Encaminha para o motor de IA ou atendimento humano |

---

## 5. Segurança do Webhook

1. **Validação de Assinatura SHA-256**: Validação do header `X-Hub-Signature-256` utilizando o `APP_SECRET` da Meta.
2. **Idempotência**: Armazenar `message_id` no banco para evitar processar mensagens duplicadas em caso de retry da Meta.
3. **Resiliência Serverless**: Retornar status 200 rapidamente (< 3 segundos) para evitar timeouts da API da Meta.

---

*Próximo: [`05-INTEGRACAO-FUTURA.md`](./05-INTEGRACAO-FUTURA.md)*

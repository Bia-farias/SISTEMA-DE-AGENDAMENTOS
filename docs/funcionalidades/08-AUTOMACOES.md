# Funcionalidades — 08 — Automações

---

## 1. Visão Geral

Na V1, as automações são **preparadas no banco de dados** mas ainda não executadas automaticamente. A estrutura está pronta para ser ativada em versões futuras (V2/V3) com integração real ao WhatsApp Business API.

---

## 2. Conceito

Uma automação é composta por:

| Componente | Descrição |
|-----------|-----------|
| **Trigger** | Evento que dispara a automação |
| **Ação** | O que acontece quando o trigger ocorre |
| **Template** | Mensagem a ser enviada |
| **Ativo** | Se a automação está habilitada |

---

## 3. Triggers Disponíveis

| Trigger | Quando dispara |
|---------|---------------|
| `appointment_created` | Ao criar um novo agendamento |
| `appointment_confirmed` | Ao confirmar um agendamento |
| `appointment_cancelled` | Ao cancelar um agendamento |
| `appointment_24h_before` | 24h antes do agendamento |
| `appointment_2h_before` | 2h antes do agendamento |
| `payment_due` | Na data de vencimento de um pagamento |
| `payment_overdue` | Quando um pagamento vence sem ser pago |
| `customer_birthday` | No aniversário do cliente |
| `customer_inactive` | Quando cliente fica X dias sem agendamento |

---

## 4. Interface de Automações (V1 — Configuração)

```
┌─────────────────────────────────────────────────────────┐
│ Automações                             [+ Nova]         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ⚠️ As automações estão sendo preparadas para a V2.      │
│ Configure agora para ativar assim que o WhatsApp        │
│ estiver integrado.                                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ 🔔 Confirmação de Agendamento                          │
│    Trigger: appointment_created                         │
│    Template: "Confirmação de Agendamento"              │
│    Status: ○ Pendente ativação                         │
│                                            [Configurar] │
├─────────────────────────────────────────────────────────┤
│ ⏰ Lembrete 24h antes                                   │
│    Trigger: appointment_24h_before                     │
│    Template: "Lembrete 24h"                            │
│    Status: ○ Pendente ativação                         │
│                                            [Configurar] │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Estrutura da Tabela `automations`

```sql
INSERT INTO automations (tenant_id, name, trigger, action, template_id, active)
VALUES
  (tenant_id, 'Confirmação de agendamento', 'appointment_created',  'send_whatsapp', template_id, false),
  (tenant_id, 'Lembrete 24h',              'appointment_24h_before','send_whatsapp', template_id, false),
  (tenant_id, 'Lembrete 2h',               'appointment_2h_before', 'send_whatsapp', template_id, false),
  (tenant_id, 'Parabéns no aniversário',   'customer_birthday',     'send_whatsapp', template_id, false),
  (tenant_id, 'Reativação de cliente',     'customer_inactive',     'send_whatsapp', template_id, false);
```

---

## 6. Evolução Planejada (V2/V3)

```
V2 — Integração WhatsApp Business API
  ↓
Webhook recebe eventos
  ↓
Vercel Function processa
  ↓
Consulta automations ativos por trigger
  ↓
Envia mensagem via WhatsApp Business API

V3 — Automações com lógica condicional
  ↓
Configuração de condições: SE cliente não respondeu em X horas → enviar follow-up
```

---

*Próximo: [`09-NOTIFICACOES.md`](./09-NOTIFICACOES.md)*

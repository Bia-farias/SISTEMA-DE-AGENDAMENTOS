# WhatsApp — 03 — Templates

---

## 1. Templates Padrão (seed inicial)

Os templates abaixo são inseridos automaticamente ao criar um novo tenant:

```sql
INSERT INTO whatsapp_templates (tenant_id, name, trigger, content) VALUES

(tenant_id, 'Confirmação de Agendamento', 'appointment_created',
'Olá, {{nome}}! 😊

Seu agendamento na {{empresa}} foi confirmado!

📅 Data: {{data}}
⏰ Horário: {{horario}}
✂️ Serviço: {{servico}}
👤 Profissional: {{profissional}}

Te esperamos! Qualquer dúvida, é só chamar. 🙌'),

(tenant_id, 'Lembrete 24h', 'appointment_24h_before',
'Oi, {{nome}}! Tudo bem? 👋

Passando para lembrar que você tem um atendimento amanhã na {{empresa}}!

⏰ {{horario}} — {{servico}}

Confirma presença? Nos avise caso precise reagendar. 😊'),

(tenant_id, 'Lembrete 2h', 'appointment_2h_before',
'{{nome}}, seu atendimento na {{empresa}} é em 2 horas!

⏰ {{horario}} — {{servico}} com {{profissional}}

Te esperamos! 💇'),

(tenant_id, 'Parabéns Aniversário', 'customer_birthday',
'🎂 Feliz Aniversário, {{nome}}!

Toda a equipe da {{empresa}} deseja um dia incrível! 🎉

Que tal celebrar com um mimo especial? Entre em contato e veja nossas ofertas! ✨'),

(tenant_id, 'Reativação Cliente', 'customer_inactive',
'Olá, {{nome}}! Sentimos sua falta por aqui! 💙

Faz um tempinho que não nos vemos na {{empresa}}. Que tal agendar um horário e se cuidar?

Estamos com agenda aberta para você! Entre em contato e venha nos visitar. 😊'),

(tenant_id, 'Cancelamento', 'appointment_cancelled',
'Olá, {{nome}}!

Seu agendamento na {{empresa}} para {{data}} às {{horario}} foi cancelado.

Ficamos à disposição para reagendar quando quiser! 😊');
```

---

## 2. Variáveis Disponíveis

| Variável | Fonte de dados |
|----------|---------------|
| `{{nome}}` | `customers.name` |
| `{{empresa}}` | `tenants.name` |
| `{{servico}}` | `services.name` |
| `{{data}}` | `appointments.date` (formatado) |
| `{{horario}}` | `appointments.start_time` |
| `{{profissional}}` | `professionals.name` |
| `{{telefone}}` | `tenants.phone` |

---

## 3. Editor de Templates

O sistema deve oferecer um editor simples com:
- Preview em tempo real com dados de exemplo
- Botões de inserção de variáveis
- Contador de caracteres
- Validação de variáveis inexistentes

---

*Próximo: [`04-WEBHOOKS.md`](./04-WEBHOOKS.md)*

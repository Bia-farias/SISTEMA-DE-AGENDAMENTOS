# WhatsApp — 02 — Mensagens

---

## 1. Tipos de Mensagem na V1

| Tipo | Quando usar |
|------|------------|
| Confirmação de agendamento | Ao criar um agendamento |
| Lembrete | Antes do agendamento |
| Reagendamento | Ao alterar horário |
| Cancelamento | Ao cancelar |
| Parabéns (aniversário) | No dia do aniversário |
| Reativação | Para clientes inativos |
| Cobrança | Para pagamentos pendentes |
| Personalizada | Criada pelo usuário ou pela IA |

---

## 2. Fluxo de Envio

```js
// src/utils/whatsapp.js

export function sendWhatsAppMessage(phone, message) {
  const cleanPhone = phone.replace(/\D/g, '')
  const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`
  const encodedMessage = encodeURIComponent(message)
  const link = `https://wa.me/${fullPhone}?text=${encodedMessage}`

  window.open(link, '_blank')
}
```

---

## 3. Personalização com Variáveis

```js
// src/utils/templates.js

export function applyTemplate(template, variables) {
  let result = template

  Object.entries(variables).forEach(([key, value]) => {
    result = result.replaceAll(`{{${key}}}`, value || '')
  })

  return result
}

// Uso
const message = applyTemplate(template.content, {
  nome: customer.name,
  servico: service.name,
  data: formatDate(appointment.date),
  horario: appointment.start_time,
  profissional: professional.name,
  empresa: tenant.name
})
```

---

*Próximo: [`03-TEMPLATES.md`](./03-TEMPLATES.md)*

# Funcionalidades — 07 — WhatsApp

---

## 1. Visão Geral — V1

Na primeira versão, a integração com WhatsApp é feita via **link direto** (`wa.me`), sem depender da infraestrutura oficial da Meta. Isso permite testar e utilizar o fluxo completo sem burocracia.

---

## 2. Fluxo de Envio de Mensagem (V1)

```
Usuário seleciona um cliente
         │
         ▼
Seleciona ação: "Enviar WhatsApp"
         │
         ▼
Seleciona um template ou pede para a IA gerar
         │
         ▼
IA personaliza a mensagem com dados do cliente:
  Nome, serviço, data, horário
         │
         ▼
Exibe prévia da mensagem ao usuário
         │
         ▼
Usuário clica "Enviar pelo WhatsApp"
         │
         ▼
Sistema abre:
  wa.me/55{telefone}?text={mensagem_codificada}
         │
         ▼
WhatsApp Web/App abre com mensagem pré-preenchida
         │
         ▼
Usuário envia manualmente
```

---

## 3. Templates de Mensagem

Templates são textos pré-configurados com variáveis dinâmicas:

### Variáveis disponíveis:

| Variável | Substituído por |
|----------|----------------|
| `{{nome}}` | Nome do cliente |
| `{{servico}}` | Nome do serviço |
| `{{data}}` | Data do agendamento |
| `{{horario}}` | Horário do agendamento |
| `{{profissional}}` | Nome do profissional |
| `{{empresa}}` | Nome da empresa |

### Exemplos de Templates:

**Confirmação de Agendamento:**
```
Olá, {{nome}}! 😊

Seu agendamento na {{empresa}} foi confirmado!

📅 Data: {{data}}
⏰ Horário: {{horario}}
✂️ Serviço: {{servico}}
👤 Profissional: {{profissional}}

Te esperamos! Qualquer dúvida, é só chamar. 🙌
```

**Lembrete 24h antes:**
```
Oi, {{nome}}! Tudo bem? 👋

Passando para lembrar que você tem um atendimento amanhã na {{empresa}}!

⏰ {{horario}} — {{servico}}

Confirma presença? Responda SIM ou NÃO para cancelar.
```

**Parabéns (Aniversário):**
```
🎂 Feliz Aniversário, {{nome}}!

Toda a equipe da {{empresa}} deseja um ótimo dia cheio de alegria! 🎉

Que tal comemorar com um agendamento especial? Estamos aqui para você! 💇
```

---

## 4. Tela de WhatsApp no Sistema

```
┌─────────────────────────────────────────────────────┐
│ WhatsApp                                            │
├─────────────────────────────────────────────────────┤
│ [+ Novo Template]                                   │
│                                                     │
│ Templates Ativos:                                   │
│                                                     │
│ 📩 Confirmação de Agendamento     [Editar] [Usar]   │
│ 📩 Lembrete 24h                   [Editar] [Usar]   │
│ 📩 Lembrete 2h                    [Editar] [Usar]   │
│ 📩 Parabéns (Aniversário)        [Editar] [Usar]   │
│ 📩 Cliente Inativo               [Editar] [Usar]   │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Gerar mensagem personalizada com IA:               │
│ ┌─────────────────────────────────────────────────┐│
│ │ Ex: "Crie mensagem de lembrete para a Maria..." ││
│ └─────────────────────────────────────────────────┘│
│                                        [Gerar ✨]  │
└─────────────────────────────────────────────────────┘
```

---

## 5. Geração de Link wa.me

```js
// src/utils/whatsapp.js

export function generateWhatsAppLink(phone, message) {
  // Remove todos os não-dígitos do telefone
  const cleanPhone = phone.replace(/\D/g, '')

  // Adiciona DDI do Brasil se não tiver
  const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`

  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(message)

  return `https://wa.me/${fullPhone}?text=${encodedMessage}`
}
```

---

*Próximo: [`08-AUTOMACOES.md`](./08-AUTOMACOES.md)*

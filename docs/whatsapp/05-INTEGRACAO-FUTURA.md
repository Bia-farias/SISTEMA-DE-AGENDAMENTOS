# WhatsApp — 05 — Integração Futura e Evolução

---

## 1. Roteiro de Evolução do Módulo WhatsApp

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     FASE 1      │       │     FASE 2      │       │     FASE 3      │
│  (MVP / Atual)  │──────▶│  (V2 - Oficial) │──────▶│ (V4 - Agente IA)│
│                 │       │                 │       │                 │
│  - Links wa.me  │       │  - Cloud API    │       │  - Bot Completo │
│  - Templates    │       │  - Webhooks     │       │  - Auto-Agenda  │
│  - IA gera texto│       │  - Confirmação  │       │  - Atendimento  │
│  - Envio manual │       │    automática   │       │    24/7         │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 2. Opções de Provedores para a V2

| Provedor | Tipo | Vantagens | Desvantagens |
|----------|------|-----------|--------------|
| **Meta Cloud API** | Oficial | 100% estável, sem risco de ban | Exige aprovação de templates, tarifado por conversa |
| **Z-API / Evolution** | Não Oficial / Gateway | Rápido setup, aceita qualquer texto | Risco de desconexão da sessão / ban de chip |
| **Twilio / Gupshup** | Oficial (BSP) | Excelente documentação e suporte | Custo mais elevado |

> **Recomendação**: Iniciar V2 com **Meta Cloud API** oficial ou **Evolution API** auto-hospedada para ambientes de testes.

---

## 3. Bot de Atendimento 24/7 com IA (V4)

No estágio avançado (V4), o cliente final conversará diretamente com a IA da empresa pelo WhatsApp para:

1. Consultar tabela de preços e serviços
2. Verificar horários disponíveis de profissionais
3. Realizar agendamento completo sem intervenção humana
4. Receber confirmação instantânea e link do calendário

### Fluxo Conversacional de Exemplo:

```
[Cliente]: Olá, gostaria de cortar o cabelo amanhã à tarde com o Carlos.
[IA da Empresa]: Olá! Tudo bem? Temos disponibilidade com o Carlos amanhã (31/08) nos horários:
  1️⃣ 14:30
  2️⃣ 16:00
  3️⃣ 17:30
Qual desses fica melhor para você?

[Cliente]: O das 16:00 fica ótimo!
[IA da Empresa]: Perfeito! Agendamento confirmado para amanhã às 16:00 (Corte Masculino com Carlos). Te esperamos na NGB Barbearia! 💇‍♂️
```

---

## 4. Requisitos Técnicos para a V2/V4

- [ ] Registro de App no Meta Developers Portal
- [ ] Configuração do Número WhatsApp Business
- [ ] Criação de tabela `whatsapp_messages_log` no Supabase para histórico completo
- [ ] Fila de mensagens (ex: Upstash QStash / Redis) para envio assíncrono em lote
- [ ] Triggers de webhook no Supabase Database Webhooks

---

*Próximo: [`../frontend/01-PADROES-REACT.md`](../frontend/01-PADROES-REACT.md)*

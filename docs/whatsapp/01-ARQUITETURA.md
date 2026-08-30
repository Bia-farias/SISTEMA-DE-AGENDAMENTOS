# WhatsApp — 01 — Arquitetura

---

## 1. Estratégia por Versão

```
V1 — MVP (atual)
  ┌─────────────────────────────────────────┐
  │  Sistema gera mensagem                  │
  │       ↓                                 │
  │  Botão "Enviar pelo WhatsApp"           │
  │       ↓                                 │
  │  wa.me/{telefone}?text={mensagem}       │
  │       ↓                                 │
  │  WhatsApp Web/App abre no dispositivo   │
  └─────────────────────────────────────────┘

V2 — Integração Oficial
  ┌─────────────────────────────────────────┐
  │  WhatsApp Business API (Meta)           │
  │       ↓                                 │
  │  Webhook → Vercel Function              │
  │       ↓                                 │
  │  Supabase (processa e salva)            │
  │       ↓                                 │
  │  Envia resposta automática              │
  └─────────────────────────────────────────┘
```

---

## 2. V1 — Link Direto

### Vantagens:
- Zero burocracia com a Meta
- Funciona imediatamente
- Sem custos adicionais
- Testável por qualquer pessoa

### Limitações:
- Requer abertura manual do WhatsApp
- Sem rastreamento de leitura/resposta
- Sem automatização

---

## 3. V2 — WhatsApp Business API

### Pré-requisitos (futuro):
- Conta Meta Business verificada
- WhatsApp Business API aprovada
- Número de telefone dedicado
- Templates de mensagem aprovados pela Meta
- Servidor webhook público (Vercel Functions)

---

## 4. Comparativo Técnico

| Aspecto | V1 (wa.me) | V2 (API Oficial) |
|---------|-----------|-----------------|
| Implementação | ✅ Simples | ⚠️ Complexa |
| Automação | ❌ Manual | ✅ Automático |
| Recebimento | ❌ Não | ✅ Sim |
| Custo | ✅ Gratuito | 💰 Por mensagem |
| Aprovação Meta | ✅ Não necessário | ⚠️ Necessário |

---

*Próximo: [`02-MENSAGENS.md`](./02-MENSAGENS.md)*

# Funcionalidades — 05 — Serviços

---

## 1. Visão Geral

O catálogo de serviços define o que a empresa oferece. A duração do serviço é usada para calcular o horário de término dos agendamentos automaticamente.

---

## 2. Dados de um Serviço

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | TEXT | ✅ | Nome do serviço |
| `description` | TEXT | ❌ | Descrição detalhada |
| `price` | NUMERIC | ✅ | Preço em R$ |
| `duration` | INTEGER | ✅ | Duração em minutos |
| `color` | TEXT | ❌ | Cor de identificação na agenda |
| `active` | BOOLEAN | ✅ | Se está disponível para agendamento |

---

## 3. Exemplos de Serviços

```
┌──────────────────────────────────────────────────────┐
│ Catálogo de Serviços                [+ Novo Serviço] │
├──────────────────┬─────────┬──────────┬──────────────┤
│ Serviço          │ Preço   │ Duração  │ Status       │
├──────────────────┼─────────┼──────────┼──────────────┤
│ 🟢 Corte Masc.  │ R$ 50   │ 30 min   │ ✅ Ativo     │
│ 🟢 Corte + Barba│ R$ 80   │ 60 min   │ ✅ Ativo     │
│ 🟡 Barba        │ R$ 40   │ 30 min   │ ✅ Ativo     │
│ 🔵 Coloração    │ R$ 150  │ 120 min  │ ✅ Ativo     │
│ 🟣 Progressiva  │ R$ 180  │ 120 min  │ ✅ Ativo     │
│ 🔴 Hidratação   │ R$ 80   │ 45 min   │ ❌ Inativo   │
└──────────────────┴─────────┴──────────┴──────────────┘
```

---

## 4. Como a Duração Afeta a Agenda

```
Serviço: Corte + Barba = 60 minutos

Agendamento: João → 14:00

Cálculo automático:
  end_time = start_time + duration
  end_time = 14:00 + 60 min = 15:00

Resultado: 14:00 → 15:00 bloqueado na agenda para o profissional
```

---

## 5. Formulário de Serviço

```
┌────────────────────────────────────────────────────────┐
│ Novo Serviço                                           │
├────────────────────────────────────────────────────────┤
│ Nome: _________________________________                │
│ Descrição: ____________________________                │
│                                                        │
│ Preço (R$): _______   Duração (min): _______          │
│                                                        │
│ Cor na agenda: [🟢] [🟡] [🔵] [🟣] [🔴] [⚫]         │
│                                                        │
│ Status: ● Ativo ○ Inativo                             │
├────────────────────────────────────────────────────────┤
│                    [Cancelar] [Salvar]                 │
└────────────────────────────────────────────────────────┘
```

---

## 6. Regras de Negócio

- A duração mínima de um serviço é de 15 minutos
- Não é possível excluir um serviço com agendamentos associados (passados ou futuros)
- Serviços inativos não aparecem na criação de agendamentos
- O preço pode ser ajustado manualmente no momento do agendamento

---

*Próximo: [`06-FINANCEIRO.md`](./06-FINANCEIRO.md)*

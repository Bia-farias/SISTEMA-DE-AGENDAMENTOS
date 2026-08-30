# Funcionalidades — 01 — Dashboard

---

## 1. Visão Geral

O Dashboard é a primeira tela que o usuário vê após o login. Seu objetivo é fornecer uma **visão executiva rápida** do negócio: agendamentos do dia, faturamento, clientes recentes e alertas.

---

## 2. Layout

```
┌─────────────────────────────────────────────────────────┐
│  Bom dia, Ana! ☀️  Terça-feira, 30 de agosto de 2026    │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ Agend.   │ Confirm. │ Faturam. │ Pendente │ A Receber   │
│ Hoje: 18 │  14      │R$1.280   │ R$ 350   │   R$ 830    │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│                                                          │
│  📅 Agenda de Hoje                 👥 Clientes Recentes  │
│  ┌────────────────────────────┐    ┌──────────────────┐  │
│  │ 09:00 - João - Corte       │    │ João Silva       │  │
│  │ 10:30 - Maria - Progressiva│    │ 2 atend. este mês│  │
│  │ 11:00 - Pedro - Barba      │    ├──────────────────┤  │
│  │ 14:00 - Ana - Coloração    │    │ Maria Oliveira   │  │
│  └────────────────────────────┘    │ 5 atend. este mês│  │
│                                    └──────────────────┘  │
│  📊 Faturamento da Semana                                │
│  [Gráfico de barras por dia]                             │
│                                                          │
│  ⭐ Serviços Mais Realizados                             │
│  1. Corte Masculino — 42 vezes                           │
│  2. Corte + Barba — 28 vezes                             │
│  3. Coloração — 15 vezes                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 3. KPI Cards

| Card | Dado | Query |
|------|------|-------|
| **Agendamentos Hoje** | Total de agendamentos com `date = hoje` | `appointments WHERE date = today` |
| **Confirmados** | Agendamentos com `status = confirmado` hoje | Idem com filtro |
| **Faturamento** | Soma dos `amount` de transações pagas hoje | `financial_transactions WHERE paid_at::date = today AND status = pago` |
| **Pendente** | Soma dos `amount` com `status = pendente` | Idem com filtro |
| **A Receber** | Pendente + Vencido | Idem combinado |

---

## 4. Agenda do Dia

Lista os agendamentos do dia em ordem crescente de horário:

```js
// src/services/appointments.service.js
export async function getAppointmentsToday(tenantId) {
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('appointments')
    .select(`
      id, start_time, end_time, status,
      customers(name, phone),
      professionals(name),
      services(name, color)
    `)
    .eq('tenant_id', tenantId)
    .eq('date', today)
    .order('start_time')

  return data
}
```

---

## 5. Gráfico de Faturamento

Exibe faturamento dos últimos 7 dias em gráfico de barras:

```js
export async function getWeeklyRevenue(tenantId) {
  const lastWeek = subDays(new Date(), 7).toISOString()

  const { data } = await supabase
    .from('financial_transactions')
    .select('amount, paid_at, status')
    .eq('tenant_id', tenantId)
    .eq('status', 'pago')
    .gte('paid_at', lastWeek)

  // Agrupar por dia no frontend
  return groupByDay(data)
}
```

---

## 6. Componentes React

| Componente | Descrição |
|-----------|-----------|
| `KPICard` | Card com número, label e ícone |
| `AgendaDoDia` | Lista de agendamentos do dia com status colorido |
| `GraficoFaturamento` | Gráfico de barras (pode usar Recharts ou Chart.js) |
| `ServicosPopulares` | Ranking dos serviços mais realizados |
| `ClientesRecentes` | Lista de clientes com mais atendimentos no mês |

---

## 7. Atualização dos Dados

- Os dados do dashboard são carregados ao entrar na página
- Pode ser configurado Supabase Realtime para atualização automática
- Um botão de "Atualizar" manual também deve estar disponível

---

*Próximo: [`02-AGENDA.md`](./02-AGENDA.md)*

# Funcionalidades — 02 — Agenda

---

## 1. Visão Geral

A Agenda é o módulo central do sistema. Permite visualizar, criar, editar e gerenciar todos os agendamentos da empresa por profissional e período.

---

## 2. Visualizações Disponíveis

### 2.1 Visão Semanal (Principal)

```
        SEG 25    TER 26    QUA 27    QUI 28    SEX 29

08:00
09:00   [João   ] [ ---  ] [Maria  ] [ ---  ]
09:30   [Corte  ] [      ] [Progr. ] [      ]
10:00             [Pedro ] [      ] [Ana   ]
10:30             [Barba ] [      ] [Corte ]
11:00   [Carlos ] [      ] [João  ] [      ]
12:00
13:00
14:00   [Maria  ] [Ana   ] [ ---  ] [Carlos]
15:00   [Color. ] [Barba ] [      ] [Corte ]
16:00
17:00
18:00
```

### 2.2 Visão Diária

Exibe a agenda de um único dia com maior detalhamento para cada profissional em colunas paralelas.

### 2.3 Lista

Exibe os agendamentos do período selecionado como uma lista com filtros.

---

## 3. Filtros da Agenda

| Filtro | Tipo | Descrição |
|--------|------|-----------|
| Data / Semana | DatePicker | Navegar entre períodos |
| Profissional | Select | Filtrar por profissional |
| Serviço | Select | Filtrar por tipo de serviço |
| Status | Multi-Select | Filtrar por status |

---

## 4. Status dos Agendamentos

| Status | Cor sugerida | Descrição |
|--------|-------------|-----------|
| `pendente` | 🟡 Amarelo | Aguarda confirmação |
| `confirmado` | 🟢 Verde | Confirmado pelo cliente |
| `concluido` | 🔵 Azul | Atendimento realizado |
| `cancelado` | 🔴 Vermelho | Cancelado |

---

## 5. Fluxo de Criação de Agendamento

```
Usuário clica em horário vazio na agenda
         │
         ▼
Modal: Novo Agendamento abre
         │
         ▼
Usuário preenche:
  - Seleciona cliente (busca por nome)
  - Seleciona profissional
  - Seleciona serviço
  - Data e horário de início
  - Horário de fim calculado automaticamente
  - Observações (opcional)
         │
         ▼
Frontend valida:
  ✅ Cliente existe?
  ✅ Profissional disponível naquele dia?
  ✅ Horário dentro do turno de trabalho?
  ✅ Sem conflito com outro agendamento?
         │
    ┌────┴────┐
    │         │
  OK         Erro
    │           │
    ▼           ▼
 Cria        Exibe
 agendamento mensagem
    │         de erro
    ▼
 Cria transação financeira (status: pendente)
    │
    ▼
 Registra no appointment_status_history
    │
    ▼
 Toast de sucesso + atualiza agenda
```

---

## 6. Ações Disponíveis em um Agendamento

| Ação | Roles | Descrição |
|------|-------|-----------|
| Visualizar detalhes | Todos | Ver dados completos |
| Confirmar | Admin, Owner | Muda status para `confirmado` |
| Concluir | Admin, Owner, Employee | Muda para `concluido`, abre tela de pagamento |
| Cancelar | Admin, Owner | Muda para `cancelado` |
| Editar | Admin, Owner | Alterar dados do agendamento |
| Enviar WhatsApp | Todos | Gera mensagem e link wa.me |

---

## 7. Validação de Disponibilidade

```js
// src/services/appointments.service.js

export async function checkAvailability({ professionalId, date, startTime, endTime, excludeId = null }) {
  let query = supabase
    .from('appointments')
    .select('id, start_time, end_time')
    .eq('professional_id', professionalId)
    .eq('date', date)
    .neq('status', 'cancelado')
    .or(`start_time.lt.${endTime},end_time.gt.${startTime}`)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data } = await query
  return data.length === 0 // true = disponível
}
```

---

## 8. Componentes React

| Componente | Descrição |
|-----------|-----------|
| `CalendarioSemanal` | Grid de horários com agendamentos sobrepostos |
| `AgendamentoCard` | Card colorido com info do agendamento |
| `NovoAgendamentoModal` | Modal de criação/edição |
| `FiltrosAgenda` | Barra de filtros superior |
| `DetalhesAgendamentoModal` | Modal com detalhes e ações |

---

*Próximo: [`03-CLIENTES.md`](./03-CLIENTES.md)*

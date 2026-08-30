# Funcionalidades — 04 — Profissionais

---

## 1. Visão Geral

O módulo de Profissionais gerencia todos os prestadores de serviço da empresa. Os dados cadastrados aqui alimentam diretamente a disponibilidade da agenda.

---

## 2. Dados do Profissional

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | TEXT | ✅ | Nome completo |
| `specialty` | TEXT | ❌ | Especialidade principal |
| `photo_url` | TEXT | ❌ | Foto de perfil (upload para Supabase Storage) |
| `bio` | TEXT | ❌ | Descrição / bio |
| `active` | BOOLEAN | ✅ | Se está ativo no sistema |

---

## 3. Horários de Trabalho

Cada profissional possui horários configurados por dia da semana:

```
┌─────────────────────────────────────────────────────┐
│ Horários de Trabalho — João (Barbeiro)               │
├─────────────┬──────────────┬──────────┬─────────────┤
│ Dia         │ Entrada      │ Saída    │ Intervalo   │
├─────────────┼──────────────┼──────────┼─────────────┤
│ ✅ Segunda  │ 09:00        │ 18:00    │ 12:00-13:00 │
│ ✅ Terça    │ 09:00        │ 18:00    │ 12:00-13:00 │
│ ✅ Quarta   │ 09:00        │ 18:00    │ 12:00-13:00 │
│ ✅ Quinta   │ 09:00        │ 18:00    │ 12:00-13:00 │
│ ✅ Sexta    │ 09:00        │ 19:00    │ 12:00-13:00 │
│ ✅ Sábado   │ 09:00        │ 15:00    │ —           │
│ ❌ Domingo  │ —            │ —        │ —           │
└─────────────┴──────────────┴──────────┴─────────────┘
```

---

## 4. Serviços Associados

Cada profissional pode realizar múltiplos serviços:

```
João (Barbeiro)
├── ✅ Corte Masculino (R$ 50 / 30min)
├── ✅ Corte + Barba (R$ 80 / 60min)
├── ✅ Barba (R$ 40 / 30min)
└── ❌ Coloração (não realiza)
```

---

## 5. Como os Horários Alimentam a Agenda

```
Usuário tenta agendar João em uma Segunda às 09:00
         │
         ▼
Sistema consulta working_hours:
  WHERE professional_id = João
    AND day_of_week = 1 (Segunda)
    AND active = true
         │
         ▼
Encontrou: 09:00 - 18:00 (com intervalo 12:00-13:00)
         │
         ▼
Verifica se 09:00 está dentro do turno:
  ✅ 09:00 >= 09:00 AND 09:30 <= 18:00
         │
         ▼
Verifica se não é horário de intervalo:
  ✅ 09:00 não está entre 12:00 e 13:00
         │
         ▼
Verifica conflito com outros agendamentos:
  ✅ Nenhum agendamento neste horário
         │
         ▼
✅ Disponível — Pode agendar
```

---

## 6. Formulário de Cadastro

```
┌─────────────────────────────────────────────────────┐
│ Novo Profissional                                   │
├─────────────────────────────────────────────────────┤
│ [📷 Foto]  Nome: ____________________               │
│             Especialidade: ___________               │
│             Status: ● Ativo ○ Inativo               │
│             Bio: ________________________            │
├─────────────────────────────────────────────────────┤
│ Serviços que realiza:                               │
│ ☑ Corte Masculino  ☑ Barba  ☐ Coloração            │
├─────────────────────────────────────────────────────┤
│ Horários de Trabalho: [configurar por dia]          │
├─────────────────────────────────────────────────────┤
│           [Cancelar]  [Salvar]                      │
└─────────────────────────────────────────────────────┘
```

---

## 7. Regras de Negócio

- Profissional inativo não aparece na seleção ao criar agendamentos
- Não é possível excluir profissional com agendamentos futuros
- Ao desativar, agendamentos futuros devem ser tratados (cancelar ou reagendar)

---

*Próximo: [`05-SERVICOS.md`](./05-SERVICOS.md)*

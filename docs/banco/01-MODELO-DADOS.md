# Banco de Dados — 01 — Modelo de Dados

---

## 1. Visão Geral

O banco de dados do NGB Agenda IA é baseado em **PostgreSQL**, hospedado no Supabase. O modelo adota a estratégia **multi-tenant com `tenant_id`** em todas as tabelas operacionais, combinado com **Row Level Security (RLS)** para isolamento seguro entre empresas.

---

## 2. Grupos de Tabelas

### Grupo 1 — Estrutura Multi-Tenant

| Tabela | Descrição |
|--------|-----------|
| `tenants` | Empresas cadastradas no sistema |
| `profiles` | Perfis de usuários vinculados a tenants e roles |

### Grupo 2 — Operacional

| Tabela | Descrição |
|--------|-----------|
| `customers` | Clientes de cada empresa |
| `professionals` | Profissionais de cada empresa |
| `services` | Serviços oferecidos |
| `professional_services` | Associação entre profissionais e serviços |
| `working_hours` | Horários de trabalho por profissional e dia |

### Grupo 3 — Agendamentos

| Tabela | Descrição |
|--------|-----------|
| `appointments` | Agendamentos |
| `appointment_status_history` | Histórico de mudanças de status |

### Grupo 4 — Financeiro

| Tabela | Descrição |
|--------|-----------|
| `financial_transactions` | Transações financeiras |

### Grupo 5 — Comunicação e Automação

| Tabela | Descrição |
|--------|-----------|
| `whatsapp_templates` | Templates de mensagem WhatsApp |
| `automations` | Automações configuradas pelo tenant |
| `notifications` | Notificações internas do sistema |

### Grupo 6 — Inteligência Artificial

| Tabela | Descrição |
|--------|-----------|
| `ai_conversations` | Conversas com a IA |
| `ai_messages` | Mensagens dentro de cada conversa |

---

## 3. Diagrama ER Simplificado

```
tenants
  │
  ├── profiles (usuários do tenant)
  │
  ├── customers (clientes)
  │
  ├── professionals (profissionais)
  │     └── professional_services (serviços que atende)
  │     └── working_hours (horários)
  │
  ├── services (catálogo de serviços)
  │
  ├── appointments (agendamentos)
  │     ├── → customers
  │     ├── → professionals
  │     ├── → services
  │     └── appointment_status_history
  │
  ├── financial_transactions
  │     ├── → appointments
  │     └── → customers
  │
  ├── whatsapp_templates
  ├── automations
  ├── notifications
  │
  └── ai_conversations
        └── ai_messages
```

---

## 4. Princípios do Modelo

1. **`tenant_id` obrigatório** em todas as tabelas operacionais
2. **UUIDs** como chaves primárias (mais seguro que integers sequenciais)
3. **`created_at` e `updated_at`** em todas as tabelas
4. **Soft delete** preferível a hard delete (campo `active` ou `deleted_at`)
5. **Enums via CHECK** ou tabelas de lookup para status
6. **Índices** em `tenant_id` + campos usados em filtros frequentes

---

*Próximo: [`02-TABELAS.md`](./02-TABELAS.md)*

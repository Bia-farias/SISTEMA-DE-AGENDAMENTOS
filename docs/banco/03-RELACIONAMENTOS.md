# Banco de Dados — 03 — Relacionamentos

---

## 1. Diagrama de Relacionamentos Completo

```
auth.users (Supabase Auth)
     │
     │ 1:1
     ▼
profiles ──────────────────── tenants
  (user_id, tenant_id, role)      │
                                  │ 1:N para todas as tabelas abaixo
                ┌─────────────────┼─────────────────────┐
                │                 │                     │
                ▼                 ▼                     ▼
          customers          professionals           services
                │                 │                     │
                │              1:N│                     │
                │         working_hours                 │
                │                 │                     │
                │              N:M│                     │
                │     professional_services             │
                │                                       │
                └──────────────┐ ┌──────────────────────┘
                               │ │
                               ▼ ▼
                           appointments
                               │ │
                         1:N   │ │  1:1 (geralmente)
                               │ │
               ┌───────────────┘ └──────────────────────┐
               │                                         │
               ▼                                         ▼
 appointment_status_history              financial_transactions
```

---

## 2. Relacionamentos Detalhados

### tenants → profiles

```
tenants 1 ──────── N profiles
```
- Uma empresa tem vários usuários
- Um usuário pertence a uma empresa

### tenants → customers

```
tenants 1 ──────── N customers
```
- Uma empresa tem vários clientes
- Um cliente pertence a uma empresa

### tenants → professionals

```
tenants 1 ──────── N professionals
```
- Uma empresa tem vários profissionais
- Um profissional pertence a uma empresa

### professionals → services (N:M via professional_services)

```
professionals N ──── professional_services ──── N services
```
- Um profissional pode realizar vários serviços
- Um serviço pode ser realizado por vários profissionais

### professionals → working_hours

```
professionals 1 ──────── N working_hours
```
- Um profissional tem múltiplos registros de horário (um por dia da semana)

### appointments → customers, professionals, services

```
customers 1 ──────── N appointments
professionals 1 ──── N appointments
services 1 ──────── N appointments
```
- Um agendamento tem exatamente um cliente, um profissional e um serviço

### appointments → appointment_status_history

```
appointments 1 ──────── N appointment_status_history
```
- Um agendamento pode ter múltiplas mudanças de status ao longo do tempo

### appointments → financial_transactions

```
appointments 1 ──────── 1 financial_transactions
```
- Um agendamento gera uma transação financeira

### ai_conversations → ai_messages

```
ai_conversations 1 ──────── N ai_messages
```
- Uma conversa com a IA tem múltiplas mensagens

---

## 3. Queries com Joins (Exemplos)

### Listar agendamentos com dados completos

```sql
SELECT
  a.id,
  a.date,
  a.start_time,
  a.end_time,
  a.status,
  a.price,
  c.name AS customer_name,
  c.phone AS customer_phone,
  p.name AS professional_name,
  s.name AS service_name,
  s.duration AS service_duration
FROM appointments a
  INNER JOIN customers c ON a.customer_id = c.id
  INNER JOIN professionals p ON a.professional_id = p.id
  INNER JOIN services s ON a.service_id = s.id
WHERE
  a.tenant_id = $1
  AND a.date = $2
ORDER BY a.start_time;
```

### Histórico de atendimentos de um cliente

```sql
SELECT
  a.date,
  a.start_time,
  a.status,
  s.name AS service_name,
  s.price,
  p.name AS professional_name
FROM appointments a
  INNER JOIN services s ON a.service_id = s.id
  INNER JOIN professionals p ON a.professional_id = p.id
WHERE
  a.customer_id = $1
  AND a.tenant_id = $2
ORDER BY a.date DESC, a.start_time DESC;
```

### Faturamento por período

```sql
SELECT
  SUM(amount) AS total_faturado,
  SUM(CASE WHEN status = 'pago' THEN amount ELSE 0 END) AS total_pago,
  SUM(CASE WHEN status = 'pendente' THEN amount ELSE 0 END) AS total_pendente,
  COUNT(*) AS total_transacoes
FROM financial_transactions
WHERE
  tenant_id = $1
  AND created_at BETWEEN $2 AND $3;
```

### Profissionais com seus serviços

```sql
SELECT
  p.id,
  p.name,
  p.specialty,
  ARRAY_AGG(s.name) AS services
FROM professionals p
  LEFT JOIN professional_services ps ON p.id = ps.professional_id
  LEFT JOIN services s ON ps.service_id = s.id
WHERE p.tenant_id = $1
  AND p.active = true
GROUP BY p.id, p.name, p.specialty;
```

---

## 4. Índices Recomendados

```sql
-- Multi-tenant: performance em todas as tabelas
CREATE INDEX idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX idx_customers_tenant ON customers(tenant_id);
CREATE INDEX idx_professionals_tenant ON professionals(tenant_id);
CREATE INDEX idx_services_tenant ON services(tenant_id);
CREATE INDEX idx_appointments_tenant ON appointments(tenant_id);
CREATE INDEX idx_financial_tenant ON financial_transactions(tenant_id);
CREATE INDEX idx_ai_conversations_tenant ON ai_conversations(tenant_id);

-- Agenda: filtros frequentes
CREATE INDEX idx_appointments_date ON appointments(tenant_id, date);
CREATE INDEX idx_appointments_professional ON appointments(professional_id, date);
CREATE INDEX idx_appointments_status ON appointments(tenant_id, status);

-- Financeiro: consultas por período
CREATE INDEX idx_financial_created ON financial_transactions(tenant_id, created_at);
CREATE INDEX idx_financial_status ON financial_transactions(tenant_id, status);

-- Perfil: lookup por user_id
CREATE INDEX idx_profiles_user ON profiles(user_id);
```

---

*Próximo: [`04-RLS-E-SEGURANCA.md`](./04-RLS-E-SEGURANCA.md)*

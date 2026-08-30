# Banco de Dados — 05 — Migrations

---

## 1. Estratégia de Migrations

O NGB Agenda IA utiliza o **Supabase Dashboard** (SQL Editor) para aplicar migrations manualmente durante o desenvolvimento, e pode evoluir para migrations automatizadas com **Supabase CLI** em produção.

---

## 2. Ordem de Execução

> ⚠️ **Respeite a ordem de criação** para evitar erros de chave estrangeira.

```
1. tenants
2. profiles
3. customers
4. professionals
5. services
6. professional_services
7. working_hours
8. appointments
9. appointment_status_history
10. financial_transactions
11. whatsapp_templates
12. automations
13. ai_conversations
14. ai_messages
15. notifications
16. [funções RLS]
17. [políticas RLS]
18. [índices]
19. [triggers]
```

---

## 3. Migration Completa — V1

```sql
-- =============================================
-- NGB AGENDA IA — Migration V1
-- =============================================

-- 1. tenants
CREATE TABLE IF NOT EXISTS tenants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  cnpj_cpf    TEXT,
  phone       TEXT,
  address     TEXT,
  city        TEXT,
  state       TEXT,
  logo_url    TEXT,
  plan        TEXT NOT NULL DEFAULT 'free',
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. profiles
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'employee'
                CHECK (role IN ('owner', 'admin', 'employee')),
  avatar_url  TEXT,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. customers
CREATE TABLE IF NOT EXISTS customers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  cpf         TEXT,
  birthdate   DATE,
  notes       TEXT,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, cpf)
);

-- 4. professionals
CREATE TABLE IF NOT EXISTS professionals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  specialty   TEXT,
  photo_url   TEXT,
  bio         TEXT,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. services
CREATE TABLE IF NOT EXISTS services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC(10, 2) NOT NULL,
  duration    INTEGER NOT NULL,
  color       TEXT,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. professional_services
CREATE TABLE IF NOT EXISTS professional_services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  service_id      UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(professional_id, service_id)
);

-- 7. working_hours
CREATE TABLE IF NOT EXISTS working_hours (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  day_of_week     INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  break_start     TIME,
  break_end       TIME,
  active          BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. appointments
CREATE TABLE IF NOT EXISTS appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  customer_id     UUID NOT NULL REFERENCES customers(id),
  professional_id UUID NOT NULL REFERENCES professionals(id),
  service_id      UUID NOT NULL REFERENCES services(id),
  date            DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pendente'
                    CHECK (status IN ('pendente', 'confirmado', 'concluido', 'cancelado')),
  price           NUMERIC(10, 2) NOT NULL,
  notes           TEXT,
  created_by      UUID REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. appointment_status_history
CREATE TABLE IF NOT EXISTS appointment_status_history (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  old_status     TEXT,
  new_status     TEXT NOT NULL,
  changed_by     UUID REFERENCES auth.users(id),
  note           TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. financial_transactions
CREATE TABLE IF NOT EXISTS financial_transactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  appointment_id  UUID REFERENCES appointments(id),
  customer_id     UUID REFERENCES customers(id),
  professional_id UUID REFERENCES professionals(id),
  service_id      UUID REFERENCES services(id),
  amount          NUMERIC(10, 2) NOT NULL,
  payment_method  TEXT CHECK (payment_method IN ('dinheiro', 'cartao_credito', 'cartao_debito', 'pix', 'outro')),
  status          TEXT NOT NULL DEFAULT 'pendente'
                    CHECK (status IN ('pendente', 'pago', 'cancelado', 'vencido')),
  due_date        DATE,
  paid_at         TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. whatsapp_templates
CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  trigger     TEXT,
  content     TEXT NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. automations
CREATE TABLE IF NOT EXISTS automations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  trigger     TEXT NOT NULL,
  action      TEXT NOT NULL DEFAULT 'send_whatsapp',
  template_id UUID REFERENCES whatsapp_templates(id),
  config      JSONB,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. ai_conversations
CREATE TABLE IF NOT EXISTS ai_conversations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id),
  title       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. ai_messages
CREATE TABLE IF NOT EXISTS ai_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. notifications
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id),
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  message     TEXT,
  read        BOOLEAN NOT NULL DEFAULT false,
  data        JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- FUNÇÕES AUXILIARES
-- =============================================

CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =============================================
-- HABILITAR RLS
-- =============================================

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- POLÍTICAS RLS
-- =============================================

CREATE POLICY "tenant_isolation" ON profiles FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON customers FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON professionals FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON services FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON professional_services FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON working_hours FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON appointments FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON appointment_status_history FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON financial_transactions FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON whatsapp_templates FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON automations FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON ai_conversations FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON ai_messages FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id());
CREATE POLICY "tenant_isolation" ON notifications FOR ALL TO authenticated USING (tenant_id = get_user_tenant_id() AND (user_id IS NULL OR user_id = auth.uid()));

-- =============================================
-- ÍNDICES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_tenant ON customers(tenant_id);
CREATE INDEX IF NOT EXISTS idx_professionals_tenant ON professionals(tenant_id);
CREATE INDEX IF NOT EXISTS idx_services_tenant ON services(tenant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant ON appointments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(tenant_id, date);
CREATE INDEX IF NOT EXISTS idx_appointments_professional ON appointments(professional_id, date);
CREATE INDEX IF NOT EXISTS idx_financial_tenant ON financial_transactions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_financial_created ON financial_transactions(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_tenant ON ai_conversations(tenant_id);
```

---

*Documentação do banco concluída. Próximo: [`../autenticacao/01-AUTH.md`](../autenticacao/01-AUTH.md)*

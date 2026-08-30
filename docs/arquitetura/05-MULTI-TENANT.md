# Arquitetura — 05 — Multi-Tenant

---

## 1. O que é Multi-Tenancy?

Multi-tenancy é a capacidade de um único sistema servir a múltiplos clientes (tenants) de forma **completamente isolada**, como se cada um tivesse seu próprio sistema.

No contexto do NGB Agenda IA:

- Cada **empresa** (salão, barbearia, clínica) é um **tenant**
- Cada tenant tem seus próprios clientes, profissionais, serviços, agendamentos e finanças
- Nenhum tenant pode acessar ou visualizar dados de outro

---

## 2. Modelo de Isolamento

O NGB Agenda IA utiliza a estratégia **"Shared Database, Shared Schema"** com isolamento via `tenant_id`:

```
┌─────────────────────────────────────────────────┐
│                   PostgreSQL                     │
│                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │  Tenant A  │  │  Tenant B  │  │  Tenant C  │ │
│  │ tenant_id=1│  │ tenant_id=2│  │ tenant_id=3│ │
│  └────────────┘  └────────────┘  └────────────┘ │
│                                                  │
│  Mesmas tabelas, isoladas por RLS               │
└─────────────────────────────────────────────────┘
```

---

## 3. Hierarquia de Usuários

```
Super Admin (sistema)
    │
    ├── Empresa A (Tenant 1)
    │     ├── owner@empresaa.com  [role: owner]
    │     ├── admin@empresaa.com  [role: admin]
    │     └── func@empresaa.com   [role: employee]
    │
    ├── Empresa B (Tenant 2)
    │     ├── dono@empresab.com   [role: owner]
    │     └── recepcao@empresab.com [role: employee]
    │
    └── Empresa C (Tenant 3)
          └── autonomo@empresac.com [role: owner]
```

---

## 4. Tabela Principal: `tenants`

```sql
CREATE TABLE tenants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,     -- identificador único da empresa
  cnpj_cpf    TEXT,
  phone       TEXT,
  address     TEXT,
  logo_url    TEXT,
  plan        TEXT DEFAULT 'free',      -- free, basic, pro (para monetização futura)
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. `tenant_id` em Todas as Tabelas Operacionais

Todo registro que pertence a uma empresa deve ter `tenant_id`:

```sql
-- Exemplo: tabela appointments
CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  customer_id     UUID NOT NULL REFERENCES customers(id),
  professional_id UUID NOT NULL REFERENCES professionals(id),
  service_id      UUID NOT NULL REFERENCES services(id),
  date            DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  status          TEXT DEFAULT 'pendente',
  price           NUMERIC(10, 2),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Tabelas que obrigatoriamente possuem `tenant_id`:**
- `profiles`
- `customers`
- `professionals`
- `services`
- `professional_services`
- `working_hours`
- `appointments`
- `appointment_status_history`
- `financial_transactions`
- `whatsapp_templates`
- `automations`
- `ai_conversations`
- `ai_messages`
- `notifications`

---

## 6. Como o Tenant é Identificado no Frontend

```js
// src/stores/authStore.js

// Ao fazer login, buscamos o perfil do usuário
const { data: profile } = await supabase
  .from('profiles')
  .select('*, tenants(*)')
  .eq('user_id', user.id)
  .single()

// O tenant fica disponível globalmente
set({
  user,
  profile,
  tenant: profile.tenants,
  tenantId: profile.tenant_id
})
```

```js
// src/services/appointments.service.js

// Todas as queries incluem o tenant_id automaticamente via RLS
// mas também passamos explicitamente para clareza
export const getAppointments = async (tenantId, date) => {
  const { data } = await supabase
    .from('appointments')
    .select(`
      *,
      customers(name, phone),
      professionals(name),
      services(name, duration)
    `)
    .eq('tenant_id', tenantId)  // explícito + RLS como dupla proteção
    .eq('date', date)
    .order('start_time')

  return data
}
```

---

## 7. Isolamento via RLS

O RLS (Row Level Security) garante que **mesmo que o frontend não filtre por `tenant_id`**, o banco de dados nunca retornará dados de outro tenant.

```sql
-- Política RLS padrão para appointments
CREATE POLICY "tenant_isolation" ON appointments
  FOR ALL
  TO authenticated
  USING (
    tenant_id = (
      SELECT tenant_id
      FROM profiles
      WHERE user_id = auth.uid()
    )
  );
```

> Para detalhes completos sobre RLS, consulte: [`banco/04-RLS-E-SEGURANCA.md`](../banco/04-RLS-E-SEGURANCA.md)

---

## 8. Fluxo de Onboarding de Nova Empresa

```
1. Usuário preenche formulário de cadastro
         │
         ▼
2. Supabase Auth cria usuário (auth.users)
         │
         ▼
3. Frontend cria registro na tabela tenants
   INSERT INTO tenants (name, slug, phone...)
         │
         ▼
4. Frontend cria registro na tabela profiles
   INSERT INTO profiles (user_id, tenant_id, role: 'owner')
         │
         ▼
5. Usuário é redirecionado para o Dashboard
```

---

## 9. Escalabilidade do Modelo

Este modelo suporta crescimento para:

| Cenário | Capacidade |
|---------|-----------|
| Número de tenants | Ilimitado (dependente do plano Supabase) |
| Dados por tenant | Sem limite prático no PostgreSQL |
| Usuários por tenant | Limitado por plano (definir por produto) |
| Performance | Índices em `tenant_id` garantem queries rápidas |

```sql
-- Índices essenciais para performance multi-tenant
CREATE INDEX idx_appointments_tenant ON appointments(tenant_id);
CREATE INDEX idx_customers_tenant ON customers(tenant_id);
CREATE INDEX idx_financial_tenant ON financial_transactions(tenant_id);
CREATE INDEX idx_profiles_tenant ON profiles(tenant_id);
```

---

*Próximo: [`../banco/01-MODELO-DADOS.md`](../banco/01-MODELO-DADOS.md)*

# Banco de Dados — 04 — RLS e Segurança

---

## 1. O que é RLS?

**Row Level Security (RLS)** é um recurso do PostgreSQL que permite definir políticas de acesso a nível de linha. Com RLS ativo, cada query é automaticamente filtrada de acordo com as políticas definidas, **independentemente de como a query foi construída no frontend**.

Isso significa que mesmo que um usuário mal-intencionado tente manipular a requisição para acessar dados de outra empresa, o banco simplesmente não retornará nada — porque o RLS age na camada do banco, não no aplicativo.

---

## 2. Habilitando RLS em Todas as Tabelas

```sql
ALTER TABLE tenants                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals             ENABLE ROW LEVEL SECURITY;
ALTER TABLE services                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_services     ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_hours             ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments              ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates        ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations               ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages               ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications             ENABLE ROW LEVEL SECURITY;
```

---

## 3. Função Auxiliar: `get_user_tenant_id()`

Para evitar repetição nas políticas, criamos uma função que retorna o `tenant_id` do usuário logado:

```sql
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id
  FROM profiles
  WHERE user_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

---

## 4. Políticas RLS por Tabela

### `profiles`

```sql
-- Usuário pode ver apenas seu próprio perfil e outros do mesmo tenant
CREATE POLICY "profiles_tenant_isolation" ON profiles
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());

-- Usuário pode atualizar apenas seu próprio perfil
CREATE POLICY "profiles_own_update" ON profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());
```

### `customers`

```sql
CREATE POLICY "customers_tenant_isolation" ON customers
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `professionals`

```sql
CREATE POLICY "professionals_tenant_isolation" ON professionals
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `services`

```sql
CREATE POLICY "services_tenant_isolation" ON services
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `professional_services`

```sql
CREATE POLICY "professional_services_tenant_isolation" ON professional_services
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `working_hours`

```sql
CREATE POLICY "working_hours_tenant_isolation" ON working_hours
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `appointments`

```sql
CREATE POLICY "appointments_tenant_isolation" ON appointments
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `appointment_status_history`

```sql
CREATE POLICY "status_history_tenant_isolation" ON appointment_status_history
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `financial_transactions`

```sql
CREATE POLICY "financial_tenant_isolation" ON financial_transactions
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `whatsapp_templates`

```sql
CREATE POLICY "whatsapp_templates_tenant_isolation" ON whatsapp_templates
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `automations`

```sql
CREATE POLICY "automations_tenant_isolation" ON automations
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `ai_conversations`

```sql
CREATE POLICY "ai_conversations_tenant_isolation" ON ai_conversations
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `ai_messages`

```sql
CREATE POLICY "ai_messages_tenant_isolation" ON ai_messages
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id());
```

### `notifications`

```sql
-- Usuário vê apenas suas próprias notificações
CREATE POLICY "notifications_own" ON notifications
  FOR ALL TO authenticated
  USING (
    tenant_id = get_user_tenant_id()
    AND (user_id IS NULL OR user_id = auth.uid())
  );
```

---

## 5. Políticas por Role (Permissões Adicionais)

Para aplicar restrições baseadas no role do usuário, adicionamos uma função auxiliar:

```sql
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role
  FROM profiles
  WHERE user_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

### Exemplo: apenas `owner` e `admin` podem excluir profissionais

```sql
CREATE POLICY "professionals_delete_admin_only" ON professionals
  FOR DELETE TO authenticated
  USING (
    tenant_id = get_user_tenant_id()
    AND get_user_role() IN ('owner', 'admin')
  );
```

---

## 6. Testando as Políticas

```sql
-- Simula um usuário específico
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "uuid-do-usuario"}';

-- Testa se retorna apenas dados do tenant correto
SELECT COUNT(*) FROM appointments;
```

---

## 7. Service Role Key — Quando Usar

A `SUPABASE_SERVICE_ROLE_KEY` **bypassa o RLS completamente**. Ela deve ser usada **apenas**:

- Em Vercel Functions (servidor), nunca no frontend
- Para operações administrativas (migrations, seeds)
- Quando a Vercel Function precisa acessar dados de múltiplos tenants (ex: cron job)

> ⚠️ **Nunca commitar a service role key no repositório.**

---

*Próximo: [`05-MIGRATIONS.md`](./05-MIGRATIONS.md)*

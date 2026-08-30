# Segurança — 02 — Estratégia de Row Level Security (RLS)

---

## 1. Como o RLS Blinda a Aplicação

O **Row Level Security (RLS)** do PostgreSQL opera no nível do motor do banco de dados. Mesmo que um atacante obtenha a chave pública (`anon key`) e faça requisições manuais via `curl` ou Postman, o banco aplicará a cláusula de segurança antes de retornar qualquer linha.

---

## 2. A Função Central de Segurança

```sql
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id
  FROM profiles
  WHERE user_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

> **`SECURITY DEFINER`**: A função executa com privilégios do criador para consultar com segurança a tabela `profiles` e retornar o `tenant_id` correto associado ao usuário que fez login (`auth.uid()`).

---

## 3. Matriz de Políticas RLS por Operação

| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|--------|--------|--------|--------|
| `tenants` | Apenas o próprio tenant | Autenticado no cadastro | Apenas `owner` | Bloqueado via API |
| `profiles` | Mesmo tenant | Criação no signup | Próprio perfil ou `admin` | Apenas `owner` |
| `customers`| Mesmo tenant | Mesmo tenant | Mesmo tenant | `admin` / `owner` |
| `appointments`| Mesmo tenant | Mesmo tenant | Mesmo tenant | `admin` / `owner` |
| `financial_transactions`| `admin` / `owner` | Mesmo tenant | `admin` / `owner` | Apenas `owner` |

---

## 4. Teste de Penetração e Validação do RLS

Para auditar o banco e garantir que não há brechas de isolamento:

```sql
-- 1. Testar consulta fingindo ser o Usuário 1 (Empresa A)
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "usuario-empresa-a-uuid"}';

SELECT COUNT(*) FROM customers; 
-- Deve retornar APENAS os clientes da Empresa A

-- 2. Tentar inserir um agendamento forçando o tenant_id da Empresa B
INSERT INTO appointments (tenant_id, customer_id, professional_id, service_id, date, start_time, end_time, price)
VALUES ('tenant-b-uuid', '...', '...', '...', '2026-08-31', '10:00', '10:30', 50.00);
-- O PostgreSQL deve rejeitar com erro de violação de política RLS
```

---

*Próximo: [`03-DADOS-SENSIVEIS.md`](./03-DADOS-SENSIVEIS.md)*

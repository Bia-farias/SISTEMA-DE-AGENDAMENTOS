# Autenticação — 02 — Perfis e Permissões

---

## 1. Sistema de Roles

O sistema possui três níveis de acesso dentro de cada tenant:

| Role | Nome | Descrição |
|------|------|-----------|
| `owner` | Proprietário | Acesso total, dono da empresa |
| `admin` | Administrador | Gerencia operações, sem acesso a configurações críticas |
| `employee` | Funcionário | Acesso básico à agenda e atendimentos |

---

## 2. Matriz de Permissões

| Funcionalidade | `owner` | `admin` | `employee` |
|---------------|---------|---------|------------|
| **Dashboard** — visualizar | ✅ | ✅ | ✅ |
| **Agenda** — visualizar | ✅ | ✅ | ✅ |
| **Agenda** — criar agendamento | ✅ | ✅ | ✅ |
| **Agenda** — cancelar agendamento | ✅ | ✅ | ✅ |
| **Clientes** — visualizar | ✅ | ✅ | ✅ |
| **Clientes** — criar/editar | ✅ | ✅ | ✅ |
| **Clientes** — excluir | ✅ | ✅ | ❌ |
| **Profissionais** — visualizar | ✅ | ✅ | ✅ |
| **Profissionais** — criar/editar | ✅ | ✅ | ❌ |
| **Profissionais** — excluir | ✅ | ❌ | ❌ |
| **Serviços** — visualizar | ✅ | ✅ | ✅ |
| **Serviços** — criar/editar | ✅ | ✅ | ❌ |
| **Serviços** — excluir | ✅ | ❌ | ❌ |
| **Financeiro** — visualizar | ✅ | ✅ | ❌ |
| **Financeiro** — editar status | ✅ | ✅ | ❌ |
| **WhatsApp** — visualizar/usar | ✅ | ✅ | ✅ |
| **IA** — usar assistente | ✅ | ✅ | ✅ |
| **Configurações da empresa** | ✅ | ❌ | ❌ |
| **Gerenciar usuários** | ✅ | ❌ | ❌ |
| **Excluir empresa** | ✅ | ❌ | ❌ |

---

## 3. Implementação de Permissões no Frontend

```js
// src/constants/roles.js
export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  EMPLOYEE: 'employee'
}

export const ROLE_HIERARCHY = {
  owner: 3,
  admin: 2,
  employee: 1
}

// Verifica se o usuário tem permissão mínima
export function hasMinimumRole(userRole, requiredRole) {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Verifica permissões específicas
export const PERMISSIONS = {
  DELETE_CLIENT: ['owner', 'admin'],
  MANAGE_PROFESSIONALS: ['owner', 'admin'],
  VIEW_FINANCIAL: ['owner', 'admin'],
  MANAGE_COMPANY: ['owner'],
  MANAGE_USERS: ['owner']
}

export function canDo(userRole, action) {
  return PERMISSIONS[action]?.includes(userRole) ?? false
}
```

```jsx
// src/hooks/usePermissions.js
import { useAuthStore } from '../stores/authStore'
import { canDo, hasMinimumRole } from '../constants/roles'

export function usePermissions() {
  const { profile } = useAuthStore()
  const role = profile?.role

  return {
    role,
    can: (action) => canDo(role, action),
    isOwner: role === 'owner',
    isAdmin: role === 'admin' || role === 'owner',
    isEmployee: true // todos são employees
  }
}
```

```jsx
// Uso em componentes
function ClienteCard({ cliente }) {
  const { can } = usePermissions()

  return (
    <div>
      <h3>{cliente.name}</h3>
      {can('DELETE_CLIENT') && (
        <button onClick={() => handleDelete(cliente.id)}>
          Excluir
        </button>
      )}
    </div>
  )
}
```

---

## 4. Trigger Automático — Perfil ao Cadastro

Para garantir que todo novo usuário tenha um perfil, configuramos um trigger no Supabase:

```sql
-- Função chamada ao criar novo usuário
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- O perfil é criado pelo frontend após o cadastro da empresa
  -- Este trigger pode ser usado para logs ou inicializações futuras
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

> **Nota**: No NGB Agenda IA, o perfil é criado manualmente pelo frontend durante o onboarding (após criar a empresa), para garantir o vínculo correto com o `tenant_id`.

---

*Próximo: [`03-FLUXOS-AUTH.md`](./03-FLUXOS-AUTH.md)*

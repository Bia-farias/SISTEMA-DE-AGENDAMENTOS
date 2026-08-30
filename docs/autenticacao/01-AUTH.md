# Autenticação — 01 — Visão Geral

---

## 1. Provider de Autenticação

O NGB Agenda IA utiliza **Supabase Auth** como provider de autenticação. Ele oferece:

- Autenticação com e-mail e senha
- Tokens JWT seguros
- Sessões persistentes
- Recuperação de senha por e-mail
- Integração nativa com RLS do PostgreSQL

---

## 2. Fluxo de Autenticação Geral

```
┌──────────────────────────────────────────────────┐
│                   SUPABASE AUTH                  │
│                                                  │
│  auth.users                                      │
│  ├── id (UUID)                                   │
│  ├── email                                       │
│  ├── encrypted_password                          │
│  ├── email_confirmed_at                          │
│  └── last_sign_in_at                             │
│                                                  │
│  ↕ (1:1 via user_id)                            │
│                                                  │
│  profiles (tabela pública)                       │
│  ├── id                                          │
│  ├── user_id → auth.users.id                    │
│  ├── tenant_id → tenants.id                     │
│  ├── name                                        │
│  └── role (owner | admin | employee)            │
└──────────────────────────────────────────────────┘
```

---

## 3. Configuração do Supabase Auth

No **Supabase Dashboard → Authentication → Settings**:

| Configuração | Valor |
|-------------|-------|
| Email confirmations | Desativado (desenvolvimento) / Ativado (produção) |
| Minimum password length | 8 caracteres |
| JWT expiry | 3600 segundos (1 hora) |
| Refresh token rotation | Ativado |
| Redirect URLs | `http://localhost:5173`, `https://seu-dominio.vercel.app` |

---

## 4. Client Supabase no Frontend

```js
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
```

---

## 5. Proteção de Rotas

```jsx
// src/components/layout/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuthStore()

  if (loading) return <Spinner />

  if (!user) return <Navigate to="/login" replace />

  if (requiredRole && !hasPermission(profile.role, requiredRole)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
```

---

## 6. Escutando Mudanças de Sessão

```js
// src/stores/authStore.js
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session) {
    await loadUserProfile(session.user)
  }

  if (event === 'SIGNED_OUT') {
    set({ user: null, profile: null, tenant: null })
    navigate('/login')
  }

  if (event === 'TOKEN_REFRESHED') {
    // Sessão renovada automaticamente — nenhuma ação necessária
  }
})
```

---

*Próximo: [`02-PERFIS-E-PERMISSOES.md`](./02-PERFIS-E-PERMISSOES.md)*

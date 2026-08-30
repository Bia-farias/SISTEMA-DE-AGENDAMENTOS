# Autenticação — 03 — Fluxos de Autenticação

---

## 1. Fluxo de Cadastro (Novo Owner)

```
Usuário acessa /register
         │
         ▼
Preenche: nome, e-mail, senha, nome da empresa
         │
         ▼
Frontend chama: supabase.auth.signUp({ email, password })
         │
         ▼
Supabase cria: auth.users
         │
         ▼
Frontend cria: tenants ({ name, slug })
         │
         ▼
Frontend cria: profiles ({ user_id, tenant_id, name, role: 'owner' })
         │
         ▼
Redireciona para: /dashboard
```

### Código

```js
// src/services/auth.service.js

export async function signUp({ name, email, password, companyName }) {
  // 1. Criar usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  })

  if (authError) throw authError

  const userId = authData.user.id

  // 2. Criar empresa (tenant)
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .insert({
      name: companyName,
      slug: generateSlug(companyName)
    })
    .select()
    .single()

  if (tenantError) throw tenantError

  // 3. Criar perfil vinculado ao tenant
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      tenant_id: tenant.id,
      name,
      role: 'owner'
    })

  if (profileError) throw profileError

  return { user: authData.user, tenant }
}
```

---

## 2. Fluxo de Login

```
Usuário acessa /login
         │
         ▼
Preenche: e-mail e senha
         │
         ▼
Frontend chama: supabase.auth.signInWithPassword({ email, password })
         │
         ▼
Supabase valida e retorna: { user, session }
         │
         ▼
Frontend busca perfil:
  SELECT * FROM profiles WHERE user_id = user.id
         │
         ▼
Frontend busca tenant:
  SELECT * FROM tenants WHERE id = profile.tenant_id
         │
         ▼
Salva no authStore: { user, profile, tenant }
         │
         ▼
Redireciona para: /dashboard
```

### Código

```js
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  // Buscar perfil e tenant
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, tenants(*)')
    .eq('user_id', data.user.id)
    .single()

  return { user: data.user, profile, tenant: profile.tenants }
}
```

---

## 3. Fluxo de Recuperação de Senha

```
Usuário acessa /forgot-password
         │
         ▼
Preenche: e-mail
         │
         ▼
Frontend chama:
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://app.com/reset-password'
  })
         │
         ▼
Supabase envia e-mail com link
         │
         ▼
Usuário clica no link → /reset-password?token=xxx
         │
         ▼
Usuário define nova senha:
  supabase.auth.updateUser({ password: novaSenha })
         │
         ▼
Redireciona para: /login
```

---

## 4. Fluxo de Logout

```
Usuário clica em "Sair"
         │
         ▼
supabase.auth.signOut()
         │
         ▼
onAuthStateChange dispara 'SIGNED_OUT'
         │
         ▼
authStore limpa: user, profile, tenant
         │
         ▼
Redireciona para: /login
```

---

## 5. Persistência de Sessão

O Supabase JS Client persiste automaticamente a sessão no `localStorage`. Ao recarregar a página:

```js
// src/stores/authStore.js

// Ao inicializar o app, verificar sessão existente
const { data: { session } } = await supabase.auth.getSession()

if (session) {
  await loadUserProfile(session.user)
} else {
  set({ loading: false })
}
```

---

## 6. Criação de Usuários pelo Owner

O `owner` pode convidar outros usuários para seu tenant:

```js
// O owner cria um usuário pelo Supabase Admin (via Vercel Function)
// ou usa Magic Link para auto-cadastro com tenant vinculado

export async function inviteEmployee({ email, name, role, tenantId }) {
  // Via Vercel Function com service_role_key
  const response = await fetch('/api/invite-user', {
    method: 'POST',
    body: JSON.stringify({ email, name, role, tenantId }),
    headers: { Authorization: `Bearer ${session.access_token}` }
  })

  return response.json()
}
```

---

*Próximo: [`../funcionalidades/01-DASHBOARD.md`](../funcionalidades/01-DASHBOARD.md)*

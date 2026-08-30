# API — 02 — Autenticação de Requisições

---

## 1. Fluxo de Validação de Token JWT

Todas as requisições enviadas para as Serverless Functions (`/api/*`) devem ser autenticadas via header HTTP padrão:

```http
Authorization: Bearer <access_token>
```

---

## 2. Middleware de Autenticação Serverless

Para não duplicar código entre diferentes funções da Vercel, utilizamos um helper compartilhado:

```javascript
// api/_middleware/auth.js
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function authenticateRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('AUTH_HEADER_MISSING');
  }

  const token = authHeader.split(' ')[1];

  // Valida token com o Supabase Auth
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !user) {
    throw new Error('TOKEN_INVALID');
  }

  // Busca dados do Perfil e Tenant
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('id, tenant_id, role, name')
    .eq('user_id', user.id)
    .single();

  if (profileError || !profile?.tenant_id) {
    throw new Error('TENANT_NOT_FOUND');
  }

  return { user, profile, tenantId: profile.tenant_id, role: profile.role };
}
```

---

## 3. Uso do Middleware nas Funções

```javascript
// api/ai.js
import { authenticateRequest } from './_middleware/auth';

export default async function handler(req, res) {
  try {
    const { user, tenantId, role } = await authenticateRequest(req);
    // Operação segura com tenantId isolado
    return res.status(200).json({ ok: true, tenantId });
  } catch (error) {
    if (error.message === 'AUTH_HEADER_MISSING' || error.message === 'TOKEN_INVALID') {
      return res.status(401).json({ error: 'Não autorizado. Faça login novamente.' });
    }
    if (error.message === 'TENANT_NOT_FOUND') {
      return res.status(403).json({ error: 'Acesso negado: empresa não identificada.' });
    }
    return res.status(500).json({ error: 'Erro interno ao validar sessão.' });
  }
}
```

---

*Próximo: [`03-ERROS.md`](./03-ERROS.md)*

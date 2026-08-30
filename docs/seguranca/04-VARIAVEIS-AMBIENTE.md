# Segurança — 04 — Variáveis de Ambiente e Segredos

---

## 1. Separação de Contextos (Cliente vs Servidor)

| Variável | Escopo | Visibilidade | Onde Configurar |
|----------|--------|--------------|-----------------|
| `VITE_SUPABASE_URL` | Frontend | Pública (Bundle) | `.env.local` / Vercel (Client) |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Pública (Bundle com RLS) | `.env.local` / Vercel (Client) |
| `GROQ_API_KEY` | Servidor | **Privada / Secreta** | Vercel Project Settings (Server Only) |
| `SUPABASE_SERVICE_ROLE_KEY`| Servidor | **Privada / Secreta** | Vercel Project Settings (Server Only) |
| `SUPABASE_URL` | Servidor | Privada | Vercel Project Settings (Server Only) |

---

## 2. Regra de Ouro do Vite

> ⚠️ Qualquer variável iniciada com `VITE_` é injetada no código JavaScript que roda no navegador do usuário.
> **NUNCA crie variáveis como `VITE_GROQ_API_KEY` ou `VITE_SERVICE_ROLE_KEY`!**

---

## 3. Arquivo de Exemplo: `.env.example`

```env
# =======================================================
# FRONTEND (Exposto no navegador - Vite)
# =======================================================
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui

# =======================================================
# SERVIDOR / VERCEL FUNCTIONS (Nunca exposto no browser)
# =======================================================
GROQ_API_KEY=gsk_sua_chave_groq_aqui
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
```

---

*Próximo: [`../deploy/01-AMBIENTE-LOCAL.md`](../deploy/01-AMBIENTE-LOCAL.md)*

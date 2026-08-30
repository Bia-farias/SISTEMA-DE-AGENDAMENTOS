# Deploy — 03 — Deploy Contínuo com Vercel

---

## 1. Conexão do Repositório GitHub

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**.
3. Localize e selecione o repositório `ngb-agenda-ia`.
4. Em **Framework Preset**, a Vercel detectará automaticamente **Vite**.

---

## 2. Configuração de Variáveis de Ambiente na Vercel

Na seção **Environment Variables** durante a importação (ou em *Project Settings* → *Environment Variables*), adicione:

| Chave | Valor | Tipo / Escopo |
|-------|-------|---------------|
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` | Production, Preview, Dev |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Production, Preview, Dev |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | Production, Preview, Dev |
| `SUPABASE_SERVICE_ROLE_KEY`| `eyJhbGciOi...` | Production, Preview, Dev |
| `GROQ_API_KEY` | `gsk_...` | Production, Preview, Dev |

---

## 3. Configuração de Roteamento SPA (`vercel.json`)

Para que o React Router DOM funcione perfeitamente com URLs amigáveis sem gerar erro 404 no reload, crie um arquivo `vercel.json` na raiz do projeto:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 4. Pipeline de CI/CD Automático

- **Branch `main`**: Todo push ou merge na branch `main` dispara automaticamente um deploy para o ambiente de **Produção**.
- **Pull Requests**: Geram links de **Preview Deployment** para validação antes do merge.

---

*Próximo: [`04-PRODUCAO.md`](./04-PRODUCAO.md)*

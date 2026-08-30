# Arquitetura — 02 — Stack Tecnológica

---

## 1. Visão Geral da Stack

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  React.js + Vite │ Tailwind CSS │ Lucide React          │
│  Zustand / Context API │ React Router │ Vite PWA        │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│                  SERVERLESS / API                        │
│              Vercel Functions (Node.js)                  │
│           Intermediação segura com Groq API              │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐  ┌─────────────────┐  ┌──────────────┐
│  SUPABASE     │  │   GROQ API      │  │   VERCEL     │
│  Auth         │  │   LLM (IA)      │  │   Deploy     │
│  PostgreSQL   │  │   Inference     │  │   CDN        │
│  Storage      │  │   Streaming     │  │   CI/CD      │
│  RLS          │  └─────────────────┘  └──────────────┘
└───────────────┘
```

---

## 2. Tecnologias por Camada

### 2.1 Frontend

| Tecnologia | Versão | Finalidade |
|-----------|--------|-----------|
| **React.js** | ^18 | Biblioteca de UI baseada em componentes |
| **Vite** | ^5 | Build tool e servidor de desenvolvimento |
| **JavaScript (ESM)** | ES2022+ | Linguagem principal |
| **Tailwind CSS** | ^3 | Utility-first CSS para estilização |
| **Lucide React** | latest | Biblioteca de ícones SVG |
| **React Router DOM** | ^6 | Roteamento client-side |
| **Zustand** | ^4 | Gerenciamento de estado global simples |
| **Vite PWA Plugin** | latest | Transformar a app em Progressive Web App |

### 2.2 Backend / BaaS

| Tecnologia | Finalidade |
|-----------|-----------|
| **Supabase** | Backend-as-a-Service completo |
| **PostgreSQL** | Banco de dados relacional |
| **Supabase Auth** | Autenticação JWT com e-mail/senha |
| **Row Level Security** | Isolamento de dados por tenant |
| **Supabase Storage** | Armazenamento de imagens (logos, fotos) |
| **Supabase Realtime** | Atualizações em tempo real (opcional) |

### 2.3 IA

| Tecnologia | Finalidade |
|-----------|-----------|
| **Groq API** | Inferência ultrarrápida de LLMs |
| **Llama 3.3 70B** | Modelo principal para respostas da IA |
| **Mixtral 8x7B** | Alternativa para tarefas específicas |

### 2.4 Serverless

| Tecnologia | Finalidade |
|-----------|-----------|
| **Vercel Functions** | API routes serverless (Node.js) |
| **Groq Node SDK** | Client oficial para Groq API |
| **@supabase/supabase-js** | Client Supabase para validação server-side |

### 2.5 Deploy e DevOps

| Tecnologia | Finalidade |
|-----------|-----------|
| **Vercel** | Hosting, CDN e CI/CD automático |
| **GitHub** | Repositório de código e controle de versão |
| **Variáveis de Ambiente** | Configuração segura de chaves e URLs |

---

## 3. Dependências do Projeto

### `package.json` — Dependências principais

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "@supabase/supabase-js": "^2.45.0",
    "zustand": "^4.5.4",
    "lucide-react": "^0.441.0",
    "groq-sdk": "^0.7.0",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.1",
    "vite-plugin-pwa": "^0.20.5",
    "tailwindcss": "^3.4.10",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45"
  }
}
```

---

## 4. Variáveis de Ambiente

### `.env.local` (Frontend — Vite)

```env
# Supabase (SEGURO expor no frontend via VITE_)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Vercel Dashboard (Servidor — NUNCA no frontend)

```env
# Groq — SOMENTE no servidor
GROQ_API_KEY=gsk_...

# Supabase service key — SOMENTE no servidor (para bypass de RLS quando necessário)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
```

> ⚠️ **Atenção**: Variáveis prefixadas com `VITE_` são **expostas no bundle do frontend**. Nunca use `VITE_GROQ_API_KEY`.

---

## 5. Justificativas das Escolhas Tecnológicas

| Tecnologia | Justificativa |
|-----------|--------------|
| **Vite** | Muito mais rápido que CRA, suporte nativo a ESM, excelente DX |
| **Tailwind CSS** | Velocidade de desenvolvimento, consistência visual, responsividade fácil |
| **Supabase** | Elimina backend próprio, Auth + DB + Storage em um produto, RLS nativo |
| **Groq** | Inferência LLM mais rápida do mercado (muito superior ao OpenAI em velocidade) |
| **Zustand** | Mais simples que Redux, mais poderoso que Context para estado global |
| **Vercel** | Deploy zero-config de React + Serverless Functions sem configuração de servidor |

---

*Próximo: [`03-ESTRUTURA-PROJETO.md`](./03-ESTRUTURA-PROJETO.md)*

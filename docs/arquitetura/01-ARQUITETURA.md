# Arquitetura — 01 — Visão Geral da Arquitetura

---

## 1. Tipo de Arquitetura

O NGB Agenda IA adota uma arquitetura **BaaS-first** (Backend-as-a-Service), combinando:

- **Supabase** como backend principal (banco, autenticação, storage e realtime)
- **Vercel Functions** como camada serverless para operações que exigem segurança (IA, lógica crítica)
- **React/Vite** como SPA (Single Page Application) no frontend

Essa abordagem elimina a necessidade de um backend tradicional gerenciado, reduzindo a complexidade operacional sem comprometer segurança ou escalabilidade.

---

## 2. Diagrama Geral

```
                        VERCEL (Hosting + Functions)
                               │
               ┌───────────────┴───────────────┐
               │                               │
          React/Vite                    API Routes (Serverless)
          (Frontend SPA)                       │
               │                               │
               │                    ┌──────────┴──────────┐
               │                    │                     │
               │               Autenticação           GROQ API
               │               do usuário                 │
               │               e tenant                   │
               │                    │                     │
               │                    ↓                     │
               │              Consulta ao              Resposta IA
               │               Supabase              contextualizada
               │                    │
               ↓                    ↓
           SUPABASE (BaaS)
               │
     ┌─────────┼──────────┐
     ↓         ↓          ↓
   Auth    PostgreSQL   Storage
              │
              ↓
    Row Level Security (RLS)
    [Isolamento por tenant_id]
```

---

## 3. Camadas da Aplicação

### 3.1 Camada de Apresentação (Frontend)
- **Tecnologia**: React.js + Vite
- **Responsabilidade**: Renderização da interface, interação do usuário, roteamento
- **Comunicação**: Diretamente com Supabase (CRUD), e com Vercel Functions (IA)
- **Estado**: Zustand para estado global, React Query para cache de dados

### 3.2 Camada de Funções Serverless (Vercel Functions)
- **Tecnologia**: Node.js (Vercel API Routes)
- **Responsabilidade**: Intermediar chamadas à Groq API de forma segura
- **Localização**: `/api/` na raiz do projeto Vite/Vercel
- **Segurança**: Variáveis de ambiente protegidas no servidor

### 3.3 Camada de Dados (Supabase)
- **Banco**: PostgreSQL
- **Autenticação**: Supabase Auth (JWT)
- **Segurança**: Row Level Security (RLS)
- **Realtime**: Supabase Realtime (opcional para notificações)
- **Storage**: Fotos de profissionais, logo da empresa

### 3.4 Camada de IA (Groq)
- **Tecnologia**: Groq API (LLM: `llama-3.3-70b-versatile` ou `mixtral-8x7b`)
- **Acesso**: Somente via Vercel Function — nunca diretamente pelo frontend
- **Contexto**: Dados do tenant injetados no prompt antes de cada requisição

---

## 4. Fluxo de uma Requisição Típica

### 4.1 CRUD normal (ex: listar clientes)

```
Usuário → React → Supabase JS Client → PostgreSQL (com RLS) → Resposta
```

### 4.2 Requisição à IA

```
Usuário → React → POST /api/ai → Vercel Function
                                       │
                                  Autentica usuário
                                       │
                                  Identifica tenant
                                       │
                                  Consulta Supabase
                                       │
                                  Monta contexto
                                       │
                                  Chama Groq API
                                       │
                                  Retorna resposta
                                       │
                                 React → Exibe na UI
```

---

## 5. Princípios Arquiteturais

| Princípio | Aplicação |
|-----------|-----------|
| **Segurança por design** | RLS ativo em todas as tabelas, chaves protegidas em variáveis de ambiente |
| **Isolamento de dados** | `tenant_id` obrigatório em todas as tabelas operacionais |
| **Separação de responsabilidades** | Frontend não contém lógica de negócio sensível |
| **Sem backend próprio** | Supabase e Vercel Functions eliminam a necessidade de servidor Node.js dedicado |
| **Escalabilidade por padrão** | Multi-tenant desde o dia 1, pronto para múltiplos clientes |

---

## 6. Considerações de Segurança na Arquitetura

> ⚠️ **Atenção crítica**: A chave `GROQ_API_KEY` jamais deve aparecer no código React.

```js
// ❌ PROIBIDO — expõe a chave no bundle do frontend
const GROQ_API_KEY = "gsk_..."

// ✅ CORRETO — acessado somente na Vercel Function (servidor)
// /api/ai.js
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
```

---

*Próximo: [`02-STACK.md`](./02-STACK.md)*

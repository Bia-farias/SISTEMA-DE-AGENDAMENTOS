# Segurança — 01 — Diretrizes e Arquitetura de Segurança

---

## 1. Princípios Fundamentais

A arquitetura de segurança do **NGB Agenda IA** segue o modelo **Zero Trust** e **Defesa em Profundidade**:

1. **Nunca confie no cliente (frontend)**: Todas as validações visuais no navegador são replicadas no banco (RLS/Constraints) e nas Serverless Functions.
2. **Isolamento Rígido por Tenant**: Nenhuma empresa pode, sob qualquer hipótese, ler ou modificar dados de outra empresa.
3. **Princípio do Menor Privilégio**: O cliente JavaScript utiliza exclusivamente a chave anônima pública (`anon key`), com acessos limitados pelas políticas de RLS.
4. **Proteção de Segredos**: Chaves sensíveis (como `GROQ_API_KEY` e `SUPABASE_SERVICE_ROLE_KEY`) nunca são expostas ao browser.

---

## 2. Camadas de Proteção

```
┌────────────────────────────────────────────────────────┐
│ 1. Frontend: Sanitização, HTTPS e Validações de UI     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ 2. Vercel Functions: Validação de JWT e Rate Limiting  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ 3. PostgreSQL: Row Level Security (RLS) & Constraints  │
└────────────────────────────────────────────────────────┘
```

---

## 3. Prevenção de Vulnerabilidades Comuns (OWASP)

| Ameaça | Prevenção no Sistema |
|--------|----------------------|
| **SQL Injection** | Uso exclusivo do PostgREST e queries parametrizadas pelo SDK do Supabase. Sem SQL cru concatenado por string. |
| **XSS (Cross-Site Scripting)** | React realiza escape nativo de strings ao renderizar no JSX. |
| **Broken Access Control** | RLS com validação obrigatória de `tenant_id` atrelado ao `auth.uid()`. |
| **Prompt Injection** | Regras de sistema restritivas no prompt da Groq e isolamento do escopo de execução. |
| **Data Leakage** | `.env.local` ignorado no Git; credenciais injetadas exclusivamente via Vercel Dashboard. |

---

*Próximo: [`02-RLS.md`](./02-RLS.md)*

# Deploy — 04 — Checklist de Produção

---

## 1. Checklist de Pré-Lançamento

Antes de disponibilizar o sistema para uso por empresas reais, execute o seguinte checklist:

### Banco de Dados & Segurança (Supabase)
- [ ] Todas as 15 tabelas têm **Row Level Security (RLS)** ativado (`ENABLE ROW LEVEL SECURITY`).
- [ ] Nenhuma política RLS com `USING (true)` permissiva deixada aberta por engano.
- [ ] Confirmação de e-mail ativada em **Authentication Settings**.
- [ ] Backups automáticos do PostgreSQL configurados no Supabase.
- [ ] Índices de performance criados para `tenant_id` e filtros de busca.

### Frontend & Performance (Vercel)
- [ ] Build de produção executando sem erros (`npm run build`).
- [ ] Nenhum `console.log` com dados de clientes ou tokens no código final.
- [ ] Ícones e manifesto do PWA devidamente configurados no `public/manifest.json`.
- [ ] Domínio personalizado com certificado SSL/HTTPS configurado na Vercel.
- [ ] Variáveis de ambiente secretas testadas e operantes no ambiente de produção.

### Inteligência Artificial (Groq)
- [ ] Chave `GROQ_API_KEY` válida com limites e cobrança monitorados no painel Groq.
- [ ] Mensagens de fallback elegantes caso o modelo atinja rate limit ou instabilidade.

---

## 2. Monitoramento e Logs

- **Vercel Analytics & Logs**: Monitorar requisições das Serverless Functions em tempo real para acompanhar latência da Groq e erros 500.
- **Supabase Logs**: Acompanhar o consumo de banco, queries lentas e erros de autenticação na aba *Logs* do Supabase.

---

*Próximo: [`../desenvolvimento/01-SETUP.md`](../desenvolvimento/01-SETUP.md)*

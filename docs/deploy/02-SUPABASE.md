# Deploy — 02 — Configuração do Projeto no Supabase

---

## 1. Criação do Projeto

1. Acesse o painel oficial: [supabase.com/dashboard](https://supabase.com/dashboard)
2. Clique em **"New Project"**
3. Selecione a sua organização
4. Preencha os dados:
   - **Name**: `ngb-agenda-ia`
   - **Database Password**: Defina uma senha forte e anote com segurança
   - **Region**: Selecione `South America (São Paulo - sa-east-1)` para menor latência
   - **Pricing Plan**: `Free Plan`

---

## 2. Aplicação das Tabelas e Migrations

1. No menu lateral esquerdo do Supabase, clique no ícone **SQL Editor**
2. Clique em **"New Query"**
3. Copie todo o conteúdo do arquivo [`docs/banco/05-MIGRATIONS.md`](../banco/05-MIGRATIONS.md)
4. Cole no editor SQL do Supabase e clique em **"Run"**
5. Verifique se todas as 15 tabelas, funções e políticas RLS foram criadas com sucesso no menu **Table Editor**.

---

## 3. Configurações de Autenticação

1. Acesse **Authentication** → **Providers** → **Email**
2. Habilite **Enable Email provider**
3. Em ambiente de desenvolvimento/testes, você pode desativar a opção **"Confirm email"** para agilizar a criação de contas de teste. Em produção, mantenha ativado.
4. Em **Authentication** → **URL Configuration**:
   - **Site URL**: `http://localhost:5173` (em dev) ou `https://seu-app.vercel.app` (em prod)
   - **Redirect URLs**: Adicione `http://localhost:5173/**` e sua URL de produção.

---

## 4. Obtenção das Chaves de API

No menu **Project Settings** → **API**:

- **Project URL**: Copie para `VITE_SUPABASE_URL` e `SUPABASE_URL`
- **anon public key**: Copie para `VITE_SUPABASE_ANON_KEY`
- **service_role secret**: Copie para `SUPABASE_SERVICE_ROLE_KEY` (usar apenas nas variáveis da Vercel)

---

*Próximo: [`03-VERCEL.md`](./03-VERCEL.md)*

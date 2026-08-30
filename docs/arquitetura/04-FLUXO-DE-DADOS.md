# Arquitetura — 04 — Fluxo de Dados

---

## 1. Fluxos Principais

### 1.1 Autenticação e Carregamento Inicial

```
Usuário acessa a URL
         │
         ▼
    App.jsx verifica
    sessão no Supabase
         │
    ┌────┴────┐
    │         │
  Autenticado  Não autenticado
    │              │
    ▼              ▼
 Carrega        Redireciona
 perfil e        /login
 tenant
    │
    ▼
 Dashboard
```

### 1.2 Criação de Agendamento (Manual)

```
Usuário abre formulário de agendamento
         │
         ▼
Seleciona: cliente, profissional, serviço, data e horário
         │
         ▼
Frontend valida campos obrigatórios
         │
         ▼
Verifica disponibilidade no Supabase
  (hora não ocupada por outro agendamento)
         │
    ┌────┴────┐
    │         │
 Disponível  Ocupado
    │           │
    ▼           ▼
Cria registro  Exibe erro
em appointments  ao usuário
    │
    ▼
Cria registro em financial_transactions (status: pendente)
    │
    ▼
Toast de sucesso + atualiza agenda
```

### 1.3 Criação de Agendamento via IA (Linguagem Natural)

```
Usuário: "Agende João amanhã às 15h para corte"
         │
         ▼
React → POST /api/ai → Vercel Function
         │
         ▼
Groq interpreta a intenção:
  cliente = "João"
  data = amanhã
  hora = 15:00
  serviço = "corte"
         │
         ▼
Vercel Function consulta Supabase:
  1. Busca cliente por nome "João"
  2. Busca serviço por nome "corte"
  3. Verifica disponibilidade às 15h
         │
    ┌────┴────────────────┐
    │                     │
 Tudo OK               Algo falhou
    │                     │
    ▼                     ▼
Cria agendamento      IA responde:
via Supabase          "Não encontrei o cliente João"
    │                 ou "15h está ocupado"
    ▼
IA responde:
"Agendamento criado para
João amanhã às 15h para Corte"
```

### 1.4 Chat com a IA (Consulta de Dados)

```
Usuário: "Qual foi meu faturamento essa semana?"
         │
         ▼
React → POST /api/ai
         │
         ▼
Vercel Function:
  1. Verifica token JWT do usuário
  2. Busca tenant_id no perfil
  3. Consulta financial_transactions
     WHERE tenant_id = X
     AND date BETWEEN início_semana AND hoje
  4. Monta contexto com os dados
         │
         ▼
Groq API recebe:
  [system]: "Você é assistente da empresa X.
             Dados financeiros desta semana: {...}"
  [user]: "Qual foi meu faturamento essa semana?"
         │
         ▼
Groq responde:
  "Seu faturamento esta semana foi de R$ 4.850,
   sendo 23 atendimentos confirmados."
         │
         ▼
React exibe no chat
```

---

## 2. Fluxo de Dados no Banco (com RLS)

```
Frontend faz query:
  supabase.from('appointments').select('*')
         │
         ▼
Supabase verifica JWT do usuário
         │
         ▼
RLS Policy executa:
  WHERE tenant_id = (
    SELECT tenant_id FROM profiles
    WHERE user_id = auth.uid()
  )
         │
         ▼
Retorna APENAS dados do tenant do usuário logado
         │
         ▼
Frontend recebe dados filtrados automaticamente
```

---

## 3. Fluxo do WhatsApp (V1 — Link Direto)

```
Usuário seleciona cliente + template de mensagem
         │
         ▼
Clica em "Gerar mensagem com IA"
         │
         ▼
React → POST /api/ai (ação: gerar_mensagem_whatsapp)
         │
         ▼
Groq gera a mensagem personalizada
         │
         ▼
Exibe prévia da mensagem para o usuário
         │
         ▼
Usuário clica "Enviar pelo WhatsApp"
         │
         ▼
Sistema abre: wa.me/55{telefone}?text={mensagem_codificada}
         │
         ▼
WhatsApp abre no dispositivo do usuário
```

---

## 4. Gerenciamento de Estado

```
┌─────────────────────────────────┐
│        authStore (Zustand)      │
│  user, profile, tenant, loading │
└────────────────┬────────────────┘
                 │ fornece para toda a aplicação
                 ▼
┌─────────────────────────────────┐
│        uiStore (Zustand)        │
│  modais abertos, toasts, sidebar│
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│     Estado local (useState)     │
│  Formulários, filtros, paginação│
└─────────────────────────────────┘
```

---

## 5. Diagrama de Comunicação entre Serviços

```
┌──────────┐    REST/WS    ┌─────────────┐
│  React   │◄─────────────►│  Supabase   │
│ Frontend │               │  PostgREST  │
└────┬─────┘               └─────────────┘
     │
     │ HTTP POST
     ▼
┌──────────────────┐  SDK  ┌──────────┐
│ Vercel Function  │◄─────►│ Groq API │
│  /api/ai.js      │       └──────────┘
└────┬─────────────┘
     │
     │ Service Role Key
     ▼
┌─────────────┐
│  Supabase   │
│  (server)   │
└─────────────┘
```

---

*Próximo: [`05-MULTI-TENANT.md`](./05-MULTI-TENANT.md)*

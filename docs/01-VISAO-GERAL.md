# 01 — Visão Geral do Projeto

## NGB Agenda IA

> Sistema SaaS Multi-Tenant de Agendamento e Gestão com Assistente de Inteligência Artificial

---

## 1. Resumo Executivo

O **NGB Agenda IA** é uma plataforma SaaS destinada a profissionais e empresas do setor de beleza, saúde e bem-estar. Ele centraliza o gerenciamento de agendamentos, clientes, profissionais, serviços e finanças em uma única interface moderna, acrescida de um assistente de IA capaz de interagir com os dados reais da empresa.

---

## 2. Problema que Resolve

Profissionais e empresas do setor de beleza e saúde frequentemente enfrentam:

- Agendamentos feitos manualmente (WhatsApp, caderno, planilhas)
- Falta de visibilidade financeira em tempo real
- Dificuldade de comunicação com clientes (lembretes, confirmações)
- Ausência de histórico estruturado de clientes
- Gestão ineficiente da agenda dos profissionais

O **NGB Agenda IA** resolve todos esses problemas em uma única plataforma integrada.

---

## 3. Público-Alvo

| Segmento | Exemplos |
|----------|---------|
| Beleza | Salões de beleza, barbearias, nail designers, maquiadores |
| Saúde e Estética | Clínicas estéticas, dermato, fisioterapia, nutrição |
| Bem-estar | Personal trainers, massoterapeutas, coaches |
| Autônomos | Qualquer profissional que trabalhe com agendamento |

---

## 4. Diferenciais Competitivos

### 4.1 Agenda + CRM + Financeiro + WhatsApp + IA

A maioria dos sistemas do mercado oferece apenas agendamento. O NGB Agenda IA unifica todos os pilares de gestão em um único produto.

### 4.2 IA Contextualizada com os Dados da Empresa

A inteligência artificial não é decorativa. Ela **lê os dados reais da empresa** e responde perguntas como:

> "Quantos agendamentos tenho amanhã?"  
> "Qual foi meu faturamento essa semana?"  
> "Quais clientes estão inativos há mais de 30 dias?"

### 4.3 Criação de Agendamentos por Linguagem Natural

O usuário pode dizer:

> "Agende João amanhã às 15h para corte."

E a IA interpreta, valida e cria o agendamento automaticamente.

### 4.4 Arquitetura Multi-Tenant

Cada empresa possui seu próprio ambiente seguro e isolado, permitindo que o sistema evolua para um SaaS com múltiplos clientes pagantes.

---

## 5. Módulos do Sistema

| # | Módulo | Descrição |
|---|--------|-----------|
| 1 | **Autenticação** | Login, cadastro, recuperação de senha, roles |
| 2 | **Dashboard** | Visão geral com KPIs, agenda do dia, gráficos |
| 3 | **Agenda** | Calendário de agendamentos por profissional |
| 4 | **Clientes** | CRUD completo, histórico, observações |
| 5 | **Profissionais** | Cadastro, horários, especialidades, disponibilidade |
| 6 | **Serviços** | Catálogo com preço e duração |
| 7 | **Financeiro** | Receitas, pendências, histórico, dashboard |
| 8 | **WhatsApp** | Templates, geração de mensagens, link direto |
| 9 | **IA** | Assistente contextualizado, criação de agendamentos |
| 10 | **Automações** | Base preparada para triggers futuros |
| 11 | **Notificações** | Alertas internos do sistema |

---

## 6. Escopo do MVP (V1)

### ✅ Incluído na V1

- Autenticação completa (Login, Cadastro, Recuperação)
- Cadastro e configuração da empresa
- Agenda com calendário (criação, edição, cancelamento)
- CRUD de clientes com histórico
- CRUD de profissionais com horários de trabalho
- CRUD de serviços com preço e duração
- Módulo financeiro (receitas, pendências, histórico)
- WhatsApp: geração de mensagem via IA + link `wa.me`
- Assistente IA com acesso aos dados da empresa
- Criação de agendamentos por linguagem natural
- Multi-tenancy com RLS
- Roles: `owner`, `admin`, `employee`
- Deploy no GitHub + Vercel + Supabase

### 🔜 Fora do Escopo da V1 (Próximas Versões)

- WhatsApp Business API oficial
- Automações ativas (triggers de WhatsApp)
- Bot de atendimento
- IA Agent autônoma
- Pagamentos online
- Relatórios avançados exportáveis
- App mobile nativo

---

## 7. Roadmap de Evolução

```
V1 — Sistema Base + IA
        ↓
V2 — WhatsApp Business API
        ↓
V3 — Automações (confirmação, lembretes, cobranças)
        ↓
V4 — Bot de Atendimento WhatsApp
        ↓
V5 — IA Agente Autônoma
```

---

## 8. Objetivos Educacionais (Contexto de Mentoria)

Este projeto é desenvolvido para que o(a) aluno(a) domine na prática:

### Frontend
- Componentização com React
- Hooks modernos (`useState`, `useEffect`, `useCallback`, `useMemo`)
- Context API e Zustand para gerenciamento de estado
- React Router para navegação
- Consumo de APIs REST
- Tratamento de loading e erros
- Responsividade e PWA

### Backend / BaaS
- Modelagem relacional com PostgreSQL
- Supabase: Auth, Realtime, Storage, Functions
- Row Level Security (RLS)
- Queries com joins e filtros

### Inteligência Artificial
- Integração com APIs de IA (Groq)
- Prompt Engineering
- Contexto dinâmico de conversa
- Ferramentas da IA (function calling)

### Deploy e DevOps
- GitHub com branches e pull requests
- Variáveis de ambiente
- Vercel com Serverless Functions
- Configuração de produção segura

### Arquitetura
- Padrão SaaS Multi-Tenant
- Separação de responsabilidades
- Segurança por design

---

## 9. Tecnologia

> Para detalhes completos, consulte: [`arquitetura/02-STACK.md`](../arquitetura/02-STACK.md)

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React.js + Vite |
| UI | Tailwind CSS + Lucide React |
| Estado | Zustand / Context API |
| Backend | Supabase (BaaS) |
| Banco | PostgreSQL com RLS |
| IA | Groq API (via Vercel Functions) |
| Deploy | Vercel |
| PWA | Vite PWA Plugin |

---

*Próximo: [`02-REQUISITOS.md`](./02-REQUISITOS.md)*

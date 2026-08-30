# NGB Agenda IA — Documentação Oficial

> **Sistema SaaS Multi-Tenant de Agendamento e Gestão com Assistente de Inteligência Artificial**

---

## 📌 Sobre o Projeto

O **NGB Agenda IA** é um sistema SaaS completo voltado para salões de beleza, barbearias, clínicas estéticas, clínicas de saúde e profissionais autônomos. O sistema combina gestão de agendamentos, CRM de clientes, controle financeiro, comunicação via WhatsApp e um assistente de inteligência artificial contextualizado com os dados da empresa.

---

## 🗂️ Estrutura da Documentação

```
docs/
│
├── 00-README.md                   ← Este arquivo
├── 01-VISAO-GERAL.md              ← Visão geral, objetivos e escopo
├── 02-REQUISITOS.md               ← Requisitos funcionais e não funcionais
├── 03-REGRAS-DE-NEGOCIO.md        ← Regras de negócio do sistema
│
├── arquitetura/                   ← Decisões e diagramas de arquitetura
├── banco/                         ← Modelagem de banco de dados
├── autenticacao/                  ← Autenticação, perfis e permissões
├── funcionalidades/               ← Especificação de cada módulo
├── ia/                            ← Inteligência artificial com Groq
├── whatsapp/                      ← Integração WhatsApp
├── frontend/                      ← Padrões e componentes React
├── api/                           ← Endpoints e contratos de API
├── seguranca/                     ← Segurança, RLS e dados sensíveis
├── deploy/                        ← Ambientes e processo de deploy
└── desenvolvimento/               ← Setup, padrões e roadmap
```

---

## 🚀 Versões do Produto

| Versão | Escopo | Status |
|--------|--------|--------|
| **V1** | Sistema completo + Assistente IA | 🔨 Em desenvolvimento |
| **V2** | Integração WhatsApp Business API oficial | 🔜 Planejado |
| **V3** | Automações avançadas | 🔜 Planejado |
| **V4** | Bot de atendimento via WhatsApp | 🔜 Planejado |
| **V5** | IA Agente autônoma | 🔜 Planejado |

---

## ⚡ Stack Principal

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React.js + Vite |
| Linguagem | JavaScript |
| UI | Tailwind CSS |
| Ícones | Lucide React |
| Estado | Zustand / Context API |
| Backend/BaaS | Supabase |
| Banco de Dados | PostgreSQL |
| Autenticação | Supabase Auth |
| Segurança | Row Level Security (RLS) |
| IA | Groq API |
| Serverless | Vercel Functions |
| Deploy | Vercel |
| PWA | Vite PWA Plugin |
| WhatsApp | Simulado (V1) → API Oficial (V2) |

---

## 🧭 Como Navegar na Documentação

1. Comece pela **[Visão Geral](./01-VISAO-GERAL.md)** para entender o produto
2. Leia os **[Requisitos](./02-REQUISITOS.md)** para entender o que deve ser construído
3. Consulte a **[Arquitetura](./arquitetura/01-ARQUITETURA.md)** para entender as decisões técnicas
4. Estude o **[Banco de Dados](./banco/01-MODELO-DADOS.md)** antes de iniciar o desenvolvimento
5. Siga o guia de **[Setup](./desenvolvimento/01-SETUP.md)** para configurar o ambiente local

---

## 👥 Contexto do Projeto

Este projeto é desenvolvido como parte de uma **mentoria de desenvolvimento web**, com o objetivo de que o(a) aluno(a) pratique:

- Desenvolvimento frontend com React moderno
- Backend-as-a-Service com Supabase
- Segurança com RLS no PostgreSQL
- Integração com APIs externas (Groq, WhatsApp)
- Arquitetura SaaS Multi-Tenant
- Deploy profissional com Vercel

---

## 📅 Última Atualização

> Documentação gerada em: **Agosto de 2026**  
> Versão do documento: **1.0.0**

---

*Para dúvidas sobre a documentação, consulte o mentor responsável pelo projeto.*

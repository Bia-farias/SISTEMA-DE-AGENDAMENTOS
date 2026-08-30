# Desenvolvimento — 05 — Roadmap e Próximos Passos

---

## 1. Cronograma de Desenvolvimento (Fases)

```
┌────────────────────────────────────────────────────────────────────────┐
│ FASE 1: Fundação, Banco & Auth (V1 - MVP)                     [CONCLUÍDO]│
│ - Documentação completa e arquitetura                                  │
│ - Schema SQL + RLS no Supabase                                         │
│ - Setup do React + Vite + Tailwind + PWA                               │
│ - Telas de Login, Registro e Onboarding de Empresa                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ FASE 2: Módulos Operacionais (V1 - MVP)                       [EM ANDAMENTO]│
│ - CRUD de Clientes e Histórico                                         │
│ - CRUD de Profissionais e Horários de Trabalho                         │
│ - Catálogo de Serviços e Preços                                        │
│ - Agenda com Visualização Semanal e Validação de Conflitos             │
│ - Módulo Financeiro e Transações                                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ FASE 3: Inteligência Artificial & WhatsApp (V1 - MVP)         [PLANEJADO]│
│ - Setup de Vercel Serverless Functions com Groq SDK                    │
│ - Chat da IA contextualizado com banco da empresa                      │
│ - Criador de agendamentos por linguagem natural                        │
│ - Templates de WhatsApp e links diretos wa.me                          │
│ - Deploy na Vercel e homologação com testes reais                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ FASE 4: WhatsApp Oficial & Automações (V2)                    [FUTURO]   │
│ - Integração com WhatsApp Business Cloud API (Meta)                    │
│ - Disparo automático de lembretes (24h / 2h antes)                     │
│ - Webhooks de confirmação e cancelamento automático                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ FASE 5: Bot de IA & Agentes Autônomos (V4/V5)                 [FUTURO]   │
│ - Atendimento 24/7 via WhatsApp por IA                                 │
│ - Pagamentos integrados (Pix automático / Stripe / Asaas)              │
│ - IA preditiva para retenção e reativação de clientes                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Status Geral do Projeto

- **Documentação de Arquitetura**: 100% Finalizada (45 arquivos completos)
- **Modelo Relacional & Segurança RLS**: 100% Especificado e Pronto para Execução
- **Endpoints de IA e Serverless**: 100% Mapeados
- **Próxima Etapa Técnica**: Inicialização do repositório de código e execução do script de migrations no Supabase.

---

*Fim da documentação do projeto NGB Agenda IA.*

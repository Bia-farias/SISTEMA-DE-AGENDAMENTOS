# 02 — Requisitos do Sistema

---

## 1. Requisitos Funcionais

### RF-01 — Autenticação

| ID | Requisito |
|----|-----------|
| RF-01.1 | O sistema deve permitir cadastro de novos usuários com e-mail e senha |
| RF-01.2 | O sistema deve permitir login com e-mail e senha |
| RF-01.3 | O sistema deve oferecer recuperação de senha por e-mail |
| RF-01.4 | O sistema deve autenticar via Supabase Auth |
| RF-01.5 | O sistema deve criar automaticamente o perfil e vincular à empresa no primeiro acesso |
| RF-01.6 | O sistema deve controlar acesso por roles: `owner`, `admin`, `employee` |
| RF-01.7 | O sistema deve redirecionar usuários não autenticados para a tela de login |

---

### RF-02 — Empresa (Tenant)

| ID | Requisito |
|----|-----------|
| RF-02.1 | O sistema deve permitir o cadastro de uma empresa durante o onboarding |
| RF-02.2 | O sistema deve armazenar nome, CNPJ/CPF, telefone, endereço e logo da empresa |
| RF-02.3 | O sistema deve isolar completamente os dados entre empresas diferentes |
| RF-02.4 | O sistema deve associar todos os dados (clientes, profissionais, agendamentos) ao `tenant_id` |

---

### RF-03 — Dashboard

| ID | Requisito |
|----|-----------|
| RF-03.1 | O dashboard deve exibir o total de agendamentos do dia atual |
| RF-03.2 | O dashboard deve exibir agendamentos confirmados do dia |
| RF-03.3 | O dashboard deve exibir o faturamento do dia |
| RF-03.4 | O dashboard deve exibir o valor de pendências (a receber) |
| RF-03.5 | O dashboard deve listar os próximos agendamentos do dia |
| RF-03.6 | O dashboard deve exibir um gráfico de faturamento da semana/mês |
| RF-03.7 | O dashboard deve exibir os serviços mais realizados |
| RF-03.8 | O dashboard deve exibir os clientes recentes |

---

### RF-04 — Agenda

| ID | Requisito |
|----|-----------|
| RF-04.1 | O sistema deve exibir uma visualização de agenda semanal por profissional |
| RF-04.2 | O sistema deve permitir criar um novo agendamento |
| RF-04.3 | O sistema deve permitir editar um agendamento existente |
| RF-04.4 | O sistema deve permitir cancelar um agendamento |
| RF-04.5 | O sistema deve permitir reagendar um agendamento |
| RF-04.6 | O sistema deve exibir o status de cada agendamento (Pendente, Confirmado, Concluído, Cancelado) |
| RF-04.7 | O sistema deve validar conflitos de horário ao criar/editar agendamentos |
| RF-04.8 | O sistema deve permitir filtrar a agenda por profissional, serviço, status e data |
| RF-04.9 | O sistema deve calcular o horário de término baseado na duração do serviço |

---

### RF-05 — Clientes

| ID | Requisito |
|----|-----------|
| RF-05.1 | O sistema deve permitir cadastrar clientes com: nome, WhatsApp, e-mail, CPF, nascimento, observações |
| RF-05.2 | O sistema deve permitir editar os dados de um cliente |
| RF-05.3 | O sistema deve permitir excluir um cliente (com confirmação) |
| RF-05.4 | O sistema deve exibir o histórico de agendamentos de cada cliente |
| RF-05.5 | O sistema deve permitir pesquisar clientes por nome ou telefone |
| RF-05.6 | O sistema deve identificar aniversariantes do dia |
| RF-05.7 | O sistema deve identificar clientes inativos (sem agendamento há mais de X dias) |

---

### RF-06 — Profissionais

| ID | Requisito |
|----|-----------|
| RF-06.1 | O sistema deve permitir cadastrar profissionais com: nome, foto, especialidade, status |
| RF-06.2 | O sistema deve permitir associar serviços a um profissional |
| RF-06.3 | O sistema deve permitir configurar horários de trabalho por dia da semana |
| RF-06.4 | O sistema deve permitir configurar intervalos (almoço, pausa) |
| RF-06.5 | O sistema deve usar os horários cadastrados para validar disponibilidade na agenda |
| RF-06.6 | O sistema deve permitir ativar/desativar um profissional |

---

### RF-07 — Serviços

| ID | Requisito |
|----|-----------|
| RF-07.1 | O sistema deve permitir cadastrar serviços com: nome, descrição, preço, duração |
| RF-07.2 | O sistema deve permitir editar e excluir serviços |
| RF-07.3 | O sistema deve usar a duração do serviço para calcular o horário de término dos agendamentos |
| RF-07.4 | O sistema deve permitir ativar/desativar serviços |

---

### RF-08 — Financeiro

| ID | Requisito |
|----|-----------|
| RF-08.1 | O sistema deve registrar automaticamente uma transação ao confirmar um agendamento |
| RF-08.2 | O sistema deve exibir receitas do período |
| RF-08.3 | O sistema deve exibir valores pendentes (a receber) |
| RF-08.4 | O sistema deve exibir valores vencidos |
| RF-08.5 | O sistema deve registrar a forma de pagamento: dinheiro, cartão, Pix |
| RF-08.6 | O sistema deve permitir atualizar o status de pagamento: Pendente, Pago, Cancelado, Vencido |
| RF-08.7 | O sistema deve exibir um histórico de transações com filtros por período |
| RF-08.8 | O sistema deve exibir um dashboard financeiro com totalizadores |

---

### RF-09 — WhatsApp

| ID | Requisito |
|----|-----------|
| RF-09.1 | O sistema deve permitir criar templates de mensagens |
| RF-09.2 | O sistema deve permitir gerar mensagens personalizadas via IA |
| RF-09.3 | O sistema deve gerar um link `wa.me` para envio direto ao WhatsApp do cliente |
| RF-09.4 | O sistema deve exibir uma prévia da mensagem antes do envio |

---

### RF-10 — Assistente IA

| ID | Requisito |
|----|-----------|
| RF-10.1 | O sistema deve oferecer uma interface de chat com a IA |
| RF-10.2 | A IA deve ter acesso aos dados reais da empresa (agendamentos, clientes, financeiro) |
| RF-10.3 | A IA deve responder perguntas sobre a agenda do dia/semana |
| RF-10.4 | A IA deve responder perguntas sobre faturamento e finanças |
| RF-10.5 | A IA deve identificar clientes inativos quando solicitado |
| RF-10.6 | A IA deve criar agendamentos por linguagem natural |
| RF-10.7 | A IA deve gerar mensagens de WhatsApp personalizadas |
| RF-10.8 | A IA deve manter histórico da conversa no banco de dados |
| RF-10.9 | A IA deve sugerir ações rápidas ao usuário |

---

### RF-11 — Automações (Base Preparada)

| ID | Requisito |
|----|-----------|
| RF-11.1 | O banco de dados deve conter a tabela `automations` preparada para triggers futuros |
| RF-11.2 | Devem estar previstos os triggers: `appointment_created`, `appointment_confirmed`, `appointment_cancelled`, `appointment_24h_before`, `appointment_2h_before`, `payment_due`, `payment_overdue`, `customer_birthday`, `customer_inactive` |

---

## 2. Requisitos Não Funcionais

### RNF-01 — Segurança

| ID | Requisito |
|----|-----------|
| RNF-01.1 | Todos os dados devem ser isolados por `tenant_id` via RLS no PostgreSQL |
| RNF-01.2 | A chave da API Groq **nunca** deve ser exposta no frontend |
| RNF-01.3 | Todas as chamadas à IA devem passar por Vercel Functions (serverless) |
| RNF-01.4 | Dados sensíveis (CPF, telefone, e-mail) devem ser acessíveis apenas para usuários autenticados da mesma empresa |
| RNF-01.5 | O sistema deve validar o `tenant_id` em todas as operações de banco de dados |

---

### RNF-02 — Performance

| ID | Requisito |
|----|-----------|
| RNF-02.1 | O dashboard deve carregar em menos de 2 segundos |
| RNF-02.2 | As respostas da IA devem usar streaming quando possível |
| RNF-02.3 | Queries ao banco devem ser paginadas onde aplicável |
| RNF-02.4 | O sistema deve usar cache de sessão para dados frequentemente consultados |

---

### RNF-03 — Usabilidade

| ID | Requisito |
|----|-----------|
| RNF-03.1 | A interface deve ser responsiva (mobile, tablet, desktop) |
| RNF-03.2 | O sistema deve funcionar como PWA (instalável no celular) |
| RNF-03.3 | Todas as ações destrutivas (excluir, cancelar) devem solicitar confirmação |
| RNF-03.4 | O sistema deve exibir feedback visual para todas as operações (loading, sucesso, erro) |

---

### RNF-04 — Disponibilidade e Deploy

| ID | Requisito |
|----|-----------|
| RNF-04.1 | O sistema deve ser hospedado na Vercel com CI/CD automático via GitHub |
| RNF-04.2 | O banco de dados deve ser hospedado no Supabase |
| RNF-04.3 | Variáveis de ambiente sensíveis devem ser configuradas apenas no painel da Vercel |
| RNF-04.4 | O sistema deve ter ambiente de desenvolvimento local funcional |

---

### RNF-05 — Manutenibilidade

| ID | Requisito |
|----|-----------|
| RNF-05.1 | O código deve seguir padrão de componentização React |
| RNF-05.2 | Lógica de acesso ao banco deve estar em `services/` |
| RNF-05.3 | O projeto deve ter um `.env.example` com todas as variáveis necessárias documentadas |
| RNF-05.4 | O código deve seguir convenções definidas em [`desenvolvimento/02-PADRAO-DE-CODIGO.md`](../desenvolvimento/02-PADRAO-DE-CODIGO.md) |

---

*Próximo: [`03-REGRAS-DE-NEGOCIO.md`](./03-REGRAS-DE-NEGOCIO.md)*

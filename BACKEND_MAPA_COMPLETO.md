# 🗺️ Mapeamento Completo do Backend — Agenda AI

> **Documento Oficial de Arquitetura de Backend**  
> Mapeamento 1:1 com base em todos os fluxos, telas, componentes, tipos TypeScript e stores do Frontend atual.  
> **Banco de Dados & BaaS:** Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security, Realtime, Edge Functions).

---

## 1. Visão Geral da Arquitetura

O sistema **Agenda AI** adota a arquitetura **Multi-Tenant com Isolamento por Linha (Row Level Security - RLS)** em PostgreSQL gerenciado pelo Supabase. Cada empresa contratante (salão, barbearia, clínica estética, etc.) possui um registro na tabela `tenants`. Todas as tabelas subordinadas carregam obrigatoriamente a chave estrangeira `tenant_id`.

```
                    ┌──────────────────────────────────────────────┐
                    │               CLIENTE (SPA)                  │
                    │        React 18 + Vite + TailwindCSS         │
                    │   Zustand Stores (Auth, Agenda, WhatsApp...) │
                    └──────────────────────┬───────────────────────┘
                                           │ HTTPS (REST / Realtime WSS)
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   SUPABASE BAAS                                        │
│                                                                                        │
│  ┌───────────────────────┐  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │     Supabase Auth     │  │   PostgREST Data API    │  │     Supabase Realtime    │  │
│  │ (GoTrue - JWT/Session)│  │ (CRUD automático c/ RLS) │  │  (Websocket p/ Agenda)   │  │
│  └──────────┬────────────┘  └────────────┬────────────┘  └────────────┬─────────────┘  │
│             │                            │                            │                │
│             ▼                            ▼                            ▼                │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                       POSTGRESQL 15+ (com RLS Habilitado)                        │  │
│  │  tenants │ profiles │ customers │ services │ professionals │ appointments │ etc. │  │
│  └───────────────────────────────────────┬──────────────────────────────────────────┘  │
│                                          │                                             │
│  ┌───────────────────────────────────────┴──────────────────────────────────────────┐  │
│  │                           SUPABASE EDGE FUNCTIONS                                │  │
│  │   • /whatsapp-webhook (Z-API / Evolution / Meta)                                 │  │
│  │   • /ai-groq-chat (Assistente Llama 3.3 com contexto da empresa)                 │  │
│  │   • /cron-reminders (Gatilhos 24h, 2h antes e reativação 30d)                    │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Mapeamento Frontend (Stores/Telas) ⟷ Backend (Tabelas/Endpoints)

Abaixo está o mapeamento detalhado entre as camadas do Frontend existente e as entidades correspondentes no Backend.

| Módulo Frontend | Arquivos Frontend | Store / State | Tabela Supabase | Endpoints PostgREST / RPC |
| :--- | :--- | :--- | :--- | :--- |
| **Autenticação & Empresa** | `pages/auth/Login.tsx`<br>`pages/auth/Register.tsx` | `useAuthStore` | `auth.users`<br>`public.tenants`<br>`public.profiles` | `POST /auth/v1/token`<br>`POST /auth/v1/signup`<br>`GET /rest/v1/profiles`<br>`GET /rest/v1/tenants` |
| **Dashboard & KPIs** | `pages/Dashboard.tsx`<br>`components/ui/StatCard.tsx` | `useAppointmentStore` | `appointments`<br>`customers`<br>`financial_transactions` | `RPC get_dashboard_kpis(date)`<br>`GET /rest/v1/appointments?date=eq.{today}` |
| **Agenda & Calendário** | `pages/Agenda.tsx`<br>`components/agenda/*` | `useAppointmentStore` | `appointments`<br>`professionals`<br>`services` | `GET /rest/v1/appointments`<br>`POST /rest/v1/appointments`<br>`PATCH /rest/v1/appointments?id=eq.{id}`<br>`DELETE /rest/v1/appointments?id=eq.{id}` |
| **Clientes & CRM** | `pages/Clientes.tsx`<br>`components/clientes/*` | `useCustomerStore` | `customers` | `GET /rest/v1/customers`<br>`POST /rest/v1/customers`<br>`PATCH /rest/v1/customers?id=eq.{id}`<br>`DELETE /rest/v1/customers?id=eq.{id}` |
| **Serviços & Catálogo** | `pages/Servicos.tsx`<br>`components/servicos/*` | `useServiceStore` | `services` | `GET /rest/v1/services`<br>`POST /rest/v1/services`<br>`PATCH /rest/v1/services?id=eq.{id}` |
| **Profissionais & Escala**| `pages/Profissionais.tsx`<br>`components/profissionais/*`| `useProfessionalStore` | `professionals` | `GET /rest/v1/professionals`<br>`POST /rest/v1/professionals`<br>`PATCH /rest/v1/professionals?id=eq.{id}` |
| **Automação WhatsApp** | `pages/WhatsApp.tsx`<br>`components/whatsapp/*` | `useWhatsAppStore` | `whatsapp_connections`<br>`whatsapp_templates`<br>`whatsapp_reminder_rules`<br>`whatsapp_message_logs` | `GET/PATCH /rest/v1/whatsapp_connections`<br>`GET/POST/PATCH /rest/v1/whatsapp_templates`<br>`GET/POST/PATCH /rest/v1/whatsapp_reminder_rules`<br>`GET/POST /rest/v1/whatsapp_message_logs` |
| **Assistente IA** | `components/ai/AIChatDrawer.tsx` | `useAIChatStore` | `ai_conversations`<br>`ai_messages` | `POST /functions/v1/ai-chat`<br>`GET /rest/v1/ai_conversations` |

---

## 3. Modelo de Dados Detalhado (TypeScript ⟷ PostgreSQL)

### 3.1. Tabela `tenants` (Estabelecimentos / Multi-tenancy)
Representa o salão, barbearia ou clínica contratante.

* **TypeScript Interface:** `Tenant` (`src/types/index.ts`)
* **Colunas:**
  * `id` (`UUID`, PK, default: `gen_random_uuid()`): Identificador único da empresa.
  * `name` (`TEXT`, NOT NULL): Nome comercial (ex: "Studio Prime & Estética").
  * `slug` (`TEXT`, NOT NULL, UNIQUE): Slug para URLs amigáveis (ex: "studio-prime").
  * `plan` (`TEXT`, NOT NULL, default: `'starter'`): Plano contratado (`'free'`, `'starter'`, `'pro'`, `'enterprise'`).
  * `business_type` (`TEXT`, NOT NULL): Segmento (`'barbershop'`, `'beauty_salon'`, `'aesthetic_clinic'`, `'health_clinic'`, `'other'`).
  * `phone` (`TEXT`): Telefone/WhatsApp oficial de contato.
  * `email` (`TEXT`): E-mail administrativo do estabelecimento.
  * `logo_url` (`TEXT`): URL da logomarca armazenada no Supabase Storage.
  * `address` (`TEXT`): Endereço físico completo.
  * `settings` (`JSONB`, NOT NULL, default: `'{"opening_time":"08:00","closing_time":"20:00","interval_minutes":30,"allow_online_booking":true}'`):
    * `opening_time` (string: "08:00")
    * `closing_time` (string: "20:00")
    * `interval_minutes` (number: 30)
    * `allow_online_booking` (boolean: true)
  * `created_at` (`TIMESTAMPTZ`, default: `NOW()`)
  * `updated_at` (`TIMESTAMPTZ`, default: `NOW()`)

---

### 3.2. Tabela `profiles` (Perfis de Usuários)
Vincula a autenticação do Supabase (`auth.users`) à organização (`tenants`).

* **TypeScript Interface:** `Profile` (`src/types/index.ts`)
* **Colunas:**
  * `id` (`UUID`, PK, default: `gen_random_uuid()`)
  * `user_id` (`UUID`, NOT NULL, UNIQUE, FK: `auth.users(id)` ON DELETE CASCADE)
  * `tenant_id` (`UUID`, NOT NULL, FK: `tenants(id)` ON DELETE CASCADE)
  * `full_name` (`TEXT`, NOT NULL): Nome do profissional ou administrador.
  * `role` (`TEXT`, NOT NULL, CHECK: `'owner'`, `'admin'`, `'professional'`, `'receptionist'`): Papel com controle de permissões.
  * `email` (`TEXT`, NOT NULL): E-mail do usuário.
  * `phone` (`TEXT`): Celular para contato.
  * `avatar_url` (`TEXT`): Foto de perfil.
  * `is_active` (`BOOLEAN`, NOT NULL, default: `true`)
  * `created_at` (`TIMESTAMPTZ`, default: `NOW()`)
  * `updated_at` (`TIMESTAMPTZ`, default: `NOW()`)

---

### 3.3. Tabela `customers` (Clientes & CRM)
Registros de clientes atendidos pelo estabelecimento com histórico e métricas acumuladas.

* **TypeScript Interface:** `Customer` (`src/types/index.ts`)
* **Colunas:**
  * `id` (`UUID`, PK, default: `gen_random_uuid()`)
  * `tenant_id` (`UUID`, NOT NULL, FK: `tenants(id)` ON DELETE CASCADE)
  * `name` (`TEXT`, NOT NULL): Nome do cliente.
  * `email` (`TEXT`): E-mail opcional.
  * `phone` (`TEXT`, NOT NULL): WhatsApp para lembretes e confirmações.
  * `birth_date` (`DATE`): Data de nascimento para campanhas de aniversário.
  * `notes` (`TEXT`): Observações de preferências (ex: "Prefere café sem açúcar, alérgico a amônia").
  * `total_spent` (`NUMERIC(10,2)`, NOT NULL, default: `0.00`): Total gasto acumulado (calculado automaticamente via trigger).
  * `appointments_count` (`INTEGER`, NOT NULL, default: `0`): Total de atendimentos concluídos.
  * `last_visit_at` (`DATE`): Data da última visita presencial.
  * `is_vip` (`BOOLEAN`, NOT NULL, default: `false`): Marcador de cliente de alto valor.
  * `created_at` (`TIMESTAMPTZ`, default: `NOW()`)
  * `updated_at` (`TIMESTAMPTZ`, default: `NOW()`)

---

### 3.4. Tabela `services` (Catálogo de Serviços)
Procedimentos e serviços ofertados na agenda.

* **TypeScript Interface:** `Service` (`src/types/index.ts`)
* **Colunas:**
  * `id` (`UUID`, PK, default: `gen_random_uuid()`)
  * `tenant_id` (`UUID`, NOT NULL, FK: `tenants(id)` ON DELETE CASCADE)
  * `name` (`TEXT`, NOT NULL): Nome do serviço (ex: "Corte Feminino & Escova").
  * `description` (`TEXT`): Descrição detalhada do procedimento.
  * `category` (`TEXT`, NOT NULL): Categoria ("Cabelo", "Barbearia", "Unhas", "Estética Facial", "Corporal").
  * `price` (`NUMERIC(10,2)`, NOT NULL): Valor em reais.
  * `duration_minutes` (`INTEGER`, NOT NULL): Duração do atendimento em minutos (ex: 30, 45, 60, 120).
  * `color` (`TEXT`, default: `'#6366f1'`): Cor de identificação visual nos blocos da agenda.
  * `is_active` (`BOOLEAN`, NOT NULL, default: `true`): Permite ocultar sem excluir histórico.
  * `created_at` (`TIMESTAMPTZ`, default: `NOW()`)
  * `updated_at` (`TIMESTAMPTZ`, default: `NOW()`)

---

### 3.5. Tabela `professionals` (Profissionais & Especialistas)
Colaboradores que realizam os atendimentos na agenda.

* **TypeScript Interface:** `Professional` (`src/types/index.ts`)
* **Colunas:**
  * `id` (`UUID`, PK, default: `gen_random_uuid()`)
  * `tenant_id` (`UUID`, NOT NULL, FK: `tenants(id)` ON DELETE CASCADE)
  * `user_id` (`UUID`, NULLABLE, FK: `auth.users(id)` ON DELETE SET NULL): Caso o profissional tenha login no sistema.
  * `name` (`TEXT`, NOT NULL): Nome do profissional.
  * `email` (`TEXT`): E-mail de contato.
  * `phone` (`TEXT`): WhatsApp.
  * `avatar_url` (`TEXT`): Foto de rosto.
  * `role` (`TEXT`, NOT NULL): Cargo/Título (ex: "Master Stylist", "Barbeiro", "Nail Designer").
  * `specialties` (`TEXT[]`, NOT NULL, default: `'{}'`): Lista de especialidades (ex: `['Corte', 'Coloração']`).
  * `commission_percentage` (`NUMERIC(5,2)`, NOT NULL, default: `0.00`): Percentual de comissão (ex: 45.00).
  * `color` (`TEXT`, default: `'#6366f1'`): Cor do profissional na visualização por colunas na agenda.
  * `is_active` (`BOOLEAN`, NOT NULL, default: `true`)
  * `working_hours` (`JSONB`, NOT NULL, default: `'{"start":"09:00","end":"19:00","days_of_week":[1,2,3,4,5,6]}'"`): Escala de horários e dias de trabalho semanais.
  * `created_at` (`TIMESTAMPTZ`, default: `NOW()`)
  * `updated_at` (`TIMESTAMPTZ`, default: `NOW()`)

---

### 3.6. Tabela `appointments` (Agendamentos da Agenda)
Entidade central do sistema, conectando cliente, serviço, profissional e horário.

* **TypeScript Interface:** `Appointment` (`src/types/index.ts`)
* **Colunas:**
  * `id` (`UUID`, PK, default: `gen_random_uuid()`)
  * `tenant_id` (`UUID`, NOT NULL, FK: `tenants(id)` ON DELETE CASCADE)
  * `customer_id` (`UUID`, NOT NULL, FK: `customers(id)`)
  * `customer_name` (`TEXT`, NOT NULL): Desnormalizado para agilidade e renderização offline.
  * `customer_phone` (`TEXT`, NOT NULL): Desnormalizado para disparo rápido de WhatsApp.
  * `service_id` (`UUID`, NOT NULL, FK: `services(id)`)
  * `service_name` (`TEXT`, NOT NULL): Desnormalizado para histórico de preços futuros.
  * `service_price` (`NUMERIC(10,2)`, NOT NULL)
  * `professional_id` (`UUID`, NOT NULL, FK: `professionals(id)`)
  * `professional_name` (`TEXT`, NOT NULL)
  * `date` (`DATE`, NOT NULL): Formato `YYYY-MM-DD`.
  * `start_time` (`TIME`, NOT NULL): Formato `HH:mm:ss`.
  * `end_time` (`TIME`, NOT NULL): Formato `HH:mm:ss`.
  * `duration_minutes` (`INTEGER`, NOT NULL): Duração do serviço.
  * `status` (`TEXT`, NOT NULL, default: `'pending'`, CHECK: `'pending'`, `'confirmed'`, `'completed'`, `'cancelled'`)
  * `notes` (`TEXT`): Notas e orientações adicionais.
  * `payment_method` (`TEXT`, default: `'unpaid'`, CHECK: `'pix'`, `'credit_card'`, `'debit_card'`, `'cash'`, `'unpaid'`)
  * `total_price` (`NUMERIC(10,2)`, NOT NULL): Valor final cobrado.
  * `created_at` (`TIMESTAMPTZ`, default: `NOW()`)
  * `updated_at` (`TIMESTAMPTZ`, default: `NOW()`)

---

### 3.7. Módulo WhatsApp: Tabelas de Automação & Logs

#### A. `whatsapp_connections`
* **TypeScript Interface:** `WhatsAppConnectionInfo`
* Registra o status da instância conectada via QR Code (Evolution API, Z-API ou Meta Cloud).
* Colunas: `id`, `tenant_id`, `status` (`'connected'`, `'disconnected'`, `'connecting'`), `phone_number`, `instance_name`, `battery_level`, `last_sync_at`, `total_sent_this_month`, `confirmation_rate`, `created_at`, `updated_at`.

#### B. `whatsapp_templates`
* **TypeScript Interface:** `WhatsAppTemplate`
* Mensagens padronizadas com interpolação de variáveis (`{cliente_nome}`, `{data}`, `{horario}`, `{servico}`, `{profissional}`, `{empresa}`).
* Colunas: `id`, `tenant_id`, `name`, `category` (`'confirmation'`, `'reminder'`, `'feedback'`, `'recovery'`, `'custom'`), `content`, `variables` (`TEXT[]`), `is_active`, `created_at`, `updated_at`.

#### C. `whatsapp_reminder_rules`
* **TypeScript Interface:** `WhatsAppReminderRule`
* Regras ativas de gatilho (`booking_created`, `before_24h`, `before_2h`, `after_service`, `inactive_30d`).
* Colunas: `id`, `tenant_id`, `title`, `description`, `trigger`, `is_active`, `template_id` (FK: `whatsapp_templates`), `timing_description`, `icon_name`, `created_at`, `updated_at`.

#### D. `whatsapp_message_logs`
* **TypeScript Interface:** `WhatsAppMessageLog`
* Auditoria e histórico de envios e status de entrega.
* Colunas: `id`, `tenant_id`, `customer_name`, `customer_phone`, `appointment_id` (FK opcional: `appointments`), `template_name`, `message`, `status` (`'pending'`, `'sent'`, `'delivered'`, `'read'`, `'failed'`), `sent_at`, `failure_reason`, `created_at`.

---

### 3.8. Módulo Assistente de IA: Tabelas de Conversa

#### A. `ai_conversations`
* Histórico de sessões do assistente inteligente.
* Colunas: `id`, `tenant_id`, `user_id` (FK: `auth.users`), `title`, `created_at`, `updated_at`.

#### B. `ai_messages`
* Mensagens trocadas no chat do assistente (modelo Groq Llama 3.3 70B).
* Colunas: `id`, `conversation_id` (FK: `ai_conversations`), `tenant_id`, `role` (`'user'`, `'assistant'`, `'system'`), `content`, `created_at`.

---

## 4. Triggers e Funções no Banco (Automações em PostgreSQL)

Para garantir integridade dos dados e evitar lógica duplicada no frontend, o banco de dados executa automaticamente:

1. **Trigger de Atualização de Timestamp (`update_updated_at_column`)**:
   Atualiza `updated_at = NOW()` em todas as alterações de linhas nas tabelas principais.

2. **Trigger de Atualização Automática de Clientes (`trg_on_appointment_status_change`)**:
   Quando um agendamento passa para o status `'completed'`:
   * Incrementa o `customers.appointments_count = appointments_count + 1`.
   * Soma o `customers.total_spent = total_spent + NEW.total_price`.
   * Atualiza o `customers.last_visit_at = NEW.date`.
   * Promove automaticamente a `customers.is_vip = true` se `total_spent >= 1000` ou `appointments_count >= 5`.

3. **Função de KPIs do Dashboard (`get_dashboard_kpis(p_tenant_id UUID, p_date DATE)`)**:
   Retorna em milissegundos o resumo consolidado que alimenta o topo da tela `Dashboard.tsx`:
   * `todayRevenue` (soma de `total_price` dos serviços não cancelados de hoje)
   * `todayAppointmentsCount` (total de agendamentos de hoje)
   * `todayPendingCount` (status 'pending')
   * `todayCompletedCount` (status 'completed')
   * `newCustomersThisMonth` (novos cadastros de clientes no mês corrente)
   * `occupancyRate` (percentual de ocupação baseado na capacidade operacional calculada)

4. **Função de Cadastro de Novo Tenant + Usuário (`handle_new_user`)**:
   Conectada ao hook de criação de conta do `auth.users`, criando automaticamente o `tenant` e o `profile` do proprietário (`owner`).

---

## 5. Políticas de Segurança RLS (Row Level Security)

Todas as tabelas possuem **Row Level Security Habilitado (`ENABLE ROW LEVEL SECURITY`)**. As políticas garantem que nenhum tenant visualize, edite ou exclua dados de outro.

* **Função Auxiliar `get_user_tenant_id()`**:
  ```sql
  CREATE OR REPLACE FUNCTION get_user_tenant_id()
  RETURNS UUID AS $$
    SELECT tenant_id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
  $$ LANGUAGE sql STABLE SECURITY DEFINER;
  ```
* **Regra Universal de Isolamento**:
  ```sql
  CREATE POLICY "tenant_isolation_policy" ON public.{tabela}
  FOR ALL TO authenticated
  USING (tenant_id = get_user_tenant_id())
  WITH CHECK (tenant_id = get_user_tenant_id());
  ```

---

## 6. Mapeamento de Edge Functions & Serviços Externos

| Edge Function | Gatilho / Chamada | Responsabilidade |
| :--- | :--- | :--- |
| `whatsapp-webhook` | Webhook HTTP POST da API do WhatsApp | Recebe confirmações do cliente (`1` para Confirmar, `2` para Remarcar), atualiza o status do agendamento para `'confirmed'` e atualiza o log de mensagens para `'read'`. |
| `send-whatsapp-message` | Evento no PostgREST ou chamada da UI | Dispara mensagens individuais ou em lote e registra na tabela `whatsapp_message_logs`. |
| `cron-reminders` | Cron diário / horário (pg_cron) | Busca agendamentos do dia seguinte e dispara lembretes de 24h; busca agendamentos das próximas 2h e dispara alertas rápidos. |
| `ai-chat` | Endpoint chamado por `AIChatDrawer.tsx` | Recebe as mensagens do usuário, monta o prompt do sistema com dados em tempo real da empresa (faturamento, horários livres) e consulta o modelo Groq `llama-3.3-70b-versatile`. |

---

## 7. Como Executar a Migração no Supabase

1. Abra seu painel no [Supabase Console](https://supabase.com/dashboard).
2. Selecione seu projeto e acesse o menu lateral **SQL Editor**.
3. Crie uma nova query (`New Query`).
4. Abra o arquivo `supabase_schema.sql` gerado na raiz deste repositório, copie todo o conteúdo e cole no editor.
5. Clique em **Run** (Executar).
6. Todas as tabelas, tipos, funções, triggers, políticas de RLS e dados de teste (Seed) serão criados e validados com sucesso!

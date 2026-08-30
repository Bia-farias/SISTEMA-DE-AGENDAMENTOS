# Arquitetura — 03 — Estrutura do Projeto

---

## 1. Estrutura Completa de Diretórios

```
ngb-agenda-ia/
│
├── public/                          # Assets estáticos
│   ├── favicon.ico
│   ├── logo.png
│   └── manifest.json               # PWA manifest
│
├── api/                             # Vercel Serverless Functions
│   ├── ai.js                        # Endpoint principal da IA
│   └── ai-create-appointment.js     # Endpoint criação de agendamento via IA
│
├── src/
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── ui/                      # Componentes base (design system)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── layout/                  # Componentes de layout
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── AppLayout.jsx        # Layout principal autenticado
│   │   │   └── AuthLayout.jsx       # Layout para telas de auth
│   │   │
│   │   ├── dashboard/              # Componentes do dashboard
│   │   │   ├── KPICard.jsx
│   │   │   ├── AgendaDoDia.jsx
│   │   │   ├── GraficoFaturamento.jsx
│   │   │   └── ServicosPopulares.jsx
│   │   │
│   │   ├── agenda/                 # Componentes da agenda
│   │   │   ├── CalendarioSemanal.jsx
│   │   │   ├── AgendamentoCard.jsx
│   │   │   ├── NovoAgendamentoModal.jsx
│   │   │   └── FiltrosAgenda.jsx
│   │   │
│   │   ├── customers/              # Componentes de clientes
│   │   │   ├── ClienteCard.jsx
│   │   │   ├── ClienteForm.jsx
│   │   │   └── HistoricoCliente.jsx
│   │   │
│   │   ├── professionals/          # Componentes de profissionais
│   │   │   ├── ProfissionalCard.jsx
│   │   │   ├── ProfissionalForm.jsx
│   │   │   └── HorarioTrabalho.jsx
│   │   │
│   │   ├── financial/              # Componentes financeiros
│   │   │   ├── TransacaoCard.jsx
│   │   │   ├── DashboardFinanceiro.jsx
│   │   │   └── FiltrosPeriodo.jsx
│   │   │
│   │   └── ai/                     # Componentes da IA
│   │       ├── ChatIA.jsx
│   │       ├── MensagemIA.jsx
│   │       ├── MensagemUsuario.jsx
│   │       ├── SugestoesRapidas.jsx
│   │       └── InputChat.jsx
│   │
│   ├── pages/                      # Páginas da aplicação
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   │
│   │   ├── Dashboard.jsx
│   │   ├── Agenda.jsx
│   │   ├── Clientes.jsx
│   │   ├── ClienteDetalhe.jsx
│   │   ├── Profissionais.jsx
│   │   ├── Servicos.jsx
│   │   ├── Financeiro.jsx
│   │   ├── WhatsApp.jsx
│   │   ├── AIAssistant.jsx
│   │   └── Configuracoes.jsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.js              # Hook de autenticação
│   │   ├── useTenant.js            # Hook do tenant atual
│   │   ├── useAgendamentos.js      # Hook de agendamentos
│   │   ├── useClientes.js          # Hook de clientes
│   │   ├── useProfissionais.js     # Hook de profissionais
│   │   ├── useServicos.js          # Hook de serviços
│   │   ├── useFinanceiro.js        # Hook financeiro
│   │   └── useIA.js                # Hook da IA
│   │
│   ├── services/                   # Camada de acesso a dados
│   │   ├── supabase.js             # Instância configurada do Supabase
│   │   ├── auth.service.js         # Funções de autenticação
│   │   ├── tenants.service.js      # Funções de tenant/empresa
│   │   ├── appointments.service.js # Funções de agendamento
│   │   ├── customers.service.js    # Funções de clientes
│   │   ├── professionals.service.js # Funções de profissionais
│   │   ├── services.service.js     # Funções de serviços
│   │   ├── financial.service.js    # Funções financeiras
│   │   ├── whatsapp.service.js     # Funções de WhatsApp
│   │   └── ai.service.js           # Funções de chamada à IA
│   │
│   ├── stores/                     # Zustand stores
│   │   ├── authStore.js            # Estado de autenticação
│   │   ├── tenantStore.js          # Estado do tenant
│   │   └── uiStore.js              # Estado da UI (modais, toasts)
│   │
│   ├── contexts/                   # React Contexts
│   │   └── ThemeContext.jsx        # Contexto de tema (dark/light)
│   │
│   ├── utils/                      # Funções utilitárias
│   │   ├── formatters.js           # Formatação de datas, moedas
│   │   ├── validators.js           # Validações de formulário
│   │   ├── dateHelpers.js          # Utilitários de data (date-fns)
│   │   └── cn.js                   # Utilitário clsx para classNames
│   │
│   ├── constants/                  # Constantes da aplicação
│   │   ├── routes.js               # Nomes das rotas
│   │   ├── roles.js                # Definição de roles
│   │   └── status.js               # Status de agendamentos e transações
│   │
│   ├── styles/
│   │   └── index.css               # Estilos globais + Tailwind
│   │
│   ├── App.jsx                     # Componente raiz + rotas
│   └── main.jsx                    # Entry point
│
├── .env.local                      # Variáveis de ambiente locais (git ignored)
├── .env.example                    # Exemplo de variáveis (versionado)
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 2. Vercel Functions — Estrutura `/api`

```
api/
│
├── ai.js                    # POST /api/ai — Chat com a IA
└── ai-create-appointment.js # POST /api/ai/create-appointment — Criar agendamento via IA
```

### Exemplo: `/api/ai.js`

```js
import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages, userToken } = req.body

  // 1. Verificar token do usuário
  const { data: { user }, error } = await supabase.auth.getUser(userToken)
  if (error || !user) return res.status(401).json({ error: 'Não autorizado' })

  // 2. Buscar tenant do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('user_id', user.id)
    .single()

  // 3. Buscar contexto do tenant
  // ... busca agendamentos, clientes, etc.

  // 4. Chamar Groq com contexto
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [systemMessage, ...messages]
  })

  return res.json({ response: completion.choices[0].message })
}
```

---

## 3. Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Componentes React | PascalCase | `ClienteCard.jsx` |
| Hooks | camelCase com prefixo `use` | `useAgendamentos.js` |
| Services | camelCase com sufixo `.service` | `appointments.service.js` |
| Stores | camelCase com sufixo `Store` | `authStore.js` |
| Utilitários | camelCase | `formatters.js` |
| Constantes | SCREAMING_SNAKE_CASE | `ROLES.OWNER` |
| Variáveis CSS | kebab-case | `--color-primary` |

---

*Próximo: [`04-FLUXO-DE-DADOS.md`](./04-FLUXO-DE-DADOS.md)*

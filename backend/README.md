# 🚀 Agenda AI — Backend API

API REST construída em **Node.js**, **TypeScript**, **Express**, **Prisma ORM**, **PostgreSQL**, **JWT** e **Zod**.

---

## 📁 Estrutura de Diretórios

```
backend/
├── prisma/
│   ├── schema.prisma                 # Schema multi-tenant completo
│   └── migrations/                   # Histórico de migrations SQL
├── src/
│   ├── config/
│   │   └── env.ts                    # Validação de variáveis de ambiente com Zod
│   ├── controllers/
│   │   ├── authController.ts         # Handlers de registro, login e /me
│   │   └── healthController.ts       # Status e integridade da API
│   ├── database/
│   │   └── prisma.ts                 # Instância e conexão do Prisma Client
│   ├── middlewares/
│   │   ├── authMiddleware.ts         # Validação e injeção do JWT no req.user
│   │   ├── rbacMiddleware.ts         # Controle de permissões baseado em papéis
│   │   ├── errorMiddleware.ts        # Handler global de erros
│   │   └── validateMiddleware.ts     # Validação automática com Zod
│   ├── routes/
│   │   ├── authRoutes.ts             # POST /register, POST /login, GET /me
│   │   ├── healthRoutes.ts           # GET /health
│   │   └── index.ts                  # Agregador de rotas
│   ├── schemas/
│   │   └── authSchema.ts             # Schemas Zod de entrada
│   ├── services/
│   │   └── authService.ts            # Lógica de negócio, hash bcrypt e transações
│   ├── utils/
│   │   ├── appError.ts               # Erros operacionais customizados
│   │   ├── jwt.ts                    # Geração e decodificação de JWT
│   │   ├── password.ts               # Hash e comparação bcrypt
│   │   └── response.ts               # Padronização de respostas JSON
│   ├── tests/
│   │   └── testPhase1.ts             # Suíte de testes automatizados da Fase 1
│   ├── app.ts                        # Configuração do Express e CORS
│   └── server.ts                     # Ponto de entrada do servidor HTTP
├── .env                              # Variáveis ativas
├── .env.example                      # Modelo de variáveis
├── package.json
└── tsconfig.json
```

---

## 🛠️ Como Executar

### 1. Instalar Dependências
```bash
cd backend
npm install
```

### 2. Configurar o `.env`
Preencha a URL de conexão com seu PostgreSQL no arquivo `.env`:
```env
PORT=3001
DATABASE_URL="postgresql://postgres:[SENHA]@db.wbvnifdtozhgwaclldac.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="sua_chave_jwt_super_secreta"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:5173"
```

### 3. Gerar o Cliente Prisma
```bash
npm run prisma:generate
```

### 4. Executar os Testes da Fase 1
```bash
npm test
```

### 5. Iniciar em Modo de Desenvolvimento
```bash
npm run dev
```
Servidor disponível em: `http://localhost:3001`

---

## 🛡️ Endpoints Implementados (Fase 1)

* `GET /api/health` — Status da API e teste de conexão do banco de dados
* `POST /api/auth/register` — Criação atômica do Tenant e Usuário Proprietário (OWNER)
* `POST /api/auth/login` — Autenticação por e-mail e senha, geração de JWT
* `GET /api/auth/me` — Consulta dos dados do usuário autenticado e seu Tenant

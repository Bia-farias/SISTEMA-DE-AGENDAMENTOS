# Deploy — 01 — Configuração do Ambiente Local

---

## 1. Pré-requisitos de Desenvolvimento

Para rodar o **NGB Agenda IA** localmente, é necessário ter instalado na máquina:

- **Node.js** (versão 18.x ou 20.x LTS)
- **npm** (versão 9+ ou pnpm/yarn)
- **Git**
- **Vercel CLI** (opcional, para emulação de serverless functions locais)

---

## 2. Passo a Passo de Instalação

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/ngb-agenda-ia.git
cd ngb-agenda-ia
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Copie o arquivo de exemplo para o arquivo local:

```bash
cp .env.example .env.local
```

Abra o `.env.local` e preencha com a URL e Anon Key do seu projeto Supabase.

### Passo 4: Iniciar o Servidor de Desenvolvimento

Para rodar apenas o frontend Vite:

```bash
npm run dev
```

A aplicação estará acessível em: `http://localhost:5173`

Para rodar com as **Vercel Functions locais** (testando a IA localmente):

```bash
npx vercel dev
```

A aplicação completa + APIs estará acessível em: `http://localhost:3000`

---

## 3. Scripts Disponíveis no `package.json`

| Comando | Função |
|---------|--------|
| `npm run dev` | Inicia servidor de desenvolvimento Vite |
| `npm run build` | Compila o bundle otimizado para produção na pasta `dist` |
| `npm run preview`| Executa build de pré-visualização localmente |
| `npm run lint` | Executa o linter para checagem de código |

---

*Próximo: [`02-SUPABASE.md`](./02-SUPABASE.md)*

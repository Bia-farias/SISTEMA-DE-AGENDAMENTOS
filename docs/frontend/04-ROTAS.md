# Frontend — 04 — Roteamento e Navegação

---

## 1. Biblioteca e Estrutura

O roteamento é implementado utilizando **React Router DOM v6** com layout wrappers protegidos e lazy loading por rota para otimizar o tempo de carregamento inicial (bundle splitting).

---

## 2. Tabela de Rotas

| Rota | Componente | Acesso | Descrição |
|------|------------|--------|-----------|
| `/login` | `Login.jsx` | Público | Autenticação de usuários existentes |
| `/register` | `Register.jsx` | Público | Cadastro de novo usuário e empresa (onboarding) |
| `/forgot-password` | `ForgotPassword.jsx`| Público | Solicitação de reset de senha por e-mail |
| `/dashboard` | `Dashboard.jsx` | Autenticado | Visão executiva, KPIs e agenda do dia |
| `/agenda` | `Agenda.jsx` | Autenticado | Calendário de agendamentos e controle |
| `/clientes` | `Clientes.jsx` | Autenticado | Listagem e gestão de clientes |
| `/clientes/:id` | `ClienteDetalhe.jsx` | Autenticado | Perfil do cliente e histórico |
| `/profissionais` | `Profissionais.jsx` | Autenticado | Gestão da equipe e horários |
| `/servicos` | `Servicos.jsx` | Autenticado | Catálogo de serviços e preços |
| `/financeiro` | `Financeiro.jsx` | Admin/Owner | Controle financeiro e faturamento |
| `/whatsapp` | `WhatsApp.jsx` | Autenticado | Templates e disparos via WhatsApp |
| `/ia` | `AIAssistant.jsx` | Autenticado | Assistente IA de gestão |
| `/configuracoes` | `Configuracoes.jsx` | Owner | Dados da empresa e plano |

---

## 3. Implementação de Rotas (`App.jsx`)

```jsx
// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import { AppLayout } from './components/layout/AppLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Páginas (Lazy Loading)
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Agenda = React.lazy(() => import('./pages/Agenda'));
const Clientes = React.lazy(() => import('./pages/Clientes'));
const Profissionais = React.lazy(() => import('./pages/Profissionais'));
const Servicos = React.lazy(() => import('./pages/Servicos'));
const Financeiro = React.lazy(() => import('./pages/Financeiro'));
const WhatsApp = React.lazy(() => import('./pages/WhatsApp'));
const AIAssistant = React.lazy(() => import('./pages/AIAssistant'));

export default function App() {
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className="p-8 text-center text-zinc-400">Carregando...</div>}>
        <Routes>
          {/* Rotas Públicas */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Rotas Autenticadas */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/profissionais" element={<Profissionais />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
            <Route path="/ia" element={<AIAssistant />} />
          </Route>

          {/* Redirecionamento Padrão */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
```

---

*Próximo: [`05-UI-UX.md`](./05-UI-UX.md)*

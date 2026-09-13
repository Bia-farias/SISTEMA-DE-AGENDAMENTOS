import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Mail, Lock, ArrowRight, Sparkles, UserCheck, Shield } from 'lucide-react';
import { UserRole } from '../../types';

export default function Login() {
  const navigate = useNavigate();
  const { login, quickLogin } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState('admin@agendaai.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({
        type: 'error',
        title: 'Preencha os campos',
        message: 'Informe seu e-mail e senha para continuar.',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      await login(email);
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Bem-vindo de volta!',
        message: 'Acesso realizado com sucesso.',
      });
      navigate('/dashboard');
    }, 600);
  };

  const handleDemoLogin = (role: UserRole) => {
    quickLogin(role);
    addToast({
      type: 'success',
      title: 'Acesso Demo Ativado',
      message: `Conectado como ${role.toUpperCase()}.`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Acesse sua conta
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Entre com suas credenciais ou experimente os acessos rápidos abaixo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu.email@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={16} />}
          required
        />

        <div className="space-y-1">
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
            required
          />
          <div className="flex justify-end pt-1">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full shadow-lg shadow-indigo-500/25"
          isLoading={isLoading}
          rightIcon={<ArrowRight size={16} />}
        >
          Entrar na Plataforma
        </Button>
      </form>

      {/* Quick Demo Access Bar */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={14} className="text-indigo-500" />
          Acesso Rápido de Demonstração
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('owner')}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 transition-all text-left group"
          >
            <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block">
              Dono / Admin
            </span>
            <span className="text-[10px] text-zinc-400">Acesso total</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('professional')}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 transition-all text-left group"
          >
            <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block">
              Profissional
            </span>
            <span className="text-[10px] text-zinc-400">Minha escala</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('receptionist')}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 transition-all text-left group"
          >
            <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block">
              Recepção
            </span>
            <span className="text-[10px] text-zinc-400">Agendamentos</span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Não possui uma conta?{' '}
        <Link
          to="/register"
          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Cadastre seu estabelecimento
        </Link>
      </div>
    </div>
  );
}

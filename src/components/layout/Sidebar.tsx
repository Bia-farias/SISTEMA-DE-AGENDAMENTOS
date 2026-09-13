import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  UserCheck,
  DollarSign,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { useAIChatStore } from '../../stores/aiChatStore';
import { cn } from '../../utils/cn';

export function Sidebar() {
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar, addToast } = useUIStore();
  const { tenant, profile, logout } = useAuthStore();
  const { openChat } = useAIChatStore();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Agenda', path: '/agenda', icon: Calendar },
    { label: 'Clientes', path: '/clientes', icon: Users },
    { label: 'Serviços', path: '/servicos', icon: Scissors },
    { label: 'Profissionais', path: '/profissionais', icon: UserCheck },
    {
      label: 'Financeiro',
      path: '#financeiro',
      icon: DollarSign,
      badge: 'Em breve',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        addToast({
          type: 'info',
          title: 'Módulo Financeiro',
          message: 'Relatórios detalhados de caixa e DRE em desenvolvimento para o próximo update.',
        });
      },
    },
    { label: 'WhatsApp', path: '/whatsapp', icon: MessageSquare },
    {
      label: 'Assistente IA',
      path: '#ia',
      icon: Sparkles,
      highlight: true,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openChat();
      },
    },
  ];

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-[#101014]/95 backdrop-blur-md transition-all duration-300 z-30 shrink-0 select-none relative',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/25 shrink-0">
            A
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                Agenda AI
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  PRO
                </span>
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-[130px]">
                {tenant?.name || 'Meu Estabelecimento'}
              </span>
            </div>
          )}
        </NavLink>

        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="w-7 h-7 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors"
          title={isSidebarOpen ? 'Recolher Menu' : 'Expandir Menu'}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={item.onClick}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group relative',
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                  : item.highlight
                  ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              )}
            >
              <Icon
                size={20}
                className={cn(
                  'shrink-0 transition-transform group-hover:scale-110',
                  isActive ? 'text-white' : item.highlight ? 'text-indigo-500' : 'text-zinc-500 dark:text-zinc-400'
                )}
              />
              {isSidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span className="truncate">{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                      IA
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer User Profile & Logout */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className={cn('flex items-center gap-3', !isSidebarOpen && 'justify-center')}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
            {profile?.full_name?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {profile?.full_name || 'Administrador'}
              </p>
              <p className="text-[10px] text-zinc-400 capitalize truncate">
                {profile?.role === 'owner' ? 'Proprietário' : profile?.role || 'Admin'}
              </p>
            </div>
          )}
          {isSidebarOpen && (
            <button
              onClick={logout}
              title="Sair da Conta"
              className="p-1.5 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

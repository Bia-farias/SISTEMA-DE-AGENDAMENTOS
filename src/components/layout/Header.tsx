import React, { useState } from 'react';
import {
  Bell,
  Sun,
  Moon,
  Plus,
  Search,
  Sparkles,
  Calendar,
  UserPlus,
  CheckCircle2,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useCustomerStore } from '../../stores/customerStore';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';

export function Header() {
  const { tenant, profile, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { openNewAppointmentDrawer } = useAppointmentStore();
  const { openNewCustomerDrawer } = useCustomerStore();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'Novo Agendamento Confirmado',
      description: 'Juliana Mendes confirmou Corte + Escova às 09:00.',
      time: 'Há 10 minutos',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Lembrete de Retorno',
      description: 'Larissa Vasconcelos completou 20 dias da última sessão de unhas.',
      time: 'Há 1 hora',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Meta Diária Atingida! 🎯',
      description: 'O faturamento de hoje ultrapassou R$ 1.000,00.',
      time: 'Há 3 horas',
      unread: false,
    },
  ];

  return (
    <>
      <header className="h-16 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0e0e11]/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left Side: Mobile Logo & Global Search / Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
            <span className="font-extrabold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
              Agenda AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-xs text-zinc-400 w-64 lg:w-80">
            <Search size={14} className="shrink-0" />
            <span className="truncate">Buscar clientes, horários ou serviços...</span>
            <kbd className="hidden lg:inline-block ml-auto text-[10px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-mono">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right Side: Actions, Notifications, Theme Toggle, Profile */}
        <div className="flex items-center gap-2.5">
          {/* Quick Action Button: New Appointment */}
          <Button
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() => openNewAppointmentDrawer()}
            className="hidden sm:inline-flex shadow-sm shadow-indigo-500/20"
          >
            Novo Agendamento
          </Button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
            title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
            title="Notificações"
            aria-label="Notificações"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-zinc-900" />
          </button>

          {/* User Avatar Menu Trigger */}
          <div className="relative pl-1 border-l border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {profile?.full_name?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="hidden xl:block text-left text-xs pr-1">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                  {profile?.full_name || 'Admin'}
                </p>
                <p className="text-[10px] text-zinc-400">{tenant?.name || 'Studio'}</p>
              </div>
            </button>

            {/* Quick Menu Dropdown */}
            {isQuickMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsQuickMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-50 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{profile?.full_name}</p>
                    <p className="text-zinc-400 text-[11px] truncate">{profile?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsQuickMenuOpen(false);
                        openNewAppointmentDrawer();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                    >
                      <Calendar size={14} className="text-indigo-500" />
                      Agendar Horário
                    </button>
                    <button
                      onClick={() => {
                        setIsQuickMenuOpen(false);
                        openNewCustomerDrawer();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                    >
                      <UserPlus size={14} className="text-emerald-500" />
                      Cadastrar Cliente
                    </button>
                  </div>
                  <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => {
                        setIsQuickMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium"
                    >
                      Sair da Conta
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Notifications Slide-Over Drawer */}
      <Drawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <Bell size={18} className="text-indigo-500" />
            Notificações Recentes
          </span>
        }
        description="Fique por dentro das atualizações da sua agenda e clientes"
        size="sm"
      >
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all ${
                n.unread
                  ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-200/60 dark:border-indigo-500/20'
                  : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                  {n.title}
                </h4>
                {n.unread && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1" />
                )}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                {n.description}
              </p>
              <span className="text-[10px] text-zinc-400 mt-2 block font-medium">
                {n.time}
              </span>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
}

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  Plus,
} from 'lucide-react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { cn } from '../../utils/cn';

export function MobileBottomNav() {
  const { openNewAppointmentDrawer } = useAppointmentStore();

  const navItems = [
    { label: 'Início', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Agenda', path: '/agenda', icon: Calendar },
    { label: 'Clientes', path: '/clientes', icon: Users },
    { label: 'Serviços', path: '/servicos', icon: Scissors },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#101014]/95 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800/80 px-3 py-2 flex items-center justify-around">
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-3 rounded-xl transition-colors',
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-zinc-500 dark:text-zinc-400'
              )
            }
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}

      {/* Floating Center Plus Action */}
      <button
        onClick={() => openNewAppointmentDrawer()}
        className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 -mt-5 border-4 border-zinc-50 dark:border-[#09090b] active:scale-95 transition-transform"
        aria-label="Novo Agendamento"
      >
        <Plus size={22} />
      </button>

      {navItems.slice(2, 4).map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-3 rounded-xl transition-colors',
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-zinc-500 dark:text-zinc-400'
              )
            }
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

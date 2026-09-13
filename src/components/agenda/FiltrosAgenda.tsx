import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  Plus,
} from 'lucide-react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useProfessionalStore } from '../../stores/professionalStore';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { formatDate } from '../../utils/format';
import { AppointmentStatus } from '../../types';

export function FiltrosAgenda({
  viewMode,
  setViewMode,
  currentWeekStart,
  onPrevWeek,
  onNextWeek,
  onToday,
}: {
  viewMode: 'week' | 'day';
  setViewMode: (mode: 'week' | 'day') => void;
  currentWeekStart: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}) {
  const {
    selectedProfessionalId,
    setSelectedProfessionalId,
    selectedStatus,
    setSelectedStatus,
    openNewAppointmentDrawer,
  } = useAppointmentStore();

  const { professionals } = useProfessionalStore();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
      {/* Date Navigation */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <Button variant="outline" size="sm" onClick={onToday}>
          Hoje
        </Button>
        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 p-0.5">
          <button
            onClick={onPrevWeek}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
            title="Semana Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNextWeek}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
            title="Próxima Semana"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
          <CalendarIcon size={16} className="text-violet-500" />
          {formatDate(currentWeekStart.toISOString().split('T')[0])}
        </span>
      </div>

      {/* Center / Right: Filters & View Switcher */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Professional Filter */}
        <div className="w-44 sm:w-52">
          <select
            value={selectedProfessionalId}
            onChange={(e) => setSelectedProfessionalId(e.target.value)}
            className="w-full text-xs rounded-xl bg-white dark:bg-zinc-900 border border-violet-100 dark:border-zinc-800 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="all">Todos os Profissionais</option>
            {professionals
              .filter((p) => p.is_active)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-36">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as AppointmentStatus | 'all')}
            className="w-full text-xs rounded-xl bg-white dark:bg-zinc-900 border border-violet-100 dark:border-zinc-800 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="all">Todos os Status</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        {/* View Mode (Semana / Dia) */}
        <div className="flex items-center bg-violet-50/60 dark:bg-zinc-900 p-0.5 rounded-xl border border-violet-100 dark:border-zinc-800">
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'week'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'day'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Dia
          </button>
        </div>

        {/* New Appointment Button */}
        <Button
          size="sm"
          onClick={() => openNewAppointmentDrawer()}
          leftIcon={<Plus size={16} />}
          className="shadow-sm shadow-violet-400/20 ml-auto sm:ml-0"
        >
          Novo Horário
        </Button>
      </div>
    </div>
  );
}

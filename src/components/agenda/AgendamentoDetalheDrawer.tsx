import { useState } from 'react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Calendar,
  Clock,
  User,
  Scissors,
  DollarSign,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { formatCurrency, formatDate, formatPhone } from '../../utils/format';
import {
  createWhatsAppLink,
  generateAppointmentReminderMessage,
  generateAppointmentConfirmationMessage,
} from '../../services/whatsapp';
import { AppointmentStatus } from '../../types';

export function AgendamentoDetalheDrawer() {
  const { appointments, activeDrawer, closeDrawer, updateStatus, deleteAppointment } =
    useAppointmentStore();
  const { tenant } = useAuthStore();
  const { addToast } = useUIStore();

  const isOpen = activeDrawer.type === 'detail';
  const appointment = appointments.find((a) => a.id === activeDrawer.appointmentId);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  if (!appointment) return null;

  const statusVariant: Record<AppointmentStatus, 'warning' | 'success' | 'info' | 'danger'> = {
    pending: 'warning',
    confirmed: 'success',
    completed: 'info',
    cancelled: 'danger',
  };

  const statusLabels: Record<AppointmentStatus, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  };

  const handleStatusChange = (status: AppointmentStatus) => {
    updateStatus(appointment.id, status);
    addToast({
      type: 'success',
      title: 'Status Atualizado',
      message: `O agendamento agora está marcado como ${statusLabels[status]}.`,
    });
  };

  const handleWhatsAppReminder = () => {
    const message = generateAppointmentReminderMessage(
      appointment,
      tenant?.name || 'Studio Prime'
    );
    const link = createWhatsAppLink(appointment.customer_phone, message);
    window.open(link, '_blank');
  };

  const handleWhatsAppConfirmation = () => {
    const message = generateAppointmentConfirmationMessage(
      appointment,
      tenant?.name || 'Studio Prime'
    );
    const link = createWhatsAppLink(appointment.customer_phone, message);
    window.open(link, '_blank');
  };

  const handleDelete = () => {
    deleteAppointment(appointment.id);
    addToast({
      type: 'info',
      title: 'Agendamento Excluído',
      message: 'O horário foi removido da sua agenda.',
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      title={
        <div className="flex items-center gap-2">
          <span>Detalhes do Agendamento</span>
          <Badge variant={statusVariant[appointment.status]} dot>
            {statusLabels[appointment.status]}
          </Badge>
        </div>
      }
      description={`ID: #${appointment.id.substring(0, 8)}`}
      size="md"
      footer={
        <div className="flex items-center justify-between w-full">
          {!isConfirmingDelete ? (
            <button
              onClick={() => setIsConfirmingDelete(true)}
              className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1.5 font-medium p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 size={14} /> Excluir
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-600 font-bold">Confirmar?</span>
              <Button size="xs" variant="danger" onClick={handleDelete}>
                Sim
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() => setIsConfirmingDelete(false)}
              >
                Não
              </Button>
            </div>
          )}

          <Button variant="outline" size="sm" onClick={closeDrawer}>
            Fechar
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Customer Highlight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50/70 to-purple-50/30 dark:from-violet-950/20 dark:to-[#181424] border border-violet-100 dark:border-violet-900/30 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                Cliente
              </p>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-0.5">
                {appointment.customer_name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
                <Phone size={13} /> {formatPhone(appointment.customer_phone)}
              </p>
            </div>

            {/* Quick WhatsApp Action Button */}
            <button
              onClick={handleWhatsAppReminder}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105"
              title="Abrir conversa no WhatsApp"
            >
              <MessageCircle size={15} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-violet-50/20 dark:bg-[#181424] border border-violet-100/70 dark:border-violet-900/30 space-y-1">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <Calendar size={13} className="text-violet-500" />
              Data
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {formatDate(appointment.date)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50/20 dark:bg-[#181424] border border-violet-100/70 dark:border-violet-900/30 space-y-1">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <Clock size={13} className="text-violet-500" />
              Horário
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {appointment.start_time} às {appointment.end_time}{' '}
              <span className="text-xs font-normal text-zinc-400">
                ({appointment.duration_minutes} min)
              </span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50/20 dark:bg-[#181424] border border-violet-100/70 dark:border-violet-900/30 space-y-1">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <Scissors size={13} className="text-violet-500" />
              Serviço
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
              {appointment.service_name}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50/20 dark:bg-[#181424] border border-violet-100/70 dark:border-violet-900/30 space-y-1">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <User size={13} className="text-violet-500" />
              Profissional
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
              {appointment.professional_name}
            </p>
          </div>
        </div>

        {/* Financial & Price Card */}
        <div className="p-4 rounded-xl bg-violet-50/20 dark:bg-[#181424] border border-violet-100/70 dark:border-violet-900/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Valor do Atendimento</span>
            <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(appointment.total_price)}
            </span>
          </div>
          <Badge
            variant={
              appointment.payment_method === 'unpaid'
                ? 'warning'
                : 'success'
            }
          >
            {appointment.payment_method === 'unpaid'
              ? 'Pagamento Pendente'
              : `Pago via ${appointment.payment_method?.toUpperCase()}`}
          </Badge>
        </div>

        {/* Notes */}
        {appointment.notes && (
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Observações:
            </span>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {appointment.notes}
            </p>
          </div>
        )}

        {/* Status Action Buttons Bar */}
        <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
            Alterar Status do Atendimento
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant={appointment.status === 'confirmed' ? 'success' : 'outline'}
              onClick={() => handleStatusChange('confirmed')}
              leftIcon={<CheckCircle2 size={14} />}
            >
              Confirmar
            </Button>
            <Button
              size="sm"
              variant={appointment.status === 'completed' ? 'primary' : 'outline'}
              onClick={() => handleStatusChange('completed')}
              leftIcon={<CheckCircle2 size={14} />}
            >
              Concluir
            </Button>
            <Button
              size="sm"
              variant={appointment.status === 'pending' ? 'secondary' : 'outline'}
              onClick={() => handleStatusChange('pending')}
            >
              Pendente
            </Button>
            <Button
              size="sm"
              variant={appointment.status === 'cancelled' ? 'danger' : 'outline'}
              onClick={() => handleStatusChange('cancelled')}
              leftIcon={<XCircle size={14} />}
            >
              Cancelar
            </Button>
          </div>
        </div>

        {/* WhatsApp Automated Actions */}
        <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
            Mensagens Prontas de WhatsApp
          </span>
          <div className="space-y-2">
            <button
              onClick={handleWhatsAppReminder}
              className="w-full text-left p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-emerald-500" />
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Enviar Lembrete de Horário
                </span>
              </div>
              <span className="text-zinc-400 group-hover:text-emerald-500 font-medium">
                Enviar &rarr;
              </span>
            </button>
            <button
              onClick={handleWhatsAppConfirmation}
              className="w-full text-left p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-emerald-500" />
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Enviar Confirmação de Presença
                </span>
              </div>
              <span className="text-zinc-400 group-hover:text-emerald-500 font-medium">
                Enviar &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

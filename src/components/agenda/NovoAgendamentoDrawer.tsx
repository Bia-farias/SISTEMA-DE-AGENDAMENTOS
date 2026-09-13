import React, { useState, useEffect } from 'react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useCustomerStore } from '../../stores/customerStore';
import { useServiceStore } from '../../stores/serviceStore';
import { useProfessionalStore } from '../../stores/professionalStore';
import { useUIStore } from '../../stores/uiStore';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Calendar, Clock, User, Scissors, DollarSign, Plus, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export function NovoAgendamentoDrawer() {
  const { activeDrawer, closeDrawer, addAppointment } = useAppointmentStore();
  const { customers, addCustomer } = useCustomerStore();
  const { services } = useServiceStore();
  const { professionals } = useProfessionalStore();
  const { addToast } = useUIStore();

  const isOpen = activeDrawer.type === 'new';
  const prefilled = activeDrawer.prefilledSlot;

  // Form states
  const [customerId, setCustomerId] = useState('');
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');

  const [serviceId, setServiceId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'debit_card' | 'cash' | 'unpaid'>('unpaid');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prefilled data
  useEffect(() => {
    if (isOpen) {
      if (prefilled?.date) setDate(prefilled.date);
      else {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setDate(`${year}-${month}-${day}`);
      }

      if (prefilled?.time) setStartTime(prefilled.time);
      if (prefilled?.professionalId) setProfessionalId(prefilled.professionalId);
      else if (professionals.length > 0) setProfessionalId(professionals[0].id);

      if (services.length > 0 && !serviceId) setServiceId(services[0].id);
      if (customers.length > 0 && !customerId) setCustomerId(customers[0].id);

      setIsCreatingCustomer(false);
      setNewCustomerName('');
      setNewCustomerPhone('');
      setNotes('');
    }
  }, [isOpen, prefilled, professionals, services, customers]);

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedProfessional = professionals.find((p) => p.id === professionalId);

  // Calculate end time automatically based on service duration
  const calculateEndTime = (start: string, durationMinutes: number = 30) => {
    if (!start) return '09:30';
    const [hours, minutes] = start.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  const endTime = calculateEndTime(startTime, selectedService?.duration_minutes || 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalCustomerId = customerId;
    let finalCustomerName = '';
    let finalCustomerPhone = '';

    if (isCreatingCustomer) {
      if (!newCustomerName.trim() || !newCustomerPhone.trim()) {
        addToast({
          type: 'error',
          title: 'Dados incompletos',
          message: 'Por favor preencha o nome e o WhatsApp do novo cliente.',
        });
        return;
      }
      const created = addCustomer({
        name: newCustomerName.trim(),
        phone: newCustomerPhone.trim(),
        tenant_id: 'tenant-1001',
      });
      finalCustomerId = created.id;
      finalCustomerName = created.name;
      finalCustomerPhone = created.phone;
    } else {
      const existingCustomer = customers.find((c) => c.id === customerId);
      if (!existingCustomer) {
        addToast({
          type: 'error',
          title: 'Selecione um cliente',
          message: 'Selecione um cliente cadastrado ou cadastre um novo cliente.',
        });
        return;
      }
      finalCustomerName = existingCustomer.name;
      finalCustomerPhone = existingCustomer.phone;
    }

    if (!selectedService || !selectedProfessional) {
      addToast({
        type: 'error',
        title: 'Selecione o serviço e profissional',
        message: 'Preencha todos os campos obrigatórios.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addAppointment({
        tenant_id: 'tenant-1001',
        customer_id: finalCustomerId,
        customer_name: finalCustomerName,
        customer_phone: finalCustomerPhone,
        service_id: selectedService.id,
        service_name: selectedService.name,
        service_price: selectedService.price,
        professional_id: selectedProfessional.id,
        professional_name: selectedProfessional.name,
        date,
        start_time: startTime,
        end_time: endTime,
        duration_minutes: selectedService.duration_minutes,
        status: 'confirmed',
        notes,
        payment_method: paymentMethod,
        total_price: selectedService.price,
      });

      addToast({
        type: 'success',
        title: 'Agendamento Criado!',
        message: `Horário marcado para ${finalCustomerName} às ${startTime}.`,
      });

      closeDrawer();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao agendar',
        message: 'Ocorreu um erro ao salvar o agendamento.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      title="Novo Agendamento"
      description="Preencha os detalhes para reservar um horário na agenda"
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="ghost" onClick={closeDrawer} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            leftIcon={<Check size={16} />}
          >
            Confirmar Agendamento
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer Selection Section */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <User size={14} className="text-indigo-500" />
              Cliente
            </span>
            <button
              type="button"
              onClick={() => setIsCreatingCustomer(!isCreatingCustomer)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {isCreatingCustomer ? 'Selecionar existente' : '+ Cadastrar novo'}
            </button>
          </div>

          {isCreatingCustomer ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Input
                label="Nome do Cliente"
                placeholder="Ex: Mariana Silva"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />
              <Input
                label="WhatsApp / Celular"
                placeholder="(11) 99999-9999"
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
                required
              />
            </div>
          ) : (
            <Select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={customers.map((c) => ({
                value: c.id,
                label: `${c.name} — ${c.phone}`,
              }))}
            />
          )}
        </div>

        {/* Service Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Scissors size={14} className="text-indigo-500" />
              Serviço
            </label>
            {selectedService && (
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {formatCurrency(selectedService.price)} • {selectedService.duration_minutes} min
              </span>
            )}
          </div>
          <Select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            options={services
              .filter((s) => s.is_active)
              .map((s) => ({
                value: s.id,
                label: `${s.name} (${s.duration_minutes}m) — ${formatCurrency(s.price)}`,
              }))}
          />
        </div>

        {/* Professional Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <User size={14} className="text-indigo-500" />
            Profissional Responsável
          </label>
          <Select
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            options={professionals
              .filter((p) => p.is_active)
              .map((p) => ({
                value: p.id,
                label: `${p.name} — ${p.role}`,
              }))}
          />
        </div>

        {/* Date and Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            leftIcon={<Calendar size={15} />}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Horário Início
            </label>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl bg-zinc-50/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                required
              />
              <span className="text-xs text-zinc-400 font-medium">até</span>
              <div className="px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-300 shrink-0">
                {endTime}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Price Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Forma de Pagamento"
            value={paymentMethod}
            onChange={(e: any) => setPaymentMethod(e.target.value)}
            options={[
              { value: 'unpaid', label: 'Pendente / No Local' },
              { value: 'pix', label: 'PIX Antecipado' },
              { value: 'credit_card', label: 'Cartão de Crédito' },
              { value: 'debit_card', label: 'Cartão de Débito' },
              { value: 'cash', label: 'Dinheiro' },
            ]}
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Valor Total
            </label>
            <div className="w-full px-3.5 py-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/20 text-sm font-extrabold text-indigo-700 dark:text-indigo-300">
              {formatCurrency(selectedService?.price || 0)}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Observações / Recomendações
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Ex: Cliente prefere atendimento pontual, alergia a produtos..."
            className="w-full rounded-xl bg-zinc-50/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
        </div>
      </form>
    </Drawer>
  );
}

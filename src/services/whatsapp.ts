import { Appointment, Customer } from '../types';
import { formatDate } from '../utils/format';

export function createWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  // Default to Brazil country code 55 if not provided
  const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}

export function generateAppointmentReminderMessage(
  appointment: Appointment,
  tenantName: string
): string {
  return `Olá, *${appointment.customer_name}*! 👋\n\nLembramos do seu agendamento no *${tenantName}*:\n🗓 *Data:* ${formatDate(
    appointment.date
  )}\n⏰ *Horário:* ${appointment.start_time}\n✂️ *Serviço:* ${
    appointment.service_name
  }\n👤 *Profissional:* ${
    appointment.professional_name
  }\n\nPodemos confirmar sua presença? Responda *1* para Confirmar ou nos avise caso precise remarcar. Obrigado! ✨`;
}

export function generateAppointmentConfirmationMessage(
  appointment: Appointment,
  tenantName: string
): string {
  return `Perfeito, *${appointment.customer_name}*! ✅\n\nSeu agendamento foi *CONFIRMADO* com sucesso!\n\n🏢 *${tenantName}*\n🗓 *Data:* ${formatDate(
    appointment.date
  )}\n⏰ *Horário:* ${appointment.start_time}\n✂️ *Serviço:* ${
    appointment.service_name
  }\n👤 *Profissional:* ${
    appointment.professional_name
  }\n\nEstamos ansiosos para te receber! ✨`;
}

export function generateReactivationMessage(customer: Customer, tenantName: string): string {
  return `Olá, *${customer.name}*! Sentimos sua falta aqui no *${tenantName}*! 💖\n\nPreparamos uma condição especial para você renovar seu visual esta semana. Que tal agendarmos um horário especial?\n\nClique para ver os horários disponíveis ou nos chame por aqui! ✨`;
}

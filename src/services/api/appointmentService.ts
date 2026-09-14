import { supabase, isSupabaseConfigured } from '../supabase';
import { Appointment, AppointmentStatus } from '../../types';

export const appointmentApiService = {
  async getAll(tenantId: string): Promise<Appointment[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('date', { ascending: false })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Erro ao buscar agendamentos no Supabase:', error);
      throw error;
    }

    return (data || []) as unknown as Appointment[];
  },

  async getByDate(tenantId: string, date: string): Promise<Appointment[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('date', date)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Erro ao buscar agendamentos por data:', error);
      throw error;
    }

    return (data || []) as unknown as Appointment[];
  },

  async create(appointment: Omit<Appointment, 'id' | 'created_at'>): Promise<Appointment | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        tenant_id: appointment.tenant_id,
        customer_id: appointment.customer_id,
        customer_name: appointment.customer_name,
        customer_phone: appointment.customer_phone,
        service_id: appointment.service_id,
        service_name: appointment.service_name,
        service_price: appointment.service_price,
        professional_id: appointment.professional_id,
        professional_name: appointment.professional_name,
        date: appointment.date,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
        duration_minutes: appointment.duration_minutes,
        status: appointment.status,
        notes: appointment.notes || null,
        payment_method: appointment.payment_method || 'unpaid',
        total_price: appointment.total_price,
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar agendamento no Supabase:', error);
      throw error;
    }

    return data as unknown as Appointment;
  },

  async update(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('appointments')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar agendamento no Supabase:', error);
      throw error;
    }

    return data as unknown as Appointment;
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Erro ao alterar status do agendamento no Supabase:', error);
      throw error;
    }

    return true;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar agendamento no Supabase:', error);
      throw error;
    }

    return true;
  },
};

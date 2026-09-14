import { supabase, isSupabaseConfigured } from '../supabase';
import { Customer } from '../../types';

export const customerApiService = {
  async getAll(tenantId: string): Promise<Customer[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar clientes no Supabase:', error);
      throw error;
    }

    return (data || []).map((c) => ({
      id: c.id,
      tenant_id: c.tenant_id,
      name: c.name,
      email: c.email || undefined,
      phone: c.phone,
      birth_date: c.birth_date || undefined,
      notes: c.notes || undefined,
      total_spent: Number(c.total_spent) || 0,
      appointments_count: c.appointments_count || 0,
      last_visit_at: c.last_visit_at || undefined,
      is_vip: c.is_vip,
      created_at: c.created_at,
    }));
  },

  async create(customer: Omit<Customer, 'id' | 'created_at' | 'total_spent' | 'appointments_count'>): Promise<Customer | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('customers')
      .insert({
        tenant_id: customer.tenant_id,
        name: customer.name,
        email: customer.email || null,
        phone: customer.phone,
        birth_date: customer.birth_date || null,
        notes: customer.notes || null,
        total_spent: 0,
        appointments_count: 0,
        is_vip: customer.is_vip || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao cadastrar cliente no Supabase:', error);
      throw error;
    }

    return {
      ...data,
      email: data.email || undefined,
      birth_date: data.birth_date || undefined,
      notes: data.notes || undefined,
      last_visit_at: data.last_visit_at || undefined,
    } as unknown as Customer;
  },

  async update(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('customers')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar cliente no Supabase:', error);
      throw error;
    }

    return data as unknown as Customer;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao remover cliente no Supabase:', error);
      throw error;
    }

    return true;
  },
};

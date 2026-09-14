import { supabase, isSupabaseConfigured } from '../supabase';
import { Service } from '../../types';

export const serviceApiService = {
  async getAll(tenantId: string): Promise<Service[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar serviços no Supabase:', error);
      throw error;
    }

    return (data || []).map((s) => ({
      id: s.id,
      tenant_id: s.tenant_id,
      name: s.name,
      description: s.description || undefined,
      category: s.category,
      price: Number(s.price),
      duration_minutes: s.duration_minutes,
      is_active: s.is_active,
      color: s.color || undefined,
      created_at: s.created_at,
    }));
  },

  async create(service: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('services')
      .insert({
        tenant_id: service.tenant_id,
        name: service.name,
        description: service.description || null,
        category: service.category,
        price: service.price,
        duration_minutes: service.duration_minutes,
        color: service.color || '#6366f1',
        is_active: service.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao cadastrar serviço no Supabase:', error);
      throw error;
    }

    return {
      ...data,
      description: data.description || undefined,
      color: data.color || undefined,
    } as unknown as Service;
  },

  async update(id: string, updates: Partial<Service>): Promise<Service | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('services')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar serviço no Supabase:', error);
      throw error;
    }

    return data as unknown as Service;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar serviço no Supabase:', error);
      throw error;
    }

    return true;
  },
};

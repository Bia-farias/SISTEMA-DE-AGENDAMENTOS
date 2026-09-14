import { supabase, isSupabaseConfigured } from '../supabase';
import { Professional } from '../../types';

export const professionalApiService = {
  async getAll(tenantId: string): Promise<Professional[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar profissionais no Supabase:', error);
      throw error;
    }

    return (data || []).map((p) => ({
      id: p.id,
      tenant_id: p.tenant_id,
      name: p.name,
      email: p.email || undefined,
      phone: p.phone || undefined,
      avatar_url: p.avatar_url || undefined,
      role: p.role,
      specialties: p.specialties || [],
      commission_percentage: Number(p.commission_percentage) || 0,
      color: p.color || undefined,
      is_active: p.is_active,
      working_hours: p.working_hours,
    }));
  },

  async create(professional: Omit<Professional, 'id'>): Promise<Professional | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('professionals')
      .insert({
        tenant_id: professional.tenant_id,
        name: professional.name,
        email: professional.email || null,
        phone: professional.phone || null,
        avatar_url: professional.avatar_url || null,
        role: professional.role,
        specialties: professional.specialties || [],
        commission_percentage: professional.commission_percentage || 0,
        color: professional.color || '#6366f1',
        is_active: professional.is_active ?? true,
        working_hours: professional.working_hours || {
          start: '09:00',
          end: '19:00',
          days_of_week: [1, 2, 3, 4, 5, 6],
        },
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao cadastrar profissional no Supabase:', error);
      throw error;
    }

    return {
      ...data,
      email: data.email || undefined,
      phone: data.phone || undefined,
      avatar_url: data.avatar_url || undefined,
      color: data.color || undefined,
    } as unknown as Professional;
  },

  async update(id: string, updates: Partial<Professional>): Promise<Professional | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('professionals')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar profissional no Supabase:', error);
      throw error;
    }

    return data as unknown as Professional;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const { error } = await supabase
      .from('professionals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir profissional no Supabase:', error);
      throw error;
    }

    return true;
  },
};

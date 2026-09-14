import { supabase, isSupabaseConfigured } from '../supabase';
import { Profile, Tenant, UserRole } from '../../types';

export const authApiService = {
  async signIn(email: string, password: string):Promise<{ user: any; profile: Profile | null; tenant: Tenant | null }> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase não configurado no .env');
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    // Buscar perfil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    // Buscar tenant
    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', profileData.tenant_id)
      .single();

    if (tenantError) throw tenantError;

    const profile: Profile = {
      id: profileData.id,
      user_id: profileData.user_id,
      tenant_id: profileData.tenant_id,
      full_name: profileData.full_name,
      role: profileData.role,
      email: profileData.email,
      phone: profileData.phone || undefined,
      avatar_url: profileData.avatar_url || undefined,
      is_active: profileData.is_active,
      created_at: profileData.created_at,
    };

    const tenant: Tenant = {
      id: tenantData.id,
      name: tenantData.name,
      slug: tenantData.slug,
      plan: tenantData.plan,
      business_type: tenantData.business_type,
      phone: tenantData.phone || undefined,
      email: tenantData.email || undefined,
      logo_url: tenantData.logo_url || undefined,
      address: tenantData.address || undefined,
      settings: tenantData.settings,
      created_at: tenantData.created_at,
    };

    return { user: authData.user, profile, tenant };
  },

  async signUpWithTenant(params: {
    email: string;
    password: string;
    fullName: string;
    businessName: string;
    businessType: any;
    businessPhone: string;
  }): Promise<{ user: any; profile: Profile | null; tenant: Tenant | null }> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase não configurado no .env');
    }

    // 1. Criar usuário no auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          full_name: params.fullName,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Falha ao criar usuário no Supabase Auth');

    // 2. Criar Tenant
    const slug = params.businessName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: params.businessName,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        plan: 'pro',
        business_type: params.businessType,
        phone: params.businessPhone,
        email: params.email,
        settings: {
          opening_time: '08:00',
          closing_time: '20:00',
          interval_minutes: 30,
          allow_online_booking: true,
        },
      })
      .select()
      .single();

    if (tenantError) throw tenantError;

    // 3. Criar Profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: authData.user.id,
        tenant_id: tenantData.id,
        full_name: params.fullName,
        role: 'owner' as UserRole,
        email: params.email,
        phone: params.businessPhone,
        is_active: true,
      })
      .select()
      .single();

    if (profileError) throw profileError;

    const profile: Profile = {
      id: profileData.id,
      user_id: profileData.user_id,
      tenant_id: profileData.tenant_id,
      full_name: profileData.full_name,
      role: profileData.role,
      email: profileData.email,
      phone: profileData.phone || undefined,
      avatar_url: profileData.avatar_url || undefined,
      is_active: profileData.is_active,
      created_at: profileData.created_at,
    };

    const tenant: Tenant = {
      id: tenantData.id,
      name: tenantData.name,
      slug: tenantData.slug,
      plan: tenantData.plan,
      business_type: tenantData.business_type,
      phone: tenantData.phone || undefined,
      email: tenantData.email || undefined,
      logo_url: tenantData.logo_url || undefined,
      address: tenantData.address || undefined,
      settings: tenantData.settings,
      created_at: tenantData.created_at,
    };

    return { user: authData.user, profile, tenant };
  },

  async signOut(): Promise<void> {
    if (!isSupabaseConfigured()) return;
    await supabase.auth.signOut();
  },

  async getSession() {
    if (!isSupabaseConfigured()) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
};

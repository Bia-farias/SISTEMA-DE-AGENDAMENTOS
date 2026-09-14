import { supabase, isSupabaseConfigured } from '../supabase';
import {
  WhatsAppConnectionInfo,
  WhatsAppTemplate,
  WhatsAppReminderRule,
  WhatsAppMessageLog,
} from '../../types';

export const whatsappApiService = {
  async getConnection(tenantId: string): Promise<WhatsAppConnectionInfo | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('whatsapp_connections')
      .select('*')
      .eq('tenant_id', tenantId)
      .maybeSingle();

    if (error) {
      console.error('Erro ao buscar status do WhatsApp no Supabase:', error);
      return null;
    }

    if (!data) return null;

    return {
      status: data.status,
      phoneNumber: data.phone_number || '',
      instanceName: data.instance_name || 'WhatsApp Business',
      batteryLevel: data.battery_level ?? 100,
      lastSyncAt: data.last_sync_at || 'Nunca',
      totalSentThisMonth: data.total_sent_this_month || 0,
      confirmationRate: Number(data.confirmation_rate) || 0,
    };
  },

  async getTemplates(tenantId: string): Promise<WhatsAppTemplate[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('whatsapp_templates')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar templates do WhatsApp:', error);
      return [];
    }

    return (data || []).map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category,
      content: t.content,
      variables: t.variables || [],
    }));
  },

  async getRules(tenantId: string): Promise<WhatsAppReminderRule[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('whatsapp_reminder_rules')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erro ao buscar regras de lembretes:', error);
      return [];
    }

    return (data || []).map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      trigger: r.trigger,
      isActive: r.is_active,
      templateId: r.template_id || '',
      timingDescription: r.timing_description,
      iconName: r.icon_name,
    }));
  },

  async getLogs(tenantId: string, limit = 50): Promise<WhatsAppMessageLog[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('whatsapp_message_logs')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar histórico de mensagens:', error);
      return [];
    }

    return (data || []).map((l) => ({
      id: l.id,
      customerName: l.customer_name,
      customerPhone: l.customer_phone,
      appointmentId: l.appointment_id || undefined,
      templateName: l.template_name,
      message: l.message,
      status: l.status,
      sentAt: l.sent_at,
      failureReason: l.failure_reason || undefined,
    }));
  },

  async logMessage(
    tenantId: string,
    log: Omit<WhatsAppMessageLog, 'id'>
  ): Promise<WhatsAppMessageLog | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('whatsapp_message_logs')
      .insert({
        tenant_id: tenantId,
        customer_name: log.customerName,
        customer_phone: log.customerPhone,
        appointment_id: log.appointmentId || null,
        template_name: log.templateName,
        message: log.message,
        status: log.status,
        sent_at: log.sentAt,
        failure_reason: log.failureReason || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao registrar log de WhatsApp no Supabase:', error);
      return null;
    }

    return {
      id: data.id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      appointmentId: data.appointment_id || undefined,
      templateName: data.template_name,
      message: data.message,
      status: data.status,
      sentAt: data.sent_at,
      failureReason: data.failure_reason || undefined,
    };
  },
};

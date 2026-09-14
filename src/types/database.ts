export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'owner' | 'admin' | 'professional' | 'receptionist';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type TenantPlan = 'free' | 'starter' | 'pro' | 'enterprise';
export type BusinessType = 'barbershop' | 'beauty_salon' | 'aesthetic_clinic' | 'health_clinic' | 'other';
export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'cash' | 'unpaid';
export type WhatsAppStatus = 'connected' | 'disconnected' | 'connecting';
export type WhatsAppTrigger = 'booking_created' | 'before_24h' | 'before_2h' | 'after_service' | 'inactive_30d';
export type WhatsAppMsgStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
export type WhatsAppTemplateCategory = 'confirmation' | 'reminder' | 'feedback' | 'recovery' | 'custom';

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: TenantPlan;
          business_type: BusinessType;
          phone: string | null;
          email: string | null;
          logo_url: string | null;
          address: string | null;
          settings: {
            opening_time: string;
            closing_time: string;
            interval_minutes: number;
            allow_online_booking: boolean;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: TenantPlan;
          business_type?: BusinessType;
          phone?: string | null;
          email?: string | null;
          logo_url?: string | null;
          address?: string | null;
          settings?: {
            opening_time: string;
            closing_time: string;
            interval_minutes: number;
            allow_online_booking: boolean;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          plan?: TenantPlan;
          business_type?: BusinessType;
          phone?: string | null;
          email?: string | null;
          logo_url?: string | null;
          address?: string | null;
          settings?: {
            opening_time: string;
            closing_time: string;
            interval_minutes: number;
            allow_online_booking: boolean;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          tenant_id: string;
          full_name: string;
          role: UserRole;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tenant_id: string;
          full_name: string;
          role?: UserRole;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tenant_id?: string;
          full_name?: string;
          role?: UserRole;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          email: string | null;
          phone: string;
          birth_date: string | null;
          notes: string | null;
          total_spent: number;
          appointments_count: number;
          last_visit_at: string | null;
          is_vip: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          email?: string | null;
          phone: string;
          birth_date?: string | null;
          notes?: string | null;
          total_spent?: number;
          appointments_count?: number;
          last_visit_at?: string | null;
          is_vip?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          email?: string | null;
          phone?: string;
          birth_date?: string | null;
          notes?: string | null;
          total_spent?: number;
          appointments_count?: number;
          last_visit_at?: string | null;
          is_vip?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          description: string | null;
          category: string;
          price: number;
          duration_minutes: number;
          color: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string | null;
          category?: string;
          price?: number;
          duration_minutes?: number;
          color?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          description?: string | null;
          category?: string;
          price?: number;
          duration_minutes?: number;
          color?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      professionals: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: string;
          specialties: string[];
          commission_percentage: number;
          color: string | null;
          is_active: boolean;
          working_hours: {
            start: string;
            end: string;
            days_of_week: number[];
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id?: string | null;
          name: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: string;
          specialties?: string[];
          commission_percentage?: number;
          color?: string | null;
          is_active?: boolean;
          working_hours?: {
            start: string;
            end: string;
            days_of_week: number[];
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string | null;
          name?: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: string;
          specialties?: string[];
          commission_percentage?: number;
          color?: string | null;
          is_active?: boolean;
          working_hours?: {
            start: string;
            end: string;
            days_of_week: number[];
          };
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          tenant_id: string;
          customer_id: string;
          customer_name: string;
          customer_phone: string;
          service_id: string;
          service_name: string;
          service_price: number;
          professional_id: string;
          professional_name: string;
          date: string;
          start_time: string;
          end_time: string;
          duration_minutes: number;
          status: AppointmentStatus;
          notes: string | null;
          payment_method: PaymentMethod;
          total_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          customer_id: string;
          customer_name: string;
          customer_phone: string;
          service_id: string;
          service_name: string;
          service_price?: number;
          professional_id: string;
          professional_name: string;
          date: string;
          start_time: string;
          end_time: string;
          duration_minutes: number;
          status?: AppointmentStatus;
          notes?: string | null;
          payment_method?: PaymentMethod;
          total_price?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          customer_id?: string;
          customer_name?: string;
          customer_phone?: string;
          service_id?: string;
          service_name?: string;
          service_price?: number;
          professional_id?: string;
          professional_name?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          duration_minutes?: number;
          status?: AppointmentStatus;
          notes?: string | null;
          payment_method?: PaymentMethod;
          total_price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      whatsapp_connections: {
        Row: {
          id: string;
          tenant_id: string;
          status: WhatsAppStatus;
          phone_number: string | null;
          instance_name: string | null;
          battery_level: number;
          last_sync_at: string;
          total_sent_this_month: number;
          confirmation_rate: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          status?: WhatsAppStatus;
          phone_number?: string | null;
          instance_name?: string | null;
          battery_level?: number;
          last_sync_at?: string;
          total_sent_this_month?: number;
          confirmation_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          status?: WhatsAppStatus;
          phone_number?: string | null;
          instance_name?: string | null;
          battery_level?: number;
          last_sync_at?: string;
          total_sent_this_month?: number;
          confirmation_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      whatsapp_templates: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          category: WhatsAppTemplateCategory;
          content: string;
          variables: string[];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          category?: WhatsAppTemplateCategory;
          content: string;
          variables?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          category?: WhatsAppTemplateCategory;
          content?: string;
          variables?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      whatsapp_reminder_rules: {
        Row: {
          id: string;
          tenant_id: string;
          title: string;
          description: string;
          trigger: WhatsAppTrigger;
          is_active: boolean;
          template_id: string | null;
          timing_description: string;
          icon_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          title: string;
          description: string;
          trigger: WhatsAppTrigger;
          is_active?: boolean;
          template_id?: string | null;
          timing_description: string;
          icon_name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          title?: string;
          description?: string;
          trigger?: WhatsAppTrigger;
          is_active?: boolean;
          template_id?: string | null;
          timing_description?: string;
          icon_name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      whatsapp_message_logs: {
        Row: {
          id: string;
          tenant_id: string;
          customer_name: string;
          customer_phone: string;
          appointment_id: string | null;
          template_name: string;
          message: string;
          status: WhatsAppMsgStatus;
          sent_at: string;
          failure_reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          customer_name: string;
          customer_phone: string;
          appointment_id?: string | null;
          template_name?: string;
          message: string;
          status?: WhatsAppMsgStatus;
          sent_at: string;
          failure_reason?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          customer_name?: string;
          customer_phone?: string;
          appointment_id?: string | null;
          template_name?: string;
          message?: string;
          status?: WhatsAppMsgStatus;
          sent_at?: string;
          failure_reason?: string | null;
          created_at?: string;
        };
      };
      ai_conversations: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          title: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_messages: {
        Row: {
          id: string;
          conversation_id: string;
          tenant_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          tenant_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          tenant_id?: string;
          role?: 'user' | 'assistant' | 'system';
          content?: string;
          created_at?: string;
        };
      };
    };
    Functions: {
      get_dashboard_kpis: {
        Args: {
          p_tenant_id: string;
          p_date?: string;
        };
        Returns: Json;
      };
      get_user_tenant_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
  };
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Retorna true se as credenciais do Supabase forem configuradas no .env
 */
export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    !!url &&
    !url.includes('seu-projeto.supabase.co') &&
    !url.includes('mock.supabase.co') &&
    !!key &&
    !key.includes('sua-chave-publica-anon-aqui') &&
    !key.includes('mock-anon-key')
  );
};

/**
 * Testa a conexão real com a API do Supabase e retorna detalhes diagnósticos.
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  details?: any;
}> {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      message:
        'Supabase não configurado. Por favor, adicione sua URL e Anon Key no arquivo .env.',
    };
  }

  try {
    const { data, error } = await supabase.from('tenants').select('id, name').limit(1);

    if (error) {
      return {
        connected: false,
        message: `Erro na consulta ao Supabase: ${error.message} (Código: ${error.code})`,
        details: error,
      };
    }

    return {
      connected: true,
      message: 'Conexão com o Supabase estabelecida com sucesso!',
      details: data,
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Falha na requisição de rede com o Supabase: ${err?.message || err}`,
      details: err,
    };
  }
}

// Script para testar a conexão do ambiente com o Supabase
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import * as fs from 'fs';
import * as path from 'path';

// Carrega variáveis do arquivo .env manualmente para Node.js
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️ Arquivo .env não encontrado na raiz!');
    return {};
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...vals] = trimmed.split('=');
    env[key.trim()] = vals.join('=').trim();
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

console.log('---------------------------------------------------------');
console.log('🔍 AGENDA AI — TESTADOR DE AMBIENTE DO SUPABASE');
console.log('---------------------------------------------------------');
console.log(`URL do Supabase: ${supabaseUrl || '(não informada)'}`);
console.log(`Chave Pública:   ${supabaseAnonKey ? supabaseAnonKey.substring(0, 15) + '...' : '(não informada)'}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Supabase ainda não foi configurado com chaves no .env.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket },
});

async function testConnection() {
  try {
    console.log('\n⏳ Testando consulta na tabela public.tenants...');
    const { data, error } = await supabase.from('tenants').select('id, name, slug').limit(1);

    if (error) {
      console.error(`\n❌ Status da conexão: ${error.message} (Código: ${error.code})`);
      if (error.code === '42P01' || error.code === 'PGRST205' || error.message.includes('tenants')) {
        console.log('\n💡 AVISO: A conexão com o Supabase está OK, mas a tabela "tenants" ainda não foi criada.');
        console.log('👉 Para criar as tabelas agora:');
        console.log('   1. Abra o painel do seu projeto no Supabase:');
        console.log('      https://supabase.com/dashboard/project/wbvnifdtozhgwaclldac');
        console.log('   2. Acesse o menu lateral esquerdo: "SQL Editor" -> "+ New Query"');
        console.log('   3. Abra o arquivo "supabase_schema.sql" do projeto, copie todo o código e cole no editor.');
        console.log('   4. Clique no botão verde "Run" para executar e criar todo o schema e dados de teste!');
        console.log('   5. Rode este teste novamente: npm run test:supabase\n');
      }
      process.exit(0);
    }

    console.log('\n✅ Conexão com o Supabase realizada com SUCESSO!');
    console.log('Registro de Tenant encontrado:', data);
    console.log('\n🎉 O ambiente está 100% pronto para uso em produção com o Supabase!');
  } catch (err) {
    console.error('\n❌ Falha na requisição de rede:', err.message);
    process.exit(1);
  }
}

testConnection();

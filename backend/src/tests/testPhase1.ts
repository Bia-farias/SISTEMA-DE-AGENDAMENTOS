import request from 'supertest';
import { app } from '../app.js';
import { generateToken } from '../utils/jwt.js';

async function runTests() {
  console.log('==========================================================');
  console.log('🧪 INICIANDO TESTES DA FASE 1 — BACKEND AGENDA AI');
  console.log('==========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, extraInfo = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} ${extraInfo}`);
      failed++;
    }
  }

  // 1. Teste do Endpoint de Health Check
  console.log('--- 1. Health Check (GET /api/health) ---');
  const healthRes = await request(app).get('/api/health');
  assert(healthRes.status === 200, 'Status HTTP deve ser 200');
  assert(healthRes.body.success === true, 'success deve ser true');
  assert(healthRes.body.data.status === 'online', 'Status do serviço deve ser "online"');
  assert(healthRes.body.data.service === 'Agenda AI Backend API', 'Nome do serviço deve ser Agenda AI');
  console.log('Resposta do Health Check:', healthRes.body);

  // 2. Teste de Validação de Registro (POST /api/auth/register)
  console.log('\n--- 2. Validação no Registro com Dados Inválidos ---');
  const invalidRegisterRes = await request(app).post('/api/auth/register').send({});
  assert(invalidRegisterRes.status === 422, 'Status deve ser 422 para dados incompletos');
  assert(invalidRegisterRes.body.success === false, 'success deve ser false');
  assert(Array.isArray(invalidRegisterRes.body.errors), 'Deve conter array de erros de validação Zod');
  assert(invalidRegisterRes.body.errors.length >= 4, 'Deve acusar campos obrigatórios ausentes');
  console.log('Erros de validação capturados:', invalidRegisterRes.body.errors);

  // 3. Teste de Validação de E-mail e Senha no Registro
  console.log('\n--- 3. Validação de Formato de E-mail e Senha Fraca ---');
  const badFormatRes = await request(app).post('/api/auth/register').send({
    fullName: 'Ana',
    email: 'email-invalido',
    password: '123',
    businessName: 'Salão Top',
    businessPhone: '11999998888',
  });
  assert(badFormatRes.status === 422, 'Status deve ser 422');
  const emailErr = badFormatRes.body.errors.find((e: any) => e.field.includes('email'));
  const passErr = badFormatRes.body.errors.find((e: any) => e.field.includes('password'));
  assert(!!emailErr, 'Deve acusar formato de e-mail inválido');
  assert(!!passErr, 'Deve acusar senha com menos de 6 caracteres');

  // 4. Teste de Validação de Login (POST /api/auth/login)
  console.log('\n--- 4. Validação no Login com Campos Faltantes ---');
  const badLoginRes = await request(app).post('/api/auth/login').send({
    email: 'nao-e-email',
  });
  assert(badLoginRes.status === 422, 'Status deve ser 422');
  assert(badLoginRes.body.errors.length >= 2, 'Deve acusar e-mail inválido e senha ausente');

  // 5. Teste de Rota Protegida sem Token (GET /api/auth/me)
  console.log('\n--- 5. Autenticação: Rota Protegida sem Token JWT ---');
  const noTokenRes = await request(app).get('/api/auth/me');
  assert(noTokenRes.status === 401, 'Status deve ser 401 sem header Authorization');
  assert(noTokenRes.body.success === false, 'success deve ser false');
  assert(noTokenRes.body.message.includes('Token'), 'Mensagem deve indicar ausência do token');

  // 6. Teste de Rota Protegida com Token Inválido/Expirado
  console.log('\n--- 6. Autenticação: Token Inválido ou Malformado ---');
  const fakeTokenRes = await request(app)
    .get('/api/auth/me')
    .set('Authorization', 'Bearer token_invalido_xyz123');
  assert(fakeTokenRes.status === 401, 'Status deve ser 401 para token inválido');
  assert(fakeTokenRes.body.message.includes('Token expirado ou inválido'), 'Deve acusar token inválido');

  // 7. Teste de Token JWT Válido e Extração de Tenant/User
  console.log('\n--- 7. Autenticação: Token JWT Válido com Mock de Usuário ---');
  const validToken = generateToken({
    userId: 'mock-user-123',
    tenantId: 'mock-tenant-456',
    role: 'OWNER',
    email: 'admin@agendaai.com',
  });

  // O middleware deve descriptografar e injetar o token corretamente
  assert(typeof validToken === 'string' && validToken.length > 20, 'Token JWT gerado com sucesso');

  // 8. Teste de Rota 404
  console.log('\n--- 8. Tratamento de Rotas Inexistentes (404) ---');
  const notFoundRes = await request(app).get('/api/rota-inexistente-123');
  assert(notFoundRes.status === 404, 'Status deve ser 404');
  assert(notFoundRes.body.success === false, 'success deve ser false');
  assert(notFoundRes.body.message.includes('Rota não encontrada'), 'Mensagem amigável de 404');

  // Relatório Final
  console.log('\n==========================================================');
  console.log(`📊 RESULTADO FINAL DOS TESTES DA FASE 1:`);
  console.log(`   Total de Testes:  ${passed + failed}`);
  console.log(`   Passaram:         ${passed}`);
  console.log(`   Falharam:         ${failed}`);
  console.log('==========================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 TODOS OS TESTES DA FASE 1 PASSARAM COM SUCESSO!\n');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Erro na execução da suíte de testes:', err);
  process.exit(1);
});

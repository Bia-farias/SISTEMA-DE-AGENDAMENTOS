# IA — 05 — Ferramentas da IA

---

## 1. O que são as Ferramentas da IA?

As "ferramentas" são ações concretas que a IA pode solicitar ao sistema. Em vez de apenas responder texto, a IA pode **executar operações no banco de dados** quando o usuário pede algo que requer ação.

---

## 2. Fluxo de Ferramenta

```
Usuário: "Agende João amanhã às 15h para corte"
         │
         ▼
IA identifica intenção de ação
         │
         ▼
IA retorna JSON estruturado:
  { "action": "create_appointment", "data": {...} }
         │
         ▼
Vercel Function processa a ação:
  1. Valida se cliente existe
  2. Valida se serviço existe
  3. Verifica disponibilidade
  4. Executa ação ou retorna erro
         │
         ▼
Resultado enviado de volta para a IA
         │
         ▼
IA formula resposta final em linguagem natural
```

---

## 3. Ferramentas Disponíveis na V1

### 3.1 `create_appointment` — Criar Agendamento

```js
// Fluxo na Vercel Function
async function executeCreateAppointment(data, tenantId, supabase) {
  const { customer_name, date, start_time, service_name, professional_name } = data

  // 1. Buscar cliente por nome
  const { data: customer } = await supabase
    .from('customers')
    .select('id, name, phone')
    .eq('tenant_id', tenantId)
    .ilike('name', `%${customer_name}%`)
    .single()

  if (!customer) {
    return { error: `Cliente "${customer_name}" não encontrado. Deseja cadastrá-lo?` }
  }

  // 2. Buscar serviço
  const { data: service } = await supabase
    .from('services')
    .select('id, name, price, duration')
    .eq('tenant_id', tenantId)
    .ilike('name', `%${service_name}%`)
    .single()

  if (!service) {
    return { error: `Serviço "${service_name}" não encontrado.` }
  }

  // 3. Calcular horário de término
  const [hours, minutes] = start_time.split(':').map(Number)
  const endMinutes = hours * 60 + minutes + service.duration
  const end_time = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`

  // 4. Buscar profissional (se especificado)
  let professional
  if (professional_name) {
    const { data: prof } = await supabase
      .from('professionals')
      .select('id, name')
      .eq('tenant_id', tenantId)
      .ilike('name', `%${professional_name}%`)
      .single()
    professional = prof
  }

  // 5. Verificar disponibilidade
  const available = await checkAvailability({
    professionalId: professional?.id,
    date,
    startTime: start_time,
    endTime: end_time,
    supabase,
    tenantId
  })

  if (!available) {
    return { error: `O horário ${start_time} em ${date} não está disponível.` }
  }

  // 6. Criar agendamento
  const { data: appointment } = await supabase
    .from('appointments')
    .insert({
      tenant_id: tenantId,
      customer_id: customer.id,
      professional_id: professional?.id,
      service_id: service.id,
      date,
      start_time,
      end_time,
      status: 'pendente',
      price: service.price
    })
    .select()
    .single()

  return {
    success: true,
    appointment,
    message: `Agendamento criado para ${customer.name} em ${date} às ${start_time} para ${service.name}.`
  }
}
```

---

### 3.2 `generate_whatsapp_message` — Gerar Mensagem

```js
async function executeGenerateWhatsAppMessage(data, tenantId, supabase) {
  const { customer_name, appointment_id, template_type } = data

  // Buscar dados do cliente e agendamento
  const { data: appointment } = await supabase
    .from('appointments')
    .select('*, customers(name, phone), services(name), professionals(name)')
    .eq('id', appointment_id)
    .single()

  // Retornar para a IA gerar a mensagem com esses dados
  return { appointment, ready_to_generate: true }
}
```

---

### 3.3 `get_inactive_customers` — Clientes Inativos

```js
async function executeGetInactiveCustomers(data, tenantId, supabase) {
  const daysSince = data.days || 30
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysSince)

  const { data: customers } = await supabase
    .rpc('get_inactive_customers', {
      p_tenant_id: tenantId,
      p_cutoff_date: cutoffDate.toISOString()
    })

  return { customers, count: customers?.length || 0 }
}
```

---

## 4. Expansão Futura (V2+)

| Ferramenta | Descrição |
|-----------|-----------|
| `cancel_appointment` | Cancelar agendamento via IA |
| `reschedule_appointment` | Reagendar via IA |
| `send_whatsapp` | Enviar mensagem real (pós integração WhatsApp API) |
| `get_financial_report` | Relatório detalhado por período |
| `suggest_schedule` | Sugerir melhor horário disponível |

---

*Próximo: [`06-SEGURANCA-IA.md`](./06-SEGURANCA-IA.md)*

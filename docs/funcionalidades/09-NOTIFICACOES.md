# Funcionalidades — 09 — Notificações

---

## 1. Visão Geral

As notificações são alertas internos do sistema, exibidos na interface do usuário. Na V1, são geradas pelo próprio sistema para informar sobre eventos importantes.

---

## 2. Tipos de Notificação

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `new_appointment` | Novo agendamento criado | "João agendou corte para amanhã às 15h" |
| `appointment_cancelled` | Agendamento cancelado | "Maria cancelou o agendamento de terça" |
| `payment_overdue` | Pagamento vencido | "Pagamento de R$80 de Carlos está vencido" |
| `customer_birthday` | Aniversário de cliente | "🎂 Hoje é aniversário de Ana Lima!" |
| `customer_inactive` | Cliente inativo | "Pedro Souza não agenda há 65 dias" |

---

## 3. Interface de Notificações

```
┌─────────────────────────────────────────┐
│ 🔔 Notificações                    [✓]  │
├─────────────────────────────────────────┤
│ 🎂 Hoje é aniversário de Ana Lima!      │
│    Enviar mensagem? [WhatsApp]   2min   │
├─────────────────────────────────────────┤
│ 📅 João agendou Corte para amanhã 15h  │
│                                  5min   │
├─────────────────────────────────────────┤
│ ⚠️  R$180 de Maria está vencido         │
│    [Ver financeiro]              1h     │
└─────────────────────────────────────────┘
```

---

## 4. Implementação Simples (V1)

Na V1, as notificações são geradas pelo frontend ao realizar operações e salvas no banco. Em versões futuras, podem ser geradas por triggers no banco ou por jobs agendados.

```js
// src/services/notifications.service.js

export async function createNotification(tenantId, userId, { type, title, message, data }) {
  await supabase.from('notifications').insert({
    tenant_id: tenantId,
    user_id: userId,
    type,
    title,
    message,
    data,
    read: false
  })
}

export async function markAllAsRead(tenantId, userId) {
  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('tenant_id', tenantId)
    .eq('user_id', userId)
    .eq('read', false)
}
```

---

## 5. Badge de Notificações

O ícone de sino no Header exibe o número de notificações não lidas:

```jsx
// src/components/layout/Header.jsx

function NotificationBell() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Supabase Realtime para atualização em tempo real
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, () => {
        setCount(prev => prev + 1)
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <button className="relative">
      <Bell />
      {count > 0 && (
        <span className="badge">{count}</span>
      )}
    </button>
  )
}
```

---

*Documentação de funcionalidades concluída.*
*Próximo: [`../ia/01-IA.md`](../ia/01-IA.md)*

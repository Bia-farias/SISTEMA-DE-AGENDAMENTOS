# Funcionalidades — 06 — Financeiro

---

## 1. Visão Geral

O módulo financeiro controla todas as receitas da empresa, vinculadas aos agendamentos realizados. Na V1, o foco é em **entradas** (receitas de atendimentos).

---

## 2. Dashboard Financeiro

```
┌──────────────────────────────────────────────────────────┐
│ Financeiro                           [Período: Este mês] │
├─────────────────┬──────────────┬───────────┬────────────┤
│ Receita Total   │ Recebido     │ A Receber │  Vencido   │
│  R$ 8.450       │  R$ 7.250    │  R$ 850   │  R$ 350   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ [Gráfico de faturamento por período]                    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Histórico de Transações                  [Exportar ↓]  │
│                                                          │
│ 30/08  João Silva    Corte       R$ 80   💚 Pago       │
│ 29/08  Maria Oliv.  Coloração   R$150   💚 Pago       │
│ 28/08  Carlos P.    Barba       R$ 40   🟡 Pendente   │
│ 27/08  Ana Lima     Progressiva R$180   🔴 Vencido    │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Status de Transações

| Status | Ícone | Descrição |
|--------|-------|-----------|
| `pendente` | 🟡 | Aguarda pagamento |
| `pago` | 💚 | Pagamento confirmado |
| `cancelado` | ⚫ | Agendamento cancelado |
| `vencido` | 🔴 | Data de vencimento passou, ainda pendente |

---

## 4. Formas de Pagamento

| Forma | Código |
|-------|--------|
| Dinheiro | `dinheiro` |
| Cartão de Crédito | `cartao_credito` |
| Cartão de Débito | `cartao_debito` |
| Pix | `pix` |
| Outro | `outro` |

---

## 5. Fluxo de Registro de Pagamento

```
Agendamento marcado como "concluído"
         │
         ▼
Sistema exibe modal: "Registrar pagamento?"
         │
         ▼
Usuário seleciona:
  - Forma de pagamento
  - Valor (pré-preenchido com preço do serviço)
  - Observação (opcional)
         │
         ▼
Sistema atualiza financial_transactions:
  status = 'pago'
  payment_method = selecionado
  paid_at = NOW()
         │
         ▼
Toast de sucesso
```

---

## 6. Filtros do Histórico

| Filtro | Tipo |
|--------|------|
| Período | DateRange picker (hoje, semana, mês, personalizado) |
| Status | Multi-select |
| Profissional | Select |
| Serviço | Select |
| Forma de pagamento | Select |

---

## 7. Relatórios (V1)

Na V1, os totalizadores são exibidos no próprio dashboard. Exportação de relatórios em CSV/PDF fica para versões futuras.

### Totalizadores disponíveis:
- Total de receitas no período
- Total recebido
- Total a receber
- Total vencido
- Receita por profissional
- Receita por serviço
- Ticket médio

---

## 8. Queries Principais

```js
// Faturamento total por período
export async function getFinancialSummary(tenantId, startDate, endDate) {
  const { data } = await supabase
    .from('financial_transactions')
    .select('amount, status, payment_method')
    .eq('tenant_id', tenantId)
    .gte('created_at', startDate)
    .lte('created_at', endDate)

  return {
    total: data.reduce((sum, t) => sum + t.amount, 0),
    paid: data.filter(t => t.status === 'pago').reduce((sum, t) => sum + t.amount, 0),
    pending: data.filter(t => t.status === 'pendente').reduce((sum, t) => sum + t.amount, 0),
    overdue: data.filter(t => t.status === 'vencido').reduce((sum, t) => sum + t.amount, 0)
  }
}
```

---

*Próximo: [`07-WHATSAPP.md`](./07-WHATSAPP.md)*

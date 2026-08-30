# Desenvolvimento — 02 — Padrão de Código e Convenções

---

## 1. Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Componentes React | PascalCase | `AppointmentModal.jsx`, `Header.jsx` |
| Hooks | camelCase com prefixo `use` | `useAppointments.js`, `useTenant.js` |
| Arquivos de Serviços | camelCase com sufixo `.service` | `appointments.service.js` |
| Stores Zustand | camelCase com sufixo `Store` | `authStore.js`, `uiStore.js` |
| Utilitários | camelCase | `formatCurrency.js`, `dateUtils.js` |
| Constantes | UPPER_SNAKE_CASE | `APPOINTMENT_STATUS`, `MAX_DAILY_AI_REQUESTS` |
| Tabelas e Colunas do Banco | snake_case | `financial_transactions`, `tenant_id` |

---

## 2. Formatação e Linters

Configuração recomendada do **ESLint** e **Prettier**:

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100
}
```

---

## 3. Organização de Arquivos em um Módulo

Ao criar uma nova funcionalidade completa, siga a divisão de camadas:

```
1. Service   -> src/services/exemplo.service.js   (Chamadas ao Supabase/API)
2. Hook      -> src/hooks/useExemplo.js           (Estado e lógica assíncrona)
3. Component -> src/components/exemplo/Card.jsx   (Visual atômico)
4. Page      -> src/pages/Exemplo.jsx             (Visão agregadora da tela)
```

---

*Próximo: [`03-GIT.md`](./03-GIT.md)*

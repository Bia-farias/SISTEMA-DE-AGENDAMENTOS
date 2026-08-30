# Frontend — 01 — Padrões React

---

## 1. Diretrizes Gerais

O frontend do **NGB Agenda IA** é desenvolvido com **React 18** e **Vite**, adotando as melhores práticas do ecossistema moderno:

- **Componentes Funcionais** com Hooks exclusivos (sem classes)
- **Separação estrita de responsabilidades**: Componentes visuais não fazem chamadas diretas ao banco; usam `services` e `custom hooks`
- **Imutabilidade e clareza** no gerenciamento de estado
- **Composição de componentes** em vez de componentes gigantes monolíticos

---

## 2. Estrutura Padrão de um Componente

```jsx
// src/components/customers/CustomerCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function CustomerCard({ customer, onSelect, onWhatsApp }) {
  const isInactive = customer.daysSinceLastVisit > 60;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{customer.name}</h3>
          <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1">
            <Phone size={14} /> {customer.phone}
          </p>
        </div>
        {isInactive && (
          <Badge variant="warning">Inativo ({customer.daysSinceLastVisit}d)</Badge>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => onWhatsApp(customer)}>
          WhatsApp
        </Button>
        <Button variant="outline" size="sm" onClick={() => onSelect(customer.id)}>
          Ver Perfil <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}

CustomerCard.propTypes = {
  customer: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onWhatsApp: PropTypes.func.isRequired,
};
```

---

## 3. Padrão de Custom Hooks

Os hooks customizados isolam regras de negócio e consumo assíncrono:

```javascript
// src/hooks/useCustomers.js
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import * as customerService from '../services/customers.service';

export function useCustomers() {
  const { tenant } = useAuthStore();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    if (!tenant?.id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await customerService.getCustomers(tenant.id);
      setCustomers(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  }, [tenant?.id]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error, refresh: fetchCustomers };
}
```

---

## 4. Regras de Código e Boas Práticas

1. **Evitar Prop Drilling Excessivo**: Utilizar Zustand para estados globais (sessão, empresa, modais globais) e React Context para temas ou subárvores de UI.
2. **Memoização Consciente**: Utilizar `useMemo` e `useCallback` em cálculos pesados (ex: filtros de agenda semanal) e callbacks passados para componentes filhos complexos.
3. **Tratamento de Estado Assíncrono**: Todo carregamento deve prever três estados visuais obrigatórios:
   - **Loading State** (Skeleton ou Spinner)
   - **Error State** (Mensagem amigável com opção de retry)
   - **Empty State** (Ilustração/texto convidando a criar o primeiro item)

---

*Próximo: [`02-COMPONENTES.md`](./02-COMPONENTES.md)*

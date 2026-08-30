# Frontend — 02 — Catálogo de Componentes

---

## 1. Design System Base (`src/components/ui/`)

Os componentes atômicos garantem coerência visual e flexibilidade em todo o sistema.

| Componente | Propriedades Principais | Descrição |
|------------|------------------------|-----------|
| `Button.jsx` | `variant` (primary, secondary, outline, ghost, danger), `size` (sm, md, lg), `isLoading` | Botão padrão com suporte a loading state |
| `Input.jsx` | `label`, `error`, `icon`, `type`, `placeholder` | Campo de entrada com rótulo e mensagem de erro integrada |
| `Modal.jsx` | `isOpen`, `onClose`, `title`, `children`, `size` | Diálogo modal com backdrop e animação de fade |
| `Badge.jsx` | `variant` (success, warning, danger, info, neutral) | Pílula de status colorido |
| `Card.jsx` | `header`, `footer`, `children`, `className` | Contêiner elevado com borda suave |
| `Select.jsx` | `label`, `options`, `value`, `onChange`, `error` | Menu seletor customizado e acessível |
| `Avatar.jsx` | `src`, `name`, `size` (sm, md, lg) | Foto do profissional/cliente com fallback de iniciais |
| `Spinner.jsx`| `size`, `color` | Indicador visual de carregamento |
| `Toast.jsx`  | `type` (success, error, info), `message`, `duration` | Alertas flutuantes no canto da tela |

---

## 2. Componentes de Módulos Específicos

### 2.1 Agenda (`src/components/agenda/`)

- **`CalendarioSemanal.jsx`**: Grid de 7 dias com slots horários de 30 em 30 minutos. Mapeia agendamentos por profissional.
- **`AgendamentoCard.jsx`**: Bloco colorido posicionado no grid horário com nome do cliente, serviço e badge de status.
- **`NovoAgendamentoModal.jsx`**: Formulário interativo com busca de cliente, seleção de serviço, profissional e validação de disponibilidade.
- **`FiltrosAgenda.jsx`**: Toolbar superior para troca de semana, filtro por profissional e status.

### 2.2 Dashboard (`src/components/dashboard/`)

- **`KPICard.jsx`**: Exibição de métrica de destaque (número grande, ícone temático e variação percentual).
- **`AgendaDoDia.jsx`**: Lista cronológica dos próximos atendimentos da data atual.
- **`GraficoFaturamento.jsx`**: Visualização gráfica de receitas dos últimos 7/30 dias.
- **`ServicosPopulares.jsx`**: Tabela resumida com os 5 serviços mais demandados.

### 2.3 Assistente IA (`src/components/ai/`)

- **`ChatIA.jsx`**: Janela completa de conversação com rolagem automática para a última mensagem.
- **`MensagemIA.jsx`**: Renderiza resposta da IA com suporte a markdown, botões de ação e tabelas.
- **`MensagemUsuario.jsx`**: Balão de texto do usuário alinhado à direita.
- **`SugestoesRapidas.jsx`**: Pílulas clicáveis com prompts pré-montados ("Resumir semana", "Clientes inativos").
- **`InputChat.jsx`**: Campo de entrada com botão de envio e acionamento de voz/atalhos.

---

## 3. Exemplo: Componente Base `Button`

```jsx
// src/components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-zinc-800 hover:bg-zinc-900 text-white focus:ring-zinc-700",
    outline: "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:ring-zinc-500",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin mr-2" />}
      {children}
    </button>
  );
}
```

---

*Próximo: [`03-ESTADO.md`](./03-ESTADO.md)*

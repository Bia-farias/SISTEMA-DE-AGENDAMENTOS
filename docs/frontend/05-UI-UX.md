# Frontend — 05 — Diretrizes de UI/UX

---

## 1. Identidade Visual e Estética

O **NGB Agenda IA** adota uma identidade visual **moderna, limpa e profissional (SaaS B2B)**, inspirada nas melhores interfaces contemporâneas (Linear, Vercel, Stripe).

### Princípios de Design:
- **Clareza Informacional**: A agenda e as métricas financeiras devem ser lidas em segundos sem ruído visual.
- **Tipografia Escaneável**: Uso da fonte **Inter** ou **Plus Jakarta Sans** com hierarquia visual nítida.
- **Micro-interações Suaves**: Transições de hover em cards, modais com fade-in e feedback imediato de clique.
- **Modo Escuro / Claro (Dark/Light)**: Paleta zinc balanceada para evitar fadiga ocular em uso contínuo ao longo do dia de trabalho.

---

## 2. Paleta de Cores (Tailwind Tokens)

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // Indigo Primário
          600: '#4f46e5', // Ações / Botões
          700: '#4338ca',
        },
        surface: {
          light: '#ffffff',
          dark: '#09090b', // Zinc 950
          cardDark: '#18181b', // Zinc 900
          borderDark: '#27272a', // Zinc 800
        },
        status: {
          pending: '#eab308',   // Amarelo
          confirmed: '#22c55e', // Verde
          completed: '#3b82f6', // Azul
          cancelled: '#ef4444', // Vermelho
        }
      }
    }
  }
}
```

---

## 3. Padrões de Layout e Responsividade

```
Desktop (≥ 1024px)
┌────────────┬────────────────────────────────────────────────────────┐
│  Sidebar   │ Header (Perfil, Tenant, Sino de Notificações, Tema)   │
│  Fixa      ├────────────────────────────────────────────────────────┤
│  Lateral   │ Conteúdo da Página com Scroll Independente             │
└────────────┴────────────────────────────────────────────────────────┘

Mobile (< 1024px)
┌─────────────────────────────────────────────────────────────────────┐
│ Header Superior (Menu Hamburguer, Logo, Perfil)                    │
├─────────────────────────────────────────────────────────────────────┤
│ Conteúdo com Layout Adaptado em Coluna Única                        │
├─────────────────────────────────────────────────────────────────────┤
│ Bottom Bar (Atalhos rápidos: Agenda, Clientes, IA, Financeiro)     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Progressive Web App (PWA)

O aplicativo é configurado como **PWA** através do `@vite-pwa/plugin`, permitindo:

1. **Instalação na Tela Inicial**: Profissionais e donos de salão podem instalar no iPhone ou Android como um app nativo sem passar pela App Store.
2. **Abertura em Tela Cheia (Standalone)**: Sem barra de navegação do browser.
3. **Cache de Assets Estáticos**: Carregamento instantâneo mesmo em conexões lentas de dados móveis (3G/4G).

---

*Próximo: [`../api/01-ENDPOINTS.md`](../api/01-ENDPOINTS.md)*

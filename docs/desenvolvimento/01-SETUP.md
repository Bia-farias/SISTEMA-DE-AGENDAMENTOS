# Desenvolvimento — 01 — Guia de Setup e Inicialização do Projeto

---

## 1. Comandos de Inicialização do Projeto

Caso você esteja iniciando o projeto do zero, execute a sequência recomendada com Vite:

```bash
# 1. Criar aplicação React com Vite
npm create vite@latest ./ -- --template react

# 2. Instalar dependências essenciais
npm install @supabase/supabase-js zustand react-router-dom lucide-react date-fns clsx

# 3. Instalar dependências de IA e Servidor
npm install groq-sdk

# 4. Instalar Tailwind CSS e plugins
npm install -D tailwindcss postcss autoprefixer vite-plugin-pwa

# 5. Inicializar arquivo de configuração do Tailwind
npx tailwindcss init -p
```

---

## 2. Configuração do Tailwind (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        }
      }
    },
  },
  plugins: [],
}
```

---

## 3. Configuração do Vite com PWA (`vite.config.js`)

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NGB Agenda IA',
        short_name: 'NGB Agenda',
        description: 'Sistema SaaS de Agendamentos e Gestão com IA',
        theme_color: '#4f46e5',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

*Próximo: [`02-PADRAO-DE-CODIGO.md`](./02-PADRAO-DE-CODIGO.md)*

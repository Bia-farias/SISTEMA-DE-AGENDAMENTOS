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
          50:  '#f5f3ff', // Violet 50  — fundos levíssimos
          100: '#ede9fe', // Violet 100 — hover, badges
          200: '#ddd6fe', // Violet 200 — bordas ativas
          300: '#c4b5fd', // Violet 300 — ícones suaves
          400: '#a78bfa', // Violet 400 — estados secundários
          500: '#8b5cf6', // Violet 500 — botão primário
          600: '#7c3aed', // Violet 600 — hover de botão
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        surface: {
          light: '#ffffff',
          lightMuted: '#faf9ff', // Quase branco com toque lilás imperceptível
          dark: '#09090b',
          cardDark: '#121215',
          cardLight: '#ffffff',
          borderDark: '#27272a',
          borderLight: '#ede9fe', // Violet 100 — bordas suaves
        },
        status: {
          pending: '#eab308',   // Amarelo
          confirmed: '#22c55e', // Verde
          completed: '#8b5cf6', // Violet (alinhado com paleta)
          cancelled: '#ef4444', // Vermelho
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
}

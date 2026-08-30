# Frontend — 03 — Gerenciamento de Estado

---

## 1. Estratégia de Estado

O sistema adota uma divisão simples e escalável de estados:

1. **Estado Global (Zustand)**: Sessão do usuário, Perfil, Tenant ativo, Alertas Toast e Estado da UI global.
2. **Estado do Servidor (Cache & Fetching)**: Custom Hooks para queries ao Supabase e chamadas à API da IA.
3. **Estado Local do Componente (`useState`, `useReducer`)**: Formulários, modais locais, abas e filtros de visualização.

---

## 2. Zustand Store: Autenticação & Tenant (`authStore.js`)

```javascript
// src/stores/authStore.js
import { create } from 'zustand';
import { supabase } from '../services/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  tenant: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setTenant: (tenant) => set({ tenant }),

  initialize: async () => {
    try {
      set({ loading: true });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*, tenants(*)')
          .eq('user_id', session.user.id)
          .single();

        set({
          user: session.user,
          profile,
          tenant: profile?.tenants || null,
        });
      } else {
        set({ user: null, profile: null, tenant: null });
      }
    } catch (err) {
      console.error('Erro ao inicializar auth:', err);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, tenant: null });
  },
}));
```

---

## 3. Zustand Store: UI & Feedback (`uiStore.js`)

```javascript
// src/stores/uiStore.js
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isSidebarOpen: true,
  toasts: [],

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  addToast: ({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, type, title, message }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
```

---

## 4. Estado da Conversa da IA (`aiStore.js`)

```javascript
// src/stores/aiStore.js
import { create } from 'zustand';

export const useAIStore = create((set) => ({
  messages: [],
  isThinking: false,
  activeConversationId: null,

  setConversationId: (id) => set({ activeConversationId: id }),
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setThinking: (isThinking) => set({ isThinking }),
  
  clearChat: () => set({ messages: [], activeConversationId: null }),
}));
```

---

*Próximo: [`04-ROTAS.md`](./04-ROTAS.md)*

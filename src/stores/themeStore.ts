import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // Always default to Light Mode (predominantly white with soft pastel violet accents)
  const savedTheme = localStorage.getItem('agenda_ai_theme_v2');
  const initialDark = savedTheme === 'dark';

  if (initialDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDark: initialDark,
    toggleTheme: () =>
      set((state) => {
        const next = !state.isDark;
        if (next) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('agenda_ai_theme_v2', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('agenda_ai_theme_v2', 'light');
        }
        return { isDark: next };
      }),
    setDark: (isDark: boolean) =>
      set(() => {
        if (isDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('agenda_ai_theme_v2', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('agenda_ai_theme_v2', 'light');
        }
        return { isDark };
      }),
  };
});

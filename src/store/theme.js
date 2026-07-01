import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'theme-storage';

function readStoredTheme() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.theme) return parsed.state.theme;
    }
  } catch (e) {}
  return null;
}

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeClass(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

// 🔥 قبل از اولین رندر ری‌اکت، مقدار واقعی رو از localStorage بخون و کلاس رو اعمال کن
const initialTheme = readStoredTheme() || getSystemTheme();
applyThemeClass(initialTheme);

export const useTheme = create(
  persist(
    (set, get) => ({
      theme: initialTheme, // ← دیگه همیشه 'light' نیست

      setTheme: (theme) => {
        applyThemeClass(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const current = get().theme;
        get().setTheme(current === 'light' ? 'dark' : 'light');
      },

      isDark: () => get().theme === 'dark',
    }),
    {
      name: STORAGE_KEY,
      // 🔥 هر وقت zustand از localStorage هیدریت کرد، کلاس html رو هم sync کن
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyThemeClass(state.theme);
      },
    }
  )
);

export default useTheme;
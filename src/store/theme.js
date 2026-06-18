import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTheme = create(
  persist(
    (set, get) => ({
      theme: 'light',
      
      setTheme: (theme) => {
        // اعمال کلاس dark روی document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },
      
      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
      
      // تابع کمکی برای دریافت وضعیت تم
      isDark: () => get().theme === 'dark',
    }),
    {
      name: 'theme-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useTheme;

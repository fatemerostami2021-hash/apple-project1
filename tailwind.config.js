/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iranyekan: ["IRANYekan", "sans-serif"],
      },
      colors: {
        // Light Mode colors
        light: {
          bg: '#ffffff',
          text: '#1e293b',
          accent: '#0284c7',
        },
        // Dark Mode colors
        dark: {
          bg: '#0a0a0a',
          text: '#e2e8f0',
          accent: '#f59e0b',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'var(--text-primary)',
            maxWidth: 'none',
            a: {
              color: 'var(--accent-primary)',
              '&:hover': {
                color: 'var(--accent-secondary)',
              },
            },
            h1: {
              color: 'var(--heading-color)',
              fontWeight: '800',
            },
            h2: {
              color: 'var(--accent-primary)',
              fontWeight: '700',
              borderLeft: `4px solid var(--accent-primary)`,
              paddingLeft: '1rem',
            },
            h3: {
              color: 'var(--accent-secondary)',
              fontWeight: '600',
            },
            strong: {
              color: 'var(--accent-primary)',
            },
            code: {
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.375rem',
            },
            blockquote: {
              borderLeftColor: 'var(--accent-primary)',
              color: 'var(--text-secondary)',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '0.5rem',
              padding: '1rem',
            },
            '.dark &': {
              blockquote: {
                backgroundColor: 'rgba(245, 158, 11, 0.05)',
              },
            },
          },
        },
        invert: {
          css: {
            color: 'var(--text-primary)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

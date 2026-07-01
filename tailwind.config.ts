import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas:     '#f2f5f3',
        ink:        '#17272e',
        primary:    { DEFAULT: '#1f6e73', light: '#2d858a', dark: '#155459' },
        secondary:  { DEFAULT: '#5b6e63', light: '#73887b', dark: '#46554c' },
        highlight:  { DEFAULT: '#b58a4b', light: '#c7a066', dark: '#8e6c38' },
        border:     '#d7e0dc',

        // Legacy aliases kept so older content/classes continue to compile.
        cream:      '#f2f5f3',
        charcoal:   '#17272e',
        terracotta: { DEFAULT: '#1f6e73', light: '#2d858a', dark: '#155459' },
        olive:      { DEFAULT: '#5b6e63', light: '#73887b', dark: '#46554c' },
        ochre:      { DEFAULT: '#b58a4b', light: '#c7a066', dark: '#8e6c38' },
        sand:       '#d7e0dc',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 1px 3px rgba(23,39,46,0.06), 0 4px 16px rgba(23,39,46,0.04)',
        'card-hover': '0 4px 12px rgba(23,39,46,0.10), 0 8px 32px rgba(23,39,46,0.06)',
      },
    },
  },
  plugins: [],
}

export default config

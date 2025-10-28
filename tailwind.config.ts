import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg:'#07090c', neon:'#00ffa8', textMuted:'#8ba1a9' },
      boxShadow: { neon: '0 0 16px rgba(0,255,168,0.25)' }
    }
  },
  plugins: []
} satisfies Config

import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07090c',
        glass: 'rgba(10,14,18,0.6)',
        neon: '#00ffa8',
        neonSoft: '#00e6a0',
        textMuted: '#8ba1a9',
        card: 'rgba(13,20,26,0.45)'
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,255,168,0.25), inset 0 0 20px rgba(0,255,168,0.08)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
} satisfies Config

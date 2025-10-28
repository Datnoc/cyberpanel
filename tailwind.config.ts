import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { neon: "#00ffa8", bg: "#0b0f12", panel: "#0f1418" },
      boxShadow: { neon: "0 0 30px rgba(0,255,168,0.25)" }
    }
  },
  plugins: [],
}
export default config

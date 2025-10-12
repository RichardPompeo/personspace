import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1c1c21",
        surface: "#26262c",
        "surface-muted": "#212126",
        accent: "#8eb5f0",
        text: "#ffffff",
        "text-dim": "#e5e5e5",
        danger: "#c92121",
        border: "rgba(255,255,255,0.12)",
        input: "rgba(255,255,255,0.08)",
        ring: "#8eb5f0",
      },
      fontFamily: {
        sans: ['"Supreme"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

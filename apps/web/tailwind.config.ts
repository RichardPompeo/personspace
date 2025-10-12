import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1c1c21",
        surface: "#26262c",
        "surface-muted": "#212126",
        accent: "#8eb5f0",
        "accent-muted": "#8eb5f0cc",
        text: "#ffffff",
        "text-dim": "#e5e5e5",
        danger: "#c92121",
        success: "#2ea043",
        border: "rgba(255,255,255,0.12)",
        input: "rgba(255,255,255,0.08)",
        ring: "#8eb5f0",
      },
      fontFamily: {
        sans: ['"Supreme"', "sans-serif"],
      },
      boxShadow: {
        card: "0 25px 45px -20px rgba(8, 15, 52, 0.35)",
      },
      backgroundImage: {
        "grid-radial":
          "radial-gradient(circle at center, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.02) 55%, rgba(0,0,0,0) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

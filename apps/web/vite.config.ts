import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    target: "esnext",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          apollo: ["@apollo/client", "graphql"],
          firebase: ["firebase/app", "firebase/auth"],
          router: ["react-router"],
          i18n: [
            "react-i18next",
            "i18next",
            "i18next-browser-languagedetector",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@apollo/client",
      "graphql",
      "firebase/app",
      "firebase/auth",
      "react-router",
      "react-i18next",
    ],
  },
});

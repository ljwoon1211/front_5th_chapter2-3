import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const baseUrl = mode === 'production' ? '/front_5th_chapter2-3/' : '/';
  return {
    plugins: [react()],
    base: baseUrl,
    build: {
      outDir: 'dist',
    },
    server: {
      proxy: {
        "/api": {
          // target: 'https://jsonplaceholder.typicode.com',
          target: "https://dummyjson.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})

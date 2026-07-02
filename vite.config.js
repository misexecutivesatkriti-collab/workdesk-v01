import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',  // Make sure this is 'dist'
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})

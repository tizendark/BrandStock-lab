import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // 👈 AGREGA ESTA LÍNEA (ruta relativa para GitHub Pages)
  server: {
    port: 5173
  }
})

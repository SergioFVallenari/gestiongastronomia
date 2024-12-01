import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Cambia este valor si el subdirectorio es diferente
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    rollupOptions: {
      output: {
        assetFileNames: 'static/[name].[hash][extname]',
        chunkFileNames: 'static/[name].[hash].js',
        entryFileNames: 'static/[name].[hash].js',
      },
    },
  },
})

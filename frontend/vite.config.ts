import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
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
    define: {
      // Exponer variables de entorno al cliente
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})

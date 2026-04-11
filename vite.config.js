import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('@tanstack')) return 'vendor-tanstack';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1600,
  }
})

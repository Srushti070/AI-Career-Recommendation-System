import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages uses a repository subpath.
  // Vercel continues to use "/".
  base: process.env.GITHUB_ACTIONS
    ? '/AI-Career-Recommendation-System/'
    : '/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
    strictPort: true,
  },

  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
  },
})
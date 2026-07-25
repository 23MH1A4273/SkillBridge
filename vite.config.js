import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
    proxy: {
      '/api/jobs': {
        target: 'https://jsearch.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jobs/, '')
      },
      '/api/ai': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            'firebase/storage'
          ],
          'vendor-ml': ['@xenova/transformers'],
          'vendor-utils': [
            'recharts',
            'pdfjs-dist',
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            '@dnd-kit/utilities',
            'marked'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/']
    }
  }
});

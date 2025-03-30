import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        // In development, use local server
        target: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3000'
          : 'https://vandy-lost-and-found-2ff42902dec4.herokuapp.com',
        changeOrigin: true,
      }
    }
  }
});
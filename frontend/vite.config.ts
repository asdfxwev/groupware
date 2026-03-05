import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: '../src/main/resources/static',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'login.html'),
        signup: resolve(__dirname, 'signup.html'),
        board: resolve(__dirname, 'board.html'),
        detail: resolve(__dirname, 'detail.html'),
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/board': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/signup': 'http://localhost:8080',
      '/api': 'http://localhost:8080',
    },
  },
})

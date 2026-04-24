// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    react(),
    mkcert()
  ],
  server: {
    // @ts-ignore - mkcert добавляет https
    https: true,
    port: 5173,
    host: true
  },
  resolve: {
    tsconfigPaths: true,
  },
});
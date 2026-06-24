import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mockApiPlugin } from './src/mocks/server';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
  build: {
    sourcemap: true,
  },
  server: {
    allowedHosts: true,
  },
});

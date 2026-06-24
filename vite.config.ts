import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The mock API runs in the browser (see src/mocks/browser.ts), so it works in
// both dev and the deployed static build — no dev-server middleware needed.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    allowedHosts: true,
  },
});

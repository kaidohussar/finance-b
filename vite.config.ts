import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const mockApiPlugin = (): Plugin => ({
  name: 'mock-api',
  configureServer(server) {
    server.middlewares.use('/generate-report', (_req, res) => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          error: 'Internal Server Error',
          message: 'Failed to generate report',
        })
      );
    });
  },
});

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

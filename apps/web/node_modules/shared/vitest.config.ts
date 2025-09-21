// vitest.config.ts - Root configuration
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    // Use jsdom by default for tests in the 'apps/web' directory
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', './apps/api/**'],
    reporters: ['default', ['junit', { outputFile: 'artifacts/junit/unit-results.xml' }]],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'artifacts/coverage',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.config.{ts,js}',
        '**/.pnpm/**',
        '**/apps/web/public/build/**',
        '**/build/server-assets-manifest:*',
        '**/build/server-entry-module:*',
        '**/@remix-run/**',
      ],
    },
  },
});
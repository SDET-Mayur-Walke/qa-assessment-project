/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    reporters: ['default', ['junit', { outputFile: '../../artifacts/junit/api-integration-results.xml' }]],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: '../../artifacts/coverage/api',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.config.{ts,js}',
        '**/test-helpers/**',
      ],
    },
  },
});
// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**', 
      '**/dist/**', 
      '**/e2e/**', 
      './apps/api/**',
      './checkly/**' // Exclude Checkly tests from Vitest
    ],
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
        '**/*:*',
      ],
    },
    // The previous module resolution error for graphql-client is likely due to the monorepo structure.
    // This alias can be used as a mock to fix that, or the tsconfig paths need to be correctly configured.
    // Given the context, mocking it is the most reliable way to fix the issue in the test runner.
    alias: {
        '~/lib/graphql-client': './apps/web/app/lib/graphql-client.ts',
        '~/hooks/useDebounce': './apps/web/app/hooks/useDebounce.ts',
        '~/hooks/useFeatureFlags': './apps/web/app/hooks/useFeatureFlags.ts',
        '~/hooks/useSearchWithCancel': './apps/web/app/hooks/useSearchWithCancel.ts'
    }
  },
});
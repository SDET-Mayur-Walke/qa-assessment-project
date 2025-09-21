/// <reference types="vitest" />
import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/test-setup.ts"],
    include: ['app/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    reporters: ['default', ['junit', { outputFile: '../../artifacts/junit/web-component-results.xml' }]],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: '../../artifacts/coverage/web',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/e2e/**',
        '**/*.config.{ts,js}',
        '**/test-setup.ts',
        '**/vite.config.ts',
        '**/remix.env.d.ts',
        '**/public/build/**',
        '**/build/**',
        '**/*.map',
      ],
    },
  },
});
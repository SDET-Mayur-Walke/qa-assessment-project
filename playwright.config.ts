// playwright.config.ts - Configured for QA Assessment
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './apps/web/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Global timeout for each test */
  timeout: 30 * 1000,
  /* Global timeout for the whole test run */
  globalTimeout: 60 * 60 * 1000, // 1 hour

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['junit', { outputFile: 'artifacts/junit/e2e-results.xml' }],
    ['html', { open: 'never', outputFolder: 'artifacts/playwright-report' }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',

    /* Additional browser context options */
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Add specific options for Chromium if needed
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // Add specific options for Firefox if needed
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        // Add specific options for WebKit if needed
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'pnpm --filter ./apps/api dev',
      port: 4000,
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000, // 2 minutes for API to start
    },
    {
      command: 'pnpm --filter ./apps/web dev',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000, // 2 minutes for web to start
    },
  ],

  /* Global setup and teardown */
  globalSetup: require.resolve('./apps/web/e2e/global-setup.ts'),
  globalTeardown: require.resolve('./apps/web/e2e/global-teardown.ts'),
});
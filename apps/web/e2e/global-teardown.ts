// apps/web/e2e/global-teardown.ts
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown...');
  
  // Optional: Clean up any global resources
  // This runs once after all tests
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;

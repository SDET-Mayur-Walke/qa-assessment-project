// apps/web/e2e/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global setup...');
  
  // Optional: Seed the database or perform other global setup
  // This runs once before all tests
  
  console.log('✅ Global setup completed');
}

export default globalSetup;

// Checkly configuration for synthetic monitoring
// This is a skeleton configuration - marked as local run only
// Candidates can extend this for production monitoring

import { defineConfig } from "checkly";

export default defineConfig({
  projectName: "QA Assessment App",
  logicalId: "qa-assessment",
  
  // NOTE: This is configured for LOCAL RUN ONLY
  // Update these settings for production deployment
  repoUrl: "https://github.com/your-org/qa-assessment",
  
  checks: {
    // Global check configuration
    frequency: 5, // Run every 5 minutes
    locations: ["us-east-1", "eu-west-1"],
    tags: ["qa-assessment", "local"],
    
    // Global environment variables
    environmentVariables: [
      {
        key: "BASE_URL",
        value: "http://localhost:3000"
      }
    ],
    
    // Browser check defaults
    browserChecks: {
      frequency: 10,
      testMatch: "**/checkly/**/*.check.ts"
    },
    
    // API check defaults  
    apiChecks: {
      frequency: 2,
    }
  },

  cli: {
    runLocation: "eu-west-1",
    
    // Only run locally by default
    privateRunOnly: true
  }
});

// Example API check - commented out
/*
import { ApiCheck, AssertionBuilder } from "checkly/constructs";

new ApiCheck("api-health-check", {
  name: "API Health Check",
  request: {
    method: "GET",
    url: "{{BASE_URL}}/healthz",
    headers: {
      "Accept": "application/json"
    }
  },
  assertions: [
    AssertionBuilder.statusCode().equals(200),
    AssertionBuilder.responseTime().lessThan(1000),
    AssertionBuilder.jsonBody().contains("ok")
  ],
  tags: ["api", "health"]
});
*/

// Example browser check - commented out  
/*
import { BrowserCheck } from "checkly/constructs";

new BrowserCheck("homepage-check", {
  name: "Homepage Loads Successfully",
  code: {
    content: `
const { expect, test } = require("@playwright/test");

test("Homepage loads and shows products", async ({ page }) => {
  await page.goto("{{BASE_URL}}");
  
  await expect(page).toHaveTitle(/Coffee Shop/);
  await expect(page.locator('[data-testid="product-card"]')).toHaveCount({ min: 1 });
  
  // Check search functionality
  await page.fill('[data-testid="search-input"]', "coffee");
  await page.waitForTimeout(500);
  
  const productCards = page.locator('[data-testid="product-card"]');
  await expect(productCards).toHaveCount({ min: 1 });
});
    `
  },
  tags: ["ui", "core-flow"]
});
*/
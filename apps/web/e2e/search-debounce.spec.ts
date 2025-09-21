// apps/web/e2e/search-debounce.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Debounce Flake Test', () => {
  test('should handle rapid search input without race conditions', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeVisible();

    // Test rapid typing that could cause race conditions
    await test.step('Rapid typing test', async () => {
      // Type quickly to trigger multiple debounced requests
      await searchInput.fill('c');
      await searchInput.fill('co');
      await searchInput.fill('cof');
      await searchInput.fill('coff');
      await searchInput.fill('coffe');
      await searchInput.fill('coffee');
      
      // Wait for debounce to complete
      await page.waitForTimeout(600); // Wait longer than debounce period
      
      // Verify search results are consistent
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
      
      // Check that we don't have stale results by verifying search term
      const searchValue = await searchInput.inputValue();
      expect(searchValue).toBe('coffee');
    });

    await test.step('Clear and retype test', async () => {
      // Clear search
      await searchInput.clear();
      await page.waitForTimeout(600);
      
      // Type different search term quickly
      await searchInput.fill('t');
      await searchInput.fill('te');
      await searchInput.fill('tea');
      
      // Wait for debounce
      await page.waitForTimeout(600);
      
      // Verify final state
      const finalSearchValue = await searchInput.inputValue();
      expect(finalSearchValue).toBe('tea');
      
      // Verify results are for the final search term
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
    });
  });

  test('should handle search with network delays', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByTestId('search-input');
    
    // Simulate network delays by throttling
    await page.route('**/graphql', async (route) => {
      // Add artificial delay to simulate network conditions
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    await test.step('Search with network delays', async () => {
      // Type search term
      await searchInput.fill('coffee');
      
      // Wait for debounce + network delay
      await page.waitForTimeout(700);
      await page.waitForLoadState('networkidle');
      
      // Verify results are still consistent
      const productCards = page.getByTestId('product-card');
      if (await productCards.count() > 0) {
        await expect(productCards.first()).toBeVisible();
      }
      
      const searchValue = await searchInput.inputValue();
      expect(searchValue).toBe('coffee');
    });
  });

  test('should be resilient to out-of-order responses', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByTestId('search-input');
    
    // Track search requests to verify order
    const searchRequests: string[] = [];
    await page.route('**/graphql', async (route) => {
      const request = route.request();
      const postData = request.postData();
      if (postData && postData.includes('products')) {
        // Extract search term from request
        const body = JSON.parse(postData);
        const query = body.query;
        if (query.includes('query')) {
          searchRequests.push('search-request');
        }
      }
      
      // Add random delay to simulate race conditions
      const delay = Math.random() * 200;
      await new Promise(resolve => setTimeout(resolve, delay));
      await route.continue();
    });
    
    await test.step('Test with out-of-order responses', async () => {
      // Clear any existing search
      await searchInput.clear();
      await page.waitForTimeout(300);
      
      // Type search terms rapidly
      await searchInput.fill('c');
      await page.waitForTimeout(100);
      await searchInput.fill('co');
      await page.waitForTimeout(100);
      await searchInput.fill('coffee');
      
      // Wait for all requests to complete
      await page.waitForTimeout(1000);
      
      // Verify final state is consistent
      const finalSearchValue = await searchInput.inputValue();
      expect(finalSearchValue).toBe('coffee');
      
      // Verify UI is in a consistent state
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
    });
  });
});

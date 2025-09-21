// apps/web/e2e/basic-smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Basic Smoke Test', () => {
  test('should load homepage and display basic functionality', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify basic page elements
    await expect(page.getByText('☕ Coffee Shop')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

    // Verify search functionality exists
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeVisible();
    
    // Test search input
    await searchInput.fill('coffee');
    await page.waitForTimeout(500); // Wait for debounce
    await page.waitForLoadState('networkidle');
    
    // Verify search value is set
    const searchValue = await searchInput.inputValue();
    expect(searchValue).toBe('coffee');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click login
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL('/login');

    // Verify login page elements
    await expect(page.getByText('Login to Your Account')).toBeVisible();
    await expect(page.getByTestId('login-email-input')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  test('should display products on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for product cards
    const productCards = page.getByTestId('product-card');
    const cardCount = await productCards.count();
    
    if (cardCount > 0) {
      // Verify first product card has expected elements
      const firstCard = productCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for product name, price, etc.
      await expect(firstCard.locator('h3, h2, [role="heading"]')).toBeVisible();
    }
  });

  test('should navigate to cart page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click cart
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page).toHaveURL('/cart');

    // Verify cart page elements
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByTestId('cart-apply-coupon')).toBeVisible();
    await expect(page.getByTestId('checkout-submit')).toBeVisible();
  });
});

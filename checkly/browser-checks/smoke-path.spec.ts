// checkly/browser-checks/smoke-path.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Production Smoke Path', () => {
  test('should complete full user journey: browse → add to cart → apply coupon → checkout', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByText('☕ Coffee Shop')).toBeVisible();

    // Step 1: Browse products and add to cart
    await test.step('Add product to cart', async () => {
      // Verify products are displayed
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
      
      // Click on the first product card to view details
      await productCards.first().click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/products\/.+/);

      // Add to cart
      await page.getByTestId('add-to-cart').click();
      await expect(page.getByText('✅ Added to cart successfully!')).toBeVisible();

      // Navigate back to homepage to verify cart count
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Verify cart count is visible (should show 1)
      await expect(page.getByTestId('cart-count')).toHaveText('1');
    });

    // Step 2: Go to cart, apply coupon, and checkout
    await test.step('Apply coupon and checkout', async () => {
      await page.getByRole('link', { name: 'Cart' }).click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL('/cart');
      await expect(page.getByText('Your Cart')).toBeVisible();

      // Apply coupon
      await page.getByTestId('cart-apply-coupon').fill('WELCOME10');
      await page.getByRole('button', { name: 'Apply' }).click();
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('Coupon "WELCOME10" applied!')).toBeVisible();

      // Proceed to checkout
      await page.getByTestId('checkout-submit').click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL('/checkout');
      await expect(page.getByText('Order Summary')).toBeVisible();

      // Complete order
      await page.getByTestId('complete-order').click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/orders\/.+/);
      await expect(page.getByText('Order Confirmed!')).toBeVisible();
      await expect(page.getByText(/Order Number: #\d+/)).toBeVisible();
    });

    // Step 3: Verify search functionality
    await test.step('Test search functionality', async () => {
      // Navigate back to homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const searchInput = page.getByTestId('search-input');
      await searchInput.fill('coffee');
      await page.waitForLoadState('networkidle');

      // Verify search results
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
      expect(await productCards.count()).toBeGreaterThan(0);
    });
  });

  test('should handle search functionality correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByTestId('search-input');
    
    // Test search
    await searchInput.fill('tea');
    await page.waitForLoadState('networkidle');

    // Verify search results
    const productCards = page.getByTestId('product-card');
    await expect(productCards.first()).toBeVisible();
    expect(await productCards.count()).toBeGreaterThan(0);
    await expect(page.getByText(/product.* found for "tea"/)).toBeVisible();

    // Test clear search
    await searchInput.clear();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/product.* found/)).not.toBeVisible();
  });

  test('should display product details correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on first product
    const productCards = page.getByTestId('product-card');
    await productCards.first().click();
    await page.waitForLoadState('networkidle');

    // Verify product details page
    await expect(page).toHaveURL(/products\/.+/);
    await expect(page.getByTestId('add-to-cart')).toBeVisible();
    
    // Verify product information is displayed
    await expect(page.getByText(/\$[\d.]+/)).toBeVisible(); // Price
    await expect(page.getByText(/In Stock|Out of Stock/)).toBeVisible(); // Stock status
  });
});

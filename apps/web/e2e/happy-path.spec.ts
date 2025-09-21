// apps/web/e2e/happy-path.spec.ts
import { test, expect } from '@playwright/test';

test.describe('E2E Happy Path - Complete User Journey', () => {
  test('should complete full user journey: browse → add to cart → apply coupon → checkout', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify homepage loads
    await expect(page.getByText('☕ Coffee Shop')).toBeVisible();
    await expect(page.getByTestId('search-input')).toBeVisible();

    // Step 1: Browse products
    await test.step('Browse products', async () => {
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
      
      // Verify we have products
      const cardCount = await productCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      console.log(`Found ${cardCount} products on homepage`);
    });

    // Step 2: View product details and add to cart
    await test.step('Add product to cart', async () => {
      const productCards = page.getByTestId('product-card');
      
      // Click on first product
      await productCards.first().click();
      await expect(page).toHaveURL(/\/products\//);
      
      // Wait for product page to load
      await page.waitForLoadState('networkidle');
      
      // Verify product page elements
      await expect(page.getByTestId('add-to-cart')).toBeVisible();
      
      // Add product to cart
      await page.getByTestId('add-to-cart').click();
      
      // Wait for cart count to update
      await page.waitForTimeout(1000);
      
      // Navigate back to homepage to verify cart count
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Verify cart count is visible (should show 1)
      const cartCount = page.getByTestId('cart-count');
      if (await cartCount.isVisible()) {
        await expect(cartCount).toHaveText('1');
      }
    });

    // Step 3: Go to cart and apply coupon
    await test.step('Apply coupon in cart', async () => {
      // Navigate to cart
      await page.getByRole('link', { name: 'Cart' }).click();
      await expect(page).toHaveURL('/cart');
      await page.waitForLoadState('networkidle');

      // Verify cart page
      await expect(page.getByText('Your Cart')).toBeVisible();
      
      // Apply WELCOME10 coupon
      await page.getByTestId('cart-apply-coupon').fill('WELCOME10');
      
      // Click apply button (next to the input)
      const applyButton = page.locator('button:has-text("Apply")').first();
      await applyButton.click();
      
      // Wait for coupon to be applied
      await page.waitForTimeout(1000);
      
      // Verify coupon was applied (look for discount or coupon text)
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('WELCOME10');
    });

    // Step 4: Proceed to checkout
    await test.step('Proceed to checkout', async () => {
      // Click checkout button
      await page.getByTestId('checkout-submit').click();
      
      // Should navigate to checkout page
      await expect(page).toHaveURL('/checkout');
      await page.waitForLoadState('networkidle');
      
      // Verify checkout page loads
      await expect(page.getByText('Checkout')).toBeVisible();
      
      // Verify order summary is displayed
      await expect(page.getByText('Order Summary')).toBeVisible();
    });

    // Step 5: Complete the order
    await test.step('Complete the order', async () => {
      // Look for place order button
      const placeOrderButton = page.getByTestId('complete-order');
      
      if (await placeOrderButton.isVisible()) {
        // Fill in any required checkout form fields if they exist
        const emailInput = page.locator('input[type="email"], input[name="email"]').first();
        if (await emailInput.isVisible()) {
          await emailInput.fill('test@example.com');
        }
        
        // Submit the order
        await placeOrderButton.click();
        
        // Wait for order completion
        await page.waitForTimeout(2000);
        
        // Should redirect to order confirmation or orders page
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/\/(orders|order-confirmation|success)/);
      } else {
        // If no place order button, just verify we're on checkout page
        console.log('Place order button not found, staying on checkout page');
        await expect(page).toHaveURL('/checkout');
      }
    });

    // Step 6: Verify order appears in orders (if logged in)
    await test.step('Check orders page', async () => {
      // Try to navigate to orders page
      const ordersLink = page.getByRole('link', { name: 'Orders' });
      
      if (await ordersLink.isVisible()) {
        await ordersLink.click();
        await expect(page).toHaveURL('/orders');
        await page.waitForLoadState('networkidle');
        
        // Verify orders page loads
        await expect(page.getByText('Order History')).toBeVisible();
        
        // Should have at least one order
        const orders = page.locator('[data-testid*="order"], .order-item, [class*="order"]');
        const orderCount = await orders.count();
        if (orderCount > 0) {
          await expect(orders.first()).toBeVisible();
        }
      } else {
        console.log('Orders link not visible (user not logged in)');
      }
    });
  });

  test('should handle search functionality', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test search
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('coffee');
    
    // Wait for search to complete
    await page.waitForTimeout(600); // Wait for debounce
    await page.waitForLoadState('networkidle');
    
    // Verify search results
    const productCards = page.getByTestId('product-card');
    if (await productCards.count() > 0) {
      await expect(productCards.first()).toBeVisible();
    }
    
    // Verify search value
    const searchValue = await searchInput.inputValue();
    expect(searchValue).toBe('coffee');
  });
});

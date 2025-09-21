// apps/web/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('E2E Smoke Test - Complete Happy Path', () => {
  test('should complete full user journey: login → browse → add to cart → apply coupon → checkout', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify homepage loads correctly
    await expect(page.getByText('☕ Coffee Shop')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

    // Step 1: Login with email code
    await test.step('Login with email code', async () => {
      // Click login button
      await page.getByRole('link', { name: 'Login' }).click();
      await expect(page).toHaveURL('/login');

      // Enter email
      await page.getByTestId('login-email-input').fill('demo@acme.test');
      await page.getByTestId('login-submit').click();

      // Wait for code request to complete and page to update
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('Enter the 6-digit code')).toBeVisible();

      // Get the login code from the test endpoint
      const mailboxResponse = await page.request.get('http://localhost:4000/__test__/mailbox?email=demo@acme.test');
      const mailboxData = await mailboxResponse.json();
      const loginCode = mailboxData.code;

      // Enter the code - look for the code input field
      const codeInput = page.locator('input[type="text"], input[name="code"]').first();
      await codeInput.fill(loginCode);
      
      // Click the verify button
      await page.getByRole('button', { name: /verify|confirm/i }).click();

      // Verify login success - should redirect and show user info
      await expect(page).toHaveURL('/');
      await expect(page.getByText('demo@acme.test')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Orders' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    });

    // Step 2: Browse products
    await test.step('Browse products', async () => {
      // Verify products are displayed
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
      
      // Check that we have multiple products
      const productCount = await productCards.count();
      expect(productCount).toBeGreaterThan(0);

      // Verify product information is displayed
      await expect(productCards.first().getByRole('heading')).toBeVisible();
      await expect(productCards.first().getByText(/\$/)).toBeVisible(); // Price
    });

    // Step 3: View product details and add to cart
    await test.step('View product details and add to cart', async () => {
      // Click on first product
      await productCards.first().click();
      
      // Should navigate to product detail page
      await expect(page).toHaveURL(/\/products\//);
      
      // Verify product details page loads
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText(/\$/)).toBeVisible(); // Price
      
      // Add product to cart
      await page.getByTestId('add-to-cart').click();
      
      // Verify cart count updates
      await expect(page.getByTestId('cart-count')).toHaveText('1');
    });

    // Step 4: Go to cart and apply coupon
    await test.step('Go to cart and apply coupon', async () => {
      // Navigate to cart
      await page.getByText('Cart').click();
      await expect(page).toHaveURL('/cart');

      // Verify cart contents
      await expect(page.getByText('Shopping Cart')).toBeVisible();
      await expect(page.getByTestId('cart-version')).toBeVisible();
      
      // Verify item is in cart
      const cartItems = page.getByTestId('cart-item');
      await expect(cartItems.first()).toBeVisible();
      
      // Apply WELCOME10 coupon
      await page.getByTestId('cart-apply-coupon').fill('WELCOME10');
      await page.getByTestId('cart-apply-coupon-button').click();
      
      // Verify coupon was applied
      await expect(page.getByText('WELCOME10')).toBeVisible();
      await expect(page.getByText('Discount')).toBeVisible();
    });

    // Step 5: Proceed to checkout
    await test.step('Proceed to checkout', async () => {
      // Click checkout button
      await page.getByTestId('checkout-submit').click();
      
      // Should navigate to checkout page
      await expect(page).toHaveURL('/checkout');
      
      // Verify checkout page loads
      await expect(page.getByText('Checkout')).toBeVisible();
      await expect(page.getByText('Order Summary')).toBeVisible();
      
      // Verify order details are displayed
      await expect(page.getByText(/\$/)).toBeVisible(); // Total price
      await expect(page.getByText('WELCOME10')).toBeVisible(); // Applied coupon
    });

    // Step 6: Complete the order
    await test.step('Complete the order', async () => {
      // Fill in checkout form (if required)
      // Note: The actual checkout implementation may vary
      
      // Submit the order
      await page.getByTestId('place-order').click();
      
      // Should redirect to order confirmation or orders page
      await expect(page).toHaveURL(/\/(orders|order-confirmation)/);
      
      // Verify order completion
      await expect(page.getByText(/Order|Confirmation/)).toBeVisible();
    });

    // Step 7: Verify order appears in orders list
    await test.step('Verify order in orders list', async () => {
      // Navigate to orders page
      await page.getByText('Orders').click();
      await expect(page).toHaveURL('/orders');
      
      // Verify orders page loads
      await expect(page.getByText('Order History')).toBeVisible();
      
      // Should have at least one order
      const orders = page.getByTestId('order-item');
      await expect(orders.first()).toBeVisible();
    });
  });

  test('should handle search functionality', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Test search functionality
    await test.step('Search for products', async () => {
      const searchInput = page.getByTestId('search-input');
      await expect(searchInput).toBeVisible();
      
      // Type in search box
      await searchInput.fill('coffee');
      
      // Wait for search results to update (debounced)
      await page.waitForTimeout(500); // Wait for debounce
      
      // Verify search results are displayed
      const productCards = page.getByTestId('product-card');
      await expect(productCards.first()).toBeVisible();
      
      // Clear search
      await searchInput.clear();
      await page.waitForTimeout(500);
      
      // Should show all products again
      await expect(productCards.first()).toBeVisible();
    });
  });

  test('should handle cart operations correctly', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Add multiple items to cart
    await test.step('Add multiple items to cart', async () => {
      const productCards = page.getByTestId('product-card');
      
      // Add first product
      await productCards.first().click();
      await page.getByTestId('add-to-cart').click();
      await page.goBack();
      
      // Add second product (if available)
      const cardCount = await productCards.count();
      if (cardCount > 1) {
        await productCards.nth(1).click();
        await page.getByTestId('add-to-cart').click();
        await page.goBack();
      }
      
      // Verify cart count
      await expect(page.getByTestId('cart-count')).toHaveText(cardCount > 1 ? '2' : '1');
    });
    
    // Go to cart and test cart operations
    await test.step('Test cart operations', async () => {
      await page.getByRole('link', { name: 'Cart' }).click();
      
      // Wait for cart page to load
      await page.waitForLoadState('networkidle');
      
      // Check if there are items in cart
      const cartItems = page.locator('[data-testid*="cart"], .cart-item, [class*="cart"]');
      const itemCount = await cartItems.count();
      
      if (itemCount > 0) {
        // Try to find quantity input and update button
        const quantityInput = page.locator('input[type="number"], input[name="quantity"]').first();
        const updateButton = page.locator('button[type="submit"], button:has-text("Update")').first();
        
        if (await quantityInput.isVisible()) {
          await quantityInput.fill('2');
          if (await updateButton.isVisible()) {
            await updateButton.click();
          }
        }
        
        // Try to find remove button
        const removeButton = page.locator('button:has-text("Remove"), button:has-text("Delete")').first();
        if (await removeButton.isVisible()) {
          await removeButton.click();
        }
      }
      
      // Verify we're still on cart page
      await expect(page).toHaveURL('/cart');
    });
  });
});

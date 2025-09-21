// packages/shared/tests/utils.test.ts
import { describe, it, expect } from 'vitest';
import { 
  formatMoney, 
  parseFeatureFlags, 
  generateOrderNumber, 
  generateCartId,
  type User,
  type Product,
  type Cart
} from '../src/index.js';

describe('Shared Utilities', () => {
  // Test 1: formatMoney function - happy path
  it('should format cents to dollars correctly', () => {
    expect(formatMoney(1234)).toBe('$12.34');
    expect(formatMoney(0)).toBe('$0.00');
    expect(formatMoney(100)).toBe('$1.00');
  });

  // Test 2: formatMoney function - edge cases
  it('should handle large numbers and decimals correctly', () => {
    expect(formatMoney(999999)).toBe('$9999.99');
    expect(formatMoney(1)).toBe('$0.01');
  });

  // Test 3: parseFeatureFlags function - happy path with valid flags
  it('should parse feature flag headers correctly', () => {
    const header = 'FEATURE_NEW_CART=true,BUG_DEBOUNCE_RACE=false';
    const result = parseFeatureFlags(header);
    expect(result).toEqual({
      'FEATURE_NEW_CART': true,
      'BUG_DEBOUNCE_RACE': false
    });
  });

  // Test 4: parseFeatureFlags function - edge cases
  it('should handle empty or malformed feature flag headers', () => {
    expect(parseFeatureFlags()).toEqual({});
    expect(parseFeatureFlags('')).toEqual({});
    // When there's no = sign, the key becomes the whole string and value defaults to false
    expect(parseFeatureFlags('INVALID_FORMAT')).toEqual({ 'INVALID_FORMAT': false });
  });

  // Test 5: generateOrderNumber function - demonstrates type safety and format
  it('should generate valid order numbers with correct format', () => {
    const orderNumber = generateOrderNumber();
    expect(orderNumber).toMatch(/^ORD-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(orderNumber.startsWith('ORD-')).toBe(true);
  });

  // Test 6: generateCartId function - edge case and uniqueness
  it('should generate unique cart IDs with correct format', () => {
    const cartId1 = generateCartId();
    const cartId2 = generateCartId();
    
    expect(cartId1).toMatch(/^cart_\d+_[a-z0-9]+$/);
    expect(cartId1).not.toBe(cartId2); // Should be unique
    expect(cartId1.startsWith('cart_')).toBe(true);
  });

  // Test 7: Type definitions - demonstrating TypeScript type checking
  it('should have correct type definitions for User interface', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    };
    
    expect(user.id).toBe('1');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  // Test 8: Type definitions - demonstrating optional properties
  it('should handle optional properties correctly in Product interface', () => {
    const product: Product = {
      id: '1',
      slug: 'test-product',
      name: 'Test Product',
      price: 1000,
      inStock: true,
      tags: ['test', 'example']
    };
    
    expect(product.description).toBeUndefined();
    expect(product.imageUrl).toBeUndefined();
    expect(product.tags).toEqual(['test', 'example']);
  });
});
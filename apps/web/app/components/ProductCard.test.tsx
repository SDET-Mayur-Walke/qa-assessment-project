// apps/web/app/components/ProductCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock product data
const mockProduct = {
  id: '1',
  slug: 'test-product',
  name: 'Test Coffee',
  price: 1299, // $12.99 in cents
  inStock: true,
  description: 'A delicious test coffee blend',
  imageUrl: 'https://example.com/coffee.jpg',
  tags: ['coffee', 'premium']
};

const mockProductNoImage = {
  id: '2',
  slug: 'test-product-2',
  name: 'Test Coffee 2',
  price: 899, // $8.99 in cents
  inStock: false,
  description: 'Another test coffee blend',
  tags: ['coffee', 'organic']
};

describe('ProductCard Component', () => {
  // Test 1: Renders product information correctly
  it('should render product name, price, and description', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Coffee')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('A delicious test coffee blend')).toBeInTheDocument();
  });

  // Test 2: Displays product image when available
  it('should display product image when imageUrl is provided', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText('Test Coffee');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/coffee.jpg');
    expect(image).toHaveClass('h-48', 'w-full', 'object-cover');
  });

  // Test 3: Shows placeholder when no image is provided
  it('should show placeholder when imageUrl is not provided', () => {
    const productWithoutImage = { ...mockProduct, imageUrl: undefined };
    render(<ProductCard product={productWithoutImage} />);
    
    // Should not have an image
    expect(screen.queryByAltText('Test Coffee')).not.toBeInTheDocument();
    
    // Should have placeholder emoji
    expect(screen.getByText('📦')).toBeInTheDocument();
  });

  // Test 4: Displays out of stock indicator when product is not in stock
  it('should show out of stock indicator when product is not in stock', () => {
    render(<ProductCard product={mockProductNoImage} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    expect(screen.getByText('Out of Stock')).toHaveClass('text-red-600');
  });

  // Test 5: Renders product tags correctly
  it('should display all product tags', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('coffee')).toBeInTheDocument();
    expect(screen.getByText('premium')).toBeInTheDocument();
    
    // Check that tags have correct styling
    const coffeeTag = screen.getByText('coffee');
    expect(coffeeTag).toHaveClass('bg-gray-100', 'text-gray-800', 'text-xs', 'px-2', 'py-1', 'rounded');
  });

  // Test 6: Card has correct test ID and links to product page
  it('should have correct test ID and link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const productCard = screen.getByTestId('product-card');
    expect(productCard).toBeInTheDocument();
    
    // Check that there's a link with the correct href
    const productLink = screen.getByRole('link');
    expect(productLink).toHaveAttribute('href', '/products/test-product');
  });

  // Test 7: Formats price correctly using shared utility
  it('should format price correctly using formatMoney utility', () => {
    const expensiveProduct = { ...mockProduct, price: 2499 }; // $24.99
    render(<ProductCard product={expensiveProduct} />);
    
    expect(screen.getByText('$24.99')).toBeInTheDocument();
  });

  // Test 8: Handles product without description gracefully
  it('should render without description section when description is not provided', () => {
    const productWithoutDescription = { ...mockProduct, description: undefined };
    render(<ProductCard product={productWithoutDescription} />);
    
    // Product name and price should still be visible
    expect(screen.getByText('Test Coffee')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    
    // Description should not be rendered
    expect(screen.queryByText('A delicious test coffee blend')).not.toBeInTheDocument();
  });
});

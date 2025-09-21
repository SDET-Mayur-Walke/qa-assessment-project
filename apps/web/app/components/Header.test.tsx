// apps/web/app/components/Header.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

// Mock Remix components
vi.mock('@remix-run/react', () => ({
  Link: ({ to, children, className, ...props }: any) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  ),
  Form: ({ method, action, children, ...props }: any) => (
    <form method={method} action={action} {...props}>
      {children}
    </form>
  ),
}));

describe('Header Component', () => {
  // Test 1: Renders basic header elements for anonymous user
  it('should render header with logo and navigation links for anonymous user', () => {
    render(<Header />);
    
    // Check logo is present
    expect(screen.getByText('☕ Coffee Shop')).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    
    // Check login button is present
    expect(screen.getByText('Login')).toBeInTheDocument();
    
    // Cart count should not be visible when cartCount is 0
    expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument();
  });

  // Test 2: Shows cart count when items are in cart
  it('should display cart count badge when cartCount is greater than 0', () => {
    render(<Header cartCount={3} />);
    
    const cartCountBadge = screen.getByTestId('cart-count');
    expect(cartCountBadge).toBeInTheDocument();
    expect(cartCountBadge).toHaveTextContent('3');
  });

  // Test 3: Renders user-specific navigation when user is logged in
  it('should show user navigation when user is logged in', () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'John Doe'
    };
    
    render(<Header user={mockUser} cartCount={2} />);
    
    // Should show user name/email
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Should show Orders link
    expect(screen.getByText('Orders')).toBeInTheDocument();
    
    // Should show Logout button
    expect(screen.getByText('Logout')).toBeInTheDocument();
    
    // Should not show Login button
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    
    // Cart count should still be visible
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
  });

  // Test 4: Uses email when name is not provided
  it('should display email when user name is not provided', () => {
    const mockUser = {
      email: 'test@example.com'
    };
    
    render(<Header user={mockUser} />);
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  // Test 5: Interactive elements work correctly
  it('should have proper links and form elements', () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'John Doe'
    };
    
    render(<Header user={mockUser} cartCount={1} />);
    
    // Check that links have correct href attributes
    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toHaveAttribute('href', '/');
    
    const cartLink = screen.getByText('Cart').closest('a');
    expect(cartLink).toHaveAttribute('href', '/cart');
    
    const ordersLink = screen.getByText('Orders').closest('a');
    expect(ordersLink).toHaveAttribute('href', '/orders');
    
    // Check logout form
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton.closest('form')).toHaveAttribute('action', '/logout');
    expect(logoutButton.closest('form')).toHaveAttribute('method', 'post');
  });
});

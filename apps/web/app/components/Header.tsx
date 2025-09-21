import { Link, Form } from "@remix-run/react";
import { formatMoney } from "shared";

interface HeaderProps {
  user?: {
    email: string;
    name?: string;
  } | null;
  cartCount?: number;
}

export function Header({ user, cartCount = 0 }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              ☕ Coffee Shop
            </Link>
          </div>
          
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900"
            >
              Products
            </Link>
            
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-gray-900 relative"
            >
              Cart
              {cartCount > 0 && (
                <span 
                  data-testid="cart-count"
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/orders" 
                  className="text-gray-700 hover:text-gray-900"
                >
                  Orders
                </Link>
                <span className="text-sm text-gray-600">
                  {user.name || user.email}
                </span>
                <Form method="post" action="/logout">
                  <button 
                    type="submit"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </Form>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
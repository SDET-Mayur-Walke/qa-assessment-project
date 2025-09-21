import { Link, Form } from "@remix-run/react";
import { formatMoney } from "shared";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  inStock: boolean;
  description?: string;
  imageUrl?: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div 
      data-testid="product-card" 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link to={`/products/${product.slug}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📦</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              {formatMoney(product.price)}
            </span>
            
            {!product.inStock && (
              <span className="text-sm text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
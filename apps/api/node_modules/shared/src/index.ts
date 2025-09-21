export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  inStock: boolean;
  description?: string;
  imageUrl?: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  total: number;
  appliedCoupon?: string;
  version: number;
}

export interface Order {
  id: string;
  number: string;
  createdAt: string;
  items: CartItem[];
  total: number;
}

export enum ErrorCode {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  RATE_LIMITED = "RATE_LIMITED",
}

export interface AddToCartInput {
  productId: string;
  quantity?: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface ProductEdge {
  node: Product;
  cursor: string;
}

export interface ProductConnection {
  edges: ProductEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function parseFeatureFlags(headerValue?: string): Record<string, boolean> {
  if (!headerValue) return {};
  
  return headerValue.split(',').reduce((flags, flag) => {
    const [key, value] = flag.split('=');
    flags[key.trim()] = value?.trim().toLowerCase() === 'true';
    return flags;
  }, {} as Record<string, boolean>);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export function generateCartId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}
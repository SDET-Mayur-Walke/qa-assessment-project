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
export declare enum ErrorCode {
    UNAUTHENTICATED = "UNAUTHENTICATED",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    RATE_LIMITED = "RATE_LIMITED"
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
export declare function formatMoney(cents: number): string;
export declare function parseFeatureFlags(headerValue?: string): Record<string, boolean>;
export declare function generateOrderNumber(): string;
export declare function generateCartId(): string;

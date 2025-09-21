import type { Cart, Product, CartItem } from "shared";
import { generateCartId } from "shared";
import { seedData, coupons } from "../data/seed.js";

export function getSessionCart(sessionId?: string): Cart {
  if (!sessionId) {
    return createEmptyCart();
  }
  
  let cart = seedData.carts.get(sessionId);
  if (!cart) {
    cart = createEmptyCart();
    cart.id = sessionId;
    seedData.carts.set(sessionId, cart);
  }
  
  return cart;
}

export function createEmptyCart(): Cart {
  return {
    id: generateCartId(),
    items: [],
    subtotal: 0,
    discountTotal: 0,
    total: 0,
    appliedCoupon: undefined,
    version: 1
  };
}

export function calculateCartTotals(cart: Cart): Cart {
  const subtotal = cart.items.reduce((sum: number, item: CartItem) => sum + item.lineTotal, 0);
  let discountTotal = 0;
  
  if (cart.appliedCoupon) {
    const coupon = coupons[cart.appliedCoupon as keyof typeof coupons];
    if (coupon) {
      if (coupon.type === "percentage") {
        discountTotal = Math.round(subtotal * coupon.discount);
      } else if (coupon.type === "shipping") {
        // Simulate shipping discount (keeping it simple)
        discountTotal = 500; // $5.00 shipping
      }
    }
  }
  
  const total = subtotal - discountTotal;
  
  return {
    ...cart,
    subtotal,
    discountTotal,
    total
  };
}

export function addItemToCart(cart: Cart, product: Product, quantity: number): Cart {
  const existingItemIndex = cart.items.findIndex((item: CartItem) => item.product.id === product.id);
  
  let newItems: CartItem[];
  if (existingItemIndex >= 0) {
    newItems = cart.items.map((item: CartItem, index: number) => 
      index === existingItemIndex 
        ? { ...item, quantity: item.quantity + quantity, lineTotal: (item.quantity + quantity) * product.price }
        : item
    );
  } else {
    const newItem: CartItem = {
      product,
      quantity,
      lineTotal: quantity * product.price
    };
    newItems = [...cart.items, newItem];
  }
  
  const updatedCart = {
    ...cart,
    items: newItems,
    version: cart.version + 1
  };
  
  return calculateCartTotals(updatedCart);
}

export function updateCartItemQuantity(cart: Cart, productId: string, quantity: number): Cart {
  let newItems: CartItem[];
  
  if (quantity <= 0) {
    newItems = cart.items.filter((item: CartItem) => item.product.id !== productId);
  } else {
    newItems = cart.items.map((item: CartItem) =>
      item.product.id === productId
        ? { ...item, quantity, lineTotal: quantity * item.product.price }
        : item
    );
  }
  
  const updatedCart = {
    ...cart,
    items: newItems,
    version: cart.version + 1
  };
  
  return calculateCartTotals(updatedCart);
}

export function removeItemFromCart(cart: Cart, productId: string): Cart {
  const newItems = cart.items.filter((item: CartItem) => item.product.id !== productId);
  
  const updatedCart = {
    ...cart,
    items: newItems,
    version: cart.version + 1
  };
  
  return calculateCartTotals(updatedCart);
}

export function applyCouponToCart(cart: Cart, couponCode: string): Cart {
  const coupon = coupons[couponCode as keyof typeof coupons];
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }
  
  const updatedCart = {
    ...cart,
    appliedCoupon: couponCode,
    version: cart.version + 1
  };
  
  return calculateCartTotals(updatedCart);
}
import { generateCartId } from "shared";
import { seedData, coupons } from "../data/seed.js";
export function getSessionCart(sessionId) {
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
export function createEmptyCart() {
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
export function calculateCartTotals(cart) {
    const subtotal = cart.items.reduce((sum, item) => sum + item.lineTotal, 0);
    let discountTotal = 0;
    if (cart.appliedCoupon) {
        const coupon = coupons[cart.appliedCoupon];
        if (coupon) {
            if (coupon.type === "percentage") {
                discountTotal = Math.round(subtotal * coupon.discount);
            }
            else if (coupon.type === "shipping") {
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
export function addItemToCart(cart, product, quantity) {
    const existingItemIndex = cart.items.findIndex((item) => item.product.id === product.id);
    let newItems;
    if (existingItemIndex >= 0) {
        newItems = cart.items.map((item, index) => index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity, lineTotal: (item.quantity + quantity) * product.price }
            : item);
    }
    else {
        const newItem = {
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
export function updateCartItemQuantity(cart, productId, quantity) {
    let newItems;
    if (quantity <= 0) {
        newItems = cart.items.filter((item) => item.product.id !== productId);
    }
    else {
        newItems = cart.items.map((item) => item.product.id === productId
            ? { ...item, quantity, lineTotal: quantity * item.product.price }
            : item);
    }
    const updatedCart = {
        ...cart,
        items: newItems,
        version: cart.version + 1
    };
    return calculateCartTotals(updatedCart);
}
export function removeItemFromCart(cart, productId) {
    const newItems = cart.items.filter((item) => item.product.id !== productId);
    const updatedCart = {
        ...cart,
        items: newItems,
        version: cart.version + 1
    };
    return calculateCartTotals(updatedCart);
}
export function applyCouponToCart(cart, couponCode) {
    const coupon = coupons[couponCode];
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

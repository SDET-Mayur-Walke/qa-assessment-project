import { GraphQLScalarType, Kind, GraphQLError } from "graphql";
import { generateOrderNumber } from "shared";
import { seedData, getFeatureFlag, getChaosValue } from "../data/seed.js";
import { storeLoginCode, verifyLoginCode, generateJWT } from "../services/auth.js";
import { getSessionCart, addItemToCart, updateCartItemQuantity, removeItemFromCart, applyCouponToCart } from "../services/cart.js";
// Custom scalar resolvers
const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    serialize(value) {
        return value instanceof Date ? value.toISOString() : value;
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
const MoneyScalar = new GraphQLScalarType({
    name: 'Money',
    serialize(value) {
        return typeof value === 'number' ? value : parseInt(value, 10);
    },
    parseValue(value) {
        return typeof value === 'number' ? value : parseInt(value, 10);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    },
});
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function applyResolverDelay(headers) {
    const delayMs = getChaosValue("RESOLVER_DELAY_MS", 0);
    if (delayMs > 0) {
        const jitter = Math.random() * delayMs;
        await delay(jitter);
    }
}
function requireAuth(user) {
    if (!user) {
        throw new GraphQLError("Authentication required", {
            extensions: { code: "UNAUTHENTICATED" }
        });
    }
    return user;
}
export const resolvers = {
    DateTime: DateTimeScalar,
    Money: MoneyScalar,
    Query: {
        health: () => "ok",
        me: async (_, __, context) => {
            await applyResolverDelay(context.reply.request.headers);
            return context.user || null;
        },
        products: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            let products = [...seedData.products];
            // Filter by tag  
            if (args.tag) {
                products = products.filter((p) => p.tags.includes(args.tag));
            }
            // Filter by search query
            if (args.query) {
                const query = args.query.toLowerCase();
                products = products.filter(p => p.name.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query) ||
                    p.tags.some(tag => tag.toLowerCase().includes(query)));
            }
            const first = Math.min(args.first || 10, 50);
            const afterIndex = args.after ? products.findIndex(p => p.id === args.after) + 1 : 0;
            const slice = products.slice(afterIndex, afterIndex + first);
            // INTENTIONAL BUG: Partial products with errors
            const partialProductsBug = getFeatureFlag("PARTIAL_PRODUCTS", context.reply.request.headers);
            let edges = slice.map((product, index) => ({
                node: product,
                cursor: product.id
            }));
            const errors = [];
            if (partialProductsBug && slice.length > 2) {
                // Deterministically corrupt one product based on seed
                const corruptIndex = 2; // Always corrupt the 3rd product
                if (edges[corruptIndex]) {
                    edges[corruptIndex] = { node: null, cursor: edges[corruptIndex].cursor };
                    errors.push(new GraphQLError("Product not visible", {
                        path: ["products", "edges", corruptIndex, "node"],
                        extensions: { code: "UNAUTHENTICATED" }
                    }));
                }
            }
            // Add errors to context if any
            if (errors.length > 0) {
                if (!context.reply.request.mercurius) {
                    context.reply.request.mercurius = {};
                }
                context.reply.request.mercurius.errors = errors;
            }
            return {
                edges,
                pageInfo: {
                    hasNextPage: afterIndex + first < products.length,
                    endCursor: slice.length > 0 ? slice[slice.length - 1].id : undefined
                },
                totalCount: products.length
            };
        },
        product: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            // INTENTIONAL BUG: Occasional failures
            const failRate = getChaosValue("FAIL_RATE_PRODUCT_DETAIL", 0.05);
            if (Math.random() < failRate) {
                throw new GraphQLError("Internal server error", {
                    extensions: { code: "INTERNAL_ERROR" }
                });
            }
            if (args.id) {
                return seedData.products.find(p => p.id === args.id) || null;
            }
            if (args.slug) {
                return seedData.products.find(p => p.slug === args.slug) || null;
            }
            return null;
        },
        cart: async (_, __, context) => {
            await applyResolverDelay(context.reply.request.headers);
            return getSessionCart(context.sessionId);
        },
        orders: async (_, __, context) => {
            const user = requireAuth(context.user);
            await applyResolverDelay(context.reply.request.headers);
            const userOrders = seedData.orders.filter((order) => order.userId === user.id);
            // INTENTIONAL BUG: Sort by local time instead of UTC
            const sortBug = getFeatureFlag("BUG_ORDER_SORT_TZ", context.reply.request.headers);
            if (sortBug) {
                return userOrders.sort((a, b) => {
                    const aLocal = new Date(a.createdAt).toLocaleString();
                    const bLocal = new Date(b.createdAt).toLocaleString();
                    return bLocal.localeCompare(aLocal);
                });
            }
            else {
                return userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
        }
    },
    Mutation: {
        login: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            const user = seedData.users.find(u => u.email === args.email);
            if (!user) {
                throw new GraphQLError("User not found");
            }
            storeLoginCode(args.email);
            return true;
        },
        confirmLogin: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            const user = seedData.users.find(u => u.email === args.email);
            if (!user) {
                throw new GraphQLError("User not found");
            }
            if (!verifyLoginCode(args.email, args.code)) {
                throw new GraphQLError("Invalid or expired code");
            }
            return generateJWT(user);
        },
        addToCart: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            const product = seedData.products.find(p => p.id === args.input.productId);
            if (!product) {
                throw new GraphQLError("Product not found");
            }
            if (!product.inStock) {
                throw new GraphQLError("Product is out of stock", {
                    extensions: { code: "OUT_OF_STOCK" }
                });
            }
            const cart = getSessionCart(context.sessionId);
            const quantity = args.input.quantity || 1;
            const updatedCart = addItemToCart(cart, product, quantity);
            if (context.sessionId) {
                seedData.carts.set(context.sessionId, updatedCart);
            }
            return updatedCart;
        },
        updateCartItem: async (_, args, context) => {
            // INTENTIONAL DELAY for race condition testing
            const featureNewCart = getFeatureFlag("FEATURE_NEW_CART", context.reply.request.headers);
            if (featureNewCart) {
                await delay(150); // 150ms delay to make race condition reproducible
            }
            await applyResolverDelay(context.reply.request.headers);
            const cart = getSessionCart(context.sessionId);
            const updatedCart = updateCartItemQuantity(cart, args.productId, args.quantity);
            if (context.sessionId) {
                seedData.carts.set(context.sessionId, updatedCart);
            }
            return updatedCart;
        },
        removeFromCart: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            const cart = getSessionCart(context.sessionId);
            const updatedCart = removeItemFromCart(cart, args.productId);
            if (context.sessionId) {
                seedData.carts.set(context.sessionId, updatedCart);
            }
            return updatedCart;
        },
        applyCoupon: async (_, args, context) => {
            await applyResolverDelay(context.reply.request.headers);
            // INTENTIONAL BUG: Use stale cart version (race condition)
            const featureNewCart = getFeatureFlag("FEATURE_NEW_CART", context.reply.request.headers);
            let cart = getSessionCart(context.sessionId);
            if (featureNewCart) {
                // Read cart at start, but don't check version before writing
                const staleCart = { ...cart };
                try {
                    const updatedCart = applyCouponToCart(staleCart, args.code);
                    // Write without checking if cart was modified by other operations
                    if (context.sessionId) {
                        seedData.carts.set(context.sessionId, updatedCart);
                    }
                    return updatedCart;
                }
                catch (error) {
                    throw new GraphQLError(error.message);
                }
            }
            else {
                try {
                    const updatedCart = applyCouponToCart(cart, args.code);
                    if (context.sessionId) {
                        seedData.carts.set(context.sessionId, updatedCart);
                    }
                    return updatedCart;
                }
                catch (error) {
                    throw new GraphQLError(error.message);
                }
            }
        },
        checkout: async (_, __, context) => {
            const user = requireAuth(context.user);
            await applyResolverDelay(context.reply.request.headers);
            const cart = getSessionCart(context.sessionId);
            if (cart.items.length === 0) {
                throw new GraphQLError("Cart is empty");
            }
            const order = {
                id: `order_${Date.now()}`,
                number: generateOrderNumber(),
                createdAt: new Date().toISOString(),
                items: cart.items,
                total: cart.total
            };
            // Add userId to order for filtering
            order.userId = user.id;
            seedData.orders.push(order);
            // Clear cart after checkout
            if (context.sessionId) {
                seedData.carts.delete(context.sessionId);
            }
            return order;
        }
    }
};

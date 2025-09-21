export const seedData = {
    products: [
        {
            id: "1",
            slug: "espresso-blend",
            name: "Premium Espresso Blend",
            price: 1899,
            inStock: true,
            description: "Rich and bold espresso blend with notes of chocolate and caramel",
            imageUrl: "/images/espresso-blend.jpg",
            tags: ["coffee", "espresso"]
        },
        {
            id: "2",
            slug: "morning-brew",
            name: "Morning Brew Coffee",
            price: 1599,
            inStock: true,
            description: "Smooth medium roast perfect for your morning routine",
            imageUrl: "/images/morning-brew.jpg",
            tags: ["coffee"]
        },
        {
            id: "3",
            slug: "french-roast",
            name: "French Roast",
            price: 1799,
            inStock: false,
            description: "Dark roast with intense flavor and smoky finish",
            imageUrl: "/images/french-roast.jpg",
            tags: ["coffee", "dark-roast"]
        },
        {
            id: "4",
            slug: "green-tea",
            name: "Organic Green Tea",
            price: 1299,
            inStock: true,
            description: "Delicate green tea with fresh, grassy notes",
            imageUrl: "/images/green-tea.jpg",
            tags: ["tea", "green"]
        },
        {
            id: "5",
            slug: "earl-grey",
            name: "Earl Grey Tea",
            price: 1399,
            inStock: true,
            description: "Classic black tea with bergamot oil",
            imageUrl: "/images/earl-grey.jpg",
            tags: ["tea", "black"]
        },
        {
            id: "6",
            slug: "chamomile",
            name: "Chamomile Herbal Tea",
            price: 1199,
            inStock: true,
            description: "Soothing herbal tea perfect for bedtime",
            imageUrl: "/images/chamomile.jpg",
            tags: ["tea", "herbal"]
        },
        {
            id: "7",
            slug: "coffee-grinder",
            name: "Burr Coffee Grinder",
            price: 8999,
            inStock: true,
            description: "Professional-grade burr grinder for consistent coffee grounds",
            imageUrl: "/images/coffee-grinder.jpg",
            tags: ["accessories", "grinder"]
        },
        {
            id: "8",
            slug: "french-press",
            name: "French Press",
            price: 2999,
            inStock: true,
            description: "Classic French press for rich, full-bodied coffee",
            imageUrl: "/images/french-press.jpg",
            tags: ["accessories", "brewing"]
        },
        {
            id: "9",
            slug: "tea-infuser",
            name: "Stainless Steel Tea Infuser",
            price: 899,
            inStock: true,
            description: "High-quality stainless steel mesh tea infuser",
            imageUrl: "/images/tea-infuser.jpg",
            tags: ["accessories", "tea"]
        },
        {
            id: "10",
            slug: "travel-mug",
            name: "Insulated Travel Mug",
            price: 2499,
            inStock: true,
            description: "Keep your drinks hot or cold for hours",
            imageUrl: "/images/travel-mug.jpg",
            tags: ["accessories", "travel"]
        },
        {
            id: "11",
            slug: "cold-brew",
            name: "Cold Brew Concentrate",
            price: 1999,
            inStock: true,
            description: "Smooth cold brew concentrate, just add water",
            imageUrl: "/images/cold-brew.jpg",
            tags: ["coffee", "cold-brew"]
        },
        {
            id: "12",
            slug: "matcha",
            name: "Ceremonial Grade Matcha",
            price: 3499,
            inStock: true,
            description: "Premium ceremonial grade matcha powder",
            imageUrl: "/images/matcha.jpg",
            tags: ["tea", "matcha"]
        },
        {
            id: "13",
            slug: "coffee-scale",
            name: "Digital Coffee Scale",
            price: 4999,
            inStock: true,
            description: "Precision scale for perfect coffee ratios",
            imageUrl: "/images/coffee-scale.jpg",
            tags: ["accessories", "scale"]
        },
        {
            id: "14",
            slug: "pour-over",
            name: "Pour Over Dripper",
            price: 1899,
            inStock: true,
            description: "Ceramic pour-over dripper for artisan coffee",
            imageUrl: "/images/pour-over.jpg",
            tags: ["accessories", "brewing"]
        },
        {
            id: "15",
            slug: "coffee-filters",
            name: "Paper Coffee Filters",
            price: 599,
            inStock: false,
            description: "Premium paper filters for pour-over brewing",
            imageUrl: "/images/coffee-filters.jpg",
            tags: ["accessories", "filters"]
        }
    ],
    users: [
        {
            id: "user1",
            email: "demo@acme.test",
            name: "Demo User"
        },
        {
            id: "user2",
            email: "admin@acme.test",
            name: "Admin User"
        }
    ],
    carts: new Map(),
    orders: [],
    loginCodes: new Map()
};
export const coupons = {
    "WELCOME10": { discount: 0.1, type: "percentage" },
    "FREESHIP": { discount: 0, type: "shipping" }
};
export function resetSeedData() {
    seedData.carts.clear();
    seedData.orders.length = 0;
    seedData.loginCodes.clear();
}
export function getFeatureFlag(name, headers, env = process.env) {
    const headerValue = headers["x-feature-flag"];
    if (typeof headerValue === "string") {
        const flags = headerValue.split(",");
        for (const flag of flags) {
            const [key, value] = flag.split("=");
            if (key.trim() === name && value?.trim().toLowerCase() === "true") {
                return true;
            }
        }
    }
    return env[name]?.toLowerCase() === "true" || false;
}
export function getChaosValue(name, defaultValue, env = process.env) {
    const value = env[name];
    if (value === undefined)
        return defaultValue;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
}

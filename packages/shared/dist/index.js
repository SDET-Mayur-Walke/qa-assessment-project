export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["UNAUTHENTICATED"] = "UNAUTHENTICATED";
    ErrorCode["OUT_OF_STOCK"] = "OUT_OF_STOCK";
    ErrorCode["RATE_LIMITED"] = "RATE_LIMITED";
})(ErrorCode || (ErrorCode = {}));
export function formatMoney(cents) {
    return `$${(cents / 100).toFixed(2)}`;
}
export function parseFeatureFlags(headerValue) {
    if (!headerValue)
        return {};
    return headerValue.split(',').reduce((flags, flag) => {
        const [key, value] = flag.split('=');
        flags[key.trim()] = value?.trim().toLowerCase() === 'true';
        return flags;
    }, {});
}
export function generateOrderNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `ORD-${timestamp}-${random}`;
}
export function generateCartId() {
    return `cart_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

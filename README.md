# QA Assessment Project

A deliberately designed e-commerce application with intentional defects and feature flags for QA engineer assessment.

## 🏗️ Architecture

This is a monorepo containing:

- **apps/web** - Remix v2 frontend (React 18, Vite)
- **apps/api** - Fastify 4 + Mercurius GraphQL backend  
- **packages/shared** - TypeScript utilities and shared types

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation & Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development servers:**
   ```bash
   # Start both API and web servers concurrently
   pnpm dev
   
   # Or start individually:
   pnpm --filter ./apps/api dev    # API server on :4000
   pnpm --filter ./apps/web dev    # Web server on :3000
   ```

3. **Seed the database:**
   ```bash
   pnpm seed
   ```

4. **Access the application:**
   - Web: http://localhost:3000
   - GraphQL API: http://localhost:4000/graphql
   - GraphiQL: http://localhost:4000/graphiql

## 🧪 Testing

### Unit Tests
```bash
pnpm test:unit          # All unit tests with coverage
pnpm test:api          # API-specific tests only
```

### E2E Tests  
```bash
pnpm e2e               # Run Playwright tests
pnpm e2e:ci            # CI-friendly output
```

### Test Helpers

**Reset Database:**
```bash
curl -X POST http://localhost:4000/__test__/seed
```

**Get Login Code:**
```bash
curl "http://localhost:4000/__test__/mailbox?email=demo@acme.test"
```

## 🐛 Intentional Defects

This application contains several intentional bugs for testing purposes:

### 1. **Stale Cart Version** (`FEATURE_NEW_CART=true`)
- **Issue**: `applyCoupon` uses stale cart version during race conditions
- **Trigger**: Update cart item quantity, then immediately apply coupon
- **Expected**: Quantity change should be lost when coupon is applied

### 2. **Search Debounce Race** (`BUG_DEBOUNCE_RACE=true`)
- **Issue**: Search input debounces 400ms but doesn't cancel in-flight requests
- **Trigger**: Type quickly in search box, multiple overlapping requests
- **Expected**: Out-of-order responses show stale search results

### 3. **Order Sort Timezone** (`BUG_ORDER_SORT_TZ=true`)
- **Issue**: Orders sorted by server local time instead of UTC
- **Trigger**: Check order history across timezone changes
- **Expected**: Incorrect chronological ordering of orders

### 4. **Partial Products** (`PARTIAL_PRODUCTS=true`)
- **Issue**: Product list returns partial data with GraphQL errors
- **Trigger**: Browse product listings
- **Expected**: Some products show as null with authentication errors

## ⚙️ Feature Flags & Configuration

Feature flags can be controlled via:
1. **Environment variables** (see `.env.example`)
2. **HTTP headers**: `X-Feature-Flag: FEATURE_NEW_CART=true,BUG_DEBOUNCE_RACE=true`

### Available Flags

| Flag | Default | Description |
|------|---------|-------------|
| `FEATURE_NEW_CART` | `false` | Enables cart version race condition |
| `BUG_DEBOUNCE_RACE` | `false` | Enables search race condition |
| `BUG_ORDER_SORT_TZ` | `false` | Enables timezone sorting bug |
| `PARTIAL_PRODUCTS` | `false` | Enables partial GraphQL responses |

### Chaos Engineering

| Variable | Default | Description |
|----------|---------|-------------|
| `RESOLVER_DELAY_MS` | `0` | Random delay 0-N ms on resolvers |
| `FAIL_RATE_PRODUCT_DETAIL` | `0.05` | 5% failure rate on product detail |

## 🔐 Authentication

**Demo Users:**
- `demo@acme.test` (customer)  
- `admin@acme.test` (admin)

**Login Flow:**
1. Enter email → generates 6-digit code
2. Retrieve code from test endpoint: `/__test__/mailbox?email=<email>`
3. Enter code → receive JWT token

## 🛍️ Test Data

### Products
- ~15 products across categories: `coffee`, `tea`, `accessories`
- Some products are out of stock (triggers `OUT_OF_STOCK` errors)
- Price range: $5.99 - $89.99

### Coupons
- `WELCOME10` - 10% discount
- `FREESHIP` - Free shipping ($5 off)

## 🎯 Key Test Selectors

| Selector | Purpose | Location |
|----------|---------|----------|
| `data-testid="product-card"` | Product cards | Product grid |
| `data-testid="search-input"` | Search input | Homepage |
| `data-testid="add-to-cart"` | Add to cart button | Product detail |
| `data-testid="cart-count"` | Cart item count | Header |
| `data-testid="cart-version"` | Cart version (hidden) | Cart page |
| `data-testid="cart-apply-coupon"` | Coupon input | Cart page |
| `data-testid="checkout-submit"` | Checkout button | Cart page |
| `data-testid="login-email-input"` | Email input | Login page |
| `data-testid="login-submit"` | Login button | Login page |

## 📝 Development Commands

```bash
# Development
pnpm dev                # Start all services
pnpm build             # Build all applications
pnpm seed              # Reset and seed database

# Testing
pnpm test:unit         # Unit tests with coverage
pnpm test:api          # API tests only
pnpm e2e               # End-to-end tests
pnpm e2e:ci            # E2E with CI reporters

# Individual services
pnpm --filter ./apps/api dev     # API only
pnpm --filter ./apps/web dev     # Web only
```

## 🏭 API Endpoints

### GraphQL
- **Endpoint**: `POST /graphql`
- **Explorer**: `/graphiql` (development)

### Health & Testing
- `GET /healthz` - Health check
- `GET /__test__/mailbox?email=<email>` - Retrieve login codes
- `POST /__test__/seed` - Reset database

### Headers
- `Authorization: Bearer <jwt>` - User authentication
- `X-Session-ID: <id>` - Cart session tracking  
- `X-Feature-Flag: FLAG=true,FLAG2=false` - Feature flag control

---

**⚠️ Important**: This application contains intentional bugs and defects for assessment purposes. These issues are documented and should be treated as testing targets, not production bugs to be fixed.
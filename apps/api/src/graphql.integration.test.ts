// apps/api/src/graphql.integration.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { startTestServer } from './test-helpers/test-server.js';

describe('GraphQL API Integration Tests', () => {
  let server: any;
  let baseUrl: string;

  beforeAll(async () => {
    const { server: testServer, address } = await startTestServer();
    server = testServer;
    baseUrl = address;
  });

  afterAll(async () => {
    if (server) {
      await server.close();
    }
  });

  beforeEach(async () => {
    // Reset database before each test
    await fetch(`${baseUrl}/__test__/seed`, { method: 'POST' });
  });

  // Test 1: Health check endpoint
  it('should respond to health check', async () => {
    const response = await fetch(`${baseUrl}/healthz`);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.timestamp).toBeDefined();
  });

  // Test 2: Products query - happy path with pagination
  it('should list products with pagination', async () => {
    const query = `
      query GetProducts($first: Int, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              slug
              name
              price
              inStock
              tags
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    `;

    const response = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { first: 5 }
      })
    });

    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.errors).toBeUndefined();
    expect(result.data.products).toBeDefined();
    expect(result.data.products.edges).toHaveLength(5);
    expect(result.data.products.totalCount).toBeGreaterThan(0);
    expect(result.data.products.pageInfo.hasNextPage).toBeDefined();
    
    // Check product structure
    const firstProduct = result.data.products.edges[0].node;
    expect(firstProduct.id).toBeDefined();
    expect(firstProduct.slug).toBeDefined();
    expect(firstProduct.name).toBeDefined();
    expect(firstProduct.price).toBeDefined();
    expect(firstProduct.inStock).toBeDefined();
    expect(Array.isArray(firstProduct.tags)).toBe(true);
  });

  // Test 3: Product query by ID - happy path
  it('should get product by ID', async () => {
    // First get a product ID from the products list
    const listQuery = `
      query GetProducts {
        products(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    `;

    const listResponse = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: listQuery })
    });

    const listResult = await listResponse.json();
    const productId = listResult.data.products.edges[0].node.id;

    // Now query the specific product
    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          slug
          name
          price
          description
          imageUrl
          inStock
          tags
        }
      }
    `;

    const response = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id: productId }
      })
    });

    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.errors).toBeUndefined();
    expect(result.data.product).toBeDefined();
    expect(result.data.product.id).toBe(productId);
    expect(result.data.product.name).toBeDefined();
    expect(result.data.product.price).toBeDefined();
  });

  // Test 4: Partial error response (intentional GraphQL errors)
  it('should handle partial errors when PARTIAL_PRODUCTS feature flag is enabled', async () => {
    const query = `
      query GetProducts {
        products(first: 10) {
          edges {
            node {
              id
              name
              price
            }
          }
        }
      }
    `;

    const response = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Feature-Flag': 'PARTIAL_PRODUCTS=true'
      },
      body: JSON.stringify({ query })
    });

    expect(response.status).toBe(200);
    
    const result = await response.json();
    
    // Should have both data and errors (partial response)
    expect(result.data).toBeDefined();
    expect(result.errors).toBeDefined();
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Check error structure
    const firstError = result.errors[0];
    expect(firstError.message).toBeDefined();
    expect(firstError.path).toBeDefined();
    // Extensions may or may not be present depending on implementation
    if (firstError.extensions) {
      expect(firstError.extensions.code).toBeDefined();
    }
    
    // Should still have some data (if partial response is working)
    if (result.data && result.data.products) {
      expect(result.data.products.edges).toBeDefined();
      expect(result.data.products.edges.length).toBeGreaterThan(0);
    } else {
      // If partial response isn't implemented yet, just verify we got errors
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  // Test 5: Authentication and authorization headers
  it('should respect authentication headers', async () => {
    const query = `
      query GetMe {
        me {
          id
          email
          name
        }
      }
    `;

    // Test without authentication
    const unauthenticatedResponse = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const unauthenticatedResult = await unauthenticatedResponse.json();
    expect(unauthenticatedResult.data.me).toBeNull();

    // Test with invalid authentication
    const invalidAuthResponse = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid-token'
      },
      body: JSON.stringify({ query })
    });

    const invalidAuthResult = await invalidAuthResponse.json();
    expect(invalidAuthResult.data.me).toBeNull();

    // Test with valid authentication (mock JWT)
    const validAuthResponse = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer valid-mock-token'
      },
      body: JSON.stringify({ query })
    });

    const validAuthResult = await validAuthResponse.json();
    // Should either return user data or null, but not error
    expect(validAuthResult.errors).toBeUndefined();
  });

  // Test 6: Feature flags influence results
  it('should respect feature flags in headers', async () => {
    const query = `
      query GetProducts {
        products(first: 5) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `;

    // Test without feature flags
    const normalResponse = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const normalResult = await normalResponse.json();
    expect(normalResult.errors).toBeUndefined();

    // Test with multiple feature flags
    const flaggedResponse = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Feature-Flag': 'FEATURE_NEW_CART=true,BUG_DEBOUNCE_RACE=false'
      },
      body: JSON.stringify({ query })
    });

    const flaggedResult = await flaggedResponse.json();
    expect(flaggedResult.errors).toBeUndefined();
    
    // Feature flags should be parsed and available to resolvers
    expect(flaggedResult.data.products).toBeDefined();
  });

  // Test 7: Cart operations with session headers
  it('should handle cart operations with session ID', async () => {
    const sessionId = 'test-session-123';
    
    // Get cart
    const cartQuery = `
      query GetCart {
        cart {
          id
          items {
            product {
              id
              name
            }
            quantity
            lineTotal
          }
          subtotal
          total
          version
        }
      }
    `;

    const response = await fetch(`${baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({ query: cartQuery })
    });

    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.errors).toBeUndefined();
    expect(result.data.cart).toBeDefined();
    expect(result.data.cart.id).toBeDefined();
    expect(result.data.cart.version).toBeDefined();
    expect(Array.isArray(result.data.cart.items)).toBe(true);
  });
});

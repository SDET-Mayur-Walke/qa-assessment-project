// checkly/api-checks/health.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Health Checks', () => {
  test('should respond to health check endpoint', async ({ request }) => {
    const response = await request.get('/healthz');
    expect(response.status()).toBe(200);
    
    const body = await response.text();
    expect(body).toBe('ok');
  });

  test('should respond to GraphQL health query', async ({ request }) => {
    const query = `
      query {
        health
      }
    `;
    
    const response = await request.post('/graphql', {
      data: {
        query
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.data.health).toBe('ok');
  });

  test('should return products list', async ({ request }) => {
    const query = `
      query GetProducts($first: Int) {
        products(first: $first) {
          edges {
            node {
              id
              name
              price
            }
          }
          pageInfo {
            hasNextPage
          }
          totalCount
        }
      }
    `;
    
    const response = await request.post('/graphql', {
      data: {
        query,
        variables: { first: 5 }
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.data.products).toBeDefined();
    expect(body.data.products.edges).toBeInstanceOf(Array);
    expect(body.data.products.totalCount).toBeGreaterThan(0);
    expect(body.data.products.pageInfo.hasNextPage).toBeDefined();
  });

  test('should handle authentication flow', async ({ request }) => {
    // Test login request
    const loginMutation = `
      mutation Login($email: String!) {
        login(email: $email)
      }
    `;
    
    const loginResponse = await request.post('/graphql', {
      data: {
        query: loginMutation,
        variables: { email: 'test@example.com' }
      }
    });
    
    expect(loginResponse.status()).toBe(200);
    
    const loginBody = await loginResponse.json();
    expect(loginBody.data.login).toBe('Check your email for login code');
  });

  test('should handle cart operations', async ({ request }) => {
    // Test adding to cart
    const addToCartMutation = `
      mutation AddToCart($input: AddToCartInput!) {
        addToCart(input: $input) {
          id
          items {
            product { id }
            quantity
          }
        }
      }
    `;
    
    // First, get a product ID
    const productsQuery = `
      query {
        products(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    `;
    
    const productsResponse = await request.post('/graphql', {
      data: { query: productsQuery }
    });
    
    expect(productsResponse.status()).toBe(200);
    const productsBody = await productsResponse.json();
    const productId = productsBody.data.products.edges[0].node.id;
    
    // Add to cart
    const cartResponse = await request.post('/graphql', {
      data: {
        query: addToCartMutation,
        variables: { 
          input: { 
            productId, 
            quantity: 1 
          } 
        }
      }
    });
    
    expect(cartResponse.status()).toBe(200);
    
    const cartBody = await cartResponse.json();
    expect(cartBody.data.addToCart).toBeDefined();
    expect(cartBody.data.addToCart.items).toBeInstanceOf(Array);
  });
});

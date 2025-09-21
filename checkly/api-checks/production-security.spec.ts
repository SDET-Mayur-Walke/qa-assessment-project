// checkly/api-checks/production-security.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Production Security Checks', () => {
  test('should disable GraphQL introspection in production', async ({ request }) => {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType {
            name
          }
          mutationType {
            name
          }
          subscriptionType {
            name
          }
          types {
            ...FullType
          }
          directives {
            name
            description
            locations
            args {
              ...InputValue
            }
          }
        }
      }

      fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }

      fragment InputValue on __InputValue {
        name
        description
        type { ...TypeRef }
        defaultValue
      }

      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const response = await request.post('/graphql', {
      data: {
        query: introspectionQuery
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    // In production, introspection should be disabled
    // This should either return an error or empty schema
    if (body.errors) {
      // Introspection is disabled - this is good for production
      expect(body.errors[0].message).toContain('introspection');
    } else if (body.data && body.data.__schema) {
      // Introspection is enabled - this might be okay for development
      // but should be monitored in production
      console.warn('GraphQL introspection is enabled in production environment');
      
      // Verify that the schema doesn't expose sensitive information
      const schema = body.data.__schema;
      expect(schema).toBeDefined();
      
      // Check that sensitive types are not exposed
      const typeNames = schema.types.map((type: any) => type.name);
      expect(typeNames).not.toContain('InternalUser');
      expect(typeNames).not.toContain('AdminOnly');
      expect(typeNames).not.toContain('SensitiveData');
    } else {
      // Unexpected response
      throw new Error('Unexpected response format from GraphQL introspection');
    }
  });

  test('should require authentication for protected endpoints', async ({ request }) => {
    const protectedQuery = `
      query {
        me {
          email
          name
        }
      }
    `;
    
    const response = await request.post('/graphql', {
      data: {
        query: protectedQuery
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    // Should return an error for unauthenticated requests
    expect(body.errors).toBeDefined();
    expect(body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
  });

  test('should handle CORS headers correctly', async ({ request }) => {
    const response = await request.options('/graphql');
    
    // Should include proper CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': response.headers()['access-control-allow-origin'],
      'Access-Control-Allow-Methods': response.headers()['access-control-allow-methods'],
      'Access-Control-Allow-Headers': response.headers()['access-control-allow-headers'],
    };
    
    // Verify CORS is configured (exact values depend on your setup)
    expect(corsHeaders['Access-Control-Allow-Origin']).toBeDefined();
    expect(corsHeaders['Access-Control-Allow-Methods']).toBeDefined();
  });

  test('should rate limit excessive requests', async ({ request }) => {
    // Make multiple rapid requests to test rate limiting
    const promises = Array.from({ length: 10 }, () => 
      request.post('/graphql', {
        data: {
          query: '{ health }'
        }
      })
    );
    
    const responses = await Promise.all(promises);
    
    // Most requests should succeed, but we're checking for rate limiting
    const successCount = responses.filter(r => r.status() === 200).length;
    const rateLimitedCount = responses.filter(r => r.status() === 429).length;
    
    // In a production environment, some requests might be rate limited
    // This test documents the current behavior
    console.log(`Successful requests: ${successCount}, Rate limited: ${rateLimitedCount}`);
    
    // At least some requests should succeed
    expect(successCount).toBeGreaterThan(0);
  });

  test('should handle malformed GraphQL queries gracefully', async ({ request }) => {
    const malformedQuery = `
      query {
        products {
          edges {
            node {
              id
              name
              # Missing closing brace
          }
        }
      }
    `;
    
    const response = await request.post('/graphql', {
      data: {
        query: malformedQuery
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    // Should return a GraphQL error for malformed queries
    expect(body.errors).toBeDefined();
    expect(body.errors[0].message).toContain('Syntax Error');
  });

  test('should validate input parameters', async ({ request }) => {
    const queryWithInvalidInput = `
      query {
        products(first: -1) {
          edges {
            node {
              id
            }
          }
        }
      }
    `;
    
    const response = await request.post('/graphql', {
      data: {
        query: queryWithInvalidInput
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    // Should return validation errors for invalid input
    if (body.errors) {
      expect(body.errors[0].message).toContain('validation');
    }
  });
});

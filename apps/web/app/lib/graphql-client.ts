import { GraphQLClient } from "graphql-request";

const API_URL = process.env.API_URL || "http://localhost:4000/graphql";

export function createGraphQLClient(token?: string, featureFlags?: Record<string, boolean>, sessionId?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (sessionId) {
    headers["X-Session-ID"] = sessionId;
  }

  if (featureFlags && Object.keys(featureFlags).length > 0) {
    const flagString = Object.entries(featureFlags)
      .map(([key, value]) => `${key}=${value}`)
      .join(",");
    headers["X-Feature-Flag"] = flagString;
  }

  return new GraphQLClient(API_URL, { headers });
}

export const gql = (strings: TemplateStringsArray, ...values: any[]) => {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] || "");
  }, "");
};

// Common GraphQL queries and mutations
export const GET_PRODUCTS = gql`
  query GetProducts($query: String, $first: Int, $after: String, $tag: String) {
    products(query: $query, first: $first, after: $after, tag: $tag) {
      edges {
        node {
          id
          slug
          name
          price
          inStock
          description
          imageUrl
          tags
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      slug
      name
      price
      inStock
      description
      imageUrl
      tags
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      items {
        product {
          id
          name
          price
          imageUrl
        }
        quantity
        lineTotal
      }
      subtotal
      discountTotal
      total
      appliedCoupon
      version
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      name
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      number
      createdAt
      items {
        product {
          name
        }
        quantity
        lineTotal
      }
      total
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email)
  }
`;

export const CONFIRM_LOGIN = gql`
  mutation ConfirmLogin($email: String!, $code: String!) {
    confirmLogin(email: $email, code: $code)
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
      items {
        product {
          id
          name
          price
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

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($productId: ID!, $quantity: Int!) {
    updateCartItem(productId: $productId, quantity: $quantity) {
      id
      items {
        product {
          id
          name
          price
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

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      id
      items {
        product {
          id
          name
          price
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

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(code: $code) {
      id
      items {
        product {
          id
          name
          price
        }
        quantity
        lineTotal
      }
      subtotal
      discountTotal
      total
      appliedCoupon
      version
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout {
    checkout {
      id
      number
      createdAt
      items {
        product {
          name
        }
        quantity
        lineTotal
      }
      total
    }
  }
`;
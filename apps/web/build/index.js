var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// ../../node_modules/.pnpm/@remix-run+dev@2.17.0_@remi_68fd83952107eb3dbd37e2fa9b35a929/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "../../node_modules/.pnpm/@remix-run+dev@2.17.0_@remi_68fd83952107eb3dbd37e2fa9b35a929/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "../../node_modules/.pnpm/@remix-run+dev@2.17.0_@remi_68fd83952107eb3dbd37e2fa9b35a929/node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { json } from "@remix-run/node";

// app/components/Header.tsx
import { Link, Form } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Header({ user, cartCount = 0 }) {
  return /* @__PURE__ */ jsxDEV2("header", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxDEV2("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV2("div", { className: "flex justify-between items-center h-16", children: [
    /* @__PURE__ */ jsxDEV2("div", { className: "flex items-center", children: /* @__PURE__ */ jsxDEV2(Link, { to: "/", className: "text-xl font-bold text-gray-900", children: "\u2615 Coffee Shop" }, void 0, !1, {
      fileName: "app/components/Header.tsx",
      lineNumber: 18,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/Header.tsx",
      lineNumber: 17,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("nav", { className: "flex items-center space-x-8", children: [
      /* @__PURE__ */ jsxDEV2(
        Link,
        {
          to: "/",
          className: "text-gray-700 hover:text-gray-900",
          children: "Products"
        },
        void 0,
        !1,
        {
          fileName: "app/components/Header.tsx",
          lineNumber: 24,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(
        Link,
        {
          to: "/cart",
          className: "text-gray-700 hover:text-gray-900 relative",
          children: [
            "Cart",
            cartCount > 0 && /* @__PURE__ */ jsxDEV2(
              "span",
              {
                "data-testid": "cart-count",
                className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",
                children: cartCount
              },
              void 0,
              !1,
              {
                fileName: "app/components/Header.tsx",
                lineNumber: 37,
                columnNumber: 17
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/Header.tsx",
          lineNumber: 31,
          columnNumber: 13
        },
        this
      ),
      user ? /* @__PURE__ */ jsxDEV2("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxDEV2(
          Link,
          {
            to: "/orders",
            className: "text-gray-700 hover:text-gray-900",
            children: "Orders"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 48,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV2("span", { className: "text-sm text-gray-600", children: user.name || user.email }, void 0, !1, {
          fileName: "app/components/Header.tsx",
          lineNumber: 54,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV2(Form, { method: "post", action: "/logout", children: /* @__PURE__ */ jsxDEV2(
          "button",
          {
            type: "submit",
            className: "text-gray-700 hover:text-gray-900",
            children: "Logout"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 58,
            columnNumber: 19
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/Header.tsx",
          lineNumber: 57,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 47,
        columnNumber: 15
      }, this) : /* @__PURE__ */ jsxDEV2(
        Link,
        {
          to: "/login",
          className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700",
          children: "Login"
        },
        void 0,
        !1,
        {
          fileName: "app/components/Header.tsx",
          lineNumber: 67,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/Header.tsx",
      lineNumber: 23,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Header.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/Header.tsx",
    lineNumber: 15,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/Header.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/lib/graphql-client.ts
import { GraphQLClient } from "graphql-request";
var API_URL = process.env.API_URL || "http://localhost:4000/graphql";
function createGraphQLClient(token, featureFlags, sessionId) {
  let headers = {
    "Content-Type": "application/json"
  };
  if (token && (headers.Authorization = `Bearer ${token}`), sessionId && (headers["X-Session-ID"] = sessionId), featureFlags && Object.keys(featureFlags).length > 0) {
    let flagString = Object.entries(featureFlags).map(([key, value]) => `${key}=${value}`).join(",");
    headers["X-Feature-Flag"] = flagString;
  }
  return new GraphQLClient(API_URL, { headers });
}
var gql = (strings, ...values) => strings.reduce((result, string, i) => result + string + (values[i] || ""), ""), GET_PRODUCTS = gql`
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
`, GET_PRODUCT = gql`
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
`, GET_CART = gql`
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
`, GET_ME = gql`
  query GetMe {
    me {
      id
      email
      name
    }
  }
`, GET_ORDERS = gql`
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
`, LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email)
  }
`, CONFIRM_LOGIN = gql`
  mutation ConfirmLogin($email: String!, $code: String!) {
    confirmLogin(email: $email, code: $code)
  }
`, ADD_TO_CART = gql`
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
`, UPDATE_CART_ITEM = gql`
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
`, REMOVE_FROM_CART = gql`
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
`, APPLY_COUPON = gql`
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
`, CHECKOUT = gql`
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

// app/lib/session.ts
function getSessionId(request) {
  let headerSessionId = request.headers.get("X-Session-ID");
  if (headerSessionId)
    return headerSessionId;
  let sessionId = request.headers.get("Cookie")?.split(";").find((cookie) => cookie.trim().startsWith("session-id="))?.split("=")[1];
  return sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}
function setSessionIdCookie(sessionId) {
  return `session-id=${sessionId}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Lax`;
}

// app/tailwind.css?url
var tailwind_default = "/build/_assets/tailwind-ZBKXU7KM.css?url";

// app/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap"
  }
];
async function loader({ request }) {
  let cookieHeader = request.headers.get("Cookie"), token = cookieHeader?.split(";").find((cookie) => cookie.trim().startsWith("auth-token="))?.split("=")[1] || "", sessionId = getSessionId(request), client = createGraphQLClient(token, void 0, sessionId);
  try {
    let [userResult, cartResult] = await Promise.allSettled(
      [
        client.request(GET_ME),
        client.request(GET_CART)
      ]
    ), user = userResult.status === "fulfilled" ? userResult.value.me : null, cartCount = (cartResult.status === "fulfilled" ? cartResult.value.cart : { items: [] }).items?.reduce((sum, item) => sum + item.quantity, 0) || 0, headers = cookieHeader?.includes("session-id=") ? void 0 : new Headers(
      [
        ["Set-Cookie", setSessionIdCookie(sessionId)]
      ]
    );
    return json({ user, cartCount, sessionId }, headers ? { headers } : {});
  } catch {
    let headers = cookieHeader?.includes("session-id=") ? void 0 : new Headers(
      [
        ["Set-Cookie", setSessionIdCookie(sessionId)]
      ]
    );
    return json({ user: null, cartCount: 0, sessionId }, headers ? { headers } : {});
  }
}
function App() {
  let { user, cartCount } = useLoaderData();
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { children: [
      /* @__PURE__ */ jsxDEV3(Header, { user, cartCount }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("main", { children: /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 86,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
}

// app/routes/products.$slug.tsx
var products_slug_exports = {};
__export(products_slug_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => ProductDetail,
  loader: () => loader2
});
import { json as json2 } from "@remix-run/node";
import { useLoaderData as useLoaderData2, useFetcher, useRouteError } from "@remix-run/react";
import { formatMoney } from "shared";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
async function loader2({ params }) {
  let { slug } = params;
  if (!slug)
    throw new Response("Product not found", { status: 404 });
  let client = createGraphQLClient();
  try {
    let result = await client.request(GET_PRODUCT, { slug });
    if (!result.product)
      throw new Response("Product not found", { status: 404 });
    return json2({ product: result.product });
  } catch (error) {
    throw console.error("Failed to load product:", error), new Response("Failed to load product", { status: 500 });
  }
}
async function action({ request }) {
  let formData = await request.formData(), productId = formData.get("productId"), quantity = parseInt(formData.get("quantity")) || 1, sessionId = getSessionId(request), client = createGraphQLClient(void 0, void 0, sessionId);
  try {
    let result = await client.request(ADD_TO_CART, {
      input: { productId, quantity }
    });
    return json2({ success: !0, cart: result.addToCart });
  } catch (error) {
    return json2(
      {
        success: !1,
        error: error.message || "Failed to add to cart"
      },
      { status: 400 }
    );
  }
}
function ErrorBoundary() {
  let error = useRouteError();
  return /* @__PURE__ */ jsxDEV4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV4("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxDEV4("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Product Not Found" }, void 0, !1, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-600 mb-6", children: "The product you're looking for doesn't exist." }, void 0, !1, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(
      "a",
      {
        href: "/",
        className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700",
        children: "Back to Products"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 66,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 59,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
function ProductDetail() {
  let { product } = useLoaderData2(), fetcher = useFetcher(), isAddingToCart = fetcher.state === "submitting", addToCartError = fetcher.data?.error;
  return /* @__PURE__ */ jsxDEV4("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV4("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsxDEV4("div", { children: product.imageUrl ? /* @__PURE__ */ jsxDEV4(
      "img",
      {
        src: product.imageUrl,
        alt: product.name,
        className: "w-full h-96 object-cover rounded-lg"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 89,
        columnNumber: 13
      },
      this
    ) : /* @__PURE__ */ jsxDEV4("div", { className: "w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxDEV4("span", { className: "text-gray-400 text-6xl", children: "\u{1F4E6}" }, void 0, !1, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 96,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 95,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: product.name }, void 0, !1, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsxDEV4("span", { className: "text-2xl font-semibold text-gray-900", children: formatMoney(product.price) }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 107,
          columnNumber: 13
        }, this),
        !product.inStock && /* @__PURE__ */ jsxDEV4("span", { className: "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium", children: "Out of Stock" }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 112,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      product.description && /* @__PURE__ */ jsxDEV4("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxDEV4("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Description" }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-600 leading-relaxed", children: product.description }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 123,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxDEV4("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Categories" }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 130,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "flex flex-wrap gap-2", children: product.tags.map((tag) => /* @__PURE__ */ jsxDEV4(
          "span",
          {
            className: "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm",
            children: tag.charAt(0).toUpperCase() + tag.slice(1)
          },
          tag,
          !1,
          {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 135,
            columnNumber: 17
          },
          this
        )) }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 133,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4(fetcher.Form, { method: "post", children: [
        /* @__PURE__ */ jsxDEV4("input", { type: "hidden", name: "productId", value: product.id }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 146,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "flex items-center gap-4 mb-4", children: [
          /* @__PURE__ */ jsxDEV4("label", { htmlFor: "quantity", className: "text-sm font-medium text-gray-700", children: "Quantity:" }, void 0, !1, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4(
            "select",
            {
              id: "quantity",
              name: "quantity",
              className: "border border-gray-300 rounded-md px-3 py-1",
              defaultValue: "1",
              children: [1, 2, 3, 4, 5].map((num) => /* @__PURE__ */ jsxDEV4("option", { value: num, children: num }, num, !1, {
                fileName: "app/routes/products.$slug.tsx",
                lineNumber: 158,
                columnNumber: 19
              }, this))
            },
            void 0,
            !1,
            {
              fileName: "app/routes/products.$slug.tsx",
              lineNumber: 151,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 147,
          columnNumber: 13
        }, this),
        !product.inStock && /* @__PURE__ */ jsxDEV4("div", { className: "bg-red-50 border border-red-200 rounded-md p-4 mb-4", children: /* @__PURE__ */ jsxDEV4("div", { className: "flex", children: /* @__PURE__ */ jsxDEV4("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsxDEV4("h3", { className: "text-sm font-medium text-red-800", children: "Out of Stock" }, void 0, !1, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 169,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { className: "text-sm text-red-700 mt-1", children: "This product is currently unavailable." }, void 0, !1, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 172,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 168,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 167,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 166,
          columnNumber: 15
        }, this),
        addToCartError && /* @__PURE__ */ jsxDEV4("div", { className: "bg-red-50 border border-red-200 rounded-md p-4 mb-4", children: /* @__PURE__ */ jsxDEV4("p", { className: "text-sm text-red-700", children: addToCartError }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 182,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 181,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(
          "button",
          {
            "data-testid": "add-to-cart",
            type: "submit",
            disabled: !product.inStock || isAddingToCart,
            className: "w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",
            children: isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart" : "Out of Stock"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 186,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 145,
        columnNumber: 11
      }, this),
      fetcher.data?.success && /* @__PURE__ */ jsxDEV4("div", { className: "mt-4 bg-green-50 border border-green-200 rounded-md p-4", children: /* @__PURE__ */ jsxDEV4("p", { className: "text-sm text-green-700", children: "\u2705 Added to cart successfully!" }, void 0, !1, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 203,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 202,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 101,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 86,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 85,
    columnNumber: 5
  }, this);
}

// app/routes/checkout.tsx
var checkout_exports = {};
__export(checkout_exports, {
  action: () => action2,
  default: () => Checkout,
  loader: () => loader3
});
import { json as json3, redirect } from "@remix-run/node";
import { useActionData, useLoaderData as useLoaderData3 } from "@remix-run/react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
async function loader3({ request }) {
  return request.headers.get("Cookie")?.split(";").find((cookie) => cookie.trim().startsWith("auth-token="))?.split("=")[1] || "" ? json3({ authenticated: !0 }) : redirect("/login");
}
async function action2({ request }) {
  let token = request.headers.get("Cookie")?.split(";").find((cookie) => cookie.trim().startsWith("auth-token="))?.split("=")[1] || "";
  if (!token)
    return redirect("/login");
  let sessionId = getSessionId(request), client = createGraphQLClient(token, void 0, sessionId);
  try {
    let result = await client.request(CHECKOUT);
    return redirect("/orders");
  } catch (error) {
    return json3(
      {
        error: error.message || "Checkout failed"
      },
      { status: 400 }
    );
  }
}
function Checkout() {
  let actionData = useActionData(), { authenticated } = useLoaderData3();
  return /* @__PURE__ */ jsxDEV5("div", { className: "max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg", children: [
    /* @__PURE__ */ jsxDEV5("h1", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Complete Your Order" }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV5("p", { className: "text-gray-600 text-center mb-4", children: "Ready to place your order? Click the button below to complete your purchase." }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    actionData?.error && /* @__PURE__ */ jsxDEV5("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsxDEV5("p", { className: "text-sm text-red-700", children: actionData.error }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 67,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5("form", { method: "post", children: /* @__PURE__ */ jsxDEV5(
      "button",
      {
        "data-testid": "complete-order",
        type: "submit",
        className: "w-full bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 transition-colors",
        children: "Complete Order"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/checkout.tsx",
        lineNumber: 72,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxDEV5(
      "a",
      {
        href: "/cart",
        className: "text-blue-600 hover:text-blue-700 text-sm",
        children: "\u2190 Back to Cart"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/checkout.tsx",
        lineNumber: 82,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/checkout.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/checkout.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader4
});
import { redirect as redirect2 } from "@remix-run/node";
async function action3({ request }) {
  let headers = new Headers();
  return headers.append("Set-Cookie", "auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"), redirect2("/", { headers });
}
async function loader4() {
  return redirect2("/");
}

// app/routes/orders.tsx
var orders_exports = {};
__export(orders_exports, {
  default: () => Orders,
  loader: () => loader5
});
import { json as json4, redirect as redirect3 } from "@remix-run/node";
import { useLoaderData as useLoaderData4 } from "@remix-run/react";
import { formatMoney as formatMoney2 } from "shared";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
async function loader5({ request }) {
  let token = request.headers.get("Cookie")?.split(";").find((cookie) => cookie.trim().startsWith("auth-token="))?.split("=")[1] || "";
  if (!token)
    return redirect3("/login");
  let client = createGraphQLClient(token);
  try {
    let result = await client.request(GET_ORDERS);
    return json4({ orders: result.orders });
  } catch (error) {
    return error.message?.includes("UNAUTHENTICATED") ? redirect3("/login") : json4({ orders: [] });
  }
}
function Orders() {
  let { orders } = useLoaderData4();
  return orders.length === 0 ? /* @__PURE__ */ jsxDEV6("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV6("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxDEV6("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Your Orders" }, void 0, !1, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 38,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV6("p", { className: "text-gray-600 text-lg mb-6", children: "You haven't placed any orders yet" }, void 0, !1, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 41,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV6(
      "a",
      {
        href: "/",
        className: "bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700",
        children: "Start Shopping"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/orders.tsx",
        lineNumber: 44,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/orders.tsx",
    lineNumber: 37,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/orders.tsx",
    lineNumber: 36,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV6("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV6("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Your Orders" }, void 0, !1, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "space-y-6", children: orders.map((order) => /* @__PURE__ */ jsxDEV6(
      "div",
      {
        className: "bg-white border border-gray-200 rounded-lg p-6",
        children: [
          /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxDEV6("div", { children: [
              /* @__PURE__ */ jsxDEV6("h2", { className: "text-lg font-semibold text-gray-900", children: [
                "Order #",
                order.number
              ] }, void 0, !0, {
                fileName: "app/routes/orders.tsx",
                lineNumber: 69,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("p", { className: "text-sm text-gray-600", children: [
                "Placed on ",
                new Date(order.createdAt).toLocaleDateString()
              ] }, void 0, !0, {
                fileName: "app/routes/orders.tsx",
                lineNumber: 72,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/orders.tsx",
              lineNumber: 68,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV6("div", { className: "text-right", children: /* @__PURE__ */ jsxDEV6("p", { className: "text-lg font-semibold text-gray-900", children: formatMoney2(order.total) }, void 0, !1, {
              fileName: "app/routes/orders.tsx",
              lineNumber: 77,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/routes/orders.tsx",
              lineNumber: 76,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/orders.tsx",
            lineNumber: 67,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV6("div", { className: "border-t border-gray-200 pt-4", children: [
            /* @__PURE__ */ jsxDEV6("h3", { className: "text-sm font-medium text-gray-900 mb-2", children: "Items Ordered" }, void 0, !1, {
              fileName: "app/routes/orders.tsx",
              lineNumber: 84,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV6("div", { className: "space-y-2", children: order.items.map((item, index) => /* @__PURE__ */ jsxDEV6(
              "div",
              {
                className: "flex justify-between items-center text-sm",
                children: [
                  /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-900", children: [
                    item.product.name,
                    " \xD7 ",
                    item.quantity
                  ] }, void 0, !0, {
                    fileName: "app/routes/orders.tsx",
                    lineNumber: 93,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV6("span", { className: "text-gray-600", children: formatMoney2(item.lineTotal) }, void 0, !1, {
                    fileName: "app/routes/orders.tsx",
                    lineNumber: 96,
                    columnNumber: 21
                  }, this)
                ]
              },
              index,
              !0,
              {
                fileName: "app/routes/orders.tsx",
                lineNumber: 89,
                columnNumber: 19
              },
              this
            )) }, void 0, !1, {
              fileName: "app/routes/orders.tsx",
              lineNumber: 87,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/orders.tsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ]
      },
      order.id,
      !0,
      {
        fileName: "app/routes/orders.tsx",
        lineNumber: 63,
        columnNumber: 11
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/orders.tsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader6
});
import React, { useState as useState2 } from "react";
import { json as json5 } from "@remix-run/node";
import { useLoaderData as useLoaderData5, useNavigate, useSearchParams } from "@remix-run/react";

// app/components/ProductCard.tsx
import { Link as Link2 } from "@remix-run/react";
import { formatMoney as formatMoney3 } from "shared";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function ProductCard({ product }) {
  return /* @__PURE__ */ jsxDEV7(
    "div",
    {
      "data-testid": "product-card",
      className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow",
      children: /* @__PURE__ */ jsxDEV7(Link2, { to: `/products/${product.slug}`, children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200", children: product.imageUrl ? /* @__PURE__ */ jsxDEV7(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            className: "h-48 w-full object-cover"
          },
          void 0,
          !1,
          {
            fileName: "app/components/ProductCard.tsx",
            lineNumber: 28,
            columnNumber: 13
          },
          this
        ) : /* @__PURE__ */ jsxDEV7("div", { className: "h-48 w-full bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-gray-400 text-4xl", children: "\u{1F4E6}" }, void 0, !1, {
          fileName: "app/components/ProductCard.tsx",
          lineNumber: 35,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/components/ProductCard.tsx",
          lineNumber: 34,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/components/ProductCard.tsx",
          lineNumber: 26,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-sm font-medium text-gray-900 mb-1", children: product.name }, void 0, !1, {
            fileName: "app/components/ProductCard.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this),
          product.description && /* @__PURE__ */ jsxDEV7("p", { className: "text-sm text-gray-500 mb-2 line-clamp-2", children: product.description }, void 0, !1, {
            fileName: "app/components/ProductCard.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV7("span", { className: "text-lg font-semibold text-gray-900", children: formatMoney3(product.price) }, void 0, !1, {
              fileName: "app/components/ProductCard.tsx",
              lineNumber: 52,
              columnNumber: 13
            }, this),
            !product.inStock && /* @__PURE__ */ jsxDEV7("span", { className: "text-sm text-red-600 font-medium", children: "Out of Stock" }, void 0, !1, {
              fileName: "app/components/ProductCard.tsx",
              lineNumber: 57,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/ProductCard.tsx",
            lineNumber: 51,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "mt-2 flex flex-wrap gap-1", children: product.tags.map((tag) => /* @__PURE__ */ jsxDEV7(
            "span",
            {
              className: "inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded",
              children: tag
            },
            tag,
            !1,
            {
              fileName: "app/components/ProductCard.tsx",
              lineNumber: 65,
              columnNumber: 15
            },
            this
          )) }, void 0, !1, {
            fileName: "app/components/ProductCard.tsx",
            lineNumber: 63,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/ProductCard.tsx",
          lineNumber: 40,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/ProductCard.tsx",
        lineNumber: 25,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/ProductCard.tsx",
      lineNumber: 21,
      columnNumber: 5
    },
    this
  );
}

// app/hooks/useDebounce.ts
import { useState, useEffect } from "react";
function useDebounce(value, delay) {
  let [debouncedValue, setDebouncedValue] = useState(value);
  return useEffect(() => {
    let handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]), debouncedValue;
}

// app/routes/_index.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
async function loader6({ request }) {
  let url = new URL(request.url), query = url.searchParams.get("query") || "", tag = url.searchParams.get("tag") || "", after = url.searchParams.get("after") || "", client = createGraphQLClient();
  try {
    let result = await client.request(GET_PRODUCTS, {
      query: query || void 0,
      tag: tag || void 0,
      after: after || void 0,
      first: 12
    });
    return json5({
      products: result.products,
      query,
      tag
    });
  } catch (error) {
    return console.error("Failed to load products:", error), json5({
      products: { edges: [], pageInfo: { hasNextPage: !1 }, totalCount: 0 },
      query,
      tag
    });
  }
}
function Index() {
  let { products, query: initialQuery, tag: initialTag } = useLoaderData5(), navigate = useNavigate(), [searchParams] = useSearchParams(), [searchQuery, setSearchQuery] = useState2(initialQuery), [selectedTag, setSelectedTag] = useState2(initialTag), debouncedQuery = useDebounce(searchQuery, 400);
  React.useEffect(() => {
    let params = new URLSearchParams();
    debouncedQuery && params.set("query", debouncedQuery), selectedTag && params.set("tag", selectedTag);
    let newUrl = params.toString() ? `/?${params.toString()}` : "/";
    navigate(newUrl, { replace: !0 });
  }, [debouncedQuery, selectedTag, navigate]);
  let allTags = Array.from(
    new Set(
      products.edges.flatMap((edge) => edge.node?.tags || []).filter(Boolean)
    )
  ).sort();
  return /* @__PURE__ */ jsxDEV8("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV8("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxDEV8("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Our Products" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
        /* @__PURE__ */ jsxDEV8("div", { className: "flex-1", children: /* @__PURE__ */ jsxDEV8(
          "input",
          {
            "data-testid": "search-input",
            type: "text",
            placeholder: "Search products...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 77,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8("div", { children: /* @__PURE__ */ jsxDEV8(
          "select",
          {
            value: selectedTag,
            onChange: (e) => setSelectedTag(e.target.value),
            className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [
              /* @__PURE__ */ jsxDEV8("option", { value: "", children: "All Categories" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 93,
                columnNumber: 15
              }, this),
              allTags.map((tag) => /* @__PURE__ */ jsxDEV8("option", { value: tag, children: tag.charAt(0).toUpperCase() + tag.slice(1) }, tag, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 95,
                columnNumber: 17
              }, this))
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 88,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      (searchQuery || selectedTag) && /* @__PURE__ */ jsxDEV8("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV8("p", { className: "text-sm text-gray-600", children: [
        products.totalCount,
        " product",
        products.totalCount !== 1 ? "s" : "",
        " found",
        searchQuery && ` for "${searchQuery}"`,
        selectedTag && ` in category "${selectedTag}"`
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 105,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    products.edges.length > 0 ? /* @__PURE__ */ jsxDEV8("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: products.edges.map((edge) => /* @__PURE__ */ jsxDEV8(ProductCard, { product: edge.node }, edge.node?.id || edge.cursor, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 117,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 115,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV8("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxDEV8("p", { className: "text-gray-500 text-lg", children: "No products found" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      (searchQuery || selectedTag) && /* @__PURE__ */ jsxDEV8("p", { className: "text-gray-400 mt-2", children: "Try adjusting your search or filter" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 124,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, this),
    products.pageInfo.hasNextPage && /* @__PURE__ */ jsxDEV8("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxDEV8(
      "button",
      {
        onClick: () => {
          let params = new URLSearchParams(searchParams);
          params.set("after", products.pageInfo.endCursor), navigate(`/?${params.toString()}`);
        },
        className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700",
        children: "Load More"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 133,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 132,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => Login
});
import { useState as useState3 } from "react";
import { json as json6, redirect as redirect4 } from "@remix-run/node";
import { useActionData as useActionData2, Form as Form3 } from "@remix-run/react";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
async function action4({ request }) {
  let formData = await request.formData(), step = formData.get("step"), email = formData.get("email"), client = createGraphQLClient();
  try {
    if (step === "sendCode")
      return await client.request(LOGIN, { email }), json6({ step: "confirmCode", email, success: !0 });
    if (step === "confirmCode") {
      let code = formData.get("code"), result = await client.request(CONFIRM_LOGIN, { email, code }), headers = new Headers();
      return headers.append("Set-Cookie", `auth-token=${result.confirmLogin}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`), redirect4("/orders", { headers });
    }
    return json6({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    return json6(
      {
        error: error.message || "Login failed",
        step: formData.get("step"),
        email: formData.get("email")
      },
      { status: 400 }
    );
  }
}
function Login() {
  let actionData = useActionData2(), [step, setStep] = useState3(
    actionData?.step === "confirmCode" ? "code" : "email"
  );
  return step === "code" || actionData?.step === "confirmCode" ? /* @__PURE__ */ jsxDEV9("div", { className: "max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg", children: [
    /* @__PURE__ */ jsxDEV9("h1", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Enter Verification Code" }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 52,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV9("p", { className: "text-gray-600 mb-6 text-center", children: [
      "We've sent a 6-digit code to ",
      actionData?.email || "your email"
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV9(Form3, { method: "post", children: [
      /* @__PURE__ */ jsxDEV9("input", { type: "hidden", name: "step", value: "confirmCode" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV9("input", { type: "hidden", name: "email", value: actionData?.email || "" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "code", className: "block text-sm font-medium text-gray-700 mb-2", children: "Verification Code" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            id: "code",
            name: "code",
            type: "text",
            required: !0,
            maxLength: 6,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest",
            placeholder: "000000"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 68,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV9("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsxDEV9("p", { className: "text-sm text-red-700", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 81,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9(
        "button",
        {
          type: "submit",
          className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold",
          children: "Verify & Login"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 85,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxDEV9(
      "button",
      {
        onClick: () => setStep("email"),
        className: "text-blue-600 hover:text-blue-700 text-sm",
        children: "Use different email"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 94,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 93,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md", children: /* @__PURE__ */ jsxDEV9("p", { className: "text-xs text-yellow-700", children: [
      /* @__PURE__ */ jsxDEV9("strong", { children: "For testing:" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 104,
        columnNumber: 13
      }, this),
      " Check the API logs or use the test endpoint",
      /* @__PURE__ */ jsxDEV9("code", { className: "bg-yellow-100 px-1 rounded", children: [
        "/__test__/mailbox?email=",
        actionData?.email || "your-email"
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 105,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 103,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 51,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV9("div", { className: "max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg", children: [
    /* @__PURE__ */ jsxDEV9("h1", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Login to Your Account" }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9(Form3, { method: "post", children: [
      /* @__PURE__ */ jsxDEV9("input", { type: "hidden", name: "step", value: "sendCode" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: "Email Address" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            "data-testid": "login-email-input",
            id: "email",
            name: "email",
            type: "email",
            required: !0,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            placeholder: "Enter your email"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 125,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 121,
        columnNumber: 9
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV9("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsxDEV9("p", { className: "text-sm text-red-700", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 138,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV9(
        "button",
        {
          "data-testid": "login-submit",
          type: "submit",
          className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold",
          children: "Send Verification Code"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 142,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md", children: /* @__PURE__ */ jsxDEV9("p", { className: "text-xs text-gray-600", children: [
      /* @__PURE__ */ jsxDEV9("strong", { children: "Demo users:" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this),
      " Use ",
      /* @__PURE__ */ jsxDEV9("code", { className: "bg-gray-100 px-1 rounded", children: "demo@acme.test" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 153,
        columnNumber: 44
      }, this),
      " or ",
      /* @__PURE__ */ jsxDEV9("code", { className: "bg-gray-100 px-1 rounded", children: "admin@acme.test" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 153,
        columnNumber: 112
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 152,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 113,
    columnNumber: 5
  }, this);
}

// app/routes/cart.tsx
var cart_exports = {};
__export(cart_exports, {
  action: () => action5,
  default: () => Cart,
  loader: () => loader7
});
import { json as json7 } from "@remix-run/node";
import { useLoaderData as useLoaderData6, useFetcher as useFetcher2, Form as Form4 } from "@remix-run/react";
import { formatMoney as formatMoney4 } from "shared";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
async function loader7({ request }) {
  let sessionId = getSessionId(request), client = createGraphQLClient(void 0, void 0, sessionId);
  try {
    let result = await client.request(GET_CART);
    return json7({ cart: result.cart, sessionId });
  } catch (error) {
    return console.error("Failed to load cart:", error), json7({
      cart: { items: [], subtotal: 0, discountTotal: 0, total: 0, version: 1 },
      sessionId
    });
  }
}
async function action5({ request }) {
  let formData = await request.formData(), actionType = formData.get("_action"), sessionId = getSessionId(request), client = createGraphQLClient(void 0, void 0, sessionId);
  try {
    switch (actionType) {
      case "updateQuantity": {
        let productId = formData.get("productId"), quantity = parseInt(formData.get("quantity")), result = await client.request(UPDATE_CART_ITEM, {
          productId,
          quantity
        });
        return json7({ success: !0, cart: result.updateCartItem });
      }
      case "removeItem": {
        let productId = formData.get("productId"), result = await client.request(REMOVE_FROM_CART, {
          productId
        });
        return json7({ success: !0, cart: result.removeFromCart });
      }
      case "applyCoupon": {
        let code = formData.get("code"), result = await client.request(APPLY_COUPON, {
          code
        });
        return json7({ success: !0, cart: result.applyCoupon });
      }
      default:
        return json7({ success: !1, error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return json7(
      {
        success: !1,
        error: error.message || "Action failed"
      },
      { status: 400 }
    );
  }
}
function Cart() {
  let { cart, sessionId } = useLoaderData6(), fetcher = useFetcher2();
  return cart.items.length === 0 ? /* @__PURE__ */ jsxDEV10("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV10("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxDEV10("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Your Cart" }, void 0, !1, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 92,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV10("p", { className: "text-gray-600 text-lg mb-6", children: "Your cart is empty" }, void 0, !1, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 95,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV10(
      "a",
      {
        href: "/",
        className: "bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700",
        children: "Continue Shopping"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/cart.tsx",
        lineNumber: 98,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/cart.tsx",
    lineNumber: 91,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/cart.tsx",
    lineNumber: 90,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV10("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV10("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Your Cart" }, void 0, !1, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 111,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxDEV10("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxDEV10("div", { "data-testid": "cart-version", style: { display: "none" }, children: cart.version }, void 0, !1, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 118,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV10("div", { className: "bg-white border border-gray-200 rounded-lg", children: cart.items.map((item, index) => /* @__PURE__ */ jsxDEV10(
          "div",
          {
            className: `p-6 ${index < cart.items.length - 1 ? "border-b border-gray-200" : ""}`,
            children: /* @__PURE__ */ jsxDEV10("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV10("div", { className: "flex items-center space-x-4", children: [
                item.product.imageUrl ? /* @__PURE__ */ jsxDEV10(
                  "img",
                  {
                    src: item.product.imageUrl,
                    alt: item.product.name,
                    className: "h-16 w-16 object-cover rounded"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 133,
                    columnNumber: 23
                  },
                  this
                ) : /* @__PURE__ */ jsxDEV10("div", { className: "h-16 w-16 bg-gray-200 rounded flex items-center justify-center", children: /* @__PURE__ */ jsxDEV10("span", { className: "text-gray-400", children: "\u{1F4E6}" }, void 0, !1, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 140,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 139,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV10("div", { children: [
                  /* @__PURE__ */ jsxDEV10("h3", { className: "font-medium text-gray-900", children: item.product.name }, void 0, !1, {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 145,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV10("p", { className: "text-gray-600", children: [
                    formatMoney4(item.product.price),
                    " each"
                  ] }, void 0, !0, {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 148,
                    columnNumber: 23
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 144,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 131,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV10("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsxDEV10(fetcher.Form, { method: "post", children: [
                  /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "_action", value: "updateQuantity" }, void 0, !1, {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 156,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "productId", value: item.product.id }, void 0, !1, {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 157,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV10(
                    "select",
                    {
                      name: "quantity",
                      defaultValue: item.quantity,
                      onChange: (e) => {
                        let form = e.target.closest("form");
                        fetcher.submit(form);
                      },
                      className: "border border-gray-300 rounded px-2 py-1",
                      children: [0, 1, 2, 3, 4, 5].map((num) => /* @__PURE__ */ jsxDEV10("option", { value: num, children: num === 0 ? "Remove" : num }, num, !1, {
                        fileName: "app/routes/cart.tsx",
                        lineNumber: 168,
                        columnNumber: 27
                      }, this))
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/cart.tsx",
                      lineNumber: 158,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 155,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV10("div", { className: "text-right", children: /* @__PURE__ */ jsxDEV10("p", { className: "font-medium text-gray-900", children: formatMoney4(item.lineTotal) }, void 0, !1, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 176,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 175,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV10(fetcher.Form, { method: "post", children: [
                  /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "_action", value: "removeItem" }, void 0, !1, {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 182,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "productId", value: item.product.id }, void 0, !1, {
                    fileName: "app/routes/cart.tsx",
                    lineNumber: 183,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV10(
                    "button",
                    {
                      type: "submit",
                      className: "text-red-600 hover:text-red-700",
                      children: "\u2715"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/cart.tsx",
                      lineNumber: 184,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/cart.tsx",
                  lineNumber: 181,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 154,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 130,
              columnNumber: 17
            }, this)
          },
          item.product.id,
          !1,
          {
            fileName: "app/routes/cart.tsx",
            lineNumber: 124,
            columnNumber: 15
          },
          this
        )) }, void 0, !1, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV10("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxDEV10("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Order Summary" }, void 0, !1, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 200,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV10("div", { className: "space-y-2 mb-4", children: [
          /* @__PURE__ */ jsxDEV10("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV10("span", { className: "text-gray-600", children: "Subtotal" }, void 0, !1, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 206,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV10("span", { children: formatMoney4(cart.subtotal) }, void 0, !1, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 207,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 205,
            columnNumber: 15
          }, this),
          cart.discountTotal > 0 && /* @__PURE__ */ jsxDEV10("div", { className: "flex justify-between text-green-600", children: [
            /* @__PURE__ */ jsxDEV10("span", { children: [
              "Discount ",
              cart.appliedCoupon && `(${cart.appliedCoupon})`
            ] }, void 0, !0, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 212,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV10("span", { children: [
              "-",
              formatMoney4(cart.discountTotal)
            ] }, void 0, !0, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 215,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 211,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV10("div", { className: "border-t border-gray-200 pt-2", children: /* @__PURE__ */ jsxDEV10("div", { className: "flex justify-between font-semibold text-lg", children: [
            /* @__PURE__ */ jsxDEV10("span", { children: "Total" }, void 0, !1, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 221,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV10("span", { children: formatMoney4(cart.total) }, void 0, !1, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 222,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 219,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 204,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV10("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxDEV10("h3", { className: "text-sm font-medium text-gray-900 mb-2", children: "Apply Coupon" }, void 0, !1, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 228,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV10(fetcher.Form, { method: "post", className: "flex", children: [
            /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "_action", value: "applyCoupon" }, void 0, !1, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV10(
              "input",
              {
                "data-testid": "cart-apply-coupon",
                type: "text",
                name: "code",
                placeholder: "Enter coupon code",
                className: "flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/cart.tsx",
                lineNumber: 233,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV10(
              "button",
              {
                type: "submit",
                className: "bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700",
                children: "Apply"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/cart.tsx",
                lineNumber: 240,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this),
          fetcher.data?.error && /* @__PURE__ */ jsxDEV10("p", { className: "text-sm text-red-600 mt-2", children: fetcher.data.error }, void 0, !1, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 248,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 227,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV10(Form4, { action: "/checkout", method: "post", children: /* @__PURE__ */ jsxDEV10(
          "button",
          {
            "data-testid": "checkout-submit",
            type: "submit",
            className: "w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700",
            children: "Proceed to Checkout"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/cart.tsx",
            lineNumber: 255,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 199,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/cart.tsx",
    lineNumber: 110,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-TGG7EDBD.js", imports: ["/build/_shared/chunk-3VPVJWTU.js", "/build/_shared/chunk-NO3FWBWP.js", "/build/_shared/chunk-AHC3A2FO.js", "/build/_shared/chunk-7LUYLKYP.js", "/build/_shared/chunk-R3YRPWCC.js", "/build/_shared/chunk-RTBKPWXJ.js", "/build/_shared/chunk-ULL77KT2.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-GONS7UN6.js", imports: ["/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-CHVSVLXN.js", imports: ["/build/_shared/chunk-D7GE6T3A.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/cart": { id: "routes/cart", parentId: "root", path: "cart", index: void 0, caseSensitive: void 0, module: "/build/routes/cart-UIQZ4HNQ.js", imports: ["/build/_shared/chunk-D7GE6T3A.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/checkout": { id: "routes/checkout", parentId: "root", path: "checkout", index: void 0, caseSensitive: void 0, module: "/build/routes/checkout-U5I2FKBZ.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-PKEOEVLA.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GGSXPJWV.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/orders": { id: "routes/orders", parentId: "root", path: "orders", index: void 0, caseSensitive: void 0, module: "/build/routes/orders-4ELMOP4R.js", imports: ["/build/_shared/chunk-D7GE6T3A.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/products.$slug": { id: "routes/products.$slug", parentId: "root", path: "products/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/products.$slug-XBWIG7XM.js", imports: ["/build/_shared/chunk-D7GE6T3A.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 } }, version: "d26f7624", hmr: { runtime: "/build/_shared\\chunk-7LUYLKYP.js", timestamp: 1758426381512 }, url: "/build/manifest-D26F7624.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/products.$slug": {
    id: "routes/products.$slug",
    parentId: "root",
    path: "products/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: products_slug_exports
  },
  "routes/checkout": {
    id: "routes/checkout",
    parentId: "root",
    path: "checkout",
    index: void 0,
    caseSensitive: void 0,
    module: checkout_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/orders": {
    id: "routes/orders",
    parentId: "root",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: orders_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/cart": {
    id: "routes/cart",
    parentId: "root",
    path: "cart",
    index: void 0,
    caseSensitive: void 0,
    module: cart_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map

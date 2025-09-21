import {
  formatMoney
} from "/build/_shared/chunk-D7GE6T3A.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-NO3FWBWP.js";
import {
  Form,
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-AHC3A2FO.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LUYLKYP.js";
import "/build/_shared/chunk-R3YRPWCC.js";
import "/build/_shared/chunk-RTBKPWXJ.js";
import "/build/_shared/chunk-ULL77KT2.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/cart.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\cart.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\cart.tsx"
  );
  import.meta.hot.lastModified = "1758340726777.8318";
}
function Cart() {
  _s();
  const {
    cart,
    sessionId
  } = useLoaderData();
  const fetcher = useFetcher();
  if (cart.items.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Your Cart" }, void 0, false, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 123,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 text-lg mb-6", children: "Your cart is empty" }, void 0, false, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/", className: "bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700", children: "Continue Shopping" }, void 0, false, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 129,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 122,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 121,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Your Cart" }, void 0, false, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { "data-testid": "cart-version", style: {
          display: "none"
        }, children: cart.version }, void 0, false, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 143,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white border border-gray-200 rounded-lg", children: cart.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `p-6 ${index < cart.items.length - 1 ? "border-b border-gray-200" : ""}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
            item.product.imageUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: item.product.imageUrl, alt: item.product.name, className: "h-16 w-16 object-cover rounded" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 153,
              columnNumber: 46
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-16 w-16 bg-gray-200 rounded flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-400", children: "\u{1F4E6}" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 154,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 153,
              columnNumber: 151
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-medium text-gray-900", children: item.product.name }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 158,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: [
                formatMoney(item.product.price),
                " each"
              ] }, void 0, true, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 161,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 157,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 152,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "_action", value: "updateQuantity" }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 169,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "productId", value: item.product.id }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 170,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "quantity", defaultValue: item.quantity, onChange: (e) => {
                const form = e.target.closest("form");
                fetcher.submit(form);
              }, className: "border border-gray-300 rounded px-2 py-1", children: [0, 1, 2, 3, 4, 5].map((num) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: num, children: num === 0 ? "Remove" : num }, num, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 175,
                columnNumber: 56
              }, this)) }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 171,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 168,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium text-gray-900", children: formatMoney(item.lineTotal) }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 182,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 181,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "_action", value: "removeItem" }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 188,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "productId", value: item.product.id }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 189,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "text-red-600 hover:text-red-700", children: "\u2715" }, void 0, false, {
                fileName: "app/routes/cart.tsx",
                lineNumber: 190,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 187,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 167,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 151,
          columnNumber: 17
        }, this) }, item.product.id, false, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 150,
          columnNumber: 46
        }, this)) }, void 0, false, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:col-span-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Order Summary" }, void 0, false, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-600", children: "Subtotal" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 208,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatMoney(cart.subtotal) }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 209,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this),
          cart.discountTotal > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between text-green-600", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
              "Discount ",
              cart.appliedCoupon && `(${cart.appliedCoupon})`
            ] }, void 0, true, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 213,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
              "-",
              formatMoney(cart.discountTotal)
            ] }, void 0, true, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 216,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 212,
            columnNumber: 42
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-t border-gray-200 pt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between font-semibold text-lg", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 221,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatMoney(cart.total) }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 222,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 219,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 mb-2", children: "Apply Coupon" }, void 0, false, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 228,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", className: "flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "_action", value: "applyCoupon" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { "data-testid": "cart-apply-coupon", type: "text", name: "code", placeholder: "Enter coupon code", className: "flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 233,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700", children: "Apply" }, void 0, false, {
              fileName: "app/routes/cart.tsx",
              lineNumber: 234,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this),
          fetcher.data?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-red-600 mt-2", children: fetcher.data.error }, void 0, false, {
            fileName: "app/routes/cart.tsx",
            lineNumber: 238,
            columnNumber: 39
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 227,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { action: "/checkout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { "data-testid": "checkout-submit", type: "submit", className: "w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700", children: "Proceed to Checkout" }, void 0, false, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 244,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/cart.tsx",
          lineNumber: 243,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 201,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/cart.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/cart.tsx",
      lineNumber: 140,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/cart.tsx",
    lineNumber: 135,
    columnNumber: 10
  }, this);
}
_s(Cart, "QmlGuUukexwsBm/YGOW/XOLzaqg=", false, function() {
  return [useLoaderData, useFetcher];
});
_c = Cart;
var _c;
$RefreshReg$(_c, "Cart");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Cart as default
};
//# sourceMappingURL=/build/routes/cart-UIQZ4HNQ.js.map

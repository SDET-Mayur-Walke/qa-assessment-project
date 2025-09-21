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
  useFetcher,
  useLoaderData,
  useRouteError
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

// app/routes/products.$slug.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\products.$slug.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\products.$slug.tsx"
  );
  import.meta.hot.lastModified = "1758340726792.626";
}
function ErrorBoundary() {
  _s();
  const error = useRouteError();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Product Not Found" }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 92,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 mb-6", children: "The product you're looking for doesn't exist." }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 95,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/", className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700", children: "Back to Products" }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 98,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 91,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 90,
    columnNumber: 10
  }, this);
}
_s(ErrorBoundary, "oAgjgbJzsRXlB89+MoVumxMQqKM=", false, function() {
  return [useRouteError];
});
_c = ErrorBoundary;
function ProductDetail() {
  _s2();
  const {
    product
  } = useLoaderData();
  const fetcher = useFetcher();
  const isAddingToCart = fetcher.state === "submitting";
  const addToCartError = fetcher.data?.error;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: product.imageUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: product.imageUrl, alt: product.name, className: "w-full h-96 object-cover rounded-lg" }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 119,
      columnNumber: 31
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-400 text-6xl", children: "\u{1F4E6}" }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 120,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 119,
      columnNumber: 131
    }, this) }, void 0, false, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 118,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: product.name }, void 0, false, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 125,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-semibold text-gray-900", children: formatMoney(product.price) }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 130,
          columnNumber: 13
        }, this),
        !product.inStock && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium", children: "Out of Stock" }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 134,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      product.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Description" }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 leading-relaxed", children: product.description }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 143,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 139,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Categories" }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: product.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm", children: tag.charAt(0).toUpperCase() + tag.slice(1) }, tag, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 153,
          columnNumber: 40
        }, this)) }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 152,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 148,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "productId", value: product.id }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 160,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-4 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "quantity", className: "text-sm font-medium text-gray-700", children: "Quantity:" }, void 0, false, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 162,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "quantity", name: "quantity", className: "border border-gray-300 rounded-md px-3 py-1", defaultValue: "1", children: [1, 2, 3, 4, 5].map((num) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: num, children: num }, num, false, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 166,
            columnNumber: 45
          }, this)) }, void 0, false, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 165,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 161,
          columnNumber: 13
        }, this),
        !product.inStock && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 border border-red-200 rounded-md p-4 mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-red-800", children: "Out of Stock" }, void 0, false, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 175,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-red-700 mt-1", children: "This product is currently unavailable." }, void 0, false, {
            fileName: "app/routes/products.$slug.tsx",
            lineNumber: 178,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 174,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 173,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 172,
          columnNumber: 34
        }, this),
        addToCartError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 border border-red-200 rounded-md p-4 mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-red-700", children: addToCartError }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 186,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 185,
          columnNumber: 32
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { "data-testid": "add-to-cart", type: "submit", disabled: !product.inStock || isAddingToCart, className: "w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors", children: isAddingToCart ? "Adding to Cart..." : !product.inStock ? "Out of Stock" : "Add to Cart" }, void 0, false, {
          fileName: "app/routes/products.$slug.tsx",
          lineNumber: 189,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 159,
        columnNumber: 11
      }, this),
      fetcher.data?.success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 bg-green-50 border border-green-200 rounded-md p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-green-700", children: "\u2705 Added to cart successfully!" }, void 0, false, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 195,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/products.$slug.tsx",
        lineNumber: 194,
        columnNumber: 37
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/products.$slug.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 117,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/products.$slug.tsx",
    lineNumber: 116,
    columnNumber: 10
  }, this);
}
_s2(ProductDetail, "Z98jupgeU2oKH0pkywqrTe+WTeo=", false, function() {
  return [useLoaderData, useFetcher];
});
_c2 = ProductDetail;
var _c;
var _c2;
$RefreshReg$(_c, "ErrorBoundary");
$RefreshReg$(_c2, "ProductDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  ProductDetail as default
};
//# sourceMappingURL=/build/routes/products.$slug-XBWIG7XM.js.map

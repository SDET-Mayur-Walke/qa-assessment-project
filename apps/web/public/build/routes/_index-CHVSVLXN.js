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
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams
} from "/build/_shared/chunk-AHC3A2FO.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LUYLKYP.js";
import "/build/_shared/chunk-R3YRPWCC.js";
import "/build/_shared/chunk-RTBKPWXJ.js";
import {
  require_react
} from "/build/_shared/chunk-ULL77KT2.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_react3 = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);

// app/components/ProductCard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\ProductCard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\ProductCard.tsx"
  );
  import.meta.hot.lastModified = "1758340726700.7207";
}
function ProductCard({
  product
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { "data-testid": "product-card", className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/products/${product.slug}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200", children: product.imageUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: product.imageUrl, alt: product.name, className: "h-48 w-full object-cover" }, void 0, false, {
      fileName: "app/components/ProductCard.tsx",
      lineNumber: 29,
      columnNumber: 31
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-48 w-full bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-400 text-4xl", children: "\u{1F4E6}" }, void 0, false, {
      fileName: "app/components/ProductCard.tsx",
      lineNumber: 30,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/components/ProductCard.tsx",
      lineNumber: 29,
      columnNumber: 120
    }, this) }, void 0, false, {
      fileName: "app/components/ProductCard.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 mb-1", children: product.name }, void 0, false, {
        fileName: "app/components/ProductCard.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      product.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 mb-2 line-clamp-2", children: product.description }, void 0, false, {
        fileName: "app/components/ProductCard.tsx",
        lineNumber: 39,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-lg font-semibold text-gray-900", children: formatMoney(product.price) }, void 0, false, {
          fileName: "app/components/ProductCard.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this),
        !product.inStock && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-red-600 font-medium", children: "Out of Stock" }, void 0, false, {
          fileName: "app/components/ProductCard.tsx",
          lineNumber: 48,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ProductCard.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 flex flex-wrap gap-1", children: product.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded", children: tag }, tag, false, {
        fileName: "app/components/ProductCard.tsx",
        lineNumber: 54,
        columnNumber: 38
      }, this)) }, void 0, false, {
        fileName: "app/components/ProductCard.tsx",
        lineNumber: 53,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ProductCard.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ProductCard.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/ProductCard.tsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
}
_c = ProductCard;
var _c;
$RefreshReg$(_c, "ProductCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/hooks/useDebounce.ts
var import_react2 = __toESM(require_react(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\useDebounce.ts"
  );
  import.meta.hot.lastModified = "1758340726725.6785";
}
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = (0, import_react2.useState)(value);
  (0, import_react2.useEffect)(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// app/routes/_index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1758340726892.6704";
}
function Index() {
  _s();
  const {
    products,
    query: initialQuery,
    tag: initialTag
  } = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = (0, import_react3.useState)(initialQuery);
  const [selectedTag, setSelectedTag] = (0, import_react3.useState)(initialTag);
  const debouncedQuery = useDebounce(searchQuery, 400);
  import_react3.default.useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery)
      params.set("query", debouncedQuery);
    if (selectedTag)
      params.set("tag", selectedTag);
    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    navigate(newUrl, {
      replace: true
    });
  }, [debouncedQuery, selectedTag, navigate]);
  const allTags = Array.from(new Set(products.edges.flatMap((edge) => edge.node?.tags || []).filter(Boolean))).sort();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Our Products" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { "data-testid": "search-input", type: "text", placeholder: "Search products...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 98,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 97,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { value: selectedTag, onChange: (e) => setSelectedTag(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "All Categories" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 103,
            columnNumber: 15
          }, this),
          allTags.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: tag, children: tag.charAt(0).toUpperCase() + tag.slice(1) }, tag, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 104,
            columnNumber: 35
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 101,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this),
      (searchQuery || selectedTag) && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-sm text-gray-600", children: [
        products.totalCount,
        " product",
        products.totalCount !== 1 ? "s" : "",
        " found",
        searchQuery && ` for "${searchQuery}"`,
        selectedTag && ` in category "${selectedTag}"`
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 112,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 111,
        columnNumber: 42
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    products.edges.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: products.edges.map((edge) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProductCard, { product: edge.node }, edge.node?.id || edge.cursor, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 121,
      columnNumber: 39
    }, this)) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 120,
      columnNumber: 36
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-500 text-lg", children: "No products found" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 123,
        columnNumber: 11
      }, this),
      (searchQuery || selectedTag) && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-400 mt-2", children: "Try adjusting your search or filter" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 124,
        columnNumber: 44
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 122,
      columnNumber: 18
    }, this),
    products.pageInfo.hasNextPage && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mt-8 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => {
      const params = new URLSearchParams(searchParams);
      params.set("after", products.pageInfo.endCursor);
      navigate(`/?${params.toString()}`);
    }, className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700", children: "Load More" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 129,
      columnNumber: 41
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 90,
    columnNumber: 10
  }, this);
}
_s(Index, "Ub3dVdfwYzpj+PXsjhcx9f9m5gw=", false, function() {
  return [useLoaderData, useNavigate, useSearchParams, useDebounce];
});
_c2 = Index;
var _c2;
$RefreshReg$(_c2, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-CHVSVLXN.js.map

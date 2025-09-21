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

// app/routes/orders.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\orders.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\orders.tsx"
  );
  import.meta.hot.lastModified = "1758340726882.079";
}
function Orders() {
  _s();
  const {
    orders
  } = useLoaderData();
  if (orders.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Your Orders" }, void 0, false, {
        fileName: "app/routes/orders.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 text-lg mb-6", children: "You haven't placed any orders yet" }, void 0, false, {
        fileName: "app/routes/orders.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/", className: "bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700", children: "Start Shopping" }, void 0, false, {
        fileName: "app/routes/orders.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 56,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Your Orders" }, void 0, false, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900", children: [
            "Order #",
            order.number
          ] }, void 0, true, {
            fileName: "app/routes/orders.tsx",
            lineNumber: 79,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600", children: [
            "Placed on ",
            new Date(order.createdAt).toLocaleDateString()
          ] }, void 0, true, {
            fileName: "app/routes/orders.tsx",
            lineNumber: 82,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/orders.tsx",
          lineNumber: 78,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg font-semibold text-gray-900", children: formatMoney(order.total) }, void 0, false, {
          fileName: "app/routes/orders.tsx",
          lineNumber: 87,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/orders.tsx",
          lineNumber: 86,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/orders.tsx",
        lineNumber: 77,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-t border-gray-200 pt-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-900 mb-2", children: "Items Ordered" }, void 0, false, {
          fileName: "app/routes/orders.tsx",
          lineNumber: 94,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: order.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-900", children: [
            item.product.name,
            " \xD7 ",
            item.quantity
          ] }, void 0, true, {
            fileName: "app/routes/orders.tsx",
            lineNumber: 99,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-600", children: formatMoney(item.lineTotal) }, void 0, false, {
            fileName: "app/routes/orders.tsx",
            lineNumber: 102,
            columnNumber: 21
          }, this)
        ] }, index, true, {
          fileName: "app/routes/orders.tsx",
          lineNumber: 98,
          columnNumber: 51
        }, this)) }, void 0, false, {
          fileName: "app/routes/orders.tsx",
          lineNumber: 97,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/orders.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this)
    ] }, order.id, true, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 76,
      columnNumber: 30
    }, this)) }, void 0, false, {
      fileName: "app/routes/orders.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/orders.tsx",
    lineNumber: 70,
    columnNumber: 10
  }, this);
}
_s(Orders, "REZ/uewjGaXhSxuZZAJ5w5to6lI=", false, function() {
  return [useLoaderData];
});
_c = Orders;
var _c;
$RefreshReg$(_c, "Orders");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Orders as default
};
//# sourceMappingURL=/build/routes/orders-4ELMOP4R.js.map

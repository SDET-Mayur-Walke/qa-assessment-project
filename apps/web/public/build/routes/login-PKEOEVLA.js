import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-NO3FWBWP.js";
import {
  Form,
  useActionData
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

// app/routes/login.tsx
var import_react = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\login.tsx"
  );
  import.meta.hot.lastModified = "1758340726784.8027";
}
function Login() {
  _s();
  const actionData = useActionData();
  const [step, setStep] = (0, import_react.useState)(actionData?.step === "confirmCode" ? "code" : "email");
  if (step === "code" || actionData?.step === "confirmCode") {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Enter Verification Code" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 mb-6 text-center", children: [
        "We've sent a 6-digit code to ",
        actionData?.email || "your email"
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "step", value: "confirmCode" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 88,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "email", value: actionData?.email || "" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "code", className: "block text-sm font-medium text-gray-700 mb-2", children: "Verification Code" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 92,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "code", name: "code", type: "text", required: true, maxLength: 6, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest", placeholder: "000000" }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-red-700", children: actionData.error }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 99,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 98,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold", children: "Verify & Login" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 102,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setStep("email"), className: "text-blue-600 hover:text-blue-700 text-sm", children: "Use different email" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-yellow-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "For testing:" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 115,
          columnNumber: 13
        }, this),
        " Check the API logs or use the test endpoint",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { className: "bg-yellow-100 px-1 rounded", children: [
          "/__test__/mailbox?email=",
          actionData?.email || "your-email"
        ] }, void 0, true, {
          fileName: "app/routes/login.tsx",
          lineNumber: 116,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 114,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 113,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 78,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Login to Your Account" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "step", value: "sendCode" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 127,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: "Email Address" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 130,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { "data-testid": "login-email-input", id: "email", name: "email", type: "email", required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Enter your email" }, void 0, false, {
          fileName: "app/routes/login.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-red-700", children: actionData.error }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 137,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 136,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { "data-testid": "login-submit", type: "submit", className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold", children: "Send Verification Code" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 126,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-600", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Demo users:" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 147,
        columnNumber: 11
      }, this),
      " Use ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { className: "bg-gray-100 px-1 rounded", children: "demo@acme.test" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 147,
        columnNumber: 44
      }, this),
      " or ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { className: "bg-gray-100 px-1 rounded", children: "admin@acme.test" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 147,
        columnNumber: 112
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 146,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 121,
    columnNumber: 10
  }, this);
}
_s(Login, "XaOyffLbi028J5p8COtFPqCsPO4=", false, function() {
  return [useActionData];
});
_c = Login;
var _c;
$RefreshReg$(_c, "Login");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Login as default
};
//# sourceMappingURL=/build/routes/login-PKEOEVLA.js.map

// ../../packages/shared/dist/index.js
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["UNAUTHENTICATED"] = "UNAUTHENTICATED";
  ErrorCode2["OUT_OF_STOCK"] = "OUT_OF_STOCK";
  ErrorCode2["RATE_LIMITED"] = "RATE_LIMITED";
})(ErrorCode || (ErrorCode = {}));
function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export {
  formatMoney
};
//# sourceMappingURL=/build/_shared/chunk-D7GE6T3A.js.map

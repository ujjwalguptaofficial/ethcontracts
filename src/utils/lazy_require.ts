declare var __webpack_require__;
declare var __non_webpack_require__;
const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
export const lazyRequire = (moduleName: string) => {
    return requireFunc(moduleName);
};
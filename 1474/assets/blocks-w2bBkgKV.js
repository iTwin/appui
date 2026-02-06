const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Color-AVL7NMMY-mF6AspBB.js","./iframe-MZ9GDAUV.js"])))=>i.map(i=>d[i]);
import { r as reactExports, i as e, j as jsxRuntimeExports, A as ReactDOM, C as Ve$2, k as reactDomExports, D as ha$1, _ as __vitePreload, E as Tn$2 } from "./iframe-MZ9GDAUV.js";
var h$2 = Object.create;
var f$1 = Object.defineProperty;
var O$1 = Object.getOwnPropertyDescriptor;
var $$2 = Object.getOwnPropertyNames;
var v$1 = Object.getPrototypeOf, j$1 = Object.prototype.hasOwnProperty;
var a$1 = (e4, r4) => f$1(e4, "name", { value: r4, configurable: true });
var _$2 = (e4, r4) => () => (r4 || e4((r4 = { exports: {} }).exports, r4), r4.exports);
var C$3 = (e4, r4, t4, n4) => {
  if (r4 && typeof r4 == "object" || typeof r4 == "function")
    for (let s2 of $$2(r4))
      !j$1.call(e4, s2) && s2 !== t4 && f$1(e4, s2, { get: () => r4[s2], enumerable: !(n4 = O$1(r4, s2)) || n4.enumerable });
  return e4;
};
var E$2 = (e4, r4, t4) => (t4 = e4 != null ? h$2(v$1(e4)) : {}, C$3(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  f$1(t4, "default", { value: e4, enumerable: true }),
  e4
));
var S$1 = _$2((g4) => {
  Object.defineProperty(g4, "__esModule", { value: true }), g4.isEqual = /* @__PURE__ */ function() {
    var e4 = Object.prototype.toString, r4 = Object.getPrototypeOf, t4 = Object.getOwnPropertySymbols ? function(n4) {
      return Object.keys(n4).concat(Object.getOwnPropertySymbols(n4));
    } : Object.keys;
    return function(n4, s2) {
      return (/* @__PURE__ */ a$1(function l2(o4, i4, p4) {
        var c2, d4, u2, A3 = e4.call(o4), b3 = e4.call(i4);
        if (o4 === i4) return true;
        if (o4 == null || i4 == null) return false;
        if (p4.indexOf(o4) > -1 && p4.indexOf(i4) > -1) return true;
        if (p4.push(o4, i4), A3 != b3 || (c2 = t4(o4), d4 = t4(i4), c2.length != d4.length || c2.some(function(m4) {
          return !l2(o4[m4], i4[m4], p4);
        }))) return false;
        switch (A3.slice(8, -1)) {
          case "Symbol":
            return o4.valueOf() == i4.valueOf();
          case "Date":
          case "Number":
            return +o4 == +i4 || +o4 != +o4 && +i4 != +i4;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + o4 == "" + i4;
          case "Set":
          case "Map":
            c2 = o4.entries(), d4 = i4.entries();
            do
              if (!l2((u2 = c2.next()).value, d4.next().value, p4)) return false;
            while (!u2.done);
            return true;
          case "ArrayBuffer":
            o4 = new Uint8Array(o4), i4 = new Uint8Array(i4);
          case "DataView":
            o4 = new Uint8Array(o4.buffer), i4 = new Uint8Array(i4.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (o4.length != i4.length) return false;
            for (u2 = 0; u2 < o4.length; u2++) if ((u2 in o4 || u2 in i4) && (u2 in o4 != u2 in i4 || !l2(o4[u2], i4[u2], p4))) return false;
            return true;
          case "Object":
            return l2(r4(o4), r4(i4), p4);
          default:
            return false;
        }
      }, "n"))(n4, s2, []);
    };
  }();
});
function x$1(e4) {
  return e4.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (r4, t4, n4, s2) => `${t4} ${n4}${s2}`).replace(
    /([a-z])([A-Z])/g,
    (r4, t4, n4) => `${t4} ${n4}`
  ).replace(/([a-z])([0-9])/gi, (r4, t4, n4) => `${t4} ${n4}`).replace(/([0-9])([a-z])/gi, (r4, t4, n4) => `${t4} ${n4}`).replace(/(\s|^)(\w)/g, (r4, t4, n4) => `${t4}${n4.toUpperCase()}`).replace(/ +/g, " ").trim();
}
a$1(x$1, "toStartCaseStr");
var y$1 = E$2(S$1());
var w$1 = /* @__PURE__ */ a$1((e4) => e4.map((r4) => typeof r4 < "u").filter(Boolean).length, "count"), P$2 = /* @__PURE__ */ a$1((e4, r4) => {
  let { exists: t4, eq: n4, neq: s2, truthy: l2 } = e4;
  if (w$1([t4, n4, s2, l2]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t4, eq: n4, neq: s2 })}`);
  if (typeof n4 < "u")
    return (0, y$1.isEqual)(r4, n4);
  if (typeof s2 < "u")
    return !(0, y$1.isEqual)(r4, s2);
  if (typeof t4 < "u") {
    let i4 = typeof r4 < "u";
    return t4 ? i4 : !i4;
  }
  return (typeof l2 > "u" ? true : l2) ? !!r4 : !r4;
}, "testValue"), z$2 = /* @__PURE__ */ a$1((e4, r4, t4) => {
  if (!e4.if)
    return true;
  let { arg: n4, global: s2 } = e4.if;
  if (w$1([n4, s2]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: n4, global: s2 })}`);
  let l2 = n4 ? r4[n4] : t4[s2];
  return P$2(e4.if, l2);
}, "includeConditionalArg");
function F$1(e4) {
  return e4 != null && typeof e4 == "object" && "_tag" in e4 && e4?._tag === "Preview";
}
a$1(F$1, "isPreview");
function G$1(e4) {
  return e4 != null && typeof e4 == "object" && "_tag" in e4 && e4?._tag === "Meta";
}
a$1(G$1, "isMeta");
function J$3(e4) {
  return e4 != null && typeof e4 == "object" && "_tag" in e4 && e4?._tag === "Story";
}
a$1(J$3, "isStory");
var I$2 = /* @__PURE__ */ a$1((e4) => e4.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(
  /-+/g,
  "-"
).replace(/^-+/, "").replace(/-+$/, ""), "sanitize");
function T$1(e4, r4) {
  return Array.isArray(r4) ? r4.includes(e4) : e4.match(r4);
}
a$1(T$1, "matches");
function K$1(e4, { includeStories: r4, excludeStories: t4 }) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    e4 !== "__esModule" && (!r4 || T$1(e4, r4)) && (!t4 || !T$1(e4, t4))
  );
}
a$1(K$1, "isExportStory");
function debounce$1(func, debounceMs, { signal, edges } = {}) {
  let pendingThis, pendingArgs = null, leading = edges != null && edges.includes("leading"), trailing = edges == null || edges.includes("trailing"), invoke = () => {
    pendingArgs !== null && (func.apply(pendingThis, pendingArgs), pendingThis = void 0, pendingArgs = null);
  }, onTimerEnd = () => {
    trailing && invoke(), cancel();
  }, timeoutId = null, schedule = () => {
    timeoutId != null && clearTimeout(timeoutId), timeoutId = setTimeout(() => {
      timeoutId = null, onTimerEnd();
    }, debounceMs);
  }, cancelTimer = () => {
    timeoutId !== null && (clearTimeout(timeoutId), timeoutId = null);
  }, cancel = () => {
    cancelTimer(), pendingThis = void 0, pendingArgs = null;
  }, flush = () => {
    cancelTimer(), invoke();
  }, debounced = function(...args) {
    if (signal?.aborted) return;
    pendingThis = this, pendingArgs = args;
    let isFirstCall = timeoutId == null;
    schedule(), leading && isFirstCall && invoke();
  };
  return debounced.schedule = schedule, debounced.cancel = cancel, debounced.flush = flush, signal?.addEventListener("abort", cancel, { once: true }), debounced;
}
function debounce2(func, debounceMs = 0, options = {}) {
  typeof options != "object" && (options = {});
  let { signal, leading = false, trailing = true, maxWait } = options, edges = Array(2);
  leading && (edges[0] = "leading"), trailing && (edges[1] = "trailing");
  let result, pendingAt = null, _debounced = debounce$1(function(...args) {
    result = func.apply(this, args), pendingAt = null;
  }, debounceMs, { signal, edges }), debounced = function(...args) {
    if (maxWait != null) {
      if (pendingAt === null) pendingAt = Date.now();
      else if (Date.now() - pendingAt >= maxWait) return result = func.apply(this, args), pendingAt = Date.now(), _debounced.cancel(), _debounced.schedule(), result;
    }
    return _debounced.apply(this, args), result;
  }, flush = () => (_debounced.flush(), result);
  return debounced.cancel = _debounced.cancel, debounced.flush = flush, debounced;
}
function isSymbol(value2) {
  return typeof value2 == "symbol" || value2 instanceof Symbol;
}
function toNumber(value2) {
  return isSymbol(value2) ? NaN : Number(value2);
}
function toFinite(value2) {
  return value2 ? (value2 = toNumber(value2), value2 === 1 / 0 || value2 === -1 / 0 ? (value2 < 0 ? -1 : 1) * Number.MAX_VALUE : value2 === value2 ? value2 : 0) : value2 === 0 ? value2 : 0;
}
function toInteger(value2) {
  let finite = toFinite(value2), remainder = finite % 1;
  return remainder ? finite - remainder : finite;
}
function uniq(arr) {
  return Array.from(new Set(arr));
}
function isPrimitive(value2) {
  return value2 == null || typeof value2 != "object" && typeof value2 != "function";
}
function isTypedArray(x4) {
  return ArrayBuffer.isView(x4) && !(x4 instanceof DataView);
}
function getSymbols(object2) {
  return Object.getOwnPropertySymbols(object2).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object2, symbol));
}
function getTag(value2) {
  return value2 == null ? value2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value2);
}
var regexpTag = "[object RegExp]", stringTag = "[object String]", numberTag = "[object Number]", booleanTag = "[object Boolean]", argumentsTag = "[object Arguments]", symbolTag = "[object Symbol]", dateTag = "[object Date]", mapTag = "[object Map]", setTag = "[object Set]", arrayTag = "[object Array]";
var arrayBufferTag = "[object ArrayBuffer]", objectTag = "[object Object]";
var dataViewTag = "[object DataView]", uint8ArrayTag = "[object Uint8Array]", uint8ClampedArrayTag = "[object Uint8ClampedArray]", uint16ArrayTag = "[object Uint16Array]", uint32ArrayTag = "[object Uint32Array]";
var int8ArrayTag = "[object Int8Array]", int16ArrayTag = "[object Int16Array]", int32ArrayTag = "[object Int32Array]";
var float32ArrayTag = "[object Float32Array]", float64ArrayTag = "[object Float64Array]";
function cloneDeepWith(obj, cloneValue) {
  return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
  let cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
  if (cloned != null) return cloned;
  if (isPrimitive(valueToClone)) return valueToClone;
  if (stack.has(valueToClone)) return stack.get(valueToClone);
  if (Array.isArray(valueToClone)) {
    let result = new Array(valueToClone.length);
    stack.set(valueToClone, result);
    for (let i4 = 0; i4 < valueToClone.length; i4++) result[i4] = cloneDeepWithImpl(valueToClone[i4], i4, objectToClone, stack, cloneValue);
    return Object.hasOwn(valueToClone, "index") && (result.index = valueToClone.index), Object.hasOwn(valueToClone, "input") && (result.input = valueToClone.input), result;
  }
  if (valueToClone instanceof Date) return new Date(valueToClone.getTime());
  if (valueToClone instanceof RegExp) {
    let result = new RegExp(valueToClone.source, valueToClone.flags);
    return result.lastIndex = valueToClone.lastIndex, result;
  }
  if (valueToClone instanceof Map) {
    let result = /* @__PURE__ */ new Map();
    stack.set(valueToClone, result);
    for (let [key, value2] of valueToClone) result.set(key, cloneDeepWithImpl(value2, key, objectToClone, stack, cloneValue));
    return result;
  }
  if (valueToClone instanceof Set) {
    let result = /* @__PURE__ */ new Set();
    stack.set(valueToClone, result);
    for (let value2 of valueToClone) result.add(cloneDeepWithImpl(value2, void 0, objectToClone, stack, cloneValue));
    return result;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(valueToClone)) return valueToClone.subarray();
  if (isTypedArray(valueToClone)) {
    let result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
    stack.set(valueToClone, result);
    for (let i4 = 0; i4 < valueToClone.length; i4++) result[i4] = cloneDeepWithImpl(valueToClone[i4], i4, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && valueToClone instanceof SharedArrayBuffer) return valueToClone.slice(0);
  if (valueToClone instanceof DataView) {
    let result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
    return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
  }
  if (typeof File < "u" && valueToClone instanceof File) {
    let result = new File([valueToClone], valueToClone.name, { type: valueToClone.type });
    return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
  }
  if (valueToClone instanceof Blob) {
    let result = new Blob([valueToClone], { type: valueToClone.type });
    return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
  }
  if (valueToClone instanceof Error) {
    let result = new valueToClone.constructor();
    return stack.set(valueToClone, result), result.message = valueToClone.message, result.name = valueToClone.name, result.stack = valueToClone.stack, result.cause = valueToClone.cause, copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
  }
  if (typeof valueToClone == "object" && isCloneableObject(valueToClone)) {
    let result = Object.create(Object.getPrototypeOf(valueToClone));
    return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
  }
  return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
  let keys = [...Object.keys(source), ...getSymbols(source)];
  for (let i4 = 0; i4 < keys.length; i4++) {
    let key = keys[i4], descriptor = Object.getOwnPropertyDescriptor(target, key);
    (descriptor == null || descriptor.writable) && (target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue));
  }
}
function isCloneableObject(object2) {
  switch (getTag(object2)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag:
      return true;
    default:
      return false;
  }
}
function isLength(value2) {
  return Number.isSafeInteger(value2) && value2 >= 0;
}
function isArrayLike(value2) {
  return value2 != null && typeof value2 != "function" && isLength(value2.length);
}
function cloneDeepWith2(obj, cloneValue) {
  return cloneDeepWith(obj, (value2, key, object2, stack) => {
    if (typeof obj == "object") switch (Object.prototype.toString.call(obj)) {
      case numberTag:
      case stringTag:
      case booleanTag: {
        let result = new obj.constructor(obj?.valueOf());
        return copyProperties(result, obj), result;
      }
      case argumentsTag: {
        let result = {};
        return copyProperties(result, obj), result.length = obj.length, result[Symbol.iterator] = obj[Symbol.iterator], result;
      }
      default:
        return;
    }
  });
}
function cloneDeep(obj) {
  return cloneDeepWith2(obj);
}
function range(start, end, step = 1) {
  if (end == null && (end = start, start = 0), !Number.isInteger(step) || step === 0) throw new Error("The step value must be a non-zero integer.");
  let length = Math.max(Math.ceil((end - start) / step), 0), result = new Array(length);
  for (let i4 = 0; i4 < length; i4++) result[i4] = start + i4 * step;
  return result;
}
function uniq2(arr) {
  return isArrayLike(arr) ? uniq(Array.from(arr)) : [];
}
function isBuffer(x4) {
  return typeof Buffer < "u" && Buffer.isBuffer(x4);
}
function isPrototype(value2) {
  let constructor = value2?.constructor, prototype = typeof constructor == "function" ? constructor.prototype : Object.prototype;
  return value2 === prototype;
}
function isTypedArray2(x4) {
  return isTypedArray(x4);
}
function times(n4, getValue2) {
  if (n4 = toInteger(n4), n4 < 1 || !Number.isSafeInteger(n4)) return [];
  let result = new Array(n4);
  for (let i4 = 0; i4 < n4; i4++) result[i4] = typeof getValue2 == "function" ? getValue2(i4) : i4;
  return result;
}
function keysIn(object2) {
  if (object2 == null) return [];
  switch (typeof object2) {
    case "object":
    case "function":
      return isArrayLike(object2) ? arrayLikeKeysIn(object2) : isPrototype(object2) ? prototypeKeysIn(object2) : keysInImpl(object2);
    default:
      return keysInImpl(Object(object2));
  }
}
function keysInImpl(object2) {
  let result = [];
  for (let key in object2) result.push(key);
  return result;
}
function prototypeKeysIn(object2) {
  return keysInImpl(object2).filter((key) => key !== "constructor");
}
function arrayLikeKeysIn(object2) {
  let indices = times(object2.length, (index2) => `${index2}`), filteredKeys = new Set(indices);
  return isBuffer(object2) && (filteredKeys.add("offset"), filteredKeys.add("parent")), isTypedArray2(object2) && (filteredKeys.add("buffer"), filteredKeys.add("byteLength"), filteredKeys.add("byteOffset")), [...indices, ...keysInImpl(object2).filter((key) => !filteredKeys.has(key))];
}
function getSymbolsIn(object2) {
  let result = [];
  for (; object2; ) result.push(...getSymbols(object2)), object2 = Object.getPrototypeOf(object2);
  return result;
}
function pickBy(obj, shouldPick) {
  if (obj == null) return {};
  let result = {};
  if (shouldPick == null) return obj;
  let keys = isArrayLike(obj) ? range(0, obj.length) : [...keysIn(obj), ...getSymbolsIn(obj)];
  for (let i4 = 0; i4 < keys.length; i4++) {
    let key = isSymbol(keys[i4]) ? keys[i4] : keys[i4].toString(), value2 = obj[key];
    shouldPick(value2, key, obj) && (result[key] = value2);
  }
  return result;
}
var getControlId = (value2) => `control-${value2.replace(/\s+/g, "-")}`, getControlSetterButtonId = (value2) => `set-${value2.replace(/\s+/g, "-")}`;
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf, __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __require = ((x4) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x4, { get: (a4, b3) => (typeof require < "u" ? require : a4)[b3] }) : x4)(function(x4) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x4 + '" is not supported');
});
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to2, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames$1(from)) !__hasOwnProp$1.call(to2, key) && key !== except && __defProp$1(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable });
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(!mod || !mod.__esModule ? __defProp$1(target, "default", { value: mod, enumerable: true }) : target, mod));
var wn$1 = Object.create;
var or$1 = Object.defineProperty;
var En = Object.getOwnPropertyDescriptor;
var Sn = Object.getOwnPropertyNames;
var Tn$1 = Object.getPrototypeOf, Cn = Object.prototype.hasOwnProperty;
var o$2 = (e4, r4) => or$1(e4, "name", { value: r4, configurable: true }), Oe$2 = /* @__PURE__ */ ((e4) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e4, {
  get: (r4, t4) => (typeof require < "u" ? require : r4)[t4]
}) : e4)(function(e4) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e4 + '" is not supported');
});
var De$1 = (e4, r4) => () => (r4 || e4((r4 = { exports: {} }).exports, r4), r4.exports);
var On$1 = (e4, r4, t4, n4) => {
  if (r4 && typeof r4 == "object" || typeof r4 == "function")
    for (let a4 of Sn(r4))
      !Cn.call(e4, a4) && a4 !== t4 && or$1(e4, a4, { get: () => r4[a4], enumerable: !(n4 = En(r4, a4)) || n4.enumerable });
  return e4;
};
var ir = (e4, r4, t4) => (t4 = e4 != null ? wn$1(Tn$1(e4)) : {}, On$1(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  r4 || !e4 || !e4.__esModule ? or$1(t4, "default", { value: e4, enumerable: true }) : t4,
  e4
));
var nt = De$1((O2) => {
  (function() {
    var e4 = typeof Symbol == "function" && Symbol.for, r4 = e4 ? Symbol.for("react.element") : 60103, t4 = e4 ? Symbol.for("react.portal") : 60106, n4 = e4 ? Symbol.for("react.fragment") : 60107, a4 = e4 ? Symbol.for("react.strict_mode") : 60108, i4 = e4 ? Symbol.for("react.profiler") : 60114, s2 = e4 ? Symbol.for("react.provider") : 60109, u2 = e4 ? Symbol.for("react.context") : 60110, f2 = e4 ? Symbol.for("react.async_mode") : 60111, p4 = e4 ? Symbol.for("react.concurrent_mode") : 60111, c2 = e4 ? Symbol.for("react.forward_ref") : 60112, l2 = e4 ? Symbol.for("react.suspense") : 60113, m4 = e4 ? Symbol.for("react.suspense_list") : 60120, x4 = e4 ? Symbol.for("react.memo") : 60115, b3 = e4 ? Symbol.for("react.lazy") : 60116, d4 = e4 ? Symbol.for("react.block") : 60121, v3 = e4 ? Symbol.for("react.fundamental") : 60117, y4 = e4 ? Symbol.for("react.responder") : 60118, w3 = e4 ? Symbol.for("react.scope") : 60119;
    function A3(g4) {
      return typeof g4 == "string" || typeof g4 == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      g4 === n4 || g4 === p4 || g4 === i4 || g4 === a4 || g4 === l2 || g4 === m4 || typeof g4 == "object" && g4 !== null && (g4.$$typeof === b3 || g4.$$typeof === x4 || g4.$$typeof === s2 || g4.$$typeof === u2 || g4.$$typeof === c2 || g4.$$typeof === v3 || g4.$$typeof === y4 || g4.$$typeof === w3 || g4.$$typeof === d4);
    }
    o$2(A3, "isValidElementType");
    function S4(g4) {
      if (typeof g4 == "object" && g4 !== null) {
        var ar2 = g4.$$typeof;
        switch (ar2) {
          case r4:
            var Be2 = g4.type;
            switch (Be2) {
              case f2:
              case p4:
              case n4:
              case i4:
              case a4:
              case l2:
                return Be2;
              default:
                var Mr = Be2 && Be2.$$typeof;
                switch (Mr) {
                  case u2:
                  case c2:
                  case b3:
                  case x4:
                  case s2:
                    return Mr;
                  default:
                    return ar2;
                }
            }
          case t4:
            return ar2;
        }
      }
    }
    o$2(S4, "typeOf");
    var R3 = f2, F2 = p4, T2 = u2, ue2 = s2, fe2 = r4, G2 = c2, Y2 = n4, rr2 = b3, tr2 = x4, nr2 = t4, on2 = i4, sn2 = a4, un2 = l2, Lr2 = false;
    function fn2(g4) {
      return Lr2 || (Lr2 = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), zr(g4) || S4(g4) === f2;
    }
    o$2(fn2, "isAsyncMode");
    function zr(g4) {
      return S4(g4) === p4;
    }
    o$2(zr, "isConcurrentMode");
    function cn2(g4) {
      return S4(g4) === u2;
    }
    o$2(cn2, "isContextConsumer");
    function ln2(g4) {
      return S4(g4) === s2;
    }
    o$2(ln2, "isContextProvider");
    function pn2(g4) {
      return typeof g4 == "object" && g4 !== null && g4.$$typeof === r4;
    }
    o$2(pn2, "isElement");
    function dn2(g4) {
      return S4(g4) === c2;
    }
    o$2(dn2, "isForwardRef");
    function mn(g4) {
      return S4(g4) === n4;
    }
    o$2(mn, "isFragment");
    function hn2(g4) {
      return S4(g4) === b3;
    }
    o$2(hn2, "isLazy");
    function gn2(g4) {
      return S4(g4) === x4;
    }
    o$2(gn2, "isMemo");
    function bn2(g4) {
      return S4(g4) === t4;
    }
    o$2(bn2, "isPortal");
    function vn2(g4) {
      return S4(g4) === i4;
    }
    o$2(vn2, "isProfiler");
    function yn2(g4) {
      return S4(g4) === a4;
    }
    o$2(yn2, "isStrictMode");
    function xn2(g4) {
      return S4(g4) === l2;
    }
    o$2(xn2, "isSuspense"), O2.AsyncMode = R3, O2.ConcurrentMode = F2, O2.ContextConsumer = T2, O2.ContextProvider = ue2, O2.Element = fe2, O2.ForwardRef = G2, O2.Fragment = Y2, O2.Lazy = rr2, O2.Memo = tr2, O2.Portal = nr2, O2.Profiler = on2, O2.StrictMode = sn2, O2.Suspense = un2, O2.isAsyncMode = fn2, O2.isConcurrentMode = zr, O2.isContextConsumer = cn2, O2.isContextProvider = ln2, O2.isElement = pn2, O2.isForwardRef = dn2, O2.isFragment = mn, O2.isLazy = hn2, O2.isMemo = gn2, O2.isPortal = bn2, O2.isProfiler = vn2, O2.isStrictMode = yn2, O2.isSuspense = xn2, O2.isValidElementType = A3, O2.typeOf = S4;
  })();
});
var ot = De$1((si2, at2) => {
  at2.exports = nt();
});
var mr = De$1((ui2, lt) => {
  var pr = ot(), Bn2 = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  }, Dn2 = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  }, $n = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  }, ft2 = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  }, dr2 = {};
  dr2[pr.ForwardRef] = $n;
  dr2[pr.Memo] = ft2;
  function it2(e4) {
    return pr.isMemo(e4) ? ft2 : dr2[e4.$$typeof] || Bn2;
  }
  o$2(it2, "getStatics");
  var jn2 = Object.defineProperty, Hn2 = Object.getOwnPropertyNames, st = Object.getOwnPropertySymbols, Wn2 = Object.getOwnPropertyDescriptor, Un2 = Object.getPrototypeOf, ut2 = Object.prototype;
  function ct2(e4, r4, t4) {
    if (typeof r4 != "string") {
      if (ut2) {
        var n4 = Un2(r4);
        n4 && n4 !== ut2 && ct2(e4, n4, t4);
      }
      var a4 = Hn2(r4);
      st && (a4 = a4.concat(st(r4)));
      for (var i4 = it2(e4), s2 = it2(r4), u2 = 0; u2 < a4.length; ++u2) {
        var f2 = a4[u2];
        if (!Dn2[f2] && !(t4 && t4[f2]) && !(s2 && s2[f2]) && !(i4 && i4[f2])) {
          var p4 = Wn2(r4, f2);
          try {
            jn2(e4, f2, p4);
          } catch {
          }
        }
      }
    }
    return e4;
  }
  o$2(ct2, "hoistNonReactStatics");
  lt.exports = ct2;
});
var Gt$1 = De$1((Vt, Rr2) => {
  (function(e4) {
    if (typeof Vt == "object" && typeof Rr2 < "u")
      Rr2.exports = e4();
    else if (typeof define == "function" && define.amd)
      define([], e4);
    else {
      var r4;
      typeof window < "u" ? r4 = window : typeof global < "u" ? r4 = global : typeof self < "u" ? r4 = self : r4 = this, r4.memoizerific = e4();
    }
  })(function() {
    return (/* @__PURE__ */ o$2(function n4(a4, i4, s2) {
      function u2(c2, l2) {
        if (!i4[c2]) {
          if (!a4[c2]) {
            var m4 = typeof Oe$2 == "function" && Oe$2;
            if (!l2 && m4) return m4(c2, true);
            if (f2) return f2(c2, true);
            var x4 = new Error("Cannot find module '" + c2 + "'");
            throw x4.code = "MODULE_NOT_FOUND", x4;
          }
          var b3 = i4[c2] = { exports: {} };
          a4[c2][0].call(b3.exports, function(d4) {
            var v3 = a4[c2][1][d4];
            return u2(v3 || d4);
          }, b3, b3.exports, n4, a4, i4, s2);
        }
        return i4[c2].exports;
      }
      o$2(u2, "s");
      for (var f2 = typeof Oe$2 == "function" && Oe$2, p4 = 0; p4 < s2.length; p4++) u2(s2[p4]);
      return u2;
    }, "e"))({ 1: [function(n4, a4, i4) {
      a4.exports = function(s2) {
        if (typeof Map != "function" || s2) {
          var u2 = n4("./similar");
          return new u2();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(n4, a4, i4) {
      function s2() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      o$2(s2, "Similar"), s2.prototype.get = function(u2) {
        var f2;
        if (this.lastItem && this.isEqual(this.lastItem.key, u2))
          return this.lastItem.val;
        if (f2 = this.indexOf(u2), f2 >= 0)
          return this.lastItem = this.list[f2], this.list[f2].val;
      }, s2.prototype.set = function(u2, f2) {
        var p4;
        return this.lastItem && this.isEqual(this.lastItem.key, u2) ? (this.lastItem.val = f2, this) : (p4 = this.indexOf(u2), p4 >= 0 ? (this.lastItem = this.list[p4], this.list[p4].val = f2, this) : (this.lastItem = { key: u2, val: f2 }, this.list.push(this.lastItem), this.size++, this));
      }, s2.prototype.delete = function(u2) {
        var f2;
        if (this.lastItem && this.isEqual(this.lastItem.key, u2) && (this.lastItem = void 0), f2 = this.indexOf(u2), f2 >= 0)
          return this.size--, this.list.splice(f2, 1)[0];
      }, s2.prototype.has = function(u2) {
        var f2;
        return this.lastItem && this.isEqual(this.lastItem.key, u2) ? true : (f2 = this.indexOf(u2), f2 >= 0 ? (this.lastItem = this.list[f2], true) : false);
      }, s2.prototype.forEach = function(u2, f2) {
        var p4;
        for (p4 = 0; p4 < this.size; p4++)
          u2.call(f2 || this, this.list[p4].val, this.list[p4].key, this);
      }, s2.prototype.indexOf = function(u2) {
        var f2;
        for (f2 = 0; f2 < this.size; f2++)
          if (this.isEqual(this.list[f2].key, u2))
            return f2;
        return -1;
      }, s2.prototype.isEqual = function(u2, f2) {
        return u2 === f2 || u2 !== u2 && f2 !== f2;
      }, a4.exports = s2;
    }, {}], 3: [function(n4, a4, i4) {
      var s2 = n4("map-or-similar");
      a4.exports = function(c2) {
        var l2 = new s2(false), m4 = [];
        return function(x4) {
          var b3 = /* @__PURE__ */ o$2(function() {
            var d4 = l2, v3, y4, w3 = arguments.length - 1, A3 = Array(w3 + 1), S4 = true, R3;
            if ((b3.numArgs || b3.numArgs === 0) && b3.numArgs !== w3 + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (R3 = 0; R3 < w3; R3++) {
              if (A3[R3] = {
                cacheItem: d4,
                arg: arguments[R3]
              }, d4.has(arguments[R3])) {
                d4 = d4.get(arguments[R3]);
                continue;
              }
              S4 = false, v3 = new s2(false), d4.set(arguments[R3], v3), d4 = v3;
            }
            return S4 && (d4.has(arguments[w3]) ? y4 = d4.get(arguments[w3]) : S4 = false), S4 || (y4 = x4.apply(null, arguments), d4.set(arguments[w3], y4)), c2 > 0 && (A3[w3] = {
              cacheItem: d4,
              arg: arguments[w3]
            }, S4 ? u2(m4, A3) : m4.push(A3), m4.length > c2 && f2(m4.shift())), b3.wasMemoized = S4, b3.numArgs = w3 + 1, y4;
          }, "memoizerific");
          return b3.limit = c2, b3.wasMemoized = false, b3.cache = l2, b3.lru = m4, b3;
        };
      };
      function u2(c2, l2) {
        var m4 = c2.length, x4 = l2.length, b3, d4, v3;
        for (d4 = 0; d4 < m4; d4++) {
          for (b3 = true, v3 = 0; v3 < x4; v3++)
            if (!p4(c2[d4][v3].arg, l2[v3].arg)) {
              b3 = false;
              break;
            }
          if (b3)
            break;
        }
        c2.push(c2.splice(d4, 1)[0]);
      }
      o$2(u2, "moveToMostRecentLru");
      function f2(c2) {
        var l2 = c2.length, m4 = c2[l2 - 1], x4, b3;
        for (m4.cacheItem.delete(m4.arg), b3 = l2 - 2; b3 >= 0 && (m4 = c2[b3], x4 = m4.cacheItem.get(m4.arg), !x4 || !x4.size); b3--)
          m4.cacheItem.delete(m4.arg);
      }
      o$2(f2, "removeCachedResult");
      function p4(c2, l2) {
        return c2 === l2 || c2 !== c2 && l2 !== l2;
      }
      o$2(p4, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});
function I$1() {
  return I$1 = Object.assign ? Object.assign.bind() : function(e4) {
    for (var r4 = 1; r4 < arguments.length; r4++) {
      var t4 = arguments[r4];
      for (var n4 in t4) ({}).hasOwnProperty.call(t4, n4) && (e4[n4] = t4[n4]);
    }
    return e4;
  }, I$1.apply(null, arguments);
}
o$2(I$1, "_extends");
function An$1(e4) {
  if (e4.sheet)
    return e4.sheet;
  for (var r4 = 0; r4 < document.styleSheets.length; r4++)
    if (document.styleSheets[r4].ownerNode === e4)
      return document.styleSheets[r4];
}
o$2(An$1, "sheetForTag");
function Fn(e4) {
  var r4 = document.createElement("style");
  return r4.setAttribute("data-emotion", e4.key), e4.nonce !== void 0 && r4.setAttribute("nonce", e4.nonce), r4.appendChild(document.createTextNode(
    ""
  )), r4.setAttribute("data-s", ""), r4;
}
o$2(Fn, "createStyleElement");
var kr$1 = /* @__PURE__ */ function() {
  function e4(t4) {
    var n4 = this;
    this._insertTag = function(a4) {
      var i4;
      n4.tags.length === 0 ? n4.insertionPoint ? i4 = n4.insertionPoint.nextSibling : n4.prepend ? i4 = n4.container.firstChild : i4 = n4.before : i4 = n4.tags[n4.tags.length - 1].nextSibling, n4.container.insertBefore(a4, i4), n4.tags.push(a4);
    }, this.isSpeedy = t4.speedy === void 0 ? true : t4.speedy, this.tags = [], this.ctr = 0, this.nonce = t4.nonce, this.key = t4.key, this.container = t4.container, this.prepend = t4.prepend, this.insertionPoint = t4.insertionPoint, this.before = null;
  }
  o$2(e4, "StyleSheet");
  var r4 = e4.prototype;
  return r4.hydrate = /* @__PURE__ */ o$2(function(n4) {
    n4.forEach(this._insertTag);
  }, "hydrate"), r4.insert = /* @__PURE__ */ o$2(function(n4) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Fn(this));
    var a4 = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var i4 = An$1(a4);
      try {
        i4.insertRule(n4, i4.cssRules.length);
      } catch {
      }
    } else
      a4.appendChild(document.createTextNode(n4));
    this.ctr++;
  }, "insert"), r4.flush = /* @__PURE__ */ o$2(function() {
    this.tags.forEach(function(n4) {
      var a4;
      return (a4 = n4.parentNode) == null ? void 0 : a4.removeChild(n4);
    }), this.tags = [], this.ctr = 0;
  }, "flush"), e4;
}();
var z$1 = "-ms-", Re$1 = "-moz-", C$2 = "-webkit-", $e$1 = "comm", ce$2 = "rule", le$2 = "decl";
var Nr$1 = "@import";
var je$1 = "@keyframes";
var Br$1 = "@layer";
var Dr$1 = Math.abs, ee$1 = String.fromCharCode, $r = Object.assign;
function jr(e4, r4) {
  return _$1(e4, 0) ^ 45 ? (((r4 << 2 ^ _$1(e4, 0)) << 2 ^ _$1(e4, 1)) << 2 ^ _$1(e4, 2)) << 2 ^ _$1(e4, 3) : 0;
}
o$2(jr, "hash");
function He$2(e4) {
  return e4.trim();
}
o$2(He$2, "trim");
function sr$1(e4, r4) {
  return (e4 = r4.exec(e4)) ? e4[0] : e4;
}
o$2(sr$1, "match");
function E$1(e4, r4, t4) {
  return e4.replace(r4, t4);
}
o$2(E$1, "replace");
function Ae$1(e4, r4) {
  return e4.indexOf(r4);
}
o$2(Ae$1, "indexof");
function _$1(e4, r4) {
  return e4.charCodeAt(r4) | 0;
}
o$2(_$1, "charat");
function q$1(e4, r4, t4) {
  return e4.slice(r4, t4);
}
o$2(q$1, "substr");
function M$1(e4) {
  return e4.length;
}
o$2(M$1, "strlen");
function pe$1(e4) {
  return e4.length;
}
o$2(pe$1, "sizeof");
function de$2(e4, r4) {
  return r4.push(e4), e4;
}
o$2(de$2, "append");
function ur$1(e4, r4) {
  return e4.map(r4).join("");
}
o$2(ur$1, "combine");
var We$2 = 1, me$2 = 1, Hr$1 = 0, k$1 = 0, P$1 = 0, ge$2 = "";
function Fe$1(e4, r4, t4, n4, a4, i4, s2) {
  return { value: e4, root: r4, parent: t4, type: n4, props: a4, children: i4, line: We$2, column: me$2, length: s2, return: "" };
}
o$2(Fe$1, "node");
function be$1(e4, r4) {
  return $r(Fe$1("", null, null, "", null, null, 0), e4, { length: -e4.length }, r4);
}
o$2(be$1, "copy");
function Wr() {
  return P$1;
}
o$2(Wr, "char");
function Ur() {
  return P$1 = k$1 > 0 ? _$1(ge$2, --k$1) : 0, me$2--, P$1 === 10 && (me$2 = 1, We$2--), P$1;
}
o$2(Ur, "prev");
function N$2() {
  return P$1 = k$1 < Hr$1 ? _$1(ge$2, k$1++) : 0, me$2++, P$1 === 10 && (me$2 = 1, We$2++), P$1;
}
o$2(N$2, "next");
function $$1() {
  return _$1(ge$2, k$1);
}
o$2($$1, "peek");
function _e$2() {
  return k$1;
}
o$2(_e$2, "caret");
function ve$1(e4, r4) {
  return q$1(ge$2, e4, r4);
}
o$2(ve$1, "slice");
function he$1(e4) {
  switch (e4) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
o$2(he$1, "token");
function Ue$2(e4) {
  return We$2 = me$2 = 1, Hr$1 = M$1(ge$2 = e4), k$1 = 0, [];
}
o$2(Ue$2, "alloc");
function Ve$1(e4) {
  return ge$2 = "", e4;
}
o$2(Ve$1, "dealloc");
function ye$2(e4) {
  return He$2(ve$1(k$1 - 1, fr$1(e4 === 91 ? e4 + 2 : e4 === 40 ? e4 + 1 : e4)));
}
o$2(ye$2, "delimit");
function Vr(e4) {
  for (; (P$1 = $$1()) && P$1 < 33; )
    N$2();
  return he$1(e4) > 2 || he$1(P$1) > 3 ? "" : " ";
}
o$2(Vr, "whitespace");
function Gr$1(e4, r4) {
  for (; --r4 && N$2() && !(P$1 < 48 || P$1 > 102 || P$1 > 57 && P$1 < 65 || P$1 > 70 && P$1 < 97); )
    ;
  return ve$1(e4, _e$2() + (r4 < 6 && $$1() == 32 && N$2() == 32));
}
o$2(Gr$1, "escaping");
function fr$1(e4) {
  for (; N$2(); )
    switch (P$1) {
      // ] ) " '
      case e4:
        return k$1;
      // " '
      case 34:
      case 39:
        e4 !== 34 && e4 !== 39 && fr$1(P$1);
        break;
      // (
      case 40:
        e4 === 41 && fr$1(e4);
        break;
      // \
      case 92:
        N$2();
        break;
    }
  return k$1;
}
o$2(fr$1, "delimiter");
function Yr$1(e4, r4) {
  for (; N$2() && e4 + P$1 !== 57; )
    if (e4 + P$1 === 84 && $$1() === 47)
      break;
  return "/*" + ve$1(r4, k$1 - 1) + "*" + ee$1(e4 === 47 ? e4 : N$2());
}
o$2(Yr$1, "commenter");
function qr(e4) {
  for (; !he$1($$1()); )
    N$2();
  return ve$1(e4, k$1);
}
o$2(qr, "identifier");
function Xr$1(e4) {
  return Ve$1(Ge$2("", null, null, null, [""], e4 = Ue$2(e4), 0, [0], e4));
}
o$2(Xr$1, "compile");
function Ge$2(e4, r4, t4, n4, a4, i4, s2, u2, f2) {
  for (var p4 = 0, c2 = 0, l2 = s2, m4 = 0, x4 = 0, b3 = 0, d4 = 1, v3 = 1, y4 = 1, w3 = 0, A3 = "", S4 = a4, R3 = i4, F2 = n4, T2 = A3; v3; )
    switch (b3 = w3, w3 = N$2()) {
      // (
      case 40:
        if (b3 != 108 && _$1(T2, l2 - 1) == 58) {
          Ae$1(T2 += E$1(ye$2(w3), "&", "&\f"), "&\f") != -1 && (y4 = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        T2 += ye$2(w3);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        T2 += Vr(b3);
        break;
      // \
      case 92:
        T2 += Gr$1(_e$2() - 1, 7);
        continue;
      // /
      case 47:
        switch ($$1()) {
          case 42:
          case 47:
            de$2(_n(Yr$1(N$2(), _e$2()), r4, t4), f2);
            break;
          default:
            T2 += "/";
        }
        break;
      // {
      case 123 * d4:
        u2[p4++] = M$1(T2) * y4;
      // } ; \0
      case 125 * d4:
      case 59:
      case 0:
        switch (w3) {
          // \0 }
          case 0:
          case 125:
            v3 = 0;
          // ;
          case 59 + c2:
            y4 == -1 && (T2 = E$1(T2, /\f/g, "")), x4 > 0 && M$1(T2) - l2 && de$2(
              x4 > 32 ? Kr$1(T2 + ";", n4, t4, l2 - 1) : Kr$1(E$1(T2, " ", "") + ";", n4, t4, l2 - 2),
              f2
            );
            break;
          // @ ;
          case 59:
            T2 += ";";
          // { rule/at-rule
          default:
            if (de$2(F2 = Jr$1(T2, r4, t4, p4, c2, a4, u2, A3, S4 = [], R3 = [], l2), i4), w3 === 123)
              if (c2 === 0)
                Ge$2(T2, r4, F2, F2, S4, i4, l2, u2, R3);
              else
                switch (m4 === 99 && _$1(T2, 3) === 110 ? 100 : m4) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Ge$2(e4, F2, F2, n4 && de$2(Jr$1(e4, F2, F2, 0, 0, a4, u2, A3, a4, S4 = [], l2), R3), a4, R3, l2, u2, n4 ? S4 : R3);
                    break;
                  default:
                    Ge$2(T2, F2, F2, F2, [""], R3, 0, u2, R3);
                }
        }
        p4 = c2 = x4 = 0, d4 = y4 = 1, A3 = T2 = "", l2 = s2;
        break;
      // :
      case 58:
        l2 = 1 + M$1(T2), x4 = b3;
      default:
        if (d4 < 1) {
          if (w3 == 123)
            --d4;
          else if (w3 == 125 && d4++ == 0 && Ur() == 125)
            continue;
        }
        switch (T2 += ee$1(w3), w3 * d4) {
          // &
          case 38:
            y4 = c2 > 0 ? 1 : (T2 += "\f", -1);
            break;
          // ,
          case 44:
            u2[p4++] = (M$1(T2) - 1) * y4, y4 = 1;
            break;
          // @
          case 64:
            $$1() === 45 && (T2 += ye$2(N$2())), m4 = $$1(), c2 = l2 = M$1(A3 = T2 += qr(_e$2())), w3++;
            break;
          // -
          case 45:
            b3 === 45 && M$1(T2) == 2 && (d4 = 0);
        }
    }
  return i4;
}
o$2(Ge$2, "parse");
function Jr$1(e4, r4, t4, n4, a4, i4, s2, u2, f2, p4, c2) {
  for (var l2 = a4 - 1, m4 = a4 === 0 ? i4 : [""], x4 = pe$1(m4), b3 = 0, d4 = 0, v3 = 0; b3 < n4; ++b3)
    for (var y4 = 0, w3 = q$1(e4, l2 + 1, l2 = Dr$1(d4 = s2[b3])), A3 = e4; y4 < x4; ++y4)
      (A3 = He$2(d4 > 0 ? m4[y4] + " " + w3 : E$1(w3, /&\f/g, m4[y4]))) && (f2[v3++] = A3);
  return Fe$1(e4, r4, t4, a4 === 0 ? ce$2 : u2, f2, p4, c2);
}
o$2(Jr$1, "ruleset");
function _n(e4, r4, t4) {
  return Fe$1(e4, r4, t4, $e$1, ee$1(Wr()), q$1(e4, 2, -2), 0);
}
o$2(_n, "comment");
function Kr$1(e4, r4, t4, n4) {
  return Fe$1(e4, r4, t4, le$2, q$1(e4, 0, n4), q$1(e4, n4 + 1, -1), n4);
}
o$2(Kr$1, "declaration");
function re$1(e4, r4) {
  for (var t4 = "", n4 = pe$1(e4), a4 = 0; a4 < n4; a4++)
    t4 += r4(e4[a4], a4, e4, r4) || "";
  return t4;
}
o$2(re$1, "serialize");
function Zr$1(e4, r4, t4, n4) {
  switch (e4.type) {
    case Br$1:
      if (e4.children.length) break;
    case Nr$1:
    case le$2:
      return e4.return = e4.return || e4.value;
    case $e$1:
      return "";
    case je$1:
      return e4.return = e4.value + "{" + re$1(e4.children, n4) + "}";
    case ce$2:
      e4.value = e4.props.join(",");
  }
  return M$1(t4 = re$1(e4.children, n4)) ? e4.return = e4.value + "{" + t4 + "}" : "";
}
o$2(Zr$1, "stringify");
function Qr(e4) {
  var r4 = pe$1(e4);
  return function(t4, n4, a4, i4) {
    for (var s2 = "", u2 = 0; u2 < r4; u2++)
      s2 += e4[u2](t4, n4, a4, i4) || "";
    return s2;
  };
}
o$2(Qr, "middleware");
function et$1(e4) {
  return function(r4) {
    r4.root || (r4 = r4.return) && e4(r4);
  };
}
o$2(et$1, "rulesheet");
var cr$1 = /* @__PURE__ */ o$2(function(r4) {
  var t4 = /* @__PURE__ */ new WeakMap();
  return function(n4) {
    if (t4.has(n4))
      return t4.get(n4);
    var a4 = r4(n4);
    return t4.set(n4, a4), a4;
  };
}, "weakMemoize");
function Ye$1(e4) {
  var r4 = /* @__PURE__ */ Object.create(null);
  return function(t4) {
    return r4[t4] === void 0 && (r4[t4] = e4(t4)), r4[t4];
  };
}
o$2(Ye$1, "memoize");
var In$1 = /* @__PURE__ */ o$2(function(r4, t4, n4) {
  for (var a4 = 0, i4 = 0; a4 = i4, i4 = $$1(), a4 === 38 && i4 === 12 && (t4[n4] = 1), !he$1(i4); )
    N$2();
  return ve$1(r4, k$1);
}, "identifierWithPointTracking"), Pn$1 = /* @__PURE__ */ o$2(function(r4, t4) {
  var n4 = -1, a4 = 44;
  do
    switch (he$1(a4)) {
      case 0:
        a4 === 38 && $$1() === 12 && (t4[n4] = 1), r4[n4] += In$1(k$1 - 1, t4, n4);
        break;
      case 2:
        r4[n4] += ye$2(a4);
        break;
      case 4:
        if (a4 === 44) {
          r4[++n4] = $$1() === 58 ? "&\f" : "", t4[n4] = r4[n4].length;
          break;
        }
      // fallthrough
      default:
        r4[n4] += ee$1(a4);
    }
  while (a4 = N$2());
  return r4;
}, "toRules"), Ln = /* @__PURE__ */ o$2(function(r4, t4) {
  return Ve$1(Pn$1(Ue$2(r4), t4));
}, "getRules"), rt$1 = /* @__PURE__ */ new WeakMap(), zn$1 = /* @__PURE__ */ o$2(function(r4) {
  if (!(r4.type !== "rule" || !r4.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r4.length < 1)) {
    for (var t4 = r4.value, n4 = r4.parent, a4 = r4.column === n4.column && r4.line === n4.line; n4.type !== "rule"; )
      if (n4 = n4.parent, !n4) return;
    if (!(r4.props.length === 1 && t4.charCodeAt(0) !== 58 && !rt$1.get(n4)) && !a4) {
      rt$1.set(r4, true);
      for (var i4 = [], s2 = Ln(t4, i4), u2 = n4.props, f2 = 0, p4 = 0; f2 < s2.length; f2++)
        for (var c2 = 0; c2 < u2.length; c2++, p4++)
          r4.props[p4] = i4[f2] ? s2[f2].replace(/&\f/g, u2[c2]) : u2[c2] + " " + s2[f2];
    }
  }
}, "compat"), Mn = /* @__PURE__ */ o$2(function(r4) {
  if (r4.type === "decl") {
    var t4 = r4.value;
    t4.charCodeAt(0) === 108 && // charcode for b
    t4.charCodeAt(2) === 98 && (r4.return = "", r4.value = "");
  }
}, "removeLabel");
function tt$1(e4, r4) {
  switch (jr(e4, r4)) {
    // color-adjust
    case 5103:
      return C$2 + "print-" + e4 + e4;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return C$2 + e4 + e4;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return C$2 + e4 + Re$1 + e4 + z$1 + e4 + e4;
    // flex, flex-direction
    case 6828:
    case 4268:
      return C$2 + e4 + z$1 + e4 + e4;
    // order
    case 6165:
      return C$2 + e4 + z$1 + "flex-" + e4 + e4;
    // align-items
    case 5187:
      return C$2 + e4 + E$1(e4, /(\w+).+(:[^]+)/, C$2 + "box-$1$2" + z$1 + "flex-$1$2") + e4;
    // align-self
    case 5443:
      return C$2 + e4 + z$1 + "flex-item-" + E$1(e4, /flex-|-self/, "") + e4;
    // align-content
    case 4675:
      return C$2 + e4 + z$1 + "flex-line-pack" + E$1(e4, /align-content|flex-|-self/, "") + e4;
    // flex-shrink
    case 5548:
      return C$2 + e4 + z$1 + E$1(e4, "shrink", "negative") + e4;
    // flex-basis
    case 5292:
      return C$2 + e4 + z$1 + E$1(e4, "basis", "preferred-size") + e4;
    // flex-grow
    case 6060:
      return C$2 + "box-" + E$1(e4, "-grow", "") + C$2 + e4 + z$1 + E$1(e4, "grow", "positive") + e4;
    // transition
    case 4554:
      return C$2 + E$1(e4, /([^-])(transform)/g, "$1" + C$2 + "$2") + e4;
    // cursor
    case 6187:
      return E$1(E$1(E$1(e4, /(zoom-|grab)/, C$2 + "$1"), /(image-set)/, C$2 + "$1"), e4, "") + e4;
    // background, background-image
    case 5495:
    case 3959:
      return E$1(e4, /(image-set\([^]*)/, C$2 + "$1$`$1");
    // justify-content
    case 4968:
      return E$1(E$1(e4, /(.+:)(flex-)?(.*)/, C$2 + "box-pack:$3" + z$1 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + C$2 + e4 + e4;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return E$1(e4, /(.+)-inline(.+)/, C$2 + "$1$2") + e4;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (M$1(e4) - 1 - r4 > 6) switch (_$1(e4, r4 + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (_$1(e4, r4 + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return E$1(e4, /(.+:)(.+)-([^]+)/, "$1" + C$2 + "$2-$3$1" + Re$1 + (_$1(e4, r4 + 3) == 108 ? "$3" : "$2-$3")) + e4;
        // (s)tretch
        case 115:
          return ~Ae$1(e4, "stretch") ? tt$1(E$1(e4, "stretch", "fill-available"), r4) + e4 : e4;
      }
      break;
    // position: sticky
    case 4949:
      if (_$1(e4, r4 + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (_$1(e4, M$1(e4) - 3 - (~Ae$1(e4, "!important") && 10))) {
        // stic(k)y
        case 107:
          return E$1(e4, ":", ":" + C$2) + e4;
        // (inline-)?fl(e)x
        case 101:
          return E$1(e4, /(.+:)([^;!]+)(;|!.+)?/, "$1" + C$2 + (_$1(e4, 14) === 45 ? "inline-" : "") + "box$3$1" + C$2 + "$2$3$1" + z$1 + "$2box$3") + e4;
      }
      break;
    // writing-mode
    case 5936:
      switch (_$1(e4, r4 + 11)) {
        // vertical-l(r)
        case 114:
          return C$2 + e4 + z$1 + E$1(e4, /[svh]\w+-[tblr]{2}/, "tb") + e4;
        // vertical-r(l)
        case 108:
          return C$2 + e4 + z$1 + E$1(e4, /[svh]\w+-[tblr]{2}/, "tb-rl") + e4;
        // horizontal(-)tb
        case 45:
          return C$2 + e4 + z$1 + E$1(e4, /[svh]\w+-[tblr]{2}/, "lr") + e4;
      }
      return C$2 + e4 + z$1 + e4 + e4;
  }
  return e4;
}
o$2(tt$1, "prefix");
var kn$1 = /* @__PURE__ */ o$2(function(r4, t4, n4, a4) {
  if (r4.length > -1 && !r4.return) switch (r4.type) {
    case le$2:
      r4.return = tt$1(r4.value, r4.length);
      break;
    case je$1:
      return re$1([be$1(r4, {
        value: E$1(r4.value, "@", "@" + C$2)
      })], a4);
    case ce$2:
      if (r4.length) return ur$1(r4.props, function(i4) {
        switch (sr$1(i4, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return re$1([be$1(r4, {
              props: [E$1(i4, /:(read-\w+)/, ":" + Re$1 + "$1")]
            })], a4);
          // :placeholder
          case "::placeholder":
            return re$1([be$1(r4, {
              props: [E$1(i4, /:(plac\w+)/, ":" + C$2 + "input-$1")]
            }), be$1(r4, {
              props: [E$1(i4, /:(plac\w+)/, ":" + Re$1 + "$1")]
            }), be$1(r4, {
              props: [E$1(i4, /:(plac\w+)/, z$1 + "input-$1")]
            })], a4);
        }
        return "";
      });
  }
}, "prefixer"), Nn$1 = [kn$1], lr = /* @__PURE__ */ o$2(function(r4) {
  var t4 = r4.key;
  if (t4 === "css") {
    var n4 = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n4, function(d4) {
      var v3 = d4.getAttribute("data-emotion");
      v3.indexOf(" ") !== -1 && (document.head.appendChild(d4), d4.setAttribute("data-s", ""));
    });
  }
  var a4 = r4.stylisPlugins || Nn$1, i4 = {}, s2, u2 = [];
  s2 = r4.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + t4 + ' "]'),
    function(d4) {
      for (var v3 = d4.getAttribute("data-emotion").split(" "), y4 = 1; y4 < v3.length; y4++)
        i4[v3[y4]] = true;
      u2.push(d4);
    }
  );
  var f2, p4 = [zn$1, Mn];
  {
    var c2, l2 = [Zr$1, et$1(function(d4) {
      c2.insert(d4);
    })], m4 = Qr(p4.concat(a4, l2)), x4 = /* @__PURE__ */ o$2(function(v3) {
      return re$1(Xr$1(v3), m4);
    }, "stylis");
    f2 = /* @__PURE__ */ o$2(function(v3, y4, w3, A3) {
      c2 = w3, x4(v3 ? v3 + "{" + y4.styles + "}" : y4.styles), A3 && (b3.inserted[y4.name] = true);
    }, "insert");
  }
  var b3 = {
    key: t4,
    sheet: new kr$1({
      key: t4,
      container: s2,
      nonce: r4.nonce,
      speedy: r4.speedy,
      prepend: r4.prepend,
      insertionPoint: r4.insertionPoint
    }),
    nonce: r4.nonce,
    inserted: i4,
    registered: {},
    insert: f2
  };
  return b3.sheet.hydrate(u2), b3;
}, "createCache");
var pt$1 = ir(mr());
var dt$1 = /* @__PURE__ */ o$2(function(e4, r4) {
  return (0, pt$1.default)(e4, r4);
}, "hoistNonReactStatics");
var Vn = true;
function xe$2(e4, r4, t4) {
  var n4 = "";
  return t4.split(" ").forEach(function(a4) {
    e4[a4] !== void 0 ? r4.push(e4[a4] + ";") : a4 && (n4 += a4 + " ");
  }), n4;
}
o$2(xe$2, "getRegisteredStyles");
var te$2 = /* @__PURE__ */ o$2(function(r4, t4, n4) {
  var a4 = r4.key + "-" + t4.name;
  (n4 === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Vn === false) && r4.registered[a4] === void 0 && (r4.registered[a4] = t4.styles);
}, "registerStyles"), ne$2 = /* @__PURE__ */ o$2(function(r4, t4, n4) {
  te$2(r4, t4, n4);
  var a4 = r4.key + "-" + t4.name;
  if (r4.inserted[t4.name] === void 0) {
    var i4 = t4;
    do
      r4.insert(t4 === i4 ? "." + a4 : "", i4, r4.sheet, true), i4 = i4.next;
    while (i4 !== void 0);
  }
}, "insertStyles");
function mt(e4) {
  for (var r4 = 0, t4, n4 = 0, a4 = e4.length; a4 >= 4; ++n4, a4 -= 4)
    t4 = e4.charCodeAt(n4) & 255 | (e4.charCodeAt(++n4) & 255) << 8 | (e4.charCodeAt(++n4) & 255) << 16 | (e4.charCodeAt(++n4) & 255) << 24, t4 = /* Math.imul(k, m): */
    (t4 & 65535) * 1540483477 + ((t4 >>> 16) * 59797 << 16), t4 ^= /* k >>> r: */
    t4 >>> 24, r4 = /* Math.imul(k, m): */
    (t4 & 65535) * 1540483477 + ((t4 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r4 & 65535) * 1540483477 + ((r4 >>> 16) * 59797 << 16);
  switch (a4) {
    case 3:
      r4 ^= (e4.charCodeAt(n4 + 2) & 255) << 16;
    case 2:
      r4 ^= (e4.charCodeAt(n4 + 1) & 255) << 8;
    case 1:
      r4 ^= e4.charCodeAt(n4) & 255, r4 = /* Math.imul(h, m): */
      (r4 & 65535) * 1540483477 + ((r4 >>> 16) * 59797 << 16);
  }
  return r4 ^= r4 >>> 13, r4 = /* Math.imul(h, m): */
  (r4 & 65535) * 1540483477 + ((r4 >>> 16) * 59797 << 16), ((r4 ^ r4 >>> 15) >>> 0).toString(36);
}
o$2(mt, "murmur2");
var ht$1 = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var Yn$1 = /[A-Z]|^ms/g, qn$1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g, yt = /* @__PURE__ */ o$2(function(r4) {
  return r4.charCodeAt(1) === 45;
}, "isCustomProperty"), gt$1 = /* @__PURE__ */ o$2(function(r4) {
  return r4 != null && typeof r4 != "boolean";
}, "isProcessableValue"), hr = /* @__PURE__ */ Ye$1(function(e4) {
  return yt(e4) ? e4 : e4.replace(Yn$1, "-$&").toLowerCase();
}), bt$1 = /* @__PURE__ */ o$2(function(r4, t4) {
  switch (r4) {
    case "animation":
    case "animationName":
      if (typeof t4 == "string")
        return t4.replace(qn$1, function(n4, a4, i4) {
          return U$1 = {
            name: a4,
            styles: i4,
            next: U$1
          }, a4;
        });
  }
  return ht$1[r4] !== 1 && !yt(r4) && typeof t4 == "number" && t4 !== 0 ? t4 + "px" : t4;
}, "processStyleValue");
function Ie$1(e4, r4, t4) {
  if (t4 == null)
    return "";
  var n4 = t4;
  if (n4.__emotion_styles !== void 0)
    return n4;
  switch (typeof t4) {
    case "boolean":
      return "";
    case "object": {
      var a4 = t4;
      if (a4.anim === 1)
        return U$1 = {
          name: a4.name,
          styles: a4.styles,
          next: U$1
        }, a4.name;
      var i4 = t4;
      if (i4.styles !== void 0) {
        var s2 = i4.next;
        if (s2 !== void 0)
          for (; s2 !== void 0; )
            U$1 = {
              name: s2.name,
              styles: s2.styles,
              next: U$1
            }, s2 = s2.next;
        var u2 = i4.styles + ";";
        return u2;
      }
      return Kn$1(e4, r4, t4);
    }
    case "function": {
      if (e4 !== void 0) {
        var f2 = U$1, p4 = t4(e4);
        return U$1 = f2, Ie$1(e4, r4, p4);
      }
      break;
    }
  }
  var c2 = t4;
  if (r4 == null)
    return c2;
  var l2 = r4[c2];
  return l2 !== void 0 ? l2 : c2;
}
o$2(Ie$1, "handleInterpolation");
function Kn$1(e4, r4, t4) {
  var n4 = "";
  if (Array.isArray(t4))
    for (var a4 = 0; a4 < t4.length; a4++)
      n4 += Ie$1(e4, r4, t4[a4]) + ";";
  else
    for (var i4 in t4) {
      var s2 = t4[i4];
      if (typeof s2 != "object") {
        var u2 = s2;
        r4 != null && r4[u2] !== void 0 ? n4 += i4 + "{" + r4[u2] + "}" : gt$1(u2) && (n4 += hr(i4) + ":" + bt$1(i4, u2) + ";");
      } else {
        if (Array.isArray(s2) && typeof s2[0] == "string" && (r4 == null || r4[s2[0]] === void 0))
          for (var f2 = 0; f2 < s2.length; f2++)
            gt$1(s2[f2]) && (n4 += hr(i4) + ":" + bt$1(i4, s2[f2]) + ";");
        else {
          var p4 = Ie$1(e4, r4, s2);
          switch (i4) {
            case "animation":
            case "animationName": {
              n4 += hr(i4) + ":" + p4 + ";";
              break;
            }
            default:
              n4 += i4 + "{" + p4 + "}";
          }
        }
      }
    }
  return n4;
}
o$2(Kn$1, "createStringFromObject");
var vt$1 = /label:\s*([^\s;{]+)\s*(;|$)/g, U$1;
function J$2(e4, r4, t4) {
  if (e4.length === 1 && typeof e4[0] == "object" && e4[0] !== null && e4[0].styles !== void 0)
    return e4[0];
  var n4 = true, a4 = "";
  U$1 = void 0;
  var i4 = e4[0];
  if (i4 == null || i4.raw === void 0)
    n4 = false, a4 += Ie$1(t4, r4, i4);
  else {
    var s2 = i4;
    a4 += s2[0];
  }
  for (var u2 = 1; u2 < e4.length; u2++)
    if (a4 += Ie$1(t4, r4, e4[u2]), n4) {
      var f2 = i4;
      a4 += f2[u2];
    }
  vt$1.lastIndex = 0;
  for (var p4 = "", c2; (c2 = vt$1.exec(a4)) !== null; )
    p4 += "-" + c2[1];
  var l2 = mt(a4) + p4;
  return {
    name: l2,
    styles: a4,
    next: U$1
  };
}
o$2(J$2, "serializeStyles");
var Xn$1 = /* @__PURE__ */ o$2(function(r4) {
  return r4();
}, "syncFallback"), xt$1 = reactExports.useInsertionEffect ? reactExports.useInsertionEffect : false, we$2 = xt$1 || Xn$1;
var wt$1 = /* @__PURE__ */ reactExports.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ lr({
    key: "css"
  }) : null
);
wt$1.Provider;
var ae$2 = /* @__PURE__ */ o$2(function(r4) {
  return /* @__PURE__ */ reactExports.forwardRef(function(t4, n4) {
    var a4 = reactExports.useContext(wt$1);
    return r4(t4, a4, n4);
  });
}, "withEmotionCache"), H$2 = /* @__PURE__ */ reactExports.createContext({}), St$1 = /* @__PURE__ */ o$2(function() {
  return reactExports.useContext(H$2);
}, "useTheme"), ea$1 = /* @__PURE__ */ o$2(function(r4, t4) {
  if (typeof t4 == "function") {
    var n4 = t4(r4);
    return n4;
  }
  return I$1({}, r4, t4);
}, "getTheme"), ra$1 = /* @__PURE__ */ cr$1(function(e4) {
  return cr$1(function(r4) {
    return ea$1(e4, r4);
  });
}), Tt$1 = /* @__PURE__ */ o$2(function(r4) {
  var t4 = reactExports.useContext(H$2);
  return r4.theme !== t4 && (t4 = ra$1(t4)(r4.theme)), /* @__PURE__ */ reactExports.createElement(H$2.Provider, {
    value: t4
  }, r4.children);
}, "ThemeProvider");
function Ct$1(e4) {
  var r4 = e4.displayName || e4.name || "Component", t4 = /* @__PURE__ */ reactExports.forwardRef(/* @__PURE__ */ o$2(function(a4, i4) {
    var s2 = reactExports.useContext(H$2);
    return /* @__PURE__ */ reactExports.createElement(e4, I$1({
      theme: s2,
      ref: i4
    }, a4));
  }, "render"));
  return t4.displayName = "WithTheme(" + r4 + ")", dt$1(t4, e4);
}
o$2(Ct$1, "withTheme");
var Je$1 = {}.hasOwnProperty, br$1 = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Ot = /* @__PURE__ */ o$2(function(r4, t4) {
  var n4 = {};
  for (var a4 in t4)
    Je$1.call(t4, a4) && (n4[a4] = t4[a4]);
  return n4[br$1] = r4, n4;
}, "createEmotionProps"), ta$1 = /* @__PURE__ */ o$2(function(r4) {
  var t4 = r4.cache, n4 = r4.serialized, a4 = r4.isStringTag;
  return te$2(t4, n4, a4), we$2(function() {
    return ne$2(t4, n4, a4);
  }), null;
}, "Insertion"), na$1 = /* @__PURE__ */ ae$2(function(e4, r4, t4) {
  var n4 = e4.css;
  typeof n4 == "string" && r4.registered[n4] !== void 0 && (n4 = r4.registered[n4]);
  var a4 = e4[br$1], i4 = [n4], s2 = "";
  typeof e4.className == "string" ? s2 = xe$2(r4.registered, i4, e4.className) : e4.className != null && (s2 = e4.className + " ");
  var u2 = J$2(i4, void 0, reactExports.useContext(H$2));
  s2 += r4.key + "-" + u2.name;
  var f2 = {};
  for (var p4 in e4)
    Je$1.call(e4, p4) && p4 !== "css" && p4 !== br$1 && true && (f2[p4] = e4[p4]);
  return f2.className = s2, t4 && (f2.ref = t4), /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ta$1, {
    cache: r4,
    serialized: u2,
    isStringTag: typeof a4 == "string"
  }), /* @__PURE__ */ reactExports.createElement(a4, f2));
}), Rt = na$1;
ir(mr());
var vr$1 = /* @__PURE__ */ o$2(function(r4, t4) {
  var n4 = arguments;
  if (t4 == null || !Je$1.call(t4, "css"))
    return reactExports.createElement.apply(void 0, n4);
  var a4 = n4.length, i4 = new Array(a4);
  i4[0] = Rt, i4[1] = Ot(r4, t4);
  for (var s2 = 2; s2 < a4; s2++)
    i4[s2] = n4[s2];
  return reactExports.createElement.apply(null, i4);
}, "jsx");
(function(e4) {
  var r4;
  r4 || (r4 = e4.JSX || (e4.JSX = {}));
})(vr$1 || (vr$1 = {}));
function Le$1() {
  for (var e4 = arguments.length, r4 = new Array(e4), t4 = 0; t4 < e4; t4++)
    r4[t4] = arguments[t4];
  return J$2(r4);
}
o$2(Le$1, "css");
function Ee$1() {
  var e4 = Le$1.apply(void 0, arguments), r4 = "animation-" + e4.name;
  return {
    name: r4,
    styles: "@keyframes " + r4 + "{" + e4.styles + "}",
    anim: 1,
    toString: /* @__PURE__ */ o$2(function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }, "toString")
  };
}
o$2(Ee$1, "keyframes");
function ia(e4, r4, t4) {
  var n4 = [], a4 = xe$2(e4, n4, t4);
  return n4.length < 2 ? t4 : a4 + r4(n4);
}
o$2(ia, "merge");
var fa$1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, yr = /* @__PURE__ */ Ye$1(
  function(e4) {
    return fa$1.test(e4) || e4.charCodeAt(0) === 111 && e4.charCodeAt(1) === 110 && e4.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var la$1 = yr, pa = /* @__PURE__ */ o$2(function(r4) {
  return r4 !== "theme";
}, "testOmitPropsOnComponent"), At$1 = /* @__PURE__ */ o$2(function(r4) {
  return typeof r4 == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  r4.charCodeAt(0) > 96 ? la$1 : pa;
}, "getDefaultShouldForwardProp"), Ft$1 = /* @__PURE__ */ o$2(function(r4, t4, n4) {
  var a4;
  if (t4) {
    var i4 = t4.shouldForwardProp;
    a4 = r4.__emotion_forwardProp && i4 ? function(s2) {
      return r4.__emotion_forwardProp(s2) && i4(s2);
    } : i4;
  }
  return typeof a4 != "function" && n4 && (a4 = r4.__emotion_forwardProp), a4;
}, "composeShouldForwardProps"), da = /* @__PURE__ */ o$2(function(r4) {
  var t4 = r4.cache, n4 = r4.serialized, a4 = r4.isStringTag;
  return te$2(t4, n4, a4), we$2(function() {
    return ne$2(t4, n4, a4);
  }), null;
}, "Insertion"), _t$1 = /* @__PURE__ */ o$2(function e2(r4, t4) {
  var n4 = r4.__emotion_real === r4, a4 = n4 && r4.__emotion_base || r4, i4, s2;
  t4 !== void 0 && (i4 = t4.label, s2 = t4.target);
  var u2 = Ft$1(r4, t4, n4), f2 = u2 || At$1(a4), p4 = !f2("as");
  return function() {
    var c2 = arguments, l2 = n4 && r4.__emotion_styles !== void 0 ? r4.__emotion_styles.slice(0) : [];
    if (i4 !== void 0 && l2.push("label:" + i4 + ";"), c2[0] == null || c2[0].raw === void 0)
      l2.push.apply(l2, c2);
    else {
      var m4 = c2[0];
      l2.push(m4[0]);
      for (var x4 = c2.length, b3 = 1; b3 < x4; b3++)
        l2.push(c2[b3], m4[b3]);
    }
    var d4 = ae$2(function(v3, y4, w3) {
      var A3 = p4 && v3.as || a4, S4 = "", R3 = [], F2 = v3;
      if (v3.theme == null) {
        F2 = {};
        for (var T2 in v3)
          F2[T2] = v3[T2];
        F2.theme = reactExports.useContext(H$2);
      }
      typeof v3.className == "string" ? S4 = xe$2(y4.registered, R3, v3.className) : v3.className != null && (S4 = v3.className + " ");
      var ue2 = J$2(l2.concat(R3), y4.registered, F2);
      S4 += y4.key + "-" + ue2.name, s2 !== void 0 && (S4 += " " + s2);
      var fe2 = p4 && u2 === void 0 ? At$1(A3) : f2, G2 = {};
      for (var Y2 in v3)
        p4 && Y2 === "as" || fe2(Y2) && (G2[Y2] = v3[Y2]);
      return G2.className = S4, w3 && (G2.ref = w3), /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(da, {
        cache: y4,
        serialized: ue2,
        isStringTag: typeof A3 == "string"
      }), /* @__PURE__ */ reactExports.createElement(A3, G2));
    });
    return d4.displayName = i4 !== void 0 ? i4 : "Styled(" + (typeof a4 == "string" ? a4 : a4.displayName || a4.name || "Component") + ")", d4.defaultProps = r4.defaultProps, d4.__emotion_real = d4, d4.__emotion_base = a4, d4.__emotion_styles = l2, d4.__emotion_forwardProp = u2, Object.defineProperty(
      d4,
      "toString",
      {
        value: /* @__PURE__ */ o$2(function() {
          return "." + s2;
        }, "value")
      }
    ), d4.withComponent = function(v3, y4) {
      var w3 = e2(v3, I$1({}, t4, y4, {
        shouldForwardProp: Ft$1(d4, y4, true)
      }));
      return w3.apply(void 0, l2);
    }, d4;
  };
}, "createStyled");
var ma = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], xr$1 = _t$1.bind(null);
ma.forEach(function(e4) {
  xr$1[e4] = xr$1(e4);
});
function It$1(e4) {
  if (e4 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e4;
}
o$2(It$1, "_assertThisInitialized");
function X$1(e4, r4) {
  return X$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t4, n4) {
    return t4.__proto__ = n4, t4;
  }, X$1(e4, r4);
}
o$2(X$1, "_setPrototypeOf");
function Pt$1(e4, r4) {
  e4.prototype = Object.create(r4.prototype), e4.prototype.constructor = e4, X$1(e4, r4);
}
o$2(Pt$1, "_inheritsLoose");
function Ke(e4) {
  return Ke = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r4) {
    return r4.__proto__ || Object.getPrototypeOf(r4);
  }, Ke(e4);
}
o$2(Ke, "_getPrototypeOf");
function Lt$1(e4) {
  try {
    return Function.toString.call(e4).indexOf("[native code]") !== -1;
  } catch {
    return typeof e4 == "function";
  }
}
o$2(Lt$1, "_isNativeFunction");
function wr() {
  try {
    var e4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (wr = /* @__PURE__ */ o$2(function() {
    return !!e4;
  }, "_isNativeReflectConstruct"))();
}
o$2(wr, "_isNativeReflectConstruct");
function zt$1(e4, r4, t4) {
  if (wr()) return Reflect.construct.apply(null, arguments);
  var n4 = [null];
  n4.push.apply(n4, r4);
  var a4 = new (e4.bind.apply(e4, n4))();
  return t4 && X$1(a4, t4.prototype), a4;
}
o$2(zt$1, "_construct");
function Xe$1(e4) {
  var r4 = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Xe$1 = /* @__PURE__ */ o$2(function(n4) {
    if (n4 === null || !Lt$1(n4)) return n4;
    if (typeof n4 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r4 !== void 0) {
      if (r4.has(n4)) return r4.get(n4);
      r4.set(n4, a4);
    }
    function a4() {
      return zt$1(n4, arguments, Ke(this).constructor);
    }
    return o$2(a4, "Wrapper"), a4.prototype = Object.create(n4.prototype, {
      constructor: {
        value: a4,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), X$1(a4, n4);
  }, "_wrapNativeSuper"), Xe$1(e4);
}
o$2(Xe$1, "_wrapNativeSuper");
var ha = {
  1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,
  2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
  3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
  4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
  5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
  6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,
  7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,
  8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
  9: `Please provide a number of steps to the modularScale helper.

`,
  10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
  12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
  13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
  14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  16: `You must provide a template to this method.

`,
  17: `You passed an unsupported selector state to this method.

`,
  18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: `fontFace expects a name of a font-family.

`,
  24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  25: `fontFace expects localFonts to be an array.

`,
  26: `fontFace expects fileFormats to be an array.

`,
  27: `radialGradient requries at least 2 color-stops to properly render.

`,
  28: `Please supply a filename to retinaImage() as the first argument.

`,
  29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
  32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
  33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
  34: `borderRadius expects a radius value as a string or number as the second argument.

`,
  35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  36: `Property must be a string value.

`,
  37: `Syntax Error at %s.

`,
  38: `Formula contains a function that needs parentheses at %s.

`,
  39: `Formula is missing closing parenthesis at %s.

`,
  40: `Formula has too many closing parentheses at %s.

`,
  41: `All values in a formula must have the same unit or be unitless.

`,
  42: `Please provide a number of steps to the modularScale helper.

`,
  43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
  45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
  46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
  47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
  51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
  52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  53: `fontFace expects localFonts to be an array.

`,
  54: `fontFace expects fileFormats to be an array.

`,
  55: `fontFace expects a name of a font-family.

`,
  56: `linearGradient requries at least 2 color-stops to properly render.

`,
  57: `radialGradient requries at least 2 color-stops to properly render.

`,
  58: `Please supply a filename to retinaImage() as the first argument.

`,
  59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: `Property must be a string value.

`,
  62: `borderRadius expects a radius value as a string or number as the second argument.

`,
  63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
  65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,
  66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
  67: `You must provide a template to this method.

`,
  68: `You passed an unsupported selector state to this method.

`,
  69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
  70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
  71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
  72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
  73: `Please provide a valid CSS variable.

`,
  74: `CSS variable not found and no default was provided.

`,
  75: `important requires a valid style object, got a %s instead.

`,
  76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
  77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
  78: `base must be set in "px" or "%" but you set it in "%s".
`
};
function ga() {
  for (var e4 = arguments.length, r4 = new Array(e4), t4 = 0; t4 < e4; t4++)
    r4[t4] = arguments[t4];
  var n4 = r4[0], a4 = [], i4;
  for (i4 = 1; i4 < r4.length; i4 += 1)
    a4.push(r4[i4]);
  return a4.forEach(function(s2) {
    n4 = n4.replace(/%[a-z]/, s2);
  }), n4;
}
o$2(ga, "format");
var B$1 = /* @__PURE__ */ function(e4) {
  Pt$1(r4, e4);
  function r4(t4) {
    for (var n4, a4 = arguments.length, i4 = new Array(a4 > 1 ? a4 - 1 : 0), s2 = 1; s2 < a4; s2++)
      i4[s2 - 1] = arguments[s2];
    return n4 = e4.call(this, ga.apply(void 0, [ha[t4]].concat(i4))) || this, It$1(n4);
  }
  return o$2(r4, "PolishedError"), r4;
}(/* @__PURE__ */ Xe$1(Error));
function Mt(e4, r4) {
  return e4.substr(-r4.length) === r4;
}
o$2(Mt, "endsWith");
var ba = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function kt(e4) {
  if (typeof e4 != "string") return e4;
  var r4 = e4.match(ba);
  return r4 ? parseFloat(e4) : e4;
}
o$2(kt, "stripUnit");
var va$1 = /* @__PURE__ */ o$2(function(r4) {
  return function(t4, n4) {
    n4 === void 0 && (n4 = "16px");
    var a4 = t4, i4 = n4;
    if (typeof t4 == "string") {
      if (!Mt(t4, "px"))
        throw new B$1(69, r4, t4);
      a4 = kt(t4);
    }
    if (typeof n4 == "string") {
      if (!Mt(n4, "px"))
        throw new B$1(70, r4, n4);
      i4 = kt(n4);
    }
    if (typeof a4 == "string")
      throw new B$1(71, t4, r4);
    if (typeof i4 == "string")
      throw new B$1(72, n4, r4);
    return "" + a4 / i4 + r4;
  };
}, "pxtoFactory"), Bt = va$1;
Bt("em");
Bt("rem");
function Er$1(e4) {
  return Math.round(e4 * 255);
}
o$2(Er$1, "colorToInt");
function ya(e4, r4, t4) {
  return Er$1(e4) + "," + Er$1(r4) + "," + Er$1(t4);
}
o$2(ya, "convertToInt");
function ze$2(e4, r4, t4, n4) {
  if (n4 === void 0 && (n4 = ya), r4 === 0)
    return n4(t4, t4, t4);
  var a4 = (e4 % 360 + 360) % 360 / 60, i4 = (1 - Math.abs(2 * t4 - 1)) * r4, s2 = i4 * (1 - Math.abs(a4 % 2 - 1)), u2 = 0, f2 = 0, p4 = 0;
  a4 >= 0 && a4 < 1 ? (u2 = i4, f2 = s2) : a4 >= 1 && a4 < 2 ? (u2 = s2, f2 = i4) : a4 >= 2 && a4 < 3 ? (f2 = i4, p4 = s2) : a4 >= 3 && a4 < 4 ? (f2 = s2, p4 = i4) : a4 >= 4 && a4 < 5 ? (u2 = s2, p4 = i4) : a4 >= 5 && a4 < 6 && (u2 = i4, p4 = s2);
  var c2 = t4 - i4 / 2, l2 = u2 + c2, m4 = f2 + c2, x4 = p4 + c2;
  return n4(l2, m4, x4);
}
o$2(ze$2, "hslToRgb");
var Nt$1 = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function xa(e4) {
  if (typeof e4 != "string") return e4;
  var r4 = e4.toLowerCase();
  return Nt$1[r4] ? "#" + Nt$1[r4] : e4;
}
o$2(xa, "nameToHex");
var wa = /^#[a-fA-F0-9]{6}$/, Ea$1 = /^#[a-fA-F0-9]{8}$/, Sa = /^#[a-fA-F0-9]{3}$/, Ta = /^#[a-fA-F0-9]{4}$/, Sr = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i, Ca$1 = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, Oa$1 = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i, Ra = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function Se$1(e4) {
  if (typeof e4 != "string")
    throw new B$1(3);
  var r4 = xa(e4);
  if (r4.match(wa))
    return {
      red: parseInt("" + r4[1] + r4[2], 16),
      green: parseInt("" + r4[3] + r4[4], 16),
      blue: parseInt("" + r4[5] + r4[6], 16)
    };
  if (r4.match(Ea$1)) {
    var t4 = parseFloat((parseInt("" + r4[7] + r4[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + r4[1] + r4[2], 16),
      green: parseInt("" + r4[3] + r4[4], 16),
      blue: parseInt("" + r4[5] + r4[6], 16),
      alpha: t4
    };
  }
  if (r4.match(Sa))
    return {
      red: parseInt("" + r4[1] + r4[1], 16),
      green: parseInt("" + r4[2] + r4[2], 16),
      blue: parseInt("" + r4[3] + r4[3], 16)
    };
  if (r4.match(Ta)) {
    var n4 = parseFloat((parseInt("" + r4[4] + r4[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + r4[1] + r4[1], 16),
      green: parseInt("" + r4[2] + r4[2], 16),
      blue: parseInt("" + r4[3] + r4[3], 16),
      alpha: n4
    };
  }
  var a4 = Sr.exec(r4);
  if (a4)
    return {
      red: parseInt("" + a4[1], 10),
      green: parseInt("" + a4[2], 10),
      blue: parseInt("" + a4[3], 10)
    };
  var i4 = Ca$1.exec(r4.substring(0, 50));
  if (i4)
    return {
      red: parseInt("" + i4[1], 10),
      green: parseInt("" + i4[2], 10),
      blue: parseInt("" + i4[3], 10),
      alpha: parseFloat("" + i4[4]) > 1 ? parseFloat("" + i4[4]) / 100 : parseFloat("" + i4[4])
    };
  var s2 = Oa$1.exec(r4);
  if (s2) {
    var u2 = parseInt("" + s2[1], 10), f2 = parseInt("" + s2[2], 10) / 100, p4 = parseInt("" + s2[3], 10) / 100, c2 = "rgb(" + ze$2(u2, f2, p4) + ")", l2 = Sr.exec(c2);
    if (!l2)
      throw new B$1(4, r4, c2);
    return {
      red: parseInt("" + l2[1], 10),
      green: parseInt("" + l2[2], 10),
      blue: parseInt("" + l2[3], 10)
    };
  }
  var m4 = Ra.exec(r4.substring(0, 50));
  if (m4) {
    var x4 = parseInt("" + m4[1], 10), b3 = parseInt("" + m4[2], 10) / 100, d4 = parseInt("" + m4[3], 10) / 100, v3 = "rgb(" + ze$2(x4, b3, d4) + ")", y4 = Sr.exec(v3);
    if (!y4)
      throw new B$1(4, r4, v3);
    return {
      red: parseInt("" + y4[1], 10),
      green: parseInt("" + y4[2], 10),
      blue: parseInt("" + y4[3], 10),
      alpha: parseFloat("" + m4[4]) > 1 ? parseFloat("" + m4[4]) / 100 : parseFloat("" + m4[4])
    };
  }
  throw new B$1(5);
}
o$2(Se$1, "parseToRgb");
function Aa(e4) {
  var r4 = e4.red / 255, t4 = e4.green / 255, n4 = e4.blue / 255, a4 = Math.max(r4, t4, n4), i4 = Math.min(r4, t4, n4), s2 = (a4 + i4) / 2;
  if (a4 === i4)
    return e4.alpha !== void 0 ? {
      hue: 0,
      saturation: 0,
      lightness: s2,
      alpha: e4.alpha
    } : {
      hue: 0,
      saturation: 0,
      lightness: s2
    };
  var u2, f2 = a4 - i4, p4 = s2 > 0.5 ? f2 / (2 - a4 - i4) : f2 / (a4 + i4);
  switch (a4) {
    case r4:
      u2 = (t4 - n4) / f2 + (t4 < n4 ? 6 : 0);
      break;
    case t4:
      u2 = (n4 - r4) / f2 + 2;
      break;
    default:
      u2 = (r4 - t4) / f2 + 4;
      break;
  }
  return u2 *= 60, e4.alpha !== void 0 ? {
    hue: u2,
    saturation: p4,
    lightness: s2,
    alpha: e4.alpha
  } : {
    hue: u2,
    saturation: p4,
    lightness: s2
  };
}
o$2(Aa, "rgbToHsl");
function Z$2(e4) {
  return Aa(Se$1(e4));
}
o$2(Z$2, "parseToHsl");
var Fa = /* @__PURE__ */ o$2(function(r4) {
  return r4.length === 7 && r4[1] === r4[2] && r4[3] === r4[4] && r4[5] === r4[6] ? "#" + r4[1] + r4[3] + r4[5] : r4;
}, "reduceHexValue"), Cr$1 = Fa;
function oe$1(e4) {
  var r4 = e4.toString(16);
  return r4.length === 1 ? "0" + r4 : r4;
}
o$2(oe$1, "numberToHex");
function Tr(e4) {
  return oe$1(Math.round(e4 * 255));
}
o$2(Tr, "colorToHex");
function _a(e4, r4, t4) {
  return Cr$1("#" + Tr(e4) + Tr(r4) + Tr(t4));
}
o$2(_a, "convertToHex");
function Ze$2(e4, r4, t4) {
  return ze$2(e4, r4, t4, _a);
}
o$2(Ze$2, "hslToHex");
function Ia$1(e4, r4, t4) {
  if (typeof e4 == "number" && typeof r4 == "number" && typeof t4 == "number")
    return Ze$2(e4, r4, t4);
  if (typeof e4 == "object" && r4 === void 0 && t4 === void 0)
    return Ze$2(e4.hue, e4.saturation, e4.lightness);
  throw new B$1(1);
}
o$2(Ia$1, "hsl");
function Pa(e4, r4, t4, n4) {
  if (typeof e4 == "number" && typeof r4 == "number" && typeof t4 == "number" && typeof n4 == "number")
    return n4 >= 1 ? Ze$2(e4, r4, t4) : "rgba(" + ze$2(e4, r4, t4) + "," + n4 + ")";
  if (typeof e4 == "object" && r4 === void 0 && t4 === void 0 && n4 === void 0)
    return e4.alpha >= 1 ? Ze$2(e4.hue, e4.saturation, e4.lightness) : "rgba(" + ze$2(e4.hue, e4.saturation, e4.lightness) + "," + e4.alpha + ")";
  throw new B$1(2);
}
o$2(Pa, "hsla");
function Or$1(e4, r4, t4) {
  if (typeof e4 == "number" && typeof r4 == "number" && typeof t4 == "number")
    return Cr$1("#" + oe$1(e4) + oe$1(r4) + oe$1(t4));
  if (typeof e4 == "object" && r4 === void 0 && t4 === void 0)
    return Cr$1("#" + oe$1(e4.red) + oe$1(e4.green) + oe$1(e4.blue));
  throw new B$1(6);
}
o$2(Or$1, "rgb");
function ie$1(e4, r4, t4, n4) {
  if (typeof e4 == "string" && typeof r4 == "number") {
    var a4 = Se$1(e4);
    return "rgba(" + a4.red + "," + a4.green + "," + a4.blue + "," + r4 + ")";
  } else {
    if (typeof e4 == "number" && typeof r4 == "number" && typeof t4 == "number" && typeof n4 == "number")
      return n4 >= 1 ? Or$1(e4, r4, t4) : "rgba(" + e4 + "," + r4 + "," + t4 + "," + n4 + ")";
    if (typeof e4 == "object" && r4 === void 0 && t4 === void 0 && n4 === void 0)
      return e4.alpha >= 1 ? Or$1(e4.red, e4.green, e4.blue) : "rgba(" + e4.red + "," + e4.green + "," + e4.blue + "," + e4.alpha + ")";
  }
  throw new B$1(7);
}
o$2(ie$1, "rgba");
var La = /* @__PURE__ */ o$2(function(r4) {
  return typeof r4.red == "number" && typeof r4.green == "number" && typeof r4.blue == "number" && (typeof r4.alpha != "number" || typeof r4.alpha > "u");
}, "isRgb"), za = /* @__PURE__ */ o$2(function(r4) {
  return typeof r4.red == "number" && typeof r4.green == "number" && typeof r4.blue == "number" && typeof r4.alpha == "number";
}, "isRgba"), Ma = /* @__PURE__ */ o$2(function(r4) {
  return typeof r4.hue == "number" && typeof r4.saturation == "number" && typeof r4.lightness == "number" && (typeof r4.alpha != "number" || typeof r4.alpha > "u");
}, "isHsl"), ka = /* @__PURE__ */ o$2(function(r4) {
  return typeof r4.hue == "number" && typeof r4.saturation == "number" && typeof r4.lightness == "number" && typeof r4.alpha == "number";
}, "isHsla");
function Q$1(e4) {
  if (typeof e4 != "object") throw new B$1(8);
  if (za(e4)) return ie$1(e4);
  if (La(e4)) return Or$1(e4);
  if (ka(e4)) return Pa(e4);
  if (Ma(e4)) return Ia$1(e4);
  throw new B$1(8);
}
o$2(Q$1, "toColorString");
function Dt$1(e4, r4, t4) {
  return /* @__PURE__ */ o$2(function() {
    var a4 = t4.concat(Array.prototype.slice.call(arguments));
    return a4.length >= r4 ? e4.apply(this, a4) : Dt$1(e4, r4, a4);
  }, "fn");
}
o$2(Dt$1, "curried");
function D$1(e4) {
  return Dt$1(e4, e4.length, []);
}
o$2(D$1, "curry");
function Na(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Z$2(r4);
  return Q$1(I$1({}, t4, {
    hue: t4.hue + parseFloat(e4)
  }));
}
o$2(Na, "adjustHue");
D$1(Na);
function Te$1(e4, r4, t4) {
  return Math.max(e4, Math.min(r4, t4));
}
o$2(Te$1, "guard");
function Ba(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Z$2(r4);
  return Q$1(I$1({}, t4, {
    lightness: Te$1(0, 1, t4.lightness - parseFloat(e4))
  }));
}
o$2(Ba, "darken");
var Da$1 = D$1(Ba), $t = Da$1;
function $a$1(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Z$2(r4);
  return Q$1(I$1({}, t4, {
    saturation: Te$1(0, 1, t4.saturation - parseFloat(e4))
  }));
}
o$2($a$1, "desaturate");
D$1($a$1);
function ja$1(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Z$2(r4);
  return Q$1(I$1({}, t4, {
    lightness: Te$1(0, 1, t4.lightness + parseFloat(e4))
  }));
}
o$2(ja$1, "lighten");
var Ha = D$1(ja$1), jt = Ha;
function Wa(e4, r4, t4) {
  if (r4 === "transparent") return t4;
  if (t4 === "transparent") return r4;
  if (e4 === 0) return t4;
  var n4 = Se$1(r4), a4 = I$1({}, n4, {
    alpha: typeof n4.alpha == "number" ? n4.alpha : 1
  }), i4 = Se$1(t4), s2 = I$1({}, i4, {
    alpha: typeof i4.alpha == "number" ? i4.alpha : 1
  }), u2 = a4.alpha - s2.alpha, f2 = parseFloat(e4) * 2 - 1, p4 = f2 * u2 === -1 ? f2 : f2 + u2, c2 = 1 + f2 * u2, l2 = (p4 / c2 + 1) / 2, m4 = 1 - l2, x4 = {
    red: Math.floor(a4.red * l2 + s2.red * m4),
    green: Math.floor(a4.green * l2 + s2.green * m4),
    blue: Math.floor(a4.blue * l2 + s2.blue * m4),
    alpha: a4.alpha * parseFloat(e4) + s2.alpha * (1 - parseFloat(e4))
  };
  return ie$1(x4);
}
o$2(Wa, "mix");
var Ua$1 = D$1(Wa), Ht = Ua$1;
function Va$1(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Se$1(r4), n4 = typeof t4.alpha == "number" ? t4.alpha : 1, a4 = I$1({}, t4, {
    alpha: Te$1(0, 1, (n4 * 100 + parseFloat(e4) * 100) / 100)
  });
  return ie$1(a4);
}
o$2(Va$1, "opacify");
var Ga$1 = D$1(Va$1), Wt = Ga$1;
function Ya$1(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Z$2(r4);
  return Q$1(I$1({}, t4, {
    saturation: Te$1(0, 1, t4.saturation + parseFloat(e4))
  }));
}
o$2(Ya$1, "saturate");
D$1(Ya$1);
function qa$1(e4, r4) {
  return r4 === "transparent" ? r4 : Q$1(I$1({}, Z$2(r4), {
    hue: parseFloat(e4)
  }));
}
o$2(qa$1, "setHue");
D$1(qa$1);
function Ja$1(e4, r4) {
  return r4 === "transparent" ? r4 : Q$1(I$1({}, Z$2(r4), {
    lightness: parseFloat(e4)
  }));
}
o$2(Ja$1, "setLightness");
D$1(Ja$1);
function Ka$1(e4, r4) {
  return r4 === "transparent" ? r4 : Q$1(I$1({}, Z$2(r4), {
    saturation: parseFloat(e4)
  }));
}
o$2(Ka$1, "setSaturation");
D$1(Ka$1);
function Xa$1(e4, r4) {
  return r4 === "transparent" ? r4 : Ht(parseFloat(e4), "rgb(0, 0, 0)", r4);
}
o$2(Xa$1, "shade");
D$1(Xa$1);
function Za$1(e4, r4) {
  return r4 === "transparent" ? r4 : Ht(parseFloat(e4), "rgb(255, 255, 255)", r4);
}
o$2(Za$1, "tint");
D$1(Za$1);
function Qa$1(e4, r4) {
  if (r4 === "transparent") return r4;
  var t4 = Se$1(r4), n4 = typeof t4.alpha == "number" ? t4.alpha : 1, a4 = I$1({}, t4, {
    alpha: Te$1(0, 1, +(n4 * 100 - parseFloat(e4) * 100).toFixed(2) / 100)
  });
  return ie$1(a4);
}
o$2(Qa$1, "transparentize");
var eo = D$1(Qa$1), Ut$1 = eo;
var h$1 = {
  // coral
  secondary: "#029CFD",
  // ocean
  tertiary: "#FAFBFC",
  ancillary: "#22a699",
  // Complimentary
  orange: "#FC521F",
  gold: "#FFAE00",
  green: "#66BF3C",
  seafoam: "#37D5D3",
  purple: "#6F2CAC",
  ultraviolet: "#2A0481",
  // Monochrome
  lightest: "#FFFFFF",
  lighter: "#F7FAFC",
  light: "#EEF3F6",
  mediumlight: "#ECF4F9",
  medium: "#D9E8F2",
  mediumdark: "#73828C",
  dark: "#5C6870",
  darker: "#454E54",
  darkest: "#2E3438",
  // For borders
  border: "hsla(203, 50%, 30%, 0.15)",
  // Status
  positive: "#66BF3C",
  negative: "#FF4400",
  warning: "#E69D00",
  critical: "#FFFFFF",
  positiveText: "#448028",
  negativeText: "#D43900",
  warningText: "#A15C20"
}, V$1 = {
  app: "#F6F9FC",
  gridCellSize: 10,
  hoverable: Ut$1(0.9, h$1.secondary),
  // hover state for items in a list
  // Notification, error, and warning backgrounds
  positive: "#E1FFD4",
  negative: "#FEDED2",
  warning: "#FFF5CF",
  critical: "#FF4400"
}, W$2 = {
  fonts: {
    base: [
      '"Nunito Sans"',
      "-apple-system",
      '".SFNSText-Regular"',
      '"San Francisco"',
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(", "),
    mono: [
      "ui-monospace",
      "Menlo",
      "Monaco",
      '"Roboto Mono"',
      '"Oxygen Mono"',
      '"Ubuntu Monospace"',
      '"Source Code Pro"',
      '"Droid Sans Mono"',
      '"Courier New"',
      "monospace"
    ].join(", ")
  },
  weight: {
    regular: 400,
    bold: 700
  },
  size: {
    s1: 12,
    s2: 14,
    s3: 16,
    m1: 20,
    m2: 24,
    m3: 28,
    l1: 32,
    l2: 40,
    l3: 48,
    code: 90
  }
};
var Ar$1 = ir(Gt$1(), 1), Yt$1 = (0, Ar$1.default)(1)(
  ({ typography: e4 }) => ({
    body: {
      fontFamily: e4.fonts.base,
      fontSize: e4.size.s3,
      margin: 0,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      WebkitOverflowScrolling: "touch"
    },
    "*": {
      boxSizing: "border-box"
    },
    "h1, h2, h3, h4, h5, h6": {
      fontWeight: e4.weight.regular,
      margin: 0,
      padding: 0
    },
    "button, input, textarea, select": {
      fontFamily: "inherit",
      fontSize: "inherit",
      boxSizing: "border-box"
    },
    sub: {
      fontSize: "0.8em",
      bottom: "-0.2em"
    },
    sup: {
      fontSize: "0.8em",
      top: "-0.2em"
    },
    "b, strong": {
      fontWeight: e4.weight.bold
    },
    hr: {
      border: "none",
      borderTop: "1px solid silver",
      clear: "both",
      marginBottom: "1.25rem"
    },
    code: {
      fontFamily: e4.fonts.mono,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      display: "inline-block",
      paddingLeft: 2,
      paddingRight: 2,
      verticalAlign: "baseline",
      color: "inherit"
    },
    pre: {
      fontFamily: e4.fonts.mono,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: "18px",
      padding: "11px 1rem",
      whiteSpace: "pre-wrap",
      color: "inherit",
      borderRadius: 3,
      margin: "1rem 0"
    }
  })
);
(0, Ar$1.default)(1)(({
  color: e4,
  background: r4,
  typography: t4
}) => {
  let n4 = Yt$1({ typography: t4 });
  return {
    ...n4,
    body: {
      ...n4.body,
      color: e4.defaultText,
      background: r4.app,
      overflow: "hidden"
    },
    hr: {
      ...n4.hr,
      borderTop: `1px solid ${e4.border}`
    },
    ".sb-sr-only, .sb-hidden-until-focus:not(:focus)": {
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      border: 0
    },
    ".sb-hidden-until-focus": {
      opacity: 0,
      transition: "opacity 150ms ease-out"
    },
    ".sb-hidden-until-focus:focus": {
      opacity: 1
    }
  };
});
var to$1 = {
  base: "dark",
  // Storybook-specific color palette
  colorPrimary: "#FF4785",
  // coral
  colorSecondary: "#029CFD",
  // ocean
  // UI
  appBg: "#222425",
  appContentBg: "#1B1C1D",
  appPreviewBg: h$1.lightest,
  appBorderColor: "rgba(255,255,255,.1)",
  appBorderRadius: 4,
  // Fonts
  fontBase: W$2.fonts.base,
  fontCode: W$2.fonts.mono,
  // Text colors
  textColor: "#C9CDCF",
  textInverseColor: "#222425",
  textMutedColor: "#798186",
  // Toolbar default and active colors
  barTextColor: h$1.mediumdark,
  barHoverColor: h$1.secondary,
  barSelectedColor: h$1.secondary,
  barBg: "#292C2E",
  // Form colors
  buttonBg: "#222425",
  buttonBorder: "rgba(255,255,255,.1)",
  booleanBg: "#222425",
  booleanSelectedBg: "#2E3438",
  inputBg: "#1B1C1D",
  inputBorder: "rgba(255,255,255,.1)",
  inputTextColor: h$1.lightest,
  inputBorderRadius: 4
}, qt$1 = to$1;
var no$1 = {
  base: "light",
  // Storybook-specific color palette
  colorPrimary: "#FF4785",
  // coral
  colorSecondary: "#029CFD",
  // ocean
  // UI
  appBg: V$1.app,
  appContentBg: h$1.lightest,
  appPreviewBg: h$1.lightest,
  appBorderColor: h$1.border,
  appBorderRadius: 4,
  // Fonts
  fontBase: W$2.fonts.base,
  fontCode: W$2.fonts.mono,
  // Text colors
  textColor: h$1.darkest,
  textInverseColor: h$1.lightest,
  textMutedColor: h$1.dark,
  // Toolbar default and active colors
  barTextColor: h$1.mediumdark,
  barHoverColor: h$1.secondary,
  barSelectedColor: h$1.secondary,
  barBg: h$1.lightest,
  // Form colors
  buttonBg: V$1.app,
  buttonBorder: h$1.medium,
  booleanBg: h$1.mediumlight,
  booleanSelectedBg: h$1.lightest,
  inputBg: h$1.lightest,
  inputBorder: h$1.border,
  inputTextColor: h$1.darkest,
  inputBorderRadius: 4
}, Ce$2 = no$1;
const { logger: ao$1 } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const { global: oo } = __STORYBOOK_MODULE_GLOBAL__;
var { window: Fr$1 } = oo, Jt$1 = /* @__PURE__ */ o$2((e4) => ({ color: e4 }), "mkColor"), io$1 = /* @__PURE__ */ o$2((e4) => typeof e4 != "string" ? (ao$1.warn(
  `Color passed to theme object should be a string. Instead ${e4}(${typeof e4}) was passed.`
), false) : true, "isColorString"), so$1 = /* @__PURE__ */ o$2((e4) => !/(gradient|var|calc)/.test(e4), "isValidColorForPolished"), uo$1 = /* @__PURE__ */ o$2(
  (e4, r4) => e4 === "darken" ? ie$1(`${$t(1, r4)}`, 0.95) : e4 === "lighten" ? ie$1(`${jt(1, r4)}`, 0.95) : r4,
  "applyPolished"
), Kt$1 = /* @__PURE__ */ o$2(
  (e4) => (r4) => {
    if (!io$1(r4) || !so$1(r4))
      return r4;
    try {
      return uo$1(e4, r4);
    } catch {
      return r4;
    }
  },
  "colorFactory"
), fo = Kt$1("lighten");
Kt$1("darken");
var Qe$2 = /* @__PURE__ */ o$2(() => !Fr$1 || !Fr$1.matchMedia ? "light" : Fr$1.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", "getPreferredColorScheme");
var Me$2 = {
  light: Ce$2,
  dark: qt$1,
  normal: Ce$2
};
Qe$2();
var Xt$1 = {
  rubber: "cubic-bezier(0.175, 0.885, 0.335, 1.05)"
}, lo$1 = Ee$1`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`, Zt = Ee$1`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`, po$1 = Ee$1`
  0% { transform: translateY(1px); }
  25% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(1px); }
`, mo$1 = Ee$1`
  0%, 100% { transform:translate3d(0,0,0); }
  12.5%, 62.5% { transform:translate3d(-4px,0,0); }
  37.5%, 87.5% {  transform: translate3d(4px,0,0);  }
`, ho$1 = Le$1`
  animation: ${Zt} 1.5s ease-in-out infinite;
  color: transparent;
  cursor: progress;
`, go$1 = Le$1`
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);

  &:hover {
    transform: translate3d(0, -2px, 0);
  }

  &:active {
    transform: translate3d(0, 0, 0);
  }
`, Qt$1 = {
  rotate360: lo$1,
  glow: Zt,
  float: po$1,
  jiggle: mo$1,
  inlineGlow: ho$1,
  hoverable: go$1
};
var en = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
  BASE_COLOR: "rgb(213, 213, 213)",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
  OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
  HTML_TAG_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
  HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "rgb(145, 145, 145)",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
  TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
  TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
  TABLE_SORT_ICON_COLOR: "black",
  // 'rgb(48, 57, 66)',
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
}, rn = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "white",
  BASE_COLOR: "black",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
  OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
  HTML_TAG_COLOR: "rgb(168, 148, 166)",
  HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
  HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "#6e6e6e",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "#aaa",
  TABLE_TH_BACKGROUND_COLOR: "#eee",
  TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
  TABLE_SORT_ICON_COLOR: "#6e6e6e",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
}, bo$1 = /* @__PURE__ */ o$2((e4) => Object.entries(e4).reduce((r4, [t4, n4]) => ({ ...r4, [t4]: Jt$1(n4) }), {}), "convertColors"), tn = /* @__PURE__ */ o$2(
  ({ colors: e4, mono: r4 }) => {
    let t4 = bo$1(e4);
    return {
      token: {
        fontFamily: r4,
        WebkitFontSmoothing: "antialiased",
        "&.tag": t4.red3,
        "&.comment": { ...t4.green1, fontStyle: "italic" },
        "&.prolog": { ...t4.green1, fontStyle: "italic" },
        "&.doctype": { ...t4.green1, fontStyle: "italic" },
        "&.cdata": { ...t4.green1, fontStyle: "italic" },
        "&.string": t4.red1,
        "&.url": t4.cyan1,
        "&.symbol": t4.cyan1,
        "&.number": t4.cyan1,
        "&.boolean": t4.cyan1,
        "&.variable": t4.cyan1,
        "&.constant": t4.cyan1,
        "&.inserted": t4.cyan1,
        "&.atrule": t4.blue1,
        "&.keyword": t4.blue1,
        "&.attr-value": t4.blue1,
        "&.punctuation": t4.gray1,
        "&.operator": t4.gray1,
        "&.function": t4.gray1,
        "&.deleted": t4.red2,
        "&.important": {
          fontWeight: "bold"
        },
        "&.bold": {
          fontWeight: "bold"
        },
        "&.italic": {
          fontStyle: "italic"
        },
        "&.class-name": t4.cyan2,
        "&.selector": t4.red3,
        "&.attr-name": t4.red4,
        "&.property": t4.red4,
        "&.regex": t4.red4,
        "&.entity": t4.red4,
        "&.directive.tag .tag": {
          background: "#ffff00",
          ...t4.gray1
        }
      },
      "language-json .token.boolean": t4.blue1,
      "language-json .token.number": t4.blue1,
      "language-json .token.property": t4.cyan2,
      namespace: {
        opacity: 0.7
      }
    };
  },
  "create"
);
var vo$1 = {
  green1: "#008000",
  red1: "#A31515",
  red2: "#9a050f",
  red3: "#800000",
  red4: "#ff0000",
  gray1: "#393A34",
  cyan1: "#36acaa",
  cyan2: "#2B91AF",
  blue1: "#0000ff",
  blue2: "#00009f"
}, yo = {
  green1: "#7C7C7C",
  red1: "#92C379",
  red2: "#9a050f",
  red3: "#A8FF60",
  red4: "#96CBFE",
  gray1: "#EDEDED",
  cyan1: "#C6C5FE",
  cyan2: "#FFFFB6",
  blue1: "#B474DD",
  blue2: "#00009f"
}, xo$1 = /* @__PURE__ */ o$2((e4) => ({
  // Changeable colors
  primary: e4.colorPrimary,
  secondary: e4.colorSecondary,
  tertiary: h$1.tertiary,
  ancillary: h$1.ancillary,
  // Complimentary
  orange: h$1.orange,
  gold: h$1.gold,
  green: h$1.green,
  seafoam: h$1.seafoam,
  purple: h$1.purple,
  ultraviolet: h$1.ultraviolet,
  // Monochrome
  lightest: h$1.lightest,
  lighter: h$1.lighter,
  light: h$1.light,
  mediumlight: h$1.mediumlight,
  medium: h$1.medium,
  mediumdark: h$1.mediumdark,
  dark: h$1.dark,
  darker: h$1.darker,
  darkest: h$1.darkest,
  // For borders
  border: h$1.border,
  // Status
  positive: h$1.positive,
  negative: h$1.negative,
  warning: h$1.warning,
  critical: h$1.critical,
  defaultText: e4.textColor || h$1.darkest,
  inverseText: e4.textInverseColor || h$1.lightest,
  positiveText: h$1.positiveText,
  negativeText: h$1.negativeText,
  warningText: h$1.warningText
}), "createColors"), Ir$1 = /* @__PURE__ */ o$2((e4 = Me$2[Qe$2()]) => {
  let {
    base: r4,
    colorPrimary: t4,
    colorSecondary: n4,
    appBg: a4,
    appContentBg: i4,
    appPreviewBg: s2,
    appBorderColor: u2,
    appBorderRadius: f2,
    fontBase: p4,
    fontCode: c2,
    textColor: l2,
    textInverseColor: m4,
    barTextColor: x4,
    barHoverColor: b3,
    barSelectedColor: d4,
    barBg: v3,
    buttonBg: y4,
    buttonBorder: w3,
    booleanBg: A3,
    booleanSelectedBg: S4,
    inputBg: R3,
    inputBorder: F2,
    inputTextColor: T2,
    inputBorderRadius: ue2,
    brandTitle: fe2,
    brandUrl: G2,
    brandImage: Y2,
    brandTarget: rr2,
    gridCellSize: tr2,
    ...nr2
  } = e4;
  return {
    ...nr2,
    base: r4,
    color: xo$1(e4),
    background: {
      app: a4,
      bar: v3,
      content: i4,
      preview: s2,
      gridCellSize: tr2 || V$1.gridCellSize,
      hoverable: V$1.hoverable,
      positive: V$1.positive,
      negative: V$1.negative,
      warning: V$1.warning,
      critical: V$1.critical
    },
    typography: {
      fonts: {
        base: p4,
        mono: c2
      },
      weight: W$2.weight,
      size: W$2.size
    },
    animation: Qt$1,
    easing: Xt$1,
    input: {
      background: R3,
      border: F2,
      borderRadius: ue2,
      color: T2
    },
    button: {
      background: y4 || R3,
      border: w3 || F2
    },
    boolean: {
      background: A3 || F2,
      selectedBackground: S4 || R3
    },
    // UI
    layoutMargin: 10,
    appBorderColor: u2,
    appBorderRadius: f2,
    // Toolbar default/active colors
    barTextColor: x4,
    barHoverColor: b3 || n4,
    barSelectedColor: d4 || n4,
    barBg: v3,
    // Brand logo/text
    brand: {
      title: fe2,
      url: G2,
      image: Y2 || (fe2 ? null : void 0),
      target: rr2
    },
    code: tn({
      colors: r4 === "light" ? vo$1 : yo,
      mono: c2
    }),
    // Addon actions theme
    // API example https://github.com/storybookjs/react-inspector/blob/master/src/styles/themes/chromeLight.tsx
    addonActionsTheme: {
      ...r4 === "light" ? rn : en,
      BASE_FONT_FAMILY: c2,
      BASE_FONT_SIZE: W$2.size.s2 - 1,
      BASE_LINE_HEIGHT: "18px",
      BASE_BACKGROUND_COLOR: "transparent",
      BASE_COLOR: l2,
      ARROW_COLOR: Wt(0.2, u2),
      ARROW_MARGIN_RIGHT: 4,
      ARROW_FONT_SIZE: 8,
      TREENODE_FONT_FAMILY: c2,
      TREENODE_FONT_SIZE: W$2.size.s2 - 1,
      TREENODE_LINE_HEIGHT: "18px",
      TREENODE_PADDING_LEFT: 12
    }
  };
}, "convert");
const { logger: Co$1 } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var Pr$1 = /* @__PURE__ */ o$2((e4) => Object.keys(e4).length === 0, "isEmpty"), se$1 = /* @__PURE__ */ o$2((e4) => e4 != null && typeof e4 == "object", "isObject"), ke$2 = /* @__PURE__ */ o$2((e4, ...r4) => Object.prototype.hasOwnProperty.call(e4, ...r4), "hasOwnProperty");
var Ne$2 = /* @__PURE__ */ o$2(() => /* @__PURE__ */ Object.create(null), "makeObjectWithoutPrototype");
var nn$1 = /* @__PURE__ */ o$2((e4, r4) => e4 === r4 || !se$1(e4) || !se$1(r4) ? {} : Object.keys(e4).reduce((t4, n4) => {
  if (ke$2(r4, n4)) {
    let a4 = nn$1(e4[n4], r4[n4]);
    return se$1(a4) && Pr$1(a4) || (t4[n4] = a4), t4;
  }
  return t4[n4] = void 0, t4;
}, Ne$2()), "deletedDiff"), er$1 = nn$1;
function an(e4) {
  for (var r4 = [], t4 = 1; t4 < arguments.length; t4++)
    r4[t4 - 1] = arguments[t4];
  var n4 = Array.from(typeof e4 == "string" ? [e4] : e4);
  n4[n4.length - 1] = n4[n4.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a4 = n4.reduce(function(u2, f2) {
    var p4 = f2.match(/\n([\t ]+|(?!\s).)/g);
    return p4 ? u2.concat(p4.map(function(c2) {
      var l2, m4;
      return (m4 = (l2 = c2.match(/[\t ]/g)) === null || l2 === void 0 ? void 0 : l2.length) !== null && m4 !== void 0 ? m4 : 0;
    })) : u2;
  }, []);
  if (a4.length) {
    var i4 = new RegExp(`
[	 ]{` + Math.min.apply(Math, a4) + "}", "g");
    n4 = n4.map(function(u2) {
      return u2.replace(i4, `
`);
    });
  }
  n4[0] = n4[0].replace(/^\r?\n/, "");
  var s2 = n4[0];
  return r4.forEach(function(u2, f2) {
    var p4 = s2.match(/(?:^|\n)( *)$/), c2 = p4 ? p4[1] : "", l2 = u2;
    typeof u2 == "string" && u2.includes(`
`) && (l2 = String(u2).split(`
`).map(function(m4, x4) {
      return x4 === 0 ? m4 : "" + c2 + m4;
    }).join(`
`)), s2 += l2 + n4[f2 + 1];
  }), s2;
}
o$2(an, "dedent");
var pf = /* @__PURE__ */ o$2((e4) => {
  if (!e4)
    return Ir$1(Ce$2);
  let r4 = er$1(Ce$2, e4);
  return Object.keys(r4).length && Co$1.warn(
    an`
          Your theme is missing properties, you should update your theme!

          theme-data missing:
        `,
    r4
  ), Ir$1(e4);
}, "ensure");
var hf = "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */";
var gp = Object.create;
var An = Object.defineProperty;
var vp = Object.getOwnPropertyDescriptor;
var wp = Object.getOwnPropertyNames;
var bp = Object.getPrototypeOf, Rp = Object.prototype.hasOwnProperty;
var o$1 = (e4, t4) => An(e4, "name", { value: t4, configurable: true }), Gr = /* @__PURE__ */ ((e4) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e4, {
  get: (t4, r4) => (typeof require < "u" ? require : t4)[r4]
}) : e4)(function(e4) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e4 + '" is not supported');
});
var C$1 = (e4, t4) => () => (e4 && (t4 = e4(e4 = 0)), t4);
var H$1 = (e4, t4) => () => (t4 || e4((t4 = { exports: {} }).exports, t4), t4.exports), Xr = (e4, t4) => {
  for (var r4 in t4)
    An(e4, r4, { get: t4[r4], enumerable: true });
}, yp = (e4, t4, r4, n4) => {
  if (t4 && typeof t4 == "object" || typeof t4 == "function")
    for (let a4 of wp(t4))
      !Rp.call(e4, a4) && a4 !== r4 && An(e4, a4, { get: () => t4[a4], enumerable: !(n4 = vp(t4, a4)) || n4.enumerable });
  return e4;
};
var me$1 = (e4, t4, r4) => (r4 = e4 != null ? gp(bp(e4)) : {}, yp(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t4 || !e4 || !e4.__esModule ? An(r4, "default", { value: e4, enumerable: true }) : r4,
  e4
));
function W$1() {
  return W$1 = Object.assign ? Object.assign.bind() : function(e4) {
    for (var t4 = 1; t4 < arguments.length; t4++) {
      var r4 = arguments[t4];
      for (var n4 in r4) ({}).hasOwnProperty.call(r4, n4) && (e4[n4] = r4[n4]);
    }
    return e4;
  }, W$1.apply(null, arguments);
}
var Yr = C$1(() => {
  o$1(W$1, "_extends");
});
function Tl(e4) {
  if (e4 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e4;
}
var Hl = C$1(() => {
  o$1(Tl, "_assertThisInitialized");
});
function ht(e4, t4) {
  return ht = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r4, n4) {
    return r4.__proto__ = n4, r4;
  }, ht(e4, t4);
}
var In = C$1(() => {
  o$1(ht, "_setPrototypeOf");
});
function zn(e4) {
  return zn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t4) {
    return t4.__proto__ || Object.getPrototypeOf(t4);
  }, zn(e4);
}
var kl = C$1(() => {
  o$1(zn, "_getPrototypeOf");
});
var Kr = H$1((Ul, Qo) => {
  (function(e4) {
    if (typeof Ul == "object" && typeof Qo < "u")
      Qo.exports = e4();
    else if (typeof define == "function" && define.amd)
      define([], e4);
    else {
      var t4;
      typeof window < "u" ? t4 = window : typeof global < "u" ? t4 = global : typeof self < "u" ? t4 = self : t4 = this, t4.memoizerific = e4();
    }
  })(function() {
    return (/* @__PURE__ */ o$1(function n4(a4, i4, c2) {
      function l2(f2, d4) {
        if (!i4[f2]) {
          if (!a4[f2]) {
            var m4 = typeof Gr == "function" && Gr;
            if (!d4 && m4) return m4(f2, true);
            if (s2) return s2(f2, true);
            var v3 = new Error("Cannot find module '" + f2 + "'");
            throw v3.code = "MODULE_NOT_FOUND", v3;
          }
          var R3 = i4[f2] = { exports: {} };
          a4[f2][0].call(R3.exports, function(p4) {
            var h4 = a4[f2][1][p4];
            return l2(h4 || p4);
          }, R3, R3.exports, n4, a4, i4, c2);
        }
        return i4[f2].exports;
      }
      o$1(l2, "s");
      for (var s2 = typeof Gr == "function" && Gr, u2 = 0; u2 < c2.length; u2++) l2(c2[u2]);
      return l2;
    }, "e"))({ 1: [function(n4, a4, i4) {
      a4.exports = function(c2) {
        if (typeof Map != "function" || c2) {
          var l2 = n4("./similar");
          return new l2();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(n4, a4, i4) {
      function c2() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      o$1(c2, "Similar"), c2.prototype.get = function(l2) {
        var s2;
        if (this.lastItem && this.isEqual(this.lastItem.key, l2))
          return this.lastItem.val;
        if (s2 = this.indexOf(l2), s2 >= 0)
          return this.lastItem = this.list[s2], this.list[s2].val;
      }, c2.prototype.set = function(l2, s2) {
        var u2;
        return this.lastItem && this.isEqual(this.lastItem.key, l2) ? (this.lastItem.val = s2, this) : (u2 = this.indexOf(l2), u2 >= 0 ? (this.lastItem = this.list[u2], this.list[u2].val = s2, this) : (this.lastItem = { key: l2, val: s2 }, this.list.push(this.lastItem), this.size++, this));
      }, c2.prototype.delete = function(l2) {
        var s2;
        if (this.lastItem && this.isEqual(this.lastItem.key, l2) && (this.lastItem = void 0), s2 = this.indexOf(l2), s2 >= 0)
          return this.size--, this.list.splice(s2, 1)[0];
      }, c2.prototype.has = function(l2) {
        var s2;
        return this.lastItem && this.isEqual(this.lastItem.key, l2) ? true : (s2 = this.indexOf(l2), s2 >= 0 ? (this.lastItem = this.list[s2], true) : false);
      }, c2.prototype.forEach = function(l2, s2) {
        var u2;
        for (u2 = 0; u2 < this.size; u2++)
          l2.call(s2 || this, this.list[u2].val, this.list[u2].key, this);
      }, c2.prototype.indexOf = function(l2) {
        var s2;
        for (s2 = 0; s2 < this.size; s2++)
          if (this.isEqual(this.list[s2].key, l2))
            return s2;
        return -1;
      }, c2.prototype.isEqual = function(l2, s2) {
        return l2 === s2 || l2 !== l2 && s2 !== s2;
      }, a4.exports = c2;
    }, {}], 3: [function(n4, a4, i4) {
      var c2 = n4("map-or-similar");
      a4.exports = function(f2) {
        var d4 = new c2(false), m4 = [];
        return function(v3) {
          var R3 = /* @__PURE__ */ o$1(function() {
            var p4 = d4, h4, g4, w3 = arguments.length - 1, b3 = Array(w3 + 1), x4 = true, E4;
            if ((R3.numArgs || R3.numArgs === 0) && R3.numArgs !== w3 + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (E4 = 0; E4 < w3; E4++) {
              if (b3[E4] = {
                cacheItem: p4,
                arg: arguments[E4]
              }, p4.has(arguments[E4])) {
                p4 = p4.get(arguments[E4]);
                continue;
              }
              x4 = false, h4 = new c2(false), p4.set(arguments[E4], h4), p4 = h4;
            }
            return x4 && (p4.has(arguments[w3]) ? g4 = p4.get(arguments[w3]) : x4 = false), x4 || (g4 = v3.apply(null, arguments), p4.set(arguments[w3], g4)), f2 > 0 && (b3[w3] = {
              cacheItem: p4,
              arg: arguments[w3]
            }, x4 ? l2(m4, b3) : m4.push(b3), m4.length > f2 && s2(m4.shift())), R3.wasMemoized = x4, R3.numArgs = w3 + 1, g4;
          }, "memoizerific");
          return R3.limit = f2, R3.wasMemoized = false, R3.cache = d4, R3.lru = m4, R3;
        };
      };
      function l2(f2, d4) {
        var m4 = f2.length, v3 = d4.length, R3, p4, h4;
        for (p4 = 0; p4 < m4; p4++) {
          for (R3 = true, h4 = 0; h4 < v3; h4++)
            if (!u2(f2[p4][h4].arg, d4[h4].arg)) {
              R3 = false;
              break;
            }
          if (R3)
            break;
        }
        f2.push(f2.splice(p4, 1)[0]);
      }
      o$1(l2, "moveToMostRecentLru");
      function s2(f2) {
        var d4 = f2.length, m4 = f2[d4 - 1], v3, R3;
        for (m4.cacheItem.delete(m4.arg), R3 = d4 - 2; R3 >= 0 && (m4 = f2[R3], v3 = m4.cacheItem.get(m4.arg), !v3 || !v3.size); R3--)
          m4.cacheItem.delete(m4.arg);
      }
      o$1(s2, "removeCachedResult");
      function u2(f2, d4) {
        return f2 === d4 || f2 !== f2 && d4 !== d4;
      }
      o$1(u2, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});
function ur(e4, t4) {
  if (e4 == null) return {};
  var r4 = {};
  for (var n4 in e4) if ({}.hasOwnProperty.call(e4, n4)) {
    if (t4.indexOf(n4) !== -1) continue;
    r4[n4] = e4[n4];
  }
  return r4;
}
var Pn = C$1(() => {
  o$1(ur, "_objectWithoutPropertiesLoose");
});
function ql(e4, t4) {
  if (e4 == null) return {};
  var r4, n4, a4 = ur(e4, t4);
  if (Object.getOwnPropertySymbols) {
    var i4 = Object.getOwnPropertySymbols(e4);
    for (n4 = 0; n4 < i4.length; n4++) r4 = i4[n4], t4.indexOf(r4) === -1 && {}.propertyIsEnumerable.call(e4, r4) && (a4[r4] = e4[r4]);
  }
  return a4;
}
var Gl = C$1(() => {
  Pn();
  o$1(ql, "_objectWithoutProperties");
});
function Jr(e4, t4) {
  (t4 == null || t4 > e4.length) && (t4 = e4.length);
  for (var r4 = 0, n4 = Array(t4); r4 < t4; r4++) n4[r4] = e4[r4];
  return n4;
}
var ea = C$1(() => {
  o$1(Jr, "_arrayLikeToArray");
});
function Xl(e4) {
  if (Array.isArray(e4)) return Jr(e4);
}
var Yl = C$1(() => {
  ea();
  o$1(Xl, "_arrayWithoutHoles");
});
function Zl(e4) {
  if (typeof Symbol < "u" && e4[Symbol.iterator] != null || e4["@@iterator"] != null) return Array.from(e4);
}
var Kl = C$1(() => {
  o$1(Zl, "_iterableToArray");
});
function Jl(e4, t4) {
  if (e4) {
    if (typeof e4 == "string") return Jr(e4, t4);
    var r4 = {}.toString.call(e4).slice(8, -1);
    return r4 === "Object" && e4.constructor && (r4 = e4.constructor.name), r4 === "Map" || r4 === "Set" ? Array.from(e4) : r4 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r4) ? Jr(e4, t4) : void 0;
  }
}
var Ql = C$1(() => {
  ea();
  o$1(Jl, "_unsupportedIterableToArray");
});
function ec() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var tc = C$1(() => {
  o$1(ec, "_nonIterableSpread");
});
function kn(e4) {
  return Xl(e4) || Zl(e4) || Jl(e4) || ec();
}
var rc = C$1(() => {
  Yl();
  Kl();
  Ql();
  tc();
  o$1(kn, "_toConsumableArray");
});
function Ft(e4) {
  "@babel/helpers - typeof";
  return Ft = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t4) {
    return typeof t4;
  } : function(t4) {
    return t4 && typeof Symbol == "function" && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
  }, Ft(e4);
}
var ta = C$1(() => {
  o$1(Ft, "_typeof");
});
function nc(e4, t4) {
  if (Ft(e4) != "object" || !e4) return e4;
  var r4 = e4[Symbol.toPrimitive];
  if (r4 !== void 0) {
    var n4 = r4.call(e4, t4 || "default");
    if (Ft(n4) != "object") return n4;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t4 === "string" ? String : Number)(e4);
}
var oc = C$1(() => {
  ta();
  o$1(nc, "toPrimitive");
});
function ac(e4) {
  var t4 = nc(e4, "string");
  return Ft(t4) == "symbol" ? t4 : t4 + "";
}
var ic = C$1(() => {
  ta();
  oc();
  o$1(ac, "toPropertyKey");
});
function On(e4, t4, r4) {
  return (t4 = ac(t4)) in e4 ? Object.defineProperty(e4, t4, {
    value: r4,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e4[t4] = r4, e4;
}
var ra = C$1(() => {
  ic();
  o$1(On, "_defineProperty");
});
function lc(e4, t4) {
  var r4 = Object.keys(e4);
  if (Object.getOwnPropertySymbols) {
    var n4 = Object.getOwnPropertySymbols(e4);
    t4 && (n4 = n4.filter(function(a4) {
      return Object.getOwnPropertyDescriptor(e4, a4).enumerable;
    })), r4.push.apply(r4, n4);
  }
  return r4;
}
function fr(e4) {
  for (var t4 = 1; t4 < arguments.length; t4++) {
    var r4 = arguments[t4] != null ? arguments[t4] : {};
    t4 % 2 ? lc(Object(r4), true).forEach(function(n4) {
      On(e4, n4, r4[n4]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(r4)) : lc(Object(r4)).forEach(function(n4) {
      Object.defineProperty(e4, n4, Object.getOwnPropertyDescriptor(r4, n4));
    });
  }
  return e4;
}
function d2(e4) {
  var t4 = e4.length;
  if (t4 === 0 || t4 === 1) return e4;
  if (t4 === 2)
    return [e4[0], e4[1], "".concat(e4[0], ".").concat(e4[1]), "".concat(e4[1], ".").concat(e4[0])];
  if (t4 === 3)
    return [e4[0], e4[1], e4[2], "".concat(e4[0], ".").concat(e4[1]), "".concat(e4[0], ".").concat(e4[2]), "".concat(e4[1], ".").concat(e4[0]), "".concat(
      e4[1],
      "."
    ).concat(e4[2]), "".concat(e4[2], ".").concat(e4[0]), "".concat(e4[2], ".").concat(e4[1]), "".concat(e4[0], ".").concat(e4[1], ".").concat(
      e4[2]
    ), "".concat(e4[0], ".").concat(e4[2], ".").concat(e4[1]), "".concat(e4[1], ".").concat(e4[0], ".").concat(e4[2]), "".concat(e4[1], ".").concat(
      e4[2],
      "."
    ).concat(e4[0]), "".concat(e4[2], ".").concat(e4[0], ".").concat(e4[1]), "".concat(e4[2], ".").concat(e4[1], ".").concat(e4[0])];
  if (t4 >= 4)
    return [
      e4[0],
      e4[1],
      e4[2],
      e4[3],
      "".concat(e4[0], ".").concat(e4[1]),
      "".concat(e4[0], ".").concat(e4[2]),
      "".concat(e4[0], ".").concat(e4[3]),
      "".concat(e4[1], ".").concat(e4[0]),
      "".concat(e4[1], ".").concat(e4[2]),
      "".concat(e4[1], ".").concat(e4[3]),
      "".concat(e4[2], ".").concat(e4[0]),
      "".concat(e4[2], ".").concat(e4[1]),
      "".concat(e4[2], ".").concat(e4[3]),
      "".concat(e4[3], ".").concat(e4[0]),
      "".concat(e4[3], ".").concat(e4[1]),
      "".concat(e4[3], ".").concat(e4[2]),
      "".concat(e4[0], ".").concat(e4[1], ".").concat(e4[2]),
      "".concat(e4[0], ".").concat(e4[1], ".").concat(e4[3]),
      "".concat(e4[0], ".").concat(e4[2], ".").concat(e4[1]),
      "".concat(e4[0], ".").concat(e4[2], ".").concat(e4[3]),
      "".concat(e4[0], ".").concat(
        e4[3],
        "."
      ).concat(e4[1]),
      "".concat(e4[0], ".").concat(e4[3], ".").concat(e4[2]),
      "".concat(e4[1], ".").concat(e4[0], ".").concat(e4[2]),
      "".concat(
        e4[1],
        "."
      ).concat(e4[0], ".").concat(e4[3]),
      "".concat(e4[1], ".").concat(e4[2], ".").concat(e4[0]),
      "".concat(e4[1], ".").concat(e4[2], ".").concat(
        e4[3]
      ),
      "".concat(e4[1], ".").concat(e4[3], ".").concat(e4[0]),
      "".concat(e4[1], ".").concat(e4[3], ".").concat(e4[2]),
      "".concat(e4[2], ".").concat(
        e4[0],
        "."
      ).concat(e4[1]),
      "".concat(e4[2], ".").concat(e4[0], ".").concat(e4[3]),
      "".concat(e4[2], ".").concat(e4[1], ".").concat(e4[0]),
      "".concat(
        e4[2],
        "."
      ).concat(e4[1], ".").concat(e4[3]),
      "".concat(e4[2], ".").concat(e4[3], ".").concat(e4[0]),
      "".concat(e4[2], ".").concat(e4[3], ".").concat(
        e4[1]
      ),
      "".concat(e4[3], ".").concat(e4[0], ".").concat(e4[1]),
      "".concat(e4[3], ".").concat(e4[0], ".").concat(e4[2]),
      "".concat(e4[3], ".").concat(
        e4[1],
        "."
      ).concat(e4[0]),
      "".concat(e4[3], ".").concat(e4[1], ".").concat(e4[2]),
      "".concat(e4[3], ".").concat(e4[2], ".").concat(e4[0]),
      "".concat(
        e4[3],
        "."
      ).concat(e4[2], ".").concat(e4[1]),
      "".concat(e4[0], ".").concat(e4[1], ".").concat(e4[2], ".").concat(e4[3]),
      "".concat(e4[0], ".").concat(
        e4[1],
        "."
      ).concat(e4[3], ".").concat(e4[2]),
      "".concat(e4[0], ".").concat(e4[2], ".").concat(e4[1], ".").concat(e4[3]),
      "".concat(e4[0], ".").concat(
        e4[2],
        "."
      ).concat(e4[3], ".").concat(e4[1]),
      "".concat(e4[0], ".").concat(e4[3], ".").concat(e4[1], ".").concat(e4[2]),
      "".concat(e4[0], ".").concat(
        e4[3],
        "."
      ).concat(e4[2], ".").concat(e4[1]),
      "".concat(e4[1], ".").concat(e4[0], ".").concat(e4[2], ".").concat(e4[3]),
      "".concat(e4[1], ".").concat(
        e4[0],
        "."
      ).concat(e4[3], ".").concat(e4[2]),
      "".concat(e4[1], ".").concat(e4[2], ".").concat(e4[0], ".").concat(e4[3]),
      "".concat(e4[1], ".").concat(
        e4[2],
        "."
      ).concat(e4[3], ".").concat(e4[0]),
      "".concat(e4[1], ".").concat(e4[3], ".").concat(e4[0], ".").concat(e4[2]),
      "".concat(e4[1], ".").concat(
        e4[3],
        "."
      ).concat(e4[2], ".").concat(e4[0]),
      "".concat(e4[2], ".").concat(e4[0], ".").concat(e4[1], ".").concat(e4[3]),
      "".concat(e4[2], ".").concat(
        e4[0],
        "."
      ).concat(e4[3], ".").concat(e4[1]),
      "".concat(e4[2], ".").concat(e4[1], ".").concat(e4[0], ".").concat(e4[3]),
      "".concat(e4[2], ".").concat(
        e4[1],
        "."
      ).concat(e4[3], ".").concat(e4[0]),
      "".concat(e4[2], ".").concat(e4[3], ".").concat(e4[0], ".").concat(e4[1]),
      "".concat(e4[2], ".").concat(
        e4[3],
        "."
      ).concat(e4[1], ".").concat(e4[0]),
      "".concat(e4[3], ".").concat(e4[0], ".").concat(e4[1], ".").concat(e4[2]),
      "".concat(e4[3], ".").concat(
        e4[0],
        "."
      ).concat(e4[2], ".").concat(e4[1]),
      "".concat(e4[3], ".").concat(e4[1], ".").concat(e4[0], ".").concat(e4[2]),
      "".concat(e4[3], ".").concat(
        e4[1],
        "."
      ).concat(e4[2], ".").concat(e4[0]),
      "".concat(e4[3], ".").concat(e4[2], ".").concat(e4[0], ".").concat(e4[1]),
      "".concat(e4[3], ".").concat(
        e4[2],
        "."
      ).concat(e4[1], ".").concat(e4[0])
    ];
}
function p2(e4) {
  if (e4.length === 0 || e4.length === 1) return e4;
  var t4 = e4.join(".");
  return na[t4] || (na[t4] = d2(e4)), na[t4];
}
function m2(e4) {
  var t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r4 = arguments.length > 2 ? arguments[2] : void 0, n4 = e4.filter(
    function(i4) {
      return i4 !== "token";
    }
  ), a4 = p2(n4);
  return a4.reduce(function(i4, c2) {
    return fr(fr({}, i4), r4[c2]);
  }, t4);
}
function cc(e4) {
  return e4.join(" ");
}
function h2(e4, t4) {
  var r4 = 0;
  return function(n4) {
    return r4 += 1, n4.map(function(a4, i4) {
      return _t({
        node: a4,
        stylesheet: e4,
        useInlineStyles: t4,
        key: "code-segment-".concat(r4, "-").concat(i4)
      });
    });
  };
}
function _t(e$1) {
  var t4 = e$1.node, r4 = e$1.stylesheet, n4 = e$1.style, a4 = n4 === void 0 ? {} : n4, i4 = e$1.useInlineStyles, c2 = e$1.key, l2 = t4.properties, s2 = t4.type, u2 = t4.tagName, f2 = t4.value;
  if (s2 === "text")
    return f2;
  if (u2) {
    var d4 = h2(r4, i4), m4;
    if (!i4)
      m4 = fr(fr({}, l2), {}, {
        className: cc(l2.className)
      });
    else {
      var v3 = Object.keys(r4).reduce(function(g4, w3) {
        return w3.split(".").forEach(function(b3) {
          g4.includes(b3) || g4.push(b3);
        }), g4;
      }, []), R3 = l2.className && l2.className.includes("token") ? ["token"] : [], p4 = l2.className && R3.concat(l2.className.filter(function(g4) {
        return !v3.includes(g4);
      }));
      m4 = fr(fr({}, l2), {}, {
        className: cc(p4) || void 0,
        style: m2(l2.className, Object.assign({}, l2.style, a4), r4)
      });
    }
    var h4 = d4(t4.children);
    return /* @__PURE__ */ e.createElement(u2, W$1({
      key: c2
    }, m4), h4);
  }
}
var na, oa = C$1(() => {
  Yr();
  ra();
  o$1(lc, "ownKeys");
  o$1(fr, "_objectSpread");
  o$1(d2, "powerSetPermutations");
  na = {};
  o$1(p2, "getClassNameCombinations");
  o$1(m2, "createStyleObject");
  o$1(cc, "createClassNameString");
  o$1(h2, "createChildren");
  o$1(_t, "createElement");
});
var sc, uc = C$1(() => {
  sc = /* @__PURE__ */ o$1(function(e4, t4) {
    var r4 = e4.listLanguages();
    return r4.indexOf(t4) !== -1;
  }, "default");
});
function fc(e4, t4) {
  var r4 = Object.keys(e4);
  if (Object.getOwnPropertySymbols) {
    var n4 = Object.getOwnPropertySymbols(e4);
    t4 && (n4 = n4.filter(function(a4) {
      return Object.getOwnPropertyDescriptor(e4, a4).enumerable;
    })), r4.push.apply(r4, n4);
  }
  return r4;
}
function bt(e4) {
  for (var t4 = 1; t4 < arguments.length; t4++) {
    var r4 = arguments[t4] != null ? arguments[t4] : {};
    t4 % 2 ? fc(Object(r4), true).forEach(function(n4) {
      On(e4, n4, r4[n4]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(r4)) : fc(Object(r4)).forEach(function(n4) {
      Object.defineProperty(e4, n4, Object.getOwnPropertyDescriptor(r4, n4));
    });
  }
  return e4;
}
function w2(e4) {
  return e4.match(v2);
}
function b2(e$1) {
  var t4 = e$1.lines, r4 = e$1.startingLineNumber, n4 = e$1.style;
  return t4.map(function(a4, i4) {
    var c2 = i4 + r4;
    return /* @__PURE__ */ e.createElement("span", {
      key: "line-".concat(i4),
      className: "react-syntax-highlighter-line-number",
      style: typeof n4 == "function" ? n4(c2) : n4
    }, "".concat(c2, `
`));
  });
}
function R2(e$1) {
  var t4 = e$1.codeString, r4 = e$1.codeStyle, n4 = e$1.containerStyle, a4 = n4 === void 0 ? {
    float: "left",
    paddingRight: "10px"
  } : n4, i4 = e$1.numberStyle, c2 = i4 === void 0 ? {} : i4, l2 = e$1.startingLineNumber;
  return /* @__PURE__ */ e.createElement("code", {
    style: Object.assign({}, r4, a4)
  }, b2({
    lines: t4.replace(/\n$/, "").split(`
`),
    style: c2,
    startingLineNumber: l2
  }));
}
function y2(e4) {
  return "".concat(e4.toString().length, ".25em");
}
function dc(e4, t4) {
  return {
    type: "element",
    tagName: "span",
    properties: {
      key: "line-number--".concat(e4),
      className: ["comment", "linenumber", "react-syntax-highlighter-line-number"],
      style: t4
    },
    children: [{
      type: "text",
      value: e4
    }]
  };
}
function pc(e4, t4, r4) {
  var n4 = {
    display: "inline-block",
    minWidth: y2(r4),
    paddingRight: "1em",
    textAlign: "right",
    userSelect: "none"
  }, a4 = typeof e4 == "function" ? e4(t4) : e4, i4 = bt(bt({}, n4), a4);
  return i4;
}
function Bn(e4) {
  var t4 = e4.children, r4 = e4.lineNumber, n4 = e4.lineNumberStyle, a4 = e4.largestLineNumber, i4 = e4.showInlineLineNumbers, c2 = e4.lineProps, l2 = c2 === void 0 ? {} : c2, s2 = e4.className, u2 = s2 === void 0 ? [] : s2, f2 = e4.showLineNumbers, d4 = e4.wrapLongLines, m4 = e4.wrapLines, v3 = m4 === void 0 ? false : m4, R3 = v3 ? bt({}, typeof l2 == "function" ? l2(r4) : l2) : {};
  if (R3.className = R3.className ? [].concat(kn(R3.className.trim().split(/\s+/)), kn(u2)) : u2, r4 && i4) {
    var p4 = pc(n4, r4, a4);
    t4.unshift(dc(r4, p4));
  }
  return d4 & f2 && (R3.style = bt({
    display: "flex"
  }, R3.style)), {
    type: "element",
    tagName: "span",
    properties: R3,
    children: t4
  };
}
function mc(e4) {
  for (var t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], n4 = 0; n4 < e4.length; n4++) {
    var a4 = e4[n4];
    if (a4.type === "text")
      r4.push(Bn({
        children: [a4],
        className: kn(new Set(t4))
      }));
    else if (a4.children) {
      var i4 = t4.concat(a4.properties.className);
      mc(a4.children, i4).forEach(function(c2) {
        return r4.push(c2);
      });
    }
  }
  return r4;
}
function x2(e4, t4, r4, n4, a4, i4, c2, l2, s2) {
  var u2, f2 = mc(e4.value), d4 = [], m4 = -1, v3 = 0;
  function R3(E4, y4) {
    var S4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return Bn({
      children: E4,
      lineNumber: y4,
      lineNumberStyle: l2,
      largestLineNumber: c2,
      showInlineLineNumbers: a4,
      lineProps: r4,
      className: S4,
      showLineNumbers: n4,
      wrapLongLines: s2,
      wrapLines: t4
    });
  }
  o$1(R3, "createWrappedLine");
  function p4(E4, y4) {
    if (n4 && y4 && a4) {
      var S4 = pc(l2, y4, c2);
      E4.unshift(dc(y4, S4));
    }
    return E4;
  }
  o$1(p4, "createUnwrappedLine");
  function h4(E4, y4) {
    var S4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return t4 || S4.length > 0 ? R3(E4, y4, S4) : p4(E4, y4);
  }
  o$1(h4, "createLine");
  for (var g4 = /* @__PURE__ */ o$1(function() {
    var y4 = f2[v3], S4 = y4.children[0].value, L2 = w2(S4);
    if (L2) {
      var M2 = S4.split(`
`);
      M2.forEach(function(A3, P2) {
        var _2 = n4 && d4.length + i4, F2 = {
          type: "text",
          value: "".concat(A3, `
`)
        };
        if (P2 === 0) {
          var K2 = f2.slice(m4 + 1, v3).concat(Bn({
            children: [F2],
            className: y4.properties.className
          })), T2 = h4(K2, _2);
          d4.push(T2);
        } else if (P2 === M2.length - 1) {
          var z2 = f2[v3 + 1] && f2[v3 + 1].children && f2[v3 + 1].children[0], k2 = {
            type: "text",
            value: "".concat(A3)
          };
          if (z2) {
            var V2 = Bn({
              children: [k2],
              className: y4.properties.className
            });
            f2.splice(v3 + 1, 0, V2);
          } else {
            var D2 = [k2], j2 = h4(D2, _2, y4.properties.className);
            d4.push(j2);
          }
        } else {
          var O2 = [F2], G2 = h4(O2, _2, y4.properties.className);
          d4.push(G2);
        }
      }), m4 = v3;
    }
    v3++;
  }, "_loop"); v3 < f2.length; )
    g4();
  if (m4 !== f2.length - 1) {
    var w3 = f2.slice(m4 + 1, f2.length);
    if (w3 && w3.length) {
      var b3 = n4 && d4.length + i4, x4 = h4(w3, b3);
      d4.push(x4);
    }
  }
  return t4 ? d4 : (u2 = []).concat.apply(u2, d4);
}
function E2(e4) {
  var t4 = e4.rows, r4 = e4.stylesheet, n4 = e4.useInlineStyles;
  return t4.map(function(a4, i4) {
    return _t({
      node: a4,
      stylesheet: r4,
      useInlineStyles: n4,
      key: "code-segement".concat(i4)
    });
  });
}
function hc(e4) {
  return e4 && typeof e4.highlightAuto < "u";
}
function S2(e4) {
  var t4 = e4.astGenerator, r4 = e4.language, n4 = e4.code, a4 = e4.defaultCodeValue;
  if (hc(t4)) {
    var i4 = sc(t4, r4);
    return r4 === "text" ? {
      value: a4,
      language: "text"
    } : i4 ? t4.highlight(r4, n4) : t4.highlightAuto(n4);
  }
  try {
    return r4 && r4 !== "text" ? {
      value: t4.highlight(n4, r4)
    } : {
      value: a4
    };
  } catch {
    return {
      value: a4
    };
  }
}
function aa(e$1, t4) {
  return /* @__PURE__ */ o$1(function(n4) {
    var a4 = n4.language, i4 = n4.children, c2 = n4.style, l2 = c2 === void 0 ? t4 : c2, s2 = n4.customStyle, u2 = s2 === void 0 ? {} : s2, f2 = n4.codeTagProps, d4 = f2 === void 0 ? {
      className: a4 ? "language-".concat(a4) : void 0,
      style: bt(bt({}, l2['code[class*="language-"]']), l2['code[class*="language-'.concat(a4, '"]')])
    } : f2, m4 = n4.useInlineStyles, v3 = m4 === void 0 ? true : m4, R3 = n4.showLineNumbers, p4 = R3 === void 0 ? false : R3, h4 = n4.showInlineLineNumbers, g4 = h4 === void 0 ? true : h4, w3 = n4.startingLineNumber, b3 = w3 === void 0 ? 1 : w3, x4 = n4.lineNumberContainerStyle, E4 = n4.lineNumberStyle, y4 = E4 === void 0 ? {} : E4, S4 = n4.wrapLines, L2 = n4.wrapLongLines, M2 = L2 === void 0 ? false : L2, A3 = n4.lineProps, P2 = A3 === void 0 ? {} : A3, _2 = n4.renderer, F2 = n4.PreTag, K2 = F2 === void 0 ? "pre" : F2, T2 = n4.CodeTag, z2 = T2 === void 0 ? "code" : T2, k2 = n4.code, V2 = k2 === void 0 ? (Array.isArray(i4) ? i4[0] : i4) || "" : k2, D2 = n4.astGenerator, j2 = ql(n4, g2);
    D2 = D2 || e$1;
    var O2 = p4 ? /* @__PURE__ */ e.createElement(R2, {
      containerStyle: x4,
      codeStyle: d4.style || {},
      numberStyle: y4,
      startingLineNumber: b3,
      codeString: V2
    }) : null, G2 = l2.hljs || l2['pre[class*="language-"]'] || {
      backgroundColor: "#fff"
    }, Ee2 = hc(D2) ? "hljs" : "prismjs", pe2 = v3 ? Object.assign({}, j2, {
      style: Object.assign({}, G2, u2)
    }) : Object.assign({}, j2, {
      className: j2.className ? "".concat(Ee2, " ").concat(j2.className) : Ee2,
      style: Object.assign({}, u2)
    });
    if (M2 ? d4.style = bt({
      whiteSpace: "pre-wrap"
    }, d4.style) : d4.style = bt({
      whiteSpace: "pre"
    }, d4.style), !D2)
      return /* @__PURE__ */ e.createElement(K2, pe2, O2, /* @__PURE__ */ e.createElement(z2, d4, V2));
    (S4 === void 0 && _2 || M2) && (S4 = true), _2 = _2 || E2;
    var se2 = [{
      type: "text",
      value: V2
    }], ue2 = S2({
      astGenerator: D2,
      language: a4,
      code: V2,
      defaultCodeValue: se2
    });
    ue2.language === null && (ue2.value = se2);
    var ve2 = ue2.value.length;
    ve2 === 1 && ue2.value[0].type === "text" && (ve2 = ue2.value[0].value.split(`
`).length);
    var Se2 = ve2 + b3, Ot2 = x2(ue2, S4, P2, p4, g4, b3, Se2, y4, M2);
    return /* @__PURE__ */ e.createElement(K2, pe2, /* @__PURE__ */ e.createElement(z2, d4, !g4 && O2, _2({
      rows: Ot2,
      stylesheet: l2,
      useInlineStyles: v3
    })));
  }, "SyntaxHighlighter");
}
var g2, v2, gc = C$1(() => {
  Gl();
  rc();
  ra();
  oa();
  uc();
  g2 = ["language", "children", "style", "customStyle", "codeTagProps", "useInlineStyles", "showLineNumbers", "showInlineLineNumbers", "startingLineNumber", "lineNumberContainerStyle", "lineNumberStyle", "wrapLines", "wrapLongLines", "lineProps", "renderer", "PreTag", "CodeTag", "code", "astGenerator"];
  o$1(fc, "ownKeys");
  o$1(bt, "_objectSpread");
  v2 = /\n/g;
  o$1(w2, "getNewLines");
  o$1(b2, "getAllLineNumbers");
  o$1(R2, "AllLineNumbers");
  o$1(y2, "getEmWidthOfNumber");
  o$1(dc, "getInlineLineNumber");
  o$1(pc, "assembleLineNumberStyles");
  o$1(Bn, "createLineElement");
  o$1(mc, "flattenCodeTree");
  o$1(x2, "processLines");
  o$1(E2, "defaultRenderer");
  o$1(hc, "isHighlightJs");
  o$1(S2, "getCodeTree");
  o$1(aa, "default");
});
var wc = H$1((yb, vc) => {
  vc.exports = M2;
  var C2 = Object.prototype.hasOwnProperty;
  function M2() {
    for (var e4 = {}, t4 = 0; t4 < arguments.length; t4++) {
      var r4 = arguments[t4];
      for (var n4 in r4)
        C2.call(r4, n4) && (e4[n4] = r4[n4]);
    }
    return e4;
  }
  o$1(M2, "extend");
});
var la = H$1((Eb, Rc) => {
  Rc.exports = bc;
  var ia2 = bc.prototype;
  ia2.space = null;
  ia2.normal = {};
  ia2.property = {};
  function bc(e4, t4, r4) {
    this.property = e4, this.normal = t4, r4 && (this.space = r4);
  }
  o$1(bc, "Schema");
});
var Ec = H$1((Cb, xc) => {
  var yc = wc(), L2 = la();
  xc.exports = A22;
  function A22(e4) {
    for (var t4 = e4.length, r4 = [], n4 = [], a4 = -1, i4, c2; ++a4 < t4; )
      i4 = e4[a4], r4.push(i4.property), n4.push(i4.normal), c2 = i4.space;
    return new L2(
      yc.apply(null, r4),
      yc.apply(null, n4),
      c2
    );
  }
  o$1(A22, "merge");
});
var Nn = H$1((Lb, Sc) => {
  Sc.exports = I2;
  function I2(e4) {
    return e4.toLowerCase();
  }
  o$1(I2, "normalize");
});
var ca = H$1((Ib, Mc) => {
  Mc.exports = Cc;
  var De2 = Cc.prototype;
  De2.space = null;
  De2.attribute = null;
  De2.property = null;
  De2.boolean = false;
  De2.booleanish = false;
  De2.overloadedBoolean = false;
  De2.number = false;
  De2.commaSeparated = false;
  De2.spaceSeparated = false;
  De2.commaOrSpaceSeparated = false;
  De2.mustUseProperty = false;
  De2.defined = false;
  function Cc(e4, t4) {
    this.property = e4, this.attribute = t4;
  }
  o$1(Cc, "Info");
});
var Dn = H$1((Rt2) => {
  var z2 = 0;
  Rt2.boolean = Vt();
  Rt2.booleanish = Vt();
  Rt2.overloadedBoolean = Vt();
  Rt2.number = Vt();
  Rt2.spaceSeparated = Vt();
  Rt2.commaSeparated = Vt();
  Rt2.commaOrSpaceSeparated = Vt();
  function Vt() {
    return Math.pow(2, ++z2);
  }
  o$1(Vt, "increment");
});
var ua = H$1((Pb, Tc) => {
  var Ic = ca(), Lc = Dn();
  Tc.exports = sa;
  sa.prototype = new Ic();
  sa.prototype.defined = true;
  var zc = [
    "boolean",
    "booleanish",
    "overloadedBoolean",
    "number",
    "commaSeparated",
    "spaceSeparated",
    "commaOrSpaceSeparated"
  ], T2 = zc.length;
  function sa(e4, t4, r4, n4) {
    var a4 = -1, i4;
    for (Ac(this, "space", n4), Ic.call(this, e4, t4); ++a4 < T2; )
      i4 = zc[a4], Ac(this, i4, (r4 & Lc[i4]) === Lc[i4]);
  }
  o$1(sa, "DefinedInfo");
  function Ac(e4, t4, r4) {
    r4 && (e4[t4] = r4);
  }
  o$1(Ac, "mark");
});
var dr = H$1((Ob, Pc) => {
  var Hc = Nn(), H2 = la(), P2 = ua();
  Pc.exports = k2;
  function k2(e4) {
    var t4 = e4.space, r4 = e4.mustUseProperty || [], n4 = e4.attributes || {}, a4 = e4.properties, i4 = e4.transform, c2 = {}, l2 = {}, s2, u2;
    for (s2 in a4)
      u2 = new P2(
        s2,
        i4(n4, s2),
        a4[s2],
        t4
      ), r4.indexOf(s2) !== -1 && (u2.mustUseProperty = true), c2[s2] = u2, l2[Hc(s2)] = s2, l2[Hc(u2.attribute)] = s2;
    return new H2(c2, l2, t4);
  }
  o$1(k2, "create");
});
var Oc = H$1((Nb, kc) => {
  var O2 = dr();
  kc.exports = O2({
    space: "xlink",
    transform: B2,
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    }
  });
  function B2(e4, t4) {
    return "xlink:" + t4.slice(5).toLowerCase();
  }
  o$1(B2, "xlinkTransform");
});
var Nc = H$1((Fb, Bc) => {
  var N2 = dr();
  Bc.exports = N2({
    space: "xml",
    transform: D2,
    properties: {
      xmlLang: null,
      xmlBase: null,
      xmlSpace: null
    }
  });
  function D2(e4, t4) {
    return "xml:" + t4.slice(3).toLowerCase();
  }
  o$1(D2, "xmlTransform");
});
var Fc = H$1(($b, Dc) => {
  Dc.exports = F2;
  function F2(e4, t4) {
    return t4 in e4 ? e4[t4] : t4;
  }
  o$1(F2, "caseSensitiveTransform");
});
var fa = H$1((jb, _c) => {
  var _2 = Fc();
  _c.exports = $2;
  function $2(e4, t4) {
    return _2(e4, t4.toLowerCase());
  }
  o$1($2, "caseInsensitiveTransform");
});
var Vc = H$1((Ub, $c) => {
  var V2 = dr(), j2 = fa();
  $c.exports = V2({
    space: "xmlns",
    attributes: {
      xmlnsxlink: "xmlns:xlink"
    },
    transform: j2,
    properties: {
      xmlns: null,
      xmlnsXLink: null
    }
  });
});
var Wc = H$1((qb, jc) => {
  var da2 = Dn(), W2 = dr(), Le2 = da2.booleanish, Fe2 = da2.number, jt2 = da2.spaceSeparated;
  jc.exports = W2({
    transform: U2,
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: Le2,
      ariaAutoComplete: null,
      ariaBusy: Le2,
      ariaChecked: Le2,
      ariaColCount: Fe2,
      ariaColIndex: Fe2,
      ariaColSpan: Fe2,
      ariaControls: jt2,
      ariaCurrent: null,
      ariaDescribedBy: jt2,
      ariaDetails: null,
      ariaDisabled: Le2,
      ariaDropEffect: jt2,
      ariaErrorMessage: null,
      ariaExpanded: Le2,
      ariaFlowTo: jt2,
      ariaGrabbed: Le2,
      ariaHasPopup: null,
      ariaHidden: Le2,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: jt2,
      ariaLevel: Fe2,
      ariaLive: null,
      ariaModal: Le2,
      ariaMultiLine: Le2,
      ariaMultiSelectable: Le2,
      ariaOrientation: null,
      ariaOwns: jt2,
      ariaPlaceholder: null,
      ariaPosInSet: Fe2,
      ariaPressed: Le2,
      ariaReadOnly: Le2,
      ariaRelevant: null,
      ariaRequired: Le2,
      ariaRoleDescription: jt2,
      ariaRowCount: Fe2,
      ariaRowIndex: Fe2,
      ariaRowSpan: Fe2,
      ariaSelected: Le2,
      ariaSetSize: Fe2,
      ariaSort: null,
      ariaValueMax: Fe2,
      ariaValueMin: Fe2,
      ariaValueNow: Fe2,
      ariaValueText: null,
      role: null
    }
  });
  function U2(e4, t4) {
    return t4 === "role" ? t4 : "aria-" + t4.slice(4).toLowerCase();
  }
  o$1(U2, "ariaTransform");
});
var qc = H$1((Xb, Uc) => {
  var pr = Dn(), q2 = dr(), G2 = fa(), B2 = pr.boolean, X2 = pr.overloadedBoolean, Qr2 = pr.booleanish, X4 = pr.number, Re2 = pr.spaceSeparated, Fn2 = pr.commaSeparated;
  Uc.exports = q2({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv"
    },
    transform: G2,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: Fn2,
      acceptCharset: Re2,
      accessKey: Re2,
      action: null,
      allow: null,
      allowFullScreen: B2,
      allowPaymentRequest: B2,
      allowUserMedia: B2,
      alt: null,
      as: null,
      async: B2,
      autoCapitalize: null,
      autoComplete: Re2,
      autoFocus: B2,
      autoPlay: B2,
      capture: B2,
      charSet: null,
      checked: B2,
      cite: null,
      className: Re2,
      cols: X4,
      colSpan: null,
      content: null,
      contentEditable: Qr2,
      controls: B2,
      controlsList: Re2,
      coords: X4 | Fn2,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: B2,
      defer: B2,
      dir: null,
      dirName: null,
      disabled: B2,
      download: X2,
      draggable: Qr2,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: B2,
      formTarget: null,
      headers: Re2,
      height: X4,
      hidden: B2,
      high: X4,
      href: null,
      hrefLang: null,
      htmlFor: Re2,
      httpEquiv: Re2,
      id: null,
      imageSizes: null,
      imageSrcSet: Fn2,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: B2,
      itemId: null,
      itemProp: Re2,
      itemRef: Re2,
      itemScope: B2,
      itemType: Re2,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: B2,
      low: X4,
      manifest: null,
      max: null,
      maxLength: X4,
      media: null,
      method: null,
      min: null,
      minLength: X4,
      multiple: B2,
      muted: B2,
      name: null,
      nonce: null,
      noModule: B2,
      noValidate: B2,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforePrint: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextMenu: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: B2,
      optimum: X4,
      pattern: null,
      ping: Re2,
      placeholder: null,
      playsInline: B2,
      poster: null,
      preload: null,
      readOnly: B2,
      referrerPolicy: null,
      rel: Re2,
      required: B2,
      reversed: B2,
      rows: X4,
      rowSpan: X4,
      sandbox: Re2,
      scope: null,
      scoped: B2,
      seamless: B2,
      selected: B2,
      shape: null,
      size: X4,
      sizes: null,
      slot: null,
      span: X4,
      spellCheck: Qr2,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: Fn2,
      start: X4,
      step: null,
      style: null,
      tabIndex: X4,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: B2,
      useMap: null,
      value: Qr2,
      width: X4,
      wrap: null,
      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null,
      // Several. Use CSS `text-align` instead,
      aLink: null,
      // `<body>`. Use CSS `a:active {color}` instead
      archive: Re2,
      // `<object>`. List of URIs to archives
      axis: null,
      // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null,
      // `<body>`. Use CSS `background-image` instead
      bgColor: null,
      // `<body>` and table elements. Use CSS `background-color` instead
      border: X4,
      // `<table>`. Use CSS `border-width` instead,
      borderColor: null,
      // `<table>`. Use CSS `border-color` instead,
      bottomMargin: X4,
      // `<body>`
      cellPadding: null,
      // `<table>`
      cellSpacing: null,
      // `<table>`
      char: null,
      // Several table elements. When `align=char`, sets the character to align on
      charOff: null,
      // Several table elements. When `char`, offsets the alignment
      classId: null,
      // `<object>`
      clear: null,
      // `<br>`. Use CSS `clear` instead
      code: null,
      // `<object>`
      codeBase: null,
      // `<object>`
      codeType: null,
      // `<object>`
      color: null,
      // `<font>` and `<hr>`. Use CSS instead
      compact: B2,
      // Lists. Use CSS to reduce space between items instead
      declare: B2,
      // `<object>`
      event: null,
      // `<script>`
      face: null,
      // `<font>`. Use CSS instead
      frame: null,
      // `<table>`
      frameBorder: null,
      // `<iframe>`. Use CSS `border` instead
      hSpace: X4,
      // `<img>` and `<object>`
      leftMargin: X4,
      // `<body>`
      link: null,
      // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null,
      // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null,
      // `<img>`. Use a `<picture>`
      marginHeight: X4,
      // `<body>`
      marginWidth: X4,
      // `<body>`
      noResize: B2,
      // `<frame>`
      noHref: B2,
      // `<area>`. Use no href instead of an explicit `nohref`
      noShade: B2,
      // `<hr>`. Use background-color and height instead of borders
      noWrap: B2,
      // `<td>` and `<th>`
      object: null,
      // `<applet>`
      profile: null,
      // `<head>`
      prompt: null,
      // `<isindex>`
      rev: null,
      // `<link>`
      rightMargin: X4,
      // `<body>`
      rules: null,
      // `<table>`
      scheme: null,
      // `<meta>`
      scrolling: Qr2,
      // `<frame>`. Use overflow in the child context
      standby: null,
      // `<object>`
      summary: null,
      // `<table>`
      text: null,
      // `<body>`. Use CSS `color` instead
      topMargin: X4,
      // `<body>`
      valueType: null,
      // `<param>`
      version: null,
      // `<html>`. Use a doctype.
      vAlign: null,
      // Several. Use CSS `vertical-align` instead
      vLink: null,
      // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: X4,
      // `<img>` and `<object>`
      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: B2,
      disableRemotePlayback: B2,
      prefix: null,
      property: null,
      results: X4,
      security: null,
      unselectable: null
    }
  });
});
var Xc = H$1((Yb, Gc) => {
  var Y2 = Ec(), Z2 = Oc(), K2 = Nc(), J2 = Vc(), Q2 = Wc(), e4 = qc();
  Gc.exports = Y2([K2, Z2, J2, Q2, e4]);
});
var Kc = H$1((Zb, Zc) => {
  var t4 = Nn(), r4 = ua(), n4 = ca(), pa2 = "data";
  Zc.exports = i4;
  var o4 = /^data[-\w.:]+$/i, Yc = /-[a-z]/g, a4 = /[A-Z]/g;
  function i4(e4, t7) {
    var r5 = t4(t7), n6 = t7, a5 = n4;
    return r5 in e4.normal ? e4.property[e4.normal[r5]] : (r5.length > 4 && r5.slice(0, 4) === pa2 && o4.test(t7) && (t7.charAt(4) === "-" ? n6 = l4(t7) : t7 = c4(t7), a5 = r4), new a5(n6, t7));
  }
  o$1(i4, "find");
  function l4(e4) {
    var t7 = e4.slice(5).replace(Yc, u4);
    return pa2 + t7.charAt(0).toUpperCase() + t7.slice(1);
  }
  o$1(l4, "datasetToProperty");
  function c4(e4) {
    var t7 = e4.slice(4);
    return Yc.test(t7) ? e4 : (t7 = t7.replace(a4, s4), t7.charAt(0) !== "-" && (t7 = "-" + t7), pa2 + t7);
  }
  o$1(c4, "datasetToAttribute");
  function s4(e4) {
    return "-" + e4.toLowerCase();
  }
  o$1(s4, "kebab");
  function u4(e4) {
    return e4.charAt(1).toUpperCase();
  }
  o$1(u4, "camelcase");
});
var es = H$1((Jb, Qc) => {
  Qc.exports = f4;
  var Jc = /[#.]/g;
  function f4(e4, t4) {
    for (var r4 = e4 || "", n4 = t4 || "div", a4 = {}, i4 = 0, c2, l2, s2; i4 < r4.length; )
      Jc.lastIndex = i4, s2 = Jc.exec(r4), c2 = r4.slice(i4, s2 ? s2.index : r4.length), c2 && (l2 ? l2 === "#" ? a4.id = c2 : a4.className ? a4.className.push(
        c2
      ) : a4.className = [c2] : n4 = c2, i4 += c2.length), s2 && (l2 = s2[0], i4++);
    return { type: "element", tagName: n4, properties: a4, children: [] };
  }
  o$1(f4, "parse");
});
var rs = H$1((ma2) => {
  ma2.parse = m4;
  ma2.stringify = h4;
  var ts = "", d4 = " ", p4 = /[ \t\n\r\f]+/g;
  function m4(e4) {
    var t4 = String(e4 || ts).trim();
    return t4 === ts ? [] : t4.split(p4);
  }
  o$1(m4, "parse");
  function h4(e4) {
    return e4.join(d4).trim();
  }
  o$1(h4, "stringify");
});
var os = H$1((ga2) => {
  ga2.parse = g4;
  ga2.stringify = v4;
  var ha2 = ",", ns = " ", en2 = "";
  function g4(e4) {
    for (var t4 = [], r4 = String(e4 || en2), n4 = r4.indexOf(ha2), a4 = 0, i4 = false, c2; !i4; )
      n4 === -1 && (n4 = r4.length, i4 = true), c2 = r4.slice(a4, n4).trim(), (c2 || !i4) && t4.push(c2), a4 = n4 + 1, n4 = r4.indexOf(ha2, a4);
    return t4;
  }
  o$1(g4, "parse");
  function v4(e4, t4) {
    var r4 = t4 || {}, n4 = r4.padLeft === false ? en2 : ns, a4 = r4.padRight ? ns : en2;
    return e4[e4.length - 1] === en2 && (e4 = e4.concat(en2)), e4.join(a4 + ha2 + n4).trim();
  }
  o$1(v4, "stringify");
});
var fs = H$1((o9, us) => {
  var w4 = Kc(), as = Nn(), b4 = es(), is = rs().parse, ls = os().parse;
  us.exports = y4;
  var R4 = {}.hasOwnProperty;
  function y4(e4, t4, r4) {
    var n4 = r4 ? M4(r4) : null;
    return a4;
    function a4(c2, l2) {
      var s2 = b4(c2, t4), u2 = Array.prototype.slice.call(arguments, 2), f2 = s2.tagName.toLowerCase(), d4;
      if (s2.tagName = n4 && R4.call(n4, f2) ? n4[f2] : f2, l2 && x4(l2, s2) && (u2.unshift(l2), l2 = null), l2)
        for (d4 in l2)
          i4(s2.properties, d4, l2[d4]);
      return ss(s2.children, u2), s2.tagName === "template" && (s2.content = { type: "root", children: s2.children }, s2.children = []), s2;
    }
    function i4(c2, l2, s2) {
      var u2, f2, d4;
      s2 == null || s2 !== s2 || (u2 = w4(e4, l2), f2 = u2.property, d4 = s2, typeof d4 == "string" && (u2.spaceSeparated ? d4 = is(d4) : u2.commaSeparated ? d4 = ls(d4) : u2.commaOrSpaceSeparated && (d4 = is(ls(d4).join(" ")))), f2 === "style" && typeof s2 != "string" && (d4 = C4(d4)), f2 === "className" && c2.className && (d4 = c2.className.concat(d4)), c2[f2] = S4(u2, f2, d4));
    }
  }
  o$1(y4, "factory");
  function x4(e4, t4) {
    return typeof e4 == "string" || "length" in e4 || E4(t4.tagName, e4);
  }
  o$1(x4, "isChildren");
  function E4(e4, t4) {
    var r4 = t4.type;
    return e4 === "input" || !r4 || typeof r4 != "string" ? false : typeof t4.children == "object" && "length" in t4.children ? true : (r4 = r4.toLowerCase(), e4 === "button" ? r4 !== "menu" && r4 !== "submit" && r4 !== "reset" && r4 !== "button" : "value" in t4);
  }
  o$1(E4, "isNode");
  function ss(e4, t4) {
    var r4, n4;
    if (typeof t4 == "string" || typeof t4 == "number") {
      e4.push({ type: "text", value: String(t4) });
      return;
    }
    if (typeof t4 == "object" && "length" in t4) {
      for (r4 = -1, n4 = t4.length; ++r4 < n4; )
        ss(e4, t4[r4]);
      return;
    }
    if (typeof t4 != "object" || !("type" in t4))
      throw new Error("Expected node, nodes, or string, got `" + t4 + "`");
    e4.push(t4);
  }
  o$1(ss, "addChild");
  function S4(e4, t4, r4) {
    var n4, a4, i4;
    if (typeof r4 != "object" || !("length" in r4))
      return cs(e4, t4, r4);
    for (a4 = r4.length, n4 = -1, i4 = []; ++n4 < a4; )
      i4[n4] = cs(e4, t4, r4[n4]);
    return i4;
  }
  o$1(S4, "parsePrimitives");
  function cs(e4, t4, r4) {
    var n4 = r4;
    return e4.number || e4.positiveNumber ? !isNaN(n4) && n4 !== "" && (n4 = Number(n4)) : (e4.boolean || e4.overloadedBoolean) && typeof n4 == "string" && (n4 === "" || as(r4) === as(t4)) && (n4 = true), n4;
  }
  o$1(cs, "parsePrimitive");
  function C4(e4) {
    var t4 = [], r4;
    for (r4 in e4)
      t4.push([r4, e4[r4]].join(": "));
    return t4.join("; ");
  }
  o$1(C4, "style");
  function M4(e4) {
    for (var t4 = e4.length, r4 = -1, n4 = {}, a4; ++r4 < t4; )
      a4 = e4[r4], n4[a4.toLowerCase()] = a4;
    return n4;
  }
  o$1(M4, "createAdjustMap");
});
var ms = H$1((i9, ps) => {
  var L4 = Xc(), A4 = fs(), ds = A4(L4, "div");
  ds.displayName = "html";
  ps.exports = ds;
});
var gs = H$1((l9, hs) => {
  hs.exports = ms();
});
var vs = H$1((c9, I4) => {
  I4.exports = {
    AElig: "Æ",
    AMP: "&",
    Aacute: "Á",
    Acirc: "Â",
    Agrave: "À",
    Aring: "Å",
    Atilde: "Ã",
    Auml: "Ä",
    COPY: "©",
    Ccedil: "Ç",
    ETH: "Ð",
    Eacute: "É",
    Ecirc: "Ê",
    Egrave: "È",
    Euml: "Ë",
    GT: ">",
    Iacute: "Í",
    Icirc: "Î",
    Igrave: "Ì",
    Iuml: "Ï",
    LT: "<",
    Ntilde: "Ñ",
    Oacute: "Ó",
    Ocirc: "Ô",
    Ograve: "Ò",
    Oslash: "Ø",
    Otilde: "Õ",
    Ouml: "Ö",
    QUOT: '"',
    REG: "®",
    THORN: "Þ",
    Uacute: "Ú",
    Ucirc: "Û",
    Ugrave: "Ù",
    Uuml: "Ü",
    Yacute: "Ý",
    aacute: "á",
    acirc: "â",
    acute: "´",
    aelig: "æ",
    agrave: "à",
    amp: "&",
    aring: "å",
    atilde: "ã",
    auml: "ä",
    brvbar: "¦",
    ccedil: "ç",
    cedil: "¸",
    cent: "¢",
    copy: "©",
    curren: "¤",
    deg: "°",
    divide: "÷",
    eacute: "é",
    ecirc: "ê",
    egrave: "è",
    eth: "ð",
    euml: "ë",
    frac12: "½",
    frac14: "¼",
    frac34: "¾",
    gt: ">",
    iacute: "í",
    icirc: "î",
    iexcl: "¡",
    igrave: "ì",
    iquest: "¿",
    iuml: "ï",
    laquo: "«",
    lt: "<",
    macr: "¯",
    micro: "µ",
    middot: "·",
    nbsp: " ",
    not: "¬",
    ntilde: "ñ",
    oacute: "ó",
    ocirc: "ô",
    ograve: "ò",
    ordf: "ª",
    ordm: "º",
    oslash: "ø",
    otilde: "õ",
    ouml: "ö",
    para: "¶",
    plusmn: "±",
    pound: "£",
    quot: '"',
    raquo: "»",
    reg: "®",
    sect: "§",
    shy: "­",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    szlig: "ß",
    thorn: "þ",
    times: "×",
    uacute: "ú",
    ucirc: "û",
    ugrave: "ù",
    uml: "¨",
    uuml: "ü",
    yacute: "ý",
    yen: "¥",
    yuml: "ÿ"
  };
});
var ws = H$1((s9, z4) => {
  z4.exports = {
    "0": "�",
    "128": "€",
    "130": "‚",
    "131": "ƒ",
    "132": "„",
    "133": "…",
    "134": "†",
    "135": "‡",
    "136": "ˆ",
    "137": "‰",
    "138": "Š",
    "139": "‹",
    "140": "Œ",
    "142": "Ž",
    "145": "‘",
    "146": "’",
    "147": "“",
    "148": "”",
    "149": "•",
    "150": "–",
    "151": "—",
    "152": "˜",
    "153": "™",
    "154": "š",
    "155": "›",
    "156": "œ",
    "158": "ž",
    "159": "Ÿ"
  };
});
var va = H$1((u9, bs) => {
  bs.exports = T4;
  function T4(e4) {
    var t4 = typeof e4 == "string" ? e4.charCodeAt(0) : e4;
    return t4 >= 48 && t4 <= 57;
  }
  o$1(T4, "decimal");
});
var ys = H$1((d9, Rs) => {
  Rs.exports = H4;
  function H4(e4) {
    var t4 = typeof e4 == "string" ? e4.charCodeAt(0) : e4;
    return t4 >= 97 && t4 <= 102 || t4 >= 65 && t4 <= 70 || t4 >= 48 && t4 <= 57;
  }
  o$1(H4, "hexadecimal");
});
var Es = H$1((m9, xs) => {
  xs.exports = P4;
  function P4(e4) {
    var t4 = typeof e4 == "string" ? e4.charCodeAt(0) : e4;
    return t4 >= 97 && t4 <= 122 || t4 >= 65 && t4 <= 90;
  }
  o$1(P4, "alphabetical");
});
var Cs = H$1((g9, Ss) => {
  var k4 = Es(), O4 = va();
  Ss.exports = B4;
  function B4(e4) {
    return k4(e4) || O4(e4);
  }
  o$1(B4, "alphanumerical");
});
var Ls = H$1((w9, Ms) => {
  var _n2, N4 = 59;
  Ms.exports = D4;
  function D4(e4) {
    var t4 = "&" + e4 + ";", r4;
    return _n2 = _n2 || document.createElement("i"), _n2.innerHTML = t4, r4 = _n2.textContent, r4.charCodeAt(r4.length - 1) === N4 && e4 !== "semi" || r4 === t4 ? false : r4;
  }
  o$1(D4, "decodeEntity");
});
var $s = H$1((R9, _s) => {
  var As = vs(), Is = ws(), F4 = va(), _4 = ys(), Ps = Cs(), $4 = Ls();
  _s.exports = em;
  var V4 = {}.hasOwnProperty, mr2 = String.fromCharCode, j4 = Function.prototype, zs = {
    warning: null,
    reference: null,
    text: null,
    warningContext: null,
    referenceContext: null,
    textContext: null,
    position: {},
    additional: null,
    attribute: false,
    nonTerminated: true
  }, W4 = 9, Ts = 10, U4 = 12, q4 = 32, Hs = 38, G4 = 59, X4 = 60, Y4 = 61, Z4 = 35, K4 = 88, J4 = 120, Q4 = 65533, hr2 = "named", ba2 = "hexadecimal", Ra2 = "decimal", ya2 = {};
  ya2[ba2] = 16;
  ya2[Ra2] = 10;
  var $n = {};
  $n[hr2] = Ps;
  $n[Ra2] = F4;
  $n[ba2] = _4;
  var ks = 1, Os = 2, Bs = 3, Ns = 4, Ds = 5, wa2 = 6, Fs = 7, yt2 = {};
  yt2[ks] = "Named character references must be terminated by a semicolon";
  yt2[Os] = "Numeric character references must be terminated by a semicolon";
  yt2[Bs] = "Named character references cannot be empty";
  yt2[Ns] = "Numeric character references cannot be empty";
  yt2[Ds] = "Named character references must be known";
  yt2[wa2] = "Numeric character references cannot be disallowed";
  yt2[Fs] = "Numeric character references cannot be outside the permissible Unicode range";
  function em(e4, t4) {
    var r4 = {}, n4, a4;
    t4 || (t4 = {});
    for (a4 in zs)
      n4 = t4[a4], r4[a4] = n4 ?? zs[a4];
    return (r4.position.indent || r4.position.start) && (r4.indent = r4.position.indent || [], r4.position = r4.position.start), tm(e4, r4);
  }
  o$1(em, "parseEntities");
  function tm(e4, t4) {
    var r4 = t4.additional, n4 = t4.nonTerminated, a4 = t4.text, i4 = t4.reference, c2 = t4.warning, l2 = t4.textContext, s2 = t4.referenceContext, u2 = t4.warningContext, f2 = t4.position, d4 = t4.indent || [], m4 = e4.length, v3 = 0, R3 = -1, p4 = f2.column || 1, h4 = f2.line || 1, g4 = "", w3 = [], b3, x4, E4, y4, S4, L2, M2, A3, P2, _2, F2, K2, T2, z2, k2, V2, D2, j2, O2;
    for (typeof r4 == "string" && (r4 = r4.charCodeAt(0)), V2 = G2(), A3 = c2 ? Ee2 : j4, v3--, m4++; ++v3 < m4; )
      if (S4 === Ts && (p4 = d4[R3] || 1), S4 = e4.charCodeAt(v3), S4 === Hs) {
        if (M2 = e4.charCodeAt(v3 + 1), M2 === W4 || M2 === Ts || M2 === U4 || M2 === q4 || M2 === Hs || M2 === X4 || M2 !== M2 || r4 && M2 === r4) {
          g4 += mr2(S4), p4++;
          continue;
        }
        for (T2 = v3 + 1, K2 = T2, O2 = T2, M2 === Z4 ? (O2 = ++K2, M2 = e4.charCodeAt(O2), M2 === K4 || M2 === J4 ? (z2 = ba2, O2 = ++K2) : z2 = Ra2) : z2 = hr2, b3 = "", F2 = "", y4 = "", k2 = $n[z2], O2--; ++O2 < m4 && (M2 = e4.charCodeAt(O2), !!k2(M2)); )
          y4 += mr2(M2), z2 === hr2 && V4.call(As, y4) && (b3 = y4, F2 = As[y4]);
        E4 = e4.charCodeAt(O2) === G4, E4 && (O2++, x4 = z2 === hr2 ? $4(y4) : false, x4 && (b3 = y4, F2 = x4)), j2 = 1 + O2 - T2, !E4 && !n4 || (y4 ? z2 === hr2 ? (E4 && !F2 ? A3(Ds, 1) : (b3 !== y4 && (O2 = K2 + b3.length, j2 = 1 + O2 - K2, E4 = false), E4 || (P2 = b3 ? ks : Bs, t4.attribute ? (M2 = e4.charCodeAt(O2), M2 === Y4 ? (A3(P2, j2), F2 = null) : Ps(M2) ? F2 = null : A3(P2, j2)) : A3(P2, j2))), L2 = F2) : (E4 || A3(Os, j2), L2 = parseInt(y4, ya2[z2]), rm(L2) ? (A3(Fs, j2), L2 = mr2(Q4)) : L2 in Is ? (A3(wa2, j2), L2 = Is[L2]) : (_2 = "", nm(L2) && A3(wa2, j2), L2 > 65535 && (L2 -= 65536, _2 += mr2(L2 >>> 10 | 55296), L2 = 56320 | L2 & 1023), L2 = _2 + mr2(L2))) : z2 !== hr2 && A3(Ns, j2)), L2 ? (pe2(), V2 = G2(), v3 = O2 - 1, p4 += O2 - T2 + 1, w3.push(L2), D2 = G2(), D2.offset++, i4 && i4.call(
          s2,
          L2,
          { start: V2, end: D2 },
          e4.slice(T2 - 1, O2)
        ), V2 = D2) : (y4 = e4.slice(T2 - 1, O2), g4 += y4, p4 += y4.length, v3 = O2 - 1);
      } else
        S4 === 10 && (h4++, R3++, p4 = 0), S4 === S4 ? (g4 += mr2(S4), p4++) : pe2();
    return w3.join("");
    function G2() {
      return {
        line: h4,
        column: p4,
        offset: v3 + (f2.offset || 0)
      };
    }
    function Ee2(se2, ue2) {
      var ve2 = G2();
      ve2.column += ue2, ve2.offset += ue2, c2.call(u2, yt2[se2], ve2, se2);
    }
    function pe2() {
      g4 && (w3.push(g4), a4 && a4.call(l2, g4, { start: V2, end: G2() }), g4 = "");
    }
  }
  o$1(tm, "parse");
  function rm(e4) {
    return e4 >= 55296 && e4 <= 57343 || e4 > 1114111;
  }
  o$1(rm, "prohibited");
  function nm(e4) {
    return e4 >= 1 && e4 <= 8 || e4 === 11 || e4 >= 13 && e4 <= 31 || e4 >= 127 && e4 <= 159 || e4 >= 64976 && e4 <= 65007 || (e4 & 65535) === 65535 || (e4 & 65535) === 65534;
  }
  o$1(nm, "disallowed");
});
var js = H$1((x9, Vn2) => {
  var om = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
  var Vs = function(e4) {
    var t4 = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, r4 = 0, n4 = {}, a4 = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: e4.Prism && e4.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: e4.Prism && e4.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: /* @__PURE__ */ o$1(function p4(h4) {
          return h4 instanceof i4 ? new i4(h4.type, p4(h4.content), h4.alias) : Array.isArray(h4) ? h4.map(p4) : h4.replace(/&/g, "&amp;").replace(
            /</g,
            "&lt;"
          ).replace(/\u00a0/g, " ");
        }, "encode"),
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: /* @__PURE__ */ o$1(function(p4) {
          return Object.prototype.toString.call(p4).slice(8, -1);
        }, "type"),
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: /* @__PURE__ */ o$1(function(p4) {
          return p4.__id || Object.defineProperty(p4, "__id", { value: ++r4 }), p4.__id;
        }, "objId"),
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: /* @__PURE__ */ o$1(function p4(h4, g4) {
          g4 = g4 || {};
          var w3, b3;
          switch (a4.util.type(h4)) {
            case "Object":
              if (b3 = a4.util.objId(h4), g4[b3])
                return g4[b3];
              w3 = /** @type {Record<string, any>} */
              {}, g4[b3] = w3;
              for (var x4 in h4)
                h4.hasOwnProperty(x4) && (w3[x4] = p4(h4[x4], g4));
              return (
                /** @type {any} */
                w3
              );
            case "Array":
              return b3 = a4.util.objId(h4), g4[b3] ? g4[b3] : (w3 = [], g4[b3] = w3, /** @type {Array} */
              /** @type {any} */
              h4.forEach(function(E4, y4) {
                w3[y4] = p4(E4, g4);
              }), /** @type {any} */
              w3);
            default:
              return h4;
          }
        }, "deepClone"),
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: /* @__PURE__ */ o$1(function(p4) {
          for (; p4; ) {
            var h4 = t4.exec(p4.className);
            if (h4)
              return h4[1].toLowerCase();
            p4 = p4.parentElement;
          }
          return "none";
        }, "getLanguage"),
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: /* @__PURE__ */ o$1(function(p4, h4) {
          p4.className = p4.className.replace(RegExp(t4, "gi"), ""), p4.classList.add("language-" + h4);
        }, "setLanguage"),
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: /* @__PURE__ */ o$1(function() {
          if (typeof document > "u")
            return null;
          if ("currentScript" in document)
            return (
              /** @type {any} */
              document.currentScript
            );
          try {
            throw new Error();
          } catch (w3) {
            var p4 = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(w3.stack) || [])[1];
            if (p4) {
              var h4 = document.getElementsByTagName("script");
              for (var g4 in h4)
                if (h4[g4].src == p4)
                  return h4[g4];
            }
            return null;
          }
        }, "currentScript"),
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: /* @__PURE__ */ o$1(function(p4, h4, g4) {
          for (var w3 = "no-" + h4; p4; ) {
            var b3 = p4.classList;
            if (b3.contains(h4))
              return true;
            if (b3.contains(w3))
              return false;
            p4 = p4.parentElement;
          }
          return !!g4;
        }, "isActive")
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: n4,
        plaintext: n4,
        text: n4,
        txt: n4,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: /* @__PURE__ */ o$1(function(p4, h4) {
          var g4 = a4.util.clone(a4.languages[p4]);
          for (var w3 in h4)
            g4[w3] = h4[w3];
          return g4;
        }, "extend"),
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: /* @__PURE__ */ o$1(function(p4, h4, g4, w3) {
          w3 = w3 || /** @type {any} */
          a4.languages;
          var b3 = w3[p4], x4 = {};
          for (var E4 in b3)
            if (b3.hasOwnProperty(E4)) {
              if (E4 == h4)
                for (var y4 in g4)
                  g4.hasOwnProperty(y4) && (x4[y4] = g4[y4]);
              g4.hasOwnProperty(E4) || (x4[E4] = b3[E4]);
            }
          var S4 = w3[p4];
          return w3[p4] = x4, a4.languages.DFS(a4.languages, function(L2, M2) {
            M2 === S4 && L2 != p4 && (this[L2] = x4);
          }), x4;
        }, "insertBefore"),
        // Traverse a language definition with Depth First Search
        DFS: /* @__PURE__ */ o$1(function p4(h4, g4, w3, b3) {
          b3 = b3 || {};
          var x4 = a4.util.objId;
          for (var E4 in h4)
            if (h4.hasOwnProperty(E4)) {
              g4.call(h4, E4, h4[E4], w3 || E4);
              var y4 = h4[E4], S4 = a4.util.type(y4);
              S4 === "Object" && !b3[x4(y4)] ? (b3[x4(y4)] = true, p4(y4, g4, null, b3)) : S4 === "Array" && !b3[x4(y4)] && (b3[x4(y4)] = true, p4(y4, g4, E4, b3));
            }
        }, "DFS")
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: /* @__PURE__ */ o$1(function(p4, h4) {
        a4.highlightAllUnder(document, p4, h4);
      }, "highlightAll"),
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: /* @__PURE__ */ o$1(function(p4, h4, g4) {
        var w3 = {
          callback: g4,
          container: p4,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        a4.hooks.run("before-highlightall", w3), w3.elements = Array.prototype.slice.apply(w3.container.querySelectorAll(w3.selector)), a4.hooks.run(
          "before-all-elements-highlight",
          w3
        );
        for (var b3 = 0, x4; x4 = w3.elements[b3++]; )
          a4.highlightElement(x4, h4 === true, w3.callback);
      }, "highlightAllUnder"),
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: /* @__PURE__ */ o$1(function(p4, h4, g4) {
        var w3 = a4.util.getLanguage(p4), b3 = a4.languages[w3];
        a4.util.setLanguage(p4, w3);
        var x4 = p4.parentElement;
        x4 && x4.nodeName.toLowerCase() === "pre" && a4.util.setLanguage(x4, w3);
        var E4 = p4.textContent, y4 = {
          element: p4,
          language: w3,
          grammar: b3,
          code: E4
        };
        function S4(M2) {
          y4.highlightedCode = M2, a4.hooks.run("before-insert", y4), y4.element.innerHTML = y4.highlightedCode, a4.hooks.run("after-highlight", y4), a4.hooks.run("complete", y4), g4 && g4.call(y4.element);
        }
        if (o$1(S4, "insertHighlightedCode"), a4.hooks.run("before-sanity-check", y4), x4 = y4.element.parentElement, x4 && x4.nodeName.toLowerCase() === "pre" && !x4.hasAttribute("tabindex") && x4.setAttribute("tabindex", "0"), !y4.code) {
          a4.hooks.run("complete", y4), g4 && g4.call(y4.element);
          return;
        }
        if (a4.hooks.run("before-highlight", y4), !y4.grammar) {
          S4(a4.util.encode(y4.code));
          return;
        }
        if (h4 && e4.Worker) {
          var L2 = new Worker(a4.filename);
          L2.onmessage = function(M2) {
            S4(M2.data);
          }, L2.postMessage(JSON.stringify({
            language: y4.language,
            code: y4.code,
            immediateClose: true
          }));
        } else
          S4(a4.highlight(y4.code, y4.grammar, y4.language));
      }, "highlightElement"),
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: /* @__PURE__ */ o$1(function(p4, h4, g4) {
        var w3 = {
          code: p4,
          grammar: h4,
          language: g4
        };
        if (a4.hooks.run("before-tokenize", w3), !w3.grammar)
          throw new Error('The language "' + w3.language + '" has no grammar.');
        return w3.tokens = a4.tokenize(w3.code, w3.grammar), a4.hooks.run("after-tokenize", w3), i4.stringify(a4.util.encode(w3.tokens), w3.language);
      }, "highlight"),
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: /* @__PURE__ */ o$1(function(p4, h4) {
        var g4 = h4.rest;
        if (g4) {
          for (var w3 in g4)
            h4[w3] = g4[w3];
          delete h4.rest;
        }
        var b3 = new s2();
        return u2(b3, b3.head, p4), l2(p4, b3, h4, b3.head, 0), d4(b3);
      }, "tokenize"),
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: /* @__PURE__ */ o$1(function(p4, h4) {
          var g4 = a4.hooks.all;
          g4[p4] = g4[p4] || [], g4[p4].push(h4);
        }, "add"),
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: /* @__PURE__ */ o$1(function(p4, h4) {
          var g4 = a4.hooks.all[p4];
          if (!(!g4 || !g4.length))
            for (var w3 = 0, b3; b3 = g4[w3++]; )
              b3(h4);
        }, "run")
      },
      Token: i4
    };
    e4.Prism = a4;
    function i4(p4, h4, g4, w3) {
      this.type = p4, this.content = h4, this.alias = g4, this.length = (w3 || "").length | 0;
    }
    o$1(i4, "Token"), i4.stringify = /* @__PURE__ */ o$1(function p4(h4, g4) {
      if (typeof h4 == "string")
        return h4;
      if (Array.isArray(h4)) {
        var w3 = "";
        return h4.forEach(function(S4) {
          w3 += p4(S4, g4);
        }), w3;
      }
      var b3 = {
        type: h4.type,
        content: p4(h4.content, g4),
        tag: "span",
        classes: ["token", h4.type],
        attributes: {},
        language: g4
      }, x4 = h4.alias;
      x4 && (Array.isArray(x4) ? Array.prototype.push.apply(b3.classes, x4) : b3.classes.push(x4)), a4.hooks.run("wrap", b3);
      var E4 = "";
      for (var y4 in b3.attributes)
        E4 += " " + y4 + '="' + (b3.attributes[y4] || "").replace(/"/g, "&quot;") + '"';
      return "<" + b3.tag + ' class="' + b3.classes.join(" ") + '"' + E4 + ">" + b3.content + "</" + b3.tag + ">";
    }, "stringify");
    function c2(p4, h4, g4, w3) {
      p4.lastIndex = h4;
      var b3 = p4.exec(g4);
      if (b3 && w3 && b3[1]) {
        var x4 = b3[1].length;
        b3.index += x4, b3[0] = b3[0].slice(x4);
      }
      return b3;
    }
    o$1(c2, "matchPattern");
    function l2(p4, h4, g4, w3, b3, x4) {
      for (var E4 in g4)
        if (!(!g4.hasOwnProperty(E4) || !g4[E4])) {
          var y4 = g4[E4];
          y4 = Array.isArray(y4) ? y4 : [y4];
          for (var S4 = 0; S4 < y4.length; ++S4) {
            if (x4 && x4.cause == E4 + "," + S4)
              return;
            var L2 = y4[S4], M2 = L2.inside, A3 = !!L2.lookbehind, P2 = !!L2.greedy, _2 = L2.alias;
            if (P2 && !L2.pattern.global) {
              var F2 = L2.pattern.toString().match(/[imsuy]*$/)[0];
              L2.pattern = RegExp(L2.pattern.source, F2 + "g");
            }
            for (var K2 = L2.pattern || L2, T2 = w3.next, z2 = b3; T2 !== h4.tail && !(x4 && z2 >= x4.reach); z2 += T2.value.length, T2 = T2.next) {
              var k2 = T2.value;
              if (h4.length > p4.length)
                return;
              if (!(k2 instanceof i4)) {
                var V2 = 1, D2;
                if (P2) {
                  if (D2 = c2(K2, z2, p4, A3), !D2 || D2.index >= p4.length)
                    break;
                  var Ee2 = D2.index, j2 = D2.index + D2[0].length, O2 = z2;
                  for (O2 += T2.value.length; Ee2 >= O2; )
                    T2 = T2.next, O2 += T2.value.length;
                  if (O2 -= T2.value.length, z2 = O2, T2.value instanceof i4)
                    continue;
                  for (var G2 = T2; G2 !== h4.tail && (O2 < j2 || typeof G2.value == "string"); G2 = G2.next)
                    V2++, O2 += G2.value.length;
                  V2--, k2 = p4.slice(z2, O2), D2.index -= z2;
                } else if (D2 = c2(K2, 0, k2, A3), !D2)
                  continue;
                var Ee2 = D2.index, pe2 = D2[0], se2 = k2.slice(0, Ee2), ue2 = k2.slice(Ee2 + pe2.length), ve2 = z2 + k2.length;
                x4 && ve2 > x4.reach && (x4.reach = ve2);
                var Se2 = T2.prev;
                se2 && (Se2 = u2(h4, Se2, se2), z2 += se2.length), f2(h4, Se2, V2);
                var Ot2 = new i4(E4, M2 ? a4.tokenize(pe2, M2) : pe2, _2, pe2);
                if (T2 = u2(h4, Se2, Ot2), ue2 && u2(h4, T2, ue2), V2 > 1) {
                  var qr2 = {
                    cause: E4 + "," + S4,
                    reach: ve2
                  };
                  l2(p4, h4, g4, T2.prev, z2, qr2), x4 && qr2.reach > x4.reach && (x4.reach = qr2.reach);
                }
              }
            }
          }
        }
    }
    o$1(l2, "matchGrammar");
    function s2() {
      var p4 = { value: null, prev: null, next: null }, h4 = { value: null, prev: p4, next: null };
      p4.next = h4, this.head = p4, this.tail = h4, this.length = 0;
    }
    o$1(s2, "LinkedList");
    function u2(p4, h4, g4) {
      var w3 = h4.next, b3 = { value: g4, prev: h4, next: w3 };
      return h4.next = b3, w3.prev = b3, p4.length++, b3;
    }
    o$1(u2, "addAfter");
    function f2(p4, h4, g4) {
      for (var w3 = h4.next, b3 = 0; b3 < g4 && w3 !== p4.tail; b3++)
        w3 = w3.next;
      h4.next = w3, w3.prev = h4, p4.length -= b3;
    }
    o$1(f2, "removeRange");
    function d4(p4) {
      for (var h4 = [], g4 = p4.head.next; g4 !== p4.tail; )
        h4.push(g4.value), g4 = g4.next;
      return h4;
    }
    if (o$1(d4, "toArray"), !e4.document)
      return e4.addEventListener && (a4.disableWorkerMessageHandler || e4.addEventListener("message", function(p4) {
        var h4 = JSON.parse(p4.data), g4 = h4.language, w3 = h4.code, b3 = h4.immediateClose;
        e4.postMessage(a4.highlight(w3, a4.languages[g4], g4)), b3 && e4.close();
      }, false)), a4;
    var m4 = a4.util.currentScript();
    m4 && (a4.filename = m4.src, m4.hasAttribute("data-manual") && (a4.manual = true));
    function v3() {
      a4.manual || a4.highlightAll();
    }
    if (o$1(v3, "highlightAutomaticallyCallback"), !a4.manual) {
      var R3 = document.readyState;
      R3 === "loading" || R3 === "interactive" && m4 && m4.defer ? document.addEventListener("DOMContentLoaded", v3) : window.requestAnimationFrame ? window.requestAnimationFrame(v3) : window.setTimeout(v3, 16);
    }
    return a4;
  }(om);
  typeof Vn2 < "u" && Vn2.exports && (Vn2.exports = Vs);
  typeof global < "u" && (global.Prism = Vs);
});
var Ea = H$1((S9, Ws) => {
  Ws.exports = xa2;
  xa2.displayName = "markup";
  xa2.aliases = ["html", "mathml", "svg", "xml", "ssml", "atom", "rss"];
  function xa2(e4) {
    e4.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, e4.languages.markup.tag.inside["attr-value"].inside.entity = e4.languages.markup.entity, e4.languages.markup.doctype.inside["internal-subset"].inside = e4.languages.markup, e4.hooks.add("wrap", function(t4) {
      t4.type === "entity" && (t4.attributes.title = t4.content.value.replace(/&amp;/, "&"));
    }), Object.defineProperty(e4.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: /* @__PURE__ */ o$1(function(r4, n4) {
        var a4 = {};
        a4["language-" + n4] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: e4.languages[n4]
        }, a4.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var i4 = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: a4
          }
        };
        i4["language-" + n4] = {
          pattern: /[\s\S]+/,
          inside: e4.languages[n4]
        };
        var c2 = {};
        c2[r4] = {
          pattern: RegExp(
            /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
              /__/g,
              function() {
                return r4;
              }
            ),
            "i"
          ),
          lookbehind: true,
          greedy: true,
          inside: i4
        }, e4.languages.insertBefore("markup", "cdata", c2);
      }, "addInlined")
    }), Object.defineProperty(e4.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: /* @__PURE__ */ o$1(function(t4, r4) {
        e4.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + t4 + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [r4, "language-" + r4],
                  inside: e4.languages[r4]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }, "value")
    }), e4.languages.html = e4.languages.markup, e4.languages.mathml = e4.languages.markup, e4.languages.svg = e4.languages.markup, e4.languages.xml = e4.languages.extend("markup", {}), e4.languages.ssml = e4.languages.xml, e4.languages.atom = e4.languages.xml, e4.languages.rss = e4.languages.xml;
  }
  o$1(xa2, "markup");
});
var Ca = H$1((M9, Us) => {
  Us.exports = Sa2;
  Sa2.displayName = "css";
  Sa2.aliases = [];
  function Sa2(e4) {
    (function(t4) {
      var r4 = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      t4.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp(
            "\\burl\\((?:" + r4.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)",
            "i"
          ),
          greedy: true,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + r4.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(
            `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + r4.source + ")*(?=\\s*\\{)"
          ),
          lookbehind: true
        },
        string: {
          pattern: r4,
          greedy: true
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        punctuation: /[(){};:,]/
      }, t4.languages.css.atrule.inside.rest = t4.languages.css;
      var n4 = t4.languages.markup;
      n4 && (n4.tag.addInlined("style", "css"), n4.tag.addAttribute("style", "css"));
    })(e4);
  }
  o$1(Sa2, "css");
});
var Gs = H$1((A9, qs) => {
  qs.exports = Ma2;
  Ma2.displayName = "clike";
  Ma2.aliases = [];
  function Ma2(e4) {
    e4.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    };
  }
  o$1(Ma2, "clike");
});
var Ys = H$1((z9, Xs) => {
  Xs.exports = La2;
  La2.displayName = "javascript";
  La2.aliases = ["js"];
  function La2(e4) {
    e4.languages.javascript = e4.languages.extend("clike", {
      "class-name": [
        e4.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: true
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), e4.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, e4.languages.insertBefore("javascript", "keyword", {
      regex: {
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: e4.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: e4.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: e4.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: e4.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: e4.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), e4.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: e4.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    }), e4.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    }), e4.languages.markup && (e4.languages.markup.tag.addInlined("script", "javascript"), e4.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), e4.languages.js = e4.languages.javascript;
  }
  o$1(La2, "javascript");
});
var Qs = H$1((H9, Js) => {
  var tn2 = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {}, am = Rm();
  tn2.Prism = { manual: true, disableWorkerMessageHandler: true };
  var im = gs(), lm = $s(), Zs = js(), cm = Ea(), sm = Ca(), um = Gs(), fm = Ys();
  am();
  var Aa2 = {}.hasOwnProperty;
  function Ks() {
  }
  o$1(Ks, "Refractor");
  Ks.prototype = Zs;
  var oe2 = new Ks();
  Js.exports = oe2;
  oe2.highlight = pm;
  oe2.register = rn2;
  oe2.alias = dm;
  oe2.registered = mm;
  oe2.listLanguages = hm;
  rn2(cm);
  rn2(sm);
  rn2(um);
  rn2(fm);
  oe2.util.encode = wm;
  oe2.Token.stringify = gm;
  function rn2(e4) {
    if (typeof e4 != "function" || !e4.displayName)
      throw new Error("Expected `function` for `grammar`, got `" + e4 + "`");
    oe2.languages[e4.displayName] === void 0 && e4(oe2);
  }
  o$1(rn2, "register");
  function dm(e4, t4) {
    var r4 = oe2.languages, n4 = e4, a4, i4, c2, l2;
    t4 && (n4 = {}, n4[e4] = t4);
    for (a4 in n4)
      for (i4 = n4[a4], i4 = typeof i4 == "string" ? [i4] : i4, c2 = i4.length, l2 = -1; ++l2 < c2; )
        r4[i4[l2]] = r4[a4];
  }
  o$1(dm, "alias");
  function pm(e4, t4) {
    var r4 = Zs.highlight, n4;
    if (typeof e4 != "string")
      throw new Error("Expected `string` for `value`, got `" + e4 + "`");
    if (oe2.util.type(t4) === "Object")
      n4 = t4, t4 = null;
    else {
      if (typeof t4 != "string")
        throw new Error("Expected `string` for `name`, got `" + t4 + "`");
      if (Aa2.call(oe2.languages, t4))
        n4 = oe2.languages[t4];
      else
        throw new Error("Unknown language: `" + t4 + "` is not registered");
    }
    return r4.call(this, e4, n4, t4);
  }
  o$1(pm, "highlight");
  function mm(e4) {
    if (typeof e4 != "string")
      throw new Error("Expected `string` for `language`, got `" + e4 + "`");
    return Aa2.call(oe2.languages, e4);
  }
  o$1(mm, "registered");
  function hm() {
    var e4 = oe2.languages, t4 = [], r4;
    for (r4 in e4)
      Aa2.call(e4, r4) && typeof e4[r4] == "object" && t4.push(r4);
    return t4;
  }
  o$1(hm, "listLanguages");
  function gm(e4, t4, r4) {
    var n4;
    return typeof e4 == "string" ? { type: "text", value: e4 } : oe2.util.type(e4) === "Array" ? vm(e4, t4) : (n4 = {
      type: e4.type,
      content: oe2.Token.stringify(e4.content, t4, r4),
      tag: "span",
      classes: ["token", e4.type],
      attributes: {},
      language: t4,
      parent: r4
    }, e4.alias && (n4.classes = n4.classes.concat(e4.alias)), oe2.hooks.run("wrap", n4), im(
      n4.tag + "." + n4.classes.join("."),
      bm(n4.attributes),
      n4.content
    ));
  }
  o$1(gm, "stringify");
  function vm(e4, t4) {
    for (var r4 = [], n4 = e4.length, a4 = -1, i4; ++a4 < n4; )
      i4 = e4[a4], i4 !== "" && i4 !== null && i4 !== void 0 && r4.push(i4);
    for (a4 = -1, n4 = r4.length; ++a4 < n4; )
      i4 = r4[a4], r4[a4] = oe2.Token.stringify(i4, t4, r4);
    return r4;
  }
  o$1(vm, "stringifyAll");
  function wm(e4) {
    return e4;
  }
  o$1(wm, "encode");
  function bm(e4) {
    var t4;
    for (t4 in e4)
      e4[t4] = lm(e4[t4]);
    return e4;
  }
  o$1(bm, "attributes");
  function Rm() {
    var e4 = "Prism" in tn2, t4 = e4 ? tn2.Prism : void 0;
    return r4;
    function r4() {
      e4 ? tn2.Prism = t4 : delete tn2.Prism, e4 = void 0, t4 = void 0;
    }
  }
  o$1(Rm, "capture");
});
var jn, Ia, Wn, e1 = C$1(() => {
  gc();
  jn = me$1(Qs()), Ia = aa(jn.default, {});
  Ia.registerLanguage = function(e4, t4) {
    return jn.default.register(t4);
  };
  Ia.alias = function(e4, t4) {
    return jn.default.alias(e4, t4);
  };
  Wn = Ia;
});
var t1 = C$1(() => {
  oa();
});
var n1 = H$1((D9, r1) => {
  r1.exports = za2;
  za2.displayName = "bash";
  za2.aliases = ["shell"];
  function za2(e4) {
    (function(t4) {
      var r4 = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", n4 = {
        pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
        lookbehind: true,
        alias: "punctuation",
        // this looks reasonably well in all themes
        inside: null
        // see below
      }, a4 = {
        bash: n4,
        environment: {
          pattern: RegExp("\\$" + r4),
          alias: "constant"
        },
        variable: [
          // [0]: Arithmetic Environment
          {
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: true,
            inside: {
              // If there is a $ sign at the beginning highlight $(( and )) as variable
              variable: [
                {
                  pattern: /(^\$\(\([\s\S]+)\)\)/,
                  lookbehind: true
                },
                /^\$\(\(/
              ],
              number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
              // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
              operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
              // If there is no $ sign at the beginning highlight (( and )) as punctuation
              punctuation: /\(\(?|\)\)?|,|;/
            }
          },
          // [1]: Command Substitution
          {
            pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
            greedy: true,
            inside: {
              variable: /^\$\(|^`|\)$|`$/
            }
          },
          // [2]: Brace expansion
          {
            pattern: /\$\{[^}]+\}/,
            greedy: true,
            inside: {
              operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
              punctuation: /[\[\]]/,
              environment: {
                pattern: RegExp("(\\{)" + r4),
                lookbehind: true,
                alias: "constant"
              }
            }
          },
          /\$(?:\w+|[#?*!@$])/
        ],
        // Escape sequences from echo and printf's manuals, and escaped quotes.
        entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
      };
      t4.languages.bash = {
        shebang: {
          pattern: /^#!\s*\/.*/,
          alias: "important"
        },
        comment: {
          pattern: /(^|[^"{\\$])#.*/,
          lookbehind: true
        },
        "function-name": [
          // a) function foo {
          // b) foo() {
          // c) function foo() {
          // but not “foo {”
          {
            // a) and c)
            pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: true,
            alias: "function"
          },
          {
            // b)
            pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
            alias: "function"
          }
        ],
        // Highlight variable names as variables in for and select beginnings.
        "for-or-select": {
          pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
          alias: "variable",
          lookbehind: true
        },
        // Highlight variable names as variables in the left-hand part
        // of assignments (“=” and “+=”).
        "assign-left": {
          pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
          inside: {
            environment: {
              pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + r4),
              lookbehind: true,
              alias: "constant"
            }
          },
          alias: "variable",
          lookbehind: true
        },
        string: [
          // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
          {
            pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: true,
            greedy: true,
            inside: a4
          },
          // Here-document with quotes around the tag
          // → No expansion (so no “inside”).
          {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: true,
            greedy: true,
            inside: {
              bash: n4
            }
          },
          // “Normal” string
          {
            // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
            pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
            lookbehind: true,
            greedy: true,
            inside: a4
          },
          {
            // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
            pattern: /(^|[^$\\])'[^']*'/,
            lookbehind: true,
            greedy: true
          },
          {
            // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
            pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
            greedy: true,
            inside: {
              entity: a4.entity
            }
          }
        ],
        environment: {
          pattern: RegExp("\\$?" + r4),
          alias: "constant"
        },
        variable: a4.variable,
        function: {
          pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
          lookbehind: true
        },
        keyword: {
          pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
          lookbehind: true
        },
        // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
        builtin: {
          pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
          lookbehind: true,
          // Alias added to make those easier to distinguish from strings.
          alias: "class-name"
        },
        boolean: {
          pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
          lookbehind: true
        },
        "file-descriptor": {
          pattern: /\B&\d\b/,
          alias: "important"
        },
        operator: {
          // Lots of redirections here, but not just that.
          pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
          inside: {
            "file-descriptor": {
              pattern: /^\d/,
              alias: "important"
            }
          }
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
          pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
          lookbehind: true
        }
      }, n4.inside = t4.languages.bash;
      for (var i4 = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number"
      ], c2 = a4.variable[1].inside, l2 = 0; l2 < i4.length; l2++)
        c2[i4[l2]] = t4.languages.bash[i4[l2]];
      t4.languages.shell = t4.languages.bash;
    })(e4);
  }
  o$1(za2, "bash");
});
var o1, a1, i1 = C$1(() => {
  o1 = me$1(n1()), a1 = o1.default;
});
var l1, c1, s1 = C$1(() => {
  l1 = me$1(Ca()), c1 = l1.default;
});
var f1 = H$1((V9, u1) => {
  u1.exports = Ta2;
  Ta2.displayName = "graphql";
  Ta2.aliases = [];
  function Ta2(e4) {
    e4.languages.graphql = {
      comment: /#.*/,
      description: {
        pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: true,
        alias: "string",
        inside: {
          "language-markdown": {
            pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: e4.languages.markdown
          }
        }
      },
      string: {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
      },
      number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:false|true)\b/,
      variable: /\$[a-z_]\w*/i,
      directive: {
        pattern: /@[a-z_]\w*/i,
        alias: "function"
      },
      "attr-name": {
        pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: true
      },
      "atom-input": {
        pattern: /\b[A-Z]\w*Input\b/,
        alias: "class-name"
      },
      scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
      constant: /\b[A-Z][A-Z_\d]*\b/,
      "class-name": {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
        lookbehind: true
      },
      fragment: {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-mutation": {
        pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-query": {
        pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
      operator: /[!=|&]|\.{3}/,
      "property-query": /\w+(?=\s*\()/,
      object: /\w+(?=\s*\{)/,
      punctuation: /[!(){}\[\]:=,]/,
      property: /\w+/
    }, e4.hooks.add("after-tokenize", /* @__PURE__ */ o$1(function(r4) {
      if (r4.language !== "graphql")
        return;
      var n4 = r4.tokens.filter(function(h4) {
        return typeof h4 != "string" && h4.type !== "comment" && h4.type !== "scalar";
      }), a4 = 0;
      function i4(h4) {
        return n4[a4 + h4];
      }
      o$1(i4, "getToken");
      function c2(h4, g4) {
        g4 = g4 || 0;
        for (var w3 = 0; w3 < h4.length; w3++) {
          var b3 = i4(w3 + g4);
          if (!b3 || b3.type !== h4[w3])
            return false;
        }
        return true;
      }
      o$1(c2, "isTokenType");
      function l2(h4, g4) {
        for (var w3 = 1, b3 = a4; b3 < n4.length; b3++) {
          var x4 = n4[b3], E4 = x4.content;
          if (x4.type === "punctuation" && typeof E4 == "string") {
            if (h4.test(E4))
              w3++;
            else if (g4.test(E4) && (w3--, w3 === 0))
              return b3;
          }
        }
        return -1;
      }
      o$1(l2, "findClosingBracket");
      function s2(h4, g4) {
        var w3 = h4.alias;
        w3 ? Array.isArray(w3) || (h4.alias = w3 = [w3]) : h4.alias = w3 = [], w3.push(g4);
      }
      for (o$1(s2, "addAlias"); a4 < n4.length; ) {
        var u2 = n4[a4++];
        if (u2.type === "keyword" && u2.content === "mutation") {
          var f2 = [];
          if (c2(["definition-mutation", "punctuation"]) && i4(1).content === "(") {
            a4 += 2;
            var d4 = l2(/^\($/, /^\)$/);
            if (d4 === -1)
              continue;
            for (; a4 < d4; a4++) {
              var m4 = i4(0);
              m4.type === "variable" && (s2(m4, "variable-input"), f2.push(m4.content));
            }
            a4 = d4 + 1;
          }
          if (c2(["punctuation", "property-query"]) && i4(0).content === "{" && (a4++, s2(i4(0), "property-mutation"), f2.length > 0)) {
            var v3 = l2(/^\{$/, /^\}$/);
            if (v3 === -1)
              continue;
            for (var R3 = a4; R3 < v3; R3++) {
              var p4 = n4[R3];
              p4.type === "variable" && f2.indexOf(p4.content) >= 0 && s2(p4, "variable-input");
            }
          }
        }
      }
    }, "afterTokenizeGraphql"));
  }
  o$1(Ta2, "graphql");
});
var d1, p1, m1 = C$1(() => {
  d1 = me$1(f1()), p1 = d1.default;
});
var g1 = H$1((U9, h1) => {
  h1.exports = Ha2;
  Ha2.displayName = "jsExtras";
  Ha2.aliases = [];
  function Ha2(e4) {
    (function(t4) {
      t4.languages.insertBefore("javascript", "function-variable", {
        "method-variable": {
          pattern: RegExp(
            "(\\.\\s*)" + t4.languages.javascript["function-variable"].pattern.source
          ),
          lookbehind: true,
          alias: ["function-variable", "method", "function", "property-access"]
        }
      }), t4.languages.insertBefore("javascript", "function", {
        method: {
          pattern: RegExp(
            "(\\.\\s*)" + t4.languages.javascript.function.source
          ),
          lookbehind: true,
          alias: ["function", "property-access"]
        }
      }), t4.languages.insertBefore("javascript", "constant", {
        "known-class-name": [
          {
            // standard built-ins
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
            pattern: /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
            alias: "class-name"
          },
          {
            // errors
            pattern: /\b(?:[A-Z]\w*)Error\b/,
            alias: "class-name"
          }
        ]
      });
      function r4(s2, u2) {
        return RegExp(
          s2.replace(/<ID>/g, function() {
            return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
          }),
          u2
        );
      }
      o$1(r4, "withId"), t4.languages.insertBefore("javascript", "keyword", {
        imports: {
          // https://tc39.es/ecma262/#sec-imports
          pattern: r4(
            /(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source
          ),
          lookbehind: true,
          inside: t4.languages.javascript
        },
        exports: {
          // https://tc39.es/ecma262/#sec-exports
          pattern: r4(
            /(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source
          ),
          lookbehind: true,
          inside: t4.languages.javascript
        }
      }), t4.languages.javascript.keyword.unshift(
        {
          pattern: /\b(?:as|default|export|from|import)\b/,
          alias: "module"
        },
        {
          pattern: /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
          alias: "control-flow"
        },
        {
          pattern: /\bnull\b/,
          alias: ["null", "nil"]
        },
        {
          pattern: /\bundefined\b/,
          alias: "nil"
        }
      ), t4.languages.insertBefore("javascript", "operator", {
        spread: {
          pattern: /\.{3}/,
          alias: "operator"
        },
        arrow: {
          pattern: /=>/,
          alias: "operator"
        }
      }), t4.languages.insertBefore("javascript", "punctuation", {
        "property-access": {
          pattern: r4(/(\.\s*)#?<ID>/.source),
          lookbehind: true
        },
        "maybe-class-name": {
          pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
          lookbehind: true
        },
        dom: {
          // this contains only a few commonly used DOM variables
          pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
          alias: "variable"
        },
        console: {
          pattern: /\bconsole(?=\s*\.)/,
          alias: "class-name"
        }
      });
      for (var n4 = [
        "function",
        "function-variable",
        "method",
        "method-variable",
        "property-access"
      ], a4 = 0; a4 < n4.length; a4++) {
        var i4 = n4[a4], c2 = t4.languages.javascript[i4];
        t4.util.type(c2) === "RegExp" && (c2 = t4.languages.javascript[i4] = {
          pattern: c2
        });
        var l2 = c2.inside || {};
        c2.inside = l2, l2["maybe-class-name"] = /^[A-Z][\s\S]*/;
      }
    })(e4);
  }
  o$1(Ha2, "jsExtras");
});
var v1, w1, b1 = C$1(() => {
  v1 = me$1(g1()), w1 = v1.default;
});
var y1 = H$1((X9, R1) => {
  R1.exports = Pa2;
  Pa2.displayName = "json";
  Pa2.aliases = ["webmanifest"];
  function Pa2(e4) {
    e4.languages.json = {
      property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: true,
        greedy: true
      },
      comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: true
      },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      punctuation: /[{}[\],]/,
      operator: /:/,
      boolean: /\b(?:false|true)\b/,
      null: {
        pattern: /\bnull\b/,
        alias: "keyword"
      }
    }, e4.languages.webmanifest = e4.languages.json;
  }
  o$1(Pa2, "json");
});
var x1, E1, S1 = C$1(() => {
  x1 = me$1(y1()), E1 = x1.default;
});
var Oa = H$1((K9, C1) => {
  C1.exports = ka2;
  ka2.displayName = "jsx";
  ka2.aliases = [];
  function ka2(e4) {
    (function(t4) {
      var r4 = t4.util.clone(t4.languages.javascript), n4 = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source, a4 = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source, i4 = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
      function c2(u2, f2) {
        return u2 = u2.replace(/<S>/g, function() {
          return n4;
        }).replace(/<BRACES>/g, function() {
          return a4;
        }).replace(/<SPREAD>/g, function() {
          return i4;
        }), RegExp(u2, f2);
      }
      o$1(c2, "re"), i4 = c2(i4).source, t4.languages.jsx = t4.languages.extend("markup", r4), t4.languages.jsx.tag.pattern = c2(
        /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
      ), t4.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/, t4.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/, t4.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, t4.languages.jsx.tag.inside.comment = r4.comment, t4.languages.insertBefore(
        "inside",
        "attr-name",
        {
          spread: {
            pattern: c2(/<SPREAD>/.source),
            inside: t4.languages.jsx
          }
        },
        t4.languages.jsx.tag
      ), t4.languages.insertBefore(
        "inside",
        "special-attr",
        {
          script: {
            // Allow for two levels of nesting
            pattern: c2(/=<BRACES>/.source),
            alias: "language-javascript",
            inside: {
              "script-punctuation": {
                pattern: /^=(?=\{)/,
                alias: "punctuation"
              },
              rest: t4.languages.jsx
            }
          }
        },
        t4.languages.jsx.tag
      );
      var l2 = /* @__PURE__ */ o$1(function(u2) {
        return u2 ? typeof u2 == "string" ? u2 : typeof u2.content == "string" ? u2.content : u2.content.map(l2).join("") : "";
      }, "stringifyToken"), s2 = /* @__PURE__ */ o$1(function(u2) {
        for (var f2 = [], d4 = 0; d4 < u2.length; d4++) {
          var m4 = u2[d4], v3 = false;
          if (typeof m4 != "string" && (m4.type === "tag" && m4.content[0] && m4.content[0].type === "tag" ? m4.content[0].content[0].content === "</" ? f2.length > 0 && f2[f2.length - 1].tagName === l2(m4.content[0].content[1]) && f2.pop() : m4.content[m4.content.length - 1].content === "/>" || f2.push({
            tagName: l2(m4.content[0].content[1]),
            openedBraces: 0
          }) : f2.length > 0 && m4.type === "punctuation" && m4.content === "{" ? f2[f2.length - 1].openedBraces++ : f2.length > 0 && f2[f2.length - 1].openedBraces > 0 && m4.type === "punctuation" && m4.content === "}" ? f2[f2.length - 1].openedBraces-- : v3 = true), (v3 || typeof m4 == "string") && f2.length > 0 && f2[f2.length - 1].openedBraces === 0) {
            var R3 = l2(m4);
            d4 < u2.length - 1 && (typeof u2[d4 + 1] == "string" || u2[d4 + 1].type === "plain-text") && (R3 += l2(u2[d4 + 1]), u2.splice(d4 + 1, 1)), d4 > 0 && (typeof u2[d4 - 1] == "string" || u2[d4 - 1].type === "plain-text") && (R3 = l2(u2[d4 - 1]) + R3, u2.splice(d4 - 1, 1), d4--), u2[d4] = new t4.Token(
              "plain-text",
              R3,
              null,
              R3
            );
          }
          m4.content && typeof m4.content != "string" && s2(m4.content);
        }
      }, "walkTokens");
      t4.hooks.add("after-tokenize", function(u2) {
        u2.language !== "jsx" && u2.language !== "tsx" || s2(u2.tokens);
      });
    })(e4);
  }
  o$1(ka2, "jsx");
});
var M1, L1, A1 = C$1(() => {
  M1 = me$1(Oa()), L1 = M1.default;
});
var z1 = H$1((eR, I1) => {
  I1.exports = Ba2;
  Ba2.displayName = "markdown";
  Ba2.aliases = ["md"];
  function Ba2(e4) {
    (function(t4) {
      var r4 = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
      function n4(d4) {
        return d4 = d4.replace(/<inner>/g, function() {
          return r4;
        }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + d4 + ")");
      }
      o$1(n4, "createInline");
      var a4 = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, i4 = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(
        /__/g,
        function() {
          return a4;
        }
      ), c2 = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
      t4.languages.markdown = t4.languages.extend("markup", {}), t4.languages.insertBefore("markdown", "prolog", {
        "front-matter-block": {
          pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
          lookbehind: true,
          greedy: true,
          inside: {
            punctuation: /^---|---$/,
            "front-matter": {
              pattern: /\S+(?:\s+\S+)*/,
              alias: ["yaml", "language-yaml"],
              inside: t4.languages.yaml
            }
          }
        },
        blockquote: {
          // > ...
          pattern: /^>(?:[\t ]*>)*/m,
          alias: "punctuation"
        },
        table: {
          pattern: RegExp(
            "^" + i4 + c2 + "(?:" + i4 + ")*",
            "m"
          ),
          inside: {
            "table-data-rows": {
              pattern: RegExp(
                "^(" + i4 + c2 + ")(?:" + i4 + ")*$"
              ),
              lookbehind: true,
              inside: {
                "table-data": {
                  pattern: RegExp(a4),
                  inside: t4.languages.markdown
                },
                punctuation: /\|/
              }
            },
            "table-line": {
              pattern: RegExp("^(" + i4 + ")" + c2 + "$"),
              lookbehind: true,
              inside: {
                punctuation: /\||:?-{3,}:?/
              }
            },
            "table-header-row": {
              pattern: RegExp("^" + i4 + "$"),
              inside: {
                "table-header": {
                  pattern: RegExp(a4),
                  alias: "important",
                  inside: t4.languages.markdown
                },
                punctuation: /\|/
              }
            }
          }
        },
        code: [
          {
            // Prefixed by 4 spaces or 1 tab and preceded by an empty line
            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: true,
            alias: "keyword"
          },
          {
            // ```optional language
            // code block
            // ```
            pattern: /^```[\s\S]*?^```$/m,
            greedy: true,
            inside: {
              "code-block": {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: true
              },
              "code-language": {
                pattern: /^(```).+/,
                lookbehind: true
              },
              punctuation: /```/
            }
          }
        ],
        title: [
          {
            // title 1
            // =======
            // title 2
            // -------
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: {
              punctuation: /==+$|--+$/
            }
          },
          {
            // # title 1
            // ###### title 6
            pattern: /(^\s*)#.+/m,
            lookbehind: true,
            alias: "important",
            inside: {
              punctuation: /^#+|#+$/
            }
          }
        ],
        hr: {
          // ***
          // ---
          // * * *
          // -----------
          pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
          lookbehind: true,
          alias: "punctuation"
        },
        list: {
          // * item
          // + item
          // - item
          // 1. item
          pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
          lookbehind: true,
          alias: "punctuation"
        },
        "url-reference": {
          // [id]: http://example.com "Optional title"
          // [id]: http://example.com 'Optional title'
          // [id]: http://example.com (Optional title)
          // [id]: <http://example.com> "Optional title"
          pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
          inside: {
            variable: {
              pattern: /^(!?\[)[^\]]+/,
              lookbehind: true
            },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
          },
          alias: "url"
        },
        bold: {
          // **strong**
          // __strong__
          // allow one nested instance of italic text using the same delimiter
          pattern: n4(
            /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            content: {
              pattern: /(^..)[\s\S]+(?=..$)/,
              lookbehind: true,
              inside: {}
              // see below
            },
            punctuation: /\*\*|__/
          }
        },
        italic: {
          // *em*
          // _em_
          // allow one nested instance of bold text using the same delimiter
          pattern: n4(
            /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            content: {
              pattern: /(^.)[\s\S]+(?=.$)/,
              lookbehind: true,
              inside: {}
              // see below
            },
            punctuation: /[*_]/
          }
        },
        strike: {
          // ~~strike through~~
          // ~strike~
          // eslint-disable-next-line regexp/strict
          pattern: n4(/(~~?)(?:(?!~)<inner>)+\2/.source),
          lookbehind: true,
          greedy: true,
          inside: {
            content: {
              pattern: /(^~~?)[\s\S]+(?=\1$)/,
              lookbehind: true,
              inside: {}
              // see below
            },
            punctuation: /~~?/
          }
        },
        "code-snippet": {
          // `code`
          // ``code``
          pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
          lookbehind: true,
          greedy: true,
          alias: ["code", "keyword"]
        },
        url: {
          // [example](http://example.com "Optional title")
          // [example][id]
          // [example] [id]
          pattern: n4(
            /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            operator: /^!/,
            content: {
              pattern: /(^\[)[^\]]+(?=\])/,
              lookbehind: true,
              inside: {}
              // see below
            },
            variable: {
              pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
              lookbehind: true
            },
            url: {
              pattern: /(^\]\()[^\s)]+/,
              lookbehind: true
            },
            string: {
              pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
              lookbehind: true
            }
          }
        }
      }), ["url", "bold", "italic", "strike"].forEach(function(d4) {
        ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(m4) {
          d4 !== m4 && (t4.languages.markdown[d4].inside.content.inside[m4] = t4.languages.markdown[m4]);
        });
      }), t4.hooks.add("after-tokenize", function(d4) {
        if (d4.language !== "markdown" && d4.language !== "md")
          return;
        function m4(v3) {
          if (!(!v3 || typeof v3 == "string"))
            for (var R3 = 0, p4 = v3.length; R3 < p4; R3++) {
              var h4 = v3[R3];
              if (h4.type !== "code") {
                m4(h4.content);
                continue;
              }
              var g4 = h4.content[1], w3 = h4.content[3];
              if (g4 && w3 && g4.type === "code-language" && w3.type === "code-block" && typeof g4.content == "string") {
                var b3 = g4.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
                b3 = (/[a-z][\w-]*/i.exec(b3) || [""])[0].toLowerCase();
                var x4 = "language-" + b3;
                w3.alias ? typeof w3.alias == "string" ? w3.alias = [w3.alias, x4] : w3.alias.push(x4) : w3.alias = [x4];
              }
            }
        }
        o$1(m4, "walkTokens"), m4(d4.tokens);
      }), t4.hooks.add("wrap", function(d4) {
        if (d4.type === "code-block") {
          for (var m4 = "", v3 = 0, R3 = d4.classes.length; v3 < R3; v3++) {
            var p4 = d4.classes[v3], h4 = /language-(.+)/.exec(p4);
            if (h4) {
              m4 = h4[1];
              break;
            }
          }
          var g4 = t4.languages[m4];
          if (g4)
            d4.content = t4.highlight(
              f2(d4.content.value),
              g4,
              m4
            );
          else if (m4 && m4 !== "none" && t4.plugins.autoloader) {
            var w3 = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
            d4.attributes.id = w3, t4.plugins.autoloader.loadLanguages(m4, function() {
              var b3 = document.getElementById(w3);
              b3 && (b3.innerHTML = t4.highlight(
                b3.textContent,
                t4.languages[m4],
                m4
              ));
            });
          }
        }
      });
      var l2 = RegExp(t4.languages.markup.tag.pattern.source, "gi"), s2 = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"'
      }, u2 = String.fromCodePoint || String.fromCharCode;
      function f2(d4) {
        var m4 = d4.replace(l2, "");
        return m4 = m4.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(v3, R3) {
          if (R3 = R3.toLowerCase(), R3[0] === "#") {
            var p4;
            return R3[1] === "x" ? p4 = parseInt(R3.slice(2), 16) : p4 = Number(R3.slice(1)), u2(p4);
          } else {
            var h4 = s2[R3];
            return h4 || v3;
          }
        }), m4;
      }
      o$1(f2, "textContent"), t4.languages.md = t4.languages.markdown;
    })(e4);
  }
  o$1(Ba2, "markdown");
});
var T1, H1, P1 = C$1(() => {
  T1 = me$1(z1()), H1 = T1.default;
});
var k1, O1, B1 = C$1(() => {
  k1 = me$1(Ea()), O1 = k1.default;
});
var Da = H$1((oR, N1) => {
  N1.exports = Na2;
  Na2.displayName = "typescript";
  Na2.aliases = ["ts"];
  function Na2(e4) {
    (function(t4) {
      t4.languages.typescript = t4.languages.extend("javascript", {
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
          lookbehind: true,
          greedy: true,
          inside: null
          // see below
        },
        builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
      }), t4.languages.typescript.keyword.push(
        /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
        // keywords that have to be followed by an identifier
        /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
        // This is for `import type *, {}`
        /\btype\b(?=\s*(?:[\{*]|$))/
      ), delete t4.languages.typescript.parameter, delete t4.languages.typescript["literal-property"];
      var r4 = t4.languages.extend("typescript", {});
      delete r4["class-name"], t4.languages.typescript["class-name"].inside = r4, t4.languages.insertBefore("typescript", "function", {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: {
              pattern: /^@/,
              alias: "operator"
            },
            function: /^[\s\S]+/
          }
        },
        "generic-function": {
          // e.g. foo<T extends "bar" | "baz">( ...
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: true,
          inside: {
            function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: {
              pattern: /<[\s\S]+/,
              // everything after the first <
              alias: "class-name",
              inside: r4
            }
          }
        }
      }), t4.languages.ts = t4.languages.typescript;
    })(e4);
  }
  o$1(Na2, "typescript");
});
var F1 = H$1((iR, D1) => {
  var ym = Oa(), xm = Da();
  D1.exports = Fa2;
  Fa2.displayName = "tsx";
  Fa2.aliases = [];
  function Fa2(e4) {
    e4.register(ym), e4.register(xm), function(t4) {
      var r4 = t4.util.clone(t4.languages.typescript);
      t4.languages.tsx = t4.languages.extend("jsx", r4), delete t4.languages.tsx.parameter, delete t4.languages.tsx["literal-property"];
      var n4 = t4.languages.tsx.tag;
      n4.pattern = RegExp(
        /(^|[^\w$]|(?=<\/))/.source + "(?:" + n4.pattern.source + ")",
        n4.pattern.flags
      ), n4.lookbehind = true;
    }(e4);
  }
  o$1(Fa2, "tsx");
});
var _1, $1, V1 = C$1(() => {
  _1 = me$1(F1()), $1 = _1.default;
});
var j1, W1, U1 = C$1(() => {
  j1 = me$1(Da()), W1 = j1.default;
});
var G1 = H$1((uR, q1) => {
  q1.exports = _a2;
  _a2.displayName = "yaml";
  _a2.aliases = ["yml"];
  function _a2(e4) {
    (function(t4) {
      var r4 = /[*&][^\s[\]{},]+/, n4 = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, a4 = "(?:" + n4.source + "(?:[ 	]+" + r4.source + ")?|" + r4.source + "(?:[ 	]+" + n4.source + ")?)", i4 = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
        /<PLAIN>/g,
        function() {
          return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
        }
      ), c2 = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
      function l2(s2, u2) {
        u2 = (u2 || "").replace(/m/g, "") + "m";
        var f2 = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
          return a4;
        }).replace(/<<value>>/g, function() {
          return s2;
        });
        return RegExp(f2, u2);
      }
      o$1(l2, "createValuePattern"), t4.languages.yaml = {
        scalar: {
          pattern: RegExp(
            /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
              /<<prop>>/g,
              function() {
                return a4;
              }
            )
          ),
          lookbehind: true,
          alias: "string"
        },
        comment: /#.*/,
        key: {
          pattern: RegExp(
            /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
              return a4;
            }).replace(/<<key>>/g, function() {
              return "(?:" + i4 + "|" + c2 + ")";
            })
          ),
          lookbehind: true,
          greedy: true,
          alias: "atrule"
        },
        directive: {
          pattern: /(^[ \t]*)%.+/m,
          lookbehind: true,
          alias: "important"
        },
        datetime: {
          pattern: l2(
            /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source
          ),
          lookbehind: true,
          alias: "number"
        },
        boolean: {
          pattern: l2(/false|true/.source, "i"),
          lookbehind: true,
          alias: "important"
        },
        null: {
          pattern: l2(/null|~/.source, "i"),
          lookbehind: true,
          alias: "important"
        },
        string: {
          pattern: l2(c2),
          lookbehind: true,
          greedy: true
        },
        number: {
          pattern: l2(
            /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,
            "i"
          ),
          lookbehind: true
        },
        tag: n4,
        important: r4,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
      }, t4.languages.yml = t4.languages.yaml;
    })(e4);
  }
  o$1(_a2, "yaml");
});
var X1, Y1, Z1 = C$1(() => {
  X1 = me$1(G1()), Y1 = X1.default;
});
var Em, Q1, $a, Va = C$1(() => {
  Em = xr$1.div(({ theme: e4 }) => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    maxWidth: "100%",
    display: "flex",
    background: e4.background.content,
    zIndex: 1
  })), Q1 = xr$1.button(
    ({ theme: e4 }) => ({
      margin: 0,
      border: "0 none",
      padding: "4px 10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: e4.color.defaultText,
      background: e4.background.content,
      fontSize: 12,
      lineHeight: "16px",
      fontFamily: e4.typography.fonts.base,
      fontWeight: e4.typography.weight.bold,
      borderTop: `1px solid ${e4.appBorderColor}`,
      borderLeft: `1px solid ${e4.appBorderColor}`,
      marginLeft: -1,
      borderRadius: "4px 0 0 0",
      "&:not(:last-child)": { borderRight: `1px solid ${e4.appBorderColor}` },
      "& + *": {
        borderLeft: `1px solid ${e4.appBorderColor}`,
        borderRadius: 0
      },
      "&:focus": {
        boxShadow: `${e4.color.secondary} 0 -3px 0 0 inset`,
        outline: "0 none"
      }
    }),
    ({ disabled: e4 }) => e4 && {
      cursor: "not-allowed",
      opacity: 0.5
    }
  );
  Q1.displayName = "ActionButton";
  $a = /* @__PURE__ */ o$1(({ actionItems: e$1, ...t4 }) => /* @__PURE__ */ e.createElement(Em, { ...t4 }, e$1.map(({
    title: r4,
    className: n4,
    onClick: a4,
    disabled: i4
  }, c2) => /* @__PURE__ */ e.createElement(Q1, { key: c2, className: n4, onClick: a4, disabled: !!i4 }, r4))), "ActionBar");
});
function Sm(e4, t4) {
  typeof e4 == "function" ? e4(t4) : e4 != null && (e4.current = t4);
}
function ja(...e4) {
  return (t4) => e4.forEach((r4) => Sm(r4, t4));
}
function it(...e4) {
  return reactExports.useCallback(ja(...e4), e4);
}
var Un = C$1(() => {
  o$1(Sm, "setRef");
  o$1(ja, "composeRefs");
  o$1(it, "useComposedRefs");
});
function Lm(e4) {
  return reactExports.isValidElement(e4) && e4.type === Mm;
}
function Am(e4, t4) {
  let r4 = { ...t4 };
  for (let n4 in t4) {
    let a4 = e4[n4], i4 = t4[n4];
    /^on[A-Z]/.test(n4) ? a4 && i4 ? r4[n4] = (...l2) => {
      i4(...l2), a4(...l2);
    } : a4 && (r4[n4] = a4) : n4 === "style" ? r4[n4] = { ...a4, ...i4 } : n4 === "className" && (r4[n4] = [a4, i4].filter(Boolean).join(" "));
  }
  return { ...e4, ...r4 };
}
function Im(e4) {
  let t4 = Object.getOwnPropertyDescriptor(e4.props, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning;
  return r4 ? e4.ref : (t4 = Object.getOwnPropertyDescriptor(e4, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning, r4 ? e4.props.ref : e4.props.ref || e4.ref);
}
var qa, Ua, Mm, t5 = C$1(() => {
  Un();
  qa = reactExports.forwardRef((e4, t4) => {
    let { children: r4, ...n4 } = e4, a4 = reactExports.Children.toArray(r4), i4 = a4.find(Lm);
    if (i4) {
      let c2 = i4.props.children, l2 = a4.map((s2) => s2 === i4 ? reactExports.Children.count(c2) > 1 ? reactExports.Children.only(null) : reactExports.isValidElement(c2) ? c2.props.children : null : s2);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Ua, { ...n4, ref: t4, children: reactExports.isValidElement(c2) ? reactExports.cloneElement(c2, void 0, l2) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Ua, { ...n4, ref: t4, children: r4 });
  });
  qa.displayName = "Slot";
  Ua = reactExports.forwardRef((e4, t4) => {
    let { children: r4, ...n4 } = e4;
    if (reactExports.isValidElement(r4)) {
      let a4 = Im(r4);
      return reactExports.cloneElement(r4, {
        ...Am(n4, r4.props),
        // @ts-ignore
        ref: t4 ? ja(t4, a4) : a4
      });
    }
    return reactExports.Children.count(r4) > 1 ? reactExports.Children.only(null) : null;
  });
  Ua.displayName = "SlotClone";
  Mm = /* @__PURE__ */ o$1(({ children: e4 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: e4 }), "Slottable");
  o$1(Lm, "isSlottable");
  o$1(Am, "mergeProps");
  o$1(Im, "getElementRef");
});
var Hm, gr, n5 = C$1(() => {
  t5();
  Hm = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul"
  ], gr = Hm.reduce((e4, t4) => {
    let r4 = reactExports.forwardRef((n4, a4) => {
      let { asChild: i4, ...c2 } = n4, l2 = i4 ? qa : t4;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = true), /* @__PURE__ */ jsxRuntimeExports.jsx(l2, { ...c2, ref: a4 });
    });
    return r4.displayName = `Primitive.${t4}`, { ...e4, [t4]: r4 };
  }, {});
});
var nn, Ga = C$1(() => {
  nn = globalThis?.document ? reactExports.useLayoutEffect : () => {
  };
});
function Pm(e4, t4) {
  return reactExports.useReducer((r4, n4) => t4[r4][n4] ?? r4, e4);
}
function km(e4) {
  let [t4, r4] = reactExports.useState(), n4 = reactExports.useRef({}), a4 = reactExports.useRef(e4), i4 = reactExports.useRef("none"), c2 = e4 ? "mounted" : "unmounted", [l2, s2] = Pm(c2, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return reactExports.useEffect(() => {
    let u2 = qn(n4.current);
    i4.current = l2 === "mounted" ? u2 : "none";
  }, [l2]), nn(() => {
    let u2 = n4.current, f2 = a4.current;
    if (f2 !== e4) {
      let m4 = i4.current, v3 = qn(u2);
      e4 ? s2("MOUNT") : v3 === "none" || u2?.display === "none" ? s2("UNMOUNT") : s2(f2 && m4 !== v3 ? "ANIMATION_OUT" : "UNMOUNT"), a4.current = e4;
    }
  }, [e4, s2]), nn(() => {
    if (t4) {
      let u2 = /* @__PURE__ */ o$1((d4) => {
        let v3 = qn(n4.current).includes(d4.animationName);
        d4.target === t4 && v3 && reactDomExports.flushSync(() => s2("ANIMATION_END"));
      }, "handleAnimationEnd"), f2 = /* @__PURE__ */ o$1((d4) => {
        d4.target === t4 && (i4.current = qn(n4.current));
      }, "handleAnimationStart");
      return t4.addEventListener("animationstart", f2), t4.addEventListener("animationcancel", u2), t4.addEventListener("animationend", u2), () => {
        t4.removeEventListener("animationstart", f2), t4.removeEventListener("animationcancel", u2), t4.removeEventListener("animationend", u2);
      };
    } else
      s2("ANIMATION_END");
  }, [t4, s2]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l2),
    ref: reactExports.useCallback((u2) => {
      u2 && (n4.current = getComputedStyle(u2)), r4(u2);
    }, [])
  };
}
function qn(e4) {
  return e4?.animationName || "none";
}
function Om(e4) {
  let t4 = Object.getOwnPropertyDescriptor(e4.props, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning;
  return r4 ? e4.ref : (t4 = Object.getOwnPropertyDescriptor(e4, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning, r4 ? e4.props.ref : e4.props.ref || e4.ref);
}
var vr, l5 = C$1(() => {
  "use client";
  Un();
  Ga();
  o$1(Pm, "useStateMachine");
  vr = /* @__PURE__ */ o$1((e4) => {
    let { present: t4, children: r4 } = e4, n4 = km(t4), a4 = typeof r4 == "function" ? r4({ present: n4.isPresent }) : reactExports.Children.only(r4), i4 = it(n4.ref, Om(a4));
    return typeof r4 == "function" || n4.isPresent ? reactExports.cloneElement(a4, { ref: i4 }) : null;
  }, "Presence");
  vr.displayName = "Presence";
  o$1(km, "usePresence");
  o$1(qn, "getAnimationName");
  o$1(Om, "getElementRef");
});
function c5(e4, t4 = []) {
  let r4 = [];
  function n4(i4, c2) {
    let l2 = reactExports.createContext(c2), s2 = r4.length;
    r4 = [...r4, c2];
    function u2(d4) {
      let { scope: m4, children: v3, ...R3 } = d4, p4 = m4?.[e4][s2] || l2, h4 = reactExports.useMemo(() => R3, Object.values(R3));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(p4.Provider, { value: h4, children: v3 });
    }
    o$1(u2, "Provider");
    function f2(d4, m4) {
      let v3 = m4?.[e4][s2] || l2, R3 = reactExports.useContext(v3);
      if (R3) return R3;
      if (c2 !== void 0) return c2;
      throw new Error(`\`${d4}\` must be used within \`${i4}\``);
    }
    return o$1(f2, "useContext2"), u2.displayName = i4 + "Provider", [u2, f2];
  }
  o$1(n4, "createContext3");
  let a4 = /* @__PURE__ */ o$1(() => {
    let i4 = r4.map((c2) => reactExports.createContext(c2));
    return /* @__PURE__ */ o$1(function(l2) {
      let s2 = l2?.[e4] || i4;
      return reactExports.useMemo(
        () => ({ [`__scope${e4}`]: { ...l2, [e4]: s2 } }),
        [l2, s2]
      );
    }, "useScope");
  }, "createScope");
  return a4.scopeName = e4, [n4, Nm(a4, ...t4)];
}
function Nm(...e4) {
  let t4 = e4[0];
  if (e4.length === 1) return t4;
  let r4 = /* @__PURE__ */ o$1(() => {
    let n4 = e4.map((a4) => ({
      useScope: a4(),
      scopeName: a4.scopeName
    }));
    return /* @__PURE__ */ o$1(function(i4) {
      let c2 = n4.reduce((l2, { useScope: s2, scopeName: u2 }) => {
        let d4 = s2(i4)[`__scope${u2}`];
        return { ...l2, ...d4 };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${t4.scopeName}`]: c2 }), [c2]);
    }, "useComposedScopes");
  }, "createScope");
  return r4.scopeName = t4.scopeName, r4;
}
var s5 = C$1(() => {
  o$1(c5, "createContextScope");
  o$1(Nm, "composeContextScopes");
});
function xt(e4) {
  let t4 = reactExports.useRef(e4);
  return reactExports.useEffect(() => {
    t4.current = e4;
  }), reactExports.useMemo(() => (...r4) => t4.current?.(...r4), []);
}
var u5 = C$1(() => {
  o$1(xt, "useCallbackRef");
});
function f5(e4) {
  let t4 = reactExports.useContext(Dm);
  return e4 || t4 || "ltr";
}
var Dm, d5 = C$1(() => {
  Dm = reactExports.createContext(void 0);
  o$1(f5, "useDirection");
});
function p5(e4, [t4, r4]) {
  return Math.min(r4, Math.max(t4, e4));
}
var m5 = C$1(() => {
  o$1(p5, "clamp");
});
function Et(e4, t4, { checkForDefaultPrevented: r4 = true } = {}) {
  return /* @__PURE__ */ o$1(function(a4) {
    if (e4?.(a4), r4 === false || !a4.defaultPrevented)
      return t4?.(a4);
  }, "handleEvent");
}
var h5 = C$1(() => {
  o$1(Et, "composeEventHandlers");
});
function Fm(e4, t4) {
  return reactExports.useReducer((r4, n4) => t4[r4][n4] ?? r4, e4);
}
function Yn(e4) {
  return e4 ? parseInt(e4, 10) : 0;
}
function A5(e4, t4) {
  let r4 = e4 / t4;
  return isNaN(r4) ? 0 : r4;
}
function Zn(e4) {
  let t4 = A5(e4.viewport, e4.content), r4 = e4.scrollbar.paddingStart + e4.scrollbar.paddingEnd, n4 = (e4.scrollbar.size - r4) * t4;
  return Math.max(n4, 18);
}
function Zm(e4, t4, r4, n4 = "ltr") {
  let a4 = Zn(r4), i4 = a4 / 2, c2 = t4 || i4, l2 = a4 - c2, s2 = r4.scrollbar.paddingStart + c2, u2 = r4.scrollbar.size - r4.scrollbar.paddingEnd - l2, f2 = r4.content - r4.viewport, d4 = n4 === "ltr" ? [0, f2] : [f2 * -1, 0];
  return I5([s2, u2], d4)(e4);
}
function g5(e4, t4, r4 = "ltr") {
  let n4 = Zn(t4), a4 = t4.scrollbar.paddingStart + t4.scrollbar.paddingEnd, i4 = t4.scrollbar.size - a4, c2 = t4.content - t4.viewport, l2 = i4 - n4, s2 = r4 === "ltr" ? [0, c2] : [c2 * -1, 0], u2 = p5(e4, s2);
  return I5([0, c2], [0, l2])(u2);
}
function I5(e4, t4) {
  return (r4) => {
    if (e4[0] === e4[1] || t4[0] === t4[1]) return t4[0];
    let n4 = (t4[1] - t4[0]) / (e4[1] - e4[0]);
    return t4[0] + n4 * (r4 - e4[0]);
  };
}
function z5(e4, t4) {
  return e4 > 0 && e4 < t4;
}
function Kn(e4, t4) {
  let r4 = xt(e4), n4 = reactExports.useRef(0);
  return reactExports.useEffect(() => () => window.clearTimeout(n4.current), []), reactExports.useCallback(() => {
    window.clearTimeout(n4.current), n4.current = window.setTimeout(r4, t4);
  }, [r4, t4]);
}
function br(e4, t4) {
  let r4 = xt(t4);
  nn(() => {
    let n4 = 0;
    if (e4) {
      let a4 = new ResizeObserver(() => {
        cancelAnimationFrame(n4), n4 = window.requestAnimationFrame(r4);
      });
      return a4.observe(e4), () => {
        window.cancelAnimationFrame(n4), a4.unobserve(e4);
      };
    }
  }, [e4, r4]);
}
function Jm(e4, t4) {
  let { asChild: r4, children: n4 } = e4;
  if (!r4) return typeof t4 == "function" ? t4(n4) : t4;
  let a4 = reactExports.Children.only(n4);
  return reactExports.cloneElement(a4, {
    children: typeof t4 == "function" ? t4(a4.props.children) : t4
  });
}
var Xa, w5, ty, Vm, _e$1, b5, R5, y5, rt, x5, jm, Wm, E5, Ya, Um, qm, Gm, S5, C5, Xn, M5, Xm, Za, L5, Ym, Km, T5, H5, P5, k5, O5, B5 = C$1(() => {
  "use client";
  n5();
  l5();
  s5();
  Un();
  u5();
  d5();
  Ga();
  m5();
  h5();
  o$1(Fm, "useStateMachine");
  Xa = "ScrollArea", [w5, ty] = c5(Xa), [Vm, _e$1] = w5(Xa), b5 = reactExports.forwardRef(
    (e4, t4) => {
      let {
        __scopeScrollArea: r4,
        type: n4 = "hover",
        dir: a4,
        scrollHideDelay: i4 = 600,
        ...c2
      } = e4, [l2, s2] = reactExports.useState(null), [u2, f2] = reactExports.useState(null), [d4, m4] = reactExports.useState(null), [v3, R3] = reactExports.useState(null), [p4, h4] = reactExports.useState(
        null
      ), [g4, w3] = reactExports.useState(0), [b3, x4] = reactExports.useState(0), [E4, y4] = reactExports.useState(false), [S4, L2] = reactExports.useState(false), M2 = it(t4, (P2) => s2(P2)), A3 = f5(
        a4
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Vm,
        {
          scope: r4,
          type: n4,
          dir: A3,
          scrollHideDelay: i4,
          scrollArea: l2,
          viewport: u2,
          onViewportChange: f2,
          content: d4,
          onContentChange: m4,
          scrollbarX: v3,
          onScrollbarXChange: R3,
          scrollbarXEnabled: E4,
          onScrollbarXEnabledChange: y4,
          scrollbarY: p4,
          onScrollbarYChange: h4,
          scrollbarYEnabled: S4,
          onScrollbarYEnabledChange: L2,
          onCornerWidthChange: w3,
          onCornerHeightChange: x4,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            gr.div,
            {
              dir: A3,
              ...c2,
              ref: M2,
              style: {
                position: "relative",
                // Pass corner sizes as CSS vars to reduce re-renders of context consumers
                "--radix-scroll-area-corner-width": g4 + "px",
                "--radix-scroll-area-corner-height": b3 + "px",
                ...e4.style
              }
            }
          )
        }
      );
    }
  );
  b5.displayName = Xa;
  R5 = "ScrollAreaViewport", y5 = reactExports.forwardRef(
    (e4, t4) => {
      let { __scopeScrollArea: r4, children: n4, asChild: a4, nonce: i4, ...c2 } = e4, l2 = _e$1(R5, r4), s2 = reactExports.useRef(null), u2 = it(t4, s2, l2.onViewportChange);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "style",
          {
            dangerouslySetInnerHTML: {
              __html: `
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
:where([data-radix-scroll-area-viewport]) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
:where([data-radix-scroll-area-content]) {
  flex-grow: 1;
}
`
            },
            nonce: i4
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          gr.div,
          {
            "data-radix-scroll-area-viewport": "",
            ...c2,
            asChild: a4,
            ref: u2,
            style: {
              /**
               * We don't support `visible` because the intention is to have at least one scrollbar
               * if this component is used and `visible` will behave like `auto` in that case
               * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
               *
               * We don't handle `auto` because the intention is for the native implementation
               * to be hidden if using this component. We just want to ensure the node is scrollable
               * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
               * the browser from having to work out whether to render native scrollbars or not,
               * we tell it to with the intention of hiding them in CSS.
               */
              overflowX: l2.scrollbarXEnabled ? "scroll" : "hidden",
              overflowY: l2.scrollbarYEnabled ? "scroll" : "hidden",
              ...e4.style
            },
            children: Jm({ asChild: a4, children: n4 }, (f2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-radix-scroll-area-content": "",
                ref: l2.onContentChange,
                style: { minWidth: l2.scrollbarXEnabled ? "fit-content" : void 0 },
                children: f2
              }
            ))
          }
        )
      ] });
    }
  );
  y5.displayName = R5;
  rt = "ScrollAreaScrollbar", x5 = reactExports.forwardRef(
    (e4, t4) => {
      let { forceMount: r4, ...n4 } = e4, a4 = _e$1(rt, e4.__scopeScrollArea), { onScrollbarXEnabledChange: i4, onScrollbarYEnabledChange: c2 } = a4, l2 = e4.orientation === "horizontal";
      return reactExports.useEffect(() => (l2 ? i4(true) : c2(true), () => {
        l2 ? i4(false) : c2(false);
      }), [l2, i4, c2]), a4.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(jm, { ...n4, ref: t4, forceMount: r4 }) : a4.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Wm,
        { ...n4, ref: t4, forceMount: r4 }
      ) : a4.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(E5, { ...n4, ref: t4, forceMount: r4 }) : a4.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Ya, { ...n4, ref: t4 }) : null;
    }
  );
  x5.displayName = rt;
  jm = reactExports.forwardRef((e4, t4) => {
    let { forceMount: r4, ...n4 } = e4, a4 = _e$1(rt, e4.__scopeScrollArea), [i4, c2] = reactExports.useState(false);
    return reactExports.useEffect(() => {
      let l2 = a4.scrollArea, s2 = 0;
      if (l2) {
        let u2 = /* @__PURE__ */ o$1(() => {
          window.clearTimeout(s2), c2(true);
        }, "handlePointerEnter"), f2 = /* @__PURE__ */ o$1(() => {
          s2 = window.setTimeout(() => c2(false), a4.scrollHideDelay);
        }, "handlePointerLeave");
        return l2.addEventListener("pointerenter", u2), l2.addEventListener("pointerleave", f2), () => {
          window.clearTimeout(s2), l2.removeEventListener("pointerenter", u2), l2.removeEventListener("pointerleave", f2);
        };
      }
    }, [a4.scrollArea, a4.scrollHideDelay]), /* @__PURE__ */ jsxRuntimeExports.jsx(vr, { present: r4 || i4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      E5,
      {
        "data-state": i4 ? "visible" : "hidden",
        ...n4,
        ref: t4
      }
    ) });
  }), Wm = reactExports.forwardRef((e4, t4) => {
    let { forceMount: r4, ...n4 } = e4, a4 = _e$1(rt, e4.__scopeScrollArea), i4 = e4.orientation === "horizontal", c2 = Kn(() => s2("SCROLL_END"), 100), [l2, s2] = Fm("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    return reactExports.useEffect(() => {
      if (l2 === "idle") {
        let u2 = window.setTimeout(() => s2("HIDE"), a4.scrollHideDelay);
        return () => window.clearTimeout(u2);
      }
    }, [l2, a4.scrollHideDelay, s2]), reactExports.useEffect(() => {
      let u2 = a4.viewport, f2 = i4 ? "scrollLeft" : "scrollTop";
      if (u2) {
        let d4 = u2[f2], m4 = /* @__PURE__ */ o$1(() => {
          let v3 = u2[f2];
          d4 !== v3 && (s2("SCROLL"), c2()), d4 = v3;
        }, "handleScroll");
        return u2.addEventListener("scroll", m4), () => u2.removeEventListener("scroll", m4);
      }
    }, [a4.viewport, i4, s2, c2]), /* @__PURE__ */ jsxRuntimeExports.jsx(vr, { present: r4 || l2 !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Ya,
      {
        "data-state": l2 === "hidden" ? "hidden" : "visible",
        ...n4,
        ref: t4,
        onPointerEnter: Et(e4.onPointerEnter, () => s2("POINTER_ENTER")),
        onPointerLeave: Et(e4.onPointerLeave, () => s2("POINTER_LEAVE"))
      }
    ) });
  }), E5 = reactExports.forwardRef((e4, t4) => {
    let r4 = _e$1(rt, e4.__scopeScrollArea), { forceMount: n4, ...a4 } = e4, [i4, c2] = reactExports.useState(false), l2 = e4.orientation === "horizontal", s2 = Kn(() => {
      if (r4.viewport) {
        let u2 = r4.viewport.offsetWidth < r4.viewport.scrollWidth, f2 = r4.viewport.offsetHeight < r4.viewport.scrollHeight;
        c2(l2 ? u2 : f2);
      }
    }, 10);
    return br(r4.viewport, s2), br(r4.content, s2), /* @__PURE__ */ jsxRuntimeExports.jsx(vr, { present: n4 || i4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Ya,
      {
        "data-state": i4 ? "visible" : "hidden",
        ...a4,
        ref: t4
      }
    ) });
  }), Ya = reactExports.forwardRef((e4, t4) => {
    let { orientation: r4 = "vertical", ...n4 } = e4, a4 = _e$1(rt, e4.__scopeScrollArea), i4 = reactExports.useRef(null), c2 = reactExports.useRef(0), [l2, s2] = reactExports.useState(
      {
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
      }
    ), u2 = A5(l2.viewport, l2.content), f2 = {
      ...n4,
      sizes: l2,
      onSizesChange: s2,
      hasThumb: u2 > 0 && u2 < 1,
      onThumbChange: /* @__PURE__ */ o$1((m4) => i4.current = m4, "onThumbChange"),
      onThumbPointerUp: /* @__PURE__ */ o$1(() => c2.current = 0, "onThumbPointerUp"),
      onThumbPointerDown: /* @__PURE__ */ o$1((m4) => c2.current = m4, "onThumbPointerDown")
    };
    function d4(m4, v3) {
      return Zm(m4, c2.current, l2, v3);
    }
    return o$1(d4, "getScrollPosition"), r4 === "horizontal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Um,
      {
        ...f2,
        ref: t4,
        onThumbPositionChange: /* @__PURE__ */ o$1(() => {
          if (a4.viewport && i4.current) {
            let m4 = a4.viewport.scrollLeft, v3 = g5(m4, l2, a4.dir);
            i4.current.style.transform = `translate3d(${v3}px, 0, 0)`;
          }
        }, "onThumbPositionChange"),
        onWheelScroll: /* @__PURE__ */ o$1((m4) => {
          a4.viewport && (a4.viewport.scrollLeft = m4);
        }, "onWheelScroll"),
        onDragScroll: /* @__PURE__ */ o$1((m4) => {
          a4.viewport && (a4.viewport.scrollLeft = d4(m4, a4.dir));
        }, "onDragScroll")
      }
    ) : r4 === "vertical" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      qm,
      {
        ...f2,
        ref: t4,
        onThumbPositionChange: /* @__PURE__ */ o$1(() => {
          if (a4.viewport && i4.current) {
            let m4 = a4.viewport.scrollTop, v3 = g5(m4, l2);
            i4.current.style.transform = `translate3d(0, ${v3}px, 0)`;
          }
        }, "onThumbPositionChange"),
        onWheelScroll: /* @__PURE__ */ o$1((m4) => {
          a4.viewport && (a4.viewport.scrollTop = m4);
        }, "onWheelScroll"),
        onDragScroll: /* @__PURE__ */ o$1((m4) => {
          a4.viewport && (a4.viewport.scrollTop = d4(m4));
        }, "onDragScroll")
      }
    ) : null;
  }), Um = reactExports.forwardRef((e4, t4) => {
    let { sizes: r4, onSizesChange: n4, ...a4 } = e4, i4 = _e$1(rt, e4.__scopeScrollArea), [c2, l2] = reactExports.useState(), s2 = reactExports.useRef(null), u2 = it(t4, s2, i4.onScrollbarXChange);
    return reactExports.useEffect(() => {
      s2.current && l2(getComputedStyle(s2.current));
    }, [s2]), /* @__PURE__ */ jsxRuntimeExports.jsx(
      C5,
      {
        "data-orientation": "horizontal",
        ...a4,
        ref: u2,
        sizes: r4,
        style: {
          bottom: 0,
          left: i4.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
          right: i4.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
          "--radix-scroll-area-thumb-width": Zn(r4) + "px",
          ...e4.style
        },
        onThumbPointerDown: /* @__PURE__ */ o$1((f2) => e4.onThumbPointerDown(f2.x), "onThumbPointerDown"),
        onDragScroll: /* @__PURE__ */ o$1((f2) => e4.onDragScroll(f2.x), "onDragScroll"),
        onWheelScroll: /* @__PURE__ */ o$1((f2, d4) => {
          if (i4.viewport) {
            let m4 = i4.viewport.scrollLeft + f2.deltaX;
            e4.onWheelScroll(m4), z5(m4, d4) && f2.preventDefault();
          }
        }, "onWheelScroll"),
        onResize: /* @__PURE__ */ o$1(() => {
          s2.current && i4.viewport && c2 && n4({
            content: i4.viewport.scrollWidth,
            viewport: i4.viewport.offsetWidth,
            scrollbar: {
              size: s2.current.clientWidth,
              paddingStart: Yn(c2.paddingLeft),
              paddingEnd: Yn(c2.paddingRight)
            }
          });
        }, "onResize")
      }
    );
  }), qm = reactExports.forwardRef((e4, t4) => {
    let { sizes: r4, onSizesChange: n4, ...a4 } = e4, i4 = _e$1(rt, e4.__scopeScrollArea), [c2, l2] = reactExports.useState(), s2 = reactExports.useRef(null), u2 = it(t4, s2, i4.onScrollbarYChange);
    return reactExports.useEffect(() => {
      s2.current && l2(getComputedStyle(s2.current));
    }, [s2]), /* @__PURE__ */ jsxRuntimeExports.jsx(
      C5,
      {
        "data-orientation": "vertical",
        ...a4,
        ref: u2,
        sizes: r4,
        style: {
          top: 0,
          right: i4.dir === "ltr" ? 0 : void 0,
          left: i4.dir === "rtl" ? 0 : void 0,
          bottom: "var(--radix-scroll-area-corner-height)",
          "--radix-scroll-area-thumb-height": Zn(r4) + "px",
          ...e4.style
        },
        onThumbPointerDown: /* @__PURE__ */ o$1((f2) => e4.onThumbPointerDown(f2.y), "onThumbPointerDown"),
        onDragScroll: /* @__PURE__ */ o$1((f2) => e4.onDragScroll(f2.y), "onDragScroll"),
        onWheelScroll: /* @__PURE__ */ o$1((f2, d4) => {
          if (i4.viewport) {
            let m4 = i4.viewport.scrollTop + f2.deltaY;
            e4.onWheelScroll(m4), z5(m4, d4) && f2.preventDefault();
          }
        }, "onWheelScroll"),
        onResize: /* @__PURE__ */ o$1(() => {
          s2.current && i4.viewport && c2 && n4({
            content: i4.viewport.scrollHeight,
            viewport: i4.viewport.offsetHeight,
            scrollbar: {
              size: s2.current.clientHeight,
              paddingStart: Yn(c2.paddingTop),
              paddingEnd: Yn(c2.paddingBottom)
            }
          });
        }, "onResize")
      }
    );
  }), [Gm, S5] = w5(rt), C5 = reactExports.forwardRef((e4, t4) => {
    let {
      __scopeScrollArea: r4,
      sizes: n4,
      hasThumb: a4,
      onThumbChange: i4,
      onThumbPointerUp: c2,
      onThumbPointerDown: l2,
      onThumbPositionChange: s2,
      onDragScroll: u2,
      onWheelScroll: f2,
      onResize: d4,
      ...m4
    } = e4, v3 = _e$1(rt, r4), [R3, p4] = reactExports.useState(null), h4 = it(t4, (M2) => p4(M2)), g4 = reactExports.useRef(null), w3 = reactExports.useRef(""), b3 = v3.viewport, x4 = n4.content - n4.viewport, E4 = xt(f2), y4 = xt(s2), S4 = Kn(d4, 10);
    function L2(M2) {
      if (g4.current) {
        let A3 = M2.clientX - g4.current.left, P2 = M2.clientY - g4.current.top;
        u2({ x: A3, y: P2 });
      }
    }
    return o$1(L2, "handleDragScroll"), reactExports.useEffect(() => {
      let M2 = /* @__PURE__ */ o$1((A3) => {
        let P2 = A3.target;
        R3?.contains(P2) && E4(A3, x4);
      }, "handleWheel");
      return document.addEventListener("wheel", M2, { passive: false }), () => document.removeEventListener("wheel", M2, { passive: false });
    }, [b3, R3, x4, E4]), reactExports.useEffect(y4, [n4, y4]), br(R3, S4), br(v3.content, S4), /* @__PURE__ */ jsxRuntimeExports.jsx(
      Gm,
      {
        scope: r4,
        scrollbar: R3,
        hasThumb: a4,
        onThumbChange: xt(i4),
        onThumbPointerUp: xt(c2),
        onThumbPositionChange: y4,
        onThumbPointerDown: xt(l2),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          gr.div,
          {
            ...m4,
            ref: h4,
            style: { position: "absolute", ...m4.style },
            onPointerDown: Et(e4.onPointerDown, (M2) => {
              M2.button === 0 && (M2.target.setPointerCapture(M2.pointerId), g4.current = R3.getBoundingClientRect(), w3.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", v3.viewport && (v3.viewport.style.scrollBehavior = "auto"), L2(M2));
            }),
            onPointerMove: Et(e4.onPointerMove, L2),
            onPointerUp: Et(e4.onPointerUp, (M2) => {
              let A3 = M2.target;
              A3.hasPointerCapture(M2.pointerId) && A3.releasePointerCapture(M2.pointerId), document.body.style.webkitUserSelect = w3.current, v3.viewport && (v3.viewport.style.scrollBehavior = ""), g4.current = null;
            })
          }
        )
      }
    );
  }), Xn = "ScrollAreaThumb", M5 = reactExports.forwardRef(
    (e4, t4) => {
      let { forceMount: r4, ...n4 } = e4, a4 = S5(Xn, e4.__scopeScrollArea);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(vr, { present: r4 || a4.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Xm, { ref: t4, ...n4 }) });
    }
  ), Xm = reactExports.forwardRef(
    (e4, t4) => {
      let { __scopeScrollArea: r4, style: n4, ...a4 } = e4, i4 = _e$1(Xn, r4), c2 = S5(Xn, r4), { onThumbPositionChange: l2 } = c2, s2 = it(
        t4,
        (d4) => c2.onThumbChange(d4)
      ), u2 = reactExports.useRef(), f2 = Kn(() => {
        u2.current && (u2.current(), u2.current = void 0);
      }, 100);
      return reactExports.useEffect(() => {
        let d4 = i4.viewport;
        if (d4) {
          let m4 = /* @__PURE__ */ o$1(() => {
            if (f2(), !u2.current) {
              let v3 = Km(d4, l2);
              u2.current = v3, l2();
            }
          }, "handleScroll");
          return l2(), d4.addEventListener("scroll", m4), () => d4.removeEventListener("scroll", m4);
        }
      }, [i4.viewport, f2, l2]), /* @__PURE__ */ jsxRuntimeExports.jsx(
        gr.div,
        {
          "data-state": c2.hasThumb ? "visible" : "hidden",
          ...a4,
          ref: s2,
          style: {
            width: "var(--radix-scroll-area-thumb-width)",
            height: "var(--radix-scroll-area-thumb-height)",
            ...n4
          },
          onPointerDownCapture: Et(e4.onPointerDownCapture, (d4) => {
            let v3 = d4.target.getBoundingClientRect(), R3 = d4.clientX - v3.left, p4 = d4.clientY - v3.top;
            c2.onThumbPointerDown({ x: R3, y: p4 });
          }),
          onPointerUp: Et(e4.onPointerUp, c2.onThumbPointerUp)
        }
      );
    }
  );
  M5.displayName = Xn;
  Za = "ScrollAreaCorner", L5 = reactExports.forwardRef(
    (e4, t4) => {
      let r4 = _e$1(Za, e4.__scopeScrollArea), n4 = !!(r4.scrollbarX && r4.scrollbarY);
      return r4.type !== "scroll" && n4 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Ym, { ...e4, ref: t4 }) : null;
    }
  );
  L5.displayName = Za;
  Ym = reactExports.forwardRef((e4, t4) => {
    let { __scopeScrollArea: r4, ...n4 } = e4, a4 = _e$1(Za, r4), [i4, c2] = reactExports.useState(0), [l2, s2] = reactExports.useState(0), u2 = !!(i4 && l2);
    return br(a4.scrollbarX, () => {
      let f2 = a4.scrollbarX?.offsetHeight || 0;
      a4.onCornerHeightChange(f2), s2(f2);
    }), br(a4.scrollbarY, () => {
      let f2 = a4.scrollbarY?.offsetWidth || 0;
      a4.onCornerWidthChange(f2), c2(f2);
    }), u2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      gr.div,
      {
        ...n4,
        ref: t4,
        style: {
          width: i4,
          height: l2,
          position: "absolute",
          right: a4.dir === "ltr" ? 0 : void 0,
          left: a4.dir === "rtl" ? 0 : void 0,
          bottom: 0,
          ...e4.style
        }
      }
    ) : null;
  });
  o$1(Yn, "toInt");
  o$1(A5, "getThumbRatio");
  o$1(Zn, "getThumbSize");
  o$1(Zm, "getScrollPositionFromPointer");
  o$1(g5, "getThumbOffsetFromScroll");
  o$1(I5, "linearScale");
  o$1(z5, "isScrollingWithinScrollbarBounds");
  Km = /* @__PURE__ */ o$1((e4, t4 = () => {
  }) => {
    let r4 = { left: e4.scrollLeft, top: e4.scrollTop }, n4 = 0;
    return (/* @__PURE__ */ o$1(function a4() {
      let i4 = { left: e4.scrollLeft, top: e4.scrollTop }, c2 = r4.left !== i4.left, l2 = r4.top !== i4.top;
      (c2 || l2) && t4(), r4 = i4, n4 = window.requestAnimationFrame(a4);
    }, "loop"))(), () => window.cancelAnimationFrame(n4);
  }, "addUnlinkedScrollListener");
  o$1(Kn, "useDebounceCallback");
  o$1(br, "useResizeObserver");
  o$1(Jm, "getSubtree");
  T5 = b5, H5 = y5, P5 = x5, k5 = M5, O5 = L5;
});
var th, rh, N5, D5, Rr, Qn = C$1(() => {
  B5();
  th = xr$1(T5)(
    ({ scrollbarsize: e4, offset: t4 }) => ({
      width: "100%",
      height: "100%",
      overflow: "hidden",
      "--scrollbar-size": `${e4 + t4}px`,
      "--radix-scroll-area-thumb-width": `${e4}px`
    })
  ), rh = xr$1(H5)({
    width: "100%",
    height: "100%"
  }), N5 = xr$1(P5)(({ offset: e4, horizontal: t4, vertical: r4 }) => ({
    display: "flex",
    userSelect: "none",
    // ensures no selection
    touchAction: "none",
    // disable browser handling of all panning and zooming gestures on touch devices
    background: "transparent",
    transition: "all 0.2s ease-out",
    borderRadius: "var(--scrollbar-size)",
    zIndex: 1,
    '&[data-orientation="vertical"]': {
      width: "var(--scrollbar-size)",
      paddingRight: e4,
      marginTop: e4,
      marginBottom: t4 === "true" && r4 === "true" ? 0 : e4
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: "var(--scrollbar-size)",
      paddingBottom: e4,
      marginLeft: e4,
      marginRight: t4 === "true" && r4 === "true" ? 0 : e4
    }
  })), D5 = xr$1(k5)(({ theme: e4 }) => ({
    flex: 1,
    background: e4.textMutedColor,
    opacity: 0.5,
    borderRadius: "var(--scrollbar-size)",
    position: "relative",
    transition: "opacity 0.2s ease-out",
    "&:hover": { opacity: 0.8 },
    /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
    "::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "100%",
      height: "100%"
    }
  })), Rr = reactExports.forwardRef(
    ({ children: e$1, horizontal: t4 = false, vertical: r4 = false, offset: n4 = 2, scrollbarSize: a4 = 6, className: i4 }, c2) => /* @__PURE__ */ e.createElement(
      th,
      { scrollbarsize: a4, offset: n4, className: i4 },
      /* @__PURE__ */ e.createElement(rh, { ref: c2 }, e$1),
      t4 && /* @__PURE__ */ e.createElement(
        N5,
        {
          orientation: "horizontal",
          offset: n4,
          horizontal: t4.toString(),
          vertical: r4.toString()
        },
        /* @__PURE__ */ e.createElement(D5, null)
      ),
      r4 && /* @__PURE__ */ e.createElement(
        N5,
        {
          orientation: "vertical",
          offset: n4,
          horizontal: t4.toString(),
          vertical: r4.toString()
        },
        /* @__PURE__ */ e.createElement(D5, null)
      ),
      t4 && r4 && /* @__PURE__ */ e.createElement(O5, null)
    )
  );
  Rr.displayName = "ScrollArea";
});
var Qa = {};
Xr(Qa, {
  SyntaxHighlighter: () => ln,
  createCopyToClipboardFunction: () => Ja,
  default: () => gh,
  supportedLanguages: () => $5
});
const { logger: ah } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const { global: ih } = __STORYBOOK_MODULE_GLOBAL__;
function Ja() {
  if (Ka.top?.navigator?.clipboard) {
    let e4 = Ka.top.navigator.clipboard;
    return async (t4) => e4.writeText(t4);
  }
  return async (e4) => {
    let t4 = on.createElement("TEXTAREA"), r4 = on.activeElement;
    t4.value = e4, on.body.appendChild(t4), t4.select(), on.execCommand("copy"), on.body.removeChild(t4), r4.focus();
  };
}
var _5, Cy, on, Ka, $5, lh, ch, sh, uh, fh, dh, ph, V5, mh, hh, ln, gh, cn = C$1(() => {
  _5 = me$1(Kr(), 1);
  t1();
  i1();
  s1();
  m1();
  b1();
  S1();
  A1();
  P1();
  B1();
  V1();
  U1();
  Z1();
  e1();
  Va();
  Qn();
  ({ navigator: Cy, document: on, window: Ka } = ih), $5 = {
    jsextra: w1,
    jsx: L1,
    json: E1,
    yml: Y1,
    md: H1,
    bash: a1,
    css: c1,
    html: O1,
    tsx: $1,
    typescript: W1,
    graphql: p1
  };
  Object.entries($5).forEach(([e4, t4]) => {
    Wn.registerLanguage(e4, t4);
  });
  lh = (0, _5.default)(2)(
    (e4) => Object.entries(e4.code || {}).reduce((t4, [r4, n4]) => ({ ...t4, [`* .${r4}`]: n4 }), {})
  ), ch = Ja();
  o$1(Ja, "createCopyToClipboardFunction");
  sh = xr$1.div(
    ({ theme: e4 }) => ({
      position: "relative",
      overflow: "hidden",
      color: e4.color.defaultText
    }),
    ({ theme: e4, bordered: t4 }) => t4 ? {
      border: `1px solid ${e4.appBorderColor}`,
      borderRadius: e4.borderRadius,
      background: e4.background.content
    } : {},
    ({ showLineNumbers: e4 }) => e4 ? {
      // use the before pseudo element to display line numbers
      ".react-syntax-highlighter-line-number::before": {
        content: "attr(data-line-number)"
      }
    } : {}
  ), uh = /* @__PURE__ */ o$1(({ children: e$1, className: t4 }) => /* @__PURE__ */ e.createElement(
    Rr,
    { horizontal: true, vertical: true, className: t4 },
    e$1
  ), "UnstyledScroller"), fh = xr$1(uh)(
    {
      position: "relative"
    },
    ({ theme: e4 }) => lh(e4)
  ), dh = xr$1.pre(({ theme: e4, padded: t4 }) => ({
    display: "flex",
    justifyContent: "flex-start",
    margin: 0,
    padding: t4 ? e4.layoutMargin : 0
  })), ph = xr$1.div(({ theme: e4 }) => ({
    flex: 1,
    paddingLeft: 2,
    // TODO: To match theming/global.ts for now
    paddingRight: e4.layoutMargin,
    opacity: 1,
    fontFamily: e4.typography.fonts.mono
  })), V5 = /* @__PURE__ */ o$1((e4) => {
    let t4 = [...e4.children], r4 = t4[0], n4 = r4.children[0].value, a4 = {
      ...r4,
      // empty the line-number element
      children: [],
      properties: {
        ...r4.properties,
        // add a data-line-number attribute to line-number element, so we can access the line number with `content: attr(data-line-number)`
        "data-line-number": n4,
        // remove the 'userSelect: none' style, which will produce extra empty lines when copy-pasting in firefox
        style: { ...r4.properties.style, userSelect: "auto" }
      }
    };
    return t4[0] = a4, { ...e4, children: t4 };
  }, "processLineNumber"), mh = /* @__PURE__ */ o$1(({ rows: e4, stylesheet: t4, useInlineStyles: r4 }) => e4.map((n4, a4) => _t({
    node: V5(n4),
    stylesheet: t4,
    useInlineStyles: r4,
    key: `code-segement${a4}`
  })), "defaultRenderer"), hh = /* @__PURE__ */ o$1((e4, t4) => t4 ? e4 ? ({ rows: r4, ...n4 }) => e4({ rows: r4.map((a4) => V5(a4)), ...n4 }) : mh : e4, "wrapRenderer"), ln = /* @__PURE__ */ o$1(({
    children: e$1,
    language: t4 = "jsx",
    copyable: r4 = false,
    bordered: n4 = false,
    padded: a4 = false,
    format: i4 = true,
    formatter: c2 = void 0,
    className: l2 = void 0,
    showLineNumbers: s2 = false,
    ...u2
  }) => {
    if (typeof e$1 != "string" || !e$1.trim())
      return null;
    let [f2, d4] = reactExports.useState("");
    reactExports.useEffect(() => {
      c2 ? c2(i4, e$1).then(d4) : d4(e$1.trim());
    }, [e$1, i4, c2]);
    let [m4, v3] = reactExports.useState(false), R3 = reactExports.useCallback(
      (h4) => {
        h4.preventDefault(), ch(f2).then(() => {
          v3(true), Ka.setTimeout(() => v3(false), 1500);
        }).catch(ah.error);
      },
      [f2]
    ), p4 = hh(u2.renderer, s2);
    return /* @__PURE__ */ e.createElement(
      sh,
      {
        bordered: n4,
        padded: a4,
        showLineNumbers: s2,
        className: l2
      },
      /* @__PURE__ */ e.createElement(fh, null, /* @__PURE__ */ e.createElement(
        Wn,
        {
          padded: a4 || n4,
          language: t4,
          showLineNumbers: s2,
          showInlineLineNumbers: s2,
          useInlineStyles: false,
          PreTag: dh,
          CodeTag: ph,
          lineNumberContainerStyle: {},
          ...u2,
          renderer: p4
        },
        f2
      )),
      r4 ? /* @__PURE__ */ e.createElement($a, { actionItems: [{ title: m4 ? "Copied" : "Copy", onClick: R3 }] }) : null
    );
  }, "SyntaxHighlighter");
  ln.registerLanguage = (...e4) => Wn.registerLanguage(...e4);
  gh = ln;
});
function Z5(e4) {
  for (var t4 = [], r4 = 1; r4 < arguments.length; r4++)
    t4[r4 - 1] = arguments[r4];
  var n4 = Array.from(typeof e4 == "string" ? [e4] : e4);
  n4[n4.length - 1] = n4[n4.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a4 = n4.reduce(function(l2, s2) {
    var u2 = s2.match(/\n([\t ]+|(?!\s).)/g);
    return u2 ? l2.concat(u2.map(function(f2) {
      var d4, m4;
      return (m4 = (d4 = f2.match(/[\t ]/g)) === null || d4 === void 0 ? void 0 : d4.length) !== null && m4 !== void 0 ? m4 : 0;
    })) : l2;
  }, []);
  if (a4.length) {
    var i4 = new RegExp(`
[	 ]{` + Math.min.apply(Math, a4) + "}", "g");
    n4 = n4.map(function(l2) {
      return l2.replace(i4, `
`);
    });
  }
  n4[0] = n4[0].replace(/^\r?\n/, "");
  var c2 = n4[0];
  return t4.forEach(function(l2, s2) {
    var u2 = c2.match(/(?:^|\n)( *)$/), f2 = u2 ? u2[1] : "", d4 = l2;
    typeof l2 == "string" && l2.includes(`
`) && (d4 = String(l2).split(`
`).map(function(m4, v3) {
      return v3 === 0 ? m4 : "" + f2 + m4;
    }).join(`
`)), c2 += d4 + n4[s2 + 1];
  }), c2;
}
var K5 = C$1(() => {
  o$1(Z5, "dedent");
});
var Q5 = {};
Xr(Q5, {
  formatter: () => Qh
});
var J5, Qh, eu = C$1(() => {
  J5 = me$1(Kr(), 1);
  K5();
  Qh = (0, J5.default)(2)(async (e4, t4) => e4 === false ? t4 : Z5(t4));
});
var A0, I0, Of = C$1(() => {
  A0 = /* @__PURE__ */ o$1(function(t4) {
    return t4.reduce(function(r4, n4) {
      var a4 = n4[0], i4 = n4[1];
      return r4[a4] = i4, r4;
    }, {});
  }, "fromEntries"), I0 = typeof window < "u" && window.document && window.document.createElement ? reactExports.useLayoutEffect : reactExports.useEffect;
});
var te$1, le$1, ae$1, ne$1, xo, Lt, ut, Kt, Bf, Eo, Hr, Nf, z0, So, D7, F7, _7, $7, V7, j7, W7, U7, q7, Df, ke$1 = C$1(() => {
  te$1 = "top", le$1 = "bottom", ae$1 = "right", ne$1 = "left", xo = "auto", Lt = [te$1, le$1, ae$1, ne$1], ut = "start", Kt = "end", Bf = "clippingParents", Eo = "viewport", Hr = "popper", Nf = "reference", z0 = /* @__PURE__ */ Lt.reduce(function(e4, t4) {
    return e4.concat([t4 + "-" + ut, t4 + "-" + Kt]);
  }, []), So = /* @__PURE__ */ [].concat(Lt, [xo]).reduce(function(e4, t4) {
    return e4.concat([t4, t4 + "-" + ut, t4 + "-" + Kt]);
  }, []), D7 = "beforeRead", F7 = "read", _7 = "afterRead", $7 = "beforeMain", V7 = "main", j7 = "afterMain", W7 = "beforeWrite", U7 = "write", q7 = "afterWrite", Df = [D7, F7, _7, $7, V7, j7, W7, U7, q7];
});
function fe$1(e4) {
  return e4 ? (e4.nodeName || "").toLowerCase() : null;
}
var At = C$1(() => {
  o$1(fe$1, "getNodeName");
});
function Z$1(e4) {
  if (e4 == null)
    return window;
  if (e4.toString() !== "[object Window]") {
    var t4 = e4.ownerDocument;
    return t4 && t4.defaultView || window;
  }
  return e4;
}
var Je = C$1(() => {
  o$1(Z$1, "getWindow");
});
function We$1(e4) {
  var t4 = Z$1(e4).Element;
  return e4 instanceof t4 || e4 instanceof Element;
}
function ce$1(e4) {
  var t4 = Z$1(e4).HTMLElement;
  return e4 instanceof t4 || e4 instanceof HTMLElement;
}
function Pr(e4) {
  if (typeof ShadowRoot > "u")
    return false;
  var t4 = Z$1(e4).ShadowRoot;
  return e4 instanceof t4 || e4 instanceof ShadowRoot;
}
var Oe$1 = C$1(() => {
  Je();
  o$1(We$1, "isElement");
  o$1(ce$1, "isHTMLElement");
  o$1(Pr, "isShadowRoot");
});
function G7(e4) {
  var t4 = e4.state;
  Object.keys(t4.elements).forEach(function(r4) {
    var n4 = t4.styles[r4] || {}, a4 = t4.attributes[r4] || {}, i4 = t4.elements[r4];
    !ce$1(i4) || !fe$1(i4) || (Object.assign(i4.style, n4), Object.keys(a4).forEach(function(c2) {
      var l2 = a4[c2];
      l2 === false ? i4.removeAttribute(c2) : i4.setAttribute(c2, l2 === true ? "" : l2);
    }));
  });
}
function X7(e4) {
  var t4 = e4.state, r4 = {
    popper: {
      position: t4.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t4.elements.popper.style, r4.popper), t4.styles = r4, t4.elements.arrow && Object.assign(t4.elements.arrow.style, r4.arrow), function() {
    Object.keys(t4.elements).forEach(function(n4) {
      var a4 = t4.elements[n4], i4 = t4.attributes[n4] || {}, c2 = Object.keys(t4.styles.hasOwnProperty(n4) ? t4.styles[n4] : r4[n4]), l2 = c2.reduce(function(s2, u2) {
        return s2[u2] = "", s2;
      }, {});
      !ce$1(a4) || !fe$1(a4) || (Object.assign(a4.style, l2), Object.keys(i4).forEach(function(s2) {
        a4.removeAttribute(s2);
      }));
    });
  };
}
var Ff, _f = C$1(() => {
  At();
  Oe$1();
  o$1(G7, "applyStyles");
  o$1(X7, "effect");
  Ff = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: G7,
    effect: X7,
    requires: ["computeStyles"]
  };
});
function de$1(e4) {
  return e4.split("-")[0];
}
var It = C$1(() => {
  o$1(de$1, "getBasePlacement");
});
var Qe$1, Jt, ft, zt = C$1(() => {
  Qe$1 = Math.max, Jt = Math.min, ft = Math.round;
});
function kr() {
  var e4 = navigator.userAgentData;
  return e4 != null && e4.brands && Array.isArray(e4.brands) ? e4.brands.map(function(t4) {
    return t4.brand + "/" + t4.version;
  }).join(" ") : navigator.userAgent;
}
var T0 = C$1(() => {
  o$1(kr, "getUAString");
});
function hn() {
  return !/^((?!chrome|android).)*safari/i.test(kr());
}
var H0 = C$1(() => {
  T0();
  o$1(hn, "isLayoutViewport");
});
function Ue$1(e4, t4, r4) {
  t4 === void 0 && (t4 = false), r4 === void 0 && (r4 = false);
  var n4 = e4.getBoundingClientRect(), a4 = 1, i4 = 1;
  t4 && ce$1(e4) && (a4 = e4.offsetWidth > 0 && ft(n4.width) / e4.offsetWidth || 1, i4 = e4.offsetHeight > 0 && ft(n4.height) / e4.offsetHeight || 1);
  var c2 = We$1(e4) ? Z$1(e4) : window, l2 = c2.visualViewport, s2 = !hn() && r4, u2 = (n4.left + (s2 && l2 ? l2.offsetLeft : 0)) / a4, f2 = (n4.top + (s2 && l2 ? l2.offsetTop : 0)) / i4, d4 = n4.width / a4, m4 = n4.height / i4;
  return {
    width: d4,
    height: m4,
    top: f2,
    right: u2 + d4,
    bottom: f2 + m4,
    left: u2,
    x: u2,
    y: f2
  };
}
var Or = C$1(() => {
  Oe$1();
  zt();
  Je();
  H0();
  o$1(Ue$1, "getBoundingClientRect");
});
function Qt(e4) {
  var t4 = Ue$1(e4), r4 = e4.offsetWidth, n4 = e4.offsetHeight;
  return Math.abs(t4.width - r4) <= 1 && (r4 = t4.width), Math.abs(t4.height - n4) <= 1 && (n4 = t4.height), {
    x: e4.offsetLeft,
    y: e4.offsetTop,
    width: r4,
    height: n4
  };
}
var Co = C$1(() => {
  Or();
  o$1(Qt, "getLayoutRect");
});
function gn(e4, t4) {
  var r4 = t4.getRootNode && t4.getRootNode();
  if (e4.contains(t4))
    return true;
  if (r4 && Pr(r4)) {
    var n4 = t4;
    do {
      if (n4 && e4.isSameNode(n4))
        return true;
      n4 = n4.parentNode || n4.host;
    } while (n4);
  }
  return false;
}
var P0 = C$1(() => {
  Oe$1();
  o$1(gn, "contains");
});
function xe$1(e4) {
  return Z$1(e4).getComputedStyle(e4);
}
var Br = C$1(() => {
  Je();
  o$1(xe$1, "getComputedStyle");
});
function k0(e4) {
  return ["table", "td", "th"].indexOf(fe$1(e4)) >= 0;
}
var $f = C$1(() => {
  At();
  o$1(k0, "isTableElement");
});
function ge$1(e4) {
  return ((We$1(e4) ? e4.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e4.document
  )) || window.document).documentElement;
}
var dt = C$1(() => {
  Oe$1();
  o$1(ge$1, "getDocumentElement");
});
function pt(e4) {
  return fe$1(e4) === "html" ? e4 : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e4.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e4.parentNode || // DOM Element detected
    (Pr(e4) ? e4.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ge$1(e4)
  );
}
var vn = C$1(() => {
  At();
  dt();
  Oe$1();
  o$1(pt, "getParentNode");
});
function Vf(e4) {
  return !ce$1(e4) || // https://github.com/popperjs/popper-core/issues/837
  xe$1(e4).position === "fixed" ? null : e4.offsetParent;
}
function Y7(e4) {
  var t4 = /firefox/i.test(kr()), r4 = /Trident/i.test(kr());
  if (r4 && ce$1(e4)) {
    var n4 = xe$1(e4);
    if (n4.position === "fixed")
      return null;
  }
  var a4 = pt(e4);
  for (Pr(a4) && (a4 = a4.host); ce$1(a4) && ["html", "body"].indexOf(fe$1(a4)) < 0; ) {
    var i4 = xe$1(a4);
    if (i4.transform !== "none" || i4.perspective !== "none" || i4.contain === "paint" || ["transform", "perspective"].indexOf(i4.willChange) !== -1 || t4 && i4.willChange === "filter" || t4 && i4.filter && i4.filter !== "none")
      return a4;
    a4 = a4.parentNode;
  }
  return null;
}
function et(e4) {
  for (var t4 = Z$1(e4), r4 = Vf(e4); r4 && k0(r4) && xe$1(r4).position === "static"; )
    r4 = Vf(r4);
  return r4 && (fe$1(r4) === "html" || fe$1(r4) === "body" && xe$1(r4).position === "static") ? t4 : r4 || Y7(e4) || t4;
}
var Nr = C$1(() => {
  Je();
  At();
  Br();
  Oe$1();
  $f();
  vn();
  T0();
  o$1(Vf, "getTrueOffsetParent");
  o$1(Y7, "getContainingBlock");
  o$1(et, "getOffsetParent");
});
function er(e4) {
  return ["top", "bottom"].indexOf(e4) >= 0 ? "x" : "y";
}
var Mo = C$1(() => {
  o$1(er, "getMainAxisFromPlacement");
});
function tr(e4, t4, r4) {
  return Qe$1(e4, Jt(t4, r4));
}
function jf(e4, t4, r4) {
  var n4 = tr(e4, t4, r4);
  return n4 > r4 ? r4 : n4;
}
var O0 = C$1(() => {
  zt();
  o$1(tr, "within");
  o$1(jf, "withinMaxClamp");
});
function wn() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
var B0 = C$1(() => {
  o$1(wn, "getFreshSideObject");
});
function bn(e4) {
  return Object.assign({}, wn(), e4);
}
var N0 = C$1(() => {
  B0();
  o$1(bn, "mergePaddingObject");
});
function Rn(e4, t4) {
  return t4.reduce(function(r4, n4) {
    return r4[n4] = e4, r4;
  }, {});
}
var D0 = C$1(() => {
  o$1(Rn, "expandToHashMap");
});
function K7(e4) {
  var t4, r4 = e4.state, n4 = e4.name, a4 = e4.options, i4 = r4.elements.arrow, c2 = r4.modifiersData.popperOffsets, l2 = de$1(r4.placement), s2 = er(l2), u2 = [
    ne$1,
    ae$1
  ].indexOf(l2) >= 0, f2 = u2 ? "height" : "width";
  if (!(!i4 || !c2)) {
    var d4 = Z7(a4.padding, r4), m4 = Qt(i4), v3 = s2 === "y" ? te$1 : ne$1, R3 = s2 === "y" ? le$1 : ae$1, p4 = r4.rects.reference[f2] + r4.rects.reference[s2] - c2[s2] - r4.rects.popper[f2], h4 = c2[s2] - r4.rects.reference[s2], g4 = et(i4), w3 = g4 ? s2 === "y" ? g4.clientHeight || 0 : g4.clientWidth || 0 : 0, b3 = p4 / 2 - h4 / 2, x4 = d4[v3], E4 = w3 - m4[f2] - d4[R3], y4 = w3 / 2 - m4[f2] / 2 + b3, S4 = tr(x4, y4, E4), L2 = s2;
    r4.modifiersData[n4] = (t4 = {}, t4[L2] = S4, t4.centerOffset = S4 - y4, t4);
  }
}
function J7(e4) {
  var t4 = e4.state, r4 = e4.options, n4 = r4.element, a4 = n4 === void 0 ? "[data-popper-arrow]" : n4;
  a4 != null && (typeof a4 == "string" && (a4 = t4.elements.popper.querySelector(a4), !a4) || gn(t4.elements.popper, a4) && (t4.elements.arrow = a4));
}
var Z7, Wf, Uf = C$1(() => {
  It();
  Co();
  P0();
  Nr();
  Mo();
  O0();
  N0();
  D0();
  ke$1();
  Z7 = /* @__PURE__ */ o$1(function(t4, r4) {
    return t4 = typeof t4 == "function" ? t4(Object.assign({}, r4.rects, {
      placement: r4.placement
    })) : t4, bn(typeof t4 != "number" ? t4 : Rn(t4, Lt));
  }, "toPaddingObject");
  o$1(K7, "arrow");
  o$1(J7, "effect");
  Wf = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: K7,
    effect: J7,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
});
function qe$1(e4) {
  return e4.split("-")[1];
}
var Dr = C$1(() => {
  o$1(qe$1, "getVariation");
});
function e3(e4, t4) {
  var r4 = e4.x, n4 = e4.y, a4 = t4.devicePixelRatio || 1;
  return {
    x: ft(r4 * a4) / a4 || 0,
    y: ft(n4 * a4) / a4 || 0
  };
}
function qf(e4) {
  var t4, r4 = e4.popper, n4 = e4.popperRect, a4 = e4.placement, i4 = e4.variation, c2 = e4.offsets, l2 = e4.position, s2 = e4.gpuAcceleration, u2 = e4.adaptive, f2 = e4.roundOffsets, d4 = e4.isFixed, m4 = c2.x, v3 = m4 === void 0 ? 0 : m4, R3 = c2.y, p4 = R3 === void 0 ? 0 : R3, h4 = typeof f2 == "function" ? f2({
    x: v3,
    y: p4
  }) : {
    x: v3,
    y: p4
  };
  v3 = h4.x, p4 = h4.y;
  var g4 = c2.hasOwnProperty("x"), w3 = c2.hasOwnProperty("y"), b3 = ne$1, x4 = te$1, E4 = window;
  if (u2) {
    var y4 = et(r4), S4 = "clientHeight", L2 = "clientWidth";
    if (y4 === Z$1(r4) && (y4 = ge$1(r4), xe$1(y4).position !== "static" && l2 === "absolute" && (S4 = "scrollHeight", L2 = "scrollWidth")), y4 = y4, a4 === te$1 || (a4 === ne$1 || a4 === ae$1) && i4 === Kt) {
      x4 = le$1;
      var M2 = d4 && y4 === E4 && E4.visualViewport ? E4.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        y4[S4]
      );
      p4 -= M2 - n4.height, p4 *= s2 ? 1 : -1;
    }
    if (a4 === ne$1 || (a4 === te$1 || a4 === le$1) && i4 === Kt) {
      b3 = ae$1;
      var A3 = d4 && y4 === E4 && E4.visualViewport ? E4.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        y4[L2]
      );
      v3 -= A3 - n4.width, v3 *= s2 ? 1 : -1;
    }
  }
  var P2 = Object.assign({
    position: l2
  }, u2 && Q7), _2 = f2 === true ? e3({
    x: v3,
    y: p4
  }, Z$1(r4)) : {
    x: v3,
    y: p4
  };
  if (v3 = _2.x, p4 = _2.y, s2) {
    var F2;
    return Object.assign({}, P2, (F2 = {}, F2[x4] = w3 ? "0" : "", F2[b3] = g4 ? "0" : "", F2.transform = (E4.devicePixelRatio || 1) <= 1 ? "translate(" + v3 + "px, " + p4 + "px)" : "translate3d(" + v3 + "px, " + p4 + "px, 0)", F2));
  }
  return Object.assign({}, P2, (t4 = {}, t4[x4] = w3 ? p4 + "px" : "", t4[b3] = g4 ? v3 + "px" : "", t4.transform = "", t4));
}
function t3(e4) {
  var t4 = e4.state, r4 = e4.options, n4 = r4.gpuAcceleration, a4 = n4 === void 0 ? true : n4, i4 = r4.adaptive, c2 = i4 === void 0 ? true : i4, l2 = r4.roundOffsets, s2 = l2 === void 0 ? true : l2, u2 = {
    placement: de$1(t4.placement),
    variation: qe$1(t4.placement),
    popper: t4.elements.popper,
    popperRect: t4.rects.popper,
    gpuAcceleration: a4,
    isFixed: t4.options.strategy === "fixed"
  };
  t4.modifiersData.popperOffsets != null && (t4.styles.popper = Object.assign({}, t4.styles.popper, qf(Object.assign({}, u2, {
    offsets: t4.modifiersData.popperOffsets,
    position: t4.options.strategy,
    adaptive: c2,
    roundOffsets: s2
  })))), t4.modifiersData.arrow != null && (t4.styles.arrow = Object.assign({}, t4.styles.arrow, qf(Object.assign({}, u2, {
    offsets: t4.modifiersData.arrow,
    position: "absolute",
    adaptive: false,
    roundOffsets: s2
  })))), t4.attributes.popper = Object.assign({}, t4.attributes.popper, {
    "data-popper-placement": t4.placement
  });
}
var Q7, Gf, Xf = C$1(() => {
  ke$1();
  Nr();
  Je();
  dt();
  Br();
  It();
  Dr();
  zt();
  Q7 = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  o$1(e3, "roundOffsetsByDPR");
  o$1(qf, "mapToStyles");
  o$1(t3, "computeStyles");
  Gf = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: t3,
    data: {}
  };
});
function r3(e4) {
  var t4 = e4.state, r4 = e4.instance, n4 = e4.options, a4 = n4.scroll, i4 = a4 === void 0 ? true : a4, c2 = n4.resize, l2 = c2 === void 0 ? true : c2, s2 = Z$1(t4.elements.popper), u2 = [].concat(t4.scrollParents.reference, t4.scrollParents.popper);
  return i4 && u2.forEach(function(f2) {
    f2.addEventListener("scroll", r4.update, Lo);
  }), l2 && s2.addEventListener("resize", r4.update, Lo), function() {
    i4 && u2.forEach(function(f2) {
      f2.removeEventListener("scroll", r4.update, Lo);
    }), l2 && s2.removeEventListener("resize", r4.update, Lo);
  };
}
var Lo, Yf, Zf = C$1(() => {
  Je();
  Lo = {
    passive: true
  };
  o$1(r3, "effect");
  Yf = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: /* @__PURE__ */ o$1(function() {
    }, "fn"),
    effect: r3,
    data: {}
  };
});
function Fr(e4) {
  return e4.replace(/left|right|bottom|top/g, function(t4) {
    return n3[t4];
  });
}
var n3, Kf = C$1(() => {
  n3 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  o$1(Fr, "getOppositePlacement");
});
function Ao(e4) {
  return e4.replace(/start|end/g, function(t4) {
    return o3[t4];
  });
}
var o3, Jf = C$1(() => {
  o3 = {
    start: "end",
    end: "start"
  };
  o$1(Ao, "getOppositeVariationPlacement");
});
function rr(e4) {
  var t4 = Z$1(e4), r4 = t4.pageXOffset, n4 = t4.pageYOffset;
  return {
    scrollLeft: r4,
    scrollTop: n4
  };
}
var Io = C$1(() => {
  Je();
  o$1(rr, "getWindowScroll");
});
function nr(e4) {
  return Ue$1(ge$1(e4)).left + rr(e4).scrollLeft;
}
var zo = C$1(() => {
  Or();
  dt();
  Io();
  o$1(nr, "getWindowScrollBarX");
});
function F0(e4, t4) {
  var r4 = Z$1(e4), n4 = ge$1(e4), a4 = r4.visualViewport, i4 = n4.clientWidth, c2 = n4.clientHeight, l2 = 0, s2 = 0;
  if (a4) {
    i4 = a4.width, c2 = a4.height;
    var u2 = hn();
    (u2 || !u2 && t4 === "fixed") && (l2 = a4.offsetLeft, s2 = a4.offsetTop);
  }
  return {
    width: i4,
    height: c2,
    x: l2 + nr(e4),
    y: s2
  };
}
var Qf = C$1(() => {
  Je();
  dt();
  zo();
  H0();
  o$1(F0, "getViewportRect");
});
function _0(e4) {
  var t4, r4 = ge$1(e4), n4 = rr(e4), a4 = (t4 = e4.ownerDocument) == null ? void 0 : t4.body, i4 = Qe$1(r4.scrollWidth, r4.clientWidth, a4 ? a4.scrollWidth : 0, a4 ? a4.clientWidth : 0), c2 = Qe$1(r4.scrollHeight, r4.clientHeight, a4 ? a4.scrollHeight : 0, a4 ? a4.clientHeight : 0), l2 = -n4.scrollLeft + nr(
    e4
  ), s2 = -n4.scrollTop;
  return xe$1(a4 || r4).direction === "rtl" && (l2 += Qe$1(r4.clientWidth, a4 ? a4.clientWidth : 0) - i4), {
    width: i4,
    height: c2,
    x: l2,
    y: s2
  };
}
var ed = C$1(() => {
  dt();
  Br();
  zo();
  Io();
  zt();
  o$1(_0, "getDocumentRect");
});
function or(e4) {
  var t4 = xe$1(e4), r4 = t4.overflow, n4 = t4.overflowX, a4 = t4.overflowY;
  return /auto|scroll|overlay|hidden/.test(r4 + a4 + n4);
}
var To = C$1(() => {
  Br();
  o$1(or, "isScrollParent");
});
function Ho(e4) {
  return ["html", "body", "#document"].indexOf(fe$1(e4)) >= 0 ? e4.ownerDocument.body : ce$1(e4) && or(e4) ? e4 : Ho(pt(e4));
}
var td = C$1(() => {
  vn();
  To();
  At();
  Oe$1();
  o$1(Ho, "getScrollParent");
});
function Tt(e4, t4) {
  var r4;
  t4 === void 0 && (t4 = []);
  var n4 = Ho(e4), a4 = n4 === ((r4 = e4.ownerDocument) == null ? void 0 : r4.body), i4 = Z$1(n4), c2 = a4 ? [i4].concat(i4.visualViewport || [], or(n4) ? n4 : []) : n4, l2 = t4.concat(c2);
  return a4 ? l2 : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l2.concat(Tt(pt(c2)))
  );
}
var $0 = C$1(() => {
  td();
  vn();
  Je();
  To();
  o$1(Tt, "listScrollParents");
});
function _r(e4) {
  return Object.assign({}, e4, {
    left: e4.x,
    top: e4.y,
    right: e4.x + e4.width,
    bottom: e4.y + e4.height
  });
}
var V0 = C$1(() => {
  o$1(_r, "rectToClientRect");
});
function a3(e4, t4) {
  var r4 = Ue$1(e4, false, t4 === "fixed");
  return r4.top = r4.top + e4.clientTop, r4.left = r4.left + e4.clientLeft, r4.bottom = r4.top + e4.clientHeight, r4.right = r4.left + e4.clientWidth, r4.width = e4.clientWidth, r4.height = e4.clientHeight, r4.x = r4.left, r4.y = r4.top, r4;
}
function rd(e4, t4, r4) {
  return t4 === Eo ? _r(F0(e4, r4)) : We$1(t4) ? a3(t4, r4) : _r(_0(ge$1(e4)));
}
function i3(e4) {
  var t4 = Tt(pt(e4)), r4 = ["absolute", "fixed"].indexOf(xe$1(e4).position) >= 0, n4 = r4 && ce$1(e4) ? et(e4) : e4;
  return We$1(n4) ? t4.filter(function(a4) {
    return We$1(a4) && gn(a4, n4) && fe$1(a4) !== "body";
  }) : [];
}
function j0(e4, t4, r4, n4) {
  var a4 = t4 === "clippingParents" ? i3(e4) : [].concat(t4), i4 = [].concat(a4, [r4]), c2 = i4[0], l2 = i4.reduce(function(s2, u2) {
    var f2 = rd(e4, u2, n4);
    return s2.top = Qe$1(f2.top, s2.top), s2.right = Jt(f2.right, s2.right), s2.bottom = Jt(f2.bottom, s2.bottom), s2.left = Qe$1(f2.left, s2.left), s2;
  }, rd(e4, c2, n4));
  return l2.width = l2.right - l2.left, l2.height = l2.bottom - l2.top, l2.x = l2.left, l2.y = l2.top, l2;
}
var nd = C$1(() => {
  ke$1();
  Qf();
  ed();
  $0();
  Nr();
  dt();
  Br();
  Oe$1();
  Or();
  vn();
  P0();
  At();
  V0();
  zt();
  o$1(a3, "getInnerBoundingClientRect");
  o$1(rd, "getClientRectFromMixedType");
  o$1(i3, "getClippingParents");
  o$1(j0, "getClippingRect");
});
function yn(e4) {
  var t4 = e4.reference, r4 = e4.element, n4 = e4.placement, a4 = n4 ? de$1(n4) : null, i4 = n4 ? qe$1(n4) : null, c2 = t4.x + t4.width / 2 - r4.width / 2, l2 = t4.y + t4.height / 2 - r4.height / 2, s2;
  switch (a4) {
    case te$1:
      s2 = {
        x: c2,
        y: t4.y - r4.height
      };
      break;
    case le$1:
      s2 = {
        x: c2,
        y: t4.y + t4.height
      };
      break;
    case ae$1:
      s2 = {
        x: t4.x + t4.width,
        y: l2
      };
      break;
    case ne$1:
      s2 = {
        x: t4.x - r4.width,
        y: l2
      };
      break;
    default:
      s2 = {
        x: t4.x,
        y: t4.y
      };
  }
  var u2 = a4 ? er(a4) : null;
  if (u2 != null) {
    var f2 = u2 === "y" ? "height" : "width";
    switch (i4) {
      case ut:
        s2[u2] = s2[u2] - (t4[f2] / 2 - r4[f2] / 2);
        break;
      case Kt:
        s2[u2] = s2[u2] + (t4[f2] / 2 - r4[f2] / 2);
        break;
    }
  }
  return s2;
}
var W0 = C$1(() => {
  It();
  Dr();
  Mo();
  ke$1();
  o$1(yn, "computeOffsets");
});
function tt(e4, t4) {
  t4 === void 0 && (t4 = {});
  var r4 = t4, n4 = r4.placement, a4 = n4 === void 0 ? e4.placement : n4, i4 = r4.strategy, c2 = i4 === void 0 ? e4.strategy : i4, l2 = r4.boundary, s2 = l2 === void 0 ? Bf : l2, u2 = r4.rootBoundary, f2 = u2 === void 0 ? Eo : u2, d4 = r4.elementContext, m4 = d4 === void 0 ? Hr : d4, v3 = r4.altBoundary, R3 = v3 === void 0 ? false : v3, p4 = r4.padding, h4 = p4 === void 0 ? 0 : p4, g4 = bn(typeof h4 != "number" ? h4 : Rn(h4, Lt)), w3 = m4 === Hr ? Nf : Hr, b3 = e4.rects.popper, x4 = e4.elements[R3 ? w3 : m4], E4 = j0(We$1(x4) ? x4 : x4.contextElement || ge$1(e4.elements.popper), s2, f2, c2), y4 = Ue$1(e4.elements.reference), S4 = yn(
    {
      reference: y4,
      element: b3,
      placement: a4
    }
  ), L2 = _r(Object.assign({}, b3, S4)), M2 = m4 === Hr ? L2 : y4, A3 = {
    top: E4.top - M2.top + g4.top,
    bottom: M2.bottom - E4.bottom + g4.bottom,
    left: E4.left - M2.left + g4.left,
    right: M2.right - E4.right + g4.right
  }, P2 = e4.modifiersData.offset;
  if (m4 === Hr && P2) {
    var _2 = P2[a4];
    Object.keys(A3).forEach(function(F2) {
      var K2 = [ae$1, le$1].indexOf(F2) >= 0 ? 1 : -1, T2 = [te$1, le$1].indexOf(F2) >= 0 ? "y" : "x";
      A3[F2] += _2[T2] * K2;
    });
  }
  return A3;
}
var xn = C$1(() => {
  nd();
  dt();
  Or();
  W0();
  V0();
  ke$1();
  Oe$1();
  N0();
  D0();
  o$1(tt, "detectOverflow");
});
function U0(e4, t4) {
  t4 === void 0 && (t4 = {});
  var r4 = t4, n4 = r4.placement, a4 = r4.boundary, i4 = r4.rootBoundary, c2 = r4.padding, l2 = r4.flipVariations, s2 = r4.allowedAutoPlacements, u2 = s2 === void 0 ? So : s2, f2 = qe$1(n4), d4 = f2 ? l2 ? z0 : z0.filter(function(R3) {
    return qe$1(R3) === f2;
  }) : Lt, m4 = d4.filter(function(R3) {
    return u2.indexOf(R3) >= 0;
  });
  m4.length === 0 && (m4 = d4);
  var v3 = m4.reduce(function(R3, p4) {
    return R3[p4] = tt(e4, {
      placement: p4,
      boundary: a4,
      rootBoundary: i4,
      padding: c2
    })[de$1(p4)], R3;
  }, {});
  return Object.keys(v3).sort(function(R3, p4) {
    return v3[R3] - v3[p4];
  });
}
var od = C$1(() => {
  Dr();
  ke$1();
  xn();
  It();
  o$1(U0, "computeAutoPlacement");
});
function l3(e4) {
  if (de$1(e4) === xo)
    return [];
  var t4 = Fr(e4);
  return [Ao(e4), t4, Ao(t4)];
}
function c3(e4) {
  var t4 = e4.state, r4 = e4.options, n4 = e4.name;
  if (!t4.modifiersData[n4]._skip) {
    for (var a4 = r4.mainAxis, i4 = a4 === void 0 ? true : a4, c2 = r4.altAxis, l2 = c2 === void 0 ? true : c2, s2 = r4.fallbackPlacements, u2 = r4.padding, f2 = r4.boundary, d4 = r4.rootBoundary, m4 = r4.altBoundary, v3 = r4.flipVariations, R3 = v3 === void 0 ? true : v3, p4 = r4.allowedAutoPlacements, h4 = t4.options.placement, g4 = de$1(h4), w3 = g4 === h4, b3 = s2 || (w3 || !R3 ? [Fr(h4)] : l3(h4)), x4 = [h4].concat(b3).reduce(function(pe2, se2) {
      return pe2.concat(de$1(se2) === xo ? U0(t4, {
        placement: se2,
        boundary: f2,
        rootBoundary: d4,
        padding: u2,
        flipVariations: R3,
        allowedAutoPlacements: p4
      }) : se2);
    }, []), E4 = t4.rects.reference, y4 = t4.rects.popper, S4 = /* @__PURE__ */ new Map(), L2 = true, M2 = x4[0], A3 = 0; A3 < x4.length; A3++) {
      var P2 = x4[A3], _2 = de$1(P2), F2 = qe$1(P2) === ut, K2 = [te$1, le$1].indexOf(_2) >= 0, T2 = K2 ? "width" : "height", z2 = tt(t4, {
        placement: P2,
        boundary: f2,
        rootBoundary: d4,
        altBoundary: m4,
        padding: u2
      }), k2 = K2 ? F2 ? ae$1 : ne$1 : F2 ? le$1 : te$1;
      E4[T2] > y4[T2] && (k2 = Fr(k2));
      var V2 = Fr(k2), D2 = [];
      if (i4 && D2.push(z2[_2] <= 0), l2 && D2.push(z2[k2] <= 0, z2[V2] <= 0), D2.every(function(pe2) {
        return pe2;
      })) {
        M2 = P2, L2 = false;
        break;
      }
      S4.set(P2, D2);
    }
    if (L2)
      for (var j2 = R3 ? 3 : 1, O2 = /* @__PURE__ */ o$1(function(se2) {
        var ue2 = x4.find(function(ve2) {
          var Se2 = S4.get(ve2);
          if (Se2)
            return Se2.slice(0, se2).every(function(Ot2) {
              return Ot2;
            });
        });
        if (ue2)
          return M2 = ue2, "break";
      }, "_loop"), G2 = j2; G2 > 0; G2--) {
        var Ee2 = O2(G2);
        if (Ee2 === "break") break;
      }
    t4.placement !== M2 && (t4.modifiersData[n4]._skip = true, t4.placement = M2, t4.reset = true);
  }
}
var ad, id = C$1(() => {
  Kf();
  It();
  Jf();
  xn();
  od();
  ke$1();
  Dr();
  o$1(l3, "getExpandedFallbackPlacements");
  o$1(c3, "flip");
  ad = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: c3,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };
});
function ld(e4, t4, r4) {
  return r4 === void 0 && (r4 = {
    x: 0,
    y: 0
  }), {
    top: e4.top - t4.height - r4.y,
    right: e4.right - t4.width + r4.x,
    bottom: e4.bottom - t4.height + r4.y,
    left: e4.left - t4.width - r4.x
  };
}
function cd(e4) {
  return [te$1, ae$1, le$1, ne$1].some(function(t4) {
    return e4[t4] >= 0;
  });
}
function s3(e4) {
  var t4 = e4.state, r4 = e4.name, n4 = t4.rects.reference, a4 = t4.rects.popper, i4 = t4.modifiersData.preventOverflow, c2 = tt(t4, {
    elementContext: "reference"
  }), l2 = tt(t4, {
    altBoundary: true
  }), s2 = ld(c2, n4), u2 = ld(l2, a4, i4), f2 = cd(s2), d4 = cd(u2);
  t4.modifiersData[r4] = {
    referenceClippingOffsets: s2,
    popperEscapeOffsets: u2,
    isReferenceHidden: f2,
    hasPopperEscaped: d4
  }, t4.attributes.popper = Object.assign({}, t4.attributes.popper, {
    "data-popper-reference-hidden": f2,
    "data-popper-escaped": d4
  });
}
var sd, ud = C$1(() => {
  ke$1();
  xn();
  o$1(ld, "getSideOffsets");
  o$1(cd, "isAnySideFullyClipped");
  o$1(s3, "hide");
  sd = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: s3
  };
});
function u3(e4, t4, r4) {
  var n4 = de$1(e4), a4 = [ne$1, te$1].indexOf(n4) >= 0 ? -1 : 1, i4 = typeof r4 == "function" ? r4(Object.assign({}, t4, {
    placement: e4
  })) : r4, c2 = i4[0], l2 = i4[1];
  return c2 = c2 || 0, l2 = (l2 || 0) * a4, [ne$1, ae$1].indexOf(n4) >= 0 ? {
    x: l2,
    y: c2
  } : {
    x: c2,
    y: l2
  };
}
function f3(e4) {
  var t4 = e4.state, r4 = e4.options, n4 = e4.name, a4 = r4.offset, i4 = a4 === void 0 ? [0, 0] : a4, c2 = So.reduce(function(f2, d4) {
    return f2[d4] = u3(d4, t4.rects, i4), f2;
  }, {}), l2 = c2[t4.placement], s2 = l2.x, u2 = l2.y;
  t4.modifiersData.popperOffsets != null && (t4.modifiersData.popperOffsets.x += s2, t4.modifiersData.popperOffsets.y += u2), t4.modifiersData[n4] = c2;
}
var fd, dd = C$1(() => {
  It();
  ke$1();
  o$1(u3, "distanceAndSkiddingToXY");
  o$1(f3, "offset");
  fd = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: f3
  };
});
function d3(e4) {
  var t4 = e4.state, r4 = e4.name;
  t4.modifiersData[r4] = yn({
    reference: t4.rects.reference,
    element: t4.rects.popper,
    placement: t4.placement
  });
}
var pd, md = C$1(() => {
  W0();
  o$1(d3, "popperOffsets");
  pd = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: d3,
    data: {}
  };
});
function q0(e4) {
  return e4 === "x" ? "y" : "x";
}
var hd = C$1(() => {
  o$1(q0, "getAltAxis");
});
function p3(e4) {
  var t4 = e4.state, r4 = e4.options, n4 = e4.name, a4 = r4.mainAxis, i4 = a4 === void 0 ? true : a4, c2 = r4.altAxis, l2 = c2 === void 0 ? false : c2, s2 = r4.boundary, u2 = r4.rootBoundary, f2 = r4.altBoundary, d4 = r4.padding, m4 = r4.tether, v3 = m4 === void 0 ? true : m4, R3 = r4.tetherOffset, p4 = R3 === void 0 ? 0 : R3, h4 = tt(t4, {
    boundary: s2,
    rootBoundary: u2,
    padding: d4,
    altBoundary: f2
  }), g4 = de$1(t4.placement), w3 = qe$1(t4.placement), b3 = !w3, x4 = er(g4), E4 = q0(x4), y4 = t4.modifiersData.popperOffsets, S4 = t4.rects.reference, L2 = t4.rects.popper, M2 = typeof p4 == "function" ? p4(Object.assign({}, t4.rects, {
    placement: t4.placement
  })) : p4, A3 = typeof M2 == "number" ? {
    mainAxis: M2,
    altAxis: M2
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, M2), P2 = t4.modifiersData.offset ? t4.modifiersData.offset[t4.placement] : null, _2 = {
    x: 0,
    y: 0
  };
  if (y4) {
    if (i4) {
      var F2, K2 = x4 === "y" ? te$1 : ne$1, T2 = x4 === "y" ? le$1 : ae$1, z2 = x4 === "y" ? "height" : "width", k2 = y4[x4], V2 = k2 + h4[K2], D2 = k2 - h4[T2], j2 = v3 ? -L2[z2] / 2 : 0, O2 = w3 === ut ? S4[z2] : L2[z2], G2 = w3 === ut ? -L2[z2] : -S4[z2], Ee2 = t4.elements.arrow, pe2 = v3 && Ee2 ? Qt(Ee2) : {
        width: 0,
        height: 0
      }, se2 = t4.modifiersData["arrow#persistent"] ? t4.modifiersData["arrow#persistent"].padding : wn(), ue2 = se2[K2], ve2 = se2[T2], Se2 = tr(
        0,
        S4[z2],
        pe2[z2]
      ), Ot2 = b3 ? S4[z2] / 2 - j2 - Se2 - ue2 - A3.mainAxis : O2 - Se2 - ue2 - A3.mainAxis, qr2 = b3 ? -S4[z2] / 2 + j2 + Se2 + ve2 + A3.mainAxis : G2 + Se2 + ve2 + A3.mainAxis, Vo = t4.elements.arrow && et(t4.elements.arrow), fp = Vo ? x4 === "y" ? Vo.clientTop || 0 : Vo.clientLeft || 0 : 0, xl = (F2 = P2?.[x4]) != null ? F2 : 0, dp = k2 + Ot2 - xl - fp, pp = k2 + qr2 - xl, El = tr(v3 ? Jt(V2, dp) : V2, k2, v3 ? Qe$1(D2, pp) : D2);
      y4[x4] = El, _2[x4] = El - k2;
    }
    if (l2) {
      var Sl, mp = x4 === "x" ? te$1 : ne$1, hp = x4 === "x" ? le$1 : ae$1, Bt2 = y4[E4], Ln2 = E4 === "y" ? "height" : "width", Cl = Bt2 + h4[mp], Ml = Bt2 - h4[hp], jo = [te$1, ne$1].indexOf(g4) !== -1, Ll = (Sl = P2?.[E4]) != null ? Sl : 0, Al = jo ? Cl : Bt2 - S4[Ln2] - L2[Ln2] - Ll + A3.altAxis, Il = jo ? Bt2 + S4[Ln2] + L2[Ln2] - Ll - A3.altAxis : Ml, zl = v3 && jo ? jf(Al, Bt2, Il) : tr(v3 ? Al : Cl, Bt2, v3 ? Il : Ml);
      y4[E4] = zl, _2[E4] = zl - Bt2;
    }
    t4.modifiersData[n4] = _2;
  }
}
var gd, vd = C$1(() => {
  ke$1();
  It();
  Mo();
  hd();
  O0();
  Co();
  Nr();
  xn();
  Dr();
  B0();
  zt();
  o$1(p3, "preventOverflow");
  gd = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: p3,
    requiresIfExists: ["offset"]
  };
});
var G0 = C$1(() => {
});
function X0(e4) {
  return {
    scrollLeft: e4.scrollLeft,
    scrollTop: e4.scrollTop
  };
}
var wd = C$1(() => {
  o$1(X0, "getHTMLElementScroll");
});
function Y0(e4) {
  return e4 === Z$1(e4) || !ce$1(e4) ? rr(e4) : X0(e4);
}
var bd = C$1(() => {
  Io();
  Je();
  Oe$1();
  wd();
  o$1(Y0, "getNodeScroll");
});
function m3(e4) {
  var t4 = e4.getBoundingClientRect(), r4 = ft(t4.width) / e4.offsetWidth || 1, n4 = ft(t4.height) / e4.offsetHeight || 1;
  return r4 !== 1 || n4 !== 1;
}
function Z0(e4, t4, r4) {
  r4 === void 0 && (r4 = false);
  var n4 = ce$1(t4), a4 = ce$1(t4) && m3(t4), i4 = ge$1(t4), c2 = Ue$1(e4, a4, r4), l2 = {
    scrollLeft: 0,
    scrollTop: 0
  }, s2 = {
    x: 0,
    y: 0
  };
  return (n4 || !n4 && !r4) && ((fe$1(t4) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  or(i4)) && (l2 = Y0(t4)), ce$1(t4) ? (s2 = Ue$1(t4, true), s2.x += t4.clientLeft, s2.y += t4.clientTop) : i4 && (s2.x = nr(i4))), {
    x: c2.left + l2.scrollLeft - s2.x,
    y: c2.top + l2.scrollTop - s2.y,
    width: c2.width,
    height: c2.height
  };
}
var Rd = C$1(() => {
  Or();
  bd();
  At();
  Oe$1();
  zo();
  dt();
  To();
  zt();
  o$1(m3, "isElementScaled");
  o$1(Z0, "getCompositeRect");
});
function h3(e4) {
  var t4 = /* @__PURE__ */ new Map(), r4 = /* @__PURE__ */ new Set(), n4 = [];
  e4.forEach(function(i4) {
    t4.set(i4.name, i4);
  });
  function a4(i4) {
    r4.add(i4.name);
    var c2 = [].concat(i4.requires || [], i4.requiresIfExists || []);
    c2.forEach(function(l2) {
      if (!r4.has(l2)) {
        var s2 = t4.get(l2);
        s2 && a4(s2);
      }
    }), n4.push(i4);
  }
  return o$1(a4, "sort"), e4.forEach(function(i4) {
    r4.has(i4.name) || a4(i4);
  }), n4;
}
function K0(e4) {
  var t4 = h3(e4);
  return Df.reduce(function(r4, n4) {
    return r4.concat(t4.filter(function(a4) {
      return a4.phase === n4;
    }));
  }, []);
}
var yd = C$1(() => {
  ke$1();
  o$1(h3, "order");
  o$1(K0, "orderModifiers");
});
function J0(e4) {
  var t4;
  return function() {
    return t4 || (t4 = new Promise(function(r4) {
      Promise.resolve().then(function() {
        t4 = void 0, r4(e4());
      });
    })), t4;
  };
}
var xd = C$1(() => {
  o$1(J0, "debounce");
});
function Q0(e4) {
  var t4 = e4.reduce(function(r4, n4) {
    var a4 = r4[n4.name];
    return r4[n4.name] = a4 ? Object.assign({}, a4, n4, {
      options: Object.assign({}, a4.options, n4.options),
      data: Object.assign({}, a4.data, n4.data)
    }) : n4, r4;
  }, {});
  return Object.keys(t4).map(function(r4) {
    return t4[r4];
  });
}
var Ed = C$1(() => {
  o$1(Q0, "mergeByName");
});
function Cd() {
  for (var e4 = arguments.length, t4 = new Array(e4), r4 = 0; r4 < e4; r4++)
    t4[r4] = arguments[r4];
  return !t4.some(function(n4) {
    return !(n4 && typeof n4.getBoundingClientRect == "function");
  });
}
function Md(e4) {
  e4 === void 0 && (e4 = {});
  var t4 = e4, r4 = t4.defaultModifiers, n4 = r4 === void 0 ? [] : r4, a4 = t4.defaultOptions, i4 = a4 === void 0 ? Sd : a4;
  return /* @__PURE__ */ o$1(function(l2, s2, u2) {
    u2 === void 0 && (u2 = i4);
    var f2 = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Sd, i4),
      modifiersData: {},
      elements: {
        reference: l2,
        popper: s2
      },
      attributes: {},
      styles: {}
    }, d4 = [], m4 = false, v3 = {
      state: f2,
      setOptions: /* @__PURE__ */ o$1(function(g4) {
        var w3 = typeof g4 == "function" ? g4(f2.options) : g4;
        p4(), f2.options = Object.assign({}, i4, f2.options, w3), f2.scrollParents = {
          reference: We$1(l2) ? Tt(l2) : l2.contextElement ? Tt(l2.contextElement) : [],
          popper: Tt(s2)
        };
        var b3 = K0(Q0([].concat(n4, f2.options.modifiers)));
        return f2.orderedModifiers = b3.filter(function(x4) {
          return x4.enabled;
        }), R3(), v3.update();
      }, "setOptions"),
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: /* @__PURE__ */ o$1(function() {
        if (!m4) {
          var g4 = f2.elements, w3 = g4.reference, b3 = g4.popper;
          if (Cd(w3, b3)) {
            f2.rects = {
              reference: Z0(w3, et(b3), f2.options.strategy === "fixed"),
              popper: Qt(b3)
            }, f2.reset = false, f2.placement = f2.options.placement, f2.orderedModifiers.forEach(function(A3) {
              return f2.modifiersData[A3.name] = Object.assign({}, A3.data);
            });
            for (var x4 = 0; x4 < f2.orderedModifiers.length; x4++) {
              if (f2.reset === true) {
                f2.reset = false, x4 = -1;
                continue;
              }
              var E4 = f2.orderedModifiers[x4], y4 = E4.fn, S4 = E4.options, L2 = S4 === void 0 ? {} : S4, M2 = E4.name;
              typeof y4 == "function" && (f2 = y4({
                state: f2,
                options: L2,
                name: M2,
                instance: v3
              }) || f2);
            }
          }
        }
      }, "forceUpdate"),
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: J0(function() {
        return new Promise(function(h4) {
          v3.forceUpdate(), h4(f2);
        });
      }),
      destroy: /* @__PURE__ */ o$1(function() {
        p4(), m4 = true;
      }, "destroy")
    };
    if (!Cd(l2, s2))
      return v3;
    v3.setOptions(u2).then(function(h4) {
      !m4 && u2.onFirstUpdate && u2.onFirstUpdate(h4);
    });
    function R3() {
      f2.orderedModifiers.forEach(function(h4) {
        var g4 = h4.name, w3 = h4.options, b3 = w3 === void 0 ? {} : w3, x4 = h4.effect;
        if (typeof x4 == "function") {
          var E4 = x4({
            state: f2,
            name: g4,
            instance: v3,
            options: b3
          }), y4 = /* @__PURE__ */ o$1(function() {
          }, "noopFn");
          d4.push(E4 || y4);
        }
      });
    }
    o$1(R3, "runModifierEffects");
    function p4() {
      d4.forEach(function(h4) {
        return h4();
      }), d4 = [];
    }
    return o$1(p4, "cleanupModifierEffects"), v3;
  }, "createPopper");
}
var Sd, Ld = C$1(() => {
  Rd();
  Co();
  $0();
  Nr();
  yd();
  xd();
  Ed();
  Oe$1();
  Sd = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  o$1(Cd, "areValidElements");
  o$1(Md, "popperGenerator");
});
var g3, el, Ad = C$1(() => {
  Ld();
  Zf();
  md();
  Xf();
  _f();
  dd();
  id();
  vd();
  Uf();
  ud();
  G0();
  g3 = [Yf, pd, Gf, Ff, fd, ad, gd, Wf, sd], el = /* @__PURE__ */ Md({
    defaultModifiers: g3
  });
});
var Id = C$1(() => {
  ke$1();
  G0();
  Ad();
});
var Td = H$1((HH, zd) => {
  var v3 = typeof Element < "u", w3 = typeof Map == "function", b3 = typeof Set == "function", R3 = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
  function Po(e4, t4) {
    if (e4 === t4) return true;
    if (e4 && t4 && typeof e4 == "object" && typeof t4 == "object") {
      if (e4.constructor !== t4.constructor) return false;
      var r4, n4, a4;
      if (Array.isArray(e4)) {
        if (r4 = e4.length, r4 != t4.length) return false;
        for (n4 = r4; n4-- !== 0; )
          if (!Po(e4[n4], t4[n4])) return false;
        return true;
      }
      var i4;
      if (w3 && e4 instanceof Map && t4 instanceof Map) {
        if (e4.size !== t4.size) return false;
        for (i4 = e4.entries(); !(n4 = i4.next()).done; )
          if (!t4.has(n4.value[0])) return false;
        for (i4 = e4.entries(); !(n4 = i4.next()).done; )
          if (!Po(n4.value[1], t4.get(n4.value[0]))) return false;
        return true;
      }
      if (b3 && e4 instanceof Set && t4 instanceof Set) {
        if (e4.size !== t4.size) return false;
        for (i4 = e4.entries(); !(n4 = i4.next()).done; )
          if (!t4.has(n4.value[0])) return false;
        return true;
      }
      if (R3 && ArrayBuffer.isView(e4) && ArrayBuffer.isView(t4)) {
        if (r4 = e4.length, r4 != t4.length) return false;
        for (n4 = r4; n4-- !== 0; )
          if (e4[n4] !== t4[n4]) return false;
        return true;
      }
      if (e4.constructor === RegExp) return e4.source === t4.source && e4.flags === t4.flags;
      if (e4.valueOf !== Object.prototype.valueOf && typeof e4.valueOf == "function" && typeof t4.valueOf == "function") return e4.valueOf() === t4.valueOf();
      if (e4.toString !== Object.prototype.toString && typeof e4.toString == "function" && typeof t4.toString == "function") return e4.toString() === t4.toString();
      if (a4 = Object.keys(e4), r4 = a4.length, r4 !== Object.keys(t4).length) return false;
      for (n4 = r4; n4-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t4, a4[n4])) return false;
      if (v3 && e4 instanceof Element) return false;
      for (n4 = r4; n4-- !== 0; )
        if (!((a4[n4] === "_owner" || a4[n4] === "__v" || a4[n4] === "__o") && e4.$$typeof) && !Po(e4[a4[n4]], t4[a4[n4]]))
          return false;
      return true;
    }
    return e4 !== e4 && t4 !== t4;
  }
  o$1(Po, "equal");
  zd.exports = /* @__PURE__ */ o$1(function(t4, r4) {
    try {
      return Po(t4, r4);
    } catch (n4) {
      if ((n4.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), false;
      throw n4;
    }
  }, "isEqual");
});
var Pd, y3, tl, kd = C$1(() => {
  Id();
  Pd = me$1(Td());
  Of();
  y3 = [], tl = /* @__PURE__ */ o$1(function(t4, r4, n4) {
    n4 === void 0 && (n4 = {});
    var a4 = reactExports.useRef(null), i4 = {
      onFirstUpdate: n4.onFirstUpdate,
      placement: n4.placement || "bottom",
      strategy: n4.strategy || "absolute",
      modifiers: n4.modifiers || y3
    }, c2 = reactExports.useState({
      styles: {
        popper: {
          position: i4.strategy,
          left: "0",
          top: "0"
        },
        arrow: {
          position: "absolute"
        }
      },
      attributes: {}
    }), l2 = c2[0], s2 = c2[1], u2 = reactExports.useMemo(function() {
      return {
        name: "updateState",
        enabled: true,
        phase: "write",
        fn: /* @__PURE__ */ o$1(function(v3) {
          var R3 = v3.state, p4 = Object.keys(R3.elements);
          reactDomExports.flushSync(function() {
            s2({
              styles: A0(p4.map(function(h4) {
                return [h4, R3.styles[h4] || {}];
              })),
              attributes: A0(p4.map(function(h4) {
                return [h4, R3.attributes[h4]];
              }))
            });
          });
        }, "fn"),
        requires: ["computeStyles"]
      };
    }, []), f2 = reactExports.useMemo(function() {
      var m4 = {
        onFirstUpdate: i4.onFirstUpdate,
        placement: i4.placement,
        strategy: i4.strategy,
        modifiers: [].concat(i4.modifiers, [u2, {
          name: "applyStyles",
          enabled: false
        }])
      };
      return (0, Pd.default)(a4.current, m4) ? a4.current || m4 : (a4.current = m4, m4);
    }, [i4.onFirstUpdate, i4.placement, i4.strategy, i4.modifiers, u2]), d4 = reactExports.useRef();
    return I0(function() {
      d4.current && d4.current.setOptions(f2);
    }, [f2]), I0(function() {
      if (!(t4 == null || r4 == null)) {
        var m4 = n4.createPopper || el, v3 = m4(t4, r4, f2);
        return d4.current = v3, function() {
          v3.destroy(), d4.current = null;
        };
      }
    }, [t4, r4, n4.createPopper]), {
      state: d4.current ? d4.current.state : null,
      styles: l2.styles,
      attributes: l2.attributes,
      update: d4.current ? d4.current.update : null,
      forceUpdate: d4.current ? d4.current.forceUpdate : null
    };
  }, "usePopper");
});
var Od = C$1(() => {
  kd();
});
function Dd(e4) {
  var t4 = reactExports.useRef(e4);
  return t4.current = e4, reactExports.useCallback(function() {
    return t4.current;
  }, []);
}
function E3(e4) {
  var t4 = e4.initial, r4 = e4.value, n4 = e4.onChange, a4 = n4 === void 0 ? x3 : n4;
  if (t4 === void 0 && r4 === void 0)
    throw new TypeError('Either "value" or "initial" variable must be set. Now both are undefined');
  var i4 = reactExports.useState(t4), c2 = i4[0], l2 = i4[1], s2 = Dd(c2), u2 = reactExports.useCallback(function(d4) {
    var m4 = s2(), v3 = typeof d4 == "function" ? d4(m4) : d4;
    typeof v3.persist == "function" && v3.persist(), l2(v3), typeof a4 == "function" && a4(v3);
  }, [s2, a4]), f2 = r4 !== void 0;
  return [f2 ? r4 : c2, f2 ? a4 : u2];
}
function Fd(e4, t4) {
  return e4 === void 0 && (e4 = 0), t4 === void 0 && (t4 = 0), function() {
    return {
      width: 0,
      height: 0,
      top: t4,
      right: e4,
      bottom: t4,
      left: e4,
      x: 0,
      y: 0,
      toJSON: /* @__PURE__ */ o$1(function() {
        return null;
      }, "toJSON")
    };
  };
}
function _d(e4, t4) {
  var r4, n4, a4;
  e4 === void 0 && (e4 = {}), t4 === void 0 && (t4 = {});
  var i4 = Object.keys(Nd).reduce(function(T2, z2) {
    var k2;
    return W$1({}, T2, (k2 = {}, k2[z2] = T2[z2] !== void 0 ? T2[z2] : Nd[z2], k2));
  }, e4), c2 = reactExports.useMemo(
    function() {
      return [{
        name: "offset",
        options: {
          offset: i4.offset
        }
      }];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(i4.offset) ? i4.offset : []
  ), l2 = W$1({}, t4, {
    placement: t4.placement || i4.placement,
    modifiers: t4.modifiers || c2
  }), s2 = reactExports.useState(null), u2 = s2[0], f2 = s2[1], d4 = reactExports.useState(null), m4 = d4[0], v3 = d4[1], R3 = E3({
    initial: i4.defaultVisible,
    value: i4.visible,
    onChange: i4.onVisibleChange
  }), p4 = R3[0], h4 = R3[1], g4 = reactExports.useRef();
  reactExports.useEffect(function() {
    return function() {
      return clearTimeout(g4.current);
    };
  }, []);
  var w3 = tl(i4.followCursor ? Bd : u2, m4, l2), b3 = w3.styles, x4 = w3.attributes, E4 = ur(w3, S3), y4 = E4.update, S4 = Dd({
    visible: p4,
    triggerRef: u2,
    tooltipRef: m4,
    finalConfig: i4
  }), L2 = reactExports.useCallback(
    function(T2) {
      return Array.isArray(i4.trigger) ? i4.trigger.includes(T2) : i4.trigger === T2;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(i4.trigger) ? i4.trigger : [i4.trigger]
  ), M2 = reactExports.useCallback(function() {
    clearTimeout(g4.current), g4.current = window.setTimeout(function() {
      return h4(false);
    }, i4.delayHide);
  }, [i4.delayHide, h4]), A3 = reactExports.useCallback(function() {
    clearTimeout(g4.current), g4.current = window.setTimeout(function() {
      return h4(true);
    }, i4.delayShow);
  }, [i4.delayShow, h4]), P2 = reactExports.useCallback(function() {
    S4().visible ? M2() : A3();
  }, [S4, M2, A3]);
  reactExports.useEffect(function() {
    if (S4().finalConfig.closeOnOutsideClick) {
      var T2 = /* @__PURE__ */ o$1(function(k2) {
        var V2, D2 = S4(), j2 = D2.tooltipRef, O2 = D2.triggerRef, G2 = (k2.composedPath == null || (V2 = k2.composedPath()) == null ? void 0 : V2[0]) || k2.target;
        G2 instanceof Node && j2 != null && O2 != null && !j2.contains(G2) && !O2.contains(G2) && M2();
      }, "handleClickOutside");
      return document.addEventListener("mousedown", T2), function() {
        return document.removeEventListener("mousedown", T2);
      };
    }
  }, [S4, M2]), reactExports.useEffect(function() {
    if (!(u2 == null || !L2("click")))
      return u2.addEventListener("click", P2), function() {
        return u2.removeEventListener("click", P2);
      };
  }, [u2, L2, P2]), reactExports.useEffect(function() {
    if (!(u2 == null || !L2("double-click")))
      return u2.addEventListener("dblclick", P2), function() {
        return u2.removeEventListener("dblclick", P2);
      };
  }, [u2, L2, P2]), reactExports.useEffect(function() {
    if (!(u2 == null || !L2("right-click"))) {
      var T2 = /* @__PURE__ */ o$1(function(k2) {
        k2.preventDefault(), P2();
      }, "preventDefaultAndToggle");
      return u2.addEventListener("contextmenu", T2), function() {
        return u2.removeEventListener("contextmenu", T2);
      };
    }
  }, [u2, L2, P2]), reactExports.useEffect(function() {
    if (!(u2 == null || !L2("focus")))
      return u2.addEventListener("focus", A3), u2.addEventListener("blur", M2), function() {
        u2.removeEventListener("focus", A3), u2.removeEventListener("blur", M2);
      };
  }, [u2, L2, A3, M2]), reactExports.useEffect(function() {
    if (!(u2 == null || !L2("hover")))
      return u2.addEventListener("mouseenter", A3), u2.addEventListener("mouseleave", M2), function() {
        u2.removeEventListener("mouseenter", A3), u2.removeEventListener("mouseleave", M2);
      };
  }, [u2, L2, A3, M2]), reactExports.useEffect(function() {
    if (!(m4 == null || !L2("hover") || !S4().finalConfig.interactive))
      return m4.addEventListener("mouseenter", A3), m4.addEventListener("mouseleave", M2), function() {
        m4.removeEventListener("mouseenter", A3), m4.removeEventListener("mouseleave", M2);
      };
  }, [m4, L2, A3, M2, S4]);
  var _2 = E4 == null || (r4 = E4.state) == null || (n4 = r4.modifiersData) == null || (a4 = n4.hide) == null ? void 0 : a4.isReferenceHidden;
  reactExports.useEffect(function() {
    i4.closeOnTriggerHidden && _2 && M2();
  }, [i4.closeOnTriggerHidden, M2, _2]), reactExports.useEffect(function() {
    if (!i4.followCursor || u2 == null) return;
    function T2(z2) {
      var k2 = z2.clientX, V2 = z2.clientY;
      Bd.getBoundingClientRect = Fd(k2, V2), y4?.();
    }
    return o$1(T2, "setMousePosition"), u2.addEventListener("mousemove", T2), function() {
      return u2.removeEventListener("mousemove", T2);
    };
  }, [i4.followCursor, u2, y4]), reactExports.useEffect(function() {
    if (!(m4 == null || y4 == null || i4.mutationObserverOptions == null)) {
      var T2 = new MutationObserver(y4);
      return T2.observe(m4, i4.mutationObserverOptions), function() {
        return T2.disconnect();
      };
    }
  }, [i4.mutationObserverOptions, m4, y4]);
  var F2 = /* @__PURE__ */ o$1(function(z2) {
    return z2 === void 0 && (z2 = {}), W$1({}, z2, {
      style: W$1({}, z2.style, b3.popper)
    }, x4.popper, {
      "data-popper-interactive": i4.interactive
    });
  }, "getTooltipProps"), K2 = /* @__PURE__ */ o$1(function(z2) {
    return z2 === void 0 && (z2 = {}), W$1({}, z2, x4.arrow, {
      style: W$1({}, z2.style, b3.arrow),
      "data-popper-arrow": true
    });
  }, "getArrowProps");
  return W$1({
    getArrowProps: K2,
    getTooltipProps: F2,
    setTooltipRef: v3,
    setTriggerRef: f2,
    tooltipRef: m4,
    triggerRef: u2,
    visible: p4
  }, E4);
}
var x3, S3, Bd, Nd, $d = C$1(() => {
  Pn();
  Yr();
  Od();
  o$1(Dd, "useGetLatest");
  x3 = /* @__PURE__ */ o$1(function() {
  }, "noop");
  o$1(E3, "useControlledState");
  o$1(Fd, "generateBoundingClientRect");
  S3 = ["styles", "attributes"], Bd = {
    getBoundingClientRect: Fd()
  }, Nd = {
    closeOnOutsideClick: true,
    closeOnTriggerHidden: false,
    defaultVisible: false,
    delayHide: 0,
    delayShow: 0,
    followCursor: false,
    interactive: false,
    mutationObserverOptions: {
      attributes: true,
      childList: true,
      subtree: true
    },
    offset: [0, 6],
    trigger: "hover"
  };
  o$1(_d, "usePopperTooltip");
});
var Vd, Ge$1, Pt, C3, M3, nl, Wd = C$1(() => {
  Vd = me$1(Kr(), 1), Ge$1 = (0, Vd.default)(1e3)(
    (e4, t4, r4, n4 = 0) => t4.split("-")[0] === e4 ? r4 : n4
  ), Pt = 8, C3 = xr$1.div(
    {
      position: "absolute",
      borderStyle: "solid"
    },
    ({ placement: e4 }) => {
      let t4 = 0, r4 = 0;
      switch (true) {
        case (e4.startsWith("left") || e4.startsWith("right")): {
          r4 = 8;
          break;
        }
        case (e4.startsWith("top") || e4.startsWith("bottom")): {
          t4 = 8;
          break;
        }
      }
      return { transform: `translate3d(${t4}px, ${r4}px, 0px)` };
    },
    ({ theme: e4, color: t4, placement: r4 }) => ({
      bottom: `${Ge$1("top", r4, `${Pt * -1}px`, "auto")}`,
      top: `${Ge$1("bottom", r4, `${Pt * -1}px`, "auto")}`,
      right: `${Ge$1("left", r4, `${Pt * -1}px`, "auto")}`,
      left: `${Ge$1("right", r4, `${Pt * -1}px`, "auto")}`,
      borderBottomWidth: `${Ge$1("top", r4, "0", Pt)}px`,
      borderTopWidth: `${Ge$1("bottom", r4, "0", Pt)}px`,
      borderRightWidth: `${Ge$1("left", r4, "0", Pt)}px`,
      borderLeftWidth: `${Ge$1("right", r4, "0", Pt)}px`,
      borderTopColor: Ge$1(
        "top",
        r4,
        e4.color[t4] || t4 || e4.base === "light" ? fo(e4.background.app) : e4.background.app,
        "transparent"
      ),
      borderBottomColor: Ge$1(
        "bottom",
        r4,
        e4.color[t4] || t4 || e4.base === "light" ? fo(e4.background.app) : e4.background.app,
        "transparent"
      ),
      borderLeftColor: Ge$1(
        "left",
        r4,
        e4.color[t4] || t4 || e4.base === "light" ? fo(e4.background.app) : e4.background.app,
        "transparent"
      ),
      borderRightColor: Ge$1(
        "right",
        r4,
        e4.color[t4] || t4 || e4.base === "light" ? fo(e4.background.app) : e4.background.app,
        "transparent"
      )
    })
  ), M3 = xr$1.div(
    ({ hidden: e4 }) => ({
      display: e4 ? "none" : "inline-block",
      zIndex: 2147483647
    }),
    ({ theme: e4, color: t4, hasChrome: r4 }) => r4 ? {
      background: t4 && e4.color[t4] || t4 || e4.base === "light" ? fo(e4.background.app) : e4.background.app,
      filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
      borderRadius: e4.appBorderRadius + 2,
      fontSize: e4.typography.size.s1
    } : {}
  ), nl = e.forwardRef(
    ({
      placement: e$1 = "top",
      hasChrome: t4 = true,
      children: r4,
      arrowProps: n4 = {},
      tooltipRef: a4,
      color: i4,
      withArrows: c2,
      ...l2
    }, s2) => /* @__PURE__ */ e.createElement(M3, { "data-testid": "tooltip", hasChrome: t4, ref: s2, ...l2, color: i4 }, t4 && c2 && /* @__PURE__ */ e.createElement(C3, { placement: e$1, ...n4, color: i4 }), r4)
  );
  nl.displayName = "Tooltip";
});
var al = {};
Xr(al, {
  WithToolTipState: () => ol,
  WithTooltip: () => ol,
  WithTooltipPure: () => qd
});
const { global: T3 } = __STORYBOOK_MODULE_GLOBAL__;
var ko, H3, P3, qd, ol, Oo = C$1(() => {
  $d();
  Wd();
  ({ document: ko } = T3), H3 = xr$1.div`
  display: inline-block;
  cursor: ${(e4) => e4.trigger === "hover" || e4.trigger?.includes("hover") ? "default" : "pointer"};
`, P3 = xr$1.g`
  cursor: ${(e4) => e4.trigger === "hover" || e4.trigger?.includes("hover") ? "default" : "pointer"};
`, qd = /* @__PURE__ */ o$1(({
    svg: e$1 = false,
    trigger: t4 = "click",
    closeOnOutsideClick: r4 = false,
    placement: n4 = "top",
    modifiers: a4 = [
      {
        name: "preventOverflow",
        options: {
          padding: 8
        }
      },
      {
        name: "offset",
        options: {
          offset: [8, 8]
        }
      },
      {
        name: "arrow",
        options: {
          padding: 8
        }
      }
    ],
    hasChrome: i4 = true,
    defaultVisible: c2 = false,
    withArrows: l2,
    offset: s2,
    tooltip: u2,
    children: f2,
    closeOnTriggerHidden: d4,
    mutationObserverOptions: m4,
    delayHide: v3 = t4 === "hover" ? 200 : 0,
    visible: R3,
    interactive: p4,
    delayShow: h4 = t4 === "hover" ? 400 : 0,
    strategy: g4,
    followCursor: w3,
    onVisibleChange: b3,
    ...x4
  }) => {
    let E4 = e$1 ? P3 : H3, {
      getArrowProps: y4,
      getTooltipProps: S4,
      setTooltipRef: L2,
      setTriggerRef: M2,
      visible: A3,
      state: P2
    } = _d(
      {
        trigger: t4,
        placement: n4,
        defaultVisible: c2,
        delayHide: v3,
        interactive: p4,
        closeOnOutsideClick: r4,
        closeOnTriggerHidden: d4,
        onVisibleChange: b3,
        delayShow: h4,
        followCursor: w3,
        mutationObserverOptions: m4,
        visible: R3,
        offset: s2
      },
      {
        modifiers: a4,
        strategy: g4
      }
    ), _2 = A3 ? /* @__PURE__ */ e.createElement(
      nl,
      {
        placement: P2?.placement,
        ref: L2,
        hasChrome: i4,
        arrowProps: y4(),
        withArrows: l2,
        ...S4()
      },
      typeof u2 == "function" ? u2({ onHide: /* @__PURE__ */ o$1(() => b3(false), "onHide") }) : u2
    ) : null;
    return /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(E4, { trigger: t4, ref: M2, ...x4 }, f2), A3 && ReactDOM.createPortal(_2, ko.body));
  }, "WithTooltipPure"), ol = /* @__PURE__ */ o$1(({
    startOpen: e$1 = false,
    onVisibleChange: t4,
    ...r4
  }) => {
    let [n4, a4] = reactExports.useState(e$1), i4 = reactExports.useCallback(
      (c2) => {
        t4 && t4(c2) === false || a4(c2);
      },
      [t4]
    );
    return reactExports.useEffect(() => {
      let c2 = /* @__PURE__ */ o$1(() => i4(false), "hide");
      ko.addEventListener("keydown", c2, false);
      let l2 = Array.from(ko.getElementsByTagName("iframe")), s2 = [];
      return l2.forEach((u2) => {
        let f2 = /* @__PURE__ */ o$1(() => {
          try {
            u2.contentWindow.document && (u2.contentWindow.document.addEventListener("click", c2), s2.push(() => {
              try {
                u2.contentWindow.document.removeEventListener("click", c2);
              } catch {
              }
            }));
          } catch {
          }
        }, "bind");
        f2(), u2.addEventListener("load", f2), s2.push(() => {
          u2.removeEventListener("load", f2);
        });
      }), () => {
        ko.removeEventListener("keydown", c2), s2.forEach((u2) => {
          u2();
        });
      };
    }), /* @__PURE__ */ e.createElement(qd, { ...r4, visible: n4, onVisibleChange: i4 });
  }, "WithToolTipState");
});
var J$1 = /* @__PURE__ */ o$1(({ ...e4 }, t4) => {
  let r4 = [e4.class, e4.className];
  return delete e4.class, e4.className = ["sbdocs", `sbdocs-${t4}`, ...r4].filter(Boolean).join(" "), e4;
}, "nameSpaceClassNames");
Yr();
Hl();
In();
function Pl(e4, t4) {
  e4.prototype = Object.create(t4.prototype), e4.prototype.constructor = e4, ht(e4, t4);
}
o$1(Pl, "_inheritsLoose");
kl();
In();
function Ol(e4) {
  try {
    return Function.toString.call(e4).indexOf("[native code]") !== -1;
  } catch {
    return typeof e4 == "function";
  }
}
o$1(Ol, "_isNativeFunction");
function Wo() {
  try {
    var e4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Wo = /* @__PURE__ */ o$1(function() {
    return !!e4;
  }, "_isNativeReflectConstruct"))();
}
o$1(Wo, "_isNativeReflectConstruct");
In();
function Bl(e4, t4, r4) {
  if (Wo()) return Reflect.construct.apply(null, arguments);
  var n4 = [null];
  n4.push.apply(n4, t4);
  var a4 = new (e4.bind.apply(e4, n4))();
  return r4 && ht(a4, r4.prototype), a4;
}
o$1(Bl, "_construct");
function Tn(e4) {
  var t4 = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Tn = /* @__PURE__ */ o$1(function(n4) {
    if (n4 === null || !Ol(n4)) return n4;
    if (typeof n4 != "function") throw new TypeError("Super expression must either be null or a function");
    if (t4 !== void 0) {
      if (t4.has(n4)) return t4.get(n4);
      t4.set(n4, a4);
    }
    function a4() {
      return Bl(n4, arguments, zn(this).constructor);
    }
    return o$1(a4, "Wrapper"), a4.prototype = Object.create(n4.prototype, {
      constructor: {
        value: a4,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), ht(a4, n4);
  }, "_wrapNativeSuper"), Tn(e4);
}
o$1(Tn, "_wrapNativeSuper");
var xp = {
  1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,
  2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
  3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
  4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
  5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
  6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,
  7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,
  8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
  9: `Please provide a number of steps to the modularScale helper.

`,
  10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
  12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
  13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
  14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  16: `You must provide a template to this method.

`,
  17: `You passed an unsupported selector state to this method.

`,
  18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: `fontFace expects a name of a font-family.

`,
  24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  25: `fontFace expects localFonts to be an array.

`,
  26: `fontFace expects fileFormats to be an array.

`,
  27: `radialGradient requries at least 2 color-stops to properly render.

`,
  28: `Please supply a filename to retinaImage() as the first argument.

`,
  29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
  32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
  33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
  34: `borderRadius expects a radius value as a string or number as the second argument.

`,
  35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  36: `Property must be a string value.

`,
  37: `Syntax Error at %s.

`,
  38: `Formula contains a function that needs parentheses at %s.

`,
  39: `Formula is missing closing parenthesis at %s.

`,
  40: `Formula has too many closing parentheses at %s.

`,
  41: `All values in a formula must have the same unit or be unitless.

`,
  42: `Please provide a number of steps to the modularScale helper.

`,
  43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
  45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
  46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
  47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
  51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
  52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  53: `fontFace expects localFonts to be an array.

`,
  54: `fontFace expects fileFormats to be an array.

`,
  55: `fontFace expects a name of a font-family.

`,
  56: `linearGradient requries at least 2 color-stops to properly render.

`,
  57: `radialGradient requries at least 2 color-stops to properly render.

`,
  58: `Please supply a filename to retinaImage() as the first argument.

`,
  59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: `Property must be a string value.

`,
  62: `borderRadius expects a radius value as a string or number as the second argument.

`,
  63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
  65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,
  66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
  67: `You must provide a template to this method.

`,
  68: `You passed an unsupported selector state to this method.

`,
  69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
  70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
  71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
  72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
  73: `Please provide a valid CSS variable.

`,
  74: `CSS variable not found and no default was provided.

`,
  75: `important requires a valid style object, got a %s instead.

`,
  76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
  77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
  78: `base must be set in "px" or "%" but you set it in "%s".
`
};
function Ep() {
  for (var e4 = arguments.length, t4 = new Array(e4), r4 = 0; r4 < e4; r4++)
    t4[r4] = arguments[r4];
  var n4 = t4[0], a4 = [], i4;
  for (i4 = 1; i4 < t4.length; i4 += 1)
    a4.push(t4[i4]);
  return a4.forEach(function(c2) {
    n4 = n4.replace(/%[a-z]/, c2);
  }), n4;
}
o$1(Ep, "format");
var Ce$1 = /* @__PURE__ */ function(e4) {
  Pl(t4, e4);
  function t4(r4) {
    for (var n4, a4 = arguments.length, i4 = new Array(a4 > 1 ? a4 - 1 : 0), c2 = 1; c2 < a4; c2++)
      i4[c2 - 1] = arguments[c2];
    return n4 = e4.call(this, Ep.apply(void 0, [xp[r4]].concat(i4))) || this, Tl(n4);
  }
  return o$1(t4, "PolishedError"), t4;
}(/* @__PURE__ */ Tn(Error));
function Nl(e4, t4) {
  return e4.substr(-t4.length) === t4;
}
o$1(Nl, "endsWith");
var Sp = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function Dl(e4) {
  if (typeof e4 != "string") return e4;
  var t4 = e4.match(Sp);
  return t4 ? parseFloat(e4) : e4;
}
o$1(Dl, "stripUnit");
var Cp = /* @__PURE__ */ o$1(function(t4) {
  return function(r4, n4) {
    n4 === void 0 && (n4 = "16px");
    var a4 = r4, i4 = n4;
    if (typeof r4 == "string") {
      if (!Nl(r4, "px"))
        throw new Ce$1(69, t4, r4);
      a4 = Dl(r4);
    }
    if (typeof n4 == "string") {
      if (!Nl(n4, "px"))
        throw new Ce$1(70, t4, n4);
      i4 = Dl(n4);
    }
    if (typeof a4 == "string")
      throw new Ce$1(71, r4, t4);
    if (typeof i4 == "string")
      throw new Ce$1(72, n4, t4);
    return "" + a4 / i4 + t4;
  };
}, "pxtoFactory"), _l = Cp;
_l("em");
_l("rem");
function Uo(e4) {
  return Math.round(e4 * 255);
}
o$1(Uo, "colorToInt");
function Mp(e4, t4, r4) {
  return Uo(e4) + "," + Uo(t4) + "," + Uo(r4);
}
o$1(Mp, "convertToInt");
function Zr(e4, t4, r4, n4) {
  if (n4 === void 0 && (n4 = Mp), t4 === 0)
    return n4(r4, r4, r4);
  var a4 = (e4 % 360 + 360) % 360 / 60, i4 = (1 - Math.abs(2 * r4 - 1)) * t4, c2 = i4 * (1 - Math.abs(a4 % 2 - 1)), l2 = 0, s2 = 0, u2 = 0;
  a4 >= 0 && a4 < 1 ? (l2 = i4, s2 = c2) : a4 >= 1 && a4 < 2 ? (l2 = c2, s2 = i4) : a4 >= 2 && a4 < 3 ? (s2 = i4, u2 = c2) : a4 >= 3 && a4 < 4 ? (s2 = c2, u2 = i4) : a4 >= 4 && a4 < 5 ? (l2 = c2, u2 = i4) : a4 >= 5 && a4 < 6 && (l2 = i4, u2 = c2);
  var f2 = r4 - i4 / 2, d4 = l2 + f2, m4 = s2 + f2, v3 = u2 + f2;
  return n4(d4, m4, v3);
}
o$1(Zr, "hslToRgb");
var Fl = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function Lp(e4) {
  if (typeof e4 != "string") return e4;
  var t4 = e4.toLowerCase();
  return Fl[t4] ? "#" + Fl[t4] : e4;
}
o$1(Lp, "nameToHex");
var Ap = /^#[a-fA-F0-9]{6}$/, Ip = /^#[a-fA-F0-9]{8}$/, zp = /^#[a-fA-F0-9]{3}$/, Tp = /^#[a-fA-F0-9]{4}$/, qo = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i, Hp = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, Pp = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i, kp = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function cr(e4) {
  if (typeof e4 != "string")
    throw new Ce$1(3);
  var t4 = Lp(e4);
  if (t4.match(Ap))
    return {
      red: parseInt("" + t4[1] + t4[2], 16),
      green: parseInt("" + t4[3] + t4[4], 16),
      blue: parseInt("" + t4[5] + t4[6], 16)
    };
  if (t4.match(Ip)) {
    var r4 = parseFloat((parseInt("" + t4[7] + t4[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t4[1] + t4[2], 16),
      green: parseInt("" + t4[3] + t4[4], 16),
      blue: parseInt("" + t4[5] + t4[6], 16),
      alpha: r4
    };
  }
  if (t4.match(zp))
    return {
      red: parseInt("" + t4[1] + t4[1], 16),
      green: parseInt("" + t4[2] + t4[2], 16),
      blue: parseInt("" + t4[3] + t4[3], 16)
    };
  if (t4.match(Tp)) {
    var n4 = parseFloat((parseInt("" + t4[4] + t4[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t4[1] + t4[1], 16),
      green: parseInt("" + t4[2] + t4[2], 16),
      blue: parseInt("" + t4[3] + t4[3], 16),
      alpha: n4
    };
  }
  var a4 = qo.exec(t4);
  if (a4)
    return {
      red: parseInt("" + a4[1], 10),
      green: parseInt("" + a4[2], 10),
      blue: parseInt("" + a4[3], 10)
    };
  var i4 = Hp.exec(t4.substring(0, 50));
  if (i4)
    return {
      red: parseInt("" + i4[1], 10),
      green: parseInt("" + i4[2], 10),
      blue: parseInt("" + i4[3], 10),
      alpha: parseFloat("" + i4[4]) > 1 ? parseFloat("" + i4[4]) / 100 : parseFloat("" + i4[4])
    };
  var c2 = Pp.exec(t4);
  if (c2) {
    var l2 = parseInt("" + c2[1], 10), s2 = parseInt("" + c2[2], 10) / 100, u2 = parseInt("" + c2[3], 10) / 100, f2 = "rgb(" + Zr(l2, s2, u2) + ")", d4 = qo.exec(f2);
    if (!d4)
      throw new Ce$1(4, t4, f2);
    return {
      red: parseInt("" + d4[1], 10),
      green: parseInt("" + d4[2], 10),
      blue: parseInt("" + d4[3], 10)
    };
  }
  var m4 = kp.exec(t4.substring(0, 50));
  if (m4) {
    var v3 = parseInt("" + m4[1], 10), R3 = parseInt("" + m4[2], 10) / 100, p4 = parseInt("" + m4[3], 10) / 100, h4 = "rgb(" + Zr(v3, R3, p4) + ")", g4 = qo.exec(h4);
    if (!g4)
      throw new Ce$1(4, t4, h4);
    return {
      red: parseInt("" + g4[1], 10),
      green: parseInt("" + g4[2], 10),
      blue: parseInt("" + g4[3], 10),
      alpha: parseFloat("" + m4[4]) > 1 ? parseFloat("" + m4[4]) / 100 : parseFloat("" + m4[4])
    };
  }
  throw new Ce$1(5);
}
o$1(cr, "parseToRgb");
function Op(e4) {
  var t4 = e4.red / 255, r4 = e4.green / 255, n4 = e4.blue / 255, a4 = Math.max(t4, r4, n4), i4 = Math.min(t4, r4, n4), c2 = (a4 + i4) / 2;
  if (a4 === i4)
    return e4.alpha !== void 0 ? {
      hue: 0,
      saturation: 0,
      lightness: c2,
      alpha: e4.alpha
    } : {
      hue: 0,
      saturation: 0,
      lightness: c2
    };
  var l2, s2 = a4 - i4, u2 = c2 > 0.5 ? s2 / (2 - a4 - i4) : s2 / (a4 + i4);
  switch (a4) {
    case t4:
      l2 = (r4 - n4) / s2 + (r4 < n4 ? 6 : 0);
      break;
    case r4:
      l2 = (n4 - t4) / s2 + 2;
      break;
    default:
      l2 = (t4 - r4) / s2 + 4;
      break;
  }
  return l2 *= 60, e4.alpha !== void 0 ? {
    hue: l2,
    saturation: u2,
    lightness: c2,
    alpha: e4.alpha
  } : {
    hue: l2,
    saturation: u2,
    lightness: c2
  };
}
o$1(Op, "rgbToHsl");
function gt(e4) {
  return Op(cr(e4));
}
o$1(gt, "parseToHsl");
var Bp = /* @__PURE__ */ o$1(function(t4) {
  return t4.length === 7 && t4[1] === t4[2] && t4[3] === t4[4] && t4[5] === t4[6] ? "#" + t4[1] + t4[3] + t4[5] : t4;
}, "reduceHexValue"), Xo = Bp;
function Nt(e4) {
  var t4 = e4.toString(16);
  return t4.length === 1 ? "0" + t4 : t4;
}
o$1(Nt, "numberToHex");
function Go(e4) {
  return Nt(Math.round(e4 * 255));
}
o$1(Go, "colorToHex");
function Np(e4, t4, r4) {
  return Xo("#" + Go(e4) + Go(t4) + Go(r4));
}
o$1(Np, "convertToHex");
function Hn(e4, t4, r4) {
  return Zr(e4, t4, r4, Np);
}
o$1(Hn, "hslToHex");
function Dp(e4, t4, r4) {
  if (typeof e4 == "number" && typeof t4 == "number" && typeof r4 == "number")
    return Hn(e4, t4, r4);
  if (typeof e4 == "object" && t4 === void 0 && r4 === void 0)
    return Hn(e4.hue, e4.saturation, e4.lightness);
  throw new Ce$1(1);
}
o$1(Dp, "hsl");
function Fp(e4, t4, r4, n4) {
  if (typeof e4 == "number" && typeof t4 == "number" && typeof r4 == "number" && typeof n4 == "number")
    return n4 >= 1 ? Hn(e4, t4, r4) : "rgba(" + Zr(e4, t4, r4) + "," + n4 + ")";
  if (typeof e4 == "object" && t4 === void 0 && r4 === void 0 && n4 === void 0)
    return e4.alpha >= 1 ? Hn(e4.hue, e4.saturation, e4.lightness) : "rgba(" + Zr(e4.hue, e4.saturation, e4.lightness) + "," + e4.alpha + ")";
  throw new Ce$1(2);
}
o$1(Fp, "hsla");
function Yo(e4, t4, r4) {
  if (typeof e4 == "number" && typeof t4 == "number" && typeof r4 == "number")
    return Xo("#" + Nt(e4) + Nt(t4) + Nt(r4));
  if (typeof e4 == "object" && t4 === void 0 && r4 === void 0)
    return Xo("#" + Nt(e4.red) + Nt(e4.green) + Nt(e4.blue));
  throw new Ce$1(6);
}
o$1(Yo, "rgb");
function Dt(e4, t4, r4, n4) {
  if (typeof e4 == "string" && typeof t4 == "number") {
    var a4 = cr(e4);
    return "rgba(" + a4.red + "," + a4.green + "," + a4.blue + "," + t4 + ")";
  } else {
    if (typeof e4 == "number" && typeof t4 == "number" && typeof r4 == "number" && typeof n4 == "number")
      return n4 >= 1 ? Yo(e4, t4, r4) : "rgba(" + e4 + "," + t4 + "," + r4 + "," + n4 + ")";
    if (typeof e4 == "object" && t4 === void 0 && r4 === void 0 && n4 === void 0)
      return e4.alpha >= 1 ? Yo(e4.red, e4.green, e4.blue) : "rgba(" + e4.red + "," + e4.green + "," + e4.blue + "," + e4.alpha + ")";
  }
  throw new Ce$1(7);
}
o$1(Dt, "rgba");
var _p = /* @__PURE__ */ o$1(function(t4) {
  return typeof t4.red == "number" && typeof t4.green == "number" && typeof t4.blue == "number" && (typeof t4.alpha != "number" || typeof t4.alpha > "u");
}, "isRgb"), $p = /* @__PURE__ */ o$1(function(t4) {
  return typeof t4.red == "number" && typeof t4.green == "number" && typeof t4.blue == "number" && typeof t4.alpha == "number";
}, "isRgba"), Vp = /* @__PURE__ */ o$1(function(t4) {
  return typeof t4.hue == "number" && typeof t4.saturation == "number" && typeof t4.lightness == "number" && (typeof t4.alpha != "number" || typeof t4.alpha > "u");
}, "isHsl"), jp = /* @__PURE__ */ o$1(function(t4) {
  return typeof t4.hue == "number" && typeof t4.saturation == "number" && typeof t4.lightness == "number" && typeof t4.alpha == "number";
}, "isHsla");
function vt(e4) {
  if (typeof e4 != "object") throw new Ce$1(8);
  if ($p(e4)) return Dt(e4);
  if (_p(e4)) return Yo(e4);
  if (jp(e4)) return Fp(e4);
  if (Vp(e4)) return Dp(e4);
  throw new Ce$1(8);
}
o$1(vt, "toColorString");
function $l(e4, t4, r4) {
  return /* @__PURE__ */ o$1(function() {
    var a4 = r4.concat(Array.prototype.slice.call(arguments));
    return a4.length >= t4 ? e4.apply(this, a4) : $l(e4, t4, a4);
  }, "fn");
}
o$1($l, "curried");
function He$1(e4) {
  return $l(e4, e4.length, []);
}
o$1(He$1, "curry");
function Wp(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = gt(t4);
  return vt(W$1({}, r4, {
    hue: r4.hue + parseFloat(e4)
  }));
}
o$1(Wp, "adjustHue");
He$1(Wp);
function sr(e4, t4, r4) {
  return Math.max(e4, Math.min(t4, r4));
}
o$1(sr, "guard");
function Up(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = gt(t4);
  return vt(W$1({}, r4, {
    lightness: sr(0, 1, r4.lightness - parseFloat(e4))
  }));
}
o$1(Up, "darken");
var qp = He$1(Up), wt = qp;
function Gp(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = gt(t4);
  return vt(W$1({}, r4, {
    saturation: sr(0, 1, r4.saturation - parseFloat(e4))
  }));
}
o$1(Gp, "desaturate");
He$1(Gp);
function Xp(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = gt(t4);
  return vt(W$1({}, r4, {
    lightness: sr(0, 1, r4.lightness + parseFloat(e4))
  }));
}
o$1(Xp, "lighten");
var Yp = He$1(Xp), Zo = Yp;
function Zp(e4, t4, r4) {
  if (t4 === "transparent") return r4;
  if (r4 === "transparent") return t4;
  if (e4 === 0) return r4;
  var n4 = cr(t4), a4 = W$1({}, n4, {
    alpha: typeof n4.alpha == "number" ? n4.alpha : 1
  }), i4 = cr(r4), c2 = W$1({}, i4, {
    alpha: typeof i4.alpha == "number" ? i4.alpha : 1
  }), l2 = a4.alpha - c2.alpha, s2 = parseFloat(e4) * 2 - 1, u2 = s2 * l2 === -1 ? s2 : s2 + l2, f2 = 1 + s2 * l2, d4 = (u2 / f2 + 1) / 2, m4 = 1 - d4, v3 = {
    red: Math.floor(a4.red * d4 + c2.red * m4),
    green: Math.floor(a4.green * d4 + c2.green * m4),
    blue: Math.floor(a4.blue * d4 + c2.blue * m4),
    alpha: a4.alpha * parseFloat(e4) + c2.alpha * (1 - parseFloat(e4))
  };
  return Dt(v3);
}
o$1(Zp, "mix");
var Kp = He$1(Zp), Vl = Kp;
function Jp(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = cr(t4), n4 = typeof r4.alpha == "number" ? r4.alpha : 1, a4 = W$1({}, r4, {
    alpha: sr(0, 1, (n4 * 100 + parseFloat(e4) * 100) / 100)
  });
  return Dt(a4);
}
o$1(Jp, "opacify");
He$1(Jp);
function Qp(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = gt(t4);
  return vt(W$1({}, r4, {
    saturation: sr(0, 1, r4.saturation + parseFloat(e4))
  }));
}
o$1(Qp, "saturate");
He$1(Qp);
function e22(e4, t4) {
  return t4 === "transparent" ? t4 : vt(W$1({}, gt(t4), {
    hue: parseFloat(e4)
  }));
}
o$1(e22, "setHue");
He$1(e22);
function t2(e4, t4) {
  return t4 === "transparent" ? t4 : vt(W$1({}, gt(t4), {
    lightness: parseFloat(e4)
  }));
}
o$1(t2, "setLightness");
He$1(t2);
function r2(e4, t4) {
  return t4 === "transparent" ? t4 : vt(W$1({}, gt(t4), {
    saturation: parseFloat(e4)
  }));
}
o$1(r2, "setSaturation");
He$1(r2);
function n2(e4, t4) {
  return t4 === "transparent" ? t4 : Vl(parseFloat(e4), "rgb(0, 0, 0)", t4);
}
o$1(n2, "shade");
He$1(n2);
function o2(e4, t4) {
  return t4 === "transparent" ? t4 : Vl(parseFloat(e4), "rgb(255, 255, 255)", t4);
}
o$1(o2, "tint");
He$1(o2);
function a2(e4, t4) {
  if (t4 === "transparent") return t4;
  var r4 = cr(t4), n4 = typeof r4.alpha == "number" ? r4.alpha : 1, a4 = W$1({}, r4, {
    alpha: sr(0, 1, +(n4 * 100 - parseFloat(e4) * 100).toFixed(2) / 100)
  });
  return Dt(a4);
}
o$1(a2, "transparentize");
var i2 = He$1(a2), we$1 = i2;
var Ne$1 = /* @__PURE__ */ o$1(({ theme: e4 }) => ({
  margin: "20px 0 8px",
  padding: 0,
  cursor: "text",
  position: "relative",
  color: e4.color.defaultText,
  "&:first-of-type": {
    marginTop: 0,
    paddingTop: 0
  },
  "&:hover a.anchor": {
    textDecoration: "none"
  },
  "& tt, & code": {
    fontSize: "inherit"
  }
}), "headerCommon"), at = /* @__PURE__ */ o$1(({ theme: e4 }) => ({
  lineHeight: 1,
  margin: "0 2px",
  padding: "3px 5px",
  whiteSpace: "nowrap",
  borderRadius: 3,
  fontSize: e4.typography.size.s2 - 1,
  border: e4.base === "light" ? `1px solid ${e4.color.mediumlight}` : `1px solid ${e4.color.darker}`,
  color: e4.base === "light" ? we$1(0.1, e4.color.defaultText) : we$1(0.3, e4.color.defaultText),
  backgroundColor: e4.base === "light" ? e4.color.lighter : e4.color.border
}), "codeCommon"), N$1 = /* @__PURE__ */ o$1(({ theme: e4 }) => ({
  fontFamily: e4.typography.fonts.base,
  fontSize: e4.typography.size.s3,
  margin: 0,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  WebkitOverflowScrolling: "touch"
}), "withReset"), Me$1 = {
  margin: "16px 0"
};
var jl = xr$1.div(N$1);
var Wl = /* @__PURE__ */ o$1(({
  href: e$1 = "",
  ...t4
}) => {
  let n4 = /^\//.test(e$1) ? `./?path=${e$1}` : e$1, i4 = /^#.*/.test(e$1) ? "_self" : "_top";
  return /* @__PURE__ */ e.createElement("a", { href: n4, target: i4, ...t4 });
}, "Link");
var Ko = xr$1(Wl)(N$1, ({ theme: e4 }) => ({
  fontSize: "inherit",
  lineHeight: "24px",
  color: e4.color.secondary,
  textDecoration: "none",
  "&.absent": {
    color: "#cc0000"
  },
  "&.anchor": {
    display: "block",
    paddingLeft: 30,
    marginLeft: -30,
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0
  }
}));
var Jo = xr$1.blockquote(N$1, Me$1, ({ theme: e4 }) => ({
  borderLeft: `4px solid ${e4.color.medium}`,
  padding: "0 15px",
  color: e4.color.dark,
  "& > :first-of-type": {
    marginTop: 0
  },
  "& > :last-child": {
    marginBottom: 0
  }
}));
cn();
var j5 = /* @__PURE__ */ o$1((e4) => typeof e4 == "string", "isReactChildString");
var wh = /[\n\r]/g, bh = xr$1.code(
  ({ theme: e4 }) => ({
    // from reset
    fontFamily: e4.typography.fonts.mono,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    display: "inline-block",
    paddingLeft: 2,
    paddingRight: 2,
    verticalAlign: "baseline",
    color: "inherit"
  }),
  at
), Rh = xr$1(ln)(({ theme: e4 }) => ({
  // DocBlocks-specific styling and overrides
  fontFamily: e4.typography.fonts.mono,
  fontSize: `${e4.typography.size.s2 - 1}px`,
  lineHeight: "19px",
  margin: "25px 0 40px",
  borderRadius: e4.appBorderRadius,
  boxShadow: e4.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
  "pre.prismjs": {
    padding: 20,
    background: "inherit"
  }
})), ei = /* @__PURE__ */ o$1(({
  className: e$1,
  children: t4,
  ...r4
}) => {
  let n4 = (e$1 || "").match(/lang-(\S+)/), a4 = reactExports.Children.toArray(t4);
  return a4.filter(j5).some((c2) => c2.match(wh)) ? /* @__PURE__ */ e.createElement(
    Rh,
    {
      bordered: true,
      copyable: true,
      language: n4?.[1] ?? "text",
      format: false,
      ...r4
    },
    t4
  ) : /* @__PURE__ */ e.createElement(bh, { ...r4, className: e$1 }, a4);
}, "Code");
var ti = xr$1.dl(N$1, Me$1, {
  padding: 0,
  "& dt": {
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "italic",
    padding: 0,
    margin: "16px 0 4px"
  },
  "& dt:first-of-type": {
    padding: 0
  },
  "& dt > :first-of-type": {
    marginTop: 0
  },
  "& dt > :last-child": {
    marginBottom: 0
  },
  "& dd": {
    margin: "0 0 16px",
    padding: "0 15px"
  },
  "& dd > :first-of-type": {
    marginTop: 0
  },
  "& dd > :last-child": {
    marginBottom: 0
  }
});
var ri = xr$1.div(N$1);
var ni = xr$1.h1(N$1, Ne$1, ({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.l1}px`,
  fontWeight: e4.typography.weight.bold
}));
var oi = xr$1.h2(N$1, Ne$1, ({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.m2}px`,
  paddingBottom: 4,
  borderBottom: `1px solid ${e4.appBorderColor}`
}));
var ai = xr$1.h3(N$1, Ne$1, ({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.m1}px`
}));
var ii = xr$1.h4(N$1, Ne$1, ({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.s3}px`
}));
var li = xr$1.h5(N$1, Ne$1, ({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.s2}px`
}));
var ci = xr$1.h6(N$1, Ne$1, ({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.s2}px`,
  color: e4.color.dark
}));
var si = xr$1.hr(({ theme: e4 }) => ({
  border: "0 none",
  borderTop: `1px solid ${e4.appBorderColor}`,
  height: 4,
  padding: 0
}));
var ui = xr$1.img({
  maxWidth: "100%"
});
var fi = xr$1.li(N$1, ({ theme: e4 }) => ({
  fontSize: e4.typography.size.s2,
  color: e4.color.defaultText,
  lineHeight: "24px",
  "& + li": {
    marginTop: ".25em"
  },
  "& ul, & ol": {
    marginTop: ".25em",
    marginBottom: 0
  },
  "& code": at({ theme: e4 })
}));
var Ph = {
  paddingLeft: 30,
  "& :first-of-type": {
    marginTop: 0
  },
  "& :last-child": {
    marginBottom: 0
  }
}, di = xr$1.ol(N$1, Me$1, Ph, {
  listStyle: "decimal"
});
var pi = xr$1.p(N$1, Me$1, ({ theme: e4 }) => ({
  fontSize: e4.typography.size.s2,
  lineHeight: "24px",
  color: e4.color.defaultText,
  "& code": at({ theme: e4 })
}));
var mi = xr$1.pre(N$1, Me$1, ({ theme: e4 }) => ({
  // reset
  fontFamily: e4.typography.fonts.mono,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  lineHeight: "18px",
  padding: "11px 1rem",
  whiteSpace: "pre-wrap",
  color: "inherit",
  borderRadius: 3,
  margin: "1rem 0",
  "&:not(.prismjs)": {
    background: "transparent",
    border: "none",
    borderRadius: 0,
    padding: 0,
    margin: 0
  },
  "& pre, &.prismjs": {
    padding: 15,
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "inherit",
    fontSize: "13px",
    lineHeight: "19px",
    code: {
      color: "inherit",
      fontSize: "inherit"
    }
  },
  "& code": {
    whiteSpace: "pre"
  },
  "& code, & tt": {
    border: "none"
  }
}));
var hi = xr$1.span(N$1, ({ theme: e4 }) => ({
  "&.frame": {
    display: "block",
    overflow: "hidden",
    "& > span": {
      border: `1px solid ${e4.color.medium}`,
      display: "block",
      float: "left",
      overflow: "hidden",
      margin: "13px 0 0",
      padding: 7,
      width: "auto"
    },
    "& span img": {
      display: "block",
      float: "left"
    },
    "& span span": {
      clear: "both",
      color: e4.color.darkest,
      display: "block",
      padding: "5px 0 0"
    }
  },
  "&.align-center": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "center"
    },
    "& span img": {
      margin: "0 auto",
      textAlign: "center"
    }
  },
  "&.align-right": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px 0 0",
      textAlign: "right"
    },
    "& span img": {
      margin: 0,
      textAlign: "right"
    }
  },
  "&.float-left": {
    display: "block",
    marginRight: 13,
    overflow: "hidden",
    float: "left",
    "& span": {
      margin: "13px 0 0"
    }
  },
  "&.float-right": {
    display: "block",
    marginLeft: 13,
    overflow: "hidden",
    float: "right",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "right"
    }
  }
}));
var gi = xr$1.title(at);
var vi = xr$1.table(N$1, Me$1, ({ theme: e4 }) => ({
  fontSize: e4.typography.size.s2,
  lineHeight: "24px",
  padding: 0,
  borderCollapse: "collapse",
  "& tr": {
    borderTop: `1px solid ${e4.appBorderColor}`,
    backgroundColor: e4.appContentBg,
    margin: 0,
    padding: 0
  },
  "& tr:nth-of-type(2n)": {
    backgroundColor: e4.base === "dark" ? e4.color.darker : e4.color.lighter
  },
  "& tr th": {
    fontWeight: "bold",
    color: e4.color.defaultText,
    border: `1px solid ${e4.appBorderColor}`,
    margin: 0,
    padding: "6px 13px"
  },
  "& tr td": {
    border: `1px solid ${e4.appBorderColor}`,
    color: e4.color.defaultText,
    margin: 0,
    padding: "6px 13px"
  },
  "& tr th :first-of-type, & tr td :first-of-type": {
    marginTop: 0
  },
  "& tr th :last-child, & tr td :last-child": {
    marginBottom: 0
  }
}));
var _h = {
  paddingLeft: 30,
  "& :first-of-type": {
    marginTop: 0
  },
  "& :last-child": {
    marginBottom: 0
  }
}, wi = xr$1.ul(N$1, Me$1, _h, { listStyle: "disc" });
var bi = {
  h1: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ni, { ...J$1(e$1, "h1") }), "h1"),
  h2: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(oi, { ...J$1(e$1, "h2") }), "h2"),
  h3: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ai, { ...J$1(e$1, "h3") }), "h3"),
  h4: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ii, { ...J$1(e$1, "h4") }), "h4"),
  h5: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(li, { ...J$1(e$1, "h5") }), "h5"),
  h6: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ci, { ...J$1(e$1, "h6") }), "h6"),
  pre: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(mi, { ...J$1(e$1, "pre") }), "pre"),
  a: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(Ko, { ...J$1(e$1, "a") }), "a"),
  hr: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(si, { ...J$1(e$1, "hr") }), "hr"),
  dl: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ti, { ...J$1(e$1, "dl") }), "dl"),
  blockquote: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(Jo, { ...J$1(e$1, "blockquote") }), "blockquote"),
  table: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(vi, { ...J$1(e$1, "table") }), "table"),
  img: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ui, { ...J$1(e$1, "img") }), "img"),
  div: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ri, { ...J$1(e$1, "div") }), "div"),
  span: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(hi, { ...J$1(e$1, "span") }), "span"),
  li: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(fi, { ...J$1(e$1, "li") }), "li"),
  ul: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(wi, { ...J$1(e$1, "ul") }), "ul"),
  ol: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(di, { ...J$1(e$1, "ol") }), "ol"),
  p: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(pi, { ...J$1(e$1, "p") }), "p"),
  code: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(ei, { ...J$1(e$1, "code") }), "code"),
  tt: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(gi, { ...J$1(e$1, "tt") }), "tt"),
  resetwrapper: /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(jl, { ...J$1(e$1, "resetwrapper") }), "resetwrapper")
};
var Wh = xr$1.div(
  ({ theme: e4, compact: t4 }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: e4.typography.size.s1,
    fontWeight: e4.typography.weight.bold,
    lineHeight: "12px",
    minWidth: 20,
    borderRadius: 20,
    padding: t4 ? "4px 7px" : "4px 10px"
  }),
  {
    svg: {
      height: 12,
      width: 12,
      marginRight: 4,
      marginTop: -2,
      path: {
        fill: "currentColor"
      }
    }
  },
  ({ theme: e4, status: t4 }) => {
    switch (t4) {
      case "critical":
        return {
          color: e4.color.critical,
          background: e4.background.critical
        };
      case "negative":
        return {
          color: e4.color.negativeText,
          background: e4.background.negative,
          boxShadow: e4.base === "light" ? `inset 0 0 0 1px ${we$1(0.9, e4.color.negativeText)}` : "none"
        };
      case "warning":
        return {
          color: e4.color.warningText,
          background: e4.background.warning,
          boxShadow: e4.base === "light" ? `inset 0 0 0 1px ${we$1(0.9, e4.color.warningText)}` : "none"
        };
      case "neutral":
        return {
          color: e4.textMutedColor,
          background: e4.base === "light" ? e4.background.app : e4.barBg,
          boxShadow: `inset 0 0 0 1px ${we$1(0.8, e4.textMutedColor)}`
        };
      case "positive":
        return {
          color: e4.color.positiveText,
          background: e4.background.positive,
          boxShadow: e4.base === "light" ? `inset 0 0 0 1px ${we$1(0.9, e4.color.positiveText)}` : "none"
        };
      case "active":
        return {
          color: e4.color.secondary,
          background: e4.background.hoverable,
          boxShadow: `inset 0 0 0 1px ${we$1(0.9, e4.color.secondary)}`
        };
      default:
        return {};
    }
  }
), Uh = /* @__PURE__ */ o$1(({ ...e$1 }) => /* @__PURE__ */ e.createElement(Wh, { ...e$1 }), "Badge");
var q5 = /* @__PURE__ */ reactExports.forwardRef(({ color: e4 = "currentColor", size: t4 = 14, ...r4 }, n4) => /* @__PURE__ */ reactExports.createElement(
  "svg",
  {
    width: t4,
    height: t4,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: n4,
    ...r4
  },
  /* @__PURE__ */ reactExports.createElement(
    "path",
    {
      d: "M10.139 8.725l1.36-1.323a.568.568 0 00.151-.54.534.534 0 00-.377-.396l-2.705-.708 2.22-4.976a.568.568 0 00-.15-.666.497.497 0 00-.648.008L5.464 4.05l.708.71 2.848-2.47-1.64 3.677.697.697 2.164.567-.81.787.708.708zM2.523 6.6a.566.566 0 00-.177.544.534.534 0 00.382.41l2.782.721-1.494 5.013a.563.563 0 00.217.627.496.496 0 00.629-.06l3.843-3.736-.708-.707-2.51 2.44 1.137-3.814-.685-.685-2.125-.55.844-.731-.71-.71L2.524 6.6zM1.854 1.146a.5.5 0 10-.708.708l11 11a.5.5 0 00.708-.708l-11-11z",
      fill: e4
    }
  )
));
var G5 = /* @__PURE__ */ reactExports.forwardRef(({ color: e4 = "currentColor", size: t4 = 14, ...r4 }, n4) => /* @__PURE__ */ reactExports.createElement(
  "svg",
  {
    width: t4,
    height: t4,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: n4,
    ...r4
  },
  /* @__PURE__ */ reactExports.createElement(
    "path",
    {
      d: "M1.854 1.146a.5.5 0 10-.708.708L6.293 7l-5.147 5.146a.5.5 0 00.708.708L7 7.707l5.146 5.147a.5.5 0 00.708-.708L7.707 7l5.147-5.146a.5.5 0 00-.708-.708L7 6.293 1.854 1.146z",
      fill: e4
    }
  )
));
var X5 = /* @__PURE__ */ reactExports.forwardRef(({ color: e4 = "currentColor", size: t4 = 14, ...r4 }, n4) => /* @__PURE__ */ reactExports.createElement(
  "svg",
  {
    width: t4,
    height: t4,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: n4,
    ...r4
  },
  /* @__PURE__ */ reactExports.createElement(
    "path",
    {
      d: "M11.104 7.354l-5.5 5.5a.5.5 0 01-.708-.708L10.043 7 4.896 1.854a.5.5 0 11.708-.708l5.5 5.5a.5.5 0 010 .708z",
      fill: e4
    }
  )
));
var qh = 0, Gh = /* @__PURE__ */ o$1((e4) => e4.button === qh && !e4.altKey && !e4.ctrlKey && !e4.metaKey && !e4.shiftKey, "isPlainLeftClick"), Xh = /* @__PURE__ */ o$1(
  (e4, t4) => {
    Gh(e4) && (e4.preventDefault(), t4(e4));
  },
  "cancelled"
), Yh = xr$1.span(
  ({ withArrow: e4 }) => e4 ? {
    "> svg:last-of-type": {
      height: "0.7em",
      width: "0.7em",
      marginRight: 0,
      marginLeft: "0.25em",
      bottom: "auto",
      verticalAlign: "inherit"
    }
  } : {},
  ({ containsIcon: e4 }) => e4 ? {
    svg: {
      height: "1em",
      width: "1em",
      verticalAlign: "middle",
      position: "relative",
      bottom: 0,
      marginRight: 0
    }
  } : {}
), Zh = xr$1.a(
  ({ theme: e4 }) => ({
    display: "inline-block",
    transition: "all 150ms ease-out",
    textDecoration: "none",
    color: e4.color.secondary,
    "&:hover, &:focus": {
      cursor: "pointer",
      color: wt(0.07, e4.color.secondary),
      "svg path:not([fill])": {
        fill: wt(0.07, e4.color.secondary)
      }
    },
    "&:active": {
      color: wt(0.1, e4.color.secondary),
      "svg path:not([fill])": {
        fill: wt(0.1, e4.color.secondary)
      }
    },
    svg: {
      display: "inline-block",
      height: "1em",
      width: "1em",
      verticalAlign: "text-top",
      position: "relative",
      bottom: "-0.125em",
      marginRight: "0.4em",
      "& path": {
        fill: e4.color.secondary
      }
    }
  }),
  ({ theme: e4, secondary: t4, tertiary: r4 }) => {
    let n4;
    return t4 && (n4 = [e4.textMutedColor, e4.color.dark, e4.color.darker]), r4 && (n4 = [e4.color.dark, e4.color.darkest, e4.textMutedColor]), n4 ? {
      color: n4[0],
      "svg path:not([fill])": {
        fill: n4[0]
      },
      "&:hover": {
        color: n4[1],
        "svg path:not([fill])": {
          fill: n4[1]
        }
      },
      "&:active": {
        color: n4[2],
        "svg path:not([fill])": {
          fill: n4[2]
        }
      }
    } : {};
  },
  ({ nochrome: e4 }) => e4 ? {
    color: "inherit",
    "&:hover, &:active": {
      color: "inherit",
      textDecoration: "underline"
    }
  } : {},
  ({ theme: e4, inverse: t4 }) => t4 ? {
    color: e4.color.lightest,
    ":not([fill])": {
      fill: e4.color.lightest
    },
    "&:hover": {
      color: e4.color.lighter,
      "svg path:not([fill])": {
        fill: e4.color.lighter
      }
    },
    "&:active": {
      color: e4.color.light,
      "svg path:not([fill])": {
        fill: e4.color.light
      }
    }
  } : {},
  ({ isButton: e4 }) => e4 ? {
    border: 0,
    borderRadius: 0,
    background: "none",
    padding: 0,
    fontSize: "inherit"
  } : {}
), yi = /* @__PURE__ */ o$1(({
  cancel: e$1 = true,
  children: t4,
  onClick: r4 = void 0,
  withArrow: n4 = false,
  containsIcon: a4 = false,
  className: i4 = void 0,
  style: c2 = void 0,
  ...l2
}) => /* @__PURE__ */ e.createElement(
  Zh,
  {
    ...l2,
    onClick: r4 && e$1 ? (s2) => Xh(s2, r4) : r4,
    className: i4
  },
  /* @__PURE__ */ e.createElement(Yh, { withArrow: n4, containsIcon: a4 }, t4, n4 && /* @__PURE__ */ e.createElement(X5, null))
), "Link");
var Jh = xr$1.div(({ theme: e4 }) => ({
  fontSize: `${e4.typography.size.s2}px`,
  lineHeight: "1.6",
  h1: {
    fontSize: `${e4.typography.size.l1}px`,
    fontWeight: e4.typography.weight.bold
  },
  h2: {
    fontSize: `${e4.typography.size.m2}px`,
    borderBottom: `1px solid ${e4.appBorderColor}`
  },
  h3: {
    fontSize: `${e4.typography.size.m1}px`
  },
  h4: {
    fontSize: `${e4.typography.size.s3}px`
  },
  h5: {
    fontSize: `${e4.typography.size.s2}px`
  },
  h6: {
    fontSize: `${e4.typography.size.s2}px`,
    color: e4.color.dark
  },
  "pre:not(.prismjs)": {
    background: "transparent",
    border: "none",
    borderRadius: 0,
    padding: 0,
    margin: 0
  },
  "pre pre, pre.prismjs": {
    padding: 15,
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "inherit",
    fontSize: "13px",
    lineHeight: "19px"
  },
  "pre pre code, pre.prismjs code": {
    color: "inherit",
    fontSize: "inherit"
  },
  "pre code": {
    margin: 0,
    padding: 0,
    whiteSpace: "pre",
    border: "none",
    background: "transparent"
  },
  "pre code, pre tt": {
    backgroundColor: "transparent",
    border: "none"
  },
  /* GitHub inspired Markdown styles loosely from https://gist.github.com/tuzz/3331384 */
  "body > *:first-of-type": {
    marginTop: "0 !important"
  },
  "body > *:last-child": {
    marginBottom: "0 !important"
  },
  a: {
    color: e4.color.secondary,
    textDecoration: "none"
  },
  "a.absent": {
    color: "#cc0000"
  },
  "a.anchor": {
    display: "block",
    paddingLeft: 30,
    marginLeft: -30,
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0
  },
  "h1, h2, h3, h4, h5, h6": {
    margin: "20px 0 10px",
    padding: 0,
    cursor: "text",
    position: "relative",
    "&:first-of-type": {
      marginTop: 0,
      paddingTop: 0
    },
    "&:hover a.anchor": {
      textDecoration: "none"
    },
    "& tt, & code": {
      fontSize: "inherit"
    }
  },
  "h1:first-of-type + h2": {
    marginTop: 0,
    paddingTop: 0
  },
  "p, blockquote, ul, ol, dl, li, table, pre": {
    margin: "15px 0"
  },
  hr: {
    border: "0 none",
    borderTop: `1px solid ${e4.appBorderColor}`,
    height: 4,
    padding: 0
  },
  "body > h1:first-of-type, body > h2:first-of-type, body > h3:first-of-type, body > h4:first-of-type, body > h5:first-of-type, body > h6:first-of-type": {
    marginTop: 0,
    paddingTop: 0
  },
  "body > h1:first-of-type + h2": {
    marginTop: 0,
    paddingTop: 0
  },
  "a:first-of-type h1, a:first-of-type h2, a:first-of-type h3, a:first-of-type h4, a:first-of-type h5, a:first-of-type h6": {
    marginTop: 0,
    paddingTop: 0
  },
  "h1 p, h2 p, h3 p, h4 p, h5 p, h6 p": {
    marginTop: 0
  },
  "li p.first": {
    display: "inline-block"
  },
  "ul, ol": {
    paddingLeft: 30,
    "& :first-of-type": {
      marginTop: 0
    },
    "& :last-child": {
      marginBottom: 0
    }
  },
  dl: {
    padding: 0
  },
  "dl dt": {
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "italic",
    margin: "0 0 15px",
    padding: "0 15px",
    "&:first-of-type": {
      padding: 0
    },
    "& > :first-of-type": {
      marginTop: 0
    },
    "& > :last-child": {
      marginBottom: 0
    }
  },
  blockquote: {
    borderLeft: `4px solid ${e4.color.medium}`,
    padding: "0 15px",
    color: e4.color.dark,
    "& > :first-of-type": {
      marginTop: 0
    },
    "& > :last-child": {
      marginBottom: 0
    }
  },
  table: {
    padding: 0,
    borderCollapse: "collapse",
    "& tr": {
      borderTop: `1px solid ${e4.appBorderColor}`,
      backgroundColor: "white",
      margin: 0,
      padding: 0,
      "& th": {
        fontWeight: "bold",
        border: `1px solid ${e4.appBorderColor}`,
        textAlign: "left",
        margin: 0,
        padding: "6px 13px"
      },
      "& td": {
        border: `1px solid ${e4.appBorderColor}`,
        textAlign: "left",
        margin: 0,
        padding: "6px 13px"
      },
      "&:nth-of-type(2n)": {
        backgroundColor: e4.color.lighter
      },
      "& th :first-of-type, & td :first-of-type": {
        marginTop: 0
      },
      "& th :last-child, & td :last-child": {
        marginBottom: 0
      }
    }
  },
  img: {
    maxWidth: "100%"
  },
  "span.frame": {
    display: "block",
    overflow: "hidden",
    "& > span": {
      border: `1px solid ${e4.color.medium}`,
      display: "block",
      float: "left",
      overflow: "hidden",
      margin: "13px 0 0",
      padding: 7,
      width: "auto"
    },
    "& span img": {
      display: "block",
      float: "left"
    },
    "& span span": {
      clear: "both",
      color: e4.color.darkest,
      display: "block",
      padding: "5px 0 0"
    }
  },
  "span.align-center": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "center"
    },
    "& span img": {
      margin: "0 auto",
      textAlign: "center"
    }
  },
  "span.align-right": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px 0 0",
      textAlign: "right"
    },
    "& span img": {
      margin: 0,
      textAlign: "right"
    }
  },
  "span.float-left": {
    display: "block",
    marginRight: 13,
    overflow: "hidden",
    float: "left",
    "& span": {
      margin: "13px 0 0"
    }
  },
  "span.float-right": {
    display: "block",
    marginLeft: 13,
    overflow: "hidden",
    float: "right",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "right"
    }
  },
  "code, tt": {
    margin: "0 2px",
    padding: "0 5px",
    whiteSpace: "nowrap",
    border: `1px solid ${e4.color.mediumlight}`,
    backgroundColor: e4.color.lighter,
    borderRadius: 3,
    color: e4.base === "dark" ? e4.color.darkest : e4.color.dark
  }
}));
var Ut = [], xr = null, tg = reactExports.lazy(async () => {
  let { SyntaxHighlighter: e$1 } = await Promise.resolve().then(() => (cn(), Qa));
  return Ut.length > 0 && (Ut.forEach((t4) => {
    e$1.registerLanguage(...t4);
  }), Ut = []), xr === null && (xr = e$1), {
    default: /* @__PURE__ */ o$1((t4) => /* @__PURE__ */ e.createElement(e$1, { ...t4 }), "default")
  };
}), rg = reactExports.lazy(async () => {
  let [{ SyntaxHighlighter: e$1 }, { formatter: t4 }] = await Promise.all([
    Promise.resolve().then(() => (cn(), Qa)),
    Promise.resolve().then(() => (eu(), Q5))
  ]);
  return Ut.length > 0 && (Ut.forEach((r4) => {
    e$1.registerLanguage(...r4);
  }), Ut = []), xr === null && (xr = e$1), {
    default: /* @__PURE__ */ o$1((r4) => /* @__PURE__ */ e.createElement(e$1, { ...r4, formatter: t4 }), "default")
  };
}), ru = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(reactExports.Suspense, { fallback: /* @__PURE__ */ e.createElement("div", null) }, e$1.format !== false ? /* @__PURE__ */ e.createElement(rg, { ...e$1 }) : /* @__PURE__ */ e.createElement(tg, { ...e$1 })), "SyntaxHighlighter");
ru.registerLanguage = (...e4) => {
  if (xr !== null) {
    xr.registerLanguage(...e4);
    return;
  }
  Ut.push(e4);
};
cn();
Va();
var vo = {};
Xr(vo, {
  Close: () => s0,
  Content: () => i0,
  Description: () => c0,
  Dialog: () => qi,
  DialogClose: () => t0,
  DialogContent: () => Ki,
  DialogDescription: () => e0,
  DialogOverlay: () => Zi,
  DialogPortal: () => Yi,
  DialogTitle: () => Qi,
  DialogTrigger: () => Gi,
  Overlay: () => a0,
  Portal: () => o0,
  Root: () => n0,
  Title: () => l0,
  Trigger: () => bv,
  WarningProvider: () => hv,
  createDialogScope: () => cv
});
function Er(e4, t4, { checkForDefaultPrevented: r4 = true } = {}) {
  return /* @__PURE__ */ o$1(function(a4) {
    if (e4?.(a4), r4 === false || !a4.defaultPrevented)
      return t4?.(a4);
  }, "handleEvent");
}
o$1(Er, "composeEventHandlers");
function nu(e4, t4) {
  if (typeof e4 == "function")
    return e4(t4);
  e4 != null && (e4.current = t4);
}
o$1(nu, "setRef");
function xi(...e4) {
  return (t4) => {
    let r4 = false, n4 = e4.map((a4) => {
      let i4 = nu(a4, t4);
      return !r4 && typeof i4 == "function" && (r4 = true), i4;
    });
    if (r4)
      return () => {
        for (let a4 = 0; a4 < n4.length; a4++) {
          let i4 = n4[a4];
          typeof i4 == "function" ? i4() : nu(e4[a4], null);
        }
      };
  };
}
o$1(xi, "composeRefs");
function Ye(...e4) {
  return reactExports.useCallback(xi(...e4), e4);
}
o$1(Ye, "useComposedRefs");
function iu(e4, t4) {
  let r4 = reactExports.createContext(t4), n4 = /* @__PURE__ */ o$1((i4) => {
    let { children: c2, ...l2 } = i4, s2 = reactExports.useMemo(() => l2, Object.values(l2));
    return /* @__PURE__ */ jsxRuntimeExports.jsx(r4.Provider, { value: s2, children: c2 });
  }, "Provider");
  n4.displayName = e4 + "Provider";
  function a4(i4) {
    let c2 = reactExports.useContext(r4);
    if (c2) return c2;
    if (t4 !== void 0) return t4;
    throw new Error(`\`${i4}\` must be used within \`${e4}\``);
  }
  return o$1(a4, "useContext2"), [n4, a4];
}
o$1(iu, "createContext2");
function lu(e4, t4 = []) {
  let r4 = [];
  function n4(i4, c2) {
    let l2 = reactExports.createContext(c2), s2 = r4.length;
    r4 = [...r4, c2];
    let u2 = /* @__PURE__ */ o$1((d4) => {
      let { scope: m4, children: v3, ...R3 } = d4, p4 = m4?.[e4]?.[s2] || l2, h4 = reactExports.useMemo(() => R3, Object.values(R3));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(p4.Provider, { value: h4, children: v3 });
    }, "Provider");
    u2.displayName = i4 + "Provider";
    function f2(d4, m4) {
      let v3 = m4?.[e4]?.[s2] || l2, R3 = reactExports.useContext(v3);
      if (R3) return R3;
      if (c2 !== void 0) return c2;
      throw new Error(`\`${d4}\` must be used within \`${i4}\``);
    }
    return o$1(f2, "useContext2"), [u2, f2];
  }
  o$1(n4, "createContext3");
  let a4 = /* @__PURE__ */ o$1(() => {
    let i4 = r4.map((c2) => reactExports.createContext(c2));
    return /* @__PURE__ */ o$1(function(l2) {
      let s2 = l2?.[e4] || i4;
      return reactExports.useMemo(
        () => ({ [`__scope${e4}`]: { ...l2, [e4]: s2 } }),
        [l2, s2]
      );
    }, "useScope");
  }, "createScope");
  return a4.scopeName = e4, [n4, ng(a4, ...t4)];
}
o$1(lu, "createContextScope");
function ng(...e4) {
  let t4 = e4[0];
  if (e4.length === 1) return t4;
  let r4 = /* @__PURE__ */ o$1(() => {
    let n4 = e4.map((a4) => ({
      useScope: a4(),
      scopeName: a4.scopeName
    }));
    return /* @__PURE__ */ o$1(function(i4) {
      let c2 = n4.reduce((l2, { useScope: s2, scopeName: u2 }) => {
        let d4 = s2(i4)[`__scope${u2}`];
        return { ...l2, ...d4 };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${t4.scopeName}`]: c2 }), [c2]);
    }, "useComposedScopes");
  }, "createScope");
  return r4.scopeName = t4.scopeName, r4;
}
o$1(ng, "composeContextScopes");
var ct = globalThis?.document ? reactExports.useLayoutEffect : () => {
};
var og = Ve$2[" useId ".trim().toString()] || (() => {
}), ag = 0;
function to(e4) {
  let [t4, r4] = reactExports.useState(og());
  return ct(() => {
    e4 || r4((n4) => n4 ?? String(ag++));
  }, [e4]), e4 || (t4 ? `radix-${t4}` : "");
}
o$1(to, "useId");
var ig = Ve$2[" useInsertionEffect ".trim().toString()] || ct;
function su({
  prop: e4,
  defaultProp: t4,
  onChange: r4 = /* @__PURE__ */ o$1(() => {
  }, "onChange"),
  caller: n4
}) {
  let [a4, i4, c2] = lg({
    defaultProp: t4,
    onChange: r4
  }), l2 = e4 !== void 0, s2 = l2 ? e4 : a4;
  {
    let f2 = reactExports.useRef(e4 !== void 0);
    reactExports.useEffect(() => {
      let d4 = f2.current;
      d4 !== l2 && console.warn(
        `${n4} is changing from ${d4 ? "controlled" : "uncontrolled"} to ${l2 ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f2.current = l2;
    }, [l2, n4]);
  }
  let u2 = reactExports.useCallback(
    (f2) => {
      if (l2) {
        let d4 = cg(f2) ? f2(e4) : f2;
        d4 !== e4 && c2.current?.(d4);
      } else
        i4(f2);
    },
    [l2, e4, i4, c2]
  );
  return [s2, u2];
}
o$1(su, "useControllableState");
function lg({
  defaultProp: e4,
  onChange: t4
}) {
  let [r4, n4] = reactExports.useState(e4), a4 = reactExports.useRef(r4), i4 = reactExports.useRef(t4);
  return ig(() => {
    i4.current = t4;
  }, [t4]), reactExports.useEffect(() => {
    a4.current !== r4 && (i4.current?.(r4), a4.current = r4);
  }, [r4, a4]), [r4, n4, i4];
}
o$1(lg, "useUncontrolledState");
function cg(e4) {
  return typeof e4 == "function";
}
o$1(cg, "isFunction");
function no(e4, t4, { checkForDefaultPrevented: r4 = true } = {}) {
  return /* @__PURE__ */ o$1(function(a4) {
    if (e4?.(a4), r4 === false || !a4.defaultPrevented)
      return t4?.(a4);
  }, "handleEvent");
}
o$1(no, "composeEventHandlers");
// @__NO_SIDE_EFFECTS__
function sn(e4) {
  let t4 = /* @__PURE__ */ sg(e4), r4 = reactExports.forwardRef((n4, a4) => {
    let { children: i4, ...c2 } = n4, l2 = reactExports.Children.toArray(i4), s2 = l2.find(fg);
    if (s2) {
      let u2 = s2.props.children, f2 = l2.map((d4) => d4 === s2 ? reactExports.Children.count(u2) > 1 ? reactExports.Children.only(null) : reactExports.isValidElement(u2) ? u2.props.children : null : d4);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(t4, { ...c2, ref: a4, children: reactExports.isValidElement(u2) ? reactExports.cloneElement(u2, void 0, f2) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(t4, { ...c2, ref: a4, children: i4 });
  });
  return r4.displayName = `${e4}.Slot`, r4;
}
o$1(sn, "createSlot");
var fu = /* @__PURE__ */ sn("Slot");
// @__NO_SIDE_EFFECTS__
function sg(e4) {
  let t4 = reactExports.forwardRef((r4, n4) => {
    let { children: a4, ...i4 } = r4;
    if (reactExports.isValidElement(a4)) {
      let c2 = pg(a4), l2 = dg(i4, a4.props);
      return a4.type !== reactExports.Fragment && (l2.ref = n4 ? xi(n4, c2) : c2), reactExports.cloneElement(a4, l2);
    }
    return reactExports.Children.count(a4) > 1 ? reactExports.Children.only(null) : null;
  });
  return t4.displayName = `${e4}.SlotClone`, t4;
}
o$1(sg, "createSlotClone");
var ug = Symbol("radix.slottable");
function fg(e4) {
  return reactExports.isValidElement(e4) && typeof e4.type == "function" && "__radixId" in e4.type && e4.type.__radixId === ug;
}
o$1(fg, "isSlottable");
function dg(e4, t4) {
  let r4 = { ...t4 };
  for (let n4 in t4) {
    let a4 = e4[n4], i4 = t4[n4];
    /^on[A-Z]/.test(n4) ? a4 && i4 ? r4[n4] = (...l2) => {
      i4(...l2), a4(...l2);
    } : a4 && (r4[n4] = a4) : n4 === "style" ? r4[n4] = { ...a4, ...i4 } : n4 === "className" && (r4[n4] = [a4, i4].filter(Boolean).join(" "));
  }
  return { ...e4, ...r4 };
}
o$1(dg, "mergeProps");
function pg(e4) {
  let t4 = Object.getOwnPropertyDescriptor(e4.props, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning;
  return r4 ? e4.ref : (t4 = Object.getOwnPropertyDescriptor(e4, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning, r4 ? e4.props.ref : e4.props.ref || e4.ref);
}
o$1(pg, "getElementRef");
var hg = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Pe$1 = hg.reduce((e4, t4) => {
  let r4 = /* @__PURE__ */ sn(`Primitive.${t4}`), n4 = reactExports.forwardRef((a4, i4) => {
    let { asChild: c2, ...l2 } = a4, s2 = c2 ? r4 : t4;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = true), /* @__PURE__ */ jsxRuntimeExports.jsx(s2, { ...l2, ref: i4 });
  });
  return n4.displayName = `Primitive.${t4}`, { ...e4, [t4]: n4 };
}, {});
function mu(e4, t4) {
  e4 && reactDomExports.flushSync(() => e4.dispatchEvent(t4));
}
o$1(mu, "dispatchDiscreteCustomEvent");
function St(e4) {
  let t4 = reactExports.useRef(e4);
  return reactExports.useEffect(() => {
    t4.current = e4;
  }), reactExports.useMemo(() => (...r4) => t4.current?.(...r4), []);
}
o$1(St, "useCallbackRef");
function gu(e4, t4 = globalThis?.document) {
  let r4 = St(e4);
  reactExports.useEffect(() => {
    let n4 = /* @__PURE__ */ o$1((a4) => {
      a4.key === "Escape" && r4(a4);
    }, "handleKeyDown");
    return t4.addEventListener("keydown", n4, { capture: true }), () => t4.removeEventListener("keydown", n4, { capture: true });
  }, [r4, t4]);
}
o$1(gu, "useEscapeKeydown");
var gg = "DismissableLayer", Si = "dismissableLayer.update", vg = "dismissableLayer.pointerDownOutside", wg = "dismissableLayer.focusOutside", vu, Ru = reactExports.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ci = reactExports.forwardRef(
  (e4, t4) => {
    let {
      disableOutsidePointerEvents: r4 = false,
      onEscapeKeyDown: n4,
      onPointerDownOutside: a4,
      onFocusOutside: i4,
      onInteractOutside: c2,
      onDismiss: l2,
      ...s2
    } = e4, u2 = reactExports.useContext(Ru), [f2, d4] = reactExports.useState(null), m4 = f2?.ownerDocument ?? globalThis?.document, [, v3] = reactExports.useState({}), R3 = Ye(t4, (S4) => d4(
      S4
    )), p4 = Array.from(u2.layers), [h4] = [...u2.layersWithOutsidePointerEventsDisabled].slice(-1), g4 = p4.indexOf(h4), w3 = f2 ? p4.indexOf(f2) : -1, b3 = u2.layersWithOutsidePointerEventsDisabled.size > 0, x4 = w3 >= g4, E4 = yg((S4) => {
      let L2 = S4.target, M2 = [...u2.branches].some((A3) => A3.contains(L2));
      !x4 || M2 || (a4?.(S4), c2?.(S4), S4.defaultPrevented || l2?.());
    }, m4), y4 = xg((S4) => {
      let L2 = S4.target;
      [...u2.branches].some((A3) => A3.contains(L2)) || (i4?.(S4), c2?.(S4), S4.defaultPrevented || l2?.());
    }, m4);
    return gu((S4) => {
      w3 === u2.layers.size - 1 && (n4?.(S4), !S4.defaultPrevented && l2 && (S4.preventDefault(), l2()));
    }, m4), reactExports.useEffect(() => {
      if (f2)
        return r4 && (u2.layersWithOutsidePointerEventsDisabled.size === 0 && (vu = m4.body.style.pointerEvents, m4.body.style.pointerEvents = "none"), u2.layersWithOutsidePointerEventsDisabled.add(f2)), u2.layers.add(f2), wu(), () => {
          r4 && u2.layersWithOutsidePointerEventsDisabled.size === 1 && (m4.body.style.pointerEvents = vu);
        };
    }, [f2, m4, r4, u2]), reactExports.useEffect(() => () => {
      f2 && (u2.layers.delete(f2), u2.layersWithOutsidePointerEventsDisabled.delete(f2), wu());
    }, [f2, u2]), reactExports.useEffect(() => {
      let S4 = /* @__PURE__ */ o$1(() => v3({}), "handleUpdate");
      return document.addEventListener(Si, S4), () => document.removeEventListener(Si, S4);
    }, []), /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pe$1.div,
      {
        ...s2,
        ref: R3,
        style: {
          pointerEvents: b3 ? x4 ? "auto" : "none" : void 0,
          ...e4.style
        },
        onFocusCapture: no(e4.onFocusCapture, y4.onFocusCapture),
        onBlurCapture: no(e4.onBlurCapture, y4.onBlurCapture),
        onPointerDownCapture: no(
          e4.onPointerDownCapture,
          E4.onPointerDownCapture
        )
      }
    );
  }
);
Ci.displayName = gg;
var bg = "DismissableLayerBranch", Rg = reactExports.forwardRef((e4, t4) => {
  let r4 = reactExports.useContext(Ru), n4 = reactExports.useRef(null), a4 = Ye(t4, n4);
  return reactExports.useEffect(() => {
    let i4 = n4.current;
    if (i4)
      return r4.branches.add(i4), () => {
        r4.branches.delete(i4);
      };
  }, [r4.branches]), /* @__PURE__ */ jsxRuntimeExports.jsx(Pe$1.div, { ...e4, ref: a4 });
});
Rg.displayName = bg;
function yg(e4, t4 = globalThis?.document) {
  let r4 = St(e4), n4 = reactExports.useRef(false), a4 = reactExports.useRef(() => {
  });
  return reactExports.useEffect(() => {
    let i4 = /* @__PURE__ */ o$1((l2) => {
      if (l2.target && !n4.current) {
        let u2 = /* @__PURE__ */ o$1(function() {
          yu(
            vg,
            r4,
            f2,
            { discrete: true }
          );
        }, "handleAndDispatchPointerDownOutsideEvent2");
        let f2 = { originalEvent: l2 };
        l2.pointerType === "touch" ? (t4.removeEventListener("click", a4.current), a4.current = u2, t4.addEventListener("click", a4.current, { once: true })) : u2();
      } else
        t4.removeEventListener("click", a4.current);
      n4.current = false;
    }, "handlePointerDown"), c2 = window.setTimeout(() => {
      t4.addEventListener("pointerdown", i4);
    }, 0);
    return () => {
      window.clearTimeout(c2), t4.removeEventListener("pointerdown", i4), t4.removeEventListener("click", a4.current);
    };
  }, [t4, r4]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ o$1(() => n4.current = true, "onPointerDownCapture")
  };
}
o$1(yg, "usePointerDownOutside");
function xg(e4, t4 = globalThis?.document) {
  let r4 = St(e4), n4 = reactExports.useRef(false);
  return reactExports.useEffect(() => {
    let a4 = /* @__PURE__ */ o$1((i4) => {
      i4.target && !n4.current && yu(wg, r4, { originalEvent: i4 }, {
        discrete: false
      });
    }, "handleFocus");
    return t4.addEventListener("focusin", a4), () => t4.removeEventListener("focusin", a4);
  }, [t4, r4]), {
    onFocusCapture: /* @__PURE__ */ o$1(() => n4.current = true, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ o$1(() => n4.current = false, "onBlurCapture")
  };
}
o$1(xg, "useFocusOutside");
function wu() {
  let e4 = new CustomEvent(Si);
  document.dispatchEvent(e4);
}
o$1(wu, "dispatchUpdate");
function yu(e4, t4, r4, { discrete: n4 }) {
  let a4 = r4.originalEvent.target, i4 = new CustomEvent(e4, { bubbles: false, cancelable: true, detail: r4 });
  t4 && a4.addEventListener(e4, t4, { once: true }), n4 ? mu(a4, i4) : a4.dispatchEvent(i4);
}
o$1(yu, "handleAndDispatchCustomEvent");
var Mi = "focusScope.autoFocusOnMount", Li = "focusScope.autoFocusOnUnmount", xu = { bubbles: false, cancelable: true }, Sg = "FocusScope", Ai = reactExports.forwardRef(
  (e4, t4) => {
    let {
      loop: r4 = false,
      trapped: n4 = false,
      onMountAutoFocus: a4,
      onUnmountAutoFocus: i4,
      ...c2
    } = e4, [l2, s2] = reactExports.useState(null), u2 = St(a4), f2 = St(i4), d4 = reactExports.useRef(null), m4 = Ye(t4, (p4) => s2(p4)), v3 = reactExports.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    reactExports.useEffect(() => {
      if (n4) {
        let w3 = /* @__PURE__ */ o$1(function(y4) {
          if (v3.paused || !l2) return;
          let S4 = y4.target;
          l2.contains(S4) ? d4.current = S4 : Ct(d4.current, { select: true });
        }, "handleFocusIn2"), b3 = /* @__PURE__ */ o$1(function(y4) {
          if (v3.paused || !l2) return;
          let S4 = y4.relatedTarget;
          S4 !== null && (l2.contains(S4) || Ct(d4.current, { select: true }));
        }, "handleFocusOut2"), x4 = /* @__PURE__ */ o$1(function(y4) {
          if (document.activeElement === document.body)
            for (let L2 of y4)
              L2.removedNodes.length > 0 && Ct(l2);
        }, "handleMutations2");
        document.addEventListener("focusin", w3), document.addEventListener("focusout", b3);
        let E4 = new MutationObserver(x4);
        return l2 && E4.observe(l2, { childList: true, subtree: true }), () => {
          document.removeEventListener("focusin", w3), document.removeEventListener("focusout", b3), E4.disconnect();
        };
      }
    }, [n4, l2, v3.paused]), reactExports.useEffect(() => {
      if (l2) {
        Su.add(v3);
        let p4 = document.activeElement;
        if (!l2.contains(p4)) {
          let g4 = new CustomEvent(Mi, xu);
          l2.addEventListener(Mi, u2), l2.dispatchEvent(g4), g4.defaultPrevented || (Cg(zg(Mu(l2)), { select: true }), document.activeElement === p4 && Ct(l2));
        }
        return () => {
          l2.removeEventListener(Mi, u2), setTimeout(() => {
            let g4 = new CustomEvent(Li, xu);
            l2.addEventListener(Li, f2), l2.dispatchEvent(g4), g4.defaultPrevented || Ct(p4 ?? document.body, { select: true }), l2.removeEventListener(
              Li,
              f2
            ), Su.remove(v3);
          }, 0);
        };
      }
    }, [l2, u2, f2, v3]);
    let R3 = reactExports.useCallback(
      (p4) => {
        if (!r4 && !n4 || v3.paused) return;
        let h4 = p4.key === "Tab" && !p4.altKey && !p4.ctrlKey && !p4.metaKey, g4 = document.activeElement;
        if (h4 && g4) {
          let w3 = p4.currentTarget, [b3, x4] = Mg(w3);
          b3 && x4 ? !p4.shiftKey && g4 === x4 ? (p4.preventDefault(), r4 && Ct(b3, { select: true })) : p4.shiftKey && g4 === b3 && (p4.preventDefault(), r4 && Ct(x4, { select: true })) : g4 === w3 && p4.preventDefault();
        }
      },
      [r4, n4, v3.paused]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Pe$1.div, { tabIndex: -1, ...c2, ref: m4, onKeyDown: R3 });
  }
);
Ai.displayName = Sg;
function Cg(e4, { select: t4 = false } = {}) {
  let r4 = document.activeElement;
  for (let n4 of e4)
    if (Ct(n4, { select: t4 }), document.activeElement !== r4) return;
}
o$1(Cg, "focusFirst");
function Mg(e4) {
  let t4 = Mu(e4), r4 = Eu(t4, e4), n4 = Eu(t4.reverse(), e4);
  return [r4, n4];
}
o$1(Mg, "getTabbableEdges");
function Mu(e4) {
  let t4 = [], r4 = document.createTreeWalker(e4, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ o$1((n4) => {
      let a4 = n4.tagName === "INPUT" && n4.type === "hidden";
      return n4.disabled || n4.hidden || a4 ? NodeFilter.FILTER_SKIP : n4.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; r4.nextNode(); ) t4.push(r4.currentNode);
  return t4;
}
o$1(Mu, "getTabbableCandidates");
function Eu(e4, t4) {
  for (let r4 of e4)
    if (!Lg(r4, { upTo: t4 })) return r4;
}
o$1(Eu, "findVisible");
function Lg(e4, { upTo: t4 }) {
  if (getComputedStyle(e4).visibility === "hidden") return true;
  for (; e4; ) {
    if (t4 !== void 0 && e4 === t4) return false;
    if (getComputedStyle(e4).display === "none") return true;
    e4 = e4.parentElement;
  }
  return false;
}
o$1(Lg, "isHidden");
function Ag(e4) {
  return e4 instanceof HTMLInputElement && "select" in e4;
}
o$1(Ag, "isSelectableInput");
function Ct(e4, { select: t4 = false } = {}) {
  if (e4 && e4.focus) {
    let r4 = document.activeElement;
    e4.focus({ preventScroll: true }), e4 !== r4 && Ag(e4) && t4 && e4.select();
  }
}
o$1(Ct, "focus");
var Su = Ig();
function Ig() {
  let e4 = [];
  return {
    add(t4) {
      let r4 = e4[0];
      t4 !== r4 && r4?.pause(), e4 = Cu(e4, t4), e4.unshift(t4);
    },
    remove(t4) {
      e4 = Cu(e4, t4), e4[0]?.resume();
    }
  };
}
o$1(Ig, "createFocusScopesStack");
function Cu(e4, t4) {
  let r4 = [...e4], n4 = r4.indexOf(t4);
  return n4 !== -1 && r4.splice(n4, 1), r4;
}
o$1(Cu, "arrayRemove");
function zg(e4) {
  return e4.filter((t4) => t4.tagName !== "A");
}
o$1(zg, "removeLinks");
var Pg = "Portal", Ii = reactExports.forwardRef((e4, t4) => {
  let { container: r4, ...n4 } = e4, [a4, i4] = reactExports.useState(false);
  ct(() => i4(true), []);
  let c2 = r4 || a4 && globalThis?.document?.body;
  return c2 ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Pe$1.div, { ...n4, ref: t4 }), c2) : null;
});
Ii.displayName = Pg;
function kg(e4, t4) {
  return reactExports.useReducer((r4, n4) => t4[r4][n4] ?? r4, e4);
}
o$1(kg, "useStateMachine");
var un = /* @__PURE__ */ o$1((e4) => {
  let { present: t4, children: r4 } = e4, n4 = Og(t4), a4 = typeof r4 == "function" ? r4({ present: n4.isPresent }) : reactExports.Children.only(r4), i4 = Ye(
    n4.ref,
    Bg(a4)
  );
  return typeof r4 == "function" || n4.isPresent ? reactExports.cloneElement(a4, { ref: i4 }) : null;
}, "Presence");
un.displayName = "Presence";
function Og(e4) {
  let [t4, r4] = reactExports.useState(), n4 = reactExports.useRef(null), a4 = reactExports.useRef(e4), i4 = reactExports.useRef("none"), c2 = e4 ? "mounted" : "unmounted", [l2, s2] = kg(c2, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return reactExports.useEffect(() => {
    let u2 = ao(n4.current);
    i4.current = l2 === "mounted" ? u2 : "none";
  }, [l2]), ct(() => {
    let u2 = n4.current, f2 = a4.current;
    if (f2 !== e4) {
      let m4 = i4.current, v3 = ao(u2);
      e4 ? s2("MOUNT") : v3 === "none" || u2?.display === "none" ? s2("UNMOUNT") : s2(f2 && m4 !== v3 ? "ANIMATION_OUT" : "UNMOUNT"), a4.current = e4;
    }
  }, [e4, s2]), ct(() => {
    if (t4) {
      let u2, f2 = t4.ownerDocument.defaultView ?? window, d4 = /* @__PURE__ */ o$1((v3) => {
        let p4 = ao(n4.current).includes(v3.animationName);
        if (v3.target === t4 && p4 && (s2("ANIMATION_END"), !a4.current)) {
          let h4 = t4.style.animationFillMode;
          t4.style.animationFillMode = "forwards", u2 = f2.setTimeout(() => {
            t4.style.animationFillMode === "forwards" && (t4.style.animationFillMode = h4);
          });
        }
      }, "handleAnimationEnd"), m4 = /* @__PURE__ */ o$1((v3) => {
        v3.target === t4 && (i4.current = ao(n4.current));
      }, "handleAnimationStart");
      return t4.addEventListener("animationstart", m4), t4.addEventListener("animationcancel", d4), t4.addEventListener("animationend", d4), () => {
        f2.clearTimeout(u2), t4.removeEventListener("animationstart", m4), t4.removeEventListener("animationcancel", d4), t4.removeEventListener("animationend", d4);
      };
    } else
      s2("ANIMATION_END");
  }, [t4, s2]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l2),
    ref: reactExports.useCallback((u2) => {
      n4.current = u2 ? getComputedStyle(u2) : null, r4(u2);
    }, [])
  };
}
o$1(Og, "usePresence");
function ao(e4) {
  return e4?.animationName || "none";
}
o$1(ao, "getAnimationName");
function Bg(e4) {
  let t4 = Object.getOwnPropertyDescriptor(e4.props, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning;
  return r4 ? e4.ref : (t4 = Object.getOwnPropertyDescriptor(e4, "ref")?.get, r4 = t4 && "isReactWarning" in t4 && t4.isReactWarning, r4 ? e4.props.ref : e4.props.ref || e4.ref);
}
o$1(Bg, "getElementRef");
var zi = 0;
function zu() {
  reactExports.useEffect(() => {
    let e4 = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e4[0] ?? Au()), document.body.insertAdjacentElement("beforeend", e4[1] ?? Au()), zi++, () => {
      zi === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t4) => t4.remove()), zi--;
    };
  }, []);
}
o$1(zu, "useFocusGuards");
function Au() {
  let e4 = document.createElement("span");
  return e4.setAttribute("data-radix-focus-guard", ""), e4.tabIndex = 0, e4.style.outline = "none", e4.style.opacity = "0", e4.style.position = "fixed", e4.style.pointerEvents = "none", e4;
}
o$1(Au, "createFocusGuard");
var ze$1 = /* @__PURE__ */ o$1(function() {
  return ze$1 = Object.assign || /* @__PURE__ */ o$1(function(t4) {
    for (var r4, n4 = 1, a4 = arguments.length; n4 < a4; n4++) {
      r4 = arguments[n4];
      for (var i4 in r4) Object.prototype.hasOwnProperty.call(r4, i4) && (t4[i4] = r4[i4]);
    }
    return t4;
  }, "__assign"), ze$1.apply(this, arguments);
}, "__assign");
function io(e4, t4) {
  var r4 = {};
  for (var n4 in e4) Object.prototype.hasOwnProperty.call(e4, n4) && t4.indexOf(n4) < 0 && (r4[n4] = e4[n4]);
  if (e4 != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a4 = 0, n4 = Object.getOwnPropertySymbols(e4); a4 < n4.length; a4++)
      t4.indexOf(n4[a4]) < 0 && Object.prototype.propertyIsEnumerable.call(e4, n4[a4]) && (r4[n4[a4]] = e4[n4[a4]]);
  return r4;
}
o$1(io, "__rest");
function Tu(e4, t4, r4) {
  if (r4 || arguments.length === 2) for (var n4 = 0, a4 = t4.length, i4; n4 < a4; n4++)
    (i4 || !(n4 in t4)) && (i4 || (i4 = Array.prototype.slice.call(t4, 0, n4)), i4[n4] = t4[n4]);
  return e4.concat(i4 || Array.prototype.slice.call(t4));
}
o$1(Tu, "__spreadArray");
var qt = "right-scroll-bar-position", Gt = "width-before-scroll-bar", Ti = "with-scroll-bars-hidden", Hi = "--removed-body-scroll-bar-size";
function lo(e4, t4) {
  return typeof e4 == "function" ? e4(t4) : e4 && (e4.current = t4), e4;
}
o$1(lo, "assignRef");
function Hu(e4, t4) {
  var r4 = reactExports.useState(function() {
    return {
      // value
      value: e4,
      // last callback
      callback: t4,
      // "memoized" public interface
      facade: {
        get current() {
          return r4.value;
        },
        set current(n4) {
          var a4 = r4.value;
          a4 !== n4 && (r4.value = n4, r4.callback(n4, a4));
        }
      }
    };
  })[0];
  return r4.callback = t4, r4.facade;
}
o$1(Hu, "useCallbackRef");
var Dg = typeof window < "u" ? reactExports.useLayoutEffect : reactExports.useEffect, Pu = /* @__PURE__ */ new WeakMap();
function Pi(e4, t4) {
  var r4 = Hu(t4 || null, function(n4) {
    return e4.forEach(function(a4) {
      return lo(a4, n4);
    });
  });
  return Dg(function() {
    var n4 = Pu.get(r4);
    if (n4) {
      var a4 = new Set(n4), i4 = new Set(e4), c2 = r4.current;
      a4.forEach(function(l2) {
        i4.has(l2) || lo(l2, null);
      }), i4.forEach(function(l2) {
        a4.has(l2) || lo(l2, c2);
      });
    }
    Pu.set(r4, e4);
  }, [e4]), r4;
}
o$1(Pi, "useMergeRefs");
function Fg(e4) {
  return e4;
}
o$1(Fg, "ItoI");
function _g(e4, t4) {
  t4 === void 0 && (t4 = Fg);
  var r4 = [], n4 = false, a4 = {
    read: /* @__PURE__ */ o$1(function() {
      if (n4)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r4.length ? r4[r4.length - 1] : e4;
    }, "read"),
    useMedium: /* @__PURE__ */ o$1(function(i4) {
      var c2 = t4(i4, n4);
      return r4.push(c2), function() {
        r4 = r4.filter(function(l2) {
          return l2 !== c2;
        });
      };
    }, "useMedium"),
    assignSyncMedium: /* @__PURE__ */ o$1(function(i4) {
      for (n4 = true; r4.length; ) {
        var c2 = r4;
        r4 = [], c2.forEach(i4);
      }
      r4 = {
        push: /* @__PURE__ */ o$1(function(l2) {
          return i4(l2);
        }, "push"),
        filter: /* @__PURE__ */ o$1(function() {
          return r4;
        }, "filter")
      };
    }, "assignSyncMedium"),
    assignMedium: /* @__PURE__ */ o$1(function(i4) {
      n4 = true;
      var c2 = [];
      if (r4.length) {
        var l2 = r4;
        r4 = [], l2.forEach(i4), c2 = r4;
      }
      var s2 = /* @__PURE__ */ o$1(function() {
        var f2 = c2;
        c2 = [], f2.forEach(i4);
      }, "executeQueue"), u2 = /* @__PURE__ */ o$1(function() {
        return Promise.resolve().then(s2);
      }, "cycle");
      u2(), r4 = {
        push: /* @__PURE__ */ o$1(function(f2) {
          c2.push(f2), u2();
        }, "push"),
        filter: /* @__PURE__ */ o$1(function(f2) {
          return c2 = c2.filter(f2), r4;
        }, "filter")
      };
    }, "assignMedium")
  };
  return a4;
}
o$1(_g, "innerCreateMedium");
function ki(e4) {
  e4 === void 0 && (e4 = {});
  var t4 = _g(null);
  return t4.options = ze$1({ async: true, ssr: false }, e4), t4;
}
o$1(ki, "createSidecarMedium");
var Ou = /* @__PURE__ */ o$1(function(e4) {
  var t4 = e4.sideCar, r4 = io(e4, ["sideCar"]);
  if (!t4)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n4 = t4.read();
  if (!n4)
    throw new Error("Sidecar medium not found");
  return reactExports.createElement(n4, ze$1({}, r4));
}, "SideCar");
Ou.isSideCarExport = true;
function Oi(e4, t4) {
  return e4.useMedium(t4), Ou;
}
o$1(Oi, "exportSidecar");
var so = ki();
var Bi = /* @__PURE__ */ o$1(function() {
}, "nothing"), fn = reactExports.forwardRef(function(e4, t4) {
  var r4 = reactExports.useRef(null), n4 = reactExports.useState({
    onScrollCapture: Bi,
    onWheelCapture: Bi,
    onTouchMoveCapture: Bi
  }), a4 = n4[0], i4 = n4[1], c2 = e4.forwardProps, l2 = e4.children, s2 = e4.className, u2 = e4.removeScrollBar, f2 = e4.enabled, d4 = e4.shards, m4 = e4.sideCar, v3 = e4.noIsolation, R3 = e4.inert, p4 = e4.allowPinchZoom, h4 = e4.as, g4 = h4 === void 0 ? "div" : h4, w3 = e4.gapMode, b3 = io(e4, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x4 = m4, E4 = Pi([r4, t4]), y4 = ze$1(ze$1({}, b3), a4);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    f2 && reactExports.createElement(x4, {
      sideCar: so,
      removeScrollBar: u2,
      shards: d4,
      noIsolation: v3,
      inert: R3,
      setCallbacks: i4,
      allowPinchZoom: !!p4,
      lockRef: r4,
      gapMode: w3
    }),
    c2 ? reactExports.cloneElement(reactExports.Children.only(l2), ze$1(ze$1({}, y4), { ref: E4 })) : reactExports.createElement(g4, ze$1({}, y4, { className: s2, ref: E4 }), l2)
  );
});
fn.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
fn.classNames = {
  fullWidth: Gt,
  zeroRight: qt
};
var Nu = /* @__PURE__ */ o$1(function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
}, "getNonce");
function $g() {
  if (!document)
    return null;
  var e4 = document.createElement("style");
  e4.type = "text/css";
  var t4 = Nu();
  return t4 && e4.setAttribute("nonce", t4), e4;
}
o$1($g, "makeStyleTag");
function Vg(e4, t4) {
  e4.styleSheet ? e4.styleSheet.cssText = t4 : e4.appendChild(document.createTextNode(t4));
}
o$1(Vg, "injectStyles");
function jg(e4) {
  var t4 = document.head || document.getElementsByTagName("head")[0];
  t4.appendChild(e4);
}
o$1(jg, "insertStyleTag");
var Ni = /* @__PURE__ */ o$1(function() {
  var e4 = 0, t4 = null;
  return {
    add: /* @__PURE__ */ o$1(function(r4) {
      e4 == 0 && (t4 = $g()) && (Vg(t4, r4), jg(t4)), e4++;
    }, "add"),
    remove: /* @__PURE__ */ o$1(function() {
      e4--, !e4 && t4 && (t4.parentNode && t4.parentNode.removeChild(t4), t4 = null);
    }, "remove")
  };
}, "stylesheetSingleton");
var Di = /* @__PURE__ */ o$1(function() {
  var e4 = Ni();
  return function(t4, r4) {
    reactExports.useEffect(function() {
      return e4.add(t4), function() {
        e4.remove();
      };
    }, [t4 && r4]);
  };
}, "styleHookSingleton");
var dn = /* @__PURE__ */ o$1(function() {
  var e4 = Di(), t4 = /* @__PURE__ */ o$1(function(r4) {
    var n4 = r4.styles, a4 = r4.dynamic;
    return e4(n4, a4), null;
  }, "Sheet");
  return t4;
}, "styleSingleton");
var Wg = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Fi = /* @__PURE__ */ o$1(function(e4) {
  return parseInt(e4 || "", 10) || 0;
}, "parse"), Ug = /* @__PURE__ */ o$1(function(e4) {
  var t4 = window.getComputedStyle(document.body), r4 = t4[e4 === "padding" ? "paddingLeft" : "marginLeft"], n4 = t4[e4 === "padding" ? "paddingTop" : "marginTop"], a4 = t4[e4 === "padding" ? "paddingRight" : "marginRight"];
  return [Fi(r4), Fi(n4), Fi(a4)];
}, "getOffset"), _i = /* @__PURE__ */ o$1(function(e4) {
  if (e4 === void 0 && (e4 = "margin"), typeof window > "u")
    return Wg;
  var t4 = Ug(e4), r4 = document.documentElement.clientWidth, n4 = window.innerWidth;
  return {
    left: t4[0],
    top: t4[1],
    right: t4[2],
    gap: Math.max(0, n4 - r4 + t4[2] - t4[0])
  };
}, "getGapWidth");
var qg = dn(), Cr = "data-scroll-locked", Gg = /* @__PURE__ */ o$1(function(e4, t4, r4, n4) {
  var a4 = e4.left, i4 = e4.top, c2 = e4.right, l2 = e4.gap;
  return r4 === void 0 && (r4 = "margin"), `
  .`.concat(Ti, ` {
   overflow: hidden `).concat(n4, `;
   padding-right: `).concat(l2, "px ").concat(n4, `;
  }
  body[`).concat(Cr, `] {
    overflow: hidden `).concat(n4, `;
    overscroll-behavior: contain;
    `).concat([
    t4 && "position: relative ".concat(n4, ";"),
    r4 === "margin" && `
    padding-left: `.concat(a4, `px;
    padding-top: `).concat(i4, `px;
    padding-right: `).concat(c2, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(l2, "px ").concat(n4, `;
    `),
    r4 === "padding" && "padding-right: ".concat(l2, "px ").concat(n4, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(qt, ` {
    right: `).concat(l2, "px ").concat(n4, `;
  }
  
  .`).concat(Gt, ` {
    margin-right: `).concat(l2, "px ").concat(n4, `;
  }
  
  .`).concat(qt, " .").concat(qt, ` {
    right: 0 `).concat(n4, `;
  }
  
  .`).concat(Gt, " .").concat(Gt, ` {
    margin-right: 0 `).concat(n4, `;
  }
  
  body[`).concat(Cr, `] {
    `).concat(Hi, ": ").concat(l2, `px;
  }
`);
}, "getStyles"), Fu = /* @__PURE__ */ o$1(function() {
  var e4 = parseInt(document.body.getAttribute(Cr) || "0", 10);
  return isFinite(e4) ? e4 : 0;
}, "getCurrentUseCounter"), Xg = /* @__PURE__ */ o$1(function() {
  reactExports.useEffect(function() {
    return document.body.setAttribute(Cr, (Fu() + 1).toString()), function() {
      var e4 = Fu() - 1;
      e4 <= 0 ? document.body.removeAttribute(Cr) : document.body.setAttribute(Cr, e4.toString());
    };
  }, []);
}, "useLockAttribute"), $i = /* @__PURE__ */ o$1(function(e4) {
  var t4 = e4.noRelative, r4 = e4.noImportant, n4 = e4.gapMode, a4 = n4 === void 0 ? "margin" : n4;
  Xg();
  var i4 = reactExports.useMemo(function() {
    return _i(a4);
  }, [a4]);
  return reactExports.createElement(qg, { styles: Gg(i4, !t4, a4, r4 ? "" : "!important") });
}, "RemoveScrollBar");
var Vi = false;
if (typeof window < "u")
  try {
    pn = Object.defineProperty({}, "passive", {
      get: /* @__PURE__ */ o$1(function() {
        return Vi = true, true;
      }, "get")
    }), window.addEventListener("test", pn, pn), window.removeEventListener("test", pn, pn);
  } catch {
    Vi = false;
  }
var pn, Xt = Vi ? { passive: false } : false;
var Yg = /* @__PURE__ */ o$1(function(e4) {
  return e4.tagName === "TEXTAREA";
}, "alwaysContainsScroll"), _u = /* @__PURE__ */ o$1(function(e4, t4) {
  if (!(e4 instanceof Element))
    return false;
  var r4 = window.getComputedStyle(e4);
  return (
    // not-not-scrollable
    r4[t4] !== "hidden" && // contains scroll inside self
    !(r4.overflowY === r4.overflowX && !Yg(e4) && r4[t4] === "visible")
  );
}, "elementCanBeScrolled"), Zg = /* @__PURE__ */ o$1(function(e4) {
  return _u(e4, "overflowY");
}, "elementCouldBeVScrolled"), Kg = /* @__PURE__ */ o$1(function(e4) {
  return _u(e4, "overflowX");
}, "elementCouldBeHScrolled"), ji = /* @__PURE__ */ o$1(function(e4, t4) {
  var r4 = t4.ownerDocument, n4 = t4;
  do {
    typeof ShadowRoot < "u" && n4 instanceof ShadowRoot && (n4 = n4.host);
    var a4 = $u(e4, n4);
    if (a4) {
      var i4 = Vu(e4, n4), c2 = i4[1], l2 = i4[2];
      if (c2 > l2)
        return true;
    }
    n4 = n4.parentNode;
  } while (n4 && n4 !== r4.body);
  return false;
}, "locationCouldBeScrolled"), Jg = /* @__PURE__ */ o$1(function(e4) {
  var t4 = e4.scrollTop, r4 = e4.scrollHeight, n4 = e4.clientHeight;
  return [
    t4,
    r4,
    n4
  ];
}, "getVScrollVariables"), Qg = /* @__PURE__ */ o$1(function(e4) {
  var t4 = e4.scrollLeft, r4 = e4.scrollWidth, n4 = e4.clientWidth;
  return [
    t4,
    r4,
    n4
  ];
}, "getHScrollVariables"), $u = /* @__PURE__ */ o$1(function(e4, t4) {
  return e4 === "v" ? Zg(t4) : Kg(t4);
}, "elementCouldBeScrolled"), Vu = /* @__PURE__ */ o$1(function(e4, t4) {
  return e4 === "v" ? Jg(t4) : Qg(t4);
}, "getScrollVariables"), ev = /* @__PURE__ */ o$1(function(e4, t4) {
  return e4 === "h" && t4 === "rtl" ? -1 : 1;
}, "getDirectionFactor"), ju = /* @__PURE__ */ o$1(function(e4, t4, r4, n4, a4) {
  var i4 = ev(e4, window.getComputedStyle(t4).direction), c2 = i4 * n4, l2 = r4.target, s2 = t4.contains(l2), u2 = false, f2 = c2 > 0, d4 = 0, m4 = 0;
  do {
    var v3 = Vu(e4, l2), R3 = v3[0], p4 = v3[1], h4 = v3[2], g4 = p4 - h4 - i4 * R3;
    (R3 || g4) && $u(e4, l2) && (d4 += g4, m4 += R3), l2 instanceof ShadowRoot ? l2 = l2.host : l2 = l2.parentNode;
  } while (
    // portaled content
    !s2 && l2 !== document.body || // self content
    s2 && (t4.contains(l2) || t4 === l2)
  );
  return (f2 && (a4 && Math.abs(d4) < 1 || !a4 && c2 > d4) || !f2 && (a4 && Math.abs(m4) < 1 || !a4 && -c2 > m4)) && (u2 = true), u2;
}, "handleScroll");
var uo = /* @__PURE__ */ o$1(function(e4) {
  return "changedTouches" in e4 ? [e4.changedTouches[0].clientX, e4.changedTouches[0].clientY] : [0, 0];
}, "getTouchXY"), Wu = /* @__PURE__ */ o$1(function(e4) {
  return [e4.deltaX, e4.deltaY];
}, "getDeltaXY"), Uu = /* @__PURE__ */ o$1(function(e4) {
  return e4 && "current" in e4 ? e4.current : e4;
}, "extractRef"), tv = /* @__PURE__ */ o$1(function(e4, t4) {
  return e4[0] === t4[0] && e4[1] === t4[1];
}, "deltaCompare"), rv = /* @__PURE__ */ o$1(function(e4) {
  return `
  .block-interactivity-`.concat(e4, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e4, ` {pointer-events: all;}
`);
}, "generateStyle"), nv = 0, Lr = [];
function qu(e4) {
  var t4 = reactExports.useRef([]), r4 = reactExports.useRef([0, 0]), n4 = reactExports.useRef(), a4 = reactExports.useState(nv++)[0], i4 = reactExports.useState(dn)[0], c2 = reactExports.useRef(e4);
  reactExports.useEffect(function() {
    c2.current = e4;
  }, [e4]), reactExports.useEffect(function() {
    if (e4.inert) {
      document.body.classList.add("block-interactivity-".concat(a4));
      var p4 = Tu([e4.lockRef.current], (e4.shards || []).map(Uu), true).filter(Boolean);
      return p4.forEach(function(h4) {
        return h4.classList.add("allow-interactivity-".concat(a4));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(a4)), p4.forEach(function(h4) {
          return h4.classList.remove("allow-interactivity-".concat(a4));
        });
      };
    }
  }, [e4.inert, e4.lockRef.current, e4.shards]);
  var l2 = reactExports.useCallback(function(p4, h4) {
    if ("touches" in p4 && p4.touches.length === 2 || p4.type === "wheel" && p4.ctrlKey)
      return !c2.current.allowPinchZoom;
    var g4 = uo(p4), w3 = r4.current, b3 = "deltaX" in p4 ? p4.deltaX : w3[0] - g4[0], x4 = "deltaY" in p4 ? p4.deltaY : w3[1] - g4[1], E4, y4 = p4.target, S4 = Math.abs(b3) > Math.abs(x4) ? "h" : "v";
    if ("touches" in p4 && S4 === "h" && y4.type === "range")
      return false;
    var L2 = ji(S4, y4);
    if (!L2)
      return true;
    if (L2 ? E4 = S4 : (E4 = S4 === "v" ? "h" : "v", L2 = ji(S4, y4)), !L2)
      return false;
    if (!n4.current && "changedTouches" in p4 && (b3 || x4) && (n4.current = E4), !E4)
      return true;
    var M2 = n4.current || E4;
    return ju(M2, h4, p4, M2 === "h" ? b3 : x4, true);
  }, []), s2 = reactExports.useCallback(function(p4) {
    var h4 = p4;
    if (!(!Lr.length || Lr[Lr.length - 1] !== i4)) {
      var g4 = "deltaY" in h4 ? Wu(h4) : uo(h4), w3 = t4.current.filter(function(E4) {
        return E4.name === h4.type && (E4.target === h4.target || h4.target === E4.shadowParent) && tv(E4.delta, g4);
      })[0];
      if (w3 && w3.should) {
        h4.cancelable && h4.preventDefault();
        return;
      }
      if (!w3) {
        var b3 = (c2.current.shards || []).map(Uu).filter(Boolean).filter(function(E4) {
          return E4.contains(h4.target);
        }), x4 = b3.length > 0 ? l2(h4, b3[0]) : !c2.current.noIsolation;
        x4 && h4.cancelable && h4.preventDefault();
      }
    }
  }, []), u2 = reactExports.useCallback(function(p4, h4, g4, w3) {
    var b3 = { name: p4, delta: h4, target: g4, should: w3, shadowParent: ov(g4) };
    t4.current.push(b3), setTimeout(function() {
      t4.current = t4.current.filter(function(x4) {
        return x4 !== b3;
      });
    }, 1);
  }, []), f2 = reactExports.useCallback(function(p4) {
    r4.current = uo(p4), n4.current = void 0;
  }, []), d4 = reactExports.useCallback(function(p4) {
    u2(p4.type, Wu(p4), p4.target, l2(p4, e4.lockRef.current));
  }, []), m4 = reactExports.useCallback(function(p4) {
    u2(p4.type, uo(p4), p4.target, l2(p4, e4.lockRef.current));
  }, []);
  reactExports.useEffect(function() {
    return Lr.push(i4), e4.setCallbacks({
      onScrollCapture: d4,
      onWheelCapture: d4,
      onTouchMoveCapture: m4
    }), document.addEventListener("wheel", s2, Xt), document.addEventListener("touchmove", s2, Xt), document.addEventListener(
      "touchstart",
      f2,
      Xt
    ), function() {
      Lr = Lr.filter(function(p4) {
        return p4 !== i4;
      }), document.removeEventListener("wheel", s2, Xt), document.removeEventListener("touchmove", s2, Xt), document.removeEventListener("touchstart", f2, Xt);
    };
  }, []);
  var v3 = e4.removeScrollBar, R3 = e4.inert;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    R3 ? reactExports.createElement(i4, { styles: rv(a4) }) : null,
    v3 ? reactExports.createElement($i, { gapMode: e4.gapMode }) : null
  );
}
o$1(qu, "RemoveScrollSideCar");
function ov(e4) {
  for (var t4 = null; e4 !== null; )
    e4 instanceof ShadowRoot && (t4 = e4.host, e4 = e4.host), e4 = e4.parentNode;
  return t4;
}
o$1(ov, "getOutermostShadowParent");
var Gu = Oi(so, qu);
var Xu = reactExports.forwardRef(function(e4, t4) {
  return reactExports.createElement(fn, ze$1({}, e4, { ref: t4, sideCar: Gu }));
});
Xu.classNames = fn.classNames;
var Wi = Xu;
var av = /* @__PURE__ */ o$1(function(e4) {
  if (typeof document > "u")
    return null;
  var t4 = Array.isArray(e4) ? e4[0] : e4;
  return t4.ownerDocument.body;
}, "getDefaultParent"), Ar = /* @__PURE__ */ new WeakMap(), po = /* @__PURE__ */ new WeakMap(), mo = {}, Ui = 0, Yu = /* @__PURE__ */ o$1(function(e4) {
  return e4 && (e4.host || Yu(e4.parentNode));
}, "unwrapHost"), iv = /* @__PURE__ */ o$1(function(e4, t4) {
  return t4.map(function(r4) {
    if (e4.contains(r4))
      return r4;
    var n4 = Yu(r4);
    return n4 && e4.contains(n4) ? n4 : (console.error("aria-hidden", r4, "in not contained inside", e4, ". Doing nothing"), null);
  }).filter(function(r4) {
    return !!r4;
  });
}, "correctTargets"), lv = /* @__PURE__ */ o$1(function(e4, t4, r4, n4) {
  var a4 = iv(t4, Array.isArray(e4) ? e4 : [e4]);
  mo[r4] || (mo[r4] = /* @__PURE__ */ new WeakMap());
  var i4 = mo[r4], c2 = [], l2 = /* @__PURE__ */ new Set(), s2 = new Set(a4), u2 = /* @__PURE__ */ o$1(function(d4) {
    !d4 || l2.has(d4) || (l2.add(d4), u2(d4.parentNode));
  }, "keep");
  a4.forEach(u2);
  var f2 = /* @__PURE__ */ o$1(function(d4) {
    !d4 || s2.has(d4) || Array.prototype.forEach.call(d4.children, function(m4) {
      if (l2.has(m4))
        f2(m4);
      else
        try {
          var v3 = m4.getAttribute(n4), R3 = v3 !== null && v3 !== "false", p4 = (Ar.get(m4) || 0) + 1, h4 = (i4.get(m4) || 0) + 1;
          Ar.set(m4, p4), i4.set(m4, h4), c2.push(m4), p4 === 1 && R3 && po.set(m4, true), h4 === 1 && m4.setAttribute(r4, "true"), R3 || m4.setAttribute(n4, "true");
        } catch (g4) {
          console.error("aria-hidden: cannot operate on ", m4, g4);
        }
    });
  }, "deep");
  return f2(t4), l2.clear(), Ui++, function() {
    c2.forEach(function(d4) {
      var m4 = Ar.get(d4) - 1, v3 = i4.get(d4) - 1;
      Ar.set(d4, m4), i4.set(d4, v3), m4 || (po.has(d4) || d4.removeAttribute(n4), po.delete(d4)), v3 || d4.removeAttribute(r4);
    }), Ui--, Ui || (Ar = /* @__PURE__ */ new WeakMap(), Ar = /* @__PURE__ */ new WeakMap(), po = /* @__PURE__ */ new WeakMap(), mo = {});
  };
}, "applyAttributeToOthers"), Zu = /* @__PURE__ */ o$1(function(e4, t4, r4) {
  r4 === void 0 && (r4 = "data-aria-hidden");
  var n4 = Array.from(Array.isArray(e4) ? e4 : [e4]), a4 = t4 || av(e4);
  return a4 ? (n4.push.apply(n4, Array.from(a4.querySelectorAll("[aria-live]"))), lv(n4, a4, r4, "aria-hidden")) : function() {
    return null;
  };
}, "hideOthers");
var go = "Dialog", [Qu, cv] = lu(go), [sv, Ze$1] = Qu(go), qi = /* @__PURE__ */ o$1((e4) => {
  let {
    __scopeDialog: t4,
    children: r4,
    open: n4,
    defaultOpen: a4,
    onOpenChange: i4,
    modal: c2 = true
  } = e4, l2 = reactExports.useRef(null), s2 = reactExports.useRef(null), [u2, f2] = su({
    prop: n4,
    defaultProp: a4 ?? false,
    onChange: i4,
    caller: go
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    sv,
    {
      scope: t4,
      triggerRef: l2,
      contentRef: s2,
      contentId: to(),
      titleId: to(),
      descriptionId: to(),
      open: u2,
      onOpenChange: f2,
      onOpenToggle: reactExports.useCallback(() => f2((d4) => !d4), [f2]),
      modal: c2,
      children: r4
    }
  );
}, "Dialog");
qi.displayName = go;
var ef = "DialogTrigger", Gi = reactExports.forwardRef(
  (e4, t4) => {
    let { __scopeDialog: r4, ...n4 } = e4, a4 = Ze$1(ef, r4), i4 = Ye(t4, a4.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pe$1.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a4.open,
        "aria-controls": a4.contentId,
        "data-state": r0(a4.open),
        ...n4,
        ref: i4,
        onClick: Er(e4.onClick, a4.onOpenToggle)
      }
    );
  }
);
Gi.displayName = ef;
var Xi = "DialogPortal", [uv, tf] = Qu(Xi, {
  forceMount: void 0
}), Yi = /* @__PURE__ */ o$1((e4) => {
  let { __scopeDialog: t4, forceMount: r4, children: n4, container: a4 } = e4, i4 = Ze$1(Xi, t4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(uv, { scope: t4, forceMount: r4, children: reactExports.Children.map(n4, (c2) => /* @__PURE__ */ jsxRuntimeExports.jsx(un, {
    present: r4 || i4.open,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ii, { asChild: true, container: a4, children: c2 })
  })) });
}, "DialogPortal");
Yi.displayName = Xi;
var ho = "DialogOverlay", Zi = reactExports.forwardRef(
  (e4, t4) => {
    let r4 = tf(ho, e4.__scopeDialog), { forceMount: n4 = r4.forceMount, ...a4 } = e4, i4 = Ze$1(ho, e4.__scopeDialog);
    return i4.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(un, { present: n4 || i4.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(dv, { ...a4, ref: t4 }) }) : null;
  }
);
Zi.displayName = ho;
var fv = /* @__PURE__ */ sn("DialogOverlay.RemoveScroll"), dv = reactExports.forwardRef(
  (e4, t4) => {
    let { __scopeDialog: r4, ...n4 } = e4, a4 = Ze$1(ho, r4);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wi, { as: fv, allowPinchZoom: true, shards: [a4.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pe$1.div,
        {
          "data-state": r0(a4.open),
          ...n4,
          ref: t4,
          style: { pointerEvents: "auto", ...n4.style }
        }
      ) })
    );
  }
), Yt = "DialogContent", Ki = reactExports.forwardRef(
  (e4, t4) => {
    let r4 = tf(Yt, e4.__scopeDialog), { forceMount: n4 = r4.forceMount, ...a4 } = e4, i4 = Ze$1(Yt, e4.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(un, { present: n4 || i4.open, children: i4.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(pv, { ...a4, ref: t4 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      mv,
      { ...a4, ref: t4 }
    ) });
  }
);
Ki.displayName = Yt;
var pv = reactExports.forwardRef(
  (e4, t4) => {
    let r4 = Ze$1(Yt, e4.__scopeDialog), n4 = reactExports.useRef(null), a4 = Ye(t4, r4.contentRef, n4);
    return reactExports.useEffect(() => {
      let i4 = n4.current;
      if (i4) return Zu(i4);
    }, []), /* @__PURE__ */ jsxRuntimeExports.jsx(
      rf,
      {
        ...e4,
        ref: a4,
        trapFocus: r4.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: Er(e4.onCloseAutoFocus, (i4) => {
          i4.preventDefault(), r4.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Er(e4.onPointerDownOutside, (i4) => {
          let c2 = i4.detail.originalEvent, l2 = c2.button === 0 && c2.ctrlKey === true;
          (c2.button === 2 || l2) && i4.preventDefault();
        }),
        onFocusOutside: Er(
          e4.onFocusOutside,
          (i4) => i4.preventDefault()
        )
      }
    );
  }
), mv = reactExports.forwardRef(
  (e4, t4) => {
    let r4 = Ze$1(Yt, e4.__scopeDialog), n4 = reactExports.useRef(false), a4 = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      rf,
      {
        ...e4,
        ref: t4,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: /* @__PURE__ */ o$1((i4) => {
          e4.onCloseAutoFocus?.(i4), i4.defaultPrevented || (n4.current || r4.triggerRef.current?.focus(), i4.preventDefault()), n4.current = false, a4.current = false;
        }, "onCloseAutoFocus"),
        onInteractOutside: /* @__PURE__ */ o$1((i4) => {
          e4.onInteractOutside?.(i4), i4.defaultPrevented || (n4.current = true, i4.detail.originalEvent.type === "pointerdown" && (a4.current = true));
          let c2 = i4.target;
          r4.triggerRef.current?.contains(c2) && i4.preventDefault(), i4.detail.originalEvent.type === "focusin" && a4.current && i4.preventDefault();
        }, "onInteractOutside")
      }
    );
  }
), rf = reactExports.forwardRef(
  (e4, t4) => {
    let { __scopeDialog: r4, trapFocus: n4, onOpenAutoFocus: a4, onCloseAutoFocus: i4, ...c2 } = e4, l2 = Ze$1(Yt, r4), s2 = reactExports.useRef(null), u2 = Ye(t4, s2);
    return zu(), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ai,
        {
          asChild: true,
          loop: true,
          trapped: n4,
          onMountAutoFocus: a4,
          onUnmountAutoFocus: i4,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Ci,
            {
              role: "dialog",
              id: l2.contentId,
              "aria-describedby": l2.descriptionId,
              "aria-labelledby": l2.titleId,
              "data-state": r0(l2.open),
              ...c2,
              ref: u2,
              onDismiss: /* @__PURE__ */ o$1(() => l2.onOpenChange(false), "onDismiss")
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(gv, { titleId: l2.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(wv, { contentRef: s2, descriptionId: l2.descriptionId })
      ] })
    ] });
  }
), Ji = "DialogTitle", Qi = reactExports.forwardRef(
  (e4, t4) => {
    let { __scopeDialog: r4, ...n4 } = e4, a4 = Ze$1(Ji, r4);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Pe$1.h2, { id: a4.titleId, ...n4, ref: t4 });
  }
);
Qi.displayName = Ji;
var nf = "DialogDescription", e0 = reactExports.forwardRef(
  (e4, t4) => {
    let { __scopeDialog: r4, ...n4 } = e4, a4 = Ze$1(nf, r4);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Pe$1.p, { id: a4.descriptionId, ...n4, ref: t4 });
  }
);
e0.displayName = nf;
var of = "DialogClose", t0 = reactExports.forwardRef(
  (e4, t4) => {
    let { __scopeDialog: r4, ...n4 } = e4, a4 = Ze$1(of, r4);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pe$1.button,
      {
        type: "button",
        ...n4,
        ref: t4,
        onClick: Er(e4.onClick, () => a4.onOpenChange(false))
      }
    );
  }
);
t0.displayName = of;
function r0(e4) {
  return e4 ? "open" : "closed";
}
o$1(r0, "getState");
var af = "DialogTitleWarning", [hv, lf] = iu(af, {
  contentName: Yt,
  titleName: Ji,
  docsSlug: "dialog"
}), gv = /* @__PURE__ */ o$1(({ titleId: e4 }) => {
  let t4 = lf(af), r4 = `\`${t4.contentName}\` requires a \`${t4.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t4.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t4.docsSlug}`;
  return reactExports.useEffect(() => {
    e4 && (document.getElementById(e4) || console.error(r4));
  }, [r4, e4]), null;
}, "TitleWarning"), vv = "DialogDescriptionWarning", wv = /* @__PURE__ */ o$1(({ contentRef: e4, descriptionId: t4 }) => {
  let n4 = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${lf(vv).contentName}}.`;
  return reactExports.useEffect(() => {
    let a4 = e4.current?.getAttribute("aria-describedby");
    t4 && a4 && (document.getElementById(t4) || console.warn(n4));
  }, [n4, e4, t4]), null;
}, "DescriptionWarning"), n0 = qi, bv = Gi, o0 = Yi, a0 = Zi, i0 = Ki, l0 = Qi, c0 = e0, s0 = t0;
var p0 = {};
Xr(p0, {
  Actions: () => Ov,
  CloseButton: () => sf,
  Col: () => ff,
  Container: () => d0,
  Content: () => Tv,
  Description: () => kv,
  Error: () => Bv,
  ErrorWrapper: () => df,
  Header: () => Hv,
  Overlay: () => f0,
  Row: () => uf,
  Title: () => Pv
});
var Ir = reactExports.forwardRef(
  ({
    asChild: e$1 = false,
    animation: t4 = "none",
    size: r4 = "small",
    variant: n4 = "outline",
    padding: a4 = "medium",
    disabled: i4 = false,
    active: c2 = false,
    onClick: l2,
    ...s2
  }, u2) => {
    let f2 = "button";
    e$1 && (f2 = fu);
    let [d4, m4] = reactExports.useState(false), v3 = /* @__PURE__ */ o$1((R3) => {
      l2 && l2(R3), t4 !== "none" && m4(true);
    }, "handleClick");
    return reactExports.useEffect(() => {
      let R3 = setTimeout(() => {
        d4 && m4(false);
      }, 1e3);
      return () => clearTimeout(R3);
    }, [d4]), /* @__PURE__ */ e.createElement(
      Mv,
      {
        as: f2,
        ref: u2,
        variant: n4,
        size: r4,
        padding: a4,
        disabled: i4,
        active: c2,
        animating: d4,
        animation: t4,
        onClick: v3,
        ...s2
      }
    );
  }
);
Ir.displayName = "Button";
var Mv = xr$1("button", {
  shouldForwardProp: /* @__PURE__ */ o$1((e4) => yr(e4), "shouldForwardProp")
})(({ theme: e4, variant: t4, size: r4, disabled: n4, active: a4, animating: i4, animation: c2 = "none", padding: l2 }) => ({
  border: 0,
  cursor: n4 ? "not-allowed" : "pointer",
  display: "inline-flex",
  gap: "6px",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  padding: l2 === "none" ? 0 : l2 === "small" && r4 === "small" ? "0 7px" : l2 === "small" && r4 === "medium" ? "0 9px" : r4 === "small" ? "0 10px" : r4 === "medium" ? "0 12px" : 0,
  height: r4 === "small" ? "28px" : "32px",
  position: "relative",
  textAlign: "center",
  textDecoration: "none",
  transitionProperty: "background, box-shadow",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease-out",
  verticalAlign: "top",
  whiteSpace: "nowrap",
  userSelect: "none",
  opacity: n4 ? 0.5 : 1,
  margin: 0,
  fontSize: `${e4.typography.size.s1}px`,
  fontWeight: e4.typography.weight.bold,
  lineHeight: "1",
  background: t4 === "solid" ? e4.color.secondary : t4 === "outline" ? e4.button.background : t4 === "ghost" && a4 ? e4.background.hoverable : "transparent",
  ...t4 === "ghost" ? {
    // This is a hack to apply bar styles to the button as soon as it is part of a bar
    // It is a temporary solution until we have implemented Theming 2.0.
    ".sb-bar &": {
      background: a4 ? we$1(0.9, e4.barTextColor) : "transparent",
      color: a4 ? e4.barSelectedColor : e4.barTextColor,
      "&:hover": {
        color: e4.barHoverColor,
        background: we$1(0.86, e4.barHoverColor)
      },
      "&:active": {
        color: e4.barSelectedColor,
        background: we$1(0.9, e4.barSelectedColor)
      },
      "&:focus": {
        boxShadow: `${Dt(e4.barHoverColor, 1)} 0 0 0 1px inset`,
        outline: "none"
      }
    }
  } : {},
  color: t4 === "solid" ? e4.color.lightest : t4 === "outline" ? e4.input.color : t4 === "ghost" && a4 ? e4.color.secondary : t4 === "ghost" ? e4.color.mediumdark : e4.input.color,
  boxShadow: t4 === "outline" ? `${e4.button.border} 0 0 0 1px inset` : "none",
  borderRadius: e4.input.borderRadius,
  // Making sure that the button never shrinks below its minimum size
  flexShrink: 0,
  "&:hover": {
    color: t4 === "ghost" ? e4.color.secondary : void 0,
    background: (() => {
      let s2 = e4.color.secondary;
      return t4 === "solid" && (s2 = e4.color.secondary), t4 === "outline" && (s2 = e4.button.background), t4 === "ghost" ? we$1(0.86, e4.color.secondary) : e4.base === "light" ? wt(0.02, s2) : Zo(0.03, s2);
    })()
  },
  "&:active": {
    color: t4 === "ghost" ? e4.color.secondary : void 0,
    background: (() => {
      let s2 = e4.color.secondary;
      return t4 === "solid" && (s2 = e4.color.secondary), t4 === "outline" && (s2 = e4.button.background), t4 === "ghost" ? e4.background.hoverable : e4.base === "light" ? wt(0.02, s2) : Zo(0.03, s2);
    })()
  },
  "&:focus": {
    boxShadow: `${Dt(e4.color.secondary, 1)} 0 0 0 1px inset`,
    outline: "none"
  },
  "> svg": {
    animation: i4 && c2 !== "none" ? `${e4.animation[c2]} 1000ms ease-out` : ""
  }
}));
var wo = reactExports.forwardRef(
  ({ padding: e$1 = "small", variant: t4 = "ghost", ...r4 }, n4) => /* @__PURE__ */ e.createElement(Ir, { padding: e$1, variant: t4, ref: n4, ...r4 })
);
wo.displayName = "IconButton";
var cf = Ee$1({
  from: { opacity: 0 },
  to: { opacity: 1 }
}), Iv = Ee$1({
  from: { maxHeight: 0 },
  to: {}
}), zv = Ee$1({
  from: {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0.9)"
  },
  to: {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)"
  }
}), f0 = xr$1.div({
  backdropFilter: "blur(24px)",
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 10,
  animation: `${cf} 200ms`
}), d0 = xr$1.div(
  ({ theme: e4, width: t4, height: r4 }) => ({
    backgroundColor: e4.background.bar,
    borderRadius: 6,
    boxShadow: "0px 4px 67px 0px #00000040",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: t4 ?? 740,
    height: r4 ?? "auto",
    maxWidth: "calc(100% - 40px)",
    maxHeight: "85vh",
    overflow: "hidden",
    zIndex: 11,
    animation: `${zv} 200ms`,
    "&:focus-visible": {
      outline: "none"
    }
  })
), sf = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(s0, { asChild: true }, /* @__PURE__ */ e.createElement(wo, { ...e$1 }, /* @__PURE__ */ e.createElement(G5, null))), "CloseButton"), Tv = xr$1.div({
  display: "flex",
  flexDirection: "column",
  margin: 16,
  gap: 16
}), uf = xr$1.div({
  display: "flex",
  justifyContent: "space-between",
  gap: 16
}), ff = xr$1.div({
  display: "flex",
  flexDirection: "column",
  gap: 4
}), Hv = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(uf, null, /* @__PURE__ */ e.createElement(ff, { ...e$1 }), /* @__PURE__ */ e.createElement(sf, null)), "Header"), Pv = xr$1(l0)(({ theme: e4 }) => ({
  margin: 0,
  fontSize: e4.typography.size.s3,
  fontWeight: e4.typography.weight.bold
})), kv = xr$1(c0)(({ theme: e4 }) => ({
  position: "relative",
  zIndex: 1,
  margin: 0,
  fontSize: e4.typography.size.s2
})), Ov = xr$1.div({
  display: "flex",
  flexDirection: "row-reverse",
  gap: 8
}), df = xr$1.div(({ theme: e4 }) => ({
  maxHeight: 100,
  overflow: "auto",
  animation: `${Iv} 300ms, ${cf} 300ms`,
  backgroundColor: e4.background.critical,
  color: e4.color.lightest,
  fontSize: e4.typography.size.s2,
  "& > div": {
    position: "relative",
    padding: "8px 16px"
  }
})), Bv = /* @__PURE__ */ o$1(({
  children: e$1,
  ...t4
}) => /* @__PURE__ */ e.createElement(df, { ...t4 }, /* @__PURE__ */ e.createElement("div", null, e$1)), "Error");
function Nv({
  children: e$1,
  width: t4,
  height: r4,
  onEscapeKeyDown: n4,
  onInteractOutside: a4 = /* @__PURE__ */ o$1((s2) => s2.preventDefault(), "onInteractOutside"),
  className: i4,
  container: c2,
  ...l2
}) {
  return /* @__PURE__ */ e.createElement(n0, { ...l2 }, /* @__PURE__ */ e.createElement(o0, { container: c2 }, /* @__PURE__ */ e.createElement(
    a0,
    { asChild: true },
    /* @__PURE__ */ e.createElement(f0, null)
  ), /* @__PURE__ */ e.createElement(
    i0,
    {
      asChild: true,
      onInteractOutside: a4,
      onEscapeKeyDown: n4
    },
    /* @__PURE__ */ e.createElement(d0, { className: i4, width: t4, height: r4 }, e$1)
  )));
}
o$1(Nv, "BaseModal");
var Dv = Object.assign(Nv, p0, { Dialog: vo });
var $v = /* @__PURE__ */ o$1((e4) => typeof e4 == "number" ? e4 : Number(e4), "toNumber"), Vv = xr$1.div(
  ({ theme: e4, col: t4, row: r4 = 1 }) => t4 ? {
    display: "inline-block",
    verticalAlign: "inherit",
    "& > *": {
      marginLeft: t4 * e4.layoutMargin,
      verticalAlign: "inherit"
    },
    [`& > *:first-child${hf}`]: {
      marginLeft: 0
    }
  } : {
    "& > *": {
      marginTop: r4 * e4.layoutMargin
    },
    [`& > *:first-child${hf}`]: {
      marginTop: 0
    }
  },
  ({ theme: e4, outer: t4, col: r4, row: n4 }) => {
    switch (true) {
      case !!(t4 && r4):
        return {
          marginLeft: t4 * e4.layoutMargin,
          marginRight: t4 * e4.layoutMargin
        };
      case !!(t4 && n4):
        return {
          marginTop: t4 * e4.layoutMargin,
          marginBottom: t4 * e4.layoutMargin
        };
      default:
        return {};
    }
  }
), jv = /* @__PURE__ */ o$1(({ col: e$1, row: t4, outer: r4, children: n4, ...a4 }) => {
  let i4 = $v(typeof r4 == "number" || !r4 ? r4 : e$1 || t4);
  return /* @__PURE__ */ e.createElement(Vv, { col: e$1, row: t4, outer: i4, ...a4 }, n4);
}, "Spaced");
var Uv = xr$1.div(({ theme: e4 }) => ({
  fontWeight: e4.typography.weight.bold
})), qv = xr$1.div(), Gv = xr$1.div(({ theme: e4 }) => ({
  padding: 30,
  textAlign: "center",
  color: e4.color.defaultText,
  fontSize: e4.typography.size.s2 - 1
})), Xv = /* @__PURE__ */ o$1(({ children: e$1, ...t4 }) => {
  let [r4, n4] = reactExports.Children.toArray(e$1);
  return /* @__PURE__ */ e.createElement(Gv, { ...t4 }, /* @__PURE__ */ e.createElement(Uv, null, r4), n4 && /* @__PURE__ */ e.createElement(
    qv,
    null,
    n4
  ));
}, "Placeholder");
Qn();
function Kv(e4, t4) {
  var r4 = reactExports.useRef(null), n4 = reactExports.useRef(null);
  n4.current = t4;
  var a4 = reactExports.useRef(null);
  reactExports.useEffect(function() {
    i4();
  });
  var i4 = reactExports.useCallback(function() {
    var c2 = a4.current, l2 = n4.current, s2 = c2 || (l2 ? l2 instanceof Element ? l2 : l2.current : null);
    r4.current && r4.current.element === s2 && r4.current.subscriber === e4 || (r4.current && r4.current.cleanup && r4.current.cleanup(), r4.current = {
      element: s2,
      subscriber: e4,
      // Only calling the subscriber, if there's an actual element to report.
      // Setting cleanup to undefined unless a subscriber returns one, as an existing cleanup function would've been just called.
      cleanup: s2 ? e4(s2) : void 0
    });
  }, [e4]);
  return reactExports.useEffect(function() {
    return function() {
      r4.current && r4.current.cleanup && (r4.current.cleanup(), r4.current = null);
    };
  }, []), reactExports.useCallback(function(c2) {
    a4.current = c2, i4();
  }, [i4]);
}
o$1(Kv, "useResolvedElement");
function mf(e4, t4, r4) {
  return e4[t4] ? e4[t4][0] ? e4[t4][0][r4] : (
    // TS complains about this, because the RO entry type follows the spec and does not reflect Firefox's current
    // behaviour of returning objects instead of arrays for `borderBoxSize` and `contentBoxSize`.
    // @ts-ignore
    e4[t4][r4]
  ) : t4 === "contentBoxSize" ? e4.contentRect[r4 === "inlineSize" ? "width" : "height"] : void 0;
}
o$1(mf, "extractSize");
function bo(e4) {
  e4 === void 0 && (e4 = {});
  var t4 = e4.onResize, r4 = reactExports.useRef(void 0);
  r4.current = t4;
  var n4 = e4.round || Math.round, a4 = reactExports.useRef(), i4 = reactExports.useState({
    width: void 0,
    height: void 0
  }), c2 = i4[0], l2 = i4[1], s2 = reactExports.useRef(false);
  reactExports.useEffect(function() {
    return s2.current = false, function() {
      s2.current = true;
    };
  }, []);
  var u2 = reactExports.useRef({
    width: void 0,
    height: void 0
  }), f2 = Kv(reactExports.useCallback(function(d4) {
    return (!a4.current || a4.current.box !== e4.box || a4.current.round !== n4) && (a4.current = {
      box: e4.box,
      round: n4,
      instance: new ResizeObserver(function(m4) {
        var v3 = m4[0], R3 = e4.box === "border-box" ? "borderBoxSize" : e4.box === "device-pixel-content-box" ? "devicePixelContentBoxSize" : "contentBoxSize", p4 = mf(v3, R3, "inlineSize"), h4 = mf(v3, R3, "blockSize"), g4 = p4 ? n4(p4) : void 0, w3 = h4 ? n4(h4) : void 0;
        if (u2.current.width !== g4 || u2.current.height !== w3) {
          var b3 = {
            width: g4,
            height: w3
          };
          u2.current.width = g4, u2.current.height = w3, r4.current ? r4.current(b3) : s2.current || l2(b3);
        }
      })
    }), a4.current.instance.observe(d4, {
      box: e4.box
    }), function() {
      a4.current && a4.current.instance.unobserve(d4);
    };
  }, [e4.box, n4]), e4.ref);
  return reactExports.useMemo(function() {
    return {
      ref: f2,
      width: c2.width,
      height: c2.height
    };
  }, [f2, c2.width, c2.height]);
}
o$1(bo, "useResizeObserver");
var n7 = xr$1.div(
  ({ centered: e4 = false, scale: t4 = 1, elementHeight: r4 }) => ({
    height: r4 || "auto",
    transformOrigin: e4 ? "center top" : "left top",
    transform: `scale(${1 / t4})`
  })
);
function gf({ centered: e$1, scale: t4, children: r4 }) {
  let n4 = reactExports.useRef(null), [a4, i4] = reactExports.useState(0), c2 = reactExports.useCallback(
    ({ height: l2 }) => {
      l2 && i4(l2 / t4);
    },
    [t4]
  );
  return reactExports.useEffect(() => {
    n4.current && i4(n4.current.getBoundingClientRect().height);
  }, [t4]), bo({
    ref: n4,
    onResize: c2
  }), /* @__PURE__ */ e.createElement(n7, { centered: e$1, scale: t4, elementHeight: a4 }, /* @__PURE__ */ e.createElement("div", { ref: n4, className: "innerZoomElementWrapper" }, r4));
}
o$1(gf, "ZoomElement");
var w0 = class w02 extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.iframe = null;
  }
  componentDidMount() {
    let { iFrameRef: r4 } = this.props;
    this.iframe = r4.current;
  }
  shouldComponentUpdate(r4) {
    let { scale: n4, active: a4 } = this.props;
    return n4 !== r4.scale && this.setIframeInnerZoom(r4.scale), a4 !== r4.active && this.iframe.setAttribute("data-is-storybook", r4.active ? "true" : "false"), r4.children.props.src !== this.props.children.props.src;
  }
  setIframeInnerZoom(r4) {
    try {
      Object.assign(this.iframe.contentDocument.body.style, {
        width: `${r4 * 100}%`,
        height: `${r4 * 100}%`,
        transform: `scale(${1 / r4})`,
        transformOrigin: "top left"
      });
    } catch {
      this.setIframeZoom(r4);
    }
  }
  setIframeZoom(r4) {
    Object.assign(this.iframe.style, {
      width: `${r4 * 100}%`,
      height: `${r4 * 100}%`,
      transform: `scale(${1 / r4})`,
      transformOrigin: "top left"
    });
  }
  render() {
    let { children: r4 } = this.props;
    return /* @__PURE__ */ e.createElement(e.Fragment, null, r4);
  }
};
o$1(w0, "ZoomIFrame");
var Ro = w0;
var a7 = {
  Element: gf,
  IFrame: Ro
};
const { global: i7 } = __STORYBOOK_MODULE_GLOBAL__;
var { document: l7 } = i7, c7 = xr$1.strong(({ theme: e4 }) => ({
  color: e4.color.orange
})), s7 = xr$1.strong(({ theme: e4 }) => ({
  color: e4.color.ancillary,
  textDecoration: "underline"
})), wf = xr$1.em(({ theme: e4 }) => ({
  color: e4.textMutedColor
})), u7 = /(Error): (.*)\n/, f7 = /at (?:(.*) )?\(?(.+)\)?/, d7 = /([^@]+)?(?:\/<)?@(.+)?/, p7 = /([^@]+)?@(.+)?/, m7 = /* @__PURE__ */ o$1(({
  error: e$1
}) => {
  if (!e$1)
    return /* @__PURE__ */ e.createElement(reactExports.Fragment, null, "This error has no stack or message");
  if (!e$1.stack)
    return /* @__PURE__ */ e.createElement(reactExports.Fragment, null, e$1.message || "This error has no stack or message");
  let t4 = e$1.stack.toString();
  t4 && e$1.message && !t4.includes(e$1.message) && (t4 = `Error: ${e$1.message}

${t4}`);
  let r4 = t4.match(u7);
  if (!r4)
    return /* @__PURE__ */ e.createElement(reactExports.Fragment, null, t4);
  let [, n4, a4] = r4, i4 = t4.split(/\n/).slice(1), [, ...c2] = i4.map((l2) => {
    let s2 = l2.match(f7) || l2.match(d7) || l2.match(p7);
    return s2 ? {
      name: (s2[1] || "").replace("/<", ""),
      location: s2[2].replace(l7.location.origin, "")
    } : null;
  }).filter(Boolean);
  return /* @__PURE__ */ e.createElement(reactExports.Fragment, null, /* @__PURE__ */ e.createElement("span", null, n4), ": ", /* @__PURE__ */ e.createElement(
    c7,
    null,
    a4
  ), /* @__PURE__ */ e.createElement("br", null), c2.map(
    (l2, s2) => l2?.name ? /* @__PURE__ */ e.createElement(reactExports.Fragment, { key: s2 }, "  ", "at ", /* @__PURE__ */ e.createElement(s7, null, l2.name), " (", /* @__PURE__ */ e.createElement(wf, null, l2.location), ")", /* @__PURE__ */ e.createElement("br", null)) : /* @__PURE__ */ e.createElement(
      reactExports.Fragment,
      { key: s2 },
      "  ",
      "at ",
      /* @__PURE__ */ e.createElement(wf, null, l2?.location),
      /* @__PURE__ */ e.createElement("br", null)
    )
  ));
}, "ErrorFormatter");
var v7 = xr$1.input({
  appearance: "none",
  display: "grid",
  placeContent: "center",
  width: 14,
  height: 14,
  margin: 0,
  border: `1px solid ${h$1.border}`,
  borderRadius: 2,
  backgroundColor: "white",
  transition: "background-color 0.1s",
  "&:enabled": {
    cursor: "pointer"
  },
  "&:disabled": {
    backgroundColor: h$1.medium
  },
  "&:disabled:checked, &:disabled:indeterminate": {
    backgroundColor: h$1.mediumdark
  },
  "&:checked, &:indeterminate": {
    backgroundColor: h$1.secondary
  },
  "&:checked::before": {
    content: '""',
    width: 14,
    height: 14,
    background: `no-repeat center url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2' d='m3 7 2.5 2.5L11 4'/%3E%3C/svg%3E")`
  },
  "&:indeterminate::before": {
    content: '""',
    width: 8,
    height: 2,
    background: "white"
  },
  "&:enabled:focus": {
    outline: `1px solid ${h$1.secondary}`,
    outlineOffset: 1
  }
}), w7 = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(v7, { ...e$1, type: "checkbox" }), "Checkbox");
var b7 = xr$1.label(({ theme: e4 }) => ({
  display: "flex",
  borderBottom: `1px solid ${e4.appBorderColor}`,
  margin: "0 15px",
  padding: "8px 0",
  "&:last-child": {
    marginBottom: "3rem"
  }
})), R7 = xr$1.span(({ theme: e4 }) => ({
  minWidth: 100,
  fontWeight: e4.typography.weight.bold,
  marginRight: 15,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  lineHeight: "16px"
})), Rf = /* @__PURE__ */ o$1(({ label: e$1, children: t4, ...r4 }) => /* @__PURE__ */ e.createElement(b7, { ...r4 }, e$1 ? /* @__PURE__ */ e.createElement(
  R7,
  null,
  /* @__PURE__ */ e.createElement("span", null, e$1)
) : null, t4), "Field");
Yr();
Pn();
var yf = reactExports.useLayoutEffect;
var xf = /* @__PURE__ */ o$1(function(t4) {
  var r4 = e.useRef(t4);
  return yf(function() {
    r4.current = t4;
  }), r4;
}, "useLatest");
var Sf = /* @__PURE__ */ o$1(function(t4, r4) {
  if (typeof t4 == "function") {
    t4(r4);
    return;
  }
  t4.current = r4;
}, "updateRef"), Cf = /* @__PURE__ */ o$1(function(t4, r4) {
  var n4 = e.useRef();
  return e.useCallback(function(a4) {
    t4.current = a4, n4.current && Sf(n4.current, null), n4.current = r4, r4 && Sf(r4, a4);
  }, [r4]);
}, "useComposedRef");
var Mf = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0",
  display: "block"
}, E7 = /* @__PURE__ */ o$1(function(t4) {
  Object.keys(Mf).forEach(function(r4) {
    t4.style.setProperty(r4, Mf[r4], "important");
  });
}, "forceHiddenStyles"), Lf = E7, ye$1 = null, Af = /* @__PURE__ */ o$1(function(t4, r4) {
  var n4 = t4.scrollHeight;
  return r4.sizingStyle.boxSizing === "border-box" ? n4 + r4.borderSize : n4 - r4.paddingSize;
}, "getHeight");
function S7(e4, t4, r4, n4) {
  r4 === void 0 && (r4 = 1), n4 === void 0 && (n4 = 1 / 0), ye$1 || (ye$1 = document.createElement("textarea"), ye$1.setAttribute("tabindex", "-1"), ye$1.setAttribute("aria-hidden", "true"), Lf(ye$1)), ye$1.parentNode === null && document.body.appendChild(ye$1);
  var a4 = e4.paddingSize, i4 = e4.borderSize, c2 = e4.sizingStyle, l2 = c2.boxSizing;
  Object.keys(c2).forEach(function(m4) {
    var v3 = m4;
    ye$1.style[v3] = c2[v3];
  }), Lf(ye$1), ye$1.value = t4;
  var s2 = Af(ye$1, e4);
  ye$1.value = t4, s2 = Af(ye$1, e4), ye$1.value = "x";
  var u2 = ye$1.scrollHeight - a4, f2 = u2 * r4;
  l2 === "border-box" && (f2 = f2 + a4 + i4), s2 = Math.max(f2, s2);
  var d4 = u2 * n4;
  return l2 === "border-box" && (d4 = d4 + a4 + i4), s2 = Math.min(d4, s2), [s2, u2];
}
o$1(S7, "calculateNodeHeight");
var If = /* @__PURE__ */ o$1(function() {
}, "noop"), C7 = /* @__PURE__ */ o$1(function(t4, r4) {
  return t4.reduce(function(n4, a4) {
    return n4[a4] = r4[a4], n4;
  }, {});
}, "pick"), M7 = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak",
  "wordSpacing",
  "scrollbarGutter"
], L7 = !!document.documentElement.currentStyle, A7 = /* @__PURE__ */ o$1(function(t4) {
  var r4 = window.getComputedStyle(t4);
  if (r4 === null)
    return null;
  var n4 = C7(M7, r4), a4 = n4.boxSizing;
  if (a4 === "")
    return null;
  L7 && a4 === "border-box" && (n4.width = parseFloat(n4.width) + parseFloat(n4.borderRightWidth) + parseFloat(n4.borderLeftWidth) + parseFloat(n4.paddingRight) + parseFloat(n4.paddingLeft) + "px");
  var i4 = parseFloat(n4.paddingBottom) + parseFloat(n4.paddingTop), c2 = parseFloat(n4.borderBottomWidth) + parseFloat(n4.borderTopWidth);
  return {
    sizingStyle: n4,
    paddingSize: i4,
    borderSize: c2
  };
}, "getSizingData"), I7 = A7;
function y0(e4, t4, r4) {
  var n4 = xf(r4);
  reactExports.useLayoutEffect(function() {
    var a4 = /* @__PURE__ */ o$1(function(c2) {
      return n4.current(c2);
    }, "handler");
    if (e4)
      return e4.addEventListener(t4, a4), function() {
        return e4.removeEventListener(t4, a4);
      };
  }, []);
}
o$1(y0, "useListener");
var z7 = /* @__PURE__ */ o$1(function(t4, r4) {
  y0(document.body, "reset", function(n4) {
    t4.current.form === n4.target && r4(n4);
  });
}, "useFormResetListener"), T7 = /* @__PURE__ */ o$1(function(t4) {
  y0(window, "resize", t4);
}, "useWindowResizeListener"), H7 = /* @__PURE__ */ o$1(function(t4) {
  y0(document.fonts, "loadingdone", t4);
}, "useFontsLoadedListener"), P7 = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], k7 = /* @__PURE__ */ o$1(function(t4, r4) {
  var n4 = t4.cacheMeasurements, a4 = t4.maxRows, i4 = t4.minRows, c2 = t4.onChange, l2 = c2 === void 0 ? If : c2, s2 = t4.onHeightChange, u2 = s2 === void 0 ? If : s2, f2 = ur(t4, P7), d4 = f2.value !== void 0, m4 = reactExports.useRef(null), v3 = Cf(m4, r4), R3 = reactExports.useRef(0), p4 = reactExports.useRef(), h4 = /* @__PURE__ */ o$1(
    function() {
      var b3 = m4.current, x4 = n4 && p4.current ? p4.current : I7(b3);
      if (x4) {
        p4.current = x4;
        var E4 = S7(x4, b3.value || b3.placeholder || "x", i4, a4), y4 = E4[0], S4 = E4[1];
        R3.current !== y4 && (R3.current = y4, b3.style.setProperty("height", y4 + "px", "important"), u2(y4, {
          rowHeight: S4
        }));
      }
    },
    "resizeTextarea"
  ), g4 = /* @__PURE__ */ o$1(function(b3) {
    d4 || h4(), l2(b3);
  }, "handleChange");
  return reactExports.useLayoutEffect(h4), z7(m4, function() {
    if (!d4) {
      var w3 = m4.current.value;
      requestAnimationFrame(function() {
        var b3 = m4.current;
        b3 && w3 !== b3.value && h4();
      });
    }
  }), T7(h4), H7(h4), /* @__PURE__ */ reactExports.createElement("textarea", W$1({}, f2, {
    onChange: g4,
    ref: v3
  }));
}, "TextareaAutosize"), zf = /* @__PURE__ */ reactExports.forwardRef(k7);
var O7 = {
  // resets
  appearance: "none",
  border: "0 none",
  boxSizing: "inherit",
  display: " block",
  margin: " 0",
  background: "transparent",
  padding: 0,
  fontSize: "inherit",
  position: "relative"
}, C0 = /* @__PURE__ */ o$1(({ theme: e4 }) => ({
  ...O7,
  transition: "box-shadow 200ms ease-out, opacity 200ms ease-out",
  color: e4.input.color || "inherit",
  background: e4.input.background,
  boxShadow: `${e4.input.border} 0 0 0 1px inset`,
  borderRadius: e4.input.borderRadius,
  fontSize: e4.typography.size.s2 - 1,
  lineHeight: "20px",
  padding: "6px 10px",
  // 32
  boxSizing: "border-box",
  height: 32,
  '&[type="file"]': {
    height: "auto"
  },
  "&:focus": {
    boxShadow: `${e4.color.secondary} 0 0 0 1px inset`,
    outline: "none"
  },
  "&[disabled]": {
    cursor: "not-allowed",
    opacity: 0.5
  },
  "&:-webkit-autofill": { WebkitBoxShadow: `0 0 0 3em ${e4.color.lightest} inset` },
  "&::placeholder": {
    color: e4.textMutedColor,
    opacity: 1
  }
}), "styles"), M0 = /* @__PURE__ */ o$1(({ size: e4 }) => {
  switch (e4) {
    case "100%":
      return { width: "100%" };
    case "flex":
      return { flex: 1 };
    case "auto":
    default:
      return { display: "inline" };
  }
}, "sizes"), Tf = /* @__PURE__ */ o$1(({
  align: e4
}) => {
  switch (e4) {
    case "end":
      return { textAlign: "right" };
    case "center":
      return { textAlign: "center" };
    case "start":
    default:
      return { textAlign: "left" };
  }
}, "alignment"), L0 = /* @__PURE__ */ o$1(({ valid: e4, theme: t4 }) => {
  switch (e4) {
    case "valid":
      return { boxShadow: `${t4.color.positive} 0 0 0 1px inset !important` };
    case "error":
      return { boxShadow: `${t4.color.negative} 0 0 0 1px inset !important` };
    case "warn":
      return {
        boxShadow: `${t4.color.warning} 0 0 0 1px inset`
      };
    case void 0:
    case null:
    default:
      return {};
  }
}, "validation"), Hf = Object.assign(
  xr$1(
    reactExports.forwardRef(/* @__PURE__ */ o$1(function({ size: t4, valid: r4, align: n4, ...a4 }, i4) {
      return /* @__PURE__ */ e.createElement("input", { ...a4, ref: i4 });
    }, "Input"))
  )(C0, M0, Tf, L0, {
    minHeight: 32
  }),
  {
    displayName: "Input"
  }
), Pf = Object.assign(
  xr$1(
    reactExports.forwardRef(/* @__PURE__ */ o$1(function({ size: t4, valid: r4, align: n4, ...a4 }, i4) {
      return /* @__PURE__ */ e.createElement("select", { ...a4, ref: i4 });
    }, "Select"))
  )(C0, M0, L0, {
    height: 32,
    userSelect: "none",
    paddingRight: 20,
    appearance: "menulist"
  }),
  {
    displayName: "Select"
  }
), kf = Object.assign(
  xr$1(
    reactExports.forwardRef(/* @__PURE__ */ o$1(function({ size: t4, valid: r4, align: n4, ...a4 }, i4) {
      return /* @__PURE__ */ e.createElement(zf, { ...a4, ref: i4 });
    }, "Textarea"))
  )(C0, M0, Tf, L0, ({ height: e4 = 400 }) => ({
    overflow: "visible",
    maxHeight: e4
  })),
  {
    displayName: "Textarea"
  }
);
var N7 = Object.assign(
  xr$1.form({
    boxSizing: "border-box",
    width: "100%"
  }),
  {
    Field: Rf,
    Input: Hf,
    Select: Pf,
    Textarea: kf,
    Button: Ir
  }
);
var k3 = reactExports.lazy(
  () => Promise.resolve().then(() => (Oo(), al)).then((e4) => ({ default: e4.WithTooltip }))
), O3 = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(reactExports.Suspense, { fallback: /* @__PURE__ */ e.createElement("div", null) }, /* @__PURE__ */ e.createElement(k3, { ...e$1 })), "WithTooltip"), B3 = reactExports.lazy(
  () => Promise.resolve().then(() => (Oo(), al)).then((e4) => ({ default: e4.WithTooltipPure }))
), N3 = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement(reactExports.Suspense, { fallback: /* @__PURE__ */ e.createElement("div", null) }, /* @__PURE__ */ e.createElement(B3, { ...e$1 })), "WithTooltipPure");
var D3 = xr$1.div(({ theme: e4 }) => ({
  fontWeight: e4.typography.weight.bold
})), F3 = xr$1.span(), _3 = xr$1.div(({ theme: e4 }) => ({
  marginTop: 8,
  textAlign: "center",
  "> *": {
    margin: "0 8px",
    fontWeight: e4.typography.weight.bold
  }
})), $3 = xr$1.div(({ theme: e4 }) => ({
  color: e4.color.defaultText,
  lineHeight: "18px"
})), V3 = xr$1.div({
  padding: 15,
  width: 280,
  boxSizing: "border-box"
}), j3 = /* @__PURE__ */ o$1(({ title: e$1, desc: t4, links: r4 }) => /* @__PURE__ */ e.createElement(V3, null, /* @__PURE__ */ e.createElement(
  $3,
  null,
  e$1 && /* @__PURE__ */ e.createElement(D3, null, e$1),
  t4 && /* @__PURE__ */ e.createElement(F3, null, t4)
), r4 && /* @__PURE__ */ e.createElement(
  _3,
  null,
  r4.map(({ title: n4, ...a4 }) => /* @__PURE__ */ e.createElement(yi, { ...a4, key: n4 }, n4))
)), "TooltipMessage");
var q3 = xr$1.div(({ theme: e4 }) => ({
  padding: "2px 6px",
  lineHeight: "16px",
  fontSize: 10,
  fontWeight: e4.typography.weight.bold,
  color: e4.color.lightest,
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)",
  borderRadius: 4,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: -1,
  background: e4.base === "light" ? "rgba(60, 60, 60, 0.9)" : "rgba(0, 0, 0, 0.95)",
  margin: 6
})), G3 = /* @__PURE__ */ o$1(({ note: e$1, ...t4 }) => /* @__PURE__ */ e.createElement(q3, { ...t4 }, e$1), "TooltipNote");
var Yd = me$1(Kr(), 1);
var X3 = xr$1(({ active: e$1, loading: t4, disabled: r4, ...n4 }) => /* @__PURE__ */ e.createElement("span", { ...n4 }))(
  ({ theme: e4 }) => ({
    color: e4.color.defaultText,
    // Previously was theme.typography.weight.normal but this weight does not exists in Theme
    fontWeight: e4.typography.weight.regular
  }),
  ({ active: e4, theme: t4 }) => e4 ? {
    color: t4.color.secondary,
    fontWeight: t4.typography.weight.bold
  } : {},
  ({ loading: e4, theme: t4 }) => e4 ? {
    display: "inline-block",
    flex: "none",
    ...t4.animation.inlineGlow
  } : {},
  ({ disabled: e4, theme: t4 }) => e4 ? {
    color: t4.textMutedColor
  } : {}
), Y3 = xr$1.span({
  display: "flex",
  "& svg": {
    height: 12,
    width: 12,
    margin: "3px 0",
    verticalAlign: "top"
  },
  "& path": {
    fill: "inherit"
  }
}), Z3 = xr$1.span(
  {
    flex: 1,
    textAlign: "left",
    display: "flex",
    flexDirection: "column"
  },
  ({ isIndented: e4 }) => e4 ? { marginLeft: 24 } : {}
), K3 = xr$1.span(
  ({ theme: e4 }) => ({
    fontSize: "11px",
    lineHeight: "14px"
  }),
  ({ active: e4, theme: t4 }) => e4 ? {
    color: t4.color.secondary
  } : {},
  ({ theme: e4, disabled: t4 }) => t4 ? {
    color: e4.textMutedColor
  } : {}
), J3 = xr$1.span(
  ({ active: e4, theme: t4 }) => e4 ? {
    color: t4.color.secondary
  } : {},
  () => ({
    display: "flex",
    maxWidth: 14
  })
), Q3 = xr$1.div(
  ({ theme: e4 }) => ({
    width: "100%",
    border: "none",
    borderRadius: e4.appBorderRadius,
    background: "none",
    fontSize: e4.typography.size.s1,
    transition: "all 150ms ease-out",
    color: e4.color.dark,
    textDecoration: "none",
    justifyContent: "space-between",
    lineHeight: "18px",
    padding: "7px 10px",
    display: "flex",
    alignItems: "center",
    "& > * + *": {
      paddingLeft: 10
    }
  }),
  ({ theme: e4, href: t4, onClick: r4 }) => (t4 || r4) && {
    cursor: "pointer",
    "&:hover": {
      background: e4.background.hoverable
    },
    "&:hover svg": {
      opacity: 1
    }
  },
  ({ theme: e4, as: t4 }) => t4 === "label" && {
    "&:has(input:not(:disabled))": {
      cursor: "pointer",
      "&:hover": {
        background: e4.background.hoverable
      }
    }
  },
  ({ disabled: e4 }) => e4 && { cursor: "not-allowed" }
), e6 = (0, Yd.default)(100)(({ onClick: e4, input: t4, href: r4, LinkWrapper: n4 }) => ({
  ...e4 && {
    as: "button",
    onClick: e4
  },
  ...t4 && {
    as: "label"
  },
  ...r4 && {
    as: "a",
    href: r4,
    ...n4 && {
      as: n4,
      to: r4
    }
  }
})), t6 = /* @__PURE__ */ o$1((e$1) => {
  let {
    loading: t4 = false,
    title: r4 = /* @__PURE__ */ e.createElement("span", null, "Loading state"),
    center: n4 = null,
    right: a4 = null,
    active: i4 = false,
    disabled: c2 = false,
    isIndented: l2 = false,
    href: s2 = void 0,
    onClick: u2 = void 0,
    icon: f2,
    input: d4,
    LinkWrapper: m4 = void 0,
    ...v3
  } = e$1, R3 = { active: i4, disabled: c2 }, p4 = e6(e$1), h4 = f2 || d4;
  return /* @__PURE__ */ e.createElement(Q3, { ...v3, ...R3, ...p4 }, /* @__PURE__ */ e.createElement(e.Fragment, null, h4 && /* @__PURE__ */ e.createElement(J3, { ...R3 }, h4), r4 || n4 ? /* @__PURE__ */ e.createElement(Z3, { isIndented: l2 && !h4 }, r4 && /* @__PURE__ */ e.createElement(
    X3,
    { ...R3, loading: t4 },
    r4
  ), n4 && /* @__PURE__ */ e.createElement(K3, { ...R3 }, n4)) : null, a4 && /* @__PURE__ */ e.createElement(
    Y3,
    { ...R3 },
    a4
  )));
}, "ListItem"), il = t6;
var o6 = xr$1.div(
  {
    minWidth: 180,
    overflow: "hidden",
    overflowY: "auto",
    maxHeight: 15.5 * 32 + 8
    // 15.5 items at 32px each + 8px padding
  },
  ({ theme: e4 }) => ({
    borderRadius: e4.appBorderRadius + 2
  }),
  ({ theme: e4 }) => e4.base === "dark" ? { background: e4.background.content } : {}
), a6 = xr$1.div(({ theme: e4 }) => ({
  padding: 4,
  "& + &": {
    borderTop: `1px solid ${e4.appBorderColor}`
  }
})), i6 = /* @__PURE__ */ o$1(({ id: e$1, onClick: t4, ...r4 }) => {
  let { active: n4, disabled: a4, title: i4, href: c2 } = r4, l2 = reactExports.useCallback(
    (s2) => t4?.(s2, { id: e$1, active: n4, disabled: a4, title: i4, href: c2 }),
    [t4, e$1, n4, a4, i4, c2]
  );
  return /* @__PURE__ */ e.createElement(il, { id: `list-item-${e$1}`, ...r4, ...t4 && { onClick: l2 } });
}, "Item"), ll = /* @__PURE__ */ o$1(({ links: e$1, LinkWrapper: t4, ...r4 }) => {
  let n4 = Array.isArray(e$1[0]) ? e$1 : [e$1], a4 = n4.some(
    (i4) => i4.some((c2) => "icon" in c2 && c2.icon || "input" in c2 && c2.input)
  );
  return /* @__PURE__ */ e.createElement(o6, { ...r4 }, n4.filter((i4) => i4.length).map((i4, c2) => /* @__PURE__ */ e.createElement(a6, { key: i4.map((l2) => l2.id).join(`~${c2}~`) }, i4.map((l2) => "content" in l2 ? /* @__PURE__ */ e.createElement(reactExports.Fragment, { key: l2.id }, l2.content) : /* @__PURE__ */ e.createElement(i6, { key: l2.id, isIndented: a4, LinkWrapper: t4, ...l2 })))));
}, "TooltipLinkList");
Qn();
var cl = xr$1.div(
  {
    display: "flex",
    whiteSpace: "nowrap",
    flexBasis: "auto",
    marginLeft: 3,
    marginRight: 10
  },
  ({ scrollable: e4 }) => e4 ? { flexShrink: 0 } : {},
  ({ left: e4 }) => e4 ? {
    "& > *": {
      marginLeft: 4
    }
  } : {},
  ({ right: e4 }) => e4 ? {
    gap: 6
  } : {}
);
cl.displayName = "Side";
var c6 = /* @__PURE__ */ o$1(({ children: e$1, className: t4, scrollable: r4 }) => r4 ? /* @__PURE__ */ e.createElement(
  Rr,
  { vertical: false, className: t4 },
  e$1
) : /* @__PURE__ */ e.createElement("div", { className: t4 }, e$1), "UnstyledBar"), ul = xr$1(c6)(
  ({ theme: e4, scrollable: t4 = true }) => ({
    color: e4.barTextColor,
    width: "100%",
    height: 40,
    flexShrink: 0,
    overflow: t4 ? "auto" : "hidden",
    overflowY: "hidden"
  }),
  ({ theme: e4, border: t4 = false }) => t4 ? {
    boxShadow: `${e4.appBorderColor}  0 -1px 0 0 inset`,
    background: e4.barBg
  } : {}
);
ul.displayName = "Bar";
var s6 = xr$1.div(({ bgColor: e4 }) => ({
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  flexWrap: "nowrap",
  flexShrink: 0,
  height: 40,
  backgroundColor: e4 || ""
})), Bo = /* @__PURE__ */ o$1(({ children: e$1, backgroundColor: t4, className: r4, ...n4 }) => {
  let [a4, i4] = reactExports.Children.toArray(e$1);
  return /* @__PURE__ */ e.createElement(ul, { className: `sb-bar ${r4}`, ...n4 }, /* @__PURE__ */ e.createElement(s6, { bgColor: t4 }, /* @__PURE__ */ e.createElement(cl, { scrollable: n4.scrollable, left: true }, a4), i4 ? /* @__PURE__ */ e.createElement(cl, { right: true }, i4) : null));
}, "FlexBar");
Bo.displayName = "FlexBar";
var p6 = /* @__PURE__ */ o$1((e4) => typeof e4.props.href == "string", "isLink"), m6 = /* @__PURE__ */ o$1(
  (e4) => typeof e4.props.href != "string",
  "isButton"
);
function h6({ children: e$1, ...t4 }, r4) {
  let n4 = { props: t4, ref: r4 };
  if (p6(n4))
    return /* @__PURE__ */ e.createElement("a", { ref: n4.ref, ...n4.props }, e$1);
  if (m6(n4))
    return /* @__PURE__ */ e.createElement("button", { ref: n4.ref, type: "button", ...n4.props }, e$1);
  throw new Error("invalid props");
}
o$1(h6, "ForwardRefFunction");
var Jd = reactExports.forwardRef(h6);
Jd.displayName = "ButtonOrLink";
var ar = xr$1(Jd, { shouldForwardProp: yr })(
  {
    whiteSpace: "normal",
    display: "inline-flex",
    overflow: "hidden",
    verticalAlign: "top",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textDecoration: "none",
    "&:empty": {
      display: "none"
    },
    "&[hidden]": {
      display: "none"
    }
  },
  ({ theme: e4 }) => ({
    padding: "0 15px",
    transition: "color 0.2s linear, border-bottom-color 0.2s linear",
    height: 40,
    lineHeight: "12px",
    cursor: "pointer",
    background: "transparent",
    border: "0 solid transparent",
    borderTop: "3px solid transparent",
    borderBottom: "3px solid transparent",
    fontWeight: "bold",
    fontSize: 13,
    "&:focus": {
      outline: "0 none",
      borderBottomColor: e4.barSelectedColor
    }
  }),
  ({ active: e4, textColor: t4, theme: r4 }) => e4 ? {
    color: t4 || r4.barSelectedColor,
    borderBottomColor: r4.barSelectedColor
  } : {
    color: t4 || r4.barTextColor,
    borderBottomColor: "transparent",
    "&:hover": {
      color: r4.barHoverColor
    }
  }
);
ar.displayName = "TabButton";
var g6 = xr$1.div(({ theme: e4 }) => ({
  height: "100%",
  display: "flex",
  padding: 30,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 15,
  background: e4.background.content
})), v6 = xr$1.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  maxWidth: 415
}), w6 = xr$1.div(({ theme: e4 }) => ({
  fontWeight: e4.typography.weight.bold,
  fontSize: e4.typography.size.s2 - 1,
  textAlign: "center",
  color: e4.textColor
})), b6 = xr$1.div(({ theme: e4 }) => ({
  fontWeight: e4.typography.weight.regular,
  fontSize: e4.typography.size.s2 - 1,
  textAlign: "center",
  color: e4.textMutedColor
})), Fo = /* @__PURE__ */ o$1(({ title: e$1, description: t4, footer: r4 }) => /* @__PURE__ */ e.createElement(g6, null, /* @__PURE__ */ e.createElement(
  v6,
  null,
  /* @__PURE__ */ e.createElement(w6, null, e$1),
  t4 && /* @__PURE__ */ e.createElement(b6, null, t4)
), r4), "EmptyTabContent");
var fl = xr$1.div(
  ({ active: e4 }) => e4 ? { display: "block" } : { display: "none" }
), Qd = /* @__PURE__ */ o$1((e$1) => reactExports.Children.toArray(e$1).map(
  // @ts-expect-error (non strict)
  ({
    props: { title: t4, id: r4, color: n4, children: a4 }
  }) => {
    let i4 = Array.isArray(
      a4
    ) ? a4[0] : a4;
    return {
      title: t4,
      id: r4,
      ...n4 ? { color: n4 } : {},
      render: typeof i4 == "function" ? i4 : ({ active: l2 }) => /* @__PURE__ */ e.createElement(fl, { active: l2, role: "tabpanel" }, i4)
    };
  }
), "childrenToList");
Oo();
var C6 = xr$1.span(({ theme: e4, isActive: t4 }) => ({
  display: "inline-block",
  width: 0,
  height: 0,
  marginLeft: 8,
  color: t4 ? e4.color.secondary : e4.color.mediumdark,
  borderRight: "3px solid transparent",
  borderLeft: "3px solid transparent",
  borderTop: "3px solid",
  transition: "transform .1s ease-out"
})), M6 = xr$1(ar)(({ active: e4, theme: t4, preActive: r4 }) => `
    color: ${r4 || e4 ? t4.barSelectedColor : t4.barTextColor};
    .addon-collapsible-icon {
      color: ${r4 || e4 ? t4.barSelectedColor : t4.barTextColor};
    }
    &:hover {
      color: ${t4.barHoverColor};
      .addon-collapsible-icon {
        color: ${t4.barHoverColor};
      }
    }
  `);
function rp(e$1) {
  let t4 = reactExports.useRef(), r4 = reactExports.useRef(), n4 = reactExports.useRef(/* @__PURE__ */ new Map()), { width: a4 = 1 } = bo({
    // @ts-expect-error (non strict)
    ref: t4
  }), [i4, c2] = reactExports.useState(e$1), [l2, s2] = reactExports.useState([]), u2 = reactExports.useRef(e$1), f2 = reactExports.useCallback(
    ({
      menuName: m4,
      actions: v3
    }) => {
      let R3 = l2.some(({ active: g4 }) => g4), [p4, h4] = reactExports.useState(false);
      return /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(
        ol,
        {
          interactive: true,
          visible: p4,
          onVisibleChange: h4,
          placement: "bottom",
          delayHide: 100,
          tooltip: /* @__PURE__ */ e.createElement(
            ll,
            {
              links: l2.map(({ title: g4, id: w3, color: b3, active: x4 }) => ({
                id: w3,
                title: g4,
                color: b3,
                active: x4,
                onClick: /* @__PURE__ */ o$1((E4) => {
                  E4.preventDefault(), v3.onSelect(w3);
                }, "onClick")
              }))
            }
          )
        },
        /* @__PURE__ */ e.createElement(
          M6,
          {
            id: "addons-menu-button",
            ref: r4,
            active: R3,
            preActive: p4,
            style: { visibility: l2.length ? "visible" : "hidden" },
            "aria-hidden": !l2.length,
            className: "tabbutton",
            type: "button",
            role: "tab"
          },
          m4,
          /* @__PURE__ */ e.createElement(
            C6,
            {
              className: "addon-collapsible-icon",
              isActive: R3 || p4
            }
          )
        )
      ), l2.map(({ title: g4, id: w3, color: b3 }, x4) => {
        let E4 = `index-${x4}`;
        return /* @__PURE__ */ e.createElement(
          ar,
          {
            id: `tabbutton-${I$2(w3) ?? E4}`,
            style: { visibility: "hidden" },
            "aria-hidden": true,
            tabIndex: -1,
            ref: (y4) => {
              n4.current.set(w3, y4);
            },
            className: "tabbutton",
            type: "button",
            key: w3,
            textColor: b3,
            role: "tab"
          },
          g4
        );
      }));
    },
    [l2]
  ), d4 = reactExports.useCallback(() => {
    if (!t4.current || !r4.current)
      return;
    let { x: m4, width: v3 } = t4.current.getBoundingClientRect(), { width: R3 } = r4.current.getBoundingClientRect(), p4 = l2.length ? m4 + v3 - R3 : m4 + v3, h4 = [], g4 = 0, w3 = e$1.filter((b3) => {
      let { id: x4 } = b3, E4 = n4.current.get(x4), { width: y4 = 0 } = E4?.getBoundingClientRect() || {}, S4 = m4 + g4 + y4 > p4;
      return (!S4 || !E4) && h4.push(b3), g4 += y4, S4;
    });
    (h4.length !== i4.length || u2.current !== e$1) && (c2(h4), s2(w3), u2.current = e$1);
  }, [l2.length, e$1, i4]);
  return reactExports.useLayoutEffect(d4, [d4, a4]), {
    tabRefs: n4,
    addonsRef: r4,
    tabBarRef: t4,
    visibleList: i4,
    invisibleList: l2,
    AddonTab: f2
  };
}
o$1(rp, "useList");
var z6 = "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */", T6 = xr$1.div(
  ({ theme: e4, bordered: t4 }) => t4 ? {
    backgroundClip: "padding-box",
    border: `1px solid ${e4.appBorderColor}`,
    borderRadius: e4.appBorderRadius,
    overflow: "hidden",
    boxSizing: "border-box"
  } : {},
  ({ absolute: e4 }) => e4 ? {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column"
  } : {
    display: "block"
  }
), gl = xr$1.div({
  overflow: "hidden",
  "&:first-of-type": {
    marginLeft: -3
  },
  whiteSpace: "nowrap",
  flexGrow: 1
});
gl.displayName = "TabBar";
var H6 = xr$1.div(
  {
    display: "block",
    position: "relative"
  },
  ({ theme: e4 }) => ({
    fontSize: e4.typography.size.s2 - 1,
    background: e4.background.content
  }),
  ({ bordered: e4, theme: t4 }) => e4 ? {
    borderRadius: `0 0 ${t4.appBorderRadius - 1}px ${t4.appBorderRadius - 1}px`
  } : {},
  ({ absolute: e4, bordered: t4 }) => e4 ? {
    height: `calc(100% - ${t4 ? 42 : 40}px)`,
    position: "absolute",
    left: 0 + (t4 ? 1 : 0),
    right: 0 + (t4 ? 1 : 0),
    bottom: 0 + (t4 ? 1 : 0),
    top: 40 + (t4 ? 1 : 0),
    overflow: "auto",
    [`& > *:first-child${z6}`]: {
      position: "absolute",
      left: 0 + (t4 ? 1 : 0),
      right: 0 + (t4 ? 1 : 0),
      bottom: 0 + (t4 ? 1 : 0),
      top: 0 + (t4 ? 1 : 0),
      height: `calc(100% - ${t4 ? 2 : 0}px)`,
      overflow: "auto"
    }
  } : {}
), P6 = /* @__PURE__ */ o$1(({ active: e$1, render: t4, children: r4 }) => /* @__PURE__ */ e.createElement(fl, { active: e$1 }, t4 ? t4() : r4), "TabWrapper");
var wl = class wl2 extends reactExports.Component {
  constructor(t4) {
    super(t4), this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(t4, r4) {
    console.error("Error rendering addon panel"), console.error(t4), console.error(r4.componentStack);
  }
  render() {
    return this.state.hasError && this.props.active ? /* @__PURE__ */ e.createElement(
      Fo,
      {
        title: "This addon has errors",
        description: "Check your browser logs and addon code to pinpoint what went wrong. This issue was not caused by Storybook."
      }
    ) : this.props.children;
  }
};
o$1(wl, "TabErrorBoundary");
var pl = wl, vl = reactExports.memo(
  ({
    children: e$1,
    selected: t4 = null,
    actions: r4,
    absolute: n4 = false,
    bordered: a4 = false,
    tools: i4 = null,
    backgroundColor: c2,
    id: l2 = null,
    menuName: s2 = "Tabs",
    emptyState: u2,
    showToolsWhenEmpty: f2
  }) => {
    let d4 = reactExports.useMemo(
      () => Qd(e$1).map((g4, w3) => ({
        ...g4,
        active: t4 ? g4.id === t4 : w3 === 0
      })),
      [e$1, t4]
    ), { visibleList: m4, tabBarRef: v3, tabRefs: R3, AddonTab: p4 } = rp(d4), h4 = u2 ?? /* @__PURE__ */ e.createElement(Fo, { title: "Nothing found" });
    return !f2 && d4.length === 0 ? h4 : (
      // @ts-expect-error (non strict)
      /* @__PURE__ */ e.createElement(T6, { absolute: n4, bordered: a4, id: l2 }, /* @__PURE__ */ e.createElement(Bo, {
        scrollable: false,
        border: true,
        backgroundColor: c2
      }, /* @__PURE__ */ e.createElement(gl, { style: { whiteSpace: "normal" }, ref: v3, role: "tablist" }, m4.map(({
        title: g4,
        id: w3,
        active: b3,
        color: x4
      }, E4) => {
        let y4 = `index-${E4}`;
        return /* @__PURE__ */ e.createElement(
          ar,
          {
            id: `tabbutton-${I$2(w3) ?? y4}`,
            ref: (S4) => {
              R3.current.set(w3, S4);
            },
            className: `tabbutton ${b3 ? "tabbutton-active" : ""}`,
            type: "button",
            key: w3,
            active: b3,
            textColor: x4,
            onClick: (S4) => {
              S4.preventDefault(), r4.onSelect(w3);
            },
            role: "tab"
          },
          typeof g4 == "function" ? /* @__PURE__ */ e.createElement("title", null) : g4
        );
      }), /* @__PURE__ */ e.createElement(p4, { menuName: s2, actions: r4 })), i4), /* @__PURE__ */ e.createElement(H6, { id: "panel-tab-content", bordered: a4, absolute: n4 }, d4.length ? d4.map(({ id: g4, active: w3, render: b3 }) => /* @__PURE__ */ e.createElement(
        pl,
        { key: g4, active: w3 },
        e.createElement(b3, { active: w3 }, null)
      )) : h4))
    );
  }
);
vl.displayName = "Tabs";
var $o = class $o2 extends reactExports.Component {
  constructor(r4) {
    super(r4);
    this.handlers = {
      onSelect: /* @__PURE__ */ o$1((r5) => this.setState({ selected: r5 }), "onSelect")
    };
    this.state = {
      selected: r4.initial
    };
  }
  render() {
    let { bordered: r4 = false, absolute: n4 = false, children: a4, backgroundColor: i4, menuName: c2 } = this.props, { selected: l2 } = this.state;
    return /* @__PURE__ */ e.createElement(
      vl,
      {
        bordered: r4,
        absolute: n4,
        selected: l2,
        backgroundColor: i4,
        menuName: c2,
        actions: this.handlers
      },
      a4
    );
  }
};
o$1($o, "TabsState"), $o.defaultProps = {
  children: [],
  // @ts-expect-error (non strict)
  initial: null,
  absolute: false,
  bordered: false,
  backgroundColor: "",
  // @ts-expect-error (non strict)
  menuName: void 0
};
var ml = $o;
var bl = xr$1.span(
  ({ theme: e4 }) => ({
    width: 1,
    height: 20,
    background: e4.appBorderColor,
    marginLeft: 2,
    marginRight: 2
  }),
  ({ force: e4 }) => e4 ? {} : {
    "& + &": {
      display: "none"
    }
  }
);
bl.displayName = "Separator";
var B6 = /* @__PURE__ */ o$1((e$1) => e$1.reduce(
  (t4, r4, n4) => r4 ? /* @__PURE__ */ e.createElement(reactExports.Fragment, { key: r4.id || r4.key || `f-${n4}` }, t4, n4 > 0 ? /* @__PURE__ */ e.createElement(bl, {
    key: `s-${n4}`
  }) : null, r4.render() || r4) : t4,
  null
), "interleaveSeparators");
var _6 = /* @__PURE__ */ o$1((e4) => {
  let t4 = reactExports.useRef();
  return reactExports.useEffect(() => {
    t4.current = e4;
  }, [e4]), t4.current;
}, "usePrevious"), $6 = /* @__PURE__ */ o$1((e4, t4) => {
  let r4 = _6(t4);
  return e4 ? t4 : r4;
}, "useUpdate"), V6 = /* @__PURE__ */ o$1(({ active: e$1, children: t4 }) => (
  // the hidden attribute is an valid html element that's both accessible and works to visually hide content
  /* @__PURE__ */ e.createElement("div", { hidden: !e$1 }, $6(e$1, t4))
), "AddonPanel");
var j6 = /* @__PURE__ */ o$1(({ alt: e$1, ...t4 }) => /* @__PURE__ */ e.createElement("svg", { width: "200px", height: "40px", viewBox: "0 0 200 40", ...t4, role: "img" }, e$1 ? /* @__PURE__ */ e.createElement("title", null, e$1) : null, /* @__PURE__ */ e.createElement("defs", null, /* @__PURE__ */ e.createElement(
  "path",
  {
    d: "M1.2 36.9L0 3.9c0-1.1.8-2 1.9-2.1l28-1.8a2 2 0 0 1 2.2 1.9 2 2 0 0 1 0 .1v36a2 2 0 0 1-2 2 2 2 0 0 1-.1 0L3.2 38.8a2 2 0 0 1-2-2z",
    id: "a"
  }
)), /* @__PURE__ */ e.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ e.createElement(
  "path",
  {
    d: "M53.3 31.7c-1.7 0-3.4-.3-5-.7-1.5-.5-2.8-1.1-3.9-2l1.6-3.5c2.2 1.5 4.6 2.3 7.3 2.3 1.5 0 2.5-.2 3.3-.7.7-.5 1.1-1 1.1-1.9 0-.7-.3-1.3-1-1.7s-2-.8-3.7-1.2c-2-.4-3.6-.9-4.8-1.5-1.1-.5-2-1.2-2.6-2-.5-1-.8-2-.8-3.2 0-1.4.4-2.6 1.2-3.6.7-1.1 1.8-2 3.2-2.6 1.3-.6 2.9-.9 4.7-.9 1.6 0 3.1.3 4.6.7 1.5.5 2.7 1.1 3.5 2l-1.6 3.5c-2-1.5-4.2-2.3-6.5-2.3-1.3 0-2.3.2-3 .8-.8.5-1.2 1.1-1.2 2 0 .5.2 1 .5 1.3.2.3.7.6 1.4.9l2.9.8c2.9.6 5 1.4 6.2 2.4a5 5 0 0 1 2 4.2 6 6 0 0 1-2.5 5c-1.7 1.2-4 1.9-7 1.9zm21-3.6l1.4-.1-.2 3.5-1.9.1c-2.4 0-4.1-.5-5.2-1.5-1.1-1-1.6-2.7-1.6-4.8v-6h-3v-3.6h3V11h4.8v4.6h4v3.6h-4v6c0 1.8.9 2.8 2.6 2.8zm11.1 3.5c-1.6 0-3-.3-4.3-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.3-1 1.7 0 3.2.3 4.4 1a7 7 0 0 1 3 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.4 1zm0-3.6c2.4 0 3.6-1.6 3.6-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.6-1c-2.3 0-3.5 1.4-3.5 4.4 0 3 1.2 4.6 3.5 4.6zm21.7-8.8l-2.7.3c-1.3.2-2.3.5-2.8 1.2-.6.6-.9 1.4-.9 2.5v8.2H96V15.7h4.6v2.6c.8-1.8 2.5-2.8 5-3h1.3l.3 4zm14-3.5h4.8L116.4 37h-4.9l3-6.6-6.4-14.8h5l4 10 4-10zm16-.4c1.4 0 2.6.3 3.6 1 1 .6 1.9 1.6 2.5 2.8.6 1.2.9 2.7.9 4.3 0 1.6-.3 3-1 4.3a6.9 6.9 0 0 1-2.4 2.9c-1 .7-2.2 1-3.6 1-1 0-2-.2-3-.7-.8-.4-1.5-1-2-1.9v2.4h-4.7V8.8h4.8v9c.5-.8 1.2-1.4 2-1.9.9-.4 1.8-.6 3-.6zM135.7 28c1.1 0 2-.4 2.6-1.2.6-.8 1-2 1-3.4 0-1.5-.4-2.5-1-3.3s-1.5-1.1-2.6-1.1-2 .3-2.6 1.1c-.6.8-1 2-1 3.3 0 1.5.4 2.6 1 3.4.6.8 1.5 1.2 2.6 1.2zm18.9 3.6c-1.7 0-3.2-.3-4.4-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.4-1 1.6 0 3 .3 4.3 1a7 7 0 0 1 3 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.3 1zm0-3.6c2.3 0 3.5-1.6 3.5-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.5-1c-2.4 0-3.6 1.4-3.6 4.4 0 3 1.2 4.6 3.6 4.6zm18 3.6c-1.7 0-3.2-.3-4.4-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.4-1 1.6 0 3 .3 4.4 1a7 7 0 0 1 2.9 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.3 1zm0-3.6c2.3 0 3.5-1.6 3.5-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.5-1c-2.4 0-3.6 1.4-3.6 4.4 0 3 1.2 4.6 3.6 4.6zm27.4 3.4h-6l-6-7v7h-4.8V8.8h4.9v13.6l5.8-6.7h5.7l-6.6 7.5 7 8.2z",
    fill: "currentColor"
  }
), /* @__PURE__ */ e.createElement("mask", { id: "b", fill: "#fff" }, /* @__PURE__ */ e.createElement("use", { xlinkHref: "#a" })), /* @__PURE__ */ e.createElement("use", { fill: "#FF4785", fillRule: "nonzero", xlinkHref: "#a" }), /* @__PURE__ */ e.createElement(
  "path",
  {
    d: "M23.7 5L24 .2l3.9-.3.1 4.8a.3.3 0 0 1-.5.2L26 3.8l-1.7 1.4a.3.3 0 0 1-.5-.3zm-5 10c0 .9 5.3.5 6 0 0-5.4-2.8-8.2-8-8.2-5.3 0-8.2 2.8-8.2 7.1 0 7.4 10 7.6 10 11.6 0 1.2-.5 1.9-1.8 1.9-1.6 0-2.2-.9-2.1-3.6 0-.6-6.1-.8-6.3 0-.5 6.7 3.7 8.6 8.5 8.6 4.6 0 8.3-2.5 8.3-7 0-7.9-10.2-7.7-10.2-11.6 0-1.6 1.2-1.8 2-1.8.6 0 2 0 1.9 3z",
    fill: "#FFF",
    fillRule: "nonzero",
    mask: "url(#b)"
  }
))), "StorybookLogo");
var W6 = /* @__PURE__ */ o$1((e$1) => /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 64 64", ...e$1 }, /* @__PURE__ */ e.createElement("title", null, "Storybook icon"), /* @__PURE__ */ e.createElement("g", { id: "Artboard", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ e.createElement(
  "path",
  {
    d: "M8.04798541,58.7875918 L6.07908839,6.32540407 C6.01406344,4.5927838 7.34257463,3.12440831 9.07303814,3.01625434 L53.6958037,0.227331489 C55.457209,0.117243658 56.974354,1.45590096 57.0844418,3.21730626 C57.0885895,3.28366922 57.0906648,3.35014546 57.0906648,3.41663791 L57.0906648,60.5834697 C57.0906648,62.3483119 55.6599776,63.7789992 53.8951354,63.7789992 C53.847325,63.7789992 53.7995207,63.7779262 53.7517585,63.775781 L11.0978899,61.8600599 C9.43669044,61.7854501 8.11034889,60.4492961 8.04798541,58.7875918 Z",
    id: "path-1",
    fill: "#FF4785",
    fillRule: "nonzero"
  }
), /* @__PURE__ */ e.createElement(
  "path",
  {
    d: "M35.9095005,24.1768792 C35.9095005,25.420127 44.2838488,24.8242707 45.4080313,23.9509748 C45.4080313,15.4847538 40.8652557,11.0358878 32.5466666,11.0358878 C24.2280775,11.0358878 19.5673077,15.553972 19.5673077,22.3311017 C19.5673077,34.1346028 35.4965208,34.3605071 35.4965208,40.7987804 C35.4965208,42.606015 34.6115646,43.6790606 32.6646607,43.6790606 C30.127786,43.6790606 29.1248356,42.3834613 29.2428298,37.9783269 C29.2428298,37.0226907 19.5673077,36.7247626 19.2723223,37.9783269 C18.5211693,48.6535354 25.1720308,51.7326752 32.7826549,51.7326752 C40.1572906,51.7326752 45.939005,47.8018145 45.939005,40.6858282 C45.939005,28.035186 29.7738035,28.3740425 29.7738035,22.1051974 C29.7738035,19.5637737 31.6617103,19.2249173 32.7826549,19.2249173 C33.9625966,19.2249173 36.0864917,19.4328883 35.9095005,24.1768792 Z",
    id: "path9_fill-path",
    fill: "#FFFFFF",
    fillRule: "nonzero"
  }
), /* @__PURE__ */ e.createElement(
  "path",
  {
    d: "M44.0461638,0.830433986 L50.1874092,0.446606143 L50.443532,7.7810017 C50.4527198,8.04410717 50.2468789,8.26484453 49.9837734,8.27403237 C49.871115,8.27796649 49.7607078,8.24184808 49.6721567,8.17209069 L47.3089847,6.3104681 L44.5110468,8.43287463 C44.3012992,8.591981 44.0022839,8.55092814 43.8431776,8.34118051 C43.7762017,8.25288717 43.742082,8.14401677 43.7466857,8.03329059 L44.0461638,0.830433986 Z",
    id: "Path",
    fill: "#FFFFFF"
  }
))), "StorybookIcon");
var ap = Ee$1`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
var G6 = xr$1.div(({ size: e4 = 32 }) => ({
  borderRadius: "50%",
  cursor: "progress",
  display: "inline-block",
  overflow: "hidden",
  position: "absolute",
  transition: "all 200ms ease-out",
  verticalAlign: "top",
  top: "50%",
  left: "50%",
  marginTop: -(e4 / 2),
  marginLeft: -(e4 / 2),
  height: e4,
  width: e4,
  zIndex: 4,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "rgba(97, 97, 97, 0.29)",
  borderTopColor: "rgb(100,100,100)",
  animation: `${ap} 0.7s linear infinite`,
  mixBlendMode: "difference"
})), ip = xr$1.div({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%"
}), X6 = xr$1.div(({ theme: e4 }) => ({
  position: "relative",
  width: "80%",
  marginBottom: "0.75rem",
  maxWidth: 300,
  height: 5,
  borderRadius: 5,
  background: we$1(0.8, e4.color.secondary),
  overflow: "hidden",
  cursor: "progress"
})), Y6 = xr$1.div(({ theme: e4 }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  background: e4.color.secondary
})), lp = xr$1.div(({ theme: e4 }) => ({
  minHeight: "2em",
  fontSize: `${e4.typography.size.s1}px`,
  color: e4.textMutedColor
})), Z6 = xr$1(q5)(({ theme: e4 }) => ({
  width: 20,
  height: 20,
  marginBottom: "0.5rem",
  color: e4.textMutedColor
})), K6 = Ee$1`
  from { content: "..." }
  33% { content: "." }
  66% { content: ".." }
  to { content: "..." }
`, J6 = xr$1.span({
  "&::after": {
    content: "'...'",
    animation: `${K6} 1s linear infinite`,
    animationDelay: "1s",
    display: "inline-block",
    width: "1em",
    height: "auto"
  }
}), Q6 = /* @__PURE__ */ o$1(({ progress: e$1, error: t4, size: r4, ...n4 }) => {
  if (t4)
    return /* @__PURE__ */ e.createElement(ip, { "aria-label": t4.toString(), "aria-live": "polite", role: "status", ...n4 }, /* @__PURE__ */ e.createElement(Z6, null), /* @__PURE__ */ e.createElement(lp, null, t4.message));
  if (e$1) {
    let { value: a4, modules: i4 } = e$1, { message: c2 } = e$1;
    return i4 && (c2 += ` ${i4.complete} / ${i4.total} modules`), /* @__PURE__ */ e.createElement(
      ip,
      {
        "aria-label": "Content is loading...",
        "aria-live": "polite",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": a4 * 100,
        "aria-valuetext": c2,
        role: "progressbar",
        ...n4
      },
      /* @__PURE__ */ e.createElement(X6, null, /* @__PURE__ */ e.createElement(Y6, { style: { width: `${a4 * 100}%` } })),
      /* @__PURE__ */ e.createElement(lp, null, c2, a4 < 1 && /* @__PURE__ */ e.createElement(J6, { key: c2 }))
    );
  }
  return /* @__PURE__ */ e.createElement(
    G6,
    {
      "aria-label": "Content is loading...",
      "aria-live": "polite",
      role: "status",
      size: r4,
      ...n4
    }
  );
}, "Loader");
var Rl = "http://www.w3.org/2000/svg", tw = Ee$1({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
}), cp = xr$1.div(({ size: e4 }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minWidth: e4,
  minHeight: e4
})), yl = xr$1.svg(
  ({ size: e4, width: t4 }) => ({
    position: "absolute",
    width: `${e4}px!important`,
    height: `${e4}px!important`,
    transform: "rotate(-90deg)",
    circle: {
      r: (e4 - Math.ceil(t4)) / 2,
      cx: e4 / 2,
      cy: e4 / 2,
      opacity: 0.15,
      fill: "transparent",
      stroke: "currentColor",
      strokeWidth: t4,
      strokeLinecap: "round",
      strokeDasharray: Math.PI * (e4 - Math.ceil(t4))
    }
  }),
  ({ progress: e4 }) => e4 && {
    circle: {
      opacity: 0.75
    }
  },
  ({ spinner: e4 }) => e4 && {
    animation: `${tw} 1s linear infinite`,
    circle: {
      opacity: 0.25
    }
  }
), rw = /* @__PURE__ */ o$1(({
  percentage: e$1 = void 0,
  running: t4 = true,
  size: r4 = 24,
  width: n4 = 1.5,
  children: a4 = null,
  ...i4
}) => typeof e$1 == "number" ? /* @__PURE__ */ e.createElement(cp, { size: r4, ...i4 }, a4, /* @__PURE__ */ e.createElement(yl, {
  size: r4,
  width: n4,
  xmlns: Rl
}, /* @__PURE__ */ e.createElement("circle", null)), t4 && /* @__PURE__ */ e.createElement(
  yl,
  { size: r4, width: n4, xmlns: Rl, spinner: true },
  /* @__PURE__ */ e.createElement("circle", { strokeDashoffset: Math.PI * (r4 - Math.ceil(n4)) * (1 - e$1 / 100) })
), /* @__PURE__ */ e.createElement(
  yl,
  { size: r4, width: n4, xmlns: Rl, progress: true },
  /* @__PURE__ */ e.createElement("circle", { strokeDashoffset: Math.PI * (r4 - Math.ceil(
    n4
  )) * (1 - e$1 / 100) })
)) : /* @__PURE__ */ e.createElement(cp, { size: r4, ...i4 }, a4), "ProgressSpinner");
function nw(e4) {
  let t4 = {}, r4 = e4.split("&");
  for (let n4 = 0; n4 < r4.length; n4++) {
    let a4 = r4[n4].split("=");
    t4[decodeURIComponent(a4[0])] = decodeURIComponent(a4[1] || "");
  }
  return t4;
}
o$1(nw, "parseQuery");
var ow = /* @__PURE__ */ o$1((e4, t4, r4 = {}) => {
  let [n4, a4] = e4.split("?"), i4 = a4 ? {
    ...nw(a4),
    ...r4,
    id: t4
  } : {
    ...r4,
    id: t4
  };
  return `${n4}?${Object.entries(i4).map((c2) => `${c2[0]}=${c2[1]}`).join("&")}`;
}, "getStoryHref");
var cw = xr$1.pre`
  line-height: 18px;
  padding: 11px 1rem;
  white-space: pre-wrap;
  background: rgba(0, 0, 0, 0.05);
  color: ${h$1.darkest};
  border-radius: 3px;
  margin: 1rem 0;
  width: 100%;
  display: block;
  overflow: hidden;
  font-family: ${W$2.fonts.mono};
  font-size: ${W$2.size.s2 - 1}px;
`, sw = /* @__PURE__ */ o$1(({ code: e$1, ...t4 }) => /* @__PURE__ */ e.createElement(cw, { id: "clipboard-code", ...t4 }, e$1), "ClipboardCode");
var Nk = bi, dw = {};
Object.keys(bi).forEach((e4) => {
  dw[e4] = reactExports.forwardRef((t4, r4) => reactExports.createElement(e4, { ...t4, ref: r4 }));
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  A: Ko,
  get ActionBar() {
    return $a;
  },
  AddonPanel: V6,
  Badge: Uh,
  Bar: ul,
  Blockquote: Jo,
  Button: Ir,
  Checkbox: w7,
  ClipboardCode: sw,
  Code: ei,
  DL: ti,
  Div: ri,
  DocumentWrapper: Jh,
  EmptyTabContent: Fo,
  ErrorFormatter: m7,
  FlexBar: Bo,
  Form: N7,
  H1: ni,
  H2: oi,
  H3: ai,
  H4: ii,
  H5: li,
  H6: ci,
  HR: si,
  IconButton: wo,
  Img: ui,
  LI: fi,
  Link: yi,
  ListItem: il,
  Loader: Q6,
  Modal: Dv,
  OL: di,
  P: pi,
  Placeholder: Xv,
  Pre: mi,
  ProgressSpinner: rw,
  ResetWrapper: jl,
  get ScrollArea() {
    return Rr;
  },
  Separator: bl,
  Spaced: jv,
  Span: hi,
  StorybookIcon: W6,
  StorybookLogo: j6,
  SyntaxHighlighter: ru,
  TT: gi,
  TabBar: gl,
  TabButton: ar,
  TabWrapper: P6,
  Table: vi,
  Tabs: vl,
  TabsState: ml,
  TooltipLinkList: ll,
  TooltipMessage: j3,
  TooltipNote: G3,
  UL: wi,
  WithTooltip: O3,
  WithTooltipPure: N3,
  Zoom: a7,
  codeCommon: at,
  components: Nk,
  createCopyToClipboardFunction: Ja,
  getStoryHref: ow,
  interleaveSeparators: B6,
  nameSpaceClassNames: J$1,
  resetComponents: dw,
  withReset: N$1
}, Symbol.toStringTag, { value: "Module" }));
var ZoomIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M6 3.5a.5.5 0 01.5.5v1.5H8a.5.5 0 010 1H6.5V8a.5.5 0 01-1 0V6.5H4a.5.5 0 010-1h1.5V4a.5.5 0 01.5-.5z",
        fill: color
      }
    ),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.544 10.206a5.5 5.5 0 11.662-.662.5.5 0 01.148.102l3 3a.5.5 0 01-.708.708l-3-3a.5.5 0 01-.102-.148zM10.5 6a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z",
        fill: color
      }
    )
  );
});
var ZoomOutIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement("path", { d: "M4 5.5a.5.5 0 000 1h4a.5.5 0 000-1H4z", fill: color }),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6 11.5c1.35 0 2.587-.487 3.544-1.294a.5.5 0 00.102.148l3 3a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.148-.102A5.5 5.5 0 106 11.5zm0-1a4.5 4.5 0 100-9 4.5 4.5 0 000 9z",
        fill: color
      }
    )
  );
});
var ZoomResetIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M1.5 2.837V1.5a.5.5 0 00-1 0V4a.5.5 0 00.5.5h2.5a.5.5 0 000-1H2.258a4.5 4.5 0 11-.496 4.016.5.5 0 10-.942.337 5.502 5.502 0 008.724 2.353.5.5 0 00.102.148l3 3a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.148-.102A5.5 5.5 0 101.5 2.837z",
        fill: color
      }
    )
  );
});
var EyeIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement("path", { d: "M7 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z", fill: color }),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14 7l-.21.293C13.669 7.465 10.739 11.5 7 11.5S.332 7.465.21 7.293L0 7l.21-.293C.331 6.536 3.261 2.5 7 2.5s6.668 4.036 6.79 4.207L14 7zM2.896 5.302A12.725 12.725 0 001.245 7c.296.37.874 1.04 1.65 1.698C4.043 9.67 5.482 10.5 7 10.5c1.518 0 2.958-.83 4.104-1.802A12.72 12.72 0 0012.755 7c-.297-.37-.875-1.04-1.65-1.698C9.957 4.33 8.517 3.5 7 3.5c-1.519 0-2.958.83-4.104 1.802z",
        fill: color
      }
    )
  );
});
var EyeCloseIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M1.854 1.146a.5.5 0 10-.708.708l11 11a.5.5 0 00.708-.708l-11-11zM11.104 8.698c-.177.15-.362.298-.553.439l.714.714a13.25 13.25 0 002.526-2.558L14 7l-.21-.293C13.669 6.536 10.739 2.5 7 2.5c-.89 0-1.735.229-2.506.58l.764.763A4.859 4.859 0 017 3.5c1.518 0 2.958.83 4.104 1.802A12.724 12.724 0 0112.755 7a12.72 12.72 0 01-1.65 1.698zM.21 6.707c.069-.096 1.03-1.42 2.525-2.558l.714.714c-.191.141-.376.288-.553.439A12.725 12.725 0 001.245 7c.296.37.874 1.04 1.65 1.698C4.043 9.67 5.482 10.5 7 10.5a4.86 4.86 0 001.742-.344l.764.764c-.772.351-1.616.58-2.506.58C3.262 11.5.332 7.465.21 7.293L0 7l.21-.293z",
        fill: color
      }
    ),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M4.5 7c0-.322.061-.63.172-.914l3.242 3.242A2.5 2.5 0 014.5 7zM9.328 7.914L6.086 4.672a2.5 2.5 0 013.241 3.241z",
        fill: color
      }
    )
  );
});
var DocumentIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M4 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM4.5 7.5a.5.5 0 000 1h5a.5.5 0 000-1h-5zM4 10.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z",
        fill: color
      }
    ),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.5 0a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V3.207a.5.5 0 00-.146-.353L10.146.146A.5.5 0 009.793 0H1.5zM2 1h7.5v2a.5.5 0 00.5.5h2V13H2V1z",
        fill: color
      }
    )
  );
});
var MarkupIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M8.982 1.632a.5.5 0 00-.964-.263l-3 11a.5.5 0 10.964.263l3-11zM3.32 3.616a.5.5 0 01.064.704L1.151 7l2.233 2.68a.5.5 0 11-.768.64l-2.5-3a.5.5 0 010-.64l2.5-3a.5.5 0 01.704-.064zM10.68 3.616a.5.5 0 00-.064.704L12.849 7l-2.233 2.68a.5.5 0 00.768.64l2.5-3a.5.5 0 000-.64l-2.5-3a.5.5 0 00-.704-.064z",
        fill: color
      }
    )
  );
});
var AddIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M7 3a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 017 3z",
        fill: color
      }
    ),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7 14A7 7 0 107 0a7 7 0 000 14zm0-1A6 6 0 107 1a6 6 0 000 12z",
        fill: color
      }
    )
  );
});
var SubtractIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement("path", { d: "M3.5 6.5a.5.5 0 000 1h7a.5.5 0 000-1h-7z", fill: color }),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14 7A7 7 0 110 7a7 7 0 0114 0zm-1 0A6 6 0 111 7a6 6 0 0112 0z",
        fill: color
      }
    )
  );
});
var LinkIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M11.841 2.159a2.25 2.25 0 00-3.182 0l-2.5 2.5a2.25 2.25 0 000 3.182.5.5 0 01-.707.707 3.25 3.25 0 010-4.596l2.5-2.5a3.25 3.25 0 014.596 4.596l-2.063 2.063a4.27 4.27 0 00-.094-1.32l1.45-1.45a2.25 2.25 0 000-3.182z",
        fill: color
      }
    ),
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M3.61 7.21c-.1-.434-.132-.88-.095-1.321L1.452 7.952a3.25 3.25 0 104.596 4.596l2.5-2.5a3.25 3.25 0 000-4.596.5.5 0 00-.707.707 2.25 2.25 0 010 3.182l-2.5 2.5A2.25 2.25 0 112.159 8.66l1.45-1.45z",
        fill: color
      }
    )
  );
});
var ChevronDownIcon$1 = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M1.146 4.604l5.5 5.5a.5.5 0 00.708 0l5.5-5.5a.5.5 0 00-.708-.708L7 9.043 1.854 3.896a.5.5 0 10-.708.708z",
        fill: color
      }
    )
  );
});
var ChevronRightIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M11.104 7.354l-5.5 5.5a.5.5 0 01-.708-.708L10.043 7 4.896 1.854a.5.5 0 11.708-.708l5.5 5.5a.5.5 0 010 .708z",
        fill: color
      }
    )
  );
});
var ChevronSmallUpIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M3.854 9.104a.5.5 0 11-.708-.708l3.5-3.5a.5.5 0 01.708 0l3.5 3.5a.5.5 0 01-.708.708L7 5.957 3.854 9.104z",
        fill: color
      }
    )
  );
});
var ChevronSmallDownIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M3.854 4.896a.5.5 0 10-.708.708l3.5 3.5a.5.5 0 00.708 0l3.5-3.5a.5.5 0 00-.708-.708L7 8.043 3.854 4.896z",
        fill: color
      }
    )
  );
});
var UndoIcon = /* @__PURE__ */ reactExports.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
  return /* @__PURE__ */ reactExports.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ref: forwardedRef,
      ...props
    },
    /* @__PURE__ */ reactExports.createElement(
      "path",
      {
        d: "M1.146 3.854a.5.5 0 010-.708l2-2a.5.5 0 11.708.708L2.707 3h6.295A4 4 0 019 11H3a.5.5 0 010-1h6a3 3 0 100-6H2.707l1.147 1.146a.5.5 0 11-.708.708l-2-2z",
        fill: color
      }
    )
  );
});
function dedent(templ) {
  var values = [];
  for (var _i2 = 1; _i2 < arguments.length; _i2++) {
    values[_i2 - 1] = arguments[_i2];
  }
  var strings = Array.from(typeof templ === "string" ? [templ] : templ);
  strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var indentLengths = strings.reduce(function(arr, str) {
    var matches = str.match(/\n([\t ]+|(?!\s).)/g);
    if (matches) {
      return arr.concat(matches.map(function(match) {
        var _a2, _b;
        return (_b = (_a2 = match.match(/[\t ]/g)) === null || _a2 === void 0 ? void 0 : _a2.length) !== null && _b !== void 0 ? _b : 0;
      }));
    }
    return arr;
  }, []);
  if (indentLengths.length) {
    var pattern_1 = new RegExp("\n[	 ]{" + Math.min.apply(Math, indentLengths) + "}", "g");
    strings = strings.map(function(str) {
      return str.replace(pattern_1, "\n");
    });
  }
  strings[0] = strings[0].replace(/^\r?\n/, "");
  var string = strings[0];
  values.forEach(function(value2, i4) {
    var endentations = string.match(/(?:^|\n)( *)$/);
    var endentation = endentations ? endentations[1] : "";
    var indentedValue = value2;
    if (typeof value2 === "string" && value2.includes("\n")) {
      indentedValue = String(value2).split("\n").map(function(str, i5) {
        return i5 === 0 ? str : "" + endentation + str;
      }).join("\n");
    }
    string += indentedValue + strings[i4 + 1];
  });
  return string;
}
const { deprecate, once, logger } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const { NAVIGATE_URL, STORY_ARGS_UPDATED, UPDATE_STORY_ARGS, RESET_STORY_ARGS, GLOBALS_UPDATED } = __STORYBOOK_MODULE_CORE_EVENTS__;
const { filterArgTypes, composeConfigs, Preview: Preview$1, DocsContext: DocsContext$1 } = __STORYBOOK_MODULE_PREVIEW_API__;
const { Channel } = __STORYBOOK_MODULE_CHANNELS__;
var require_memoizerific = __commonJS({ "../../node_modules/memoizerific/memoizerific.js"(exports, module) {
  (function(f2) {
    if (typeof exports == "object" && typeof module < "u") module.exports = f2();
    else if (typeof define == "function" && define.amd) define([], f2);
    else {
      var g22;
      typeof window < "u" ? g22 = window : typeof global < "u" ? g22 = global : typeof self < "u" ? g22 = self : g22 = this, g22.memoizerific = f2();
    }
  })(function() {
    return function e23(t22, n22, r22) {
      function s2(o32, u2) {
        if (!n22[o32]) {
          if (!t22[o32]) {
            var a22 = typeof __require == "function" && __require;
            if (!u2 && a22) return a22(o32, true);
            if (i22) return i22(o32, true);
            var f2 = new Error("Cannot find module '" + o32 + "'");
            throw f2.code = "MODULE_NOT_FOUND", f2;
          }
          var l2 = n22[o32] = { exports: {} };
          t22[o32][0].call(l2.exports, function(e32) {
            var n32 = t22[o32][1][e32];
            return s2(n32 || e32);
          }, l2, l2.exports, e23, t22, n22, r22);
        }
        return n22[o32].exports;
      }
      for (var i22 = typeof __require == "function" && __require, o22 = 0; o22 < r22.length; o22++) s2(r22[o22]);
      return s2;
    }({ 1: [function(_dereq_, module3, exports3) {
      module3.exports = function(forceSimilar) {
        if (typeof Map != "function" || forceSimilar) {
          var Similar = _dereq_("./similar");
          return new Similar();
        } else return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(_dereq_, module3, exports3) {
      function Similar() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      Similar.prototype.get = function(key) {
        var index2;
        if (this.lastItem && this.isEqual(this.lastItem.key, key)) return this.lastItem.val;
        if (index2 = this.indexOf(key), index2 >= 0) return this.lastItem = this.list[index2], this.list[index2].val;
      }, Similar.prototype.set = function(key, val) {
        var index2;
        return this.lastItem && this.isEqual(this.lastItem.key, key) ? (this.lastItem.val = val, this) : (index2 = this.indexOf(key), index2 >= 0 ? (this.lastItem = this.list[index2], this.list[index2].val = val, this) : (this.lastItem = { key, val }, this.list.push(this.lastItem), this.size++, this));
      }, Similar.prototype.delete = function(key) {
        var index2;
        if (this.lastItem && this.isEqual(this.lastItem.key, key) && (this.lastItem = void 0), index2 = this.indexOf(key), index2 >= 0) return this.size--, this.list.splice(index2, 1)[0];
      }, Similar.prototype.has = function(key) {
        var index2;
        return this.lastItem && this.isEqual(this.lastItem.key, key) ? true : (index2 = this.indexOf(key), index2 >= 0 ? (this.lastItem = this.list[index2], true) : false);
      }, Similar.prototype.forEach = function(callback, thisArg) {
        var i22;
        for (i22 = 0; i22 < this.size; i22++) callback.call(thisArg || this, this.list[i22].val, this.list[i22].key, this);
      }, Similar.prototype.indexOf = function(key) {
        var i22;
        for (i22 = 0; i22 < this.size; i22++) if (this.isEqual(this.list[i22].key, key)) return i22;
        return -1;
      }, Similar.prototype.isEqual = function(val1, val2) {
        return val1 === val2 || val1 !== val1 && val2 !== val2;
      }, module3.exports = Similar;
    }, {}], 3: [function(_dereq_, module3, exports3) {
      var MapOrSimilar = _dereq_("map-or-similar");
      module3.exports = function(limit) {
        var cache = new MapOrSimilar(false), lru = [];
        return function(fn2) {
          var memoizerific = function() {
            var currentCache = cache, newMap, fnResult, argsLengthMinusOne = arguments.length - 1, lruPath = Array(argsLengthMinusOne + 1), isMemoized = true, i22;
            if ((memoizerific.numArgs || memoizerific.numArgs === 0) && memoizerific.numArgs !== argsLengthMinusOne + 1) throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (i22 = 0; i22 < argsLengthMinusOne; i22++) {
              if (lruPath[i22] = { cacheItem: currentCache, arg: arguments[i22] }, currentCache.has(arguments[i22])) {
                currentCache = currentCache.get(arguments[i22]);
                continue;
              }
              isMemoized = false, newMap = new MapOrSimilar(false), currentCache.set(arguments[i22], newMap), currentCache = newMap;
            }
            return isMemoized && (currentCache.has(arguments[argsLengthMinusOne]) ? fnResult = currentCache.get(arguments[argsLengthMinusOne]) : isMemoized = false), isMemoized || (fnResult = fn2.apply(null, arguments), currentCache.set(arguments[argsLengthMinusOne], fnResult)), limit > 0 && (lruPath[argsLengthMinusOne] = { cacheItem: currentCache, arg: arguments[argsLengthMinusOne] }, isMemoized ? moveToMostRecentLru(lru, lruPath) : lru.push(lruPath), lru.length > limit && removeCachedResult(lru.shift())), memoizerific.wasMemoized = isMemoized, memoizerific.numArgs = argsLengthMinusOne + 1, fnResult;
          };
          return memoizerific.limit = limit, memoizerific.wasMemoized = false, memoizerific.cache = cache, memoizerific.lru = lru, memoizerific;
        };
      };
      function moveToMostRecentLru(lru, lruPath) {
        var lruLen = lru.length, lruPathLen = lruPath.length, isMatch, i22, ii2;
        for (i22 = 0; i22 < lruLen; i22++) {
          for (isMatch = true, ii2 = 0; ii2 < lruPathLen; ii2++) if (!isEqual(lru[i22][ii2].arg, lruPath[ii2].arg)) {
            isMatch = false;
            break;
          }
          if (isMatch) break;
        }
        lru.push(lru.splice(i22, 1)[0]);
      }
      function removeCachedResult(removedLru) {
        var removedLruLen = removedLru.length, currentLru = removedLru[removedLruLen - 1], tmp, i22;
        for (currentLru.cacheItem.delete(currentLru.arg), i22 = removedLruLen - 2; i22 >= 0 && (currentLru = removedLru[i22], tmp = currentLru.cacheItem.get(currentLru.arg), !tmp || !tmp.size); i22--) currentLru.cacheItem.delete(currentLru.arg);
      }
      function isEqual(val1, val2) {
        return val1 === val2 || val1 !== val1 && val2 !== val2;
      }
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
} });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n22) {
    for (var e23 = 1; e23 < arguments.length; e23++) {
      var t22 = arguments[e23];
      for (var r22 in t22) ({}).hasOwnProperty.call(t22, r22) && (n22[r22] = t22[r22]);
    }
    return n22;
  }, _extends.apply(null, arguments);
}
function _assertThisInitialized(e23) {
  if (e23 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e23;
}
function _setPrototypeOf(t22, e23) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t32, e32) {
    return t32.__proto__ = e32, t32;
  }, _setPrototypeOf(t22, e23);
}
function _inheritsLoose(t22, o22) {
  t22.prototype = Object.create(o22.prototype), t22.prototype.constructor = t22, _setPrototypeOf(t22, o22);
}
function _getPrototypeOf(t22) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t32) {
    return t32.__proto__ || Object.getPrototypeOf(t32);
  }, _getPrototypeOf(t22);
}
function _isNativeFunction(t22) {
  try {
    return Function.toString.call(t22).indexOf("[native code]") !== -1;
  } catch {
    return typeof t22 == "function";
  }
}
function _isNativeReflectConstruct() {
  try {
    var t22 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_isNativeReflectConstruct = function() {
    return !!t22;
  })();
}
function _construct(t22, e23, r22) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o22 = [null];
  o22.push.apply(o22, e23);
  var p22 = new (t22.bind.apply(t22, o22))();
  return r22 && _setPrototypeOf(p22, r22.prototype), p22;
}
function _wrapNativeSuper(t22) {
  var r22 = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(t32) {
    if (t32 === null || !_isNativeFunction(t32)) return t32;
    if (typeof t32 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r22 !== void 0) {
      if (r22.has(t32)) return r22.get(t32);
      r22.set(t32, Wrapper11);
    }
    function Wrapper11() {
      return _construct(t32, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper11.prototype = Object.create(t32.prototype, { constructor: { value: Wrapper11, enumerable: false, writable: true, configurable: true } }), _setPrototypeOf(Wrapper11, t32);
  }, _wrapNativeSuper(t22);
}
var ERRORS = { 1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`, 2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`, 3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`, 4: `Couldn't generate valid rgb string from %s, it returned %s.

`, 5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`, 6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`, 7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`, 8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`, 9: `Please provide a number of steps to the modularScale helper.

`, 10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`, 11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`, 12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`, 13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`, 14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`, 15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`, 16: `You must provide a template to this method.

`, 17: `You passed an unsupported selector state to this method.

`, 18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`, 19: `fromSize and toSize must be provided as stringified numbers with the same units.

`, 20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`, 21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n", 22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n", 23: `fontFace expects a name of a font-family.

`, 24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`, 25: `fontFace expects localFonts to be an array.

`, 26: `fontFace expects fileFormats to be an array.

`, 27: `radialGradient requries at least 2 color-stops to properly render.

`, 28: `Please supply a filename to retinaImage() as the first argument.

`, 29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`, 30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n", 31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`, 32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`, 33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`, 34: `borderRadius expects a radius value as a string or number as the second argument.

`, 35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`, 36: `Property must be a string value.

`, 37: `Syntax Error at %s.

`, 38: `Formula contains a function that needs parentheses at %s.

`, 39: `Formula is missing closing parenthesis at %s.

`, 40: `Formula has too many closing parentheses at %s.

`, 41: `All values in a formula must have the same unit or be unitless.

`, 42: `Please provide a number of steps to the modularScale helper.

`, 43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`, 44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`, 45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`, 46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`, 47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`, 48: `fromSize and toSize must be provided as stringified numbers with the same units.

`, 49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`, 50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`, 51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`, 52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`, 53: `fontFace expects localFonts to be an array.

`, 54: `fontFace expects fileFormats to be an array.

`, 55: `fontFace expects a name of a font-family.

`, 56: `linearGradient requries at least 2 color-stops to properly render.

`, 57: `radialGradient requries at least 2 color-stops to properly render.

`, 58: `Please supply a filename to retinaImage() as the first argument.

`, 59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`, 60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n", 61: `Property must be a string value.

`, 62: `borderRadius expects a radius value as a string or number as the second argument.

`, 63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`, 64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`, 65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`, 66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`, 67: `You must provide a template to this method.

`, 68: `You passed an unsupported selector state to this method.

`, 69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`, 70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`, 71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`, 72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`, 73: `Please provide a valid CSS variable.

`, 74: `CSS variable not found and no default was provided.

`, 75: `important requires a valid style object, got a %s instead.

`, 76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`, 77: `remToPx expects a value in "rem" but you provided it in "%s".

`, 78: `base must be set in "px" or "%" but you set it in "%s".
` };
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
  var a22 = args[0], b22 = [], c2;
  for (c2 = 1; c2 < args.length; c2 += 1) b22.push(args[c2]);
  return b22.forEach(function(d22) {
    a22 = a22.replace(/%[a-z]/, d22);
  }), a22;
}
var PolishedError = function(_Error) {
  _inheritsLoose(PolishedError2, _Error);
  function PolishedError2(code) {
    for (var _this, _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
    return _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(args))) || this, _assertThisInitialized(_this);
  }
  return PolishedError2;
}(_wrapNativeSuper(Error));
function colorToInt(color) {
  return Math.round(color * 255);
}
function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}
function hslToRgb(hue, saturation, lightness, convert2) {
  if (convert2 === void 0 && (convert2 = convertToInt), saturation === 0) return convert2(lightness, lightness, lightness);
  var huePrime = (hue % 360 + 360) % 360 / 60, chroma = (1 - Math.abs(2 * lightness - 1)) * saturation, secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1)), red = 0, green = 0, blue = 0;
  huePrime >= 0 && huePrime < 1 ? (red = chroma, green = secondComponent) : huePrime >= 1 && huePrime < 2 ? (red = secondComponent, green = chroma) : huePrime >= 2 && huePrime < 3 ? (green = chroma, blue = secondComponent) : huePrime >= 3 && huePrime < 4 ? (green = secondComponent, blue = chroma) : huePrime >= 4 && huePrime < 5 ? (red = secondComponent, blue = chroma) : huePrime >= 5 && huePrime < 6 && (red = chroma, blue = secondComponent);
  var lightnessModification = lightness - chroma / 2, finalRed = red + lightnessModification, finalGreen = green + lightnessModification, finalBlue = blue + lightnessModification;
  return convert2(finalRed, finalGreen, finalBlue);
}
var namedColorMap = { aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "789", lightslategrey: "789", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "0f0", limegreen: "32cd32", linen: "faf0e6", magenta: "f0f", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", rebeccapurple: "639", red: "f00", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "fff", whitesmoke: "f5f5f5", yellow: "ff0", yellowgreen: "9acd32" };
function nameToHex(color) {
  if (typeof color != "string") return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}
var hexRegex = /^#[a-fA-F0-9]{6}$/, hexRgbaRegex = /^#[a-fA-F0-9]{8}$/, reducedHexRegex = /^#[a-fA-F0-9]{3}$/, reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/, rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i, rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i, hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function parseToRgb(color) {
  if (typeof color != "string") throw new PolishedError(3);
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) return { red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16), green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16), blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16) };
  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return { red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16), green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16), blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16), alpha };
  }
  if (normalizedColor.match(reducedHexRegex)) return { red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16), green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16), blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16) };
  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
    return { red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16), green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16), blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16), alpha: _alpha };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) return { red: parseInt("" + rgbMatched[1], 10), green: parseInt("" + rgbMatched[2], 10), blue: parseInt("" + rgbMatched[3], 10) };
  var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
  if (rgbaMatched) return { red: parseInt("" + rgbaMatched[1], 10), green: parseInt("" + rgbaMatched[2], 10), blue: parseInt("" + rgbaMatched[3], 10), alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4]) };
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10), saturation = parseInt("" + hslMatched[2], 10) / 100, lightness = parseInt("" + hslMatched[3], 10) / 100, rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")", hslRgbMatched = rgbRegex.exec(rgbColorString);
    if (!hslRgbMatched) throw new PolishedError(4, normalizedColor, rgbColorString);
    return { red: parseInt("" + hslRgbMatched[1], 10), green: parseInt("" + hslRgbMatched[2], 10), blue: parseInt("" + hslRgbMatched[3], 10) };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10), _saturation = parseInt("" + hslaMatched[2], 10) / 100, _lightness = parseInt("" + hslaMatched[3], 10) / 100, _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")", _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    if (!_hslRgbMatched) throw new PolishedError(4, normalizedColor, _rgbColorString);
    return { red: parseInt("" + _hslRgbMatched[1], 10), green: parseInt("" + _hslRgbMatched[2], 10), blue: parseInt("" + _hslRgbMatched[3], 10), alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4]) };
  }
  throw new PolishedError(5);
}
function rgbToHsl(color) {
  var red = color.red / 255, green = color.green / 255, blue = color.blue / 255, max = Math.max(red, green, blue), min = Math.min(red, green, blue), lightness = (max + min) / 2;
  if (max === min) return color.alpha !== void 0 ? { hue: 0, saturation: 0, lightness, alpha: color.alpha } : { hue: 0, saturation: 0, lightness };
  var hue, delta = max - min, saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      hue = (red - green) / delta + 4;
      break;
  }
  return hue *= 60, color.alpha !== void 0 ? { hue, saturation, lightness, alpha: color.alpha } : { hue, saturation, lightness };
}
function parseToHsl(color) {
  return rgbToHsl(parseToRgb(color));
}
var reduceHexValue = function(value2) {
  return value2.length === 7 && value2[1] === value2[2] && value2[3] === value2[4] && value2[5] === value2[6] ? "#" + value2[1] + value2[3] + value2[5] : value2;
}, reduceHexValue$1 = reduceHexValue;
function numberToHex(value2) {
  var hex = value2.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}
function convertToHex(red, green, blue) {
  return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}
function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}
function hsl(value2, saturation, lightness) {
  if (typeof value2 == "object" && saturation === void 0 && lightness === void 0) return hslToHex(value2.hue, value2.saturation, value2.lightness);
  throw new PolishedError(1);
}
function hsla(value2, saturation, lightness, alpha) {
  if (typeof value2 == "object" && saturation === void 0 && lightness === void 0 && alpha === void 0) return value2.alpha >= 1 ? hslToHex(value2.hue, value2.saturation, value2.lightness) : "rgba(" + hslToRgb(value2.hue, value2.saturation, value2.lightness) + "," + value2.alpha + ")";
  throw new PolishedError(2);
}
function rgb(value2, green, blue) {
  if (typeof value2 == "number" && typeof green == "number" && typeof blue == "number") return reduceHexValue$1("#" + numberToHex(value2) + numberToHex(green) + numberToHex(blue));
  if (typeof value2 == "object" && green === void 0 && blue === void 0) return reduceHexValue$1("#" + numberToHex(value2.red) + numberToHex(value2.green) + numberToHex(value2.blue));
  throw new PolishedError(6);
}
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue == "string" && typeof secondValue == "number") {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else {
    if (typeof firstValue == "object" && secondValue === void 0 && thirdValue === void 0 && fourthValue === void 0) return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }
  throw new PolishedError(7);
}
var isRgb = function(color) {
  return typeof color.red == "number" && typeof color.green == "number" && typeof color.blue == "number" && (typeof color.alpha != "number" || typeof color.alpha > "u");
}, isRgba = function(color) {
  return typeof color.red == "number" && typeof color.green == "number" && typeof color.blue == "number" && typeof color.alpha == "number";
}, isHsl = function(color) {
  return typeof color.hue == "number" && typeof color.saturation == "number" && typeof color.lightness == "number" && (typeof color.alpha != "number" || typeof color.alpha > "u");
}, isHsla = function(color) {
  return typeof color.hue == "number" && typeof color.saturation == "number" && typeof color.lightness == "number" && typeof color.alpha == "number";
};
function toColorString(color) {
  if (typeof color != "object") throw new PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new PolishedError(8);
}
function curried(f2, length, acc) {
  return function() {
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f2.apply(this, combined) : curried(f2, length, combined);
  };
}
function curry(f2) {
  return curried(f2, f2.length, []);
}
function adjustHue(degree, color) {
  if (color === "transparent") return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, { hue: hslColor.hue + parseFloat(degree) }));
}
curry(adjustHue);
function guard(lowerBoundary, upperBoundary, value2) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value2));
}
function darken(amount, color) {
  if (color === "transparent") return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, { lightness: guard(0, 1, hslColor.lightness - parseFloat(amount)) }));
}
var curriedDarken = curry(darken), curriedDarken$1 = curriedDarken;
function desaturate(amount, color) {
  if (color === "transparent") return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, { saturation: guard(0, 1, hslColor.saturation - parseFloat(amount)) }));
}
curry(desaturate);
function lighten(amount, color) {
  if (color === "transparent") return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, { lightness: guard(0, 1, hslColor.lightness + parseFloat(amount)) }));
}
var curriedLighten = curry(lighten), curriedLighten$1 = curriedLighten;
function mix(weight, color, otherColor) {
  if (color === "transparent") return otherColor;
  if (otherColor === "transparent") return color;
  if (weight === 0) return otherColor;
  var parsedColor1 = parseToRgb(color), color1 = _extends({}, parsedColor1, { alpha: typeof parsedColor1.alpha == "number" ? parsedColor1.alpha : 1 }), parsedColor2 = parseToRgb(otherColor), color2 = _extends({}, parsedColor2, { alpha: typeof parsedColor2.alpha == "number" ? parsedColor2.alpha : 1 }), alphaDelta = color1.alpha - color2.alpha, x22 = parseFloat(weight) * 2 - 1, y22 = x22 * alphaDelta === -1 ? x22 : x22 + alphaDelta, z2 = 1 + x22 * alphaDelta, weight1 = (y22 / z2 + 1) / 2, weight2 = 1 - weight1, mixedColor = { red: Math.floor(color1.red * weight1 + color2.red * weight2), green: Math.floor(color1.green * weight1 + color2.green * weight2), blue: Math.floor(color1.blue * weight1 + color2.blue * weight2), alpha: color1.alpha * parseFloat(weight) + color2.alpha * (1 - parseFloat(weight)) };
  return rgba(mixedColor);
}
var curriedMix = curry(mix), mix$1 = curriedMix;
function opacify(amount, color) {
  if (color === "transparent") return color;
  var parsedColor = parseToRgb(color), alpha = typeof parsedColor.alpha == "number" ? parsedColor.alpha : 1, colorWithAlpha = _extends({}, parsedColor, { alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100) });
  return rgba(colorWithAlpha);
}
var curriedOpacify = curry(opacify), curriedOpacify$1 = curriedOpacify;
function saturate(amount, color) {
  if (color === "transparent") return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, { saturation: guard(0, 1, hslColor.saturation + parseFloat(amount)) }));
}
curry(saturate);
function setHue(hue, color) {
  return color === "transparent" ? color : toColorString(_extends({}, parseToHsl(color), { hue: parseFloat(hue) }));
}
curry(setHue);
function setLightness(lightness, color) {
  return color === "transparent" ? color : toColorString(_extends({}, parseToHsl(color), { lightness: parseFloat(lightness) }));
}
curry(setLightness);
function setSaturation(saturation, color) {
  return color === "transparent" ? color : toColorString(_extends({}, parseToHsl(color), { saturation: parseFloat(saturation) }));
}
curry(setSaturation);
function shade(percentage, color) {
  return color === "transparent" ? color : mix$1(parseFloat(percentage), "rgb(0, 0, 0)", color);
}
curry(shade);
function tint(percentage, color) {
  return color === "transparent" ? color : mix$1(parseFloat(percentage), "rgb(255, 255, 255)", color);
}
curry(tint);
function transparentize(amount, color) {
  if (color === "transparent") return color;
  var parsedColor = parseToRgb(color), alpha = typeof parsedColor.alpha == "number" ? parsedColor.alpha : 1, colorWithAlpha = _extends({}, parsedColor, { alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100) });
  return rgba(colorWithAlpha);
}
var curriedTransparentize = curry(transparentize), curriedTransparentize$1 = curriedTransparentize;
var Wrapper = xr$1.div(N$1, ({ theme }) => ({ backgroundColor: theme.base === "light" ? "rgba(0,0,0,.01)" : "rgba(255,255,255,.01)", borderRadius: theme.appBorderRadius, border: `1px dashed ${theme.appBorderColor}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, margin: "25px 0 40px", color: curriedTransparentize$1(0.3, theme.color.defaultText), fontSize: theme.typography.size.s2 })), EmptyBlock = (props) => e.createElement(Wrapper, { ...props, className: "docblock-emptyblock sb-unstyled" });
var StyledSyntaxHighlighter = xr$1(ru)(({ theme }) => ({ fontSize: `${theme.typography.size.s2 - 1}px`, lineHeight: "19px", margin: "25px 0 40px", borderRadius: theme.appBorderRadius, boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0", "pre.prismjs": { padding: 20, background: "inherit" } }));
var SourceSkeletonWrapper = xr$1.div(({ theme }) => ({ background: theme.background.content, borderRadius: theme.appBorderRadius, border: `1px solid ${theme.appBorderColor}`, boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0", margin: "25px 0 40px", padding: "20px 20px 20px 22px" })), SourceSkeletonPlaceholder = xr$1.div(({ theme }) => ({ animation: `${theme.animation.glow} 1.5s ease-in-out infinite`, background: theme.appBorderColor, height: 17, marginTop: 1, width: "60%", [`&:first-child${hf}`]: { margin: 0 } })), SourceSkeleton = () => e.createElement(SourceSkeletonWrapper, null, e.createElement(SourceSkeletonPlaceholder, null), e.createElement(SourceSkeletonPlaceholder, { style: { width: "80%" } }), e.createElement(SourceSkeletonPlaceholder, { style: { width: "30%" } }), e.createElement(SourceSkeletonPlaceholder, { style: { width: "80%" } })), Source = ({ isLoading, error, language, code, dark, format: format3 = true, ...rest }) => {
  let { typography } = St$1();
  if (isLoading) return e.createElement(SourceSkeleton, null);
  if (error) return e.createElement(EmptyBlock, null, error);
  let syntaxHighlighter = e.createElement(StyledSyntaxHighlighter, { bordered: true, copyable: true, format: format3, language: language ?? "jsx", className: "docblock-source sb-unstyled", ...rest }, code);
  if (typeof dark > "u") return syntaxHighlighter;
  let overrideTheme = dark ? Me$2.dark : Me$2.light;
  return e.createElement(Tt$1, { theme: Ir$1({ ...overrideTheme, fontCode: typography.fonts.mono, fontBase: typography.fonts.base }) }, syntaxHighlighter);
};
var toGlobalSelector = (element) => `& :where(${element}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${element}))`, breakpoint = 600, Title = xr$1.h1(N$1, ({ theme }) => ({ color: theme.color.defaultText, fontSize: theme.typography.size.m3, fontWeight: theme.typography.weight.bold, lineHeight: "32px", [`@media (min-width: ${breakpoint}px)`]: { fontSize: theme.typography.size.l1, lineHeight: "36px", marginBottom: "16px" } })), Subtitle = xr$1.h2(N$1, ({ theme }) => ({ fontWeight: theme.typography.weight.regular, fontSize: theme.typography.size.s3, lineHeight: "20px", borderBottom: "none", marginBottom: 15, [`@media (min-width: ${breakpoint}px)`]: { fontSize: theme.typography.size.m1, lineHeight: "28px", marginBottom: 24 }, color: curriedTransparentize$1(0.25, theme.color.defaultText) })), DocsContent = xr$1.div(({ theme }) => {
  let reset = { fontFamily: theme.typography.fonts.base, fontSize: theme.typography.size.s3, margin: 0, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", WebkitTapHighlightColor: "rgba(0, 0, 0, 0)", WebkitOverflowScrolling: "touch" }, headers = { margin: "20px 0 8px", padding: 0, cursor: "text", position: "relative", color: theme.color.defaultText, "&:first-of-type": { marginTop: 0, paddingTop: 0 }, "&:hover a.anchor": { textDecoration: "none" }, "& code": { fontSize: "inherit" } }, code = { lineHeight: 1, margin: "0 2px", padding: "3px 5px", whiteSpace: "nowrap", borderRadius: 3, fontSize: theme.typography.size.s2 - 1, border: theme.base === "light" ? `1px solid ${theme.color.mediumlight}` : `1px solid ${theme.color.darker}`, color: theme.base === "light" ? curriedTransparentize$1(0.1, theme.color.defaultText) : curriedTransparentize$1(0.3, theme.color.defaultText), backgroundColor: theme.base === "light" ? theme.color.lighter : theme.color.border };
  return { maxWidth: 1e3, width: "100%", minWidth: 0, [toGlobalSelector("a")]: { ...reset, fontSize: "inherit", lineHeight: "24px", color: theme.color.secondary, textDecoration: "none", "&.absent": { color: "#cc0000" }, "&.anchor": { display: "block", paddingLeft: 30, marginLeft: -30, cursor: "pointer", position: "absolute", top: 0, left: 0, bottom: 0 } }, [toGlobalSelector("blockquote")]: { ...reset, margin: "16px 0", borderLeft: `4px solid ${theme.color.medium}`, padding: "0 15px", color: theme.color.dark, "& > :first-of-type": { marginTop: 0 }, "& > :last-child": { marginBottom: 0 } }, [toGlobalSelector("div")]: reset, [toGlobalSelector("dl")]: { ...reset, margin: "16px 0", padding: 0, "& dt": { fontSize: "14px", fontWeight: "bold", fontStyle: "italic", padding: 0, margin: "16px 0 4px" }, "& dt:first-of-type": { padding: 0 }, "& dt > :first-of-type": { marginTop: 0 }, "& dt > :last-child": { marginBottom: 0 }, "& dd": { margin: "0 0 16px", padding: "0 15px" }, "& dd > :first-of-type": { marginTop: 0 }, "& dd > :last-child": { marginBottom: 0 } }, [toGlobalSelector("h1")]: { ...reset, ...headers, fontSize: `${theme.typography.size.l1}px`, fontWeight: theme.typography.weight.bold }, [toGlobalSelector("h2")]: { ...reset, ...headers, fontSize: `${theme.typography.size.m2}px`, paddingBottom: 4, borderBottom: `1px solid ${theme.appBorderColor}` }, [toGlobalSelector("h3")]: { ...reset, ...headers, fontSize: `${theme.typography.size.m1}px`, fontWeight: theme.typography.weight.bold }, [toGlobalSelector("h4")]: { ...reset, ...headers, fontSize: `${theme.typography.size.s3}px` }, [toGlobalSelector("h5")]: { ...reset, ...headers, fontSize: `${theme.typography.size.s2}px` }, [toGlobalSelector("h6")]: { ...reset, ...headers, fontSize: `${theme.typography.size.s2}px`, color: theme.color.dark }, [toGlobalSelector("hr")]: { border: "0 none", borderTop: `1px solid ${theme.appBorderColor}`, height: 4, padding: 0 }, [toGlobalSelector("img")]: { maxWidth: "100%" }, [toGlobalSelector("li")]: { ...reset, fontSize: theme.typography.size.s2, color: theme.color.defaultText, lineHeight: "24px", "& + li": { marginTop: ".25em" }, "& ul, & ol": { marginTop: ".25em", marginBottom: 0 }, "& code": code }, [toGlobalSelector("ol")]: { ...reset, margin: "16px 0", paddingLeft: 30, "& :first-of-type": { marginTop: 0 }, "& :last-child": { marginBottom: 0 } }, [toGlobalSelector("p")]: { ...reset, margin: "16px 0", fontSize: theme.typography.size.s2, lineHeight: "24px", color: theme.color.defaultText, "& code": code }, [toGlobalSelector("pre")]: { ...reset, fontFamily: theme.typography.fonts.mono, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", lineHeight: "18px", padding: "11px 1rem", whiteSpace: "pre-wrap", color: "inherit", borderRadius: 3, margin: "1rem 0", "&:not(.prismjs)": { background: "transparent", border: "none", borderRadius: 0, padding: 0, margin: 0 }, "& pre, &.prismjs": { padding: 15, margin: 0, whiteSpace: "pre-wrap", color: "inherit", fontSize: "13px", lineHeight: "19px", code: { color: "inherit", fontSize: "inherit" } }, "& code": { whiteSpace: "pre" }, "& code, & tt": { border: "none" } }, [toGlobalSelector("span")]: { ...reset, "&.frame": { display: "block", overflow: "hidden", "& > span": { border: `1px solid ${theme.color.medium}`, display: "block", float: "left", overflow: "hidden", margin: "13px 0 0", padding: 7, width: "auto" }, "& span img": { display: "block", float: "left" }, "& span span": { clear: "both", color: theme.color.darkest, display: "block", padding: "5px 0 0" } }, "&.align-center": { display: "block", overflow: "hidden", clear: "both", "& > span": { display: "block", overflow: "hidden", margin: "13px auto 0", textAlign: "center" }, "& span img": { margin: "0 auto", textAlign: "center" } }, "&.align-right": { display: "block", overflow: "hidden", clear: "both", "& > span": { display: "block", overflow: "hidden", margin: "13px 0 0", textAlign: "right" }, "& span img": { margin: 0, textAlign: "right" } }, "&.float-left": { display: "block", marginRight: 13, overflow: "hidden", float: "left", "& span": { margin: "13px 0 0" } }, "&.float-right": { display: "block", marginLeft: 13, overflow: "hidden", float: "right", "& > span": { display: "block", overflow: "hidden", margin: "13px auto 0", textAlign: "right" } } }, [toGlobalSelector("table")]: { ...reset, margin: "16px 0", fontSize: theme.typography.size.s2, lineHeight: "24px", padding: 0, borderCollapse: "collapse", "& tr": { borderTop: `1px solid ${theme.appBorderColor}`, backgroundColor: theme.appContentBg, margin: 0, padding: 0 }, "& tr:nth-of-type(2n)": { backgroundColor: theme.base === "dark" ? theme.color.darker : theme.color.lighter }, "& tr th": { fontWeight: "bold", color: theme.color.defaultText, border: `1px solid ${theme.appBorderColor}`, margin: 0, padding: "6px 13px" }, "& tr td": { border: `1px solid ${theme.appBorderColor}`, color: theme.color.defaultText, margin: 0, padding: "6px 13px" }, "& tr th :first-of-type, & tr td :first-of-type": { marginTop: 0 }, "& tr th :last-child, & tr td :last-child": { marginBottom: 0 } }, [toGlobalSelector("ul")]: { ...reset, margin: "16px 0", paddingLeft: 30, "& :first-of-type": { marginTop: 0 }, "& :last-child": { marginBottom: 0 }, listStyle: "disc" } };
}), DocsWrapper = xr$1.div(({ theme }) => ({ background: theme.background.content, display: "flex", flexDirection: "row-reverse", justifyContent: "center", padding: "4rem 20px", minHeight: "100vh", boxSizing: "border-box", gap: "3rem", [`@media (min-width: ${breakpoint}px)`]: {} })), DocsPageWrapper = ({ children, toc }) => e.createElement(DocsWrapper, { className: "sbdocs sbdocs-wrapper" }, toc, e.createElement(DocsContent, { className: "sbdocs sbdocs-content" }, children));
var getBlockBackgroundStyle = (theme) => ({ borderRadius: theme.appBorderRadius, background: theme.background.content, boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0", border: `1px solid ${theme.appBorderColor}` });
var { window: globalWindow } = globalThis, IFrame = class extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.iframe = null;
  }
  componentDidMount() {
    let { id: id2 } = this.props;
    this.iframe = globalWindow.document.getElementById(id2);
  }
  shouldComponentUpdate(nextProps) {
    let { scale } = nextProps;
    return scale !== this.props.scale && this.setIframeBodyStyle({ width: `${scale * 100}%`, height: `${scale * 100}%`, transform: `scale(${1 / scale})`, transformOrigin: "top left" }), false;
  }
  setIframeBodyStyle(style) {
    return Object.assign(this.iframe.contentDocument.body.style, style);
  }
  render() {
    let { id: id2, title, src, allowFullScreen, scale, ...rest } = this.props;
    return e.createElement("iframe", { id: id2, title, src, ...allowFullScreen ? { allow: "fullscreen" } : {}, loading: "lazy", ...rest });
  }
};
var ZoomContext = reactExports.createContext({ scale: 1 });
var { PREVIEW_URL } = globalThis, BASE_URL = PREVIEW_URL || "iframe.html", storyBlockIdFromId = ({ story, primary }) => `story--${story.id}${primary ? "--primary" : ""}`, InlineStory = (props) => {
  let storyRef = reactExports.useRef(), [showLoader, setShowLoader] = reactExports.useState(true), [error, setError] = reactExports.useState(), { story, height, autoplay, forceInitialArgs, renderStoryToElement } = props;
  return reactExports.useEffect(() => {
    if (!(story && storyRef.current)) return () => {
    };
    let element = storyRef.current, cleanup = renderStoryToElement(story, element, { showMain: () => {
    }, showError: ({ title, description }) => setError(new Error(`${title} - ${description}`)), showException: (err) => setError(err) }, { autoplay, forceInitialArgs });
    return setShowLoader(false), () => {
      Promise.resolve().then(() => cleanup());
    };
  }, [autoplay, renderStoryToElement, story]), error ? e.createElement("pre", null, e.createElement(m7, { error })) : e.createElement(e.Fragment, null, height ? e.createElement("style", null, `#${storyBlockIdFromId(props)} { min-height: ${height}; transform: translateZ(0); overflow: auto }`) : null, showLoader && e.createElement(StorySkeleton, null), e.createElement("div", { ref: storyRef, id: `${storyBlockIdFromId(props)}-inner`, "data-name": story.name }));
}, IFrameStory = ({ story, height = "500px" }) => e.createElement("div", { style: { width: "100%", height } }, e.createElement(ZoomContext.Consumer, null, ({ scale }) => e.createElement(IFrame, { key: "iframe", id: `iframe--${story.id}`, title: story.name, src: ow(BASE_URL, story.id, { viewMode: "story" }), allowFullScreen: true, scale, style: { width: "100%", height: "100%", border: "0 none" } }))), ErrorMessage = xr$1.strong(({ theme }) => ({ color: theme.color.orange })), Story = (props) => {
  let { inline, story } = props;
  return inline && !props.autoplay && story.usesMount ? e.createElement(ErrorMessage, null, "This story mounts inside of play. Set", " ", e.createElement("a", { href: "https://storybook.js.org/docs/api/doc-blocks/doc-block-story#autoplay" }, "autoplay"), " ", "to true to view this story.") : e.createElement("div", { id: storyBlockIdFromId(props), className: "sb-story sb-unstyled", "data-story-block": "true" }, inline ? e.createElement(InlineStory, { ...props }) : e.createElement(IFrameStory, { ...props }));
}, StorySkeleton = () => e.createElement(Q6, null);
var Bar = xr$1(Bo)({ position: "absolute", left: 0, right: 0, top: 0, transition: "transform .2s linear" }), Wrapper2 = xr$1.div({ display: "flex", alignItems: "center", gap: 4 }), IconPlaceholder = xr$1.div(({ theme }) => ({ width: 14, height: 14, borderRadius: 2, margin: "0 7px", backgroundColor: theme.appBorderColor, animation: `${theme.animation.glow} 1.5s ease-in-out infinite` })), Toolbar = ({ isLoading, storyId, baseUrl, zoom, resetZoom, ...rest }) => e.createElement(Bar, { ...rest }, e.createElement(Wrapper2, { key: "left" }, isLoading ? [1, 2, 3].map((key) => e.createElement(IconPlaceholder, { key })) : e.createElement(e.Fragment, null, e.createElement(wo, { key: "zoomin", onClick: (e23) => {
  e23.preventDefault(), zoom(0.8);
}, title: "Zoom in" }, e.createElement(ZoomIcon, null)), e.createElement(wo, { key: "zoomout", onClick: (e23) => {
  e23.preventDefault(), zoom(1.25);
}, title: "Zoom out" }, e.createElement(ZoomOutIcon, null)), e.createElement(wo, { key: "zoomreset", onClick: (e23) => {
  e23.preventDefault(), resetZoom();
}, title: "Reset zoom" }, e.createElement(ZoomResetIcon, null)))));
var ChildrenContainer = xr$1.div(({ isColumn, columns, layout }) => ({ display: isColumn || !columns ? "block" : "flex", position: "relative", flexWrap: "wrap", overflow: "auto", flexDirection: isColumn ? "column" : "row", "& .innerZoomElementWrapper > *": isColumn ? { width: layout !== "fullscreen" ? "calc(100% - 20px)" : "100%", display: "block" } : { maxWidth: layout !== "fullscreen" ? "calc(100% - 20px)" : "100%", display: "inline-block" } }), ({ layout = "padded", inline }) => layout === "centered" || layout === "padded" ? { padding: inline ? "32px 22px" : "0px", "& .innerZoomElementWrapper > *": { width: "auto", border: "8px solid transparent!important" } } : {}, ({ layout = "padded", inline }) => layout === "centered" && inline ? { display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" } : {}, ({ columns }) => columns && columns > 1 ? { ".innerZoomElementWrapper > *": { minWidth: `calc(100% / ${columns} - 20px)` } } : {}), StyledSource = xr$1(Source)(({ theme }) => ({ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: theme.appBorderRadius, borderBottomRightRadius: theme.appBorderRadius, border: "none", background: theme.base === "light" ? "rgba(0, 0, 0, 0.85)" : curriedDarken$1(0.05, theme.background.content), color: theme.color.lightest, button: { background: theme.base === "light" ? "rgba(0, 0, 0, 0.85)" : curriedDarken$1(0.05, theme.background.content) } })), PreviewContainer = xr$1.div(({ theme, withSource, isExpanded }) => ({ position: "relative", overflow: "hidden", margin: "25px 0 40px", ...getBlockBackgroundStyle(theme), borderBottomLeftRadius: withSource && isExpanded && 0, borderBottomRightRadius: withSource && isExpanded && 0, borderBottomWidth: isExpanded && 0, "h3 + &": { marginTop: "16px" } }), ({ withToolbar }) => withToolbar && { paddingTop: 40 }), getSource = (withSource, expanded, setExpanded) => {
  switch (true) {
    case !!(withSource && withSource.error):
      return { source: null, actionItem: { title: "No code available", className: "docblock-code-toggle docblock-code-toggle--disabled", disabled: true, onClick: () => setExpanded(false) } };
    case expanded:
      return { source: e.createElement(StyledSource, { ...withSource, dark: true }), actionItem: { title: "Hide code", className: "docblock-code-toggle docblock-code-toggle--expanded", onClick: () => setExpanded(false) } };
    default:
      return { source: e.createElement(StyledSource, { ...withSource, dark: true }), actionItem: { title: "Show code", className: "docblock-code-toggle", onClick: () => setExpanded(true) } };
  }
};
function getStoryId(children) {
  if (reactExports.Children.count(children) === 1) {
    let elt = children;
    if (elt.props) return elt.props.id;
  }
  return null;
}
var PositionedToolbar = xr$1(Toolbar)({ position: "absolute", top: 0, left: 0, right: 0, height: 40 }), Relative = xr$1.div({ overflow: "hidden", position: "relative" }), Preview = ({ isLoading, isColumn, columns, children, withSource, withToolbar = false, isExpanded = false, additionalActions, className, layout = "padded", inline = false, ...props }) => {
  let [expanded, setExpanded] = reactExports.useState(isExpanded), { source, actionItem } = getSource(withSource, expanded, setExpanded), [scale, setScale] = reactExports.useState(1), previewClasses = [className].concat(["sbdocs", "sbdocs-preview", "sb-unstyled"]), defaultActionItems = withSource ? [actionItem] : [], [additionalActionItems, setAdditionalActionItems] = reactExports.useState(additionalActions ? [...additionalActions] : []), actionItems = [...defaultActionItems, ...additionalActionItems], { window: globalWindow4 } = globalThis, copyToClipboard = reactExports.useCallback(async (text) => {
    let { createCopyToClipboardFunction } = await __vitePreload(() => Promise.resolve().then(() => index), true ? void 0 : void 0, import.meta.url);
    createCopyToClipboardFunction();
  }, []), onCopyCapture = (e23) => {
    let selection = globalWindow4.getSelection();
    selection && selection.type === "Range" || (e23.preventDefault(), additionalActionItems.filter((item) => item.title === "Copied").length === 0 && copyToClipboard(source?.props.code ?? "").then(() => {
      setAdditionalActionItems([...additionalActionItems, { title: "Copied", onClick: () => {
      } }]), globalWindow4.setTimeout(() => setAdditionalActionItems(additionalActionItems.filter((item) => item.title !== "Copied")), 1500);
    }));
  };
  return e.createElement(PreviewContainer, { withSource, withToolbar, ...props, className: previewClasses.join(" ") }, withToolbar && e.createElement(PositionedToolbar, { isLoading, border: true, zoom: (z2) => setScale(scale * z2), resetZoom: () => setScale(1), storyId: getStoryId(children), baseUrl: "./iframe.html" }), e.createElement(ZoomContext.Provider, { value: { scale } }, e.createElement(Relative, { className: "docs-story", onCopyCapture: withSource && onCopyCapture }, e.createElement(ChildrenContainer, { isColumn: isColumn || !Array.isArray(children), columns, layout, inline }, e.createElement(a7.Element, { centered: layout === "centered", scale: inline ? scale : 1 }, Array.isArray(children) ? children.map((child, i22) => e.createElement("div", { key: i22 }, child)) : e.createElement("div", null, children))), e.createElement($a, { actionItems }))), withSource && expanded && source);
};
xr$1(Preview)(() => ({ ".docs-story": { paddingTop: 32, paddingBottom: 40 } }));
var TabbedArgsTable = ({ tabs, ...props }) => {
  let entries = Object.entries(tabs);
  return entries.length === 1 ? e.createElement(ArgsTable, { ...entries[0][1], ...props }) : e.createElement(ml, null, entries.map((entry, index2) => {
    let [label, table] = entry, id2 = `prop_table_div_${label}`, Component4 = "div", argsTableProps = index2 === 0 ? props : { sort: props.sort };
    return e.createElement(Component4, { key: id2, id: id2, title: label }, ({ active }) => active ? e.createElement(ArgsTable, { key: `prop_table_${label}`, ...table, ...argsTableProps }) : null);
  }));
};
xr$1.div(({ theme }) => ({ marginRight: 30, fontSize: `${theme.typography.size.s1}px`, color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText) }));
xr$1.div({ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" });
xr$1.div({ display: "flex", flexDirection: "row", alignItems: "baseline", "&:not(:last-child)": { marginBottom: "1rem" } });
xr$1.div(N$1, ({ theme }) => ({ ...getBlockBackgroundStyle(theme), margin: "25px 0 40px", padding: "30px 20px" }));
xr$1.div(({ theme }) => ({ fontWeight: theme.typography.weight.bold, color: theme.color.defaultText }));
xr$1.div(({ theme }) => ({ color: theme.base === "light" ? curriedTransparentize$1(0.2, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText) }));
xr$1.div({ flex: "0 0 30%", lineHeight: "20px", marginTop: 5 });
xr$1.div(({ theme }) => ({ flex: 1, textAlign: "center", fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.size.s1, lineHeight: 1, overflow: "hidden", color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText), "> div": { display: "inline-block", overflow: "hidden", maxWidth: "100%", textOverflow: "ellipsis" }, span: { display: "block", marginTop: 2 } }));
xr$1.div({ display: "flex", flexDirection: "row" });
xr$1.div(({ background }) => ({ position: "relative", flex: 1, "&::before": { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background, content: '""' } }));
xr$1.div(({ theme }) => ({ ...getBlockBackgroundStyle(theme), display: "flex", flexDirection: "row", height: 50, marginBottom: 5, overflow: "hidden", backgroundColor: "white", backgroundImage: "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)", backgroundClip: "padding-box" }));
xr$1.div({ display: "flex", flexDirection: "column", flex: 1, position: "relative", marginBottom: 30 });
xr$1.div({ flex: 1, display: "flex", flexDirection: "row" });
xr$1.div({ display: "flex", alignItems: "flex-start" });
xr$1.div({ flex: "0 0 30%" });
xr$1.div({ flex: 1 });
xr$1.div(({ theme }) => ({ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: 20, fontWeight: theme.typography.weight.bold, color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText) }));
xr$1.div(({ theme }) => ({ fontSize: theme.typography.size.s2, lineHeight: "20px", display: "flex", flexDirection: "column" }));
xr$1.div(({ theme }) => ({ fontFamily: theme.typography.fonts.base, fontSize: theme.typography.size.s1, color: theme.color.defaultText, marginLeft: 10, lineHeight: 1.2, display: "-webkit-box", overflow: "hidden", wordBreak: "break-word", textOverflow: "ellipsis", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }));
xr$1.div(({ theme }) => ({ ...getBlockBackgroundStyle(theme), overflow: "hidden", height: 40, width: 40, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", "> img, > svg": { width: 20, height: 20 } }));
xr$1.div({ display: "inline-flex", flexDirection: "row", alignItems: "center", width: "100%" });
xr$1.div({ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gridGap: "8px 16px", gridAutoFlow: "row dense", gridAutoRows: 50 });
function build_html_default(options) {
  let forEach = [].forEach, some = [].some, body = typeof window < "u" && document.body, SPACE_CHAR = " ", tocElement, currentlyHighlighting = true, eventCount = 0;
  function createEl(d22, container) {
    let link = container.appendChild(createLink(d22));
    if (d22.children.length) {
      let list = createList(d22.isCollapsed);
      d22.children.forEach((child) => {
        createEl(child, list);
      }), link.appendChild(list);
    }
  }
  function render(parent, data) {
    let container = createList(false);
    if (data.forEach((d22) => {
      createEl(d22, container);
    }), tocElement = parent || tocElement, tocElement !== null) return tocElement.firstChild && tocElement.removeChild(tocElement.firstChild), data.length === 0 ? tocElement : tocElement.appendChild(container);
  }
  function createLink(data) {
    let item = document.createElement("li"), a22 = document.createElement("a");
    return options.listItemClass && item.setAttribute("class", options.listItemClass), options.onClick && (a22.onclick = options.onClick), options.includeTitleTags && a22.setAttribute("title", data.textContent), options.includeHtml && data.childNodes.length ? forEach.call(data.childNodes, (node) => {
      a22.appendChild(node.cloneNode(true));
    }) : a22.textContent = data.textContent, a22.setAttribute("href", `${options.basePath}#${data.id}`), a22.setAttribute("class", `${options.linkClass + SPACE_CHAR}node-name--${data.nodeName}${SPACE_CHAR}${options.extraLinkClasses}`), item.appendChild(a22), item;
  }
  function createList(isCollapsed) {
    let listElement = options.orderedList ? "ol" : "ul", list = document.createElement(listElement), classes = options.listClass + SPACE_CHAR + options.extraListClasses;
    return isCollapsed && (classes = classes + SPACE_CHAR + options.collapsibleClass, classes = classes + SPACE_CHAR + options.isCollapsedClass), list.setAttribute("class", classes), list;
  }
  function updateFixedSidebarClass() {
    let scrollTop = getScrollTop(), posFixedEl = document.querySelector(options.positionFixedSelector);
    options.fixedSidebarOffset === "auto" && (options.fixedSidebarOffset = tocElement.offsetTop), scrollTop > options.fixedSidebarOffset ? posFixedEl.className.indexOf(options.positionFixedClass) === -1 && (posFixedEl.className += SPACE_CHAR + options.positionFixedClass) : posFixedEl.className = posFixedEl.className.replace(SPACE_CHAR + options.positionFixedClass, "");
  }
  function getHeadingTopPos(obj) {
    let position = 0;
    return obj !== null && (position = obj.offsetTop, options.hasInnerContainers && (position += getHeadingTopPos(obj.offsetParent))), position;
  }
  function updateClassname(obj, className) {
    return obj && obj.className !== className && (obj.className = className), obj;
  }
  function updateToc(headingsArray, event) {
    options.positionFixedSelector && updateFixedSidebarClass();
    let headings = headingsArray, clickedHref = event?.target?.getAttribute ? event?.target?.getAttribute("href") : null, isBottomMode = clickedHref && clickedHref.charAt(0) === "#" ? getIsHeaderBottomMode(clickedHref.replace("#", "")) : false, shouldUpdate = currentlyHighlighting || isBottomMode;
    if (event && eventCount < 5 && eventCount++, shouldUpdate && tocElement && headings.length > 0) {
      let topHeader = getTopHeader(headings), oldActiveTocLink = tocElement.querySelector(`.${options.activeLinkClass}`), topHeaderId = topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1"), hashId = window.location.hash.replace("#", ""), activeId = topHeaderId, isPageBottomMode = getIsPageBottomMode();
      clickedHref && isBottomMode ? activeId = clickedHref.replace("#", "") : hashId && hashId !== topHeaderId && isPageBottomMode && (getIsHeaderBottomMode(topHeaderId) || eventCount <= 2) && (activeId = hashId);
      let activeTocLink = tocElement.querySelector(`.${options.linkClass}[href="${options.basePath}#${activeId}"]`);
      if (oldActiveTocLink === activeTocLink) return;
      let tocLinks = tocElement.querySelectorAll(`.${options.linkClass}`);
      forEach.call(tocLinks, (tocLink) => {
        updateClassname(tocLink, tocLink.className.replace(SPACE_CHAR + options.activeLinkClass, ""));
      });
      let tocLis = tocElement.querySelectorAll(`.${options.listItemClass}`);
      forEach.call(tocLis, (tocLi) => {
        updateClassname(tocLi, tocLi.className.replace(SPACE_CHAR + options.activeListItemClass, ""));
      }), activeTocLink && activeTocLink.className.indexOf(options.activeLinkClass) === -1 && (activeTocLink.className += SPACE_CHAR + options.activeLinkClass);
      let li2 = activeTocLink?.parentNode;
      li2 && li2.className.indexOf(options.activeListItemClass) === -1 && (li2.className += SPACE_CHAR + options.activeListItemClass);
      let tocLists = tocElement.querySelectorAll(`.${options.listClass}.${options.collapsibleClass}`);
      forEach.call(tocLists, (list) => {
        list.className.indexOf(options.isCollapsedClass) === -1 && (list.className += SPACE_CHAR + options.isCollapsedClass);
      }), activeTocLink?.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1 && updateClassname(activeTocLink.nextSibling, activeTocLink.nextSibling.className.replace(SPACE_CHAR + options.isCollapsedClass, "")), removeCollapsedFromParents(activeTocLink?.parentNode.parentNode);
    }
  }
  function removeCollapsedFromParents(element) {
    return element && element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1 ? (updateClassname(element, element.className.replace(SPACE_CHAR + options.isCollapsedClass, "")), removeCollapsedFromParents(element.parentNode.parentNode)) : element;
  }
  function disableTocAnimation(event) {
    let target = event.target || event.srcElement;
    typeof target.className != "string" || target.className.indexOf(options.linkClass) === -1 || (currentlyHighlighting = false);
  }
  function enableTocAnimation() {
    currentlyHighlighting = true;
  }
  function getCurrentlyHighlighting() {
    return currentlyHighlighting;
  }
  function getIsHeaderBottomMode(headerId) {
    let scrollEl = getScrollEl();
    return (document?.getElementById(headerId)).offsetTop > scrollEl.offsetHeight - scrollEl.clientHeight * 1.4 - options.bottomModeThreshold;
  }
  function getIsPageBottomMode() {
    let scrollEl = getScrollEl(), isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight, isBottomMode = getScrollTop() + scrollEl.clientHeight > scrollEl.offsetHeight - options.bottomModeThreshold;
    return isScrollable && isBottomMode;
  }
  function getScrollEl() {
    let el2;
    return options.scrollContainer && document.querySelector(options.scrollContainer) ? el2 = document.querySelector(options.scrollContainer) : el2 = document.documentElement || body, el2;
  }
  function getScrollTop() {
    return getScrollEl()?.scrollTop || 0;
  }
  function getTopHeader(headings, scrollTop = getScrollTop()) {
    let topHeader;
    return some.call(headings, (heading, i22) => {
      if (getHeadingTopPos(heading) > scrollTop + options.headingsOffset + 10) {
        let index2 = i22 === 0 ? i22 : i22 - 1;
        return topHeader = headings[index2], true;
      }
      if (i22 === headings.length - 1) return topHeader = headings[headings.length - 1], true;
    }), topHeader;
  }
  function updateUrlHashForHeader(headingsArray) {
    let scrollTop = getScrollTop(), topHeader = getTopHeader(headingsArray, scrollTop), isPageBottomMode = getIsPageBottomMode();
    if ((!topHeader || scrollTop < 5) && !isPageBottomMode) window.location.hash === "#" || window.location.hash === "" || window.history.pushState(null, null, "#");
    else if (topHeader && !isPageBottomMode) {
      let newHash = `#${topHeader.id}`;
      window.location.hash !== newHash && window.history.pushState(null, null, newHash);
    }
  }
  return { enableTocAnimation, disableTocAnimation, render, updateToc, getCurrentlyHighlighting, getTopHeader, getScrollTop, updateUrlHashForHeader };
}
var default_options_default = { tocSelector: ".js-toc", tocElement: null, contentSelector: ".js-toc-content", contentElement: null, headingSelector: "h1, h2, h3", ignoreSelector: ".js-toc-ignore", hasInnerContainers: false, linkClass: "toc-link", extraLinkClasses: "", activeLinkClass: "is-active-link", listClass: "toc-list", extraListClasses: "", isCollapsedClass: "is-collapsed", collapsibleClass: "is-collapsible", listItemClass: "toc-list-item", activeListItemClass: "is-active-li", collapseDepth: 0, scrollSmooth: true, scrollSmoothDuration: 420, scrollSmoothOffset: 0, scrollEndCallback: function(e23) {
}, headingsOffset: 1, enableUrlHashUpdateOnScroll: false, scrollHandlerType: "auto", scrollHandlerTimeout: 50, throttleTimeout: 50, positionFixedSelector: null, positionFixedClass: "is-position-fixed", fixedSidebarOffset: "auto", includeHtml: false, includeTitleTags: false, onClick: function(e23) {
}, orderedList: true, scrollContainer: null, skipRendering: false, headingLabelCallback: false, ignoreHiddenElements: false, headingObjectCallback: null, basePath: "", disableTocScrollSync: false, tocScrollingWrapper: null, tocScrollOffset: 30, bottomModeThreshold: 30 };
function parseContent(options) {
  let reduce = [].reduce;
  function getLastItem(array2) {
    return array2[array2.length - 1];
  }
  function getHeadingLevel(heading) {
    return +heading.nodeName.toUpperCase().replace("H", "");
  }
  function isHTMLElement(maybeElement) {
    try {
      return maybeElement instanceof window.HTMLElement || maybeElement instanceof window.parent.HTMLElement;
    } catch {
      return maybeElement instanceof window.HTMLElement;
    }
  }
  function getHeadingObject(heading) {
    if (!isHTMLElement(heading)) return heading;
    if (options.ignoreHiddenElements && (!heading.offsetHeight || !heading.offsetParent)) return null;
    let headingLabel = heading.getAttribute("data-heading-label") || (options.headingLabelCallback ? String(options.headingLabelCallback(heading.innerText)) : (heading.innerText || heading.textContent).trim()), obj = { id: heading.id, children: [], nodeName: heading.nodeName, headingLevel: getHeadingLevel(heading), textContent: headingLabel };
    return options.includeHtml && (obj.childNodes = heading.childNodes), options.headingObjectCallback ? options.headingObjectCallback(obj, heading) : obj;
  }
  function addNode(node, nest) {
    let obj = getHeadingObject(node), level = obj.headingLevel, array2 = nest, lastItem = getLastItem(array2), lastItemLevel = lastItem ? lastItem.headingLevel : 0, counter = level - lastItemLevel;
    for (; counter > 0 && (lastItem = getLastItem(array2), !(lastItem && level === lastItem.headingLevel)); ) lastItem && lastItem.children !== void 0 && (array2 = lastItem.children), counter--;
    return level >= options.collapseDepth && (obj.isCollapsed = true), array2.push(obj), array2;
  }
  function selectHeadings(contentElement, headingSelector) {
    let selectors = headingSelector;
    options.ignoreSelector && (selectors = headingSelector.split(",").map(function(selector) {
      return `${selector.trim()}:not(${options.ignoreSelector})`;
    }));
    try {
      return contentElement.querySelectorAll(selectors);
    } catch {
      return console.warn(`Headers not found with selector: ${selectors}`), null;
    }
  }
  function nestHeadingsArray(headingsArray) {
    return reduce.call(headingsArray, function(prev, curr) {
      let currentHeading = getHeadingObject(curr);
      return currentHeading && addNode(currentHeading, prev.nest), prev;
    }, { nest: [] });
  }
  return { nestHeadingsArray, selectHeadings };
}
function initSmoothScrolling(options) {
  var duration = options.duration, offset = options.offset;
  if (typeof window > "u" || typeof location > "u") return;
  var pageUrl = location.hash ? stripHash(location.href) : location.href;
  delegatedLinkHijacking();
  function delegatedLinkHijacking() {
    document.body.addEventListener("click", onClick, false);
    function onClick(e23) {
      !isInPageLink(e23.target) || e23.target.className.indexOf("no-smooth-scroll") > -1 || e23.target.href.charAt(e23.target.href.length - 2) === "#" && e23.target.href.charAt(e23.target.href.length - 1) === "!" || e23.target.className.indexOf(options.linkClass) === -1 || jump(e23.target.hash, { duration, offset, callback: function() {
        setFocus(e23.target.hash);
      } });
    }
  }
  function isInPageLink(n22) {
    return n22.tagName.toLowerCase() === "a" && (n22.hash.length > 0 || n22.href.charAt(n22.href.length - 1) === "#") && (stripHash(n22.href) === pageUrl || stripHash(n22.href) + "#" === pageUrl);
  }
  function stripHash(url) {
    return url.slice(0, url.lastIndexOf("#"));
  }
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));
    element && (/^(?:a|select|input|button|textarea)$/i.test(element.tagName) || (element.tabIndex = -1), element.focus());
  }
}
function jump(target, options) {
  var start = window.pageYOffset, opt = { duration: options.duration, offset: options.offset || 0, callback: options.callback, easing: options.easing || easeInOutQuad }, tgt = document.querySelector('[id="' + decodeURI(target).split("#").join("") + '"]') || document.querySelector('[id="' + target.split("#").join("") + '"]'), distance = typeof target == "string" ? opt.offset + (target ? tgt && tgt.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : target, duration = typeof opt.duration == "function" ? opt.duration(distance) : opt.duration, timeStart, timeElapsed;
  requestAnimationFrame(function(time) {
    timeStart = time, loop(time);
  });
  function loop(time) {
    timeElapsed = time - timeStart, window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration)), timeElapsed < duration ? requestAnimationFrame(loop) : end();
  }
  function end() {
    window.scrollTo(0, start + distance), typeof opt.callback == "function" && opt.callback();
  }
  function easeInOutQuad(t22, b22, c2, d22) {
    return t22 /= d22 / 2, t22 < 1 ? c2 / 2 * t22 * t22 + b22 : (t22--, -c2 / 2 * (t22 * (t22 - 2) - 1) + b22);
  }
}
function updateTocScroll(options) {
  let toc = options.tocScrollingWrapper || options.tocElement || document.querySelector(options.tocSelector);
  if (toc && toc.scrollHeight > toc.clientHeight) {
    let activeItem = toc.querySelector(`.${options.activeListItemClass}`);
    if (activeItem) {
      let scrollAmount = activeItem.offsetTop - options.tocScrollOffset;
      toc.scrollTop = scrollAmount > 0 ? scrollAmount : 0;
    }
  }
}
var _options = {}, _buildHtml, _parseContent, _headingsArray, _scrollListener, clickListener;
function init(customOptions) {
  let hasInitialized = false;
  _options = extend(default_options_default, customOptions || {}), _options.scrollSmooth && (_options.duration = _options.scrollSmoothDuration, _options.offset = _options.scrollSmoothOffset, initSmoothScrolling(_options)), _buildHtml = build_html_default(_options), _parseContent = parseContent(_options), destroy();
  let contentElement = getContentElement(_options);
  if (contentElement === null) return;
  let tocElement = getTocElement(_options);
  if (tocElement === null || (_headingsArray = _parseContent.selectHeadings(contentElement, _options.headingSelector), _headingsArray === null)) return;
  let nestedHeadings = _parseContent.nestHeadingsArray(_headingsArray).nest;
  if (!_options.skipRendering) _buildHtml.render(tocElement, nestedHeadings);
  else return this;
  let isClick = false, scrollHandlerTimeout = _options.scrollHandlerTimeout || _options.throttleTimeout;
  _scrollListener = ((fn2, delay) => getScrollHandler(fn2, delay, _options.scrollHandlerType))((e23) => {
    _buildHtml.updateToc(_headingsArray, e23), !_options.disableTocScrollSync && !isClick && updateTocScroll(_options), _options.enableUrlHashUpdateOnScroll && hasInitialized && _buildHtml.getCurrentlyHighlighting() && _buildHtml.updateUrlHashForHeader(_headingsArray);
    let isTop = e23?.target?.scrollingElement?.scrollTop === 0;
    (e23 && (e23.eventPhase === 0 || e23.currentTarget === null) || isTop) && (_buildHtml.updateToc(_headingsArray), _options.scrollEndCallback?.(e23));
  }, scrollHandlerTimeout), hasInitialized || (_scrollListener(), hasInitialized = true), window.onhashchange = window.onscrollend = (e23) => {
    _scrollListener(e23);
  }, _options.scrollContainer && document.querySelector(_options.scrollContainer) ? (document.querySelector(_options.scrollContainer).addEventListener("scroll", _scrollListener, false), document.querySelector(_options.scrollContainer).addEventListener("resize", _scrollListener, false)) : (document.addEventListener("scroll", _scrollListener, false), document.addEventListener("resize", _scrollListener, false));
  let timeout = null;
  clickListener = throttle((event) => {
    isClick = true, _options.scrollSmooth && _buildHtml.disableTocAnimation(event), _buildHtml.updateToc(_headingsArray, event), timeout && clearTimeout(timeout), timeout = setTimeout(() => {
      _buildHtml.enableTocAnimation();
    }, _options.scrollSmoothDuration), setTimeout(() => {
      isClick = false;
    }, _options.scrollSmoothDuration + 100);
  }, _options.throttleTimeout), _options.scrollContainer && document.querySelector(_options.scrollContainer) ? document.querySelector(_options.scrollContainer).addEventListener("click", clickListener, false) : document.addEventListener("click", clickListener, false);
}
function destroy() {
  let tocElement = getTocElement(_options);
  tocElement !== null && (_options.skipRendering || tocElement && (tocElement.innerHTML = ""), _options.scrollContainer && document.querySelector(_options.scrollContainer) ? (document.querySelector(_options.scrollContainer).removeEventListener("scroll", _scrollListener, false), document.querySelector(_options.scrollContainer).removeEventListener("resize", _scrollListener, false), _buildHtml && document.querySelector(_options.scrollContainer).removeEventListener("click", clickListener, false)) : (document.removeEventListener("scroll", _scrollListener, false), document.removeEventListener("resize", _scrollListener, false), _buildHtml && document.removeEventListener("click", clickListener, false)));
}
function refresh(customOptions) {
  destroy(), init(customOptions || _options);
}
var hasOwnProp = Object.prototype.hasOwnProperty;
function extend(...args) {
  let target = {};
  for (let i22 = 0; i22 < args.length; i22++) {
    let source = args[i22];
    for (let key in source) hasOwnProp.call(source, key) && (target[key] = source[key]);
  }
  return target;
}
function throttle(fn2, threshold, scope) {
  threshold || (threshold = 250);
  let last, deferTimer;
  return function(...args) {
    let context = this, now = +/* @__PURE__ */ new Date();
    last && now < last + threshold ? (clearTimeout(deferTimer), deferTimer = setTimeout(() => {
      last = now, fn2.apply(context, args);
    }, threshold)) : (last = now, fn2.apply(context, args));
  };
}
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout), timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function getScrollHandler(func, timeout, type = "auto") {
  switch (type) {
    case "debounce":
      return debounce(func, timeout);
    case "throttle":
      return throttle(func, timeout);
    default:
      return timeout < 334 ? debounce(func, timeout) : throttle(func, timeout);
  }
}
function getContentElement(options) {
  try {
    return options.contentElement || document.querySelector(options.contentSelector);
  } catch {
    return console.warn(`Contents element not found: ${options.contentSelector}`), null;
  }
}
function getTocElement(options) {
  try {
    return options.tocElement || document.querySelector(options.tocSelector);
  } catch {
    return console.warn(`TOC element not found: ${options.tocSelector}`), null;
  }
}
var tocbot = { destroy, init, refresh };
var tocbot_default = tocbot;
var Aside = xr$1.aside(() => ({ width: "10rem", "@media (max-width: 768px)": { display: "none" } })), Nav = xr$1.nav(({ theme }) => ({ position: "fixed", bottom: 0, top: 0, width: "10rem", paddingTop: "4rem", paddingBottom: "2rem", overflowY: "auto", fontFamily: theme.typography.fonts.base, fontSize: theme.typography.size.s2, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", WebkitTapHighlightColor: "rgba(0, 0, 0, 0)", WebkitOverflowScrolling: "touch", "& *": { boxSizing: "border-box" }, "& > .toc-wrapper > .toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${theme.color.mediumlight}`, ".toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${theme.color.mediumlight}`, ".toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${theme.color.mediumlight}` } } }, "& .toc-list-item": { position: "relative", listStyleType: "none", marginLeft: 20, paddingTop: 3, paddingBottom: 3 }, "& .toc-list-item::before": { content: '""', position: "absolute", height: "100%", top: 0, left: 0, transform: "translateX(calc(-2px - 20px))", borderLeft: `solid 2px ${theme.color.mediumdark}`, opacity: 0, transition: "opacity 0.2s" }, "& .toc-list-item.is-active-li::before": { opacity: 1 }, "& .toc-list-item > a": { color: theme.color.defaultText, textDecoration: "none" }, "& .toc-list-item.is-active-li > a": { fontWeight: 600, color: theme.color.secondary, textDecoration: "none" } })), Heading = xr$1.p(({ theme }) => ({ fontWeight: 600, fontSize: "0.875em", color: theme.textColor, textTransform: "uppercase", marginBottom: 10 })), Title2 = ({ headingId, title }) => typeof title == "string" || !title ? e.createElement(Heading, { as: "h2", id: headingId, className: title ? "" : "sb-sr-only" }, title || "Table of contents") : e.createElement("div", { id: headingId }, title), TableOfContents = ({ title, disable, headingSelector, contentsSelector, ignoreSelector, unsafeTocbotOptions, channel, className }) => {
  reactExports.useEffect(() => {
    if (disable) return () => {
    };
    let configuration = { tocSelector: ".toc-wrapper", contentSelector: contentsSelector ?? ".sbdocs-content", headingSelector: headingSelector ?? "h3", ignoreSelector: ignoreSelector ?? ".docs-story *, .skip-toc", headingsOffset: 40, scrollSmoothOffset: -40, orderedList: false, onClick: (e23) => {
      if (e23.preventDefault(), e23.currentTarget instanceof HTMLAnchorElement) {
        let [, headerId] = e23.currentTarget.href.split("#");
        headerId && channel.emit(NAVIGATE_URL, `#${headerId}`);
      }
    }, ...unsafeTocbotOptions }, timeout = setTimeout(() => tocbot_default.init(configuration), 100);
    return () => {
      clearTimeout(timeout), tocbot_default.destroy();
    };
  }, [channel, disable, ignoreSelector, contentsSelector, headingSelector, unsafeTocbotOptions]);
  let headingId = reactExports.useId();
  return e.createElement(Aside, { className }, disable ? null : e.createElement(Nav, { "aria-labelledby": headingId }, e.createElement(Title2, { headingId, title }), e.createElement("div", { className: "toc-wrapper" })));
};
function t() {
  return t = Object.assign ? Object.assign.bind() : function(e23) {
    for (var t22 = 1; t22 < arguments.length; t22++) {
      var n22 = arguments[t22];
      for (var r22 in n22) Object.prototype.hasOwnProperty.call(n22, r22) && (e23[r22] = n22[r22]);
    }
    return e23;
  }, t.apply(this, arguments);
}
var n = ["children", "options"], r = { blockQuote: "0", breakLine: "1", breakThematic: "2", codeBlock: "3", codeFenced: "4", codeInline: "5", footnote: "6", footnoteReference: "7", gfmTask: "8", heading: "9", headingSetext: "10", htmlBlock: "11", htmlComment: "12", htmlSelfClosing: "13", image: "14", link: "15", linkAngleBraceStyleDetector: "16", linkBareUrlDetector: "17", linkMailtoDetector: "18", newlineCoalescer: "19", orderedList: "20", paragraph: "21", ref: "22", refImage: "23", refLink: "24", table: "25", text: "27", textBolded: "28", textEmphasized: "29", textEscaped: "30", textMarked: "31", textStrikethroughed: "32", unorderedList: "33" }, i;
(function(e23) {
  e23[e23.MAX = 0] = "MAX", e23[e23.HIGH = 1] = "HIGH", e23[e23.MED = 2] = "MED", e23[e23.LOW = 3] = "LOW", e23[e23.MIN = 4] = "MIN";
})(i || (i = {}));
var l = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e23, t22) => (e23[t22.toLowerCase()] = t22, e23), { class: "className", for: "htmlFor" }), o = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, a = ["style", "script"], c = ["src", "href", "data", "formAction", "srcDoc", "action"], s = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, d = /mailto:/i, u = /\n{2,}$/, p = /^(\s*>[\s\S]*?)(?=\n\n|$)/, f = /^ *> ?/gm, h = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, m = /^ {2,}\n/, g = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, y = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, k = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, x = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/, b = /^(?:\n *)*\n/, v = /\r\n?/g, C = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, $ = /^\[\^([^\]]+)]/, S = /\f/g, w = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, E = /^\s*?\[(x|\s)\]/, z = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, L = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, A = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, O = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, T = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, B = /^<!--[\s\S]*?(?:-->)/, M = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, R = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, I = /^\{.*\}$/, D = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, U = /^<([^ >]+@[^ >]+)>/, N = /^<([^ >]+:\/[^ >]+)>/, j = /-([a-z])?/gi, H = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, P = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, _ = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, F = /^\[([^\]]*)\] ?\[([^\]]*)\]/, W = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, G = /\t/g, Z = /(^ *\||\| *$)/g, q = /^ *:-+: *$/, Q = /^ *:-+ *$/, V = /^ *-+: *$/, X = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)", J = new RegExp(`^([*_])\\1${X}\\1\\1(?!\\1)`), K = new RegExp(`^([*_])${X}\\1(?!\\1)`), Y = new RegExp(`^(==)${X}\\1`), ee = new RegExp(`^(~~)${X}\\1`), te = /^\\([^0-9A-Za-z\s])/, ne = /\\([^0-9A-Za-z\s])/g, re = /^([\s\S](?:(?!  |[0-9]\.)[^=*_~\-\n<`\\\[!])*)/, ie = /^\n+/, le = /^([ \t]*)/, oe = /\\([^\\])/g, ae = /(?:^|\n)( *)$/, ce = "(?:\\d+\\.)", se = "(?:[*+-])";
function de(e23) {
  return "( *)(" + (e23 === 1 ? ce : se) + ") +";
}
var ue = de(1), pe = de(2);
function fe(e23) {
  return new RegExp("^" + (e23 === 1 ? ue : pe));
}
var he = fe(1), me = fe(2);
function ge(e23) {
  return new RegExp("^" + (e23 === 1 ? ue : pe) + "[^\\n]*(?:\\n(?!\\1" + (e23 === 1 ? ce : se) + " )[^\\n]*)*(\\n|$)", "gm");
}
var ye = ge(1), ke = ge(2);
function xe(e23) {
  let t22 = e23 === 1 ? ce : se;
  return new RegExp("^( *)(" + t22 + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t22 + " (?!" + t22 + " ))\\n*|\\s*\\n*$)");
}
var be = xe(1), ve = xe(2);
function Ce(e23, t22) {
  let n22 = t22 === 1, i22 = n22 ? be : ve, l2 = n22 ? ye : ke, o22 = n22 ? he : me;
  return { match: Me(function(e32, t32) {
    let n32 = ae.exec(t32.prevCapture);
    return n32 && (t32.list || !t32.inline && !t32.simple) ? i22.exec(e32 = n32[1] + e32) : null;
  }), order: 1, parse(e32, t32, r22) {
    let i32 = n22 ? +e32[2] : void 0, a22 = e32[0].replace(u, `
`).match(l2), c2 = false;
    return { items: a22.map(function(e4, n32) {
      let i4 = o22.exec(e4)[0].length, l32 = new RegExp("^ {1," + i4 + "}", "gm"), s2 = e4.replace(l32, "").replace(o22, ""), d22 = n32 === a22.length - 1, u2 = s2.indexOf(`

`) !== -1 || d22 && c2;
      c2 = u2;
      let p22 = r22.inline, f2 = r22.list, h22;
      r22.list = true, u2 ? (r22.inline = false, h22 = ze(s2) + `

`) : (r22.inline = true, h22 = ze(s2));
      let m22 = t32(h22, r22);
      return r22.inline = p22, r22.list = f2, m22;
    }), ordered: n22, start: i32 };
  }, render: (t32, n32, i32) => e23(t32.ordered ? "ol" : "ul", { key: i32.key, start: t32.type === r.orderedList ? t32.start : void 0 }, t32.items.map(function(t4, r22) {
    return e23("li", { key: r22 }, n32(t4, i32));
  })) };
}
var $e = new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), Se = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, we = [p, y, k, z, A, L, H, be, ve], Ee = [...we, /^[^\n]+(?:  \n|\n{2,})/, O, B, R];
function ze(e23) {
  let t22 = e23.length;
  for (; t22 > 0 && e23[t22 - 1] <= " "; ) t22--;
  return e23.slice(0, t22);
}
function Le(e23) {
  return e23.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Ae(e23) {
  return V.test(e23) ? "right" : q.test(e23) ? "center" : Q.test(e23) ? "left" : null;
}
function Oe(e23, t22, n22, r22) {
  let i22 = n22.inTable;
  n22.inTable = true;
  let l2 = [[]], o22 = "";
  function a22() {
    if (!o22) return;
    let e32 = l2[l2.length - 1];
    e32.push.apply(e32, t22(o22, n22)), o22 = "";
  }
  return e23.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((e32, t32, n32) => {
    e32.trim() === "|" && (a22(), r22) ? t32 !== 0 && t32 !== n32.length - 1 && l2.push([]) : o22 += e32;
  }), a22(), n22.inTable = i22, l2;
}
function Te(e23, t22, n22) {
  n22.inline = true;
  let i22 = e23[2] ? e23[2].replace(Z, "").split("|").map(Ae) : [], l2 = e23[3] ? function(e32, t32, n32) {
    return e32.trim().split(`
`).map(function(e4) {
      return Oe(e4, t32, n32, true);
    });
  }(e23[3], t22, n22) : [], o22 = Oe(e23[1], t22, n22, !!l2.length);
  return n22.inline = false, l2.length ? { align: i22, cells: l2, header: o22, type: r.table } : { children: o22, type: r.paragraph };
}
function Be(e23, t22) {
  return e23.align[t22] == null ? {} : { textAlign: e23.align[t22] };
}
function Me(e23) {
  return e23.inline = 1, e23;
}
function Re(e23) {
  return Me(function(t22, n22) {
    return n22.inline ? e23.exec(t22) : null;
  });
}
function Ie(e23) {
  return Me(function(t22, n22) {
    return n22.inline || n22.simple ? e23.exec(t22) : null;
  });
}
function De(e23) {
  return function(t22, n22) {
    return n22.inline || n22.simple ? null : e23.exec(t22);
  };
}
function Ue(e23) {
  return Me(function(t22) {
    return e23.exec(t22);
  });
}
function Ne(e23, t22) {
  if (t22.inline || t22.simple) return null;
  let n22 = "";
  e23.split(`
`).every((e32) => (e32 += `
`, !we.some((t32) => t32.test(e32)) && (n22 += e32, !!e32.trim())));
  let r22 = ze(n22);
  return r22 == "" ? null : [n22, , r22];
}
var je = /(javascript|vbscript|data(?!:image)):/i;
function He(e23) {
  try {
    let t22 = decodeURIComponent(e23).replace(/[^A-Za-z0-9/:]/g, "");
    if (je.test(t22)) return null;
  } catch {
    return null;
  }
  return e23;
}
function Pe(e23) {
  return e23.replace(oe, "$1");
}
function _e(e23, t22, n22) {
  let r22 = n22.inline || false, i22 = n22.simple || false;
  n22.inline = true, n22.simple = true;
  let l2 = e23(t22, n22);
  return n22.inline = r22, n22.simple = i22, l2;
}
function Fe(e23, t22, n22) {
  let r22 = n22.inline || false, i22 = n22.simple || false;
  n22.inline = false, n22.simple = true;
  let l2 = e23(t22, n22);
  return n22.inline = r22, n22.simple = i22, l2;
}
function We(e23, t22, n22) {
  let r22 = n22.inline || false;
  n22.inline = false;
  let i22 = e23(t22, n22);
  return n22.inline = r22, i22;
}
var Ge = (e23, t22, n22) => ({ children: _e(t22, e23[2], n22) });
function Ze() {
  return {};
}
function qe() {
  return null;
}
function Qe(...e23) {
  return e23.filter(Boolean).join(" ");
}
function Ve(e23, t22, n22) {
  let r22 = e23, i22 = t22.split(".");
  for (; i22.length && (r22 = r22[i22[0]], r22 !== void 0); ) i22.shift();
  return r22 || n22;
}
function Xe(n22 = "", i22 = {}) {
  function u2(e23, n32, ...r22) {
    let l2 = Ve(i22.overrides, `${e23}.props`, {});
    return i22.createElement(function(e32, t22) {
      let n4 = Ve(t22, e32);
      return n4 ? typeof n4 == "function" || typeof n4 == "object" && "render" in n4 ? n4 : Ve(t22, `${e32}.component`, e32) : e32;
    }(e23, i22.overrides), t({}, n32, l2, { className: Qe(n32?.className, l2.className) || void 0 }), ...r22);
  }
  function Z2(e23) {
    e23 = e23.replace(w, "");
    let t22 = false;
    i22.forceInline ? t22 = true : i22.forceBlock || (t22 = W.test(e23) === false);
    let n32 = ae2(oe2(t22 ? e23 : `${ze(e23).replace(ie, "")}

`, { inline: t22 }));
    for (; typeof n32[n32.length - 1] == "string" && !n32[n32.length - 1].trim(); ) n32.pop();
    if (i22.wrapper === null) return n32;
    let r22 = i22.wrapper || (t22 ? "span" : "div"), l2;
    if (n32.length > 1 || i22.forceWrapper) l2 = n32;
    else {
      if (n32.length === 1) return l2 = n32[0], typeof l2 == "string" ? u2("span", { key: "outer" }, l2) : l2;
      l2 = null;
    }
    return i22.createElement(r22, { key: "outer" }, l2);
  }
  function q2(e23, t22) {
    let n32 = t22.match(s);
    return n32 ? n32.reduce(function(t32, n4) {
      let r22 = n4.indexOf("=");
      if (r22 !== -1) {
        let o22 = function(e32) {
          return e32.indexOf("-") !== -1 && e32.match(M) === null && (e32 = e32.replace(j, function(e4, t4) {
            return t4.toUpperCase();
          })), e32;
        }(n4.slice(0, r22)).trim(), a22 = function(e32) {
          let t4 = e32[0];
          return (t4 === '"' || t4 === "'") && e32.length >= 2 && e32[e32.length - 1] === t4 ? e32.slice(1, -1) : e32;
        }(n4.slice(r22 + 1).trim()), s2 = l[o22] || o22;
        if (s2 === "ref") return t32;
        let d22 = t32[s2] = function(e32, t4, n52, r32) {
          return t4 === "style" ? function(e4) {
            let t52 = [], n6 = "", r4 = false, i32 = false, l2 = "";
            if (!e4) return t52;
            for (let o4 = 0; o4 < e4.length; o4++) {
              let a32 = e4[o4];
              if (a32 !== '"' && a32 !== "'" || r4 || (i32 ? a32 === l2 && (i32 = false, l2 = "") : (i32 = true, l2 = a32)), a32 === "(" && n6.endsWith("url") ? r4 = true : a32 === ")" && r4 && (r4 = false), a32 !== ";" || i32 || r4) n6 += a32;
              else {
                let e5 = n6.trim();
                if (e5) {
                  let n72 = e5.indexOf(":");
                  if (n72 > 0) {
                    let r5 = e5.slice(0, n72).trim(), i4 = e5.slice(n72 + 1).trim();
                    t52.push([r5, i4]);
                  }
                }
                n6 = "";
              }
            }
            let o32 = n6.trim();
            if (o32) {
              let e5 = o32.indexOf(":");
              if (e5 > 0) {
                let n72 = o32.slice(0, e5).trim(), r5 = o32.slice(e5 + 1).trim();
                t52.push([n72, r5]);
              }
            }
            return t52;
          }(n52).reduce(function(t52, [n6, i32]) {
            return t52[n6.replace(/(-[a-z])/g, (e4) => e4[1].toUpperCase())] = r32(i32, e32, n6), t52;
          }, {}) : c.indexOf(t4) !== -1 ? r32(n52, e32, t4) : (n52.match(I) && (n52 = n52.slice(1, n52.length - 1)), n52 === "true" || n52 !== "false" && n52);
        }(e23, o22, a22, i22.sanitizer);
        typeof d22 == "string" && (O.test(d22) || R.test(d22)) && (t32[s2] = Z2(d22.trim()));
      } else n4 !== "style" && (t32[l[n4] || n4] = true);
      return t32;
    }, {}) : null;
  }
  i22.overrides = i22.overrides || {}, i22.sanitizer = i22.sanitizer || He, i22.slugify = i22.slugify || Le, i22.namedCodesToUnicode = i22.namedCodesToUnicode ? t({}, o, i22.namedCodesToUnicode) : o, i22.createElement = i22.createElement || reactExports.createElement;
  let Q2 = [], V2 = {}, X2 = { [r.blockQuote]: { match: De(p), order: 1, parse(e23, t22, n32) {
    let [, r22, i32] = e23[0].replace(f, "").match(h);
    return { alert: r22, children: t22(i32, n32) };
  }, render(e23, t22, n32) {
    let l2 = { key: n32.key };
    return e23.alert && (l2.className = "markdown-alert-" + i22.slugify(e23.alert.toLowerCase(), Le), e23.children.unshift({ attrs: {}, children: [{ type: r.text, text: e23.alert }], noInnerParse: true, type: r.htmlBlock, tag: "header" })), u2("blockquote", l2, t22(e23.children, n32));
  } }, [r.breakLine]: { match: Ue(m), order: 1, parse: Ze, render: (e23, t22, n32) => u2("br", { key: n32.key }) }, [r.breakThematic]: { match: De(g), order: 1, parse: Ze, render: (e23, t22, n32) => u2("hr", { key: n32.key }) }, [r.codeBlock]: { match: De(k), order: 0, parse: (e23) => ({ lang: void 0, text: ze(e23[0].replace(/^ {4}/gm, "")).replace(ne, "$1") }), render: (e23, n32, r22) => u2("pre", { key: r22.key }, u2("code", t({}, e23.attrs, { className: e23.lang ? `lang-${e23.lang}` : "" }), e23.text)) }, [r.codeFenced]: { match: De(y), order: 0, parse: (e23) => ({ attrs: q2("code", e23[3] || ""), lang: e23[2] || void 0, text: e23[4], type: r.codeBlock }) }, [r.codeInline]: { match: Ie(x), order: 3, parse: (e23) => ({ text: e23[2].replace(ne, "$1") }), render: (e23, t22, n32) => u2("code", { key: n32.key }, e23.text) }, [r.footnote]: { match: De(C), order: 0, parse: (e23) => (Q2.push({ footnote: e23[2], identifier: e23[1] }), {}), render: qe }, [r.footnoteReference]: { match: Re($), order: 1, parse: (e23) => ({ target: `#${i22.slugify(e23[1], Le)}`, text: e23[1] }), render: (e23, t22, n32) => u2("a", { key: n32.key, href: i22.sanitizer(e23.target, "a", "href") }, u2("sup", { key: n32.key }, e23.text)) }, [r.gfmTask]: { match: Re(E), order: 1, parse: (e23) => ({ completed: e23[1].toLowerCase() === "x" }), render: (e23, t22, n32) => u2("input", { checked: e23.completed, key: n32.key, readOnly: true, type: "checkbox" }) }, [r.heading]: { match: De(i22.enforceAtxHeadings ? L : z), order: 1, parse: (e23, t22, n32) => ({ children: _e(t22, e23[2], n32), id: i22.slugify(e23[2], Le), level: e23[1].length }), render: (e23, t22, n32) => u2(`h${e23.level}`, { id: e23.id, key: n32.key }, t22(e23.children, n32)) }, [r.headingSetext]: { match: De(A), order: 0, parse: (e23, t22, n32) => ({ children: _e(t22, e23[1], n32), level: e23[2] === "=" ? 1 : 2, type: r.heading }) }, [r.htmlBlock]: { match: Ue(O), order: 1, parse(e23, t22, n32) {
    let [, r22] = e23[3].match(le), i32 = new RegExp(`^${r22}`, "gm"), l2 = e23[3].replace(i32, ""), o22 = (c2 = l2, Ee.some((e32) => e32.test(c2)) ? We : _e);
    var c2;
    let s2 = e23[1].toLowerCase(), d22 = a.indexOf(s2) !== -1, u32 = (d22 ? s2 : e23[1]).trim(), p22 = { attrs: q2(u32, e23[2]), noInnerParse: d22, tag: u32 };
    return n32.inAnchor = n32.inAnchor || s2 === "a", d22 ? p22.text = e23[3] : p22.children = o22(t22, l2, n32), n32.inAnchor = false, p22;
  }, render: (e23, n32, r22) => u2(e23.tag, t({ key: r22.key }, e23.attrs), e23.text || (e23.children ? n32(e23.children, r22) : "")) }, [r.htmlSelfClosing]: { match: Ue(R), order: 1, parse(e23) {
    let t22 = e23[1].trim();
    return { attrs: q2(t22, e23[2] || ""), tag: t22 };
  }, render: (e23, n32, r22) => u2(e23.tag, t({}, e23.attrs, { key: r22.key })) }, [r.htmlComment]: { match: Ue(B), order: 1, parse: () => ({}), render: qe }, [r.image]: { match: Ie(Se), order: 1, parse: (e23) => ({ alt: e23[1], target: Pe(e23[2]), title: e23[3] }), render: (e23, t22, n32) => u2("img", { key: n32.key, alt: e23.alt || void 0, title: e23.title || void 0, src: i22.sanitizer(e23.target, "img", "src") }) }, [r.link]: { match: Re($e), order: 3, parse: (e23, t22, n32) => ({ children: Fe(t22, e23[1], n32), target: Pe(e23[2]), title: e23[3] }), render: (e23, t22, n32) => u2("a", { key: n32.key, href: i22.sanitizer(e23.target, "a", "href"), title: e23.title }, t22(e23.children, n32)) }, [r.linkAngleBraceStyleDetector]: { match: Re(N), order: 0, parse: (e23) => ({ children: [{ text: e23[1], type: r.text }], target: e23[1], type: r.link }) }, [r.linkBareUrlDetector]: { match: Me((e23, t22) => t22.inAnchor || i22.disableAutoLink ? null : Re(D)(e23, t22)), order: 0, parse: (e23) => ({ children: [{ text: e23[1], type: r.text }], target: e23[1], title: void 0, type: r.link }) }, [r.linkMailtoDetector]: { match: Re(U), order: 0, parse(e23) {
    let t22 = e23[1], n32 = e23[1];
    return d.test(n32) || (n32 = "mailto:" + n32), { children: [{ text: t22.replace("mailto:", ""), type: r.text }], target: n32, type: r.link };
  } }, [r.orderedList]: Ce(u2, 1), [r.unorderedList]: Ce(u2, 2), [r.newlineCoalescer]: { match: De(b), order: 3, parse: Ze, render: () => `
` }, [r.paragraph]: { match: Me(Ne), order: 3, parse: Ge, render: (e23, t22, n32) => u2("p", { key: n32.key }, t22(e23.children, n32)) }, [r.ref]: { match: Re(P), order: 0, parse: (e23) => (V2[e23[1]] = { target: e23[2], title: e23[4] }, {}), render: qe }, [r.refImage]: { match: Ie(_), order: 0, parse: (e23) => ({ alt: e23[1] || void 0, ref: e23[2] }), render: (e23, t22, n32) => V2[e23.ref] ? u2("img", { key: n32.key, alt: e23.alt, src: i22.sanitizer(V2[e23.ref].target, "img", "src"), title: V2[e23.ref].title }) : null }, [r.refLink]: { match: Re(F), order: 0, parse: (e23, t22, n32) => ({ children: t22(e23[1], n32), fallbackChildren: e23[0], ref: e23[2] }), render: (e23, t22, n32) => V2[e23.ref] ? u2("a", { key: n32.key, href: i22.sanitizer(V2[e23.ref].target, "a", "href"), title: V2[e23.ref].title }, t22(e23.children, n32)) : u2("span", { key: n32.key }, e23.fallbackChildren) }, [r.table]: { match: De(H), order: 1, parse: Te, render(e23, t22, n32) {
    let r22 = e23;
    return u2("table", { key: n32.key }, u2("thead", null, u2("tr", null, r22.header.map(function(e32, i32) {
      return u2("th", { key: i32, style: Be(r22, i32) }, t22(e32, n32));
    }))), u2("tbody", null, r22.cells.map(function(e32, i32) {
      return u2("tr", { key: i32 }, e32.map(function(e4, i4) {
        return u2("td", { key: i4, style: Be(r22, i4) }, t22(e4, n32));
      }));
    })));
  } }, [r.text]: { match: Ue(re), order: 4, parse: (e23) => ({ text: e23[0].replace(T, (e32, t22) => i22.namedCodesToUnicode[t22] ? i22.namedCodesToUnicode[t22] : e32) }), render: (e23) => e23.text }, [r.textBolded]: { match: Ie(J), order: 2, parse: (e23, t22, n32) => ({ children: t22(e23[2], n32) }), render: (e23, t22, n32) => u2("strong", { key: n32.key }, t22(e23.children, n32)) }, [r.textEmphasized]: { match: Ie(K), order: 3, parse: (e23, t22, n32) => ({ children: t22(e23[2], n32) }), render: (e23, t22, n32) => u2("em", { key: n32.key }, t22(e23.children, n32)) }, [r.textEscaped]: { match: Ie(te), order: 1, parse: (e23) => ({ text: e23[1], type: r.text }) }, [r.textMarked]: { match: Ie(Y), order: 3, parse: Ge, render: (e23, t22, n32) => u2("mark", { key: n32.key }, t22(e23.children, n32)) }, [r.textStrikethroughed]: { match: Ie(ee), order: 3, parse: Ge, render: (e23, t22, n32) => u2("del", { key: n32.key }, t22(e23.children, n32)) } };
  i22.disableParsingRawHTML === true && (delete X2[r.htmlBlock], delete X2[r.htmlSelfClosing]);
  let oe2 = function(e23) {
    let t22 = Object.keys(e23);
    function n32(r22, i32) {
      let l2, o22, a22 = [], c2 = "", s2 = "";
      for (i32.prevCapture = i32.prevCapture || ""; r22; ) {
        let d22 = 0;
        for (; d22 < t22.length; ) {
          if (c2 = t22[d22], l2 = e23[c2], i32.inline && !l2.match.inline) {
            d22++;
            continue;
          }
          let u32 = l2.match(r22, i32);
          if (u32) {
            s2 = u32[0], i32.prevCapture += s2, r22 = r22.substring(s2.length), o22 = l2.parse(u32, n32, i32), o22.type == null && (o22.type = c2), a22.push(o22);
            break;
          }
          d22++;
        }
      }
      return i32.prevCapture = "", a22;
    }
    return t22.sort(function(t32, n4) {
      let r22 = e23[t32].order, i32 = e23[n4].order;
      return r22 !== i32 ? r22 - i32 : t32 < n4 ? -1 : 1;
    }), function(e32, t32) {
      return n32(function(e4) {
        return e4.replace(v, `
`).replace(S, "").replace(G, "    ");
      }(e32), t32);
    };
  }(X2), ae2 = (ce2 = /* @__PURE__ */ function(e23, t22) {
    return function(n32, r22, i32) {
      let l2 = e23[n32.type].render;
      return t22 ? t22(() => l2(n32, r22, i32), n32, r22, i32) : l2(n32, r22, i32);
    };
  }(X2, i22.renderRule), function e23(t22, n32 = {}) {
    if (Array.isArray(t22)) {
      let r22 = n32.key, i32 = [], l2 = false;
      for (let r32 = 0; r32 < t22.length; r32++) {
        n32.key = r32;
        let o22 = e23(t22[r32], n32), a22 = typeof o22 == "string";
        a22 && l2 ? i32[i32.length - 1] += o22 : o22 !== null && i32.push(o22), l2 = a22;
      }
      return n32.key = r22, i32;
    }
    return ce2(t22, e23, n32);
  });
  var ce2;
  let se2 = Z2(n22);
  return Q2.length ? u2("div", null, se2, u2("footer", { key: "footer" }, Q2.map(function(e23) {
    return u2("div", { id: i22.slugify(e23.identifier, Le), key: e23.identifier }, e23.identifier, ae2(oe2(e23.footnote, { inline: true })));
  }))) : se2;
}
var index_modern_default = (t22) => {
  let { children: r22 = "", options: i22 } = t22, l2 = function(e23, t32) {
    if (e23 == null) return {};
    var n22, r32, i32 = {}, l32 = Object.keys(e23);
    for (r32 = 0; r32 < l32.length; r32++) t32.indexOf(n22 = l32[r32]) >= 0 || (i32[n22] = e23[n22]);
    return i32;
  }(t22, n);
  return reactExports.cloneElement(Xe(r22, i22), l2);
};
var Label2 = xr$1.label(({ theme }) => ({ lineHeight: "18px", alignItems: "center", marginBottom: 8, display: "inline-block", position: "relative", whiteSpace: "nowrap", background: theme.boolean.background, borderRadius: "3em", padding: 1, '&[aria-disabled="true"]': { opacity: 0.5, input: { cursor: "not-allowed" } }, input: { appearance: "none", width: "100%", height: "100%", position: "absolute", left: 0, top: 0, margin: 0, padding: 0, border: "none", background: "transparent", cursor: "pointer", borderRadius: "3em", "&:focus": { outline: "none", boxShadow: `${theme.color.secondary} 0 0 0 1px inset !important` } }, span: { textAlign: "center", fontSize: theme.typography.size.s1, fontWeight: theme.typography.weight.bold, lineHeight: "1", cursor: "pointer", display: "inline-block", padding: "7px 15px", transition: "all 100ms ease-out", userSelect: "none", borderRadius: "3em", color: curriedTransparentize$1(0.5, theme.color.defaultText), background: "transparent", "&:hover": { boxShadow: `${curriedOpacify$1(0.3, theme.appBorderColor)} 0 0 0 1px inset` }, "&:active": { boxShadow: `${curriedOpacify$1(0.05, theme.appBorderColor)} 0 0 0 2px inset`, color: curriedOpacify$1(1, theme.appBorderColor) }, "&:first-of-type": { paddingRight: 8 }, "&:last-of-type": { paddingLeft: 8 } }, "input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type": { background: theme.boolean.selectedBackground, boxShadow: theme.base === "light" ? `${curriedOpacify$1(0.1, theme.appBorderColor)} 0 0 2px` : `${theme.appBorderColor} 0 0 0 1px`, color: theme.color.defaultText, padding: "7px 15px" } })), parse = (value2) => value2 === "true", BooleanControl = ({ name, value: value2, onChange, onBlur, onFocus, argType }) => {
  let onSetFalse = reactExports.useCallback(() => onChange(false), [onChange]), readonly = !!argType?.table?.readonly;
  if (value2 === void 0) return e.createElement(Ir, { variant: "outline", size: "medium", id: getControlSetterButtonId(name), onClick: onSetFalse, disabled: readonly }, "Set boolean");
  let controlId = getControlId(name), parsedValue = typeof value2 == "string" ? parse(value2) : value2;
  return e.createElement(Label2, { "aria-disabled": readonly, htmlFor: controlId, "aria-label": name }, e.createElement("input", { id: controlId, type: "checkbox", onChange: (e23) => onChange(e23.target.checked), checked: parsedValue, role: "switch", disabled: readonly, name, onBlur, onFocus }), e.createElement("span", { "aria-hidden": "true" }, "False"), e.createElement("span", { "aria-hidden": "true" }, "True"));
};
var parseDate = (value2) => {
  let [year, month, day] = value2.split("-"), result = /* @__PURE__ */ new Date();
  return result.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)), result;
}, parseTime = (value2) => {
  let [hours, minutes] = value2.split(":"), result = /* @__PURE__ */ new Date();
  return result.setHours(parseInt(hours, 10)), result.setMinutes(parseInt(minutes, 10)), result;
}, formatDate = (value2) => {
  let date = new Date(value2), year = `000${date.getFullYear()}`.slice(-4), month = `0${date.getMonth() + 1}`.slice(-2), day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}, formatTime = (value2) => {
  let date = new Date(value2), hours = `0${date.getHours()}`.slice(-2), minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
}, FormInput = xr$1(N7.Input)(({ readOnly }) => ({ opacity: readOnly ? 0.5 : 1 })), FlexSpaced = xr$1.div(({ theme }) => ({ flex: 1, display: "flex", input: { marginLeft: 10, flex: 1, height: 32, "&::-webkit-calendar-picker-indicator": { opacity: 0.5, height: 12, filter: theme.base === "light" ? void 0 : "invert(1)" } }, "input:first-of-type": { marginLeft: 0, flexGrow: 4 }, "input:last-of-type": { flexGrow: 3 } })), DateControl = ({ name, value: value2, onChange, onFocus, onBlur, argType }) => {
  let [valid, setValid] = reactExports.useState(true), dateRef = reactExports.useRef(), timeRef = reactExports.useRef(), readonly = !!argType?.table?.readonly;
  reactExports.useEffect(() => {
    valid !== false && (dateRef && dateRef.current && (dateRef.current.value = value2 ? formatDate(value2) : ""), timeRef && timeRef.current && (timeRef.current.value = value2 ? formatTime(value2) : ""));
  }, [value2]);
  let onDateChange = (e23) => {
    if (!e23.target.value) return onChange();
    let parsed = parseDate(e23.target.value), result = new Date(value2 ?? "");
    result.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    let time = result.getTime();
    time && onChange(time), setValid(!!time);
  }, onTimeChange = (e23) => {
    if (!e23.target.value) return onChange();
    let parsed = parseTime(e23.target.value), result = new Date(value2 ?? "");
    result.setHours(parsed.getHours()), result.setMinutes(parsed.getMinutes());
    let time = result.getTime();
    time && onChange(time), setValid(!!time);
  }, controlId = getControlId(name);
  return e.createElement(FlexSpaced, null, e.createElement(FormInput, { type: "date", max: "9999-12-31", ref: dateRef, id: `${controlId}-date`, name: `${controlId}-date`, readOnly: readonly, onChange: onDateChange, onFocus, onBlur }), e.createElement(FormInput, { type: "time", id: `${controlId}-time`, name: `${controlId}-time`, ref: timeRef, onChange: onTimeChange, readOnly: readonly, onFocus, onBlur }), valid ? null : e.createElement("div", null, "invalid"));
};
var Wrapper4 = xr$1.label({ display: "flex" }), parse2 = (value2) => {
  let result = parseFloat(value2);
  return Number.isNaN(result) ? void 0 : result;
}, FormInput2 = xr$1(N7.Input)(({ readOnly }) => ({ opacity: readOnly ? 0.5 : 1 })), NumberControl = ({ name, value: value2, onChange, min, max, step, onBlur, onFocus, argType }) => {
  let [inputValue, setInputValue] = reactExports.useState(typeof value2 == "number" ? value2 : ""), [forceVisible, setForceVisible] = reactExports.useState(false), [parseError, setParseError] = reactExports.useState(null), readonly = !!argType?.table?.readonly, handleChange = reactExports.useCallback((event) => {
    setInputValue(event.target.value);
    let result = parseFloat(event.target.value);
    Number.isNaN(result) ? setParseError(new Error(`'${event.target.value}' is not a number`)) : (onChange(result), setParseError(null));
  }, [onChange, setParseError]), onForceVisible = reactExports.useCallback(() => {
    setInputValue("0"), onChange(0), setForceVisible(true);
  }, [setForceVisible]), htmlElRef = reactExports.useRef(null);
  return reactExports.useEffect(() => {
    forceVisible && htmlElRef.current && htmlElRef.current.select();
  }, [forceVisible]), reactExports.useEffect(() => {
    let newInputValue = typeof value2 == "number" ? value2 : "";
    inputValue !== newInputValue && setInputValue(newInputValue);
  }, [value2]), value2 === void 0 ? e.createElement(Ir, { variant: "outline", size: "medium", id: getControlSetterButtonId(name), onClick: onForceVisible, disabled: readonly }, "Set number") : e.createElement(Wrapper4, null, e.createElement(FormInput2, { ref: htmlElRef, id: getControlId(name), type: "number", onChange: handleChange, size: "flex", placeholder: "Edit number...", value: inputValue, valid: parseError ? "error" : void 0, autoFocus: forceVisible, readOnly: readonly, name, min, max, step, onFocus, onBlur }));
};
var selectedKey = (value2, options) => {
  let entry = options && Object.entries(options).find(([_key, val]) => val === value2);
  return entry ? entry[0] : void 0;
}, selectedKeys = (value2, options) => value2 && options ? Object.entries(options).filter((entry) => value2.includes(entry[1])).map((entry) => entry[0]) : [], selectedValues = (keys, options) => keys && options && keys.map((key) => options[key]);
var Wrapper5 = xr$1.div(({ isInline }) => isInline ? { display: "flex", flexWrap: "wrap", alignItems: "flex-start", label: { display: "inline-flex", marginRight: 15 } } : { label: { display: "flex" } }, (props) => {
  if (props["aria-readonly"] === "true") return { input: { cursor: "not-allowed" } };
}), Text = xr$1.span({ "[aria-readonly=true] &": { opacity: 0.5 } }), Label3 = xr$1.label({ lineHeight: "20px", alignItems: "center", marginBottom: 8, "&:last-child": { marginBottom: 0 }, input: { margin: 0, marginRight: 6 } }), CheckboxControl = ({ name, options, value: value2, onChange, isInline, argType }) => {
  if (!options) return logger.warn(`Checkbox with no options: ${name}`), e.createElement(e.Fragment, null, "-");
  let initial = selectedKeys(value2 || [], options), [selected, setSelected] = reactExports.useState(initial), readonly = !!argType?.table?.readonly, handleChange = (e23) => {
    let option = e23.target.value, updated = [...selected];
    updated.includes(option) ? updated.splice(updated.indexOf(option), 1) : updated.push(option), onChange(selectedValues(updated, options)), setSelected(updated);
  };
  reactExports.useEffect(() => {
    setSelected(selectedKeys(value2 || [], options));
  }, [value2]);
  let controlId = getControlId(name);
  return e.createElement(Wrapper5, { "aria-readonly": readonly, isInline }, Object.keys(options).map((key, index2) => {
    let id2 = `${controlId}-${index2}`;
    return e.createElement(Label3, { key: id2, htmlFor: id2 }, e.createElement("input", { type: "checkbox", disabled: readonly, id: id2, name: id2, value: key, onChange: handleChange, checked: selected?.includes(key) }), e.createElement(Text, null, key));
  }));
};
var Wrapper6 = xr$1.div(({ isInline }) => isInline ? { display: "flex", flexWrap: "wrap", alignItems: "flex-start", label: { display: "inline-flex", marginRight: 15 } } : { label: { display: "flex" } }, (props) => {
  if (props["aria-readonly"] === "true") return { input: { cursor: "not-allowed" } };
}), Text2 = xr$1.span({ "[aria-readonly=true] &": { opacity: 0.5 } }), Label4 = xr$1.label({ lineHeight: "20px", alignItems: "center", marginBottom: 8, "&:last-child": { marginBottom: 0 }, input: { margin: 0, marginRight: 6 } }), RadioControl = ({ name, options, value: value2, onChange, isInline, argType }) => {
  if (!options) return logger.warn(`Radio with no options: ${name}`), e.createElement(e.Fragment, null, "-");
  let selection = selectedKey(value2, options), controlId = getControlId(name), readonly = !!argType?.table?.readonly;
  return e.createElement(Wrapper6, { "aria-readonly": readonly, isInline }, Object.keys(options).map((key, index2) => {
    let id2 = `${controlId}-${index2}`;
    return e.createElement(Label4, { key: id2, htmlFor: id2 }, e.createElement("input", { type: "radio", id: id2, name: controlId, disabled: readonly, value: key, onChange: (e23) => onChange(options[e23.currentTarget.value]), checked: key === selection }), e.createElement(Text2, null, key));
  }));
};
var styleResets = { appearance: "none", border: "0 none", boxSizing: "inherit", display: " block", margin: " 0", background: "transparent", padding: 0, fontSize: "inherit", position: "relative" }, OptionsSelect = xr$1.select(styleResets, ({ theme }) => ({ boxSizing: "border-box", position: "relative", padding: "6px 10px", width: "100%", color: theme.input.color || "inherit", background: theme.input.background, borderRadius: theme.input.borderRadius, boxShadow: `${theme.input.border} 0 0 0 1px inset`, fontSize: theme.typography.size.s2 - 1, lineHeight: "20px", "&:focus": { boxShadow: `${theme.color.secondary} 0 0 0 1px inset`, outline: "none" }, "&[disabled]": { cursor: "not-allowed", opacity: 0.5 }, "::placeholder": { color: theme.textMutedColor }, "&[multiple]": { overflow: "auto", padding: 0, option: { display: "block", padding: "6px 10px", marginLeft: 1, marginRight: 1 } } })), SelectWrapper = xr$1.span(({ theme }) => ({ display: "inline-block", lineHeight: "normal", overflow: "hidden", position: "relative", verticalAlign: "top", width: "100%", svg: { position: "absolute", zIndex: 1, pointerEvents: "none", height: "12px", marginTop: "-6px", right: "12px", top: "50%", fill: theme.textMutedColor, path: { fill: theme.textMutedColor } } })), NO_SELECTION = "Choose option...", SingleSelect = ({ name, value: value2, options, onChange, argType }) => {
  let handleChange = (e23) => {
    onChange(options[e23.currentTarget.value]);
  }, selection = selectedKey(value2, options) || NO_SELECTION, controlId = getControlId(name), readonly = !!argType?.table?.readonly;
  return e.createElement(SelectWrapper, null, e.createElement(ChevronSmallDownIcon, null), e.createElement(OptionsSelect, { disabled: readonly, id: controlId, value: selection, onChange: handleChange }, e.createElement("option", { key: "no-selection", disabled: true }, NO_SELECTION), Object.keys(options).map((key) => e.createElement("option", { key, value: key }, key))));
}, MultiSelect = ({ name, value: value2, options, onChange, argType }) => {
  let handleChange = (e23) => {
    let selection2 = Array.from(e23.currentTarget.options).filter((option) => option.selected).map((option) => option.value);
    onChange(selectedValues(selection2, options));
  }, selection = selectedKeys(value2, options), controlId = getControlId(name), readonly = !!argType?.table?.readonly;
  return e.createElement(SelectWrapper, null, e.createElement(OptionsSelect, { disabled: readonly, id: controlId, multiple: true, value: selection, onChange: handleChange }, Object.keys(options).map((key) => e.createElement("option", { key, value: key }, key))));
}, SelectControl = (props) => {
  let { name, options } = props;
  return options ? props.isMulti ? e.createElement(MultiSelect, { ...props }) : e.createElement(SingleSelect, { ...props }) : (logger.warn(`Select with no options: ${name}`), e.createElement(e.Fragment, null, "-"));
};
var normalizeOptions = (options, labels) => Array.isArray(options) ? options.reduce((acc, item) => (acc[labels?.[item] || String(item)] = item, acc), {}) : options, Controls = { check: CheckboxControl, "inline-check": CheckboxControl, radio: RadioControl, "inline-radio": RadioControl, select: SelectControl, "multi-select": SelectControl }, OptionsControl = (props) => {
  let { type = "select", labels, argType } = props, normalized = { ...props, argType, options: argType ? normalizeOptions(argType.options, labels) : {}, isInline: type.includes("inline"), isMulti: type.includes("multi") }, Control = Controls[type];
  if (Control) return e.createElement(Control, { ...normalized });
  throw new Error(`Unknown options type: ${type}`);
};
var ERROR = "Error", OBJECT = "Object", ARRAY = "Array", STRING = "String", NUMBER = "Number", BOOLEAN = "Boolean", DATE = "Date", NULL = "Null", UNDEFINED = "Undefined", FUNCTION = "Function", SYMBOL = "Symbol";
var ADD_DELTA_TYPE = "ADD_DELTA_TYPE", REMOVE_DELTA_TYPE = "REMOVE_DELTA_TYPE", UPDATE_DELTA_TYPE = "UPDATE_DELTA_TYPE";
var VALUE = "value", KEY = "key";
function getObjectType(obj) {
  return obj !== null && typeof obj == "object" && !Array.isArray(obj) && typeof obj[Symbol.iterator] == "function" ? "Iterable" : Object.prototype.toString.call(obj).slice(8, -1);
}
function isComponentWillChange(oldValue, newValue) {
  let oldType = getObjectType(oldValue), newType = getObjectType(newValue);
  return (oldType === "Function" || newType === "Function") && newType !== oldType;
}
var JsonAddValue = class extends reactExports.Component {
  constructor(props) {
    super(props), this.state = { inputRefKey: null, inputRefValue: null }, this.refInputValue = this.refInputValue.bind(this), this.refInputKey = this.refInputKey.bind(this), this.onKeydown = this.onKeydown.bind(this), this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    let { inputRefKey, inputRefValue } = this.state, { onlyValue } = this.props;
    inputRefKey && typeof inputRefKey.focus == "function" && inputRefKey.focus(), onlyValue && inputRefValue && typeof inputRefValue.focus == "function" && inputRefValue.focus(), document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(event) {
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.onSubmit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.props.handleCancel()));
  }
  onSubmit() {
    let { handleAdd, onlyValue, onSubmitValueParser, keyPath, deep } = this.props, { inputRefKey, inputRefValue } = this.state, result = {};
    if (!onlyValue) {
      if (!inputRefKey.value) return;
      result.key = inputRefKey.value;
    }
    result.newValue = onSubmitValueParser(false, keyPath, deep, result.key, inputRefValue.value), handleAdd(result);
  }
  refInputKey(node) {
    this.state.inputRefKey = node;
  }
  refInputValue(node) {
    this.state.inputRefValue = node;
  }
  render() {
    let { handleCancel, onlyValue, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep } = this.props, addButtonElementLayout = addButtonElement && reactExports.cloneElement(addButtonElement, { onClick: this.onSubmit }), cancelButtonElementLayout = cancelButtonElement && reactExports.cloneElement(cancelButtonElement, { onClick: handleCancel }), inputElementValue = inputElementGenerator(VALUE, keyPath, deep), inputElementValueLayout = reactExports.cloneElement(inputElementValue, { placeholder: "Value", ref: this.refInputValue }), inputElementKeyLayout = null;
    if (!onlyValue) {
      let inputElementKey = inputElementGenerator(KEY, keyPath, deep);
      inputElementKeyLayout = reactExports.cloneElement(inputElementKey, { placeholder: "Key", ref: this.refInputKey });
    }
    return e.createElement("span", { className: "rejt-add-value-node" }, inputElementKeyLayout, inputElementValueLayout, cancelButtonElementLayout, addButtonElementLayout);
  }
};
JsonAddValue.defaultProps = { onlyValue: false, addButtonElement: e.createElement("button", null, "+"), cancelButtonElement: e.createElement("button", null, "c") };
var JsonArray = class extends reactExports.Component {
  constructor(props) {
    super(props);
    let keyPath = [...props.keyPath || [], props.name];
    this.state = { data: props.data, name: props.name, keyPath, deep: props.deep ?? 0, nextDeep: (props.deep ?? 0) + 1, collapsed: props.isCollapsed(keyPath, props.deep ?? 0, props.data), addFormVisible: false }, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveItem = this.handleRemoveItem.bind(this), this.handleAddMode = this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed = this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? { data: props.data } : null;
  }
  onChildUpdate(childKey, childData) {
    let { data, keyPath = [] } = this.state;
    data[childKey] = childData, this.setState({ data });
    let { onUpdate } = this.props, size = keyPath.length;
    onUpdate(keyPath[size - 1], data);
  }
  handleAddMode() {
    this.setState({ addFormVisible: true });
  }
  handleCollapseMode() {
    this.setState((state) => ({ collapsed: !state.collapsed }));
  }
  handleRemoveItem(index2) {
    return () => {
      let { beforeRemoveAction, logger: logger4 } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[index2];
      (beforeRemoveAction || Promise.resolve.bind(Promise))(index2, keyPath, deep, oldValue).then(() => {
        let deltaUpdateResult = { keyPath, deep, key: index2, oldValue, type: REMOVE_DELTA_TYPE };
        data.splice(index2, 1), this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate(deltaUpdateResult);
      }).catch(logger4.error);
    };
  }
  handleAddValueAdd({ key, newValue }) {
    let { data, keyPath = [], nextDeep: deep } = this.state, { beforeAddAction, logger: logger4 } = this.props;
    (beforeAddAction || Promise.resolve.bind(Promise))(key, keyPath, deep, newValue).then(() => {
      data[key] = newValue, this.setState({ data }), this.handleAddValueCancel();
      let { onUpdate, onDeltaUpdate } = this.props;
      onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: ADD_DELTA_TYPE, keyPath, deep, key, newValue });
    }).catch(logger4.error);
  }
  handleAddValueCancel() {
    this.setState({ addFormVisible: false });
  }
  handleEditValue({ key, value: value2 }) {
    return new Promise((resolve, reject) => {
      let { beforeUpdateAction } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[key];
      (beforeUpdateAction || Promise.resolve.bind(Promise))(key, keyPath, deep, oldValue, value2).then(() => {
        data[key] = value2, this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: UPDATE_DELTA_TYPE, keyPath, deep, key, newValue: value2, oldValue }), resolve(void 0);
      }).catch(reject);
    });
  }
  renderCollapsed() {
    let { name, data, keyPath, deep } = this.state, { handleRemove, readOnly, getStyle, dataType, minusMenuElement } = this.props, { minus, collapsed } = getStyle(name, data, keyPath, deep, dataType), isReadOnly = readOnly(name, data, keyPath, deep, dataType), removeItemButton = minusMenuElement && reactExports.cloneElement(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus });
    return e.createElement("span", { className: "rejt-collapsed" }, e.createElement("span", { className: "rejt-collapsed-text", style: collapsed, onClick: this.handleCollapseMode }, "[...] ", data.length, " ", data.length === 1 ? "item" : "items"), !isReadOnly && removeItemButton);
  }
  renderNotCollapsed() {
    let { name, data, keyPath, deep, addFormVisible, nextDeep } = this.state, { isCollapsed, handleRemove, onDeltaUpdate, readOnly, getStyle, dataType, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser } = this.props, { minus, plus, delimiter, ul: ul2, addForm } = getStyle(name, data, keyPath, deep, dataType), isReadOnly = readOnly(name, data, keyPath, deep, dataType), addItemButton = plusMenuElement && reactExports.cloneElement(plusMenuElement, { onClick: this.handleAddMode, className: "rejt-plus-menu", style: plus }), removeItemButton = minusMenuElement && reactExports.cloneElement(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus });
    return e.createElement("span", { className: "rejt-not-collapsed" }, e.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "["), !addFormVisible && addItemButton, e.createElement("ul", { className: "rejt-not-collapsed-list", style: ul2 }, data.map((item, index2) => e.createElement(JsonNode, { key: index2, name: index2.toString(), data: item, keyPath, deep: nextDeep, isCollapsed, handleRemove: this.handleRemoveItem(index2), handleUpdateValue: this.handleEditValue, onUpdate: this.onChildUpdate, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser }))), !isReadOnly && addFormVisible && e.createElement("div", { className: "rejt-add-form", style: addForm }, e.createElement(JsonAddValue, { handleAdd: this.handleAddValueAdd, handleCancel: this.handleAddValueCancel, onlyValue: true, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep, onSubmitValueParser })), e.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "]"), !isReadOnly && removeItemButton);
  }
  render() {
    let { name, collapsed, data, keyPath, deep } = this.state, { dataType, getStyle } = this.props, value2 = collapsed ? this.renderCollapsed() : this.renderNotCollapsed(), style = getStyle(name, data, keyPath, deep, dataType);
    return e.createElement("div", { className: "rejt-array-node" }, e.createElement("span", { onClick: this.handleCollapseMode }, e.createElement("span", { className: "rejt-name", style: style.name }, name, " :", " ")), value2);
  }
};
JsonArray.defaultProps = { keyPath: [], deep: 0, minusMenuElement: e.createElement("span", null, " - "), plusMenuElement: e.createElement("span", null, " + ") };
var JsonFunctionValue = class extends reactExports.Component {
  constructor(props) {
    super(props);
    let keyPath = [...props.keyPath || [], props.name];
    this.state = { value: props.value, name: props.name, keyPath, deep: props.deep, editEnabled: false, inputRef: null }, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.value !== state.value ? { value: props.value } : null;
  }
  componentDidUpdate() {
    let { editEnabled, inputRef, name, value: value2, keyPath, deep } = this.state, { readOnly, dataType } = this.props, readOnlyResult = readOnly(name, value2, keyPath, deep, dataType);
    editEnabled && !readOnlyResult && typeof inputRef.focus == "function" && inputRef.focus();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(event) {
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.handleEdit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let { handleUpdateValue, originalValue, logger: logger4, onSubmitValueParser, keyPath } = this.props, { inputRef, name, deep } = this.state;
    if (!inputRef) return;
    let newValue = onSubmitValueParser(true, keyPath, deep, name, inputRef.value), result = { value: newValue, key: name };
    (handleUpdateValue || Promise.resolve.bind(Promise))(result).then(() => {
      isComponentWillChange(originalValue, newValue) || this.handleCancelEdit();
    }).catch(logger4.error);
  }
  handleEditMode() {
    this.setState({ editEnabled: true });
  }
  refInput(node) {
    this.state.inputRef = node;
  }
  handleCancelEdit() {
    this.setState({ editEnabled: false });
  }
  render() {
    let { name, value: value2, editEnabled, keyPath, deep } = this.state, { handleRemove, originalValue, readOnly, dataType, getStyle, editButtonElement, cancelButtonElement, textareaElementGenerator, minusMenuElement, keyPath: comeFromKeyPath } = this.props, style = getStyle(name, originalValue, keyPath, deep, dataType), result = null, minusElement = null, resultOnlyResult = readOnly(name, originalValue, keyPath, deep, dataType);
    if (editEnabled && !resultOnlyResult) {
      let textareaElement = textareaElementGenerator(VALUE, comeFromKeyPath, deep, name, originalValue, dataType), editButtonElementLayout = editButtonElement && reactExports.cloneElement(editButtonElement, { onClick: this.handleEdit }), cancelButtonElementLayout = cancelButtonElement && reactExports.cloneElement(cancelButtonElement, { onClick: this.handleCancelEdit }), textareaElementLayout = reactExports.cloneElement(textareaElement, { ref: this.refInput, defaultValue: originalValue });
      result = e.createElement("span", { className: "rejt-edit-form", style: style.editForm }, textareaElementLayout, " ", cancelButtonElementLayout, editButtonElementLayout), minusElement = null;
    } else {
      result = e.createElement("span", { className: "rejt-value", style: style.value, onClick: resultOnlyResult ? void 0 : this.handleEditMode }, value2);
      let minusMenuLayout = minusMenuElement && reactExports.cloneElement(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: style.minus });
      minusElement = resultOnlyResult ? null : minusMenuLayout;
    }
    return e.createElement("li", { className: "rejt-function-value-node", style: style.li }, e.createElement("span", { className: "rejt-name", style: style.name }, name, " :", " "), result, minusElement);
  }
};
JsonFunctionValue.defaultProps = { keyPath: [], deep: 0, handleUpdateValue: () => {
}, editButtonElement: e.createElement("button", null, "e"), cancelButtonElement: e.createElement("button", null, "c"), minusMenuElement: e.createElement("span", null, " - ") };
var JsonNode = class extends reactExports.Component {
  constructor(props) {
    super(props), this.state = { data: props.data, name: props.name, keyPath: props.keyPath, deep: props.deep };
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? { data: props.data } : null;
  }
  render() {
    let { data, name, keyPath, deep } = this.state, { isCollapsed, handleRemove, handleUpdateValue, onUpdate, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser } = this.props, readOnlyTrue = () => true, dataType = getObjectType(data);
    switch (dataType) {
      case ERROR:
        return e.createElement(JsonObject, { data, name, isCollapsed, keyPath, deep, handleRemove, onUpdate, onDeltaUpdate, readOnly: readOnlyTrue, dataType, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser });
      case OBJECT:
        return e.createElement(JsonObject, { data, name, isCollapsed, keyPath, deep, handleRemove, onUpdate, onDeltaUpdate, readOnly, dataType, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser });
      case ARRAY:
        return e.createElement(JsonArray, { data, name, isCollapsed, keyPath, deep, handleRemove, onUpdate, onDeltaUpdate, readOnly, dataType, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser });
      case STRING:
        return e.createElement(JsonValue, { name, value: `"${data}"`, originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case NUMBER:
        return e.createElement(JsonValue, { name, value: data, originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case BOOLEAN:
        return e.createElement(JsonValue, { name, value: data ? "true" : "false", originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case DATE:
        return e.createElement(JsonValue, { name, value: data.toISOString(), originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly: readOnlyTrue, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case NULL:
        return e.createElement(JsonValue, { name, value: "null", originalValue: "null", keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case UNDEFINED:
        return e.createElement(JsonValue, { name, value: "undefined", originalValue: "undefined", keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case FUNCTION:
        return e.createElement(JsonFunctionValue, { name, value: data.toString(), originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, textareaElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case SYMBOL:
        return e.createElement(JsonValue, { name, value: data.toString(), originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly: readOnlyTrue, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      default:
        return null;
    }
  }
};
JsonNode.defaultProps = { keyPath: [], deep: 0 };
var JsonObject = class extends reactExports.Component {
  constructor(props) {
    super(props);
    let keyPath = props.deep === -1 ? [] : [...props.keyPath || [], props.name];
    this.state = { name: props.name, data: props.data, keyPath, deep: props.deep ?? 0, nextDeep: (props.deep ?? 0) + 1, collapsed: props.isCollapsed(keyPath, props.deep ?? 0, props.data), addFormVisible: false }, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveValue = this.handleRemoveValue.bind(this), this.handleAddMode = this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed = this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? { data: props.data } : null;
  }
  onChildUpdate(childKey, childData) {
    let { data, keyPath = [] } = this.state;
    data[childKey] = childData, this.setState({ data });
    let { onUpdate } = this.props, size = keyPath.length;
    onUpdate(keyPath[size - 1], data);
  }
  handleAddMode() {
    this.setState({ addFormVisible: true });
  }
  handleAddValueCancel() {
    this.setState({ addFormVisible: false });
  }
  handleAddValueAdd({ key, newValue }) {
    let { data, keyPath = [], nextDeep: deep } = this.state, { beforeAddAction, logger: logger4 } = this.props;
    (beforeAddAction || Promise.resolve.bind(Promise))(key, keyPath, deep, newValue).then(() => {
      data[key] = newValue, this.setState({ data }), this.handleAddValueCancel();
      let { onUpdate, onDeltaUpdate } = this.props;
      onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: ADD_DELTA_TYPE, keyPath, deep, key, newValue });
    }).catch(logger4.error);
  }
  handleRemoveValue(key) {
    return () => {
      let { beforeRemoveAction, logger: logger4 } = this.props, { data, keyPath = [], nextDeep: deep } = this.state, oldValue = data[key];
      (beforeRemoveAction || Promise.resolve.bind(Promise))(key, keyPath, deep, oldValue).then(() => {
        let deltaUpdateResult = { keyPath, deep, key, oldValue, type: REMOVE_DELTA_TYPE };
        delete data[key], this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate(deltaUpdateResult);
      }).catch(logger4.error);
    };
  }
  handleCollapseMode() {
    this.setState((state) => ({ collapsed: !state.collapsed }));
  }
  handleEditValue({ key, value: value2 }) {
    return new Promise((resolve, reject) => {
      let { beforeUpdateAction } = this.props, { data, keyPath = [], nextDeep: deep } = this.state, oldValue = data[key];
      (beforeUpdateAction || Promise.resolve.bind(Promise))(key, keyPath, deep, oldValue, value2).then(() => {
        data[key] = value2, this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: UPDATE_DELTA_TYPE, keyPath, deep, key, newValue: value2, oldValue }), resolve();
      }).catch(reject);
    });
  }
  renderCollapsed() {
    let { name, keyPath, deep, data } = this.state, { handleRemove, readOnly, dataType, getStyle, minusMenuElement } = this.props, { minus, collapsed } = getStyle(name, data, keyPath, deep, dataType), keyList = Object.getOwnPropertyNames(data), isReadOnly = readOnly(name, data, keyPath, deep, dataType), removeItemButton = minusMenuElement && reactExports.cloneElement(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus });
    return e.createElement("span", { className: "rejt-collapsed" }, e.createElement("span", { className: "rejt-collapsed-text", style: collapsed, onClick: this.handleCollapseMode }, "{...}", " ", keyList.length, " ", keyList.length === 1 ? "key" : "keys"), !isReadOnly && removeItemButton);
  }
  renderNotCollapsed() {
    let { name, data, keyPath, deep, nextDeep, addFormVisible } = this.state, { isCollapsed, handleRemove, onDeltaUpdate, readOnly, getStyle, dataType, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser } = this.props, { minus, plus, addForm, ul: ul2, delimiter } = getStyle(name, data, keyPath, deep, dataType), keyList = Object.getOwnPropertyNames(data), isReadOnly = readOnly(name, data, keyPath, deep, dataType), addItemButton = plusMenuElement && reactExports.cloneElement(plusMenuElement, { onClick: this.handleAddMode, className: "rejt-plus-menu", style: plus }), removeItemButton = minusMenuElement && reactExports.cloneElement(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus }), list = keyList.map((key) => e.createElement(JsonNode, { key, name: key, data: data[key], keyPath, deep: nextDeep, isCollapsed, handleRemove: this.handleRemoveValue(key), handleUpdateValue: this.handleEditValue, onUpdate: this.onChildUpdate, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser }));
    return e.createElement("span", { className: "rejt-not-collapsed" }, e.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "{"), !isReadOnly && addItemButton, e.createElement("ul", { className: "rejt-not-collapsed-list", style: ul2 }, list), !isReadOnly && addFormVisible && e.createElement("div", { className: "rejt-add-form", style: addForm }, e.createElement(JsonAddValue, { handleAdd: this.handleAddValueAdd, handleCancel: this.handleAddValueCancel, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep, onSubmitValueParser })), e.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "}"), !isReadOnly && removeItemButton);
  }
  render() {
    let { name, collapsed, data, keyPath, deep } = this.state, { getStyle, dataType } = this.props, value2 = collapsed ? this.renderCollapsed() : this.renderNotCollapsed(), style = getStyle(name, data, keyPath, deep, dataType);
    return e.createElement("div", { className: "rejt-object-node" }, e.createElement("span", { onClick: this.handleCollapseMode }, e.createElement("span", { className: "rejt-name", style: style.name }, name, " :", " ")), value2);
  }
};
JsonObject.defaultProps = { keyPath: [], deep: 0, minusMenuElement: e.createElement("span", null, " - "), plusMenuElement: e.createElement("span", null, " + ") };
var JsonValue = class extends reactExports.Component {
  constructor(props) {
    super(props);
    let keyPath = [...props.keyPath || [], props.name];
    this.state = { value: props.value, name: props.name, keyPath, deep: props.deep, editEnabled: false, inputRef: null }, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.value !== state.value ? { value: props.value } : null;
  }
  componentDidUpdate() {
    let { editEnabled, inputRef, name, value: value2, keyPath, deep } = this.state, { readOnly, dataType } = this.props, isReadOnly = readOnly(name, value2, keyPath, deep, dataType);
    editEnabled && !isReadOnly && typeof inputRef.focus == "function" && inputRef.focus();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(event) {
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.handleEdit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let { handleUpdateValue, originalValue, logger: logger4, onSubmitValueParser, keyPath } = this.props, { inputRef, name, deep } = this.state;
    if (!inputRef) return;
    let newValue = onSubmitValueParser(true, keyPath, deep, name, inputRef.value), result = { value: newValue, key: name };
    (handleUpdateValue || Promise.resolve.bind(Promise))(result).then(() => {
      isComponentWillChange(originalValue, newValue) || this.handleCancelEdit();
    }).catch(logger4.error);
  }
  handleEditMode() {
    this.setState({ editEnabled: true });
  }
  refInput(node) {
    this.state.inputRef = node;
  }
  handleCancelEdit() {
    this.setState({ editEnabled: false });
  }
  render() {
    let { name, value: value2, editEnabled, keyPath, deep } = this.state, { handleRemove, originalValue, readOnly, dataType, getStyle, editButtonElement, cancelButtonElement, inputElementGenerator, minusMenuElement, keyPath: comeFromKeyPath } = this.props, style = getStyle(name, originalValue, keyPath, deep, dataType), isReadOnly = readOnly(name, originalValue, keyPath, deep, dataType), isEditing = editEnabled && !isReadOnly, inputElement = inputElementGenerator(VALUE, comeFromKeyPath, deep, name, originalValue, dataType), editButtonElementLayout = editButtonElement && reactExports.cloneElement(editButtonElement, { onClick: this.handleEdit }), cancelButtonElementLayout = cancelButtonElement && reactExports.cloneElement(cancelButtonElement, { onClick: this.handleCancelEdit }), inputElementLayout = reactExports.cloneElement(inputElement, { ref: this.refInput, defaultValue: JSON.stringify(originalValue) }), minusMenuLayout = minusMenuElement && reactExports.cloneElement(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: style.minus });
    return e.createElement("li", { className: "rejt-value-node", style: style.li }, e.createElement("span", { className: "rejt-name", style: style.name }, name, " : "), isEditing ? e.createElement("span", { className: "rejt-edit-form", style: style.editForm }, inputElementLayout, " ", cancelButtonElementLayout, editButtonElementLayout) : e.createElement("span", { className: "rejt-value", style: style.value, onClick: isReadOnly ? void 0 : this.handleEditMode }, String(value2)), !isReadOnly && !isEditing && minusMenuLayout);
  }
};
JsonValue.defaultProps = { keyPath: [], deep: 0, handleUpdateValue: () => Promise.resolve(), editButtonElement: e.createElement("button", null, "e"), cancelButtonElement: e.createElement("button", null, "c"), minusMenuElement: e.createElement("span", null, " - ") };
function parse3(string) {
  let result = string;
  if (result.indexOf("function") === 0) return (0, eval)(`(${result})`);
  try {
    result = JSON.parse(string);
  } catch {
  }
  return result;
}
var object = { minus: { color: "red" }, plus: { color: "green" }, collapsed: { color: "grey" }, delimiter: {}, ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" }, name: { color: "#2287CD" }, addForm: {} }, array = { minus: { color: "red" }, plus: { color: "green" }, collapsed: { color: "grey" }, delimiter: {}, ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" }, name: { color: "#2287CD" }, addForm: {} }, value = { minus: { color: "red" }, editForm: {}, value: { color: "#7bba3d" }, li: { minHeight: "22px", lineHeight: "22px", outline: "0px" }, name: { color: "#2287CD" } };
var JsonTree = class extends reactExports.Component {
  constructor(props) {
    super(props), this.state = { data: props.data, rootName: props.rootName }, this.onUpdate = this.onUpdate.bind(this), this.removeRoot = this.removeRoot.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data || props.rootName !== state.rootName ? { data: props.data, rootName: props.rootName } : null;
  }
  onUpdate(key, data) {
    this.setState({ data }), this.props.onFullyUpdate?.(data);
  }
  removeRoot() {
    this.onUpdate(null, null);
  }
  render() {
    let { data, rootName } = this.state, { isCollapsed, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElement, textareaElement, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser, fallback = null } = this.props, dataType = getObjectType(data), readOnlyFunction = readOnly;
    getObjectType(readOnly) === "Boolean" && (readOnlyFunction = () => readOnly);
    let inputElementFunction = inputElement;
    inputElement && getObjectType(inputElement) !== "Function" && (inputElementFunction = () => inputElement);
    let textareaElementFunction = textareaElement;
    return textareaElement && getObjectType(textareaElement) !== "Function" && (textareaElementFunction = () => textareaElement), dataType === "Object" || dataType === "Array" ? e.createElement("div", { className: "rejt-tree" }, e.createElement(JsonNode, { data, name: rootName || "root", deep: -1, isCollapsed: isCollapsed ?? (() => false), onUpdate: this.onUpdate, onDeltaUpdate: onDeltaUpdate ?? (() => {
    }), readOnly: readOnlyFunction, getStyle: getStyle ?? (() => ({})), addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator: inputElementFunction, textareaElementGenerator: textareaElementFunction, minusMenuElement, plusMenuElement, handleRemove: this.removeRoot, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4 ?? {}, onSubmitValueParser: onSubmitValueParser ?? ((val) => val) })) : fallback;
  }
};
JsonTree.defaultProps = { rootName: "root", isCollapsed: (keyPath, deep) => deep !== -1, getStyle: (keyName, data, keyPath, deep, dataType) => {
  switch (dataType) {
    case "Object":
    case "Error":
      return object;
    case "Array":
      return array;
    default:
      return value;
  }
}, readOnly: () => false, onFullyUpdate: () => {
}, onDeltaUpdate: () => {
}, beforeRemoveAction: () => Promise.resolve(), beforeAddAction: () => Promise.resolve(), beforeUpdateAction: () => Promise.resolve(), logger: { error: () => {
} }, onSubmitValueParser: (isEditMode, keyPath, deep, name, rawValue) => parse3(rawValue), inputElement: () => e.createElement("input", null), textareaElement: () => e.createElement("textarea", null), fallback: null };
var { window: globalWindow2 } = globalThis, Wrapper7 = xr$1.div(({ theme }) => ({ position: "relative", display: "flex", '&[aria-readonly="true"]': { opacity: 0.5 }, ".rejt-tree": { marginLeft: "1rem", fontSize: "13px" }, ".rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed": { "& > svg": { opacity: 0, transition: "opacity 0.2s" } }, ".rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed": { "& > svg": { opacity: 1 } }, ".rejt-edit-form button": { display: "none" }, ".rejt-add-form": { marginLeft: 10 }, ".rejt-add-value-node": { display: "inline-flex", alignItems: "center" }, ".rejt-name": { lineHeight: "22px" }, ".rejt-not-collapsed-delimiter": { lineHeight: "22px" }, ".rejt-plus-menu": { marginLeft: 5 }, ".rejt-object-node > span > *, .rejt-array-node > span > *": { position: "relative", zIndex: 2 }, ".rejt-object-node, .rejt-array-node": { position: "relative" }, ".rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before": { content: '""', position: "absolute", top: 0, display: "block", width: "100%", marginLeft: "-1rem", padding: "0 4px 0 1rem", height: 22 }, ".rejt-collapsed::before, .rejt-not-collapsed::before": { zIndex: 1, background: "transparent", borderRadius: 4, transition: "background 0.2s", pointerEvents: "none", opacity: 0.1 }, ".rejt-object-node:hover, .rejt-array-node:hover": { "& > .rejt-collapsed::before, & > .rejt-not-collapsed::before": { background: theme.color.secondary } }, ".rejt-collapsed::after, .rejt-not-collapsed::after": { content: '""', position: "absolute", display: "inline-block", pointerEvents: "none", width: 0, height: 0 }, ".rejt-collapsed::after": { left: -8, top: 8, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "3px solid rgba(153,153,153,0.6)" }, ".rejt-not-collapsed::after": { left: -10, top: 10, borderTop: "3px solid rgba(153,153,153,0.6)", borderLeft: "3px solid transparent", borderRight: "3px solid transparent" }, ".rejt-value": { display: "inline-block", border: "1px solid transparent", borderRadius: 4, margin: "1px 0", padding: "0 4px", cursor: "text", color: theme.color.defaultText }, ".rejt-value-node:hover > .rejt-value": { background: theme.color.lighter, borderColor: theme.appBorderColor } })), ButtonInline = xr$1.button(({ theme, primary }) => ({ border: 0, height: 20, margin: 1, borderRadius: 4, background: primary ? theme.color.secondary : "transparent", color: primary ? theme.color.lightest : theme.color.dark, fontWeight: primary ? "bold" : "normal", cursor: "pointer", order: primary ? "initial" : 9 })), ActionAddIcon = xr$1(AddIcon)(({ theme, disabled }) => ({ display: "inline-block", verticalAlign: "middle", width: 15, height: 15, padding: 3, marginLeft: 5, cursor: disabled ? "not-allowed" : "pointer", color: theme.textMutedColor, "&:hover": disabled ? {} : { color: theme.color.ancillary }, "svg + &": { marginLeft: 0 } })), ActionSubstractIcon = xr$1(SubtractIcon)(({ theme, disabled }) => ({ display: "inline-block", verticalAlign: "middle", width: 15, height: 15, padding: 3, marginLeft: 5, cursor: disabled ? "not-allowed" : "pointer", color: theme.textMutedColor, "&:hover": disabled ? {} : { color: theme.color.negative }, "svg + &": { marginLeft: 0 } })), Input = xr$1.input(({ theme, placeholder }) => ({ outline: 0, margin: placeholder ? 1 : "1px 0", padding: "3px 4px", color: theme.color.defaultText, background: theme.background.app, border: `1px solid ${theme.appBorderColor}`, borderRadius: 4, lineHeight: "14px", width: placeholder === "Key" ? 80 : 120, "&:focus": { border: `1px solid ${theme.color.secondary}` } })), RawButton = xr$1(wo)(({ theme }) => ({ position: "absolute", zIndex: 2, top: 2, right: 2, height: 21, padding: "0 3px", background: theme.background.bar, border: `1px solid ${theme.appBorderColor}`, borderRadius: 3, color: theme.textMutedColor, fontSize: "9px", fontWeight: "bold", textDecoration: "none", span: { marginLeft: 3, marginTop: 1 } })), RawInput = xr$1(N7.Textarea)(({ theme }) => ({ flex: 1, padding: "7px 6px", fontFamily: theme.typography.fonts.mono, fontSize: "12px", lineHeight: "18px", "&::placeholder": { fontFamily: theme.typography.fonts.base, fontSize: "13px" }, "&:placeholder-shown": { padding: "7px 10px" } })), ENTER_EVENT = { bubbles: true, cancelable: true, key: "Enter", code: "Enter", keyCode: 13 }, dispatchEnterKey = (event) => {
  event.currentTarget.dispatchEvent(new globalWindow2.KeyboardEvent("keydown", ENTER_EVENT));
}, selectValue = (event) => {
  event.currentTarget.select();
}, getCustomStyleFunction = (theme) => () => ({ name: { color: theme.color.secondary }, collapsed: { color: theme.color.dark }, ul: { listStyle: "none", margin: "0 0 0 1rem", padding: 0 }, li: { outline: 0 } }), ObjectControl = ({ name, value: value2, onChange, argType }) => {
  let theme = St$1(), data = reactExports.useMemo(() => value2 && cloneDeep(value2), [value2]), hasData = data != null, [showRaw, setShowRaw] = reactExports.useState(!hasData), [parseError, setParseError] = reactExports.useState(null), readonly = !!argType?.table?.readonly, updateRaw = reactExports.useCallback((raw) => {
    try {
      raw && onChange(JSON.parse(raw)), setParseError(null);
    } catch (e23) {
      setParseError(e23);
    }
  }, [onChange]), [forceVisible, setForceVisible] = reactExports.useState(false), onForceVisible = reactExports.useCallback(() => {
    onChange({}), setForceVisible(true);
  }, [setForceVisible]), htmlElRef = reactExports.useRef(null);
  if (reactExports.useEffect(() => {
    forceVisible && htmlElRef.current && htmlElRef.current.select();
  }, [forceVisible]), !hasData) return e.createElement(Ir, { disabled: readonly, id: getControlSetterButtonId(name), onClick: onForceVisible }, "Set object");
  let rawJSONForm = e.createElement(RawInput, { ref: htmlElRef, id: getControlId(name), name, defaultValue: value2 === null ? "" : JSON.stringify(value2, null, 2), onBlur: (event) => updateRaw(event.target.value), placeholder: "Edit JSON string...", autoFocus: forceVisible, valid: parseError ? "error" : void 0, readOnly: readonly }), isObjectOrArray = Array.isArray(value2) || typeof value2 == "object" && value2?.constructor === Object;
  return e.createElement(Wrapper7, { "aria-readonly": readonly }, isObjectOrArray && e.createElement(RawButton, { onClick: (e23) => {
    e23.preventDefault(), setShowRaw((v22) => !v22);
  } }, showRaw ? e.createElement(EyeCloseIcon, null) : e.createElement(EyeIcon, null), e.createElement("span", null, "RAW")), showRaw ? rawJSONForm : e.createElement(JsonTree, { readOnly: readonly || !isObjectOrArray, isCollapsed: isObjectOrArray ? void 0 : () => true, data, rootName: name, onFullyUpdate: onChange, getStyle: getCustomStyleFunction(theme), cancelButtonElement: e.createElement(ButtonInline, { type: "button" }, "Cancel"), editButtonElement: e.createElement(ButtonInline, { type: "submit" }, "Save"), addButtonElement: e.createElement(ButtonInline, { type: "submit", primary: true }, "Save"), plusMenuElement: e.createElement(ActionAddIcon, null), minusMenuElement: e.createElement(ActionSubstractIcon, null), inputElement: (_2, __, ___, key) => key ? e.createElement(Input, { onFocus: selectValue, onBlur: dispatchEnterKey }) : e.createElement(Input, null), fallback: rawJSONForm }));
};
var RangeInput = xr$1.input(({ theme, min, max, value: value2, disabled }) => ({ "&": { width: "100%", backgroundColor: "transparent", appearance: "none" }, "&::-webkit-slider-runnable-track": { background: theme.base === "light" ? `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} 100%)`, boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`, borderRadius: 6, width: "100%", height: 6, cursor: disabled ? "not-allowed" : "pointer" }, "&::-webkit-slider-thumb": { marginTop: "-6px", width: 16, height: 16, border: `1px solid ${rgba(theme.appBorderColor, 0.2)}`, borderRadius: "50px", boxShadow: `0 1px 3px 0px ${rgba(theme.appBorderColor, 0.2)}`, cursor: disabled ? "not-allowed" : "grab", appearance: "none", background: `${theme.input.background}`, transition: "all 150ms ease-out", "&:hover": { background: `${curriedDarken$1(0.05, theme.input.background)}`, transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)", transition: "all 50ms ease-out" }, "&:active": { background: `${theme.input.background}`, transform: "scale3d(1, 1, 1) translateY(0px)", cursor: disabled ? "not-allowed" : "grab" } }, "&:focus": { outline: "none", "&::-webkit-slider-runnable-track": { borderColor: rgba(theme.color.secondary, 0.4) }, "&::-webkit-slider-thumb": { borderColor: theme.color.secondary, boxShadow: `0 0px 5px 0px ${theme.color.secondary}` } }, "&::-moz-range-track": { background: theme.base === "light" ? `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} 100%)`, boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`, borderRadius: 6, width: "100%", height: 6, cursor: disabled ? "not-allowed" : "pointer", outline: "none" }, "&::-moz-range-thumb": { width: 16, height: 16, border: `1px solid ${rgba(theme.appBorderColor, 0.2)}`, borderRadius: "50px", boxShadow: `0 1px 3px 0px ${rgba(theme.appBorderColor, 0.2)}`, cursor: disabled ? "not-allowed" : "grap", background: `${theme.input.background}`, transition: "all 150ms ease-out", "&:hover": { background: `${curriedDarken$1(0.05, theme.input.background)}`, transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)", transition: "all 50ms ease-out" }, "&:active": { background: `${theme.input.background}`, transform: "scale3d(1, 1, 1) translateY(0px)", cursor: "grabbing" } }, "&::-ms-track": { background: theme.base === "light" ? `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} 100%)`, boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`, color: "transparent", width: "100%", height: "6px", cursor: "pointer" }, "&::-ms-fill-lower": { borderRadius: 6 }, "&::-ms-fill-upper": { borderRadius: 6 }, "&::-ms-thumb": { width: 16, height: 16, background: `${theme.input.background}`, border: `1px solid ${rgba(theme.appBorderColor, 0.2)}`, borderRadius: 50, cursor: "grab", marginTop: 0 }, "@supports (-ms-ime-align:auto)": { "input[type=range]": { margin: "0" } } })), RangeLabel = xr$1.span({ paddingLeft: 5, paddingRight: 5, fontSize: 12, whiteSpace: "nowrap", fontFeatureSettings: "tnum", fontVariantNumeric: "tabular-nums", "[aria-readonly=true] &": { opacity: 0.5 } }), RangeCurrentAndMaxLabel = xr$1(RangeLabel)(({ numberOFDecimalsPlaces, max }) => ({ width: `${numberOFDecimalsPlaces + max.toString().length * 2 + 3}ch`, textAlign: "right", flexShrink: 0 })), RangeWrapper = xr$1.div({ display: "flex", alignItems: "center", width: "100%" });
function getNumberOfDecimalPlaces(number) {
  let match = number.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return match ? Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)) : 0;
}
var RangeControl = ({ name, value: value2, onChange, min = 0, max = 100, step = 1, onBlur, onFocus, argType }) => {
  let handleChange = (event) => {
    onChange(parse2(event.target.value));
  }, hasValue = value2 !== void 0, numberOFDecimalsPlaces = reactExports.useMemo(() => getNumberOfDecimalPlaces(step), [step]), readonly = !!argType?.table?.readonly;
  return e.createElement(RangeWrapper, { "aria-readonly": readonly }, e.createElement(RangeLabel, null, min), e.createElement(RangeInput, { id: getControlId(name), type: "range", disabled: readonly, onChange: handleChange, name, min, max, step, onFocus, onBlur, value: value2 ?? min }), e.createElement(RangeCurrentAndMaxLabel, { numberOFDecimalsPlaces, max }, hasValue ? value2.toFixed(numberOFDecimalsPlaces) : "--", " / ", max));
};
var Wrapper8 = xr$1.label({ display: "flex" }), MaxLength = xr$1.div(({ isMaxed }) => ({ marginLeft: "0.75rem", paddingTop: "0.35rem", color: isMaxed ? "red" : void 0 })), TextControl = ({ name, value: value2, onChange, onFocus, onBlur, maxLength, argType }) => {
  let handleChange = (event) => {
    onChange(event.target.value);
  }, readonly = !!argType?.table?.readonly, [forceVisible, setForceVisible] = reactExports.useState(false), onForceVisible = reactExports.useCallback(() => {
    onChange(""), setForceVisible(true);
  }, [setForceVisible]);
  if (value2 === void 0) return e.createElement(Ir, { variant: "outline", size: "medium", disabled: readonly, id: getControlSetterButtonId(name), onClick: onForceVisible }, "Set string");
  let isValid = typeof value2 == "string";
  return e.createElement(Wrapper8, null, e.createElement(N7.Textarea, { id: getControlId(name), maxLength, onChange: handleChange, disabled: readonly, size: "flex", placeholder: "Edit string...", autoFocus: forceVisible, valid: isValid ? void 0 : "error", name, value: isValid ? value2 : "", onFocus, onBlur }), maxLength && e.createElement(MaxLength, { isMaxed: value2?.length === maxLength }, value2?.length ?? 0, " / ", maxLength));
};
var FileInput = xr$1(N7.Input)({ padding: 10 });
function revokeOldUrls(urls) {
  urls.forEach((url) => {
    url.startsWith("blob:") && URL.revokeObjectURL(url);
  });
}
var FilesControl = ({ onChange, name, accept = "image/*", value: value2, argType }) => {
  let inputElement = reactExports.useRef(null), readonly = argType?.control?.readOnly;
  function handleFileChange(e23) {
    if (!e23.target.files) return;
    let fileUrls = Array.from(e23.target.files).map((file) => URL.createObjectURL(file));
    onChange(fileUrls), revokeOldUrls(value2 || []);
  }
  return reactExports.useEffect(() => {
    value2 == null && inputElement.current && (inputElement.current.value = "");
  }, [value2, name]), e.createElement(FileInput, { ref: inputElement, id: getControlId(name), type: "file", name, multiple: true, disabled: readonly, onChange: handleFileChange, accept, size: "flex" });
};
var LazyColorControl = reactExports.lazy(() => __vitePreload(() => import("./Color-AVL7NMMY-mF6AspBB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url)), ColorControl = (props) => e.createElement(reactExports.Suspense, { fallback: e.createElement("div", null) }, e.createElement(LazyColorControl, { ...props }));
var Controls2 = { array: ObjectControl, object: ObjectControl, boolean: BooleanControl, color: ColorControl, date: DateControl, number: NumberControl, check: OptionsControl, "inline-check": OptionsControl, radio: OptionsControl, "inline-radio": OptionsControl, select: OptionsControl, "multi-select": OptionsControl, range: RangeControl, text: TextControl, file: FilesControl }, NoControl = () => e.createElement(e.Fragment, null, "-"), ArgControl = ({ row, arg, updateArgs, isHovered }) => {
  let { key, control } = row, [isFocused, setFocused] = reactExports.useState(false), [boxedValue, setBoxedValue] = reactExports.useState({ value: arg });
  reactExports.useEffect(() => {
    isFocused || setBoxedValue({ value: arg });
  }, [isFocused, arg]);
  let onChange = reactExports.useCallback((argVal) => (setBoxedValue({ value: argVal }), updateArgs({ [key]: argVal }), argVal), [updateArgs, key]), onBlur = reactExports.useCallback(() => setFocused(false), []), onFocus = reactExports.useCallback(() => setFocused(true), []);
  if (!control || control.disable) {
    let canBeSetup = control?.disable !== true && row?.type?.name !== "function";
    return isHovered && canBeSetup ? e.createElement(yi, { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: true }, "Setup controls") : e.createElement(NoControl, null);
  }
  let props = { name: key, argType: row, value: boxedValue.value, onChange, onBlur, onFocus }, Control = Controls2[control.type] || NoControl;
  return e.createElement(Control, { ...props, ...control, controlType: control.type });
};
var Table = xr$1.table(({ theme }) => ({ "&&": { borderCollapse: "collapse", borderSpacing: 0, border: "none", tr: { border: "none !important", background: "none" }, "td, th": { padding: 0, border: "none", width: "auto!important" }, marginTop: 0, marginBottom: 0, "th:first-of-type, td:first-of-type": { paddingLeft: 0 }, "th:last-of-type, td:last-of-type": { paddingRight: 0 }, td: { paddingTop: 0, paddingBottom: 4, "&:not(:first-of-type)": { paddingLeft: 10, paddingRight: 0 } }, tbody: { boxShadow: "none", border: "none" }, code: at({ theme }), div: { span: { fontWeight: "bold" } }, "& code": { margin: 0, display: "inline-block", fontSize: theme.typography.size.s1 } } })), ArgJsDoc = ({ tags }) => {
  let params = (tags.params || []).filter((x22) => x22.description), hasDisplayableParams = params.length !== 0, hasDisplayableDeprecated = tags.deprecated != null, hasDisplayableReturns = tags.returns != null && tags.returns.description != null;
  return !hasDisplayableParams && !hasDisplayableReturns && !hasDisplayableDeprecated ? null : e.createElement(e.Fragment, null, e.createElement(Table, null, e.createElement("tbody", null, hasDisplayableDeprecated && e.createElement("tr", { key: "deprecated" }, e.createElement("td", { colSpan: 2 }, e.createElement("strong", null, "Deprecated"), ": ", tags.deprecated?.toString())), hasDisplayableParams && params.map((x22) => e.createElement("tr", { key: x22.name }, e.createElement("td", null, e.createElement("code", null, x22.name)), e.createElement("td", null, x22.description))), hasDisplayableReturns && e.createElement("tr", { key: "returns" }, e.createElement("td", null, e.createElement("code", null, "Returns")), e.createElement("td", null, tags.returns?.description)))));
};
var import_memoizerific = __toESM(require_memoizerific());
var ITEMS_BEFORE_EXPANSION = 8, Summary = xr$1.div(({ isExpanded }) => ({ display: "flex", flexDirection: isExpanded ? "column" : "row", flexWrap: "wrap", alignItems: "flex-start", marginBottom: "-4px", minWidth: 100 })), Text3 = xr$1.span(at, ({ theme, simple = false }) => ({ flex: "0 0 auto", fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.size.s1, wordBreak: "break-word", whiteSpace: "normal", maxWidth: "100%", margin: 0, marginRight: "4px", marginBottom: "4px", paddingTop: "2px", paddingBottom: "2px", lineHeight: "13px", ...simple && { background: "transparent", border: "0 none", paddingLeft: 0 } })), ExpandButton = xr$1.button(({ theme }) => ({ fontFamily: theme.typography.fonts.mono, color: theme.color.secondary, marginBottom: "4px", background: "none", border: "none" })), Expandable = xr$1.div(at, ({ theme }) => ({ fontFamily: theme.typography.fonts.mono, color: theme.color.secondary, fontSize: theme.typography.size.s1, margin: 0, whiteSpace: "nowrap", display: "flex", alignItems: "center" })), Detail = xr$1.div(({ theme, width }) => ({ width, minWidth: 200, maxWidth: 800, padding: 15, fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.size.s1, boxSizing: "content-box", "& code": { padding: "0 !important" } })), ChevronUpIcon = xr$1(ChevronSmallUpIcon)({ marginLeft: 4 }), ChevronDownIcon = xr$1(ChevronSmallDownIcon)({ marginLeft: 4 }), EmptyArg = () => e.createElement("span", null, "-"), ArgText = ({ text, simple }) => e.createElement(Text3, { simple }, text), calculateDetailWidth = (0, import_memoizerific.default)(1e3)((detail) => {
  let lines = detail.split(/\r?\n/);
  return `${Math.max(...lines.map((x22) => x22.length))}ch`;
}), getSummaryItems = (summary) => {
  if (!summary) return [summary];
  let summaryItems = summary.split("|").map((value2) => value2.trim());
  return uniq2(summaryItems);
}, renderSummaryItems = (summaryItems, isExpanded = true) => {
  let items = summaryItems;
  return isExpanded || (items = summaryItems.slice(0, ITEMS_BEFORE_EXPANSION)), items.map((item) => e.createElement(ArgText, { key: item, text: item === "" ? '""' : item }));
}, ArgSummary = ({ value: value2, initialExpandedArgs }) => {
  let { summary, detail } = value2, [isOpen, setIsOpen] = reactExports.useState(false), [isExpanded, setIsExpanded] = reactExports.useState(initialExpandedArgs || false);
  if (summary == null) return null;
  let summaryAsString = typeof summary.toString == "function" ? summary.toString() : summary;
  if (detail == null) {
    if (/[(){}[\]<>]/.test(summaryAsString)) return e.createElement(ArgText, { text: summaryAsString });
    let summaryItems = getSummaryItems(summaryAsString), itemsCount = summaryItems.length;
    return itemsCount > ITEMS_BEFORE_EXPANSION ? e.createElement(Summary, { isExpanded }, renderSummaryItems(summaryItems, isExpanded), e.createElement(ExpandButton, { onClick: () => setIsExpanded(!isExpanded) }, isExpanded ? "Show less..." : `Show ${itemsCount - ITEMS_BEFORE_EXPANSION} more...`)) : e.createElement(Summary, null, renderSummaryItems(summaryItems));
  }
  return e.createElement(N3, { closeOnOutsideClick: true, placement: "bottom", visible: isOpen, onVisibleChange: (isVisible) => {
    setIsOpen(isVisible);
  }, tooltip: e.createElement(Detail, { width: calculateDetailWidth(detail) }, e.createElement(ru, { language: "jsx", format: false }, detail)) }, e.createElement(Expandable, { className: "sbdocs-expandable" }, e.createElement("span", null, summaryAsString), isOpen ? e.createElement(ChevronUpIcon, null) : e.createElement(ChevronDownIcon, null)));
}, ArgValue = ({ value: value2, initialExpandedArgs }) => value2 == null ? e.createElement(EmptyArg, null) : e.createElement(ArgSummary, { value: value2, initialExpandedArgs });
var Name = xr$1.span({ fontWeight: "bold" }), Required = xr$1.span(({ theme }) => ({ color: theme.color.negative, fontFamily: theme.typography.fonts.mono, cursor: "help" })), Description = xr$1.div(({ theme }) => ({ "&&": { p: { margin: "0 0 10px 0" }, a: { color: theme.color.secondary } }, code: { ...at({ theme }), fontSize: 12, fontFamily: theme.typography.fonts.mono }, "& code": { margin: 0, display: "inline-block" }, "& pre > code": { whiteSpace: "pre-wrap" } })), Type = xr$1.div(({ theme, hasDescription }) => ({ color: theme.base === "light" ? curriedTransparentize$1(0.1, theme.color.defaultText) : curriedTransparentize$1(0.2, theme.color.defaultText), marginTop: hasDescription ? 4 : 0 })), TypeWithJsDoc = xr$1.div(({ theme, hasDescription }) => ({ color: theme.base === "light" ? curriedTransparentize$1(0.1, theme.color.defaultText) : curriedTransparentize$1(0.2, theme.color.defaultText), marginTop: hasDescription ? 12 : 0, marginBottom: 12 })), StyledTd = xr$1.td(({ expandable }) => ({ paddingLeft: expandable ? "40px !important" : "20px !important" })), toSummary = (value2) => value2 && { summary: typeof value2 == "string" ? value2 : value2.name }, ArgRow = (props) => {
  let [isHovered, setIsHovered] = reactExports.useState(false), { row, updateArgs, compact, expandable, initialExpandedArgs } = props, { name, description } = row, table = row.table || {}, type = table.type || toSummary(row.type), defaultValue = table.defaultValue || row.defaultValue, required = row.type?.required, hasDescription = description != null && description !== "";
  return e.createElement("tr", { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false) }, e.createElement(StyledTd, { expandable: expandable ?? false }, e.createElement(Name, null, name), required ? e.createElement(Required, { title: "Required" }, "*") : null), compact ? null : e.createElement("td", null, hasDescription && e.createElement(Description, null, e.createElement(index_modern_default, null, description)), table.jsDocTags != null ? e.createElement(e.Fragment, null, e.createElement(TypeWithJsDoc, { hasDescription }, e.createElement(ArgValue, { value: type, initialExpandedArgs })), e.createElement(ArgJsDoc, { tags: table.jsDocTags })) : e.createElement(Type, { hasDescription }, e.createElement(ArgValue, { value: type, initialExpandedArgs }))), compact ? null : e.createElement("td", null, e.createElement(ArgValue, { value: defaultValue, initialExpandedArgs })), updateArgs ? e.createElement("td", null, e.createElement(ArgControl, { ...props, isHovered })) : null);
};
var Wrapper9 = xr$1.div(({ inAddonPanel, theme }) => ({ height: inAddonPanel ? "100%" : "auto", display: "flex", border: inAddonPanel ? "none" : `1px solid ${theme.appBorderColor}`, borderRadius: inAddonPanel ? 0 : theme.appBorderRadius, padding: inAddonPanel ? 0 : 40, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 15, background: theme.background.content })), Links = xr$1.div(({ theme }) => ({ display: "flex", fontSize: theme.typography.size.s2 - 1, gap: 25 })), Empty = ({ inAddonPanel }) => {
  let [isLoading, setIsLoading] = reactExports.useState(true);
  return reactExports.useEffect(() => {
    let load = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(load);
  }, []), isLoading ? null : e.createElement(Wrapper9, { inAddonPanel }, e.createElement(Fo, { title: inAddonPanel ? "Interactive story playground" : "Args table with interactive controls couldn't be auto-generated", description: e.createElement(e.Fragment, null, "Controls give you an easy to use interface to test your components. Set your story args and you'll see controls appearing here automatically."), footer: e.createElement(Links, null, inAddonPanel && e.createElement(e.Fragment, null, e.createElement(yi, { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: true }, e.createElement(DocumentIcon, null), " Read docs")), !inAddonPanel && e.createElement(yi, { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: true }, e.createElement(DocumentIcon, null), " Learn how to set that up")) }));
};
var ExpanderIconDown = xr$1(ChevronDownIcon$1)(({ theme }) => ({ marginRight: 8, marginLeft: -10, marginTop: -2, height: 12, width: 12, color: theme.base === "light" ? curriedTransparentize$1(0.25, theme.color.defaultText) : curriedTransparentize$1(0.3, theme.color.defaultText), border: "none", display: "inline-block" })), ExpanderIconRight = xr$1(ChevronRightIcon)(({ theme }) => ({ marginRight: 8, marginLeft: -10, marginTop: -2, height: 12, width: 12, color: theme.base === "light" ? curriedTransparentize$1(0.25, theme.color.defaultText) : curriedTransparentize$1(0.3, theme.color.defaultText), border: "none", display: "inline-block" })), FlexWrapper = xr$1.span(({ theme }) => ({ display: "flex", lineHeight: "20px", alignItems: "center" })), Section = xr$1.td(({ theme }) => ({ position: "relative", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: theme.typography.weight.bold, fontSize: theme.typography.size.s1 - 1, color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText), background: `${theme.background.app} !important`, "& ~ td": { background: `${theme.background.app} !important` } })), Subsection = xr$1.td(({ theme }) => ({ position: "relative", fontWeight: theme.typography.weight.bold, fontSize: theme.typography.size.s2 - 1, background: theme.background.app })), StyledTd2 = xr$1.td({ position: "relative" }), StyledTr = xr$1.tr(({ theme }) => ({ "&:hover > td": { backgroundColor: `${curriedLighten$1(5e-3, theme.background.app)} !important`, boxShadow: `${theme.color.mediumlight} 0 - 1px 0 0 inset`, cursor: "row-resize" } })), ClickIntercept = xr$1.button({ background: "none", border: "none", padding: "0", font: "inherit", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, height: "100%", width: "100%", color: "transparent", cursor: "row-resize !important" }), SectionRow = ({ level = "section", label, children, initialExpanded = true, colSpan = 3 }) => {
  let [expanded, setExpanded] = reactExports.useState(initialExpanded), Level = level === "subsection" ? Subsection : Section, itemCount = children?.length || 0, caption = level === "subsection" ? `${itemCount} item${itemCount !== 1 ? "s" : ""}` : "", helperText = `${expanded ? "Hide" : "Show"} ${level === "subsection" ? itemCount : label} item${itemCount !== 1 ? "s" : ""}`;
  return e.createElement(e.Fragment, null, e.createElement(StyledTr, { title: helperText }, e.createElement(Level, { colSpan: 1 }, e.createElement(ClickIntercept, { onClick: (e23) => setExpanded(!expanded), tabIndex: 0 }, helperText), e.createElement(FlexWrapper, null, expanded ? e.createElement(ExpanderIconDown, null) : e.createElement(ExpanderIconRight, null), label)), e.createElement(StyledTd2, { colSpan: colSpan - 1 }, e.createElement(ClickIntercept, { onClick: (e23) => setExpanded(!expanded), tabIndex: -1, style: { outline: "none" } }, helperText), expanded ? null : caption)), expanded ? children : null);
};
var TableWrapper = xr$1.div(({ theme }) => ({ width: "100%", borderSpacing: 0, color: theme.color.defaultText })), Row = xr$1.div(({ theme }) => ({ display: "flex", borderBottom: `1px solid ${theme.appBorderColor}`, "&:last-child": { borderBottom: 0 } })), Column = xr$1.div(({ position, theme }) => {
  let baseStyles = { display: "flex", flexDirection: "column", gap: 5, padding: "10px 15px", alignItems: "flex-start" };
  switch (position) {
    case "first":
      return { ...baseStyles, width: "25%", paddingLeft: 20 };
    case "second":
      return { ...baseStyles, width: "35%" };
    case "third":
      return { ...baseStyles, width: "15%" };
    case "last":
      return { ...baseStyles, width: "25%", paddingRight: 20 };
  }
}), SkeletonText = xr$1.div(({ theme, width, height }) => ({ animation: `${theme.animation.glow} 1.5s ease-in-out infinite`, background: theme.appBorderColor, width: width || "100%", height: height || 16, borderRadius: 3 })), Skeleton = () => e.createElement(TableWrapper, null, e.createElement(Row, null, e.createElement(Column, { position: "first" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "second" }, e.createElement(SkeletonText, { width: "30%" })), e.createElement(Column, { position: "third" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "last" }, e.createElement(SkeletonText, { width: "60%" }))), e.createElement(Row, null, e.createElement(Column, { position: "first" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "second" }, e.createElement(SkeletonText, { width: "80%" }), e.createElement(SkeletonText, { width: "30%" })), e.createElement(Column, { position: "third" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "last" }, e.createElement(SkeletonText, { width: "60%" }))), e.createElement(Row, null, e.createElement(Column, { position: "first" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "second" }, e.createElement(SkeletonText, { width: "80%" }), e.createElement(SkeletonText, { width: "30%" })), e.createElement(Column, { position: "third" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "last" }, e.createElement(SkeletonText, { width: "60%" }))), e.createElement(Row, null, e.createElement(Column, { position: "first" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "second" }, e.createElement(SkeletonText, { width: "80%" }), e.createElement(SkeletonText, { width: "30%" })), e.createElement(Column, { position: "third" }, e.createElement(SkeletonText, { width: "60%" })), e.createElement(Column, { position: "last" }, e.createElement(SkeletonText, { width: "60%" }))));
var TableWrapper2 = xr$1.table(({ theme, compact, inAddonPanel }) => ({ "&&": { borderSpacing: 0, color: theme.color.defaultText, "td, th": { padding: 0, border: "none", verticalAlign: "top", textOverflow: "ellipsis" }, fontSize: theme.typography.size.s2 - 1, lineHeight: "20px", textAlign: "left", width: "100%", marginTop: inAddonPanel ? 0 : 25, marginBottom: inAddonPanel ? 0 : 40, "thead th:first-of-type, td:first-of-type": { width: "25%" }, "th:first-of-type, td:first-of-type": { paddingLeft: 20 }, "th:nth-of-type(2), td:nth-of-type(2)": { ...compact ? null : { width: "35%" } }, "td:nth-of-type(3)": { ...compact ? null : { width: "15%" } }, "th:last-of-type, td:last-of-type": { paddingRight: 20, ...compact ? null : { width: "25%" } }, th: { color: theme.base === "light" ? curriedTransparentize$1(0.25, theme.color.defaultText) : curriedTransparentize$1(0.45, theme.color.defaultText), paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15 }, td: { paddingTop: "10px", paddingBottom: "10px", "&:not(:first-of-type)": { paddingLeft: 15, paddingRight: 15 }, "&:last-of-type": { paddingRight: 20 } }, marginLeft: inAddonPanel ? 0 : 1, marginRight: inAddonPanel ? 0 : 1, tbody: { ...inAddonPanel ? null : { filter: theme.base === "light" ? "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))" }, "> tr > *": { background: theme.background.content, borderTop: `1px solid ${theme.appBorderColor}` }, ...inAddonPanel ? null : { "> tr:first-of-type > *": { borderBlockStart: `1px solid ${theme.appBorderColor}` }, "> tr:last-of-type > *": { borderBlockEnd: `1px solid ${theme.appBorderColor}` }, "> tr > *:first-of-type": { borderInlineStart: `1px solid ${theme.appBorderColor}` }, "> tr > *:last-of-type": { borderInlineEnd: `1px solid ${theme.appBorderColor}` }, "> tr:first-of-type > td:first-of-type": { borderTopLeftRadius: theme.appBorderRadius }, "> tr:first-of-type > td:last-of-type": { borderTopRightRadius: theme.appBorderRadius }, "> tr:last-of-type > td:first-of-type": { borderBottomLeftRadius: theme.appBorderRadius }, "> tr:last-of-type > td:last-of-type": { borderBottomRightRadius: theme.appBorderRadius } } } } })), StyledIconButton = xr$1(wo)(({ theme }) => ({ margin: "-4px -12px -4px 0" })), ControlHeadingWrapper = xr$1.span({ display: "flex", justifyContent: "space-between" });
var sortFns = { alpha: (a22, b22) => (a22.name ?? "").localeCompare(b22.name ?? ""), requiredFirst: (a22, b22) => +!!b22.type?.required - +!!a22.type?.required || (a22.name ?? "").localeCompare(b22.name ?? ""), none: null }, groupRows = (rows, sort) => {
  let sections = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
  if (!rows) return sections;
  Object.entries(rows).forEach(([key, row]) => {
    let { category, subcategory } = row?.table || {};
    if (category) {
      let section = sections.sections[category] || { ungrouped: [], subsections: {} };
      if (!subcategory) section.ungrouped.push({ key, ...row });
      else {
        let subsection = section.subsections[subcategory] || [];
        subsection.push({ key, ...row }), section.subsections[subcategory] = subsection;
      }
      sections.sections[category] = section;
    } else if (subcategory) {
      let subsection = sections.ungroupedSubsections[subcategory] || [];
      subsection.push({ key, ...row }), sections.ungroupedSubsections[subcategory] = subsection;
    } else sections.ungrouped.push({ key, ...row });
  });
  let sortFn = sortFns[sort], sortSubsection = (record) => sortFn ? Object.keys(record).reduce((acc, cur) => ({ ...acc, [cur]: record[cur].sort(sortFn) }), {}) : record;
  return { ungrouped: sortFn ? sections.ungrouped.sort(sortFn) : sections.ungrouped, ungroupedSubsections: sortSubsection(sections.ungroupedSubsections), sections: Object.keys(sections.sections).reduce((acc, cur) => ({ ...acc, [cur]: { ungrouped: sortFn ? sections.sections[cur].ungrouped.sort(sortFn) : sections.sections[cur].ungrouped, subsections: sortSubsection(sections.sections[cur].subsections) } }), {}) };
}, safeIncludeConditionalArg = (row, args, globals) => {
  try {
    return z$2(row, args, globals);
  } catch (err) {
    return once.warn(err.message), false;
  }
}, ArgsTable = (props) => {
  let { updateArgs, resetArgs, compact, inAddonPanel, initialExpandedArgs, sort = "none", isLoading } = props;
  if ("error" in props) {
    let { error } = props;
    return e.createElement(EmptyBlock, null, error, " ", e.createElement(yi, { href: "http://storybook.js.org/docs/", target: "_blank", withArrow: true }, e.createElement(DocumentIcon, null), " Read the docs"));
  }
  if (isLoading) return e.createElement(Skeleton, null);
  let { rows, args, globals } = "rows" in props ? props : { rows: void 0, args: void 0, globals: void 0 }, groups = groupRows(pickBy(rows || {}, (row) => !row?.table?.disable && safeIncludeConditionalArg(row, args || {}, globals || {})), sort), hasNoUngrouped = groups.ungrouped.length === 0, hasNoSections = Object.entries(groups.sections).length === 0, hasNoUngroupedSubsections = Object.entries(groups.ungroupedSubsections).length === 0;
  if (hasNoUngrouped && hasNoSections && hasNoUngroupedSubsections) return e.createElement(Empty, { inAddonPanel });
  let colSpan = 1;
  updateArgs && (colSpan += 1), compact || (colSpan += 2);
  let expandable = Object.keys(groups.sections).length > 0, common = { updateArgs, compact, inAddonPanel, initialExpandedArgs };
  return e.createElement(jl, null, e.createElement(TableWrapper2, { compact, inAddonPanel, className: "docblock-argstable sb-unstyled" }, e.createElement("thead", { className: "docblock-argstable-head" }, e.createElement("tr", null, e.createElement("th", null, e.createElement("span", null, "Name")), compact ? null : e.createElement("th", null, e.createElement("span", null, "Description")), compact ? null : e.createElement("th", null, e.createElement("span", null, "Default")), updateArgs ? e.createElement("th", null, e.createElement(ControlHeadingWrapper, null, "Control", " ", !isLoading && resetArgs && e.createElement(StyledIconButton, { onClick: () => resetArgs(), title: "Reset controls" }, e.createElement(UndoIcon, { "aria-hidden": true })))) : null)), e.createElement("tbody", { className: "docblock-argstable-body" }, groups.ungrouped.map((row) => e.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], ...common })), Object.entries(groups.ungroupedSubsections).map(([subcategory, subsection]) => e.createElement(SectionRow, { key: subcategory, label: subcategory, level: "subsection", colSpan }, subsection.map((row) => e.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], expandable, ...common })))), Object.entries(groups.sections).map(([category, section]) => e.createElement(SectionRow, { key: category, label: category, level: "section", colSpan }, section.ungrouped.map((row) => e.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], ...common })), Object.entries(section.subsections).map(([subcategory, subsection]) => e.createElement(SectionRow, { key: subcategory, label: subcategory, level: "subsection", colSpan }, subsection.map((row) => e.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], expandable, ...common })))))))));
};
var anchorBlockIdFromId = (storyId) => `anchor--${storyId}`, Anchor = ({ storyId, children }) => e.createElement("div", { id: anchorBlockIdFromId(storyId), className: "sb-anchor" }, children);
globalThis && globalThis.__DOCS_CONTEXT__ === void 0 && (globalThis.__DOCS_CONTEXT__ = reactExports.createContext(null), globalThis.__DOCS_CONTEXT__.displayName = "DocsContext");
var DocsContext = globalThis ? globalThis.__DOCS_CONTEXT__ : reactExports.createContext(null);
var useOf = (moduleExportOrType, validTypes) => reactExports.useContext(DocsContext).resolveOf(moduleExportOrType, validTypes);
var titleCase = (str) => str.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(""), getComponentName = (component) => {
  if (component) return typeof component == "string" ? component.includes("-") ? titleCase(component) : component : component.__docgenInfo && component.__docgenInfo.displayName ? component.__docgenInfo.displayName : component.name;
};
function scrollToElement(element, block = "start") {
  element.scrollIntoView({ behavior: "smooth", block, inline: "nearest" });
}
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJS2 = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, __copyProps = (to2, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to2, key) && key !== except && __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to2;
}, __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(!mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod)), eventProperties = ["bubbles", "cancelBubble", "cancelable", "composed", "currentTarget", "defaultPrevented", "eventPhase", "isTrusted", "returnValue", "srcElement", "target", "timeStamp", "type"], customEventSpecificProperties = ["detail"];
function extractEventHiddenProperties(event) {
  let rebuildEvent = eventProperties.filter((value2) => event[value2] !== void 0).reduce((acc, value2) => (acc[value2] = event[value2], acc), {});
  if (event instanceof CustomEvent) for (let value2 of customEventSpecificProperties.filter((value22) => event[value22] !== void 0)) rebuildEvent[value2] = event[value2];
  return rebuildEvent;
}
var require_es_object_atoms = __commonJS2({ "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(exports, module) {
  module.exports = Object;
} }), require_es_errors = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(exports, module) {
  module.exports = Error;
} }), require_eval = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports, module) {
  module.exports = EvalError;
} }), require_range = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports, module) {
  module.exports = RangeError;
} }), require_ref = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports, module) {
  module.exports = ReferenceError;
} }), require_syntax = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(exports, module) {
  module.exports = SyntaxError;
} }), require_type = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports, module) {
  module.exports = TypeError;
} }), require_uri = __commonJS2({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports, module) {
  module.exports = URIError;
} }), require_abs = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(exports, module) {
  module.exports = Math.abs;
} }), require_floor = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(exports, module) {
  module.exports = Math.floor;
} }), require_max = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(exports, module) {
  module.exports = Math.max;
} }), require_min = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(exports, module) {
  module.exports = Math.min;
} }), require_pow = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(exports, module) {
  module.exports = Math.pow;
} }), require_round = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(exports, module) {
  module.exports = Math.round;
} }), require_isNaN = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(exports, module) {
  module.exports = Number.isNaN || function(a22) {
    return a22 !== a22;
  };
} }), require_sign = __commonJS2({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(exports, module) {
  var $isNaN = require_isNaN();
  module.exports = function(number) {
    return $isNaN(number) || number === 0 ? number : number < 0 ? -1 : 1;
  };
} }), require_gOPD = __commonJS2({ "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports, module) {
  module.exports = Object.getOwnPropertyDescriptor;
} }), require_gopd = __commonJS2({ "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports, module) {
  var $gOPD = require_gOPD();
  if ($gOPD) try {
    $gOPD([], "length");
  } catch {
    $gOPD = null;
  }
  module.exports = $gOPD;
} }), require_es_define_property = __commonJS2({ "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(exports, module) {
  var $defineProperty = Object.defineProperty || false;
  if ($defineProperty) try {
    $defineProperty({}, "a", { value: 1 });
  } catch {
    $defineProperty = false;
  }
  module.exports = $defineProperty;
} }), require_shams = __commonJS2({ "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(exports, module) {
  module.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return false;
    if (typeof Symbol.iterator == "symbol") return true;
    var obj = {}, sym = Symbol("test"), symObj = Object(sym);
    if (typeof sym == "string" || Object.prototype.toString.call(sym) !== "[object Symbol]" || Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
    var symVal = 42;
    obj[sym] = symVal;
    for (var _2 in obj) return false;
    if (typeof Object.keys == "function" && Object.keys(obj).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym || !Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
    }
    return true;
  };
} }), require_has_symbols = __commonJS2({ "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(exports, module) {
  var origSymbol = typeof Symbol < "u" && Symbol, hasSymbolSham = require_shams();
  module.exports = function() {
    return typeof origSymbol != "function" || typeof Symbol != "function" || typeof origSymbol("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : hasSymbolSham();
  };
} }), require_Reflect_getPrototypeOf = __commonJS2({ "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
  module.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
} }), require_Object_getPrototypeOf = __commonJS2({ "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
  var $Object = require_es_object_atoms();
  module.exports = $Object.getPrototypeOf || null;
} }), require_implementation = __commonJS2({ "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports, module) {
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", toStr = Object.prototype.toString, max = Math.max, funcType = "[object Function]", concatty = function(a22, b22) {
    for (var arr = [], i22 = 0; i22 < a22.length; i22 += 1) arr[i22] = a22[i22];
    for (var j2 = 0; j2 < b22.length; j2 += 1) arr[j2 + a22.length] = b22[j2];
    return arr;
  }, slicy = function(arrLike, offset) {
    for (var arr = [], i22 = offset, j2 = 0; i22 < arrLike.length; i22 += 1, j2 += 1) arr[j2] = arrLike[i22];
    return arr;
  }, joiny = function(arr, joiner) {
    for (var str = "", i22 = 0; i22 < arr.length; i22 += 1) str += arr[i22], i22 + 1 < arr.length && (str += joiner);
    return str;
  };
  module.exports = function(that) {
    var target = this;
    if (typeof target != "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
    for (var args = slicy(arguments, 1), bound, binder = function() {
      if (this instanceof bound) {
        var result = target.apply(this, concatty(args, arguments));
        return Object(result) === result ? result : this;
      }
      return target.apply(that, concatty(args, arguments));
    }, boundLength = max(0, target.length - args.length), boundArgs = [], i22 = 0; i22 < boundLength; i22++) boundArgs[i22] = "$" + i22;
    if (bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder), target.prototype) {
      var Empty2 = function() {
      };
      Empty2.prototype = target.prototype, bound.prototype = new Empty2(), Empty2.prototype = null;
    }
    return bound;
  };
} }), require_function_bind = __commonJS2({ "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports, module) {
  var implementation = require_implementation();
  module.exports = Function.prototype.bind || implementation;
} }), require_functionCall = __commonJS2({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
  module.exports = Function.prototype.call;
} }), require_functionApply = __commonJS2({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
  module.exports = Function.prototype.apply;
} }), require_reflectApply = __commonJS2({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
  module.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
} }), require_actualApply = __commonJS2({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
  var bind = require_function_bind(), $apply = require_functionApply(), $call = require_functionCall(), $reflectApply = require_reflectApply();
  module.exports = $reflectApply || bind.call($call, $apply);
} }), require_call_bind_apply_helpers = __commonJS2({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(exports, module) {
  var bind = require_function_bind(), $TypeError = require_type(), $call = require_functionCall(), $actualApply = require_actualApply();
  module.exports = function(args) {
    if (args.length < 1 || typeof args[0] != "function") throw new $TypeError("a function is required");
    return $actualApply(bind, $call, args);
  };
} }), require_get = __commonJS2({ "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(exports, module) {
  var callBind = require_call_bind_apply_helpers(), gOPD = require_gopd(), hasProtoAccessor;
  try {
    hasProtoAccessor = [].__proto__ === Array.prototype;
  } catch (e23) {
    if (!e23 || typeof e23 != "object" || !("code" in e23) || e23.code !== "ERR_PROTO_ACCESS") throw e23;
  }
  var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__"), $Object = Object, $getPrototypeOf = $Object.getPrototypeOf;
  module.exports = desc && typeof desc.get == "function" ? callBind([desc.get]) : typeof $getPrototypeOf == "function" ? function(value2) {
    return $getPrototypeOf(value2 == null ? value2 : $Object(value2));
  } : false;
} }), require_get_proto = __commonJS2({ "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(exports, module) {
  var reflectGetProto = require_Reflect_getPrototypeOf(), originalGetProto = require_Object_getPrototypeOf(), getDunderProto = require_get();
  module.exports = reflectGetProto ? function(O2) {
    return reflectGetProto(O2);
  } : originalGetProto ? function(O2) {
    if (!O2 || typeof O2 != "object" && typeof O2 != "function") throw new TypeError("getProto: not an object");
    return originalGetProto(O2);
  } : getDunderProto ? function(O2) {
    return getDunderProto(O2);
  } : null;
} }), require_hasown = __commonJS2({ "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports, module) {
  var call = Function.prototype.call, $hasOwn = Object.prototype.hasOwnProperty, bind = require_function_bind();
  module.exports = bind.call(call, $hasOwn);
} }), require_get_intrinsic = __commonJS2({ "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(exports, module) {
  var undefined2, $Object = require_es_object_atoms(), $Error = require_es_errors(), $EvalError = require_eval(), $RangeError = require_range(), $ReferenceError = require_ref(), $SyntaxError = require_syntax(), $TypeError = require_type(), $URIError = require_uri(), abs = require_abs(), floor = require_floor(), max = require_max(), min = require_min(), pow = require_pow(), round = require_round(), sign = require_sign(), $Function = Function, getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch {
    }
  }, $gOPD = require_gopd(), $defineProperty = require_es_define_property(), throwTypeError = function() {
    throw new $TypeError();
  }, ThrowTypeError = $gOPD ? function() {
    try {
      return arguments.callee, throwTypeError;
    } catch {
      try {
        return $gOPD(arguments, "callee").get;
      } catch {
        return throwTypeError;
      }
    }
  }() : throwTypeError, hasSymbols = require_has_symbols()(), getProto = require_get_proto(), $ObjectGPO = require_Object_getPrototypeOf(), $ReflectGPO = require_Reflect_getPrototypeOf(), $apply = require_functionApply(), $call = require_functionCall(), needsEval = {}, TypedArray = typeof Uint8Array > "u" || !getProto ? undefined2 : getProto(Uint8Array), INTRINSICS = { __proto__: null, "%AggregateError%": typeof AggregateError > "u" ? undefined2 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? undefined2 : ArrayBuffer, "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2, "%AsyncFromSyncIteratorPrototype%": undefined2, "%AsyncFunction%": needsEval, "%AsyncGenerator%": needsEval, "%AsyncGeneratorFunction%": needsEval, "%AsyncIteratorPrototype%": needsEval, "%Atomics%": typeof Atomics > "u" ? undefined2 : Atomics, "%BigInt%": typeof BigInt > "u" ? undefined2 : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? undefined2 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? undefined2 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? undefined2 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $Error, "%eval%": eval, "%EvalError%": $EvalError, "%Float16Array%": typeof Float16Array > "u" ? undefined2 : Float16Array, "%Float32Array%": typeof Float32Array > "u" ? undefined2 : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? undefined2 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? undefined2 : FinalizationRegistry, "%Function%": $Function, "%GeneratorFunction%": needsEval, "%Int8Array%": typeof Int8Array > "u" ? undefined2 : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? undefined2 : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? undefined2 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2, "%JSON%": typeof JSON == "object" ? JSON : undefined2, "%Map%": typeof Map > "u" ? undefined2 : Map, "%MapIteratorPrototype%": typeof Map > "u" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": $Object, "%Object.getOwnPropertyDescriptor%": $gOPD, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? undefined2 : Promise, "%Proxy%": typeof Proxy > "u" ? undefined2 : Proxy, "%RangeError%": $RangeError, "%ReferenceError%": $ReferenceError, "%Reflect%": typeof Reflect > "u" ? undefined2 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? undefined2 : Set, "%SetIteratorPrototype%": typeof Set > "u" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? undefined2 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2, "%Symbol%": hasSymbols ? Symbol : undefined2, "%SyntaxError%": $SyntaxError, "%ThrowTypeError%": ThrowTypeError, "%TypedArray%": TypedArray, "%TypeError%": $TypeError, "%Uint8Array%": typeof Uint8Array > "u" ? undefined2 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? undefined2 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? undefined2 : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? undefined2 : Uint32Array, "%URIError%": $URIError, "%WeakMap%": typeof WeakMap > "u" ? undefined2 : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? undefined2 : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? undefined2 : WeakSet, "%Function.prototype.call%": $call, "%Function.prototype.apply%": $apply, "%Object.defineProperty%": $defineProperty, "%Object.getPrototypeOf%": $ObjectGPO, "%Math.abs%": abs, "%Math.floor%": floor, "%Math.max%": max, "%Math.min%": min, "%Math.pow%": pow, "%Math.round%": round, "%Math.sign%": sign, "%Reflect.getPrototypeOf%": $ReflectGPO };
  if (getProto) try {
    null.error;
  } catch (e23) {
    errorProto = getProto(getProto(e23)), INTRINSICS["%Error.prototype%"] = errorProto;
  }
  var errorProto, doEval = function doEval2(name) {
    var value2;
    if (name === "%AsyncFunction%") value2 = getEvalledConstructor("async function () {}");
    else if (name === "%GeneratorFunction%") value2 = getEvalledConstructor("function* () {}");
    else if (name === "%AsyncGeneratorFunction%") value2 = getEvalledConstructor("async function* () {}");
    else if (name === "%AsyncGenerator%") {
      var fn2 = doEval2("%AsyncGeneratorFunction%");
      fn2 && (value2 = fn2.prototype);
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      gen && getProto && (value2 = getProto(gen.prototype));
    }
    return INTRINSICS[name] = value2, value2;
  }, LEGACY_ALIASES = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, bind = require_function_bind(), hasOwn = require_hasown(), $concat = bind.call($call, Array.prototype.concat), $spliceApply = bind.call($apply, Array.prototype.splice), $replace = bind.call($call, String.prototype.replace), $strSlice = bind.call($call, String.prototype.slice), $exec = bind.call($call, RegExp.prototype.exec), rePropName2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, reEscapeChar2 = /\\(\\)?/g, stringToPath2 = function(string) {
    var first = $strSlice(string, 0, 1), last = $strSlice(string, -1);
    if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    var result = [];
    return $replace(string, rePropName2, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar2, "$1") : number || match;
    }), result;
  }, getBaseIntrinsic = function(name, allowMissing) {
    var intrinsicName = name, alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName) && (alias = LEGACY_ALIASES[intrinsicName], intrinsicName = "%" + alias[0] + "%"), hasOwn(INTRINSICS, intrinsicName)) {
      var value2 = INTRINSICS[intrinsicName];
      if (value2 === needsEval && (value2 = doEval(intrinsicName)), typeof value2 > "u" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      return { alias, name: intrinsicName, value: value2 };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  module.exports = function(name, allowMissing) {
    if (typeof name != "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof allowMissing != "boolean") throw new $TypeError('"allowMissing" argument must be a boolean');
    if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var parts = stringToPath2(name), intrinsicBaseName = parts.length > 0 ? parts[0] : "", intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing), intrinsicRealName = intrinsic.name, value2 = intrinsic.value, skipFurtherCaching = false, alias = intrinsic.alias;
    alias && (intrinsicBaseName = alias[0], $spliceApply(parts, $concat([0, 1], alias)));
    for (var i22 = 1, isOwn = true; i22 < parts.length; i22 += 1) {
      var part = parts[i22], first = $strSlice(part, 0, 1), last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || last === '"' || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
      if ((part === "constructor" || !isOwn) && (skipFurtherCaching = true), intrinsicBaseName += "." + part, intrinsicRealName = "%" + intrinsicBaseName + "%", hasOwn(INTRINSICS, intrinsicRealName)) value2 = INTRINSICS[intrinsicRealName];
      else if (value2 != null) {
        if (!(part in value2)) {
          if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
          return;
        }
        if ($gOPD && i22 + 1 >= parts.length) {
          var desc = $gOPD(value2, part);
          isOwn = !!desc, isOwn && "get" in desc && !("originalValue" in desc.get) ? value2 = desc.get : value2 = value2[part];
        } else isOwn = hasOwn(value2, part), value2 = value2[part];
        isOwn && !skipFurtherCaching && (INTRINSICS[intrinsicRealName] = value2);
      }
    }
    return value2;
  };
} }), require_call_bound = __commonJS2({ "node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js"(exports, module) {
  var GetIntrinsic = require_get_intrinsic(), callBindBasic = require_call_bind_apply_helpers(), $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
  module.exports = function(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    return typeof intrinsic == "function" && $indexOf(name, ".prototype.") > -1 ? callBindBasic([intrinsic]) : intrinsic;
  };
} }), require_shams2 = __commonJS2({ "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(exports, module) {
  var hasSymbols = require_shams();
  module.exports = function() {
    return hasSymbols() && !!Symbol.toStringTag;
  };
} }), require_is_regex = __commonJS2({ "node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js"(exports, module) {
  var callBound = require_call_bound(), hasToStringTag = require_shams2()(), hasOwn = require_hasown(), gOPD = require_gopd(), fn2;
  hasToStringTag ? ($exec = callBound("RegExp.prototype.exec"), isRegexMarker = {}, throwRegexMarker = function() {
    throw isRegexMarker;
  }, badStringifier = { toString: throwRegexMarker, valueOf: throwRegexMarker }, typeof Symbol.toPrimitive == "symbol" && (badStringifier[Symbol.toPrimitive] = throwRegexMarker), fn2 = function(value2) {
    if (!value2 || typeof value2 != "object") return false;
    var descriptor = gOPD(value2, "lastIndex"), hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
    if (!hasLastIndexDataProperty) return false;
    try {
      $exec(value2, badStringifier);
    } catch (e23) {
      return e23 === isRegexMarker;
    }
  }) : ($toString = callBound("Object.prototype.toString"), regexClass = "[object RegExp]", fn2 = function(value2) {
    return !value2 || typeof value2 != "object" && typeof value2 != "function" ? false : $toString(value2) === regexClass;
  });
  var $exec, isRegexMarker, throwRegexMarker, badStringifier, $toString, regexClass;
  module.exports = fn2;
} }), require_is_function = __commonJS2({ "node_modules/.pnpm/is-function@1.0.2/node_modules/is-function/index.js"(exports, module) {
  module.exports = isFunction3;
  var toString2 = Object.prototype.toString;
  function isFunction3(fn2) {
    if (!fn2) return false;
    var string = toString2.call(fn2);
    return string === "[object Function]" || typeof fn2 == "function" && string !== "[object RegExp]" || typeof window < "u" && (fn2 === window.setTimeout || fn2 === window.alert || fn2 === window.confirm || fn2 === window.prompt);
  }
} }), require_safe_regex_test = __commonJS2({ "node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js"(exports, module) {
  var callBound = require_call_bound(), isRegex = require_is_regex(), $exec = callBound("RegExp.prototype.exec"), $TypeError = require_type();
  module.exports = function(regex2) {
    if (!isRegex(regex2)) throw new $TypeError("`regex` must be a RegExp");
    return function(s2) {
      return $exec(regex2, s2) !== null;
    };
  };
} }), require_is_symbol = __commonJS2({ "node_modules/.pnpm/is-symbol@1.1.1/node_modules/is-symbol/index.js"(exports, module) {
  var callBound = require_call_bound(), $toString = callBound("Object.prototype.toString"), hasSymbols = require_has_symbols()(), safeRegexTest = require_safe_regex_test();
  hasSymbols ? ($symToStr = callBound("Symbol.prototype.toString"), isSymString = safeRegexTest(/^Symbol\(.*\)$/), isSymbolObject = function(value2) {
    return typeof value2.valueOf() != "symbol" ? false : isSymString($symToStr(value2));
  }, module.exports = function(value2) {
    if (typeof value2 == "symbol") return true;
    if (!value2 || typeof value2 != "object" || $toString(value2) !== "[object Symbol]") return false;
    try {
      return isSymbolObject(value2);
    } catch {
      return false;
    }
  }) : module.exports = function(value2) {
    return false;
  };
  var $symToStr, isSymString, isSymbolObject;
} }), import_is_regex = __toESM2(require_is_regex()), import_is_function = __toESM2(require_is_function()), import_is_symbol = __toESM2(require_is_symbol());
function isObject(val) {
  return val != null && typeof val == "object" && Array.isArray(val) === false;
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global, freeGlobal_default = freeGlobal, freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal_default || freeSelf || Function("return this")(), root_default = root, Symbol2 = root_default.Symbol, Symbol_default = Symbol2, objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value2) {
  var isOwn = hasOwnProperty.call(value2, symToStringTag), tag = value2[symToStringTag];
  try {
    value2[symToStringTag] = void 0;
    var unmasked = true;
  } catch {
  }
  var result = nativeObjectToString.call(value2);
  return unmasked && (isOwn ? value2[symToStringTag] = tag : delete value2[symToStringTag]), result;
}
var getRawTag_default = getRawTag, objectProto2 = Object.prototype, nativeObjectToString2 = objectProto2.toString;
function objectToString(value2) {
  return nativeObjectToString2.call(value2);
}
var objectToString_default = objectToString, nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value2) {
  return value2 == null ? value2 === void 0 ? undefinedTag : nullTag : symToStringTag2 && symToStringTag2 in Object(value2) ? getRawTag_default(value2) : objectToString_default(value2);
}
var baseGetTag_default = baseGetTag;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
symbolProto ? symbolProto.toString : void 0;
function isObject2(value2) {
  var type = typeof value2;
  return value2 != null && (type == "object" || type == "function");
}
var isObject_default = isObject2, asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value2) {
  if (!isObject_default(value2)) return false;
  var tag = baseGetTag_default(value2);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction, coreJsData = root_default["__core-js_shared__"], coreJsData_default = coreJsData, maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked, funcProto = Function.prototype, funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch {
    }
    try {
      return func + "";
    } catch {
    }
  }
  return "";
}
var toSource_default = toSource, reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto2 = Function.prototype, objectProto3 = Object.prototype, funcToString2 = funcProto2.toString, hasOwnProperty2 = objectProto3.hasOwnProperty, reIsNative = RegExp("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value2) {
  if (!isObject_default(value2) || isMasked_default(value2)) return false;
  var pattern = isFunction_default(value2) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value2));
}
var baseIsNative_default = baseIsNative;
function getValue(object2, key) {
  return object2?.[key];
}
var getValue_default = getValue;
function getNative(object2, key) {
  var value2 = getValue_default(object2, key);
  return baseIsNative_default(value2) ? value2 : void 0;
}
var getNative_default = getNative;
function eq(value2, other) {
  return value2 === other || value2 !== value2 && other !== other;
}
var eq_default = eq;
var nativeCreate = getNative_default(Object, "create"), nativeCreate_default = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {}, this.size = 0;
}
var hashClear_default = hashClear;
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  return this.size -= result ? 1 : 0, result;
}
var hashDelete_default = hashDelete, HASH_UNDEFINED = "__lodash_hash_undefined__", objectProto4 = Object.prototype, hasOwnProperty3 = objectProto4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty3.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet, objectProto5 = Object.prototype, hasOwnProperty4 = objectProto5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty4.call(data, key);
}
var hashHas_default = hashHas, HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value2) {
  var data = this.__data__;
  return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate_default && value2 === void 0 ? HASH_UNDEFINED2 : value2, this;
}
var hashSet_default = hashSet;
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  for (this.clear(); ++index2 < length; ) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype.delete = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;
function listCacheClear() {
  this.__data__ = [], this.size = 0;
}
var listCacheClear_default = listCacheClear;
function assocIndexOf(array2, key) {
  for (var length = array2.length; length--; ) if (eq_default(array2[length][0], key)) return length;
  return -1;
}
var assocIndexOf_default = assocIndexOf, arrayProto = Array.prototype, splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  if (index2 < 0) return false;
  var lastIndex = data.length - 1;
  return index2 == lastIndex ? data.pop() : splice.call(data, index2, 1), --this.size, true;
}
var listCacheDelete_default = listCacheDelete;
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var listCacheGet_default = listCacheGet;
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;
function listCacheSet(key, value2) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  return index2 < 0 ? (++this.size, data.push([key, value2])) : data[index2][1] = value2, this;
}
var listCacheSet_default = listCacheSet;
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  for (this.clear(); ++index2 < length; ) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype.delete = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache, Map2 = getNative_default(root_default, "Map"), Map_default = Map2;
function mapCacheClear() {
  this.size = 0, this.__data__ = { hash: new Hash_default(), map: new (Map_default || ListCache_default)(), string: new Hash_default() };
}
var mapCacheClear_default = mapCacheClear;
function isKeyable(value2) {
  var type = typeof value2;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value2 !== "__proto__" : value2 === null;
}
var isKeyable_default = isKeyable;
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;
function mapCacheDelete(key) {
  var result = getMapData_default(this, key).delete(key);
  return this.size -= result ? 1 : 0, result;
}
var mapCacheDelete_default = mapCacheDelete;
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;
function mapCacheSet(key, value2) {
  var data = getMapData_default(this, key), size = data.size;
  return data.set(key, value2), this.size += data.size == size ? 0 : 1, this;
}
var mapCacheSet_default = mapCacheSet;
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  for (this.clear(); ++index2 < length; ) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype.delete = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache, FUNC_ERROR_TEXT = "Expected a function";
function memoize2(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) return cache.get(key);
    var result = func.apply(this, args);
    return memoized.cache = cache.set(key, result) || cache, result;
  };
  return memoized.cache = new (memoize2.Cache || MapCache_default)(), memoized;
}
memoize2.Cache = MapCache_default;
var memoize_default = memoize2, MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key;
  }), cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g;
memoizeCapped_default(function(string) {
  var result = [];
  return string.charCodeAt(0) === 46 && result.push(""), string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  }), result;
});
var isObject3 = isObject, dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
function convertUnconventionalData(data) {
  if (!isObject3(data)) return data;
  let result = data, wasMutated = false;
  return typeof Event < "u" && data instanceof Event && (result = extractEventHiddenProperties(result), wasMutated = true), result = Object.keys(result).reduce((acc, key) => {
    try {
      result[key] && result[key].toJSON, acc[key] = result[key];
    } catch {
      wasMutated = true;
    }
    return acc;
  }, {}), wasMutated ? result : data;
}
var replacer = function(options) {
  let objects, map, stack, keys;
  return function(key, value2) {
    try {
      if (key === "") return keys = [], objects = /* @__PURE__ */ new Map([[value2, "[]"]]), map = /* @__PURE__ */ new Map(), stack = [], value2;
      let origin = map.get(this) || this;
      for (; stack.length && origin !== stack[0]; ) stack.shift(), keys.pop();
      if (typeof value2 == "boolean") return value2;
      if (value2 === void 0) return options.allowUndefined ? "_undefined_" : void 0;
      if (value2 === null) return null;
      if (typeof value2 == "number") return value2 === Number.NEGATIVE_INFINITY ? "_-Infinity_" : value2 === Number.POSITIVE_INFINITY ? "_Infinity_" : Number.isNaN(value2) ? "_NaN_" : value2;
      if (typeof value2 == "bigint") return `_bigint_${value2.toString()}`;
      if (typeof value2 == "string") return dateFormat.test(value2) ? options.allowDate ? `_date_${value2}` : void 0 : value2;
      if ((0, import_is_regex.default)(value2)) return options.allowRegExp ? `_regexp_${value2.flags}|${value2.source}` : void 0;
      if ((0, import_is_function.default)(value2)) return;
      if ((0, import_is_symbol.default)(value2)) {
        if (!options.allowSymbol) return;
        let globalRegistryKey = Symbol.keyFor(value2);
        return globalRegistryKey !== void 0 ? `_gsymbol_${globalRegistryKey}` : `_symbol_${value2.toString().slice(7, -1)}`;
      }
      if (stack.length >= options.maxDepth) return Array.isArray(value2) ? `[Array(${value2.length})]` : "[Object]";
      if (value2 === this) return `_duplicate_${JSON.stringify(keys)}`;
      if (value2 instanceof Error && options.allowError) return { __isConvertedError__: true, errorProperties: { ...value2.cause ? { cause: value2.cause } : {}, ...value2, name: value2.name, message: value2.message, stack: value2.stack, "_constructor-name_": value2.constructor.name } };
      if (value2?.constructor?.name && value2.constructor.name !== "Object" && !Array.isArray(value2)) {
        let found2 = objects.get(value2);
        if (!found2) {
          let plainObject = { __isClassInstance__: true, __className__: value2.constructor.name, ...Object.getOwnPropertyNames(value2).reduce((acc, prop) => {
            try {
              acc[prop] = value2[prop];
            } catch {
            }
            return acc;
          }, {}) };
          return keys.push(key), stack.unshift(plainObject), objects.set(value2, JSON.stringify(keys)), value2 !== plainObject && map.set(value2, plainObject), plainObject;
        }
        return `_duplicate_${found2}`;
      }
      let found = objects.get(value2);
      if (!found) {
        let converted = Array.isArray(value2) ? value2 : convertUnconventionalData(value2);
        return keys.push(key), stack.unshift(converted), objects.set(value2, JSON.stringify(keys)), value2 !== converted && map.set(value2, converted), converted;
      }
      return `_duplicate_${found}`;
    } catch {
      return;
    }
  };
};
var defaultOptions = { maxDepth: 10, space: void 0, allowRegExp: true, allowDate: true, allowError: true, allowUndefined: true, allowSymbol: true }, stringify = (data, options = {}) => {
  let mergedOptions = { ...defaultOptions, ...options };
  return JSON.stringify(convertUnconventionalData(data), replacer(mergedOptions), options.space);
};
function argsHash(args) {
  return stringify(args, { maxDepth: 50 });
}
var SourceContext = reactExports.createContext({ sources: {} }), UNKNOWN_ARGS_HASH = "--unknown--", SourceContainer = ({ children, channel }) => {
  let [sources, setSources] = reactExports.useState({});
  return reactExports.useEffect(() => {
    let handleSnippetRendered = (idOrEvent, inputSource = null, inputFormat = false) => {
      let { id: id2, args = void 0, source, format: format3 } = typeof idOrEvent == "string" ? { id: idOrEvent, source: inputSource, format: inputFormat } : idOrEvent, hash = args ? argsHash(args) : UNKNOWN_ARGS_HASH;
      setSources((current) => ({ ...current, [id2]: { ...current[id2], [hash]: { code: source || "", format: format3 } } }));
    };
    return channel.on(ha$1, handleSnippetRendered), () => channel.off(ha$1, handleSnippetRendered);
  }, []), e.createElement(SourceContext.Provider, { value: { sources } }, children);
};
function useTransformCode(source, transform, storyContext) {
  let [transformedCode, setTransformedCode] = reactExports.useState("Transforming..."), transformed = transform ? transform?.(source, storyContext) : source;
  return reactExports.useEffect(() => {
    async function getTransformedCode() {
      let transformResult = await transformed;
      transformResult !== transformedCode && setTransformedCode(transformResult);
    }
    getTransformedCode();
  }), typeof transformed == "object" && typeof transformed.then == "function" ? transformedCode : transformed;
}
var getStorySource = (storyId, args, sourceContext) => {
  let { sources } = sourceContext, sourceMap = sources?.[storyId];
  return sourceMap?.[argsHash(args)] || sourceMap?.[UNKNOWN_ARGS_HASH] || { code: "" };
}, useCode = ({ snippet, storyContext, typeFromProps, transformFromProps }) => {
  let parameters = storyContext.parameters ?? {}, { __isArgsStory: isArgsStory } = parameters, sourceParameters = parameters.docs?.source || {}, type = typeFromProps || sourceParameters.type || Tn$2.AUTO, code = type === Tn$2.DYNAMIC || type === Tn$2.AUTO && snippet && isArgsStory ? snippet : sourceParameters.originalSource || "", transformer = transformFromProps ?? sourceParameters.transform, transformedCode = transformer ? useTransformCode(code, transformer, storyContext) : code;
  return sourceParameters.code !== void 0 ? sourceParameters.code : transformedCode;
}, useSourceProps = (props, docsContext, sourceContext) => {
  let { of: of2 } = props, story = reactExports.useMemo(() => {
    if (of2) return docsContext.resolveOf(of2, ["story"]).story;
    try {
      return docsContext.storyById();
    } catch {
    }
  }, [docsContext, of2]), storyContext = story ? docsContext.getStoryContext(story) : {}, argsForSource = props.__forceInitialArgs ? storyContext.initialArgs : storyContext.unmappedArgs, source = story ? getStorySource(story.id, argsForSource, sourceContext) : null, transformedCode = useCode({ snippet: source ? source.code : "", storyContext: { ...storyContext, args: argsForSource }, typeFromProps: props.type, transformFromProps: props.transform });
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let sourceParameters = story?.parameters?.docs?.source || {}, format3 = props.format, language = props.language ?? sourceParameters.language ?? "jsx", dark = props.dark ?? sourceParameters.dark ?? false;
  return !props.code && !story ? { error: "Oh no! The source is not available." } : props.code ? { code: props.code, format: format3, language, dark } : (format3 = source?.format ?? true, { code: transformedCode, format: format3, language, dark });
};
function useStory(storyId, context) {
  let stories = useStories([storyId], context);
  return stories && stories[0];
}
function useStories(storyIds, context) {
  let [storiesById, setStories] = reactExports.useState({});
  return reactExports.useEffect(() => {
    Promise.all(storyIds.map(async (storyId) => {
      let story = await context.loadStory(storyId);
      setStories((current) => current[storyId] === story ? current : { ...current, [storyId]: story });
    }));
  }), storyIds.map((storyId) => {
    if (storiesById[storyId]) return storiesById[storyId];
    try {
      return context.storyById(storyId);
    } catch {
      return;
    }
  });
}
var getStoryId2 = (props, context) => {
  let { of: of2, meta } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  return meta && context.referenceMeta(meta, false), context.resolveOf(of2 || "story", ["story"]).story.id;
}, getStoryProps = (props, story, context) => {
  let { parameters = {} } = story || {}, { docs = {} } = parameters, storyParameters = docs.story || {};
  if (docs.disable) return null;
  if (props.inline ?? storyParameters.inline ?? false) {
    let height2 = props.height ?? storyParameters.height, autoplay = props.autoplay ?? storyParameters.autoplay ?? false;
    return { story, inline: true, height: height2, autoplay, forceInitialArgs: !!props.__forceInitialArgs, primary: !!props.__primary, renderStoryToElement: context.renderStoryToElement };
  }
  let height = props.height ?? storyParameters.height ?? storyParameters.iframeHeight ?? "100px";
  return { story, inline: false, height, primary: !!props.__primary };
}, Story2 = (props = { __forceInitialArgs: false, __primary: false }) => {
  let context = reactExports.useContext(DocsContext), storyId = getStoryId2(props, context), story = useStory(storyId, context);
  if (!story) return e.createElement(StorySkeleton, null);
  let storyProps = getStoryProps(props, story, context);
  return storyProps ? e.createElement(Story, { ...storyProps }) : null;
};
var Canvas = (props) => {
  let docsContext = reactExports.useContext(DocsContext), sourceContext = reactExports.useContext(SourceContext), { of: of2, source } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let { story } = useOf(of2 || "story", ["story"]), sourceProps = useSourceProps({ ...source, ...of2 && { of: of2 } }, docsContext, sourceContext), layout = props.layout ?? story.parameters.layout ?? story.parameters.docs?.canvas?.layout ?? "padded", withToolbar = props.withToolbar ?? story.parameters.docs?.canvas?.withToolbar ?? false, additionalActions = props.additionalActions ?? story.parameters.docs?.canvas?.additionalActions, sourceState = props.sourceState ?? story.parameters.docs?.canvas?.sourceState ?? "hidden", className = props.className ?? story.parameters.docs?.canvas?.className, inline = props.story?.inline ?? story.parameters?.docs?.story?.inline ?? false;
  return e.createElement(Preview, { withSource: sourceState === "none" ? void 0 : sourceProps, isExpanded: sourceState === "shown", withToolbar, additionalActions, className, layout, inline }, e.createElement(Story2, { of: of2 || story.moduleExport, meta: props.meta, ...props.story }));
};
var useArgs = (story, context) => {
  let result = useArgsIfDefined(story, context);
  if (!result) throw new Error("No result when story was defined");
  return result;
}, useArgsIfDefined = (story, context) => {
  let storyContext = story ? context.getStoryContext(story) : { args: {} }, { id: storyId } = story || { id: "none" }, [args, setArgs] = reactExports.useState(storyContext.args);
  reactExports.useEffect(() => {
    let onArgsUpdated = (changed) => {
      changed.storyId === storyId && setArgs(changed.args);
    };
    return context.channel.on(STORY_ARGS_UPDATED, onArgsUpdated), () => context.channel.off(STORY_ARGS_UPDATED, onArgsUpdated);
  }, [storyId, context.channel]);
  let updateArgs = reactExports.useCallback((updatedArgs) => context.channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs }), [storyId, context.channel]), resetArgs = reactExports.useCallback((argNames) => context.channel.emit(RESET_STORY_ARGS, { storyId, argNames }), [storyId, context.channel]);
  return story && [args, updateArgs, resetArgs];
};
var useGlobals = (story, context) => {
  let storyContext = context.getStoryContext(story), [globals, setGlobals] = reactExports.useState(storyContext.globals);
  return reactExports.useEffect(() => {
    let onGlobalsUpdated = (changed) => {
      setGlobals(changed.globals);
    };
    return context.channel.on(GLOBALS_UPDATED, onGlobalsUpdated), () => context.channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
  }, [context.channel]), [globals];
};
function extractComponentArgTypes2(component, parameters) {
  let { extractArgTypes } = parameters.docs || {};
  if (!extractArgTypes) throw new Error("Args unsupported. See Args documentation for your framework.");
  return extractArgTypes(component);
}
var Controls3 = (props) => {
  let { of: of2 } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let context = reactExports.useContext(DocsContext), { story } = context.resolveOf(of2 || "story", ["story"]), { parameters, argTypes, component, subcomponents } = story, controlsParameters = parameters.docs?.controls || {}, include = props.include ?? controlsParameters.include, exclude = props.exclude ?? controlsParameters.exclude, sort = props.sort ?? controlsParameters.sort, [args, updateArgs, resetArgs] = useArgs(story, context), [globals] = useGlobals(story, context), filteredArgTypes = filterArgTypes(argTypes, include, exclude);
  if (!(!!subcomponents && Object.keys(subcomponents || {}).length > 0)) return Object.keys(filteredArgTypes).length > 0 || Object.keys(args).length > 0 ? e.createElement(ArgsTable, { rows: filteredArgTypes, sort, args, globals, updateArgs, resetArgs }) : null;
  let mainComponentName = getComponentName(component) || "Story", subcomponentTabs = Object.fromEntries(Object.entries(subcomponents || {}).map(([key, comp]) => [key, { rows: filterArgTypes(extractComponentArgTypes2(comp, parameters), include, exclude), sort }])), tabs = { [mainComponentName]: { rows: filteredArgTypes, sort }, ...subcomponentTabs };
  return e.createElement(TabbedArgsTable, { tabs, sort, args, globals, updateArgs, resetArgs });
};
var { document: document2 } = globalThis, CodeOrSourceMdx = ({ className, children, ...rest }) => {
  if (typeof className != "string" && (typeof children != "string" || !children.match(/[\n\r]/g))) return e.createElement(ei, null, children);
  let language = className && className.split("-");
  return e.createElement(Source, { language: language && language[1] || "text", format: false, code: children, ...rest });
};
function navigate(context, url) {
  context.channel.emit(NAVIGATE_URL, url);
}
var A2 = Nk.a, AnchorInPage = ({ hash, children }) => {
  let context = reactExports.useContext(DocsContext);
  return e.createElement(A2, { href: hash, target: "_self", onClick: (event) => {
    let id2 = hash.substring(1);
    document2.getElementById(id2) && navigate(context, hash);
  } }, children);
}, AnchorMdx = (props) => {
  let { href, target, children, ...rest } = props, context = reactExports.useContext(DocsContext);
  return !href || target === "_blank" || /^https?:\/\//.test(href) ? e.createElement(A2, { ...props }) : href.startsWith("#") ? e.createElement(AnchorInPage, { hash: href }, children) : e.createElement(A2, { href, onClick: (event) => {
    event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && (event.preventDefault(), navigate(context, event.currentTarget.getAttribute("href") || ""));
  }, target, ...rest }, children);
}, SUPPORTED_MDX_HEADERS = ["h1", "h2", "h3", "h4", "h5", "h6"], OcticonHeaders = SUPPORTED_MDX_HEADERS.reduce((acc, headerType) => ({ ...acc, [headerType]: xr$1(headerType)({ "& svg": { position: "relative", top: "-0.1em", visibility: "hidden" }, "&:hover svg": { visibility: "visible" } }) }), {}), OcticonAnchor = xr$1.a(() => ({ float: "left", lineHeight: "inherit", paddingRight: "10px", marginLeft: "-24px", color: "inherit" })), HeaderWithOcticonAnchor = ({ as, id: id2, children, ...rest }) => {
  let context = reactExports.useContext(DocsContext), OcticonHeader = OcticonHeaders[as], hash = `#${id2}`;
  return e.createElement(OcticonHeader, { id: id2, ...rest }, e.createElement(OcticonAnchor, { "aria-hidden": "true", href: hash, tabIndex: -1, target: "_self", onClick: (event) => {
    document2.getElementById(id2) && navigate(context, hash);
  } }, e.createElement(LinkIcon, null)), children);
}, HeaderMdx = (props) => {
  let { as, id: id2, children, ...rest } = props;
  if (id2) return e.createElement(HeaderWithOcticonAnchor, { as, id: id2, ...rest }, children);
  let Component4 = as, { as: omittedAs, ...withoutAs } = props;
  return e.createElement(Component4, { ...J$1(withoutAs, as) });
}, HeadersMdx = SUPPORTED_MDX_HEADERS.reduce((acc, headerType) => ({ ...acc, [headerType]: (props) => e.createElement(HeaderMdx, { as: headerType, ...props }) }), {});
var Markdown = (props) => {
  if (!props.children) return null;
  if (typeof props.children != "string") throw new Error(dedent`The Markdown block only accepts children as a single string, but children were of type: '${typeof props.children}'
        This is often caused by not wrapping the child in a template string.
        
        This is invalid:
        <Markdown>
          # Some heading
          A paragraph
        </Markdown>

        Instead do:
        <Markdown>
        {\`
          # Some heading
          A paragraph
        \`}
        </Markdown>
      `);
  return e.createElement(index_modern_default, { ...props, options: { forceBlock: true, overrides: { code: CodeOrSourceMdx, a: AnchorMdx, ...HeadersMdx, ...props?.options?.overrides }, ...props?.options } });
};
var DescriptionType = ((DescriptionType2) => (DescriptionType2.INFO = "info", DescriptionType2.NOTES = "notes", DescriptionType2.DOCGEN = "docgen", DescriptionType2.AUTO = "auto", DescriptionType2))(DescriptionType || {}), getDescriptionFromResolvedOf = (resolvedOf) => {
  switch (resolvedOf.type) {
    case "story":
      return resolvedOf.story.parameters.docs?.description?.story || null;
    case "meta": {
      let { parameters, component } = resolvedOf.preparedMeta, metaDescription = parameters.docs?.description?.component;
      return metaDescription || parameters.docs?.extractComponentDescription?.(component, { component, parameters }) || null;
    }
    case "component": {
      let { component, projectAnnotations: { parameters } } = resolvedOf;
      return parameters?.docs?.extractComponentDescription?.(component, { component, parameters }) || null;
    }
    default:
      throw new Error(`Unrecognized module type resolved from 'useOf', got: ${resolvedOf.type}`);
  }
}, DescriptionContainer = (props) => {
  let { of: of2 } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let resolvedOf = useOf(of2 || "meta"), markdown = getDescriptionFromResolvedOf(resolvedOf);
  return markdown ? e.createElement(Markdown, null, markdown) : null;
};
var { document: document3, window: globalWindow3 } = globalThis, DocsContainer = ({ context, theme, children }) => {
  let toc;
  try {
    toc = context.resolveOf("meta", ["meta"]).preparedMeta.parameters?.docs?.toc;
  } catch {
    toc = context?.projectAnnotations?.parameters?.docs?.toc;
  }
  return reactExports.useEffect(() => {
    let url;
    try {
      if (url = new URL(globalWindow3.parent.location.toString()), url.hash) {
        let element = document3.getElementById(decodeURIComponent(url.hash.substring(1)));
        element && setTimeout(() => {
          scrollToElement(element);
        }, 200);
      }
    } catch {
    }
  }), e.createElement(DocsContext.Provider, { value: context }, e.createElement(SourceContainer, { channel: context.channel }, e.createElement(Tt$1, { theme: pf(theme) }, e.createElement(DocsPageWrapper, { toc: toc ? e.createElement(TableOfContents, { className: "sbdocs sbdocs-toc--custom", channel: context.channel, ...toc }) : null }, children))));
};
var regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;
var own = Object.hasOwnProperty, BananaSlug = class {
  constructor() {
    this.occurrences, this.reset();
  }
  slug(value2, maintainCase) {
    let self2 = this, result = slug(value2, maintainCase === true), originalSlug = result;
    for (; own.call(self2.occurrences, result); ) self2.occurrences[originalSlug]++, result = originalSlug + "-" + self2.occurrences[originalSlug];
    return self2.occurrences[result] = 0, result;
  }
  reset() {
    this.occurrences = /* @__PURE__ */ Object.create(null);
  }
};
function slug(value2, maintainCase) {
  return typeof value2 != "string" ? "" : (maintainCase || (value2 = value2.toLowerCase()), value2.replace(regex, "").replace(/ /g, "-"));
}
var slugs = new BananaSlug(), Heading2 = ({ children, disableAnchor, ...props }) => {
  if (disableAnchor || typeof children != "string") return e.createElement(oi, null, children);
  let tagID = slugs.slug(children.toLowerCase());
  return e.createElement(HeaderMdx, { as: "h2", id: tagID, ...props }, children);
};
var Subheading = ({ children, disableAnchor }) => {
  if (disableAnchor || typeof children != "string") return e.createElement(ai, null, children);
  let tagID = slugs.slug(children.toLowerCase());
  return e.createElement(HeaderMdx, { as: "h3", id: tagID }, children);
};
var DocsStory = ({ of: of2, expanded = true, withToolbar: withToolbarProp = false, __forceInitialArgs = false, __primary = false }) => {
  let { story } = useOf(of2 || "story", ["story"]), withToolbar = story.parameters.docs?.canvas?.withToolbar ?? withToolbarProp;
  return e.createElement(Anchor, { storyId: story.id }, expanded && e.createElement(e.Fragment, null, e.createElement(Subheading, null, story.name), e.createElement(DescriptionContainer, { of: of2 })), e.createElement(Canvas, { of: of2, withToolbar, story: { __forceInitialArgs, __primary }, source: { __forceInitialArgs } }));
};
var Primary = (props) => {
  let { of: of2 } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let { csfFile } = useOf(of2 || "meta", ["meta"]), primaryStory = reactExports.useContext(DocsContext).componentStoriesFromCSFFile(csfFile)[0];
  return primaryStory ? e.createElement(DocsStory, { of: primaryStory.moduleExport, expanded: false, __primary: true, withToolbar: true }) : null;
};
var StyledHeading = xr$1(Heading2)(({ theme }) => ({ fontSize: `${theme.typography.size.s2 - 1}px`, fontWeight: theme.typography.weight.bold, lineHeight: "16px", letterSpacing: "0.35em", textTransform: "uppercase", color: theme.textMutedColor, border: 0, marginBottom: "12px", "&:first-of-type": { marginTop: "56px" } })), Stories = ({ title = "Stories", includePrimary = true }) => {
  let { componentStories, projectAnnotations, getStoryContext } = reactExports.useContext(DocsContext), stories = componentStories(), { stories: { filter } = { filter: void 0 } } = projectAnnotations.parameters?.docs || {};
  return filter && (stories = stories.filter((story) => filter(story, getStoryContext(story)))), stories.some((story) => story.tags?.includes("autodocs")) && (stories = stories.filter((story) => story.tags?.includes("autodocs") && !story.usesMount)), includePrimary || (stories = stories.slice(1)), !stories || stories.length === 0 ? null : e.createElement(e.Fragment, null, typeof title == "string" ? e.createElement(StyledHeading, null, title) : title, stories.map((story) => story && e.createElement(DocsStory, { key: story.id, of: story.moduleExport, expanded: true, __forceInitialArgs: true })));
};
var DEPRECATION_MIGRATION_LINK = "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#subtitle-block-and-parameterscomponentsubtitle", Subtitle2 = (props) => {
  let { of: of2, children } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let preparedMeta;
  try {
    preparedMeta = useOf(of2 || "meta", ["meta"]).preparedMeta;
  } catch (error) {
    if (children && !error.message.includes("did you forget to use <Meta of={} />?")) throw error;
  }
  let { componentSubtitle, docs } = preparedMeta?.parameters || {};
  componentSubtitle && deprecate(`Using 'parameters.componentSubtitle' property to subtitle stories is deprecated. See ${DEPRECATION_MIGRATION_LINK}`);
  let content = children || docs?.subtitle || componentSubtitle;
  return content ? e.createElement(Subtitle, { className: "sbdocs-subtitle sb-unstyled" }, content) : null;
};
var STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/, extractTitle = (title) => {
  let groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
  return groups?.[groups?.length - 1] || title;
}, Title3 = (props) => {
  let { children, of: of2 } = props;
  if ("of" in props && of2 === void 0) throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let preparedMeta;
  try {
    preparedMeta = useOf(of2 || "meta", ["meta"]).preparedMeta;
  } catch (error) {
    if (children && error instanceof Error && !error.message.includes("did you forget to use <Meta of={} />?")) throw error;
  }
  let content = children || extractTitle(preparedMeta?.title || "");
  return content ? e.createElement(Title, { className: "sbdocs-title sb-unstyled" }, content) : null;
};
var DocsPage = () => {
  let resolvedOf = useOf("meta", ["meta"]), { stories } = resolvedOf.csfFile, isSingleStory = Object.keys(stories).length === 1;
  return e.createElement(e.Fragment, null, e.createElement(Title3, null), e.createElement(Subtitle2, null), e.createElement(DescriptionContainer, { of: "meta" }), isSingleStory ? e.createElement(DescriptionContainer, { of: "story" }) : null, e.createElement(Primary, null), e.createElement(Controls3, null), isSingleStory ? null : e.createElement(Stories, null));
};
function Docs({ context, docsParameter }) {
  let Container = docsParameter.container || DocsContainer, Page = docsParameter.page || DocsPage;
  return e.createElement(Container, { context, theme: docsParameter.theme }, e.createElement(Page, null));
}
var Meta = ({ of: of2 }) => {
  let context = reactExports.useContext(DocsContext);
  of2 && context.referenceMeta(of2, true);
  try {
    let primary = context.storyById();
    return e.createElement(Anchor, { storyId: primary.id });
  } catch {
    return null;
  }
};
export {
  AnchorMdx as A,
  CodeOrSourceMdx as C,
  Docs as D,
  G3 as G,
  HeadersMdx as H,
  Meta as M,
  N7 as N,
  O3 as O,
  Primary as P,
  Story2 as S,
  Title3 as T,
  __toESM as _,
  MarkupIcon as a,
  __commonJS as b,
  Subtitle2 as c,
  debounce2 as d,
  DescriptionContainer as e,
  Controls3 as f,
  getControlId as g,
  xr$1 as x
};

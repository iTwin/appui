var B = Object.create;
var R = Object.defineProperty;
var b = Object.getOwnPropertyDescriptor;
var C = Object.getOwnPropertyNames;
var h = Object.getPrototypeOf, w = Object.prototype.hasOwnProperty;
var I = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var E = (r, e, n, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a of C(e))
      !w.call(r, a) && a !== n && R(r, a, { get: () => e[a], enumerable: !(t = b(e, a)) || t.enumerable });
  return r;
};
var v = (r, e, n) => (n = r != null ? B(h(r)) : {}, E(e || !r || !r.__esModule ? R(n, "default", { value: r, enumerable: true }) : n, r));
var x = I((T) => {
  Object.defineProperty(T, "__esModule", { value: true }), T.isEqual = /* @__PURE__ */ function() {
    var r = Object.prototype.toString, e = Object.getPrototypeOf, n = Object.getOwnPropertySymbols ? function(t) {
      return Object.keys(t).concat(Object.getOwnPropertySymbols(t));
    } : Object.keys;
    return function(t, a) {
      return function i(o, s, p) {
        var y, g, d, A = r.call(o), F = r.call(s);
        if (o === s)
          return true;
        if (o == null || s == null)
          return false;
        if (p.indexOf(o) > -1 && p.indexOf(s) > -1)
          return true;
        if (p.push(o, s), A != F || (y = n(o), g = n(s), y.length != g.length || y.some(function(l) {
          return !i(o[l], s[l], p);
        })))
          return false;
        switch (A.slice(8, -1)) {
          case "Symbol":
            return o.valueOf() == s.valueOf();
          case "Date":
          case "Number":
            return +o == +s || +o != +o && +s != +s;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + o == "" + s;
          case "Set":
          case "Map":
            y = o.entries(), g = s.entries();
            do
              if (!i((d = y.next()).value, g.next().value, p))
                return false;
            while (!d.done);
            return true;
          case "ArrayBuffer":
            o = new Uint8Array(o), s = new Uint8Array(s);
          case "DataView":
            o = new Uint8Array(o.buffer), s = new Uint8Array(s.buffer);
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
            if (o.length != s.length)
              return false;
            for (d = 0; d < o.length; d++)
              if ((d in o || d in s) && (d in o != d in s || !i(o[d], s[d], p)))
                return false;
            return true;
          case "Object":
            return i(e(o), e(s), p);
          default:
            return false;
        }
      }(t, a, []);
    };
  }();
});
var c = v(x()), S = (r) => r.map((e) => typeof e < "u").filter(Boolean).length, P = (r, e) => {
  let { exists: n, eq: t, neq: a, truthy: i } = r;
  if (S([n, t, a, i]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: n, eq: t, neq: a })}`);
  if (typeof t < "u")
    return (0, c.isEqual)(e, t);
  if (typeof a < "u")
    return !(0, c.isEqual)(e, a);
  if (typeof n < "u") {
    let s = typeof e < "u";
    return n ? s : !s;
  }
  return (typeof i > "u" ? true : i) ? !!e : !e;
}, O = (r, e, n) => {
  if (!r.if)
    return true;
  let { arg: t, global: a } = r.if;
  if (S([t, a]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: t, global: a })}`);
  let i = t ? e[t] : n[a];
  return P(r.if, i);
};
var L = (r) => r.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
export {
  L,
  O
};

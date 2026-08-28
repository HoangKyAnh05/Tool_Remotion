import { app as Qe, BrowserWindow as yo, ipcMain as He, shell as Ds, dialog as va } from "electron";
import Ee from "node:path";
import { fileURLToPath as Bs } from "node:url";
import Ns from "node:https";
import Is from "node:http";
import Dn from "node:fs";
import zs from "ws";
import wo, { randomFillSync as $s, randomUUID as Ms, createHash as Hs, randomBytes as Ws } from "crypto";
import qe from "util";
import ue, { Readable as Vs } from "stream";
import Ro, { resolve as ba } from "path";
import An from "http";
import Tn from "https";
import Pn from "url";
import Gs from "fs";
import Ks from "net";
import Js from "tls";
import Eo from "assert";
import _o from "tty";
import Xs from "os";
import Ys, { EventEmitter as Zs } from "events";
import So from "http2";
import ye from "zlib";
import { bundle as Qs } from "@remotion/bundler";
import { selectComposition as er, renderMedia as nr } from "@remotion/renderer";
const le = [];
for (let e = 0; e < 256; ++e)
  le.push((e + 256).toString(16).slice(1));
function tr(e, n = 0) {
  return (le[e[n + 0]] + le[e[n + 1]] + le[e[n + 2]] + le[e[n + 3]] + "-" + le[e[n + 4]] + le[e[n + 5]] + "-" + le[e[n + 6]] + le[e[n + 7]] + "-" + le[e[n + 8]] + le[e[n + 9]] + "-" + le[e[n + 10]] + le[e[n + 11]] + le[e[n + 12]] + le[e[n + 13]] + le[e[n + 14]] + le[e[n + 15]]).toLowerCase();
}
const bn = new Uint8Array(256);
let ln = bn.length;
function ar() {
  return ln > bn.length - 16 && ($s(bn), ln = 0), bn.slice(ln, ln += 16);
}
const ga = { randomUUID: Ms };
function ir(e, n, t) {
  var i;
  if (ga.randomUUID && !e)
    return ga.randomUUID();
  e = e || {};
  const a = e.random ?? ((i = e.rng) == null ? void 0 : i.call(e)) ?? ar();
  if (a.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, tr(a);
}
function on(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bn = { exports: {} }, ya;
function or() {
  if (ya) return Bn.exports;
  ya = 1;
  var e = Bn.exports = function n(t, a) {
    var i;
    if (t != null)
      return a = (a || "").replace(/[^&"<>\']/g, ""), i = `([&"<>'])`.replace(new RegExp("[" + a + "]", "g"), ""), t.replace(new RegExp(i, "g"), function(s, o) {
        return n.map[o];
      });
  };
  return e.map = {
    ">": "&gt;",
    "<": "&lt;",
    "'": "&apos;",
    '"': "&quot;",
    "&": "&amp;"
  }, Bn.exports;
}
var sr = or();
const rr = /* @__PURE__ */ on(sr);
var Nn, wa;
function cr() {
  return wa || (wa = 1, Nn = zs), Nn;
}
var pr = cr();
const lr = /* @__PURE__ */ on(pr);
function Oo(e, n) {
  return function() {
    return e.apply(n, arguments);
  };
}
const { toString: ur } = Object.prototype, { getPrototypeOf: Oe } = Object, { iterator: sn, toStringTag: ko } = Symbol, en = (({ hasOwnProperty: e }) => (n, t) => e.call(n, t))(Object.prototype), Ao = (e) => typeof e == "string" && (e === "__proto__" || e === "constructor" || e === "prototype"), To = (e, n, t) => e === Object.prototype || !t && n === null, dr = (e) => {
  if (!Object.isExtensible(e))
    return !1;
  const n = Object.getOwnPropertyNames(e);
  return Object.getOwnPropertySymbols && n.push(...Object.getOwnPropertySymbols(e)), n.every((t) => {
    if (Ao(t))
      return !1;
    const a = Object.getOwnPropertyDescriptor(e, t);
    return !!a && a.configurable && a.writable === !0;
  });
}, nn = (e, n) => {
  let t = e;
  const a = [];
  for (; t != null; ) {
    if (a.indexOf(t) !== -1)
      return !1;
    a.push(t);
    const i = Oe(t);
    if (To(t, i, t === e))
      return !1;
    if (en(t, n))
      return !0;
    t = i;
  }
  return !1;
}, mr = (e, n) => e != null && nn(e, n) ? e[n] : void 0, fr = (e) => {
  if (e == null || typeof e != "object" && typeof e != "function")
    return e;
  const n = Oe(e);
  if (n === null && dr(e))
    return e;
  const t = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null), i = [];
  let s = e;
  for (; s != null && i.indexOf(s) === -1; ) {
    i.push(s);
    const o = s === e ? n : Oe(s);
    if (To(s, o, s === e))
      break;
    const r = Object.getOwnPropertyNames(s);
    Object.getOwnPropertySymbols && r.push(...Object.getOwnPropertySymbols(s));
    for (const c of r)
      Ao(c) || en(a, c) || (t[c] = e[c], a[c] = !0);
    s = o;
  }
  return t;
}, oa = /* @__PURE__ */ ((e) => (n) => {
  const t = ur.call(n);
  return e[t] || (e[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), we = (e) => (e = e.toLowerCase(), (n) => oa(n) === e), Cn = (e) => (n) => typeof n === e, { isArray: Pe } = Array, Ce = Cn("undefined");
function Ie(e) {
  return e !== null && !Ce(e) && e.constructor !== null && !Ce(e.constructor) && ve(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Po = we("ArrayBuffer");
function xr(e) {
  let n;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? n = ArrayBuffer.isView(e) : n = e && e.buffer && Po(e.buffer), n;
}
const hr = Cn("string"), ve = Cn("function"), Co = Cn("number"), ze = (e) => e !== null && typeof e == "object", vr = (e) => e === !0 || e === !1, gn = (e) => {
  if (!ze(e))
    return !1;
  const n = Oe(e);
  return (n === null || n === Object.prototype || Oe(n) === null) && // Treat safe own/inherited Symbol.toStringTag or Symbol.iterator members as
  // evidence the value is tagged/iterable, while ignoring members reachable
  // only through shared or terminal prototype boundaries.
  !nn(e, ko) && !nn(e, sn);
}, br = (e) => {
  if (!ze(e) || Ie(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, gr = we("Date"), yr = we("File"), wr = (e) => !!(e && typeof e.uri < "u"), Rr = (e) => e && typeof e.getParts < "u", Er = we("Blob"), _r = we("FileList"), Sr = we("Set"), Or = (e) => ze(e) && ve(e.pipe);
function kr() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Ra = kr(), Ea = typeof Ra.FormData < "u" ? Ra.FormData : void 0, Ar = (e) => {
  if (!e) return !1;
  if (Ea && e instanceof Ea) return !0;
  const n = Oe(e);
  if (!n || n === Object.prototype || !ve(e.append)) return !1;
  const t = oa(e);
  return t === "formdata" || // detect form-data instance
  t === "object" && ve(e.toString) && e.toString() === "[object FormData]";
}, Tr = we("URLSearchParams"), [Pr, Cr, jr, Fr] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(we), qr = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function rn(e, n, { allOwnKeys: t = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let a, i;
  if (typeof e != "object" && (e = [e]), Pe(e))
    for (a = 0, i = e.length; a < i; a++)
      n.call(null, e[a], a, e);
  else {
    if (Ie(e))
      return;
    const s = t ? Object.getOwnPropertyNames(e) : Object.keys(e), o = s.length;
    let r;
    for (a = 0; a < o; a++)
      r = s[a], n.call(null, e[r], r, e);
  }
}
function jo(e, n) {
  if (Ie(e))
    return null;
  n = n.toLowerCase();
  const t = Object.keys(e);
  let a = t.length, i;
  for (; a-- > 0; )
    if (i = t[a], n === i.toLowerCase())
      return i;
  return null;
}
const ke = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Fo = (e) => !Ce(e) && e !== ke;
function na(...e) {
  const { caseless: n, skipUndefined: t } = Fo(this) && this || {}, a = {}, i = (s, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const r = n && typeof o == "string" && jo(a, o) || o, c = en(a, r) ? a[r] : void 0;
    gn(c) && gn(s) ? a[r] = na(c, s) : gn(s) ? a[r] = na({}, s) : Pe(s) ? a[r] = s.slice() : (!t || !Ce(s)) && (a[r] = s);
  };
  for (let s = 0, o = e.length; s < o; s++) {
    const r = e[s];
    if (!r || Ie(r) || (rn(r, i), typeof r != "object" || Pe(r)))
      continue;
    const c = Object.getOwnPropertySymbols(r);
    for (let f = 0; f < c.length; f++) {
      const l = c[f];
      Vr.call(r, l) && i(r[l], l);
    }
  }
  return a;
}
const Lr = (e, n, t, { allOwnKeys: a } = {}) => (rn(
  n,
  (i, s) => {
    t && ve(i) ? Object.defineProperty(e, s, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot
      // hijack defineProperty's accessor-vs-data resolution.
      __proto__: null,
      value: Oo(i, t),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, s, {
      __proto__: null,
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: a }
), e), Ur = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Dr = (e, n, t, a) => {
  e.prototype = Object.create(n.prototype, a), Object.defineProperty(e.prototype, "constructor", {
    __proto__: null,
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    __proto__: null,
    value: n.prototype
  }), t && Object.assign(e.prototype, t);
}, Br = (e, n, t, a) => {
  let i, s, o;
  const r = {};
  if (n = n || {}, e == null) return n;
  do {
    for (i = Object.getOwnPropertyNames(e), s = i.length; s-- > 0; )
      o = i[s], (!a || a(o, e, n)) && !r[o] && (n[o] = e[o], r[o] = !0);
    e = t !== !1 && Oe(e);
  } while (e && (!t || t(e, n)) && e !== Object.prototype);
  return n;
}, Nr = (e, n, t) => {
  e = String(e), (t === void 0 || t > e.length) && (t = e.length), t -= n.length;
  const a = e.indexOf(n, t);
  return a !== -1 && a === t;
}, Ir = (e) => {
  if (!e) return null;
  if (Pe(e)) return e;
  let n = e.length;
  if (!Co(n)) return null;
  const t = new Array(n);
  for (; n-- > 0; )
    t[n] = e[n];
  return t;
}, zr = /* @__PURE__ */ ((e) => (n) => e && n instanceof e)(typeof Uint8Array < "u" && Oe(Uint8Array)), $r = (e, n) => {
  const a = (e && e[sn]).call(e);
  let i;
  for (; (i = a.next()) && !i.done; ) {
    const s = i.value;
    n.call(e, s[0], s[1]);
  }
}, Mr = (e, n) => {
  let t;
  const a = [];
  for (; (t = e.exec(n)) !== null; )
    a.push(t);
  return a;
}, Hr = we("HTMLFormElement"), Wr = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(t, a, i) {
  return a.toUpperCase() + i;
}), { propertyIsEnumerable: Vr } = Object.prototype, Gr = we("RegExp"), qo = (e, n) => {
  const t = Object.getOwnPropertyDescriptors(e), a = {};
  rn(t, (i, s) => {
    let o;
    (o = n(i, s, e)) !== !1 && (a[s] = o || i);
  }), Object.defineProperties(e, a);
}, Kr = (e) => {
  qo(e, (n, t) => {
    if (ve(e) && ["arguments", "caller", "callee"].includes(t))
      return !1;
    const a = e[t];
    if (ve(a)) {
      if (n.enumerable = !1, "writable" in n) {
        n.writable = !1;
        return;
      }
      n.set || (n.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, Jr = (e, n) => {
  const t = {}, a = (i) => {
    i.forEach((s) => {
      t[s] = !0;
    });
  };
  return Pe(e) ? a(e) : a(String(e).split(n)), t;
}, Xr = () => {
}, Yr = (e, n) => e != null && Number.isFinite(e = +e) ? e : n;
function Zr(e) {
  return !!(e && ve(e.append) && e[ko] === "FormData" && e[sn]);
}
const Qr = (e) => {
  const n = /* @__PURE__ */ new WeakSet(), t = (a) => {
    if (ze(a)) {
      if (n.has(a))
        return;
      if (Ie(a))
        return a;
      if (!("toJSON" in a)) {
        n.add(a);
        let i;
        if (Sr(a)) {
          i = [];
          for (const s of a) {
            const o = t(s);
            !Ce(o) && i.push(o);
          }
        } else
          i = Pe(a) ? [] : {}, rn(a, (s, o) => {
            const r = t(s);
            !Ce(r) && (i[o] = r);
          });
        return n.delete(a), i;
      }
    }
    return a;
  };
  return t(e);
}, ec = we("AsyncFunction"), nc = (e) => e && (ze(e) || ve(e)) && ve(e.then) && ve(e.catch), Lo = ((e, n) => e ? setImmediate : n ? ((t, a) => (ke.addEventListener(
  "message",
  ({ source: i, data: s }) => {
    i === ke && s === t && a.length && a.shift()();
  },
  !1
), (i) => {
  a.push(i), ke.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(typeof setImmediate == "function", ve(ke.postMessage)), tc = typeof queueMicrotask < "u" ? queueMicrotask.bind(ke) : typeof process < "u" && process.nextTick || Lo, Uo = (e) => e != null && ve(e[sn]), ac = (e) => e != null && nn(e, sn) && Uo(e), d = {
  isArray: Pe,
  isArrayBuffer: Po,
  isBuffer: Ie,
  isFormData: Ar,
  isArrayBufferView: xr,
  isString: hr,
  isNumber: Co,
  isBoolean: vr,
  isObject: ze,
  isPlainObject: gn,
  isEmptyObject: br,
  isReadableStream: Pr,
  isRequest: Cr,
  isResponse: jr,
  isHeaders: Fr,
  isUndefined: Ce,
  isDate: gr,
  isFile: yr,
  isReactNativeBlob: wr,
  isReactNative: Rr,
  isBlob: Er,
  isRegExp: Gr,
  isFunction: ve,
  isStream: Or,
  isURLSearchParams: Tr,
  isTypedArray: zr,
  isFileList: _r,
  forEach: rn,
  merge: na,
  extend: Lr,
  trim: qr,
  stripBOM: Ur,
  inherits: Dr,
  toFlatObject: Br,
  kindOf: oa,
  kindOfTest: we,
  endsWith: Nr,
  toArray: Ir,
  forEachEntry: $r,
  matchAll: Mr,
  isHTMLForm: Hr,
  hasOwnProperty: en,
  hasOwnProp: en,
  // an alias to avoid ESLint no-prototype-builtins detection
  hasOwnInPrototypeChain: nn,
  getSafeProp: mr,
  toSafeFlatObject: fr,
  reduceDescriptors: qo,
  freezeMethods: Kr,
  toObjectSet: Jr,
  toCamelCase: Wr,
  noop: Xr,
  toFiniteNumber: Yr,
  findKey: jo,
  global: ke,
  isContextDefined: Fo,
  isSpecCompliantForm: Zr,
  toJSONObject: Qr,
  isAsyncFn: ec,
  isThenable: nc,
  setImmediate: Lo,
  asap: tc,
  isIterable: Uo,
  isSafeIterable: ac
}, ic = d.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), oc = (e) => {
  const n = {};
  let t, a, i;
  return e && e.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), t = o.substring(0, i).trim().toLowerCase(), a = o.substring(i + 1).trim();
    const r = d.hasOwnProp(n, t);
    !t || r && d.hasOwnProp(ic, t) || (t === "set-cookie" ? r ? n[t].push(a) : n[t] = [a] : n[t] = r ? n[t] + ", " + a : a);
  }), n;
};
function sc(e) {
  let n = 0, t = e.length;
  for (; n < t; ) {
    const a = e.charCodeAt(n);
    if (a !== 9 && a !== 32)
      break;
    n += 1;
  }
  for (; t > n; ) {
    const a = e.charCodeAt(t - 1);
    if (a !== 9 && a !== 32)
      break;
    t -= 1;
  }
  return n === 0 && t === e.length ? e : e.slice(n, t);
}
const rc = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), cc = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function sa(e, n) {
  return d.isArray(e) ? e.map((t) => sa(t, n)) : sc(String(e).replace(n, ""));
}
const pc = (e) => sa(e, rc), lc = (e) => sa(e, cc);
function ra(e) {
  const n = /* @__PURE__ */ Object.create(null);
  return d.forEach(e.toJSON(), (t, a) => {
    n[a] = lc(t);
  }), n;
}
const _a = Symbol("internals");
function We(e) {
  return e && String(e).trim().toLowerCase();
}
function yn(e) {
  return e === !1 || e == null ? e : d.isArray(e) ? e.map(yn) : pc(String(e));
}
function uc(e) {
  const n = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; a = t.exec(e); )
    n[a[1]] = a[2];
  return n;
}
const dc = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function In(e) {
  let n = 0, t = e.length;
  for (; n < t; ) {
    const a = e.charCodeAt(n);
    if (a !== 9 && a !== 32)
      break;
    n += 1;
  }
  for (; t > n; ) {
    const a = e.charCodeAt(t - 1);
    if (a !== 9 && a !== 32)
      break;
    t -= 1;
  }
  return n === 0 && t === e.length ? e : e.slice(n, t);
}
function mc(e) {
  const n = e.length - 1;
  if (n < 1 || e.charCodeAt(0) !== 34 || e.charCodeAt(n) !== 34)
    return e;
  let t = "";
  for (let a = 1; a < n; a++) {
    const i = e.charCodeAt(a);
    if (i === 34 || i === 92 && (a += 1, a >= n))
      return e;
    t += e[a];
  }
  return t;
}
function fc(e) {
  const n = /* @__PURE__ */ Object.create(null), t = String(e);
  let a = 0, i = !1, s = !1;
  function o(r) {
    const c = In(t.slice(a, r)), f = c.indexOf("=");
    if (f < 1)
      return;
    const l = In(c.slice(0, f));
    if (!dc.test(l))
      return;
    const p = l.toLowerCase();
    if (p === "__proto__" || p === "constructor" || p === "prototype")
      return;
    const x = In(c.slice(f + 1));
    n[p] = mc(x);
  }
  for (let r = 0; r < t.length; r++) {
    const c = t.charCodeAt(r);
    i ? s ? s = !1 : c === 92 ? s = !0 : c === 34 && (i = !1) : c === 34 ? i = !0 : (c === 44 || c === 59) && (o(r), a = r + 1);
  }
  return o(t.length), n;
}
const xc = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function zn(e, n, t, a, i) {
  if (d.isFunction(a))
    return a.call(this, n, t);
  if (i && (n = t), !!d.isString(n)) {
    if (d.isString(a))
      return n.indexOf(a) !== -1;
    if (d.isRegExp(a))
      return a.test(n);
  }
}
function hc(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (n, t, a) => t.toUpperCase() + a);
}
function vc(e, n) {
  const t = d.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(e, a + t, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: function(i, s, o) {
        return this[a].call(this, n, i, s, o);
      },
      configurable: !0
    });
  });
}
let oe = class {
  constructor(n) {
    n && this.set(n);
  }
  set(n, t, a) {
    const i = this;
    function s(r, c, f) {
      const l = We(c);
      if (!l)
        return;
      const p = d.findKey(i, l);
      (!p || i[p] === void 0 || f === !0 || f === void 0 && i[p] !== !1) && (i[p || c] = yn(r));
    }
    const o = (r, c) => d.forEach(r, (f, l) => s(f, l, c));
    if (d.isPlainObject(n) || n instanceof this.constructor)
      o(n, t);
    else if (d.isString(n) && (n = n.trim()) && !xc(n))
      o(oc(n), t);
    else if (d.isObject(n) && d.isSafeIterable(n)) {
      let r = /* @__PURE__ */ Object.create(null), c, f;
      for (const l of n) {
        if (!d.isArray(l))
          throw new TypeError("Object iterator must return a key-value pair");
        f = l[0], d.hasOwnProp(r, f) ? (c = r[f], r[f] = d.isArray(c) ? [...c, l[1]] : [c, l[1]]) : r[f] = l[1];
      }
      o(r, t);
    } else
      n != null && s(t, n, a);
    return this;
  }
  get(n, t) {
    if (n = We(n), n) {
      const a = d.findKey(this, n);
      if (a) {
        const i = this[a];
        if (!t)
          return i;
        if (t === !0)
          return uc(i);
        if (d.isFunction(t))
          return t.call(this, i, a);
        if (d.isRegExp(t))
          return t.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, t) {
    if (n = We(n), n) {
      const a = d.findKey(this, n);
      return !!(a && this[a] !== void 0 && (!t || zn(this, this[a], a, t)));
    }
    return !1;
  }
  delete(n, t) {
    const a = this;
    let i = !1;
    function s(o) {
      if (o = We(o), o) {
        const r = d.findKey(a, o);
        r && (!t || zn(a, a[r], r, t)) && (delete a[r], i = !0);
      }
    }
    return d.isArray(n) ? n.forEach(s) : s(n), i;
  }
  clear(n) {
    const t = Object.keys(this);
    let a = t.length, i = !1;
    for (; a--; ) {
      const s = t[a];
      (!n || zn(this, this[s], s, n, !0)) && (delete this[s], i = !0);
    }
    return i;
  }
  normalize(n) {
    const t = this, a = {};
    return d.forEach(this, (i, s) => {
      const o = d.findKey(a, s);
      if (o) {
        t[o] = yn(i), delete t[s];
        return;
      }
      const r = n ? hc(s) : String(s).trim();
      r !== s && delete t[s], t[r] = yn(i), a[r] = !0;
    }), this;
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const t = /* @__PURE__ */ Object.create(null);
    return d.forEach(this, (a, i) => {
      a != null && a !== !1 && (t[i] = n && d.isArray(a) ? a.join(", ") : a);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([n, t]) => n + ": " + t).join(`
`);
  }
  getSetCookie() {
    const n = this.get("set-cookie");
    return d.isArray(n) ? n : n == null || n === !1 ? [] : [n];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(n) {
    return n instanceof this ? n : new this(n);
  }
  static parseParameters(n) {
    return fc(n);
  }
  static concat(n, ...t) {
    const a = new this(n);
    return t.forEach((i) => a.set(i)), a;
  }
  static accessor(n) {
    const a = (this[_a] = this[_a] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function s(o) {
      const r = We(o);
      a[r] || (vc(i, o), a[r] = !0);
    }
    return d.isArray(n) ? n.forEach(s) : s(n), this;
  }
};
oe.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
d.reduceDescriptors(oe.prototype, ({ value: e }, n) => {
  let t = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => e,
    set(a) {
      this[t] = a;
    }
  };
});
d.freezeMethods(oe);
const Sn = "[REDACTED ****]";
function bc(e) {
  if (d.hasOwnProp(e, "toJSON"))
    return !0;
  let n = Object.getPrototypeOf(e);
  for (; n && n !== Object.prototype; ) {
    if (d.hasOwnProp(n, "toJSON"))
      return !0;
    n = Object.getPrototypeOf(n);
  }
  return !1;
}
function gc(e, n) {
  const t = new Set(n.map((s) => String(s).toLowerCase())), a = [], i = (s) => {
    if (s === null || typeof s != "object" || d.isBuffer(s)) return s;
    if (a.indexOf(s) !== -1) return;
    s instanceof oe && (s = s.toJSON()), a.push(s);
    let o;
    if (d.isArray(s))
      o = [], s.forEach((r, c) => {
        const f = i(r);
        d.isUndefined(f) || (o[c] = f);
      });
    else {
      if (!d.isPlainObject(s) && bc(s))
        return a.pop(), s;
      o = /* @__PURE__ */ Object.create(null);
      for (const [r, c] of Object.entries(s)) {
        const f = t.has(r.toLowerCase()) ? Sn : i(c);
        d.isUndefined(f) || (o[r] = f);
      }
    }
    return a.pop(), o;
  };
  return i(e);
}
function Sa(e) {
  try {
    return String(e);
  } catch {
    return "";
  }
}
function yc(e) {
  return e.errors.map((t) => {
    try {
      return t && t.message ? Sa(t.message) : Sa(t);
    } catch {
      return "";
    }
  }).filter(Boolean).join("; ") || e.name || "AggregateError";
}
let y = class Do extends Error {
  static from(n, t, a, i, s, o) {
    let r = n.message;
    !r && d.isArray(n.errors) && n.errors.length && (r = yc(n));
    const c = new Do(r, t || n.code, a, i, s);
    return Object.defineProperty(c, "cause", {
      __proto__: null,
      value: n,
      writable: !0,
      enumerable: !1,
      configurable: !0
    }), c.name = n.name, n.status != null && c.status == null && (c.status = n.status), o && Object.assign(c, o), c;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(n, t, a, i, s) {
    super(n), Object.defineProperty(this, "message", {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: n,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), a && (this.config = a), i && (this.request = i), s && (this.response = s, this.status = s.status);
  }
  toJSON() {
    const n = this.config, t = n && d.hasOwnProp(n, "redact") ? n.redact : void 0, a = d.isArray(t) && t.length > 0 ? gc(n, t) : d.toJSONObject(n);
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: a,
      code: this.code,
      status: this.status
    };
  }
};
y.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
y.ERR_BAD_OPTION = "ERR_BAD_OPTION";
y.ECONNABORTED = "ECONNABORTED";
y.ETIMEDOUT = "ETIMEDOUT";
y.ECONNREFUSED = "ECONNREFUSED";
y.ERR_NETWORK = "ERR_NETWORK";
y.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
y.ERR_DEPRECATED = "ERR_DEPRECATED";
y.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
y.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
y.ERR_CANCELED = "ERR_CANCELED";
y.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
y.ERR_INVALID_URL = "ERR_INVALID_URL";
y.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
var $n, Oa;
function wc() {
  if (Oa) return $n;
  Oa = 1;
  var e = ue.Stream, n = qe;
  $n = t;
  function t() {
    this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
  }
  return n.inherits(t, e), t.create = function(a, i) {
    var s = new this();
    i = i || {};
    for (var o in i)
      s[o] = i[o];
    s.source = a;
    var r = a.emit;
    return a.emit = function() {
      return s._handleEmit(arguments), r.apply(a, arguments);
    }, a.on("error", function() {
    }), s.pauseStream && a.pause(), s;
  }, Object.defineProperty(t.prototype, "readable", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.source.readable;
    }
  }), t.prototype.setEncoding = function() {
    return this.source.setEncoding.apply(this.source, arguments);
  }, t.prototype.resume = function() {
    this._released || this.release(), this.source.resume();
  }, t.prototype.pause = function() {
    this.source.pause();
  }, t.prototype.release = function() {
    this._released = !0, this._bufferedEvents.forEach((function(a) {
      this.emit.apply(this, a);
    }).bind(this)), this._bufferedEvents = [];
  }, t.prototype.pipe = function() {
    var a = e.prototype.pipe.apply(this, arguments);
    return this.resume(), a;
  }, t.prototype._handleEmit = function(a) {
    if (this._released) {
      this.emit.apply(this, a);
      return;
    }
    a[0] === "data" && (this.dataSize += a[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(a);
  }, t.prototype._checkIfMaxDataSizeExceeded = function() {
    if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
      this._maxDataSizeExceeded = !0;
      var a = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(a));
    }
  }, $n;
}
var Mn, ka;
function Rc() {
  if (ka) return Mn;
  ka = 1;
  var e = qe, n = ue.Stream, t = wc();
  Mn = a;
  function a() {
    this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
  }
  return e.inherits(a, n), a.create = function(i) {
    var s = new this();
    i = i || {};
    for (var o in i)
      s[o] = i[o];
    return s;
  }, a.isStreamLike = function(i) {
    return typeof i != "function" && typeof i != "string" && typeof i != "boolean" && typeof i != "number" && !Buffer.isBuffer(i);
  }, a.prototype.append = function(i) {
    var s = a.isStreamLike(i);
    if (s) {
      if (!(i instanceof t)) {
        var o = t.create(i, {
          maxDataSize: 1 / 0,
          pauseStream: this.pauseStreams
        });
        i.on("data", this._checkDataSize.bind(this)), i = o;
      }
      this._handleErrors(i), this.pauseStreams && i.pause();
    }
    return this._streams.push(i), this;
  }, a.prototype.pipe = function(i, s) {
    return n.prototype.pipe.call(this, i, s), this.resume(), i;
  }, a.prototype._getNext = function() {
    if (this._currentStream = null, this._insideLoop) {
      this._pendingNext = !0;
      return;
    }
    this._insideLoop = !0;
    try {
      do
        this._pendingNext = !1, this._realGetNext();
      while (this._pendingNext);
    } finally {
      this._insideLoop = !1;
    }
  }, a.prototype._realGetNext = function() {
    var i = this._streams.shift();
    if (typeof i > "u") {
      this.end();
      return;
    }
    if (typeof i != "function") {
      this._pipeNext(i);
      return;
    }
    var s = i;
    s((function(o) {
      var r = a.isStreamLike(o);
      r && (o.on("data", this._checkDataSize.bind(this)), this._handleErrors(o)), this._pipeNext(o);
    }).bind(this));
  }, a.prototype._pipeNext = function(i) {
    this._currentStream = i;
    var s = a.isStreamLike(i);
    if (s) {
      i.on("end", this._getNext.bind(this)), i.pipe(this, { end: !1 });
      return;
    }
    var o = i;
    this.write(o), this._getNext();
  }, a.prototype._handleErrors = function(i) {
    var s = this;
    i.on("error", function(o) {
      s._emitError(o);
    });
  }, a.prototype.write = function(i) {
    this.emit("data", i);
  }, a.prototype.pause = function() {
    this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
  }, a.prototype.resume = function() {
    this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
  }, a.prototype.end = function() {
    this._reset(), this.emit("end");
  }, a.prototype.destroy = function() {
    this._reset(), this.emit("close");
  }, a.prototype._reset = function() {
    this.writable = !1, this._streams = [], this._currentStream = null;
  }, a.prototype._checkDataSize = function() {
    if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
      var i = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(i));
    }
  }, a.prototype._updateDataSize = function() {
    this.dataSize = 0;
    var i = this;
    this._streams.forEach(function(s) {
      s.dataSize && (i.dataSize += s.dataSize);
    }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
  }, a.prototype._emitError = function(i) {
    this._reset(), this.emit("error", i);
  }, Mn;
}
var Hn = {};
const Ec = {
  "application/1d-interleaved-parityfec": { source: "iana" },
  "application/3gpdash-qoe-report+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/3gpp-ims+xml": { source: "iana", compressible: !0 },
  "application/3gpphal+json": { source: "iana", compressible: !0 },
  "application/3gpphalforms+json": { source: "iana", compressible: !0 },
  "application/a2l": { source: "iana" },
  "application/ace+cbor": { source: "iana" },
  "application/activemessage": { source: "iana" },
  "application/activity+json": { source: "iana", compressible: !0 },
  "application/alto-costmap+json": { source: "iana", compressible: !0 },
  "application/alto-costmapfilter+json": { source: "iana", compressible: !0 },
  "application/alto-directory+json": { source: "iana", compressible: !0 },
  "application/alto-endpointcost+json": { source: "iana", compressible: !0 },
  "application/alto-endpointcostparams+json": { source: "iana", compressible: !0 },
  "application/alto-endpointprop+json": { source: "iana", compressible: !0 },
  "application/alto-endpointpropparams+json": { source: "iana", compressible: !0 },
  "application/alto-error+json": { source: "iana", compressible: !0 },
  "application/alto-networkmap+json": { source: "iana", compressible: !0 },
  "application/alto-networkmapfilter+json": { source: "iana", compressible: !0 },
  "application/alto-updatestreamcontrol+json": { source: "iana", compressible: !0 },
  "application/alto-updatestreamparams+json": { source: "iana", compressible: !0 },
  "application/aml": { source: "iana" },
  "application/andrew-inset": { source: "iana", extensions: ["ez"] },
  "application/applefile": { source: "iana" },
  "application/applixware": { source: "apache", extensions: ["aw"] },
  "application/at+jwt": { source: "iana" },
  "application/atf": { source: "iana" },
  "application/atfx": { source: "iana" },
  "application/atom+xml": { source: "iana", compressible: !0, extensions: ["atom"] },
  "application/atomcat+xml": { source: "iana", compressible: !0, extensions: ["atomcat"] },
  "application/atomdeleted+xml": { source: "iana", compressible: !0, extensions: ["atomdeleted"] },
  "application/atomicmail": { source: "iana" },
  "application/atomsvc+xml": { source: "iana", compressible: !0, extensions: ["atomsvc"] },
  "application/atsc-dwd+xml": { source: "iana", compressible: !0, extensions: ["dwd"] },
  "application/atsc-dynamic-event-message": { source: "iana" },
  "application/atsc-held+xml": { source: "iana", compressible: !0, extensions: ["held"] },
  "application/atsc-rdt+json": { source: "iana", compressible: !0 },
  "application/atsc-rsat+xml": { source: "iana", compressible: !0, extensions: ["rsat"] },
  "application/atxml": { source: "iana" },
  "application/auth-policy+xml": { source: "iana", compressible: !0 },
  "application/bacnet-xdd+zip": { source: "iana", compressible: !1 },
  "application/batch-smtp": { source: "iana" },
  "application/bdoc": { compressible: !1, extensions: ["bdoc"] },
  "application/beep+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/calendar+json": { source: "iana", compressible: !0 },
  "application/calendar+xml": { source: "iana", compressible: !0, extensions: ["xcs"] },
  "application/call-completion": { source: "iana" },
  "application/cals-1840": { source: "iana" },
  "application/captive+json": { source: "iana", compressible: !0 },
  "application/cbor": { source: "iana" },
  "application/cbor-seq": { source: "iana" },
  "application/cccex": { source: "iana" },
  "application/ccmp+xml": { source: "iana", compressible: !0 },
  "application/ccxml+xml": { source: "iana", compressible: !0, extensions: ["ccxml"] },
  "application/cdfx+xml": { source: "iana", compressible: !0, extensions: ["cdfx"] },
  "application/cdmi-capability": { source: "iana", extensions: ["cdmia"] },
  "application/cdmi-container": { source: "iana", extensions: ["cdmic"] },
  "application/cdmi-domain": { source: "iana", extensions: ["cdmid"] },
  "application/cdmi-object": { source: "iana", extensions: ["cdmio"] },
  "application/cdmi-queue": { source: "iana", extensions: ["cdmiq"] },
  "application/cdni": { source: "iana" },
  "application/cea": { source: "iana" },
  "application/cea-2018+xml": { source: "iana", compressible: !0 },
  "application/cellml+xml": { source: "iana", compressible: !0 },
  "application/cfw": { source: "iana" },
  "application/city+json": { source: "iana", compressible: !0 },
  "application/clr": { source: "iana" },
  "application/clue+xml": { source: "iana", compressible: !0 },
  "application/clue_info+xml": { source: "iana", compressible: !0 },
  "application/cms": { source: "iana" },
  "application/cnrp+xml": { source: "iana", compressible: !0 },
  "application/coap-group+json": { source: "iana", compressible: !0 },
  "application/coap-payload": { source: "iana" },
  "application/commonground": { source: "iana" },
  "application/conference-info+xml": { source: "iana", compressible: !0 },
  "application/cose": { source: "iana" },
  "application/cose-key": { source: "iana" },
  "application/cose-key-set": { source: "iana" },
  "application/cpl+xml": { source: "iana", compressible: !0, extensions: ["cpl"] },
  "application/csrattrs": { source: "iana" },
  "application/csta+xml": { source: "iana", compressible: !0 },
  "application/cstadata+xml": { source: "iana", compressible: !0 },
  "application/csvm+json": { source: "iana", compressible: !0 },
  "application/cu-seeme": { source: "apache", extensions: ["cu"] },
  "application/cwt": { source: "iana" },
  "application/cybercash": { source: "iana" },
  "application/dart": { compressible: !0 },
  "application/dash+xml": { source: "iana", compressible: !0, extensions: ["mpd"] },
  "application/dash-patch+xml": { source: "iana", compressible: !0, extensions: ["mpp"] },
  "application/dashdelta": { source: "iana" },
  "application/davmount+xml": { source: "iana", compressible: !0, extensions: ["davmount"] },
  "application/dca-rft": { source: "iana" },
  "application/dcd": { source: "iana" },
  "application/dec-dx": { source: "iana" },
  "application/dialog-info+xml": { source: "iana", compressible: !0 },
  "application/dicom": { source: "iana" },
  "application/dicom+json": { source: "iana", compressible: !0 },
  "application/dicom+xml": { source: "iana", compressible: !0 },
  "application/dii": { source: "iana" },
  "application/dit": { source: "iana" },
  "application/dns": { source: "iana" },
  "application/dns+json": { source: "iana", compressible: !0 },
  "application/dns-message": { source: "iana" },
  "application/docbook+xml": { source: "apache", compressible: !0, extensions: ["dbk"] },
  "application/dots+cbor": { source: "iana" },
  "application/dskpp+xml": { source: "iana", compressible: !0 },
  "application/dssc+der": { source: "iana", extensions: ["dssc"] },
  "application/dssc+xml": { source: "iana", compressible: !0, extensions: ["xdssc"] },
  "application/dvcs": { source: "iana" },
  "application/ecmascript": { source: "iana", compressible: !0, extensions: ["es", "ecma"] },
  "application/edi-consent": { source: "iana" },
  "application/edi-x12": { source: "iana", compressible: !1 },
  "application/edifact": { source: "iana", compressible: !1 },
  "application/efi": { source: "iana" },
  "application/elm+json": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/elm+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.cap+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/emergencycalldata.comment+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.control+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.deviceinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.ecall.msd": { source: "iana" },
  "application/emergencycalldata.providerinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.serviceinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.subscriberinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.veds+xml": { source: "iana", compressible: !0 },
  "application/emma+xml": { source: "iana", compressible: !0, extensions: ["emma"] },
  "application/emotionml+xml": { source: "iana", compressible: !0, extensions: ["emotionml"] },
  "application/encaprtp": { source: "iana" },
  "application/epp+xml": { source: "iana", compressible: !0 },
  "application/epub+zip": { source: "iana", compressible: !1, extensions: ["epub"] },
  "application/eshop": { source: "iana" },
  "application/exi": { source: "iana", extensions: ["exi"] },
  "application/expect-ct-report+json": { source: "iana", compressible: !0 },
  "application/express": { source: "iana", extensions: ["exp"] },
  "application/fastinfoset": { source: "iana" },
  "application/fastsoap": { source: "iana" },
  "application/fdt+xml": { source: "iana", compressible: !0, extensions: ["fdt"] },
  "application/fhir+json": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/fhir+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/fido.trusted-apps+json": { compressible: !0 },
  "application/fits": { source: "iana" },
  "application/flexfec": { source: "iana" },
  "application/font-sfnt": { source: "iana" },
  "application/font-tdpfr": { source: "iana", extensions: ["pfr"] },
  "application/font-woff": { source: "iana", compressible: !1 },
  "application/framework-attributes+xml": { source: "iana", compressible: !0 },
  "application/geo+json": { source: "iana", compressible: !0, extensions: ["geojson"] },
  "application/geo+json-seq": { source: "iana" },
  "application/geopackage+sqlite3": { source: "iana" },
  "application/geoxacml+xml": { source: "iana", compressible: !0 },
  "application/gltf-buffer": { source: "iana" },
  "application/gml+xml": { source: "iana", compressible: !0, extensions: ["gml"] },
  "application/gpx+xml": { source: "apache", compressible: !0, extensions: ["gpx"] },
  "application/gxf": { source: "apache", extensions: ["gxf"] },
  "application/gzip": { source: "iana", compressible: !1, extensions: ["gz"] },
  "application/h224": { source: "iana" },
  "application/held+xml": { source: "iana", compressible: !0 },
  "application/hjson": { extensions: ["hjson"] },
  "application/http": { source: "iana" },
  "application/hyperstudio": { source: "iana", extensions: ["stk"] },
  "application/ibe-key-request+xml": { source: "iana", compressible: !0 },
  "application/ibe-pkg-reply+xml": { source: "iana", compressible: !0 },
  "application/ibe-pp-data": { source: "iana" },
  "application/iges": { source: "iana" },
  "application/im-iscomposing+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/index": { source: "iana" },
  "application/index.cmd": { source: "iana" },
  "application/index.obj": { source: "iana" },
  "application/index.response": { source: "iana" },
  "application/index.vnd": { source: "iana" },
  "application/inkml+xml": { source: "iana", compressible: !0, extensions: ["ink", "inkml"] },
  "application/iotp": { source: "iana" },
  "application/ipfix": { source: "iana", extensions: ["ipfix"] },
  "application/ipp": { source: "iana" },
  "application/isup": { source: "iana" },
  "application/its+xml": { source: "iana", compressible: !0, extensions: ["its"] },
  "application/java-archive": { source: "apache", compressible: !1, extensions: ["jar", "war", "ear"] },
  "application/java-serialized-object": { source: "apache", compressible: !1, extensions: ["ser"] },
  "application/java-vm": { source: "apache", compressible: !1, extensions: ["class"] },
  "application/javascript": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["js", "mjs"] },
  "application/jf2feed+json": { source: "iana", compressible: !0 },
  "application/jose": { source: "iana" },
  "application/jose+json": { source: "iana", compressible: !0 },
  "application/jrd+json": { source: "iana", compressible: !0 },
  "application/jscalendar+json": { source: "iana", compressible: !0 },
  "application/json": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["json", "map"] },
  "application/json-patch+json": { source: "iana", compressible: !0 },
  "application/json-seq": { source: "iana" },
  "application/json5": { extensions: ["json5"] },
  "application/jsonml+json": { source: "apache", compressible: !0, extensions: ["jsonml"] },
  "application/jwk+json": { source: "iana", compressible: !0 },
  "application/jwk-set+json": { source: "iana", compressible: !0 },
  "application/jwt": { source: "iana" },
  "application/kpml-request+xml": { source: "iana", compressible: !0 },
  "application/kpml-response+xml": { source: "iana", compressible: !0 },
  "application/ld+json": { source: "iana", compressible: !0, extensions: ["jsonld"] },
  "application/lgr+xml": { source: "iana", compressible: !0, extensions: ["lgr"] },
  "application/link-format": { source: "iana" },
  "application/load-control+xml": { source: "iana", compressible: !0 },
  "application/lost+xml": { source: "iana", compressible: !0, extensions: ["lostxml"] },
  "application/lostsync+xml": { source: "iana", compressible: !0 },
  "application/lpf+zip": { source: "iana", compressible: !1 },
  "application/lxf": { source: "iana" },
  "application/mac-binhex40": { source: "iana", extensions: ["hqx"] },
  "application/mac-compactpro": { source: "apache", extensions: ["cpt"] },
  "application/macwriteii": { source: "iana" },
  "application/mads+xml": { source: "iana", compressible: !0, extensions: ["mads"] },
  "application/manifest+json": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["webmanifest"] },
  "application/marc": { source: "iana", extensions: ["mrc"] },
  "application/marcxml+xml": { source: "iana", compressible: !0, extensions: ["mrcx"] },
  "application/mathematica": { source: "iana", extensions: ["ma", "nb", "mb"] },
  "application/mathml+xml": { source: "iana", compressible: !0, extensions: ["mathml"] },
  "application/mathml-content+xml": { source: "iana", compressible: !0 },
  "application/mathml-presentation+xml": { source: "iana", compressible: !0 },
  "application/mbms-associated-procedure-description+xml": { source: "iana", compressible: !0 },
  "application/mbms-deregister+xml": { source: "iana", compressible: !0 },
  "application/mbms-envelope+xml": { source: "iana", compressible: !0 },
  "application/mbms-msk+xml": { source: "iana", compressible: !0 },
  "application/mbms-msk-response+xml": { source: "iana", compressible: !0 },
  "application/mbms-protection-description+xml": { source: "iana", compressible: !0 },
  "application/mbms-reception-report+xml": { source: "iana", compressible: !0 },
  "application/mbms-register+xml": { source: "iana", compressible: !0 },
  "application/mbms-register-response+xml": { source: "iana", compressible: !0 },
  "application/mbms-schedule+xml": { source: "iana", compressible: !0 },
  "application/mbms-user-service-description+xml": { source: "iana", compressible: !0 },
  "application/mbox": { source: "iana", extensions: ["mbox"] },
  "application/media-policy-dataset+xml": { source: "iana", compressible: !0, extensions: ["mpf"] },
  "application/media_control+xml": { source: "iana", compressible: !0 },
  "application/mediaservercontrol+xml": { source: "iana", compressible: !0, extensions: ["mscml"] },
  "application/merge-patch+json": { source: "iana", compressible: !0 },
  "application/metalink+xml": { source: "apache", compressible: !0, extensions: ["metalink"] },
  "application/metalink4+xml": { source: "iana", compressible: !0, extensions: ["meta4"] },
  "application/mets+xml": { source: "iana", compressible: !0, extensions: ["mets"] },
  "application/mf4": { source: "iana" },
  "application/mikey": { source: "iana" },
  "application/mipc": { source: "iana" },
  "application/missing-blocks+cbor-seq": { source: "iana" },
  "application/mmt-aei+xml": { source: "iana", compressible: !0, extensions: ["maei"] },
  "application/mmt-usd+xml": { source: "iana", compressible: !0, extensions: ["musd"] },
  "application/mods+xml": { source: "iana", compressible: !0, extensions: ["mods"] },
  "application/moss-keys": { source: "iana" },
  "application/moss-signature": { source: "iana" },
  "application/mosskey-data": { source: "iana" },
  "application/mosskey-request": { source: "iana" },
  "application/mp21": { source: "iana", extensions: ["m21", "mp21"] },
  "application/mp4": { source: "iana", extensions: ["mp4s", "m4p"] },
  "application/mpeg4-generic": { source: "iana" },
  "application/mpeg4-iod": { source: "iana" },
  "application/mpeg4-iod-xmt": { source: "iana" },
  "application/mrb-consumer+xml": { source: "iana", compressible: !0 },
  "application/mrb-publish+xml": { source: "iana", compressible: !0 },
  "application/msc-ivr+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/msc-mixer+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/msword": { source: "iana", compressible: !1, extensions: ["doc", "dot"] },
  "application/mud+json": { source: "iana", compressible: !0 },
  "application/multipart-core": { source: "iana" },
  "application/mxf": { source: "iana", extensions: ["mxf"] },
  "application/n-quads": { source: "iana", extensions: ["nq"] },
  "application/n-triples": { source: "iana", extensions: ["nt"] },
  "application/nasdata": { source: "iana" },
  "application/news-checkgroups": { source: "iana", charset: "US-ASCII" },
  "application/news-groupinfo": { source: "iana", charset: "US-ASCII" },
  "application/news-transmission": { source: "iana" },
  "application/nlsml+xml": { source: "iana", compressible: !0 },
  "application/node": { source: "iana", extensions: ["cjs"] },
  "application/nss": { source: "iana" },
  "application/oauth-authz-req+jwt": { source: "iana" },
  "application/oblivious-dns-message": { source: "iana" },
  "application/ocsp-request": { source: "iana" },
  "application/ocsp-response": { source: "iana" },
  "application/octet-stream": { source: "iana", compressible: !1, extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"] },
  "application/oda": { source: "iana", extensions: ["oda"] },
  "application/odm+xml": { source: "iana", compressible: !0 },
  "application/odx": { source: "iana" },
  "application/oebps-package+xml": { source: "iana", compressible: !0, extensions: ["opf"] },
  "application/ogg": { source: "iana", compressible: !1, extensions: ["ogx"] },
  "application/omdoc+xml": { source: "apache", compressible: !0, extensions: ["omdoc"] },
  "application/onenote": { source: "apache", extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"] },
  "application/opc-nodeset+xml": { source: "iana", compressible: !0 },
  "application/oscore": { source: "iana" },
  "application/oxps": { source: "iana", extensions: ["oxps"] },
  "application/p21": { source: "iana" },
  "application/p21+zip": { source: "iana", compressible: !1 },
  "application/p2p-overlay+xml": { source: "iana", compressible: !0, extensions: ["relo"] },
  "application/parityfec": { source: "iana" },
  "application/passport": { source: "iana" },
  "application/patch-ops-error+xml": { source: "iana", compressible: !0, extensions: ["xer"] },
  "application/pdf": { source: "iana", compressible: !1, extensions: ["pdf"] },
  "application/pdx": { source: "iana" },
  "application/pem-certificate-chain": { source: "iana" },
  "application/pgp-encrypted": { source: "iana", compressible: !1, extensions: ["pgp"] },
  "application/pgp-keys": { source: "iana", extensions: ["asc"] },
  "application/pgp-signature": { source: "iana", extensions: ["asc", "sig"] },
  "application/pics-rules": { source: "apache", extensions: ["prf"] },
  "application/pidf+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/pidf-diff+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/pkcs10": { source: "iana", extensions: ["p10"] },
  "application/pkcs12": { source: "iana" },
  "application/pkcs7-mime": { source: "iana", extensions: ["p7m", "p7c"] },
  "application/pkcs7-signature": { source: "iana", extensions: ["p7s"] },
  "application/pkcs8": { source: "iana", extensions: ["p8"] },
  "application/pkcs8-encrypted": { source: "iana" },
  "application/pkix-attr-cert": { source: "iana", extensions: ["ac"] },
  "application/pkix-cert": { source: "iana", extensions: ["cer"] },
  "application/pkix-crl": { source: "iana", extensions: ["crl"] },
  "application/pkix-pkipath": { source: "iana", extensions: ["pkipath"] },
  "application/pkixcmp": { source: "iana", extensions: ["pki"] },
  "application/pls+xml": { source: "iana", compressible: !0, extensions: ["pls"] },
  "application/poc-settings+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/postscript": { source: "iana", compressible: !0, extensions: ["ai", "eps", "ps"] },
  "application/ppsp-tracker+json": { source: "iana", compressible: !0 },
  "application/problem+json": { source: "iana", compressible: !0 },
  "application/problem+xml": { source: "iana", compressible: !0 },
  "application/provenance+xml": { source: "iana", compressible: !0, extensions: ["provx"] },
  "application/prs.alvestrand.titrax-sheet": { source: "iana" },
  "application/prs.cww": { source: "iana", extensions: ["cww"] },
  "application/prs.cyn": { source: "iana", charset: "7-BIT" },
  "application/prs.hpub+zip": { source: "iana", compressible: !1 },
  "application/prs.nprend": { source: "iana" },
  "application/prs.plucker": { source: "iana" },
  "application/prs.rdf-xml-crypt": { source: "iana" },
  "application/prs.xsf+xml": { source: "iana", compressible: !0 },
  "application/pskc+xml": { source: "iana", compressible: !0, extensions: ["pskcxml"] },
  "application/pvd+json": { source: "iana", compressible: !0 },
  "application/qsig": { source: "iana" },
  "application/raml+yaml": { compressible: !0, extensions: ["raml"] },
  "application/raptorfec": { source: "iana" },
  "application/rdap+json": { source: "iana", compressible: !0 },
  "application/rdf+xml": { source: "iana", compressible: !0, extensions: ["rdf", "owl"] },
  "application/reginfo+xml": { source: "iana", compressible: !0, extensions: ["rif"] },
  "application/relax-ng-compact-syntax": { source: "iana", extensions: ["rnc"] },
  "application/remote-printing": { source: "iana" },
  "application/reputon+json": { source: "iana", compressible: !0 },
  "application/resource-lists+xml": { source: "iana", compressible: !0, extensions: ["rl"] },
  "application/resource-lists-diff+xml": { source: "iana", compressible: !0, extensions: ["rld"] },
  "application/rfc+xml": { source: "iana", compressible: !0 },
  "application/riscos": { source: "iana" },
  "application/rlmi+xml": { source: "iana", compressible: !0 },
  "application/rls-services+xml": { source: "iana", compressible: !0, extensions: ["rs"] },
  "application/route-apd+xml": { source: "iana", compressible: !0, extensions: ["rapd"] },
  "application/route-s-tsid+xml": { source: "iana", compressible: !0, extensions: ["sls"] },
  "application/route-usd+xml": { source: "iana", compressible: !0, extensions: ["rusd"] },
  "application/rpki-ghostbusters": { source: "iana", extensions: ["gbr"] },
  "application/rpki-manifest": { source: "iana", extensions: ["mft"] },
  "application/rpki-publication": { source: "iana" },
  "application/rpki-roa": { source: "iana", extensions: ["roa"] },
  "application/rpki-updown": { source: "iana" },
  "application/rsd+xml": { source: "apache", compressible: !0, extensions: ["rsd"] },
  "application/rss+xml": { source: "apache", compressible: !0, extensions: ["rss"] },
  "application/rtf": { source: "iana", compressible: !0, extensions: ["rtf"] },
  "application/rtploopback": { source: "iana" },
  "application/rtx": { source: "iana" },
  "application/samlassertion+xml": { source: "iana", compressible: !0 },
  "application/samlmetadata+xml": { source: "iana", compressible: !0 },
  "application/sarif+json": { source: "iana", compressible: !0 },
  "application/sarif-external-properties+json": { source: "iana", compressible: !0 },
  "application/sbe": { source: "iana" },
  "application/sbml+xml": { source: "iana", compressible: !0, extensions: ["sbml"] },
  "application/scaip+xml": { source: "iana", compressible: !0 },
  "application/scim+json": { source: "iana", compressible: !0 },
  "application/scvp-cv-request": { source: "iana", extensions: ["scq"] },
  "application/scvp-cv-response": { source: "iana", extensions: ["scs"] },
  "application/scvp-vp-request": { source: "iana", extensions: ["spq"] },
  "application/scvp-vp-response": { source: "iana", extensions: ["spp"] },
  "application/sdp": { source: "iana", extensions: ["sdp"] },
  "application/secevent+jwt": { source: "iana" },
  "application/senml+cbor": { source: "iana" },
  "application/senml+json": { source: "iana", compressible: !0 },
  "application/senml+xml": { source: "iana", compressible: !0, extensions: ["senmlx"] },
  "application/senml-etch+cbor": { source: "iana" },
  "application/senml-etch+json": { source: "iana", compressible: !0 },
  "application/senml-exi": { source: "iana" },
  "application/sensml+cbor": { source: "iana" },
  "application/sensml+json": { source: "iana", compressible: !0 },
  "application/sensml+xml": { source: "iana", compressible: !0, extensions: ["sensmlx"] },
  "application/sensml-exi": { source: "iana" },
  "application/sep+xml": { source: "iana", compressible: !0 },
  "application/sep-exi": { source: "iana" },
  "application/session-info": { source: "iana" },
  "application/set-payment": { source: "iana" },
  "application/set-payment-initiation": { source: "iana", extensions: ["setpay"] },
  "application/set-registration": { source: "iana" },
  "application/set-registration-initiation": { source: "iana", extensions: ["setreg"] },
  "application/sgml": { source: "iana" },
  "application/sgml-open-catalog": { source: "iana" },
  "application/shf+xml": { source: "iana", compressible: !0, extensions: ["shf"] },
  "application/sieve": { source: "iana", extensions: ["siv", "sieve"] },
  "application/simple-filter+xml": { source: "iana", compressible: !0 },
  "application/simple-message-summary": { source: "iana" },
  "application/simplesymbolcontainer": { source: "iana" },
  "application/sipc": { source: "iana" },
  "application/slate": { source: "iana" },
  "application/smil": { source: "iana" },
  "application/smil+xml": { source: "iana", compressible: !0, extensions: ["smi", "smil"] },
  "application/smpte336m": { source: "iana" },
  "application/soap+fastinfoset": { source: "iana" },
  "application/soap+xml": { source: "iana", compressible: !0 },
  "application/sparql-query": { source: "iana", extensions: ["rq"] },
  "application/sparql-results+xml": { source: "iana", compressible: !0, extensions: ["srx"] },
  "application/spdx+json": { source: "iana", compressible: !0 },
  "application/spirits-event+xml": { source: "iana", compressible: !0 },
  "application/sql": { source: "iana" },
  "application/srgs": { source: "iana", extensions: ["gram"] },
  "application/srgs+xml": { source: "iana", compressible: !0, extensions: ["grxml"] },
  "application/sru+xml": { source: "iana", compressible: !0, extensions: ["sru"] },
  "application/ssdl+xml": { source: "apache", compressible: !0, extensions: ["ssdl"] },
  "application/ssml+xml": { source: "iana", compressible: !0, extensions: ["ssml"] },
  "application/stix+json": { source: "iana", compressible: !0 },
  "application/swid+xml": { source: "iana", compressible: !0, extensions: ["swidtag"] },
  "application/tamp-apex-update": { source: "iana" },
  "application/tamp-apex-update-confirm": { source: "iana" },
  "application/tamp-community-update": { source: "iana" },
  "application/tamp-community-update-confirm": { source: "iana" },
  "application/tamp-error": { source: "iana" },
  "application/tamp-sequence-adjust": { source: "iana" },
  "application/tamp-sequence-adjust-confirm": { source: "iana" },
  "application/tamp-status-query": { source: "iana" },
  "application/tamp-status-response": { source: "iana" },
  "application/tamp-update": { source: "iana" },
  "application/tamp-update-confirm": { source: "iana" },
  "application/tar": { compressible: !0 },
  "application/taxii+json": { source: "iana", compressible: !0 },
  "application/td+json": { source: "iana", compressible: !0 },
  "application/tei+xml": { source: "iana", compressible: !0, extensions: ["tei", "teicorpus"] },
  "application/tetra_isi": { source: "iana" },
  "application/thraud+xml": { source: "iana", compressible: !0, extensions: ["tfi"] },
  "application/timestamp-query": { source: "iana" },
  "application/timestamp-reply": { source: "iana" },
  "application/timestamped-data": { source: "iana", extensions: ["tsd"] },
  "application/tlsrpt+gzip": { source: "iana" },
  "application/tlsrpt+json": { source: "iana", compressible: !0 },
  "application/tnauthlist": { source: "iana" },
  "application/token-introspection+jwt": { source: "iana" },
  "application/toml": { compressible: !0, extensions: ["toml"] },
  "application/trickle-ice-sdpfrag": { source: "iana" },
  "application/trig": { source: "iana", extensions: ["trig"] },
  "application/ttml+xml": { source: "iana", compressible: !0, extensions: ["ttml"] },
  "application/tve-trigger": { source: "iana" },
  "application/tzif": { source: "iana" },
  "application/tzif-leap": { source: "iana" },
  "application/ubjson": { compressible: !1, extensions: ["ubj"] },
  "application/ulpfec": { source: "iana" },
  "application/urc-grpsheet+xml": { source: "iana", compressible: !0 },
  "application/urc-ressheet+xml": { source: "iana", compressible: !0, extensions: ["rsheet"] },
  "application/urc-targetdesc+xml": { source: "iana", compressible: !0, extensions: ["td"] },
  "application/urc-uisocketdesc+xml": { source: "iana", compressible: !0 },
  "application/vcard+json": { source: "iana", compressible: !0 },
  "application/vcard+xml": { source: "iana", compressible: !0 },
  "application/vemmi": { source: "iana" },
  "application/vividence.scriptfile": { source: "apache" },
  "application/vnd.1000minds.decision-model+xml": { source: "iana", compressible: !0, extensions: ["1km"] },
  "application/vnd.3gpp-prose+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp-prose-pc3ch+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp-v2x-local-service-information": { source: "iana" },
  "application/vnd.3gpp.5gnas": { source: "iana" },
  "application/vnd.3gpp.access-transfer-events+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.bsf+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.gmop+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.gtpc": { source: "iana" },
  "application/vnd.3gpp.interworking-data": { source: "iana" },
  "application/vnd.3gpp.lpp": { source: "iana" },
  "application/vnd.3gpp.mc-signalling-ear": { source: "iana" },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-payload": { source: "iana" },
  "application/vnd.3gpp.mcdata-service-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-signalling": { source: "iana" },
  "application/vnd.3gpp.mcdata-ue-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-user-profile+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-floor-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-location-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-service-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-signed+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-ue-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-user-profile+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-location-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-service-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-ue-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-user-profile+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mid-call+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.ngap": { source: "iana" },
  "application/vnd.3gpp.pfcp": { source: "iana" },
  "application/vnd.3gpp.pic-bw-large": { source: "iana", extensions: ["plb"] },
  "application/vnd.3gpp.pic-bw-small": { source: "iana", extensions: ["psb"] },
  "application/vnd.3gpp.pic-bw-var": { source: "iana", extensions: ["pvb"] },
  "application/vnd.3gpp.s1ap": { source: "iana" },
  "application/vnd.3gpp.sms": { source: "iana" },
  "application/vnd.3gpp.sms+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.srvcc-ext+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.srvcc-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.state-and-event-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.ussd+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp2.bcmcsinfo+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp2.sms": { source: "iana" },
  "application/vnd.3gpp2.tcap": { source: "iana", extensions: ["tcap"] },
  "application/vnd.3lightssoftware.imagescal": { source: "iana" },
  "application/vnd.3m.post-it-notes": { source: "iana", extensions: ["pwn"] },
  "application/vnd.accpac.simply.aso": { source: "iana", extensions: ["aso"] },
  "application/vnd.accpac.simply.imp": { source: "iana", extensions: ["imp"] },
  "application/vnd.acucobol": { source: "iana", extensions: ["acu"] },
  "application/vnd.acucorp": { source: "iana", extensions: ["atc", "acutc"] },
  "application/vnd.adobe.air-application-installer-package+zip": { source: "apache", compressible: !1, extensions: ["air"] },
  "application/vnd.adobe.flash.movie": { source: "iana" },
  "application/vnd.adobe.formscentral.fcdt": { source: "iana", extensions: ["fcdt"] },
  "application/vnd.adobe.fxp": { source: "iana", extensions: ["fxp", "fxpl"] },
  "application/vnd.adobe.partial-upload": { source: "iana" },
  "application/vnd.adobe.xdp+xml": { source: "iana", compressible: !0, extensions: ["xdp"] },
  "application/vnd.adobe.xfdf": { source: "iana", extensions: ["xfdf"] },
  "application/vnd.aether.imp": { source: "iana" },
  "application/vnd.afpc.afplinedata": { source: "iana" },
  "application/vnd.afpc.afplinedata-pagedef": { source: "iana" },
  "application/vnd.afpc.cmoca-cmresource": { source: "iana" },
  "application/vnd.afpc.foca-charset": { source: "iana" },
  "application/vnd.afpc.foca-codedfont": { source: "iana" },
  "application/vnd.afpc.foca-codepage": { source: "iana" },
  "application/vnd.afpc.modca": { source: "iana" },
  "application/vnd.afpc.modca-cmtable": { source: "iana" },
  "application/vnd.afpc.modca-formdef": { source: "iana" },
  "application/vnd.afpc.modca-mediummap": { source: "iana" },
  "application/vnd.afpc.modca-objectcontainer": { source: "iana" },
  "application/vnd.afpc.modca-overlay": { source: "iana" },
  "application/vnd.afpc.modca-pagesegment": { source: "iana" },
  "application/vnd.age": { source: "iana", extensions: ["age"] },
  "application/vnd.ah-barcode": { source: "iana" },
  "application/vnd.ahead.space": { source: "iana", extensions: ["ahead"] },
  "application/vnd.airzip.filesecure.azf": { source: "iana", extensions: ["azf"] },
  "application/vnd.airzip.filesecure.azs": { source: "iana", extensions: ["azs"] },
  "application/vnd.amadeus+json": { source: "iana", compressible: !0 },
  "application/vnd.amazon.ebook": { source: "apache", extensions: ["azw"] },
  "application/vnd.amazon.mobi8-ebook": { source: "iana" },
  "application/vnd.americandynamics.acc": { source: "iana", extensions: ["acc"] },
  "application/vnd.amiga.ami": { source: "iana", extensions: ["ami"] },
  "application/vnd.amundsen.maze+xml": { source: "iana", compressible: !0 },
  "application/vnd.android.ota": { source: "iana" },
  "application/vnd.android.package-archive": { source: "apache", compressible: !1, extensions: ["apk"] },
  "application/vnd.anki": { source: "iana" },
  "application/vnd.anser-web-certificate-issue-initiation": { source: "iana", extensions: ["cii"] },
  "application/vnd.anser-web-funds-transfer-initiation": { source: "apache", extensions: ["fti"] },
  "application/vnd.antix.game-component": { source: "iana", extensions: ["atx"] },
  "application/vnd.apache.arrow.file": { source: "iana" },
  "application/vnd.apache.arrow.stream": { source: "iana" },
  "application/vnd.apache.thrift.binary": { source: "iana" },
  "application/vnd.apache.thrift.compact": { source: "iana" },
  "application/vnd.apache.thrift.json": { source: "iana" },
  "application/vnd.api+json": { source: "iana", compressible: !0 },
  "application/vnd.aplextor.warrp+json": { source: "iana", compressible: !0 },
  "application/vnd.apothekende.reservation+json": { source: "iana", compressible: !0 },
  "application/vnd.apple.installer+xml": { source: "iana", compressible: !0, extensions: ["mpkg"] },
  "application/vnd.apple.keynote": { source: "iana", extensions: ["key"] },
  "application/vnd.apple.mpegurl": { source: "iana", extensions: ["m3u8"] },
  "application/vnd.apple.numbers": { source: "iana", extensions: ["numbers"] },
  "application/vnd.apple.pages": { source: "iana", extensions: ["pages"] },
  "application/vnd.apple.pkpass": { compressible: !1, extensions: ["pkpass"] },
  "application/vnd.arastra.swi": { source: "iana" },
  "application/vnd.aristanetworks.swi": { source: "iana", extensions: ["swi"] },
  "application/vnd.artisan+json": { source: "iana", compressible: !0 },
  "application/vnd.artsquare": { source: "iana" },
  "application/vnd.astraea-software.iota": { source: "iana", extensions: ["iota"] },
  "application/vnd.audiograph": { source: "iana", extensions: ["aep"] },
  "application/vnd.autopackage": { source: "iana" },
  "application/vnd.avalon+json": { source: "iana", compressible: !0 },
  "application/vnd.avistar+xml": { source: "iana", compressible: !0 },
  "application/vnd.balsamiq.bmml+xml": { source: "iana", compressible: !0, extensions: ["bmml"] },
  "application/vnd.balsamiq.bmpr": { source: "iana" },
  "application/vnd.banana-accounting": { source: "iana" },
  "application/vnd.bbf.usp.error": { source: "iana" },
  "application/vnd.bbf.usp.msg": { source: "iana" },
  "application/vnd.bbf.usp.msg+json": { source: "iana", compressible: !0 },
  "application/vnd.bekitzur-stech+json": { source: "iana", compressible: !0 },
  "application/vnd.bint.med-content": { source: "iana" },
  "application/vnd.biopax.rdf+xml": { source: "iana", compressible: !0 },
  "application/vnd.blink-idb-value-wrapper": { source: "iana" },
  "application/vnd.blueice.multipass": { source: "iana", extensions: ["mpm"] },
  "application/vnd.bluetooth.ep.oob": { source: "iana" },
  "application/vnd.bluetooth.le.oob": { source: "iana" },
  "application/vnd.bmi": { source: "iana", extensions: ["bmi"] },
  "application/vnd.bpf": { source: "iana" },
  "application/vnd.bpf3": { source: "iana" },
  "application/vnd.businessobjects": { source: "iana", extensions: ["rep"] },
  "application/vnd.byu.uapi+json": { source: "iana", compressible: !0 },
  "application/vnd.cab-jscript": { source: "iana" },
  "application/vnd.canon-cpdl": { source: "iana" },
  "application/vnd.canon-lips": { source: "iana" },
  "application/vnd.capasystems-pg+json": { source: "iana", compressible: !0 },
  "application/vnd.cendio.thinlinc.clientconf": { source: "iana" },
  "application/vnd.century-systems.tcp_stream": { source: "iana" },
  "application/vnd.chemdraw+xml": { source: "iana", compressible: !0, extensions: ["cdxml"] },
  "application/vnd.chess-pgn": { source: "iana" },
  "application/vnd.chipnuts.karaoke-mmd": { source: "iana", extensions: ["mmd"] },
  "application/vnd.ciedi": { source: "iana" },
  "application/vnd.cinderella": { source: "iana", extensions: ["cdy"] },
  "application/vnd.cirpack.isdn-ext": { source: "iana" },
  "application/vnd.citationstyles.style+xml": { source: "iana", compressible: !0, extensions: ["csl"] },
  "application/vnd.claymore": { source: "iana", extensions: ["cla"] },
  "application/vnd.cloanto.rp9": { source: "iana", extensions: ["rp9"] },
  "application/vnd.clonk.c4group": { source: "iana", extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"] },
  "application/vnd.cluetrust.cartomobile-config": { source: "iana", extensions: ["c11amc"] },
  "application/vnd.cluetrust.cartomobile-config-pkg": { source: "iana", extensions: ["c11amz"] },
  "application/vnd.coffeescript": { source: "iana" },
  "application/vnd.collabio.xodocuments.document": { source: "iana" },
  "application/vnd.collabio.xodocuments.document-template": { source: "iana" },
  "application/vnd.collabio.xodocuments.presentation": { source: "iana" },
  "application/vnd.collabio.xodocuments.presentation-template": { source: "iana" },
  "application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" },
  "application/vnd.collabio.xodocuments.spreadsheet-template": { source: "iana" },
  "application/vnd.collection+json": { source: "iana", compressible: !0 },
  "application/vnd.collection.doc+json": { source: "iana", compressible: !0 },
  "application/vnd.collection.next+json": { source: "iana", compressible: !0 },
  "application/vnd.comicbook+zip": { source: "iana", compressible: !1 },
  "application/vnd.comicbook-rar": { source: "iana" },
  "application/vnd.commerce-battelle": { source: "iana" },
  "application/vnd.commonspace": { source: "iana", extensions: ["csp"] },
  "application/vnd.contact.cmsg": { source: "iana", extensions: ["cdbcmsg"] },
  "application/vnd.coreos.ignition+json": { source: "iana", compressible: !0 },
  "application/vnd.cosmocaller": { source: "iana", extensions: ["cmc"] },
  "application/vnd.crick.clicker": { source: "iana", extensions: ["clkx"] },
  "application/vnd.crick.clicker.keyboard": { source: "iana", extensions: ["clkk"] },
  "application/vnd.crick.clicker.palette": { source: "iana", extensions: ["clkp"] },
  "application/vnd.crick.clicker.template": { source: "iana", extensions: ["clkt"] },
  "application/vnd.crick.clicker.wordbank": { source: "iana", extensions: ["clkw"] },
  "application/vnd.criticaltools.wbs+xml": { source: "iana", compressible: !0, extensions: ["wbs"] },
  "application/vnd.cryptii.pipe+json": { source: "iana", compressible: !0 },
  "application/vnd.crypto-shade-file": { source: "iana" },
  "application/vnd.cryptomator.encrypted": { source: "iana" },
  "application/vnd.cryptomator.vault": { source: "iana" },
  "application/vnd.ctc-posml": { source: "iana", extensions: ["pml"] },
  "application/vnd.ctct.ws+xml": { source: "iana", compressible: !0 },
  "application/vnd.cups-pdf": { source: "iana" },
  "application/vnd.cups-postscript": { source: "iana" },
  "application/vnd.cups-ppd": { source: "iana", extensions: ["ppd"] },
  "application/vnd.cups-raster": { source: "iana" },
  "application/vnd.cups-raw": { source: "iana" },
  "application/vnd.curl": { source: "iana" },
  "application/vnd.curl.car": { source: "apache", extensions: ["car"] },
  "application/vnd.curl.pcurl": { source: "apache", extensions: ["pcurl"] },
  "application/vnd.cyan.dean.root+xml": { source: "iana", compressible: !0 },
  "application/vnd.cybank": { source: "iana" },
  "application/vnd.cyclonedx+json": { source: "iana", compressible: !0 },
  "application/vnd.cyclonedx+xml": { source: "iana", compressible: !0 },
  "application/vnd.d2l.coursepackage1p0+zip": { source: "iana", compressible: !1 },
  "application/vnd.d3m-dataset": { source: "iana" },
  "application/vnd.d3m-problem": { source: "iana" },
  "application/vnd.dart": { source: "iana", compressible: !0, extensions: ["dart"] },
  "application/vnd.data-vision.rdz": { source: "iana", extensions: ["rdz"] },
  "application/vnd.datapackage+json": { source: "iana", compressible: !0 },
  "application/vnd.dataresource+json": { source: "iana", compressible: !0 },
  "application/vnd.dbf": { source: "iana", extensions: ["dbf"] },
  "application/vnd.debian.binary-package": { source: "iana" },
  "application/vnd.dece.data": { source: "iana", extensions: ["uvf", "uvvf", "uvd", "uvvd"] },
  "application/vnd.dece.ttml+xml": { source: "iana", compressible: !0, extensions: ["uvt", "uvvt"] },
  "application/vnd.dece.unspecified": { source: "iana", extensions: ["uvx", "uvvx"] },
  "application/vnd.dece.zip": { source: "iana", extensions: ["uvz", "uvvz"] },
  "application/vnd.denovo.fcselayout-link": { source: "iana", extensions: ["fe_launch"] },
  "application/vnd.desmume.movie": { source: "iana" },
  "application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" },
  "application/vnd.dm.delegation+xml": { source: "iana", compressible: !0 },
  "application/vnd.dna": { source: "iana", extensions: ["dna"] },
  "application/vnd.document+json": { source: "iana", compressible: !0 },
  "application/vnd.dolby.mlp": { source: "apache", extensions: ["mlp"] },
  "application/vnd.dolby.mobile.1": { source: "iana" },
  "application/vnd.dolby.mobile.2": { source: "iana" },
  "application/vnd.doremir.scorecloud-binary-document": { source: "iana" },
  "application/vnd.dpgraph": { source: "iana", extensions: ["dpg"] },
  "application/vnd.dreamfactory": { source: "iana", extensions: ["dfac"] },
  "application/vnd.drive+json": { source: "iana", compressible: !0 },
  "application/vnd.ds-keypoint": { source: "apache", extensions: ["kpxx"] },
  "application/vnd.dtg.local": { source: "iana" },
  "application/vnd.dtg.local.flash": { source: "iana" },
  "application/vnd.dtg.local.html": { source: "iana" },
  "application/vnd.dvb.ait": { source: "iana", extensions: ["ait"] },
  "application/vnd.dvb.dvbisl+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.dvbj": { source: "iana" },
  "application/vnd.dvb.esgcontainer": { source: "iana" },
  "application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" },
  "application/vnd.dvb.ipdcesgaccess": { source: "iana" },
  "application/vnd.dvb.ipdcesgaccess2": { source: "iana" },
  "application/vnd.dvb.ipdcesgpdd": { source: "iana" },
  "application/vnd.dvb.ipdcroaming": { source: "iana" },
  "application/vnd.dvb.iptv.alfec-base": { source: "iana" },
  "application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" },
  "application/vnd.dvb.notif-aggregate-root+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-container+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-generic+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-msglist+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-registration-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-registration-response+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-init+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.pfr": { source: "iana" },
  "application/vnd.dvb.service": { source: "iana", extensions: ["svc"] },
  "application/vnd.dxr": { source: "iana" },
  "application/vnd.dynageo": { source: "iana", extensions: ["geo"] },
  "application/vnd.dzr": { source: "iana" },
  "application/vnd.easykaraoke.cdgdownload": { source: "iana" },
  "application/vnd.ecdis-update": { source: "iana" },
  "application/vnd.ecip.rlp": { source: "iana" },
  "application/vnd.eclipse.ditto+json": { source: "iana", compressible: !0 },
  "application/vnd.ecowin.chart": { source: "iana", extensions: ["mag"] },
  "application/vnd.ecowin.filerequest": { source: "iana" },
  "application/vnd.ecowin.fileupdate": { source: "iana" },
  "application/vnd.ecowin.series": { source: "iana" },
  "application/vnd.ecowin.seriesrequest": { source: "iana" },
  "application/vnd.ecowin.seriesupdate": { source: "iana" },
  "application/vnd.efi.img": { source: "iana" },
  "application/vnd.efi.iso": { source: "iana" },
  "application/vnd.emclient.accessrequest+xml": { source: "iana", compressible: !0 },
  "application/vnd.enliven": { source: "iana", extensions: ["nml"] },
  "application/vnd.enphase.envoy": { source: "iana" },
  "application/vnd.eprints.data+xml": { source: "iana", compressible: !0 },
  "application/vnd.epson.esf": { source: "iana", extensions: ["esf"] },
  "application/vnd.epson.msf": { source: "iana", extensions: ["msf"] },
  "application/vnd.epson.quickanime": { source: "iana", extensions: ["qam"] },
  "application/vnd.epson.salt": { source: "iana", extensions: ["slt"] },
  "application/vnd.epson.ssf": { source: "iana", extensions: ["ssf"] },
  "application/vnd.ericsson.quickcall": { source: "iana" },
  "application/vnd.espass-espass+zip": { source: "iana", compressible: !1 },
  "application/vnd.eszigno3+xml": { source: "iana", compressible: !0, extensions: ["es3", "et3"] },
  "application/vnd.etsi.aoc+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.asic-e+zip": { source: "iana", compressible: !1 },
  "application/vnd.etsi.asic-s+zip": { source: "iana", compressible: !1 },
  "application/vnd.etsi.cug+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvcommand+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvdiscovery+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-bc+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-cod+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-npvr+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvservice+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsync+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvueprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.mcid+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.mheg5": { source: "iana" },
  "application/vnd.etsi.overload-control-policy-dataset+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.pstn+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.sci+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.simservs+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.timestamp-token": { source: "iana" },
  "application/vnd.etsi.tsl+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.tsl.der": { source: "iana" },
  "application/vnd.eu.kasparian.car+json": { source: "iana", compressible: !0 },
  "application/vnd.eudora.data": { source: "iana" },
  "application/vnd.evolv.ecig.profile": { source: "iana" },
  "application/vnd.evolv.ecig.settings": { source: "iana" },
  "application/vnd.evolv.ecig.theme": { source: "iana" },
  "application/vnd.exstream-empower+zip": { source: "iana", compressible: !1 },
  "application/vnd.exstream-package": { source: "iana" },
  "application/vnd.ezpix-album": { source: "iana", extensions: ["ez2"] },
  "application/vnd.ezpix-package": { source: "iana", extensions: ["ez3"] },
  "application/vnd.f-secure.mobile": { source: "iana" },
  "application/vnd.familysearch.gedcom+zip": { source: "iana", compressible: !1 },
  "application/vnd.fastcopy-disk-image": { source: "iana" },
  "application/vnd.fdf": { source: "iana", extensions: ["fdf"] },
  "application/vnd.fdsn.mseed": { source: "iana", extensions: ["mseed"] },
  "application/vnd.fdsn.seed": { source: "iana", extensions: ["seed", "dataless"] },
  "application/vnd.ffsns": { source: "iana" },
  "application/vnd.ficlab.flb+zip": { source: "iana", compressible: !1 },
  "application/vnd.filmit.zfc": { source: "iana" },
  "application/vnd.fints": { source: "iana" },
  "application/vnd.firemonkeys.cloudcell": { source: "iana" },
  "application/vnd.flographit": { source: "iana", extensions: ["gph"] },
  "application/vnd.fluxtime.clip": { source: "iana", extensions: ["ftc"] },
  "application/vnd.font-fontforge-sfd": { source: "iana" },
  "application/vnd.framemaker": { source: "iana", extensions: ["fm", "frame", "maker", "book"] },
  "application/vnd.frogans.fnc": { source: "iana", extensions: ["fnc"] },
  "application/vnd.frogans.ltf": { source: "iana", extensions: ["ltf"] },
  "application/vnd.fsc.weblaunch": { source: "iana", extensions: ["fsc"] },
  "application/vnd.fujifilm.fb.docuworks": { source: "iana" },
  "application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" },
  "application/vnd.fujifilm.fb.docuworks.container": { source: "iana" },
  "application/vnd.fujifilm.fb.jfi+xml": { source: "iana", compressible: !0 },
  "application/vnd.fujitsu.oasys": { source: "iana", extensions: ["oas"] },
  "application/vnd.fujitsu.oasys2": { source: "iana", extensions: ["oa2"] },
  "application/vnd.fujitsu.oasys3": { source: "iana", extensions: ["oa3"] },
  "application/vnd.fujitsu.oasysgp": { source: "iana", extensions: ["fg5"] },
  "application/vnd.fujitsu.oasysprs": { source: "iana", extensions: ["bh2"] },
  "application/vnd.fujixerox.art-ex": { source: "iana" },
  "application/vnd.fujixerox.art4": { source: "iana" },
  "application/vnd.fujixerox.ddd": { source: "iana", extensions: ["ddd"] },
  "application/vnd.fujixerox.docuworks": { source: "iana", extensions: ["xdw"] },
  "application/vnd.fujixerox.docuworks.binder": { source: "iana", extensions: ["xbd"] },
  "application/vnd.fujixerox.docuworks.container": { source: "iana" },
  "application/vnd.fujixerox.hbpl": { source: "iana" },
  "application/vnd.fut-misnet": { source: "iana" },
  "application/vnd.futoin+cbor": { source: "iana" },
  "application/vnd.futoin+json": { source: "iana", compressible: !0 },
  "application/vnd.fuzzysheet": { source: "iana", extensions: ["fzs"] },
  "application/vnd.genomatix.tuxedo": { source: "iana", extensions: ["txd"] },
  "application/vnd.gentics.grd+json": { source: "iana", compressible: !0 },
  "application/vnd.geo+json": { source: "iana", compressible: !0 },
  "application/vnd.geocube+xml": { source: "iana", compressible: !0 },
  "application/vnd.geogebra.file": { source: "iana", extensions: ["ggb"] },
  "application/vnd.geogebra.slides": { source: "iana" },
  "application/vnd.geogebra.tool": { source: "iana", extensions: ["ggt"] },
  "application/vnd.geometry-explorer": { source: "iana", extensions: ["gex", "gre"] },
  "application/vnd.geonext": { source: "iana", extensions: ["gxt"] },
  "application/vnd.geoplan": { source: "iana", extensions: ["g2w"] },
  "application/vnd.geospace": { source: "iana", extensions: ["g3w"] },
  "application/vnd.gerber": { source: "iana" },
  "application/vnd.globalplatform.card-content-mgt": { source: "iana" },
  "application/vnd.globalplatform.card-content-mgt-response": { source: "iana" },
  "application/vnd.gmx": { source: "iana", extensions: ["gmx"] },
  "application/vnd.google-apps.document": { compressible: !1, extensions: ["gdoc"] },
  "application/vnd.google-apps.presentation": { compressible: !1, extensions: ["gslides"] },
  "application/vnd.google-apps.spreadsheet": { compressible: !1, extensions: ["gsheet"] },
  "application/vnd.google-earth.kml+xml": { source: "iana", compressible: !0, extensions: ["kml"] },
  "application/vnd.google-earth.kmz": { source: "iana", compressible: !1, extensions: ["kmz"] },
  "application/vnd.gov.sk.e-form+xml": { source: "iana", compressible: !0 },
  "application/vnd.gov.sk.e-form+zip": { source: "iana", compressible: !1 },
  "application/vnd.gov.sk.xmldatacontainer+xml": { source: "iana", compressible: !0 },
  "application/vnd.grafeq": { source: "iana", extensions: ["gqf", "gqs"] },
  "application/vnd.gridmp": { source: "iana" },
  "application/vnd.groove-account": { source: "iana", extensions: ["gac"] },
  "application/vnd.groove-help": { source: "iana", extensions: ["ghf"] },
  "application/vnd.groove-identity-message": { source: "iana", extensions: ["gim"] },
  "application/vnd.groove-injector": { source: "iana", extensions: ["grv"] },
  "application/vnd.groove-tool-message": { source: "iana", extensions: ["gtm"] },
  "application/vnd.groove-tool-template": { source: "iana", extensions: ["tpl"] },
  "application/vnd.groove-vcard": { source: "iana", extensions: ["vcg"] },
  "application/vnd.hal+json": { source: "iana", compressible: !0 },
  "application/vnd.hal+xml": { source: "iana", compressible: !0, extensions: ["hal"] },
  "application/vnd.handheld-entertainment+xml": { source: "iana", compressible: !0, extensions: ["zmm"] },
  "application/vnd.hbci": { source: "iana", extensions: ["hbci"] },
  "application/vnd.hc+json": { source: "iana", compressible: !0 },
  "application/vnd.hcl-bireports": { source: "iana" },
  "application/vnd.hdt": { source: "iana" },
  "application/vnd.heroku+json": { source: "iana", compressible: !0 },
  "application/vnd.hhe.lesson-player": { source: "iana", extensions: ["les"] },
  "application/vnd.hl7cda+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.hl7v2+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.hp-hpgl": { source: "iana", extensions: ["hpgl"] },
  "application/vnd.hp-hpid": { source: "iana", extensions: ["hpid"] },
  "application/vnd.hp-hps": { source: "iana", extensions: ["hps"] },
  "application/vnd.hp-jlyt": { source: "iana", extensions: ["jlt"] },
  "application/vnd.hp-pcl": { source: "iana", extensions: ["pcl"] },
  "application/vnd.hp-pclxl": { source: "iana", extensions: ["pclxl"] },
  "application/vnd.httphone": { source: "iana" },
  "application/vnd.hydrostatix.sof-data": { source: "iana", extensions: ["sfd-hdstx"] },
  "application/vnd.hyper+json": { source: "iana", compressible: !0 },
  "application/vnd.hyper-item+json": { source: "iana", compressible: !0 },
  "application/vnd.hyperdrive+json": { source: "iana", compressible: !0 },
  "application/vnd.hzn-3d-crossword": { source: "iana" },
  "application/vnd.ibm.afplinedata": { source: "iana" },
  "application/vnd.ibm.electronic-media": { source: "iana" },
  "application/vnd.ibm.minipay": { source: "iana", extensions: ["mpy"] },
  "application/vnd.ibm.modcap": { source: "iana", extensions: ["afp", "listafp", "list3820"] },
  "application/vnd.ibm.rights-management": { source: "iana", extensions: ["irm"] },
  "application/vnd.ibm.secure-container": { source: "iana", extensions: ["sc"] },
  "application/vnd.iccprofile": { source: "iana", extensions: ["icc", "icm"] },
  "application/vnd.ieee.1905": { source: "iana" },
  "application/vnd.igloader": { source: "iana", extensions: ["igl"] },
  "application/vnd.imagemeter.folder+zip": { source: "iana", compressible: !1 },
  "application/vnd.imagemeter.image+zip": { source: "iana", compressible: !1 },
  "application/vnd.immervision-ivp": { source: "iana", extensions: ["ivp"] },
  "application/vnd.immervision-ivu": { source: "iana", extensions: ["ivu"] },
  "application/vnd.ims.imsccv1p1": { source: "iana" },
  "application/vnd.ims.imsccv1p2": { source: "iana" },
  "application/vnd.ims.imsccv1p3": { source: "iana" },
  "application/vnd.ims.lis.v2.result+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolproxy+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolproxy.id+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolsettings+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": { source: "iana", compressible: !0 },
  "application/vnd.informedcontrol.rms+xml": { source: "iana", compressible: !0 },
  "application/vnd.informix-visionary": { source: "iana" },
  "application/vnd.infotech.project": { source: "iana" },
  "application/vnd.infotech.project+xml": { source: "iana", compressible: !0 },
  "application/vnd.innopath.wamp.notification": { source: "iana" },
  "application/vnd.insors.igm": { source: "iana", extensions: ["igm"] },
  "application/vnd.intercon.formnet": { source: "iana", extensions: ["xpw", "xpx"] },
  "application/vnd.intergeo": { source: "iana", extensions: ["i2g"] },
  "application/vnd.intertrust.digibox": { source: "iana" },
  "application/vnd.intertrust.nncp": { source: "iana" },
  "application/vnd.intu.qbo": { source: "iana", extensions: ["qbo"] },
  "application/vnd.intu.qfx": { source: "iana", extensions: ["qfx"] },
  "application/vnd.iptc.g2.catalogitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.conceptitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.knowledgeitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.newsitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.newsmessage+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.packageitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.planningitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.ipunplugged.rcprofile": { source: "iana", extensions: ["rcprofile"] },
  "application/vnd.irepository.package+xml": { source: "iana", compressible: !0, extensions: ["irp"] },
  "application/vnd.is-xpr": { source: "iana", extensions: ["xpr"] },
  "application/vnd.isac.fcs": { source: "iana", extensions: ["fcs"] },
  "application/vnd.iso11783-10+zip": { source: "iana", compressible: !1 },
  "application/vnd.jam": { source: "iana", extensions: ["jam"] },
  "application/vnd.japannet-directory-service": { source: "iana" },
  "application/vnd.japannet-jpnstore-wakeup": { source: "iana" },
  "application/vnd.japannet-payment-wakeup": { source: "iana" },
  "application/vnd.japannet-registration": { source: "iana" },
  "application/vnd.japannet-registration-wakeup": { source: "iana" },
  "application/vnd.japannet-setstore-wakeup": { source: "iana" },
  "application/vnd.japannet-verification": { source: "iana" },
  "application/vnd.japannet-verification-wakeup": { source: "iana" },
  "application/vnd.jcp.javame.midlet-rms": { source: "iana", extensions: ["rms"] },
  "application/vnd.jisp": { source: "iana", extensions: ["jisp"] },
  "application/vnd.joost.joda-archive": { source: "iana", extensions: ["joda"] },
  "application/vnd.jsk.isdn-ngn": { source: "iana" },
  "application/vnd.kahootz": { source: "iana", extensions: ["ktz", "ktr"] },
  "application/vnd.kde.karbon": { source: "iana", extensions: ["karbon"] },
  "application/vnd.kde.kchart": { source: "iana", extensions: ["chrt"] },
  "application/vnd.kde.kformula": { source: "iana", extensions: ["kfo"] },
  "application/vnd.kde.kivio": { source: "iana", extensions: ["flw"] },
  "application/vnd.kde.kontour": { source: "iana", extensions: ["kon"] },
  "application/vnd.kde.kpresenter": { source: "iana", extensions: ["kpr", "kpt"] },
  "application/vnd.kde.kspread": { source: "iana", extensions: ["ksp"] },
  "application/vnd.kde.kword": { source: "iana", extensions: ["kwd", "kwt"] },
  "application/vnd.kenameaapp": { source: "iana", extensions: ["htke"] },
  "application/vnd.kidspiration": { source: "iana", extensions: ["kia"] },
  "application/vnd.kinar": { source: "iana", extensions: ["kne", "knp"] },
  "application/vnd.koan": { source: "iana", extensions: ["skp", "skd", "skt", "skm"] },
  "application/vnd.kodak-descriptor": { source: "iana", extensions: ["sse"] },
  "application/vnd.las": { source: "iana" },
  "application/vnd.las.las+json": { source: "iana", compressible: !0 },
  "application/vnd.las.las+xml": { source: "iana", compressible: !0, extensions: ["lasxml"] },
  "application/vnd.laszip": { source: "iana" },
  "application/vnd.leap+json": { source: "iana", compressible: !0 },
  "application/vnd.liberty-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.llamagraphics.life-balance.desktop": { source: "iana", extensions: ["lbd"] },
  "application/vnd.llamagraphics.life-balance.exchange+xml": { source: "iana", compressible: !0, extensions: ["lbe"] },
  "application/vnd.logipipe.circuit+zip": { source: "iana", compressible: !1 },
  "application/vnd.loom": { source: "iana" },
  "application/vnd.lotus-1-2-3": { source: "iana", extensions: ["123"] },
  "application/vnd.lotus-approach": { source: "iana", extensions: ["apr"] },
  "application/vnd.lotus-freelance": { source: "iana", extensions: ["pre"] },
  "application/vnd.lotus-notes": { source: "iana", extensions: ["nsf"] },
  "application/vnd.lotus-organizer": { source: "iana", extensions: ["org"] },
  "application/vnd.lotus-screencam": { source: "iana", extensions: ["scm"] },
  "application/vnd.lotus-wordpro": { source: "iana", extensions: ["lwp"] },
  "application/vnd.macports.portpkg": { source: "iana", extensions: ["portpkg"] },
  "application/vnd.mapbox-vector-tile": { source: "iana", extensions: ["mvt"] },
  "application/vnd.marlin.drm.actiontoken+xml": { source: "iana", compressible: !0 },
  "application/vnd.marlin.drm.conftoken+xml": { source: "iana", compressible: !0 },
  "application/vnd.marlin.drm.license+xml": { source: "iana", compressible: !0 },
  "application/vnd.marlin.drm.mdcf": { source: "iana" },
  "application/vnd.mason+json": { source: "iana", compressible: !0 },
  "application/vnd.maxar.archive.3tz+zip": { source: "iana", compressible: !1 },
  "application/vnd.maxmind.maxmind-db": { source: "iana" },
  "application/vnd.mcd": { source: "iana", extensions: ["mcd"] },
  "application/vnd.medcalcdata": { source: "iana", extensions: ["mc1"] },
  "application/vnd.mediastation.cdkey": { source: "iana", extensions: ["cdkey"] },
  "application/vnd.meridian-slingshot": { source: "iana" },
  "application/vnd.mfer": { source: "iana", extensions: ["mwf"] },
  "application/vnd.mfmp": { source: "iana", extensions: ["mfm"] },
  "application/vnd.micro+json": { source: "iana", compressible: !0 },
  "application/vnd.micrografx.flo": { source: "iana", extensions: ["flo"] },
  "application/vnd.micrografx.igx": { source: "iana", extensions: ["igx"] },
  "application/vnd.microsoft.portable-executable": { source: "iana" },
  "application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" },
  "application/vnd.miele+json": { source: "iana", compressible: !0 },
  "application/vnd.mif": { source: "iana", extensions: ["mif"] },
  "application/vnd.minisoft-hp3000-save": { source: "iana" },
  "application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" },
  "application/vnd.mobius.daf": { source: "iana", extensions: ["daf"] },
  "application/vnd.mobius.dis": { source: "iana", extensions: ["dis"] },
  "application/vnd.mobius.mbk": { source: "iana", extensions: ["mbk"] },
  "application/vnd.mobius.mqy": { source: "iana", extensions: ["mqy"] },
  "application/vnd.mobius.msl": { source: "iana", extensions: ["msl"] },
  "application/vnd.mobius.plc": { source: "iana", extensions: ["plc"] },
  "application/vnd.mobius.txf": { source: "iana", extensions: ["txf"] },
  "application/vnd.mophun.application": { source: "iana", extensions: ["mpn"] },
  "application/vnd.mophun.certificate": { source: "iana", extensions: ["mpc"] },
  "application/vnd.motorola.flexsuite": { source: "iana" },
  "application/vnd.motorola.flexsuite.adsi": { source: "iana" },
  "application/vnd.motorola.flexsuite.fis": { source: "iana" },
  "application/vnd.motorola.flexsuite.gotap": { source: "iana" },
  "application/vnd.motorola.flexsuite.kmr": { source: "iana" },
  "application/vnd.motorola.flexsuite.ttc": { source: "iana" },
  "application/vnd.motorola.flexsuite.wem": { source: "iana" },
  "application/vnd.motorola.iprm": { source: "iana" },
  "application/vnd.mozilla.xul+xml": { source: "iana", compressible: !0, extensions: ["xul"] },
  "application/vnd.ms-3mfdocument": { source: "iana" },
  "application/vnd.ms-artgalry": { source: "iana", extensions: ["cil"] },
  "application/vnd.ms-asf": { source: "iana" },
  "application/vnd.ms-cab-compressed": { source: "iana", extensions: ["cab"] },
  "application/vnd.ms-color.iccprofile": { source: "apache" },
  "application/vnd.ms-excel": { source: "iana", compressible: !1, extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"] },
  "application/vnd.ms-excel.addin.macroenabled.12": { source: "iana", extensions: ["xlam"] },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": { source: "iana", extensions: ["xlsb"] },
  "application/vnd.ms-excel.sheet.macroenabled.12": { source: "iana", extensions: ["xlsm"] },
  "application/vnd.ms-excel.template.macroenabled.12": { source: "iana", extensions: ["xltm"] },
  "application/vnd.ms-fontobject": { source: "iana", compressible: !0, extensions: ["eot"] },
  "application/vnd.ms-htmlhelp": { source: "iana", extensions: ["chm"] },
  "application/vnd.ms-ims": { source: "iana", extensions: ["ims"] },
  "application/vnd.ms-lrm": { source: "iana", extensions: ["lrm"] },
  "application/vnd.ms-office.activex+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-officetheme": { source: "iana", extensions: ["thmx"] },
  "application/vnd.ms-opentype": { source: "apache", compressible: !0 },
  "application/vnd.ms-outlook": { compressible: !1, extensions: ["msg"] },
  "application/vnd.ms-package.obfuscated-opentype": { source: "apache" },
  "application/vnd.ms-pki.seccat": { source: "apache", extensions: ["cat"] },
  "application/vnd.ms-pki.stl": { source: "apache", extensions: ["stl"] },
  "application/vnd.ms-playready.initiator+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-powerpoint": { source: "iana", compressible: !1, extensions: ["ppt", "pps", "pot"] },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": { source: "iana", extensions: ["ppam"] },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": { source: "iana", extensions: ["pptm"] },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": { source: "iana", extensions: ["sldm"] },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": { source: "iana", extensions: ["ppsm"] },
  "application/vnd.ms-powerpoint.template.macroenabled.12": { source: "iana", extensions: ["potm"] },
  "application/vnd.ms-printdevicecapabilities+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-printing.printticket+xml": { source: "apache", compressible: !0 },
  "application/vnd.ms-printschematicket+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-project": { source: "iana", extensions: ["mpp", "mpt"] },
  "application/vnd.ms-tnef": { source: "iana" },
  "application/vnd.ms-windows.devicepairing": { source: "iana" },
  "application/vnd.ms-windows.nwprinting.oob": { source: "iana" },
  "application/vnd.ms-windows.printerpairing": { source: "iana" },
  "application/vnd.ms-windows.wsd.oob": { source: "iana" },
  "application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" },
  "application/vnd.ms-wmdrm.lic-resp": { source: "iana" },
  "application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" },
  "application/vnd.ms-wmdrm.meter-resp": { source: "iana" },
  "application/vnd.ms-word.document.macroenabled.12": { source: "iana", extensions: ["docm"] },
  "application/vnd.ms-word.template.macroenabled.12": { source: "iana", extensions: ["dotm"] },
  "application/vnd.ms-works": { source: "iana", extensions: ["wps", "wks", "wcm", "wdb"] },
  "application/vnd.ms-wpl": { source: "iana", extensions: ["wpl"] },
  "application/vnd.ms-xpsdocument": { source: "iana", compressible: !1, extensions: ["xps"] },
  "application/vnd.msa-disk-image": { source: "iana" },
  "application/vnd.mseq": { source: "iana", extensions: ["mseq"] },
  "application/vnd.msign": { source: "iana" },
  "application/vnd.multiad.creator": { source: "iana" },
  "application/vnd.multiad.creator.cif": { source: "iana" },
  "application/vnd.music-niff": { source: "iana" },
  "application/vnd.musician": { source: "iana", extensions: ["mus"] },
  "application/vnd.muvee.style": { source: "iana", extensions: ["msty"] },
  "application/vnd.mynfc": { source: "iana", extensions: ["taglet"] },
  "application/vnd.nacamar.ybrid+json": { source: "iana", compressible: !0 },
  "application/vnd.ncd.control": { source: "iana" },
  "application/vnd.ncd.reference": { source: "iana" },
  "application/vnd.nearst.inv+json": { source: "iana", compressible: !0 },
  "application/vnd.nebumind.line": { source: "iana" },
  "application/vnd.nervana": { source: "iana" },
  "application/vnd.netfpx": { source: "iana" },
  "application/vnd.neurolanguage.nlu": { source: "iana", extensions: ["nlu"] },
  "application/vnd.nimn": { source: "iana" },
  "application/vnd.nintendo.nitro.rom": { source: "iana" },
  "application/vnd.nintendo.snes.rom": { source: "iana" },
  "application/vnd.nitf": { source: "iana", extensions: ["ntf", "nitf"] },
  "application/vnd.noblenet-directory": { source: "iana", extensions: ["nnd"] },
  "application/vnd.noblenet-sealer": { source: "iana", extensions: ["nns"] },
  "application/vnd.noblenet-web": { source: "iana", extensions: ["nnw"] },
  "application/vnd.nokia.catalogs": { source: "iana" },
  "application/vnd.nokia.conml+wbxml": { source: "iana" },
  "application/vnd.nokia.conml+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.iptv.config+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.isds-radio-presets": { source: "iana" },
  "application/vnd.nokia.landmark+wbxml": { source: "iana" },
  "application/vnd.nokia.landmark+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.landmarkcollection+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.n-gage.ac+xml": { source: "iana", compressible: !0, extensions: ["ac"] },
  "application/vnd.nokia.n-gage.data": { source: "iana", extensions: ["ngdat"] },
  "application/vnd.nokia.n-gage.symbian.install": { source: "iana", extensions: ["n-gage"] },
  "application/vnd.nokia.ncd": { source: "iana" },
  "application/vnd.nokia.pcd+wbxml": { source: "iana" },
  "application/vnd.nokia.pcd+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.radio-preset": { source: "iana", extensions: ["rpst"] },
  "application/vnd.nokia.radio-presets": { source: "iana", extensions: ["rpss"] },
  "application/vnd.novadigm.edm": { source: "iana", extensions: ["edm"] },
  "application/vnd.novadigm.edx": { source: "iana", extensions: ["edx"] },
  "application/vnd.novadigm.ext": { source: "iana", extensions: ["ext"] },
  "application/vnd.ntt-local.content-share": { source: "iana" },
  "application/vnd.ntt-local.file-transfer": { source: "iana" },
  "application/vnd.ntt-local.ogw_remote-access": { source: "iana" },
  "application/vnd.ntt-local.sip-ta_remote": { source: "iana" },
  "application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" },
  "application/vnd.oasis.opendocument.chart": { source: "iana", extensions: ["odc"] },
  "application/vnd.oasis.opendocument.chart-template": { source: "iana", extensions: ["otc"] },
  "application/vnd.oasis.opendocument.database": { source: "iana", extensions: ["odb"] },
  "application/vnd.oasis.opendocument.formula": { source: "iana", extensions: ["odf"] },
  "application/vnd.oasis.opendocument.formula-template": { source: "iana", extensions: ["odft"] },
  "application/vnd.oasis.opendocument.graphics": { source: "iana", compressible: !1, extensions: ["odg"] },
  "application/vnd.oasis.opendocument.graphics-template": { source: "iana", extensions: ["otg"] },
  "application/vnd.oasis.opendocument.image": { source: "iana", extensions: ["odi"] },
  "application/vnd.oasis.opendocument.image-template": { source: "iana", extensions: ["oti"] },
  "application/vnd.oasis.opendocument.presentation": { source: "iana", compressible: !1, extensions: ["odp"] },
  "application/vnd.oasis.opendocument.presentation-template": { source: "iana", extensions: ["otp"] },
  "application/vnd.oasis.opendocument.spreadsheet": { source: "iana", compressible: !1, extensions: ["ods"] },
  "application/vnd.oasis.opendocument.spreadsheet-template": { source: "iana", extensions: ["ots"] },
  "application/vnd.oasis.opendocument.text": { source: "iana", compressible: !1, extensions: ["odt"] },
  "application/vnd.oasis.opendocument.text-master": { source: "iana", extensions: ["odm"] },
  "application/vnd.oasis.opendocument.text-template": { source: "iana", extensions: ["ott"] },
  "application/vnd.oasis.opendocument.text-web": { source: "iana", extensions: ["oth"] },
  "application/vnd.obn": { source: "iana" },
  "application/vnd.ocf+cbor": { source: "iana" },
  "application/vnd.oci.image.manifest.v1+json": { source: "iana", compressible: !0 },
  "application/vnd.oftn.l10n+json": { source: "iana", compressible: !0 },
  "application/vnd.oipf.contentaccessdownload+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.contentaccessstreaming+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.cspg-hexbinary": { source: "iana" },
  "application/vnd.oipf.dae.svg+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.dae.xhtml+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.mippvcontrolmessage+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.pae.gem": { source: "iana" },
  "application/vnd.oipf.spdiscovery+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.spdlist+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.ueprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.userprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.olpc-sugar": { source: "iana", extensions: ["xo"] },
  "application/vnd.oma-scws-config": { source: "iana" },
  "application/vnd.oma-scws-http-request": { source: "iana" },
  "application/vnd.oma-scws-http-response": { source: "iana" },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.drm-trigger+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.imd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.ltkm": { source: "iana" },
  "application/vnd.oma.bcast.notification+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.provisioningtrigger": { source: "iana" },
  "application/vnd.oma.bcast.sgboot": { source: "iana" },
  "application/vnd.oma.bcast.sgdd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.sgdu": { source: "iana" },
  "application/vnd.oma.bcast.simple-symbol-container": { source: "iana" },
  "application/vnd.oma.bcast.smartcard-trigger+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.sprov+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.stkm": { source: "iana" },
  "application/vnd.oma.cab-address-book+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-feature-handler+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-pcc+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-subs-invite+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-user-prefs+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.dcd": { source: "iana" },
  "application/vnd.oma.dcdc": { source: "iana" },
  "application/vnd.oma.dd2+xml": { source: "iana", compressible: !0, extensions: ["dd2"] },
  "application/vnd.oma.drm.risd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.group-usage-list+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.lwm2m+cbor": { source: "iana" },
  "application/vnd.oma.lwm2m+json": { source: "iana", compressible: !0 },
  "application/vnd.oma.lwm2m+tlv": { source: "iana" },
  "application/vnd.oma.pal+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.detailed-progress-report+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.final-report+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.groups+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.invocation-descriptor+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.optimized-progress-report+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.push": { source: "iana" },
  "application/vnd.oma.scidm.messages+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.xcap-directory+xml": { source: "iana", compressible: !0 },
  "application/vnd.omads-email+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.omads-file+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.omads-folder+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.omaloc-supl-init": { source: "iana" },
  "application/vnd.onepager": { source: "iana" },
  "application/vnd.onepagertamp": { source: "iana" },
  "application/vnd.onepagertamx": { source: "iana" },
  "application/vnd.onepagertat": { source: "iana" },
  "application/vnd.onepagertatp": { source: "iana" },
  "application/vnd.onepagertatx": { source: "iana" },
  "application/vnd.openblox.game+xml": { source: "iana", compressible: !0, extensions: ["obgx"] },
  "application/vnd.openblox.game-binary": { source: "iana" },
  "application/vnd.openeye.oeb": { source: "iana" },
  "application/vnd.openofficeorg.extension": { source: "apache", extensions: ["oxt"] },
  "application/vnd.openstreetmap.data+xml": { source: "iana", compressible: !0, extensions: ["osm"] },
  "application/vnd.opentimestamps.ots": { source: "iana" },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawing+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { source: "iana", compressible: !1, extensions: ["pptx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": { source: "iana", extensions: ["sldx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": { source: "iana", extensions: ["ppsx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.template": { source: "iana", extensions: ["potx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { source: "iana", compressible: !1, extensions: ["xlsx"] },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": { source: "iana", extensions: ["xltx"] },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.theme+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.vmldrawing": { source: "iana" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { source: "iana", compressible: !1, extensions: ["docx"] },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": { source: "iana", extensions: ["dotx"] },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.core-properties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.relationships+xml": { source: "iana", compressible: !0 },
  "application/vnd.oracle.resource+json": { source: "iana", compressible: !0 },
  "application/vnd.orange.indata": { source: "iana" },
  "application/vnd.osa.netdeploy": { source: "iana" },
  "application/vnd.osgeo.mapguide.package": { source: "iana", extensions: ["mgp"] },
  "application/vnd.osgi.bundle": { source: "iana" },
  "application/vnd.osgi.dp": { source: "iana", extensions: ["dp"] },
  "application/vnd.osgi.subsystem": { source: "iana", extensions: ["esa"] },
  "application/vnd.otps.ct-kip+xml": { source: "iana", compressible: !0 },
  "application/vnd.oxli.countgraph": { source: "iana" },
  "application/vnd.pagerduty+json": { source: "iana", compressible: !0 },
  "application/vnd.palm": { source: "iana", extensions: ["pdb", "pqa", "oprc"] },
  "application/vnd.panoply": { source: "iana" },
  "application/vnd.paos.xml": { source: "iana" },
  "application/vnd.patentdive": { source: "iana" },
  "application/vnd.patientecommsdoc": { source: "iana" },
  "application/vnd.pawaafile": { source: "iana", extensions: ["paw"] },
  "application/vnd.pcos": { source: "iana" },
  "application/vnd.pg.format": { source: "iana", extensions: ["str"] },
  "application/vnd.pg.osasli": { source: "iana", extensions: ["ei6"] },
  "application/vnd.piaccess.application-licence": { source: "iana" },
  "application/vnd.picsel": { source: "iana", extensions: ["efif"] },
  "application/vnd.pmi.widget": { source: "iana", extensions: ["wg"] },
  "application/vnd.poc.group-advertisement+xml": { source: "iana", compressible: !0 },
  "application/vnd.pocketlearn": { source: "iana", extensions: ["plf"] },
  "application/vnd.powerbuilder6": { source: "iana", extensions: ["pbd"] },
  "application/vnd.powerbuilder6-s": { source: "iana" },
  "application/vnd.powerbuilder7": { source: "iana" },
  "application/vnd.powerbuilder7-s": { source: "iana" },
  "application/vnd.powerbuilder75": { source: "iana" },
  "application/vnd.powerbuilder75-s": { source: "iana" },
  "application/vnd.preminet": { source: "iana" },
  "application/vnd.previewsystems.box": { source: "iana", extensions: ["box"] },
  "application/vnd.proteus.magazine": { source: "iana", extensions: ["mgz"] },
  "application/vnd.psfs": { source: "iana" },
  "application/vnd.publishare-delta-tree": { source: "iana", extensions: ["qps"] },
  "application/vnd.pvi.ptid1": { source: "iana", extensions: ["ptid"] },
  "application/vnd.pwg-multiplexed": { source: "iana" },
  "application/vnd.pwg-xhtml-print+xml": { source: "iana", compressible: !0 },
  "application/vnd.qualcomm.brew-app-res": { source: "iana" },
  "application/vnd.quarantainenet": { source: "iana" },
  "application/vnd.quark.quarkxpress": { source: "iana", extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"] },
  "application/vnd.quobject-quoxdocument": { source: "iana" },
  "application/vnd.radisys.moml+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-conf+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-conn+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-dialog+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-stream+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-conf+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-base+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-group+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-speech+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-transform+xml": { source: "iana", compressible: !0 },
  "application/vnd.rainstor.data": { source: "iana" },
  "application/vnd.rapid": { source: "iana" },
  "application/vnd.rar": { source: "iana", extensions: ["rar"] },
  "application/vnd.realvnc.bed": { source: "iana", extensions: ["bed"] },
  "application/vnd.recordare.musicxml": { source: "iana", extensions: ["mxl"] },
  "application/vnd.recordare.musicxml+xml": { source: "iana", compressible: !0, extensions: ["musicxml"] },
  "application/vnd.renlearn.rlprint": { source: "iana" },
  "application/vnd.resilient.logic": { source: "iana" },
  "application/vnd.restful+json": { source: "iana", compressible: !0 },
  "application/vnd.rig.cryptonote": { source: "iana", extensions: ["cryptonote"] },
  "application/vnd.rim.cod": { source: "apache", extensions: ["cod"] },
  "application/vnd.rn-realmedia": { source: "apache", extensions: ["rm"] },
  "application/vnd.rn-realmedia-vbr": { source: "apache", extensions: ["rmvb"] },
  "application/vnd.route66.link66+xml": { source: "iana", compressible: !0, extensions: ["link66"] },
  "application/vnd.rs-274x": { source: "iana" },
  "application/vnd.ruckus.download": { source: "iana" },
  "application/vnd.s3sms": { source: "iana" },
  "application/vnd.sailingtracker.track": { source: "iana", extensions: ["st"] },
  "application/vnd.sar": { source: "iana" },
  "application/vnd.sbm.cid": { source: "iana" },
  "application/vnd.sbm.mid2": { source: "iana" },
  "application/vnd.scribus": { source: "iana" },
  "application/vnd.sealed.3df": { source: "iana" },
  "application/vnd.sealed.csf": { source: "iana" },
  "application/vnd.sealed.doc": { source: "iana" },
  "application/vnd.sealed.eml": { source: "iana" },
  "application/vnd.sealed.mht": { source: "iana" },
  "application/vnd.sealed.net": { source: "iana" },
  "application/vnd.sealed.ppt": { source: "iana" },
  "application/vnd.sealed.tiff": { source: "iana" },
  "application/vnd.sealed.xls": { source: "iana" },
  "application/vnd.sealedmedia.softseal.html": { source: "iana" },
  "application/vnd.sealedmedia.softseal.pdf": { source: "iana" },
  "application/vnd.seemail": { source: "iana", extensions: ["see"] },
  "application/vnd.seis+json": { source: "iana", compressible: !0 },
  "application/vnd.sema": { source: "iana", extensions: ["sema"] },
  "application/vnd.semd": { source: "iana", extensions: ["semd"] },
  "application/vnd.semf": { source: "iana", extensions: ["semf"] },
  "application/vnd.shade-save-file": { source: "iana" },
  "application/vnd.shana.informed.formdata": { source: "iana", extensions: ["ifm"] },
  "application/vnd.shana.informed.formtemplate": { source: "iana", extensions: ["itp"] },
  "application/vnd.shana.informed.interchange": { source: "iana", extensions: ["iif"] },
  "application/vnd.shana.informed.package": { source: "iana", extensions: ["ipk"] },
  "application/vnd.shootproof+json": { source: "iana", compressible: !0 },
  "application/vnd.shopkick+json": { source: "iana", compressible: !0 },
  "application/vnd.shp": { source: "iana" },
  "application/vnd.shx": { source: "iana" },
  "application/vnd.sigrok.session": { source: "iana" },
  "application/vnd.simtech-mindmapper": { source: "iana", extensions: ["twd", "twds"] },
  "application/vnd.siren+json": { source: "iana", compressible: !0 },
  "application/vnd.smaf": { source: "iana", extensions: ["mmf"] },
  "application/vnd.smart.notebook": { source: "iana" },
  "application/vnd.smart.teacher": { source: "iana", extensions: ["teacher"] },
  "application/vnd.snesdev-page-table": { source: "iana" },
  "application/vnd.software602.filler.form+xml": { source: "iana", compressible: !0, extensions: ["fo"] },
  "application/vnd.software602.filler.form-xml-zip": { source: "iana" },
  "application/vnd.solent.sdkm+xml": { source: "iana", compressible: !0, extensions: ["sdkm", "sdkd"] },
  "application/vnd.spotfire.dxp": { source: "iana", extensions: ["dxp"] },
  "application/vnd.spotfire.sfs": { source: "iana", extensions: ["sfs"] },
  "application/vnd.sqlite3": { source: "iana" },
  "application/vnd.sss-cod": { source: "iana" },
  "application/vnd.sss-dtf": { source: "iana" },
  "application/vnd.sss-ntf": { source: "iana" },
  "application/vnd.stardivision.calc": { source: "apache", extensions: ["sdc"] },
  "application/vnd.stardivision.draw": { source: "apache", extensions: ["sda"] },
  "application/vnd.stardivision.impress": { source: "apache", extensions: ["sdd"] },
  "application/vnd.stardivision.math": { source: "apache", extensions: ["smf"] },
  "application/vnd.stardivision.writer": { source: "apache", extensions: ["sdw", "vor"] },
  "application/vnd.stardivision.writer-global": { source: "apache", extensions: ["sgl"] },
  "application/vnd.stepmania.package": { source: "iana", extensions: ["smzip"] },
  "application/vnd.stepmania.stepchart": { source: "iana", extensions: ["sm"] },
  "application/vnd.street-stream": { source: "iana" },
  "application/vnd.sun.wadl+xml": { source: "iana", compressible: !0, extensions: ["wadl"] },
  "application/vnd.sun.xml.calc": { source: "apache", extensions: ["sxc"] },
  "application/vnd.sun.xml.calc.template": { source: "apache", extensions: ["stc"] },
  "application/vnd.sun.xml.draw": { source: "apache", extensions: ["sxd"] },
  "application/vnd.sun.xml.draw.template": { source: "apache", extensions: ["std"] },
  "application/vnd.sun.xml.impress": { source: "apache", extensions: ["sxi"] },
  "application/vnd.sun.xml.impress.template": { source: "apache", extensions: ["sti"] },
  "application/vnd.sun.xml.math": { source: "apache", extensions: ["sxm"] },
  "application/vnd.sun.xml.writer": { source: "apache", extensions: ["sxw"] },
  "application/vnd.sun.xml.writer.global": { source: "apache", extensions: ["sxg"] },
  "application/vnd.sun.xml.writer.template": { source: "apache", extensions: ["stw"] },
  "application/vnd.sus-calendar": { source: "iana", extensions: ["sus", "susp"] },
  "application/vnd.svd": { source: "iana", extensions: ["svd"] },
  "application/vnd.swiftview-ics": { source: "iana" },
  "application/vnd.sycle+xml": { source: "iana", compressible: !0 },
  "application/vnd.syft+json": { source: "iana", compressible: !0 },
  "application/vnd.symbian.install": { source: "apache", extensions: ["sis", "sisx"] },
  "application/vnd.syncml+xml": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["xsm"] },
  "application/vnd.syncml.dm+wbxml": { source: "iana", charset: "UTF-8", extensions: ["bdm"] },
  "application/vnd.syncml.dm+xml": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["xdm"] },
  "application/vnd.syncml.dm.notification": { source: "iana" },
  "application/vnd.syncml.dmddf+wbxml": { source: "iana" },
  "application/vnd.syncml.dmddf+xml": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["ddf"] },
  "application/vnd.syncml.dmtnds+wbxml": { source: "iana" },
  "application/vnd.syncml.dmtnds+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.syncml.ds.notification": { source: "iana" },
  "application/vnd.tableschema+json": { source: "iana", compressible: !0 },
  "application/vnd.tao.intent-module-archive": { source: "iana", extensions: ["tao"] },
  "application/vnd.tcpdump.pcap": { source: "iana", extensions: ["pcap", "cap", "dmp"] },
  "application/vnd.think-cell.ppttc+json": { source: "iana", compressible: !0 },
  "application/vnd.tmd.mediaflex.api+xml": { source: "iana", compressible: !0 },
  "application/vnd.tml": { source: "iana" },
  "application/vnd.tmobile-livetv": { source: "iana", extensions: ["tmo"] },
  "application/vnd.tri.onesource": { source: "iana" },
  "application/vnd.trid.tpt": { source: "iana", extensions: ["tpt"] },
  "application/vnd.triscape.mxs": { source: "iana", extensions: ["mxs"] },
  "application/vnd.trueapp": { source: "iana", extensions: ["tra"] },
  "application/vnd.truedoc": { source: "iana" },
  "application/vnd.ubisoft.webplayer": { source: "iana" },
  "application/vnd.ufdl": { source: "iana", extensions: ["ufd", "ufdl"] },
  "application/vnd.uiq.theme": { source: "iana", extensions: ["utz"] },
  "application/vnd.umajin": { source: "iana", extensions: ["umj"] },
  "application/vnd.unity": { source: "iana", extensions: ["unityweb"] },
  "application/vnd.uoml+xml": { source: "iana", compressible: !0, extensions: ["uoml"] },
  "application/vnd.uplanet.alert": { source: "iana" },
  "application/vnd.uplanet.alert-wbxml": { source: "iana" },
  "application/vnd.uplanet.bearer-choice": { source: "iana" },
  "application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" },
  "application/vnd.uplanet.cacheop": { source: "iana" },
  "application/vnd.uplanet.cacheop-wbxml": { source: "iana" },
  "application/vnd.uplanet.channel": { source: "iana" },
  "application/vnd.uplanet.channel-wbxml": { source: "iana" },
  "application/vnd.uplanet.list": { source: "iana" },
  "application/vnd.uplanet.list-wbxml": { source: "iana" },
  "application/vnd.uplanet.listcmd": { source: "iana" },
  "application/vnd.uplanet.listcmd-wbxml": { source: "iana" },
  "application/vnd.uplanet.signal": { source: "iana" },
  "application/vnd.uri-map": { source: "iana" },
  "application/vnd.valve.source.material": { source: "iana" },
  "application/vnd.vcx": { source: "iana", extensions: ["vcx"] },
  "application/vnd.vd-study": { source: "iana" },
  "application/vnd.vectorworks": { source: "iana" },
  "application/vnd.vel+json": { source: "iana", compressible: !0 },
  "application/vnd.verimatrix.vcas": { source: "iana" },
  "application/vnd.veritone.aion+json": { source: "iana", compressible: !0 },
  "application/vnd.veryant.thin": { source: "iana" },
  "application/vnd.ves.encrypted": { source: "iana" },
  "application/vnd.vidsoft.vidconference": { source: "iana" },
  "application/vnd.visio": { source: "iana", extensions: ["vsd", "vst", "vss", "vsw"] },
  "application/vnd.visionary": { source: "iana", extensions: ["vis"] },
  "application/vnd.vividence.scriptfile": { source: "iana" },
  "application/vnd.vsf": { source: "iana", extensions: ["vsf"] },
  "application/vnd.wap.sic": { source: "iana" },
  "application/vnd.wap.slc": { source: "iana" },
  "application/vnd.wap.wbxml": { source: "iana", charset: "UTF-8", extensions: ["wbxml"] },
  "application/vnd.wap.wmlc": { source: "iana", extensions: ["wmlc"] },
  "application/vnd.wap.wmlscriptc": { source: "iana", extensions: ["wmlsc"] },
  "application/vnd.webturbo": { source: "iana", extensions: ["wtb"] },
  "application/vnd.wfa.dpp": { source: "iana" },
  "application/vnd.wfa.p2p": { source: "iana" },
  "application/vnd.wfa.wsc": { source: "iana" },
  "application/vnd.windows.devicepairing": { source: "iana" },
  "application/vnd.wmc": { source: "iana" },
  "application/vnd.wmf.bootstrap": { source: "iana" },
  "application/vnd.wolfram.mathematica": { source: "iana" },
  "application/vnd.wolfram.mathematica.package": { source: "iana" },
  "application/vnd.wolfram.player": { source: "iana", extensions: ["nbp"] },
  "application/vnd.wordperfect": { source: "iana", extensions: ["wpd"] },
  "application/vnd.wqd": { source: "iana", extensions: ["wqd"] },
  "application/vnd.wrq-hp3000-labelled": { source: "iana" },
  "application/vnd.wt.stf": { source: "iana", extensions: ["stf"] },
  "application/vnd.wv.csp+wbxml": { source: "iana" },
  "application/vnd.wv.csp+xml": { source: "iana", compressible: !0 },
  "application/vnd.wv.ssp+xml": { source: "iana", compressible: !0 },
  "application/vnd.xacml+json": { source: "iana", compressible: !0 },
  "application/vnd.xara": { source: "iana", extensions: ["xar"] },
  "application/vnd.xfdl": { source: "iana", extensions: ["xfdl"] },
  "application/vnd.xfdl.webform": { source: "iana" },
  "application/vnd.xmi+xml": { source: "iana", compressible: !0 },
  "application/vnd.xmpie.cpkg": { source: "iana" },
  "application/vnd.xmpie.dpkg": { source: "iana" },
  "application/vnd.xmpie.plan": { source: "iana" },
  "application/vnd.xmpie.ppkg": { source: "iana" },
  "application/vnd.xmpie.xlim": { source: "iana" },
  "application/vnd.yamaha.hv-dic": { source: "iana", extensions: ["hvd"] },
  "application/vnd.yamaha.hv-script": { source: "iana", extensions: ["hvs"] },
  "application/vnd.yamaha.hv-voice": { source: "iana", extensions: ["hvp"] },
  "application/vnd.yamaha.openscoreformat": { source: "iana", extensions: ["osf"] },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": { source: "iana", compressible: !0, extensions: ["osfpvg"] },
  "application/vnd.yamaha.remote-setup": { source: "iana" },
  "application/vnd.yamaha.smaf-audio": { source: "iana", extensions: ["saf"] },
  "application/vnd.yamaha.smaf-phrase": { source: "iana", extensions: ["spf"] },
  "application/vnd.yamaha.through-ngn": { source: "iana" },
  "application/vnd.yamaha.tunnel-udpencap": { source: "iana" },
  "application/vnd.yaoweme": { source: "iana" },
  "application/vnd.yellowriver-custom-menu": { source: "iana", extensions: ["cmp"] },
  "application/vnd.youtube.yt": { source: "iana" },
  "application/vnd.zul": { source: "iana", extensions: ["zir", "zirz"] },
  "application/vnd.zzazz.deck+xml": { source: "iana", compressible: !0, extensions: ["zaz"] },
  "application/voicexml+xml": { source: "iana", compressible: !0, extensions: ["vxml"] },
  "application/voucher-cms+json": { source: "iana", compressible: !0 },
  "application/vq-rtcpxr": { source: "iana" },
  "application/wasm": { source: "iana", compressible: !0, extensions: ["wasm"] },
  "application/watcherinfo+xml": { source: "iana", compressible: !0, extensions: ["wif"] },
  "application/webpush-options+json": { source: "iana", compressible: !0 },
  "application/whoispp-query": { source: "iana" },
  "application/whoispp-response": { source: "iana" },
  "application/widget": { source: "iana", extensions: ["wgt"] },
  "application/winhlp": { source: "apache", extensions: ["hlp"] },
  "application/wita": { source: "iana" },
  "application/wordperfect5.1": { source: "iana" },
  "application/wsdl+xml": { source: "iana", compressible: !0, extensions: ["wsdl"] },
  "application/wspolicy+xml": { source: "iana", compressible: !0, extensions: ["wspolicy"] },
  "application/x-7z-compressed": { source: "apache", compressible: !1, extensions: ["7z"] },
  "application/x-abiword": { source: "apache", extensions: ["abw"] },
  "application/x-ace-compressed": { source: "apache", extensions: ["ace"] },
  "application/x-amf": { source: "apache" },
  "application/x-apple-diskimage": { source: "apache", extensions: ["dmg"] },
  "application/x-arj": { compressible: !1, extensions: ["arj"] },
  "application/x-authorware-bin": { source: "apache", extensions: ["aab", "x32", "u32", "vox"] },
  "application/x-authorware-map": { source: "apache", extensions: ["aam"] },
  "application/x-authorware-seg": { source: "apache", extensions: ["aas"] },
  "application/x-bcpio": { source: "apache", extensions: ["bcpio"] },
  "application/x-bdoc": { compressible: !1, extensions: ["bdoc"] },
  "application/x-bittorrent": { source: "apache", extensions: ["torrent"] },
  "application/x-blorb": { source: "apache", extensions: ["blb", "blorb"] },
  "application/x-bzip": { source: "apache", compressible: !1, extensions: ["bz"] },
  "application/x-bzip2": { source: "apache", compressible: !1, extensions: ["bz2", "boz"] },
  "application/x-cbr": { source: "apache", extensions: ["cbr", "cba", "cbt", "cbz", "cb7"] },
  "application/x-cdlink": { source: "apache", extensions: ["vcd"] },
  "application/x-cfs-compressed": { source: "apache", extensions: ["cfs"] },
  "application/x-chat": { source: "apache", extensions: ["chat"] },
  "application/x-chess-pgn": { source: "apache", extensions: ["pgn"] },
  "application/x-chrome-extension": { extensions: ["crx"] },
  "application/x-cocoa": { source: "nginx", extensions: ["cco"] },
  "application/x-compress": { source: "apache" },
  "application/x-conference": { source: "apache", extensions: ["nsc"] },
  "application/x-cpio": { source: "apache", extensions: ["cpio"] },
  "application/x-csh": { source: "apache", extensions: ["csh"] },
  "application/x-deb": { compressible: !1 },
  "application/x-debian-package": { source: "apache", extensions: ["deb", "udeb"] },
  "application/x-dgc-compressed": { source: "apache", extensions: ["dgc"] },
  "application/x-director": { source: "apache", extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"] },
  "application/x-doom": { source: "apache", extensions: ["wad"] },
  "application/x-dtbncx+xml": { source: "apache", compressible: !0, extensions: ["ncx"] },
  "application/x-dtbook+xml": { source: "apache", compressible: !0, extensions: ["dtb"] },
  "application/x-dtbresource+xml": { source: "apache", compressible: !0, extensions: ["res"] },
  "application/x-dvi": { source: "apache", compressible: !1, extensions: ["dvi"] },
  "application/x-envoy": { source: "apache", extensions: ["evy"] },
  "application/x-eva": { source: "apache", extensions: ["eva"] },
  "application/x-font-bdf": { source: "apache", extensions: ["bdf"] },
  "application/x-font-dos": { source: "apache" },
  "application/x-font-framemaker": { source: "apache" },
  "application/x-font-ghostscript": { source: "apache", extensions: ["gsf"] },
  "application/x-font-libgrx": { source: "apache" },
  "application/x-font-linux-psf": { source: "apache", extensions: ["psf"] },
  "application/x-font-pcf": { source: "apache", extensions: ["pcf"] },
  "application/x-font-snf": { source: "apache", extensions: ["snf"] },
  "application/x-font-speedo": { source: "apache" },
  "application/x-font-sunos-news": { source: "apache" },
  "application/x-font-type1": { source: "apache", extensions: ["pfa", "pfb", "pfm", "afm"] },
  "application/x-font-vfont": { source: "apache" },
  "application/x-freearc": { source: "apache", extensions: ["arc"] },
  "application/x-futuresplash": { source: "apache", extensions: ["spl"] },
  "application/x-gca-compressed": { source: "apache", extensions: ["gca"] },
  "application/x-glulx": { source: "apache", extensions: ["ulx"] },
  "application/x-gnumeric": { source: "apache", extensions: ["gnumeric"] },
  "application/x-gramps-xml": { source: "apache", extensions: ["gramps"] },
  "application/x-gtar": { source: "apache", extensions: ["gtar"] },
  "application/x-gzip": { source: "apache" },
  "application/x-hdf": { source: "apache", extensions: ["hdf"] },
  "application/x-httpd-php": { compressible: !0, extensions: ["php"] },
  "application/x-install-instructions": { source: "apache", extensions: ["install"] },
  "application/x-iso9660-image": { source: "apache", extensions: ["iso"] },
  "application/x-iwork-keynote-sffkey": { extensions: ["key"] },
  "application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] },
  "application/x-iwork-pages-sffpages": { extensions: ["pages"] },
  "application/x-java-archive-diff": { source: "nginx", extensions: ["jardiff"] },
  "application/x-java-jnlp-file": { source: "apache", compressible: !1, extensions: ["jnlp"] },
  "application/x-javascript": { compressible: !0 },
  "application/x-keepass2": { extensions: ["kdbx"] },
  "application/x-latex": { source: "apache", compressible: !1, extensions: ["latex"] },
  "application/x-lua-bytecode": { extensions: ["luac"] },
  "application/x-lzh-compressed": { source: "apache", extensions: ["lzh", "lha"] },
  "application/x-makeself": { source: "nginx", extensions: ["run"] },
  "application/x-mie": { source: "apache", extensions: ["mie"] },
  "application/x-mobipocket-ebook": { source: "apache", extensions: ["prc", "mobi"] },
  "application/x-mpegurl": { compressible: !1 },
  "application/x-ms-application": { source: "apache", extensions: ["application"] },
  "application/x-ms-shortcut": { source: "apache", extensions: ["lnk"] },
  "application/x-ms-wmd": { source: "apache", extensions: ["wmd"] },
  "application/x-ms-wmz": { source: "apache", extensions: ["wmz"] },
  "application/x-ms-xbap": { source: "apache", extensions: ["xbap"] },
  "application/x-msaccess": { source: "apache", extensions: ["mdb"] },
  "application/x-msbinder": { source: "apache", extensions: ["obd"] },
  "application/x-mscardfile": { source: "apache", extensions: ["crd"] },
  "application/x-msclip": { source: "apache", extensions: ["clp"] },
  "application/x-msdos-program": { extensions: ["exe"] },
  "application/x-msdownload": { source: "apache", extensions: ["exe", "dll", "com", "bat", "msi"] },
  "application/x-msmediaview": { source: "apache", extensions: ["mvb", "m13", "m14"] },
  "application/x-msmetafile": { source: "apache", extensions: ["wmf", "wmz", "emf", "emz"] },
  "application/x-msmoney": { source: "apache", extensions: ["mny"] },
  "application/x-mspublisher": { source: "apache", extensions: ["pub"] },
  "application/x-msschedule": { source: "apache", extensions: ["scd"] },
  "application/x-msterminal": { source: "apache", extensions: ["trm"] },
  "application/x-mswrite": { source: "apache", extensions: ["wri"] },
  "application/x-netcdf": { source: "apache", extensions: ["nc", "cdf"] },
  "application/x-ns-proxy-autoconfig": { compressible: !0, extensions: ["pac"] },
  "application/x-nzb": { source: "apache", extensions: ["nzb"] },
  "application/x-perl": { source: "nginx", extensions: ["pl", "pm"] },
  "application/x-pilot": { source: "nginx", extensions: ["prc", "pdb"] },
  "application/x-pkcs12": { source: "apache", compressible: !1, extensions: ["p12", "pfx"] },
  "application/x-pkcs7-certificates": { source: "apache", extensions: ["p7b", "spc"] },
  "application/x-pkcs7-certreqresp": { source: "apache", extensions: ["p7r"] },
  "application/x-pki-message": { source: "iana" },
  "application/x-rar-compressed": { source: "apache", compressible: !1, extensions: ["rar"] },
  "application/x-redhat-package-manager": { source: "nginx", extensions: ["rpm"] },
  "application/x-research-info-systems": { source: "apache", extensions: ["ris"] },
  "application/x-sea": { source: "nginx", extensions: ["sea"] },
  "application/x-sh": { source: "apache", compressible: !0, extensions: ["sh"] },
  "application/x-shar": { source: "apache", extensions: ["shar"] },
  "application/x-shockwave-flash": { source: "apache", compressible: !1, extensions: ["swf"] },
  "application/x-silverlight-app": { source: "apache", extensions: ["xap"] },
  "application/x-sql": { source: "apache", extensions: ["sql"] },
  "application/x-stuffit": { source: "apache", compressible: !1, extensions: ["sit"] },
  "application/x-stuffitx": { source: "apache", extensions: ["sitx"] },
  "application/x-subrip": { source: "apache", extensions: ["srt"] },
  "application/x-sv4cpio": { source: "apache", extensions: ["sv4cpio"] },
  "application/x-sv4crc": { source: "apache", extensions: ["sv4crc"] },
  "application/x-t3vm-image": { source: "apache", extensions: ["t3"] },
  "application/x-tads": { source: "apache", extensions: ["gam"] },
  "application/x-tar": { source: "apache", compressible: !0, extensions: ["tar"] },
  "application/x-tcl": { source: "apache", extensions: ["tcl", "tk"] },
  "application/x-tex": { source: "apache", extensions: ["tex"] },
  "application/x-tex-tfm": { source: "apache", extensions: ["tfm"] },
  "application/x-texinfo": { source: "apache", extensions: ["texinfo", "texi"] },
  "application/x-tgif": { source: "apache", extensions: ["obj"] },
  "application/x-ustar": { source: "apache", extensions: ["ustar"] },
  "application/x-virtualbox-hdd": { compressible: !0, extensions: ["hdd"] },
  "application/x-virtualbox-ova": { compressible: !0, extensions: ["ova"] },
  "application/x-virtualbox-ovf": { compressible: !0, extensions: ["ovf"] },
  "application/x-virtualbox-vbox": { compressible: !0, extensions: ["vbox"] },
  "application/x-virtualbox-vbox-extpack": { compressible: !1, extensions: ["vbox-extpack"] },
  "application/x-virtualbox-vdi": { compressible: !0, extensions: ["vdi"] },
  "application/x-virtualbox-vhd": { compressible: !0, extensions: ["vhd"] },
  "application/x-virtualbox-vmdk": { compressible: !0, extensions: ["vmdk"] },
  "application/x-wais-source": { source: "apache", extensions: ["src"] },
  "application/x-web-app-manifest+json": { compressible: !0, extensions: ["webapp"] },
  "application/x-www-form-urlencoded": { source: "iana", compressible: !0 },
  "application/x-x509-ca-cert": { source: "iana", extensions: ["der", "crt", "pem"] },
  "application/x-x509-ca-ra-cert": { source: "iana" },
  "application/x-x509-next-ca-cert": { source: "iana" },
  "application/x-xfig": { source: "apache", extensions: ["fig"] },
  "application/x-xliff+xml": { source: "apache", compressible: !0, extensions: ["xlf"] },
  "application/x-xpinstall": { source: "apache", compressible: !1, extensions: ["xpi"] },
  "application/x-xz": { source: "apache", extensions: ["xz"] },
  "application/x-zmachine": { source: "apache", extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"] },
  "application/x400-bp": { source: "iana" },
  "application/xacml+xml": { source: "iana", compressible: !0 },
  "application/xaml+xml": { source: "apache", compressible: !0, extensions: ["xaml"] },
  "application/xcap-att+xml": { source: "iana", compressible: !0, extensions: ["xav"] },
  "application/xcap-caps+xml": { source: "iana", compressible: !0, extensions: ["xca"] },
  "application/xcap-diff+xml": { source: "iana", compressible: !0, extensions: ["xdf"] },
  "application/xcap-el+xml": { source: "iana", compressible: !0, extensions: ["xel"] },
  "application/xcap-error+xml": { source: "iana", compressible: !0 },
  "application/xcap-ns+xml": { source: "iana", compressible: !0, extensions: ["xns"] },
  "application/xcon-conference-info+xml": { source: "iana", compressible: !0 },
  "application/xcon-conference-info-diff+xml": { source: "iana", compressible: !0 },
  "application/xenc+xml": { source: "iana", compressible: !0, extensions: ["xenc"] },
  "application/xhtml+xml": { source: "iana", compressible: !0, extensions: ["xhtml", "xht"] },
  "application/xhtml-voice+xml": { source: "apache", compressible: !0 },
  "application/xliff+xml": { source: "iana", compressible: !0, extensions: ["xlf"] },
  "application/xml": { source: "iana", compressible: !0, extensions: ["xml", "xsl", "xsd", "rng"] },
  "application/xml-dtd": { source: "iana", compressible: !0, extensions: ["dtd"] },
  "application/xml-external-parsed-entity": { source: "iana" },
  "application/xml-patch+xml": { source: "iana", compressible: !0 },
  "application/xmpp+xml": { source: "iana", compressible: !0 },
  "application/xop+xml": { source: "iana", compressible: !0, extensions: ["xop"] },
  "application/xproc+xml": { source: "apache", compressible: !0, extensions: ["xpl"] },
  "application/xslt+xml": { source: "iana", compressible: !0, extensions: ["xsl", "xslt"] },
  "application/xspf+xml": { source: "apache", compressible: !0, extensions: ["xspf"] },
  "application/xv+xml": { source: "iana", compressible: !0, extensions: ["mxml", "xhvml", "xvml", "xvm"] },
  "application/yang": { source: "iana", extensions: ["yang"] },
  "application/yang-data+json": { source: "iana", compressible: !0 },
  "application/yang-data+xml": { source: "iana", compressible: !0 },
  "application/yang-patch+json": { source: "iana", compressible: !0 },
  "application/yang-patch+xml": { source: "iana", compressible: !0 },
  "application/yin+xml": { source: "iana", compressible: !0, extensions: ["yin"] },
  "application/zip": { source: "iana", compressible: !1, extensions: ["zip"] },
  "application/zlib": { source: "iana" },
  "application/zstd": { source: "iana" },
  "audio/1d-interleaved-parityfec": { source: "iana" },
  "audio/32kadpcm": { source: "iana" },
  "audio/3gpp": { source: "iana", compressible: !1, extensions: ["3gpp"] },
  "audio/3gpp2": { source: "iana" },
  "audio/aac": { source: "iana" },
  "audio/ac3": { source: "iana" },
  "audio/adpcm": { source: "apache", extensions: ["adp"] },
  "audio/amr": { source: "iana", extensions: ["amr"] },
  "audio/amr-wb": { source: "iana" },
  "audio/amr-wb+": { source: "iana" },
  "audio/aptx": { source: "iana" },
  "audio/asc": { source: "iana" },
  "audio/atrac-advanced-lossless": { source: "iana" },
  "audio/atrac-x": { source: "iana" },
  "audio/atrac3": { source: "iana" },
  "audio/basic": { source: "iana", compressible: !1, extensions: ["au", "snd"] },
  "audio/bv16": { source: "iana" },
  "audio/bv32": { source: "iana" },
  "audio/clearmode": { source: "iana" },
  "audio/cn": { source: "iana" },
  "audio/dat12": { source: "iana" },
  "audio/dls": { source: "iana" },
  "audio/dsr-es201108": { source: "iana" },
  "audio/dsr-es202050": { source: "iana" },
  "audio/dsr-es202211": { source: "iana" },
  "audio/dsr-es202212": { source: "iana" },
  "audio/dv": { source: "iana" },
  "audio/dvi4": { source: "iana" },
  "audio/eac3": { source: "iana" },
  "audio/encaprtp": { source: "iana" },
  "audio/evrc": { source: "iana" },
  "audio/evrc-qcp": { source: "iana" },
  "audio/evrc0": { source: "iana" },
  "audio/evrc1": { source: "iana" },
  "audio/evrcb": { source: "iana" },
  "audio/evrcb0": { source: "iana" },
  "audio/evrcb1": { source: "iana" },
  "audio/evrcnw": { source: "iana" },
  "audio/evrcnw0": { source: "iana" },
  "audio/evrcnw1": { source: "iana" },
  "audio/evrcwb": { source: "iana" },
  "audio/evrcwb0": { source: "iana" },
  "audio/evrcwb1": { source: "iana" },
  "audio/evs": { source: "iana" },
  "audio/flexfec": { source: "iana" },
  "audio/fwdred": { source: "iana" },
  "audio/g711-0": { source: "iana" },
  "audio/g719": { source: "iana" },
  "audio/g722": { source: "iana" },
  "audio/g7221": { source: "iana" },
  "audio/g723": { source: "iana" },
  "audio/g726-16": { source: "iana" },
  "audio/g726-24": { source: "iana" },
  "audio/g726-32": { source: "iana" },
  "audio/g726-40": { source: "iana" },
  "audio/g728": { source: "iana" },
  "audio/g729": { source: "iana" },
  "audio/g7291": { source: "iana" },
  "audio/g729d": { source: "iana" },
  "audio/g729e": { source: "iana" },
  "audio/gsm": { source: "iana" },
  "audio/gsm-efr": { source: "iana" },
  "audio/gsm-hr-08": { source: "iana" },
  "audio/ilbc": { source: "iana" },
  "audio/ip-mr_v2.5": { source: "iana" },
  "audio/isac": { source: "apache" },
  "audio/l16": { source: "iana" },
  "audio/l20": { source: "iana" },
  "audio/l24": { source: "iana", compressible: !1 },
  "audio/l8": { source: "iana" },
  "audio/lpc": { source: "iana" },
  "audio/melp": { source: "iana" },
  "audio/melp1200": { source: "iana" },
  "audio/melp2400": { source: "iana" },
  "audio/melp600": { source: "iana" },
  "audio/mhas": { source: "iana" },
  "audio/midi": { source: "apache", extensions: ["mid", "midi", "kar", "rmi"] },
  "audio/mobile-xmf": { source: "iana", extensions: ["mxmf"] },
  "audio/mp3": { compressible: !1, extensions: ["mp3"] },
  "audio/mp4": { source: "iana", compressible: !1, extensions: ["m4a", "mp4a"] },
  "audio/mp4a-latm": { source: "iana" },
  "audio/mpa": { source: "iana" },
  "audio/mpa-robust": { source: "iana" },
  "audio/mpeg": { source: "iana", compressible: !1, extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"] },
  "audio/mpeg4-generic": { source: "iana" },
  "audio/musepack": { source: "apache" },
  "audio/ogg": { source: "iana", compressible: !1, extensions: ["oga", "ogg", "spx", "opus"] },
  "audio/opus": { source: "iana" },
  "audio/parityfec": { source: "iana" },
  "audio/pcma": { source: "iana" },
  "audio/pcma-wb": { source: "iana" },
  "audio/pcmu": { source: "iana" },
  "audio/pcmu-wb": { source: "iana" },
  "audio/prs.sid": { source: "iana" },
  "audio/qcelp": { source: "iana" },
  "audio/raptorfec": { source: "iana" },
  "audio/red": { source: "iana" },
  "audio/rtp-enc-aescm128": { source: "iana" },
  "audio/rtp-midi": { source: "iana" },
  "audio/rtploopback": { source: "iana" },
  "audio/rtx": { source: "iana" },
  "audio/s3m": { source: "apache", extensions: ["s3m"] },
  "audio/scip": { source: "iana" },
  "audio/silk": { source: "apache", extensions: ["sil"] },
  "audio/smv": { source: "iana" },
  "audio/smv-qcp": { source: "iana" },
  "audio/smv0": { source: "iana" },
  "audio/sofa": { source: "iana" },
  "audio/sp-midi": { source: "iana" },
  "audio/speex": { source: "iana" },
  "audio/t140c": { source: "iana" },
  "audio/t38": { source: "iana" },
  "audio/telephone-event": { source: "iana" },
  "audio/tetra_acelp": { source: "iana" },
  "audio/tetra_acelp_bb": { source: "iana" },
  "audio/tone": { source: "iana" },
  "audio/tsvcis": { source: "iana" },
  "audio/uemclip": { source: "iana" },
  "audio/ulpfec": { source: "iana" },
  "audio/usac": { source: "iana" },
  "audio/vdvi": { source: "iana" },
  "audio/vmr-wb": { source: "iana" },
  "audio/vnd.3gpp.iufp": { source: "iana" },
  "audio/vnd.4sb": { source: "iana" },
  "audio/vnd.audiokoz": { source: "iana" },
  "audio/vnd.celp": { source: "iana" },
  "audio/vnd.cisco.nse": { source: "iana" },
  "audio/vnd.cmles.radio-events": { source: "iana" },
  "audio/vnd.cns.anp1": { source: "iana" },
  "audio/vnd.cns.inf1": { source: "iana" },
  "audio/vnd.dece.audio": { source: "iana", extensions: ["uva", "uvva"] },
  "audio/vnd.digital-winds": { source: "iana", extensions: ["eol"] },
  "audio/vnd.dlna.adts": { source: "iana" },
  "audio/vnd.dolby.heaac.1": { source: "iana" },
  "audio/vnd.dolby.heaac.2": { source: "iana" },
  "audio/vnd.dolby.mlp": { source: "iana" },
  "audio/vnd.dolby.mps": { source: "iana" },
  "audio/vnd.dolby.pl2": { source: "iana" },
  "audio/vnd.dolby.pl2x": { source: "iana" },
  "audio/vnd.dolby.pl2z": { source: "iana" },
  "audio/vnd.dolby.pulse.1": { source: "iana" },
  "audio/vnd.dra": { source: "iana", extensions: ["dra"] },
  "audio/vnd.dts": { source: "iana", extensions: ["dts"] },
  "audio/vnd.dts.hd": { source: "iana", extensions: ["dtshd"] },
  "audio/vnd.dts.uhd": { source: "iana" },
  "audio/vnd.dvb.file": { source: "iana" },
  "audio/vnd.everad.plj": { source: "iana" },
  "audio/vnd.hns.audio": { source: "iana" },
  "audio/vnd.lucent.voice": { source: "iana", extensions: ["lvp"] },
  "audio/vnd.ms-playready.media.pya": { source: "iana", extensions: ["pya"] },
  "audio/vnd.nokia.mobile-xmf": { source: "iana" },
  "audio/vnd.nortel.vbk": { source: "iana" },
  "audio/vnd.nuera.ecelp4800": { source: "iana", extensions: ["ecelp4800"] },
  "audio/vnd.nuera.ecelp7470": { source: "iana", extensions: ["ecelp7470"] },
  "audio/vnd.nuera.ecelp9600": { source: "iana", extensions: ["ecelp9600"] },
  "audio/vnd.octel.sbc": { source: "iana" },
  "audio/vnd.presonus.multitrack": { source: "iana" },
  "audio/vnd.qcelp": { source: "iana" },
  "audio/vnd.rhetorex.32kadpcm": { source: "iana" },
  "audio/vnd.rip": { source: "iana", extensions: ["rip"] },
  "audio/vnd.rn-realaudio": { compressible: !1 },
  "audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" },
  "audio/vnd.vmx.cvsd": { source: "iana" },
  "audio/vnd.wave": { compressible: !1 },
  "audio/vorbis": { source: "iana", compressible: !1 },
  "audio/vorbis-config": { source: "iana" },
  "audio/wav": { compressible: !1, extensions: ["wav"] },
  "audio/wave": { compressible: !1, extensions: ["wav"] },
  "audio/webm": { source: "apache", compressible: !1, extensions: ["weba"] },
  "audio/x-aac": { source: "apache", compressible: !1, extensions: ["aac"] },
  "audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] },
  "audio/x-caf": { source: "apache", compressible: !1, extensions: ["caf"] },
  "audio/x-flac": { source: "apache", extensions: ["flac"] },
  "audio/x-m4a": { source: "nginx", extensions: ["m4a"] },
  "audio/x-matroska": { source: "apache", extensions: ["mka"] },
  "audio/x-mpegurl": { source: "apache", extensions: ["m3u"] },
  "audio/x-ms-wax": { source: "apache", extensions: ["wax"] },
  "audio/x-ms-wma": { source: "apache", extensions: ["wma"] },
  "audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] },
  "audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] },
  "audio/x-realaudio": { source: "nginx", extensions: ["ra"] },
  "audio/x-tta": { source: "apache" },
  "audio/x-wav": { source: "apache", extensions: ["wav"] },
  "audio/xm": { source: "apache", extensions: ["xm"] },
  "chemical/x-cdx": { source: "apache", extensions: ["cdx"] },
  "chemical/x-cif": { source: "apache", extensions: ["cif"] },
  "chemical/x-cmdf": { source: "apache", extensions: ["cmdf"] },
  "chemical/x-cml": { source: "apache", extensions: ["cml"] },
  "chemical/x-csml": { source: "apache", extensions: ["csml"] },
  "chemical/x-pdb": { source: "apache" },
  "chemical/x-xyz": { source: "apache", extensions: ["xyz"] },
  "font/collection": { source: "iana", extensions: ["ttc"] },
  "font/otf": { source: "iana", compressible: !0, extensions: ["otf"] },
  "font/sfnt": { source: "iana" },
  "font/ttf": { source: "iana", compressible: !0, extensions: ["ttf"] },
  "font/woff": { source: "iana", extensions: ["woff"] },
  "font/woff2": { source: "iana", extensions: ["woff2"] },
  "image/aces": { source: "iana", extensions: ["exr"] },
  "image/apng": { compressible: !1, extensions: ["apng"] },
  "image/avci": { source: "iana", extensions: ["avci"] },
  "image/avcs": { source: "iana", extensions: ["avcs"] },
  "image/avif": { source: "iana", compressible: !1, extensions: ["avif"] },
  "image/bmp": { source: "iana", compressible: !0, extensions: ["bmp"] },
  "image/cgm": { source: "iana", extensions: ["cgm"] },
  "image/dicom-rle": { source: "iana", extensions: ["drle"] },
  "image/emf": { source: "iana", extensions: ["emf"] },
  "image/fits": { source: "iana", extensions: ["fits"] },
  "image/g3fax": { source: "iana", extensions: ["g3"] },
  "image/gif": { source: "iana", compressible: !1, extensions: ["gif"] },
  "image/heic": { source: "iana", extensions: ["heic"] },
  "image/heic-sequence": { source: "iana", extensions: ["heics"] },
  "image/heif": { source: "iana", extensions: ["heif"] },
  "image/heif-sequence": { source: "iana", extensions: ["heifs"] },
  "image/hej2k": { source: "iana", extensions: ["hej2"] },
  "image/hsj2": { source: "iana", extensions: ["hsj2"] },
  "image/ief": { source: "iana", extensions: ["ief"] },
  "image/jls": { source: "iana", extensions: ["jls"] },
  "image/jp2": { source: "iana", compressible: !1, extensions: ["jp2", "jpg2"] },
  "image/jpeg": { source: "iana", compressible: !1, extensions: ["jpeg", "jpg", "jpe"] },
  "image/jph": { source: "iana", extensions: ["jph"] },
  "image/jphc": { source: "iana", extensions: ["jhc"] },
  "image/jpm": { source: "iana", compressible: !1, extensions: ["jpm"] },
  "image/jpx": { source: "iana", compressible: !1, extensions: ["jpx", "jpf"] },
  "image/jxr": { source: "iana", extensions: ["jxr"] },
  "image/jxra": { source: "iana", extensions: ["jxra"] },
  "image/jxrs": { source: "iana", extensions: ["jxrs"] },
  "image/jxs": { source: "iana", extensions: ["jxs"] },
  "image/jxsc": { source: "iana", extensions: ["jxsc"] },
  "image/jxsi": { source: "iana", extensions: ["jxsi"] },
  "image/jxss": { source: "iana", extensions: ["jxss"] },
  "image/ktx": { source: "iana", extensions: ["ktx"] },
  "image/ktx2": { source: "iana", extensions: ["ktx2"] },
  "image/naplps": { source: "iana" },
  "image/pjpeg": { compressible: !1 },
  "image/png": { source: "iana", compressible: !1, extensions: ["png"] },
  "image/prs.btif": { source: "iana", extensions: ["btif"] },
  "image/prs.pti": { source: "iana", extensions: ["pti"] },
  "image/pwg-raster": { source: "iana" },
  "image/sgi": { source: "apache", extensions: ["sgi"] },
  "image/svg+xml": { source: "iana", compressible: !0, extensions: ["svg", "svgz"] },
  "image/t38": { source: "iana", extensions: ["t38"] },
  "image/tiff": { source: "iana", compressible: !1, extensions: ["tif", "tiff"] },
  "image/tiff-fx": { source: "iana", extensions: ["tfx"] },
  "image/vnd.adobe.photoshop": { source: "iana", compressible: !0, extensions: ["psd"] },
  "image/vnd.airzip.accelerator.azv": { source: "iana", extensions: ["azv"] },
  "image/vnd.cns.inf2": { source: "iana" },
  "image/vnd.dece.graphic": { source: "iana", extensions: ["uvi", "uvvi", "uvg", "uvvg"] },
  "image/vnd.djvu": { source: "iana", extensions: ["djvu", "djv"] },
  "image/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] },
  "image/vnd.dwg": { source: "iana", extensions: ["dwg"] },
  "image/vnd.dxf": { source: "iana", extensions: ["dxf"] },
  "image/vnd.fastbidsheet": { source: "iana", extensions: ["fbs"] },
  "image/vnd.fpx": { source: "iana", extensions: ["fpx"] },
  "image/vnd.fst": { source: "iana", extensions: ["fst"] },
  "image/vnd.fujixerox.edmics-mmr": { source: "iana", extensions: ["mmr"] },
  "image/vnd.fujixerox.edmics-rlc": { source: "iana", extensions: ["rlc"] },
  "image/vnd.globalgraphics.pgb": { source: "iana" },
  "image/vnd.microsoft.icon": { source: "iana", compressible: !0, extensions: ["ico"] },
  "image/vnd.mix": { source: "iana" },
  "image/vnd.mozilla.apng": { source: "iana" },
  "image/vnd.ms-dds": { compressible: !0, extensions: ["dds"] },
  "image/vnd.ms-modi": { source: "iana", extensions: ["mdi"] },
  "image/vnd.ms-photo": { source: "apache", extensions: ["wdp"] },
  "image/vnd.net-fpx": { source: "iana", extensions: ["npx"] },
  "image/vnd.pco.b16": { source: "iana", extensions: ["b16"] },
  "image/vnd.radiance": { source: "iana" },
  "image/vnd.sealed.png": { source: "iana" },
  "image/vnd.sealedmedia.softseal.gif": { source: "iana" },
  "image/vnd.sealedmedia.softseal.jpg": { source: "iana" },
  "image/vnd.svf": { source: "iana" },
  "image/vnd.tencent.tap": { source: "iana", extensions: ["tap"] },
  "image/vnd.valve.source.texture": { source: "iana", extensions: ["vtf"] },
  "image/vnd.wap.wbmp": { source: "iana", extensions: ["wbmp"] },
  "image/vnd.xiff": { source: "iana", extensions: ["xif"] },
  "image/vnd.zbrush.pcx": { source: "iana", extensions: ["pcx"] },
  "image/webp": { source: "apache", extensions: ["webp"] },
  "image/wmf": { source: "iana", extensions: ["wmf"] },
  "image/x-3ds": { source: "apache", extensions: ["3ds"] },
  "image/x-cmu-raster": { source: "apache", extensions: ["ras"] },
  "image/x-cmx": { source: "apache", extensions: ["cmx"] },
  "image/x-freehand": { source: "apache", extensions: ["fh", "fhc", "fh4", "fh5", "fh7"] },
  "image/x-icon": { source: "apache", compressible: !0, extensions: ["ico"] },
  "image/x-jng": { source: "nginx", extensions: ["jng"] },
  "image/x-mrsid-image": { source: "apache", extensions: ["sid"] },
  "image/x-ms-bmp": { source: "nginx", compressible: !0, extensions: ["bmp"] },
  "image/x-pcx": { source: "apache", extensions: ["pcx"] },
  "image/x-pict": { source: "apache", extensions: ["pic", "pct"] },
  "image/x-portable-anymap": { source: "apache", extensions: ["pnm"] },
  "image/x-portable-bitmap": { source: "apache", extensions: ["pbm"] },
  "image/x-portable-graymap": { source: "apache", extensions: ["pgm"] },
  "image/x-portable-pixmap": { source: "apache", extensions: ["ppm"] },
  "image/x-rgb": { source: "apache", extensions: ["rgb"] },
  "image/x-tga": { source: "apache", extensions: ["tga"] },
  "image/x-xbitmap": { source: "apache", extensions: ["xbm"] },
  "image/x-xcf": { compressible: !1 },
  "image/x-xpixmap": { source: "apache", extensions: ["xpm"] },
  "image/x-xwindowdump": { source: "apache", extensions: ["xwd"] },
  "message/cpim": { source: "iana" },
  "message/delivery-status": { source: "iana" },
  "message/disposition-notification": { source: "iana", extensions: ["disposition-notification"] },
  "message/external-body": { source: "iana" },
  "message/feedback-report": { source: "iana" },
  "message/global": { source: "iana", extensions: ["u8msg"] },
  "message/global-delivery-status": { source: "iana", extensions: ["u8dsn"] },
  "message/global-disposition-notification": { source: "iana", extensions: ["u8mdn"] },
  "message/global-headers": { source: "iana", extensions: ["u8hdr"] },
  "message/http": { source: "iana", compressible: !1 },
  "message/imdn+xml": { source: "iana", compressible: !0 },
  "message/news": { source: "iana" },
  "message/partial": { source: "iana", compressible: !1 },
  "message/rfc822": { source: "iana", compressible: !0, extensions: ["eml", "mime"] },
  "message/s-http": { source: "iana" },
  "message/sip": { source: "iana" },
  "message/sipfrag": { source: "iana" },
  "message/tracking-status": { source: "iana" },
  "message/vnd.si.simp": { source: "iana" },
  "message/vnd.wfa.wsc": { source: "iana", extensions: ["wsc"] },
  "model/3mf": { source: "iana", extensions: ["3mf"] },
  "model/e57": { source: "iana" },
  "model/gltf+json": { source: "iana", compressible: !0, extensions: ["gltf"] },
  "model/gltf-binary": { source: "iana", compressible: !0, extensions: ["glb"] },
  "model/iges": { source: "iana", compressible: !1, extensions: ["igs", "iges"] },
  "model/mesh": { source: "iana", compressible: !1, extensions: ["msh", "mesh", "silo"] },
  "model/mtl": { source: "iana", extensions: ["mtl"] },
  "model/obj": { source: "iana", extensions: ["obj"] },
  "model/step": { source: "iana" },
  "model/step+xml": { source: "iana", compressible: !0, extensions: ["stpx"] },
  "model/step+zip": { source: "iana", compressible: !1, extensions: ["stpz"] },
  "model/step-xml+zip": { source: "iana", compressible: !1, extensions: ["stpxz"] },
  "model/stl": { source: "iana", extensions: ["stl"] },
  "model/vnd.collada+xml": { source: "iana", compressible: !0, extensions: ["dae"] },
  "model/vnd.dwf": { source: "iana", extensions: ["dwf"] },
  "model/vnd.flatland.3dml": { source: "iana" },
  "model/vnd.gdl": { source: "iana", extensions: ["gdl"] },
  "model/vnd.gs-gdl": { source: "apache" },
  "model/vnd.gs.gdl": { source: "iana" },
  "model/vnd.gtw": { source: "iana", extensions: ["gtw"] },
  "model/vnd.moml+xml": { source: "iana", compressible: !0 },
  "model/vnd.mts": { source: "iana", extensions: ["mts"] },
  "model/vnd.opengex": { source: "iana", extensions: ["ogex"] },
  "model/vnd.parasolid.transmit.binary": { source: "iana", extensions: ["x_b"] },
  "model/vnd.parasolid.transmit.text": { source: "iana", extensions: ["x_t"] },
  "model/vnd.pytha.pyox": { source: "iana" },
  "model/vnd.rosette.annotated-data-model": { source: "iana" },
  "model/vnd.sap.vds": { source: "iana", extensions: ["vds"] },
  "model/vnd.usdz+zip": { source: "iana", compressible: !1, extensions: ["usdz"] },
  "model/vnd.valve.source.compiled-map": { source: "iana", extensions: ["bsp"] },
  "model/vnd.vtu": { source: "iana", extensions: ["vtu"] },
  "model/vrml": { source: "iana", compressible: !1, extensions: ["wrl", "vrml"] },
  "model/x3d+binary": { source: "apache", compressible: !1, extensions: ["x3db", "x3dbz"] },
  "model/x3d+fastinfoset": { source: "iana", extensions: ["x3db"] },
  "model/x3d+vrml": { source: "apache", compressible: !1, extensions: ["x3dv", "x3dvz"] },
  "model/x3d+xml": { source: "iana", compressible: !0, extensions: ["x3d", "x3dz"] },
  "model/x3d-vrml": { source: "iana", extensions: ["x3dv"] },
  "multipart/alternative": { source: "iana", compressible: !1 },
  "multipart/appledouble": { source: "iana" },
  "multipart/byteranges": { source: "iana" },
  "multipart/digest": { source: "iana" },
  "multipart/encrypted": { source: "iana", compressible: !1 },
  "multipart/form-data": { source: "iana", compressible: !1 },
  "multipart/header-set": { source: "iana" },
  "multipart/mixed": { source: "iana" },
  "multipart/multilingual": { source: "iana" },
  "multipart/parallel": { source: "iana" },
  "multipart/related": { source: "iana", compressible: !1 },
  "multipart/report": { source: "iana" },
  "multipart/signed": { source: "iana", compressible: !1 },
  "multipart/vnd.bint.med-plus": { source: "iana" },
  "multipart/voice-message": { source: "iana" },
  "multipart/x-mixed-replace": { source: "iana" },
  "text/1d-interleaved-parityfec": { source: "iana" },
  "text/cache-manifest": { source: "iana", compressible: !0, extensions: ["appcache", "manifest"] },
  "text/calendar": { source: "iana", extensions: ["ics", "ifb"] },
  "text/calender": { compressible: !0 },
  "text/cmd": { compressible: !0 },
  "text/coffeescript": { extensions: ["coffee", "litcoffee"] },
  "text/cql": { source: "iana" },
  "text/cql-expression": { source: "iana" },
  "text/cql-identifier": { source: "iana" },
  "text/css": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["css"] },
  "text/csv": { source: "iana", compressible: !0, extensions: ["csv"] },
  "text/csv-schema": { source: "iana" },
  "text/directory": { source: "iana" },
  "text/dns": { source: "iana" },
  "text/ecmascript": { source: "iana" },
  "text/encaprtp": { source: "iana" },
  "text/enriched": { source: "iana" },
  "text/fhirpath": { source: "iana" },
  "text/flexfec": { source: "iana" },
  "text/fwdred": { source: "iana" },
  "text/gff3": { source: "iana" },
  "text/grammar-ref-list": { source: "iana" },
  "text/html": { source: "iana", compressible: !0, extensions: ["html", "htm", "shtml"] },
  "text/jade": { extensions: ["jade"] },
  "text/javascript": { source: "iana", compressible: !0 },
  "text/jcr-cnd": { source: "iana" },
  "text/jsx": { compressible: !0, extensions: ["jsx"] },
  "text/less": { compressible: !0, extensions: ["less"] },
  "text/markdown": { source: "iana", compressible: !0, extensions: ["markdown", "md"] },
  "text/mathml": { source: "nginx", extensions: ["mml"] },
  "text/mdx": { compressible: !0, extensions: ["mdx"] },
  "text/mizar": { source: "iana" },
  "text/n3": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["n3"] },
  "text/parameters": { source: "iana", charset: "UTF-8" },
  "text/parityfec": { source: "iana" },
  "text/plain": { source: "iana", compressible: !0, extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"] },
  "text/provenance-notation": { source: "iana", charset: "UTF-8" },
  "text/prs.fallenstein.rst": { source: "iana" },
  "text/prs.lines.tag": { source: "iana", extensions: ["dsc"] },
  "text/prs.prop.logic": { source: "iana" },
  "text/raptorfec": { source: "iana" },
  "text/red": { source: "iana" },
  "text/rfc822-headers": { source: "iana" },
  "text/richtext": { source: "iana", compressible: !0, extensions: ["rtx"] },
  "text/rtf": { source: "iana", compressible: !0, extensions: ["rtf"] },
  "text/rtp-enc-aescm128": { source: "iana" },
  "text/rtploopback": { source: "iana" },
  "text/rtx": { source: "iana" },
  "text/sgml": { source: "iana", extensions: ["sgml", "sgm"] },
  "text/shaclc": { source: "iana" },
  "text/shex": { source: "iana", extensions: ["shex"] },
  "text/slim": { extensions: ["slim", "slm"] },
  "text/spdx": { source: "iana", extensions: ["spdx"] },
  "text/strings": { source: "iana" },
  "text/stylus": { extensions: ["stylus", "styl"] },
  "text/t140": { source: "iana" },
  "text/tab-separated-values": { source: "iana", compressible: !0, extensions: ["tsv"] },
  "text/troff": { source: "iana", extensions: ["t", "tr", "roff", "man", "me", "ms"] },
  "text/turtle": { source: "iana", charset: "UTF-8", extensions: ["ttl"] },
  "text/ulpfec": { source: "iana" },
  "text/uri-list": { source: "iana", compressible: !0, extensions: ["uri", "uris", "urls"] },
  "text/vcard": { source: "iana", compressible: !0, extensions: ["vcard"] },
  "text/vnd.a": { source: "iana" },
  "text/vnd.abc": { source: "iana" },
  "text/vnd.ascii-art": { source: "iana" },
  "text/vnd.curl": { source: "iana", extensions: ["curl"] },
  "text/vnd.curl.dcurl": { source: "apache", extensions: ["dcurl"] },
  "text/vnd.curl.mcurl": { source: "apache", extensions: ["mcurl"] },
  "text/vnd.curl.scurl": { source: "apache", extensions: ["scurl"] },
  "text/vnd.debian.copyright": { source: "iana", charset: "UTF-8" },
  "text/vnd.dmclientscript": { source: "iana" },
  "text/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] },
  "text/vnd.esmertec.theme-descriptor": { source: "iana", charset: "UTF-8" },
  "text/vnd.familysearch.gedcom": { source: "iana", extensions: ["ged"] },
  "text/vnd.ficlab.flt": { source: "iana" },
  "text/vnd.fly": { source: "iana", extensions: ["fly"] },
  "text/vnd.fmi.flexstor": { source: "iana", extensions: ["flx"] },
  "text/vnd.gml": { source: "iana" },
  "text/vnd.graphviz": { source: "iana", extensions: ["gv"] },
  "text/vnd.hans": { source: "iana" },
  "text/vnd.hgl": { source: "iana" },
  "text/vnd.in3d.3dml": { source: "iana", extensions: ["3dml"] },
  "text/vnd.in3d.spot": { source: "iana", extensions: ["spot"] },
  "text/vnd.iptc.newsml": { source: "iana" },
  "text/vnd.iptc.nitf": { source: "iana" },
  "text/vnd.latex-z": { source: "iana" },
  "text/vnd.motorola.reflex": { source: "iana" },
  "text/vnd.ms-mediapackage": { source: "iana" },
  "text/vnd.net2phone.commcenter.command": { source: "iana" },
  "text/vnd.radisys.msml-basic-layout": { source: "iana" },
  "text/vnd.senx.warpscript": { source: "iana" },
  "text/vnd.si.uricatalogue": { source: "iana" },
  "text/vnd.sosi": { source: "iana" },
  "text/vnd.sun.j2me.app-descriptor": { source: "iana", charset: "UTF-8", extensions: ["jad"] },
  "text/vnd.trolltech.linguist": { source: "iana", charset: "UTF-8" },
  "text/vnd.wap.si": { source: "iana" },
  "text/vnd.wap.sl": { source: "iana" },
  "text/vnd.wap.wml": { source: "iana", extensions: ["wml"] },
  "text/vnd.wap.wmlscript": { source: "iana", extensions: ["wmls"] },
  "text/vtt": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["vtt"] },
  "text/x-asm": { source: "apache", extensions: ["s", "asm"] },
  "text/x-c": { source: "apache", extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"] },
  "text/x-component": { source: "nginx", extensions: ["htc"] },
  "text/x-fortran": { source: "apache", extensions: ["f", "for", "f77", "f90"] },
  "text/x-gwt-rpc": { compressible: !0 },
  "text/x-handlebars-template": { extensions: ["hbs"] },
  "text/x-java-source": { source: "apache", extensions: ["java"] },
  "text/x-jquery-tmpl": { compressible: !0 },
  "text/x-lua": { extensions: ["lua"] },
  "text/x-markdown": { compressible: !0, extensions: ["mkd"] },
  "text/x-nfo": { source: "apache", extensions: ["nfo"] },
  "text/x-opml": { source: "apache", extensions: ["opml"] },
  "text/x-org": { compressible: !0, extensions: ["org"] },
  "text/x-pascal": { source: "apache", extensions: ["p", "pas"] },
  "text/x-processing": { compressible: !0, extensions: ["pde"] },
  "text/x-sass": { extensions: ["sass"] },
  "text/x-scss": { extensions: ["scss"] },
  "text/x-setext": { source: "apache", extensions: ["etx"] },
  "text/x-sfv": { source: "apache", extensions: ["sfv"] },
  "text/x-suse-ymp": { compressible: !0, extensions: ["ymp"] },
  "text/x-uuencode": { source: "apache", extensions: ["uu"] },
  "text/x-vcalendar": { source: "apache", extensions: ["vcs"] },
  "text/x-vcard": { source: "apache", extensions: ["vcf"] },
  "text/xml": { source: "iana", compressible: !0, extensions: ["xml"] },
  "text/xml-external-parsed-entity": { source: "iana" },
  "text/yaml": { compressible: !0, extensions: ["yaml", "yml"] },
  "video/1d-interleaved-parityfec": { source: "iana" },
  "video/3gpp": { source: "iana", extensions: ["3gp", "3gpp"] },
  "video/3gpp-tt": { source: "iana" },
  "video/3gpp2": { source: "iana", extensions: ["3g2"] },
  "video/av1": { source: "iana" },
  "video/bmpeg": { source: "iana" },
  "video/bt656": { source: "iana" },
  "video/celb": { source: "iana" },
  "video/dv": { source: "iana" },
  "video/encaprtp": { source: "iana" },
  "video/ffv1": { source: "iana" },
  "video/flexfec": { source: "iana" },
  "video/h261": { source: "iana", extensions: ["h261"] },
  "video/h263": { source: "iana", extensions: ["h263"] },
  "video/h263-1998": { source: "iana" },
  "video/h263-2000": { source: "iana" },
  "video/h264": { source: "iana", extensions: ["h264"] },
  "video/h264-rcdo": { source: "iana" },
  "video/h264-svc": { source: "iana" },
  "video/h265": { source: "iana" },
  "video/iso.segment": { source: "iana", extensions: ["m4s"] },
  "video/jpeg": { source: "iana", extensions: ["jpgv"] },
  "video/jpeg2000": { source: "iana" },
  "video/jpm": { source: "apache", extensions: ["jpm", "jpgm"] },
  "video/jxsv": { source: "iana" },
  "video/mj2": { source: "iana", extensions: ["mj2", "mjp2"] },
  "video/mp1s": { source: "iana" },
  "video/mp2p": { source: "iana" },
  "video/mp2t": { source: "iana", extensions: ["ts"] },
  "video/mp4": { source: "iana", compressible: !1, extensions: ["mp4", "mp4v", "mpg4"] },
  "video/mp4v-es": { source: "iana" },
  "video/mpeg": { source: "iana", compressible: !1, extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"] },
  "video/mpeg4-generic": { source: "iana" },
  "video/mpv": { source: "iana" },
  "video/nv": { source: "iana" },
  "video/ogg": { source: "iana", compressible: !1, extensions: ["ogv"] },
  "video/parityfec": { source: "iana" },
  "video/pointer": { source: "iana" },
  "video/quicktime": { source: "iana", compressible: !1, extensions: ["qt", "mov"] },
  "video/raptorfec": { source: "iana" },
  "video/raw": { source: "iana" },
  "video/rtp-enc-aescm128": { source: "iana" },
  "video/rtploopback": { source: "iana" },
  "video/rtx": { source: "iana" },
  "video/scip": { source: "iana" },
  "video/smpte291": { source: "iana" },
  "video/smpte292m": { source: "iana" },
  "video/ulpfec": { source: "iana" },
  "video/vc1": { source: "iana" },
  "video/vc2": { source: "iana" },
  "video/vnd.cctv": { source: "iana" },
  "video/vnd.dece.hd": { source: "iana", extensions: ["uvh", "uvvh"] },
  "video/vnd.dece.mobile": { source: "iana", extensions: ["uvm", "uvvm"] },
  "video/vnd.dece.mp4": { source: "iana" },
  "video/vnd.dece.pd": { source: "iana", extensions: ["uvp", "uvvp"] },
  "video/vnd.dece.sd": { source: "iana", extensions: ["uvs", "uvvs"] },
  "video/vnd.dece.video": { source: "iana", extensions: ["uvv", "uvvv"] },
  "video/vnd.directv.mpeg": { source: "iana" },
  "video/vnd.directv.mpeg-tts": { source: "iana" },
  "video/vnd.dlna.mpeg-tts": { source: "iana" },
  "video/vnd.dvb.file": { source: "iana", extensions: ["dvb"] },
  "video/vnd.fvt": { source: "iana", extensions: ["fvt"] },
  "video/vnd.hns.video": { source: "iana" },
  "video/vnd.iptvforum.1dparityfec-1010": { source: "iana" },
  "video/vnd.iptvforum.1dparityfec-2005": { source: "iana" },
  "video/vnd.iptvforum.2dparityfec-1010": { source: "iana" },
  "video/vnd.iptvforum.2dparityfec-2005": { source: "iana" },
  "video/vnd.iptvforum.ttsavc": { source: "iana" },
  "video/vnd.iptvforum.ttsmpeg2": { source: "iana" },
  "video/vnd.motorola.video": { source: "iana" },
  "video/vnd.motorola.videop": { source: "iana" },
  "video/vnd.mpegurl": { source: "iana", extensions: ["mxu", "m4u"] },
  "video/vnd.ms-playready.media.pyv": { source: "iana", extensions: ["pyv"] },
  "video/vnd.nokia.interleaved-multimedia": { source: "iana" },
  "video/vnd.nokia.mp4vr": { source: "iana" },
  "video/vnd.nokia.videovoip": { source: "iana" },
  "video/vnd.objectvideo": { source: "iana" },
  "video/vnd.radgamettools.bink": { source: "iana" },
  "video/vnd.radgamettools.smacker": { source: "iana" },
  "video/vnd.sealed.mpeg1": { source: "iana" },
  "video/vnd.sealed.mpeg4": { source: "iana" },
  "video/vnd.sealed.swf": { source: "iana" },
  "video/vnd.sealedmedia.softseal.mov": { source: "iana" },
  "video/vnd.uvvu.mp4": { source: "iana", extensions: ["uvu", "uvvu"] },
  "video/vnd.vivo": { source: "iana", extensions: ["viv"] },
  "video/vnd.youtube.yt": { source: "iana" },
  "video/vp8": { source: "iana" },
  "video/vp9": { source: "iana" },
  "video/webm": { source: "apache", compressible: !1, extensions: ["webm"] },
  "video/x-f4v": { source: "apache", extensions: ["f4v"] },
  "video/x-fli": { source: "apache", extensions: ["fli"] },
  "video/x-flv": { source: "apache", compressible: !1, extensions: ["flv"] },
  "video/x-m4v": { source: "apache", extensions: ["m4v"] },
  "video/x-matroska": { source: "apache", compressible: !1, extensions: ["mkv", "mk3d", "mks"] },
  "video/x-mng": { source: "apache", extensions: ["mng"] },
  "video/x-ms-asf": { source: "apache", extensions: ["asf", "asx"] },
  "video/x-ms-vob": { source: "apache", extensions: ["vob"] },
  "video/x-ms-wm": { source: "apache", extensions: ["wm"] },
  "video/x-ms-wmv": { source: "apache", compressible: !1, extensions: ["wmv"] },
  "video/x-ms-wmx": { source: "apache", extensions: ["wmx"] },
  "video/x-ms-wvx": { source: "apache", extensions: ["wvx"] },
  "video/x-msvideo": { source: "apache", extensions: ["avi"] },
  "video/x-sgi-movie": { source: "apache", extensions: ["movie"] },
  "video/x-smv": { source: "apache", extensions: ["smv"] },
  "x-conference/x-cooltalk": { source: "apache", extensions: ["ice"] },
  "x-shader/x-fragment": { compressible: !0 },
  "x-shader/x-vertex": { compressible: !0 }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var Wn, Aa;
function _c() {
  return Aa || (Aa = 1, Wn = Ec), Wn;
}
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ta;
function Sc() {
  return Ta || (Ta = 1, (function(e) {
    var n = _c(), t = Ro.extname, a = /^\s*([^;\s]*)(?:;|\s|$)/, i = /^text\//i;
    e.charset = s, e.charsets = { lookup: s }, e.contentType = o, e.extension = r, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = c, e.types = /* @__PURE__ */ Object.create(null), f(e.extensions, e.types);
    function s(l) {
      if (!l || typeof l != "string")
        return !1;
      var p = a.exec(l), x = p && n[p[1].toLowerCase()];
      return x && x.charset ? x.charset : p && i.test(p[1]) ? "UTF-8" : !1;
    }
    function o(l) {
      if (!l || typeof l != "string")
        return !1;
      var p = l.indexOf("/") === -1 ? e.lookup(l) : l;
      if (!p)
        return !1;
      if (p.indexOf("charset") === -1) {
        var x = e.charset(p);
        x && (p += "; charset=" + x.toLowerCase());
      }
      return p;
    }
    function r(l) {
      if (!l || typeof l != "string")
        return !1;
      var p = a.exec(l), x = p && e.extensions[p[1].toLowerCase()];
      return !x || !x.length ? !1 : x[0];
    }
    function c(l) {
      if (!l || typeof l != "string")
        return !1;
      var p = t("x." + l).toLowerCase().substr(1);
      return p && e.types[p] || !1;
    }
    function f(l, p) {
      var x = ["nginx", "apache", void 0, "iana"];
      Object.keys(n).forEach(function(w) {
        var b = n[w], h = b.extensions;
        if (!(!h || !h.length)) {
          l[w] = h;
          for (var u = 0; u < h.length; u++) {
            var m = h[u];
            if (p[m]) {
              var R = x.indexOf(n[p[m]].source), _ = x.indexOf(b.source);
              if (p[m] !== "application/octet-stream" && (R > _ || R === _ && p[m].substr(0, 12) === "application/"))
                continue;
            }
            p[m] = w;
          }
        }
      });
    }
  })(Hn)), Hn;
}
var Vn, Pa;
function Oc() {
  if (Pa) return Vn;
  Pa = 1, Vn = e;
  function e(n) {
    var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
    t ? t(n) : setTimeout(n, 0);
  }
  return Vn;
}
var Gn, Ca;
function Bo() {
  if (Ca) return Gn;
  Ca = 1;
  var e = Oc();
  Gn = n;
  function n(t) {
    var a = !1;
    return e(function() {
      a = !0;
    }), function(s, o) {
      a ? t(s, o) : e(function() {
        t(s, o);
      });
    };
  }
  return Gn;
}
var Kn, ja;
function No() {
  if (ja) return Kn;
  ja = 1, Kn = e;
  function e(t) {
    Object.keys(t.jobs).forEach(n.bind(t)), t.jobs = {};
  }
  function n(t) {
    typeof this.jobs[t] == "function" && this.jobs[t]();
  }
  return Kn;
}
var Jn, Fa;
function Io() {
  if (Fa) return Jn;
  Fa = 1;
  var e = Bo(), n = No();
  Jn = t;
  function t(i, s, o, r) {
    var c = o.keyedList ? o.keyedList[o.index] : o.index;
    o.jobs[c] = a(s, c, i[c], function(f, l) {
      c in o.jobs && (delete o.jobs[c], f ? n(o) : o.results[c] = l, r(f, o.results));
    });
  }
  function a(i, s, o, r) {
    var c;
    return i.length == 2 ? c = i(o, e(r)) : c = i(o, s, e(r)), c;
  }
  return Jn;
}
var Xn, qa;
function zo() {
  if (qa) return Xn;
  qa = 1, Xn = e;
  function e(n, t) {
    var a = !Array.isArray(n), i = {
      index: 0,
      keyedList: a || t ? Object.keys(n) : null,
      jobs: {},
      results: a ? {} : [],
      size: a ? Object.keys(n).length : n.length
    };
    return t && i.keyedList.sort(a ? t : function(s, o) {
      return t(n[s], n[o]);
    }), i;
  }
  return Xn;
}
var Yn, La;
function $o() {
  if (La) return Yn;
  La = 1;
  var e = No(), n = Bo();
  Yn = t;
  function t(a) {
    Object.keys(this.jobs).length && (this.index = this.size, e(this), n(a)(null, this.results));
  }
  return Yn;
}
var Zn, Ua;
function kc() {
  if (Ua) return Zn;
  Ua = 1;
  var e = Io(), n = zo(), t = $o();
  Zn = a;
  function a(i, s, o) {
    for (var r = n(i); r.index < (r.keyedList || i).length; )
      e(i, s, r, function(c, f) {
        if (c) {
          o(c, f);
          return;
        }
        if (Object.keys(r.jobs).length === 0) {
          o(null, r.results);
          return;
        }
      }), r.index++;
    return t.bind(r, o);
  }
  return Zn;
}
var Ve = { exports: {} }, Da;
function Mo() {
  if (Da) return Ve.exports;
  Da = 1;
  var e = Io(), n = zo(), t = $o();
  Ve.exports = a, Ve.exports.ascending = i, Ve.exports.descending = s;
  function a(o, r, c, f) {
    var l = n(o, c);
    return e(o, r, l, function p(x, v) {
      if (x) {
        f(x, v);
        return;
      }
      if (l.index++, l.index < (l.keyedList || o).length) {
        e(o, r, l, p);
        return;
      }
      f(null, l.results);
    }), t.bind(l, f);
  }
  function i(o, r) {
    return o < r ? -1 : o > r ? 1 : 0;
  }
  function s(o, r) {
    return -1 * i(o, r);
  }
  return Ve.exports;
}
var Qn, Ba;
function Ac() {
  if (Ba) return Qn;
  Ba = 1;
  var e = Mo();
  Qn = n;
  function n(t, a, i) {
    return e(t, a, null, i);
  }
  return Qn;
}
var et, Na;
function Tc() {
  return Na || (Na = 1, et = {
    parallel: kc(),
    serial: Ac(),
    serialOrdered: Mo()
  }), et;
}
var nt, Ia;
function Ho() {
  return Ia || (Ia = 1, nt = Object), nt;
}
var tt, za;
function Pc() {
  return za || (za = 1, tt = Error), tt;
}
var at, $a;
function Cc() {
  return $a || ($a = 1, at = EvalError), at;
}
var it, Ma;
function jc() {
  return Ma || (Ma = 1, it = RangeError), it;
}
var ot, Ha;
function Fc() {
  return Ha || (Ha = 1, ot = ReferenceError), ot;
}
var st, Wa;
function qc() {
  return Wa || (Wa = 1, st = SyntaxError), st;
}
var rt, Va;
function ca() {
  return Va || (Va = 1, rt = TypeError), rt;
}
var ct, Ga;
function Lc() {
  return Ga || (Ga = 1, ct = URIError), ct;
}
var pt, Ka;
function Uc() {
  return Ka || (Ka = 1, pt = Math.abs), pt;
}
var lt, Ja;
function Dc() {
  return Ja || (Ja = 1, lt = Math.floor), lt;
}
var ut, Xa;
function Bc() {
  return Xa || (Xa = 1, ut = Math.max), ut;
}
var dt, Ya;
function Nc() {
  return Ya || (Ya = 1, dt = Math.min), dt;
}
var mt, Za;
function Ic() {
  return Za || (Za = 1, mt = Math.pow), mt;
}
var ft, Qa;
function zc() {
  return Qa || (Qa = 1, ft = Math.round), ft;
}
var xt, ei;
function $c() {
  return ei || (ei = 1, xt = Number.isNaN || function(n) {
    return n !== n;
  }), xt;
}
var ht, ni;
function Mc() {
  if (ni) return ht;
  ni = 1;
  var e = /* @__PURE__ */ $c();
  return ht = function(t) {
    return e(t) || t === 0 ? t : t < 0 ? -1 : 1;
  }, ht;
}
var vt, ti;
function Hc() {
  return ti || (ti = 1, vt = Object.getOwnPropertyDescriptor), vt;
}
var bt, ai;
function Wo() {
  if (ai) return bt;
  ai = 1;
  var e = /* @__PURE__ */ Hc();
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return bt = e, bt;
}
var gt, ii;
function Wc() {
  if (ii) return gt;
  ii = 1;
  var e = Object.defineProperty || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return gt = e, gt;
}
var yt, oi;
function Vo() {
  return oi || (oi = 1, yt = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var n = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var i = 42;
    n[t] = i;
    for (var s in n)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(n).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(n).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(n);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(n, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var r = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(n, t)
      );
      if (r.value !== i || r.enumerable !== !0)
        return !1;
    }
    return !0;
  }), yt;
}
var wt, si;
function Vc() {
  if (si) return wt;
  si = 1;
  var e = typeof Symbol < "u" && Symbol, n = Vo();
  return wt = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : n();
  }, wt;
}
var Rt, ri;
function Go() {
  return ri || (ri = 1, Rt = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Rt;
}
var Et, ci;
function Ko() {
  if (ci) return Et;
  ci = 1;
  var e = /* @__PURE__ */ Ho();
  return Et = e.getPrototypeOf || null, Et;
}
var _t, pi;
function Gc() {
  if (pi) return _t;
  pi = 1;
  var e = "Function.prototype.bind called on incompatible ", n = Object.prototype.toString, t = Math.max, a = "[object Function]", i = function(c, f) {
    for (var l = [], p = 0; p < c.length; p += 1)
      l[p] = c[p];
    for (var x = 0; x < f.length; x += 1)
      l[x + c.length] = f[x];
    return l;
  }, s = function(c, f) {
    for (var l = [], p = f, x = 0; p < c.length; p += 1, x += 1)
      l[x] = c[p];
    return l;
  }, o = function(r, c) {
    for (var f = "", l = 0; l < r.length; l += 1)
      f += r[l], l + 1 < r.length && (f += c);
    return f;
  };
  return _t = function(c) {
    var f = this;
    if (typeof f != "function" || n.apply(f) !== a)
      throw new TypeError(e + f);
    for (var l = s(arguments, 1), p, x = function() {
      if (this instanceof p) {
        var u = f.apply(
          this,
          i(l, arguments)
        );
        return Object(u) === u ? u : this;
      }
      return f.apply(
        c,
        i(l, arguments)
      );
    }, v = t(0, f.length - l.length), w = [], b = 0; b < v; b++)
      w[b] = "$" + b;
    if (p = Function("binder", "return function (" + o(w, ",") + "){ return binder.apply(this,arguments); }")(x), f.prototype) {
      var h = function() {
      };
      h.prototype = f.prototype, p.prototype = new h(), h.prototype = null;
    }
    return p;
  }, _t;
}
var St, li;
function jn() {
  if (li) return St;
  li = 1;
  var e = Gc();
  return St = Function.prototype.bind || e, St;
}
var Ot, ui;
function pa() {
  return ui || (ui = 1, Ot = Function.prototype.call), Ot;
}
var kt, di;
function Jo() {
  return di || (di = 1, kt = Function.prototype.apply), kt;
}
var At, mi;
function Kc() {
  return mi || (mi = 1, At = typeof Reflect < "u" && Reflect && Reflect.apply), At;
}
var Tt, fi;
function Jc() {
  if (fi) return Tt;
  fi = 1;
  var e = jn(), n = Jo(), t = pa(), a = Kc();
  return Tt = a || e.call(t, n), Tt;
}
var Pt, xi;
function Xc() {
  if (xi) return Pt;
  xi = 1;
  var e = jn(), n = /* @__PURE__ */ ca(), t = pa(), a = Jc();
  return Pt = function(s) {
    if (s.length < 1 || typeof s[0] != "function")
      throw new n("a function is required");
    return a(e, t, s);
  }, Pt;
}
var Ct, hi;
function Yc() {
  if (hi) return Ct;
  hi = 1;
  var e = Xc(), n = /* @__PURE__ */ Wo(), t;
  try {
    t = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var a = !!t && n && n(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), i = Object, s = i.getPrototypeOf;
  return Ct = a && typeof a.get == "function" ? e([a.get]) : typeof s == "function" ? (
    /** @type {import('./get')} */
    function(r) {
      return s(r == null ? r : i(r));
    }
  ) : !1, Ct;
}
var jt, vi;
function Zc() {
  if (vi) return jt;
  vi = 1;
  var e = Go(), n = Ko(), t = /* @__PURE__ */ Yc();
  return jt = e ? function(i) {
    return e(i);
  } : n ? function(i) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new TypeError("getProto: not an object");
    return n(i);
  } : t ? function(i) {
    return t(i);
  } : null, jt;
}
var Ft, bi;
function la() {
  if (bi) return Ft;
  bi = 1;
  var e = Function.prototype.call, n = Object.prototype.hasOwnProperty, t = jn();
  return Ft = t.call(e, n), Ft;
}
var qt, gi;
function Qc() {
  if (gi) return qt;
  gi = 1;
  var e, n = /* @__PURE__ */ Ho(), t = /* @__PURE__ */ Pc(), a = /* @__PURE__ */ Cc(), i = /* @__PURE__ */ jc(), s = /* @__PURE__ */ Fc(), o = /* @__PURE__ */ qc(), r = /* @__PURE__ */ ca(), c = /* @__PURE__ */ Lc(), f = /* @__PURE__ */ Uc(), l = /* @__PURE__ */ Dc(), p = /* @__PURE__ */ Bc(), x = /* @__PURE__ */ Nc(), v = /* @__PURE__ */ Ic(), w = /* @__PURE__ */ zc(), b = /* @__PURE__ */ Mc(), h = Function, u = function(U) {
    try {
      return h('"use strict"; return (' + U + ").constructor;")();
    } catch {
    }
  }, m = /* @__PURE__ */ Wo(), R = /* @__PURE__ */ Wc(), _ = function() {
    throw new r();
  }, O = m ? (function() {
    try {
      return arguments.callee, _;
    } catch {
      try {
        return m(arguments, "callee").get;
      } catch {
        return _;
      }
    }
  })() : _, j = Vc()(), k = Zc(), $ = Ko(), V = Go(), G = Jo(), q = pa(), ae = {}, be = typeof Uint8Array > "u" || !k ? e : k(Uint8Array), M = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? e : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e : ArrayBuffer,
    "%ArrayIteratorPrototype%": j && k ? k([][Symbol.iterator]()) : e,
    "%AsyncFromSyncIteratorPrototype%": e,
    "%AsyncFunction%": ae,
    "%AsyncGenerator%": ae,
    "%AsyncGeneratorFunction%": ae,
    "%AsyncIteratorPrototype%": ae,
    "%Atomics%": typeof Atomics > "u" ? e : Atomics,
    "%BigInt%": typeof BigInt > "u" ? e : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? e : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? e : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? e : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": a,
    "%Float16Array%": typeof Float16Array > "u" ? e : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? e : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? e : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": ae,
    "%Int8Array%": typeof Int8Array > "u" ? e : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? e : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? e : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": j && k ? k(k([][Symbol.iterator]())) : e,
    "%JSON%": typeof JSON == "object" ? JSON : e,
    "%Map%": typeof Map > "u" ? e : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !j || !k ? e : k((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": n,
    "%Object.getOwnPropertyDescriptor%": m,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? e : Promise,
    "%Proxy%": typeof Proxy > "u" ? e : Proxy,
    "%RangeError%": i,
    "%ReferenceError%": s,
    "%Reflect%": typeof Reflect > "u" ? e : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? e : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !j || !k ? e : k((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": j && k ? k(""[Symbol.iterator]()) : e,
    "%Symbol%": j ? Symbol : e,
    "%SyntaxError%": o,
    "%ThrowTypeError%": O,
    "%TypedArray%": be,
    "%TypeError%": r,
    "%Uint8Array%": typeof Uint8Array > "u" ? e : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? e : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? e : Uint32Array,
    "%URIError%": c,
    "%WeakMap%": typeof WeakMap > "u" ? e : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? e : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? e : WeakSet,
    "%Function.prototype.call%": q,
    "%Function.prototype.apply%": G,
    "%Object.defineProperty%": R,
    "%Object.getPrototypeOf%": $,
    "%Math.abs%": f,
    "%Math.floor%": l,
    "%Math.max%": p,
    "%Math.min%": x,
    "%Math.pow%": v,
    "%Math.round%": w,
    "%Math.sign%": b,
    "%Reflect.getPrototypeOf%": V
  };
  if (k)
    try {
      null.error;
    } catch (U) {
      var W = k(k(U));
      M["%Error.prototype%"] = W;
    }
  var Re = function U(B) {
    var Y;
    if (B === "%AsyncFunction%")
      Y = u("async function () {}");
    else if (B === "%GeneratorFunction%")
      Y = u("function* () {}");
    else if (B === "%AsyncGeneratorFunction%")
      Y = u("async function* () {}");
    else if (B === "%AsyncGenerator%") {
      var H = U("%AsyncGeneratorFunction%");
      H && (Y = H.prototype);
    } else if (B === "%AsyncIteratorPrototype%") {
      var L = U("%AsyncGenerator%");
      L && k && (Y = k(L.prototype));
    }
    return M[B] = Y, Y;
  }, ge = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, me = jn(), g = /* @__PURE__ */ la(), S = me.call(q, Array.prototype.concat), E = me.call(G, Array.prototype.splice), P = me.call(q, String.prototype.replace), F = me.call(q, String.prototype.slice), J = me.call(q, RegExp.prototype.exec), X = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, se = /\\(\\)?/g, D = function(B) {
    var Y = F(B, 0, 1), H = F(B, -1);
    if (Y === "%" && H !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (H === "%" && Y !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var L = [];
    return P(B, X, function(ee, fe, te, ce) {
      L[L.length] = te ? P(ce, se, "$1") : fe || ee;
    }), L;
  }, N = function(B, Y) {
    var H = B, L;
    if (g(ge, H) && (L = ge[H], H = "%" + L[0] + "%"), g(M, H)) {
      var ee = M[H];
      if (ee === ae && (ee = Re(H)), typeof ee > "u" && !Y)
        throw new r("intrinsic " + B + " exists, but is not available. Please file an issue!");
      return {
        alias: L,
        name: H,
        value: ee
      };
    }
    throw new o("intrinsic " + B + " does not exist!");
  };
  return qt = function(B, Y) {
    if (typeof B != "string" || B.length === 0)
      throw new r("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof Y != "boolean")
      throw new r('"allowMissing" argument must be a boolean');
    if (J(/^%?[^%]*%?$/, B) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var H = D(B), L = H.length > 0 ? H[0] : "", ee = N("%" + L + "%", Y), fe = ee.name, te = ee.value, ce = !1, C = ee.alias;
    C && (L = C[0], E(H, S([0, 1], C)));
    for (var Z = 1, T = !0; Z < H.length; Z += 1) {
      var A = H[Z], I = F(A, 0, 1), ne = F(A, -1);
      if ((I === '"' || I === "'" || I === "`" || ne === '"' || ne === "'" || ne === "`") && I !== ne)
        throw new o("property names with quotes must have matching quotes");
      if ((A === "constructor" || !T) && (ce = !0), L += "." + A, fe = "%" + L + "%", g(M, fe))
        te = M[fe];
      else if (te != null) {
        if (!(A in te)) {
          if (!Y)
            throw new r("base intrinsic for " + B + " exists, but the property is not available.");
          return;
        }
        if (m && Z + 1 >= H.length) {
          var z = m(te, A);
          T = !!z, T && "get" in z && !("originalValue" in z.get) ? te = z.get : te = te[A];
        } else
          T = g(te, A), te = te[A];
        T && !ce && (M[fe] = te);
      }
    }
    return te;
  }, qt;
}
var Lt, yi;
function ep() {
  if (yi) return Lt;
  yi = 1;
  var e = Vo();
  return Lt = function() {
    return e() && !!Symbol.toStringTag;
  }, Lt;
}
var Ut, wi;
function np() {
  if (wi) return Ut;
  wi = 1;
  var e = /* @__PURE__ */ Qc(), n = e("%Object.defineProperty%", !0), t = ep()(), a = /* @__PURE__ */ la(), i = /* @__PURE__ */ ca(), s = t ? Symbol.toStringTag : null;
  return Ut = function(r, c) {
    var f = arguments.length > 2 && !!arguments[2] && arguments[2].force, l = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
    if (typeof f < "u" && typeof f != "boolean" || typeof l < "u" && typeof l != "boolean")
      throw new i("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
    s && (f || !a(r, s)) && (n ? n(r, s, {
      configurable: !l,
      enumerable: !1,
      value: c,
      writable: !1
    }) : r[s] = c);
  }, Ut;
}
var Dt, Ri;
function tp() {
  return Ri || (Ri = 1, Dt = function(e, n) {
    return Object.keys(n).forEach(function(t) {
      e[t] = e[t] || n[t];
    }), e;
  }), Dt;
}
var Bt, Ei;
function ap() {
  if (Ei) return Bt;
  Ei = 1;
  var e = Rc(), n = qe, t = Ro, a = An, i = Tn, s = Pn.parse, o = Gs, r = ue.Stream, c = wo, f = Sc(), l = Tc(), p = /* @__PURE__ */ np(), x = /* @__PURE__ */ la(), v = tp();
  function w(h) {
    return String(h).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
  }
  function b(h) {
    if (!(this instanceof b))
      return new b(h);
    this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], e.call(this), h = h || {};
    for (var u in h)
      this[u] = h[u];
  }
  return n.inherits(b, e), b.LINE_BREAK = `\r
`, b.DEFAULT_CONTENT_TYPE = "application/octet-stream", b.prototype.append = function(h, u, m) {
    m = m || {}, typeof m == "string" && (m = { filename: m });
    var R = e.prototype.append.bind(this);
    if ((typeof u == "number" || u == null) && (u = String(u)), Array.isArray(u)) {
      this._error(new Error("Arrays are not supported."));
      return;
    }
    var _ = this._multiPartHeader(h, u, m), O = this._multiPartFooter();
    R(_), R(u), R(O), this._trackLength(_, u, m);
  }, b.prototype._trackLength = function(h, u, m) {
    var R = 0;
    m.knownLength != null ? R += Number(m.knownLength) : Buffer.isBuffer(u) ? R = u.length : typeof u == "string" && (R = Buffer.byteLength(u)), this._valueLength += R, this._overheadLength += Buffer.byteLength(h) + b.LINE_BREAK.length, !(!u || !u.path && !(u.readable && x(u, "httpVersion")) && !(u instanceof r)) && (m.knownLength || this._valuesToMeasure.push(u));
  }, b.prototype._lengthRetriever = function(h, u) {
    x(h, "fd") ? h.end != null && h.end != 1 / 0 && h.start != null ? u(null, h.end + 1 - (h.start ? h.start : 0)) : o.stat(h.path, function(m, R) {
      if (m) {
        u(m);
        return;
      }
      var _ = R.size - (h.start ? h.start : 0);
      u(null, _);
    }) : x(h, "httpVersion") ? u(null, Number(h.headers["content-length"])) : x(h, "httpModule") ? (h.on("response", function(m) {
      h.pause(), u(null, Number(m.headers["content-length"]));
    }), h.resume()) : u("Unknown stream");
  }, b.prototype._multiPartHeader = function(h, u, m) {
    if (typeof m.header == "string")
      return m.header;
    var R = this._getContentDisposition(u, m), _ = this._getContentType(u, m), O = "", j = {
      // add custom disposition as third element or keep it two elements if not
      "Content-Disposition": ["form-data", 'name="' + w(h) + '"'].concat(R || []),
      // if no content type. allow it to be empty array
      "Content-Type": [].concat(_ || [])
    };
    typeof m.header == "object" && v(j, m.header);
    var k;
    for (var $ in j)
      if (x(j, $)) {
        if (k = j[$], k == null)
          continue;
        Array.isArray(k) || (k = [k]), k.length && (O += $ + ": " + k.join("; ") + b.LINE_BREAK);
      }
    return "--" + this.getBoundary() + b.LINE_BREAK + O + b.LINE_BREAK;
  }, b.prototype._getContentDisposition = function(h, u) {
    var m;
    if (typeof u.filepath == "string" ? m = t.normalize(u.filepath).replace(/\\/g, "/") : u.filename || h && (h.name || h.path) ? m = t.basename(u.filename || h && (h.name || h.path)) : h && h.readable && x(h, "httpVersion") && (m = t.basename(h.client._httpMessage.path || "")), m)
      return 'filename="' + w(m) + '"';
  }, b.prototype._getContentType = function(h, u) {
    var m = u.contentType;
    return !m && h && h.name && (m = f.lookup(h.name)), !m && h && h.path && (m = f.lookup(h.path)), !m && h && h.readable && x(h, "httpVersion") && (m = h.headers["content-type"]), !m && (u.filepath || u.filename) && (m = f.lookup(u.filepath || u.filename)), !m && h && typeof h == "object" && (m = b.DEFAULT_CONTENT_TYPE), m;
  }, b.prototype._multiPartFooter = function() {
    return (function(h) {
      var u = b.LINE_BREAK, m = this._streams.length === 0;
      m && (u += this._lastBoundary()), h(u);
    }).bind(this);
  }, b.prototype._lastBoundary = function() {
    return "--" + this.getBoundary() + "--" + b.LINE_BREAK;
  }, b.prototype.getHeaders = function(h) {
    var u, m = {
      "content-type": "multipart/form-data; boundary=" + this.getBoundary()
    };
    for (u in h)
      x(h, u) && (m[u.toLowerCase()] = h[u]);
    return m;
  }, b.prototype.setBoundary = function(h) {
    if (typeof h != "string")
      throw new TypeError("FormData boundary must be a string");
    this._boundary = h;
  }, b.prototype.getBoundary = function() {
    return this._boundary || this._generateBoundary(), this._boundary;
  }, b.prototype.getBuffer = function() {
    for (var h = new Buffer.alloc(0), u = this.getBoundary(), m = 0, R = this._streams.length; m < R; m++)
      typeof this._streams[m] != "function" && (Buffer.isBuffer(this._streams[m]) ? h = Buffer.concat([h, this._streams[m]]) : h = Buffer.concat([h, Buffer.from(this._streams[m])]), (typeof this._streams[m] != "string" || this._streams[m].substring(2, u.length + 2) !== u) && (h = Buffer.concat([h, Buffer.from(b.LINE_BREAK)])));
    return Buffer.concat([h, Buffer.from(this._lastBoundary())]);
  }, b.prototype._generateBoundary = function() {
    this._boundary = "--------------------------" + c.randomBytes(12).toString("hex");
  }, b.prototype.getLengthSync = function() {
    var h = this._overheadLength + this._valueLength;
    return this._streams.length && (h += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), h;
  }, b.prototype.hasKnownLength = function() {
    var h = !0;
    return this._valuesToMeasure.length && (h = !1), h;
  }, b.prototype.getLength = function(h) {
    var u = this._overheadLength + this._valueLength;
    if (this._streams.length && (u += this._lastBoundary().length), !this._valuesToMeasure.length) {
      process.nextTick(h.bind(this, null, u));
      return;
    }
    l.parallel(this._valuesToMeasure, this._lengthRetriever, function(m, R) {
      if (m) {
        h(m);
        return;
      }
      R.forEach(function(_) {
        u += _;
      }), h(null, u);
    });
  }, b.prototype.submit = function(h, u) {
    var m, R, _ = { method: "post" };
    return typeof h == "string" ? (h = s(h), R = v({
      port: h.port,
      path: h.pathname,
      host: h.hostname,
      protocol: h.protocol
    }, _)) : (R = v(h, _), R.port || (R.port = R.protocol === "https:" ? 443 : 80)), R.headers = this.getHeaders(h.headers), R.protocol === "https:" ? m = i.request(R) : m = a.request(R), this.getLength((function(O, j) {
      if (O && O !== "Unknown stream") {
        this._error(O);
        return;
      }
      if (j && m.setHeader("Content-Length", j), this.pipe(m), u) {
        var k, $ = function(V, G) {
          return m.removeListener("error", $), m.removeListener("response", k), u.call(this, V, G);
        };
        k = $.bind(this, null), m.on("error", $), m.on("response", k);
      }
    }).bind(this)), m;
  }, b.prototype._error = function(h) {
    this.error || (this.error = h, this.pause(), this.emit("error", h));
  }, b.prototype.toString = function() {
    return "[object FormData]";
  }, p(b.prototype, "FormData"), Bt = b, Bt;
}
var ip = ap();
const Xo = /* @__PURE__ */ on(ip), Nt = {
  isBufferAvailable() {
    return typeof Buffer < "u";
  },
  from(e) {
    return Buffer.from(e);
  }
}, Yo = 100;
function ta(e) {
  return d.isPlainObject(e) || d.isArray(e);
}
function Zo(e) {
  return d.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function It(e, n, t) {
  return e ? e.concat(n).map(function(i, s) {
    return i = Zo(i), !t && s ? "[" + i + "]" : i;
  }).join(t ? "." : "") : n;
}
function op(e) {
  return d.isArray(e) && !e.some(ta);
}
const sp = d.toFlatObject(d, {}, null, function(n) {
  return /^is[A-Z]/.test(n);
});
function Fn(e, n, t) {
  if (!d.isObject(e))
    throw new TypeError("target must be an object");
  n = n || new (Xo || FormData)();
  const a = (m, R) => {
    const _ = d.getSafeProp(t, m);
    return d.isUndefined(_) ? R : _;
  }, i = a("metaTokens", !0), s = a("visitor") || b, o = a("dots", !1), r = a("indexes", !1), c = a("Blob") || typeof Blob < "u" && Blob, f = a("maxDepth", Yo), l = c && d.isSpecCompliantForm(n), p = [];
  if (!d.isFunction(s))
    throw new TypeError("visitor must be a function");
  function x(m) {
    if (m === null) return "";
    if (d.isDate(m))
      return m.toISOString();
    if (d.isBoolean(m))
      return m.toString();
    if (!l && d.isBlob(m))
      throw new y("Blob is not supported. Use a Buffer instead.");
    if (d.isArrayBuffer(m) || d.isTypedArray(m)) {
      if (l && typeof c == "function")
        return new c([m]);
      if (Nt && Nt.isBufferAvailable())
        return Nt.from(m);
      throw new y(
        "Blob is not supported. Use a Buffer instead.",
        y.ERR_NOT_SUPPORT
      );
    }
    return m;
  }
  function v(m) {
    if (m > f)
      throw new y(
        "Object is too deeply nested (" + m + " levels). Max depth: " + f,
        y.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
  }
  function w(m, R) {
    if (f === 1 / 0)
      return JSON.stringify(m);
    const _ = [];
    return JSON.stringify(m, function(j, k) {
      if (!d.isObject(k))
        return k;
      for (; _.length && _[_.length - 1] !== this; )
        _.pop();
      return _.push(k), v(R + _.length - 1), k;
    });
  }
  function b(m, R, _) {
    let O = m;
    if (d.isReactNative(n) && d.isReactNativeBlob(m))
      return n.append(It(_, R, o), x(m)), !1;
    if (m && !_ && typeof m == "object") {
      if (d.endsWith(R, "{}"))
        R = i ? R : R.slice(0, -2), m = w(m, 1);
      else if (d.isArray(m) && op(m) || (d.isFileList(m) || d.endsWith(R, "[]")) && (O = d.toArray(m)))
        return R = Zo(R), O.forEach(function(k, $) {
          !(d.isUndefined(k) || k === null) && n.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? It([R], $, o) : r === null ? R : R + "[]",
            x(k)
          );
        }), !1;
    }
    return ta(m) ? !0 : (n.append(It(_, R, o), x(m)), !1);
  }
  const h = Object.assign(sp, {
    defaultVisitor: b,
    convertValue: x,
    isVisitable: ta
  });
  function u(m, R, _ = 0) {
    if (!d.isUndefined(m)) {
      if (v(_), p.indexOf(m) !== -1)
        throw new Error("Circular reference detected in " + R.join("."));
      p.push(m), d.forEach(m, function(j, k) {
        (!(d.isUndefined(j) || j === null) && s.call(n, j, d.isString(k) ? k.trim() : k, R, h)) === !0 && u(j, R ? R.concat(k) : [k], _ + 1);
      }), p.pop();
    }
  }
  if (!d.isObject(e))
    throw new TypeError("data must be an object");
  return u(e), n;
}
function _i(e) {
  const n = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(a) {
    return n[a];
  });
}
function Qo(e, n) {
  this._pairs = [], e && Fn(e, this, n);
}
const es = Qo.prototype;
es.append = function(n, t) {
  this._pairs.push([n, t]);
};
es.toString = function(n) {
  const t = n ? (a) => n.call(this, a, _i) : _i;
  return this._pairs.map(function(i) {
    return t(i[0]) + "=" + t(i[1]);
  }, "").join("&");
};
function rp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ua(e, n, t) {
  if (!n)
    return e;
  e = e || "";
  const a = d.isFunction(t) ? {
    serialize: t
  } : t, i = d.getSafeProp(a, "encode") || rp, s = d.getSafeProp(a, "serialize");
  let o;
  if (s ? o = s(n, a) : o = d.isURLSearchParams(n) ? n.toString() : new Qo(n, a).toString(i), o) {
    const r = e.indexOf("#");
    r !== -1 && (e = e.slice(0, r)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
const Ge = Symbol("internals");
function ns(e) {
  return e ? e.length : 0;
}
function Si(e) {
  if (e)
    for (; e.length && e[e.length - 1] === null; )
      e.pop();
}
function Ke(e, n) {
  const t = e.handlers, a = ns(t);
  t !== n.handlersRef ? (n.handlersRef = t, n.handlerEntries.clear()) : a !== n.handlersLength && (a ? n.handlerEntries.forEach(function(s, o) {
    t[s.index] !== s.handler && n.handlerEntries.delete(o);
  }) : n.handlerEntries.clear()), n.handlersLength = a;
}
class Oi {
  constructor() {
    this.handlers = [], this[Ge] = {
      handlersRef: this.handlers,
      handlersLength: this.handlers.length,
      handlerEntries: /* @__PURE__ */ new Map(),
      iterationDepth: 0,
      nextId: 0
    };
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(n, t, a) {
    const i = {
      fulfilled: n,
      rejected: t,
      synchronous: a ? a.synchronous : !1,
      runWhen: a ? a.runWhen : null
    }, s = this[Ge];
    this.handlers == null && (this.handlers = []), Ke(this, s);
    const o = s.nextId++;
    return this.handlers.push(i), s.handlerEntries.set(o, {
      handler: i,
      index: this.handlers.length - 1
    }), s.handlersLength = this.handlers.length, o;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(n) {
    const t = this[Ge];
    Ke(this, t);
    const a = t.handlerEntries.get(n);
    if (a) {
      if (t.handlerEntries.delete(n), this.handlers[a.index] !== a.handler)
        return;
      this.handlers[a.index] = null, t.iterationDepth || (Si(this.handlers), t.handlersLength = this.handlers.length);
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = [], Ke(this, this[Ge]));
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(n) {
    const t = this[Ge];
    Ke(this, t), t.iterationDepth++;
    try {
      d.forEach(this.handlers, function(i) {
        i !== null && n(i);
      });
    } finally {
      --t.iterationDepth || (Ke(this, t), Si(this.handlers), t.handlersLength = ns(this.handlers));
    }
  }
}
const qn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0,
  advertiseZstdAcceptEncoding: !1,
  validateStatusUndefinedResolves: !0
}, cp = Pn.URLSearchParams, zt = "abcdefghijklmnopqrstuvwxyz", ki = "0123456789", ts = {
  DIGIT: ki,
  ALPHA: zt,
  ALPHA_DIGIT: zt + zt.toUpperCase() + ki
}, pp = (e = 16, n = ts.ALPHA_DIGIT) => {
  let t = "";
  const { length: a } = n, i = new Uint32Array(e);
  wo.randomFillSync(i);
  for (let s = 0; s < e; s++)
    t += n[i[s] % a];
  return t;
}, lp = {
  isNode: !0,
  classes: {
    URLSearchParams: cp,
    FormData: Xo,
    Blob: typeof Blob < "u" && Blob || null
  },
  ALPHABET: ts,
  generateString: pp,
  protocols: ["http", "https", "file", "data"]
}, da = typeof window < "u" && typeof document < "u", aa = typeof navigator == "object" && navigator || void 0, up = da && (!aa || ["ReactNative", "NativeScript", "NS"].indexOf(aa.product) < 0), dp = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", mp = da && window.location.href || "http://localhost", fp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: da,
  hasStandardBrowserEnv: up,
  hasStandardBrowserWebWorkerEnv: dp,
  navigator: aa,
  origin: mp
}, Symbol.toStringTag, { value: "Module" })), Q = {
  ...fp,
  ...lp
};
function xp(e, n) {
  return Fn(e, new Q.classes.URLSearchParams(), {
    visitor: function(t, a, i, s) {
      return Q.isNode && d.isBuffer(t) ? (this.append(a, t.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...n
  });
}
const Ai = Yo;
function as(e) {
  if (e > Ai)
    throw new y(
      "FormData field is too deeply nested (" + e + " levels). Max depth: " + Ai,
      y.ERR_FORM_DATA_DEPTH_EXCEEDED
    );
}
function hp(e) {
  const n = [], t = /[^.[\]]+|\[([^.[\]]*)]/g;
  let a;
  for (; (a = t.exec(e)) !== null; )
    as(n.length), n.push(a[0] === "[]" ? "" : a[1] || a[0]);
  return n;
}
function vp(e) {
  const n = {}, t = Object.keys(e);
  let a;
  const i = t.length;
  let s;
  for (a = 0; a < i; a++)
    s = t[a], n[s] = e[s];
  return n;
}
function is(e) {
  function n(t, a, i, s) {
    as(s);
    let o = t[s++];
    if (o === "__proto__") return !0;
    const r = Number.isFinite(+o), c = s >= t.length;
    return o = !o && d.isArray(i) ? i.length : o, c ? (d.hasOwnProp(i, o) ? i[o] = d.isArray(i[o]) ? i[o].concat(a) : [i[o], a] : i[o] = a, !r) : ((!d.hasOwnProp(i, o) || !d.isObject(i[o])) && (i[o] = []), n(t, a, i[o], s) && d.isArray(i[o]) && (i[o] = vp(i[o])), !r);
  }
  if (d.isFormData(e) && d.isFunction(e.entries)) {
    const t = {};
    return d.forEachEntry(e, (a, i) => {
      n(hp(a), i, t, 0);
    }), t;
  }
  return null;
}
const os = Object.freeze([
  "get",
  "delete",
  "head",
  "options",
  "post",
  "put",
  "patch",
  "purge",
  "link",
  "unlink",
  "query"
]), Le = (e, n) => e != null && d.hasOwnProp(e, n) ? e[n] : void 0;
function bp(e, n, t) {
  if (d.isString(e))
    try {
      return (n || JSON.parse)(e), d.trim(e);
    } catch (a) {
      if (a.name !== "SyntaxError")
        throw a;
    }
  return (t || JSON.stringify)(e);
}
const cn = {
  transitional: qn,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(n, t) {
      const a = t.getContentType() || "", i = a.indexOf("application/json") > -1, s = d.isObject(n);
      if (s && d.isHTMLForm(n) && (n = new FormData(n)), d.isFormData(n))
        return i ? JSON.stringify(is(n)) : n;
      if (d.isArrayBuffer(n) || d.isBuffer(n) || d.isStream(n) || d.isFile(n) || d.isBlob(n) || d.isReadableStream(n))
        return n;
      if (d.isArrayBufferView(n))
        return n.buffer;
      if (d.isURLSearchParams(n))
        return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), n.toString();
      let r;
      if (s) {
        const c = Le(this, "formSerializer");
        if (a.indexOf("application/x-www-form-urlencoded") > -1)
          return xp(n, c).toString();
        if ((r = d.isFileList(n)) || a.indexOf("multipart/form-data") > -1) {
          const f = Le(this, "env"), l = f && f.FormData;
          return Fn(
            r ? { "files[]": n } : n,
            l && new l(),
            c
          );
        }
      }
      return s || i ? (t.setContentType("application/json", !1), bp(n)) : n;
    }
  ],
  transformResponse: [
    function(n) {
      const t = Le(this, "transitional") || cn.transitional, a = t && t.forcedJSONParsing, i = Le(this, "responseType"), s = i === "json";
      if (d.isResponse(n) || d.isReadableStream(n))
        return n;
      if (n && d.isString(n) && (a && !i || s)) {
        const r = !(t && t.silentJSONParsing) && s;
        try {
          return JSON.parse(n, Le(this, "parseReviver"));
        } catch (c) {
          if (r)
            throw c.name === "SyntaxError" ? y.from(c, y.ERR_BAD_RESPONSE, this, null, Le(this, "response")) : c;
        }
      }
      return n;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Q.classes.FormData,
    Blob: Q.classes.Blob
  },
  validateStatus: function(n) {
    return n >= 200 && n < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
d.forEach(os, (e) => {
  cn.headers[e] = {};
});
function $t(e, n) {
  const t = this || cn, a = n || t, i = oe.from(a.headers);
  let s = a.data;
  return d.forEach(e, function(r) {
    s = r.call(t, s, i.normalize(), n ? n.status : void 0);
  }), i.normalize(), s;
}
function ss(e) {
  return !!(e && e.__CANCEL__);
}
let je = class extends y {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(n, t, a) {
    super(n ?? "canceled", y.ERR_CANCELED, t, a), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function Be(e, n, t) {
  const a = t.config.validateStatus;
  !t.status || !a || a(t.status) ? e(t) : n(new y(
    "Request failed with status code " + t.status,
    t.status >= 400 && t.status < 500 ? y.ERR_BAD_REQUEST : y.ERR_BAD_RESPONSE,
    t.config,
    t.request,
    t
  ));
}
function gp(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function yp(e, n) {
  if (!n)
    return e;
  let t = e.length;
  for (; t > 0 && e.charCodeAt(t - 1) === 47; )
    t--;
  return e.slice(0, t) + "/" + n.replace(/^\/+/, "");
}
const wp = /[\t\n\r]/g;
function rs(e) {
  if (typeof e != "string")
    return e;
  let n = 0;
  for (; n < e.length && e.charCodeAt(n) <= 32; )
    n++;
  return e.slice(n).replace(wp, "");
}
const Rp = /^https?:(?!\/\/)/i;
function Ep(e) {
  return e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (n, t, a = "") => `${t}${a}${Sn}`);
}
function _p(e) {
  const n = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${Sn}@`), t = n.indexOf("#"), i = (t === -1 ? n : n.slice(0, t)).replace(
    /([?&][^=&#]*=)[^&#]*/g,
    `$1${Sn}`
  );
  return t === -1 ? i : `${i}#${Ep(n.slice(t + 1))}`;
}
function Ti(e, n) {
  if (typeof e == "string") {
    const t = rs(e);
    if (Rp.test(t))
      throw new y(
        `Invalid URL ${JSON.stringify(_p(t))}: missing "//" after protocol`,
        y.ERR_INVALID_URL,
        n
      );
  }
}
function ma(e, n, t, a) {
  Ti(n, a);
  let i = !gp(n);
  return e && (i || t === !1) ? (Ti(e, a), yp(e, n)) : n;
}
var Sp = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};
function Op(e) {
  try {
    return new URL(e);
  } catch {
    return null;
  }
}
function kp(e) {
  var n = (typeof e == "string" ? Op(e) : e) || {}, t = n.protocol, a = n.host, i = n.port;
  if (typeof a != "string" || !a || typeof t != "string" || (t = t.split(":", 1)[0], a = a.replace(/:\d*$/, ""), i = parseInt(i) || Sp[t] || 0, !Ap(a, i)))
    return "";
  var s = ia(t + "_proxy") || ia("all_proxy");
  return s && s.indexOf("://") === -1 && (s = t + "://" + s), s;
}
function Ap(e, n) {
  var t = ia("no_proxy").toLowerCase();
  return t ? t === "*" ? !1 : t.split(/[,\s]/).every(function(a) {
    if (!a)
      return !0;
    var i = a.match(/^(.+):(\d+)$/), s = i ? i[1] : a, o = i ? parseInt(i[2]) : 0;
    return o && o !== n ? !0 : /^[.*]/.test(s) ? (s.charAt(0) === "*" && (s = s.slice(1)), !e.endsWith(s)) : e !== s;
  }) : !0;
}
function ia(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
var _e = {}, un = { exports: {} }, dn = { exports: {} }, Mt, Pi;
function Tp() {
  if (Pi) return Mt;
  Pi = 1;
  var e = 1e3, n = e * 60, t = n * 60, a = t * 24, i = a * 7, s = a * 365.25;
  Mt = function(l, p) {
    p = p || {};
    var x = typeof l;
    if (x === "string" && l.length > 0)
      return o(l);
    if (x === "number" && isFinite(l))
      return p.long ? c(l) : r(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (p) {
        var x = parseFloat(p[1]), v = (p[2] || "ms").toLowerCase();
        switch (v) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return x * s;
          case "weeks":
          case "week":
          case "w":
            return x * i;
          case "days":
          case "day":
          case "d":
            return x * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return x * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return x * n;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return x * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return x;
          default:
            return;
        }
      }
    }
  }
  function r(l) {
    var p = Math.abs(l);
    return p >= a ? Math.round(l / a) + "d" : p >= t ? Math.round(l / t) + "h" : p >= n ? Math.round(l / n) + "m" : p >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var p = Math.abs(l);
    return p >= a ? f(l, p, a, "day") : p >= t ? f(l, p, t, "hour") : p >= n ? f(l, p, n, "minute") : p >= e ? f(l, p, e, "second") : l + " ms";
  }
  function f(l, p, x, v) {
    var w = p >= x * 1.5;
    return Math.round(l / x) + " " + v + (w ? "s" : "");
  }
  return Mt;
}
var Ht, Ci;
function cs() {
  if (Ci) return Ht;
  Ci = 1;
  function e(n) {
    a.debug = a, a.default = a, a.coerce = f, a.disable = r, a.enable = s, a.enabled = c, a.humanize = Tp(), a.destroy = l, Object.keys(n).forEach((p) => {
      a[p] = n[p];
    }), a.names = [], a.skips = [], a.formatters = {};
    function t(p) {
      let x = 0;
      for (let v = 0; v < p.length; v++)
        x = (x << 5) - x + p.charCodeAt(v), x |= 0;
      return a.colors[Math.abs(x) % a.colors.length];
    }
    a.selectColor = t;
    function a(p) {
      let x, v = null, w, b;
      function h(...u) {
        if (!h.enabled)
          return;
        const m = h, R = Number(/* @__PURE__ */ new Date()), _ = R - (x || R);
        m.diff = _, m.prev = x, m.curr = R, x = R, u[0] = a.coerce(u[0]), typeof u[0] != "string" && u.unshift("%O");
        let O = 0;
        u[0] = u[0].replace(/%([a-zA-Z%])/g, (k, $) => {
          if (k === "%%")
            return "%";
          O++;
          const V = a.formatters[$];
          if (typeof V == "function") {
            const G = u[O];
            k = V.call(m, G), u.splice(O, 1), O--;
          }
          return k;
        }), a.formatArgs.call(m, u), (m.log || a.log).apply(m, u);
      }
      return h.namespace = p, h.useColors = a.useColors(), h.color = a.selectColor(p), h.extend = i, h.destroy = a.destroy, Object.defineProperty(h, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => v !== null ? v : (w !== a.namespaces && (w = a.namespaces, b = a.enabled(p)), b),
        set: (u) => {
          v = u;
        }
      }), typeof a.init == "function" && a.init(h), h;
    }
    function i(p, x) {
      const v = a(this.namespace + (typeof x > "u" ? ":" : x) + p);
      return v.log = this.log, v;
    }
    function s(p) {
      a.save(p), a.namespaces = p, a.names = [], a.skips = [];
      const x = (typeof p == "string" ? p : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const v of x)
        v[0] === "-" ? a.skips.push(v.slice(1)) : a.names.push(v);
    }
    function o(p, x) {
      let v = 0, w = 0, b = -1, h = 0;
      for (; v < p.length; )
        if (w < x.length && (x[w] === p[v] || x[w] === "*"))
          x[w] === "*" ? (b = w, h = v, w++) : (v++, w++);
        else if (b !== -1)
          w = b + 1, h++, v = h;
        else
          return !1;
      for (; w < x.length && x[w] === "*"; )
        w++;
      return w === x.length;
    }
    function r() {
      const p = [
        ...a.names,
        ...a.skips.map((x) => "-" + x)
      ].join(",");
      return a.enable(""), p;
    }
    function c(p) {
      for (const x of a.skips)
        if (o(p, x))
          return !1;
      for (const x of a.names)
        if (o(p, x))
          return !0;
      return !1;
    }
    function f(p) {
      return p instanceof Error ? p.stack || p.message : p;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return a.enable(a.load()), a;
  }
  return Ht = e, Ht;
}
var ji;
function Pp() {
  return ji || (ji = 1, (function(e, n) {
    n.formatArgs = a, n.save = i, n.load = s, n.useColors = t, n.storage = o(), n.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), n.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function a(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      c.splice(1, 0, f, "color: inherit");
      let l = 0, p = 0;
      c[0].replace(/%[a-zA-Z%]/g, (x) => {
        x !== "%%" && (l++, x === "%c" && (p = l));
      }), c.splice(p, 0, f);
    }
    n.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? n.storage.setItem("debug", c) : n.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let c;
      try {
        c = n.storage.getItem("debug") || n.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = cs()(n);
    const { formatters: r } = e.exports;
    r.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  })(dn, dn.exports)), dn.exports;
}
var mn = { exports: {} }, Wt, Fi;
function Cp() {
  return Fi || (Fi = 1, Wt = (e, n = process.argv) => {
    const t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", a = n.indexOf(t + e), i = n.indexOf("--");
    return a !== -1 && (i === -1 || a < i);
  }), Wt;
}
var Vt, qi;
function jp() {
  if (qi) return Vt;
  qi = 1;
  const e = Xs, n = _o, t = Cp(), { env: a } = process;
  let i;
  t("no-color") || t("no-colors") || t("color=false") || t("color=never") ? i = 0 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (i = 1), "FORCE_COLOR" in a && (a.FORCE_COLOR === "true" ? i = 1 : a.FORCE_COLOR === "false" ? i = 0 : i = a.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(a.FORCE_COLOR, 10), 3));
  function s(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c, f) {
    if (i === 0)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (c && !f && i === void 0)
      return 0;
    const l = i || 0;
    if (a.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const p = e.release().split(".");
      return Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in a)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((p) => p in a) || a.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in a)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(a.TEAMCITY_VERSION) ? 1 : 0;
    if (a.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in a) {
      const p = parseInt((a.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (a.TERM_PROGRAM) {
        case "iTerm.app":
          return p >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(a.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(a.TERM) || "COLORTERM" in a ? 1 : l;
  }
  function r(c) {
    const f = o(c, c && c.isTTY);
    return s(f);
  }
  return Vt = {
    supportsColor: r,
    stdout: s(o(!0, n.isatty(1))),
    stderr: s(o(!0, n.isatty(2)))
  }, Vt;
}
var Li;
function Fp() {
  return Li || (Li = 1, (function(e, n) {
    const t = _o, a = qe;
    n.init = l, n.log = r, n.formatArgs = s, n.save = c, n.load = f, n.useColors = i, n.destroy = a.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), n.colors = [6, 2, 3, 4, 5, 1];
    try {
      const x = jp();
      x && (x.stderr || x).level >= 2 && (n.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    n.inspectOpts = Object.keys(process.env).filter((x) => /^debug_/i.test(x)).reduce((x, v) => {
      const w = v.substring(6).toLowerCase().replace(/_([a-z])/g, (h, u) => u.toUpperCase());
      let b = process.env[v];
      return /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : b === "null" ? b = null : b = Number(b), x[w] = b, x;
    }, {});
    function i() {
      return "colors" in n.inspectOpts ? !!n.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function s(x) {
      const { namespace: v, useColors: w } = this;
      if (w) {
        const b = this.color, h = "\x1B[3" + (b < 8 ? b : "8;5;" + b), u = `  ${h};1m${v} \x1B[0m`;
        x[0] = u + x[0].split(`
`).join(`
` + u), x.push(h + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        x[0] = o() + v + " " + x[0];
    }
    function o() {
      return n.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function r(...x) {
      return process.stderr.write(a.formatWithOptions(n.inspectOpts, ...x) + `
`);
    }
    function c(x) {
      x ? process.env.DEBUG = x : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(x) {
      x.inspectOpts = {};
      const v = Object.keys(n.inspectOpts);
      for (let w = 0; w < v.length; w++)
        x.inspectOpts[v[w]] = n.inspectOpts[v[w]];
    }
    e.exports = cs()(n);
    const { formatters: p } = e.exports;
    p.o = function(x) {
      return this.inspectOpts.colors = this.useColors, a.inspect(x, this.inspectOpts).split(`
`).map((v) => v.trim()).join(" ");
    }, p.O = function(x) {
      return this.inspectOpts.colors = this.useColors, a.inspect(x, this.inspectOpts);
    };
  })(mn, mn.exports)), mn.exports;
}
var Ui;
function Ln() {
  return Ui || (Ui = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? un.exports = Pp() : un.exports = Fp()), un.exports;
}
var fn = {}, Di;
function qp() {
  if (Di) return fn;
  Di = 1, Object.defineProperty(fn, "__esModule", { value: !0 });
  function e(n) {
    return function(t, a) {
      return new Promise((i, s) => {
        n.call(this, t, a, (o, r) => {
          o ? s(o) : i(r);
        });
      });
    };
  }
  return fn.default = e, fn;
}
var Je, Bi;
function Lp() {
  if (Bi) return Je;
  Bi = 1;
  var e = Je && Je.__importDefault || function(c) {
    return c && c.__esModule ? c : { default: c };
  };
  const n = Ys, t = e(Ln()), a = e(qp()), i = t.default("agent-base");
  function s(c) {
    return !!c && typeof c.addRequest == "function";
  }
  function o() {
    const { stack: c } = new Error();
    return typeof c != "string" ? !1 : c.split(`
`).some((f) => f.indexOf("(https.js:") !== -1 || f.indexOf("node:https:") !== -1);
  }
  function r(c, f) {
    return new r.Agent(c, f);
  }
  return (function(c) {
    class f extends n.EventEmitter {
      constructor(p, x) {
        super();
        let v = x;
        typeof p == "function" ? this.callback = p : p && (v = p), this.timeout = null, v && typeof v.timeout == "number" && (this.timeout = v.timeout), this.maxFreeSockets = 1, this.maxSockets = 1, this.maxTotalSockets = 1 / 0, this.sockets = {}, this.freeSockets = {}, this.requests = {}, this.options = {};
      }
      get defaultPort() {
        return typeof this.explicitDefaultPort == "number" ? this.explicitDefaultPort : o() ? 443 : 80;
      }
      set defaultPort(p) {
        this.explicitDefaultPort = p;
      }
      get protocol() {
        return typeof this.explicitProtocol == "string" ? this.explicitProtocol : o() ? "https:" : "http:";
      }
      set protocol(p) {
        this.explicitProtocol = p;
      }
      callback(p, x, v) {
        throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
      }
      /**
       * Called by node-core's "_http_client.js" module when creating
       * a new HTTP request with this Agent instance.
       *
       * @api public
       */
      addRequest(p, x) {
        const v = Object.assign({}, x);
        typeof v.secureEndpoint != "boolean" && (v.secureEndpoint = o()), v.host == null && (v.host = "localhost"), v.port == null && (v.port = v.secureEndpoint ? 443 : 80), v.protocol == null && (v.protocol = v.secureEndpoint ? "https:" : "http:"), v.host && v.path && delete v.path, delete v.agent, delete v.hostname, delete v._defaultAgent, delete v.defaultPort, delete v.createConnection, p._last = !0, p.shouldKeepAlive = !1;
        let w = !1, b = null;
        const h = v.timeout || this.timeout, u = (O) => {
          p._hadError || (p.emit("error", O), p._hadError = !0);
        }, m = () => {
          b = null, w = !0;
          const O = new Error(`A "socket" was not created for HTTP request before ${h}ms`);
          O.code = "ETIMEOUT", u(O);
        }, R = (O) => {
          w || (b !== null && (clearTimeout(b), b = null), u(O));
        }, _ = (O) => {
          if (w)
            return;
          if (b != null && (clearTimeout(b), b = null), s(O)) {
            i("Callback returned another Agent instance %o", O.constructor.name), O.addRequest(p, v);
            return;
          }
          if (O) {
            O.once("free", () => {
              this.freeSocket(O, v);
            }), p.onSocket(O);
            return;
          }
          const j = new Error(`no Duplex stream was returned to agent-base for \`${p.method} ${p.path}\``);
          u(j);
        };
        if (typeof this.callback != "function") {
          u(new Error("`callback` is not defined"));
          return;
        }
        this.promisifiedCallback || (this.callback.length >= 3 ? (i("Converting legacy callback function to promise"), this.promisifiedCallback = a.default(this.callback)) : this.promisifiedCallback = this.callback), typeof h == "number" && h > 0 && (b = setTimeout(m, h)), "port" in v && typeof v.port != "number" && (v.port = Number(v.port));
        try {
          i("Resolving socket for %o request: %o", v.protocol, `${p.method} ${p.path}`), Promise.resolve(this.promisifiedCallback(p, v)).then(_, R);
        } catch (O) {
          Promise.reject(O).catch(R);
        }
      }
      freeSocket(p, x) {
        i("Freeing socket %o %o", p.constructor.name, x), p.destroy();
      }
      destroy() {
        i("Destroying agent %o", this.constructor.name);
      }
    }
    c.Agent = f, c.prototype = c.Agent.prototype;
  })(r || (r = {})), Je = r, Je;
}
var Ue = {}, Ni;
function Up() {
  if (Ni) return Ue;
  Ni = 1;
  var e = Ue && Ue.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(Ue, "__esModule", { value: !0 });
  const t = e(Ln()).default("https-proxy-agent:parse-proxy-response");
  function a(i) {
    return new Promise((s, o) => {
      let r = 0;
      const c = [];
      function f() {
        const b = i.read();
        b ? w(b) : i.once("readable", f);
      }
      function l() {
        i.removeListener("end", x), i.removeListener("error", v), i.removeListener("close", p), i.removeListener("readable", f);
      }
      function p(b) {
        t("onclose had error %o", b);
      }
      function x() {
        t("onend");
      }
      function v(b) {
        l(), t("onerror %o", b), o(b);
      }
      function w(b) {
        c.push(b), r += b.length;
        const h = Buffer.concat(c, r);
        if (h.indexOf(`\r
\r
`) === -1) {
          t("have not received end of HTTP headers yet..."), f();
          return;
        }
        const m = h.toString("ascii", 0, h.indexOf(`\r
`)), R = +m.split(" ")[1];
        t("got proxy server response: %o", m), s({
          statusCode: R,
          buffered: h
        });
      }
      i.on("error", v), i.on("close", p), i.on("end", x), f();
    });
  }
  return Ue.default = a, Ue;
}
var Ii;
function Dp() {
  if (Ii) return _e;
  Ii = 1;
  var e = _e && _e.__awaiter || function(b, h, u, m) {
    function R(_) {
      return _ instanceof u ? _ : new u(function(O) {
        O(_);
      });
    }
    return new (u || (u = Promise))(function(_, O) {
      function j(V) {
        try {
          $(m.next(V));
        } catch (G) {
          O(G);
        }
      }
      function k(V) {
        try {
          $(m.throw(V));
        } catch (G) {
          O(G);
        }
      }
      function $(V) {
        V.done ? _(V.value) : R(V.value).then(j, k);
      }
      $((m = m.apply(b, h || [])).next());
    });
  }, n = _e && _e.__importDefault || function(b) {
    return b && b.__esModule ? b : { default: b };
  };
  Object.defineProperty(_e, "__esModule", { value: !0 });
  const t = n(Ks), a = n(Js), i = n(Pn), s = n(Eo), o = n(Ln()), r = Lp(), c = n(Up()), f = o.default("https-proxy-agent:agent");
  class l extends r.Agent {
    constructor(h) {
      let u;
      if (typeof h == "string" ? u = i.default.parse(h) : u = h, !u)
        throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
      f("creating new HttpsProxyAgent instance: %o", u), super(u);
      const m = Object.assign({}, u);
      this.secureProxy = u.secureProxy || v(m.protocol), m.host = m.hostname || m.host, typeof m.port == "string" && (m.port = parseInt(m.port, 10)), !m.port && m.host && (m.port = this.secureProxy ? 443 : 80), this.secureProxy && !("ALPNProtocols" in m) && (m.ALPNProtocols = ["http 1.1"]), m.host && m.path && (delete m.path, delete m.pathname), this.proxy = m;
    }
    /**
     * Called when the node-core HTTP client library is creating a
     * new HTTP request.
     *
     * @api protected
     */
    callback(h, u) {
      return e(this, void 0, void 0, function* () {
        const { proxy: m, secureProxy: R } = this;
        let _;
        R ? (f("Creating `tls.Socket`: %o", m), _ = a.default.connect(m)) : (f("Creating `net.Socket`: %o", m), _ = t.default.connect(m));
        const O = Object.assign({}, m.headers);
        let k = `CONNECT ${`${u.host}:${u.port}`} HTTP/1.1\r
`;
        m.auth && (O["Proxy-Authorization"] = `Basic ${Buffer.from(m.auth).toString("base64")}`);
        let { host: $, port: V, secureEndpoint: G } = u;
        x(V, G) || ($ += `:${V}`), O.Host = $, O.Connection = "close";
        for (const W of Object.keys(O))
          k += `${W}: ${O[W]}\r
`;
        const q = c.default(_);
        _.write(`${k}\r
`);
        const { statusCode: ae, buffered: be } = yield q;
        if (ae === 200) {
          if (h.once("socket", p), u.secureEndpoint) {
            f("Upgrading socket connection to TLS");
            const W = u.servername || u.host;
            return a.default.connect(Object.assign(Object.assign({}, w(u, "host", "hostname", "path", "port")), {
              socket: _,
              servername: W
            }));
          }
          return _;
        }
        _.destroy();
        const M = new t.default.Socket({ writable: !1 });
        return M.readable = !0, h.once("socket", (W) => {
          f("replaying proxy buffer for failed request"), s.default(W.listenerCount("data") > 0), W.push(be), W.push(null);
        }), M;
      });
    }
  }
  _e.default = l;
  function p(b) {
    b.resume();
  }
  function x(b, h) {
    return !!(!h && b === 80 || h && b === 443);
  }
  function v(b) {
    return typeof b == "string" ? /^https:?$/i.test(b) : !1;
  }
  function w(b, ...h) {
    const u = {};
    let m;
    for (m in b)
      h.includes(m) || (u[m] = b[m]);
    return u;
  }
  return _e;
}
var Xe, zi;
function Bp() {
  if (zi) return Xe;
  zi = 1;
  var e = Xe && Xe.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  const n = e(Dp());
  function t(a) {
    return new n.default(a);
  }
  return (function(a) {
    a.HttpsProxyAgent = n.default, a.prototype = n.default.prototype;
  })(t || (t = {})), Xe = t, Xe;
}
var Np = Bp();
const ps = /* @__PURE__ */ on(Np);
var xn = { exports: {} }, Gt, $i;
function Ip() {
  if ($i) return Gt;
  $i = 1;
  var e;
  return Gt = function() {
    if (!e) {
      try {
        e = Ln()("follow-redirects");
      } catch {
      }
      typeof e != "function" && (e = function() {
      });
    }
    e.apply(null, arguments);
  }, Gt;
}
var Mi;
function zp() {
  if (Mi) return xn.exports;
  Mi = 1;
  var e = Pn, n = e.URL, t = An, a = Tn, i = ue.Writable, s = Eo, o = Ip();
  (function() {
    var S = typeof process < "u", E = typeof window < "u" && typeof document < "u", P = W(Error.captureStackTrace);
    !S && (E || !P) && console.warn("The follow-redirects package should be excluded from browser builds.");
  })();
  var r = !1;
  try {
    s(new n(""));
  } catch (g) {
    r = g.code === "ERR_INVALID_URL";
  }
  var c = [
    "Authorization",
    "Proxy-Authorization",
    "Cookie"
  ], f = [
    "auth",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "hash"
  ], l = ["abort", "aborted", "connect", "error", "socket", "timeout"], p = /* @__PURE__ */ Object.create(null);
  l.forEach(function(g) {
    p[g] = function(S, E, P) {
      this._redirectable.emit(g, S, E, P);
    };
  });
  var x = G(
    "ERR_INVALID_URL",
    "Invalid URL",
    TypeError
  ), v = G(
    "ERR_FR_REDIRECTION_FAILURE",
    "Redirected request failed"
  ), w = G(
    "ERR_FR_TOO_MANY_REDIRECTS",
    "Maximum number of redirects exceeded",
    v
  ), b = G(
    "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
    "Request body larger than maxBodyLength limit"
  ), h = G(
    "ERR_STREAM_WRITE_AFTER_END",
    "write after end"
  ), u = i.prototype.destroy || _;
  function m(g, S) {
    i.call(this), this._sanitizeOptions(g), this._options = g, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], S && this.on("response", S);
    var E = this;
    this._onNativeResponse = function(P) {
      try {
        E._processResponse(P);
      } catch (F) {
        E.emit("error", F instanceof v ? F : new v({ cause: F }));
      }
    }, this._headerFilter = new RegExp("^(?:" + c.concat(g.sensitiveHeaders).map(me).join("|") + ")$", "i"), this._performRequest();
  }
  m.prototype = Object.create(i.prototype), m.prototype.abort = function() {
    q(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
  }, m.prototype.destroy = function(g) {
    return q(this._currentRequest, g), u.call(this, g), this;
  }, m.prototype.write = function(g, S, E) {
    if (this._ending)
      throw new h();
    if (!M(g) && !Re(g))
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    if (W(S) && (E = S, S = null), g.length === 0) {
      E && E();
      return;
    }
    this._requestBodyLength + g.length <= this._options.maxBodyLength ? (this._requestBodyLength += g.length, this._requestBodyBuffers.push({ data: g, encoding: S }), this._currentRequest.write(g, S, E)) : (this.emit("error", new b()), this.abort());
  }, m.prototype.end = function(g, S, E) {
    if (W(g) ? (E = g, g = S = null) : W(S) && (E = S, S = null), !g)
      this._ended = this._ending = !0, this._currentRequest.end(null, null, E);
    else {
      var P = this, F = this._currentRequest;
      this.write(g, S, function() {
        P._ended = !0, F.end(null, null, E);
      }), this._ending = !0;
    }
  }, m.prototype.setHeader = function(g, S) {
    this._options.headers[g] = S, this._currentRequest.setHeader(g, S);
  }, m.prototype.removeHeader = function(g) {
    delete this._options.headers[g], this._currentRequest.removeHeader(g);
  }, m.prototype.setTimeout = function(g, S) {
    var E = this;
    function P(X) {
      X.setTimeout(g), X.removeListener("timeout", X.destroy), X.addListener("timeout", X.destroy);
    }
    function F(X) {
      E._timeout && clearTimeout(E._timeout), E._timeout = setTimeout(function() {
        E.emit("timeout"), J();
      }, g), P(X);
    }
    function J() {
      E._timeout && (clearTimeout(E._timeout), E._timeout = null), E.removeListener("abort", J), E.removeListener("error", J), E.removeListener("response", J), E.removeListener("close", J), S && E.removeListener("timeout", S), E.socket || E._currentRequest.removeListener("socket", F);
    }
    return S && this.on("timeout", S), this.socket ? F(this.socket) : this._currentRequest.once("socket", F), this.on("socket", P), this.on("abort", J), this.on("error", J), this.on("response", J), this.on("close", J), this;
  }, [
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
  ].forEach(function(g) {
    m.prototype[g] = function(S, E) {
      return this._currentRequest[g](S, E);
    };
  }), ["aborted", "connection", "socket"].forEach(function(g) {
    Object.defineProperty(m.prototype, g, {
      get: function() {
        return this._currentRequest[g];
      }
    });
  }), m.prototype._sanitizeOptions = function(g) {
    if (g.headers || (g.headers = {}), be(g.sensitiveHeaders) || (g.sensitiveHeaders = []), g.host && (g.hostname || (g.hostname = g.host), delete g.host), !g.pathname && g.path) {
      var S = g.path.indexOf("?");
      S < 0 ? g.pathname = g.path : (g.pathname = g.path.substring(0, S), g.search = g.path.substring(S));
    }
  }, m.prototype._performRequest = function() {
    var g = this._options.protocol, S = this._options.nativeProtocols[g];
    if (!S)
      throw new TypeError("Unsupported protocol " + g);
    if (this._options.agents) {
      var E = g.slice(0, -1);
      this._options.agent = this._options.agents[E];
    }
    var P = this._currentRequest = S.request(this._options, this._onNativeResponse);
    P._redirectable = this;
    for (var F of l)
      P.on(F, p[F]);
    if (this._currentUrl = /^\//.test(this._options.path) ? e.format(this._options) : (
      // When making a request to a proxy, […]
      // a client MUST send the target URI in absolute-form […].
      this._options.path
    ), this._isRedirect) {
      var J = 0, X = this, se = this._requestBodyBuffers;
      (function D(N) {
        if (P === X._currentRequest)
          if (N)
            X.emit("error", N);
          else if (J < se.length) {
            var U = se[J++];
            P.finished || P.write(U.data, U.encoding, D);
          } else X._ended && P.end();
      })();
    }
  }, m.prototype._processResponse = function(g) {
    var S = g.statusCode;
    this._options.trackRedirects && this._redirects.push({
      url: this._currentUrl,
      headers: g.headers,
      statusCode: S
    });
    var E = g.headers.location;
    if (!E || this._options.followRedirects === !1 || S < 300 || S >= 400) {
      g.responseUrl = this._currentUrl, g.redirects = this._redirects, this.emit("response", g), this._requestBodyBuffers = [];
      return;
    }
    if (q(this._currentRequest), g.destroy(), ++this._redirectCount > this._options.maxRedirects)
      throw new w();
    var P, F = this._options.beforeRedirect;
    F && (P = Object.assign({
      // The Host header was set by nativeProtocol.request
      Host: g.req.getHeader("host")
    }, this._options.headers));
    var J = this._options.method;
    ((S === 301 || S === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    S === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], V(/^content-/i, this._options.headers));
    var X = V(/^host$/i, this._options.headers), se = O(this._currentUrl), D = X || se.host, N = /^\w+:/.test(E) ? this._currentUrl : e.format(Object.assign(se, { host: D })), U = j(E, N);
    if (o("redirecting to", U.href), this._isRedirect = !0, $(U, this._options), (U.protocol !== se.protocol && U.protocol !== "https:" || U.host !== D && !ae(U.host, D)) && V(this._headerFilter, this._options.headers), W(F)) {
      var B = {
        headers: g.headers,
        statusCode: S
      }, Y = {
        url: N,
        method: J,
        headers: P
      };
      F(this._options, B, Y), this._sanitizeOptions(this._options);
    }
    this._performRequest();
  };
  function R(g) {
    var S = {
      maxRedirects: 21,
      maxBodyLength: 10485760
    }, E = {};
    return Object.keys(g).forEach(function(P) {
      var F = P + ":", J = E[F] = g[P], X = S[P] = Object.create(J);
      function se(N, U, B) {
        return ge(N) ? N = $(N) : M(N) ? N = $(O(N)) : (B = U, U = k(N), N = { protocol: F }), W(U) && (B = U, U = null), U = Object.assign({
          maxRedirects: S.maxRedirects,
          maxBodyLength: S.maxBodyLength
        }, N, U), U.nativeProtocols = E, !M(U.host) && !M(U.hostname) && (U.hostname = "::1"), s.equal(U.protocol, F, "protocol mismatch"), o("options", U), new m(U, B);
      }
      function D(N, U, B) {
        var Y = X.request(N, U, B);
        return Y.end(), Y;
      }
      Object.defineProperties(X, {
        request: { value: se, configurable: !0, enumerable: !0, writable: !0 },
        get: { value: D, configurable: !0, enumerable: !0, writable: !0 }
      });
    }), S;
  }
  function _() {
  }
  function O(g) {
    var S;
    if (r)
      S = new n(g);
    else if (S = k(e.parse(g)), !M(S.protocol))
      throw new x({ input: g });
    return S;
  }
  function j(g, S) {
    return r ? new n(g, S) : O(e.resolve(S, g));
  }
  function k(g) {
    if (/^\[/.test(g.hostname) && !/^\[[:0-9a-f]+\]$/i.test(g.hostname))
      throw new x({ input: g.href || g });
    if (/^\[/.test(g.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(g.host))
      throw new x({ input: g.href || g });
    return g;
  }
  function $(g, S) {
    var E = S || {};
    for (var P of f)
      E[P] = g[P];
    return E.hostname.startsWith("[") && (E.hostname = E.hostname.slice(1, -1)), E.port !== "" && (E.port = Number(E.port)), E.path = E.search ? E.pathname + E.search : E.pathname, E;
  }
  function V(g, S) {
    var E;
    for (var P in S)
      g.test(P) && (E = S[P], delete S[P]);
    return E === null || typeof E > "u" ? void 0 : String(E).trim();
  }
  function G(g, S, E) {
    function P(F) {
      W(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, F || {}), this.code = g, this.message = this.cause ? S + ": " + this.cause.message : S;
    }
    return P.prototype = new (E || Error)(), Object.defineProperties(P.prototype, {
      constructor: {
        value: P,
        enumerable: !1
      },
      name: {
        value: "Error [" + g + "]",
        enumerable: !1
      }
    }), P;
  }
  function q(g, S) {
    for (var E of l)
      g.removeListener(E, p[E]);
    g.on("error", _), g.destroy(S);
  }
  function ae(g, S) {
    s(M(g) && M(S));
    var E = g.length - S.length - 1;
    return E > 0 && g[E] === "." && g.endsWith(S);
  }
  function be(g) {
    return g instanceof Array;
  }
  function M(g) {
    return typeof g == "string" || g instanceof String;
  }
  function W(g) {
    return typeof g == "function";
  }
  function Re(g) {
    return typeof g == "object" && "length" in g;
  }
  function ge(g) {
    return n && g instanceof n;
  }
  function me(g) {
    return g.replace(/[\]\\/()*+?.$]/g, "\\$&");
  }
  return xn.exports = R({ http: t, https: a }), xn.exports.wrap = R, xn.exports;
}
var $p = zp();
const Mp = /* @__PURE__ */ on($p), tn = "1.20.0";
function wn(e) {
  const n = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
  return n && n[1] || "";
}
const Hp = /^([^,;/]+\/[^,;/]+)?((?:;[^,;=]+=[^,;]+)*)(;base64)?,([\s\S]*)$/;
function Wp(e, n, t) {
  const a = t && t.Blob || Q.classes.Blob, i = wn(e);
  if (n === void 0 && a && (n = !0), i === "data") {
    e = i.length ? e.slice(i.length + 1) : e;
    const s = Hp.exec(e);
    if (!s)
      throw new y("Invalid URL", y.ERR_INVALID_URL);
    const o = s[1], r = s[2], c = s[3] ? "base64" : "utf8", f = s[4];
    let l = "";
    o ? l = r ? o + r : o : r && (l = "text/plain" + r);
    const p = c === "base64" ? Buffer.from(f, "base64") : Buffer.from(decodeURIComponent(f), c);
    if (n) {
      if (!a)
        throw new y("Blob is not supported", y.ERR_NOT_SUPPORT);
      return new a([p], { type: l });
    }
    return p;
  }
  throw new y("Unsupported protocol " + i, y.ERR_NOT_SUPPORT);
}
const Vp = ["content-type", "content-length"];
function ls(e, n, t) {
  if (t !== "content-only") {
    e.set(n);
    return;
  }
  Object.entries(n || {}).forEach(([a, i]) => {
    Vp.includes(a.toLowerCase()) && e.set(a, i);
  });
}
const Kt = Symbol("internals");
class Hi extends ue.Transform {
  constructor(n) {
    n = d.toFlatObject(
      n,
      {
        maxRate: 0,
        chunkSize: 64 * 1024,
        minChunkSize: 100,
        timeWindow: 500,
        ticksRate: 2,
        samplesCount: 15
      },
      null,
      (a, i) => !d.isUndefined(i[a])
    ), super({
      readableHighWaterMark: n.chunkSize
    });
    const t = this[Kt] = {
      timeWindow: n.timeWindow,
      chunkSize: n.chunkSize,
      maxRate: n.maxRate,
      minChunkSize: n.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (a) => {
      a === "progress" && (t.isCaptured || (t.isCaptured = !0));
    });
  }
  _read(n) {
    const t = this[Kt];
    return t.onReadCallback && t.onReadCallback(), super._read(n);
  }
  _transform(n, t, a) {
    const i = this[Kt], s = i.maxRate, o = this.readableHighWaterMark, r = i.timeWindow, c = 1e3 / r, f = s / c, l = i.minChunkSize !== !1 ? Math.max(i.minChunkSize, f * 0.01) : 0, p = (v, w) => {
      const b = Buffer.byteLength(v);
      i.bytesSeen += b, i.bytes += b, i.isCaptured && this.emit("progress", i.bytesSeen), this.push(v) ? process.nextTick(w) : i.onReadCallback = () => {
        i.onReadCallback = null, process.nextTick(w);
      };
    }, x = (v, w) => {
      const b = Buffer.byteLength(v);
      let h = null, u = o, m, R = 0;
      if (s) {
        const _ = Date.now();
        (!i.ts || (R = _ - i.ts) >= r) && (i.ts = _, m = f - i.bytes, i.bytes = m < 0 ? -m : 0, R = 0), m = f - i.bytes;
      }
      if (s) {
        if (m <= 0)
          return setTimeout(() => {
            w(null, v);
          }, r - R);
        m < u && (u = m);
      }
      u && b > u && b - u > l && (h = v.subarray(u), v = v.subarray(0, u)), p(
        v,
        h ? () => {
          process.nextTick(w, null, h);
        } : w
      );
    };
    x(n, function v(w, b) {
      if (w)
        return a(w);
      b ? x(b, v) : a(null);
    });
  }
}
const { asyncIterator: Wi } = Symbol, us = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[Wi] ? yield* e[Wi]() : yield e;
}, Gp = Q.ALPHABET.ALPHA_DIGIT + "-_", an = typeof TextEncoder == "function" ? new TextEncoder() : new qe.TextEncoder(), Ae = `\r
`, Kp = an.encode(Ae), Jp = 2;
class Xp {
  constructor(n, t) {
    const { escapeName: a } = this.constructor, i = d.isString(t);
    let s = `Content-Disposition: form-data; name="${a(n)}"${!i && t.name ? `; filename="${a(t.name)}"` : ""}${Ae}`;
    if (i)
      t = an.encode(String(t).replace(/\r?\n|\r\n?/g, Ae));
    else {
      const o = String(t.type || "application/octet-stream").replace(/[\r\n]/g, "");
      s += `Content-Type: ${o}${Ae}`;
    }
    this.headers = an.encode(s + Ae), this.contentLength = i ? t.byteLength : t.size, this.size = this.headers.byteLength + this.contentLength + Jp, this.name = n, this.value = t;
  }
  async *encode() {
    yield this.headers;
    const { value: n } = this;
    d.isTypedArray(n) ? yield n : yield* us(n), yield Kp;
  }
  static escapeName(n) {
    return String(n).replace(
      /[\r\n"]/g,
      (t) => ({
        "\r": "%0D",
        "\n": "%0A",
        '"': "%22"
      })[t]
    );
  }
}
const Yp = (e, n, t) => {
  const {
    tag: a = "form-data-boundary",
    size: i = 25,
    boundary: s = a + "-" + Q.generateString(i, Gp)
  } = t || {};
  if (!d.isFormData(e))
    throw new TypeError("FormData instance required");
  if (s.length < 1 || s.length > 70)
    throw new Error("boundary must be 1-70 characters long");
  const o = an.encode("--" + s + Ae), r = an.encode("--" + s + "--" + Ae);
  let c = r.byteLength;
  const f = Array.from(e.entries()).map(([p, x]) => {
    const v = new Xp(p, x);
    return c += v.size, v;
  });
  c += o.byteLength * f.length, c = d.toFiniteNumber(c);
  const l = {
    "Content-Type": `multipart/form-data; boundary=${s}`
  };
  return Number.isFinite(c) && (l["Content-Length"] = c), n && n(l), Vs.from(
    (async function* () {
      for (const p of f)
        yield o, yield* p.encode();
      yield r;
    })()
  );
};
class Zp extends ue.Transform {
  __transform(n, t, a) {
    this.push(n), a();
  }
  _transform(n, t, a) {
    if (n.length !== 0 && (this._transform = this.__transform, n[0] !== 120)) {
      const i = Buffer.alloc(2);
      i[0] = 120, i[1] = 156, this.push(i, t);
    }
    this.__transform(n, t, a);
  }
}
class Qp {
  constructor() {
    this.sessions = /* @__PURE__ */ Object.create(null);
  }
  getSession(n, t) {
    t = Object.assign(
      /* @__PURE__ */ Object.create(null),
      {
        sessionTimeout: 1e3
      },
      t
    );
    let a = this.sessions[n];
    if (a) {
      let p = a.length;
      for (let x = 0; x < p; x++) {
        const [v, w] = a[x];
        if (!v.destroyed && !v.closed && qe.isDeepStrictEqual(w, t))
          return v;
      }
    }
    const i = So.connect(n, t);
    let s, o;
    const r = () => {
      if (s)
        return;
      s = !0, o && (clearTimeout(o), o = null);
      let p = a, x = p.length, v = x;
      for (; v--; )
        if (p[v][0] === i) {
          x === 1 ? delete this.sessions[n] : p.splice(v, 1), i.closed || i.close();
          return;
        }
    }, c = i.request, { sessionTimeout: f } = t;
    if (f != null) {
      let p = 0;
      i.request = function() {
        const x = c.apply(this, arguments);
        return p++, o && (clearTimeout(o), o = null), x.once("close", () => {
          --p || (o = setTimeout(() => {
            o = null, r();
          }, f));
        }), x;
      };
    }
    i.once("close", r), i.once("error", r);
    let l = [i, t];
    return a ? a.push(l) : a = this.sessions[n] = [l], i;
  }
}
const el = (e, n) => d.isAsyncFn(e) ? function(...t) {
  const a = t.pop();
  e.apply(this, t).then((i) => {
    try {
      n ? a(null, ...n(i)) : a(null, i);
    } catch (s) {
      a(s);
    }
  }, a);
} : e, nl = /* @__PURE__ */ new Set(["localhost", "0.0.0.0"]), ds = (e) => {
  let n = e.length;
  for (; n && e.charCodeAt(n - 1) === 46; )
    n--;
  return n === e.length ? e : e.slice(0, n);
}, ms = (e) => {
  const n = e.split(".");
  return n.length !== 4 || n[0] !== "127" ? !1 : n.every((t) => /^\d+$/.test(t) && Number(t) >= 0 && Number(t) <= 255);
}, Jt = (e) => {
  if (/^0[xX][0-9a-fA-F]+$/.test(e)) {
    const n = parseInt(e.slice(2), 16);
    return Number.isFinite(n) ? n : null;
  }
  if (e.length > 1 && /^0[0-7]+$/.test(e)) {
    const n = parseInt(e, 8);
    return Number.isFinite(n) ? n : null;
  }
  if (e.length > 1 && /^0[0-9]+$/.test(e))
    return null;
  if (/^[0-9]+$/.test(e)) {
    const n = parseInt(e, 10);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}, fs = (e) => {
  if (typeof e != "string" || !e || e.indexOf(":") !== -1)
    return e;
  let n = e;
  if (n.charAt(0) === "[" && n.charAt(n.length - 1) === "]" && (n = n.slice(1, -1)), n = ds(n), !/^[0-9.xXa-fA-F]+$/.test(n)) return e;
  const t = n.split(".");
  if (t.some((l) => l === "")) return e;
  if (t.length === 4) {
    const l = t.map(Jt);
    return l.some((p) => p === null || p < 0 || p > 255) ? e : l.join(".");
  }
  if (t.length > 4 || t.length === 1) return e;
  const a = t.slice(0, -1), i = t[t.length - 1], s = 4 - a.length, o = Jt(i);
  if (o === null) return e;
  const r = (1 << 8 * s) - 1;
  if (o < 0 || o > r) return e;
  const c = new Array(s).fill(0);
  for (let l = s - 1, p = o; l >= 0; l--, p >>= 8)
    c[l] = p & 255;
  const f = a.map(Jt);
  return f.some((l) => l === null || l < 0 || l > 255) ? e : [...f, ...c].join(".");
}, Xt = (e) => /^0{1,4}$/.test(e), tl = (e) => {
  if (e === "::") return !0;
  const n = e.indexOf("::");
  if (n !== -1) {
    if (n !== e.lastIndexOf("::")) return !1;
    const a = e.slice(0, n), i = e.slice(n + 2), s = a ? a.split(":") : [], o = i ? i.split(":") : [];
    return s.length + o.length < 8 && s.every(Xt) && o.every(Xt);
  }
  const t = e.split(":");
  return t.length === 8 && t.every(Xt);
}, al = (e) => {
  if (e === "::1") return !0;
  const n = e.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (n) return ms(n[1]);
  const t = e.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
  if (t) {
    const i = parseInt(t[1], 16);
    return i >= 32512 && i <= 32767;
  }
  const a = e.split(":");
  if (a.length === 8) {
    for (let i = 0; i < 7; i++)
      if (!/^0+$/.test(a[i])) return !1;
    return /^0*1$/.test(a[7]);
  }
  return !1;
}, Vi = (e) => e ? nl.has(e) || ms(e) || tl(e) ? !0 : al(e) : !1, il = {
  http: 80,
  https: 443,
  ws: 80,
  wss: 443,
  ftp: 21
}, ol = (e) => {
  let n = e, t = 0;
  if (n.charAt(0) === "[") {
    const s = n.indexOf("]");
    if (s !== -1) {
      const o = n.slice(1, s), r = n.slice(s + 1);
      return r.charAt(0) === ":" && /^\d+$/.test(r.slice(1)) && (t = Number.parseInt(r.slice(1), 10)), [o, t];
    }
  }
  const a = n.indexOf(":"), i = n.lastIndexOf(":");
  return a !== -1 && a === i && /^\d+$/.test(n.slice(i + 1)) && (t = Number.parseInt(n.slice(i + 1), 10), n = n.slice(0, i)), [n, t];
}, sl = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:(\d+\.\d+\.\d+\.\d+)$/i, rl = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i, xs = (e) => {
  if (typeof e != "string" || e.indexOf(":") === -1) return e;
  const n = e.match(sl);
  if (n) return n[1];
  const t = e.match(rl);
  if (t) {
    const a = parseInt(t[1], 16), i = parseInt(t[2], 16);
    return `${a >> 8}.${a & 255}.${i >> 8}.${i & 255}`;
  }
  return e;
}, cl = /^(?:0|[1-9]\d{0,2})$/, hs = (e) => {
  const n = e.split(".");
  return n.length === 4 && n.every((t) => cl.test(t) && Number(t) <= 255) ? n.map(Number) : null;
}, pl = /^[0-9a-f]{1,4}$/i, ll = (e) => {
  const n = e.split("::");
  if (n.length > 2)
    return null;
  const t = n[0] ? n[0].split(":") : [];
  if (n.length === 2) {
    const a = n[1] ? n[1].split(":") : [], i = 8 - t.length - a.length;
    if (i < 1)
      return null;
    t.push(...new Array(i).fill("0"), ...a);
  }
  return t.length !== 8 || t.some((a) => !pl.test(a)) ? null : t.flatMap((a) => {
    const i = Number.parseInt(a, 16);
    return [i >> 8 & 255, i & 255];
  });
}, vs = (e) => typeof e != "string" || !e ? null : e.indexOf(":") !== -1 ? ll(e) : hs(e), Gi = (e) => {
  if (!e)
    return e;
  e.charAt(0) === "[" && e.charAt(e.length - 1) === "]" && (e = e.slice(1, -1));
  const n = ds(e), t = fs(n);
  return t !== n ? t : xs(n);
}, ul = (e) => {
  let n = e;
  const t = n.charAt(0) === "[", a = n.charAt(n.length - 1) === "]", i = n.includes("[") || n.includes("]");
  if (t || a) {
    if (!t || !a || (n = n.slice(1, -1), n.indexOf(":") === -1 || n.includes("[") || n.includes("]")))
      return null;
  } else if (i)
    return null;
  if (!n || n.charAt(n.length - 1) === ".")
    return null;
  const s = n.indexOf(":") !== -1;
  if (s)
    try {
      n = new URL(`http://[${n}]/`).hostname.slice(1, -1);
    } catch {
      return null;
    }
  else if (n = fs(n), !hs(n))
    return null;
  return { normalized: xs(n), wasIPv6: s };
}, dl = /^(.+)\/(0|[1-9]\d{0,2})$/, ml = (e) => {
  if (e.indexOf("/") === -1)
    return;
  const n = dl.exec(e);
  if (!n)
    return null;
  let t = Number(n[2]);
  const a = ul(n[1]);
  if (!a)
    return null;
  const { normalized: i, wasIPv6: s } = a;
  if (s && i.indexOf(":") === -1) {
    if (t < 96)
      return null;
    t -= 96;
  }
  const o = vs(i);
  return !o || t > o.length * 8 ? null : { bytes: o, prefix: t };
}, fl = (e, n, t) => {
  const a = t >> 3;
  for (let s = 0; s < a; s++)
    if (e[s] !== n[s])
      return !1;
  const i = t & 7;
  if (i) {
    const s = 255 << 8 - i & 255;
    if ((e[a] & s) !== (n[a] & s))
      return !1;
  }
  return !0;
};
function xl(e) {
  let n;
  try {
    n = new URL(e);
  } catch {
    return !1;
  }
  const t = (process.env.no_proxy || process.env.NO_PROXY || "").toLowerCase();
  if (!t)
    return !1;
  if (t === "*")
    return !0;
  const a = Number.parseInt(n.port, 10) || il[n.protocol.split(":", 1)[0]] || 0, i = Gi(n.hostname.toLowerCase()), s = vs(i);
  return t.split(/[\s,]+/).some((o) => {
    if (!o)
      return !1;
    if (o === "*")
      return !0;
    const r = ml(o);
    if (r !== void 0)
      return r !== null && !!s && s.length === r.bytes.length && fl(s, r.bytes, r.prefix);
    let [c, f] = ol(o);
    return c = Gi(c), !c || f && f !== a ? !1 : (c.charAt(0) === "*" && (c = c.slice(1)), c.charAt(0) === "." ? i.endsWith(c) : i === c || Vi(i) && Vi(c));
  });
}
function hl(e, n) {
  e = e || 10;
  const t = new Array(e), a = new Array(e);
  let i = 0, s = 0, o;
  return n = n !== void 0 ? n : 1e3, function(c) {
    const f = Date.now(), l = a[s];
    o || (o = f), t[i] = c, a[i] = f;
    let p = s, x = 0;
    for (; p !== i; )
      x += t[p++], p = p % e;
    if (i = (i + 1) % e, i === s && (s = (s + 1) % e), f - o < n)
      return;
    const v = l && f - l;
    return v ? Math.round(x * 1e3 / v) : void 0;
  };
}
function vl(e, n) {
  let t = 0, a = 1e3 / n, i, s;
  const o = (l, p = Date.now()) => {
    t = p, i = null, s && (clearTimeout(s), s = null), e(...l);
  };
  return [(...l) => {
    const p = Date.now(), x = p - t;
    x >= a ? o(l, p) : (i = l, s || (s = setTimeout(() => {
      s = null, o(i);
    }, a - x)));
  }, () => i && o(i), (...l) => o(l)];
}
const Ne = (e, n, t = 3) => {
  let a = 0;
  const i = hl(50, 250);
  return vl((s) => {
    if (!s || !d.isNumber(s.loaded))
      return;
    const o = s.loaded, r = s.lengthComputable ? s.total : void 0, c = Math.max(0, r != null ? Math.min(o, r) : o), f = Math.max(0, c - a), l = i(f);
    a = Math.max(a, c);
    const p = {
      loaded: c,
      total: r,
      progress: r ? c / r : void 0,
      bytes: f,
      rate: l || void 0,
      estimated: l && r ? (r - c) / l : void 0,
      event: s,
      lengthComputable: r != null,
      [n ? "download" : "upload"]: !0
    };
    e(p);
  }, t);
}, On = (e, n) => {
  const t = e != null;
  return [
    (a) => n[0]({
      lengthComputable: t,
      total: e,
      loaded: a
    }),
    n[1]
  ];
}, kn = (e, n = d.asap) => (...t) => n(() => e(...t)), Ki = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, bs = (e, n, t) => n + 2 < t && Ki(e.charCodeAt(n + 1)) && Ki(e.charCodeAt(n + 2)), Ji = (e) => e <= 57 ? e - 48 : (e & 223) - 55, bl = (e) => e >= 65 && e <= 90 || // A-Z
e >= 97 && e <= 122 || // a-z
e >= 48 && e <= 57 || // 0-9
e === 43 || // +
e === 47 || // /
e === 45 || // - (base64url)
e === 95, gl = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32, yl = (e) => {
  const n = Math.floor(e / 4), t = e % 4;
  return n * 3 + (t === 2 ? 1 : t === 3 ? 2 : 0);
}, gs = (e) => {
  const n = e.length;
  let t = 0;
  return n > 0 && e.charCodeAt(n - 1) === 61 && (t++, n > 1 && e.charCodeAt(n - 2) === 61 && t++), Math.floor((n - t) * 3 / 4);
}, wl = (e) => {
  const n = e.length;
  let t = 0, a = 0, i = !1;
  for (let s = 0; s < n; s++) {
    let o = e.charCodeAt(s);
    if (o === 37 && bs(e, s, n) && (o = Ji(e.charCodeAt(s + 1)) * 16 + Ji(e.charCodeAt(s + 2)), s += 2), !gl(o)) {
      if (o === 61) {
        a++;
        continue;
      }
      if (!bl(o) || a > 0) {
        i = !0;
        continue;
      }
      t++;
    }
  }
  return i || a > 2 || a > 0 && (t + a) % 4 !== 0 || t % 4 === 1 ? gs(e) : yl(t);
}, ys = (e, n) => {
  if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
  const t = e.indexOf(",");
  if (t < 0) return 0;
  const a = e.slice(5, t), i = e.slice(t + 1);
  if (/;base64/i.test(a))
    return n(i);
  let o = 0;
  for (let r = 0, c = i.length; r < c; r++) {
    const f = i.charCodeAt(r);
    if (f === 37 && bs(i, r, c))
      o += 1, r += 2;
    else if (f < 128)
      o += 1;
    else if (f < 2048)
      o += 2;
    else if (f >= 55296 && f <= 56319 && r + 1 < c) {
      const l = i.charCodeAt(r + 1);
      l >= 56320 && l <= 57343 ? (o += 4, r++) : o += 3;
    } else
      o += 3;
  }
  return o;
};
function Rl(e) {
  const n = typeof e == "string" ? e.indexOf("#") : -1;
  return ys(
    n === -1 ? e : e.slice(0, n),
    wl
  );
}
function El(e) {
  return ys(e, gs);
}
const Xi = {
  flush: ye.constants.Z_SYNC_FLUSH,
  finishFlush: ye.constants.Z_SYNC_FLUSH
}, _l = {
  flush: ye.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: ye.constants.BROTLI_OPERATION_FLUSH
}, Sl = {
  flush: ye.constants.ZSTD_e_flush,
  finishFlush: ye.constants.ZSTD_e_flush
}, ws = d.isFunction(ye.createBrotliDecompress), Rs = d.isFunction(ye.createZstdDecompress), Es = "gzip, compress, deflate" + (ws ? ", br" : ""), Ol = Es + (Rs ? ", zstd" : ""), Yi = typeof process < "u" && process.nextTick ? process.nextTick.bind(process) : d.asap, { http: kl, https: Al } = Mp, fa = /https:?/, Zi = Symbol("axios.http.socketListener"), Rn = Symbol("axios.http.currentReq");
function Tl(e) {
  const n = this[Rn];
  n && !n.destroyed && n.destroy(e);
}
const _s = Symbol("axios.http.installedTunnel"), Pl = /* @__PURE__ */ new Map(), Qi = /* @__PURE__ */ new WeakMap(), eo = {
  22: 21,
  24: 5
};
function Cl(e = process.versions && process.versions.node) {
  if (!e)
    return !1;
  const [n, t] = e.split(".").map((a) => Number(a));
  return !Number.isInteger(n) || !Number.isInteger(t) ? !1 : n > 24 ? !0 : eo[n] != null && t >= eo[n];
}
function no(e, n = process.versions && process.versions.node) {
  if (!Cl(n))
    return !1;
  const t = e && e.options;
  return !!(t && d.hasOwnProp(t, "proxyEnv") && t.proxyEnv != null);
}
function jl(e, n, t) {
  return fa.test(e.protocol) ? t || Tn.globalAgent : n || An.globalAgent;
}
function Fl(e, n) {
  const t = e.protocol + "//" + e.hostname + ":" + (e.port || "") + "#" + (e.auth || ""), a = n ? Qi.get(n) || Qi.set(n, /* @__PURE__ */ new Map()).get(n) : Pl;
  let i = a.get(t);
  if (i) return i;
  const s = n && n.options ? { ...n.options, ...e } : e;
  if (i = new ps(s), n && n.options) {
    const o = { ...n.options }, r = i.callback;
    i.callback = function(f, l) {
      return r.call(this, f, { ...o, ...l });
    };
  }
  return i[_s] = !0, a.set(t, i), i;
}
const to = Q.protocols.map((e) => e + ":"), ao = (e) => {
  if (!d.isString(e))
    return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}, io = (e, [n, t]) => (e.on("end", t).on("error", t), n), ql = new Qp();
function Ll(e, n, t) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.auth && e.beforeRedirects.auth(e), e.beforeRedirects.sensitiveHeaders && e.beforeRedirects.sensitiveHeaders(e, t), e.beforeRedirects.config && e.beforeRedirects.config(e, n, t);
}
function Ul(e, n) {
  e && Object.keys(e).forEach((t) => {
    n.has(t.toLowerCase()) && delete e[t];
  });
}
function Dl(e, n) {
  if (!n)
    return !1;
  try {
    return new URL(n.url).origin === new URL(e.href).origin;
  } catch {
    return !1;
  }
}
function Ss(e, n, t, a, i, s, o = !0) {
  let r = n;
  const c = jl(e, s, i);
  if (!r && r !== !1 && o && !no(c)) {
    const f = kp(t);
    f && (xl(t) || (r = new URL(f)));
  }
  if (a && e.headers)
    for (const f of Object.keys(e.headers))
      f.toLowerCase() === "proxy-authorization" && delete e.headers[f];
  if (a && e.agent && e.agent[_s] && (e.agent = void 0), r) {
    const f = r instanceof URL, l = (b) => f || d.hasOwnProp(r, b) ? r[b] : void 0, p = l("username"), x = l("password");
    let v = d.hasOwnProp(r, "auth") ? r.auth : void 0;
    if (p && (v = (p || "") + ":" + (x || "")), v) {
      const b = typeof v == "object", h = b && d.hasOwnProp(v, "username") ? v.username : void 0, u = b && d.hasOwnProp(v, "password") ? v.password : void 0;
      if (!!(h || u))
        v = (h || "") + ":" + (u || "");
      else if (b)
        throw new y("Invalid proxy authorization", y.ERR_BAD_OPTION, { proxy: r });
    }
    if (fa.test(e.protocol)) {
      if (!(i instanceof ps)) {
        const b = l("hostname") || l("host"), h = l("port"), u = l("protocol"), m = u ? u.includes(":") ? u : `${u}:` : "http:", R = b && b.includes(":") && !b.startsWith("[") ? `[${b}]` : b, _ = new URL(
          `${m}//${R}${h ? ":" + h : ""}`
        ), O = {
          protocol: _.protocol,
          hostname: _.hostname.replace(/^\[|\]$/g, ""),
          port: _.port,
          auth: v && typeof v == "string" ? v : void 0
        };
        _.protocol === "https:" && (O.ALPNProtocols = ["http/1.1"]);
        const j = Fl(O, i);
        e.agent = j, e.agents && (e.agents.https = j);
      }
    } else {
      if (v) {
        const m = Buffer.from(v, "utf8").toString("base64");
        e.headers["Proxy-Authorization"] = "Basic " + m;
      }
      let b = !1;
      for (const m of Object.keys(e.headers))
        if (m.toLowerCase() === "host") {
          b = !0;
          break;
        }
      b || (e.headers.host = e.hostname + (e.port ? ":" + e.port : ""));
      const h = l("hostname") || l("host");
      e.hostname = h, e.host = h, e.port = l("port"), e.path = t;
      const u = l("protocol");
      u && (e.protocol = u.includes(":") ? u : `${u}:`);
    }
  }
  return e.beforeRedirects.proxy = function(l) {
    Ss(
      l,
      n,
      l.href,
      !0,
      i,
      s,
      o
    );
  }, !!(r || n !== !1 && o && no(c));
}
const Bl = typeof process < "u" && d.kindOf(process) === "process", Nl = (e) => new Promise((n, t) => {
  let a, i;
  const s = (c, f) => {
    i || (i = !0, a && a(c, f));
  }, o = (c) => {
    s(c), n(c);
  }, r = (c) => {
    s(c, !0), t(c);
  };
  e(o, r, (c) => a = c).catch(r);
}), Il = ({ address: e, family: n }) => {
  if (!d.isString(e))
    throw new y("address must be a string", y.ERR_BAD_OPTION_VALUE);
  return {
    address: e,
    family: n || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, oo = (e, n) => Il(d.isObject(e) ? e : { address: e, family: n }), so = /* @__PURE__ */ new WeakMap(), zl = (e) => {
  let n = so.get(e);
  if (n)
    return n;
  const t = el(e, (a) => d.isArray(a) ? a : [a]);
  return n = (a, i, s) => {
    t(a, i, (o, r, c) => {
      if (o)
        return s(o);
      let f;
      try {
        f = d.isArray(r) ? r.map((l) => oo(l)) : [oo(r, c)];
      } catch (l) {
        return s(l);
      }
      i.all ? s(o, f) : s(o, f[0].address, f[0].family);
    });
  }, so.set(e, n), n;
}, $l = {
  request(e, n) {
    const t = e.protocol + "//" + e.hostname + ":" + (e.port || (e.protocol === "https:" ? 443 : 80)), { http2Options: a, headers: i } = e, s = ql.getSession(t, a), { HTTP2_HEADER_SCHEME: o, HTTP2_HEADER_METHOD: r, HTTP2_HEADER_PATH: c, HTTP2_HEADER_STATUS: f } = So.constants, l = {
      [o]: e.protocol.replace(":", ""),
      [r]: e.method,
      [c]: e.path
    };
    d.forEach(i, (x, v) => {
      v.charAt(0) !== ":" && (l[v] = x);
    });
    const p = s.request(l);
    return p.once("response", (x) => {
      const v = p;
      x = Object.assign({}, x);
      const w = x[f];
      delete x[f], v.headers = x, v.statusCode = +w, n(v);
    }), p;
  }
}, Ml = Bl && function(n) {
  return Nl(async function(a, i, s) {
    const o = (T) => d.getSafeProp(n, T), r = o("transitional") || qn;
    let c = o("data"), f = o("lookup"), l = o("family"), p = o("httpVersion");
    p === void 0 && (p = 1);
    const x = p;
    let v = o("http2Options");
    const w = o("httpAgent"), b = o("httpsAgent"), h = o("proxy"), u = o("responseType"), m = o("responseEncoding"), R = o("socketPath"), _ = o("method").toUpperCase(), O = o("maxRedirects"), j = o("maxBodyLength"), k = o("maxContentLength"), $ = o("decompress");
    let V, G = !1, q, ae;
    try {
      p = +p;
    } catch {
      throw new y(
        "Invalid protocol version: value is not a number",
        y.ERR_BAD_OPTION_VALUE,
        n
      );
    }
    if (Number.isNaN(p))
      throw new y(
        `Invalid protocol version: '${x}' is not a number`,
        y.ERR_BAD_OPTION_VALUE,
        n
      );
    if (p !== 1 && p !== 2)
      throw new y(
        `Unsupported protocol version '${p}'`,
        y.ERR_BAD_OPTION_VALUE,
        n
      );
    const be = p === 2;
    f && (f = zl(f));
    const M = new Zs();
    function W(T) {
      try {
        M.emit(
          "abort",
          !T || T.type ? new je(null, n, q) : T
        );
      } catch {
      }
    }
    function Re() {
      ae && (clearTimeout(ae), ae = null);
    }
    function ge() {
      const T = o("timeout");
      let A = T ? "timeout of " + T + "ms exceeded" : "timeout exceeded";
      const I = o("timeoutErrorMessage");
      return I && (A = I), new y(
        A,
        r.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
        n,
        q
      );
    }
    M.once("abort", i);
    const me = () => {
      Re(), n.cancelToken && n.cancelToken.unsubscribe(W), n.signal && n.signal.removeEventListener("abort", W), M.removeAllListeners();
    };
    (n.cancelToken || n.signal) && (n.cancelToken && n.cancelToken.subscribe(W), n.signal && (n.signal.aborted ? W() : n.signal.addEventListener("abort", W))), s((T, A) => {
      if (V = !0, Re(), A) {
        G = !0, me();
        return;
      }
      const { data: I } = T;
      if (I instanceof ue.Readable || I instanceof ue.Duplex) {
        const ne = ue.finished(I, () => {
          ne(), me();
        });
      } else
        me();
    });
    const g = ma(o("baseURL"), o("url"), o("allowAbsoluteUrls"), n), S = R ? "http://localhost" : Q.hasBrowserEnv ? Q.origin : void 0, E = new URL(g, S), P = E.protocol || to[0];
    if (P === "data:") {
      if (k > -1) {
        const A = String(o("url") || g || "");
        if (El(A) > k)
          return i(
            new y(
              "maxContentLength size of " + k + " exceeded",
              y.ERR_BAD_RESPONSE,
              n
            )
          );
      }
      let T;
      if (_ !== "GET")
        return Be(a, i, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: n
        });
      try {
        T = Wp(o("url"), u === "blob", {
          Blob: n.env && n.env.Blob
        });
      } catch (A) {
        throw y.from(A, y.ERR_BAD_REQUEST, n);
      }
      return u === "text" ? (T = T.toString(m), (!m || m === "utf8") && (T = d.stripBOM(T))) : u === "stream" && (T = ue.Readable.from(T)), Be(a, i, {
        data: T,
        status: 200,
        statusText: "OK",
        headers: new oe(),
        config: n
      });
    }
    if (to.indexOf(P) === -1)
      return i(
        new y("Unsupported protocol " + P, y.ERR_BAD_REQUEST, n)
      );
    const F = oe.from(n.headers).normalize();
    F.set("User-Agent", "axios/" + tn, !1);
    const { onUploadProgress: J, onDownloadProgress: X } = n, se = n.maxRate;
    let D, N;
    if (d.isSpecCompliantForm(c)) {
      const T = F.getContentType(/boundary=([-_\w\d]{10,70})/i);
      c = Yp(
        c,
        (A) => {
          F.set(A);
        },
        {
          tag: `axios-${tn}-boundary`,
          boundary: T && T[1] || void 0
        }
      );
    } else if (d.isFormData(c) && d.isFunction(c.getHeaders) && c.getHeaders !== Object.prototype.getHeaders) {
      if (ls(F, c.getHeaders(), o("formDataHeaderPolicy")), !F.hasContentLength())
        try {
          const T = await qe.promisify(c.getLength).call(c);
          Number.isFinite(T) && T >= 0 && F.setContentLength(T);
        } catch {
        }
    } else if (d.isBlob(c) || d.isFile(c))
      c.size && F.setContentType(c.type || "application/octet-stream"), F.setContentLength(c.size || 0), c = ue.Readable.from(us(c));
    else if (c && !d.isStream(c)) {
      if (!Buffer.isBuffer(c)) if (d.isArrayBuffer(c))
        c = Buffer.from(new Uint8Array(c));
      else if (d.isString(c))
        c = Buffer.from(c, "utf-8");
      else
        return i(
          new y(
            "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
            y.ERR_BAD_REQUEST,
            n
          )
        );
      if (F.setContentLength(c.length, !1), j > -1 && c.length > j)
        return i(
          new y(
            "Request body larger than maxBodyLength limit",
            y.ERR_BAD_REQUEST,
            n
          )
        );
    }
    const U = d.toFiniteNumber(F.getContentLength());
    d.isArray(se) ? (D = se[0], N = se[1]) : D = N = se, c && (J || D) && (d.isStream(c) || (c = ue.Readable.from(c, { objectMode: !1 })), c = ue.pipeline(
      [
        c,
        new Hi({
          maxRate: d.toFiniteNumber(D)
        })
      ],
      d.noop
    ), J && c.on(
      "progress",
      io(
        c,
        On(
          U,
          Ne(kn(J, Yi), !1, 3)
        )
      )
    ));
    let B;
    const Y = o("auth");
    if (Y) {
      const T = d.getSafeProp(Y, "username") || "", A = d.getSafeProp(Y, "password") || "";
      B = T + ":" + A;
    }
    if (!B && (E.username || E.password)) {
      const T = ao(E.username), A = ao(E.password);
      B = T + ":" + A;
    }
    B && F.delete("authorization");
    let H;
    try {
      H = ua(
        E.pathname + E.search,
        o("params"),
        o("paramsSerializer")
      ).replace(/^\?/, "");
    } catch (T) {
      return i(
        y.from(T, y.ERR_BAD_REQUEST, n, null, null, {
          url: o("url"),
          exists: !0
        })
      );
    }
    F.set(
      "Accept-Encoding",
      d.hasOwnProp(r, "advertiseZstdAcceptEncoding") && r.advertiseZstdAcceptEncoding === !0 ? Ol : Es,
      !1
    ), be && f && (v = Object.assign(/* @__PURE__ */ Object.create(null), v, { lookup: f }));
    const L = Object.assign(/* @__PURE__ */ Object.create(null), {
      path: H,
      method: _,
      headers: ra(F),
      agents: { http: w, https: b },
      auth: B,
      protocol: P,
      family: l,
      beforeRedirect: Ll,
      beforeRedirects: /* @__PURE__ */ Object.create(null),
      http2Options: v,
      createConnection: void 0
    });
    !d.isUndefined(f) && (L.lookup = f);
    let ee = !1;
    if (R) {
      if (typeof R != "string")
        return i(
          new y("socketPath must be a string", y.ERR_BAD_OPTION_VALUE, n)
        );
      const T = o("allowedSocketPaths");
      if (T != null) {
        const A = Array.isArray(T) ? T : [T], I = ba(R);
        if (!A.some(
          (z) => typeof z == "string" && ba(z) === I
        ))
          return i(
            new y(
              `socketPath "${R}" is not permitted by allowedSocketPaths`,
              y.ERR_BAD_OPTION_VALUE,
              n
            )
          );
      }
      L.socketPath = R;
    } else
      L.hostname = E.hostname.startsWith("[") ? E.hostname.slice(1, -1) : E.hostname, L.port = E.port, ee = Ss(
        L,
        h,
        P + "//" + E.hostname + (E.port ? ":" + E.port : "") + L.path,
        !1,
        b,
        w,
        // The HTTP/2 transport connects independently of HTTP/1 agents, so it
        // cannot apply either axios-resolved or agent-local environment proxies.
        // Explicit proxy config is still processed and rejected below.
        !be
      );
    let fe, te = !1, ce = !1;
    const C = fa.test(L.protocol);
    if (L.agent == null && (L.agent = C ? b : w), be) {
      if (ee)
        return i(
          new y(
            "HTTP/2 requests with a proxy are not supported",
            y.ERR_NOT_SUPPORT,
            n
          )
        );
      fe = $l;
    } else {
      const T = o("transport");
      if (T)
        fe = T;
      else if (O === 0)
        fe = C ? Tn : An, te = !0;
      else {
        ce = !0, L.sensitiveHeaders = [], O && (L.maxRedirects = O);
        const A = o("beforeRedirect");
        if (A && (L.beforeRedirects.config = A), B) {
          const ne = E.origin, z = B;
          L.beforeRedirects.auth = function(he) {
            try {
              new URL(he.href).origin === ne && (he.auth = z);
            } catch {
            }
          };
        }
        const I = o("sensitiveHeaders");
        if (I != null) {
          if (!d.isArray(I))
            return i(
              new y(
                "sensitiveHeaders must be an array of strings",
                y.ERR_BAD_OPTION_VALUE,
                n
              )
            );
          const ne = /* @__PURE__ */ new Set();
          for (const z of I) {
            if (!d.isString(z))
              return i(
                new y(
                  "sensitiveHeaders must be an array of strings",
                  y.ERR_BAD_OPTION_VALUE,
                  n
                )
              );
            ne.add(z.toLowerCase());
          }
          ne.size && (L.sensitiveHeaders = Array.from(ne), L.beforeRedirects.sensitiveHeaders = function(xe, he) {
            Dl(xe, he) || Ul(xe.headers, ne);
          });
        }
        fe = C ? Al : kl;
      }
    }
    j > -1 ? L.maxBodyLength = j : L.maxBodyLength = 1 / 0, L.insecureHTTPParser = !!o("insecureHTTPParser"), q = fe.request(L, function(A) {
      if (Re(), q.destroyed) return;
      const I = [A], ne = d.toFiniteNumber(A.headers["content-length"]);
      if (X || N) {
        const pe = new Hi({
          maxRate: d.toFiniteNumber(N)
        });
        X && pe.on(
          "progress",
          io(
            pe,
            On(
              ne,
              Ne(
                kn(X, Yi),
                !0,
                3
              )
            )
          )
        ), I.push(pe);
      }
      let z = A;
      const xe = A.req || q;
      if ($ !== !1 && A.headers["content-encoding"])
        switch ((_ === "HEAD" || A.statusCode === 204) && delete A.headers["content-encoding"], (A.headers["content-encoding"] || "").toLowerCase()) {
          /*eslint default-case:0*/
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            I.push(ye.createUnzip(Xi)), delete A.headers["content-encoding"];
            break;
          case "deflate":
            I.push(new Zp()), I.push(ye.createUnzip(Xi)), delete A.headers["content-encoding"];
            break;
          case "br":
            ws && (I.push(ye.createBrotliDecompress(_l)), delete A.headers["content-encoding"]);
            break;
          case "zstd":
            Rs && (I.push(ye.createZstdDecompress(Sl)), delete A.headers["content-encoding"]);
            break;
        }
      z = I.length > 1 ? ue.pipeline(I, d.noop) : I[0];
      const he = {
        status: A.statusCode,
        statusText: A.statusMessage,
        headers: new oe(A.headers),
        config: n,
        request: xe
      };
      if (u === "stream") {
        if (k > -1) {
          const pe = k, pn = z;
          async function* Me() {
            let re = 0;
            for await (const ha of pn) {
              if (re += ha.length, re > pe)
                throw new y(
                  "maxContentLength size of " + pe + " exceeded",
                  y.ERR_BAD_RESPONSE,
                  n,
                  xe
                );
              yield ha;
            }
          }
          z = ue.Readable.from(Me(), {
            objectMode: !1
          });
        }
        he.data = z, Be(a, i, he);
      } else {
        const pe = [];
        let pn = 0;
        z.on("data", function(re) {
          pe.push(re), pn += re.length, k > -1 && pn > k && (G = !0, z.destroy(), W(
            new y(
              "maxContentLength size of " + k + " exceeded",
              y.ERR_BAD_RESPONSE,
              n,
              xe
            )
          ));
        }), z.on("aborted", function() {
          if (G)
            return;
          const re = new y(
            "stream has been aborted",
            y.ERR_BAD_RESPONSE,
            n,
            xe,
            he
          );
          z.destroy(re), i(re);
        }), z.on("error", function(re) {
          G || i(y.from(re, null, n, xe, he));
        }), z.on("end", function() {
          try {
            let re = pe.length === 1 ? pe[0] : Buffer.concat(pe);
            u !== "arraybuffer" && (re = re.toString(m), (!m || m === "utf8") && (re = d.stripBOM(re))), he.data = re;
          } catch (re) {
            return i(y.from(re, null, n, he.request, he));
          }
          Be(a, i, he);
        });
      }
      M.once("abort", (pe) => {
        z.destroyed || (z.emit("error", pe), z.destroy());
      });
    }), M.once("abort", (T) => {
      q.close ? q.close() : q.destroy(T);
    }), q.on("error", function(A) {
      i(y.from(A, null, n, q));
    });
    const Z = /* @__PURE__ */ new Set();
    if (q.on("socket", function(A) {
      typeof A.setKeepAlive == "function" && A.setKeepAlive(!0, 1e3 * 60), A[Zi] || (A.on("error", Tl), A[Zi] = !0), A[Rn] = q, Z.add(A);
    }), q.once("close", function() {
      Re();
      for (const A of Z)
        A[Rn] === q && (A[Rn] = null);
      Z.clear();
    }), o("timeout")) {
      const T = parseInt(o("timeout"), 10);
      if (Number.isNaN(T)) {
        W(
          new y(
            "error trying to parse `config.timeout` to int",
            y.ERR_BAD_OPTION_VALUE,
            n,
            q
          )
        );
        return;
      }
      const A = function() {
        V || W(ge());
      };
      te && T > 0 && (ae = setTimeout(A, T)), q.setTimeout(T, A);
    } else
      q.setTimeout(0);
    if (d.isStream(c)) {
      let T = !1, A = !1;
      c.on("end", () => {
        T = !0;
      }), c.once("error", (ne) => {
        A = !0, q.destroy(ne);
      }), c.on("close", () => {
        !T && !A && W(new je("Request stream has been aborted", n, q));
      });
      let I = c;
      if (j > -1 && !ce) {
        const ne = j;
        let z = 0;
        I = ue.pipeline(
          [
            c,
            new ue.Transform({
              transform(xe, he, pe) {
                if (z += xe.length, z > ne)
                  return pe(
                    new y(
                      "Request body larger than maxBodyLength limit",
                      y.ERR_BAD_REQUEST,
                      n,
                      q
                    )
                  );
                pe(null, xe);
              }
            })
          ],
          d.noop
        ), I.on("error", (xe) => {
          q.destroyed || q.destroy(xe);
        });
      }
      I.pipe(q);
    } else
      c && q.write(c), q.end();
  });
}, Hl = Q.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, n) => (t) => (t = new URL(t, Q.origin), e.protocol === t.protocol && e.host === t.host && (n || e.port === t.port)))(
  new URL(Q.origin),
  Q.navigator && /(msie|trident)/i.test(Q.navigator.userAgent)
) : () => !0, Wl = Q.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, n, t, a, i, s, o) {
      if (typeof document > "u") return;
      const r = [`${e}=${encodeURIComponent(n)}`];
      d.isNumber(t) && r.push(`expires=${new Date(t).toUTCString()}`), d.isString(a) && r.push(`path=${a}`), d.isString(i) && r.push(`domain=${i}`), s === !0 && r.push("secure"), d.isString(o) && r.push(`SameSite=${o}`), document.cookie = r.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const n = document.cookie.split(";");
      for (let t = 0; t < n.length; t++) {
        const a = n[t].replace(/^\s+/, ""), i = a.indexOf("=");
        if (i !== -1 && a.slice(0, i) === e)
          try {
            return decodeURIComponent(a.slice(i + 1));
          } catch {
            return a.slice(i + 1);
          }
      }
      return null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), ro = (e) => e instanceof oe ? { ...e } : e, Vl = (e) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e).concat(
  Object.getOwnPropertySymbols(e).filter(
    (n) => Object.getOwnPropertyDescriptor(e, n).enumerable
  )
) : Object.keys(e);
function Fe(e, n) {
  e = e || {}, n = n || {};
  const t = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(t, "hasOwnProperty", {
    // Null-proto descriptor so a polluted Object.prototype.get cannot turn
    // this data descriptor into an accessor descriptor on the way in.
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
  function a(l, p, x, v) {
    return d.isPlainObject(l) && d.isPlainObject(p) ? d.merge.call({ caseless: v }, l, p) : d.isPlainObject(p) ? d.merge({}, p) : d.isArray(p) ? p.slice() : p;
  }
  function i(l, p, x, v) {
    if (d.isUndefined(p)) {
      if (!d.isUndefined(l))
        return a(void 0, l, x, v);
    } else return a(l, p, x, v);
  }
  function s(l, p) {
    if (!d.isUndefined(p))
      return a(void 0, p);
  }
  function o(l, p) {
    if (d.isUndefined(p)) {
      if (!d.isUndefined(l))
        return a(void 0, l);
    } else return a(void 0, p);
  }
  function r(l) {
    const p = d.hasOwnProp(n, "transitional") ? n.transitional : void 0;
    if (!d.isUndefined(p))
      if (d.isPlainObject(p)) {
        if (d.hasOwnProp(p, l))
          return p[l];
      } else
        return;
    const x = d.hasOwnProp(e, "transitional") ? e.transitional : void 0;
    if (d.isPlainObject(x) && d.hasOwnProp(x, l))
      return x[l];
  }
  function c(l, p, x) {
    if (d.hasOwnProp(n, x))
      return a(l, p);
    if (d.hasOwnProp(e, x))
      return a(void 0, l);
  }
  const f = {
    url: s,
    method: s,
    data: s,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutErrorMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    allowedSocketPaths: o,
    responseEncoding: o,
    validateStatus: c,
    headers: (l, p, x) => i(ro(l), ro(p), x, !0)
  };
  return d.forEach(Vl({ ...e, ...n }), function(p) {
    if (p === "__proto__" || p === "constructor" || p === "prototype") return;
    const x = d.hasOwnProp(f, p) ? f[p] : i, v = d.hasOwnProp(e, p) ? e[p] : void 0, w = d.hasOwnProp(n, p) ? n[p] : void 0, b = x(v, w, p);
    d.isUndefined(b) && x !== c || (t[p] = b);
  }), d.hasOwnProp(n, "validateStatus") && d.isUndefined(n.validateStatus) && r("validateStatusUndefinedResolves") === !1 && (d.hasOwnProp(e, "validateStatus") ? t.validateStatus = a(void 0, e.validateStatus) : delete t.validateStatus), t;
}
const Gl = (e) => encodeURIComponent(e).replace(
  /%([0-9A-F]{2})/gi,
  (n, t) => String.fromCharCode(parseInt(t, 16))
);
function Os(e) {
  const n = Fe({}, e), t = (x) => d.hasOwnProp(n, x) ? n[x] : void 0, a = t("data");
  let i = t("withXSRFToken");
  const s = t("xsrfHeaderName"), o = t("xsrfCookieName");
  let r = t("headers");
  const c = t("auth"), f = t("baseURL"), l = t("allowAbsoluteUrls"), p = t("url");
  if (n.headers = r = oe.from(r), n.url = ua(
    ma(f, p, l, n),
    t("params"),
    t("paramsSerializer")
  ), c) {
    const x = d.getSafeProp(c, "username") || "", v = d.getSafeProp(c, "password") || "";
    try {
      r.set(
        "Authorization",
        "Basic " + btoa(x + ":" + (v ? Gl(v) : ""))
      );
    } catch (w) {
      throw y.from(w, y.ERR_BAD_OPTION_VALUE, e);
    }
  }
  if (d.isFormData(a)) {
    const x = d.getSafeProp(a, "getHeaders");
    Q.hasStandardBrowserEnv || Q.hasStandardBrowserWebWorkerEnv || d.isReactNative(a) ? r.setContentType(void 0) : d.isFunction(x) && ls(r, x.call(a), t("formDataHeaderPolicy"));
  }
  if (Q.hasStandardBrowserEnv && (d.isFunction(i) && (i = i(n)), i === !0 || i == null && Hl(n.url))) {
    const v = s && o && Wl.read(o);
    v && r.set(s, v);
  }
  return n;
}
const Kl = typeof XMLHttpRequest < "u", Jl = Kl && function(e) {
  return new Promise(function(t, a) {
    const i = Os(e);
    let s = i.data;
    const o = oe.from(i.headers).normalize();
    let { responseType: r, onUploadProgress: c, onDownloadProgress: f } = i, l, p, x, v, w, b;
    function h() {
      v && v(), w && w(), i.cancelToken && i.cancelToken.unsubscribe(l), i.signal && i.signal.removeEventListener("abort", l);
    }
    let u = new XMLHttpRequest();
    u.open(i.method.toUpperCase(), i.url, !0), u.timeout = i.timeout;
    function m(_) {
      if (!u)
        return;
      if (u.status === 0 && (wn(rs(i.url)) || wn(Q.origin)) !== "file" && !(u.responseURL && u.responseURL.startsWith("file:"))) {
        a(new y("Request aborted", y.ECONNABORTED, e, u)), h(), u = null;
        return;
      }
      try {
        _ ? b && b(_) : w && w();
      } catch ($) {
        setTimeout(() => {
          throw $;
        });
      }
      if (!u)
        return;
      const O = oe.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), k = {
        data: !r || r === "text" || r === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: O,
        config: e,
        request: u
      };
      Be(
        function(V) {
          t(V), h();
        },
        function(V) {
          a(V), h();
        },
        k
      ), u = null;
    }
    "onloadend" in u ? u.onloadend = m : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.startsWith("file:")) || setTimeout(m);
    }, u.onabort = function() {
      u && (a(new y("Request aborted", y.ECONNABORTED, e, u)), h(), u = null);
    }, u.onerror = function(O) {
      const j = O && O.message ? O.message : "Network Error", k = new y(j, y.ERR_NETWORK, e, u);
      k.event = O || null, a(k), h(), u = null;
    }, u.ontimeout = function() {
      let O = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const j = i.transitional || qn;
      i.timeoutErrorMessage && (O = i.timeoutErrorMessage), a(
        new y(
          O,
          j.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
          e,
          u
        )
      ), h(), u = null;
    }, s === void 0 && o.setContentType(null), "setRequestHeader" in u && d.forEach(ra(o), function(O, j) {
      u.setRequestHeader(j, O);
    }), d.isUndefined(i.withCredentials) || (u.withCredentials = !!i.withCredentials), r && r !== "json" && (u.responseType = i.responseType), f && ([x, w, b] = Ne(
      f,
      !0
    ), u.addEventListener("progress", x)), c && u.upload && ([p, v] = Ne(c), u.upload.addEventListener("progress", p), u.upload.addEventListener("loadend", v)), (i.cancelToken || i.signal) && (l = (_) => {
      u && (a(!_ || _.type ? new je(null, e, u) : _), u.abort(), h(), u = null);
    }, i.cancelToken && i.cancelToken.subscribe(l), i.signal && (i.signal.aborted ? l() : i.signal.addEventListener("abort", l)));
    const R = wn(i.url);
    if (R && !Q.protocols.includes(R)) {
      a(
        new y(
          "Unsupported protocol " + R + ":",
          y.ERR_BAD_REQUEST,
          e
        )
      ), h();
      return;
    }
    u.send(s || null);
  });
}, Xl = (e, n) => {
  if (e = e ? e.filter(Boolean) : [], !n && !e.length)
    return;
  const t = new AbortController();
  let a = !1;
  const i = function(c) {
    if (!a) {
      a = !0, o();
      const f = c instanceof Error ? c : this.reason;
      t.abort(
        f instanceof y ? f : new je(f instanceof Error ? f.message : f)
      );
    }
  };
  let s = n && setTimeout(() => {
    s = null, i(new y(`timeout of ${n}ms exceeded`, y.ETIMEDOUT));
  }, n);
  const o = () => {
    e && (s && clearTimeout(s), s = null, e.forEach((c) => {
      c.unsubscribe ? c.unsubscribe(i) : c.removeEventListener("abort", i);
    }), e = null);
  };
  e.forEach((c) => {
    if (!a) {
      if (c.aborted) {
        i.call(c);
        return;
      }
      c.addEventListener("abort", i, { once: !0 });
    }
  });
  const { signal: r } = t;
  return r.unsubscribe = () => d.asap(o), r;
}, Yl = function* (e, n) {
  let t = e.byteLength;
  if (t < n) {
    yield e;
    return;
  }
  let a = 0, i;
  for (; a < t; )
    i = a + n, yield e.slice(a, i), a = i;
}, Zl = async function* (e, n) {
  for await (const t of Ql(e))
    yield* Yl(t, n);
}, Ql = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const n = e.getReader();
  try {
    for (; ; ) {
      const { done: t, value: a } = await n.read();
      if (t)
        break;
      yield a;
    }
  } finally {
    await n.cancel();
  }
}, co = (e, n, t, a) => {
  const i = Zl(e, n);
  let s = 0, o, r = (c) => {
    o || (o = !0, a && a(c));
  };
  return new ReadableStream(
    {
      async pull(c) {
        try {
          const { done: f, value: l } = await i.next();
          if (f) {
            r(), c.close();
            return;
          }
          let p = l.byteLength;
          if (t) {
            let x = s += p;
            t(x);
          }
          c.enqueue(new Uint8Array(l));
        } catch (f) {
          throw r(f), f;
        }
      },
      cancel(c) {
        return r(c), i.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, po = 64 * 1024, eu = {
  cache: "default",
  redirect: "follow",
  referrer: "about:client",
  referrerPolicy: "",
  mode: "cors",
  integrity: "",
  keepalive: !1,
  priority: "auto",
  window: null
}, { isFunction: hn } = d, nu = (e) => encodeURIComponent(e).replace(
  /%([0-9A-F]{2})/gi,
  (n, t) => String.fromCharCode(parseInt(t, 16))
), lo = (e) => {
  if (!d.isString(e))
    return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}, uo = (e, ...n) => {
  try {
    return !!e(...n);
  } catch {
    return !1;
  }
}, tu = (e) => {
  const n = e.indexOf("://");
  let t = e;
  return n !== -1 && (t = t.slice(n + 3)), t.includes("@") || t.includes(":");
}, au = (e) => {
  const n = d.global !== void 0 && d.global !== null ? d.global : globalThis, { ReadableStream: t, TextEncoder: a } = n;
  e = d.merge.call(
    {
      skipUndefined: !0
    },
    {
      Request: n.Request,
      Response: n.Response
    },
    e
  );
  const { fetch: i, Request: s, Response: o } = e, r = i ? hn(i) : typeof fetch == "function", c = hn(s), f = hn(o);
  if (!r)
    return !1;
  const l = r && hn(t), p = r && (typeof a == "function" ? /* @__PURE__ */ ((u) => (m) => u.encode(m))(new a()) : async (u) => new Uint8Array(await new s(u).arrayBuffer())), x = c && l && uo(() => {
    let u = !1;
    const m = new s(Q.origin, {
      body: new t(),
      method: "POST",
      get duplex() {
        return u = !0, "half";
      }
    }), R = m.headers.has("Content-Type");
    return m.body != null && m.body.cancel(), u && !R;
  }), v = f && l && uo(() => d.isReadableStream(new o("").body)), w = {
    stream: v && ((u) => u.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((u) => {
    !w[u] && (w[u] = (m, R) => {
      let _ = m && m[u];
      if (_)
        return _.call(m);
      throw new y(
        `Response type '${u}' is not supported`,
        y.ERR_NOT_SUPPORT,
        R
      );
    });
  });
  const b = async (u) => {
    if (u == null)
      return 0;
    if (d.isBlob(u))
      return u.size;
    if (d.isSpecCompliantForm(u))
      return (await new s(Q.origin, {
        method: "POST",
        body: u
      }).arrayBuffer()).byteLength;
    if (d.isArrayBufferView(u) || d.isArrayBuffer(u))
      return u.byteLength;
    if (d.isURLSearchParams(u) && (u = u + ""), d.isString(u))
      return (await p(u)).byteLength;
  }, h = async (u, m) => {
    const R = d.toFiniteNumber(u.getContentLength());
    return R ?? b(m);
  };
  return async (u) => {
    let {
      url: m,
      method: R,
      data: _,
      signal: O,
      cancelToken: j,
      timeout: k,
      onDownloadProgress: $,
      onUploadProgress: V,
      responseType: G,
      headers: q,
      withCredentials: ae = "same-origin",
      fetchOptions: be,
      maxContentLength: M,
      maxBodyLength: W,
      maxRedirects: Re
    } = Os(u);
    const ge = d.isNumber(M) && M > -1, me = d.isNumber(W) && W > -1, g = (D) => d.hasOwnProp(u, D) ? u[D] : void 0;
    let S = i || fetch;
    G = G ? (G + "").toLowerCase() : "text";
    let E = Xl(
      [O, j && j.toAbortSignal()],
      k
    ), P = null;
    const F = E && E.unsubscribe && (() => {
      E.unsubscribe();
    });
    let J, X = null;
    const se = () => new y(
      "Request body larger than maxBodyLength limit",
      y.ERR_BAD_REQUEST,
      u,
      P
    );
    try {
      let D;
      const N = g("auth");
      if (N) {
        const C = d.getSafeProp(N, "username") || "", Z = d.getSafeProp(N, "password") || "";
        D = {
          username: C,
          password: Z
        };
      }
      if (tu(m)) {
        const C = new URL(m, Q.origin);
        if (!D && (C.username || C.password)) {
          const Z = lo(C.username), T = lo(C.password);
          D = {
            username: Z,
            password: T
          };
        }
        (C.username || C.password) && (C.username = "", C.password = "", m = C.href);
      }
      if (D && (q.delete("authorization"), q.set(
        "Authorization",
        "Basic " + btoa(nu((D.username || "") + ":" + (D.password || "")))
      )), ge && typeof m == "string" && m.startsWith("data:") && Rl(m) > M)
        throw new y(
          "maxContentLength size of " + M + " exceeded",
          y.ERR_BAD_RESPONSE,
          u,
          P
        );
      if (me && R !== "get" && R !== "head") {
        const C = await b(_);
        if (typeof C == "number" && isFinite(C) && (J = C, C > W))
          throw se();
      }
      const U = me && (d.isReadableStream(_) || d.isStream(_)), B = (C, Z, T) => co(
        C,
        po,
        (A) => {
          if (me && A > W)
            throw X = se();
          Z && Z(A);
        },
        T
      );
      if (x && R !== "get" && R !== "head" && (V || U)) {
        if (J = J ?? await h(q, _), J !== 0 || U) {
          let C = new s(m, {
            method: "POST",
            body: _,
            duplex: "half"
          }), Z;
          if (d.isFormData(_) && (Z = C.headers.get("content-type")) && q.setContentType(Z), C.body) {
            const [T, A] = V && On(
              J,
              Ne(kn(V))
            ) || [];
            _ = B(C.body, T, A);
          }
        }
      } else if (U && !c && l && R !== "get" && R !== "head")
        _ = B(_);
      else if (U && c && !x && R !== "get" && R !== "head")
        throw new y(
          "Stream request bodies are not supported by the current fetch implementation",
          y.ERR_NOT_SUPPORT,
          u,
          P
        );
      d.isString(ae) || (ae = ae ? "include" : "omit");
      const Y = c && "credentials" in s.prototype;
      if (d.isFormData(_)) {
        const C = q.getContentType();
        C && /^multipart\/form-data/i.test(C) && !/boundary=/i.test(C) && q.delete("content-type");
      }
      q.set("User-Agent", "axios/" + tn, !1);
      const H = be == null ? be : Object.assign(/* @__PURE__ */ Object.create(null), be);
      H && (delete H.body, delete H.headers, delete H.method, delete H.signal, delete H.duplex, delete H.credentials);
      const L = Object.assign(/* @__PURE__ */ Object.create(null), H, {
        signal: E,
        method: R.toUpperCase(),
        headers: ra(q.normalize()),
        body: _,
        duplex: "half",
        credentials: Y ? ae : void 0
      });
      c && (d.forEach(eu, (C, Z) => {
        L[Z] === void 0 && (L[Z] = C);
      }), L.signal === void 0 && (L.signal = null), L.body === void 0 && (L.body = null)), Re === 0 && (L.redirect = "manual", H && (H.redirect = "manual")), P = c && new s(m, L);
      let ee = await (c ? S(P, H) : S(m, L));
      const fe = oe.from(ee.headers);
      if (ge) {
        const C = d.toFiniteNumber(fe.getContentLength());
        if (C != null && C > M)
          throw new y(
            "maxContentLength size of " + M + " exceeded",
            y.ERR_BAD_RESPONSE,
            u,
            P
          );
      }
      const te = v && (G === "stream" || G === "response");
      if (v && ee.body && ($ || ge || te && F)) {
        const C = {};
        ["status", "statusText", "headers"].forEach((z) => {
          C[z] = ee[z];
        });
        const Z = d.toFiniteNumber(fe.getContentLength()), [T, A] = $ && On(
          Z,
          Ne(kn($), !0)
        ) || [];
        let I = 0;
        const ne = (z) => {
          if (ge && (I = z, I > M))
            throw new y(
              "maxContentLength size of " + M + " exceeded",
              y.ERR_BAD_RESPONSE,
              u,
              P
            );
          T && T(z);
        };
        ee = new o(
          co(ee.body, po, ne, () => {
            A && A(), F && F();
          }),
          C
        );
      }
      G = G || "text";
      let ce = await w[d.findKey(w, G) || "text"](
        ee,
        u
      );
      if (ge && !v && !te) {
        let C;
        if (ce != null && (typeof ce.byteLength == "number" ? C = ce.byteLength : typeof ce.size == "number" ? C = ce.size : typeof ce == "string" && (C = typeof a == "function" ? new a().encode(ce).byteLength : ce.length)), typeof C == "number" && C > M)
          throw new y(
            "maxContentLength size of " + M + " exceeded",
            y.ERR_BAD_RESPONSE,
            u,
            P
          );
      }
      return !te && F && F(), await new Promise((C, Z) => {
        Be(C, Z, {
          data: ce,
          headers: oe.from(ee.headers),
          status: ee.status,
          statusText: ee.statusText,
          config: u,
          request: P
        });
      });
    } catch (D) {
      if (F && F(), E && E.aborted && E.reason instanceof y) {
        const N = E.reason;
        throw N.config = u, P && (N.request = P), D !== N && Object.defineProperty(N, "cause", {
          __proto__: null,
          value: D,
          writable: !0,
          enumerable: !1,
          configurable: !0
        }), N;
      }
      if (X)
        throw P && !X.request && (X.request = P), X;
      if (D instanceof y)
        throw P && !D.request && (D.request = P), D;
      if (D && D.name === "TypeError" && /Load failed|fetch/i.test(D.message)) {
        const N = new y(
          "Network Error",
          y.ERR_NETWORK,
          u,
          P,
          D && D.response
        );
        throw Object.defineProperty(N, "cause", {
          __proto__: null,
          value: D.cause || D,
          writable: !0,
          enumerable: !1,
          configurable: !0
        }), N;
      }
      throw y.from(D, D && D.code, u, P, D && D.response);
    }
  };
}, iu = /* @__PURE__ */ new Map(), ks = (e) => {
  let n = e && e.env || {};
  const { fetch: t, Request: a, Response: i } = n, s = [a, i, t];
  let o = s.length, r = o, c, f, l = iu;
  for (; r--; )
    c = s[r], f = l.get(c), f === void 0 && l.set(c, f = r ? /* @__PURE__ */ new Map() : au(n)), l = f;
  return f;
};
ks();
const xa = {
  http: Ml,
  xhr: Jl,
  fetch: {
    get: ks
  }
};
d.forEach(xa, (e, n) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { __proto__: null, value: n });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { __proto__: null, value: n });
  }
});
const mo = (e) => `- ${e}`, ou = (e) => d.isFunction(e) || e === null || e === !1;
function su(e, n) {
  e = d.isArray(e) ? e : [e];
  const { length: t } = e;
  let a, i;
  const s = {};
  for (let o = 0; o < t; o++) {
    a = e[o];
    let r;
    if (i = a, !ou(a) && (i = xa[(r = String(a)).toLowerCase()], i === void 0))
      throw new y(`Unknown adapter '${r}'`);
    if (i && (d.isFunction(i) || (i = i.get(n))))
      break;
    s[r || "#" + o] = i;
  }
  if (!i) {
    const o = Object.entries(s).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let r = t ? o.length > 1 ? `since :
` + o.map(mo).join(`
`) : " " + mo(o[0]) : "as no adapter specified";
    throw new y(
      "There is no suitable adapter to dispatch the request " + r,
      y.ERR_NOT_SUPPORT
    );
  }
  return i;
}
const As = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: su,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: xa
};
function Yt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new je(null, e);
}
function Zt(e) {
  const n = d.toSafeFlatObject(e);
  return Yt(n), n.headers = oe.from(d.getSafeProp(n, "headers")), n.data = $t.call(n, n.transformRequest), ["post", "put", "patch"].indexOf(n.method) !== -1 && n.headers.setContentType("application/x-www-form-urlencoded", !1), As.getAdapter(n.adapter || cn.adapter, n)(n).then(
    function(i) {
      Yt(n), n.response = i;
      try {
        i.data = $t.call(n, n.transformResponse, i);
      } finally {
        delete n.response;
      }
      return i.headers = oe.from(i.headers), i;
    },
    function(i) {
      if (!ss(i) && (Yt(n), i && i.response)) {
        n.response = i.response;
        try {
          i.response.data = $t.call(
            n,
            n.transformResponse,
            i.response
          );
        } finally {
          delete n.response;
        }
        i.response.headers = oe.from(i.response.headers);
      }
      return Promise.reject(i);
    }
  );
}
const Un = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, n) => {
  Un[e] = function(a) {
    return typeof a === e || "a" + (n < 1 ? "n " : " ") + e;
  };
});
const fo = {};
Un.transitional = function(n, t, a) {
  function i(s, o) {
    return "[Axios v" + tn + "] Transitional option '" + s + "'" + o + (a ? ". " + a : "");
  }
  return (s, o, r) => {
    if (n === !1)
      throw new y(
        i(o, " has been removed" + (t ? " in " + t : "")),
        y.ERR_DEPRECATED
      );
    return t && !fo[o] && (fo[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), n ? n(s, o, r) : !0;
  };
};
Un.spelling = function(n) {
  return (t, a) => (console.warn(`${a} is likely a misspelling of ${n}`), !0);
};
function ru(e, n, t) {
  if (typeof e != "object" || e === null)
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(e);
  let i = a.length;
  for (; i-- > 0; ) {
    const s = a[i], o = Object.prototype.hasOwnProperty.call(n, s) ? n[s] : void 0;
    if (o) {
      const r = e[s], c = r === void 0 || o(r, s, e);
      if (c !== !0)
        throw new y(
          "option " + s + " must be " + c,
          y.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (t !== !0)
      throw new y("Unknown option " + s, y.ERR_BAD_OPTION);
  }
}
const En = {
  assertOptions: ru,
  validators: Un
}, de = En.validators;
let Te = class {
  constructor(n) {
    this.defaults = n || {}, this.interceptors = {
      request: new Oi(),
      response: new Oi()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(n, t) {
    try {
      return await this._request(n, t);
    } catch (a) {
      if (a instanceof Error)
        try {
          let i = {};
          Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
          const s = i.stack;
          let o = "";
          if (typeof s == "string") {
            const r = s.indexOf(`
`);
            o = r === -1 ? "" : s.slice(r + 1);
          }
          if (!a.stack)
            a.stack = o;
          else if (o) {
            const r = o.indexOf(`
`), c = r === -1 ? -1 : o.indexOf(`
`, r + 1), f = c === -1 ? "" : o.slice(c + 1);
            String(a.stack).endsWith(f) || (a.stack += `
` + o);
          }
        } catch {
        }
      throw a;
    }
  }
  _request(n, t) {
    typeof n == "string" ? (t = t || {}, t.url = n) : t = n || {}, t = Fe(this.defaults, t);
    const { transitional: a, paramsSerializer: i, headers: s } = t;
    a !== void 0 && En.assertOptions(
      a,
      {
        silentJSONParsing: de.transitional(de.boolean),
        forcedJSONParsing: de.transitional(de.boolean),
        clarifyTimeoutError: de.transitional(de.boolean),
        legacyInterceptorReqResOrdering: de.transitional(de.boolean),
        advertiseZstdAcceptEncoding: de.transitional(de.boolean),
        validateStatusUndefinedResolves: de.transitional(de.boolean)
      },
      !1
    ), i != null && (d.isFunction(i) ? t.paramsSerializer = {
      serialize: i
    } : En.assertOptions(
      i,
      {
        encode: de.function,
        serialize: de.function
      },
      !0
    )), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), En.assertOptions(
      t,
      {
        baseUrl: de.spelling("baseURL"),
        withXsrfToken: de.spelling("withXSRFToken")
      },
      !0
    ), t.method = (d.getSafeProp(t, "method") || d.getSafeProp(this.defaults, "method") || "get").toLowerCase();
    let o = s && d.merge(s.common, s[t.method]);
    s && d.forEach(os.concat("common"), (w) => {
      delete s[w];
    }), t.headers = oe.concat(o, s);
    const r = [];
    let c = !0;
    this.interceptors.request.forEach(function(b) {
      if (typeof b.runWhen == "function" && b.runWhen(t) === !1)
        return;
      c = c && b.synchronous;
      const h = t.transitional || qn;
      h && h.legacyInterceptorReqResOrdering ? r.unshift(b.fulfilled, b.rejected) : r.push(b.fulfilled, b.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(b) {
      f.push(b.fulfilled, b.rejected);
    });
    let l, p = 0, x;
    if (!c) {
      const w = [Zt.bind(this), void 0];
      for (w.unshift(...r), w.push(...f), x = w.length, l = Promise.resolve(t); p < x; )
        l = l.then(w[p++], w[p++]);
      return l;
    }
    x = r.length;
    let v = t;
    for (; p < x; ) {
      const w = r[p++], b = r[p++];
      try {
        v = w ? w(v) : v;
      } catch (h) {
        if (!b) {
          l = Promise.reject(h);
          break;
        }
        try {
          const u = b.call(this, h);
          d.isThenable(u) && (l = Promise.resolve(u).then(
            () => Zt.call(this, v)
          ));
        } catch (u) {
          l = Promise.reject(u);
        }
        break;
      }
    }
    if (!l)
      try {
        l = Zt.call(this, v);
      } catch (w) {
        l = Promise.reject(w);
      }
    for (p = 0, x = f.length; p < x; )
      l = l.then(f[p++], f[p++]);
    return l;
  }
  getUri(n) {
    n = Fe(this.defaults, n);
    const t = ma(n.baseURL, n.url, n.allowAbsoluteUrls, n);
    return ua(t, n.params, n.paramsSerializer);
  }
};
d.forEach(["delete", "get", "head", "options"], function(n) {
  Te.prototype[n] = function(t, a) {
    return this.request(
      Fe(a || {}, {
        method: n,
        url: t,
        data: a && d.hasOwnProp(a, "data") ? a.data : void 0
      })
    );
  };
});
d.forEach(["post", "put", "patch", "query"], function(n) {
  function t(a) {
    return function(s, o, r) {
      return this.request(
        Fe(r || {}, {
          method: n,
          headers: a ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: s,
          data: o
        })
      );
    };
  }
  Te.prototype[n] = t(), n !== "query" && (Te.prototype[n + "Form"] = t(!0));
});
let cu = class Ts {
  constructor(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(s) {
      t = s;
    });
    const a = this;
    this.promise.then((i) => {
      if (!a._listeners) return;
      let s = a._listeners.length;
      for (; s-- > 0; )
        a._listeners[s](i);
      a._listeners = null;
    }), this.promise.then = (i) => {
      let s;
      const o = new Promise((r) => {
        a.subscribe(r), s = r;
      }).then(i);
      return o.cancel = function() {
        a.unsubscribe(s);
      }, o;
    }, n(function(s, o, r) {
      a.reason || (a.reason = new je(s, o, r), t(a.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(n) {
    if (this.reason) {
      n(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(n) : this._listeners = [n];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(n) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(n);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const n = new AbortController(), t = (a) => {
      n.abort(a);
    };
    return this.subscribe(t), n.signal.unsubscribe = () => this.unsubscribe(t), n.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let n;
    return {
      token: new Ts(function(i) {
        n = i;
      }),
      cancel: n
    };
  }
};
function pu(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function lu(e) {
  return d.isObject(e) && e.isAxiosError === !0;
}
const _n = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  /**
   * @deprecated Use `ContentTooLarge` instead.
   */
  PayloadTooLarge: 413,
  ContentTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  /**
   * @deprecated Use `UnprocessableContent` instead.
   */
  UnprocessableEntity: 422,
  UnprocessableContent: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerReturnsAnUnknownError: 520,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(_n).forEach(([e, n]) => {
  _n[n] === void 0 && (_n[n] = e);
});
function Ps(e) {
  const n = new Te(e), t = Oo(Te.prototype.request, n);
  return d.extend(t, Te.prototype, n, { allOwnKeys: !0 }), d.extend(t, n, null, { allOwnKeys: !0 }), t.create = function(i) {
    return Ps(Fe(e, i));
  }, t;
}
const ie = Ps(cn);
ie.Axios = Te;
ie.CanceledError = je;
ie.CancelToken = cu;
ie.isCancel = ss;
ie.VERSION = tn;
ie.toFormData = Fn;
ie.AxiosError = y;
ie.Cancel = ie.CanceledError;
ie.all = function(n) {
  return Promise.all(n);
};
ie.spread = pu;
ie.isAxiosError = lu;
ie.mergeConfig = Fe;
ie.AxiosHeaders = oe;
ie.formToJSON = (e) => is(d.isHTMLForm(e) ? new FormData(e) : e);
ie.getAdapter = As.getAdapter;
ie.HttpStatusCode = _n;
ie.default = ie;
const {
  Axios: dd,
  AxiosError: uu,
  CanceledError: md,
  isCancel: fd,
  CancelToken: xd,
  VERSION: hd,
  all: vd,
  Cancel: bd,
  isAxiosError: gd,
  spread: yd,
  toFormData: wd,
  AxiosHeaders: Rd,
  HttpStatusCode: Ed,
  formToJSON: _d,
  getAdapter: Sd,
  mergeConfig: Od,
  create: kd
} = ie;
var $e = class extends Error {
  constructor(e) {
    super(e), this.name = "EdgeTTSException";
  }
}, Qt = class extends $e {
  constructor(e) {
    super(e), this.name = "SkewAdjustmentError";
  }
}, xo = class extends $e {
  constructor(e) {
    super(e), this.name = "UnknownResponse";
  }
}, De = class extends $e {
  constructor(e) {
    super(e), this.name = "UnexpectedResponse";
  }
}, du = class extends $e {
  constructor(e) {
    super(e), this.name = "NoAudioReceived";
  }
}, mu = class extends $e {
  constructor(e) {
    super(e), this.name = "WebSocketError";
  }
}, Cs = class extends $e {
  constructor(e) {
    super(e), this.name = "ValueError";
  }
};
function fu(e) {
  const n = e.indexOf(`\r
\r
`), t = {}, a = e.subarray(0, n).toString("utf-8");
  if (a) {
    const i = a.split(`\r
`);
    for (const s of i) {
      const [o, r] = s.split(":", 2);
      o && r && (t[o] = r.trim());
    }
  }
  return [t, e.subarray(n + 2)];
}
function xu(e) {
  const n = e.readUInt16BE(0), t = {}, a = e.subarray(2, n + 2).toString("utf-8");
  if (a) {
    const i = a.split(`\r
`);
    for (const s of i) {
      const [o, r] = s.split(":", 2);
      o && r && (t[o] = r.trim());
    }
  }
  return [t, e.subarray(n + 2)];
}
function hu(e) {
  return e.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ");
}
function ho() {
  return ir().replace(/-/g, "");
}
function vu(e, n) {
  const t = e.subarray(0, n);
  let a = t.lastIndexOf(`
`);
  return a < 0 && (a = t.lastIndexOf(" ")), a;
}
function bu(e) {
  let n = e.length;
  for (; n > 0; ) {
    if (e.subarray(0, n).toString("utf-8").endsWith("�")) {
      n--;
      continue;
    }
    return n;
  }
  return n;
}
function gu(e, n) {
  let t = e.lastIndexOf("&", n - 1);
  for (; t !== -1; ) {
    const a = e.indexOf(";", t);
    if (a !== -1 && a < n)
      break;
    n = t, t = e.lastIndexOf("&", n - 1);
  }
  return n;
}
function* yu(e, n) {
  let t = Buffer.isBuffer(e) ? e : Buffer.from(e, "utf-8");
  for (; t.length > n; ) {
    let i = vu(t, n);
    if (i < 0 && (i = bu(t.subarray(0, n))), i = gu(t, i), i <= 0)
      throw new Cs(
        "Maximum byte length is too small or invalid text structure near '&' or invalid UTF-8"
      );
    const o = t.subarray(0, i).toString("utf-8").trim();
    o && (yield Buffer.from(o, "utf-8")), t = t.subarray(i);
  }
  const a = t.toString("utf-8").trim();
  a && (yield Buffer.from(a, "utf-8"));
}
function wu(e, n) {
  const t = Buffer.isBuffer(n) ? n.toString("utf-8") : n;
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${e.voice}'><prosody pitch='${e.pitch}' rate='${e.rate}' volume='${e.volume}'>${t}</prosody></voice></speak>`;
}
function vo() {
  return (/* @__PURE__ */ new Date()).toUTCString().replace("GMT", "GMT+0000 (Coordinated Universal Time)");
}
function Ru(e, n, t) {
  return `X-RequestId:${e}\r
Content-Type:application/ssml+xml\r
X-Timestamp:${n}Z\r
Path:ssml\r
\r
${t}`;
}
function Eu(e) {
  return e.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
var _u = class Ze {
  /**
   * Creates a new TTSConfig instance with the specified parameters.
   * 
   * @param options - Configuration options
   * @param options.voice - Voice name (supports both short and full formats)
   * @param options.rate - Speech rate adjustment (default: "+0%")
   * @param options.volume - Volume adjustment (default: "+0%") 
   * @param options.pitch - Pitch adjustment (default: "+0Hz")
   * @throws {ValueError} If any parameter has an invalid format
   */
  constructor({
    voice: n,
    rate: t = "+0%",
    volume: a = "+0%",
    pitch: i = "+0Hz"
  }) {
    this.voice = n, this.rate = t, this.volume = a, this.pitch = i, this.validate();
  }
  validate() {
    const n = /^([a-z]{2,})-([A-Z]{2,})-(.+Neural)$/.exec(this.voice);
    if (n) {
      const [, t] = n;
      let [, , a, i] = n;
      if (i.includes("-")) {
        const s = i.split("-");
        a += `-${s[0]}`, i = s[1];
      }
      this.voice = `Microsoft Server Speech Text to Speech Voice (${t}-${a}, ${i})`;
    }
    Ze.validateStringParam(
      "voice",
      this.voice,
      /^Microsoft Server Speech Text to Speech Voice \(.+,.+\)$/
    ), Ze.validateStringParam("rate", this.rate, /^[+-]\d+%$/), Ze.validateStringParam("volume", this.volume, /^[+-]\d+%$/), Ze.validateStringParam("pitch", this.pitch, /^[+-]\d+Hz$/);
  }
  static validateStringParam(n, t, a) {
    if (typeof t != "string")
      throw new TypeError(`${n} must be a string`);
    if (!a.test(t))
      throw new Cs(`Invalid ${n} '${t}'.`);
  }
}, Su = "speech.platform.bing.com/consumer/speech/synthesize/readaloud", js = "6A5AA1D4EAFF4E9FB37E23D68491D6F4", Ou = `wss://${Su}/edge/v1?TrustedClientToken=${js}`, ku = "en-US-EmmaMultilingualNeural", Fs = "143.0.3650.75", bo = Fs.split(".")[0], Au = `1-${Fs}`, Tu = {
  "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${bo}.0.0.0 Safari/537.36 Edg/${bo}.0.0.0`,
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9"
}, Pu = {
  ...Tu,
  Pragma: "no-cache",
  "Cache-Control": "no-cache",
  Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
  "Sec-WebSocket-Version": "13"
}, Cu = 11644473600, ju = 1e9, qs = class Se {
  /**
   * Adjusts the clock skew to synchronize with server time.
   * @param skewSeconds - Number of seconds to adjust the clock by
   */
  static adjClockSkewSeconds(n) {
    Se.clockSkewSeconds += n;
  }
  /**
   * Gets the current Unix timestamp adjusted for clock skew.
   * @returns Unix timestamp in seconds
   */
  static getUnixTimestamp() {
    return Date.now() / 1e3 + Se.clockSkewSeconds;
  }
  /**
   * Parses an RFC 2616 date string into a Unix timestamp.
   * @param date - RFC 2616 formatted date string
   * @returns Unix timestamp in seconds, or null if parsing fails
   */
  static parseRfc2616Date(n) {
    try {
      return new Date(n).getTime() / 1e3;
    } catch {
      return null;
    }
  }
  /**
   * Handles client response errors by adjusting clock skew based on server date.
   * @param e - Axios error containing server response headers
   * @throws {SkewAdjustmentError} If server date is missing or invalid
   */
  static handleClientResponseError(n) {
    if (!n.response || !n.response.headers)
      throw new Qt("No server date in headers.");
    const t = n.response.headers.date;
    if (!t || typeof t != "string")
      throw new Qt("No server date in headers.");
    const a = Se.parseRfc2616Date(t);
    if (a === null)
      throw new Qt(`Failed to parse server date: ${t}`);
    const i = Se.getUnixTimestamp();
    Se.adjClockSkewSeconds(a - i);
  }
  /**
   * Generates the Sec-MS-GEC security token required for API authentication.
   * @returns Uppercase hexadecimal SHA-256 hash string
   */
  static generateSecMsGec() {
    let n = Se.getUnixTimestamp();
    n += Cu, n -= n % 300, n *= ju / 100;
    const t = `${n.toFixed(0)}${js}`;
    return Hs("sha256").update(t, "ascii").digest("hex").toUpperCase();
  }
  /**
   * Generates a random MUID (Machine Unique Identifier).
   * @returns Uppercase 32-character hex string
   */
  static generateMuid() {
    return Ws(16).toString("hex").toUpperCase();
  }
  /**
   * Returns a copy of the given headers with a MUID cookie added.
   * @param headers - The original headers
   * @returns New headers object with Cookie header containing the MUID
   */
  static headersWithMuid(n) {
    return {
      ...n,
      Cookie: `muid=${Se.generateMuid()};`
    };
  }
};
qs.clockSkewSeconds = 0;
var ea = qs, vn, Fu = class {
  /**
   * Creates a new Communicate instance for text-to-speech synthesis.
   * 
   * @param text - The text to synthesize
   * @param options - Configuration options for synthesis
   */
  constructor(e, n = {}) {
    if (this.state = {
      partialText: Buffer.from(""),
      offsetCompensation: 0,
      lastDurationOffset: 0,
      streamWasCalled: !1
    }, this.ttsConfig = new _u({
      voice: n.voice || ku,
      rate: n.rate,
      volume: n.volume,
      pitch: n.pitch
    }), typeof e != "string")
      throw new TypeError("text must be a string");
    this.texts = yu(
      rr(hu(e)),
      // calcMaxMesgSize(this.ttsConfig),
      4096
    ), this.proxy = n.proxy, this.connectionTimeout = n.connectionTimeout;
  }
  parseMetadata(e) {
    const n = JSON.parse(e.toString("utf-8"));
    for (const t of n.Metadata) {
      const a = t.Type;
      if (a === "WordBoundary" || a === "SentenceBoundary") {
        const i = t.Data.Offset + this.state.offsetCompensation, s = t.Data.Duration;
        return {
          type: a,
          offset: i,
          duration: s,
          text: Eu(t.Data.text.Text)
        };
      }
      if (a !== "SessionEnd")
        throw new xo(`Unknown metadata type: ${a}`);
    }
    throw new De("No WordBoundary metadata found");
  }
  async *_stream() {
    const e = `${Ou}&Sec-MS-GEC=${ea.generateSecMsGec()}&Sec-MS-GEC-Version=${Au}&ConnectionId=${ho()}`;
    let n;
    if (this.proxy) {
      if (!vn)
        try {
          vn = (await import("./index-MBureN-f.js").then((r) => r.i)).HttpsProxyAgent;
        } catch (o) {
          console.warn("https-proxy-agent not available:", o);
        }
      vn && (n = new vn(this.proxy));
    }
    const t = new lr(e, {
      headers: ea.headersWithMuid(Pu),
      timeout: this.connectionTimeout,
      agent: n
    }), a = [];
    let i = null;
    t.on("message", (o, r) => {
      if (r)
        if (o.length < 2)
          a.push(new De("We received a binary message, but it is missing the header length."));
        else if (o.readUInt16BE(0) > o.length)
          a.push(new De("The header length is greater than the length of the data."));
        else {
          const [f, l] = xu(o);
          f.Path !== "audio" ? a.push(new De("Received binary message, but the path is not audio.")) : f["Content-Type"] !== "audio/mpeg" ? l.length > 0 && a.push(new De("Received binary message, but with an unexpected Content-Type.")) : l.length === 0 ? a.push(new De("Received binary message, but it is missing the audio data.")) : a.push({ type: "audio", data: l });
        }
      else {
        const [c, f] = fu(o), l = c.Path;
        if (l === "audio.metadata")
          try {
            const p = this.parseMetadata(f);
            this.state.lastDurationOffset = p.offset + p.duration, a.push(p);
          } catch (p) {
            a.push(p);
          }
        else l === "turn.end" ? (this.state.offsetCompensation = this.state.lastDurationOffset, this.state.offsetCompensation += 875e4, t.close()) : l !== "response" && l !== "turn.start" && a.push(new xo(`Unknown path received: ${l}`));
      }
      i && i();
    }), t.on("error", (o) => {
      a.push(new mu(o.message)), i && i();
    }), t.on("close", () => {
      a.push("close"), i && i();
    }), await new Promise((o) => t.on("open", o)), t.send(
      `X-Timestamp:${vo()}\r
Content-Type:application/json; charset=utf-8\r
Path:speech.config\r
\r
{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r
`
    ), t.send(
      Ru(
        ho(),
        vo(),
        wu(this.ttsConfig, this.state.partialText)
      )
    );
    let s = !1;
    for (; ; )
      if (a.length > 0) {
        const o = a.shift();
        if (o === "close") {
          if (!s)
            throw new du("No audio was received.");
          break;
        } else {
          if (o instanceof Error)
            throw o;
          o.type === "audio" && (s = !0), yield o;
        }
      } else
        await new Promise((o) => {
          i = o, setTimeout(o, 50);
        });
  }
  /**
   * Streams text-to-speech synthesis results.
   * 
   * Returns an async generator that yields audio chunks and word boundary events.
   * Can only be called once per Communicate instance.
   * 
   * @yields TTSChunk - Audio data or word boundary information
   * @throws {Error} If called more than once
   * @throws {NoAudioReceived} If no audio data is received
   * @throws {WebSocketError} If WebSocket connection fails
   * 
   * @example
   * ```typescript
   * for await (const chunk of communicate.stream()) {
   *   if (chunk.type === 'audio') {
   *     // Process audio data
   *   } else if (chunk.type === 'WordBoundary') {
   *     // Process subtitle timing
   *   }
   * }
   * ```
   */
  async *stream() {
    var e;
    if (this.state.streamWasCalled)
      throw new Error("stream can only be called once.");
    this.state.streamWasCalled = !0;
    for (const n of this.texts) {
      this.state.partialText = n;
      try {
        for await (const t of this._stream())
          yield t;
      } catch (t) {
        if (t instanceof uu && ((e = t.response) == null ? void 0 : e.status) === 403) {
          ea.handleClientResponseError(t);
          for await (const a of this._stream())
            yield a;
        } else
          throw t;
      }
    }
  }
};
const qu = Bs(import.meta.url), Ls = Ee.dirname(qu);
process.env.DIST = Ee.join(Ls, "../dist");
process.env.VITE_PUBLIC = Qe.isPackaged ? process.env.DIST : Ee.join(process.env.DIST, "../public");
let K, Ye = null;
const go = process.env.VITE_DEV_SERVER_URL;
function Us() {
  K = new yo({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: "Remotion AI Video Auto-Editor",
    icon: Ee.join(process.env.VITE_PUBLIC || "", "icon.png"),
    backgroundColor: "#0B0F19",
    webPreferences: {
      preload: Ee.join(Ls, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !1
      // Allow loading local files and media preview
    }
  }), K.webContents.on("did-finish-load", () => {
    K == null || K.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), go ? K.loadURL(go) : K.loadFile(Ee.join(process.env.DIST || "", "index.html"));
}
Qe.on("window-all-closed", () => {
  process.platform !== "darwin" && (Qe.quit(), K = null);
});
Qe.on("activate", () => {
  yo.getAllWindows().length === 0 && Us();
});
Qe.whenReady().then(() => {
  Us(), Du();
});
function Lu(e) {
  return new Promise((n, t) => {
    (e.startsWith("https") ? Ns : Is).get(
      e,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/"
        }
      },
      (i) => {
        if (i.statusCode && i.statusCode >= 400)
          return t(new Error(`HTTP error ${i.statusCode}`));
        const s = [];
        i.on("data", (o) => s.push(Buffer.isBuffer(o) ? o : Buffer.from(o))), i.on("end", () => n(Buffer.concat(s)));
      }
    ).on("error", t);
  });
}
async function Uu(e, n) {
  try {
    const a = e.trim().split(/\s+/).filter(Boolean), s = !n.startsWith("en-") ? "vi" : "en", o = [];
    let r = "";
    for (const h of a)
      (r + " " + h).length > 80 ? (o.push(r.trim()), r = h) : r += " " + h;
    r.trim() && o.push(r.trim());
    const c = [];
    for (const h of o) {
      const u = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        h
      )}&tl=${s}&client=tw-ob`, m = await Lu(u);
      c.push(m);
    }
    const f = Buffer.concat(c), p = `data:audio/mp3;base64,${f.toString("base64")}`, x = Math.max(3, f.length / 3800), v = [], w = (x - 0.4) / Math.max(a.length, 1);
    let b = 0.2;
    for (const h of a) {
      const u = Math.max(0.2, Math.min(0.7, w));
      v.push({
        word: h,
        start: Number(b.toFixed(2)),
        end: Number((b + u).toFixed(2))
      }), b += u;
    }
    return {
      audioUrl: p,
      duration: Number((b + 0.3).toFixed(2)),
      words: v
    };
  } catch {
    const a = e.trim().split(/\s+/).filter(Boolean), i = a.map((s, o) => ({
      word: s,
      start: Number((o * 0.35 + 0.2).toFixed(2)),
      end: Number(((o + 1) * 0.35 + 0.2).toFixed(2))
    }));
    return {
      audioUrl: "",
      duration: Math.max(3.5, a.length * 0.35 + 0.5),
      words: i
    };
  }
}
function Du() {
  He.handle(
    "tts:synthesize",
    async (e, { text: n, voice: t = "vi-VN-HoaiMyNeural", rate: a = "+0%", pitch: i = "+0Hz" }) => {
      try {
        const s = n.trim();
        if (!s)
          return { audioUrl: "", duration: 1, words: [] };
        const o = new Fu(s, {
          voice: t,
          rate: a,
          pitch: i
        }), r = [], c = [];
        for await (const v of o.stream()) {
          const w = v;
          if (w.type === "audio" && w.data)
            c.push(Buffer.isBuffer(w.data) ? w.data : Buffer.from(w.data));
          else if (w.type === "WordBoundary" && w.text) {
            const b = Number(((w.offset || 0) / 1e7).toFixed(2)), h = Number(((w.duration || 0) / 1e7).toFixed(2));
            r.push({
              word: String(w.text),
              start: b,
              end: Number((b + h).toFixed(2))
            });
          }
        }
        const f = Buffer.concat(c);
        if (f.length === 0)
          throw new Error("Empty audio received from Edge-TTS");
        const p = `data:audio/mp3;base64,${f.toString("base64")}`;
        let x = 3;
        return r.length > 0 ? x = Number((r[r.length - 1].end + 0.3).toFixed(2)) : x = Number(Math.max(2.5, f.length / 5500).toFixed(2)), {
          audioUrl: p,
          duration: x,
          words: r
        };
      } catch (s) {
        return console.warn("Edge-TTS direct synthesis error, falling back:", (s == null ? void 0 : s.message) || s), Uu(n, t);
      }
    }
  ), He.handle("render:video", async (e, { project: n, resolution: t = "1080p" }) => {
    try {
      const a = Ee.resolve("out");
      Dn.existsSync(a) || Dn.mkdirSync(a, { recursive: !0 });
      const s = `${(n.title || "Video").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_").slice(0, 40)}_${Date.now()}.mp4`, o = Ee.join(a, s);
      K == null || K.webContents.send("render:progress", {
        progress: 5,
        stage: "bundle",
        message: "Đang chuẩn bị và đóng gói bundle Remotion..."
      });
      const r = Ee.resolve("src/remotion/index.ts");
      (!Ye || !Dn.existsSync(Ye)) && (Ye = await Qs({
        entryPoint: r,
        onProgress: (b) => {
          K == null || K.webContents.send("render:progress", {
            progress: Math.min(25, Math.round(5 + b * 20 / 100)),
            stage: "bundle",
            message: `Đang biên dịch mã nguồn Remotion (${b}%)...`
          });
        }
      })), K == null || K.webContents.send("render:progress", {
        progress: 28,
        stage: "composition",
        message: "Đang thiết lập cấu hình video và phân cảnh..."
      });
      const c = n.aspectRatio === "9:16" ? "Shorts916" : "Landscape169", f = await er({
        serveUrl: Ye,
        id: c,
        inputProps: { project: n }
      }), l = n.fps || 30, p = n.scenes.reduce(
        (b, h) => b + Math.max(h.audioDuration || 4, 2),
        0
      ), x = Math.max(Math.round(p * l), 30);
      let v = n.aspectRatio === "9:16" ? 1080 : 1920, w = n.aspectRatio === "9:16" ? 1920 : 1080;
      return t === "4k" && (v = n.aspectRatio === "9:16" ? 2160 : 3840, w = n.aspectRatio === "9:16" ? 3840 : 2160), K == null || K.webContents.send("render:progress", {
        progress: 32,
        stage: "rendering",
        message: `Bắt đầu render ${x} khung hình (${v}x${w})...`
      }), await nr({
        composition: {
          ...f,
          durationInFrames: x,
          width: v,
          height: w,
          fps: l
        },
        serveUrl: Ye,
        codec: "h264",
        outputLocation: o,
        inputProps: { project: n },
        onProgress: ({ progress: b }) => {
          const h = Math.min(99, Math.round(32 + b * 66));
          K == null || K.webContents.send("render:progress", {
            progress: h,
            stage: "rendering",
            message: `Đang xử lý hình ảnh, phụ đề & âm thanh (${Math.round(b * 100)}%)...`
          });
        }
      }), K == null || K.webContents.send("render:progress", {
        progress: 100,
        stage: "complete",
        message: "Render video MP4 thành công!"
      }), {
        success: !0,
        filePath: o
      };
    } catch (a) {
      throw console.error("Render media error in main process:", a), new Error(a.message || "Render video thất bại");
    }
  }), He.handle("shell:open-path", async (e, n) => Ds.openPath(n)), He.handle("dialog:select-file", async (e, n) => K ? (await va.showOpenDialog(K, n)).filePaths : null), He.handle("dialog:select-folder", async () => K && (await va.showOpenDialog(K, {
    properties: ["openDirectory"]
  })).filePaths[0] || null);
}
export {
  on as g,
  Ln as r
};

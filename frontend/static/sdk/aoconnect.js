var r18,
  objectUtil2,
  w,
  qt,
  p,
  Xe,
  Ye,
  Vt,
  m,
  processMetaCache,
  util,
  objectUtil,
  errorUtil,
  _ZodEnum_cache,
  _ZodNativeEnum_cache,
  emojiRegex,
  ZodFirstPartyTypeKind,
  Kr2,
  B,
  __create = Object.create,
  __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __commonJS = (e, t) =>
    function r() {
      return (
        t || (0, e[__getOwnPropNames(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      )
    },
  __export = (e, t) => {
    for (var r in t) __defProp(e, r, { get: t[r], enumerable: !0 })
  },
  __copyProps = (e, t, r, n) => {
    if ((t && "object" == typeof t) || "function" == typeof t)
      for (let i of __getOwnPropNames(t))
        __hasOwnProp.call(e, i) ||
          i === r ||
          __defProp(e, i, {
            get: () => t[i],
            enumerable: !(n = __getOwnPropDesc(t, i)) || n.enumerable,
          })
    return e
  },
  __toESM = (e, t, r) => (
    (r = null != e ? __create(__getProtoOf(e)) : {}),
    __copyProps(
      !t && e && e.__esModule
        ? r
        : __defProp(r, "default", { value: e, enumerable: !0 }),
      e
    )
  ),
  require_iterator = __commonJS({
    "node_modules/obliterator/iterator.js"(e, t) {
      function r(e) {
        if ("function" != typeof e)
          throw Error("obliterator/iterator: expecting a function!")
        this.next = e
      }
      "undefined" != typeof Symbol &&
        (r.prototype[Symbol.iterator] = function () {
          return this
        }),
        (r.of = function () {
          var e = arguments,
            t = e.length,
            n = 0
          return new r(function () {
            return n >= t ? { done: !0 } : { done: !1, value: e[n++] }
          })
        }),
        (r.empty = function () {
          return new r(function () {
            return { done: !0 }
          })
        }),
        (r.fromSequence = function (e) {
          var t = 0,
            n = e.length
          return new r(function () {
            return t >= n ? { done: !0 } : { done: !1, value: e[t++] }
          })
        }),
        (r.is = function (e) {
          return (
            e instanceof r ||
            ("object" == typeof e && null !== e && "function" == typeof e.next)
          )
        }),
        (t.exports = r)
    },
  }),
  require_support = __commonJS({
    "node_modules/obliterator/support.js"(e) {
      ;(e.ARRAY_BUFFER_SUPPORT = "undefined" != typeof ArrayBuffer),
        (e.SYMBOL_SUPPORT = "undefined" != typeof Symbol)
    },
  }),
  require_foreach = __commonJS({
    "node_modules/obliterator/foreach.js"(e, t) {
      var r = require_support(),
        n = r.ARRAY_BUFFER_SUPPORT,
        i = r.SYMBOL_SUPPORT
      t.exports = function e(t, r) {
        var s, a, o, u, l
        if (!t) throw Error("obliterator/forEach: invalid iterable.")
        if ("function" != typeof r)
          throw Error("obliterator/forEach: expecting a callback.")
        if (
          Array.isArray(t) ||
          (n && ArrayBuffer.isView(t)) ||
          "string" == typeof t ||
          "[object Arguments]" === t.toString()
        ) {
          for (o = 0, u = t.length; o < u; o++) r(t[o], o)
          return
        }
        if ("function" == typeof t.forEach) {
          t.forEach(r)
          return
        }
        if (
          (i &&
            Symbol.iterator in t &&
            "function" != typeof t.next &&
            (t = t[Symbol.iterator]()),
          "function" == typeof t.next)
        ) {
          for (s = t, o = 0; !0 !== (l = s.next()).done; ) r(l.value, o), o++
          return
        }
        for (a in t) t.hasOwnProperty(a) && r(t[a], a)
      }
    },
  }),
  require_typed_arrays = __commonJS({
    "node_modules/mnemonist/utils/typed-arrays.js"(e) {
      ;(e.getPointerArray = function (e) {
        var t = e - 1
        if (t <= 255) return Uint8Array
        if (t <= 65535) return Uint16Array
        if (t <= 4294967295) return Uint32Array
        throw Error(
          "mnemonist: Pointer Array of size > 4294967295 is not supported."
        )
      }),
        (e.getSignedPointerArray = function (e) {
          var t = e - 1
          return t <= 127
            ? Int8Array
            : t <= 32767
            ? Int16Array
            : t <= 2147483647
            ? Int32Array
            : Float64Array
        }),
        (e.getNumberType = function (e) {
          if (e === (0 | e))
            return -1 === Math.sign(e)
              ? e <= 127 && e >= -128
                ? Int8Array
                : e <= 32767 && e >= -32768
                ? Int16Array
                : Int32Array
              : e <= 255
              ? Uint8Array
              : e <= 65535
              ? Uint16Array
              : Uint32Array
          return Float64Array
        })
      var t = {
        Uint8Array: 1,
        Int8Array: 2,
        Uint16Array: 3,
        Int16Array: 4,
        Uint32Array: 5,
        Int32Array: 6,
        Float32Array: 7,
        Float64Array: 8,
      }
      ;(e.getMinimalRepresentation = function (r, n) {
        var i,
          s,
          a,
          o,
          u,
          l = null,
          h = 0
        for (o = 0, u = r.length; o < u; o++)
          (a = n ? n(r[o]) : r[o]),
            (i = t[(s = e.getNumberType(a)).name]) > h && ((h = i), (l = s))
        return l
      }),
        (e.isTypedArray = function (e) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView(e)
        }),
        (e.concat = function () {
          var e,
            t,
            r,
            n = 0
          for (e = 0, r = arguments.length; e < r; e++) n += arguments[e].length
          var i = new arguments[0].constructor(n)
          for (e = 0, t = 0; e < r; e++)
            i.set(arguments[e], t), (t += arguments[e].length)
          return i
        }),
        (e.indices = function (t) {
          for (var r = new (e.getPointerArray(t))(t), n = 0; n < t; n++)
            r[n] = n
          return r
        })
    },
  }),
  require_iterables = __commonJS({
    "node_modules/mnemonist/utils/iterables.js"(e) {
      var t = require_foreach(),
        r = require_typed_arrays()
      function n(e) {
        return "number" == typeof e.length
          ? e.length
          : "number" == typeof e.size
          ? e.size
          : void 0
      }
      ;(e.isArrayLike = function e(t) {
        return Array.isArray(t) || r.isTypedArray(t)
      }),
        (e.guessLength = n),
        (e.toArray = function e(r) {
          var i = n(r),
            s = "number" == typeof i ? Array(i) : [],
            a = 0
          return (
            t(r, function (e) {
              s[a++] = e
            }),
            s
          )
        }),
        (e.toArrayWithIndices = function e(i) {
          var s = n(i),
            a = "number" == typeof s ? r.getPointerArray(s) : Array,
            o = "number" == typeof s ? Array(s) : [],
            u = "number" == typeof s ? new a(s) : [],
            l = 0
          return (
            t(i, function (e) {
              ;(o[l] = e), (u[l] = l++)
            }),
            [o, u]
          )
        })
    },
  }),
  require_lru_cache = __commonJS({
    "node_modules/mnemonist/lru-cache.js"(e, t) {
      var r = require_iterator(),
        n = require_foreach(),
        i = require_typed_arrays(),
        s = require_iterables()
      function a(e, t, r) {
        if (
          (arguments.length < 2 && ((r = e), (e = null), (t = null)),
          (this.capacity = r),
          "number" != typeof this.capacity || this.capacity <= 0)
        )
          throw Error(
            "mnemonist/lru-cache: capacity should be positive number."
          )
        if (
          !isFinite(this.capacity) ||
          Math.floor(this.capacity) !== this.capacity
        )
          throw Error(
            "mnemonist/lru-cache: capacity should be a finite positive integer."
          )
        var n = i.getPointerArray(r)
        ;(this.forward = new n(r)),
          (this.backward = new n(r)),
          (this.K = "function" == typeof e ? new e(r) : Array(r)),
          (this.V = "function" == typeof t ? new t(r) : Array(r)),
          (this.size = 0),
          (this.head = 0),
          (this.tail = 0),
          (this.items = {})
      }
      ;(a.prototype.clear = function () {
        ;(this.size = 0), (this.head = 0), (this.tail = 0), (this.items = {})
      }),
        (a.prototype.splayOnTop = function (e) {
          var t = this.head
          if (this.head === e) return this
          var r = this.backward[e],
            n = this.forward[e]
          return (
            this.tail === e ? (this.tail = r) : (this.backward[n] = r),
            (this.forward[r] = n),
            (this.backward[t] = e),
            (this.head = e),
            (this.forward[e] = t),
            this
          )
        }),
        (a.prototype.set = function (e, t) {
          var r = this.items[e]
          if (void 0 !== r) {
            this.splayOnTop(r), (this.V[r] = t)
            return
          }
          this.size < this.capacity
            ? (r = this.size++)
            : ((r = this.tail),
              (this.tail = this.backward[r]),
              delete this.items[this.K[r]]),
            (this.items[e] = r),
            (this.K[r] = e),
            (this.V[r] = t),
            (this.forward[r] = this.head),
            (this.backward[this.head] = r),
            (this.head = r)
        }),
        (a.prototype.setpop = function (e, t) {
          var r = null,
            n = null,
            i = this.items[e]
          return void 0 !== i
            ? (this.splayOnTop(i),
              (r = this.V[i]),
              (this.V[i] = t),
              { evicted: !1, key: e, value: r })
            : (this.size < this.capacity
                ? (i = this.size++)
                : ((i = this.tail),
                  (this.tail = this.backward[i]),
                  (r = this.V[i]),
                  (n = this.K[i]),
                  delete this.items[n]),
              (this.items[e] = i),
              (this.K[i] = e),
              (this.V[i] = t),
              (this.forward[i] = this.head),
              (this.backward[this.head] = i),
              (this.head = i),
              n)
            ? { evicted: !0, key: n, value: r }
            : null
        }),
        (a.prototype.has = function (e) {
          return e in this.items
        }),
        (a.prototype.get = function (e) {
          var t = this.items[e]
          if (void 0 !== t) return this.splayOnTop(t), this.V[t]
        }),
        (a.prototype.peek = function (e) {
          var t = this.items[e]
          if (void 0 !== t) return this.V[t]
        }),
        (a.prototype.forEach = function (e, t) {
          t = arguments.length > 1 ? t : this
          for (
            var r = 0,
              n = this.size,
              i = this.head,
              s = this.K,
              a = this.V,
              o = this.forward;
            r < n;

          )
            e.call(t, a[i], s[i], this), (i = o[i]), r++
        }),
        (a.prototype.keys = function () {
          var e = 0,
            t = this.size,
            n = this.head,
            i = this.K,
            s = this.forward
          return new r(function () {
            if (e >= t) return { done: !0 }
            var r = i[n]
            return ++e < t && (n = s[n]), { done: !1, value: r }
          })
        }),
        (a.prototype.values = function () {
          var e = 0,
            t = this.size,
            n = this.head,
            i = this.V,
            s = this.forward
          return new r(function () {
            if (e >= t) return { done: !0 }
            var r = i[n]
            return ++e < t && (n = s[n]), { done: !1, value: r }
          })
        }),
        (a.prototype.entries = function () {
          var e = 0,
            t = this.size,
            n = this.head,
            i = this.K,
            s = this.V,
            a = this.forward
          return new r(function () {
            if (e >= t) return { done: !0 }
            var r = i[n],
              o = s[n]
            return ++e < t && (n = a[n]), { done: !1, value: [r, o] }
          })
        }),
        "undefined" != typeof Symbol &&
          (a.prototype[Symbol.iterator] = a.prototype.entries),
        (a.prototype.inspect = function () {
          for (var e, t = new Map(), r = this.entries(); !(e = r.next()).done; )
            t.set(e.value[0], e.value[1])
          return (
            Object.defineProperty(t, "constructor", {
              value: a,
              enumerable: !1,
            }),
            t
          )
        }),
        "undefined" != typeof Symbol &&
          (a.prototype[Symbol.for("nodejs.util.inspect.custom")] =
            a.prototype.inspect),
        (a.from = function (e, t, r, i) {
          if (arguments.length < 2) {
            if ("number" != typeof (i = s.guessLength(e)))
              throw Error(
                "mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument."
              )
          } else 2 === arguments.length && ((i = t), (t = null), (r = null))
          var o = new a(t, r, i)
          return (
            n(e, function (e, t) {
              o.set(t, e)
            }),
            o
          )
        }),
        (t.exports = a)
    },
  }),
  require_lru_map = __commonJS({
    "node_modules/mnemonist/lru-map.js"(e, t) {
      var r = require_lru_cache(),
        n = require_foreach(),
        i = require_typed_arrays(),
        s = require_iterables()
      function a(e, t, r) {
        if (
          (arguments.length < 2 && ((r = e), (e = null), (t = null)),
          (this.capacity = r),
          "number" != typeof this.capacity || this.capacity <= 0)
        )
          throw Error("mnemonist/lru-map: capacity should be positive number.")
        if (
          !isFinite(this.capacity) ||
          Math.floor(this.capacity) !== this.capacity
        )
          throw Error(
            "mnemonist/lru-map: capacity should be a finite positive integer."
          )
        var n = i.getPointerArray(r)
        ;(this.forward = new n(r)),
          (this.backward = new n(r)),
          (this.K = "function" == typeof e ? new e(r) : Array(r)),
          (this.V = "function" == typeof t ? new t(r) : Array(r)),
          (this.size = 0),
          (this.head = 0),
          (this.tail = 0),
          (this.items = new Map())
      }
      ;(a.prototype.clear = function () {
        ;(this.size = 0), (this.head = 0), (this.tail = 0), this.items.clear()
      }),
        (a.prototype.set = function (e, t) {
          var r = this.items.get(e)
          if (void 0 !== r) {
            this.splayOnTop(r), (this.V[r] = t)
            return
          }
          this.size < this.capacity
            ? (r = this.size++)
            : ((r = this.tail),
              (this.tail = this.backward[r]),
              this.items.delete(this.K[r])),
            this.items.set(e, r),
            (this.K[r] = e),
            (this.V[r] = t),
            (this.forward[r] = this.head),
            (this.backward[this.head] = r),
            (this.head = r)
        }),
        (a.prototype.setpop = function (e, t) {
          var r = null,
            n = null,
            i = this.items.get(e)
          return void 0 !== i
            ? (this.splayOnTop(i),
              (r = this.V[i]),
              (this.V[i] = t),
              { evicted: !1, key: e, value: r })
            : (this.size < this.capacity
                ? (i = this.size++)
                : ((i = this.tail),
                  (this.tail = this.backward[i]),
                  (r = this.V[i]),
                  (n = this.K[i]),
                  this.items.delete(n)),
              this.items.set(e, i),
              (this.K[i] = e),
              (this.V[i] = t),
              (this.forward[i] = this.head),
              (this.backward[this.head] = i),
              (this.head = i),
              n)
            ? { evicted: !0, key: n, value: r }
            : null
        }),
        (a.prototype.has = function (e) {
          return this.items.has(e)
        }),
        (a.prototype.get = function (e) {
          var t = this.items.get(e)
          if (void 0 !== t) return this.splayOnTop(t), this.V[t]
        }),
        (a.prototype.peek = function (e) {
          var t = this.items.get(e)
          if (void 0 !== t) return this.V[t]
        }),
        (a.prototype.splayOnTop = r.prototype.splayOnTop),
        (a.prototype.forEach = r.prototype.forEach),
        (a.prototype.keys = r.prototype.keys),
        (a.prototype.values = r.prototype.values),
        (a.prototype.entries = r.prototype.entries),
        "undefined" != typeof Symbol &&
          (a.prototype[Symbol.iterator] = a.prototype.entries),
        (a.prototype.inspect = r.prototype.inspect),
        (a.from = function (e, t, r, i) {
          if (arguments.length < 2) {
            if ("number" != typeof (i = s.guessLength(e)))
              throw Error(
                "mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument."
              )
          } else 2 === arguments.length && ((i = t), (t = null), (r = null))
          var o = new a(t, r, i)
          return (
            n(e, function (e, t) {
              o.set(t, e)
            }),
            o
          )
        }),
        (t.exports = a)
    },
  }),
  require_ms = __commonJS({
    "node_modules/ms/index.js"(e, t) {
      var r = 6e4,
        n = 60 * r,
        i = 24 * n,
        s = 7 * i,
        a = 365.25 * i
      function o(e, t, r, n) {
        return Math.round(e / r) + " " + n + (t >= 1.5 * r ? "s" : "")
      }
      t.exports = function (e, t) {
        t = t || {}
        var u,
          l,
          h,
          S,
          A = typeof e
        if ("string" === A && e.length > 0)
          return (function e(t) {
            if (!((t = String(t)).length > 100)) {
              var o =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                  t
                )
              if (o) {
                var u = parseFloat(o[1]),
                  l = (o[2] || "ms").toLowerCase()
                switch (l) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return u * a
                  case "weeks":
                  case "week":
                  case "w":
                    return u * s
                  case "days":
                  case "day":
                  case "d":
                    return u * i
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return u * n
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return u * r
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return 1e3 * u
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return u
                  default:
                    return
                }
              }
            }
          })(e)
        if ("number" === A && isFinite(e)) {
          return t.long
            ? ((u = e),
              (l = Math.abs(u)),
              l >= i
                ? o(u, l, i, "day")
                : l >= n
                ? o(u, l, n, "hour")
                : l >= r
                ? o(u, l, r, "minute")
                : l >= 1e3
                ? o(u, l, 1e3, "second")
                : u + " ms")
            : ((h = e),
              (S = Math.abs(h)),
              S >= i
                ? Math.round(h / i) + "d"
                : S >= n
                ? Math.round(h / n) + "h"
                : S >= r
                ? Math.round(h / r) + "m"
                : S >= 1e3
                ? Math.round(h / 1e3) + "s"
                : h + "ms")
        }
        throw Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(e)
        )
      }
    },
  }),
  require_common = __commonJS({
    "node_modules/debug/src/common.js"(e, t) {
      t.exports = function e(t) {
        function r(e) {
          let t,
            i = null,
            s,
            a
          function o(...e) {
            if (!o.enabled) return
            let n = o,
              i = Number(new Date()),
              s = i - (t || i)
            ;(n.diff = s),
              (n.prev = t),
              (n.curr = i),
              (t = i),
              (e[0] = r.coerce(e[0])),
              "string" != typeof e[0] && e.unshift("%O")
            let a = 0
            ;(e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
              if ("%%" === t) return "%"
              a++
              let s = r.formatters[i]
              if ("function" == typeof s) {
                let o = e[a]
                ;(t = s.call(n, o)), e.splice(a, 1), a--
              }
              return t
            })),
              r.formatArgs.call(n, e)
            let u = n.log || r.log
            u.apply(n, e)
          }
          return (
            (o.namespace = e),
            (o.useColors = r.useColors()),
            (o.color = r.selectColor(e)),
            (o.extend = n),
            (o.destroy = r.destroy),
            Object.defineProperty(o, "enabled", {
              enumerable: !0,
              configurable: !1,
              get: () =>
                null !== i
                  ? i
                  : (s !== r.namespaces &&
                      ((s = r.namespaces), (a = r.enabled(e))),
                    a),
              set(e) {
                i = e
              },
            }),
            "function" == typeof r.init && r.init(o),
            o
          )
        }
        function n(e, t) {
          let n = r(this.namespace + (void 0 === t ? ":" : t) + e)
          return (n.log = this.log), n
        }
        function i(e) {
          return e
            .toString()
            .substring(2, e.toString().length - 2)
            .replace(/\.\*\?$/, "*")
        }
        return (
          (r.debug = r),
          (r.default = r),
          (r.coerce = function e(t) {
            return t instanceof Error ? t.stack || t.message : t
          }),
          (r.disable = function e() {
            let t = [
              ...r.names.map(i),
              ...r.skips.map(i).map((e) => "-" + e),
            ].join(",")
            return r.enable(""), t
          }),
          (r.enable = function e(t) {
            r.save(t), (r.namespaces = t), (r.names = []), (r.skips = [])
            let n,
              i = ("string" == typeof t ? t : "").split(/[\s,]+/),
              s = i.length
            for (n = 0; n < s; n++)
              i[n] &&
                ("-" === (t = i[n].replace(/\*/g, ".*?"))[0]
                  ? r.skips.push(RegExp("^" + t.slice(1) + "$"))
                  : r.names.push(RegExp("^" + t + "$")))
          }),
          (r.enabled = function e(t) {
            if ("*" === t[t.length - 1]) return !0
            let n, i
            for (n = 0, i = r.skips.length; n < i; n++)
              if (r.skips[n].test(t)) return !1
            for (n = 0, i = r.names.length; n < i; n++)
              if (r.names[n].test(t)) return !0
            return !1
          }),
          (r.humanize = require_ms()),
          (r.destroy = function e() {
            console.warn(
              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            )
          }),
          Object.keys(t).forEach((e) => {
            r[e] = t[e]
          }),
          (r.names = []),
          (r.skips = []),
          (r.formatters = {}),
          (r.selectColor = function e(t) {
            let n = 0
            for (let i = 0; i < t.length; i++)
              (n = (n << 5) - n + t.charCodeAt(i)), (n |= 0)
            return r.colors[Math.abs(n) % r.colors.length]
          }),
          r.enable(r.load()),
          r
        )
      }
    },
  }),
  require_browser = __commonJS({
    "node_modules/debug/src/browser.js"(e, t) {
      ;(e.formatArgs = function e(r) {
        if (
          ((r[0] =
            (this.useColors ? "%c" : "") +
            this.namespace +
            (this.useColors ? " %c" : " ") +
            r[0] +
            (this.useColors ? "%c " : " ") +
            "+" +
            t.exports.humanize(this.diff)),
          !this.useColors)
        )
          return
        let n = "color: " + this.color
        r.splice(1, 0, n, "color: inherit")
        let i = 0,
          s = 0
        r[0].replace(/%[a-zA-Z%]/g, (e) => {
          "%%" !== e && (i++, "%c" === e && (s = i))
        }),
          r.splice(s, 0, n)
      }),
        (e.save = function t(r) {
          try {
            r ? e.storage.setItem("debug", r) : e.storage.removeItem("debug")
          } catch (n) {}
        }),
        (e.load = function t() {
          let r
          try {
            r = e.storage.getItem("debug")
          } catch (n) {}
          return (
            !r &&
              "undefined" != typeof process &&
              "env" in process &&
              (r = process.env.DEBUG),
            r
          )
        }),
        (e.useColors = function e() {
          if (
            "undefined" != typeof window &&
            window.process &&
            ("renderer" === window.process.type || window.process.__nwjs)
          )
            return !0
          if (
            "undefined" != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1
          let t
          return (
            ("undefined" != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ("undefined" != typeof window &&
              window.console &&
              (window.console.firebug ||
                (window.console.exception && window.console.table))) ||
            ("undefined" != typeof navigator &&
              navigator.userAgent &&
              (t = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
              parseInt(t[1], 10) >= 31) ||
            ("undefined" != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          )
        }),
        (e.storage = (function e() {
          try {
            return localStorage
          } catch (t) {}
        })())
      let r
      ;(e.destroy =
        ((r = !1),
        () => {
          r ||
            ((r = !0),
            console.warn(
              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            ))
        })),
        (e.colors = [
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
          "#FFCC33",
        ]),
        (e.log = console.debug || console.log || (() => {})),
        (t.exports = require_common()(e))
      var { formatters: n } = t.exports
      n.j = function (e) {
        try {
          return JSON.stringify(e)
        } catch (t) {
          return "[UnexpectedJSONParseError]: " + t.message
        }
      }
    },
  }),
  require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(e) {
      "use strict"
      ;(e.byteLength = function e(t) {
        var r = o(t),
          n = r[0],
          i = r[1]
        return ((n + i) * 3) / 4 - i
      }),
        (e.toByteArray = function e(t) {
          var r,
            n,
            a,
            u,
            l,
            h = o(t),
            S = h[0],
            A = h[1],
            O = new s(((u = S), (l = A), ((u + l) * 3) / 4 - l)),
            L = 0,
            V = A > 0 ? S - 4 : S
          for (n = 0; n < V; n += 4)
            (r =
              (i[t.charCodeAt(n)] << 18) |
              (i[t.charCodeAt(n + 1)] << 12) |
              (i[t.charCodeAt(n + 2)] << 6) |
              i[t.charCodeAt(n + 3)]),
              (O[L++] = (r >> 16) & 255),
              (O[L++] = (r >> 8) & 255),
              (O[L++] = 255 & r)
          return (
            2 === A &&
              ((r = (i[t.charCodeAt(n)] << 2) | (i[t.charCodeAt(n + 1)] >> 4)),
              (O[L++] = 255 & r)),
            1 === A &&
              ((r =
                (i[t.charCodeAt(n)] << 10) |
                (i[t.charCodeAt(n + 1)] << 4) |
                (i[t.charCodeAt(n + 2)] >> 2)),
              (O[L++] = (r >> 8) & 255),
              (O[L++] = 255 & r)),
            O
          )
        }),
        (e.fromByteArray = function e(t) {
          for (
            var r, i = t.length, s = i % 3, a = [], o = 0, u = i - s;
            o < u;
            o += 16383
          )
            a.push(l(t, o, o + 16383 > u ? u : o + 16383))
          return (
            1 === s
              ? a.push(n[(r = t[i - 1]) >> 2] + n[(r << 4) & 63] + "==")
              : 2 === s &&
                a.push(
                  n[(r = (t[i - 2] << 8) + t[i - 1]) >> 10] +
                    n[(r >> 4) & 63] +
                    n[(r << 2) & 63] +
                    "="
                ),
            a.join("")
          )
        })
      var t,
        r,
        n = [],
        i = [],
        s = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
      for (t = 0, r = a.length; t < r; ++t)
        (n[t] = a[t]), (i[a.charCodeAt(t)] = t)
      function o(e) {
        var t = e.length
        if (t % 4 > 0)
          throw Error("Invalid string. Length must be a multiple of 4")
        var r = e.indexOf("=")
        ;-1 === r && (r = t)
        var n = r === t ? 0 : 4 - (r % 4)
        return [r, n]
      }
      function u(e) {
        return (
          n[(e >> 18) & 63] + n[(e >> 12) & 63] + n[(e >> 6) & 63] + n[63 & e]
        )
      }
      function l(e, t, r) {
        for (var n, i = [], s = t; s < r; s += 3)
          i.push(
            u(
              (n =
                ((e[s] << 16) & 16711680) +
                ((e[s + 1] << 8) & 65280) +
                (255 & e[s + 2]))
            )
          )
        return i.join("")
      }
      ;(i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63)
    },
  }),
  require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(e) {
      ;(e.read = function (e, t, r, n, i) {
        var s,
          a,
          o = 8 * i - n - 1,
          u = (1 << o) - 1,
          l = u >> 1,
          h = -7,
          S = r ? i - 1 : 0,
          A = r ? -1 : 1,
          O = e[t + S]
        for (
          S += A, s = O & ((1 << -h) - 1), O >>= -h, h += o;
          h > 0;
          s = 256 * s + e[t + S], S += A, h -= 8
        );
        for (
          a = s & ((1 << -h) - 1), s >>= -h, h += n;
          h > 0;
          a = 256 * a + e[t + S], S += A, h -= 8
        );
        if (0 === s) s = 1 - l
        else {
          if (s === u) return a ? NaN : (O ? -1 : 1) * (1 / 0)
          ;(a += Math.pow(2, n)), (s -= l)
        }
        return (O ? -1 : 1) * a * Math.pow(2, s - n)
      }),
        (e.write = function (e, t, r, n, i, s) {
          var a,
            o,
            u,
            l = 8 * s - i - 1,
            h = (1 << l) - 1,
            S = h >> 1,
            A = 23 === i ? 5960464477539062e-23 : 0,
            O = n ? 0 : s - 1,
            L = n ? 1 : -1,
            V = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0
          for (
            isNaN((t = Math.abs(t))) || t === 1 / 0
              ? ((o = isNaN(t) ? 1 : 0), (a = h))
              : ((a = Math.floor(Math.log(t) / Math.LN2)),
                t * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
                a + S >= 1 ? (t += A / u) : (t += A * Math.pow(2, 1 - S)),
                t * u >= 2 && (a++, (u /= 2)),
                a + S >= h
                  ? ((o = 0), (a = h))
                  : a + S >= 1
                  ? ((o = (t * u - 1) * Math.pow(2, i)), (a += S))
                  : ((o = t * Math.pow(2, S - 1) * Math.pow(2, i)), (a = 0)));
            i >= 8;
            e[r + O] = 255 & o, O += L, o /= 256, i -= 8
          );
          for (
            a = (a << i) | o, l += i;
            l > 0;
            e[r + O] = 255 & a, O += L, a /= 256, l -= 8
          );
          e[r + O - L] |= 128 * V
        })
    },
  }),
  require_buffer = __commonJS({
    "node_modules/buffer/index.js"(e) {
      "use strict"
      var t = require_base64_js(),
        r = require_ieee754(),
        n =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null
      function i(e) {
        if (e > 2147483647)
          throw RangeError('The value "' + e + '" is invalid for option "size"')
        let t = new Uint8Array(e)
        return Object.setPrototypeOf(t, s.prototype), t
      }
      function s(e, t, r) {
        if ("number" == typeof e) {
          if ("string" == typeof t)
            throw TypeError(
              'The "string" argument must be of type string. Received type number'
            )
          return u(e)
        }
        return a(e, t, r)
      }
      function a(e, t, r) {
        if ("string" == typeof e)
          return (function e(t, r) {
            if (
              (("string" != typeof r || "" === r) && (r = "utf8"),
              !s.isEncoding(r))
            )
              throw TypeError("Unknown encoding: " + r)
            let n = 0 | A(t, r),
              a = i(n),
              o = a.write(t, r)
            return o !== n && (a = a.slice(0, o)), a
          })(e, t)
        if (ArrayBuffer.isView(e))
          return (function e(t) {
            if (e4(t, Uint8Array)) {
              let r = new Uint8Array(t)
              return h(r.buffer, r.byteOffset, r.byteLength)
            }
            return l(t)
          })(e)
        if (null == e)
          throw TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof e
          )
        if (
          e4(e, ArrayBuffer) ||
          (e && e4(e.buffer, ArrayBuffer)) ||
          ("undefined" != typeof SharedArrayBuffer &&
            (e4(e, SharedArrayBuffer) ||
              (e && e4(e.buffer, SharedArrayBuffer))))
        )
          return h(e, t, r)
        if ("number" == typeof e)
          throw TypeError(
            'The "value" argument must not be of type number. Received type number'
          )
        let n = e.valueOf && e.valueOf()
        if (null != n && n !== e) return s.from(n, t, r)
        let a = (function e(t) {
          if (s.isBuffer(t)) {
            let r = 0 | S(t.length),
              n = i(r)
            return 0 === n.length || t.copy(n, 0, 0, r), n
          }
          if (void 0 !== t.length) {
            var a
            return "number" != typeof t.length || ((a = t.length), a != a)
              ? i(0)
              : l(t)
          }
          if ("Buffer" === t.type && Array.isArray(t.data)) return l(t.data)
        })(e)
        if (a) return a
        if (
          "undefined" != typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" == typeof e[Symbol.toPrimitive]
        )
          return s.from(e[Symbol.toPrimitive]("string"), t, r)
        throw TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof e
        )
      }
      function o(e) {
        if ("number" != typeof e)
          throw TypeError('"size" argument must be of type number')
        if (e < 0)
          throw RangeError('The value "' + e + '" is invalid for option "size"')
      }
      function u(e) {
        return o(e), i(e < 0 ? 0 : 0 | S(e))
      }
      function l(e) {
        let t = e.length < 0 ? 0 : 0 | S(e.length),
          r = i(t)
        for (let n = 0; n < t; n += 1) r[n] = 255 & e[n]
        return r
      }
      function h(e, t, r) {
        if (t < 0 || e.byteLength < t)
          throw RangeError('"offset" is outside of buffer bounds')
        if (e.byteLength < t + (r || 0))
          throw RangeError('"length" is outside of buffer bounds')
        let n
        return (
          Object.setPrototypeOf(
            (n =
              void 0 === t && void 0 === r
                ? new Uint8Array(e)
                : void 0 === r
                ? new Uint8Array(e, t)
                : new Uint8Array(e, t, r)),
            s.prototype
          ),
          n
        )
      }
      function S(e) {
        if (e >= 2147483647)
          throw RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              (2147483647).toString(16) +
              " bytes"
          )
        return 0 | e
      }
      function A(e, t) {
        if (s.isBuffer(e)) return e.length
        if (ArrayBuffer.isView(e) || e4(e, ArrayBuffer)) return e.byteLength
        if ("string" != typeof e)
          throw TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof e
          )
        let r = e.length,
          n = arguments.length > 2 && !0 === arguments[2]
        if (!n && 0 === r) return 0
        let i = !1
        for (;;)
          switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
              return r
            case "utf8":
            case "utf-8":
              return eA(e).length
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r
            case "hex":
              return r >>> 1
            case "base64":
              return eE(e).length
            default:
              if (i) return n ? -1 : eA(e).length
              ;(t = ("" + t).toLowerCase()), (i = !0)
          }
      }
      function O(e, t, r) {
        let n = !1
        if (
          ((void 0 === t || t < 0) && (t = 0),
          t > this.length ||
            ((void 0 === r || r > this.length) && (r = this.length),
            r <= 0 || (r >>>= 0) <= (t >>>= 0)))
        )
          return ""
        for (e || (e = "utf8"); ; )
          switch (e) {
            case "hex":
              return eg(this, t, r)
            case "utf8":
            case "utf-8":
              return eh(this, t, r)
            case "ascii":
              return ey(this, t, r)
            case "latin1":
            case "binary":
              return em(this, t, r)
            case "base64":
              return ef(this, t, r)
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return e$(this, t, r)
            default:
              if (n) throw TypeError("Unknown encoding: " + e)
              ;(e = (e + "").toLowerCase()), (n = !0)
          }
      }
      function L(e, t, r) {
        let n = e[t]
        ;(e[t] = e[r]), (e[r] = n)
      }
      function V(e, t, r, n, i) {
        var a
        if (0 === e.length) return -1
        if (
          ("string" == typeof r
            ? ((n = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (a = r = +r),
          a != a && (r = i ? 0 : e.length - 1),
          r < 0 && (r = e.length + r),
          r >= e.length)
        ) {
          if (i) return -1
          r = e.length - 1
        } else if (r < 0) {
          if (!i) return -1
          r = 0
        }
        if (("string" == typeof t && (t = s.from(t, n)), s.isBuffer(t)))
          return 0 === t.length ? -1 : W(e, t, r, n, i)
        if ("number" == typeof t)
          return ((t &= 255), "function" == typeof Uint8Array.prototype.indexOf)
            ? i
              ? Uint8Array.prototype.indexOf.call(e, t, r)
              : Uint8Array.prototype.lastIndexOf.call(e, t, r)
            : W(e, [t], r, n, i)
        throw TypeError("val must be string, number or Buffer")
      }
      function W(e, t, r, n, i) {
        let s = 1,
          a = e.length,
          o = t.length
        if (
          void 0 !== n &&
          ("ucs2" === (n = String(n).toLowerCase()) ||
            "ucs-2" === n ||
            "utf16le" === n ||
            "utf-16le" === n)
        ) {
          if (e.length < 2 || t.length < 2) return -1
          ;(s = 2), (a /= 2), (o /= 2), (r /= 2)
        }
        function u(e, t) {
          return 1 === s ? e[t] : e.readUInt16BE(t * s)
        }
        let l
        if (i) {
          let h = -1
          for (l = r; l < a; l++)
            if (u(e, l) === u(t, -1 === h ? 0 : l - h)) {
              if ((-1 === h && (h = l), l - h + 1 === o)) return h * s
            } else -1 !== h && (l -= l - h), (h = -1)
        } else
          for (r + o > a && (r = a - o), l = r; l >= 0; l--) {
            let S = !0
            for (let A = 0; A < o; A++)
              if (u(e, l + A) !== u(t, A)) {
                S = !1
                break
              }
            if (S) return l
          }
        return -1
      }
      function ei(e, t, r, n) {
        r = Number(r) || 0
        let i = e.length - r
        n ? (n = Number(n)) > i && (n = i) : (n = i)
        let s = t.length
        n > s / 2 && (n = s / 2)
        let a
        for (a = 0; a < n; ++a) {
          var o
          let u = parseInt(t.substr(2 * a, 2), 16)
          if (((o = u), o != o)) break
          e[r + a] = u
        }
        return a
      }
      function eo(e, t, r, n) {
        return eR(eA(t, e.length - r), e, r, n)
      }
      function eu(e, t, r, n) {
        return eR(
          (function e(t) {
            let r = []
            for (let n = 0; n < t.length; ++n) r.push(255 & t.charCodeAt(n))
            return r
          })(t),
          e,
          r,
          n
        )
      }
      function ed(e, t, r, n) {
        return eR(eE(t), e, r, n)
      }
      function ec(e, t, r, n) {
        return eR(
          (function e(t, r) {
            let n,
              i,
              s,
              a = []
            for (let o = 0; o < t.length && !((r -= 2) < 0); ++o)
              (i = (n = t.charCodeAt(o)) >> 8),
                (s = n % 256),
                a.push(s),
                a.push(i)
            return a
          })(t, e.length - r),
          e,
          r,
          n
        )
      }
      function ef(e, r, n) {
        return 0 === r && n === e.length
          ? t.fromByteArray(e)
          : t.fromByteArray(e.slice(r, n))
      }
      function eh(e, t, r) {
        r = Math.min(e.length, r)
        let n = [],
          i = t
        for (; i < r; ) {
          let s = e[i],
            a = null,
            o = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1
          if (i + o <= r) {
            let u, l, h, S
            switch (o) {
              case 1:
                s < 128 && (a = s)
                break
              case 2:
                ;(192 & (u = e[i + 1])) == 128 &&
                  (S = ((31 & s) << 6) | (63 & u)) > 127 &&
                  (a = S)
                break
              case 3:
                ;(u = e[i + 1]),
                  (l = e[i + 2]),
                  (192 & u) == 128 &&
                    (192 & l) == 128 &&
                    (S = ((15 & s) << 12) | ((63 & u) << 6) | (63 & l)) >
                      2047 &&
                    (S < 55296 || S > 57343) &&
                    (a = S)
                break
              case 4:
                ;(u = e[i + 1]),
                  (l = e[i + 2]),
                  (h = e[i + 3]),
                  (192 & u) == 128 &&
                    (192 & l) == 128 &&
                    (192 & h) == 128 &&
                    (S =
                      ((15 & s) << 18) |
                      ((63 & u) << 12) |
                      ((63 & l) << 6) |
                      (63 & h)) > 65535 &&
                    S < 1114112 &&
                    (a = S)
            }
          }
          null === a
            ? ((a = 65533), (o = 1))
            : a > 65535 &&
              ((a -= 65536),
              n.push(((a >>> 10) & 1023) | 55296),
              (a = 56320 | (1023 & a))),
            n.push(a),
            (i += o)
        }
        return (function e(t) {
          let r = t.length
          if (r <= ep) return String.fromCharCode.apply(String, t)
          let n = "",
            i = 0
          for (; i < r; )
            n += String.fromCharCode.apply(String, t.slice(i, (i += ep)))
          return n
        })(n)
      }
      ;(e.Buffer = s),
        (e.SlowBuffer = function e(t) {
          return +t != t && (t = 0), s.alloc(+t)
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (e.kMaxLength = 2147483647),
        (s.TYPED_ARRAY_SUPPORT = (function e() {
          try {
            let t = new Uint8Array(1),
              r = {
                foo: function () {
                  return 42
                },
              }
            return (
              Object.setPrototypeOf(r, Uint8Array.prototype),
              Object.setPrototypeOf(t, r),
              42 === t.foo()
            )
          } catch (n) {
            return !1
          }
        })()),
        s.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(s.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (s.isBuffer(this)) return this.buffer
          },
        }),
        Object.defineProperty(s.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (s.isBuffer(this)) return this.byteOffset
          },
        }),
        (s.poolSize = 8192),
        (s.from = function (e, t, r) {
          return a(e, t, r)
        }),
        Object.setPrototypeOf(s.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(s, Uint8Array),
        (s.alloc = function (e, t, r) {
          var n, s, a
          return (
            (n = e),
            (s = t),
            (a = r),
            (o(n), n <= 0)
              ? i(n)
              : void 0 !== s
              ? "string" == typeof a
                ? i(n).fill(s, a)
                : i(n).fill(s)
              : i(n)
          )
        }),
        (s.allocUnsafe = function (e) {
          return u(e)
        }),
        (s.allocUnsafeSlow = function (e) {
          return u(e)
        }),
        (s.isBuffer = function e(t) {
          return null != t && !0 === t._isBuffer && t !== s.prototype
        }),
        (s.compare = function e(t, r) {
          if (
            (e4(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)),
            e4(r, Uint8Array) && (r = s.from(r, r.offset, r.byteLength)),
            !s.isBuffer(t) || !s.isBuffer(r))
          )
            throw TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            )
          if (t === r) return 0
          let n = t.length,
            i = r.length
          for (let a = 0, o = Math.min(n, i); a < o; ++a)
            if (t[a] !== r[a]) {
              ;(n = t[a]), (i = r[a])
              break
            }
          return n < i ? -1 : i < n ? 1 : 0
        }),
        (s.isEncoding = function e(t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0
            default:
              return !1
          }
        }),
        (s.concat = function e(t, r) {
          if (!Array.isArray(t))
            throw TypeError('"list" argument must be an Array of Buffers')
          if (0 === t.length) return s.alloc(0)
          let n
          if (void 0 === r)
            for (n = 0, r = 0; n < t.length; ++n) r += t[n].length
          let i = s.allocUnsafe(r),
            a = 0
          for (n = 0; n < t.length; ++n) {
            let o = t[n]
            if (e4(o, Uint8Array))
              a + o.length > i.length
                ? (s.isBuffer(o) || (o = s.from(o)), o.copy(i, a))
                : Uint8Array.prototype.set.call(i, o, a)
            else if (s.isBuffer(o)) o.copy(i, a)
            else throw TypeError('"list" argument must be an Array of Buffers')
            a += o.length
          }
          return i
        }),
        (s.byteLength = A),
        (s.prototype._isBuffer = !0),
        (s.prototype.swap16 = function e() {
          let t = this.length
          if (t % 2 != 0)
            throw RangeError("Buffer size must be a multiple of 16-bits")
          for (let r = 0; r < t; r += 2) L(this, r, r + 1)
          return this
        }),
        (s.prototype.swap32 = function e() {
          let t = this.length
          if (t % 4 != 0)
            throw RangeError("Buffer size must be a multiple of 32-bits")
          for (let r = 0; r < t; r += 4)
            L(this, r, r + 3), L(this, r + 1, r + 2)
          return this
        }),
        (s.prototype.swap64 = function e() {
          let t = this.length
          if (t % 8 != 0)
            throw RangeError("Buffer size must be a multiple of 64-bits")
          for (let r = 0; r < t; r += 8)
            L(this, r, r + 7),
              L(this, r + 1, r + 6),
              L(this, r + 2, r + 5),
              L(this, r + 3, r + 4)
          return this
        }),
        (s.prototype.toString = function e() {
          let t = this.length
          return 0 === t
            ? ""
            : 0 === arguments.length
            ? eh(this, 0, t)
            : O.apply(this, arguments)
        }),
        (s.prototype.toLocaleString = s.prototype.toString),
        (s.prototype.equals = function e(t) {
          if (!s.isBuffer(t)) throw TypeError("Argument must be a Buffer")
          return this === t || 0 === s.compare(this, t)
        }),
        (s.prototype.inspect = function t() {
          let r = "",
            n = e.INSPECT_MAX_BYTES
          return (
            (r = this.toString("hex", 0, n)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > n && (r += " ... "),
            "<Buffer " + r + ">"
          )
        }),
        n && (s.prototype[n] = s.prototype.inspect),
        (s.prototype.compare = function e(t, r, n, i, a) {
          if (
            (e4(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)),
            !s.isBuffer(t))
          )
            throw TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof t
            )
          if (
            (void 0 === r && (r = 0),
            void 0 === n && (n = t ? t.length : 0),
            void 0 === i && (i = 0),
            void 0 === a && (a = this.length),
            r < 0 || n > t.length || i < 0 || a > this.length)
          )
            throw RangeError("out of range index")
          if (i >= a && r >= n) return 0
          if (i >= a) return -1
          if (r >= n) return 1
          if (((r >>>= 0), (n >>>= 0), (i >>>= 0), (a >>>= 0), this === t))
            return 0
          let o = a - i,
            u = n - r,
            l = Math.min(o, u),
            h = this.slice(i, a),
            S = t.slice(r, n)
          for (let A = 0; A < l; ++A)
            if (h[A] !== S[A]) {
              ;(o = h[A]), (u = S[A])
              break
            }
          return o < u ? -1 : u < o ? 1 : 0
        }),
        (s.prototype.includes = function e(t, r, n) {
          return -1 !== this.indexOf(t, r, n)
        }),
        (s.prototype.indexOf = function e(t, r, n) {
          return V(this, t, r, n, !0)
        }),
        (s.prototype.lastIndexOf = function e(t, r, n) {
          return V(this, t, r, n, !1)
        }),
        (s.prototype.write = function e(t, r, n, i) {
          if (void 0 === r) (i = "utf8"), (n = this.length), (r = 0)
          else if (void 0 === n && "string" == typeof r)
            (i = r), (n = this.length), (r = 0)
          else if (isFinite(r))
            (r >>>= 0),
              isFinite(n)
                ? ((n >>>= 0), void 0 === i && (i = "utf8"))
                : ((i = n), (n = void 0))
          else
            throw Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            )
          let s = this.length - r
          if (
            ((void 0 === n || n > s) && (n = s),
            (t.length > 0 && (n < 0 || r < 0)) || r > this.length)
          )
            throw RangeError("Attempt to write outside buffer bounds")
          i || (i = "utf8")
          let a = !1
          for (;;)
            switch (i) {
              case "hex":
                return ei(this, t, r, n)
              case "utf8":
              case "utf-8":
                return eo(this, t, r, n)
              case "ascii":
              case "latin1":
              case "binary":
                return eu(this, t, r, n)
              case "base64":
                return ed(this, t, r, n)
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return ec(this, t, r, n)
              default:
                if (a) throw TypeError("Unknown encoding: " + i)
                ;(i = ("" + i).toLowerCase()), (a = !0)
            }
        }),
        (s.prototype.toJSON = function e() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          }
        })
      var ep = 4096
      function ey(e, t, r) {
        let n = ""
        r = Math.min(e.length, r)
        for (let i = t; i < r; ++i) n += String.fromCharCode(127 & e[i])
        return n
      }
      function em(e, t, r) {
        let n = ""
        r = Math.min(e.length, r)
        for (let i = t; i < r; ++i) n += String.fromCharCode(e[i])
        return n
      }
      function eg(e, t, r) {
        let n = e.length
        ;(!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n)
        let i = ""
        for (let s = t; s < r; ++s) i += eL[e[s]]
        return i
      }
      function e$(e, t, r) {
        let n = e.slice(t, r),
          i = ""
        for (let s = 0; s < n.length - 1; s += 2)
          i += String.fromCharCode(n[s] + 256 * n[s + 1])
        return i
      }
      function e8(e, t, r) {
        if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint")
        if (e + t > r) throw RangeError("Trying to access beyond buffer length")
      }
      function ev(e, t, r, n, i, a) {
        if (!s.isBuffer(e))
          throw TypeError('"buffer" argument must be a Buffer instance')
        if (t > i || t < a)
          throw RangeError('"value" argument is out of bounds')
        if (r + n > e.length) throw RangeError("Index out of range")
      }
      function eb(e, t, r, n, i) {
        ek(t, n, i, e, r, 7)
        let s = Number(t & BigInt(4294967295))
        ;(e[r++] = s),
          (s >>= 8),
          (e[r++] = s),
          (s >>= 8),
          (e[r++] = s),
          (s >>= 8),
          (e[r++] = s)
        let a = Number((t >> BigInt(32)) & BigInt(4294967295))
        return (
          (e[r++] = a),
          (a >>= 8),
          (e[r++] = a),
          (a >>= 8),
          (e[r++] = a),
          (a >>= 8),
          (e[r++] = a),
          r
        )
      }
      function ew(e, t, r, n, i) {
        ek(t, n, i, e, r, 7)
        let s = Number(t & BigInt(4294967295))
        ;(e[r + 7] = s),
          (s >>= 8),
          (e[r + 6] = s),
          (s >>= 8),
          (e[r + 5] = s),
          (s >>= 8),
          (e[r + 4] = s)
        let a = Number((t >> BigInt(32)) & BigInt(4294967295))
        return (
          (e[r + 3] = a),
          (a >>= 8),
          (e[r + 2] = a),
          (a >>= 8),
          (e[r + 1] = a),
          (a >>= 8),
          (e[r] = a),
          r + 8
        )
      }
      function e0(e, t, r, n, i, s) {
        if (r + n > e.length || r < 0) throw RangeError("Index out of range")
      }
      function e_(e, t, n, i, s) {
        return (
          (t = +t),
          (n >>>= 0),
          s || e0(e, t, n, 4, 34028234663852886e22, -34028234663852886e22),
          r.write(e, t, n, i, 23, 4),
          n + 4
        )
      }
      function eT(e, t, n, i, s) {
        return (
          (t = +t),
          (n >>>= 0),
          s || e0(e, t, n, 8, 17976931348623157e292, -17976931348623157e292),
          r.write(e, t, n, i, 52, 8),
          n + 8
        )
      }
      ;(s.prototype.slice = function e(t, r) {
        let n = this.length
        ;(t = ~~t),
          (r = void 0 === r ? n : ~~r),
          t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          r < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n),
          r < t && (r = t)
        let i = this.subarray(t, r)
        return Object.setPrototypeOf(i, s.prototype), i
      }),
        (s.prototype.readUintLE = s.prototype.readUIntLE =
          function e(t, r, n) {
            ;(t >>>= 0), (r >>>= 0), n || e8(t, r, this.length)
            let i = this[t],
              s = 1,
              a = 0
            for (; ++a < r && (s *= 256); ) i += this[t + a] * s
            return i
          }),
        (s.prototype.readUintBE = s.prototype.readUIntBE =
          function e(t, r, n) {
            ;(t >>>= 0), (r >>>= 0), n || e8(t, r, this.length)
            let i = this[t + --r],
              s = 1
            for (; r > 0 && (s *= 256); ) i += this[t + --r] * s
            return i
          }),
        (s.prototype.readUint8 = s.prototype.readUInt8 =
          function e(t, r) {
            return (t >>>= 0), r || e8(t, 1, this.length), this[t]
          }),
        (s.prototype.readUint16LE = s.prototype.readUInt16LE =
          function e(t, r) {
            return (
              (t >>>= 0),
              r || e8(t, 2, this.length),
              this[t] | (this[t + 1] << 8)
            )
          }),
        (s.prototype.readUint16BE = s.prototype.readUInt16BE =
          function e(t, r) {
            return (
              (t >>>= 0),
              r || e8(t, 2, this.length),
              (this[t] << 8) | this[t + 1]
            )
          }),
        (s.prototype.readUint32LE = s.prototype.readUInt32LE =
          function e(t, r) {
            return (
              (t >>>= 0),
              r || e8(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            )
          }),
        (s.prototype.readUint32BE = s.prototype.readUInt32BE =
          function e(t, r) {
            return (
              (t >>>= 0),
              r || e8(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            )
          }),
        (s.prototype.readBigUInt64LE = e1(function e(t) {
          eI((t >>>= 0), "offset")
          let r = this[t],
            n = this[t + 7]
          ;(void 0 === r || void 0 === n) && eS(t, this.length - 8)
          let i =
              r + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t],
            s = this[++t] + 256 * this[++t] + 65536 * this[++t] + 16777216 * n
          return BigInt(i) + (BigInt(s) << BigInt(32))
        })),
        (s.prototype.readBigUInt64BE = e1(function e(t) {
          eI((t >>>= 0), "offset")
          let r = this[t],
            n = this[t + 7]
          ;(void 0 === r || void 0 === n) && eS(t, this.length - 8)
          let i =
              16777216 * r + 65536 * this[++t] + 256 * this[++t] + this[++t],
            s = 16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + n
          return (BigInt(i) << BigInt(32)) + BigInt(s)
        })),
        (s.prototype.readIntLE = function e(t, r, n) {
          ;(t >>>= 0), (r >>>= 0), n || e8(t, r, this.length)
          let i = this[t],
            s = 1,
            a = 0
          for (; ++a < r && (s *= 256); ) i += this[t + a] * s
          return i >= (s *= 128) && (i -= Math.pow(2, 8 * r)), i
        }),
        (s.prototype.readIntBE = function e(t, r, n) {
          ;(t >>>= 0), (r >>>= 0), n || e8(t, r, this.length)
          let i = r,
            s = 1,
            a = this[t + --i]
          for (; i > 0 && (s *= 256); ) a += this[t + --i] * s
          return a >= (s *= 128) && (a -= Math.pow(2, 8 * r)), a
        }),
        (s.prototype.readInt8 = function e(t, r) {
          return ((t >>>= 0), r || e8(t, 1, this.length), 128 & this[t])
            ? -((255 - this[t] + 1) * 1)
            : this[t]
        }),
        (s.prototype.readInt16LE = function e(t, r) {
          ;(t >>>= 0), r || e8(t, 2, this.length)
          let n = this[t] | (this[t + 1] << 8)
          return 32768 & n ? 4294901760 | n : n
        }),
        (s.prototype.readInt16BE = function e(t, r) {
          ;(t >>>= 0), r || e8(t, 2, this.length)
          let n = this[t + 1] | (this[t] << 8)
          return 32768 & n ? 4294901760 | n : n
        }),
        (s.prototype.readInt32LE = function e(t, r) {
          return (
            (t >>>= 0),
            r || e8(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          )
        }),
        (s.prototype.readInt32BE = function e(t, r) {
          return (
            (t >>>= 0),
            r || e8(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          )
        }),
        (s.prototype.readBigInt64LE = e1(function e(t) {
          eI((t >>>= 0), "offset")
          let r = this[t],
            n = this[t + 7]
          ;(void 0 === r || void 0 === n) && eS(t, this.length - 8)
          let i =
            this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (n << 24)
          return (
            (BigInt(i) << BigInt(32)) +
            BigInt(
              r + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t]
            )
          )
        })),
        (s.prototype.readBigInt64BE = e1(function e(t) {
          eI((t >>>= 0), "offset")
          let r = this[t],
            n = this[t + 7]
          ;(void 0 === r || void 0 === n) && eS(t, this.length - 8)
          let i = (r << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t]
          return (
            (BigInt(i) << BigInt(32)) +
            BigInt(
              16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + n
            )
          )
        })),
        (s.prototype.readFloatLE = function e(t, n) {
          return (
            (t >>>= 0), n || e8(t, 4, this.length), r.read(this, t, !0, 23, 4)
          )
        }),
        (s.prototype.readFloatBE = function e(t, n) {
          return (
            (t >>>= 0), n || e8(t, 4, this.length), r.read(this, t, !1, 23, 4)
          )
        }),
        (s.prototype.readDoubleLE = function e(t, n) {
          return (
            (t >>>= 0), n || e8(t, 8, this.length), r.read(this, t, !0, 52, 8)
          )
        }),
        (s.prototype.readDoubleBE = function e(t, n) {
          return (
            (t >>>= 0), n || e8(t, 8, this.length), r.read(this, t, !1, 52, 8)
          )
        }),
        (s.prototype.writeUintLE = s.prototype.writeUIntLE =
          function e(t, r, n, i) {
            if (((t = +t), (r >>>= 0), (n >>>= 0), !i)) {
              let s = Math.pow(2, 8 * n) - 1
              ev(this, t, r, n, s, 0)
            }
            let a = 1,
              o = 0
            for (this[r] = 255 & t; ++o < n && (a *= 256); )
              this[r + o] = (t / a) & 255
            return r + n
          }),
        (s.prototype.writeUintBE = s.prototype.writeUIntBE =
          function e(t, r, n, i) {
            if (((t = +t), (r >>>= 0), (n >>>= 0), !i)) {
              let s = Math.pow(2, 8 * n) - 1
              ev(this, t, r, n, s, 0)
            }
            let a = n - 1,
              o = 1
            for (this[r + a] = 255 & t; --a >= 0 && (o *= 256); )
              this[r + a] = (t / o) & 255
            return r + n
          }),
        (s.prototype.writeUint8 = s.prototype.writeUInt8 =
          function e(t, r, n) {
            return (
              (t = +t),
              (r >>>= 0),
              n || ev(this, t, r, 1, 255, 0),
              (this[r] = 255 & t),
              r + 1
            )
          }),
        (s.prototype.writeUint16LE = s.prototype.writeUInt16LE =
          function e(t, r, n) {
            return (
              (t = +t),
              (r >>>= 0),
              n || ev(this, t, r, 2, 65535, 0),
              (this[r] = 255 & t),
              (this[r + 1] = t >>> 8),
              r + 2
            )
          }),
        (s.prototype.writeUint16BE = s.prototype.writeUInt16BE =
          function e(t, r, n) {
            return (
              (t = +t),
              (r >>>= 0),
              n || ev(this, t, r, 2, 65535, 0),
              (this[r] = t >>> 8),
              (this[r + 1] = 255 & t),
              r + 2
            )
          }),
        (s.prototype.writeUint32LE = s.prototype.writeUInt32LE =
          function e(t, r, n) {
            return (
              (t = +t),
              (r >>>= 0),
              n || ev(this, t, r, 4, 4294967295, 0),
              (this[r + 3] = t >>> 24),
              (this[r + 2] = t >>> 16),
              (this[r + 1] = t >>> 8),
              (this[r] = 255 & t),
              r + 4
            )
          }),
        (s.prototype.writeUint32BE = s.prototype.writeUInt32BE =
          function e(t, r, n) {
            return (
              (t = +t),
              (r >>>= 0),
              n || ev(this, t, r, 4, 4294967295, 0),
              (this[r] = t >>> 24),
              (this[r + 1] = t >>> 16),
              (this[r + 2] = t >>> 8),
              (this[r + 3] = 255 & t),
              r + 4
            )
          }),
        (s.prototype.writeBigUInt64LE = e1(function e(t, r = 0) {
          return eb(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"))
        })),
        (s.prototype.writeBigUInt64BE = e1(function e(t, r = 0) {
          return ew(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"))
        })),
        (s.prototype.writeIntLE = function e(t, r, n, i) {
          if (((t = +t), (r >>>= 0), !i)) {
            let s = Math.pow(2, 8 * n - 1)
            ev(this, t, r, n, s - 1, -s)
          }
          let a = 0,
            o = 1,
            u = 0
          for (this[r] = 255 & t; ++a < n && (o *= 256); )
            t < 0 && 0 === u && 0 !== this[r + a - 1] && (u = 1),
              (this[r + a] = (((t / o) >> 0) - u) & 255)
          return r + n
        }),
        (s.prototype.writeIntBE = function e(t, r, n, i) {
          if (((t = +t), (r >>>= 0), !i)) {
            let s = Math.pow(2, 8 * n - 1)
            ev(this, t, r, n, s - 1, -s)
          }
          let a = n - 1,
            o = 1,
            u = 0
          for (this[r + a] = 255 & t; --a >= 0 && (o *= 256); )
            t < 0 && 0 === u && 0 !== this[r + a + 1] && (u = 1),
              (this[r + a] = (((t / o) >> 0) - u) & 255)
          return r + n
        }),
        (s.prototype.writeInt8 = function e(t, r, n) {
          return (
            (t = +t),
            (r >>>= 0),
            n || ev(this, t, r, 1, 127, -128),
            t < 0 && (t = 255 + t + 1),
            (this[r] = 255 & t),
            r + 1
          )
        }),
        (s.prototype.writeInt16LE = function e(t, r, n) {
          return (
            (t = +t),
            (r >>>= 0),
            n || ev(this, t, r, 2, 32767, -32768),
            (this[r] = 255 & t),
            (this[r + 1] = t >>> 8),
            r + 2
          )
        }),
        (s.prototype.writeInt16BE = function e(t, r, n) {
          return (
            (t = +t),
            (r >>>= 0),
            n || ev(this, t, r, 2, 32767, -32768),
            (this[r] = t >>> 8),
            (this[r + 1] = 255 & t),
            r + 2
          )
        }),
        (s.prototype.writeInt32LE = function e(t, r, n) {
          return (
            (t = +t),
            (r >>>= 0),
            n || ev(this, t, r, 4, 2147483647, -2147483648),
            (this[r] = 255 & t),
            (this[r + 1] = t >>> 8),
            (this[r + 2] = t >>> 16),
            (this[r + 3] = t >>> 24),
            r + 4
          )
        }),
        (s.prototype.writeInt32BE = function e(t, r, n) {
          return (
            (t = +t),
            (r >>>= 0),
            n || ev(this, t, r, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            (this[r] = t >>> 24),
            (this[r + 1] = t >>> 16),
            (this[r + 2] = t >>> 8),
            (this[r + 3] = 255 & t),
            r + 4
          )
        }),
        (s.prototype.writeBigInt64LE = e1(function e(t, r = 0) {
          return eb(
            this,
            t,
            r,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          )
        })),
        (s.prototype.writeBigInt64BE = e1(function e(t, r = 0) {
          return ew(
            this,
            t,
            r,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          )
        })),
        (s.prototype.writeFloatLE = function e(t, r, n) {
          return e_(this, t, r, !0, n)
        }),
        (s.prototype.writeFloatBE = function e(t, r, n) {
          return e_(this, t, r, !1, n)
        }),
        (s.prototype.writeDoubleLE = function e(t, r, n) {
          return eT(this, t, r, !0, n)
        }),
        (s.prototype.writeDoubleBE = function e(t, r, n) {
          return eT(this, t, r, !1, n)
        }),
        (s.prototype.copy = function e(t, r, n, i) {
          if (!s.isBuffer(t)) throw TypeError("argument should be a Buffer")
          if (
            (n || (n = 0),
            i || 0 === i || (i = this.length),
            r >= t.length && (r = t.length),
            r || (r = 0),
            i > 0 && i < n && (i = n),
            i === n || 0 === t.length || 0 === this.length)
          )
            return 0
          if (r < 0) throw RangeError("targetStart out of bounds")
          if (n < 0 || n >= this.length) throw RangeError("Index out of range")
          if (i < 0) throw RangeError("sourceEnd out of bounds")
          i > this.length && (i = this.length),
            t.length - r < i - n && (i = t.length - r + n)
          let a = i - n
          return (
            this === t && "function" == typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(r, n, i)
              : Uint8Array.prototype.set.call(t, this.subarray(n, i), r),
            a
          )
        }),
        (s.prototype.fill = function e(t, r, n, i) {
          if ("string" == typeof t) {
            if (
              ("string" == typeof r
                ? ((i = r), (r = 0), (n = this.length))
                : "string" == typeof n && ((i = n), (n = this.length)),
              void 0 !== i && "string" != typeof i)
            )
              throw TypeError("encoding must be a string")
            if ("string" == typeof i && !s.isEncoding(i))
              throw TypeError("Unknown encoding: " + i)
            if (1 === t.length) {
              let a = t.charCodeAt(0)
              ;(("utf8" === i && a < 128) || "latin1" === i) && (t = a)
            }
          } else
            "number" == typeof t
              ? (t &= 255)
              : "boolean" == typeof t && (t = Number(t))
          if (r < 0 || this.length < r || this.length < n)
            throw RangeError("Out of range index")
          if (n <= r) return this
          ;(r >>>= 0), (n = void 0 === n ? this.length : n >>> 0), t || (t = 0)
          let o
          if ("number" == typeof t) for (o = r; o < n; ++o) this[o] = t
          else {
            let u = s.isBuffer(t) ? t : s.from(t, i),
              l = u.length
            if (0 === l)
              throw TypeError(
                'The value "' + t + '" is invalid for argument "value"'
              )
            for (o = 0; o < n - r; ++o) this[o + r] = u[o % l]
          }
          return this
        })
      var ex = {}
      function eZ(e, t, r) {
        ex[e] = class n extends r {
          constructor() {
            super(),
              Object.defineProperty(this, "message", {
                value: t.apply(this, arguments),
                writable: !0,
                configurable: !0,
              }),
              (this.name = `${this.name} [${e}]`),
              this.stack,
              delete this.name
          }
          get code() {
            return e
          }
          set code(e) {
            Object.defineProperty(this, "code", {
              configurable: !0,
              enumerable: !0,
              value: e,
              writable: !0,
            })
          }
          toString() {
            return `${this.name} [${e}]: ${this.message}`
          }
        }
      }
      function eC(e) {
        let t = "",
          r = e.length,
          n = "-" === e[0] ? 1 : 0
        for (; r >= n + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`
        return `${e.slice(0, r)}${t}`
      }
      function ek(e, t, r, n, i, s) {
        var a, o, u
        if (e > r || e < t) {
          let l = "bigint" == typeof t ? "n" : "",
            h
          throw (
            ((h =
              s > 3
                ? 0 === t || t === BigInt(0)
                  ? `>= 0${l} and < 2${l} ** ${(s + 1) * 8}${l}`
                  : `>= -(2${l} ** ${(s + 1) * 8 - 1}${l}) and < 2 ** ${
                      (s + 1) * 8 - 1
                    }${l}`
                : `>= ${t}${l} and <= ${r}${l}`),
            new ex.ERR_OUT_OF_RANGE("value", h, e))
          )
        }
        ;(a = n),
          (o = i),
          (u = s),
          eI(o, "offset"),
          (void 0 === a[o] || void 0 === a[o + u]) && eS(o, a.length - (u + 1))
      }
      function eI(e, t) {
        if ("number" != typeof e)
          throw new ex.ERR_INVALID_ARG_TYPE(t, "number", e)
      }
      function eS(e, t, r) {
        if (Math.floor(e) !== e)
          throw (
            (eI(e, r), new ex.ERR_OUT_OF_RANGE(r || "offset", "an integer", e))
          )
        if (t < 0) throw new ex.ERR_BUFFER_OUT_OF_BOUNDS()
        throw new ex.ERR_OUT_OF_RANGE(
          r || "offset",
          `>= ${r ? 1 : 0} and <= ${t}`,
          e
        )
      }
      eZ(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function (e) {
          return e
            ? `${e} is outside of buffer bounds`
            : "Attempt to access memory outside buffer bounds"
        },
        RangeError
      ),
        eZ(
          "ERR_INVALID_ARG_TYPE",
          function (e, t) {
            return `The "${e}" argument must be of type number. Received type ${typeof t}`
          },
          TypeError
        ),
        eZ(
          "ERR_OUT_OF_RANGE",
          function (e, t, r) {
            let n = `The value of "${e}" is out of range.`,
              i = r
            return (
              Number.isInteger(r) && Math.abs(r) > 4294967296
                ? (i = eC(String(r)))
                : "bigint" == typeof r &&
                  ((i = String(r)),
                  (r > BigInt(2) ** BigInt(32) ||
                    r < -(BigInt(2) ** BigInt(32))) &&
                    (i = eC(i)),
                  (i += "n")),
              (n += ` It must be ${t}. Received ${i}`)
            )
          },
          RangeError
        )
      var eP = /[^+/0-9A-Za-z-_]/g
      function eA(e, t) {
        t = t || 1 / 0
        let r,
          n = e.length,
          i = null,
          s = []
        for (let a = 0; a < n; ++a) {
          if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319 || a + 1 === n) {
                ;(t -= 3) > -1 && s.push(239, 191, 189)
                continue
              }
              i = r
              continue
            }
            if (r < 56320) {
              ;(t -= 3) > -1 && s.push(239, 191, 189), (i = r)
              continue
            }
            r = (((i - 55296) << 10) | (r - 56320)) + 65536
          } else i && (t -= 3) > -1 && s.push(239, 191, 189)
          if (((i = null), r < 128)) {
            if ((t -= 1) < 0) break
            s.push(r)
          } else if (r < 2048) {
            if ((t -= 2) < 0) break
            s.push((r >> 6) | 192, (63 & r) | 128)
          } else if (r < 65536) {
            if ((t -= 3) < 0) break
            s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128)
          } else if (r < 1114112) {
            if ((t -= 4) < 0) break
            s.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            )
          } else throw Error("Invalid code point")
        }
        return s
      }
      function eE(e) {
        return t.toByteArray(
          (function e(t) {
            if ((t = (t = t.split("=")[0]).trim().replace(eP, "")).length < 2)
              return ""
            for (; t.length % 4 != 0; ) t += "="
            return t
          })(e)
        )
      }
      function eR(e, t, r, n) {
        let i
        for (i = 0; i < n && !(i + r >= t.length) && !(i >= e.length); ++i)
          t[i + r] = e[i]
        return i
      }
      function e4(e, t) {
        return (
          e instanceof t ||
          (null != e &&
            null != e.constructor &&
            null != e.constructor.name &&
            e.constructor.name === t.name)
        )
      }
      function eO(e) {
        return e != e
      }
      var eL = (function () {
        let e = "0123456789abcdef",
          t = Array(256)
        for (let r = 0; r < 16; ++r) {
          let n = 16 * r
          for (let i = 0; i < 16; ++i) t[n + i] = e[r] + e[i]
        }
        return t
      })()
      function e1(e) {
        return "undefined" == typeof BigInt ? eU : e
      }
      function eU() {
        throw Error("BigInt not supported")
      }
    },
  }),
  Qt = { "@@functional/placeholder": !0 }
function k(e) {
  return e === Qt
}
function E(e) {
  return function t(r) {
    return 0 === arguments.length || k(r) ? t : e.apply(this, arguments)
  }
}
function x(e) {
  return function t(r, n) {
    switch (arguments.length) {
      case 0:
        return t
      case 1:
        return k(r)
          ? t
          : E(function (t) {
              return e(r, t)
            })
      default:
        return k(r) && k(n)
          ? t
          : k(r)
          ? E(function (t) {
              return e(t, n)
            })
          : k(n)
          ? E(function (t) {
              return e(r, t)
            })
          : e(r, n)
    }
  }
}
function q(e, t) {
  switch (e) {
    case 0:
      return function () {
        return t.apply(this, arguments)
      }
    case 1:
      return function (e) {
        return t.apply(this, arguments)
      }
    case 2:
      return function (e, r) {
        return t.apply(this, arguments)
      }
    case 3:
      return function (e, r, n) {
        return t.apply(this, arguments)
      }
    case 4:
      return function (e, r, n, i) {
        return t.apply(this, arguments)
      }
    case 5:
      return function (e, r, n, i, s) {
        return t.apply(this, arguments)
      }
    case 6:
      return function (e, r, n, i, s, a) {
        return t.apply(this, arguments)
      }
    case 7:
      return function (e, r, n, i, s, a, o) {
        return t.apply(this, arguments)
      }
    case 8:
      return function (e, r, n, i, s, a, o, u) {
        return t.apply(this, arguments)
      }
    case 9:
      return function (e, r, n, i, s, a, o, u, l) {
        return t.apply(this, arguments)
      }
    case 10:
      return function (e, r, n, i, s, a, o, u, l, h) {
        return t.apply(this, arguments)
      }
    default:
      throw Error(
        "First argument to _arity must be a non-negative integer no greater than ten"
      )
  }
}
function et(e, t, r) {
  return function () {
    for (
      var n, i = [], s = 0, a = e, o = 0, u = !1;
      o < t.length || s < arguments.length;

    )
      o < t.length && (!k(t[o]) || s >= arguments.length)
        ? (n = t[o])
        : ((n = arguments[s]), (s += 1)),
        (i[o] = n),
        k(n) ? (u = !0) : (a -= 1),
        (o += 1)
    return !u && a <= 0 ? r.apply(this, i) : q(Math.max(0, a), et(e, i, r))
  }
}
var rn = x(function (e, t) {
    return 1 === e ? E(t) : q(e, et(e, [], t))
  }),
  tt = rn
function ue(e) {
  return function t(r, n, i) {
    switch (arguments.length) {
      case 0:
        return t
      case 1:
        return k(r)
          ? t
          : x(function (t, n) {
              return e(r, t, n)
            })
      case 2:
        return k(r) && k(n)
          ? t
          : k(r)
          ? x(function (t, r) {
              return e(t, n, r)
            })
          : k(n)
          ? x(function (t, n) {
              return e(r, t, n)
            })
          : E(function (t) {
              return e(r, n, t)
            })
      default:
        return k(r) && k(n) && k(i)
          ? t
          : k(r) && k(n)
          ? x(function (t, r) {
              return e(t, r, i)
            })
          : k(r) && k(i)
          ? x(function (t, r) {
              return e(t, n, r)
            })
          : k(n) && k(i)
          ? x(function (t, n) {
              return e(r, t, n)
            })
          : k(r)
          ? E(function (t) {
              return e(t, n, i)
            })
          : k(n)
          ? E(function (t) {
              return e(r, t, i)
            })
          : k(i)
          ? E(function (t) {
              return e(r, n, t)
            })
          : e(r, n, i)
    }
  }
}
var Oe =
  Array.isArray ||
  function (e) {
    return (
      null != e &&
      e.length >= 0 &&
      "[object Array]" === Object.prototype.toString.call(e)
    )
  }
function wt(e) {
  return null != e && "function" == typeof e["@@transducer/step"]
}
function le(e, t, r) {
  return function () {
    if (0 === arguments.length) return r()
    var n = arguments[arguments.length - 1]
    if (!Oe(n)) {
      for (var i = 0; i < e.length; ) {
        if ("function" == typeof n[e[i]])
          return n[e[i]].apply(n, Array.prototype.slice.call(arguments, 0, -1))
        i += 1
      }
      if (wt(n)) {
        var s = t.apply(null, Array.prototype.slice.call(arguments, 0, -1))
        return s(n)
      }
    }
    return r.apply(this, arguments)
  }
}
function bt(e) {
  return e && e["@@transducer/reduced"]
    ? e
    : { "@@transducer/value": e, "@@transducer/reduced": !0 }
}
var K = {
  init: function () {
    return this.xf["@@transducer/init"]()
  },
  result: function (e) {
    return this.xf["@@transducer/result"](e)
  },
}
function rt(e) {
  for (var t, r = []; !(t = e.next()).done; ) r.push(t.value)
  return r
}
function nt(e, t, r) {
  for (var n = 0, i = r.length; n < i; ) {
    if (e(t, r[n])) return !0
    n += 1
  }
  return !1
}
function St(e) {
  var t = String(e).match(/^function (\w*)/)
  return null == t ? "" : t[1]
}
function ee(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e)
}
function nn(e, t) {
  return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
}
var st = "function" == typeof Object.is ? Object.is : nn,
  Kt = Object.prototype.toString,
  sn = (function () {
    return "[object Arguments]" === Kt.call(arguments)
      ? function (e) {
          return "[object Arguments]" === Kt.call(e)
        }
      : function (e) {
          return ee("callee", e)
        }
  })(),
  er = sn,
  an = !{ toString: null }.propertyIsEnumerable("toString"),
  tr = [
    "constructor",
    "valueOf",
    "isPrototypeOf",
    "toString",
    "propertyIsEnumerable",
    "hasOwnProperty",
    "toLocaleString",
  ],
  rr = (function () {
    return arguments.propertyIsEnumerable("length")
  })(),
  on = function (e, t) {
    for (var r = 0; r < e.length; ) {
      if (e[r] === t) return !0
      r += 1
    }
    return !1
  },
  un =
    "function" != typeof Object.keys || rr
      ? E(function (e) {
          if (Object(e) !== e) return []
          var t,
            r,
            n = [],
            i = rr && er(e)
          for (t in e) ee(t, e) && (!i || "length" !== t) && (n[n.length] = t)
          if (an)
            for (r = tr.length - 1; r >= 0; )
              ee((t = tr[r]), e) && !on(n, t) && (n[n.length] = t), (r -= 1)
          return n
        })
      : E(function (e) {
          return Object(e) !== e ? [] : Object.keys(e)
        }),
  F = un,
  ln = E(function (e) {
    return null === e
      ? "Null"
      : void 0 === e
      ? "Undefined"
      : Object.prototype.toString.call(e).slice(8, -1)
  }),
  kt = ln
function nr(e, t, r, n) {
  var i = rt(e),
    s = rt(t)
  function a(e, t) {
    return Me(e, t, r.slice(), n.slice())
  }
  return !nt(
    function (e, t) {
      return !nt(a, t, e)
    },
    s,
    i
  )
}
function Me(e, t, r, n) {
  if (st(e, t)) return !0
  var i = kt(e)
  if (i !== kt(t)) return !1
  if (
    "function" == typeof e["fantasy-land/equals"] ||
    "function" == typeof t["fantasy-land/equals"]
  )
    return (
      "function" == typeof e["fantasy-land/equals"] &&
      e["fantasy-land/equals"](t) &&
      "function" == typeof t["fantasy-land/equals"] &&
      t["fantasy-land/equals"](e)
    )
  if ("function" == typeof e.equals || "function" == typeof t.equals)
    return (
      "function" == typeof e.equals &&
      e.equals(t) &&
      "function" == typeof t.equals &&
      t.equals(e)
    )
  switch (i) {
    case "Arguments":
    case "Array":
    case "Object":
      if ("function" == typeof e.constructor && "Promise" === St(e.constructor))
        return e === t
      break
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof e == typeof t && st(e.valueOf(), t.valueOf()))) return !1
      break
    case "Date":
      if (!st(e.valueOf(), t.valueOf())) return !1
      break
    case "Error":
      return e.name === t.name && e.message === t.message
    case "RegExp":
      if (
        !(
          e.source === t.source &&
          e.global === t.global &&
          e.ignoreCase === t.ignoreCase &&
          e.multiline === t.multiline &&
          e.sticky === t.sticky &&
          e.unicode === t.unicode
        )
      )
        return !1
  }
  for (var s = r.length - 1; s >= 0; ) {
    if (r[s] === e) return n[s] === t
    s -= 1
  }
  switch (i) {
    case "Map":
      return (
        e.size === t.size &&
        nr(e.entries(), t.entries(), r.concat([e]), n.concat([t]))
      )
    case "Set":
      return (
        e.size === t.size &&
        nr(e.values(), t.values(), r.concat([e]), n.concat([t]))
      )
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break
    default:
      return !1
  }
  var a = F(e)
  if (a.length !== F(t).length) return !1
  var o = r.concat([e]),
    u = n.concat([t])
  for (s = a.length - 1; s >= 0; ) {
    var l = a[s]
    if (!(ee(l, t) && Me(t[l], e[l], o, u))) return !1
    s -= 1
  }
  return !0
}
var cn = x(function (e, t) {
    return Me(e, t, [], [])
  }),
  at = cn
function Tt(e, t, r) {
  var n, i
  if ("function" == typeof e.indexOf)
    switch (typeof t) {
      case "number":
        if (0 === t) {
          for (n = 1 / t; r < e.length; ) {
            if (0 === (i = e[r]) && 1 / i === n) return r
            r += 1
          }
          return -1
        }
        if (t != t) {
          for (; r < e.length; ) {
            if ("number" == typeof (i = e[r]) && i != i) return r
            r += 1
          }
          return -1
        }
        return e.indexOf(t, r)
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return e.indexOf(t, r)
      case "object":
        if (null === t) return e.indexOf(t, r)
    }
  for (; r < e.length; ) {
    if (at(e[r], t)) return r
    r += 1
  }
  return -1
}
function Ot(e, t) {
  return Tt(t, e, 0) >= 0
}
function G(e, t) {
  for (var r = 0, n = t.length, i = Array(n); r < n; )
    (i[r] = e(t[r])), (r += 1)
  return i
}
function De(e) {
  return (
    '"' +
    e
      .replace(/\\/g, "\\\\")
      .replace(/[\b]/g, "\\b")
      .replace(/\f/g, "\\f")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\v/g, "\\v")
      .replace(/\0/g, "\\0")
      .replace(/"/g, '\\"') +
    '"'
  )
}
var Be = function (e) {
    return (e < 10 ? "0" : "") + e
  },
  fn =
    "function" == typeof Date.prototype.toISOString
      ? function (e) {
          return e.toISOString()
        }
      : function (e) {
          return (
            e.getUTCFullYear() +
            "-" +
            Be(e.getUTCMonth() + 1) +
            "-" +
            Be(e.getUTCDate()) +
            "T" +
            Be(e.getUTCHours()) +
            ":" +
            Be(e.getUTCMinutes()) +
            ":" +
            Be(e.getUTCSeconds()) +
            "." +
            (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) +
            "Z"
          )
        },
  sr = fn
function Et(e) {
  return function () {
    return !e.apply(this, arguments)
  }
}
function Fe(e, t, r) {
  for (var n = 0, i = r.length; n < i; ) (t = e(t, r[n])), (n += 1)
  return t
}
function At(e, t) {
  for (var r = 0, n = t.length, i = []; r < n; )
    e(t[r]) && (i[i.length] = t[r]), (r += 1)
  return i
}
function Ct(e) {
  return "[object Object]" === Object.prototype.toString.call(e)
}
var dn = (function () {
  function e(e, t) {
    ;(this.xf = t), (this.f = e)
  }
  return (
    (e.prototype["@@transducer/init"] = K.init),
    (e.prototype["@@transducer/result"] = K.result),
    (e.prototype["@@transducer/step"] = function (e, t) {
      return this.f(t) ? this.xf["@@transducer/step"](e, t) : e
    }),
    e
  )
})()
function Rt(e) {
  return function (t) {
    return new dn(e, t)
  }
}
var hn = x(
    le(["fantasy-land/filter", "filter"], Rt, function (e, t) {
      return Ct(t)
        ? Fe(
            function (r, n) {
              return e(t[n]) && (r[n] = t[n]), r
            },
            {},
            F(t)
          )
        : At(e, t)
    })
  ),
  ar = hn,
  pn = x(function (e, t) {
    return ar(Et(e), t)
  }),
  ir = pn
function it(e, t) {
  var r = function (r) {
      var n = t.concat([e])
      return Ot(r, n) ? "<Circular>" : it(r, n)
    },
    n = function (e, t) {
      return G(function (t) {
        return De(t) + ": " + r(e[t])
      }, t.slice().sort())
    }
  switch (Object.prototype.toString.call(e)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + G(r, e).join(", ") + "))"
    case "[object Array]":
      return (
        "[" +
        G(r, e)
          .concat(
            n(
              e,
              ir(function (e) {
                return /^\d+$/.test(e)
              }, F(e))
            )
          )
          .join(", ") +
        "]"
      )
    case "[object Boolean]":
      return "object" == typeof e
        ? "new Boolean(" + r(e.valueOf()) + ")"
        : e.toString()
    case "[object Date]":
      return "new Date(" + (isNaN(e.valueOf()) ? r(NaN) : De(sr(e))) + ")"
    case "[object Map]":
      return "new Map(" + r(Array.from(e)) + ")"
    case "[object Null]":
      return "null"
    case "[object Number]":
      return "object" == typeof e
        ? "new Number(" + r(e.valueOf()) + ")"
        : 1 / e == -1 / 0
        ? "-0"
        : e.toString(10)
    case "[object Set]":
      return "new Set(" + r(Array.from(e).sort()) + ")"
    case "[object String]":
      return "object" == typeof e ? "new String(" + r(e.valueOf()) + ")" : De(e)
    case "[object Undefined]":
      return "undefined"
    default:
      if ("function" == typeof e.toString) {
        var i = e.toString()
        if ("[object Object]" !== i) return i
      }
      return "{" + n(e, F(e)).join(", ") + "}"
  }
}
var mn = E(function (e) {
    return it(e, [])
  }),
  jt = mn,
  yn = x(function (e, t) {
    if (e === t) return t
    function r(e, t) {
      if (e > t != t > e) return t > e ? t : e
    }
    var n = r(e, t)
    if (void 0 !== n) return n
    var i = r(typeof e, typeof t)
    if (void 0 !== i) return i === typeof e ? e : t
    var s = jt(e),
      a = r(s, jt(t))
    return void 0 !== a && a === s ? e : t
  }),
  or = yn,
  gn = (function () {
    function e(e, t) {
      ;(this.xf = t), (this.f = e)
    }
    return (
      (e.prototype["@@transducer/init"] = K.init),
      (e.prototype["@@transducer/result"] = K.result),
      (e.prototype["@@transducer/step"] = function (e, t) {
        return this.xf["@@transducer/step"](e, this.f(t))
      }),
      e
    )
  })(),
  _n = function (e) {
    return function (t) {
      return new gn(e, t)
    }
  },
  ur = _n,
  vn = x(
    le(["fantasy-land/map", "map"], ur, function (e, t) {
      switch (Object.prototype.toString.call(t)) {
        case "[object Function]":
          return tt(t.length, function () {
            return e.call(this, t.apply(this, arguments))
          })
        case "[object Object]":
          return Fe(
            function (r, n) {
              return (r[n] = e(t[n])), r
            },
            {},
            F(t)
          )
        default:
          return G(e, t)
      }
    })
  ),
  lr = vn,
  ot =
    Number.isInteger ||
    function (e) {
      return e << 0 === e
    }
function Ue(e) {
  return "[object String]" === Object.prototype.toString.call(e)
}
function $e(e, t) {
  var r = e < 0 ? t.length + e : e
  return Ue(t) ? t.charAt(r) : t[r]
}
var xn = x(function (e, t) {
    if (null != t) return ot(e) ? $e(e, t) : t[e]
  }),
  te = xn,
  wn = x(function (e, t) {
    return lr(te(e), t)
  }),
  cr = wn,
  bn = E(function (e) {
    return (
      !!Oe(e) ||
      (!(!e || "object" != typeof e || Ue(e)) &&
        (0 === e.length ||
          (e.length > 0 &&
            e.hasOwnProperty(0) &&
            e.hasOwnProperty(e.length - 1))))
    )
  }),
  fr = bn,
  dr = "u" > typeof Symbol ? Symbol.iterator : "@@iterator"
function It(e, t, r) {
  return function (n, i, s) {
    if (fr(s)) return e(n, i, s)
    if (null == s) return i
    if ("function" == typeof s["fantasy-land/reduce"])
      return t(n, i, s, "fantasy-land/reduce")
    if (null != s[dr]) return r(n, i, s[dr]())
    if ("function" == typeof s.next) return r(n, i, s)
    if ("function" == typeof s.reduce) return t(n, i, s, "reduce")
    throw TypeError("reduce: list must be array or iterable")
  }
}
function Nt(e, t, r) {
  for (var n = 0, i = r.length; n < i; ) {
    if ((t = e["@@transducer/step"](t, r[n])) && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"]
      break
    }
    n += 1
  }
  return e["@@transducer/result"](t)
}
var Sn = x(function (e, t) {
    return q(e.length, function () {
      return e.apply(t, arguments)
    })
  }),
  hr = Sn
function kn(e, t, r) {
  for (var n = r.next(); !n.done; ) {
    if ((t = e["@@transducer/step"](t, n.value)) && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"]
      break
    }
    n = r.next()
  }
  return e["@@transducer/result"](t)
}
function Tn(e, t, r, n) {
  return e["@@transducer/result"](r[n](hr(e["@@transducer/step"], e), t))
}
var On = It(Nt, Tn, kn),
  pr = On,
  En = (function () {
    function e(e) {
      this.f = e
    }
    return (
      (e.prototype["@@transducer/init"] = function () {
        throw Error("init not implemented on XWrap")
      }),
      (e.prototype["@@transducer/result"] = function (e) {
        return e
      }),
      (e.prototype["@@transducer/step"] = function (e, t) {
        return this.f(e, t)
      }),
      e
    )
  })()
function Lt(e) {
  return new En(e)
}
var An = ue(function (e, t, r) {
    return pr("function" == typeof e ? Lt(e) : e, t, r)
  }),
  ut = An
function Pt(e, t) {
  return function () {
    return t.call(this, e.apply(this, arguments))
  }
}
function Ve(e, t) {
  return function () {
    var r = arguments.length
    if (0 === r) return t()
    var n = arguments[r - 1]
    return Oe(n) || "function" != typeof n[e]
      ? t.apply(this, arguments)
      : n[e].apply(n, Array.prototype.slice.call(arguments, 0, r - 1))
  }
}
var Cn = ue(
    Ve("slice", function (e, t, r) {
      return Array.prototype.slice.call(r, e, t)
    })
  ),
  mr = Cn,
  Rn = E(Ve("tail", mr(1, 1 / 0))),
  yr = Rn
function qe() {
  if (0 === arguments.length) throw Error("pipe requires at least one argument")
  return q(arguments[0].length, ut(Pt, arguments[0], yr(arguments)))
}
var jn = x(function (e, t) {
    return tt(ut(or, 0, cr("length", t)), function () {
      var r = arguments,
        n = this
      return e.apply(
        n,
        G(function (e) {
          return e.apply(n, r)
        }, t)
      )
    })
  }),
  gr = jn,
  In = x(function (e, t) {
    return null == t || t != t ? e : t
  }),
  Ge = In,
  Nn = (function () {
    function e(e, t) {
      ;(this.xf = t), (this.f = e), (this.found = !1)
    }
    return (
      (e.prototype["@@transducer/init"] = K.init),
      (e.prototype["@@transducer/result"] = function (e) {
        return (
          this.found || (e = this.xf["@@transducer/step"](e, void 0)),
          this.xf["@@transducer/result"](e)
        )
      }),
      (e.prototype["@@transducer/step"] = function (e, t) {
        return (
          this.f(t) &&
            ((this.found = !0), (e = bt(this.xf["@@transducer/step"](e, t)))),
          e
        )
      }),
      e
    )
  })()
function Zt(e) {
  return function (t) {
    return new Nn(e, t)
  }
}
var Ln = x(
    le(["find"], Zt, function (e, t) {
      for (var r = 0, n = t.length; r < n; ) {
        if (e(t[r])) return t[r]
        r += 1
      }
    })
  ),
  Wt = Ln,
  Pn = E(function (e) {
    return gr(function () {
      return Array.prototype.slice.call(arguments, 0)
    }, e)
  }),
  zt = Pn
function Mt(e, t) {
  for (var r = t, n = 0; n < e.length; n += 1) {
    if (null == r) return
    var i = e[n]
    r = ot(i) ? $e(i, r) : r[i]
  }
  return r
}
var Zn = x(Mt),
  lt = Zn,
  Wn = ue(function (e, t, r) {
    return at(e, te(t, r))
  }),
  Dt = Wn,
  H = class extends Error {
    name = "InvalidSchedulerLocation"
  },
  ct = class extends Error {
    name = "SchedulerTagNotFound"
  },
  ft = class extends Error {
    name = "TransactionNotFound"
  }
function He(e = "") {
  return (e = e.trim()).endsWith("/") ? He(e.slice(0, -1)) : e
}
var _r = (e, { maxRetries: t = 0, delay: r = 300 }) => {
    let n = (r, i) =>
      Promise.resolve()
        .then(e)
        .catch((e) => {
          if (r >= t) return Promise.reject(e)
          let s = r + 1,
            a = i + i
          return new Promise((e) => setTimeout(e, i)).then(() => n(s, a))
        })
    return n(0, r)
  },
  vr = (e) => {
    if (e.ok) return e
    throw e
  },
  zn = "Url",
  Mn = "Time-To-Live",
  Dn = "Scheduler",
  Bt = (e) => qe(Ge([]), Wt(Dt(e, "name")), Ge({}), te("value")),
  xr = (e) =>
    qe(
      (t) => {
        if (!t) throw new ft(e)
        return t
      },
      te("tags"),
      Ge([])
    )
function wr({
  fetch: e,
  GRAPHQL_URL: t,
  GRAPHQL_MAX_RETRIES: r = 0,
  GRAPHQL_RETRY_BACKOFF: n = 300,
}) {
  return async ({ query: i, variables: s }) =>
    _r(
      () =>
        e(t, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: i, variables: s }),
        })
          .then(vr)
          .then((e) => e.json()),
      { maxRetries: r, delay: n }
    )
}
function br({
  fetch: e,
  GRAPHQL_URL: t,
  GRAPHQL_MAX_RETRIES: r,
  GRAPHQL_RETRY_BACKOFF: n,
}) {
  let i = wr({
      fetch: e,
      GRAPHQL_URL: t,
      GRAPHQL_MAX_RETRIES: r,
      GRAPHQL_RETRY_BACKOFF: n,
    }),
    s = Ft({
      fetch: e,
      GRAPHQL_URL: t,
      GRAPHQL_MAX_RETRIES: r,
      GRAPHQL_RETRY_BACKOFF: n,
    }),
    a = `
    query GetTransactions ($transactionIds: [ID!]!) {
      transactions(ids: $transactionIds) {
        edges {
          node {
            tags {
              name
              value
            }
          }
        }
      }
    }
  `
  return async (e) =>
    i({ query: a, variables: { transactionIds: [e] } })
      .then(lt(["data", "transactions", "edges", "0", "node"]))
      .then(xr(`Process ${e} was not found on gateway`))
      .then(Bt(Dn))
      .then((e) => {
        if (!e) throw new ct('No "Scheduler" tag found on process')
        return s(e)
      })
}
function Ft({
  fetch: e,
  GRAPHQL_URL: t,
  GRAPHQL_MAX_RETRIES: r,
  GRAPHQL_RETRY_BACKOFF: n,
}) {
  let i = wr({
      fetch: e,
      GRAPHQL_URL: t,
      GRAPHQL_MAX_RETRIES: r,
      GRAPHQL_RETRY_BACKOFF: n,
    }),
    s = `
    query GetSchedulerLocation ($owner: String!) {
      transactions (
        owners: [$owner]
        tags: [
          { name: "Data-Protocol", values: ["ao"] },
          { name: "Type", values: ["Scheduler-Location"] }
        ]
        # Only need the most recent Scheduler-Location
        sort: HEIGHT_DESC
        first: 1
      ) {
        edges {
          node {
            tags {
              name
              value
            }
          }
        }
      }
    }
  `
  return async (e) =>
    i({ query: s, variables: { owner: e } })
      .then(lt(["data", "transactions", "edges", "0", "node"]))
      .then(xr(`Could not find 'Scheduler-Location' owner by wallet ${e}`))
      .then(zt([Bt(zn), Bt(Mn)]))
      .then(([t, r]) => {
        if (!t) throw new H('No "Url" tag found on Scheduler-Location')
        if (!r) throw new H('No "Time-To-Live" tag found on Scheduler-Location')
        return { url: t, ttl: r, address: e }
      })
}
var Ee =
    "object" == typeof performance &&
    performance &&
    "function" == typeof performance.now
      ? performance
      : Date,
  kr = new Set(),
  Ut = "object" == typeof process && process ? process : {},
  Tr = (e, t, r, n) => {
    "function" == typeof Ut.emitWarning
      ? Ut.emitWarning(e, t, r, n)
      : console.error(`[${r}] ${t}: ${e}`)
  },
  dt = globalThis.AbortController,
  Sr = globalThis.AbortSignal
if (typeof dt > "u") {
  dt = class {
    constructor() {
      t()
    }
    signal = new (Sr = class {
      onabort
      _onabort = []
      reason
      aborted = !1
      addEventListener(e, t) {
        this._onabort.push(t)
      }
    })()
    abort(e) {
      if (!this.signal.aborted) {
        for (let t of ((this.signal.reason = e),
        (this.signal.aborted = !0),
        this.signal._onabort))
          t(e)
        this.signal.onabort?.(e)
      }
    }
  }
  let e = Ut.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1",
    t = () => {
      e &&
        ((e = !1),
        Tr(
          "AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.",
          "NO_ABORT_CONTROLLER",
          "ENOTSUP",
          t
        ))
    }
}
var Fn = (e) => !kr.has(e),
  Iu = Symbol("type"),
  re = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e),
  Or = (e) =>
    re(e)
      ? e <= 256
        ? Uint8Array
        : e <= 65536
        ? Uint16Array
        : e <= 4294967296
        ? Uint32Array
        : e <= Number.MAX_SAFE_INTEGER
        ? Ae
        : null
      : null,
  Ae = class extends Array {
    constructor(e) {
      super(e), this.fill(0)
    }
  },
  $t = class e {
    heap
    length
    static #a = !1
    static create(t) {
      let r = Or(t)
      if (!r) return []
      e.#a = !0
      let n = new e(t, r)
      return (e.#a = !1), n
    }
    constructor(t, r) {
      if (!e.#a) throw TypeError("instantiate Stack using Stack.create(n)")
      ;(this.heap = new r(t)), (this.length = 0)
    }
    push(e) {
      this.heap[this.length++] = e
    }
    pop() {
      return this.heap[--this.length]
    }
  },
  ht = class e {
    #a
    #b
    #c
    #d
    #e
    ttl
    ttlResolution
    ttlAutopurge
    updateAgeOnGet
    updateAgeOnHas
    allowStale
    noDisposeOnSet
    noUpdateTTL
    maxEntrySize
    sizeCalculation
    noDeleteOnFetchRejection
    noDeleteOnStaleGet
    allowStaleOnFetchAbort
    allowStaleOnFetchRejection
    ignoreFetchAbort
    #f
    #g
    #h
    #i
    #j
    #k
    #l
    #m
    #n
    #o
    #p
    #q
    #r
    #s
    #t
    #u
    #v
    static unsafeExposeInternals(e) {
      return {
        starts: e.#r,
        ttls: e.#s,
        sizes: e.#q,
        keyMap: e.#h,
        keyList: e.#i,
        valList: e.#j,
        next: e.#k,
        prev: e.#l,
        get head() {
          return e.#m
        },
        get tail() {
          return e.#n
        },
        free: e.#o,
        isBackgroundFetch: (t) => e.#w(t),
        backgroundFetch: (t, r, n, i) => e.#x(t, r, n, i),
        moveToTail: (t) => e.#y(t),
        indexes: (t) => e.#z(t),
        rindexes: (t) => e.#A(t),
        isStale: (t) => e.#B(t),
      }
    }
    get max() {
      return this.#a
    }
    get maxSize() {
      return this.#b
    }
    get calculatedSize() {
      return this.#g
    }
    get size() {
      return this.#f
    }
    get fetchMethod() {
      return this.#e
    }
    get dispose() {
      return this.#c
    }
    get disposeAfter() {
      return this.#d
    }
    constructor(t) {
      let {
        max: r = 0,
        ttl: n,
        ttlResolution: i = 1,
        ttlAutopurge: s,
        updateAgeOnGet: a,
        updateAgeOnHas: o,
        allowStale: u,
        dispose: l,
        disposeAfter: h,
        noDisposeOnSet: S,
        noUpdateTTL: A,
        maxSize: O = 0,
        maxEntrySize: L = 0,
        sizeCalculation: V,
        fetchMethod: W,
        noDeleteOnFetchRejection: ei,
        noDeleteOnStaleGet: eo,
        allowStaleOnFetchRejection: eu,
        allowStaleOnFetchAbort: ed,
        ignoreFetchAbort: ec,
      } = t
      if (0 !== r && !re(r))
        throw TypeError("max option must be a nonnegative integer")
      let ef = r ? Or(r) : Array
      if (!ef) throw Error("invalid max value: " + r)
      if (
        ((this.#a = r),
        (this.#b = O),
        (this.maxEntrySize = L || this.#b),
        (this.sizeCalculation = V),
        this.sizeCalculation)
      ) {
        if (!this.#b && !this.maxEntrySize)
          throw TypeError(
            "cannot set sizeCalculation without setting maxSize or maxEntrySize"
          )
        if ("function" != typeof this.sizeCalculation)
          throw TypeError("sizeCalculation set to non-function")
      }
      if (void 0 !== W && "function" != typeof W)
        throw TypeError("fetchMethod must be a function if specified")
      if (
        ((this.#e = W),
        (this.#u = !!W),
        (this.#h = new Map()),
        (this.#i = Array(r).fill(void 0)),
        (this.#j = Array(r).fill(void 0)),
        (this.#k = new ef(r)),
        (this.#l = new ef(r)),
        (this.#m = 0),
        (this.#n = 0),
        (this.#o = $t.create(r)),
        (this.#f = 0),
        (this.#g = 0),
        "function" == typeof l && (this.#c = l),
        "function" == typeof h
          ? ((this.#d = h), (this.#p = []))
          : ((this.#d = void 0), (this.#p = void 0)),
        (this.#t = !!this.#c),
        (this.#v = !!this.#d),
        (this.noDisposeOnSet = !!S),
        (this.noUpdateTTL = !!A),
        (this.noDeleteOnFetchRejection = !!ei),
        (this.allowStaleOnFetchRejection = !!eu),
        (this.allowStaleOnFetchAbort = !!ed),
        (this.ignoreFetchAbort = !!ec),
        0 !== this.maxEntrySize)
      ) {
        if (0 !== this.#b && !re(this.#b))
          throw TypeError("maxSize must be a positive integer if specified")
        if (!re(this.maxEntrySize))
          throw TypeError(
            "maxEntrySize must be a positive integer if specified"
          )
        this.#C()
      }
      if (
        ((this.allowStale = !!u),
        (this.noDeleteOnStaleGet = !!eo),
        (this.updateAgeOnGet = !!a),
        (this.updateAgeOnHas = !!o),
        (this.ttlResolution = re(i) || 0 === i ? i : 1),
        (this.ttlAutopurge = !!s),
        (this.ttl = n || 0),
        this.ttl)
      ) {
        if (!re(this.ttl))
          throw TypeError("ttl must be a positive integer if specified")
        this.#D()
      }
      if (0 === this.#a && 0 === this.ttl && 0 === this.#b)
        throw TypeError("At least one of max, maxSize, or ttl is required")
      if (!this.ttlAutopurge && !this.#a && !this.#b) {
        let eh = "LRU_CACHE_UNBOUNDED"
        Fn(eh) &&
          (kr.add(eh),
          Tr(
            "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
            "UnboundedCacheWarning",
            eh,
            e
          ))
      }
    }
    getRemainingTTL(e) {
      return this.#h.has(e) ? 1 / 0 : 0
    }
    #D() {
      let t = new Ae(this.#a),
        r = new Ae(this.#a)
      ;(this.#s = t),
        (this.#r = r),
        (this.#E = (e, n, i = Ee.now()) => {
          if (
            ((r[e] = 0 !== n ? i : 0), (t[e] = n), 0 !== n && this.ttlAutopurge)
          ) {
            let s = setTimeout(() => {
              this.#B(e) && this.delete(this.#i[e])
            }, n + 1)
            s.unref && s.unref()
          }
        }),
        (this.#F = (e) => {
          r[e] = 0 !== t[e] ? Ee.now() : 0
        }),
        (this.#G = (e, s) => {
          if (t[s]) {
            let a = t[s],
              o = r[s]
            if (!a || !o) return
            ;(e.ttl = a), (e.start = o), (e.now = n || i())
            let u = e.now - o
            e.remainingTTL = a - u
          }
        })
      let n = 0,
        i = () => {
          let e = Ee.now()
          if (this.ttlResolution > 0) {
            n = e
            let t = setTimeout(() => (n = 0), this.ttlResolution)
            t.unref && t.unref()
          }
          return e
        }
      ;(this.getRemainingTTL = (e) => {
        let s = this.#h.get(e)
        if (void 0 === s) return 0
        let a = t[s],
          o = r[s]
        if (!a || !o) return 1 / 0
        let u = (n || i()) - o
        return a - u
      }),
        (this.#B = (e) => {
          let s = r[e],
            a = t[e]
          return !!a && !!s && (n || i()) - s > a
        })
    }
    #F = () => {}
    #G = () => {}
    #E = () => {}
    #B = () => !1
    #C() {
      let s = new Ae(this.#a)
      ;(this.#g = 0),
        (this.#q = s),
        (this.#H = (e) => {
          ;(this.#g -= s[e]), (s[e] = 0)
        }),
        (this.#I = (e, t, r, n) => {
          if (this.#w(t)) return 0
          if (!re(r)) {
            if (n) {
              if ("function" != typeof n)
                throw TypeError("sizeCalculation must be a function")
              if (!re((r = n(t, e))))
                throw TypeError(
                  "sizeCalculation return invalid (expect positive integer)"
                )
            } else
              throw TypeError(
                "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set."
              )
          }
          return r
        }),
        (this.#J = (e, t, r) => {
          if (((s[e] = t), this.#b)) {
            let n = this.#b - s[e]
            for (; this.#g > n; ) this.#K(!0)
          }
          ;(this.#g += s[e]),
            r && ((r.entrySize = t), (r.totalCalculatedSize = this.#g))
        })
    }
    #H = (e) => {}
    #J = (e, t, r) => {}
    #I = (e, t, r, n) => {
      if (r || n)
        throw TypeError(
          "cannot set size without setting maxSize or maxEntrySize on cache"
        )
      return 0
    };
    *#z({ allowStale: a = this.allowStale } = {}) {
      if (this.#f)
        for (
          let o = this.#n;
          !(!this.#L(o) || ((a || !this.#B(o)) && (yield o), o === this.#m));

        )
          o = this.#l[o]
    }
    *#A({ allowStale: u = this.allowStale } = {}) {
      if (this.#f)
        for (
          let l = this.#m;
          !(!this.#L(l) || ((u || !this.#B(l)) && (yield l), l === this.#n));

        )
          l = this.#k[l]
    }
    #L(h) {
      return void 0 !== h && this.#h.get(this.#i[h]) === h
    }
    *entries() {
      for (let e of this.#z())
        void 0 === this.#j[e] ||
          void 0 === this.#i[e] ||
          this.#w(this.#j[e]) ||
          (yield [this.#i[e], this.#j[e]])
    }
    *rentries() {
      for (let e of this.#A())
        void 0 === this.#j[e] ||
          void 0 === this.#i[e] ||
          this.#w(this.#j[e]) ||
          (yield [this.#i[e], this.#j[e]])
    }
    *keys() {
      for (let e of this.#z()) {
        let t = this.#i[e]
        void 0 === t || this.#w(this.#j[e]) || (yield t)
      }
    }
    *rkeys() {
      for (let e of this.#A()) {
        let t = this.#i[e]
        void 0 === t || this.#w(this.#j[e]) || (yield t)
      }
    }
    *values() {
      for (let e of this.#z())
        void 0 === this.#j[e] || this.#w(this.#j[e]) || (yield this.#j[e])
    }
    *rvalues() {
      for (let e of this.#A())
        void 0 === this.#j[e] || this.#w(this.#j[e]) || (yield this.#j[e])
    }
    [Symbol.iterator]() {
      return this.entries()
    }
    [Symbol.toStringTag] = "LRUCache"
    find(e, t = {}) {
      for (let r of this.#z()) {
        let n = this.#j[r],
          i = this.#w(n) ? n.__staleWhileFetching : n
        if (void 0 !== i && e(i, this.#i[r], this))
          return this.get(this.#i[r], t)
      }
    }
    forEach(e, t = this) {
      for (let r of this.#z()) {
        let n = this.#j[r],
          i = this.#w(n) ? n.__staleWhileFetching : n
        void 0 !== i && e.call(t, i, this.#i[r], this)
      }
    }
    rforEach(e, t = this) {
      for (let r of this.#A()) {
        let n = this.#j[r],
          i = this.#w(n) ? n.__staleWhileFetching : n
        void 0 !== i && e.call(t, i, this.#i[r], this)
      }
    }
    purgeStale() {
      let e = !1
      for (let t of this.#A({ allowStale: !0 }))
        this.#B(t) && (this.delete(this.#i[t]), (e = !0))
      return e
    }
    info(e) {
      let t = this.#h.get(e)
      if (void 0 === t) return
      let r = this.#j[t],
        n = this.#w(r) ? r.__staleWhileFetching : r
      if (void 0 === n) return
      let i = { value: n }
      if (this.#s && this.#r) {
        let s = this.#s[t],
          a = this.#r[t]
        if (s && a) {
          let o = s - (Ee.now() - a)
          ;(i.ttl = o), (i.start = Date.now())
        }
      }
      return this.#q && (i.size = this.#q[t]), i
    }
    dump() {
      let e = []
      for (let t of this.#z({ allowStale: !0 })) {
        let r = this.#i[t],
          n = this.#j[t],
          i = this.#w(n) ? n.__staleWhileFetching : n
        if (void 0 === i || void 0 === r) continue
        let s = { value: i }
        if (this.#s && this.#r) {
          s.ttl = this.#s[t]
          let a = Ee.now() - this.#r[t]
          s.start = Math.floor(Date.now() - a)
        }
        this.#q && (s.size = this.#q[t]), e.unshift([r, s])
      }
      return e
    }
    load(e) {
      for (let [t, r] of (this.clear(), e)) {
        if (r.start) {
          let n = Date.now() - r.start
          r.start = Ee.now() - n
        }
        this.set(t, r.value, r)
      }
    }
    set(e, t, r = {}) {
      if (void 0 === t) return this.delete(e), this
      let {
          ttl: n = this.ttl,
          start: i,
          noDisposeOnSet: s = this.noDisposeOnSet,
          sizeCalculation: a = this.sizeCalculation,
          status: o,
        } = r,
        { noUpdateTTL: u = this.noUpdateTTL } = r,
        l = this.#I(e, t, r.size || 0, a)
      if (this.maxEntrySize && l > this.maxEntrySize)
        return (
          o && ((o.set = "miss"), (o.maxEntrySizeExceeded = !0)),
          this.delete(e),
          this
        )
      let h = 0 === this.#f ? void 0 : this.#h.get(e)
      if (void 0 === h)
        (h =
          0 === this.#f
            ? this.#n
            : 0 !== this.#o.length
            ? this.#o.pop()
            : this.#f === this.#a
            ? this.#K(!1)
            : this.#f),
          (this.#i[h] = e),
          (this.#j[h] = t),
          this.#h.set(e, h),
          (this.#k[this.#n] = h),
          (this.#l[h] = this.#n),
          (this.#n = h),
          this.#f++,
          this.#J(h, l, o),
          o && (o.set = "add"),
          (u = !1)
      else {
        this.#y(h)
        let S = this.#j[h]
        if (t !== S) {
          if (this.#u && this.#w(S)) {
            S.__abortController.abort(Error("replaced"))
            let { __staleWhileFetching: A } = S
            void 0 !== A &&
              !s &&
              (this.#t && this.#c?.(A, e, "set"),
              this.#v && this.#p?.push([A, e, "set"]))
          } else
            s ||
              (this.#t && this.#c?.(S, e, "set"),
              this.#v && this.#p?.push([S, e, "set"]))
          if ((this.#H(h), this.#J(h, l, o), (this.#j[h] = t), o)) {
            o.set = "replace"
            let O = S && this.#w(S) ? S.__staleWhileFetching : S
            void 0 !== O && (o.oldValue = O)
          }
        } else o && (o.set = "update")
      }
      if (
        (0 === n || this.#s || this.#D(),
        this.#s && (u || this.#E(h, n, i), o && this.#G(o, h)),
        !s && this.#v && this.#p)
      ) {
        let L = this.#p,
          V
        for (; (V = L?.shift()); ) this.#d?.(...V)
      }
      return this
    }
    pop() {
      try {
        for (; this.#f; ) {
          let e = this.#j[this.#m]
          if ((this.#K(!0), this.#w(e))) {
            if (e.__staleWhileFetching) return e.__staleWhileFetching
          } else if (void 0 !== e) return e
        }
      } finally {
        if (this.#v && this.#p) {
          let t = this.#p,
            r
          for (; (r = t?.shift()); ) this.#d?.(...r)
        }
      }
    }
    #K(S) {
      let A = this.#m,
        O = this.#i[A],
        L = this.#j[A]
      return (
        this.#u && this.#w(L)
          ? L.__abortController.abort(Error("evicted"))
          : (this.#t || this.#v) &&
            (this.#t && this.#c?.(L, O, "evict"),
            this.#v && this.#p?.push([L, O, "evict"])),
        this.#H(A),
        S && ((this.#i[A] = void 0), (this.#j[A] = void 0), this.#o.push(A)),
        1 === this.#f
          ? ((this.#m = this.#n = 0), (this.#o.length = 0))
          : (this.#m = this.#k[A]),
        this.#h.delete(O),
        this.#f--,
        A
      )
    }
    has(e, t = {}) {
      let { updateAgeOnHas: r = this.updateAgeOnHas, status: n } = t,
        i = this.#h.get(e)
      if (void 0 !== i) {
        let s = this.#j[i]
        if (this.#w(s) && void 0 === s.__staleWhileFetching) return !1
        if (!this.#B(i))
          return r && this.#F(i), n && ((n.has = "hit"), this.#G(n, i)), !0
        n && ((n.has = "stale"), this.#G(n, i))
      } else n && (n.has = "miss")
      return !1
    }
    peek(e, t = {}) {
      let { allowStale: r = this.allowStale } = t,
        n = this.#h.get(e)
      if (void 0 === n || (!r && this.#B(n))) return
      let i = this.#j[n]
      return this.#w(i) ? i.__staleWhileFetching : i
    }
    #x(V, W, ei, eo) {
      let eu = void 0 === W ? void 0 : this.#j[W]
      if (this.#w(eu)) return eu
      let ed = new dt(),
        { signal: ec } = ei
      ec?.addEventListener("abort", () => ed.abort(ec.reason), {
        signal: ed.signal,
      })
      let ef = { signal: ed.signal, options: ei, context: eo },
        eh = (e, t = !1) => {
          let { aborted: r } = ed.signal,
            n = ei.ignoreFetchAbort && void 0 !== e
          if (
            (ei.status &&
              (r && !t
                ? ((ei.status.fetchAborted = !0),
                  (ei.status.fetchError = ed.signal.reason),
                  n && (ei.status.fetchAbortIgnored = !0))
                : (ei.status.fetchResolved = !0)),
            r && !n && !t)
          )
            return ey(ed.signal.reason)
          let i = eg
          return (
            this.#j[W] === eg &&
              (void 0 === e
                ? i.__staleWhileFetching
                  ? (this.#j[W] = i.__staleWhileFetching)
                  : this.delete(V)
                : (ei.status && (ei.status.fetchUpdated = !0),
                  this.set(V, e, ef.options))),
            e
          )
        },
        ep = (e) => (
          ei.status &&
            ((ei.status.fetchRejected = !0), (ei.status.fetchError = e)),
          ey(e)
        ),
        ey = (e) => {
          let { aborted: t } = ed.signal,
            r = t && ei.allowStaleOnFetchAbort,
            n = r || ei.allowStaleOnFetchRejection,
            i = n || ei.noDeleteOnFetchRejection,
            s = eg
          if (
            (this.#j[W] === eg &&
              (i && void 0 !== s.__staleWhileFetching
                ? r || (this.#j[W] = s.__staleWhileFetching)
                : this.delete(V)),
            n)
          )
            return (
              ei.status &&
                void 0 !== s.__staleWhileFetching &&
                (ei.status.returnedStale = !0),
              s.__staleWhileFetching
            )
          if (s.__returned === s) throw e
        },
        em = (e, t) => {
          let r = this.#e?.(V, eu, ef)
          r &&
            r instanceof Promise &&
            r.then((t) => e(void 0 === t ? void 0 : t), t),
            ed.signal.addEventListener("abort", () => {
              ;(!ei.ignoreFetchAbort || ei.allowStaleOnFetchAbort) &&
                (e(void 0), ei.allowStaleOnFetchAbort && (e = (e) => eh(e, !0)))
            })
        }
      ei.status && (ei.status.fetchDispatched = !0)
      let eg = new Promise(em).then(eh, ep),
        e$ = Object.assign(eg, {
          __abortController: ed,
          __staleWhileFetching: eu,
          __returned: void 0,
        })
      return (
        void 0 === W
          ? (this.set(V, e$, { ...ef.options, status: void 0 }),
            (W = this.#h.get(V)))
          : (this.#j[W] = e$),
        e$
      )
    }
    #w(e8) {
      if (!this.#u) return !1
      let ev = e8
      return (
        !!ev &&
        ev instanceof Promise &&
        ev.hasOwnProperty("__staleWhileFetching") &&
        ev.__abortController instanceof dt
      )
    }
    async fetch(e, t = {}) {
      let {
        allowStale: r = this.allowStale,
        updateAgeOnGet: n = this.updateAgeOnGet,
        noDeleteOnStaleGet: i = this.noDeleteOnStaleGet,
        ttl: s = this.ttl,
        noDisposeOnSet: a = this.noDisposeOnSet,
        size: o = 0,
        sizeCalculation: u = this.sizeCalculation,
        noUpdateTTL: l = this.noUpdateTTL,
        noDeleteOnFetchRejection: h = this.noDeleteOnFetchRejection,
        allowStaleOnFetchRejection: S = this.allowStaleOnFetchRejection,
        ignoreFetchAbort: A = this.ignoreFetchAbort,
        allowStaleOnFetchAbort: O = this.allowStaleOnFetchAbort,
        context: L,
        forceRefresh: V = !1,
        status: W,
        signal: ei,
      } = t
      if (!this.#u)
        return (
          W && (W.fetch = "get"),
          this.get(e, {
            allowStale: r,
            updateAgeOnGet: n,
            noDeleteOnStaleGet: i,
            status: W,
          })
        )
      let eo = {
          allowStale: r,
          updateAgeOnGet: n,
          noDeleteOnStaleGet: i,
          ttl: s,
          noDisposeOnSet: a,
          size: o,
          sizeCalculation: u,
          noUpdateTTL: l,
          noDeleteOnFetchRejection: h,
          allowStaleOnFetchRejection: S,
          allowStaleOnFetchAbort: O,
          ignoreFetchAbort: A,
          status: W,
          signal: ei,
        },
        eu = this.#h.get(e)
      if (void 0 === eu) {
        W && (W.fetch = "miss")
        let ed = this.#x(e, eu, eo, L)
        return (ed.__returned = ed)
      }
      {
        let ec = this.#j[eu]
        if (this.#w(ec)) {
          let ef = r && void 0 !== ec.__staleWhileFetching
          return (
            W && ((W.fetch = "inflight"), ef && (W.returnedStale = !0)),
            ef ? ec.__staleWhileFetching : (ec.__returned = ec)
          )
        }
        let eh = this.#B(eu)
        if (!V && !eh)
          return (
            W && (W.fetch = "hit"),
            this.#y(eu),
            n && this.#F(eu),
            W && this.#G(W, eu),
            ec
          )
        let ep = this.#x(e, eu, eo, L),
          ey = void 0 !== ep.__staleWhileFetching && r
        return (
          W &&
            ((W.fetch = eh ? "stale" : "refresh"),
            ey && eh && (W.returnedStale = !0)),
          ey ? ep.__staleWhileFetching : (ep.__returned = ep)
        )
      }
    }
    get(e, t = {}) {
      let {
          allowStale: r = this.allowStale,
          updateAgeOnGet: n = this.updateAgeOnGet,
          noDeleteOnStaleGet: i = this.noDeleteOnStaleGet,
          status: s,
        } = t,
        a = this.#h.get(e)
      if (void 0 !== a) {
        let o = this.#j[a],
          u = this.#w(o)
        return (
          s && this.#G(s, a),
          this.#B(a)
            ? (s && (s.get = "stale"),
              u
                ? (s &&
                    r &&
                    void 0 !== o.__staleWhileFetching &&
                    (s.returnedStale = !0),
                  r ? o.__staleWhileFetching : void 0)
                : (i || this.delete(e),
                  s && r && (s.returnedStale = !0),
                  r ? o : void 0))
            : (s && (s.get = "hit"),
              u ? o.__staleWhileFetching : (this.#y(a), n && this.#F(a), o))
        )
      }
      s && (s.get = "miss")
    }
    #M(eb, ew) {
      ;(this.#l[ew] = eb), (this.#k[eb] = ew)
    }
    #y(e0) {
      e0 !== this.#n &&
        (e0 === this.#m
          ? (this.#m = this.#k[e0])
          : this.#M(this.#l[e0], this.#k[e0]),
        this.#M(this.#n, e0),
        (this.#n = e0))
    }
    delete(e) {
      let t = !1
      if (0 !== this.#f) {
        let r = this.#h.get(e)
        if (void 0 !== r) {
          if (((t = !0), 1 === this.#f)) this.clear()
          else {
            this.#H(r)
            let n = this.#j[r]
            if (
              (this.#w(n)
                ? n.__abortController.abort(Error("deleted"))
                : (this.#t || this.#v) &&
                  (this.#t && this.#c?.(n, e, "delete"),
                  this.#v && this.#p?.push([n, e, "delete"])),
              this.#h.delete(e),
              (this.#i[r] = void 0),
              (this.#j[r] = void 0),
              r === this.#n)
            )
              this.#n = this.#l[r]
            else if (r === this.#m) this.#m = this.#k[r]
            else {
              let i = this.#l[r]
              this.#k[i] = this.#k[r]
              let s = this.#k[r]
              this.#l[s] = this.#l[r]
            }
            this.#f--, this.#o.push(r)
          }
        }
      }
      if (this.#v && this.#p?.length) {
        let a = this.#p,
          o
        for (; (o = a?.shift()); ) this.#d?.(...o)
      }
      return t
    }
    clear() {
      for (let e of this.#A({ allowStale: !0 })) {
        let t = this.#j[e]
        if (this.#w(t)) t.__abortController.abort(Error("deleted"))
        else {
          let r = this.#i[e]
          this.#t && this.#c?.(t, r, "delete"),
            this.#v && this.#p?.push([t, r, "delete"])
        }
      }
      if (
        (this.#h.clear(),
        this.#j.fill(void 0),
        this.#i.fill(void 0),
        this.#s && this.#r && (this.#s.fill(0), this.#r.fill(0)),
        this.#q && this.#q.fill(0),
        (this.#m = 0),
        (this.#n = 0),
        (this.#o.length = 0),
        (this.#g = 0),
        (this.#f = 0),
        this.#v && this.#p)
      ) {
        let n = this.#p,
          i
        for (; (i = n?.shift()); ) this.#d?.(...i)
      }
    }
  }
function Er({ size: e }) {
  return new ht({
    max: e,
    maxSize: 5e6,
    sizeCalculation: (e) => JSON.stringify(e).length,
    allowStale: !0,
  })
}
function Ar({ cache: e }) {
  return async (t) => {
    if (e.max) return e.get(t)
  }
}
function Cr({ cache: e }) {
  return async (t, { url: r, address: n }, i) => {
    if (e.max) return e.set(t, { url: r, address: n }, { ttl: i })
  }
}
function Rr({ cache: e }) {
  return async (t) => {
    if (e.max) return e.get(t)
  }
}
function jr({ cache: e }) {
  return async (t, r, n) => {
    if (e.max) return e.set(t, { url: r, address: t, ttl: n }, { ttl: n })
  }
}
function Ir({ fetch: e }) {
  return async (t, r) => {
    let n = await e(`${t}?process-id=${r}`, {
      method: "GET",
      redirect: "manual",
    })
    return [301, 302, 307, 308].includes(n.status)
      ? new URL(n.headers.get("Location")).origin
      : t
  }
}
!(function (e) {
  ;(e.assertEqual = (e) => e),
    (e.assertIs = function e(t) {}),
    (e.assertNever = function e(t) {
      throw Error()
    }),
    (e.arrayToEnum = (e) => {
      let t = {}
      for (let r of e) t[r] = r
      return t
    }),
    (e.getValidEnumValues = (t) => {
      let r = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
        n = {}
      for (let i of r) n[i] = t[i]
      return e.objectValues(n)
    }),
    (e.objectValues = (t) =>
      e.objectKeys(t).map(function (e) {
        return t[e]
      })),
    (e.objectKeys =
      "function" == typeof Object.keys
        ? (e) => Object.keys(e)
        : (e) => {
            let t = []
            for (let r in e)
              Object.prototype.hasOwnProperty.call(e, r) && t.push(r)
            return t
          }),
    (e.find = (e, t) => {
      for (let r of e) if (t(r)) return r
    }),
    (e.isInteger =
      "function" == typeof Number.isInteger
        ? (e) => Number.isInteger(e)
        : (e) => "number" == typeof e && isFinite(e) && Math.floor(e) === e),
    (e.joinValues = function e(t, r = " | ") {
      return t.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(r)
    }),
    (e.jsonStringifyReplacer = (e, t) =>
      "bigint" == typeof t ? t.toString() : t)
})(w || (w = {})),
  ((r18 = qt || (qt = {})).mergeShapes = (e, t) => ({ ...e, ...t }))
var d = w.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  ne = (e) => {
    switch (typeof e) {
      case "undefined":
        return d.undefined
      case "string":
        return d.string
      case "number":
        return isNaN(e) ? d.nan : d.number
      case "boolean":
        return d.boolean
      case "function":
        return d.function
      case "bigint":
        return d.bigint
      case "symbol":
        return d.symbol
      case "object":
        return Array.isArray(e)
          ? d.array
          : null === e
          ? d.null
          : e.then &&
            "function" == typeof e.then &&
            e.catch &&
            "function" == typeof e.catch
          ? d.promise
          : "u" > typeof Map && e instanceof Map
          ? d.map
          : "u" > typeof Set && e instanceof Set
          ? d.set
          : "u" > typeof Date && e instanceof Date
          ? d.date
          : d.object
      default:
        return d.unknown
    }
  },
  c = w.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  Vn = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
  P = class e extends Error {
    constructor(e) {
      super(),
        (this.issues = []),
        (this.addIssue = (e) => {
          this.issues = [...this.issues, e]
        }),
        (this.addIssues = (e = []) => {
          this.issues = [...this.issues, ...e]
        })
      let t = new.target.prototype
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : (this.__proto__ = t),
        (this.name = "ZodError"),
        (this.issues = e)
    }
    get errors() {
      return this.issues
    }
    format(e) {
      let t =
          e ||
          function (e) {
            return e.message
          },
        r = { _errors: [] },
        n = (e) => {
          for (let i of e.issues)
            if ("invalid_union" === i.code) i.unionErrors.map(n)
            else if ("invalid_return_type" === i.code) n(i.returnTypeError)
            else if ("invalid_arguments" === i.code) n(i.argumentsError)
            else if (0 === i.path.length) r._errors.push(t(i))
            else {
              let s = r,
                a = 0
              for (; a < i.path.length; ) {
                let o = i.path[a]
                a === i.path.length - 1
                  ? ((s[o] = s[o] || { _errors: [] }), s[o]._errors.push(t(i)))
                  : (s[o] = s[o] || { _errors: [] }),
                  (s = s[o]),
                  a++
              }
            }
        }
      return n(this), r
    }
    static assert(t) {
      if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`)
    }
    toString() {
      return this.message
    }
    get message() {
      return JSON.stringify(this.issues, w.jsonStringifyReplacer, 2)
    }
    get isEmpty() {
      return 0 === this.issues.length
    }
    flatten(e = (e) => e.message) {
      let t = {},
        r = []
      for (let n of this.issues)
        n.path.length > 0
          ? ((t[n.path[0]] = t[n.path[0]] || []), t[n.path[0]].push(e(n)))
          : r.push(e(n))
      return { formErrors: r, fieldErrors: t }
    }
    get formErrors() {
      return this.flatten()
    }
  }
P.create = (e) => new P(e)
var je = (e, t) => {
    let r
    switch (e.code) {
      case c.invalid_type:
        r =
          e.received === d.undefined
            ? "Required"
            : `Expected ${e.expected}, received ${e.received}`
        break
      case c.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(
          e.expected,
          w.jsonStringifyReplacer
        )}`
        break
      case c.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${w.joinValues(e.keys, ", ")}`
        break
      case c.invalid_union:
        r = "Invalid input"
        break
      case c.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${w.joinValues(e.options)}`
        break
      case c.invalid_enum_value:
        r = `Invalid enum value. Expected ${w.joinValues(
          e.options
        )}, received '${e.received}'`
        break
      case c.invalid_arguments:
        r = "Invalid function arguments"
        break
      case c.invalid_return_type:
        r = "Invalid function return type"
        break
      case c.invalid_date:
        r = "Invalid date"
        break
      case c.invalid_string:
        "object" == typeof e.validation
          ? "includes" in e.validation
            ? ((r = `Invalid input: must include "${e.validation.includes}"`),
              "number" == typeof e.validation.position &&
                (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
            : "startsWith" in e.validation
            ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
            : "endsWith" in e.validation
            ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
            : w.assertNever(e.validation)
          : (r =
              "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid")
        break
      case c.too_small:
        r =
          "array" === e.type
            ? `Array must contain ${
                e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
              } ${e.minimum} element(s)`
            : "string" === e.type
            ? `String must contain ${
                e.exact ? "exactly" : e.inclusive ? "at least" : "over"
              } ${e.minimum} character(s)`
            : "number" === e.type
            ? `Number must be ${
                e.exact
                  ? "exactly equal to "
                  : e.inclusive
                  ? "greater than or equal to "
                  : "greater than "
              }${e.minimum}`
            : "date" === e.type
            ? `Date must be ${
                e.exact
                  ? "exactly equal to "
                  : e.inclusive
                  ? "greater than or equal to "
                  : "greater than "
              }${new Date(Number(e.minimum))}`
            : "Invalid input"
        break
      case c.too_big:
        r =
          "array" === e.type
            ? `Array must contain ${
                e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
              } ${e.maximum} element(s)`
            : "string" === e.type
            ? `String must contain ${
                e.exact ? "exactly" : e.inclusive ? "at most" : "under"
              } ${e.maximum} character(s)`
            : "number" === e.type
            ? `Number must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "less than or equal to"
                  : "less than"
              } ${e.maximum}`
            : "bigint" === e.type
            ? `BigInt must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "less than or equal to"
                  : "less than"
              } ${e.maximum}`
            : "date" === e.type
            ? `Date must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "smaller than or equal to"
                  : "smaller than"
              } ${new Date(Number(e.maximum))}`
            : "Invalid input"
        break
      case c.custom:
        r = "Invalid input"
        break
      case c.invalid_intersection_types:
        r = "Intersection results could not be merged"
        break
      case c.not_multiple_of:
        r = `Number must be a multiple of ${e.multipleOf}`
        break
      case c.not_finite:
        r = "Number must be finite"
        break
      default:
        ;(r = t.defaultError), w.assertNever(e)
    }
    return { message: r }
  },
  Pr = je
function qn(e) {
  Pr = e
}
function pt() {
  return Pr
}
var mt = (e) => {
    let { data: t, path: r, errorMaps: n, issueData: i } = e,
      s = [...r, ...(i.path || [])],
      a = { ...i, path: s }
    if (void 0 !== i.message) return { ...i, path: s, message: i.message }
    let o = "",
      u = n
        .filter((e) => !!e)
        .slice()
        .reverse()
    for (let l of u) o = l(a, { data: t, defaultError: o }).message
    return { ...i, path: s, message: o }
  },
  Gn = []
function f(e, t) {
  let r = pt(),
    n = mt({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [
        e.common.contextualErrorMap,
        e.schemaErrorMap,
        r,
        r === je ? void 0 : je,
      ].filter((e) => !!e),
    })
  e.common.issues.push(n)
}
var R = class e {
    constructor() {
      this.value = "valid"
    }
    dirty() {
      "valid" === this.value && (this.value = "dirty")
    }
    abort() {
      "aborted" !== this.value && (this.value = "aborted")
    }
    static mergeArray(e, t) {
      let r = []
      for (let n of t) {
        if ("aborted" === n.status) return y
        "dirty" === n.status && e.dirty(), r.push(n.value)
      }
      return { status: e.value, value: r }
    }
    static async mergeObjectAsync(t, r) {
      let n = []
      for (let i of r) {
        let s = await i.key,
          a = await i.value
        n.push({ key: s, value: a })
      }
      return e.mergeObjectSync(t, n)
    }
    static mergeObjectSync(e, t) {
      let r = {}
      for (let n of t) {
        let { key: i, value: s } = n
        if ("aborted" === i.status || "aborted" === s.status) return y
        "dirty" === i.status && e.dirty(),
          "dirty" === s.status && e.dirty(),
          "__proto__" !== i.value &&
            ("u" > typeof s.value || n.alwaysSet) &&
            (r[i.value] = s.value)
      }
      return { status: e.value, value: r }
    }
  },
  y = Object.freeze({ status: "aborted" }),
  Re = (e) => ({ status: "dirty", value: e }),
  j = (e) => ({ status: "valid", value: e }),
  Gt = (e) => "aborted" === e.status,
  Ht = (e) => "dirty" === e.status,
  Je = (e) => "valid" === e.status,
  yt = (e) => "u" > typeof Promise && e instanceof Promise
function gt(e, t, r, n) {
  if ("a" === r && !n)
    throw TypeError("Private accessor was defined without a getter")
  if ("function" == typeof t ? e !== t || !n : !t.has(e))
    throw TypeError(
      "Cannot read private member from an object whose class did not declare it"
    )
  return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
}
function Zr(e, t, r, n, i) {
  if ("m" === n) throw TypeError("Private method is not writable")
  if ("a" === n && !i)
    throw TypeError("Private accessor was defined without a setter")
  if ("function" == typeof t ? e !== t || !i : !t.has(e))
    throw TypeError(
      "Cannot write private member to an object whose class did not declare it"
    )
  return "a" === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r
}
!(function (e) {
  ;(e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
    (e.toString = (e) => ("string" == typeof e ? e : e?.message))
})(p || (p = {}))
var M = class {
    constructor(e, t, r, n) {
      ;(this._cachedPath = []),
        (this.parent = e),
        (this.data = t),
        (this._path = r),
        (this._key = n)
    }
    get path() {
      return (
        this._cachedPath.length ||
          (this._key instanceof Array
            ? this._cachedPath.push(...this._path, ...this._key)
            : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
      )
    }
  },
  Nr = (e, t) => {
    if (Je(t)) return { success: !0, data: t.value }
    if (!e.common.issues.length)
      throw Error("Validation failed but no issues detected.")
    return {
      success: !1,
      get error() {
        if (this._error) return this._error
        let r = new P(e.common.issues)
        return (this._error = r), this._error
      },
    }
  }
function g(e) {
  if (!e) return {}
  let {
    errorMap: t,
    invalid_type_error: r,
    required_error: n,
    description: i,
  } = e
  if (t && (r || n))
    throw Error(
      'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
    )
  return t
    ? { errorMap: t, description: i }
    : {
        errorMap(t, i) {
          var s, a
          let { message: o } = e
          return "invalid_enum_value" === t.code
            ? { message: o ?? i.defaultError }
            : typeof i.data > "u"
            ? {
                message:
                  null !== (s = o ?? n) && void 0 !== s ? s : i.defaultError,
              }
            : "invalid_type" !== t.code
            ? { message: i.defaultError }
            : {
                message:
                  null !== (a = o ?? r) && void 0 !== a ? a : i.defaultError,
              }
        },
        description: i,
      }
}
var _ = class {
    constructor(e) {
      ;(this.spa = this.safeParseAsync),
        (this._def = e),
        (this.parse = this.parse.bind(this)),
        (this.safeParse = this.safeParse.bind(this)),
        (this.parseAsync = this.parseAsync.bind(this)),
        (this.safeParseAsync = this.safeParseAsync.bind(this)),
        (this.spa = this.spa.bind(this)),
        (this.refine = this.refine.bind(this)),
        (this.refinement = this.refinement.bind(this)),
        (this.superRefine = this.superRefine.bind(this)),
        (this.optional = this.optional.bind(this)),
        (this.nullable = this.nullable.bind(this)),
        (this.nullish = this.nullish.bind(this)),
        (this.array = this.array.bind(this)),
        (this.promise = this.promise.bind(this)),
        (this.or = this.or.bind(this)),
        (this.and = this.and.bind(this)),
        (this.transform = this.transform.bind(this)),
        (this.brand = this.brand.bind(this)),
        (this.default = this.default.bind(this)),
        (this.catch = this.catch.bind(this)),
        (this.describe = this.describe.bind(this)),
        (this.pipe = this.pipe.bind(this)),
        (this.readonly = this.readonly.bind(this)),
        (this.isNullable = this.isNullable.bind(this)),
        (this.isOptional = this.isOptional.bind(this))
    }
    get description() {
      return this._def.description
    }
    _getType(e) {
      return ne(e.data)
    }
    _getOrReturnCtx(e, t) {
      return (
        t || {
          common: e.parent.common,
          data: e.data,
          parsedType: ne(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        }
      )
    }
    _processInputParams(e) {
      return {
        status: new R(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: ne(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      }
    }
    _parseSync(e) {
      let t = this._parse(e)
      if (yt(t)) throw Error("Synchronous parse encountered promise.")
      return t
    }
    _parseAsync(e) {
      return Promise.resolve(this._parse(e))
    }
    parse(e, t) {
      let r = this.safeParse(e, t)
      if (r.success) return r.data
      throw r.error
    }
    safeParse(e, t) {
      var r
      let n = {
          common: {
            issues: [],
            async: null !== (r = t?.async) && void 0 !== r && r,
            contextualErrorMap: t?.errorMap,
          },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: ne(e),
        },
        i = this._parseSync({ data: e, path: n.path, parent: n })
      return Nr(n, i)
    }
    async parseAsync(e, t) {
      let r = await this.safeParseAsync(e, t)
      if (r.success) return r.data
      throw r.error
    }
    async safeParseAsync(e, t) {
      let r = {
          common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: ne(e),
        },
        n = this._parse({ data: e, path: r.path, parent: r }),
        i = await (yt(n) ? n : Promise.resolve(n))
      return Nr(r, i)
    }
    refine(e, t) {
      let r = (e) =>
        "string" == typeof t || typeof t > "u"
          ? { message: t }
          : "function" == typeof t
          ? t(e)
          : t
      return this._refinement((t, n) => {
        let i = e(t),
          s = () => n.addIssue({ code: c.custom, ...r(t) })
        return "u" > typeof Promise && i instanceof Promise
          ? i.then((e) => !!e || (s(), !1))
          : !!i || (s(), !1)
      })
    }
    refinement(e, t) {
      return this._refinement(
        (r, n) =>
          !!e(r) || (n.addIssue("function" == typeof t ? t(r, n) : t), !1)
      )
    }
    _refinement(e) {
      return new Z({
        schema: this,
        typeName: m.ZodEffects,
        effect: { type: "refinement", refinement: e },
      })
    }
    superRefine(e) {
      return this._refinement(e)
    }
    optional() {
      return z.create(this, this._def)
    }
    nullable() {
      return $.create(this, this._def)
    }
    nullish() {
      return this.nullable().optional()
    }
    array() {
      return J.create(this, this._def)
    }
    promise() {
      return ie.create(this, this._def)
    }
    or(e) {
      return ye.create([this, e], this._def)
    }
    and(e) {
      return ge.create(this, e, this._def)
    }
    transform(e) {
      return new Z({
        ...g(this._def),
        schema: this,
        typeName: m.ZodEffects,
        effect: { type: "transform", transform: e },
      })
    }
    default(e) {
      return new be({
        ...g(this._def),
        innerType: this,
        defaultValue: "function" == typeof e ? e : () => e,
        typeName: m.ZodDefault,
      })
    }
    brand() {
      return new Qe({ typeName: m.ZodBranded, type: this, ...g(this._def) })
    }
    catch(e) {
      return new Se({
        ...g(this._def),
        innerType: this,
        catchValue: "function" == typeof e ? e : () => e,
        typeName: m.ZodCatch,
      })
    }
    describe(e) {
      return new this.constructor({ ...this._def, description: e })
    }
    pipe(e) {
      return Ke.create(this, e)
    }
    readonly() {
      return ke.create(this)
    }
    isOptional() {
      return this.safeParse(void 0).success
    }
    isNullable() {
      return this.safeParse(null).success
    }
  },
  Hn = /^c[^\s-]{8,}$/i,
  Xn = /^[0-9a-z]+$/,
  Yn = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  Jn =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  Qn = /^[a-z0-9_-]{21}$/i,
  Kn =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  es =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  ts = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  rs =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ns =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ss = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Wr =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  as = RegExp(`^${Wr}$`)
function zr(e) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d"
  return (
    e.precision
      ? (t = `${t}\\.\\d{${e.precision}}`)
      : null == e.precision && (t = `${t}(\\.\\d+)?`),
    t
  )
}
function is(e) {
  return RegExp(`^${zr(e)}$`)
}
function Mr(e) {
  let t = `${Wr}T${zr(e)}`,
    r = []
  return (
    r.push(e.local ? "Z?" : "Z"),
    e.offset && r.push("([+-]\\d{2}:?\\d{2})"),
    (t = `${t}(${r.join("|")})`),
    RegExp(`^${t}$`)
  )
}
function os(e, t) {
  return !!(
    (("v4" === t || !t) && rs.test(e)) ||
    (("v6" === t || !t) && ns.test(e))
  )
}
var se = class e extends _ {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== d.string)
    ) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.string,
          received: t.parsedType,
        }),
        y
      )
    }
    let r = new R(),
      n
    for (let i of this._def.checks)
      if ("min" === i.kind)
        e.data.length < i.value &&
          (f((n = this._getOrReturnCtx(e, n)), {
            code: c.too_small,
            minimum: i.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: i.message,
          }),
          r.dirty())
      else if ("max" === i.kind)
        e.data.length > i.value &&
          (f((n = this._getOrReturnCtx(e, n)), {
            code: c.too_big,
            maximum: i.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: i.message,
          }),
          r.dirty())
      else if ("length" === i.kind) {
        let s = e.data.length > i.value,
          a = e.data.length < i.value
        ;(s || a) &&
          ((n = this._getOrReturnCtx(e, n)),
          s
            ? f(n, {
                code: c.too_big,
                maximum: i.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: i.message,
              })
            : a &&
              f(n, {
                code: c.too_small,
                minimum: i.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: i.message,
              }),
          r.dirty())
      } else if ("email" === i.kind)
        es.test(e.data) ||
          (f((n = this._getOrReturnCtx(e, n)), {
            validation: "email",
            code: c.invalid_string,
            message: i.message,
          }),
          r.dirty())
      else if ("emoji" === i.kind)
        Vt || (Vt = RegExp(ts, "u")),
          Vt.test(e.data) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              validation: "emoji",
              code: c.invalid_string,
              message: i.message,
            }),
            r.dirty())
      else if ("uuid" === i.kind)
        Jn.test(e.data) ||
          (f((n = this._getOrReturnCtx(e, n)), {
            validation: "uuid",
            code: c.invalid_string,
            message: i.message,
          }),
          r.dirty())
      else if ("nanoid" === i.kind)
        Qn.test(e.data) ||
          (f((n = this._getOrReturnCtx(e, n)), {
            validation: "nanoid",
            code: c.invalid_string,
            message: i.message,
          }),
          r.dirty())
      else if ("cuid" === i.kind)
        Hn.test(e.data) ||
          (f((n = this._getOrReturnCtx(e, n)), {
            validation: "cuid",
            code: c.invalid_string,
            message: i.message,
          }),
          r.dirty())
      else if ("cuid2" === i.kind)
        Xn.test(e.data) ||
          (f((n = this._getOrReturnCtx(e, n)), {
            validation: "cuid2",
            code: c.invalid_string,
            message: i.message,
          }),
          r.dirty())
      else if ("ulid" === i.kind)
        Yn.test(e.data) ||
          (f((n = this._getOrReturnCtx(e, n)), {
            validation: "ulid",
            code: c.invalid_string,
            message: i.message,
          }),
          r.dirty())
      else if ("url" === i.kind)
        try {
          new URL(e.data)
        } catch {
          f((n = this._getOrReturnCtx(e, n)), {
            validation: "url",
            code: c.invalid_string,
            message: i.message,
          }),
            r.dirty()
        }
      else
        "regex" === i.kind
          ? ((i.regex.lastIndex = 0),
            i.regex.test(e.data) ||
              (f((n = this._getOrReturnCtx(e, n)), {
                validation: "regex",
                code: c.invalid_string,
                message: i.message,
              }),
              r.dirty()))
          : "trim" === i.kind
          ? (e.data = e.data.trim())
          : "includes" === i.kind
          ? e.data.includes(i.value, i.position) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              code: c.invalid_string,
              validation: { includes: i.value, position: i.position },
              message: i.message,
            }),
            r.dirty())
          : "toLowerCase" === i.kind
          ? (e.data = e.data.toLowerCase())
          : "toUpperCase" === i.kind
          ? (e.data = e.data.toUpperCase())
          : "startsWith" === i.kind
          ? e.data.startsWith(i.value) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              code: c.invalid_string,
              validation: { startsWith: i.value },
              message: i.message,
            }),
            r.dirty())
          : "endsWith" === i.kind
          ? e.data.endsWith(i.value) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              code: c.invalid_string,
              validation: { endsWith: i.value },
              message: i.message,
            }),
            r.dirty())
          : "datetime" === i.kind
          ? Mr(i).test(e.data) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              code: c.invalid_string,
              validation: "datetime",
              message: i.message,
            }),
            r.dirty())
          : "date" === i.kind
          ? as.test(e.data) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              code: c.invalid_string,
              validation: "date",
              message: i.message,
            }),
            r.dirty())
          : "time" === i.kind
          ? is(i).test(e.data) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              code: c.invalid_string,
              validation: "time",
              message: i.message,
            }),
            r.dirty())
          : "duration" === i.kind
          ? Kn.test(e.data) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              validation: "duration",
              code: c.invalid_string,
              message: i.message,
            }),
            r.dirty())
          : "ip" === i.kind
          ? os(e.data, i.version) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              validation: "ip",
              code: c.invalid_string,
              message: i.message,
            }),
            r.dirty())
          : "base64" === i.kind
          ? ss.test(e.data) ||
            (f((n = this._getOrReturnCtx(e, n)), {
              validation: "base64",
              code: c.invalid_string,
              message: i.message,
            }),
            r.dirty())
          : w.assertNever(i)
    return { status: r.value, value: e.data }
  }
  _regex(e, t, r) {
    return this.refinement((t) => e.test(t), {
      validation: t,
      code: c.invalid_string,
      ...p.errToObj(r),
    })
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) })
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) })
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) })
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) })
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) })
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) })
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) })
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) })
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) })
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) })
  }
  datetime(e) {
    var t, r
    return "string" == typeof e
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          local: !1,
          message: e,
        })
      : this._addCheck({
          kind: "datetime",
          precision: typeof e?.precision > "u" ? null : e?.precision,
          offset: null !== (t = e?.offset) && void 0 !== t && t,
          local: null !== (r = e?.local) && void 0 !== r && r,
          ...p.errToObj(e?.message),
        })
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e })
  }
  time(e) {
    return "string" == typeof e
      ? this._addCheck({ kind: "time", precision: null, message: e })
      : this._addCheck({
          kind: "time",
          precision: typeof e?.precision > "u" ? null : e?.precision,
          ...p.errToObj(e?.message),
        })
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) })
  }
  regex(e, t) {
    return this._addCheck({ kind: "regex", regex: e, ...p.errToObj(t) })
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...p.errToObj(t?.message),
    })
  }
  startsWith(e, t) {
    return this._addCheck({ kind: "startsWith", value: e, ...p.errToObj(t) })
  }
  endsWith(e, t) {
    return this._addCheck({ kind: "endsWith", value: e, ...p.errToObj(t) })
  }
  min(e, t) {
    return this._addCheck({ kind: "min", value: e, ...p.errToObj(t) })
  }
  max(e, t) {
    return this._addCheck({ kind: "max", value: e, ...p.errToObj(t) })
  }
  length(e, t) {
    return this._addCheck({ kind: "length", value: e, ...p.errToObj(t) })
  }
  nonempty(e) {
    return this.min(1, p.errToObj(e))
  }
  trim() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    })
  }
  toLowerCase() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    })
  }
  toUpperCase() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    })
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => "datetime" === e.kind)
  }
  get isDate() {
    return !!this._def.checks.find((e) => "date" === e.kind)
  }
  get isTime() {
    return !!this._def.checks.find((e) => "time" === e.kind)
  }
  get isDuration() {
    return !!this._def.checks.find((e) => "duration" === e.kind)
  }
  get isEmail() {
    return !!this._def.checks.find((e) => "email" === e.kind)
  }
  get isURL() {
    return !!this._def.checks.find((e) => "url" === e.kind)
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => "emoji" === e.kind)
  }
  get isUUID() {
    return !!this._def.checks.find((e) => "uuid" === e.kind)
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => "nanoid" === e.kind)
  }
  get isCUID() {
    return !!this._def.checks.find((e) => "cuid" === e.kind)
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => "cuid2" === e.kind)
  }
  get isULID() {
    return !!this._def.checks.find((e) => "ulid" === e.kind)
  }
  get isIP() {
    return !!this._def.checks.find((e) => "ip" === e.kind)
  }
  get isBase64() {
    return !!this._def.checks.find((e) => "base64" === e.kind)
  }
  get minLength() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return e
  }
  get maxLength() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return e
  }
}
function us(e, t) {
  let r = (e.toString().split(".")[1] || "").length,
    n = (t.toString().split(".")[1] || "").length,
    i = r > n ? r : n,
    s = parseInt(e.toFixed(i).replace(".", "")),
    a = parseInt(t.toFixed(i).replace(".", ""))
  return (s % a) / Math.pow(10, i)
}
se.create = (e) => {
  var t
  return new se({
    checks: [],
    typeName: m.ZodString,
    coerce: null !== (t = e?.coerce) && void 0 !== t && t,
    ...g(e),
  })
}
var ce = class e extends _ {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf)
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== d.number)
    ) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.number,
          received: t.parsedType,
        }),
        y
      )
    }
    let r,
      n = new R()
    for (let i of this._def.checks)
      "int" === i.kind
        ? w.isInteger(e.data) ||
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.invalid_type,
            expected: "integer",
            received: "float",
            message: i.message,
          }),
          n.dirty())
        : "min" === i.kind
        ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.too_small,
            minimum: i.value,
            type: "number",
            inclusive: i.inclusive,
            exact: !1,
            message: i.message,
          }),
          n.dirty())
        : "max" === i.kind
        ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.too_big,
            maximum: i.value,
            type: "number",
            inclusive: i.inclusive,
            exact: !1,
            message: i.message,
          }),
          n.dirty())
        : "multipleOf" === i.kind
        ? 0 !== us(e.data, i.value) &&
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.not_multiple_of,
            multipleOf: i.value,
            message: i.message,
          }),
          n.dirty())
        : "finite" === i.kind
        ? Number.isFinite(e.data) ||
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.not_finite,
            message: i.message,
          }),
          n.dirty())
        : w.assertNever(i)
    return { status: n.value, value: e.data }
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t))
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t))
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t))
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t))
  }
  setLimit(t, r, n, i) {
    return new e({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: r, inclusive: n, message: p.toString(i) },
      ],
    })
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  int(e) {
    return this._addCheck({ kind: "int", message: p.toString(e) })
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: p.toString(e),
    })
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: p.toString(e),
    })
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: p.toString(e),
    })
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: p.toString(e),
    })
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t),
    })
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: p.toString(e) })
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e),
    })
  }
  get minValue() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return e
  }
  get maxValue() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return e
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        "int" === e.kind || ("multipleOf" === e.kind && w.isInteger(e.value))
    )
  }
  get isFinite() {
    let e = null,
      t = null
    for (let r of this._def.checks) {
      if ("finite" === r.kind || "int" === r.kind || "multipleOf" === r.kind)
        return !0
      "min" === r.kind
        ? (null === t || r.value > t) && (t = r.value)
        : "max" === r.kind && (null === e || r.value < e) && (e = r.value)
    }
    return Number.isFinite(t) && Number.isFinite(e)
  }
}
ce.create = (e) =>
  new ce({
    checks: [],
    typeName: m.ZodNumber,
    coerce: e?.coerce || !1,
    ...g(e),
  })
var fe = class e extends _ {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte)
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = BigInt(e.data)),
      this._getType(e) !== d.bigint)
    ) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.bigint,
          received: t.parsedType,
        }),
        y
      )
    }
    let r,
      n = new R()
    for (let i of this._def.checks)
      "min" === i.kind
        ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.too_small,
            type: "bigint",
            minimum: i.value,
            inclusive: i.inclusive,
            message: i.message,
          }),
          n.dirty())
        : "max" === i.kind
        ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.too_big,
            type: "bigint",
            maximum: i.value,
            inclusive: i.inclusive,
            message: i.message,
          }),
          n.dirty())
        : "multipleOf" === i.kind
        ? e.data % i.value !== BigInt(0) &&
          (f((r = this._getOrReturnCtx(e, r)), {
            code: c.not_multiple_of,
            multipleOf: i.value,
            message: i.message,
          }),
          n.dirty())
        : w.assertNever(i)
    return { status: n.value, value: e.data }
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t))
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t))
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t))
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t))
  }
  setLimit(t, r, n, i) {
    return new e({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: r, inclusive: n, message: p.toString(i) },
      ],
    })
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e),
    })
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e),
    })
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e),
    })
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e),
    })
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t),
    })
  }
  get minValue() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return e
  }
  get maxValue() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return e
  }
}
fe.create = (e) => {
  var t
  return new fe({
    checks: [],
    typeName: m.ZodBigInt,
    coerce: null !== (t = e?.coerce) && void 0 !== t && t,
    ...g(e),
  })
}
var de = class extends _ {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== d.boolean)
    ) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.boolean,
          received: t.parsedType,
        }),
        y
      )
    }
    return j(e.data)
  }
}
de.create = (e) =>
  new de({ typeName: m.ZodBoolean, coerce: e?.coerce || !1, ...g(e) })
var he = class e extends _ {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== d.date)
    ) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.date,
          received: t.parsedType,
        }),
        y
      )
    }
    if (isNaN(e.data.getTime()))
      return f(this._getOrReturnCtx(e), { code: c.invalid_date }), y
    let r = new R(),
      n
    for (let i of this._def.checks)
      "min" === i.kind
        ? e.data.getTime() < i.value &&
          (f((n = this._getOrReturnCtx(e, n)), {
            code: c.too_small,
            message: i.message,
            inclusive: !0,
            exact: !1,
            minimum: i.value,
            type: "date",
          }),
          r.dirty())
        : "max" === i.kind
        ? e.data.getTime() > i.value &&
          (f((n = this._getOrReturnCtx(e, n)), {
            code: c.too_big,
            message: i.message,
            inclusive: !0,
            exact: !1,
            maximum: i.value,
            type: "date",
          }),
          r.dirty())
        : w.assertNever(i)
    return { status: r.value, value: new Date(e.data.getTime()) }
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t),
    })
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t),
    })
  }
  get minDate() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return null != e ? new Date(e) : null
  }
  get maxDate() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return null != e ? new Date(e) : null
  }
}
he.create = (e) =>
  new he({ checks: [], coerce: e?.coerce || !1, typeName: m.ZodDate, ...g(e) })
var Ie = class extends _ {
  _parse(e) {
    if (this._getType(e) !== d.symbol) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.symbol,
          received: t.parsedType,
        }),
        y
      )
    }
    return j(e.data)
  }
}
Ie.create = (e) => new Ie({ typeName: m.ZodSymbol, ...g(e) })
var pe = class extends _ {
  _parse(e) {
    if (this._getType(e) !== d.undefined) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.undefined,
          received: t.parsedType,
        }),
        y
      )
    }
    return j(e.data)
  }
}
pe.create = (e) => new pe({ typeName: m.ZodUndefined, ...g(e) })
var me = class extends _ {
  _parse(e) {
    if (this._getType(e) !== d.null) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.null,
          received: t.parsedType,
        }),
        y
      )
    }
    return j(e.data)
  }
}
me.create = (e) => new me({ typeName: m.ZodNull, ...g(e) })
var ae = class extends _ {
  constructor() {
    super(...arguments), (this._any = !0)
  }
  _parse(e) {
    return j(e.data)
  }
}
ae.create = (e) => new ae({ typeName: m.ZodAny, ...g(e) })
var Y = class extends _ {
  constructor() {
    super(...arguments), (this._unknown = !0)
  }
  _parse(e) {
    return j(e.data)
  }
}
Y.create = (e) => new Y({ typeName: m.ZodUnknown, ...g(e) })
var D = class extends _ {
  _parse(e) {
    let t = this._getOrReturnCtx(e)
    return (
      f(t, { code: c.invalid_type, expected: d.never, received: t.parsedType }),
      y
    )
  }
}
D.create = (e) => new D({ typeName: m.ZodNever, ...g(e) })
var Ne = class extends _ {
  _parse(e) {
    if (this._getType(e) !== d.undefined) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.void,
          received: t.parsedType,
        }),
        y
      )
    }
    return j(e.data)
  }
}
Ne.create = (e) => new Ne({ typeName: m.ZodVoid, ...g(e) })
var J = class e extends _ {
  _parse(e) {
    let { ctx: t, status: r } = this._processInputParams(e),
      n = this._def
    if (t.parsedType !== d.array)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.array,
          received: t.parsedType,
        }),
        y
      )
    if (null !== n.exactLength) {
      let i = t.data.length > n.exactLength.value,
        s = t.data.length < n.exactLength.value
      ;(i || s) &&
        (f(t, {
          code: i ? c.too_big : c.too_small,
          minimum: s ? n.exactLength.value : void 0,
          maximum: i ? n.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: n.exactLength.message,
        }),
        r.dirty())
    }
    if (
      (null !== n.minLength &&
        t.data.length < n.minLength.value &&
        (f(t, {
          code: c.too_small,
          minimum: n.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.minLength.message,
        }),
        r.dirty()),
      null !== n.maxLength &&
        t.data.length > n.maxLength.value &&
        (f(t, {
          code: c.too_big,
          maximum: n.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.maxLength.message,
        }),
        r.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((e, r) => n.type._parseAsync(new M(t, e, t.path, r)))
      ).then((e) => R.mergeArray(r, e))
    let a = [...t.data].map((e, r) => n.type._parseSync(new M(t, e, t.path, r)))
    return R.mergeArray(r, a)
  }
  get element() {
    return this._def.type
  }
  min(t, r) {
    return new e({
      ...this._def,
      minLength: { value: t, message: p.toString(r) },
    })
  }
  max(t, r) {
    return new e({
      ...this._def,
      maxLength: { value: t, message: p.toString(r) },
    })
  }
  length(t, r) {
    return new e({
      ...this._def,
      exactLength: { value: t, message: p.toString(r) },
    })
  }
  nonempty(e) {
    return this.min(1, e)
  }
}
function Ce(e) {
  if (!(e instanceof N))
    return e instanceof J
      ? new J({ ...e._def, type: Ce(e.element) })
      : e instanceof z
      ? z.create(Ce(e.unwrap()))
      : e instanceof $
      ? $.create(Ce(e.unwrap()))
      : e instanceof U
      ? U.create(e.items.map((e) => Ce(e)))
      : e
  {
    let t = {}
    for (let r in e.shape) {
      let n = e.shape[r]
      t[r] = z.create(Ce(n))
    }
    return new N({ ...e._def, shape: () => t })
  }
}
J.create = (e, t) =>
  new J({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: m.ZodArray,
    ...g(t),
  })
var N = class e extends _ {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend)
  }
  _getCached() {
    if (null !== this._cached) return this._cached
    let e = this._def.shape(),
      t = w.objectKeys(e)
    return (this._cached = { shape: e, keys: t })
  }
  _parse(e) {
    if (this._getType(e) !== d.object) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          code: c.invalid_type,
          expected: d.object,
          received: t.parsedType,
        }),
        y
      )
    }
    let { status: r, ctx: n } = this._processInputParams(e),
      { shape: i, keys: s } = this._getCached(),
      a = []
    if (!(this._def.catchall instanceof D && "strip" === this._def.unknownKeys))
      for (let o in n.data) s.includes(o) || a.push(o)
    let u = []
    for (let l of s) {
      let h = i[l],
        S = n.data[l]
      u.push({
        key: { status: "valid", value: l },
        value: h._parse(new M(n, S, n.path, l)),
        alwaysSet: l in n.data,
      })
    }
    if (this._def.catchall instanceof D) {
      let A = this._def.unknownKeys
      if ("passthrough" === A)
        for (let O of a)
          u.push({
            key: { status: "valid", value: O },
            value: { status: "valid", value: n.data[O] },
          })
      else if ("strict" === A)
        a.length > 0 &&
          (f(n, { code: c.unrecognized_keys, keys: a }), r.dirty())
      else if ("strip" !== A)
        throw Error("Internal ZodObject error: invalid unknownKeys value.")
    } else {
      let L = this._def.catchall
      for (let V of a) {
        let W = n.data[V]
        u.push({
          key: { status: "valid", value: V },
          value: L._parse(new M(n, W, n.path, V)),
          alwaysSet: V in n.data,
        })
      }
    }
    return n.common.async
      ? Promise.resolve()
          .then(async () => {
            let e = []
            for (let t of u) {
              let r = await t.key,
                n = await t.value
              e.push({ key: r, value: n, alwaysSet: t.alwaysSet })
            }
            return e
          })
          .then((e) => R.mergeObjectSync(r, e))
      : R.mergeObjectSync(r, u)
  }
  get shape() {
    return this._def.shape()
  }
  strict(t) {
    return (
      p.errToObj,
      new e({
        ...this._def,
        unknownKeys: "strict",
        ...(void 0 !== t
          ? {
              errorMap: (e, r) => {
                var n, i, s, a
                let o =
                  null !==
                    (s =
                      null === (i = (n = this._def).errorMap) || void 0 === i
                        ? void 0
                        : i.call(n, e, r).message) && void 0 !== s
                    ? s
                    : r.defaultError
                return "unrecognized_keys" === e.code
                  ? {
                      message:
                        null !== (a = p.errToObj(t).message) && void 0 !== a
                          ? a
                          : o,
                    }
                  : { message: o }
              },
            }
          : {}),
      })
    )
  }
  strip() {
    return new e({ ...this._def, unknownKeys: "strip" })
  }
  passthrough() {
    return new e({ ...this._def, unknownKeys: "passthrough" })
  }
  extend(t) {
    return new e({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...t }),
    })
  }
  merge(t) {
    return new e({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: m.ZodObject,
    })
  }
  setKey(e, t) {
    return this.augment({ [e]: t })
  }
  catchall(t) {
    return new e({ ...this._def, catchall: t })
  }
  pick(t) {
    let r = {}
    return (
      w.objectKeys(t).forEach((e) => {
        t[e] && this.shape[e] && (r[e] = this.shape[e])
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  omit(t) {
    let r = {}
    return (
      w.objectKeys(this.shape).forEach((e) => {
        t[e] || (r[e] = this.shape[e])
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  deepPartial() {
    return Ce(this)
  }
  partial(t) {
    let r = {}
    return (
      w.objectKeys(this.shape).forEach((e) => {
        let n = this.shape[e]
        t && !t[e] ? (r[e] = n) : (r[e] = n.optional())
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  required(t) {
    let r = {}
    return (
      w.objectKeys(this.shape).forEach((e) => {
        if (t && !t[e]) r[e] = this.shape[e]
        else {
          let n = this.shape[e]
          for (; n instanceof z; ) n = n._def.innerType
          r[e] = n
        }
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  keyof() {
    return Dr(w.objectKeys(this.shape))
  }
}
;(N.create = (e, t) =>
  new N({
    shape: () => e,
    unknownKeys: "strip",
    catchall: D.create(),
    typeName: m.ZodObject,
    ...g(t),
  })),
  (N.strictCreate = (e, t) =>
    new N({
      shape: () => e,
      unknownKeys: "strict",
      catchall: D.create(),
      typeName: m.ZodObject,
      ...g(t),
    })),
  (N.lazycreate = (e, t) =>
    new N({
      shape: e,
      unknownKeys: "strip",
      catchall: D.create(),
      typeName: m.ZodObject,
      ...g(t),
    }))
var ye = class extends _ {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      r = this._def.options
    if (t.common.async)
      return Promise.all(
        r.map(async (e) => {
          let r = { ...t, common: { ...t.common, issues: [] }, parent: null }
          return {
            result: await e._parseAsync({
              data: t.data,
              path: t.path,
              parent: r,
            }),
            ctx: r,
          }
        })
      ).then(function e(r) {
        for (let n of r) if ("valid" === n.result.status) return n.result
        for (let i of r)
          if ("dirty" === i.result.status)
            return t.common.issues.push(...i.ctx.common.issues), i.result
        let s = r.map((e) => new P(e.ctx.common.issues))
        return f(t, { code: c.invalid_union, unionErrors: s }), y
      })
    {
      let n,
        i = []
      for (let s of r) {
        let a = { ...t, common: { ...t.common, issues: [] }, parent: null },
          o = s._parseSync({ data: t.data, path: t.path, parent: a })
        if ("valid" === o.status) return o
        "dirty" !== o.status || n || (n = { result: o, ctx: a }),
          a.common.issues.length && i.push(a.common.issues)
      }
      if (n) return t.common.issues.push(...n.ctx.common.issues), n.result
      let u = i.map((e) => new P(e))
      return f(t, { code: c.invalid_union, unionErrors: u }), y
    }
  }
  get options() {
    return this._def.options
  }
}
ye.create = (e, t) => new ye({ options: e, typeName: m.ZodUnion, ...g(t) })
var X = (e) =>
    e instanceof _e
      ? X(e.schema)
      : e instanceof Z
      ? X(e.innerType())
      : e instanceof ve
      ? [e.value]
      : e instanceof xe
      ? e.options
      : e instanceof we
      ? w.objectValues(e.enum)
      : e instanceof be
      ? X(e._def.innerType)
      : e instanceof pe
      ? [void 0]
      : e instanceof me
      ? [null]
      : e instanceof z
      ? [void 0, ...X(e.unwrap())]
      : e instanceof $
      ? [null, ...X(e.unwrap())]
      : e instanceof Qe || e instanceof ke
      ? X(e.unwrap())
      : e instanceof Se
      ? X(e._def.innerType)
      : [],
  _t = class e extends _ {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e)
      if (t.parsedType !== d.object)
        return (
          f(t, {
            code: c.invalid_type,
            expected: d.object,
            received: t.parsedType,
          }),
          y
        )
      let r = this.discriminator,
        n = t.data[r],
        i = this.optionsMap.get(n)
      return i
        ? t.common.async
          ? i._parseAsync({ data: t.data, path: t.path, parent: t })
          : i._parseSync({ data: t.data, path: t.path, parent: t })
        : (f(t, {
            code: c.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [r],
          }),
          y)
    }
    get discriminator() {
      return this._def.discriminator
    }
    get options() {
      return this._def.options
    }
    get optionsMap() {
      return this._def.optionsMap
    }
    static create(t, r, n) {
      let i = new Map()
      for (let s of r) {
        let a = X(s.shape[t])
        if (!a.length)
          throw Error(
            `A discriminator value for key \`${t}\` could not be extracted from all schema options`
          )
        for (let o of a) {
          if (i.has(o))
            throw Error(
              `Discriminator property ${String(t)} has duplicate value ${String(
                o
              )}`
            )
          i.set(o, s)
        }
      }
      return new e({
        typeName: m.ZodDiscriminatedUnion,
        discriminator: t,
        options: r,
        optionsMap: i,
        ...g(n),
      })
    }
  }
function Xt(e, t) {
  let r = ne(e),
    n = ne(t)
  if (e === t) return { valid: !0, data: e }
  if (r === d.object && n === d.object) {
    let i = w.objectKeys(t),
      s = w.objectKeys(e).filter((e) => -1 !== i.indexOf(e)),
      a = { ...e, ...t }
    for (let o of s) {
      let u = Xt(e[o], t[o])
      if (!u.valid) return { valid: !1 }
      a[o] = u.data
    }
    return { valid: !0, data: a }
  }
  if (r !== d.array || n !== d.array)
    return r === d.date && n === d.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 }
  {
    if (e.length !== t.length) return { valid: !1 }
    let l = []
    for (let h = 0; h < e.length; h++) {
      let S,
        A = Xt(e[h], t[h])
      if (!A.valid) return { valid: !1 }
      l.push(A.data)
    }
    return { valid: !0, data: l }
  }
}
var ge = class extends _ {
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e),
      n = (e, n) => {
        if (Gt(e) || Gt(n)) return y
        let i = Xt(e.value, n.value)
        return i.valid
          ? ((Ht(e) || Ht(n)) && t.dirty(), { status: t.value, value: i.data })
          : (f(r, { code: c.invalid_intersection_types }), y)
      }
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          }),
        ]).then(([e, t]) => n(e, t))
      : n(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r })
        )
  }
}
ge.create = (e, t, r) =>
  new ge({ left: e, right: t, typeName: m.ZodIntersection, ...g(r) })
var U = class e extends _ {
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e)
    if (r.parsedType !== d.array)
      return (
        f(r, {
          code: c.invalid_type,
          expected: d.array,
          received: r.parsedType,
        }),
        y
      )
    if (r.data.length < this._def.items.length)
      return (
        f(r, {
          code: c.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        y
      )
    !this._def.rest &&
      r.data.length > this._def.items.length &&
      (f(r, {
        code: c.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      t.dirty())
    let n = [...r.data]
      .map((e, t) => {
        let n = this._def.items[t] || this._def.rest
        return n ? n._parse(new M(r, e, r.path, t)) : null
      })
      .filter((e) => !!e)
    return r.common.async
      ? Promise.all(n).then((e) => R.mergeArray(t, e))
      : R.mergeArray(t, n)
  }
  get items() {
    return this._def.items
  }
  rest(t) {
    return new e({ ...this._def, rest: t })
  }
}
U.create = (e, t) => {
  if (!Array.isArray(e))
    throw Error("You must pass an array of schemas to z.tuple([ ... ])")
  return new U({ items: e, typeName: m.ZodTuple, rest: null, ...g(t) })
}
var vt = class e extends _ {
    get keySchema() {
      return this._def.keyType
    }
    get valueSchema() {
      return this._def.valueType
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e)
      if (r.parsedType !== d.object)
        return (
          f(r, {
            code: c.invalid_type,
            expected: d.object,
            received: r.parsedType,
          }),
          y
        )
      let n = [],
        i = this._def.keyType,
        s = this._def.valueType
      for (let a in r.data)
        n.push({
          key: i._parse(new M(r, a, r.path, a)),
          value: s._parse(new M(r, r.data[a], r.path, a)),
          alwaysSet: a in r.data,
        })
      return r.common.async ? R.mergeObjectAsync(t, n) : R.mergeObjectSync(t, n)
    }
    get element() {
      return this._def.valueType
    }
    static create(t, r, n) {
      return new e(
        r instanceof _
          ? { keyType: t, valueType: r, typeName: m.ZodRecord, ...g(n) }
          : {
              keyType: se.create(),
              valueType: t,
              typeName: m.ZodRecord,
              ...g(r),
            }
      )
    }
  },
  Le = class extends _ {
    get keySchema() {
      return this._def.keyType
    }
    get valueSchema() {
      return this._def.valueType
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e)
      if (r.parsedType !== d.map)
        return (
          f(r, {
            code: c.invalid_type,
            expected: d.map,
            received: r.parsedType,
          }),
          y
        )
      let n = this._def.keyType,
        i = this._def.valueType,
        s = [...r.data.entries()].map(([e, t], s) => ({
          key: n._parse(new M(r, e, r.path, [s, "key"])),
          value: i._parse(new M(r, t, r.path, [s, "value"])),
        }))
      if (r.common.async) {
        let a = new Map()
        return Promise.resolve().then(async () => {
          for (let e of s) {
            let r = await e.key,
              n = await e.value
            if ("aborted" === r.status || "aborted" === n.status) return y
            ;("dirty" === r.status || "dirty" === n.status) && t.dirty(),
              a.set(r.value, n.value)
          }
          return { status: t.value, value: a }
        })
      }
      {
        let o = new Map()
        for (let u of s) {
          let l = u.key,
            h = u.value
          if ("aborted" === l.status || "aborted" === h.status) return y
          ;("dirty" === l.status || "dirty" === h.status) && t.dirty(),
            o.set(l.value, h.value)
        }
        return { status: t.value, value: o }
      }
    }
  }
Le.create = (e, t, r) =>
  new Le({ valueType: t, keyType: e, typeName: m.ZodMap, ...g(r) })
var Pe = class e extends _ {
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e)
    if (r.parsedType !== d.set)
      return (
        f(r, { code: c.invalid_type, expected: d.set, received: r.parsedType }),
        y
      )
    let n = this._def
    null !== n.minSize &&
      r.data.size < n.minSize.value &&
      (f(r, {
        code: c.too_small,
        minimum: n.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.minSize.message,
      }),
      t.dirty()),
      null !== n.maxSize &&
        r.data.size > n.maxSize.value &&
        (f(r, {
          code: c.too_big,
          maximum: n.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: n.maxSize.message,
        }),
        t.dirty())
    let i = this._def.valueType
    function s(e) {
      let r = new Set()
      for (let n of e) {
        if ("aborted" === n.status) return y
        "dirty" === n.status && t.dirty(), r.add(n.value)
      }
      return { status: t.value, value: r }
    }
    let a = [...r.data.values()].map((e, t) => i._parse(new M(r, e, r.path, t)))
    return r.common.async ? Promise.all(a).then((e) => s(e)) : s(a)
  }
  min(t, r) {
    return new e({
      ...this._def,
      minSize: { value: t, message: p.toString(r) },
    })
  }
  max(t, r) {
    return new e({
      ...this._def,
      maxSize: { value: t, message: p.toString(r) },
    })
  }
  size(e, t) {
    return this.min(e, t).max(e, t)
  }
  nonempty(e) {
    return this.min(1, e)
  }
}
Pe.create = (e, t) =>
  new Pe({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: m.ZodSet,
    ...g(t),
  })
var xt = class e extends _ {
    constructor() {
      super(...arguments), (this.validate = this.implement)
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e)
      if (t.parsedType !== d.function)
        return (
          f(t, {
            code: c.invalid_type,
            expected: d.function,
            received: t.parsedType,
          }),
          y
        )
      function r(e, r) {
        return mt({
          data: e,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            pt(),
            je,
          ].filter((e) => !!e),
          issueData: { code: c.invalid_arguments, argumentsError: r },
        })
      }
      function n(e, r) {
        return mt({
          data: e,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            pt(),
            je,
          ].filter((e) => !!e),
          issueData: { code: c.invalid_return_type, returnTypeError: r },
        })
      }
      let i = { errorMap: t.common.contextualErrorMap },
        s = t.data
      if (this._def.returns instanceof ie) {
        let a = this
        return j(async function (...e) {
          let t = new P([]),
            o = await Reflect.apply(
              s,
              this,
              await a._def.args.parseAsync(e, i).catch((n) => {
                throw (t.addIssue(r(e, n)), t)
              })
            )
          return await a._def.returns._def.type.parseAsync(o, i).catch((e) => {
            throw (t.addIssue(n(o, e)), t)
          })
        })
      }
      {
        let o = this
        return j(function (...e) {
          let t = o._def.args.safeParse(e, i)
          if (!t.success) throw new P([r(e, t.error)])
          let a = Reflect.apply(s, this, t.data),
            u = o._def.returns.safeParse(a, i)
          if (!u.success) throw new P([n(a, u.error)])
          return u.data
        })
      }
    }
    parameters() {
      return this._def.args
    }
    returnType() {
      return this._def.returns
    }
    args(...t) {
      return new e({ ...this._def, args: U.create(t).rest(Y.create()) })
    }
    returns(t) {
      return new e({ ...this._def, returns: t })
    }
    implement(e) {
      return this.parse(e)
    }
    strictImplement(e) {
      return this.parse(e)
    }
    static create(t, r, n) {
      return new e({
        args: t || U.create([]).rest(Y.create()),
        returns: r || Y.create(),
        typeName: m.ZodFunction,
        ...g(n),
      })
    }
  },
  _e = class extends _ {
    get schema() {
      return this._def.getter()
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e)
      return this._def
        .getter()
        ._parse({ data: t.data, path: t.path, parent: t })
    }
  }
_e.create = (e, t) => new _e({ getter: e, typeName: m.ZodLazy, ...g(t) })
var ve = class extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, {
          received: t.data,
          code: c.invalid_literal,
          expected: this._def.value,
        }),
        y
      )
    }
    return { status: "valid", value: e.data }
  }
  get value() {
    return this._def.value
  }
}
function Dr(e, t) {
  return new xe({ values: e, typeName: m.ZodEnum, ...g(t) })
}
ve.create = (e, t) => new ve({ value: e, typeName: m.ZodLiteral, ...g(t) })
var xe = class e extends _ {
  constructor() {
    super(...arguments), Xe.set(this, void 0)
  }
  _parse(e) {
    if ("string" != typeof e.data) {
      let t = this._getOrReturnCtx(e),
        r = this._def.values
      return (
        f(t, {
          expected: w.joinValues(r),
          received: t.parsedType,
          code: c.invalid_type,
        }),
        y
      )
    }
    if (
      (gt(this, Xe, "f") || Zr(this, Xe, new Set(this._def.values), "f"),
      !gt(this, Xe, "f").has(e.data))
    ) {
      let n = this._getOrReturnCtx(e),
        i = this._def.values
      return (
        f(n, { received: n.data, code: c.invalid_enum_value, options: i }), y
      )
    }
    return j(e.data)
  }
  get options() {
    return this._def.values
  }
  get enum() {
    let e = {}
    for (let t of this._def.values) e[t] = t
    return e
  }
  get Values() {
    let e = {}
    for (let t of this._def.values) e[t] = t
    return e
  }
  get Enum() {
    let e = {}
    for (let t of this._def.values) e[t] = t
    return e
  }
  extract(t, r = this._def) {
    return e.create(t, { ...this._def, ...r })
  }
  exclude(t, r = this._def) {
    return e.create(
      this.options.filter((e) => !t.includes(e)),
      { ...this._def, ...r }
    )
  }
}
;(Xe = new WeakMap()), (xe.create = Dr)
var we = class extends _ {
  constructor() {
    super(...arguments), Ye.set(this, void 0)
  }
  _parse(e) {
    let t = w.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(e)
    if (r.parsedType !== d.string && r.parsedType !== d.number) {
      let n = w.objectValues(t)
      return (
        f(r, {
          expected: w.joinValues(n),
          received: r.parsedType,
          code: c.invalid_type,
        }),
        y
      )
    }
    if (
      (gt(this, Ye, "f") ||
        Zr(this, Ye, new Set(w.getValidEnumValues(this._def.values)), "f"),
      !gt(this, Ye, "f").has(e.data))
    ) {
      let i = w.objectValues(t)
      return (
        f(r, { received: r.data, code: c.invalid_enum_value, options: i }), y
      )
    }
    return j(e.data)
  }
  get enum() {
    return this._def.values
  }
}
;(Ye = new WeakMap()),
  (we.create = (e, t) =>
    new we({ values: e, typeName: m.ZodNativeEnum, ...g(t) }))
var ie = class extends _ {
  unwrap() {
    return this._def.type
  }
  _parse(e) {
    let { ctx: t } = this._processInputParams(e)
    return t.parsedType !== d.promise && !1 === t.common.async
      ? (f(t, {
          code: c.invalid_type,
          expected: d.promise,
          received: t.parsedType,
        }),
        y)
      : j(
          (t.parsedType === d.promise ? t.data : Promise.resolve(t.data)).then(
            (e) =>
              this._def.type.parseAsync(e, {
                path: t.path,
                errorMap: t.common.contextualErrorMap,
              })
          )
        )
  }
}
ie.create = (e, t) => new ie({ type: e, typeName: m.ZodPromise, ...g(t) })
var Z = class extends _ {
  innerType() {
    return this._def.schema
  }
  sourceType() {
    return this._def.schema._def.typeName === m.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema
  }
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e),
      n = this._def.effect || null,
      i = {
        addIssue(e) {
          f(r, e), e.fatal ? t.abort() : t.dirty()
        },
        get path() {
          return r.path
        },
      }
    if (((i.addIssue = i.addIssue.bind(i)), "preprocess" === n.type)) {
      let s = n.transform(r.data, i)
      if (r.common.async)
        return Promise.resolve(s).then(async (e) => {
          if ("aborted" === t.value) return y
          let n = await this._def.schema._parseAsync({
            data: e,
            path: r.path,
            parent: r,
          })
          return "aborted" === n.status
            ? y
            : "dirty" === n.status || "dirty" === t.value
            ? Re(n.value)
            : n
        })
      {
        if ("aborted" === t.value) return y
        let a = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r,
        })
        return "aborted" === a.status
          ? y
          : "dirty" === a.status || "dirty" === t.value
          ? Re(a.value)
          : a
      }
    }
    if ("refinement" === n.type) {
      let o = (e) => {
        let t = n.refinement(e, i)
        if (r.common.async) return Promise.resolve(t)
        if (t instanceof Promise)
          throw Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
          )
        return e
      }
      if (!1 !== r.common.async)
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((e) =>
            "aborted" === e.status
              ? y
              : ("dirty" === e.status && t.dirty(),
                o(e.value).then(() => ({ status: t.value, value: e.value })))
          )
      {
        let u = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        })
        return "aborted" === u.status
          ? y
          : ("dirty" === u.status && t.dirty(),
            o(u.value),
            { status: t.value, value: u.value })
      }
    }
    if ("transform" === n.type) {
      if (!1 !== r.common.async)
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((e) =>
            Je(e)
              ? Promise.resolve(n.transform(e.value, i)).then((e) => ({
                  status: t.value,
                  value: e,
                }))
              : e
          )
      {
        let l = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        })
        if (!Je(l)) return l
        let h = n.transform(l.value, i)
        if (h instanceof Promise)
          throw Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
          )
        return { status: t.value, value: h }
      }
    }
    w.assertNever(n)
  }
}
;(Z.create = (e, t, r) =>
  new Z({ schema: e, typeName: m.ZodEffects, effect: t, ...g(r) })),
  (Z.createWithPreprocess = (e, t, r) =>
    new Z({
      schema: t,
      effect: { type: "preprocess", transform: e },
      typeName: m.ZodEffects,
      ...g(r),
    }))
var z = class extends _ {
  _parse(e) {
    return this._getType(e) === d.undefined
      ? j(void 0)
      : this._def.innerType._parse(e)
  }
  unwrap() {
    return this._def.innerType
  }
}
z.create = (e, t) => new z({ innerType: e, typeName: m.ZodOptional, ...g(t) })
var $ = class extends _ {
  _parse(e) {
    return this._getType(e) === d.null ? j(null) : this._def.innerType._parse(e)
  }
  unwrap() {
    return this._def.innerType
  }
}
$.create = (e, t) => new $({ innerType: e, typeName: m.ZodNullable, ...g(t) })
var be = class extends _ {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      r = t.data
    return (
      t.parsedType === d.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: t.path, parent: t })
    )
  }
  removeDefault() {
    return this._def.innerType
  }
}
be.create = (e, t) =>
  new be({
    innerType: e,
    typeName: m.ZodDefault,
    defaultValue: "function" == typeof t.default ? t.default : () => t.default,
    ...g(t),
  })
var Se = class extends _ {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      r = { ...t, common: { ...t.common, issues: [] } },
      n = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: { ...r },
      })
    return yt(n)
      ? n.then((e) => ({
          status: "valid",
          value:
            "valid" === e.status
              ? e.value
              : this._def.catchValue({
                  get error() {
                    return new P(r.common.issues)
                  },
                  input: r.data,
                }),
        }))
      : {
          status: "valid",
          value:
            "valid" === n.status
              ? n.value
              : this._def.catchValue({
                  get error() {
                    return new P(r.common.issues)
                  },
                  input: r.data,
                }),
        }
  }
  removeCatch() {
    return this._def.innerType
  }
}
Se.create = (e, t) =>
  new Se({
    innerType: e,
    typeName: m.ZodCatch,
    catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
    ...g(t),
  })
var Ze = class extends _ {
  _parse(e) {
    if (this._getType(e) !== d.nan) {
      let t = this._getOrReturnCtx(e)
      return (
        f(t, { code: c.invalid_type, expected: d.nan, received: t.parsedType }),
        y
      )
    }
    return { status: "valid", value: e.data }
  }
}
Ze.create = (e) => new Ze({ typeName: m.ZodNaN, ...g(e) })
var ls = Symbol("zod_brand"),
  Qe = class extends _ {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = t.data
      return this._def.type._parse({ data: r, path: t.path, parent: t })
    }
    unwrap() {
      return this._def.type
    }
  },
  Ke = class e extends _ {
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e)
      if (r.common.async)
        return (async () => {
          let e = await this._def.in._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          })
          return "aborted" === e.status
            ? y
            : "dirty" === e.status
            ? (t.dirty(), Re(e.value))
            : this._def.out._parseAsync({
                data: e.value,
                path: r.path,
                parent: r,
              })
        })()
      {
        let n = this._def.in._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        })
        return "aborted" === n.status
          ? y
          : "dirty" === n.status
          ? (t.dirty(), { status: "dirty", value: n.value })
          : this._def.out._parseSync({ data: n.value, path: r.path, parent: r })
      }
    }
    static create(t, r) {
      return new e({ in: t, out: r, typeName: m.ZodPipeline })
    }
  },
  ke = class extends _ {
    _parse(e) {
      let t = this._def.innerType._parse(e)
      return Je(t) && (t.value = Object.freeze(t.value)), t
    }
    unwrap() {
      return this._def.innerType
    }
  }
function Br(e, t = {}, r) {
  return e
    ? ae.create().superRefine((n, i) => {
        var s, a
        if (!e(n)) {
          let o =
              "function" == typeof t
                ? t(n)
                : "string" == typeof t
                ? { message: t }
                : t,
            u =
              null === (a = null !== (s = o.fatal) && void 0 !== s ? s : r) ||
              void 0 === a ||
              a
          i.addIssue({
            code: "custom",
            ...("string" == typeof o ? { message: o } : o),
            fatal: u,
          })
        }
      })
    : ae.create()
}
ke.create = (e, t) => new ke({ innerType: e, typeName: m.ZodReadonly, ...g(t) })
var cs = { object: N.lazycreate }
!(function (e) {
  ;(e.ZodString = "ZodString"),
    (e.ZodNumber = "ZodNumber"),
    (e.ZodNaN = "ZodNaN"),
    (e.ZodBigInt = "ZodBigInt"),
    (e.ZodBoolean = "ZodBoolean"),
    (e.ZodDate = "ZodDate"),
    (e.ZodSymbol = "ZodSymbol"),
    (e.ZodUndefined = "ZodUndefined"),
    (e.ZodNull = "ZodNull"),
    (e.ZodAny = "ZodAny"),
    (e.ZodUnknown = "ZodUnknown"),
    (e.ZodNever = "ZodNever"),
    (e.ZodVoid = "ZodVoid"),
    (e.ZodArray = "ZodArray"),
    (e.ZodObject = "ZodObject"),
    (e.ZodUnion = "ZodUnion"),
    (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (e.ZodIntersection = "ZodIntersection"),
    (e.ZodTuple = "ZodTuple"),
    (e.ZodRecord = "ZodRecord"),
    (e.ZodMap = "ZodMap"),
    (e.ZodSet = "ZodSet"),
    (e.ZodFunction = "ZodFunction"),
    (e.ZodLazy = "ZodLazy"),
    (e.ZodLiteral = "ZodLiteral"),
    (e.ZodEnum = "ZodEnum"),
    (e.ZodEffects = "ZodEffects"),
    (e.ZodNativeEnum = "ZodNativeEnum"),
    (e.ZodOptional = "ZodOptional"),
    (e.ZodNullable = "ZodNullable"),
    (e.ZodDefault = "ZodDefault"),
    (e.ZodCatch = "ZodCatch"),
    (e.ZodPromise = "ZodPromise"),
    (e.ZodBranded = "ZodBranded"),
    (e.ZodPipeline = "ZodPipeline"),
    (e.ZodReadonly = "ZodReadonly")
})(m || (m = {}))
var fs = (e, t = { message: `Input not instance of ${e.name}` }) =>
    Br((t) => t instanceof e, t),
  Fr = se.create,
  Ur = ce.create,
  ds = Ze.create,
  hs = fe.create,
  $r = de.create,
  ps = he.create,
  ms = Ie.create,
  ys = pe.create,
  gs = me.create,
  _s = ae.create,
  vs = Y.create,
  xs = D.create,
  ws = Ne.create,
  bs = J.create,
  Ss = N.create,
  ks = N.strictCreate,
  Ts = ye.create,
  Os = _t.create,
  Es = ge.create,
  As = U.create,
  Cs = vt.create,
  Rs = Le.create,
  js = Pe.create,
  Is = xt.create,
  Ns = _e.create,
  Ls = ve.create,
  Ps = xe.create,
  Zs = we.create,
  Ws = ie.create,
  Lr = Z.create,
  zs = z.create,
  Ms = $.create,
  Ds = Z.createWithPreprocess,
  Bs = Ke.create,
  Fs = () => Fr().optional(),
  Us = () => Ur().optional(),
  $s = () => $r().optional(),
  Vs = {
    string: (e) => se.create({ ...e, coerce: !0 }),
    number: (e) => ce.create({ ...e, coerce: !0 }),
    boolean: (e) => de.create({ ...e, coerce: !0 }),
    bigint: (e) => fe.create({ ...e, coerce: !0 }),
    date: (e) => he.create({ ...e, coerce: !0 }),
  },
  qs = y,
  b = Object.freeze({
    __proto__: null,
    defaultErrorMap: je,
    setErrorMap: qn,
    getErrorMap: pt,
    makeIssue: mt,
    EMPTY_PATH: Gn,
    addIssueToContext: f,
    ParseStatus: R,
    INVALID: y,
    DIRTY: Re,
    OK: j,
    isAborted: Gt,
    isDirty: Ht,
    isValid: Je,
    isAsync: yt,
    get util() {
      return w
    },
    get objectUtil() {
      return qt
    },
    ZodParsedType: d,
    getParsedType: ne,
    ZodType: _,
    datetimeRegex: Mr,
    ZodString: se,
    ZodNumber: ce,
    ZodBigInt: fe,
    ZodBoolean: de,
    ZodDate: he,
    ZodSymbol: Ie,
    ZodUndefined: pe,
    ZodNull: me,
    ZodAny: ae,
    ZodUnknown: Y,
    ZodNever: D,
    ZodVoid: Ne,
    ZodArray: J,
    ZodObject: N,
    ZodUnion: ye,
    ZodDiscriminatedUnion: _t,
    ZodIntersection: ge,
    ZodTuple: U,
    ZodRecord: vt,
    ZodMap: Le,
    ZodSet: Pe,
    ZodFunction: xt,
    ZodLazy: _e,
    ZodLiteral: ve,
    ZodEnum: xe,
    ZodNativeEnum: we,
    ZodPromise: ie,
    ZodEffects: Z,
    ZodTransformer: Z,
    ZodOptional: z,
    ZodNullable: $,
    ZodDefault: be,
    ZodCatch: Se,
    ZodNaN: Ze,
    BRAND: ls,
    ZodBranded: Qe,
    ZodPipeline: Ke,
    ZodReadonly: ke,
    custom: Br,
    Schema: _,
    ZodSchema: _,
    late: cs,
    get ZodFirstPartyTypeKind() {
      return m
    },
    coerce: Vs,
    any: _s,
    array: bs,
    bigint: hs,
    boolean: $r,
    date: ps,
    discriminatedUnion: Os,
    effect: Lr,
    enum: Ps,
    function: Is,
    instanceof: fs,
    intersection: Es,
    lazy: Ns,
    literal: Ls,
    map: Rs,
    nan: ds,
    nativeEnum: Zs,
    never: xs,
    null: gs,
    nullable: Ms,
    number: Ur,
    object: Ss,
    oboolean: $s,
    onumber: Us,
    optional: zs,
    ostring: Fs,
    pipeline: Bs,
    preprocess: Ds,
    promise: Ws,
    record: Cs,
    set: js,
    strictObject: ks,
    string: Fr,
    symbol: ms,
    transformer: Lr,
    tuple: As,
    undefined: ys,
    union: Ts,
    unknown: vs,
    void: ws,
    NEVER: qs,
    ZodIssueCode: c,
    quotelessJson: Vn,
    ZodError: P,
  }),
  Vr = b.object({ url: b.string(), address: b.string() }),
  qr = b.object({
    url: b.string(),
    address: b.string(),
    ttl: b.coerce.number(),
  }),
  Gr = b.function().args(b.string(), b.string()).returns(b.promise(b.string())),
  Hr = b.function().args(b.string()).returns(b.promise(Vr.nullish())),
  Xr = b
    .function()
    .args(b.string(), Vr, b.number())
    .returns(b.promise(b.any())),
  We = b.function().args(b.string()).returns(b.promise(qr.nullish())),
  ze = b
    .function()
    .args(b.string(), b.string(), b.number())
    .returns(b.promise(b.any())),
  Te = b.function().args(b.string()).returns(b.promise(qr)),
  Yr = Te
function Jr({
  loadProcessScheduler: e,
  loadScheduler: t,
  cache: r,
  followRedirects: n,
  checkForRedirect: i,
}) {
  ;(e = Yr.implement(e)), (t = Te.implement(t)), (i = Gr.implement(i))
  let s = Hr.implement(r.getByProcess),
    a = We.implement(r.getByOwner),
    o = Xr.implement(r.setByProcess),
    u = ze.implement(r.setByOwner)
  return (r, l) =>
    s(r).then(
      async (s) =>
        s ||
        Promise.resolve()
          .then(async () =>
            l
              ? (await a(l)) ||
                t(l).then((e) => (u(e.address, e.url, e.ttl), e))
              : e(r)
          )
          .then(async (e) => {
            let t = e.url
            n && (t = await i(e.url, r))
            let s = { url: He(t), address: e.address }
            return await o(r, s, e.ttl), s
          })
    )
}
function Qr({ loadScheduler: e, cache: t }) {
  e = Te.implement(e)
  let r = We.implement(t.getByOwner),
    n = ze.implement(t.setByOwner)
  return (t) =>
    r(t).then((r) =>
      r
        ? { url: r.url }
        : e(t)
            .then((e) => n(t, e.url, e.ttl).then(() => ({ url: He(e.url) })))
            .catch((e) => {
              if (!(e instanceof H)) throw e
            })
    )
}
function Kr({ loadScheduler: e, cache: t }) {
  e = Te.implement(e)
  let r = We.implement(t.getByOwner),
    n = ze.implement(t.setByOwner)
  return (t) =>
    r(t).then(
      (r) =>
        !!r ||
        e(t)
          .then((e) => n(t, e.url, e.ttl))
          .then(() => !0)
          .catch((e) => {
            if (e instanceof H) return !1
            throw e
          })
    )
}
var Gs = 100,
  Hs = "https://arweave.net/graphql",
  Xs = 0,
  Ys = 300,
  Js = !1
function en({
  cacheSize: e = Gs,
  followRedirects: t = Js,
  GRAPHQL_URL: r = Hs,
  GRAPHQL_MAX_RETRIES: n = Xs,
  GRAPHQL_RETRY_BACKOFF: i = Ys,
} = {}) {
  let s = Er({ size: e }),
    a = Ft({
      fetch,
      GRAPHQL_URL: r,
      GRAPHQL_MAX_RETRIES: n,
      GRAPHQL_RETRY_BACKOFF: i,
    }),
    o = {
      getByProcess: Ar({ cache: s }),
      getByOwner: Rr({ cache: s }),
      setByProcess: Cr({ cache: s }),
      setByOwner: jr({ cache: s }),
    },
    u = Jr({
      loadProcessScheduler: br({
        fetch,
        GRAPHQL_URL: r,
        GRAPHQL_MAX_RETRIES: n,
        GRAPHQL_RETRY_BACKOFF: i,
      }),
      loadScheduler: a,
      cache: o,
      followRedirects: t,
      checkForRedirect: Ir({ fetch }),
    }),
    l = Kr({ loadScheduler: a, cache: o }),
    h = Qr({ loadScheduler: a, cache: o })
  return { locate: u, validate: l, raw: h }
}
var Qs = globalThis.GRAPHQL_URL || void 0,
  Ks = globalThis.SCHEDULER_UTILS_CACHE_SIZE || void 0,
  ea = "true" === globalThis.SCHEDULER_UTILS_FOLLOW_REDIRECTS || void 0,
  ta = globalThis.GRAPHQL_MAX_RETRIES || void 0,
  ra = globalThis.GRAPHQL_RETRY_BACKOFF || void 0,
  {
    locate: el,
    validate: tl,
    raw: rl,
  } = en({
    GRAPHQL_URL: Qs,
    cacheSize: Ks,
    followRedirects: ea,
    GRAPHQL_MAX_RETRIES: ta,
    GRAPHQL_RETRY_BACKOFF: ra,
  }),
  Async = (e) => ({
    fork: e,
    toPromise: () => new Promise((t, r) => e(r, t)),
    map: (t) => Async((r, n) => e(r, (e) => n(t(e)))),
    bimap: (t, r) =>
      Async((n, i) =>
        e(
          (e) => n(t(e)),
          (e) => i(r(e))
        )
      ),
    chain: (t) => Async((r, n) => e(r, (e) => t(e).fork(r, n))),
    bichain: (t, r) =>
      Async((n, i) =>
        e(
          (e) => t(e).fork(n, i),
          (e) => r(e).fork(n, i)
        )
      ),
    fold: (t, r) =>
      Async((n, i) =>
        e(
          (e) => t(e).fork(n, i),
          (e) => r(e).fork(n, i)
        )
      ),
  }),
  of = (e) => Async((t, r) => r(e)),
  Resolved = (e) => Async((t, r) => r(e)),
  Rejected = (e) => Async((t, r) => t(e)),
  fromPromise =
    (e) =>
    (...t) =>
      Async((r, n) =>
        e(...t)
          .then(n)
          .catch(r)
      )
function deployMessageWith({ fetch: e, MU_URL: t, logger: r }) {
  let n = r.child("deployMessage")
  return (r) =>
    of(r)
      .chain(
        fromPromise(
          ({ processId: e, data: t, tags: r, anchor: n, signer: i }) =>
            i({ data: t, tags: r, target: e, anchor: n })
        )
      )
      .chain((r) =>
        of(r)
          .chain(
            fromPromise(async (r) =>
              e(t, {
                method: "POST",
                headers: {
                  "Content-Type": "application/octet-stream",
                  Accept: "application/json",
                },
                redirect: "follow",
                body: r.raw,
              })
            )
          )
          .bichain(
            (e) =>
              Rejected(
                Error(`Error while communicating with MU: ${JSON.stringify(e)}`)
              ),
            fromPromise(async (e) => {
              if (e.ok) return e.json()
              throw Error(`${e.status}: ${await e.text()}`)
            })
          )
          .bimap(
            n.tap("Error encountered when writing message via MU"),
            n.tap("Successfully wrote message via MU")
          )
          .map((e) => ({ res: e, messageId: r.id }))
      )
      .toPromise()
}
function deployProcessWith({ fetch: e, MU_URL: t, logger: r }) {
  let n = r.child("deployProcess")
  return (r) =>
    of(r)
      .chain(
        fromPromise(({ data: e, tags: t, signer: r }) =>
          r({ data: e, tags: t })
        )
      )
      .chain((r) =>
        of(r)
          .chain(
            fromPromise(async (r) =>
              e(t, {
                method: "POST",
                headers: {
                  "Content-Type": "application/octet-stream",
                  Accept: "application/json",
                },
                redirect: "follow",
                body: r.raw,
              })
            )
          )
          .bichain(
            (e) =>
              Rejected(
                Error(`Error while communicating with MU: ${JSON.stringify(e)}`)
              ),
            fromPromise(async (e) => {
              if (e.ok) return e.json()
              throw Error(`${e.status}: ${await e.text()}`)
            })
          )
          .bimap(
            n.tap("Error encountered when deploying process via MU"),
            n.tap("Successfully deployed process via MU")
          )
          .map((e) => ({ res: e, processId: r.id }))
      )
      .toPromise()
}
function deployMonitorWith({ fetch: e, MU_URL: t, logger: r }) {
  let n = r.child("deployMonitor")
  return (r) =>
    of(r)
      .chain(
        fromPromise(
          ({ processId: e, data: t, tags: r, anchor: n, signer: i }) =>
            i({ data: t, tags: r, target: e, anchor: n })
        )
      )
      .chain((i) =>
        of(i)
          .chain(
            fromPromise(async (n) =>
              e(t + "/monitor/" + r.processId, {
                method: "POST",
                headers: {
                  "Content-Type": "application/octet-stream",
                  Accept: "application/json",
                },
                redirect: "follow",
                body: n.raw,
              })
            )
          )
          .bichain(
            (e) =>
              Rejected(
                Error(`Error while communicating with MU: ${JSON.stringify(e)}`)
              ),
            fromPromise(async (e) => {
              if (e.ok) return { ok: !0 }
              throw Error(`${e.status}: ${await e.text()}`)
            })
          )
          .bimap(
            n.tap("Error encountered when subscribing to process via MU"),
            n.tap("Successfully subscribed to process via MU")
          )
          .map((e) => ({ res: e, messageId: i.id }))
      )
      .toPromise()
}
function deployUnmonitorWith({ fetch: e, MU_URL: t, logger: r }) {
  let n = r.child("deployUnmonitor")
  return (r) =>
    of(r)
      .chain(
        fromPromise(
          ({ processId: e, data: t, tags: r, anchor: n, signer: i }) =>
            i({ data: t, tags: r, target: e, anchor: n })
        )
      )
      .chain((i) =>
        of(i)
          .chain(
            fromPromise(async (n) =>
              e(t + "/monitor/" + r.processId, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/octet-stream",
                  Accept: "application/json",
                },
                redirect: "follow",
                body: n.raw,
              })
            )
          )
          .bichain(
            (e) =>
              Rejected(
                Error(`Error while communicating with MU: ${JSON.stringify(e)}`)
              ),
            fromPromise(async (e) => {
              if (e.ok) return { ok: !0 }
              throw Error(`${e.status}: ${await e.text()}`)
            })
          )
          .bimap(
            n.tap("Error encountered when unsubscribing to process via MU"),
            n.tap("Successfully unsubscribed to process via MU")
          )
          .map((e) => ({ res: e, messageId: i.id }))
      )
      .toPromise()
}
function deployAssignWith({ fetch: e, MU_URL: t, logger: r }) {
  let n = r.child("deployAssign")
  return (r) =>
    of(r)
      .chain(
        fromPromise(
          async ({ process: r, message: n, baseLayer: i, exclude: s }) =>
            e(
              `${t}?process-id=${r}&assign=${n}${i ? "&base-layer" : ""}${
                s ? "&exclude=" + s.join(",") : ""
              }`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/octet-stream",
                  Accept: "application/json",
                },
              }
            )
        )
      )
      .bichain(
        (e) =>
          Rejected(
            Error(`Error while communicating with MU: ${JSON.stringify(e)}`)
          ),
        fromPromise(async (e) => {
          if (e.ok) return e.json()
          throw Error(`${e.status}: ${await e.text()}`)
        })
      )
      .bimap(
        n.tap("Error encountered when writing assignment via MU"),
        n.tap("Successfully wrote assignment via MU")
      )
      .map((e) => ({ res: e, assignmentId: e.id }))
      .toPromise()
}
function dryrunFetchWith({ fetch: e, CU_URL: t, logger: r }) {
  return (n) =>
    of(n)
      .map(r.tap("posting dryrun request to CU"))
      .chain(
        fromPromise((r) =>
          e(`${t}/dry-run?process-id=${r.Target}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            redirect: "follow",
            body: JSON.stringify(r),
          }).then((e) => e.json())
        )
      )
      .toPromise()
}
function loadResultWith({ fetch: e, CU_URL: t, logger: r }) {
  return ({ id: n, processId: i }) =>
    of(`${t}/result/${n}?process-id=${i}`)
      .map(r.tap("fetching message result from CU"))
      .chain(
        fromPromise(async (t) =>
          e(t, {
            method: "GET",
            headers: { Accept: "application/json" },
            redirect: "follow",
          }).then((e) => e.json())
        )
      )
      .toPromise()
}
function queryResultsWith({ fetch: e, CU_URL: t, logger: r }) {
  return ({ process: n, from: i, to: s, sort: a, limit: o }) => {
    let u = new URL(`${t}/results/${n}`),
      l = new URLSearchParams(u.search)
    return (
      i && l.append("from", i),
      s && l.append("to", s),
      a && l.append("sort", a),
      o && l.append("limit", o),
      (u.search = l),
      of(u.toString())
        .map(r.tap("fetching message result from CU"))
        .chain(
          fromPromise(async (t) =>
            e(t, {
              method: "GET",
              headers: { Accept: "application/json" },
              redirect: "follow",
            }).then((e) => e.json())
          )
        )
        .toPromise()
    )
  }
}
var import_lru_map = __toESM(require_lru_map(), 1),
  createProcessMetaCache = ({ MAX_SIZE: e }) =>
    processMetaCache || (processMetaCache = new import_lru_map.default(e)),
  loadProcessMetaWith =
    ({ logger: e, fetch: t, cache: r = processMetaCache }) =>
    async ({ suUrl: n, processId: i }) =>
      r.has(i)
        ? r.get(i)
        : t(`${n}/processes/${i}`, { method: "GET", redirect: "follow" })
            .then(async (t) => {
              if (t.ok) return t.json()
              throw (
                (e(
                  "Error Encountered when fetching process meta from SU '%s' for process '%s'",
                  n,
                  i
                ),
                Error(
                  `Encountered Error fetching scheduled messages from Scheduler Unit: ${
                    t.status
                  }: ${await t.text()}`
                ))
              )
            })
            .then(
              (t) => (
                e("Caching process meta for process '%s'", i),
                r.set(i, { tags: t.tags }),
                t
              )
            ),
  F2 = function () {
    return !1
  },
  F_default = F2,
  T = function () {
    return !0
  },
  T_default = T,
  __default = { "@@functional/placeholder": !0 }
function _isPlaceholder(e) {
  return (
    null != e && "object" == typeof e && !0 === e["@@functional/placeholder"]
  )
}
function _curry1(e) {
  return function t(r) {
    return 0 === arguments.length || _isPlaceholder(r)
      ? t
      : e.apply(this, arguments)
  }
}
function _curry2(e) {
  return function t(r, n) {
    switch (arguments.length) {
      case 0:
        return t
      case 1:
        return _isPlaceholder(r)
          ? t
          : _curry1(function (t) {
              return e(r, t)
            })
      default:
        return _isPlaceholder(r) && _isPlaceholder(n)
          ? t
          : _isPlaceholder(r)
          ? _curry1(function (t) {
              return e(t, n)
            })
          : _isPlaceholder(n)
          ? _curry1(function (t) {
              return e(r, t)
            })
          : e(r, n)
    }
  }
}
function _concat(e, t) {
  t = t || []
  var r,
    n = (e = e || []).length,
    i = t.length,
    s = []
  for (r = 0; r < n; ) (s[s.length] = e[r]), (r += 1)
  for (r = 0; r < i; ) (s[s.length] = t[r]), (r += 1)
  return s
}
function _arity(e, t) {
  switch (e) {
    case 0:
      return function () {
        return t.apply(this, arguments)
      }
    case 1:
      return function (e) {
        return t.apply(this, arguments)
      }
    case 2:
      return function (e, r) {
        return t.apply(this, arguments)
      }
    case 3:
      return function (e, r, n) {
        return t.apply(this, arguments)
      }
    case 4:
      return function (e, r, n, i) {
        return t.apply(this, arguments)
      }
    case 5:
      return function (e, r, n, i, s) {
        return t.apply(this, arguments)
      }
    case 6:
      return function (e, r, n, i, s, a) {
        return t.apply(this, arguments)
      }
    case 7:
      return function (e, r, n, i, s, a, o) {
        return t.apply(this, arguments)
      }
    case 8:
      return function (e, r, n, i, s, a, o, u) {
        return t.apply(this, arguments)
      }
    case 9:
      return function (e, r, n, i, s, a, o, u, l) {
        return t.apply(this, arguments)
      }
    case 10:
      return function (e, r, n, i, s, a, o, u, l, h) {
        return t.apply(this, arguments)
      }
    default:
      throw Error(
        "First argument to _arity must be a non-negative integer no greater than ten"
      )
  }
}
function _curryN(e, t, r) {
  return function () {
    for (
      var n, i = [], s = 0, a = e, o = 0, u = !1;
      o < t.length || s < arguments.length;

    )
      o < t.length && (!_isPlaceholder(t[o]) || s >= arguments.length)
        ? (n = t[o])
        : ((n = arguments[s]), (s += 1)),
        (i[o] = n),
        _isPlaceholder(n) ? (u = !0) : (a -= 1),
        (o += 1)
    return !u && a <= 0
      ? r.apply(this, i)
      : _arity(Math.max(0, a), _curryN(e, i, r))
  }
}
var curryN = _curry2(function e(t, r) {
    return 1 === t ? _curry1(r) : _arity(t, _curryN(t, [], r))
  }),
  curryN_default = curryN
function _curry3(e) {
  return function t(r, n, i) {
    switch (arguments.length) {
      case 0:
        return t
      case 1:
        return _isPlaceholder(r)
          ? t
          : _curry2(function (t, n) {
              return e(r, t, n)
            })
      case 2:
        return _isPlaceholder(r) && _isPlaceholder(n)
          ? t
          : _isPlaceholder(r)
          ? _curry2(function (t, r) {
              return e(t, n, r)
            })
          : _isPlaceholder(n)
          ? _curry2(function (t, n) {
              return e(r, t, n)
            })
          : _curry1(function (t) {
              return e(r, n, t)
            })
      default:
        return _isPlaceholder(r) && _isPlaceholder(n) && _isPlaceholder(i)
          ? t
          : _isPlaceholder(r) && _isPlaceholder(n)
          ? _curry2(function (t, r) {
              return e(t, r, i)
            })
          : _isPlaceholder(r) && _isPlaceholder(i)
          ? _curry2(function (t, r) {
              return e(t, n, r)
            })
          : _isPlaceholder(n) && _isPlaceholder(i)
          ? _curry2(function (t, n) {
              return e(r, t, n)
            })
          : _isPlaceholder(r)
          ? _curry1(function (t) {
              return e(t, n, i)
            })
          : _isPlaceholder(n)
          ? _curry1(function (t) {
              return e(r, t, i)
            })
          : _isPlaceholder(i)
          ? _curry1(function (t) {
              return e(r, n, t)
            })
          : e(r, n, i)
    }
  }
}
var isArray_default =
  Array.isArray ||
  function e(t) {
    return (
      null != t &&
      t.length >= 0 &&
      "[object Array]" === Object.prototype.toString.call(t)
    )
  }
function _isTransformer(e) {
  return null != e && "function" == typeof e["@@transducer/step"]
}
function _dispatchable(e, t, r) {
  return function () {
    if (0 === arguments.length) return r()
    var n = arguments[arguments.length - 1]
    if (!isArray_default(n)) {
      for (var i = 0; i < e.length; ) {
        if ("function" == typeof n[e[i]])
          return n[e[i]].apply(n, Array.prototype.slice.call(arguments, 0, -1))
        i += 1
      }
      if (_isTransformer(n)) {
        var s = t.apply(null, Array.prototype.slice.call(arguments, 0, -1))
        return s(n)
      }
    }
    return r.apply(this, arguments)
  }
}
var xfBase_default = {
  init: function () {
    return this.xf["@@transducer/init"]()
  },
  result: function (e) {
    return this.xf["@@transducer/result"](e)
  },
}
function _arrayFromIterator(e) {
  for (var t, r = []; !(t = e.next()).done; ) r.push(t.value)
  return r
}
function _includesWith(e, t, r) {
  for (var n = 0, i = r.length; n < i; ) {
    if (e(t, r[n])) return !0
    n += 1
  }
  return !1
}
function _functionName(e) {
  var t = String(e).match(/^function (\w*)/)
  return null == t ? "" : t[1]
}
function _has(e, t) {
  return Object.prototype.hasOwnProperty.call(t, e)
}
function _objectIs(e, t) {
  return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
}
var objectIs_default = "function" == typeof Object.is ? Object.is : _objectIs,
  toString = Object.prototype.toString,
  _isArguments = (function () {
    return "[object Arguments]" === toString.call(arguments)
      ? function e(t) {
          return "[object Arguments]" === toString.call(t)
        }
      : function e(t) {
          return _has("callee", t)
        }
  })(),
  isArguments_default = _isArguments,
  hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
  nonEnumerableProps = [
    "constructor",
    "valueOf",
    "isPrototypeOf",
    "toString",
    "propertyIsEnumerable",
    "hasOwnProperty",
    "toLocaleString",
  ],
  hasArgsEnumBug = (function () {
    return arguments.propertyIsEnumerable("length")
  })(),
  contains = function e(t, r) {
    for (var n = 0; n < t.length; ) {
      if (t[n] === r) return !0
      n += 1
    }
    return !1
  },
  keys =
    "function" != typeof Object.keys || hasArgsEnumBug
      ? _curry1(function e(t) {
          if (Object(t) !== t) return []
          var r,
            n,
            i = [],
            s = hasArgsEnumBug && isArguments_default(t)
          for (r in t) _has(r, t) && (!s || "length" !== r) && (i[i.length] = r)
          if (hasEnumBug)
            for (n = nonEnumerableProps.length - 1; n >= 0; )
              _has((r = nonEnumerableProps[n]), t) &&
                !contains(i, r) &&
                (i[i.length] = r),
                (n -= 1)
          return i
        })
      : _curry1(function e(t) {
          return Object(t) !== t ? [] : Object.keys(t)
        }),
  keys_default = keys,
  type = _curry1(function e(t) {
    return null === t
      ? "Null"
      : void 0 === t
      ? "Undefined"
      : Object.prototype.toString.call(t).slice(8, -1)
  }),
  type_default = type
function _uniqContentEquals(e, t, r, n) {
  var i = _arrayFromIterator(e),
    s = _arrayFromIterator(t)
  function a(e, t) {
    return _equals(e, t, r.slice(), n.slice())
  }
  return !_includesWith(
    function (e, t) {
      return !_includesWith(a, t, e)
    },
    s,
    i
  )
}
function _equals(e, t, r, n) {
  if (objectIs_default(e, t)) return !0
  var i = type_default(e)
  if (i !== type_default(t)) return !1
  if (
    "function" == typeof e["fantasy-land/equals"] ||
    "function" == typeof t["fantasy-land/equals"]
  )
    return (
      "function" == typeof e["fantasy-land/equals"] &&
      e["fantasy-land/equals"](t) &&
      "function" == typeof t["fantasy-land/equals"] &&
      t["fantasy-land/equals"](e)
    )
  if ("function" == typeof e.equals || "function" == typeof t.equals)
    return (
      "function" == typeof e.equals &&
      e.equals(t) &&
      "function" == typeof t.equals &&
      t.equals(e)
    )
  switch (i) {
    case "Arguments":
    case "Array":
    case "Object":
      if (
        "function" == typeof e.constructor &&
        "Promise" === _functionName(e.constructor)
      )
        return e === t
      break
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof e == typeof t && objectIs_default(e.valueOf(), t.valueOf())))
        return !1
      break
    case "Date":
      if (!objectIs_default(e.valueOf(), t.valueOf())) return !1
      break
    case "Error":
      return e.name === t.name && e.message === t.message
    case "RegExp":
      if (
        !(
          e.source === t.source &&
          e.global === t.global &&
          e.ignoreCase === t.ignoreCase &&
          e.multiline === t.multiline &&
          e.sticky === t.sticky &&
          e.unicode === t.unicode
        )
      )
        return !1
  }
  for (var s = r.length - 1; s >= 0; ) {
    if (r[s] === e) return n[s] === t
    s -= 1
  }
  switch (i) {
    case "Map":
      if (e.size !== t.size) return !1
      return _uniqContentEquals(
        e.entries(),
        t.entries(),
        r.concat([e]),
        n.concat([t])
      )
    case "Set":
      if (e.size !== t.size) return !1
      return _uniqContentEquals(
        e.values(),
        t.values(),
        r.concat([e]),
        n.concat([t])
      )
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break
    default:
      return !1
  }
  var a = keys_default(e)
  if (a.length !== keys_default(t).length) return !1
  var o = r.concat([e]),
    u = n.concat([t])
  for (s = a.length - 1; s >= 0; ) {
    var l = a[s]
    if (!(_has(l, t) && _equals(t[l], e[l], o, u))) return !1
    s -= 1
  }
  return !0
}
var equals = _curry2(function e(t, r) {
    return _equals(t, r, [], [])
  }),
  equals_default = equals
function _indexOf(e, t, r) {
  var n, i
  if ("function" == typeof e.indexOf)
    switch (typeof t) {
      case "number":
        if (0 === t) {
          for (n = 1 / t; r < e.length; ) {
            if (0 === (i = e[r]) && 1 / i === n) return r
            r += 1
          }
          return -1
        }
        if (t != t) {
          for (; r < e.length; ) {
            if ("number" == typeof (i = e[r]) && i != i) return r
            r += 1
          }
          return -1
        }
        return e.indexOf(t, r)
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return e.indexOf(t, r)
      case "object":
        if (null === t) return e.indexOf(t, r)
    }
  for (; r < e.length; ) {
    if (equals_default(e[r], t)) return r
    r += 1
  }
  return -1
}
function _includes(e, t) {
  return _indexOf(t, e, 0) >= 0
}
function _map(e, t) {
  for (var r = 0, n = t.length, i = Array(n); r < n; )
    (i[r] = e(t[r])), (r += 1)
  return i
}
function _quote(e) {
  return (
    '"' +
    e
      .replace(/\\/g, "\\\\")
      .replace(/[\b]/g, "\\b")
      .replace(/\f/g, "\\f")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\v/g, "\\v")
      .replace(/\0/g, "\\0")
      .replace(/"/g, '\\"') +
    '"'
  )
}
var pad = function e(t) {
    return (t < 10 ? "0" : "") + t
  },
  _toISOString =
    "function" == typeof Date.prototype.toISOString
      ? function e(t) {
          return t.toISOString()
        }
      : function e(t) {
          return (
            t.getUTCFullYear() +
            "-" +
            pad(t.getUTCMonth() + 1) +
            "-" +
            pad(t.getUTCDate()) +
            "T" +
            pad(t.getUTCHours()) +
            ":" +
            pad(t.getUTCMinutes()) +
            ":" +
            pad(t.getUTCSeconds()) +
            "." +
            (t.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) +
            "Z"
          )
        },
  toISOString_default = _toISOString
function _complement(e) {
  return function () {
    return !e.apply(this, arguments)
  }
}
function _arrayReduce(e, t, r) {
  for (var n = 0, i = r.length; n < i; ) (t = e(t, r[n])), (n += 1)
  return t
}
function _filter(e, t) {
  for (var r = 0, n = t.length, i = []; r < n; )
    e(t[r]) && (i[i.length] = t[r]), (r += 1)
  return i
}
function _isObject(e) {
  return "[object Object]" === Object.prototype.toString.call(e)
}
var XFilter = (function () {
  function e(e, t) {
    ;(this.xf = t), (this.f = e)
  }
  return (
    (e.prototype["@@transducer/init"] = xfBase_default.init),
    (e.prototype["@@transducer/result"] = xfBase_default.result),
    (e.prototype["@@transducer/step"] = function (e, t) {
      return this.f(t) ? this.xf["@@transducer/step"](e, t) : e
    }),
    e
  )
})()
function _xfilter(e) {
  return function (t) {
    return new XFilter(e, t)
  }
}
var filter = _curry2(
    _dispatchable(["fantasy-land/filter", "filter"], _xfilter, function (e, t) {
      return _isObject(t)
        ? _arrayReduce(
            function (r, n) {
              return e(t[n]) && (r[n] = t[n]), r
            },
            {},
            keys_default(t)
          )
        : _filter(e, t)
    })
  ),
  filter_default = filter,
  reject = _curry2(function e(t, r) {
    return filter_default(_complement(t), r)
  }),
  reject_default = reject
function _toString(e, t) {
  var r = function r(n) {
      var i = t.concat([e])
      return _includes(n, i) ? "<Circular>" : _toString(n, i)
    },
    n = function (e, t) {
      return _map(function (t) {
        return _quote(t) + ": " + r(e[t])
      }, t.slice().sort())
    }
  switch (Object.prototype.toString.call(e)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + _map(r, e).join(", ") + "))"
    case "[object Array]":
      return (
        "[" +
        _map(r, e)
          .concat(
            n(
              e,
              reject_default(function (e) {
                return /^\d+$/.test(e)
              }, keys_default(e))
            )
          )
          .join(", ") +
        "]"
      )
    case "[object Boolean]":
      return "object" == typeof e
        ? "new Boolean(" + r(e.valueOf()) + ")"
        : e.toString()
    case "[object Date]":
      return (
        "new Date(" +
        (isNaN(e.valueOf()) ? r(NaN) : _quote(toISOString_default(e))) +
        ")"
      )
    case "[object Map]":
      return "new Map(" + r(Array.from(e)) + ")"
    case "[object Null]":
      return "null"
    case "[object Number]":
      return "object" == typeof e
        ? "new Number(" + r(e.valueOf()) + ")"
        : 1 / e == -1 / 0
        ? "-0"
        : e.toString(10)
    case "[object Set]":
      return "new Set(" + r(Array.from(e).sort()) + ")"
    case "[object String]":
      return "object" == typeof e
        ? "new String(" + r(e.valueOf()) + ")"
        : _quote(e)
    case "[object Undefined]":
      return "undefined"
    default:
      if ("function" == typeof e.toString) {
        var i = e.toString()
        if ("[object Object]" !== i) return i
      }
      return "{" + n(e, keys_default(e)).join(", ") + "}"
  }
}
var toString2 = _curry1(function e(t) {
    return _toString(t, [])
  }),
  toString_default = toString2,
  max = _curry2(function e(t, r) {
    if (t === r) return r
    function n(e, t) {
      if (e > t != t > e) return t > e ? t : e
    }
    var i = n(t, r)
    if (void 0 !== i) return i
    var s = n(typeof t, typeof r)
    if (void 0 !== s) return s === typeof t ? t : r
    var a = toString_default(t),
      o = n(a, toString_default(r))
    return void 0 !== o && o === a ? t : r
  }),
  max_default = max,
  XMap = (function () {
    function e(e, t) {
      ;(this.xf = t), (this.f = e)
    }
    return (
      (e.prototype["@@transducer/init"] = xfBase_default.init),
      (e.prototype["@@transducer/result"] = xfBase_default.result),
      (e.prototype["@@transducer/step"] = function (e, t) {
        return this.xf["@@transducer/step"](e, this.f(t))
      }),
      e
    )
  })(),
  _xmap = function e(t) {
    return function (e) {
      return new XMap(t, e)
    }
  },
  xmap_default = _xmap,
  map = _curry2(
    _dispatchable(["fantasy-land/map", "map"], xmap_default, function e(t, r) {
      switch (Object.prototype.toString.call(r)) {
        case "[object Function]":
          return curryN_default(r.length, function () {
            return t.call(this, r.apply(this, arguments))
          })
        case "[object Object]":
          return _arrayReduce(
            function (e, n) {
              return (e[n] = t(r[n])), e
            },
            {},
            keys_default(r)
          )
        default:
          return _map(t, r)
      }
    })
  ),
  map_default = map,
  isInteger_default =
    Number.isInteger ||
    function e(t) {
      return t << 0 === t
    }
function _isString(e) {
  return "[object String]" === Object.prototype.toString.call(e)
}
function _nth(e, t) {
  var r = e < 0 ? t.length + e : e
  return _isString(t) ? t.charAt(r) : t[r]
}
var prop = _curry2(function e(t, r) {
    if (null != r) return isInteger_default(t) ? _nth(t, r) : r[t]
  }),
  prop_default = prop,
  _isArrayLike = _curry1(function e(t) {
    return (
      !!isArray_default(t) ||
      (!(!t || "object" != typeof t || _isString(t)) &&
        (0 === t.length ||
          (t.length > 0 &&
            t.hasOwnProperty(0) &&
            t.hasOwnProperty(t.length - 1))))
    )
  }),
  isArrayLike_default = _isArrayLike,
  symIterator = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator"
function _createReduce(e, t, r) {
  return function n(i, s, a) {
    if (isArrayLike_default(a)) return e(i, s, a)
    if (null == a) return s
    if ("function" == typeof a["fantasy-land/reduce"])
      return t(i, s, a, "fantasy-land/reduce")
    if (null != a[symIterator]) return r(i, s, a[symIterator]())
    if ("function" == typeof a.next) return r(i, s, a)
    if ("function" == typeof a.reduce) return t(i, s, a, "reduce")
    throw TypeError("reduce: list must be array or iterable")
  }
}
function _xArrayReduce(e, t, r) {
  for (var n = 0, i = r.length; n < i; ) {
    if ((t = e["@@transducer/step"](t, r[n])) && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"]
      break
    }
    n += 1
  }
  return e["@@transducer/result"](t)
}
var bind = _curry2(function e(t, r) {
    return _arity(t.length, function () {
      return t.apply(r, arguments)
    })
  }),
  bind_default = bind
function _xIterableReduce(e, t, r) {
  for (var n = r.next(); !n.done; ) {
    if ((t = e["@@transducer/step"](t, n.value)) && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"]
      break
    }
    n = r.next()
  }
  return e["@@transducer/result"](t)
}
function _xMethodReduce(e, t, r, n) {
  return e["@@transducer/result"](
    r[n](bind_default(e["@@transducer/step"], e), t)
  )
}
var _xReduce = _createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce),
  xReduce_default = _xReduce,
  XWrap = (function () {
    function e(e) {
      this.f = e
    }
    return (
      (e.prototype["@@transducer/init"] = function () {
        throw Error("init not implemented on XWrap")
      }),
      (e.prototype["@@transducer/result"] = function (e) {
        return e
      }),
      (e.prototype["@@transducer/step"] = function (e, t) {
        return this.f(e, t)
      }),
      e
    )
  })()
function _xwrap(e) {
  return new XWrap(e)
}
var reduce = _curry3(function (e, t, r) {
    return xReduce_default("function" == typeof e ? _xwrap(e) : e, t, r)
  }),
  reduce_default = reduce,
  always = _curry1(function e(t) {
    return function () {
      return t
    }
  }),
  always_default = always,
  append = _curry2(function e(t, r) {
    return _concat(r, [t])
  }),
  append_default = append,
  curry = _curry1(function e(t) {
    return curryN_default(t.length, t)
  }),
  curry_default = curry
function _assoc(e, t, r) {
  if (isInteger_default(e) && isArray_default(r)) {
    var n = [].concat(r)
    return (n[e] = t), n
  }
  var i = {}
  for (var s in r) i[s] = r[s]
  return (i[e] = t), i
}
var isNil = _curry1(function e(t) {
    return null == t
  }),
  isNil_default = isNil,
  assocPath = _curry3(function e(t, r, n) {
    if (0 === t.length) return r
    var i = t[0]
    if (t.length > 1) {
      var s =
        !isNil_default(n) && _has(i, n) && "object" == typeof n[i]
          ? n[i]
          : isInteger_default(t[1])
          ? []
          : {}
      r = e(Array.prototype.slice.call(t, 1), r, s)
    }
    return _assoc(i, r, n)
  }),
  assocPath_default = assocPath,
  assoc = _curry3(function e(t, r, n) {
    return assocPath_default([t], r, n)
  }),
  assoc_default = assoc
function _isFunction(e) {
  var t = Object.prototype.toString.call(e)
  return (
    "[object Function]" === t ||
    "[object AsyncFunction]" === t ||
    "[object GeneratorFunction]" === t ||
    "[object AsyncGeneratorFunction]" === t
  )
}
function _makeFlat(e) {
  return function t(r) {
    for (var n, i, s, a = [], o = 0, u = r.length; o < u; ) {
      if (isArrayLike_default(r[o]))
        for (n = e ? t(r[o]) : r[o], s = 0, i = n.length; s < i; )
          (a[a.length] = n[s]), (s += 1)
      else a[a.length] = r[o]
      o += 1
    }
    return a
  }
}
function _forceReduced(e) {
  return { "@@transducer/value": e, "@@transducer/reduced": !0 }
}
var tInit = "@@transducer/init",
  tStep = "@@transducer/step",
  tResult = "@@transducer/result",
  XPreservingReduced = (function () {
    function e(e) {
      this.xf = e
    }
    return (
      (e.prototype[tInit] = xfBase_default.init),
      (e.prototype[tResult] = xfBase_default.result),
      (e.prototype[tStep] = function (e, t) {
        var r = this.xf[tStep](e, t)
        return r["@@transducer/reduced"] ? _forceReduced(r) : r
      }),
      e
    )
  })(),
  XFlatCat = (function () {
    function e(e) {
      this.xf = new XPreservingReduced(e)
    }
    return (
      (e.prototype[tInit] = xfBase_default.init),
      (e.prototype[tResult] = xfBase_default.result),
      (e.prototype[tStep] = function (e, t) {
        return isArrayLike_default(t)
          ? xReduce_default(this.xf, e, t)
          : _xArrayReduce(this.xf, e, [t])
      }),
      e
    )
  })(),
  _flatCat = function e(t) {
    return new XFlatCat(t)
  },
  flatCat_default = _flatCat
function _xchain(e) {
  return function (t) {
    return xmap_default(e)(flatCat_default(t))
  }
}
var chain = _curry2(
    _dispatchable(["fantasy-land/chain", "chain"], _xchain, function e(t, r) {
      return "function" == typeof r
        ? function (e) {
            return t(r(e))(e)
          }
        : _makeFlat(!1)(map_default(t, r))
    })
  ),
  chain_default = chain
function _pipe(e, t) {
  return function () {
    return t.call(this, e.apply(this, arguments))
  }
}
function _checkForMethod(e, t) {
  return function () {
    var r = arguments.length
    if (0 === r) return t()
    var n = arguments[r - 1]
    return isArray_default(n) || "function" != typeof n[e]
      ? t.apply(this, arguments)
      : n[e].apply(n, Array.prototype.slice.call(arguments, 0, r - 1))
  }
}
var slice = _curry3(
    _checkForMethod("slice", function e(t, r, n) {
      return Array.prototype.slice.call(n, t, r)
    })
  ),
  slice_default = slice,
  tail = _curry1(_checkForMethod("tail", slice_default(1, 1 / 0))),
  tail_default = tail
function pipe() {
  if (0 === arguments.length) throw Error("pipe requires at least one argument")
  return _arity(
    arguments[0].length,
    reduce_default(_pipe, arguments[0], tail_default(arguments))
  )
}
function _identity(e) {
  return e
}
var identity = _curry1(_identity),
  identity_default = identity,
  concat = _curry2(function e(t, r) {
    if (isArray_default(t)) {
      if (isArray_default(r)) return t.concat(r)
      throw TypeError(toString_default(r) + " is not an array")
    }
    if (_isString(t)) {
      if (_isString(r)) return t + r
      throw TypeError(toString_default(r) + " is not a string")
    }
    if (null != t && _isFunction(t["fantasy-land/concat"]))
      return t["fantasy-land/concat"](r)
    if (null != t && _isFunction(t.concat)) return t.concat(r)
    throw TypeError(
      toString_default(t) +
        ' does not have a method named "concat" or "fantasy-land/concat"'
    )
  }),
  concat_default = concat,
  cond = _curry1(function e(t) {
    var r = reduce_default(
      max_default,
      0,
      map_default(function (e) {
        return e[0].length
      }, t)
    )
    return _arity(r, function () {
      for (var e = 0; e < t.length; ) {
        if (t[e][0].apply(this, arguments))
          return t[e][1].apply(this, arguments)
        e += 1
      }
    })
  }),
  cond_default = cond,
  defaultTo = _curry2(function e(t, r) {
    return null == r || r != r ? t : r
  }),
  defaultTo_default = defaultTo,
  hasPath = _curry2(function e(t, r) {
    if (0 === t.length || isNil_default(r)) return !1
    for (var n = r, i = 0; i < t.length; ) {
      if (!(!isNil_default(n) && _has(t[i], n))) return !1
      ;(n = n[t[i]]), (i += 1)
    }
    return !0
  }),
  hasPath_default = hasPath,
  has = _curry2(function e(t, r) {
    return hasPath_default([t], r)
  }),
  has_default = has,
  ifElse = _curry3(function e(t, r, n) {
    return curryN_default(Math.max(t.length, r.length, n.length), function e() {
      return t.apply(this, arguments)
        ? r.apply(this, arguments)
        : n.apply(this, arguments)
    })
  }),
  ifElse_default = ifElse,
  includes = _curry2(_includes),
  includes_default = includes,
  invoker = _curry2(function e(t, r) {
    return curryN_default(t + 1, function () {
      var e = arguments[t]
      if (null != e && _isFunction(e[r]))
        return e[r].apply(e, Array.prototype.slice.call(arguments, 0, t))
      throw TypeError(
        toString_default(e) + ' does not have a method named "' + r + '"'
      )
    })
  }),
  invoker_default = invoker,
  is2 = _curry2(function e(t, r) {
    return (
      r instanceof t ||
      (null != r &&
        (r.constructor === t || ("Object" === t.name && "object" == typeof r)))
    )
  }),
  is_default = is2,
  isNotNil = _curry1(function e(t) {
    return !isNil_default(t)
  }),
  isNotNil_default = isNotNil,
  join = invoker_default(1, "join"),
  join_default = join
function _path(e, t) {
  for (var r = t, n = 0; n < e.length; n += 1) {
    if (null == r) return
    var i = e[n]
    r = isInteger_default(i) ? _nth(i, r) : r[i]
  }
  return r
}
var path = _curry2(_path),
  path_default = path,
  propOr = _curry3(function e(t, r, n) {
    return defaultTo_default(t, prop_default(r, n))
  }),
  propOr_default = propOr,
  XTap = (function () {
    function e(e, t) {
      ;(this.xf = t), (this.f = e)
    }
    return (
      (e.prototype["@@transducer/init"] = xfBase_default.init),
      (e.prototype["@@transducer/result"] = xfBase_default.result),
      (e.prototype["@@transducer/step"] = function (e, t) {
        return this.f(t), this.xf["@@transducer/step"](e, t)
      }),
      e
    )
  })()
function _xtap(e) {
  return function (t) {
    return new XTap(e, t)
  }
}
var tap = _curry2(
    _dispatchable([], _xtap, function e(t, r) {
      return t(r), r
    })
  ),
  tap_default = tap
!(function (e) {
  ;(e.assertEqual = (e) => e),
    (e.assertIs = function e(t) {}),
    (e.assertNever = function e(t) {
      throw Error()
    }),
    (e.arrayToEnum = (e) => {
      let t = {}
      for (let r of e) t[r] = r
      return t
    }),
    (e.getValidEnumValues = (t) => {
      let r = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
        n = {}
      for (let i of r) n[i] = t[i]
      return e.objectValues(n)
    }),
    (e.objectValues = (t) =>
      e.objectKeys(t).map(function (e) {
        return t[e]
      })),
    (e.objectKeys =
      "function" == typeof Object.keys
        ? (e) => Object.keys(e)
        : (e) => {
            let t = []
            for (let r in e)
              Object.prototype.hasOwnProperty.call(e, r) && t.push(r)
            return t
          }),
    (e.find = (e, t) => {
      for (let r of e) if (t(r)) return r
    }),
    (e.isInteger =
      "function" == typeof Number.isInteger
        ? (e) => Number.isInteger(e)
        : (e) => "number" == typeof e && isFinite(e) && Math.floor(e) === e),
    (e.joinValues = function e(t, r = " | ") {
      return t.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(r)
    }),
    (e.jsonStringifyReplacer = (e, t) =>
      "bigint" == typeof t ? t.toString() : t)
})(util || (util = {})),
  ((objectUtil2 = objectUtil || (objectUtil = {})).mergeShapes = (e, t) => ({
    ...e,
    ...t,
  }))
var ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  getParsedType = (e) => {
    let t = typeof e
    switch (t) {
      case "undefined":
        return ZodParsedType.undefined
      case "string":
        return ZodParsedType.string
      case "number":
        return isNaN(e) ? ZodParsedType.nan : ZodParsedType.number
      case "boolean":
        return ZodParsedType.boolean
      case "function":
        return ZodParsedType.function
      case "bigint":
        return ZodParsedType.bigint
      case "symbol":
        return ZodParsedType.symbol
      case "object":
        if (Array.isArray(e)) return ZodParsedType.array
        if (null === e) return ZodParsedType.null
        if (
          e.then &&
          "function" == typeof e.then &&
          e.catch &&
          "function" == typeof e.catch
        )
          return ZodParsedType.promise
        if ("undefined" != typeof Map && e instanceof Map)
          return ZodParsedType.map
        if ("undefined" != typeof Set && e instanceof Set)
          return ZodParsedType.set
        if ("undefined" != typeof Date && e instanceof Date)
          return ZodParsedType.date
        return ZodParsedType.object
      default:
        return ZodParsedType.unknown
    }
  },
  ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  quotelessJson = (e) => {
    let t = JSON.stringify(e, null, 2)
    return t.replace(/"([^"]+)":/g, "$1:")
  },
  ZodError = class e extends Error {
    constructor(e) {
      super(),
        (this.issues = []),
        (this.addIssue = (e) => {
          this.issues = [...this.issues, e]
        }),
        (this.addIssues = (e = []) => {
          this.issues = [...this.issues, ...e]
        })
      let t = new.target.prototype
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : (this.__proto__ = t),
        (this.name = "ZodError"),
        (this.issues = e)
    }
    get errors() {
      return this.issues
    }
    format(e) {
      let t =
          e ||
          function (e) {
            return e.message
          },
        r = { _errors: [] },
        n = (e) => {
          for (let i of e.issues)
            if ("invalid_union" === i.code) i.unionErrors.map(n)
            else if ("invalid_return_type" === i.code) n(i.returnTypeError)
            else if ("invalid_arguments" === i.code) n(i.argumentsError)
            else if (0 === i.path.length) r._errors.push(t(i))
            else {
              let s = r,
                a = 0
              for (; a < i.path.length; ) {
                let o = i.path[a],
                  u = a === i.path.length - 1
                u
                  ? ((s[o] = s[o] || { _errors: [] }), s[o]._errors.push(t(i)))
                  : (s[o] = s[o] || { _errors: [] }),
                  (s = s[o]),
                  a++
              }
            }
        }
      return n(this), r
    }
    static assert(t) {
      if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`)
    }
    toString() {
      return this.message
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2)
    }
    get isEmpty() {
      return 0 === this.issues.length
    }
    flatten(e = (e) => e.message) {
      let t = {},
        r = []
      for (let n of this.issues)
        n.path.length > 0
          ? ((t[n.path[0]] = t[n.path[0]] || []), t[n.path[0]].push(e(n)))
          : r.push(e(n))
      return { formErrors: r, fieldErrors: t }
    }
    get formErrors() {
      return this.flatten()
    }
  }
ZodError.create = (e) => {
  let t = new ZodError(e)
  return t
}
var errorMap = (e, t) => {
    let r
    switch (e.code) {
      case ZodIssueCode.invalid_type:
        r =
          e.received === ZodParsedType.undefined
            ? "Required"
            : `Expected ${e.expected}, received ${e.received}`
        break
      case ZodIssueCode.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(
          e.expected,
          util.jsonStringifyReplacer
        )}`
        break
      case ZodIssueCode.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${util.joinValues(e.keys, ", ")}`
        break
      case ZodIssueCode.invalid_union:
        r = "Invalid input"
        break
      case ZodIssueCode.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${util.joinValues(
          e.options
        )}`
        break
      case ZodIssueCode.invalid_enum_value:
        r = `Invalid enum value. Expected ${util.joinValues(
          e.options
        )}, received '${e.received}'`
        break
      case ZodIssueCode.invalid_arguments:
        r = "Invalid function arguments"
        break
      case ZodIssueCode.invalid_return_type:
        r = "Invalid function return type"
        break
      case ZodIssueCode.invalid_date:
        r = "Invalid date"
        break
      case ZodIssueCode.invalid_string:
        "object" == typeof e.validation
          ? "includes" in e.validation
            ? ((r = `Invalid input: must include "${e.validation.includes}"`),
              "number" == typeof e.validation.position &&
                (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
            : "startsWith" in e.validation
            ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
            : "endsWith" in e.validation
            ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
            : util.assertNever(e.validation)
          : (r =
              "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid")
        break
      case ZodIssueCode.too_small:
        r =
          "array" === e.type
            ? `Array must contain ${
                e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
              } ${e.minimum} element(s)`
            : "string" === e.type
            ? `String must contain ${
                e.exact ? "exactly" : e.inclusive ? "at least" : "over"
              } ${e.minimum} character(s)`
            : "number" === e.type
            ? `Number must be ${
                e.exact
                  ? "exactly equal to "
                  : e.inclusive
                  ? "greater than or equal to "
                  : "greater than "
              }${e.minimum}`
            : "date" === e.type
            ? `Date must be ${
                e.exact
                  ? "exactly equal to "
                  : e.inclusive
                  ? "greater than or equal to "
                  : "greater than "
              }${new Date(Number(e.minimum))}`
            : "Invalid input"
        break
      case ZodIssueCode.too_big:
        r =
          "array" === e.type
            ? `Array must contain ${
                e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
              } ${e.maximum} element(s)`
            : "string" === e.type
            ? `String must contain ${
                e.exact ? "exactly" : e.inclusive ? "at most" : "under"
              } ${e.maximum} character(s)`
            : "number" === e.type
            ? `Number must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "less than or equal to"
                  : "less than"
              } ${e.maximum}`
            : "bigint" === e.type
            ? `BigInt must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "less than or equal to"
                  : "less than"
              } ${e.maximum}`
            : "date" === e.type
            ? `Date must be ${
                e.exact
                  ? "exactly"
                  : e.inclusive
                  ? "smaller than or equal to"
                  : "smaller than"
              } ${new Date(Number(e.maximum))}`
            : "Invalid input"
        break
      case ZodIssueCode.custom:
        r = "Invalid input"
        break
      case ZodIssueCode.invalid_intersection_types:
        r = "Intersection results could not be merged"
        break
      case ZodIssueCode.not_multiple_of:
        r = `Number must be a multiple of ${e.multipleOf}`
        break
      case ZodIssueCode.not_finite:
        r = "Number must be finite"
        break
      default:
        ;(r = t.defaultError), util.assertNever(e)
    }
    return { message: r }
  },
  overrideErrorMap = errorMap
function setErrorMap(e) {
  overrideErrorMap = e
}
function getErrorMap() {
  return overrideErrorMap
}
var makeIssue = (e) => {
    let { data: t, path: r, errorMaps: n, issueData: i } = e,
      s = [...r, ...(i.path || [])],
      a = { ...i, path: s }
    if (void 0 !== i.message) return { ...i, path: s, message: i.message }
    let o = "",
      u = n
        .filter((e) => !!e)
        .slice()
        .reverse()
    for (let l of u) o = l(a, { data: t, defaultError: o }).message
    return { ...i, path: s, message: o }
  },
  EMPTY_PATH = []
function addIssueToContext(e, t) {
  let r = getErrorMap(),
    n = makeIssue({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [
        e.common.contextualErrorMap,
        e.schemaErrorMap,
        r,
        r === errorMap ? void 0 : errorMap,
      ].filter((e) => !!e),
    })
  e.common.issues.push(n)
}
var ParseStatus = class e {
    constructor() {
      this.value = "valid"
    }
    dirty() {
      "valid" === this.value && (this.value = "dirty")
    }
    abort() {
      "aborted" !== this.value && (this.value = "aborted")
    }
    static mergeArray(e, t) {
      let r = []
      for (let n of t) {
        if ("aborted" === n.status) return INVALID
        "dirty" === n.status && e.dirty(), r.push(n.value)
      }
      return { status: e.value, value: r }
    }
    static async mergeObjectAsync(t, r) {
      let n = []
      for (let i of r) {
        let s = await i.key,
          a = await i.value
        n.push({ key: s, value: a })
      }
      return e.mergeObjectSync(t, n)
    }
    static mergeObjectSync(e, t) {
      let r = {}
      for (let n of t) {
        let { key: i, value: s } = n
        if ("aborted" === i.status || "aborted" === s.status) return INVALID
        "dirty" === i.status && e.dirty(),
          "dirty" === s.status && e.dirty(),
          "__proto__" !== i.value &&
            (void 0 !== s.value || n.alwaysSet) &&
            (r[i.value] = s.value)
      }
      return { status: e.value, value: r }
    }
  },
  INVALID = Object.freeze({ status: "aborted" }),
  DIRTY = (e) => ({ status: "dirty", value: e }),
  OK = (e) => ({ status: "valid", value: e }),
  isAborted = (e) => "aborted" === e.status,
  isDirty = (e) => "dirty" === e.status,
  isValid = (e) => "valid" === e.status,
  isAsync = (e) => "undefined" != typeof Promise && e instanceof Promise
function __classPrivateFieldGet(e, t, r, n) {
  if ("a" === r && !n)
    throw TypeError("Private accessor was defined without a getter")
  if ("function" == typeof t ? e !== t || !n : !t.has(e))
    throw TypeError(
      "Cannot read private member from an object whose class did not declare it"
    )
  return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e)
}
function __classPrivateFieldSet(e, t, r, n, i) {
  if ("m" === n) throw TypeError("Private method is not writable")
  if ("a" === n && !i)
    throw TypeError("Private accessor was defined without a setter")
  if ("function" == typeof t ? e !== t || !i : !t.has(e))
    throw TypeError(
      "Cannot write private member to an object whose class did not declare it"
    )
  return "a" === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r
}
!(function (e) {
  ;(e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
    (e.toString = (e) =>
      "string" == typeof e ? e : null == e ? void 0 : e.message)
})(errorUtil || (errorUtil = {}))
var ParseInputLazyPath = class {
    constructor(e, t, r, n) {
      ;(this._cachedPath = []),
        (this.parent = e),
        (this.data = t),
        (this._path = r),
        (this._key = n)
    }
    get path() {
      return (
        this._cachedPath.length ||
          (this._key instanceof Array
            ? this._cachedPath.push(...this._path, ...this._key)
            : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
      )
    }
  },
  handleResult = (e, t) => {
    if (isValid(t)) return { success: !0, data: t.value }
    if (!e.common.issues.length)
      throw Error("Validation failed but no issues detected.")
    return {
      success: !1,
      get error() {
        if (this._error) return this._error
        let r = new ZodError(e.common.issues)
        return (this._error = r), this._error
      },
    }
  }
function processCreateParams(e) {
  if (!e) return {}
  let {
    errorMap: t,
    invalid_type_error: r,
    required_error: n,
    description: i,
  } = e
  if (t && (r || n))
    throw Error(
      'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
    )
  if (t) return { errorMap: t, description: i }
  let s = (t, i) => {
    var s, a
    let { message: o } = e
    return "invalid_enum_value" === t.code
      ? { message: null != o ? o : i.defaultError }
      : void 0 === i.data
      ? {
          message:
            null !== (s = null != o ? o : n) && void 0 !== s
              ? s
              : i.defaultError,
        }
      : "invalid_type" !== t.code
      ? { message: i.defaultError }
      : {
          message:
            null !== (a = null != o ? o : r) && void 0 !== a
              ? a
              : i.defaultError,
        }
  }
  return { errorMap: s, description: i }
}
var ZodType = class {
    constructor(e) {
      ;(this.spa = this.safeParseAsync),
        (this._def = e),
        (this.parse = this.parse.bind(this)),
        (this.safeParse = this.safeParse.bind(this)),
        (this.parseAsync = this.parseAsync.bind(this)),
        (this.safeParseAsync = this.safeParseAsync.bind(this)),
        (this.spa = this.spa.bind(this)),
        (this.refine = this.refine.bind(this)),
        (this.refinement = this.refinement.bind(this)),
        (this.superRefine = this.superRefine.bind(this)),
        (this.optional = this.optional.bind(this)),
        (this.nullable = this.nullable.bind(this)),
        (this.nullish = this.nullish.bind(this)),
        (this.array = this.array.bind(this)),
        (this.promise = this.promise.bind(this)),
        (this.or = this.or.bind(this)),
        (this.and = this.and.bind(this)),
        (this.transform = this.transform.bind(this)),
        (this.brand = this.brand.bind(this)),
        (this.default = this.default.bind(this)),
        (this.catch = this.catch.bind(this)),
        (this.describe = this.describe.bind(this)),
        (this.pipe = this.pipe.bind(this)),
        (this.readonly = this.readonly.bind(this)),
        (this.isNullable = this.isNullable.bind(this)),
        (this.isOptional = this.isOptional.bind(this))
    }
    get description() {
      return this._def.description
    }
    _getType(e) {
      return getParsedType(e.data)
    }
    _getOrReturnCtx(e, t) {
      return (
        t || {
          common: e.parent.common,
          data: e.data,
          parsedType: getParsedType(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        }
      )
    }
    _processInputParams(e) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: getParsedType(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      }
    }
    _parseSync(e) {
      let t = this._parse(e)
      if (isAsync(t)) throw Error("Synchronous parse encountered promise.")
      return t
    }
    _parseAsync(e) {
      let t = this._parse(e)
      return Promise.resolve(t)
    }
    parse(e, t) {
      let r = this.safeParse(e, t)
      if (r.success) return r.data
      throw r.error
    }
    safeParse(e, t) {
      var r
      let n = {
          common: {
            issues: [],
            async:
              null !== (r = null == t ? void 0 : t.async) && void 0 !== r && r,
            contextualErrorMap: null == t ? void 0 : t.errorMap,
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: getParsedType(e),
        },
        i = this._parseSync({ data: e, path: n.path, parent: n })
      return handleResult(n, i)
    }
    async parseAsync(e, t) {
      let r = await this.safeParseAsync(e, t)
      if (r.success) return r.data
      throw r.error
    }
    async safeParseAsync(e, t) {
      let r = {
          common: {
            issues: [],
            contextualErrorMap: null == t ? void 0 : t.errorMap,
            async: !0,
          },
          path: (null == t ? void 0 : t.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: getParsedType(e),
        },
        n = this._parse({ data: e, path: r.path, parent: r }),
        i = await (isAsync(n) ? n : Promise.resolve(n))
      return handleResult(r, i)
    }
    refine(e, t) {
      let r = (e) =>
        "string" == typeof t || void 0 === t
          ? { message: t }
          : "function" == typeof t
          ? t(e)
          : t
      return this._refinement((t, n) => {
        let i = e(t),
          s = () => n.addIssue({ code: ZodIssueCode.custom, ...r(t) })
        return "undefined" != typeof Promise && i instanceof Promise
          ? i.then((e) => !!e || (s(), !1))
          : !!i || (s(), !1)
      })
    }
    refinement(e, t) {
      return this._refinement(
        (r, n) =>
          !!e(r) || (n.addIssue("function" == typeof t ? t(r, n) : t), !1)
      )
    }
    _refinement(e) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "refinement", refinement: e },
      })
    }
    superRefine(e) {
      return this._refinement(e)
    }
    optional() {
      return ZodOptional.create(this, this._def)
    }
    nullable() {
      return ZodNullable.create(this, this._def)
    }
    nullish() {
      return this.nullable().optional()
    }
    array() {
      return ZodArray.create(this, this._def)
    }
    promise() {
      return ZodPromise.create(this, this._def)
    }
    or(e) {
      return ZodUnion.create([this, e], this._def)
    }
    and(e) {
      return ZodIntersection.create(this, e, this._def)
    }
    transform(e) {
      return new ZodEffects({
        ...processCreateParams(this._def),
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "transform", transform: e },
      })
    }
    default(e) {
      return new ZodDefault({
        ...processCreateParams(this._def),
        innerType: this,
        defaultValue: "function" == typeof e ? e : () => e,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
      })
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(this._def),
      })
    }
    catch(e) {
      return new ZodCatch({
        ...processCreateParams(this._def),
        innerType: this,
        catchValue: "function" == typeof e ? e : () => e,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
      })
    }
    describe(e) {
      let t = this.constructor
      return new t({ ...this._def, description: e })
    }
    pipe(e) {
      return ZodPipeline.create(this, e)
    }
    readonly() {
      return ZodReadonly.create(this)
    }
    isOptional() {
      return this.safeParse(void 0).success
    }
    isNullable() {
      return this.safeParse(null).success
    }
  },
  cuidRegex = /^c[^\s-]{8,}$/i,
  cuid2Regex = /^[0-9a-z]+$/,
  ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  uuidRegex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  nanoidRegex = /^[a-z0-9_-]{21}$/i,
  durationRegex =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  emailRegex =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  _emojiRegex = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv6Regex =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  base64Regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  dateRegexSource =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  dateRegex = RegExp(`^${dateRegexSource}$`)
function timeRegexSource(e) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d"
  return (
    e.precision
      ? (t = `${t}\\.\\d{${e.precision}}`)
      : null == e.precision && (t = `${t}(\\.\\d+)?`),
    t
  )
}
function timeRegex(e) {
  return RegExp(`^${timeRegexSource(e)}$`)
}
function datetimeRegex(e) {
  let t = `${dateRegexSource}T${timeRegexSource(e)}`,
    r = []
  return (
    r.push(e.local ? "Z?" : "Z"),
    e.offset && r.push("([+-]\\d{2}:?\\d{2})"),
    (t = `${t}(${r.join("|")})`),
    RegExp(`^${t}$`)
  )
}
function isValidIP(e, t) {
  return !!(
    (("v4" === t || !t) && ipv4Regex.test(e)) ||
    (("v6" === t || !t) && ipv6Regex.test(e))
  )
}
var ZodString = class e extends ZodType {
  _parse(e) {
    this._def.coerce && (e.data = String(e.data))
    let t = this._getType(e)
    if (t !== ZodParsedType.string) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    let n = new ParseStatus(),
      i
    for (let s of this._def.checks)
      if ("min" === s.kind)
        e.data.length < s.value &&
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.too_small,
            minimum: s.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: s.message,
          }),
          n.dirty())
      else if ("max" === s.kind)
        e.data.length > s.value &&
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.too_big,
            maximum: s.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: s.message,
          }),
          n.dirty())
      else if ("length" === s.kind) {
        let a = e.data.length > s.value,
          o = e.data.length < s.value
        ;(a || o) &&
          ((i = this._getOrReturnCtx(e, i)),
          a
            ? addIssueToContext(i, {
                code: ZodIssueCode.too_big,
                maximum: s.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: s.message,
              })
            : o &&
              addIssueToContext(i, {
                code: ZodIssueCode.too_small,
                minimum: s.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: s.message,
              }),
          n.dirty())
      } else if ("email" === s.kind)
        emailRegex.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      else if ("emoji" === s.kind)
        emojiRegex || (emojiRegex = RegExp(_emojiRegex, "u")),
          emojiRegex.test(e.data) ||
            (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
              validation: "emoji",
              code: ZodIssueCode.invalid_string,
              message: s.message,
            }),
            n.dirty())
      else if ("uuid" === s.kind)
        uuidRegex.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      else if ("nanoid" === s.kind)
        nanoidRegex.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      else if ("cuid" === s.kind)
        cuidRegex.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      else if ("cuid2" === s.kind)
        cuid2Regex.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      else if ("ulid" === s.kind)
        ulidRegex.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      else if ("url" === s.kind)
        try {
          new URL(e.data)
        } catch (u) {
          addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
            n.dirty()
        }
      else if ("regex" === s.kind) {
        s.regex.lastIndex = 0
        let l = s.regex.test(e.data)
        l ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: s.message,
          }),
          n.dirty())
      } else if ("trim" === s.kind) e.data = e.data.trim()
      else if ("includes" === s.kind)
        e.data.includes(s.value, s.position) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.invalid_string,
            validation: { includes: s.value, position: s.position },
            message: s.message,
          }),
          n.dirty())
      else if ("toLowerCase" === s.kind) e.data = e.data.toLowerCase()
      else if ("toUpperCase" === s.kind) e.data = e.data.toUpperCase()
      else if ("startsWith" === s.kind)
        e.data.startsWith(s.value) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: s.value },
            message: s.message,
          }),
          n.dirty())
      else if ("endsWith" === s.kind)
        e.data.endsWith(s.value) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: s.value },
            message: s.message,
          }),
          n.dirty())
      else if ("datetime" === s.kind) {
        let h = datetimeRegex(s)
        h.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: s.message,
          }),
          n.dirty())
      } else if ("date" === s.kind) {
        let S = dateRegex
        S.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: s.message,
          }),
          n.dirty())
      } else if ("time" === s.kind) {
        let A = timeRegex(s)
        A.test(e.data) ||
          (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: s.message,
          }),
          n.dirty())
      } else
        "duration" === s.kind
          ? durationRegex.test(e.data) ||
            (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
              validation: "duration",
              code: ZodIssueCode.invalid_string,
              message: s.message,
            }),
            n.dirty())
          : "ip" === s.kind
          ? isValidIP(e.data, s.version) ||
            (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
              validation: "ip",
              code: ZodIssueCode.invalid_string,
              message: s.message,
            }),
            n.dirty())
          : "base64" === s.kind
          ? base64Regex.test(e.data) ||
            (addIssueToContext((i = this._getOrReturnCtx(e, i)), {
              validation: "base64",
              code: ZodIssueCode.invalid_string,
              message: s.message,
            }),
            n.dirty())
          : util.assertNever(s)
    return { status: n.value, value: e.data }
  }
  _regex(e, t, r) {
    return this.refinement((t) => e.test(t), {
      validation: t,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(r),
    })
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  email(e) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(e) })
  }
  url(e) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(e) })
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(e) })
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(e) })
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(e) })
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(e) })
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(e) })
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(e) })
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(e) })
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(e) })
  }
  datetime(e) {
    var t, r
    return "string" == typeof e
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          local: !1,
          message: e,
        })
      : this._addCheck({
          kind: "datetime",
          precision:
            void 0 === (null == e ? void 0 : e.precision)
              ? null
              : null == e
              ? void 0
              : e.precision,
          offset:
            null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
          local:
            null !== (r = null == e ? void 0 : e.local) && void 0 !== r && r,
          ...errorUtil.errToObj(null == e ? void 0 : e.message),
        })
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e })
  }
  time(e) {
    return "string" == typeof e
      ? this._addCheck({ kind: "time", precision: null, message: e })
      : this._addCheck({
          kind: "time",
          precision:
            void 0 === (null == e ? void 0 : e.precision)
              ? null
              : null == e
              ? void 0
              : e.precision,
          ...errorUtil.errToObj(null == e ? void 0 : e.message),
        })
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(e) })
  }
  regex(e, t) {
    return this._addCheck({ kind: "regex", regex: e, ...errorUtil.errToObj(t) })
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: null == t ? void 0 : t.position,
      ...errorUtil.errToObj(null == t ? void 0 : t.message),
    })
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...errorUtil.errToObj(t),
    })
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...errorUtil.errToObj(t),
    })
  }
  min(e, t) {
    return this._addCheck({ kind: "min", value: e, ...errorUtil.errToObj(t) })
  }
  max(e, t) {
    return this._addCheck({ kind: "max", value: e, ...errorUtil.errToObj(t) })
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...errorUtil.errToObj(t),
    })
  }
  nonempty(e) {
    return this.min(1, errorUtil.errToObj(e))
  }
  trim() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    })
  }
  toLowerCase() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    })
  }
  toUpperCase() {
    return new e({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    })
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => "datetime" === e.kind)
  }
  get isDate() {
    return !!this._def.checks.find((e) => "date" === e.kind)
  }
  get isTime() {
    return !!this._def.checks.find((e) => "time" === e.kind)
  }
  get isDuration() {
    return !!this._def.checks.find((e) => "duration" === e.kind)
  }
  get isEmail() {
    return !!this._def.checks.find((e) => "email" === e.kind)
  }
  get isURL() {
    return !!this._def.checks.find((e) => "url" === e.kind)
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => "emoji" === e.kind)
  }
  get isUUID() {
    return !!this._def.checks.find((e) => "uuid" === e.kind)
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => "nanoid" === e.kind)
  }
  get isCUID() {
    return !!this._def.checks.find((e) => "cuid" === e.kind)
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => "cuid2" === e.kind)
  }
  get isULID() {
    return !!this._def.checks.find((e) => "ulid" === e.kind)
  }
  get isIP() {
    return !!this._def.checks.find((e) => "ip" === e.kind)
  }
  get isBase64() {
    return !!this._def.checks.find((e) => "base64" === e.kind)
  }
  get minLength() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return e
  }
  get maxLength() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return e
  }
}
function floatSafeRemainder(e, t) {
  let r = (e.toString().split(".")[1] || "").length,
    n = (t.toString().split(".")[1] || "").length,
    i = r > n ? r : n,
    s = parseInt(e.toFixed(i).replace(".", "")),
    a = parseInt(t.toFixed(i).replace(".", ""))
  return (s % a) / Math.pow(10, i)
}
ZodString.create = (e) => {
  var t
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...processCreateParams(e),
  })
}
var ZodNumber = class e extends ZodType {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf)
  }
  _parse(e) {
    this._def.coerce && (e.data = Number(e.data))
    let t = this._getType(e)
    if (t !== ZodParsedType.number) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    let n,
      i = new ParseStatus()
    for (let s of this._def.checks)
      if ("int" === s.kind)
        util.isInteger(e.data) ||
          (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: s.message,
          }),
          i.dirty())
      else if ("min" === s.kind) {
        let a = s.inclusive ? e.data < s.value : e.data <= s.value
        a &&
          (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
            code: ZodIssueCode.too_small,
            minimum: s.value,
            type: "number",
            inclusive: s.inclusive,
            exact: !1,
            message: s.message,
          }),
          i.dirty())
      } else if ("max" === s.kind) {
        let o = s.inclusive ? e.data > s.value : e.data >= s.value
        o &&
          (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
            code: ZodIssueCode.too_big,
            maximum: s.value,
            type: "number",
            inclusive: s.inclusive,
            exact: !1,
            message: s.message,
          }),
          i.dirty())
      } else
        "multipleOf" === s.kind
          ? 0 !== floatSafeRemainder(e.data, s.value) &&
            (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: s.value,
              message: s.message,
            }),
            i.dirty())
          : "finite" === s.kind
          ? Number.isFinite(e.data) ||
            (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
              code: ZodIssueCode.not_finite,
              message: s.message,
            }),
            i.dirty())
          : util.assertNever(s)
    return { status: i.value, value: e.data }
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, errorUtil.toString(t))
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, errorUtil.toString(t))
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, errorUtil.toString(t))
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, errorUtil.toString(t))
  }
  setLimit(t, r, n, i) {
    return new e({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: r, inclusive: n, message: errorUtil.toString(i) },
      ],
    })
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  int(e) {
    return this._addCheck({ kind: "int", message: errorUtil.toString(e) })
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: errorUtil.toString(e),
    })
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: errorUtil.toString(e),
    })
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: errorUtil.toString(e),
    })
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: errorUtil.toString(e),
    })
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: errorUtil.toString(t),
    })
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: errorUtil.toString(e) })
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(e),
    })
  }
  get minValue() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return e
  }
  get maxValue() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return e
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        "int" === e.kind || ("multipleOf" === e.kind && util.isInteger(e.value))
    )
  }
  get isFinite() {
    let e = null,
      t = null
    for (let r of this._def.checks) {
      if ("finite" === r.kind || "int" === r.kind || "multipleOf" === r.kind)
        return !0
      "min" === r.kind
        ? (null === t || r.value > t) && (t = r.value)
        : "max" === r.kind && (null === e || r.value < e) && (e = r.value)
    }
    return Number.isFinite(t) && Number.isFinite(e)
  }
}
ZodNumber.create = (e) =>
  new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...processCreateParams(e),
  })
var ZodBigInt = class e extends ZodType {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte)
  }
  _parse(e) {
    this._def.coerce && (e.data = BigInt(e.data))
    let t = this._getType(e)
    if (t !== ZodParsedType.bigint) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    let n,
      i = new ParseStatus()
    for (let s of this._def.checks)
      if ("min" === s.kind) {
        let a = s.inclusive ? e.data < s.value : e.data <= s.value
        a &&
          (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: s.value,
            inclusive: s.inclusive,
            message: s.message,
          }),
          i.dirty())
      } else if ("max" === s.kind) {
        let o = s.inclusive ? e.data > s.value : e.data >= s.value
        o &&
          (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: s.value,
            inclusive: s.inclusive,
            message: s.message,
          }),
          i.dirty())
      } else
        "multipleOf" === s.kind
          ? e.data % s.value !== BigInt(0) &&
            (addIssueToContext((n = this._getOrReturnCtx(e, n)), {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: s.value,
              message: s.message,
            }),
            i.dirty())
          : util.assertNever(s)
    return { status: i.value, value: e.data }
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, errorUtil.toString(t))
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, errorUtil.toString(t))
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, errorUtil.toString(t))
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, errorUtil.toString(t))
  }
  setLimit(t, r, n, i) {
    return new e({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: r, inclusive: n, message: errorUtil.toString(i) },
      ],
    })
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: errorUtil.toString(e),
    })
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: errorUtil.toString(e),
    })
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: errorUtil.toString(e),
    })
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: errorUtil.toString(e),
    })
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: errorUtil.toString(t),
    })
  }
  get minValue() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return e
  }
  get maxValue() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return e
  }
}
ZodBigInt.create = (e) => {
  var t
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...processCreateParams(e),
  })
}
var ZodBoolean = class extends ZodType {
  _parse(e) {
    this._def.coerce && (e.data = Boolean(e.data))
    let t = this._getType(e)
    if (t !== ZodParsedType.boolean) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
}
ZodBoolean.create = (e) =>
  new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...processCreateParams(e),
  })
var ZodDate = class e extends ZodType {
  _parse(e) {
    this._def.coerce && (e.data = new Date(e.data))
    let t = this._getType(e)
    if (t !== ZodParsedType.date) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    if (isNaN(e.data.getTime())) {
      let n = this._getOrReturnCtx(e)
      return addIssueToContext(n, { code: ZodIssueCode.invalid_date }), INVALID
    }
    let i = new ParseStatus(),
      s
    for (let a of this._def.checks)
      "min" === a.kind
        ? e.data.getTime() < a.value &&
          (addIssueToContext((s = this._getOrReturnCtx(e, s)), {
            code: ZodIssueCode.too_small,
            message: a.message,
            inclusive: !0,
            exact: !1,
            minimum: a.value,
            type: "date",
          }),
          i.dirty())
        : "max" === a.kind
        ? e.data.getTime() > a.value &&
          (addIssueToContext((s = this._getOrReturnCtx(e, s)), {
            code: ZodIssueCode.too_big,
            message: a.message,
            inclusive: !0,
            exact: !1,
            maximum: a.value,
            type: "date",
          }),
          i.dirty())
        : util.assertNever(a)
    return { status: i.value, value: new Date(e.data.getTime()) }
  }
  _addCheck(t) {
    return new e({ ...this._def, checks: [...this._def.checks, t] })
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: errorUtil.toString(t),
    })
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: errorUtil.toString(t),
    })
  }
  get minDate() {
    let e = null
    for (let t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value)
    return null != e ? new Date(e) : null
  }
  get maxDate() {
    let e = null
    for (let t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value)
    return null != e ? new Date(e) : null
  }
}
ZodDate.create = (e) =>
  new ZodDate({
    checks: [],
    coerce: (null == e ? void 0 : e.coerce) || !1,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(e),
  })
var ZodSymbol = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    if (t !== ZodParsedType.symbol) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.symbol,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
}
ZodSymbol.create = (e) =>
  new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(e),
  })
var ZodUndefined = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    if (t !== ZodParsedType.undefined) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
}
ZodUndefined.create = (e) =>
  new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(e),
  })
var ZodNull = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    if (t !== ZodParsedType.null) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
}
ZodNull.create = (e) =>
  new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(e),
  })
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments), (this._any = !0)
  }
  _parse(e) {
    return OK(e.data)
  }
}
ZodAny.create = (e) =>
  new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(e),
  })
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments), (this._unknown = !0)
  }
  _parse(e) {
    return OK(e.data)
  }
}
ZodUnknown.create = (e) =>
  new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(e),
  })
var ZodNever = class extends ZodType {
  _parse(e) {
    let t = this._getOrReturnCtx(e)
    return (
      addIssueToContext(t, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: t.parsedType,
      }),
      INVALID
    )
  }
}
ZodNever.create = (e) =>
  new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(e),
  })
var ZodVoid = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    if (t !== ZodParsedType.undefined) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
}
ZodVoid.create = (e) =>
  new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(e),
  })
var ZodArray = class e extends ZodType {
  _parse(e) {
    let { ctx: t, status: r } = this._processInputParams(e),
      n = this._def
    if (t.parsedType !== ZodParsedType.array)
      return (
        addIssueToContext(t, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: t.parsedType,
        }),
        INVALID
      )
    if (null !== n.exactLength) {
      let i = t.data.length > n.exactLength.value,
        s = t.data.length < n.exactLength.value
      ;(i || s) &&
        (addIssueToContext(t, {
          code: i ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: s ? n.exactLength.value : void 0,
          maximum: i ? n.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: n.exactLength.message,
        }),
        r.dirty())
    }
    if (
      (null !== n.minLength &&
        t.data.length < n.minLength.value &&
        (addIssueToContext(t, {
          code: ZodIssueCode.too_small,
          minimum: n.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.minLength.message,
        }),
        r.dirty()),
      null !== n.maxLength &&
        t.data.length > n.maxLength.value &&
        (addIssueToContext(t, {
          code: ZodIssueCode.too_big,
          maximum: n.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.maxLength.message,
        }),
        r.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((e, r) =>
          n.type._parseAsync(new ParseInputLazyPath(t, e, t.path, r))
        )
      ).then((e) => ParseStatus.mergeArray(r, e))
    let a = [...t.data].map((e, r) =>
      n.type._parseSync(new ParseInputLazyPath(t, e, t.path, r))
    )
    return ParseStatus.mergeArray(r, a)
  }
  get element() {
    return this._def.type
  }
  min(t, r) {
    return new e({
      ...this._def,
      minLength: { value: t, message: errorUtil.toString(r) },
    })
  }
  max(t, r) {
    return new e({
      ...this._def,
      maxLength: { value: t, message: errorUtil.toString(r) },
    })
  }
  length(t, r) {
    return new e({
      ...this._def,
      exactLength: { value: t, message: errorUtil.toString(r) },
    })
  }
  nonempty(e) {
    return this.min(1, e)
  }
}
function deepPartialify(e) {
  if (e instanceof ZodObject) {
    let t = {}
    for (let r in e.shape) {
      let n = e.shape[r]
      t[r] = ZodOptional.create(deepPartialify(n))
    }
    return new ZodObject({ ...e._def, shape: () => t })
  }
  if (e instanceof ZodArray)
    return new ZodArray({ ...e._def, type: deepPartialify(e.element) })
  if (e instanceof ZodOptional)
    return ZodOptional.create(deepPartialify(e.unwrap()))
  if (e instanceof ZodNullable)
    return ZodNullable.create(deepPartialify(e.unwrap()))
  if (e instanceof ZodTuple)
    return ZodTuple.create(e.items.map((e) => deepPartialify(e)))
  else return e
}
ZodArray.create = (e, t) =>
  new ZodArray({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(t),
  })
var ZodObject = class e extends ZodType {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend)
  }
  _getCached() {
    if (null !== this._cached) return this._cached
    let e = this._def.shape(),
      t = util.objectKeys(e)
    return (this._cached = { shape: e, keys: t })
  }
  _parse(e) {
    let t = this._getType(e)
    if (t !== ZodParsedType.object) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    let { status: n, ctx: i } = this._processInputParams(e),
      { shape: s, keys: a } = this._getCached(),
      o = []
    if (
      !(
        this._def.catchall instanceof ZodNever &&
        "strip" === this._def.unknownKeys
      )
    )
      for (let u in i.data) a.includes(u) || o.push(u)
    let l = []
    for (let h of a) {
      let S = s[h],
        A = i.data[h]
      l.push({
        key: { status: "valid", value: h },
        value: S._parse(new ParseInputLazyPath(i, A, i.path, h)),
        alwaysSet: h in i.data,
      })
    }
    if (this._def.catchall instanceof ZodNever) {
      let O = this._def.unknownKeys
      if ("passthrough" === O)
        for (let L of o)
          l.push({
            key: { status: "valid", value: L },
            value: { status: "valid", value: i.data[L] },
          })
      else if ("strict" === O)
        o.length > 0 &&
          (addIssueToContext(i, {
            code: ZodIssueCode.unrecognized_keys,
            keys: o,
          }),
          n.dirty())
      else if ("strip" === O);
      else throw Error("Internal ZodObject error: invalid unknownKeys value.")
    } else {
      let V = this._def.catchall
      for (let W of o) {
        let ei = i.data[W]
        l.push({
          key: { status: "valid", value: W },
          value: V._parse(new ParseInputLazyPath(i, ei, i.path, W)),
          alwaysSet: W in i.data,
        })
      }
    }
    return i.common.async
      ? Promise.resolve()
          .then(async () => {
            let e = []
            for (let t of l) {
              let r = await t.key,
                n = await t.value
              e.push({ key: r, value: n, alwaysSet: t.alwaysSet })
            }
            return e
          })
          .then((e) => ParseStatus.mergeObjectSync(n, e))
      : ParseStatus.mergeObjectSync(n, l)
  }
  get shape() {
    return this._def.shape()
  }
  strict(t) {
    return (
      errorUtil.errToObj,
      new e({
        ...this._def,
        unknownKeys: "strict",
        ...(void 0 !== t
          ? {
              errorMap: (e, r) => {
                var n, i, s, a
                let o =
                  null !==
                    (s =
                      null === (i = (n = this._def).errorMap) || void 0 === i
                        ? void 0
                        : i.call(n, e, r).message) && void 0 !== s
                    ? s
                    : r.defaultError
                return "unrecognized_keys" === e.code
                  ? {
                      message:
                        null !== (a = errorUtil.errToObj(t).message) &&
                        void 0 !== a
                          ? a
                          : o,
                    }
                  : { message: o }
              },
            }
          : {}),
      })
    )
  }
  strip() {
    return new e({ ...this._def, unknownKeys: "strip" })
  }
  passthrough() {
    return new e({ ...this._def, unknownKeys: "passthrough" })
  }
  extend(t) {
    return new e({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...t }),
    })
  }
  merge(t) {
    let r = new e({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: ZodFirstPartyTypeKind.ZodObject,
    })
    return r
  }
  setKey(e, t) {
    return this.augment({ [e]: t })
  }
  catchall(t) {
    return new e({ ...this._def, catchall: t })
  }
  pick(t) {
    let r = {}
    return (
      util.objectKeys(t).forEach((e) => {
        t[e] && this.shape[e] && (r[e] = this.shape[e])
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  omit(t) {
    let r = {}
    return (
      util.objectKeys(this.shape).forEach((e) => {
        t[e] || (r[e] = this.shape[e])
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  deepPartial() {
    return deepPartialify(this)
  }
  partial(t) {
    let r = {}
    return (
      util.objectKeys(this.shape).forEach((e) => {
        let n = this.shape[e]
        t && !t[e] ? (r[e] = n) : (r[e] = n.optional())
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  required(t) {
    let r = {}
    return (
      util.objectKeys(this.shape).forEach((e) => {
        if (t && !t[e]) r[e] = this.shape[e]
        else {
          let n = this.shape[e],
            i = n
          for (; i instanceof ZodOptional; ) i = i._def.innerType
          r[e] = i
        }
      }),
      new e({ ...this._def, shape: () => r })
    )
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape))
  }
}
;(ZodObject.create = (e, t) =>
  new ZodObject({
    shape: () => e,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(t),
  })),
  (ZodObject.strictCreate = (e, t) =>
    new ZodObject({
      shape: () => e,
      unknownKeys: "strict",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(t),
    })),
  (ZodObject.lazycreate = (e, t) =>
    new ZodObject({
      shape: e,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(t),
    }))
var ZodUnion = class extends ZodType {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      r = this._def.options
    if (t.common.async)
      return Promise.all(
        r.map(async (e) => {
          let r = { ...t, common: { ...t.common, issues: [] }, parent: null }
          return {
            result: await e._parseAsync({
              data: t.data,
              path: t.path,
              parent: r,
            }),
            ctx: r,
          }
        })
      ).then(function e(r) {
        for (let n of r) if ("valid" === n.result.status) return n.result
        for (let i of r)
          if ("dirty" === i.result.status)
            return t.common.issues.push(...i.ctx.common.issues), i.result
        let s = r.map((e) => new ZodError(e.ctx.common.issues))
        return (
          addIssueToContext(t, {
            code: ZodIssueCode.invalid_union,
            unionErrors: s,
          }),
          INVALID
        )
      })
    {
      let n,
        i = []
      for (let s of r) {
        let a = { ...t, common: { ...t.common, issues: [] }, parent: null },
          o = s._parseSync({ data: t.data, path: t.path, parent: a })
        if ("valid" === o.status) return o
        "dirty" !== o.status || n || (n = { result: o, ctx: a }),
          a.common.issues.length && i.push(a.common.issues)
      }
      if (n) return t.common.issues.push(...n.ctx.common.issues), n.result
      let u = i.map((e) => new ZodError(e))
      return (
        addIssueToContext(t, {
          code: ZodIssueCode.invalid_union,
          unionErrors: u,
        }),
        INVALID
      )
    }
  }
  get options() {
    return this._def.options
  }
}
ZodUnion.create = (e, t) =>
  new ZodUnion({
    options: e,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(t),
  })
var getDiscriminator = (e) => {
    if (e instanceof ZodLazy) return getDiscriminator(e.schema)
    if (e instanceof ZodEffects) return getDiscriminator(e.innerType())
    if (e instanceof ZodLiteral) return [e.value]
    if (e instanceof ZodEnum) return e.options
    if (e instanceof ZodNativeEnum) return util.objectValues(e.enum)
    else if (e instanceof ZodDefault) return getDiscriminator(e._def.innerType)
    else if (e instanceof ZodUndefined) return [void 0]
    else if (e instanceof ZodNull) return [null]
    else if (e instanceof ZodOptional)
      return [void 0, ...getDiscriminator(e.unwrap())]
    else if (e instanceof ZodNullable)
      return [null, ...getDiscriminator(e.unwrap())]
    else if (e instanceof ZodBranded) return getDiscriminator(e.unwrap())
    else if (e instanceof ZodReadonly) return getDiscriminator(e.unwrap())
    else if (e instanceof ZodCatch) return getDiscriminator(e._def.innerType)
    else return []
  },
  ZodDiscriminatedUnion = class e extends ZodType {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e)
      if (t.parsedType !== ZodParsedType.object)
        return (
          addIssueToContext(t, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: t.parsedType,
          }),
          INVALID
        )
      let r = this.discriminator,
        n = t.data[r],
        i = this.optionsMap.get(n)
      return i
        ? t.common.async
          ? i._parseAsync({ data: t.data, path: t.path, parent: t })
          : i._parseSync({ data: t.data, path: t.path, parent: t })
        : (addIssueToContext(t, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [r],
          }),
          INVALID)
    }
    get discriminator() {
      return this._def.discriminator
    }
    get options() {
      return this._def.options
    }
    get optionsMap() {
      return this._def.optionsMap
    }
    static create(t, r, n) {
      let i = new Map()
      for (let s of r) {
        let a = getDiscriminator(s.shape[t])
        if (!a.length)
          throw Error(
            `A discriminator value for key \`${t}\` could not be extracted from all schema options`
          )
        for (let o of a) {
          if (i.has(o))
            throw Error(
              `Discriminator property ${String(t)} has duplicate value ${String(
                o
              )}`
            )
          i.set(o, s)
        }
      }
      return new e({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator: t,
        options: r,
        optionsMap: i,
        ...processCreateParams(n),
      })
    }
  }
function mergeValues(e, t) {
  let r = getParsedType(e),
    n = getParsedType(t)
  if (e === t) return { valid: !0, data: e }
  if (r === ZodParsedType.object && n === ZodParsedType.object) {
    let i = util.objectKeys(t),
      s = util.objectKeys(e).filter((e) => -1 !== i.indexOf(e)),
      a = { ...e, ...t }
    for (let o of s) {
      let u = mergeValues(e[o], t[o])
      if (!u.valid) return { valid: !1 }
      a[o] = u.data
    }
    return { valid: !0, data: a }
  }
  if (r === ZodParsedType.array && n === ZodParsedType.array) {
    if (e.length !== t.length) return { valid: !1 }
    let l = []
    for (let h = 0; h < e.length; h++) {
      let S = e[h],
        A = t[h],
        O = mergeValues(S, A)
      if (!O.valid) return { valid: !1 }
      l.push(O.data)
    }
    return { valid: !0, data: l }
  }
  if (r === ZodParsedType.date && n === ZodParsedType.date && +e == +t)
    return { valid: !0, data: e }
  return { valid: !1 }
}
var ZodIntersection = class extends ZodType {
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e),
      n = (e, n) => {
        if (isAborted(e) || isAborted(n)) return INVALID
        let i = mergeValues(e.value, n.value)
        return i.valid
          ? ((isDirty(e) || isDirty(n)) && t.dirty(),
            { status: t.value, value: i.data })
          : (addIssueToContext(r, {
              code: ZodIssueCode.invalid_intersection_types,
            }),
            INVALID)
      }
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          }),
        ]).then(([e, t]) => n(e, t))
      : n(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r })
        )
  }
}
ZodIntersection.create = (e, t, r) =>
  new ZodIntersection({
    left: e,
    right: t,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(r),
  })
var ZodTuple = class e extends ZodType {
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e)
    if (r.parsedType !== ZodParsedType.array)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: r.parsedType,
        }),
        INVALID
      )
    if (r.data.length < this._def.items.length)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        INVALID
      )
    let n = this._def.rest
    !n &&
      r.data.length > this._def.items.length &&
      (addIssueToContext(r, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      t.dirty())
    let i = [...r.data]
      .map((e, t) => {
        let n = this._def.items[t] || this._def.rest
        return n ? n._parse(new ParseInputLazyPath(r, e, r.path, t)) : null
      })
      .filter((e) => !!e)
    return r.common.async
      ? Promise.all(i).then((e) => ParseStatus.mergeArray(t, e))
      : ParseStatus.mergeArray(t, i)
  }
  get items() {
    return this._def.items
  }
  rest(t) {
    return new e({ ...this._def, rest: t })
  }
}
ZodTuple.create = (e, t) => {
  if (!Array.isArray(e))
    throw Error("You must pass an array of schemas to z.tuple([ ... ])")
  return new ZodTuple({
    items: e,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(t),
  })
}
var ZodRecord = class e extends ZodType {
    get keySchema() {
      return this._def.keyType
    }
    get valueSchema() {
      return this._def.valueType
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e)
      if (r.parsedType !== ZodParsedType.object)
        return (
          addIssueToContext(r, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: r.parsedType,
          }),
          INVALID
        )
      let n = [],
        i = this._def.keyType,
        s = this._def.valueType
      for (let a in r.data)
        n.push({
          key: i._parse(new ParseInputLazyPath(r, a, r.path, a)),
          value: s._parse(new ParseInputLazyPath(r, r.data[a], r.path, a)),
          alwaysSet: a in r.data,
        })
      return r.common.async
        ? ParseStatus.mergeObjectAsync(t, n)
        : ParseStatus.mergeObjectSync(t, n)
    }
    get element() {
      return this._def.valueType
    }
    static create(t, r, n) {
      return new e(
        r instanceof ZodType
          ? {
              keyType: t,
              valueType: r,
              typeName: ZodFirstPartyTypeKind.ZodRecord,
              ...processCreateParams(n),
            }
          : {
              keyType: ZodString.create(),
              valueType: t,
              typeName: ZodFirstPartyTypeKind.ZodRecord,
              ...processCreateParams(r),
            }
      )
    }
  },
  ZodMap = class extends ZodType {
    get keySchema() {
      return this._def.keyType
    }
    get valueSchema() {
      return this._def.valueType
    }
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e)
      if (r.parsedType !== ZodParsedType.map)
        return (
          addIssueToContext(r, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: r.parsedType,
          }),
          INVALID
        )
      let n = this._def.keyType,
        i = this._def.valueType,
        s = [...r.data.entries()].map(([e, t], s) => ({
          key: n._parse(new ParseInputLazyPath(r, e, r.path, [s, "key"])),
          value: i._parse(new ParseInputLazyPath(r, t, r.path, [s, "value"])),
        }))
      if (r.common.async) {
        let a = new Map()
        return Promise.resolve().then(async () => {
          for (let e of s) {
            let r = await e.key,
              n = await e.value
            if ("aborted" === r.status || "aborted" === n.status) return INVALID
            ;("dirty" === r.status || "dirty" === n.status) && t.dirty(),
              a.set(r.value, n.value)
          }
          return { status: t.value, value: a }
        })
      }
      {
        let o = new Map()
        for (let u of s) {
          let l = u.key,
            h = u.value
          if ("aborted" === l.status || "aborted" === h.status) return INVALID
          ;("dirty" === l.status || "dirty" === h.status) && t.dirty(),
            o.set(l.value, h.value)
        }
        return { status: t.value, value: o }
      }
    }
  }
ZodMap.create = (e, t, r) =>
  new ZodMap({
    valueType: t,
    keyType: e,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(r),
  })
var ZodSet = class e extends ZodType {
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e)
    if (r.parsedType !== ZodParsedType.set)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: r.parsedType,
        }),
        INVALID
      )
    let n = this._def
    null !== n.minSize &&
      r.data.size < n.minSize.value &&
      (addIssueToContext(r, {
        code: ZodIssueCode.too_small,
        minimum: n.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.minSize.message,
      }),
      t.dirty()),
      null !== n.maxSize &&
        r.data.size > n.maxSize.value &&
        (addIssueToContext(r, {
          code: ZodIssueCode.too_big,
          maximum: n.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: n.maxSize.message,
        }),
        t.dirty())
    let i = this._def.valueType
    function s(e) {
      let r = new Set()
      for (let n of e) {
        if ("aborted" === n.status) return INVALID
        "dirty" === n.status && t.dirty(), r.add(n.value)
      }
      return { status: t.value, value: r }
    }
    let a = [...r.data.values()].map((e, t) =>
      i._parse(new ParseInputLazyPath(r, e, r.path, t))
    )
    return r.common.async ? Promise.all(a).then((e) => s(e)) : s(a)
  }
  min(t, r) {
    return new e({
      ...this._def,
      minSize: { value: t, message: errorUtil.toString(r) },
    })
  }
  max(t, r) {
    return new e({
      ...this._def,
      maxSize: { value: t, message: errorUtil.toString(r) },
    })
  }
  size(e, t) {
    return this.min(e, t).max(e, t)
  }
  nonempty(e) {
    return this.min(1, e)
  }
}
ZodSet.create = (e, t) =>
  new ZodSet({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(t),
  })
var ZodFunction = class e extends ZodType {
    constructor() {
      super(...arguments), (this.validate = this.implement)
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e)
      if (t.parsedType !== ZodParsedType.function)
        return (
          addIssueToContext(t, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: t.parsedType,
          }),
          INVALID
        )
      function r(e, r) {
        return makeIssue({
          data: e,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            getErrorMap(),
            errorMap,
          ].filter((e) => !!e),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: r,
          },
        })
      }
      function n(e, r) {
        return makeIssue({
          data: e,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            getErrorMap(),
            errorMap,
          ].filter((e) => !!e),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: r,
          },
        })
      }
      let i = { errorMap: t.common.contextualErrorMap },
        s = t.data
      if (this._def.returns instanceof ZodPromise) {
        let a = this
        return OK(async function (...e) {
          let t = new ZodError([]),
            o = await a._def.args.parseAsync(e, i).catch((n) => {
              throw (t.addIssue(r(e, n)), t)
            }),
            u = await Reflect.apply(s, this, o),
            l = await a._def.returns._def.type.parseAsync(u, i).catch((e) => {
              throw (t.addIssue(n(u, e)), t)
            })
          return l
        })
      }
      {
        let o = this
        return OK(function (...e) {
          let t = o._def.args.safeParse(e, i)
          if (!t.success) throw new ZodError([r(e, t.error)])
          let a = Reflect.apply(s, this, t.data),
            u = o._def.returns.safeParse(a, i)
          if (!u.success) throw new ZodError([n(a, u.error)])
          return u.data
        })
      }
    }
    parameters() {
      return this._def.args
    }
    returnType() {
      return this._def.returns
    }
    args(...t) {
      return new e({
        ...this._def,
        args: ZodTuple.create(t).rest(ZodUnknown.create()),
      })
    }
    returns(t) {
      return new e({ ...this._def, returns: t })
    }
    implement(e) {
      let t = this.parse(e)
      return t
    }
    strictImplement(e) {
      let t = this.parse(e)
      return t
    }
    static create(t, r, n) {
      return new e({
        args: t || ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: r || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(n),
      })
    }
  },
  ZodLazy = class extends ZodType {
    get schema() {
      return this._def.getter()
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = this._def.getter()
      return r._parse({ data: t.data, path: t.path, parent: t })
    }
  }
ZodLazy.create = (e, t) =>
  new ZodLazy({
    getter: e,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(t),
  })
var ZodLiteral = class extends ZodType {
  _parse(e) {
    if (e.data !== this._def.value) {
      let t = this._getOrReturnCtx(e)
      return (
        addIssueToContext(t, {
          received: t.data,
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value,
        }),
        INVALID
      )
    }
    return { status: "valid", value: e.data }
  }
  get value() {
    return this._def.value
  }
}
function createZodEnum(e, t) {
  return new ZodEnum({
    values: e,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(t),
  })
}
ZodLiteral.create = (e, t) =>
  new ZodLiteral({
    value: e,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(t),
  })
var ZodEnum = class e extends ZodType {
  constructor() {
    super(...arguments), _ZodEnum_cache.set(this, void 0)
  }
  _parse(e) {
    if ("string" != typeof e.data) {
      let t = this._getOrReturnCtx(e),
        r = this._def.values
      return (
        addIssueToContext(t, {
          expected: util.joinValues(r),
          received: t.parsedType,
          code: ZodIssueCode.invalid_type,
        }),
        INVALID
      )
    }
    if (
      (__classPrivateFieldGet(this, _ZodEnum_cache, "f") ||
        __classPrivateFieldSet(
          this,
          _ZodEnum_cache,
          new Set(this._def.values),
          "f"
        ),
      !__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(e.data))
    ) {
      let n = this._getOrReturnCtx(e),
        i = this._def.values
      return (
        addIssueToContext(n, {
          received: n.data,
          code: ZodIssueCode.invalid_enum_value,
          options: i,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
  get options() {
    return this._def.values
  }
  get enum() {
    let e = {}
    for (let t of this._def.values) e[t] = t
    return e
  }
  get Values() {
    let e = {}
    for (let t of this._def.values) e[t] = t
    return e
  }
  get Enum() {
    let e = {}
    for (let t of this._def.values) e[t] = t
    return e
  }
  extract(t, r = this._def) {
    return e.create(t, { ...this._def, ...r })
  }
  exclude(t, r = this._def) {
    return e.create(
      this.options.filter((e) => !t.includes(e)),
      { ...this._def, ...r }
    )
  }
}
;(_ZodEnum_cache = new WeakMap()), (ZodEnum.create = createZodEnum)
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments), _ZodNativeEnum_cache.set(this, void 0)
  }
  _parse(e) {
    let t = util.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(e)
    if (
      r.parsedType !== ZodParsedType.string &&
      r.parsedType !== ZodParsedType.number
    ) {
      let n = util.objectValues(t)
      return (
        addIssueToContext(r, {
          expected: util.joinValues(n),
          received: r.parsedType,
          code: ZodIssueCode.invalid_type,
        }),
        INVALID
      )
    }
    if (
      (__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f") ||
        __classPrivateFieldSet(
          this,
          _ZodNativeEnum_cache,
          new Set(util.getValidEnumValues(this._def.values)),
          "f"
        ),
      !__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(e.data))
    ) {
      let i = util.objectValues(t)
      return (
        addIssueToContext(r, {
          received: r.data,
          code: ZodIssueCode.invalid_enum_value,
          options: i,
        }),
        INVALID
      )
    }
    return OK(e.data)
  }
  get enum() {
    return this._def.values
  }
}
;(_ZodNativeEnum_cache = new WeakMap()),
  (ZodNativeEnum.create = (e, t) =>
    new ZodNativeEnum({
      values: e,
      typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
      ...processCreateParams(t),
    }))
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type
  }
  _parse(e) {
    let { ctx: t } = this._processInputParams(e)
    if (t.parsedType !== ZodParsedType.promise && !1 === t.common.async)
      return (
        addIssueToContext(t, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: t.parsedType,
        }),
        INVALID
      )
    let r =
      t.parsedType === ZodParsedType.promise ? t.data : Promise.resolve(t.data)
    return OK(
      r.then((e) =>
        this._def.type.parseAsync(e, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        })
      )
    )
  }
}
ZodPromise.create = (e, t) =>
  new ZodPromise({
    type: e,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(t),
  })
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema
  }
  _parse(e) {
    let { status: t, ctx: r } = this._processInputParams(e),
      n = this._def.effect || null,
      i = {
        addIssue(e) {
          addIssueToContext(r, e), e.fatal ? t.abort() : t.dirty()
        },
        get path() {
          return r.path
        },
      }
    if (((i.addIssue = i.addIssue.bind(i)), "preprocess" === n.type)) {
      let s = n.transform(r.data, i)
      if (r.common.async)
        return Promise.resolve(s).then(async (e) => {
          if ("aborted" === t.value) return INVALID
          let n = await this._def.schema._parseAsync({
            data: e,
            path: r.path,
            parent: r,
          })
          return "aborted" === n.status
            ? INVALID
            : "dirty" === n.status || "dirty" === t.value
            ? DIRTY(n.value)
            : n
        })
      {
        if ("aborted" === t.value) return INVALID
        let a = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r,
        })
        return "aborted" === a.status
          ? INVALID
          : "dirty" === a.status || "dirty" === t.value
          ? DIRTY(a.value)
          : a
      }
    }
    if ("refinement" === n.type) {
      let o = (e) => {
        let t = n.refinement(e, i)
        if (r.common.async) return Promise.resolve(t)
        if (t instanceof Promise)
          throw Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
          )
        return e
      }
      if (!1 !== r.common.async)
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((e) =>
            "aborted" === e.status
              ? INVALID
              : ("dirty" === e.status && t.dirty(),
                o(e.value).then(() => ({ status: t.value, value: e.value })))
          )
      {
        let u = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        })
        return "aborted" === u.status
          ? INVALID
          : ("dirty" === u.status && t.dirty(),
            o(u.value),
            { status: t.value, value: u.value })
      }
    }
    if ("transform" === n.type) {
      if (!1 !== r.common.async)
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((e) =>
            isValid(e)
              ? Promise.resolve(n.transform(e.value, i)).then((e) => ({
                  status: t.value,
                  value: e,
                }))
              : e
          )
      {
        let l = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        })
        if (!isValid(l)) return l
        let h = n.transform(l.value, i)
        if (h instanceof Promise)
          throw Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
          )
        return { status: t.value, value: h }
      }
    }
    util.assertNever(n)
  }
}
;(ZodEffects.create = (e, t, r) =>
  new ZodEffects({
    schema: e,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect: t,
    ...processCreateParams(r),
  })),
  (ZodEffects.createWithPreprocess = (e, t, r) =>
    new ZodEffects({
      schema: t,
      effect: { type: "preprocess", transform: e },
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      ...processCreateParams(r),
    }))
var ZodOptional = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    return t === ZodParsedType.undefined
      ? OK(void 0)
      : this._def.innerType._parse(e)
  }
  unwrap() {
    return this._def.innerType
  }
}
ZodOptional.create = (e, t) =>
  new ZodOptional({
    innerType: e,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(t),
  })
var ZodNullable = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    return t === ZodParsedType.null ? OK(null) : this._def.innerType._parse(e)
  }
  unwrap() {
    return this._def.innerType
  }
}
ZodNullable.create = (e, t) =>
  new ZodNullable({
    innerType: e,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(t),
  })
var ZodDefault = class extends ZodType {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      r = t.data
    return (
      t.parsedType === ZodParsedType.undefined &&
        (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: t.path, parent: t })
    )
  }
  removeDefault() {
    return this._def.innerType
  }
}
ZodDefault.create = (e, t) =>
  new ZodDefault({
    innerType: e,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: "function" == typeof t.default ? t.default : () => t.default,
    ...processCreateParams(t),
  })
var ZodCatch = class extends ZodType {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      r = { ...t, common: { ...t.common, issues: [] } },
      n = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: { ...r },
      })
    return isAsync(n)
      ? n.then((e) => ({
          status: "valid",
          value:
            "valid" === e.status
              ? e.value
              : this._def.catchValue({
                  get error() {
                    return new ZodError(r.common.issues)
                  },
                  input: r.data,
                }),
        }))
      : {
          status: "valid",
          value:
            "valid" === n.status
              ? n.value
              : this._def.catchValue({
                  get error() {
                    return new ZodError(r.common.issues)
                  },
                  input: r.data,
                }),
        }
  }
  removeCatch() {
    return this._def.innerType
  }
}
ZodCatch.create = (e, t) =>
  new ZodCatch({
    innerType: e,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
    ...processCreateParams(t),
  })
var ZodNaN = class extends ZodType {
  _parse(e) {
    let t = this._getType(e)
    if (t !== ZodParsedType.nan) {
      let r = this._getOrReturnCtx(e)
      return (
        addIssueToContext(r, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: r.parsedType,
        }),
        INVALID
      )
    }
    return { status: "valid", value: e.data }
  }
}
ZodNaN.create = (e) =>
  new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(e),
  })
var BRAND = Symbol("zod_brand"),
  ZodBranded = class extends ZodType {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e),
        r = t.data
      return this._def.type._parse({ data: r, path: t.path, parent: t })
    }
    unwrap() {
      return this._def.type
    }
  },
  ZodPipeline = class e extends ZodType {
    _parse(e) {
      let { status: t, ctx: r } = this._processInputParams(e)
      if (r.common.async) {
        let n = async () => {
          let e = await this._def.in._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          })
          return "aborted" === e.status
            ? INVALID
            : "dirty" === e.status
            ? (t.dirty(), DIRTY(e.value))
            : this._def.out._parseAsync({
                data: e.value,
                path: r.path,
                parent: r,
              })
        }
        return n()
      }
      {
        let i = this._def.in._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        })
        return "aborted" === i.status
          ? INVALID
          : "dirty" === i.status
          ? (t.dirty(), { status: "dirty", value: i.value })
          : this._def.out._parseSync({ data: i.value, path: r.path, parent: r })
      }
    }
    static create(t, r) {
      return new e({
        in: t,
        out: r,
        typeName: ZodFirstPartyTypeKind.ZodPipeline,
      })
    }
  },
  ZodReadonly = class extends ZodType {
    _parse(e) {
      let t = this._def.innerType._parse(e),
        r = (e) => (isValid(e) && (e.value = Object.freeze(e.value)), e)
      return isAsync(t) ? t.then((e) => r(e)) : r(t)
    }
    unwrap() {
      return this._def.innerType
    }
  }
function custom(e, t = {}, r) {
  return e
    ? ZodAny.create().superRefine((n, i) => {
        var s, a
        if (!e(n)) {
          let o =
              "function" == typeof t
                ? t(n)
                : "string" == typeof t
                ? { message: t }
                : t,
            u =
              null === (a = null !== (s = o.fatal) && void 0 !== s ? s : r) ||
              void 0 === a ||
              a
          i.addIssue({
            code: "custom",
            ...("string" == typeof o ? { message: o } : o),
            fatal: u,
          })
        }
      })
    : ZodAny.create()
}
ZodReadonly.create = (e, t) =>
  new ZodReadonly({
    innerType: e,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(t),
  })
var late = { object: ZodObject.lazycreate }
!(function (e) {
  ;(e.ZodString = "ZodString"),
    (e.ZodNumber = "ZodNumber"),
    (e.ZodNaN = "ZodNaN"),
    (e.ZodBigInt = "ZodBigInt"),
    (e.ZodBoolean = "ZodBoolean"),
    (e.ZodDate = "ZodDate"),
    (e.ZodSymbol = "ZodSymbol"),
    (e.ZodUndefined = "ZodUndefined"),
    (e.ZodNull = "ZodNull"),
    (e.ZodAny = "ZodAny"),
    (e.ZodUnknown = "ZodUnknown"),
    (e.ZodNever = "ZodNever"),
    (e.ZodVoid = "ZodVoid"),
    (e.ZodArray = "ZodArray"),
    (e.ZodObject = "ZodObject"),
    (e.ZodUnion = "ZodUnion"),
    (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (e.ZodIntersection = "ZodIntersection"),
    (e.ZodTuple = "ZodTuple"),
    (e.ZodRecord = "ZodRecord"),
    (e.ZodMap = "ZodMap"),
    (e.ZodSet = "ZodSet"),
    (e.ZodFunction = "ZodFunction"),
    (e.ZodLazy = "ZodLazy"),
    (e.ZodLiteral = "ZodLiteral"),
    (e.ZodEnum = "ZodEnum"),
    (e.ZodEffects = "ZodEffects"),
    (e.ZodNativeEnum = "ZodNativeEnum"),
    (e.ZodOptional = "ZodOptional"),
    (e.ZodNullable = "ZodNullable"),
    (e.ZodDefault = "ZodDefault"),
    (e.ZodCatch = "ZodCatch"),
    (e.ZodPromise = "ZodPromise"),
    (e.ZodBranded = "ZodBranded"),
    (e.ZodPipeline = "ZodPipeline"),
    (e.ZodReadonly = "ZodReadonly")
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}))
var instanceOfType = (e, t = { message: `Input not instance of ${e.name}` }) =>
    custom((t) => t instanceof e, t),
  stringType = ZodString.create,
  numberType = ZodNumber.create,
  nanType = ZodNaN.create,
  bigIntType = ZodBigInt.create,
  booleanType = ZodBoolean.create,
  dateType = ZodDate.create,
  symbolType = ZodSymbol.create,
  undefinedType = ZodUndefined.create,
  nullType = ZodNull.create,
  anyType = ZodAny.create,
  unknownType = ZodUnknown.create,
  neverType = ZodNever.create,
  voidType = ZodVoid.create,
  arrayType = ZodArray.create,
  objectType = ZodObject.create,
  strictObjectType = ZodObject.strictCreate,
  unionType = ZodUnion.create,
  discriminatedUnionType = ZodDiscriminatedUnion.create,
  intersectionType = ZodIntersection.create,
  tupleType = ZodTuple.create,
  recordType = ZodRecord.create,
  mapType = ZodMap.create,
  setType = ZodSet.create,
  functionType = ZodFunction.create,
  lazyType = ZodLazy.create,
  literalType = ZodLiteral.create,
  enumType = ZodEnum.create,
  nativeEnumType = ZodNativeEnum.create,
  promiseType = ZodPromise.create,
  effectsType = ZodEffects.create,
  optionalType = ZodOptional.create,
  nullableType = ZodNullable.create,
  preprocessType = ZodEffects.createWithPreprocess,
  pipelineType = ZodPipeline.create,
  ostring = () => stringType().optional(),
  onumber = () => numberType().optional(),
  oboolean = () => booleanType().optional(),
  coerce = {
    string: (e) => ZodString.create({ ...e, coerce: !0 }),
    number: (e) => ZodNumber.create({ ...e, coerce: !0 }),
    boolean: (e) => ZodBoolean.create({ ...e, coerce: !0 }),
    bigint: (e) => ZodBigInt.create({ ...e, coerce: !0 }),
    date: (e) => ZodDate.create({ ...e, coerce: !0 }),
  },
  NEVER = INVALID,
  z2 = Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap,
    getErrorMap,
    makeIssue,
    EMPTY_PATH,
    addIssueToContext,
    ParseStatus,
    INVALID,
    DIRTY,
    OK,
    isAborted,
    isDirty,
    isValid,
    isAsync,
    get util() {
      return util
    },
    get objectUtil() {
      return objectUtil
    },
    ZodParsedType,
    getParsedType,
    ZodType,
    datetimeRegex,
    ZodString,
    ZodNumber,
    ZodBigInt,
    ZodBoolean,
    ZodDate,
    ZodSymbol,
    ZodUndefined,
    ZodNull,
    ZodAny,
    ZodUnknown,
    ZodNever,
    ZodVoid,
    ZodArray,
    ZodObject,
    ZodUnion,
    ZodDiscriminatedUnion,
    ZodIntersection,
    ZodTuple,
    ZodRecord,
    ZodMap,
    ZodSet,
    ZodFunction,
    ZodLazy,
    ZodLiteral,
    ZodEnum,
    ZodNativeEnum,
    ZodPromise,
    ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional,
    ZodNullable,
    ZodDefault,
    ZodCatch,
    ZodNaN,
    BRAND,
    ZodBranded,
    ZodPipeline,
    ZodReadonly,
    custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late,
    get ZodFirstPartyTypeKind() {
      return ZodFirstPartyTypeKind
    },
    coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    enum: enumType,
    function: functionType,
    instanceof: instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    null: nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    undefined: undefinedType,
    union: unionType,
    unknown: unknownType,
    void: voidType,
    NEVER,
    ZodIssueCode,
    quotelessJson,
    ZodError,
  })
function loadTransactionMetaWith({ fetch: e, GRAPHQL_URL: t, logger: r }) {
  let n = `
    query GetTransactions ($transactionIds: [ID!]!) {
      transactions(ids: $transactionIds) {
        edges {
          node {
            owner {
              address
            }
            tags {
              name
              value
            }
            block {
              id
              height
              timestamp
            }
          }
        }
      }
    }`,
    i = z2.object({
      data: z2.object({
        transactions: z2.object({
          edges: z2.array(z2.object({ node: z2.record(z2.any()) })),
        }),
      }),
    })
  return (s) =>
    of(s)
      .chain(
        fromPromise((s) =>
          e(t, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: n,
              variables: { transactionIds: [s] },
            }),
          })
            .then(async (e) => {
              if (e.ok) return e.json()
              throw (
                (r(
                  'Error Encountered when querying gateway for transaction "%s"',
                  s
                ),
                Error(`${e.status}: ${await e.text()}`))
              )
            })
            .then(i.parse)
            .then(path_default(["data", "transactions", "edges", "0", "node"]))
        )
      )
      .toPromise()
}
var import_debug = __toESM(require_browser(), 1),
  createLogger = (e = "@permaweb/aoconnect") => {
    let t = (0, import_debug.default)(e)
    return (
      (t.child = (e) => createLogger(`${t.namespace}:${e}`)),
      (t.tap = (e, ...r) => tap_default((...n) => t(e, ...r, ...n))),
      t
    )
  },
  joinUrl = ({ url: e, path: t }) =>
    t
      ? t.startsWith("/")
        ? joinUrl({ url: e, path: t.slice(1) })
        : ((e = new URL(e)), (e.pathname += t), e.toString())
      : e
function parseTags(e) {
  return pipe(
    defaultTo_default([]),
    reduce_default(
      (e, t) =>
        pipe(
          propOr_default([], t.name),
          append_default(t.value),
          assoc_default(t.name, __default, e)
        )(e),
      {}
    ),
    map_default((e) => (e.length > 1 ? e : e[0]))
  )(e)
}
function eqOrIncludes(e) {
  return cond_default([
    [is_default(String), equals_default(e)],
    [is_default(Array), includes_default(e)],
    [T_default, F_default],
  ])
}
function errFrom(e) {
  let t
  return (
    is_default(ZodError, e)
      ? ((t = Error(mapZodErr(e))), (t.stack += e.stack))
      : (t = is_default(Error, e)
          ? e
          : has_default("message", e)
          ? Error(e.message)
          : is_default(String, e)
          ? Error(e)
          : Error("An error occurred")),
    t
  )
}
function mapZodErr(e) {
  return pipe(
    (e) =>
      (function e(t, r, n) {
        return reduce_default(
          (t, r) =>
            pipe(
              cond_default([
                [
                  equals_default(ZodIssueCode.invalid_arguments),
                  () => e(r.argumentsError, 422, "Invalid Arguments"),
                ],
                [
                  equals_default(ZodIssueCode.invalid_return_type),
                  () => e(r.returnTypeError, 500, "Invalid Return"),
                ],
                [
                  equals_default(ZodIssueCode.invalid_union),
                  () =>
                    chain_default(
                      (t) => e(t, 400, "Invalid Union"),
                      r.unionErrors
                    ),
                ],
                [T_default, () => [{ ...r, status: 400, contextCode: "" }]],
              ]),
              concat_default(t)
            )(r.code),
          [],
          t.issues
        )
      })(e, 400, ""),
    (e) =>
      reduce_default(
        (e, t) => {
          let { message: r, path: n, contextCode: i } = t,
            s = n[1] || n[0],
            a = i ? `${i} ` : ""
          return e.push(`${a}'${s}': ${r}.`), e
        },
        [],
        e
      ),
    join_default(" | ")
  )(e)
}
var inputSchema = z2.object({
  id: z2.string().min(1, { message: "message is required to be a message id" }),
  processId: z2
    .string()
    .min(1, { message: "process is required to be a process id" }),
})
function verifyInputWith() {
  return (e) =>
    of(e)
      .map(inputSchema.parse)
      .map(() => e)
}
var tagSchema = z2.object({ name: z2.string(), value: z2.string() }),
  dryrunResultSchema = z2
    .function()
    .args(
      z2.object({
        Id: z2.string(),
        Target: z2.string(),
        Owner: z2.string(),
        Anchor: z2.string().optional(),
        Data: z2.any().default("1234"),
        Tags: z2.array(z2.object({ name: z2.string(), value: z2.string() })),
      })
    )
    .returns(z2.promise(z2.any())),
  loadResultSchema = z2
    .function()
    .args(
      z2.object({
        id: z2.string().min(1, { message: "message id is required" }),
        processId: z2.string().min(1, { message: "process id is required" }),
      })
    )
    .returns(z2.promise(z2.any())),
  queryResultsSchema = z2
    .function()
    .args(
      z2.object({
        process: z2.string().min(1, { message: "process id is required" }),
        from: z2.string().optional(),
        to: z2.string().optional(),
        sort: z2.enum(["ASC", "DESC"]).default("ASC"),
        limit: z2.number().optional(),
      })
    )
    .returns(
      z2.promise(
        z2.object({
          edges: z2.array(
            z2.object({
              cursor: z2.string(),
              node: z2.object({
                Output: z2.any().optional(),
                Messages: z2.array(z2.any()).optional(),
                Spawns: z2.array(z2.any()).optional(),
                Error: z2.any().optional(),
              }),
            })
          ),
        })
      )
    ),
  deployMessageSchema = z2
    .function()
    .args(
      z2.object({
        processId: z2.string(),
        data: z2.any(),
        tags: z2.array(tagSchema),
        anchor: z2.string().optional(),
        signer: z2.any(),
      })
    )
    .returns(z2.promise(z2.object({ messageId: z2.string() }).passthrough())),
  deployProcessSchema = z2
    .function()
    .args(
      z2.object({ data: z2.any(), tags: z2.array(tagSchema), signer: z2.any() })
    )
    .returns(z2.promise(z2.object({ processId: z2.string() }).passthrough())),
  deployAssignSchema = z2
    .function()
    .args(
      z2.object({
        process: z2.string(),
        message: z2.string(),
        baseLayer: z2.boolean().optional(),
        exclude: z2.array(z2.string()).optional(),
      })
    )
    .returns(
      z2.promise(z2.object({ assignmentId: z2.string() }).passthrough())
    ),
  deployMonitorSchema = deployMessageSchema,
  loadProcessMetaSchema = z2
    .function()
    .args(z2.object({ suUrl: z2.string().url(), processId: z2.string() }))
    .returns(
      z2.promise(z2.object({ tags: z2.array(tagSchema) }).passthrough())
    ),
  locateSchedulerSchema = z2
    .function()
    .args(z2.string())
    .returns(z2.promise(z2.object({ url: z2.string() }))),
  validateSchedulerSchema = z2
    .function()
    .args(z2.string())
    .returns(z2.promise(z2.boolean())),
  loadTransactionMetaSchema = z2
    .function()
    .args(z2.string())
    .returns(
      z2.promise(z2.object({ tags: z2.array(tagSchema) }).passthrough())
    ),
  signerSchema = z2
    .function()
    .args(
      z2.object({
        data: z2.any(),
        tags: z2.array(tagSchema),
        target: z2.string().optional(),
        anchor: z2.string().optional(),
      })
    )
    .returns(z2.promise(z2.object({ id: z2.string(), raw: z2.any() })))
function readWith({ loadResult: e }) {
  return (
    (e = fromPromise(loadResultSchema.implement(e))),
    (t) => of({ id: t.id, processId: t.processId }).chain(e)
  )
}
function resultWith(e) {
  let t = verifyInputWith(e),
    r = readWith(e)
  return ({ message: n, process: i }) =>
    of({ id: n, processId: i })
      .chain(t)
      .chain(r)
      .map(e.logger.tap('readResult result for message "%s": %O', n))
      .map((e) => e)
      .bimap(errFrom, identity_default)
      .toPromise()
}
var pipe2 =
    (...e) =>
    (t) =>
      e.reduce((e, t) => t(e), t),
  defaultTo3 = (e) => (t) => null == t ? e : t,
  propOr3 = (e) => (t) => pipe2((e) => (e ? e[t] : e), defaultTo3(e)),
  mapObject = (e) => (t) => {
    let r = {}
    for (let n in t) t.hasOwnProperty(n) && (r[n] = e(t[n], n, t))
    return r
  },
  complement =
    (e) =>
    (...t) =>
      !e(...t),
  findProtocolBoundaries = (e) => (t) => {
    let r = t.findIndex((t) => "Data-Protocol" === t.name && t.value === e)
    if (-1 === r) return [0, 0]
    let n = t.findIndex(
      (t, n) => n > r && "Data-Protocol" === t.name && t.value !== e
    )
    return -1 === n && (n = t.length), [r, n]
  },
  findFirstProtocolBoundary = (e) => {
    let t = e.findIndex((e) => "Data-Protocol" === e.name)
    return -1 === t && (t = e.length), t
  },
  byName = (e) => (t) => t.name === e,
  findAll = (e, t) =>
    pipe2(findProtocolBoundaries(e), ([e, r]) => t.slice(e, r))(t),
  findAllByName = (e, t, r) =>
    pipe2(
      (t) => findAll(e, t),
      (e) => e.filter(byName(t))
    )(r),
  findByName = (e, t, r) =>
    pipe2(
      (r) => findAllByName(e, t, r),
      (e) => e[0]
    )(r),
  create = (e, t) =>
    (t = t.filter((t) => "Data-Protocol" !== t.name || t.value !== e)).length
      ? [{ name: "Data-Protocol", value: e }, ...t]
      : [],
  concat3 = (e, t, r) => {
    let [n, i] = findProtocolBoundaries(e)(r),
      [s, a, o] = [r.slice(0, n), r.slice(n, i), r.slice(i)]
    return (
      a.length || ((t = create(e, t)), (s = o), (o = [])), [s, a, t, o].flat(1)
    )
  },
  concatUnassoc = (e, t) => {
    let r = findFirstProtocolBoundary(t),
      [n, i] = [t.slice(0, r), t.slice(r)]
    return [n, e, i].flat(1)
  },
  update = (e, t, r) => {
    let [n, i] = findProtocolBoundaries(e)(r),
      [s, a] = [r.slice(0, n), r.slice(i)]
    return (
      a.length === r.length && ((s = a), (a = [])), [s, create(e, t), a].flat(1)
    )
  },
  removeAll = (e, t) => update(e, [], t),
  removeAllByName = (e, t, r) => {
    let [n, i] = findProtocolBoundaries(e)(r),
      [s, a, o] = [r.slice(0, n), r.slice(n, i), r.slice(i)]
    return [s, create(e, a.filter(complement(byName(t)))), o].flat(1)
  },
  parseTags2 = (e, t = !1) =>
    pipe2(
      defaultTo3([]),
      (e) =>
        e.reduce(
          (e, t) =>
            pipe2(
              propOr3([])(t.name),
              (e) => (e.push(t.value), e),
              (r) => ((e[t.name] = r), e)
            )(e),
          {}
        ),
      mapObject((e) => (t ? e : e[0]))
    )(e),
  parseProtocol = (e, t, r) =>
    pipe2(
      defaultTo3([]),
      (t) => findAll(e, t),
      (e) => parseTags2(e, r)
    )(t),
  parseAll = (e, t) => parseProtocol(e, t, !0),
  parse = (e, t) => parseProtocol(e, t, !1),
  parseUnassoc = (e) => {
    let t = findFirstProtocolBoundary(e)
    return parseTags2(e.slice(0, t), !1)
  },
  parseAllUnassoc = (e) => {
    let t = findFirstProtocolBoundary(e)
    return parseTags2(e.slice(0, t), !0)
  },
  proto = (e) => ({
    findAll: (t) => findAll(e, t),
    findAllByName: (t, r) => findAllByName(e, t, r),
    findByName: (t, r) => findByName(e, t, r),
    create: (t) => create(e, t),
    update: (t, r) => update(e, t, r),
    concat: (t, r) => concat3(e, t, r),
    removeAll: (t) => removeAll(e, t),
    removeAllByName: (t, r) => removeAllByName(e, t, r),
    parse: (t) => parse(e, t),
    parseAll: (t) => parseAll(e, t),
    concatUnassoc,
    parseUnassoc,
    parseAllUnassoc,
  }),
  aoProto = proto("ao"),
  removeAoProtoByName = curry_default(aoProto.removeAllByName),
  concatAoProto = curry_default(aoProto.concat),
  concatUnassoc2 = curry_default(aoProto.concatUnassoc),
  tagSchema2 = z2.array(z2.object({ name: z2.string(), value: z2.string() }))
function buildTagsWith() {
  return (e) =>
    of(e.tags)
      .map(defaultTo_default([]))
      .map(removeAoProtoByName("Variant"))
      .map(removeAoProtoByName("Type"))
      .map(
        concatAoProto([
          { name: "Variant", value: "ao.TN.1" },
          { name: "Type", value: "Message" },
        ])
      )
      .map(tagSchema2.parse)
      .map(assoc_default("tags", __default, e))
}
function buildDataWith({ logger: e }) {
  return (t) =>
    of(t)
      .chain(
        ifElse_default(
          always_default(t.data),
          () => Resolved(t),
          () =>
            Resolved(" ")
              .map(assoc_default("data", __default, t))
              .map((e) =>
                pipe(
                  prop_default("tags"),
                  concatUnassoc2([
                    { name: "Content-Type", value: "text/plain" },
                  ]),
                  assoc_default("tags", __default, e)
                )(e)
              )
              .map(e.tap('added pseudo-random string as message "data"'))
        )
      )
      .map((e) =>
        pipe(
          prop_default("tags"),
          concatUnassoc2([{ name: "SDK", value: "aoconnect" }]),
          assoc_default("tags", __default, e)
        )(e)
      )
}
function uploadMessageWith(e) {
  let t = buildTagsWith(e),
    r = buildDataWith(e),
    n = deployMessageSchema.implement(e.deployMessage)
  return (e) =>
    of(e)
      .chain(t)
      .chain(r)
      .chain(
        fromPromise(({ id: e, data: t, tags: r, anchor: i, signer: s }) =>
          n({
            processId: e,
            data: t,
            tags: r,
            anchor: i,
            signer: signerSchema.implement(s),
          })
        )
      )
      .map((t) => assoc_default("messageId", t.messageId, e))
}
function messageWith(e) {
  let t = uploadMessageWith(e)
  return ({ process: e, data: r, tags: n, anchor: i, signer: s }) =>
    of({ id: e, data: r, tags: n, anchor: i, signer: s })
      .chain(t)
      .map((e) => e.messageId)
      .bimap(errFrom, identity_default)
      .toPromise()
}
var checkTag = (e, t, r) => (n) =>
  t(n[e]) ? Resolved(n) : Rejected(`Tag '${e}': ${r}`)
function verifyModuleWith({ loadTransactionMeta: e, logger: t }) {
  return (
    (e = fromPromise(loadTransactionMetaSchema.implement(e))),
    (r) =>
      of(r)
        .chain(e)
        .map(prop_default("tags"))
        .map(parseTags)
        .chain(
          checkTag(
            "Data-Protocol",
            eqOrIncludes("ao"),
            "value 'ao' was not found on module"
          )
        )
        .chain(
          checkTag(
            "Type",
            eqOrIncludes("Module"),
            "value 'Module' was not found on module"
          )
        )
        .chain(
          checkTag("Module-Format", isNotNil_default, "was not found on module")
        )
        .chain(
          checkTag(
            "Input-Encoding",
            isNotNil_default,
            "was not found on module"
          )
        )
        .chain(
          checkTag(
            "Output-Encoding",
            isNotNil_default,
            "was not found on module"
          )
        )
        .bimap(
          t.tap("Verifying module source failed: %s"),
          t.tap("Verified module source")
        )
  )
}
function verifySchedulerWith({ logger: e, validateScheduler: t }) {
  return (
    (t = fromPromise(validateSchedulerSchema.implement(t))),
    (r) =>
      of(r)
        .chain((e) =>
          t(e).chain((t) =>
            t
              ? Resolved(e)
              : Rejected(`Valid Scheduler-Location owned by ${e} not found`)
          )
        )
        .bimap(
          e.tap("Verifying scheduler failed: %s"),
          e.tap("Verified scheduler")
        )
  )
}
function verifySignerWith({ logger: e }) {
  return (t) =>
    of(t)
      .map(e.tap("Checking for signer"))
      .chain((e) => (e ? Resolved(e) : Rejected("signer not found")))
}
function verifyInputsWith(e) {
  let t = e.logger.child("verifyInput")
  e = { ...e, logger: t }
  let r = verifyModuleWith(e),
    n = verifySchedulerWith(e),
    i = verifySignerWith(e)
  return (e) =>
    of(e)
      .chain((e) => r(e.module).map(() => e))
      .chain((e) => n(e.scheduler))
      .map(() => e)
      .chain((e) => i(e.signer).map(() => e))
      .bimap(
        t.tap("Error when verify input: %s"),
        t.tap("Successfully verified inputs")
      )
}
var aoProto2 = proto("ao"),
  removeAoProtoByName2 = curry_default(aoProto2.removeAllByName),
  concatAoProto2 = curry_default(aoProto2.concat),
  concatUnassoc3 = curry_default(aoProto2.concatUnassoc),
  tagSchema3 = z2.array(z2.object({ name: z2.string(), value: z2.string() }))
function buildTagsWith2() {
  return (e) =>
    of(e)
      .map(prop_default("tags"))
      .map(defaultTo_default([]))
      .map(removeAoProtoByName2("Variant"))
      .map(removeAoProtoByName2("Type"))
      .map(removeAoProtoByName2("Module"))
      .map(removeAoProtoByName2("Scheduler"))
      .map(
        concatAoProto2([
          { name: "Variant", value: "ao.TN.1" },
          { name: "Type", value: "Process" },
          { name: "Module", value: e.module },
          { name: "Scheduler", value: e.scheduler },
        ])
      )
      .map(tagSchema3.parse)
      .map(assoc_default("tags", __default, e))
}
function buildDataWith2({ logger: e }) {
  return (t) =>
    of(t)
      .chain(
        ifElse_default(
          always_default(t.data),
          () => Resolved(t),
          () =>
            Resolved(" ")
              .map(assoc_default("data", __default, t))
              .map((e) =>
                pipe(
                  prop_default("tags"),
                  concatUnassoc3([
                    { name: "Content-Type", value: "text/plain" },
                  ]),
                  assoc_default("tags", __default, e)
                )(e)
              )
              .map(e.tap('added pseudo-random string as process "data"'))
        )
      )
      .map((e) =>
        pipe(
          prop_default("tags"),
          concatUnassoc3([{ name: "SDK", value: "aoconnect" }]),
          assoc_default("tags", __default, e)
        )(e)
      )
}
function uploadProcessWith(e) {
  let t = e.logger.child("uploadProcess")
  e = { ...e, logger: t }
  let r = buildTagsWith2(e),
    n = buildDataWith2(e),
    i = deployProcessSchema.implement(e.deployProcess)
  return (e) =>
    of(e)
      .chain(r)
      .chain(n)
      .chain(
        fromPromise(({ data: e, tags: t, signer: r }) =>
          i({ data: e, tags: t, signer: signerSchema.implement(r) })
        )
      )
      .map((t) => assoc_default("processId", t.processId, e))
}
function spawnWith(e) {
  let t = verifyInputsWith(e),
    r = uploadProcessWith(e)
  return ({ module: e, scheduler: n, signer: i, tags: s, data: a }) =>
    of({ module: e, scheduler: n, signer: i, tags: s, data: a })
      .chain(t)
      .chain(r)
      .map((e) => e.processId)
      .bimap(errFrom, identity_default)
      .toPromise()
}
function uploadMonitorWith(e) {
  let t = deployMonitorSchema.implement(e.deployMonitor)
  return (e) =>
    of(e)
      .chain(
        fromPromise(({ id: e, signer: r }) =>
          t({
            processId: e,
            signer: signerSchema.implement(r),
            data: " ",
            tags: [],
          })
        )
      )
      .map((t) => assoc_default("monitorId", t.messageId, e))
}
function monitorWith(e) {
  let t = uploadMonitorWith(e)
  return ({ process: e, signer: r }) =>
    of({ id: e, signer: r })
      .chain(t)
      .map((e) => e.monitorId)
      .bimap(errFrom, identity_default)
      .toPromise()
}
function uploadUnmonitorWith(e) {
  let t = deployMonitorSchema.implement(e.deployUnmonitor)
  return (e) =>
    of(e)
      .chain(
        fromPromise(({ id: e, signer: r }) =>
          t({
            processId: e,
            signer: signerSchema.implement(r),
            data: " ",
            tags: [],
          })
        )
      )
      .map((t) => assoc_default("monitorId", t.messageId, e))
}
function unmonitorWith(e) {
  let t = uploadUnmonitorWith(e)
  return ({ process: e, signer: r }) =>
    of({ id: e, signer: r })
      .chain(t)
      .map((e) => e.monitorId)
      .bimap(errFrom, identity_default)
      .toPromise()
}
var inputSchema2 = z2.object({
  process: z2.string().min(1, { message: "process identifier is required" }),
  from: z2.string().optional(),
  to: z2.string().optional(),
  sort: z2.enum(["ASC", "DESC"]).default("ASC"),
  limit: z2.number().optional(),
})
function verifyInputWith2() {
  return (e) =>
    of(e)
      .map(inputSchema2.parse)
      .map(() => e)
}
function queryWith({ queryResults: e }) {
  return (
    (e = fromPromise(queryResultsSchema.implement(e))),
    (t) =>
      of({
        process: t.process,
        from: t.from,
        to: t.to,
        sort: t.sort,
        limit: t.limit,
      }).chain(e)
  )
}
function resultsWith(e) {
  let t = verifyInputWith2(e),
    r = queryWith(e)
  return ({ process: n, from: i, to: s, sort: a, limit: o }) =>
    of({ process: n, from: i, to: s, sort: a, limit: o })
      .chain(t)
      .chain(r)
      .map(e.logger.tap('readResults result for message "%s": %O', n))
      .map((e) => e)
      .bimap(errFrom, identity_default)
      .toPromise()
}
var inputSchema3 = z2.object({
  Id: z2.string(),
  Target: z2.string(),
  Owner: z2.string(),
  Anchor: z2.string().optional(),
  Data: z2.any().default("1234"),
  Tags: z2.array(z2.object({ name: z2.string(), value: z2.string() })),
})
function verifyInputWith3() {
  return (e) =>
    of(e)
      .map(inputSchema3.parse)
      .map(
        (e) => (
          (e.Tags = e.Tags.concat([
            { name: "Data-Protocol", value: "ao" },
            { name: "Type", value: "Message" },
            { name: "Variant", value: "ao.TN.1" },
          ])),
          e
        )
      )
}
function runWith({ dryrunFetch: e }) {
  return fromPromise(dryrunResultSchema.implement(e))
}
function dryrunWith(e) {
  let t = verifyInputWith3(e),
    r = runWith(e)
  return (e) => of(e).map(convert).chain(t).chain(r).toPromise()
}
function convert({ process: e, data: t, tags: r, anchor: n, ...i }) {
  return {
    Id: "1234",
    Owner: "1234",
    ...i,
    Target: e,
    Data: t || "1234",
    Tags: r || [],
    Anchor: n || "0",
  }
}
function sendAssignWith(e) {
  let t = deployAssignSchema.implement(e.deployAssign)
  return (e) =>
    of(e)
      .chain(
        fromPromise(({ process: e, message: r, baseLayer: n, exclude: i }) =>
          t({ process: e, message: r, baseLayer: n, exclude: i })
        )
      )
      .map((t) => assoc_default("assignmentId", t.assignmentId, e))
}
function assignWith(e) {
  let t = sendAssignWith(e)
  return ({ process: e, message: r, baseLayer: n, exclude: i }) =>
    of({ process: e, message: r, baseLayer: n, exclude: i })
      .chain(t)
      .map((e) => e.assignmentId)
      .bimap(errFrom, identity_default)
      .toPromise()
}
function serializeCron(e) {
  let t = (function e(t = "") {
      if ("string" != typeof t)
        throw Error("Encountered Error serializing cron: invalid interval")
      let [r, n] = t.split("-").map((e) => e.trim())
      if (!r || !n)
        throw Error("Encountered Error serializing cron: invalid interval")
      if (!parseInt(r) || 0 > parseInt(r))
        throw Error(
          "Encountered Error serializing cron: invalid interval value"
        )
      let i = n.match(
          /^(millisecond|second|minute|hour|day|month|year|block)$/
        ),
        s = n.match(
          /^(milliseconds|seconds|minutes|hours|days|months|years|blocks)$/
        )
      if ((parseInt(r) > 1 && !s) || (1 === parseInt(r) && !i))
        throw Error("Encountered Error serializing cron: invalid interval type")
      return `${r}-${n}`
    })(e.interval),
    r = (function e(t = []) {
      return map_default((e) => {
        if (!e.name || !e.value)
          throw Error(
            "Encountered Error serializing cron: invalid tag structure"
          )
        if ("string" != typeof e.name || "string" != typeof e.value)
          throw Error(
            "Encountered Error serializing cron: invalid interval tag types"
          )
        return { name: `Cron-Tag-${e.name}`, value: e.value }
      }, t)
    })(e.tags)
  return [{ name: "Cron-Interval", value: t }, ...r]
}
var DEFAULT_GATEWAY_URL = "https://arweave.net",
  DEFAULT_MU_URL = "https://mu.ao-testnet.xyz",
  DEFAULT_CU_URL = "https://cu.ao-testnet.xyz"
function connect({
  GRAPHQL_URL: e,
  GRAPHQL_MAX_RETRIES: t,
  GRAPHQL_RETRY_BACKOFF: r,
  GATEWAY_URL: n = DEFAULT_GATEWAY_URL,
  MU_URL: i = DEFAULT_MU_URL,
  CU_URL: s = DEFAULT_CU_URL,
} = {}) {
  let a = createLogger()
  e || (e = joinUrl({ url: n, path: "/graphql" }))
  let { validate: o } = en({
      cacheSize: 100,
      GRAPHQL_URL: e,
      GRAPHQL_MAX_RETRIES: t,
      GRAPHQL_RETRY_BACKOFF: r,
    }),
    u = createProcessMetaCache({ MAX_SIZE: 25 }),
    l = a.child("result"),
    h = resultWith({
      loadResult: loadResultWith({ fetch, CU_URL: s, logger: l }),
      logger: l,
    }),
    S = a.child("message"),
    A = messageWith({
      loadProcessMeta: loadProcessMetaWith({ fetch, cache: u, logger: S }),
      deployMessage: deployMessageWith({ fetch, MU_URL: i, logger: S }),
      logger: S,
    }),
    O = a.child("spawn"),
    L = spawnWith({
      loadTransactionMeta: loadTransactionMetaWith({
        fetch,
        GRAPHQL_URL: e,
        logger: O,
      }),
      validateScheduler: o,
      deployProcess: deployProcessWith({ fetch, MU_URL: i, logger: O }),
      logger: O,
    }),
    V = a.child("monitor"),
    W = monitorWith({
      loadProcessMeta: loadProcessMetaWith({ fetch, cache: u, logger: V }),
      deployMonitor: deployMonitorWith({ fetch, MU_URL: i, logger: V }),
      logger: V,
    }),
    ei = a.child("unmonitor"),
    eo = unmonitorWith({
      loadProcessMeta: loadProcessMetaWith({ fetch, cache: u, logger: ei }),
      deployUnmonitor: deployUnmonitorWith({ fetch, MU_URL: i, logger: ei }),
      logger: V,
    }),
    eu = a.child("results"),
    ed = resultsWith({
      queryResults: queryResultsWith({ fetch, CU_URL: s, logger: eu }),
      logger: eu,
    }),
    ec = a.child("dryrun"),
    ef = dryrunWith({
      dryrunFetch: dryrunFetchWith({ fetch, CU_URL: s, logger: ec }),
      logger: ec,
    }),
    eh = a.child("assign"),
    ep = assignWith({
      deployAssign: deployAssignWith({ fetch, MU_URL: i, logger: eh }),
      logger: S,
    })
  return {
    result: h,
    results: ed,
    message: A,
    spawn: L,
    monitor: W,
    unmonitor: eo,
    dryrun: ef,
    assign: ep,
  }
}
var wallet_exports = {}
__export(wallet_exports, { createDataItemSigner: () => createDataItemSigner })
var import_buffer = __toESM(require_buffer(), 1),
  bundle_exports = {}
__export(bundle_exports, {
  AVSCTap: () => $2,
  ArweaveSigner: () => N2,
  DataItem: () => _2,
  MAX_TAG_BYTES: () => tt2,
  MIN_BINARY_SIZE: () => gr2,
  SIG_CONFIG: () => P2,
  SignatureConfig: () => B,
  Signer: () => ot2,
  createData: () => ge2,
  default: () => wn2,
  deserializeTags: () => Q,
  indexToType: () => wt2,
  serializeTags: () => dt2,
  tagsExceedLimit: () => jr2,
  warparbundles: () => dn2,
})
var xr2 = Object.create,
  it2 = Object.defineProperty,
  mr2 = Object.getOwnPropertyDescriptor,
  Br2 = Object.getOwnPropertyNames,
  Er2 = Object.getPrototypeOf,
  br2 = Object.prototype.hasOwnProperty,
  T2 = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Ar2 = (e, t) => {
    for (var r in t) it2(e, r, { get: t[r], enumerable: !0 })
  },
  Tr2 = (e, t, r, n) => {
    if ((t && "object" == typeof t) || "function" == typeof t)
      for (let i of Br2(t))
        br2.call(e, i) ||
          i === r ||
          it2(e, i, {
            get: () => t[i],
            enumerable: !(n = mr2(t, i)) || n.enumerable,
          })
    return e
  },
  C = (e, t, r) => (
    (r = null != e ? xr2(Er2(e)) : {}),
    Tr2(
      !t && e && e.__esModule
        ? r
        : it2(r, "default", { value: e, enumerable: !0 }),
      e
    )
  ),
  Rt2 = T2((e) => {
    "use strict"
    function t(e) {
      var t = e.length,
        r = t % 4
      if (!r) return e
      var n = t,
        i = 4 - r,
        s = t + i,
        a = Buffer.alloc(s)
      for (a.write(e); i--; ) a.write("=", n++)
      return a.toString()
    }
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = t)
  }),
  Dt2 = T2((e) => {
    "use strict"
    Object.defineProperty(e, "__esModule", { value: !0 })
    var t = Rt2()
    function r(e, t) {
      return (
        void 0 === t && (t = "utf8"),
        Buffer.isBuffer(e)
          ? s(e.toString("base64"))
          : s(Buffer.from(e, t).toString("base64"))
      )
    }
    function n(e, t) {
      return (
        void 0 === t && (t = "utf8"), Buffer.from(i(e), "base64").toString(t)
      )
    }
    function i(e) {
      return (
        (e = e.toString()), t.default(e).replace(/\-/g, "+").replace(/_/g, "/")
      )
    }
    function s(e) {
      return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }
    function a(e) {
      return Buffer.from(i(e), "base64")
    }
    var o = r
    ;(o.encode = r),
      (o.decode = n),
      (o.toBase64 = i),
      (o.fromBase64 = s),
      (o.toBuffer = a),
      (e.default = o)
  }),
  z3 = T2((e, t) => {
    ;(t.exports = Dt2().default), (t.exports.default = t.exports)
  }),
  ct2 = T2((e) => {
    "use strict"
    ;(e.byteLength = u), (e.toByteArray = h), (e.fromByteArray = O)
    var t,
      r,
      n = [],
      i = [],
      s = "u" > typeof Uint8Array ? Uint8Array : Array,
      a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    for (t = 0, r = a.length; t < r; ++t)
      (n[t] = a[t]), (i[a.charCodeAt(t)] = t)
    function o(e) {
      var t = e.length
      if (t % 4 > 0)
        throw Error("Invalid string. Length must be a multiple of 4")
      var r = e.indexOf("=")
      ;-1 === r && (r = t)
      var n = r === t ? 0 : 4 - (r % 4)
      return [r, n]
    }
    function u(e) {
      var t = o(e),
        r = t[0],
        n = t[1]
      return ((r + n) * 3) / 4 - n
    }
    function l(e, t, r) {
      return ((t + r) * 3) / 4 - r
    }
    function h(e) {
      var t,
        r,
        n = o(e),
        a = n[0],
        u = n[1],
        h = new s(l(e, a, u)),
        S = 0,
        A = u > 0 ? a - 4 : a
      for (r = 0; r < A; r += 4)
        (t =
          (i[e.charCodeAt(r)] << 18) |
          (i[e.charCodeAt(r + 1)] << 12) |
          (i[e.charCodeAt(r + 2)] << 6) |
          i[e.charCodeAt(r + 3)]),
          (h[S++] = (t >> 16) & 255),
          (h[S++] = (t >> 8) & 255),
          (h[S++] = 255 & t)
      return (
        2 === u &&
          ((t = (i[e.charCodeAt(r)] << 2) | (i[e.charCodeAt(r + 1)] >> 4)),
          (h[S++] = 255 & t)),
        1 === u &&
          ((t =
            (i[e.charCodeAt(r)] << 10) |
            (i[e.charCodeAt(r + 1)] << 4) |
            (i[e.charCodeAt(r + 2)] >> 2)),
          (h[S++] = (t >> 8) & 255),
          (h[S++] = 255 & t)),
        h
      )
    }
    function S(e) {
      return (
        n[(e >> 18) & 63] + n[(e >> 12) & 63] + n[(e >> 6) & 63] + n[63 & e]
      )
    }
    function A(e, t, r) {
      for (var n, i = [], s = t; s < r; s += 3)
        i.push(
          S(
            (n =
              ((e[s] << 16) & 16711680) +
              ((e[s + 1] << 8) & 65280) +
              (255 & e[s + 2]))
          )
        )
      return i.join("")
    }
    function O(e) {
      for (
        var t, r = e.length, i = r % 3, s = [], a = 0, o = r - i;
        a < o;
        a += 16383
      )
        s.push(A(e, a, a + 16383 > o ? o : a + 16383))
      return (
        1 === i
          ? s.push(n[(t = e[r - 1]) >> 2] + n[(t << 4) & 63] + "==")
          : 2 === i &&
            s.push(
              n[(t = (e[r - 2] << 8) + e[r - 1]) >> 10] +
                n[(t >> 4) & 63] +
                n[(t << 2) & 63] +
                "="
            ),
        s.join("")
      )
    }
    ;(i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63)
  }),
  pt2 = T2((e) => {
    "use strict"
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.b64UrlDecode =
        e.b64UrlEncode =
        e.bufferTob64Url =
        e.bufferTob64 =
        e.b64UrlToBuffer =
        e.stringToB64Url =
        e.stringToBuffer =
        e.bufferToString =
        e.b64UrlToString =
        e.concatBuffers =
          void 0)
    var t = ct2()
    function r(e) {
      let t = 0
      for (let r = 0; r < e.length; r++) t += e[r].byteLength
      let n = new Uint8Array(t),
        i = 0
      n.set(new Uint8Array(e[0]), i), (i += e[0].byteLength)
      for (let s = 1; s < e.length; s++)
        n.set(new Uint8Array(e[s]), i), (i += e[s].byteLength)
      return n
    }
    function n(e) {
      let t = o(e)
      return i(t)
    }
    function i(e) {
      return new TextDecoder("utf-8", { fatal: !0 }).decode(e)
    }
    function s(e) {
      return new TextEncoder().encode(e)
    }
    function a(e) {
      return l(s(e))
    }
    function o(e) {
      return new Uint8Array(t.toByteArray(S(e)))
    }
    function u(e) {
      return t.fromByteArray(new Uint8Array(e))
    }
    function l(e) {
      return h(u(e))
    }
    function h(e) {
      return e.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "")
    }
    function S(e) {
      let t
      return (
        (t =
          (e = e.replace(/\-/g, "+").replace(/\_/g, "/")).length % 4 == 0
            ? 0
            : 4 - (e.length % 4)),
        e.concat("=".repeat(t))
      )
    }
    ;(e.concatBuffers = r),
      (e.b64UrlToString = n),
      (e.bufferToString = i),
      (e.stringToBuffer = s),
      (e.stringToB64Url = a),
      (e.b64UrlToBuffer = o),
      (e.bufferTob64 = u),
      (e.bufferTob64Url = l),
      (e.b64UrlEncode = h),
      (e.b64UrlDecode = S)
  }),
  Yt = T2((e) => {
    "use strict"
    Object.defineProperty(e, "__esModule", { value: !0 })
    var t = pt2(),
      r = class {
        keyLength = 4096
        publicExponent = 65537
        hashAlgorithm = "sha256"
        driver
        constructor() {
          if (!this.detectWebCrypto())
            throw Error("SubtleCrypto not available!")
          this.driver = crypto.subtle
        }
        async generateJWK() {
          let e = await this.driver.exportKey(
            "jwk",
            (
              await this.driver.generateKey(
                {
                  name: "RSA-PSS",
                  modulusLength: 4096,
                  publicExponent: new Uint8Array([1, 0, 1]),
                  hash: { name: "SHA-256" },
                },
                !0,
                ["sign"]
              )
            ).privateKey
          )
          return {
            kty: e.kty,
            e: e.e,
            n: e.n,
            d: e.d,
            p: e.p,
            q: e.q,
            dp: e.dp,
            dq: e.dq,
            qi: e.qi,
          }
        }
        async sign(e, t, { saltLength: r } = {}) {
          let n = await this.driver.sign(
            { name: "RSA-PSS", saltLength: 32 },
            await this.jwkToCryptoKey(e),
            t
          )
          return new Uint8Array(n)
        }
        async hash(e, t = "SHA-256") {
          let r = await this.driver.digest(t, e)
          return new Uint8Array(r)
        }
        async verify(e, t, r) {
          let n = await this.jwkToPublicCryptoKey({
              kty: "RSA",
              e: "AQAB",
              n: e,
            }),
            i = await this.driver.digest("SHA-256", t),
            s = await this.driver.verify(
              { name: "RSA-PSS", saltLength: 0 },
              n,
              r,
              t
            ),
            a = await this.driver.verify(
              { name: "RSA-PSS", saltLength: 32 },
              n,
              r,
              t
            ),
            o = await this.driver.verify(
              {
                name: "RSA-PSS",
                saltLength:
                  Math.ceil((n.algorithm.modulusLength - 1) / 8) -
                  i.byteLength -
                  2,
              },
              n,
              r,
              t
            )
          return s || a || o
        }
        async jwkToCryptoKey(e) {
          return this.driver.importKey(
            "jwk",
            e,
            { name: "RSA-PSS", hash: { name: "SHA-256" } },
            !1,
            ["sign"]
          )
        }
        async jwkToPublicCryptoKey(e) {
          return this.driver.importKey(
            "jwk",
            e,
            { name: "RSA-PSS", hash: { name: "SHA-256" } },
            !1,
            ["verify"]
          )
        }
        detectWebCrypto() {
          if (typeof crypto > "u") return !1
          let e = crypto?.subtle
          return (
            void 0 !== e &&
            ["generateKey", "importKey", "exportKey", "digest", "sign"].every(
              (t) => "function" == typeof e[t]
            )
          )
        }
        async encrypt(e, r, n) {
          let i = await this.driver.deriveKey(
              {
                name: "PBKDF2",
                salt: n ? t.stringToBuffer(n) : t.stringToBuffer("salt"),
                iterations: 1e5,
                hash: "SHA-256",
              },
              await this.driver.importKey(
                "raw",
                "string" == typeof r ? t.stringToBuffer(r) : r,
                { name: "PBKDF2", length: 32 },
                !1,
                ["deriveKey"]
              ),
              { name: "AES-CBC", length: 256 },
              !1,
              ["encrypt", "decrypt"]
            ),
            s = new Uint8Array(16)
          crypto.getRandomValues(s)
          let a = await this.driver.encrypt({ name: "AES-CBC", iv: s }, i, e)
          return t.concatBuffers([s, a])
        }
        async decrypt(e, r, n) {
          let i,
            s = await this.driver.decrypt(
              { name: "AES-CBC", iv: e.slice(0, 16) },
              await this.driver.deriveKey(
                {
                  name: "PBKDF2",
                  salt: n ? t.stringToBuffer(n) : t.stringToBuffer("salt"),
                  iterations: 1e5,
                  hash: "SHA-256",
                },
                await this.driver.importKey(
                  "raw",
                  "string" == typeof r ? t.stringToBuffer(r) : r,
                  { name: "PBKDF2", length: 32 },
                  !1,
                  ["deriveKey"]
                ),
                { name: "AES-CBC", length: 256 },
                !1,
                ["encrypt", "decrypt"]
              ),
              e.slice(16)
            )
          return t.concatBuffers([s])
        }
      }
    e.default = r
  }),
  zt2 = T2((e) => {
    ;(e.read = function (e, t, r, n, i) {
      var s,
        a,
        o = 8 * i - n - 1,
        u = (1 << o) - 1,
        l = u >> 1,
        h = -7,
        S = r ? i - 1 : 0,
        A = r ? -1 : 1,
        O = e[t + S]
      for (
        S += A, s = O & ((1 << -h) - 1), O >>= -h, h += o;
        h > 0;
        s = 256 * s + e[t + S], S += A, h -= 8
      );
      for (
        a = s & ((1 << -h) - 1), s >>= -h, h += n;
        h > 0;
        a = 256 * a + e[t + S], S += A, h -= 8
      );
      if (0 === s) s = 1 - l
      else {
        if (s === u) return a ? NaN : (O ? -1 : 1) * (1 / 0)
        ;(a += Math.pow(2, n)), (s -= l)
      }
      return (O ? -1 : 1) * a * Math.pow(2, s - n)
    }),
      (e.write = function (e, t, r, n, i, s) {
        var a,
          o,
          u,
          l = 8 * s - i - 1,
          h = (1 << l) - 1,
          S = h >> 1,
          A = 23 === i ? 5960464477539062e-23 : 0,
          O = n ? 0 : s - 1,
          L = n ? 1 : -1,
          V = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0
        for (
          isNaN((t = Math.abs(t))) || t === 1 / 0
            ? ((o = isNaN(t) ? 1 : 0), (a = h))
            : ((a = Math.floor(Math.log(t) / Math.LN2)),
              t * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
              a + S >= 1 ? (t += A / u) : (t += A * Math.pow(2, 1 - S)),
              t * u >= 2 && (a++, (u /= 2)),
              a + S >= h
                ? ((o = 0), (a = h))
                : a + S >= 1
                ? ((o = (t * u - 1) * Math.pow(2, i)), (a += S))
                : ((o = t * Math.pow(2, S - 1) * Math.pow(2, i)), (a = 0)));
          i >= 8;
          e[r + O] = 255 & o, O += L, o /= 256, i -= 8
        );
        for (
          a = (a << i) | o, l += i;
          l > 0;
          e[r + O] = 255 & a, O += L, a /= 256, l -= 8
        );
        e[r + O - L] |= 128 * V
      })
  }),
  nt2 = T2((e) => {
    "use strict"
    var t = ct2(),
      r = zt2(),
      n =
        "function" == typeof Symbol && "function" == typeof Symbol.for
          ? Symbol.for("nodejs.util.inspect.custom")
          : null
    ;(e.Buffer = o), (e.SlowBuffer = eo), (e.INSPECT_MAX_BYTES = 50)
    var i = 2147483647
    function s() {
      try {
        let e = new Uint8Array(1),
          t = {
            foo: function () {
              return 42
            },
          }
        return (
          Object.setPrototypeOf(t, Uint8Array.prototype),
          Object.setPrototypeOf(e, t),
          42 === e.foo()
        )
      } catch {
        return !1
      }
    }
    function a(e) {
      if (e > i)
        throw RangeError('The value "' + e + '" is invalid for option "size"')
      let t = new Uint8Array(e)
      return Object.setPrototypeOf(t, o.prototype), t
    }
    function o(e, t, r) {
      if ("number" == typeof e) {
        if ("string" == typeof t)
          throw TypeError(
            'The "string" argument must be of type string. Received type number'
          )
        return S(e)
      }
      return u(e, t, r)
    }
    function u(e, t, r) {
      if ("string" == typeof e) return A(e, t)
      if (ArrayBuffer.isView(e)) return L(e)
      if (null == e)
        throw TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof e
        )
      if (
        ez(e, ArrayBuffer) ||
        (e && ez(e.buffer, ArrayBuffer)) ||
        ("u" > typeof SharedArrayBuffer &&
          (ez(e, SharedArrayBuffer) || (e && ez(e.buffer, SharedArrayBuffer))))
      )
        return V(e, t, r)
      if ("number" == typeof e)
        throw TypeError(
          'The "value" argument must not be of type number. Received type number'
        )
      let n = e.valueOf && e.valueOf()
      if (null != n && n !== e) return o.from(n, t, r)
      let i = W(e)
      if (i) return i
      if (
        "u" > typeof Symbol &&
        null != Symbol.toPrimitive &&
        "function" == typeof e[Symbol.toPrimitive]
      )
        return o.from(e[Symbol.toPrimitive]("string"), t, r)
      throw TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof e
      )
    }
    function l(e) {
      if ("number" != typeof e)
        throw TypeError('"size" argument must be of type number')
      if (e < 0)
        throw RangeError('The value "' + e + '" is invalid for option "size"')
    }
    function h(e, t, r) {
      return (
        l(e),
        e <= 0
          ? a(e)
          : void 0 !== t
          ? "string" == typeof r
            ? a(e).fill(t, r)
            : a(e).fill(t)
          : a(e)
      )
    }
    function S(e) {
      return l(e), a(e < 0 ? 0 : 0 | ei(e))
    }
    function A(e, t) {
      if (
        (("string" != typeof t || "" === t) && (t = "utf8"), !o.isEncoding(t))
      )
        throw TypeError("Unknown encoding: " + t)
      let r = 0 | eu(e, t),
        n = a(r),
        i = n.write(e, t)
      return i !== r && (n = n.slice(0, i)), n
    }
    function O(e) {
      let t = e.length < 0 ? 0 : 0 | ei(e.length),
        r = a(t)
      for (let n = 0; n < t; n += 1) r[n] = 255 & e[n]
      return r
    }
    function L(e) {
      if (ez(e, Uint8Array)) {
        let t = new Uint8Array(e)
        return V(t.buffer, t.byteOffset, t.byteLength)
      }
      return O(e)
    }
    function V(e, t, r) {
      if (t < 0 || e.byteLength < t)
        throw RangeError('"offset" is outside of buffer bounds')
      if (e.byteLength < t + (r || 0))
        throw RangeError('"length" is outside of buffer bounds')
      let n
      return (
        Object.setPrototypeOf(
          (n =
            void 0 === t && void 0 === r
              ? new Uint8Array(e)
              : void 0 === r
              ? new Uint8Array(e, t)
              : new Uint8Array(e, t, r)),
          o.prototype
        ),
        n
      )
    }
    function W(e) {
      if (o.isBuffer(e)) {
        let t = 0 | ei(e.length),
          r = a(t)
        return 0 === r.length || e.copy(r, 0, 0, t), r
      }
      return void 0 !== e.length
        ? "number" != typeof e.length || eM(e.length)
          ? a(0)
          : O(e)
        : "Buffer" === e.type && Array.isArray(e.data)
        ? O(e.data)
        : void 0
    }
    function ei(e) {
      if (e >= i)
        throw RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
            i.toString(16) +
            " bytes"
        )
      return 0 | e
    }
    function eo(e) {
      return +e != e && (e = 0), o.alloc(+e)
    }
    function eu(e, t) {
      if (o.isBuffer(e)) return e.length
      if (ArrayBuffer.isView(e) || ez(e, ArrayBuffer)) return e.byteLength
      if ("string" != typeof e)
        throw TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof e
        )
      let r = e.length,
        n = arguments.length > 2 && !0 === arguments[2]
      if (!n && 0 === r) return 0
      let i = !1
      for (;;)
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return r
          case "utf8":
          case "utf-8":
            return e3(e).length
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * r
          case "hex":
            return r >>> 1
          case "base64":
            return eF(e).length
          default:
            if (i) return n ? -1 : e3(e).length
            ;(t = ("" + t).toLowerCase()), (i = !0)
        }
    }
    function ed(e, t, r) {
      let n = !1
      if (
        ((void 0 === t || t < 0) && (t = 0),
        t > this.length ||
          ((void 0 === r || r > this.length) && (r = this.length), r <= 0) ||
          (r >>>= 0) <= (t >>>= 0))
      )
        return ""
      for (e || (e = "utf8"); ; )
        switch (e) {
          case "hex":
            return eT(this, t, r)
          case "utf8":
          case "utf-8":
            return ev(this, t, r)
          case "ascii":
            return e0(this, t, r)
          case "latin1":
          case "binary":
            return e_(this, t, r)
          case "base64":
            return e8(this, t, r)
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ex(this, t, r)
          default:
            if (n) throw TypeError("Unknown encoding: " + e)
            ;(e = (e + "").toLowerCase()), (n = !0)
        }
    }
    function ec(e, t, r) {
      let n = e[t]
      ;(e[t] = e[r]), (e[r] = n)
    }
    function ef(e, t, r, n, i) {
      if (0 === e.length) return -1
      if (
        ("string" == typeof r
          ? ((n = r), (r = 0))
          : r > 2147483647
          ? (r = 2147483647)
          : r < -2147483648 && (r = -2147483648),
        eM((r = +r)) && (r = i ? 0 : e.length - 1),
        r < 0 && (r = e.length + r),
        r >= e.length)
      ) {
        if (i) return -1
        r = e.length - 1
      } else if (r < 0) {
        if (!i) return -1
        r = 0
      }
      if (("string" == typeof t && (t = o.from(t, n)), o.isBuffer(t)))
        return 0 === t.length ? -1 : eh(e, t, r, n, i)
      if ("number" == typeof t)
        return (
          (t &= 255),
          "function" == typeof Uint8Array.prototype.indexOf
            ? i
              ? Uint8Array.prototype.indexOf.call(e, t, r)
              : Uint8Array.prototype.lastIndexOf.call(e, t, r)
            : eh(e, [t], r, n, i)
        )
      throw TypeError("val must be string, number or Buffer")
    }
    function eh(e, t, r, n, i) {
      let s = 1,
        a = e.length,
        o = t.length
      if (
        void 0 !== n &&
        ("ucs2" === (n = String(n).toLowerCase()) ||
          "ucs-2" === n ||
          "utf16le" === n ||
          "utf-16le" === n)
      ) {
        if (e.length < 2 || t.length < 2) return -1
        ;(s = 2), (a /= 2), (o /= 2), (r /= 2)
      }
      function u(e, t) {
        return 1 === s ? e[t] : e.readUInt16BE(t * s)
      }
      let l
      if (i) {
        let h = -1
        for (l = r; l < a; l++)
          if (u(e, l) === u(t, -1 === h ? 0 : l - h)) {
            if ((-1 === h && (h = l), l - h + 1 === o)) return h * s
          } else -1 !== h && (l -= l - h), (h = -1)
      } else
        for (r + o > a && (r = a - o), l = r; l >= 0; l--) {
          let S = !0
          for (let A = 0; A < o; A++)
            if (u(e, l + A) !== u(t, A)) {
              S = !1
              break
            }
          if (S) return l
        }
      return -1
    }
    function ep(e, t, r, n) {
      r = Number(r) || 0
      let i = e.length - r
      n ? (n = Number(n)) > i && (n = i) : (n = i)
      let s = t.length
      n > s / 2 && (n = s / 2)
      let a
      for (a = 0; a < n; ++a) {
        let o = parseInt(t.substr(2 * a, 2), 16)
        if (eM(o)) break
        e[r + a] = o
      }
      return a
    }
    function ey(e, t, r, n) {
      return e6(e3(t, e.length - r), e, r, n)
    }
    function em(e, t, r, n) {
      return e6(e2(t), e, r, n)
    }
    function eg(e, t, r, n) {
      return e6(eF(t), e, r, n)
    }
    function e$(e, t, r, n) {
      return e6(eB(t, e.length - r), e, r, n)
    }
    function e8(e, r, n) {
      return 0 === r && n === e.length
        ? t.fromByteArray(e)
        : t.fromByteArray(e.slice(r, n))
    }
    function ev(e, t, r) {
      r = Math.min(e.length, r)
      let n = [],
        i = t
      for (; i < r; ) {
        let s = e[i],
          a = null,
          o = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1
        if (i + o <= r) {
          let u, l, h, S
          switch (o) {
            case 1:
              s < 128 && (a = s)
              break
            case 2:
              ;(192 & (u = e[i + 1])) == 128 &&
                (S = ((31 & s) << 6) | (63 & u)) > 127 &&
                (a = S)
              break
            case 3:
              ;(u = e[i + 1]),
                (l = e[i + 2]),
                (192 & u) == 128 &&
                  (192 & l) == 128 &&
                  (S = ((15 & s) << 12) | ((63 & u) << 6) | (63 & l)) > 2047 &&
                  (S < 55296 || S > 57343) &&
                  (a = S)
              break
            case 4:
              ;(u = e[i + 1]),
                (l = e[i + 2]),
                (h = e[i + 3]),
                (192 & u) == 128 &&
                  (192 & l) == 128 &&
                  (192 & h) == 128 &&
                  (S =
                    ((15 & s) << 18) |
                    ((63 & u) << 12) |
                    ((63 & l) << 6) |
                    (63 & h)) > 65535 &&
                  S < 1114112 &&
                  (a = S)
          }
        }
        null === a
          ? ((a = 65533), (o = 1))
          : a > 65535 &&
            ((a -= 65536),
            n.push(((a >>> 10) & 1023) | 55296),
            (a = 56320 | (1023 & a))),
          n.push(a),
          (i += o)
      }
      return ew(n)
    }
    ;(e.kMaxLength = i),
      (o.TYPED_ARRAY_SUPPORT = s()),
      !o.TYPED_ARRAY_SUPPORT &&
        "u" > typeof console &&
        "function" == typeof console.error &&
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        ),
      Object.defineProperty(o.prototype, "parent", {
        enumerable: !0,
        get: function () {
          if (o.isBuffer(this)) return this.buffer
        },
      }),
      Object.defineProperty(o.prototype, "offset", {
        enumerable: !0,
        get: function () {
          if (o.isBuffer(this)) return this.byteOffset
        },
      }),
      (o.poolSize = 8192),
      (o.from = function (e, t, r) {
        return u(e, t, r)
      }),
      Object.setPrototypeOf(o.prototype, Uint8Array.prototype),
      Object.setPrototypeOf(o, Uint8Array),
      (o.alloc = function (e, t, r) {
        return h(e, t, r)
      }),
      (o.allocUnsafe = function (e) {
        return S(e)
      }),
      (o.allocUnsafeSlow = function (e) {
        return S(e)
      }),
      (o.isBuffer = function (e) {
        return null != e && !0 === e._isBuffer && e !== o.prototype
      }),
      (o.compare = function (e, t) {
        if (
          (ez(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)),
          ez(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)),
          !o.isBuffer(e) || !o.isBuffer(t))
        )
          throw TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          )
        if (e === t) return 0
        let r = e.length,
          n = t.length
        for (let i = 0, s = Math.min(r, n); i < s; ++i)
          if (e[i] !== t[i]) {
            ;(r = e[i]), (n = t[i])
            break
          }
        return r < n ? -1 : n < r ? 1 : 0
      }),
      (o.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0
          default:
            return !1
        }
      }),
      (o.concat = function (e, t) {
        if (!Array.isArray(e))
          throw TypeError('"list" argument must be an Array of Buffers')
        if (0 === e.length) return o.alloc(0)
        let r
        if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length
        let n = o.allocUnsafe(t),
          i = 0
        for (r = 0; r < e.length; ++r) {
          let s = e[r]
          if (ez(s, Uint8Array))
            i + s.length > n.length
              ? (o.isBuffer(s) || (s = o.from(s)), s.copy(n, i))
              : Uint8Array.prototype.set.call(n, s, i)
          else if (o.isBuffer(s)) s.copy(n, i)
          else throw TypeError('"list" argument must be an Array of Buffers')
          i += s.length
        }
        return n
      }),
      (o.byteLength = eu),
      (o.prototype._isBuffer = !0),
      (o.prototype.swap16 = function () {
        let e = this.length
        if (e % 2 != 0)
          throw RangeError("Buffer size must be a multiple of 16-bits")
        for (let t = 0; t < e; t += 2) ec(this, t, t + 1)
        return this
      }),
      (o.prototype.swap32 = function () {
        let e = this.length
        if (e % 4 != 0)
          throw RangeError("Buffer size must be a multiple of 32-bits")
        for (let t = 0; t < e; t += 4)
          ec(this, t, t + 3), ec(this, t + 1, t + 2)
        return this
      }),
      (o.prototype.swap64 = function () {
        let e = this.length
        if (e % 8 != 0)
          throw RangeError("Buffer size must be a multiple of 64-bits")
        for (let t = 0; t < e; t += 8)
          ec(this, t, t + 7),
            ec(this, t + 1, t + 6),
            ec(this, t + 2, t + 5),
            ec(this, t + 3, t + 4)
        return this
      }),
      (o.prototype.toString = function () {
        let e = this.length
        return 0 === e
          ? ""
          : 0 === arguments.length
          ? ev(this, 0, e)
          : ed.apply(this, arguments)
      }),
      (o.prototype.toLocaleString = o.prototype.toString),
      (o.prototype.equals = function (e) {
        if (!o.isBuffer(e)) throw TypeError("Argument must be a Buffer")
        return this === e || 0 === o.compare(this, e)
      }),
      (o.prototype.inspect = function () {
        let t = "",
          r = e.INSPECT_MAX_BYTES
        return (
          (t = this.toString("hex", 0, r)
            .replace(/(.{2})/g, "$1 ")
            .trim()),
          this.length > r && (t += " ... "),
          "<Buffer " + t + ">"
        )
      }),
      n && (o.prototype[n] = o.prototype.inspect),
      (o.prototype.compare = function (e, t, r, n, i) {
        if (
          (ez(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)),
          !o.isBuffer(e))
        )
          throw TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
              typeof e
          )
        if (
          (void 0 === t && (t = 0),
          void 0 === r && (r = e ? e.length : 0),
          void 0 === n && (n = 0),
          void 0 === i && (i = this.length),
          t < 0 || r > e.length || n < 0 || i > this.length)
        )
          throw RangeError("out of range index")
        if (n >= i && t >= r) return 0
        if (n >= i) return -1
        if (t >= r) return 1
        if (((t >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === e))
          return 0
        let s = i - n,
          a = r - t,
          u = Math.min(s, a),
          l = this.slice(n, i),
          h = e.slice(t, r)
        for (let S = 0; S < u; ++S)
          if (l[S] !== h[S]) {
            ;(s = l[S]), (a = h[S])
            break
          }
        return s < a ? -1 : a < s ? 1 : 0
      }),
      (o.prototype.includes = function (e, t, r) {
        return -1 !== this.indexOf(e, t, r)
      }),
      (o.prototype.indexOf = function (e, t, r) {
        return ef(this, e, t, r, !0)
      }),
      (o.prototype.lastIndexOf = function (e, t, r) {
        return ef(this, e, t, r, !1)
      }),
      (o.prototype.write = function (e, t, r, n) {
        if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0)
        else if (void 0 === r && "string" == typeof t)
          (n = t), (r = this.length), (t = 0)
        else if (isFinite(t))
          (t >>>= 0),
            isFinite(r)
              ? ((r >>>= 0), void 0 === n && (n = "utf8"))
              : ((n = r), (r = void 0))
        else
          throw Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          )
        let i = this.length - t
        if (
          ((void 0 === r || r > i) && (r = i),
          (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
        )
          throw RangeError("Attempt to write outside buffer bounds")
        n || (n = "utf8")
        let s = !1
        for (;;)
          switch (n) {
            case "hex":
              return ep(this, e, t, r)
            case "utf8":
            case "utf-8":
              return ey(this, e, t, r)
            case "ascii":
            case "latin1":
            case "binary":
              return em(this, e, t, r)
            case "base64":
              return eg(this, e, t, r)
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return e$(this, e, t, r)
            default:
              if (s) throw TypeError("Unknown encoding: " + n)
              ;(n = ("" + n).toLowerCase()), (s = !0)
          }
      }),
      (o.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0),
        }
      })
    var eb = 4096
    function ew(e) {
      let t = e.length
      if (t <= eb) return String.fromCharCode.apply(String, e)
      let r = "",
        n = 0
      for (; n < t; )
        r += String.fromCharCode.apply(String, e.slice(n, (n += eb)))
      return r
    }
    function e0(e, t, r) {
      let n = ""
      r = Math.min(e.length, r)
      for (let i = t; i < r; ++i) n += String.fromCharCode(127 & e[i])
      return n
    }
    function e_(e, t, r) {
      let n = ""
      r = Math.min(e.length, r)
      for (let i = t; i < r; ++i) n += String.fromCharCode(e[i])
      return n
    }
    function eT(e, t, r) {
      let n = e.length
      ;(!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n)
      let i = ""
      for (let s = t; s < r; ++s) i += eD[e[s]]
      return i
    }
    function ex(e, t, r) {
      let n = e.slice(t, r),
        i = ""
      for (let s = 0; s < n.length - 1; s += 2)
        i += String.fromCharCode(n[s] + 256 * n[s + 1])
      return i
    }
    function eZ(e, t, r) {
      if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint")
      if (e + t > r) throw RangeError("Trying to access beyond buffer length")
    }
    function eC(e, t, r, n, i, s) {
      if (!o.isBuffer(e))
        throw TypeError('"buffer" argument must be a Buffer instance')
      if (t > i || t < s) throw RangeError('"value" argument is out of bounds')
      if (r + n > e.length) throw RangeError("Index out of range")
    }
    function ek(e, t, r, n, i) {
      eL(t, n, i, e, r, 7)
      let s = Number(t & BigInt(4294967295))
      ;(e[r++] = s),
        (s >>= 8),
        (e[r++] = s),
        (s >>= 8),
        (e[r++] = s),
        (s >>= 8),
        (e[r++] = s)
      let a = Number((t >> BigInt(32)) & BigInt(4294967295))
      return (
        (e[r++] = a),
        (a >>= 8),
        (e[r++] = a),
        (a >>= 8),
        (e[r++] = a),
        (a >>= 8),
        (e[r++] = a),
        r
      )
    }
    function eI(e, t, r, n, i) {
      eL(t, n, i, e, r, 7)
      let s = Number(t & BigInt(4294967295))
      ;(e[r + 7] = s),
        (s >>= 8),
        (e[r + 6] = s),
        (s >>= 8),
        (e[r + 5] = s),
        (s >>= 8),
        (e[r + 4] = s)
      let a = Number((t >> BigInt(32)) & BigInt(4294967295))
      return (
        (e[r + 3] = a),
        (a >>= 8),
        (e[r + 2] = a),
        (a >>= 8),
        (e[r + 1] = a),
        (a >>= 8),
        (e[r] = a),
        r + 8
      )
    }
    function eS(e, t, r, n, i, s) {
      if (r + n > e.length || r < 0) throw RangeError("Index out of range")
    }
    function eP(e, t, n, i, s) {
      return (
        (t = +t),
        (n >>>= 0),
        s || eS(e, t, n, 4, 34028234663852886e22, -34028234663852886e22),
        r.write(e, t, n, i, 23, 4),
        n + 4
      )
    }
    function eA(e, t, n, i, s) {
      return (
        (t = +t),
        (n >>>= 0),
        s || eS(e, t, n, 8, 17976931348623157e292, -17976931348623157e292),
        r.write(e, t, n, i, 52, 8),
        n + 8
      )
    }
    ;(o.prototype.slice = function (e, t) {
      let r = this.length
      ;(e = ~~e),
        (t = void 0 === t ? r : ~~t),
        e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
        t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
        t < e && (t = e)
      let n = this.subarray(e, t)
      return Object.setPrototypeOf(n, o.prototype), n
    }),
      (o.prototype.readUintLE = o.prototype.readUIntLE =
        function (e, t, r) {
          ;(e >>>= 0), (t >>>= 0), r || eZ(e, t, this.length)
          let n = this[e],
            i = 1,
            s = 0
          for (; ++s < t && (i *= 256); ) n += this[e + s] * i
          return n
        }),
      (o.prototype.readUintBE = o.prototype.readUIntBE =
        function (e, t, r) {
          ;(e >>>= 0), (t >>>= 0), r || eZ(e, t, this.length)
          let n = this[e + --t],
            i = 1
          for (; t > 0 && (i *= 256); ) n += this[e + --t] * i
          return n
        }),
      (o.prototype.readUint8 = o.prototype.readUInt8 =
        function (e, t) {
          return (e >>>= 0), t || eZ(e, 1, this.length), this[e]
        }),
      (o.prototype.readUint16LE = o.prototype.readUInt16LE =
        function (e, t) {
          return (
            (e >>>= 0), t || eZ(e, 2, this.length), this[e] | (this[e + 1] << 8)
          )
        }),
      (o.prototype.readUint16BE = o.prototype.readUInt16BE =
        function (e, t) {
          return (
            (e >>>= 0), t || eZ(e, 2, this.length), (this[e] << 8) | this[e + 1]
          )
        }),
      (o.prototype.readUint32LE = o.prototype.readUInt32LE =
        function (e, t) {
          return (
            (e >>>= 0),
            t || eZ(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
              16777216 * this[e + 3]
          )
        }),
      (o.prototype.readUint32BE = o.prototype.readUInt32BE =
        function (e, t) {
          return (
            (e >>>= 0),
            t || eZ(e, 4, this.length),
            16777216 * this[e] +
              ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          )
        }),
      (o.prototype.readBigUInt64LE = e9(function (e) {
        e1((e >>>= 0), "offset")
        let t = this[e],
          r = this[e + 7]
        ;(void 0 === t || void 0 === r) && eU(e, this.length - 8)
        let n = t + 256 * this[++e] + 65536 * this[++e] + 16777216 * this[++e],
          i = this[++e] + 256 * this[++e] + 65536 * this[++e] + 16777216 * r
        return BigInt(n) + (BigInt(i) << BigInt(32))
      })),
      (o.prototype.readBigUInt64BE = e9(function (e) {
        e1((e >>>= 0), "offset")
        let t = this[e],
          r = this[e + 7]
        ;(void 0 === t || void 0 === r) && eU(e, this.length - 8)
        let n = 16777216 * t + 65536 * this[++e] + 256 * this[++e] + this[++e],
          i = 16777216 * this[++e] + 65536 * this[++e] + 256 * this[++e] + r
        return (BigInt(n) << BigInt(32)) + BigInt(i)
      })),
      (o.prototype.readIntLE = function (e, t, r) {
        ;(e >>>= 0), (t >>>= 0), r || eZ(e, t, this.length)
        let n = this[e],
          i = 1,
          s = 0
        for (; ++s < t && (i *= 256); ) n += this[e + s] * i
        return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n
      }),
      (o.prototype.readIntBE = function (e, t, r) {
        ;(e >>>= 0), (t >>>= 0), r || eZ(e, t, this.length)
        let n = t,
          i = 1,
          s = this[e + --n]
        for (; n > 0 && (i *= 256); ) s += this[e + --n] * i
        return s >= (i *= 128) && (s -= Math.pow(2, 8 * t)), s
      }),
      (o.prototype.readInt8 = function (e, t) {
        return (
          (e >>>= 0),
          t || eZ(e, 1, this.length),
          128 & this[e] ? -((255 - this[e] + 1) * 1) : this[e]
        )
      }),
      (o.prototype.readInt16LE = function (e, t) {
        ;(e >>>= 0), t || eZ(e, 2, this.length)
        let r = this[e] | (this[e + 1] << 8)
        return 32768 & r ? 4294901760 | r : r
      }),
      (o.prototype.readInt16BE = function (e, t) {
        ;(e >>>= 0), t || eZ(e, 2, this.length)
        let r = this[e + 1] | (this[e] << 8)
        return 32768 & r ? 4294901760 | r : r
      }),
      (o.prototype.readInt32LE = function (e, t) {
        return (
          (e >>>= 0),
          t || eZ(e, 4, this.length),
          this[e] |
            (this[e + 1] << 8) |
            (this[e + 2] << 16) |
            (this[e + 3] << 24)
        )
      }),
      (o.prototype.readInt32BE = function (e, t) {
        return (
          (e >>>= 0),
          t || eZ(e, 4, this.length),
          (this[e] << 24) |
            (this[e + 1] << 16) |
            (this[e + 2] << 8) |
            this[e + 3]
        )
      }),
      (o.prototype.readBigInt64LE = e9(function (e) {
        e1((e >>>= 0), "offset")
        let t = this[e],
          r = this[e + 7]
        return (
          (void 0 === t || void 0 === r) && eU(e, this.length - 8),
          (BigInt(
            this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (r << 24)
          ) <<
            BigInt(32)) +
            BigInt(
              t + 256 * this[++e] + 65536 * this[++e] + 16777216 * this[++e]
            )
        )
      })),
      (o.prototype.readBigInt64BE = e9(function (e) {
        e1((e >>>= 0), "offset")
        let t = this[e],
          r = this[e + 7]
        return (
          (void 0 === t || void 0 === r) && eU(e, this.length - 8),
          (BigInt(
            (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e]
          ) <<
            BigInt(32)) +
            BigInt(
              16777216 * this[++e] + 65536 * this[++e] + 256 * this[++e] + r
            )
        )
      })),
      (o.prototype.readFloatLE = function (e, t) {
        return (
          (e >>>= 0), t || eZ(e, 4, this.length), r.read(this, e, !0, 23, 4)
        )
      }),
      (o.prototype.readFloatBE = function (e, t) {
        return (
          (e >>>= 0), t || eZ(e, 4, this.length), r.read(this, e, !1, 23, 4)
        )
      }),
      (o.prototype.readDoubleLE = function (e, t) {
        return (
          (e >>>= 0), t || eZ(e, 8, this.length), r.read(this, e, !0, 52, 8)
        )
      }),
      (o.prototype.readDoubleBE = function (e, t) {
        return (
          (e >>>= 0), t || eZ(e, 8, this.length), r.read(this, e, !1, 52, 8)
        )
      }),
      (o.prototype.writeUintLE = o.prototype.writeUIntLE =
        function (e, t, r, n) {
          if (((e = +e), (t >>>= 0), (r >>>= 0), !n)) {
            let i = Math.pow(2, 8 * r) - 1
            eC(this, e, t, r, i, 0)
          }
          let s = 1,
            a = 0
          for (this[t] = 255 & e; ++a < r && (s *= 256); )
            this[t + a] = (e / s) & 255
          return t + r
        }),
      (o.prototype.writeUintBE = o.prototype.writeUIntBE =
        function (e, t, r, n) {
          if (((e = +e), (t >>>= 0), (r >>>= 0), !n)) {
            let i = Math.pow(2, 8 * r) - 1
            eC(this, e, t, r, i, 0)
          }
          let s = r - 1,
            a = 1
          for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
            this[t + s] = (e / a) & 255
          return t + r
        }),
      (o.prototype.writeUint8 = o.prototype.writeUInt8 =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || eC(this, e, t, 1, 255, 0),
            (this[t] = 255 & e),
            t + 1
          )
        }),
      (o.prototype.writeUint16LE = o.prototype.writeUInt16LE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || eC(this, e, t, 2, 65535, 0),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            t + 2
          )
        }),
      (o.prototype.writeUint16BE = o.prototype.writeUInt16BE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || eC(this, e, t, 2, 65535, 0),
            (this[t] = e >>> 8),
            (this[t + 1] = 255 & e),
            t + 2
          )
        }),
      (o.prototype.writeUint32LE = o.prototype.writeUInt32LE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || eC(this, e, t, 4, 4294967295, 0),
            (this[t + 3] = e >>> 24),
            (this[t + 2] = e >>> 16),
            (this[t + 1] = e >>> 8),
            (this[t] = 255 & e),
            t + 4
          )
        }),
      (o.prototype.writeUint32BE = o.prototype.writeUInt32BE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || eC(this, e, t, 4, 4294967295, 0),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e),
            t + 4
          )
        }),
      (o.prototype.writeBigUInt64LE = e9(function (e, t = 0) {
        return ek(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
      })),
      (o.prototype.writeBigUInt64BE = e9(function (e, t = 0) {
        return eI(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
      })),
      (o.prototype.writeIntLE = function (e, t, r, n) {
        if (((e = +e), (t >>>= 0), !n)) {
          let i = Math.pow(2, 8 * r - 1)
          eC(this, e, t, r, i - 1, -i)
        }
        let s = 0,
          a = 1,
          o = 0
        for (this[t] = 255 & e; ++s < r && (a *= 256); )
          e < 0 && 0 === o && 0 !== this[t + s - 1] && (o = 1),
            (this[t + s] = (((e / a) >> 0) - o) & 255)
        return t + r
      }),
      (o.prototype.writeIntBE = function (e, t, r, n) {
        if (((e = +e), (t >>>= 0), !n)) {
          let i = Math.pow(2, 8 * r - 1)
          eC(this, e, t, r, i - 1, -i)
        }
        let s = r - 1,
          a = 1,
          o = 0
        for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
          e < 0 && 0 === o && 0 !== this[t + s + 1] && (o = 1),
            (this[t + s] = (((e / a) >> 0) - o) & 255)
        return t + r
      }),
      (o.prototype.writeInt8 = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || eC(this, e, t, 1, 127, -128),
          e < 0 && (e = 255 + e + 1),
          (this[t] = 255 & e),
          t + 1
        )
      }),
      (o.prototype.writeInt16LE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || eC(this, e, t, 2, 32767, -32768),
          (this[t] = 255 & e),
          (this[t + 1] = e >>> 8),
          t + 2
        )
      }),
      (o.prototype.writeInt16BE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || eC(this, e, t, 2, 32767, -32768),
          (this[t] = e >>> 8),
          (this[t + 1] = 255 & e),
          t + 2
        )
      }),
      (o.prototype.writeInt32LE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || eC(this, e, t, 4, 2147483647, -2147483648),
          (this[t] = 255 & e),
          (this[t + 1] = e >>> 8),
          (this[t + 2] = e >>> 16),
          (this[t + 3] = e >>> 24),
          t + 4
        )
      }),
      (o.prototype.writeInt32BE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || eC(this, e, t, 4, 2147483647, -2147483648),
          e < 0 && (e = 4294967295 + e + 1),
          (this[t] = e >>> 24),
          (this[t + 1] = e >>> 16),
          (this[t + 2] = e >>> 8),
          (this[t + 3] = 255 & e),
          t + 4
        )
      }),
      (o.prototype.writeBigInt64LE = e9(function (e, t = 0) {
        return ek(
          this,
          e,
          t,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff")
        )
      })),
      (o.prototype.writeBigInt64BE = e9(function (e, t = 0) {
        return eI(
          this,
          e,
          t,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff")
        )
      })),
      (o.prototype.writeFloatLE = function (e, t, r) {
        return eP(this, e, t, !0, r)
      }),
      (o.prototype.writeFloatBE = function (e, t, r) {
        return eP(this, e, t, !1, r)
      }),
      (o.prototype.writeDoubleLE = function (e, t, r) {
        return eA(this, e, t, !0, r)
      }),
      (o.prototype.writeDoubleBE = function (e, t, r) {
        return eA(this, e, t, !1, r)
      }),
      (o.prototype.copy = function (e, t, r, n) {
        if (!o.isBuffer(e)) throw TypeError("argument should be a Buffer")
        if (
          (r || (r = 0),
          n || 0 === n || (n = this.length),
          t >= e.length && (t = e.length),
          t || (t = 0),
          n > 0 && n < r && (n = r),
          n === r || 0 === e.length || 0 === this.length)
        )
          return 0
        if (t < 0) throw RangeError("targetStart out of bounds")
        if (r < 0 || r >= this.length) throw RangeError("Index out of range")
        if (n < 0) throw RangeError("sourceEnd out of bounds")
        n > this.length && (n = this.length),
          e.length - t < n - r && (n = e.length - t + r)
        let i = n - r
        return (
          this === e && "function" == typeof Uint8Array.prototype.copyWithin
            ? this.copyWithin(t, r, n)
            : Uint8Array.prototype.set.call(e, this.subarray(r, n), t),
          i
        )
      }),
      (o.prototype.fill = function (e, t, r, n) {
        if ("string" == typeof e) {
          if (
            ("string" == typeof t
              ? ((n = t), (t = 0), (r = this.length))
              : "string" == typeof r && ((n = r), (r = this.length)),
            void 0 !== n && "string" != typeof n)
          )
            throw TypeError("encoding must be a string")
          if ("string" == typeof n && !o.isEncoding(n))
            throw TypeError("Unknown encoding: " + n)
          if (1 === e.length) {
            let i = e.charCodeAt(0)
            ;(("utf8" === n && i < 128) || "latin1" === n) && (e = i)
          }
        } else
          "number" == typeof e
            ? (e &= 255)
            : "boolean" == typeof e && (e = Number(e))
        if (t < 0 || this.length < t || this.length < r)
          throw RangeError("Out of range index")
        if (r <= t) return this
        ;(t >>>= 0), (r = void 0 === r ? this.length : r >>> 0), e || (e = 0)
        let s
        if ("number" == typeof e) for (s = t; s < r; ++s) this[s] = e
        else {
          let a = o.isBuffer(e) ? e : o.from(e, n),
            u = a.length
          if (0 === u)
            throw TypeError(
              'The value "' + e + '" is invalid for argument "value"'
            )
          for (s = 0; s < r - t; ++s) this[s + t] = a[s % u]
        }
        return this
      })
    var eE = {}
    function eR(e, t, r) {
      eE[e] = class extends r {
        constructor() {
          super(),
            Object.defineProperty(this, "message", {
              value: t.apply(this, arguments),
              writable: !0,
              configurable: !0,
            }),
            (this.name = `${this.name} [${e}]`),
            this.stack,
            delete this.name
        }
        get code() {
          return e
        }
        set code(e) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: e,
            writable: !0,
          })
        }
        toString() {
          return `${this.name} [${e}]: ${this.message}`
        }
      }
    }
    function e4(e) {
      let t = "",
        r = e.length,
        n = "-" === e[0] ? 1 : 0
      for (; r >= n + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`
      return `${e.slice(0, r)}${t}`
    }
    function eO(e, t, r) {
      e1(t, "offset"),
        (void 0 === e[t] || void 0 === e[t + r]) && eU(t, e.length - (r + 1))
    }
    function eL(e, t, r, n, i, s) {
      if (e > r || e < t) {
        let a = "bigint" == typeof t ? "n" : "",
          o
        throw (
          ((o =
            s > 3
              ? 0 === t || t === BigInt(0)
                ? `>= 0${a} and < 2${a} ** ${(s + 1) * 8}${a}`
                : `>= -(2${a} ** ${(s + 1) * 8 - 1}${a}) and < 2 ** ${
                    (s + 1) * 8 - 1
                  }${a}`
              : `>= ${t}${a} and <= ${r}${a}`),
          new eE.ERR_OUT_OF_RANGE("value", o, e))
        )
      }
      eO(n, i, s)
    }
    function e1(e, t) {
      if ("number" != typeof e)
        throw new eE.ERR_INVALID_ARG_TYPE(t, "number", e)
    }
    function eU(e, t, r) {
      throw Math.floor(e) !== e
        ? (e1(e, r), new eE.ERR_OUT_OF_RANGE(r || "offset", "an integer", e))
        : t < 0
        ? new eE.ERR_BUFFER_OUT_OF_BOUNDS()
        : new eE.ERR_OUT_OF_RANGE(
            r || "offset",
            `>= ${r ? 1 : 0} and <= ${t}`,
            e
          )
    }
    eR(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function (e) {
        return e
          ? `${e} is outside of buffer bounds`
          : "Attempt to access memory outside buffer bounds"
      },
      RangeError
    ),
      eR(
        "ERR_INVALID_ARG_TYPE",
        function (e, t) {
          return `The "${e}" argument must be of type number. Received type ${typeof t}`
        },
        TypeError
      ),
      eR(
        "ERR_OUT_OF_RANGE",
        function (e, t, r) {
          let n = `The value of "${e}" is out of range.`,
            i = r
          return (
            Number.isInteger(r) && Math.abs(r) > 4294967296
              ? (i = e4(String(r)))
              : "bigint" == typeof r &&
                ((i = String(r)),
                (r > BigInt(2) ** BigInt(32) ||
                  r < -(BigInt(2) ** BigInt(32))) &&
                  (i = e4(i)),
                (i += "n")),
            (n += ` It must be ${t}. Received ${i}`)
          )
        },
        RangeError
      )
    var ej = /[^+/0-9A-Za-z-_]/g
    function eN(e) {
      if ((e = (e = e.split("=")[0]).trim().replace(ej, "")).length < 2)
        return ""
      for (; e.length % 4 != 0; ) e += "="
      return e
    }
    function e3(e, t) {
      t = t || 1 / 0
      let r,
        n = e.length,
        i = null,
        s = []
      for (let a = 0; a < n; ++a) {
        if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
          if (!i) {
            if (r > 56319 || a + 1 === n) {
              ;(t -= 3) > -1 && s.push(239, 191, 189)
              continue
            }
            i = r
            continue
          }
          if (r < 56320) {
            ;(t -= 3) > -1 && s.push(239, 191, 189), (i = r)
            continue
          }
          r = (((i - 55296) << 10) | (r - 56320)) + 65536
        } else i && (t -= 3) > -1 && s.push(239, 191, 189)
        if (((i = null), r < 128)) {
          if ((t -= 1) < 0) break
          s.push(r)
        } else if (r < 2048) {
          if ((t -= 2) < 0) break
          s.push((r >> 6) | 192, (63 & r) | 128)
        } else if (r < 65536) {
          if ((t -= 3) < 0) break
          s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128)
        } else if (r < 1114112) {
          if ((t -= 4) < 0) break
          s.push(
            (r >> 18) | 240,
            ((r >> 12) & 63) | 128,
            ((r >> 6) & 63) | 128,
            (63 & r) | 128
          )
        } else throw Error("Invalid code point")
      }
      return s
    }
    function e2(e) {
      let t = []
      for (let r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r))
      return t
    }
    function eB(e, t) {
      let r,
        n,
        i,
        s = []
      for (let a = 0; a < e.length && !((t -= 2) < 0); ++a)
        (n = (r = e.charCodeAt(a)) >> 8), (i = r % 256), s.push(i), s.push(n)
      return s
    }
    function eF(e) {
      return t.toByteArray(eN(e))
    }
    function e6(e, t, r, n) {
      let i
      for (i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i)
        t[i + r] = e[i]
      return i
    }
    function ez(e, t) {
      return (
        e instanceof t ||
        (null != e &&
          null != e.constructor &&
          null != e.constructor.name &&
          e.constructor.name === t.name)
      )
    }
    function eM(e) {
      return e != e
    }
    var eD = (function () {
      let e = "0123456789abcdef",
        t = Array(256)
      for (let r = 0; r < 16; ++r) {
        let n = 16 * r
        for (let i = 0; i < 16; ++i) t[n + i] = e[r] + e[i]
      }
      return t
    })()
    function e9(e) {
      return typeof BigInt > "u" ? e7 : e
    }
    function e7() {
      throw Error("BigInt not supported")
    }
  }),
  pr2 = T2((e, t) => {
    "u" > typeof window
      ? ((window.global = window),
        (global.fetch = window.fetch),
        (t.exports = { Buffer: nt2().Buffer, Crypto: window.crypto }))
      : (t.exports = { Buffer: nt2().Buffer, Crypto: crypto })
  }),
  Lt2 = {}
Ar2(Lt2, {
  AVSCTap: () => $2,
  ArweaveSigner: () => N2,
  DataItem: () => _2,
  MAX_TAG_BYTES: () => tt2,
  MIN_BINARY_SIZE: () => gr2,
  SIG_CONFIG: () => P2,
  SignatureConfig: () => B,
  Signer: () => ot2,
  createData: () => ge2,
  deserializeTags: () => Q,
  indexToType: () => wt2,
  serializeTags: () => dt2,
  tagsExceedLimit: () => jr2,
})
var ot2 = class {
    signer
    publicKey
    signatureType
    signatureLength
    ownerLength
    pem
    static verify(e, t, r, n) {
      throw Error("You must implement verify method on child")
    }
  },
  vt2 = C(z3(), 1),
  w2 = C(pt2(), 1)
async function X2(e) {
  if (Array.isArray(e))
    return await Gt2(
      e,
      await x2().hash(
        (0, w2.concatBuffers)([
          (0, w2.stringToBuffer)("list"),
          (0, w2.stringToBuffer)(e.length.toString()),
        ]),
        "SHA-384"
      )
    )
  let t = e,
    r
  return await x2().hash(
    (0, w2.concatBuffers)([
      await x2().hash(
        (0, w2.concatBuffers)([
          (0, w2.stringToBuffer)("blob"),
          (0, w2.stringToBuffer)(t.byteLength.toString()),
        ]),
        "SHA-384"
      ),
      await x2().hash(t, "SHA-384"),
    ]),
    "SHA-384"
  )
}
async function Gt2(e, t) {
  return e.length < 1
    ? t
    : await Gt2(
        e.slice(1),
        await x2().hash((0, w2.concatBuffers)([t, await X2(e[0])]), "SHA-384")
      )
}
var Z2 = C(Yt(), 1),
  $r2 = Z2.default.default ? Z2.default.default : Z2.default,
  yt2 = class extends $r2 {
    getPublicKey(e) {
      throw Error("Unimplemented")
    }
  }
function x2() {
  return (Kr2 ??= new yt2())
}
!(function (e) {
  ;(e[(e.ARWEAVE = 1)] = "ARWEAVE"),
    (e[(e.ED25519 = 2)] = "ED25519"),
    (e[(e.ETHEREUM = 3)] = "ETHEREUM"),
    (e[(e.SOLANA = 4)] = "SOLANA"),
    (e[(e.INJECTEDAPTOS = 5)] = "INJECTEDAPTOS"),
    (e[(e.MULTIAPTOS = 6)] = "MULTIAPTOS"),
    (e[(e.TYPEDETHEREUM = 7)] = "TYPEDETHEREUM")
})(B || (B = {}))
var P2 = {
    [B.ARWEAVE]: { sigLength: 512, pubLength: 512, sigName: "arweave" },
    [B.ED25519]: { sigLength: 64, pubLength: 32, sigName: "ed25519" },
    [B.ETHEREUM]: { sigLength: 65, pubLength: 65, sigName: "ethereum" },
    [B.SOLANA]: { sigLength: 64, pubLength: 32, sigName: "solana" },
    [B.INJECTEDAPTOS]: {
      sigLength: 64,
      pubLength: 32,
      sigName: "injectedAptos",
    },
    [B.MULTIAPTOS]: { sigLength: 2052, pubLength: 1025, sigName: "multiAptos" },
    [B.TYPEDETHEREUM]: {
      sigLength: 65,
      pubLength: 42,
      sigName: "typedEthereum",
    },
  },
  N2 = class {
    signatureType = 1
    ownerLength = P2[1].pubLength
    signatureLength = P2[1].sigLength
    jwk
    pk
    constructor(e) {
      ;(this.pk = e.n), (this.jwk = e)
    }
    get publicKey() {
      return vt2.default.toBuffer(this.pk)
    }
    sign(e) {
      return x2().sign(this.jwk, e)
    }
    static async verify(e, t, r) {
      return await x2().verify(e, t, r)
    }
  },
  wt2 = { 1: N2 },
  E2 = C(z3(), 1)
async function v(e) {
  return X2([
    (0, w2.stringToBuffer)("dataitem"),
    (0, w2.stringToBuffer)("1"),
    (0, w2.stringToBuffer)(e.signatureType.toString()),
    e.rawOwner,
    e.rawTarget,
    e.rawAnchor,
    e.rawTags,
    e.rawData,
  ])
}
async function Hr2(e, t) {
  let r = await t.sign(await v(e)),
    n = await x2().hash(r)
  return { signature: Buffer.from(r), id: Buffer.from(n) }
}
async function Wt2(e, t) {
  let { signature: r, id: n } = await Hr2(e, t)
  return e.getRaw().set(r, 2), n
}
var $2 = class {
  buf
  pos
  constructor(e = Buffer.alloc(tt2), t = 0) {
    ;(this.buf = e), (this.pos = t)
  }
  writeTags(e) {
    if (!Array.isArray(e)) throw Error("input must be array")
    let t = e.length,
      r
    if (t)
      for (this.writeLong(t), r = 0; r < t; r++) {
        let n = e[r]
        if (n?.name === void 0 || n?.value === void 0)
          throw Error(
            `Invalid tag format for ${n}, expected {name:string, value: string}`
          )
        this.writeString(n.name), this.writeString(n.value)
      }
    this.writeLong(0)
  }
  toBuffer() {
    let e = Buffer.alloc(this.pos)
    if (this.pos > this.buf.length)
      throw Error(`Too many tag bytes (${this.pos} > ${this.buf.length})`)
    return this.buf.copy(e, 0, 0, this.pos), e
  }
  tagsExceedLimit() {
    return this.pos > this.buf.length
  }
  writeLong(e) {
    let t = this.buf,
      r,
      n
    if (e >= -1073741824 && e < 1073741824) {
      n = e >= 0 ? e << 1 : (~e << 1) | 1
      do (t[this.pos] = 127 & n), (n >>= 7)
      while (n && (t[this.pos++] |= 128))
    } else {
      r = e >= 0 ? 2 * e : -(2 * e) - 1
      do (t[this.pos] = 127 & r), (r /= 128)
      while (r >= 1 && (t[this.pos++] |= 128))
    }
    this.pos++, (this.buf = t)
  }
  writeString(e) {
    let t = Buffer.byteLength(e),
      r = this.buf
    this.writeLong(t)
    let n = this.pos
    if (((this.pos += t), !(this.pos > r.length))) {
      if (t > 64) this.buf.write(e, this.pos - t, t, "utf8")
      else {
        let i, s, a, o
        for (i = 0, s = t; i < s; i++)
          (a = e.charCodeAt(i)) < 128
            ? (r[n++] = a)
            : a < 2048
            ? ((r[n++] = (a >> 6) | 192), (r[n++] = (63 & a) | 128))
            : (64512 & a) == 55296 &&
              (64512 & (o = e.charCodeAt(i + 1))) == 56320
            ? ((a = 65536 + ((1023 & a) << 10) + (1023 & o)),
              i++,
              (r[n++] = (a >> 18) | 240),
              (r[n++] = ((a >> 12) & 63) | 128),
              (r[n++] = ((a >> 6) & 63) | 128),
              (r[n++] = (63 & a) | 128))
            : ((r[n++] = (a >> 12) | 224),
              (r[n++] = ((a >> 6) & 63) | 128),
              (r[n++] = (63 & a) | 128))
      }
      this.buf = r
    }
  }
  readLong() {
    let e = 0,
      t = 0,
      r = this.buf,
      n,
      i,
      s,
      a
    do (i = 128 & (n = r[this.pos++])), (e |= (127 & n) << t), (t += 7)
    while (i && t < 28)
    if (i) {
      ;(s = e), (a = 268435456)
      do (s += (127 & (n = r[this.pos++])) * a), (a *= 128)
      while (128 & n)
      return (s % 2 ? -(s + 1) : s) / 2
    }
    return (e >> 1) ^ -(1 & e)
  }
  skipLong() {
    let e = this.buf
    for (; 128 & e[this.pos++]; );
  }
  readTags() {
    let e = [],
      t
    for (; (t = this.readLong()); )
      for (t < 0 && ((t = -t), this.skipLong()); t--; ) {
        let r = this.readString(),
          n = this.readString()
        e.push({ name: r, value: n })
      }
    return e
  }
  readString() {
    let e = this.readLong(),
      t = this.pos,
      r = this.buf
    if (((this.pos += e), !(this.pos > r.length)))
      return this.buf.slice(t, t + e).toString()
  }
}
function dt2(e) {
  let t = new $2()
  return t.writeTags(e), t.toBuffer()
}
function jr2(e) {
  let t = new $2()
  return t.writeTags(e), t.tagsExceedLimit()
}
function Q(e) {
  return new $2(e).readTags()
}
function I(e) {
  let t = 0
  for (let r = e.length - 1; r >= 0; r--) t = 256 * t + e[r]
  return t
}
function Vt2(e) {
  if (e > 29) throw Error("Short too long")
  let t = [0, 0]
  for (let r = 0; r < t.length; r++) {
    let n = 255 & e
    ;(t[r] = n), (e = (e - n) / 256)
  }
  return Uint8Array.from(t)
}
function xt2(e) {
  let t = [0, 0, 0, 0, 0, 0, 0, 0]
  for (let r = 0; r < t.length; r++) {
    let n = 255 & e
    ;(t[r] = n), (e = (e - n) / 256)
  }
  return Uint8Array.from(t)
}
var lr2 = C(pr2(), 1),
  M2 = C(nt2(), 1),
  tt2 = 4096,
  gr2 = 80,
  _2 = class {
    binary
    _id
    constructor(e) {
      this.binary = e
    }
    static isDataItem(e) {
      return void 0 !== e.binary
    }
    get signatureType() {
      let e = I(this.binary.subarray(0, 2))
      if (B?.[e] !== void 0) return e
      throw Error("Unknown signature type: " + e)
    }
    async isValid() {
      return _2.verify(this.binary)
    }
    get id() {
      return (async () => E2.default.encode(await this.rawId))()
    }
    set id(e) {
      this._id = E2.default.toBuffer(e)
    }
    get rawId() {
      return (async () =>
        M2.Buffer.from(
          await lr2.Crypto.subtle.digest("SHA-256", this.rawSignature)
        ))()
    }
    set rawId(e) {
      this._id = e
    }
    get rawSignature() {
      return this.binary.subarray(2, 2 + this.signatureLength)
    }
    get signature() {
      return E2.default.encode(this.rawSignature)
    }
    set rawOwner(e) {
      if (e.byteLength != this.ownerLength)
        throw Error(
          `Expected raw owner (pubkey) to be ${this.ownerLength} bytes, got ${e.byteLength} bytes.`
        )
      this.binary.set(e, 2 + this.signatureLength)
    }
    get rawOwner() {
      return this.binary.subarray(
        2 + this.signatureLength,
        2 + this.signatureLength + this.ownerLength
      )
    }
    get signatureLength() {
      return P2[this.signatureType].sigLength
    }
    get owner() {
      return E2.default.encode(this.rawOwner)
    }
    get ownerLength() {
      return P2[this.signatureType].pubLength
    }
    get rawTarget() {
      let e = this.getTargetStart()
      return 1 == this.binary[e]
        ? this.binary.subarray(e + 1, e + 33)
        : M2.Buffer.alloc(0)
    }
    get target() {
      return E2.default.encode(this.rawTarget)
    }
    get rawAnchor() {
      let e = this.getAnchorStart()
      return 1 == this.binary[e]
        ? this.binary.subarray(e + 1, e + 33)
        : M2.Buffer.alloc(0)
    }
    get anchor() {
      return this.rawAnchor.toString()
    }
    get rawTags() {
      let e = this.getTagsStart(),
        t = I(this.binary.subarray(e + 8, e + 16))
      return this.binary.subarray(e + 16, e + 16 + t)
    }
    get tags() {
      let e = this.getTagsStart()
      if (0 == I(this.binary.subarray(e, e + 8))) return []
      let t = I(this.binary.subarray(e + 8, e + 16))
      return Q(M2.Buffer.from(this.binary.subarray(e + 16, e + 16 + t)))
    }
    get tagsB64Url() {
      return this.tags.map((e) => ({
        name: E2.default.encode(e.name),
        value: E2.default.encode(e.value),
      }))
    }
    getStartOfData() {
      let e = this.getTagsStart(),
        t = I(this.binary.subarray(e + 8, e + 16))
      return e + 16 + t
    }
    get rawData() {
      let e = this.getTagsStart(),
        t = I(this.binary.subarray(e + 8, e + 16))
      return this.binary.subarray(e + 16 + t, this.binary.length)
    }
    get data() {
      return E2.default.encode(this.rawData)
    }
    getRaw() {
      return this.binary
    }
    async sign(e) {
      return (this._id = await Wt2(this, e)), this.rawId
    }
    async setSignature(e) {
      this.binary.set(e, 2), (this._id = M2.Buffer.from(await x2().hash(e)))
    }
    isSigned() {
      return (this._id?.length ?? 0) > 0
    }
    toJSON() {
      return {
        signature: this.signature,
        owner: this.owner,
        target: this.target,
        tags: this.tags.map((e) => ({
          name: E2.default.encode(e.name),
          value: E2.default.encode(e.value),
        })),
        data: this.data,
      }
    }
    static async verify(e) {
      if (e.byteLength < gr2) return !1
      let t = new _2(e),
        r = t.signatureType,
        n = t.getTagsStart(),
        i = I(e.subarray(n, n + 8)),
        s = I(e.subarray(n + 8, n + 16))
      if (s > tt2) return !1
      if (i > 0)
        try {
          if (Q(M2.Buffer.from(e.subarray(n + 16, n + 16 + s))).length !== i)
            return !1
        } catch {
          return !1
        }
      let a
      return await wt2[r].verify(t.rawOwner, await v(t), t.rawSignature)
    }
    async getSignatureData() {
      return v(this)
    }
    getTagsStart() {
      let e = this.getTargetStart(),
        t = 1 == this.binary[e],
        r = e + (t ? 33 : 1),
        n = 1 == this.binary[r]
      return r + (n ? 33 : 1)
    }
    getTargetStart() {
      return 2 + this.signatureLength + this.ownerLength
    }
    getAnchorStart() {
      let e
      return (
        this.getTargetStart() +
        1 +
        (1 == this.binary[this.getTargetStart()] ? 32 : 0)
      )
    }
  },
  yr2 = C(z3(), 1)
function ge2(e, t, r) {
  let n = t.publicKey,
    i = r?.target ? yr2.default.toBuffer(r.target) : null,
    s = 1 + (i?.byteLength ?? 0),
    a = r?.anchor ? Buffer.from(r.anchor) : null,
    o = 1 + (a?.byteLength ?? 0),
    u = (r?.tags?.length ?? 0) > 0 ? dt2(r.tags) : null,
    l = 16 + (u ? u.byteLength : 0),
    h = Buffer.from(e),
    S = h.byteLength,
    A = 2 + t.signatureLength + t.ownerLength + s + o + l + S,
    O = Buffer.alloc(A)
  if (
    (O.set(Vt2(t.signatureType), 0),
    O.set(new Uint8Array(t.signatureLength).fill(0), 2),
    n.byteLength !== t.ownerLength)
  )
    throw Error(
      `Owner must be ${t.ownerLength} bytes, but was incorrectly ${n.byteLength}`
    )
  O.set(n, 2 + t.signatureLength)
  let L = 2 + t.signatureLength + t.ownerLength
  if (((O[L] = i ? 1 : 0), i)) {
    if (32 !== i.byteLength)
      throw Error(`Target must be 32 bytes but was incorrectly ${i.byteLength}`)
    O.set(i, L + 1)
  }
  let V = L + s,
    W = V + 1
  if (((O[V] = a ? 1 : 0), a)) {
    if (((W += a.byteLength), 32 !== a.byteLength))
      throw Error("Anchor must be 32 bytes")
    O.set(a, V + 1)
  }
  O.set(xt2(r?.tags?.length ?? 0), W)
  let ei = xt2(u?.byteLength ?? 0)
  O.set(ei, W + 8), u && O.set(u, W + 16)
  let eo = W + l
  return O.set(h, eo), new _2(O)
}
var _t2 = { ...Lt2 }
globalThis.arbundles ??= _t2
var wn2 = _t2,
  dn2 = _t2
globalThis.Buffer || (globalThis.Buffer = import_buffer.Buffer)
var { DataItem: r } = bundle_exports
function createDataItemSigner(e) {
  let t = async ({
    data: t,
    tags: n,
    target: i,
    anchor: s,
    createDataItem: a = (e) => new r(e),
  }) => {
    let o = await e.signDataItem({ data: t, tags: n, target: i, anchor: s }),
      u = a(import_buffer.Buffer.from(o))
    return { id: await u.id, raw: await u.getRaw() }
  }
  return t
}
var GATEWAY_URL = globalThis.GATEWAY_URL || void 0,
  MU_URL = globalThis.MU_URL || void 0,
  CU_URL = globalThis.CU_URL || void 0,
  GRAPHQL_URL = globalThis.GRAPHQL_URL || void 0,
  GRAPHQL_MAX_RETRIES = globalThis.GRAPHQL_MAX_RETRIES || void 0,
  GRAPHQL_RETRY_BACKOFF = globalThis.GRAPHQL_RETRY_BACKOFF || void 0,
  {
    result: n,
    results: i,
    message: s,
    spawn: a,
    monitor: o,
    unmonitor: u,
    dryrun: l,
    assign: h,
  } = connect({
    GATEWAY_URL,
    MU_URL,
    CU_URL,
    GRAPHQL_URL,
    GRAPHQL_MAX_RETRIES,
    GRAPHQL_RETRY_BACKOFF,
  }),
  createDataItemSigner2 = wallet_exports.createDataItemSigner
export {
  h as assign,
  connect,
  createDataItemSigner2 as createDataItemSigner,
  l as dryrun,
  s as message,
  o as monitor,
  n as result,
  i as results,
  serializeCron,
  a as spawn,
  u as unmonitor,
} /*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

warp-arbundles/build/web/esm/bundle.js:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
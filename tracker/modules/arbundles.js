var xr = Object.create
var it = Object.defineProperty
var mr = Object.getOwnPropertyDescriptor
var Br = Object.getOwnPropertyNames
var Er = Object.getPrototypeOf,
  br = Object.prototype.hasOwnProperty
var T = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Ar = (e, t) => {
    for (var r in t) it(e, r, { get: t[r], enumerable: !0 })
  },
  Tr = (e, t, r, n) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of Br(t))
        !br.call(e, i) &&
          i !== r &&
          it(e, i, {
            get: () => t[i],
            enumerable: !(n = mr(t, i)) || n.enumerable
          })
    return e
  }
var C = (e, t, r) => (
  (r = e != null ? xr(Er(e)) : {}),
  Tr(t || !e || !e.__esModule ? it(r, 'default', { value: e, enumerable: !0 }) : r, e)
)
var Rt = T((st) => {
  'use strict'
  Object.defineProperty(st, '__esModule', { value: !0 })
  function Ir(e) {
    var t = 4,
      r = e.length,
      n = r % t
    if (!n) return e
    var i = r,
      o = t - n,
      s = r + o,
      u = Buffer.alloc(s)
    for (u.write(e); o--; ) u.write('=', i++)
    return u.toString()
  }
  st.default = Ir
})
var Dt = T((ht) => {
  'use strict'
  Object.defineProperty(ht, '__esModule', { value: !0 })
  var Sr = Rt()
  function Ct(e, t) {
    return (
      t === void 0 && (t = 'utf8'),
      Buffer.isBuffer(e) ? at(e.toString('base64')) : at(Buffer.from(e, t).toString('base64'))
    )
  }
  function Ur(e, t) {
    return t === void 0 && (t = 'utf8'), Buffer.from(ut(e), 'base64').toString(t)
  }
  function ut(e) {
    return (e = e.toString()), Sr.default(e).replace(/\-/g, '+').replace(/_/g, '/')
  }
  function at(e) {
    return e.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }
  function Fr(e) {
    return Buffer.from(ut(e), 'base64')
  }
  var O = Ct
  O.encode = Ct
  O.decode = Ur
  O.toBase64 = ut
  O.fromBase64 = at
  O.toBuffer = Fr
  ht.default = O
})
var z = T((me, V) => {
  V.exports = Dt().default
  V.exports.default = V.exports
})
var ct = T((J) => {
  'use strict'
  J.byteLength = _r
  J.toByteArray = Cr
  J.fromByteArray = Nr
  var b = [],
    m = [],
    Lr = typeof Uint8Array < 'u' ? Uint8Array : Array,
    ft = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (D = 0, Pt = ft.length; D < Pt; ++D) (b[D] = ft[D]), (m[ft.charCodeAt(D)] = D)
  var D, Pt
  m['-'.charCodeAt(0)] = 62
  m['_'.charCodeAt(0)] = 63
  function Nt(e) {
    var t = e.length
    if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
    var r = e.indexOf('=')
    r === -1 && (r = t)
    var n = r === t ? 0 : 4 - (r % 4)
    return [r, n]
  }
  function _r(e) {
    var t = Nt(e),
      r = t[0],
      n = t[1]
    return ((r + n) * 3) / 4 - n
  }
  function Rr(e, t, r) {
    return ((t + r) * 3) / 4 - r
  }
  function Cr(e) {
    var t,
      r = Nt(e),
      n = r[0],
      i = r[1],
      o = new Lr(Rr(e, n, i)),
      s = 0,
      u = i > 0 ? n - 4 : n,
      h
    for (h = 0; h < u; h += 4)
      (t =
        (m[e.charCodeAt(h)] << 18) |
        (m[e.charCodeAt(h + 1)] << 12) |
        (m[e.charCodeAt(h + 2)] << 6) |
        m[e.charCodeAt(h + 3)]),
        (o[s++] = (t >> 16) & 255),
        (o[s++] = (t >> 8) & 255),
        (o[s++] = t & 255)
    return (
      i === 2 &&
        ((t = (m[e.charCodeAt(h)] << 2) | (m[e.charCodeAt(h + 1)] >> 4)), (o[s++] = t & 255)),
      i === 1 &&
        ((t =
          (m[e.charCodeAt(h)] << 10) |
          (m[e.charCodeAt(h + 1)] << 4) |
          (m[e.charCodeAt(h + 2)] >> 2)),
        (o[s++] = (t >> 8) & 255),
        (o[s++] = t & 255)),
      o
    )
  }
  function Dr(e) {
    return b[(e >> 18) & 63] + b[(e >> 12) & 63] + b[(e >> 6) & 63] + b[e & 63]
  }
  function Pr(e, t, r) {
    for (var n, i = [], o = t; o < r; o += 3)
      (n = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), i.push(Dr(n))
    return i.join('')
  }
  function Nr(e) {
    for (var t, r = e.length, n = r % 3, i = [], o = 16383, s = 0, u = r - n; s < u; s += o)
      i.push(Pr(e, s, s + o > u ? u : s + o))
    return (
      n === 1
        ? ((t = e[r - 1]), i.push(b[t >> 2] + b[(t << 4) & 63] + '=='))
        : n === 2 &&
          ((t = (e[r - 2] << 8) + e[r - 1]),
          i.push(b[t >> 10] + b[(t >> 4) & 63] + b[(t << 2) & 63] + '=')),
      i.join('')
    )
  }
})
var pt = T((g) => {
  'use strict'
  Object.defineProperty(g, '__esModule', { value: !0 })
  g.b64UrlDecode =
    g.b64UrlEncode =
    g.bufferTob64Url =
    g.bufferTob64 =
    g.b64UrlToBuffer =
    g.stringToB64Url =
    g.stringToBuffer =
    g.bufferToString =
    g.b64UrlToString =
    g.concatBuffers =
      void 0
  var kt = ct()
  function kr(e) {
    let t = 0
    for (let i = 0; i < e.length; i++) t += e[i].byteLength
    let r = new Uint8Array(t),
      n = 0
    r.set(new Uint8Array(e[0]), n), (n += e[0].byteLength)
    for (let i = 1; i < e.length; i++) r.set(new Uint8Array(e[i]), n), (n += e[i].byteLength)
    return r
  }
  g.concatBuffers = kr
  function Mr(e) {
    let t = $t(e)
    return Mt(t)
  }
  g.b64UrlToString = Mr
  function Mt(e) {
    return new TextDecoder('utf-8', { fatal: !0 }).decode(e)
  }
  g.bufferToString = Mt
  function Ot(e) {
    return new TextEncoder().encode(e)
  }
  g.stringToBuffer = Ot
  function Or(e) {
    return Ht(Ot(e))
  }
  g.stringToB64Url = Or
  function $t(e) {
    return new Uint8Array(kt.toByteArray(qt(e)))
  }
  g.b64UrlToBuffer = $t
  function Kt(e) {
    return kt.fromByteArray(new Uint8Array(e))
  }
  g.bufferTob64 = Kt
  function Ht(e) {
    return jt(Kt(e))
  }
  g.bufferTob64Url = Ht
  function jt(e) {
    return e.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
  }
  g.b64UrlEncode = jt
  function qt(e) {
    e = e.replace(/\-/g, '+').replace(/\_/g, '/')
    let t
    return e.length % 4 == 0 ? (t = 0) : (t = 4 - (e.length % 4)), e.concat('='.repeat(t))
  }
  g.b64UrlDecode = qt
})
var Yt = T((gt) => {
  'use strict'
  Object.defineProperty(gt, '__esModule', { value: !0 })
  var F = pt(),
    lt = class {
      keyLength = 4096
      publicExponent = 65537
      hashAlgorithm = 'sha256'
      driver
      constructor() {
        if (!this.detectWebCrypto()) throw new Error('SubtleCrypto not available!')
        this.driver = crypto.subtle
      }
      async generateJWK() {
        let t = await this.driver.generateKey(
            {
              name: 'RSA-PSS',
              modulusLength: 4096,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: { name: 'SHA-256' }
            },
            !0,
            ['sign']
          ),
          r = await this.driver.exportKey('jwk', t.privateKey)
        return {
          kty: r.kty,
          e: r.e,
          n: r.n,
          d: r.d,
          p: r.p,
          q: r.q,
          dp: r.dp,
          dq: r.dq,
          qi: r.qi
        }
      }
      async sign(t, r, { saltLength: n } = {}) {
        let i = await this.driver.sign(
          { name: 'RSA-PSS', saltLength: 32 },
          await this.jwkToCryptoKey(t),
          r
        )
        return new Uint8Array(i)
      }
      async hash(t, r = 'SHA-256') {
        let n = await this.driver.digest(r, t)
        return new Uint8Array(n)
      }
      async verify(t, r, n) {
        let i = { kty: 'RSA', e: 'AQAB', n: t },
          o = await this.jwkToPublicCryptoKey(i),
          s = await this.driver.digest('SHA-256', r),
          u = await this.driver.verify({ name: 'RSA-PSS', saltLength: 0 }, o, n, r),
          h = await this.driver.verify({ name: 'RSA-PSS', saltLength: 32 }, o, n, r),
          p = await this.driver.verify(
            {
              name: 'RSA-PSS',
              saltLength: Math.ceil((o.algorithm.modulusLength - 1) / 8) - s.byteLength - 2
            },
            o,
            n,
            r
          )
        return u || h || p
      }
      async jwkToCryptoKey(t) {
        return this.driver.importKey('jwk', t, { name: 'RSA-PSS', hash: { name: 'SHA-256' } }, !1, [
          'sign'
        ])
      }
      async jwkToPublicCryptoKey(t) {
        return this.driver.importKey('jwk', t, { name: 'RSA-PSS', hash: { name: 'SHA-256' } }, !1, [
          'verify'
        ])
      }
      detectWebCrypto() {
        if (typeof crypto > 'u') return !1
        let t = crypto?.subtle
        return t === void 0
          ? !1
          : ['generateKey', 'importKey', 'exportKey', 'digest', 'sign'].every(
              (n) => typeof t[n] == 'function'
            )
      }
      async encrypt(t, r, n) {
        let i = await this.driver.importKey(
            'raw',
            typeof r == 'string' ? F.stringToBuffer(r) : r,
            { name: 'PBKDF2', length: 32 },
            !1,
            ['deriveKey']
          ),
          o = await this.driver.deriveKey(
            {
              name: 'PBKDF2',
              salt: n ? F.stringToBuffer(n) : F.stringToBuffer('salt'),
              iterations: 1e5,
              hash: 'SHA-256'
            },
            i,
            { name: 'AES-CBC', length: 256 },
            !1,
            ['encrypt', 'decrypt']
          ),
          s = new Uint8Array(16)
        crypto.getRandomValues(s)
        let u = await this.driver.encrypt({ name: 'AES-CBC', iv: s }, o, t)
        return F.concatBuffers([s, u])
      }
      async decrypt(t, r, n) {
        let i = await this.driver.importKey(
            'raw',
            typeof r == 'string' ? F.stringToBuffer(r) : r,
            { name: 'PBKDF2', length: 32 },
            !1,
            ['deriveKey']
          ),
          o = await this.driver.deriveKey(
            {
              name: 'PBKDF2',
              salt: n ? F.stringToBuffer(n) : F.stringToBuffer('salt'),
              iterations: 1e5,
              hash: 'SHA-256'
            },
            i,
            { name: 'AES-CBC', length: 256 },
            !1,
            ['encrypt', 'decrypt']
          ),
          s = t.slice(0, 16),
          u = await this.driver.decrypt({ name: 'AES-CBC', iv: s }, o, t.slice(16))
        return F.concatBuffers([u])
      }
    }
  gt.default = lt
})
var zt = T((mt) => {
  mt.read = function (e, t, r, n, i) {
    var o,
      s,
      u = i * 8 - n - 1,
      h = (1 << u) - 1,
      p = h >> 1,
      f = -7,
      c = r ? i - 1 : 0,
      U = r ? -1 : 1,
      l = e[t + c]
    for (
      c += U, o = l & ((1 << -f) - 1), l >>= -f, f += u;
      f > 0;
      o = o * 256 + e[t + c], c += U, f -= 8
    );
    for (s = o & ((1 << -f) - 1), o >>= -f, f += n; f > 0; s = s * 256 + e[t + c], c += U, f -= 8);
    if (o === 0) o = 1 - p
    else {
      if (o === h) return s ? NaN : (l ? -1 : 1) * (1 / 0)
      ;(s = s + Math.pow(2, n)), (o = o - p)
    }
    return (l ? -1 : 1) * s * Math.pow(2, o - n)
  }
  mt.write = function (e, t, r, n, i, o) {
    var s,
      u,
      h,
      p = o * 8 - i - 1,
      f = (1 << p) - 1,
      c = f >> 1,
      U = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      l = n ? 0 : o - 1,
      R = n ? 1 : -1,
      G = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0
    for (
      t = Math.abs(t),
        isNaN(t) || t === 1 / 0
          ? ((u = isNaN(t) ? 1 : 0), (s = f))
          : ((s = Math.floor(Math.log(t) / Math.LN2)),
            t * (h = Math.pow(2, -s)) < 1 && (s--, (h *= 2)),
            s + c >= 1 ? (t += U / h) : (t += U * Math.pow(2, 1 - c)),
            t * h >= 2 && (s++, (h /= 2)),
            s + c >= f
              ? ((u = 0), (s = f))
              : s + c >= 1
                ? ((u = (t * h - 1) * Math.pow(2, i)), (s = s + c))
                : ((u = t * Math.pow(2, c - 1) * Math.pow(2, i)), (s = 0)));
      i >= 8;
      e[r + l] = u & 255, l += R, u /= 256, i -= 8
    );
    for (s = (s << i) | u, p += i; p > 0; e[r + l] = s & 255, l += R, s /= 256, p -= 8);
    e[r + l - R] |= G * 128
  }
})
var nt = T((q) => {
  'use strict'
  var Bt = ct(),
    H = zt(),
    Jt =
      typeof Symbol == 'function' && typeof Symbol.for == 'function'
        ? Symbol.for('nodejs.util.inspect.custom')
        : null
  q.Buffer = a
  q.SlowBuffer = Vr
  q.INSPECT_MAX_BYTES = 50
  var rt = 2147483647
  q.kMaxLength = rt
  a.TYPED_ARRAY_SUPPORT = qr()
  !a.TYPED_ARRAY_SUPPORT &&
    typeof console < 'u' &&
    typeof console.error == 'function' &&
    console.error(
      'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
    )
  function qr() {
    try {
      let e = new Uint8Array(1),
        t = {
          foo: function () {
            return 42
          }
        }
      return (
        Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), e.foo() === 42
      )
    } catch {
      return !1
    }
  }
  Object.defineProperty(a.prototype, 'parent', {
    enumerable: !0,
    get: function () {
      if (a.isBuffer(this)) return this.buffer
    }
  })
  Object.defineProperty(a.prototype, 'offset', {
    enumerable: !0,
    get: function () {
      if (a.isBuffer(this)) return this.byteOffset
    }
  })
  function S(e) {
    if (e > rt) throw new RangeError('The value "' + e + '" is invalid for option "size"')
    let t = new Uint8Array(e)
    return Object.setPrototypeOf(t, a.prototype), t
  }
  function a(e, t, r) {
    if (typeof e == 'number') {
      if (typeof t == 'string')
        throw new TypeError('The "string" argument must be of type string. Received type number')
      return Tt(e)
    }
    return tr(e, t, r)
  }
  a.poolSize = 8192
  function tr(e, t, r) {
    if (typeof e == 'string') return Yr(e, t)
    if (ArrayBuffer.isView(e)) return vr(e)
    if (e == null)
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof e
      )
    if (
      A(e, ArrayBuffer) ||
      (e && A(e.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < 'u' &&
        (A(e, SharedArrayBuffer) || (e && A(e.buffer, SharedArrayBuffer))))
    )
      return bt(e, t, r)
    if (typeof e == 'number')
      throw new TypeError('The "value" argument must not be of type number. Received type number')
    let n = e.valueOf && e.valueOf()
    if (n != null && n !== e) return a.from(n, t, r)
    let i = Wr(e)
    if (i) return i
    if (
      typeof Symbol < 'u' &&
      Symbol.toPrimitive != null &&
      typeof e[Symbol.toPrimitive] == 'function'
    )
      return a.from(e[Symbol.toPrimitive]('string'), t, r)
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
        typeof e
    )
  }
  a.from = function (e, t, r) {
    return tr(e, t, r)
  }
  Object.setPrototypeOf(a.prototype, Uint8Array.prototype)
  Object.setPrototypeOf(a, Uint8Array)
  function rr(e) {
    if (typeof e != 'number') throw new TypeError('"size" argument must be of type number')
    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
  }
  function Gr(e, t, r) {
    return (
      rr(e),
      e <= 0 ? S(e) : t !== void 0 ? (typeof r == 'string' ? S(e).fill(t, r) : S(e).fill(t)) : S(e)
    )
  }
  a.alloc = function (e, t, r) {
    return Gr(e, t, r)
  }
  function Tt(e) {
    return rr(e), S(e < 0 ? 0 : It(e) | 0)
  }
  a.allocUnsafe = function (e) {
    return Tt(e)
  }
  a.allocUnsafeSlow = function (e) {
    return Tt(e)
  }
  function Yr(e, t) {
    if (((typeof t != 'string' || t === '') && (t = 'utf8'), !a.isEncoding(t)))
      throw new TypeError('Unknown encoding: ' + t)
    let r = er(e, t) | 0,
      n = S(r),
      i = n.write(e, t)
    return i !== r && (n = n.slice(0, i)), n
  }
  function Et(e) {
    let t = e.length < 0 ? 0 : It(e.length) | 0,
      r = S(t)
    for (let n = 0; n < t; n += 1) r[n] = e[n] & 255
    return r
  }
  function vr(e) {
    if (A(e, Uint8Array)) {
      let t = new Uint8Array(e)
      return bt(t.buffer, t.byteOffset, t.byteLength)
    }
    return Et(e)
  }
  function bt(e, t, r) {
    if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds')
    if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds')
    let n
    return (
      t === void 0 && r === void 0
        ? (n = new Uint8Array(e))
        : r === void 0
          ? (n = new Uint8Array(e, t))
          : (n = new Uint8Array(e, t, r)),
      Object.setPrototypeOf(n, a.prototype),
      n
    )
  }
  function Wr(e) {
    if (a.isBuffer(e)) {
      let t = It(e.length) | 0,
        r = S(t)
      return r.length === 0 || e.copy(r, 0, 0, t), r
    }
    if (e.length !== void 0) return typeof e.length != 'number' || Ut(e.length) ? S(0) : Et(e)
    if (e.type === 'Buffer' && Array.isArray(e.data)) return Et(e.data)
  }
  function It(e) {
    if (e >= rt)
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x' + rt.toString(16) + ' bytes'
      )
    return e | 0
  }
  function Vr(e) {
    return +e != e && (e = 0), a.alloc(+e)
  }
  a.isBuffer = function (t) {
    return t != null && t._isBuffer === !0 && t !== a.prototype
  }
  a.compare = function (t, r) {
    if (
      (A(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
      A(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)),
      !a.isBuffer(t) || !a.isBuffer(r))
    )
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')
    if (t === r) return 0
    let n = t.length,
      i = r.length
    for (let o = 0, s = Math.min(n, i); o < s; ++o)
      if (t[o] !== r[o]) {
        ;(n = t[o]), (i = r[o])
        break
      }
    return n < i ? -1 : i < n ? 1 : 0
  }
  a.isEncoding = function (t) {
    switch (String(t).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return !0
      default:
        return !1
    }
  }
  a.concat = function (t, r) {
    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers')
    if (t.length === 0) return a.alloc(0)
    let n
    if (r === void 0) for (r = 0, n = 0; n < t.length; ++n) r += t[n].length
    let i = a.allocUnsafe(r),
      o = 0
    for (n = 0; n < t.length; ++n) {
      let s = t[n]
      if (A(s, Uint8Array))
        o + s.length > i.length
          ? (a.isBuffer(s) || (s = a.from(s)), s.copy(i, o))
          : Uint8Array.prototype.set.call(i, s, o)
      else if (a.isBuffer(s)) s.copy(i, o)
      else throw new TypeError('"list" argument must be an Array of Buffers')
      o += s.length
    }
    return i
  }
  function er(e, t) {
    if (a.isBuffer(e)) return e.length
    if (ArrayBuffer.isView(e) || A(e, ArrayBuffer)) return e.byteLength
    if (typeof e != 'string')
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof e
      )
    let r = e.length,
      n = arguments.length > 2 && arguments[2] === !0
    if (!n && r === 0) return 0
    let i = !1
    for (;;)
      switch (t) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return r
        case 'utf8':
        case 'utf-8':
          return At(e).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return r * 2
        case 'hex':
          return r >>> 1
        case 'base64':
          return cr(e).length
        default:
          if (i) return n ? -1 : At(e).length
          ;(t = ('' + t).toLowerCase()), (i = !0)
      }
  }
  a.byteLength = er
  function zr(e, t, r) {
    let n = !1
    if (
      ((t === void 0 || t < 0) && (t = 0),
      t > this.length ||
        ((r === void 0 || r > this.length) && (r = this.length), r <= 0) ||
        ((r >>>= 0), (t >>>= 0), r <= t))
    )
      return ''
    for (e || (e = 'utf8'); ; )
      switch (e) {
        case 'hex':
          return oe(this, t, r)
        case 'utf8':
        case 'utf-8':
          return ir(this, t, r)
        case 'ascii':
          return ne(this, t, r)
        case 'latin1':
        case 'binary':
          return ie(this, t, r)
        case 'base64':
          return re(this, t, r)
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return se(this, t, r)
        default:
          if (n) throw new TypeError('Unknown encoding: ' + e)
          ;(e = (e + '').toLowerCase()), (n = !0)
      }
  }
  a.prototype._isBuffer = !0
  function k(e, t, r) {
    let n = e[t]
    ;(e[t] = e[r]), (e[r] = n)
  }
  a.prototype.swap16 = function () {
    let t = this.length
    if (t % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
    for (let r = 0; r < t; r += 2) k(this, r, r + 1)
    return this
  }
  a.prototype.swap32 = function () {
    let t = this.length
    if (t % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
    for (let r = 0; r < t; r += 4) k(this, r, r + 3), k(this, r + 1, r + 2)
    return this
  }
  a.prototype.swap64 = function () {
    let t = this.length
    if (t % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
    for (let r = 0; r < t; r += 8)
      k(this, r, r + 7), k(this, r + 1, r + 6), k(this, r + 2, r + 5), k(this, r + 3, r + 4)
    return this
  }
  a.prototype.toString = function () {
    let t = this.length
    return t === 0 ? '' : arguments.length === 0 ? ir(this, 0, t) : zr.apply(this, arguments)
  }
  a.prototype.toLocaleString = a.prototype.toString
  a.prototype.equals = function (t) {
    if (!a.isBuffer(t)) throw new TypeError('Argument must be a Buffer')
    return this === t ? !0 : a.compare(this, t) === 0
  }
  a.prototype.inspect = function () {
    let t = '',
      r = q.INSPECT_MAX_BYTES
    return (
      (t = this.toString('hex', 0, r)
        .replace(/(.{2})/g, '$1 ')
        .trim()),
      this.length > r && (t += ' ... '),
      '<Buffer ' + t + '>'
    )
  }
  Jt && (a.prototype[Jt] = a.prototype.inspect)
  a.prototype.compare = function (t, r, n, i, o) {
    if ((A(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), !a.isBuffer(t)))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
      )
    if (
      (r === void 0 && (r = 0),
      n === void 0 && (n = t ? t.length : 0),
      i === void 0 && (i = 0),
      o === void 0 && (o = this.length),
      r < 0 || n > t.length || i < 0 || o > this.length)
    )
      throw new RangeError('out of range index')
    if (i >= o && r >= n) return 0
    if (i >= o) return -1
    if (r >= n) return 1
    if (((r >>>= 0), (n >>>= 0), (i >>>= 0), (o >>>= 0), this === t)) return 0
    let s = o - i,
      u = n - r,
      h = Math.min(s, u),
      p = this.slice(i, o),
      f = t.slice(r, n)
    for (let c = 0; c < h; ++c)
      if (p[c] !== f[c]) {
        ;(s = p[c]), (u = f[c])
        break
      }
    return s < u ? -1 : u < s ? 1 : 0
  }
  function nr(e, t, r, n, i) {
    if (e.length === 0) return -1
    if (
      (typeof r == 'string'
        ? ((n = r), (r = 0))
        : r > 2147483647
          ? (r = 2147483647)
          : r < -2147483648 && (r = -2147483648),
      (r = +r),
      Ut(r) && (r = i ? 0 : e.length - 1),
      r < 0 && (r = e.length + r),
      r >= e.length)
    ) {
      if (i) return -1
      r = e.length - 1
    } else if (r < 0)
      if (i) r = 0
      else return -1
    if ((typeof t == 'string' && (t = a.from(t, n)), a.isBuffer(t)))
      return t.length === 0 ? -1 : Xt(e, t, r, n, i)
    if (typeof t == 'number')
      return (
        (t = t & 255),
        typeof Uint8Array.prototype.indexOf == 'function'
          ? i
            ? Uint8Array.prototype.indexOf.call(e, t, r)
            : Uint8Array.prototype.lastIndexOf.call(e, t, r)
          : Xt(e, [t], r, n, i)
      )
    throw new TypeError('val must be string, number or Buffer')
  }
  function Xt(e, t, r, n, i) {
    let o = 1,
      s = e.length,
      u = t.length
    if (
      n !== void 0 &&
      ((n = String(n).toLowerCase()),
      n === 'ucs2' || n === 'ucs-2' || n === 'utf16le' || n === 'utf-16le')
    ) {
      if (e.length < 2 || t.length < 2) return -1
      ;(o = 2), (s /= 2), (u /= 2), (r /= 2)
    }
    function h(f, c) {
      return o === 1 ? f[c] : f.readUInt16BE(c * o)
    }
    let p
    if (i) {
      let f = -1
      for (p = r; p < s; p++)
        if (h(e, p) === h(t, f === -1 ? 0 : p - f)) {
          if ((f === -1 && (f = p), p - f + 1 === u)) return f * o
        } else f !== -1 && (p -= p - f), (f = -1)
    } else
      for (r + u > s && (r = s - u), p = r; p >= 0; p--) {
        let f = !0
        for (let c = 0; c < u; c++)
          if (h(e, p + c) !== h(t, c)) {
            f = !1
            break
          }
        if (f) return p
      }
    return -1
  }
  a.prototype.includes = function (t, r, n) {
    return this.indexOf(t, r, n) !== -1
  }
  a.prototype.indexOf = function (t, r, n) {
    return nr(this, t, r, n, !0)
  }
  a.prototype.lastIndexOf = function (t, r, n) {
    return nr(this, t, r, n, !1)
  }
  function Jr(e, t, r, n) {
    r = Number(r) || 0
    let i = e.length - r
    n ? ((n = Number(n)), n > i && (n = i)) : (n = i)
    let o = t.length
    n > o / 2 && (n = o / 2)
    let s
    for (s = 0; s < n; ++s) {
      let u = parseInt(t.substr(s * 2, 2), 16)
      if (Ut(u)) return s
      e[r + s] = u
    }
    return s
  }
  function Xr(e, t, r, n) {
    return et(At(t, e.length - r), e, r, n)
  }
  function Zr(e, t, r, n) {
    return et(fe(t), e, r, n)
  }
  function Qr(e, t, r, n) {
    return et(cr(t), e, r, n)
  }
  function te(e, t, r, n) {
    return et(ce(t, e.length - r), e, r, n)
  }
  a.prototype.write = function (t, r, n, i) {
    if (r === void 0) (i = 'utf8'), (n = this.length), (r = 0)
    else if (n === void 0 && typeof r == 'string') (i = r), (n = this.length), (r = 0)
    else if (isFinite(r))
      (r = r >>> 0),
        isFinite(n) ? ((n = n >>> 0), i === void 0 && (i = 'utf8')) : ((i = n), (n = void 0))
    else throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
    let o = this.length - r
    if (((n === void 0 || n > o) && (n = o), (t.length > 0 && (n < 0 || r < 0)) || r > this.length))
      throw new RangeError('Attempt to write outside buffer bounds')
    i || (i = 'utf8')
    let s = !1
    for (;;)
      switch (i) {
        case 'hex':
          return Jr(this, t, r, n)
        case 'utf8':
        case 'utf-8':
          return Xr(this, t, r, n)
        case 'ascii':
        case 'latin1':
        case 'binary':
          return Zr(this, t, r, n)
        case 'base64':
          return Qr(this, t, r, n)
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return te(this, t, r, n)
        default:
          if (s) throw new TypeError('Unknown encoding: ' + i)
          ;(i = ('' + i).toLowerCase()), (s = !0)
      }
  }
  a.prototype.toJSON = function () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  }
  function re(e, t, r) {
    return t === 0 && r === e.length ? Bt.fromByteArray(e) : Bt.fromByteArray(e.slice(t, r))
  }
  function ir(e, t, r) {
    r = Math.min(e.length, r)
    let n = [],
      i = t
    for (; i < r; ) {
      let o = e[i],
        s = null,
        u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1
      if (i + u <= r) {
        let h, p, f, c
        switch (u) {
          case 1:
            o < 128 && (s = o)
            break
          case 2:
            ;(h = e[i + 1]),
              (h & 192) === 128 && ((c = ((o & 31) << 6) | (h & 63)), c > 127 && (s = c))
            break
          case 3:
            ;(h = e[i + 1]),
              (p = e[i + 2]),
              (h & 192) === 128 &&
                (p & 192) === 128 &&
                ((c = ((o & 15) << 12) | ((h & 63) << 6) | (p & 63)),
                c > 2047 && (c < 55296 || c > 57343) && (s = c))
            break
          case 4:
            ;(h = e[i + 1]),
              (p = e[i + 2]),
              (f = e[i + 3]),
              (h & 192) === 128 &&
                (p & 192) === 128 &&
                (f & 192) === 128 &&
                ((c = ((o & 15) << 18) | ((h & 63) << 12) | ((p & 63) << 6) | (f & 63)),
                c > 65535 && c < 1114112 && (s = c))
        }
      }
      s === null
        ? ((s = 65533), (u = 1))
        : s > 65535 &&
          ((s -= 65536), n.push(((s >>> 10) & 1023) | 55296), (s = 56320 | (s & 1023))),
        n.push(s),
        (i += u)
    }
    return ee(n)
  }
  var Zt = 4096
  function ee(e) {
    let t = e.length
    if (t <= Zt) return String.fromCharCode.apply(String, e)
    let r = '',
      n = 0
    for (; n < t; ) r += String.fromCharCode.apply(String, e.slice(n, (n += Zt)))
    return r
  }
  function ne(e, t, r) {
    let n = ''
    r = Math.min(e.length, r)
    for (let i = t; i < r; ++i) n += String.fromCharCode(e[i] & 127)
    return n
  }
  function ie(e, t, r) {
    let n = ''
    r = Math.min(e.length, r)
    for (let i = t; i < r; ++i) n += String.fromCharCode(e[i])
    return n
  }
  function oe(e, t, r) {
    let n = e.length
    ;(!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n)
    let i = ''
    for (let o = t; o < r; ++o) i += pe[e[o]]
    return i
  }
  function se(e, t, r) {
    let n = e.slice(t, r),
      i = ''
    for (let o = 0; o < n.length - 1; o += 2) i += String.fromCharCode(n[o] + n[o + 1] * 256)
    return i
  }
  a.prototype.slice = function (t, r) {
    let n = this.length
    ;(t = ~~t),
      (r = r === void 0 ? n : ~~r),
      t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n),
      r < 0 ? ((r += n), r < 0 && (r = 0)) : r > n && (r = n),
      r < t && (r = t)
    let i = this.subarray(t, r)
    return Object.setPrototypeOf(i, a.prototype), i
  }
  function y(e, t, r) {
    if (e % 1 !== 0 || e < 0) throw new RangeError('offset is not uint')
    if (e + t > r) throw new RangeError('Trying to access beyond buffer length')
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function (t, r, n) {
    ;(t = t >>> 0), (r = r >>> 0), n || y(t, r, this.length)
    let i = this[t],
      o = 1,
      s = 0
    for (; ++s < r && (o *= 256); ) i += this[t + s] * o
    return i
  }
  a.prototype.readUintBE = a.prototype.readUIntBE = function (t, r, n) {
    ;(t = t >>> 0), (r = r >>> 0), n || y(t, r, this.length)
    let i = this[t + --r],
      o = 1
    for (; r > 0 && (o *= 256); ) i += this[t + --r] * o
    return i
  }
  a.prototype.readUint8 = a.prototype.readUInt8 = function (t, r) {
    return (t = t >>> 0), r || y(t, 1, this.length), this[t]
  }
  a.prototype.readUint16LE = a.prototype.readUInt16LE = function (t, r) {
    return (t = t >>> 0), r || y(t, 2, this.length), this[t] | (this[t + 1] << 8)
  }
  a.prototype.readUint16BE = a.prototype.readUInt16BE = function (t, r) {
    return (t = t >>> 0), r || y(t, 2, this.length), (this[t] << 8) | this[t + 1]
  }
  a.prototype.readUint32LE = a.prototype.readUInt32LE = function (t, r) {
    return (
      (t = t >>> 0),
      r || y(t, 4, this.length),
      (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + this[t + 3] * 16777216
    )
  }
  a.prototype.readUint32BE = a.prototype.readUInt32BE = function (t, r) {
    return (
      (t = t >>> 0),
      r || y(t, 4, this.length),
      this[t] * 16777216 + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
    )
  }
  a.prototype.readBigUInt64LE = L(function (t) {
    ;(t = t >>> 0), j(t, 'offset')
    let r = this[t],
      n = this[t + 7]
    ;(r === void 0 || n === void 0) && W(t, this.length - 8)
    let i = r + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24,
      o = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + n * 2 ** 24
    return BigInt(i) + (BigInt(o) << BigInt(32))
  })
  a.prototype.readBigUInt64BE = L(function (t) {
    ;(t = t >>> 0), j(t, 'offset')
    let r = this[t],
      n = this[t + 7]
    ;(r === void 0 || n === void 0) && W(t, this.length - 8)
    let i = r * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t],
      o = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n
    return (BigInt(i) << BigInt(32)) + BigInt(o)
  })
  a.prototype.readIntLE = function (t, r, n) {
    ;(t = t >>> 0), (r = r >>> 0), n || y(t, r, this.length)
    let i = this[t],
      o = 1,
      s = 0
    for (; ++s < r && (o *= 256); ) i += this[t + s] * o
    return (o *= 128), i >= o && (i -= Math.pow(2, 8 * r)), i
  }
  a.prototype.readIntBE = function (t, r, n) {
    ;(t = t >>> 0), (r = r >>> 0), n || y(t, r, this.length)
    let i = r,
      o = 1,
      s = this[t + --i]
    for (; i > 0 && (o *= 256); ) s += this[t + --i] * o
    return (o *= 128), s >= o && (s -= Math.pow(2, 8 * r)), s
  }
  a.prototype.readInt8 = function (t, r) {
    return (
      (t = t >>> 0), r || y(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t]
    )
  }
  a.prototype.readInt16LE = function (t, r) {
    ;(t = t >>> 0), r || y(t, 2, this.length)
    let n = this[t] | (this[t + 1] << 8)
    return n & 32768 ? n | 4294901760 : n
  }
  a.prototype.readInt16BE = function (t, r) {
    ;(t = t >>> 0), r || y(t, 2, this.length)
    let n = this[t + 1] | (this[t] << 8)
    return n & 32768 ? n | 4294901760 : n
  }
  a.prototype.readInt32LE = function (t, r) {
    return (
      (t = t >>> 0),
      r || y(t, 4, this.length),
      this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
    )
  }
  a.prototype.readInt32BE = function (t, r) {
    return (
      (t = t >>> 0),
      r || y(t, 4, this.length),
      (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
    )
  }
  a.prototype.readBigInt64LE = L(function (t) {
    ;(t = t >>> 0), j(t, 'offset')
    let r = this[t],
      n = this[t + 7]
    ;(r === void 0 || n === void 0) && W(t, this.length - 8)
    let i = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (n << 24)
    return (
      (BigInt(i) << BigInt(32)) +
      BigInt(r + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24)
    )
  })
  a.prototype.readBigInt64BE = L(function (t) {
    ;(t = t >>> 0), j(t, 'offset')
    let r = this[t],
      n = this[t + 7]
    ;(r === void 0 || n === void 0) && W(t, this.length - 8)
    let i = (r << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t]
    return (
      (BigInt(i) << BigInt(32)) +
      BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n)
    )
  })
  a.prototype.readFloatLE = function (t, r) {
    return (t = t >>> 0), r || y(t, 4, this.length), H.read(this, t, !0, 23, 4)
  }
  a.prototype.readFloatBE = function (t, r) {
    return (t = t >>> 0), r || y(t, 4, this.length), H.read(this, t, !1, 23, 4)
  }
  a.prototype.readDoubleLE = function (t, r) {
    return (t = t >>> 0), r || y(t, 8, this.length), H.read(this, t, !0, 52, 8)
  }
  a.prototype.readDoubleBE = function (t, r) {
    return (t = t >>> 0), r || y(t, 8, this.length), H.read(this, t, !1, 52, 8)
  }
  function d(e, t, r, n, i, o) {
    if (!a.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (t > i || t < o) throw new RangeError('"value" argument is out of bounds')
    if (r + n > e.length) throw new RangeError('Index out of range')
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function (t, r, n, i) {
    if (((t = +t), (r = r >>> 0), (n = n >>> 0), !i)) {
      let u = Math.pow(2, 8 * n) - 1
      d(this, t, r, n, u, 0)
    }
    let o = 1,
      s = 0
    for (this[r] = t & 255; ++s < n && (o *= 256); ) this[r + s] = (t / o) & 255
    return r + n
  }
  a.prototype.writeUintBE = a.prototype.writeUIntBE = function (t, r, n, i) {
    if (((t = +t), (r = r >>> 0), (n = n >>> 0), !i)) {
      let u = Math.pow(2, 8 * n) - 1
      d(this, t, r, n, u, 0)
    }
    let o = n - 1,
      s = 1
    for (this[r + o] = t & 255; --o >= 0 && (s *= 256); ) this[r + o] = (t / s) & 255
    return r + n
  }
  a.prototype.writeUint8 = a.prototype.writeUInt8 = function (t, r, n) {
    return (t = +t), (r = r >>> 0), n || d(this, t, r, 1, 255, 0), (this[r] = t & 255), r + 1
  }
  a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 2, 65535, 0),
      (this[r] = t & 255),
      (this[r + 1] = t >>> 8),
      r + 2
    )
  }
  a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 2, 65535, 0),
      (this[r] = t >>> 8),
      (this[r + 1] = t & 255),
      r + 2
    )
  }
  a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 4, 4294967295, 0),
      (this[r + 3] = t >>> 24),
      (this[r + 2] = t >>> 16),
      (this[r + 1] = t >>> 8),
      (this[r] = t & 255),
      r + 4
    )
  }
  a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 4, 4294967295, 0),
      (this[r] = t >>> 24),
      (this[r + 1] = t >>> 16),
      (this[r + 2] = t >>> 8),
      (this[r + 3] = t & 255),
      r + 4
    )
  }
  function or(e, t, r, n, i) {
    fr(t, n, i, e, r, 7)
    let o = Number(t & BigInt(4294967295))
    ;(e[r++] = o),
      (o = o >> 8),
      (e[r++] = o),
      (o = o >> 8),
      (e[r++] = o),
      (o = o >> 8),
      (e[r++] = o)
    let s = Number((t >> BigInt(32)) & BigInt(4294967295))
    return (
      (e[r++] = s),
      (s = s >> 8),
      (e[r++] = s),
      (s = s >> 8),
      (e[r++] = s),
      (s = s >> 8),
      (e[r++] = s),
      r
    )
  }
  function sr(e, t, r, n, i) {
    fr(t, n, i, e, r, 7)
    let o = Number(t & BigInt(4294967295))
    ;(e[r + 7] = o),
      (o = o >> 8),
      (e[r + 6] = o),
      (o = o >> 8),
      (e[r + 5] = o),
      (o = o >> 8),
      (e[r + 4] = o)
    let s = Number((t >> BigInt(32)) & BigInt(4294967295))
    return (
      (e[r + 3] = s),
      (s = s >> 8),
      (e[r + 2] = s),
      (s = s >> 8),
      (e[r + 1] = s),
      (s = s >> 8),
      (e[r] = s),
      r + 8
    )
  }
  a.prototype.writeBigUInt64LE = L(function (t, r = 0) {
    return or(this, t, r, BigInt(0), BigInt('0xffffffffffffffff'))
  })
  a.prototype.writeBigUInt64BE = L(function (t, r = 0) {
    return sr(this, t, r, BigInt(0), BigInt('0xffffffffffffffff'))
  })
  a.prototype.writeIntLE = function (t, r, n, i) {
    if (((t = +t), (r = r >>> 0), !i)) {
      let h = Math.pow(2, 8 * n - 1)
      d(this, t, r, n, h - 1, -h)
    }
    let o = 0,
      s = 1,
      u = 0
    for (this[r] = t & 255; ++o < n && (s *= 256); )
      t < 0 && u === 0 && this[r + o - 1] !== 0 && (u = 1),
        (this[r + o] = (((t / s) >> 0) - u) & 255)
    return r + n
  }
  a.prototype.writeIntBE = function (t, r, n, i) {
    if (((t = +t), (r = r >>> 0), !i)) {
      let h = Math.pow(2, 8 * n - 1)
      d(this, t, r, n, h - 1, -h)
    }
    let o = n - 1,
      s = 1,
      u = 0
    for (this[r + o] = t & 255; --o >= 0 && (s *= 256); )
      t < 0 && u === 0 && this[r + o + 1] !== 0 && (u = 1),
        (this[r + o] = (((t / s) >> 0) - u) & 255)
    return r + n
  }
  a.prototype.writeInt8 = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 1, 127, -128),
      t < 0 && (t = 255 + t + 1),
      (this[r] = t & 255),
      r + 1
    )
  }
  a.prototype.writeInt16LE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 2, 32767, -32768),
      (this[r] = t & 255),
      (this[r + 1] = t >>> 8),
      r + 2
    )
  }
  a.prototype.writeInt16BE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 2, 32767, -32768),
      (this[r] = t >>> 8),
      (this[r + 1] = t & 255),
      r + 2
    )
  }
  a.prototype.writeInt32LE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 4, 2147483647, -2147483648),
      (this[r] = t & 255),
      (this[r + 1] = t >>> 8),
      (this[r + 2] = t >>> 16),
      (this[r + 3] = t >>> 24),
      r + 4
    )
  }
  a.prototype.writeInt32BE = function (t, r, n) {
    return (
      (t = +t),
      (r = r >>> 0),
      n || d(this, t, r, 4, 2147483647, -2147483648),
      t < 0 && (t = 4294967295 + t + 1),
      (this[r] = t >>> 24),
      (this[r + 1] = t >>> 16),
      (this[r + 2] = t >>> 8),
      (this[r + 3] = t & 255),
      r + 4
    )
  }
  a.prototype.writeBigInt64LE = L(function (t, r = 0) {
    return or(this, t, r, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
  })
  a.prototype.writeBigInt64BE = L(function (t, r = 0) {
    return sr(this, t, r, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
  })
  function ar(e, t, r, n, i, o) {
    if (r + n > e.length) throw new RangeError('Index out of range')
    if (r < 0) throw new RangeError('Index out of range')
  }
  function ur(e, t, r, n, i) {
    return (
      (t = +t),
      (r = r >>> 0),
      i || ar(e, t, r, 4, 34028234663852886e22, -34028234663852886e22),
      H.write(e, t, r, n, 23, 4),
      r + 4
    )
  }
  a.prototype.writeFloatLE = function (t, r, n) {
    return ur(this, t, r, !0, n)
  }
  a.prototype.writeFloatBE = function (t, r, n) {
    return ur(this, t, r, !1, n)
  }
  function hr(e, t, r, n, i) {
    return (
      (t = +t),
      (r = r >>> 0),
      i || ar(e, t, r, 8, 17976931348623157e292, -17976931348623157e292),
      H.write(e, t, r, n, 52, 8),
      r + 8
    )
  }
  a.prototype.writeDoubleLE = function (t, r, n) {
    return hr(this, t, r, !0, n)
  }
  a.prototype.writeDoubleBE = function (t, r, n) {
    return hr(this, t, r, !1, n)
  }
  a.prototype.copy = function (t, r, n, i) {
    if (!a.isBuffer(t)) throw new TypeError('argument should be a Buffer')
    if (
      (n || (n = 0),
      !i && i !== 0 && (i = this.length),
      r >= t.length && (r = t.length),
      r || (r = 0),
      i > 0 && i < n && (i = n),
      i === n || t.length === 0 || this.length === 0)
    )
      return 0
    if (r < 0) throw new RangeError('targetStart out of bounds')
    if (n < 0 || n >= this.length) throw new RangeError('Index out of range')
    if (i < 0) throw new RangeError('sourceEnd out of bounds')
    i > this.length && (i = this.length), t.length - r < i - n && (i = t.length - r + n)
    let o = i - n
    return (
      this === t && typeof Uint8Array.prototype.copyWithin == 'function'
        ? this.copyWithin(r, n, i)
        : Uint8Array.prototype.set.call(t, this.subarray(n, i), r),
      o
    )
  }
  a.prototype.fill = function (t, r, n, i) {
    if (typeof t == 'string') {
      if (
        (typeof r == 'string'
          ? ((i = r), (r = 0), (n = this.length))
          : typeof n == 'string' && ((i = n), (n = this.length)),
        i !== void 0 && typeof i != 'string')
      )
        throw new TypeError('encoding must be a string')
      if (typeof i == 'string' && !a.isEncoding(i)) throw new TypeError('Unknown encoding: ' + i)
      if (t.length === 1) {
        let s = t.charCodeAt(0)
        ;((i === 'utf8' && s < 128) || i === 'latin1') && (t = s)
      }
    } else typeof t == 'number' ? (t = t & 255) : typeof t == 'boolean' && (t = Number(t))
    if (r < 0 || this.length < r || this.length < n) throw new RangeError('Out of range index')
    if (n <= r) return this
    ;(r = r >>> 0), (n = n === void 0 ? this.length : n >>> 0), t || (t = 0)
    let o
    if (typeof t == 'number') for (o = r; o < n; ++o) this[o] = t
    else {
      let s = a.isBuffer(t) ? t : a.from(t, i),
        u = s.length
      if (u === 0) throw new TypeError('The value "' + t + '" is invalid for argument "value"')
      for (o = 0; o < n - r; ++o) this[o + r] = s[o % u]
    }
    return this
  }
  var K = {}
  function St(e, t, r) {
    K[e] = class extends r {
      constructor() {
        super(),
          Object.defineProperty(this, 'message', {
            value: t.apply(this, arguments),
            writable: !0,
            configurable: !0
          }),
          (this.name = `${this.name} [${e}]`),
          this.stack,
          delete this.name
      }
      get code() {
        return e
      }
      set code(i) {
        Object.defineProperty(this, 'code', {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0
        })
      }
      toString() {
        return `${this.name} [${e}]: ${this.message}`
      }
    }
  }
  St(
    'ERR_BUFFER_OUT_OF_BOUNDS',
    function (e) {
      return e
        ? `${e} is outside of buffer bounds`
        : 'Attempt to access memory outside buffer bounds'
    },
    RangeError
  )
  St(
    'ERR_INVALID_ARG_TYPE',
    function (e, t) {
      return `The "${e}" argument must be of type number. Received type ${typeof t}`
    },
    TypeError
  )
  St(
    'ERR_OUT_OF_RANGE',
    function (e, t, r) {
      let n = `The value of "${e}" is out of range.`,
        i = r
      return (
        Number.isInteger(r) && Math.abs(r) > 2 ** 32
          ? (i = Qt(String(r)))
          : typeof r == 'bigint' &&
            ((i = String(r)),
            (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = Qt(i)),
            (i += 'n')),
        (n += ` It must be ${t}. Received ${i}`),
        n
      )
    },
    RangeError
  )
  function Qt(e) {
    let t = '',
      r = e.length,
      n = e[0] === '-' ? 1 : 0
    for (; r >= n + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`
    return `${e.slice(0, r)}${t}`
  }
  function ae(e, t, r) {
    j(t, 'offset'), (e[t] === void 0 || e[t + r] === void 0) && W(t, e.length - (r + 1))
  }
  function fr(e, t, r, n, i, o) {
    if (e > r || e < t) {
      let s = typeof t == 'bigint' ? 'n' : '',
        u
      throw (
        (o > 3
          ? t === 0 || t === BigInt(0)
            ? (u = `>= 0${s} and < 2${s} ** ${(o + 1) * 8}${s}`)
            : (u = `>= -(2${s} ** ${(o + 1) * 8 - 1}${s}) and < 2 ** ${(o + 1) * 8 - 1}${s}`)
          : (u = `>= ${t}${s} and <= ${r}${s}`),
        new K.ERR_OUT_OF_RANGE('value', u, e))
      )
    }
    ae(n, i, o)
  }
  function j(e, t) {
    if (typeof e != 'number') throw new K.ERR_INVALID_ARG_TYPE(t, 'number', e)
  }
  function W(e, t, r) {
    throw Math.floor(e) !== e
      ? (j(e, r), new K.ERR_OUT_OF_RANGE(r || 'offset', 'an integer', e))
      : t < 0
        ? new K.ERR_BUFFER_OUT_OF_BOUNDS()
        : new K.ERR_OUT_OF_RANGE(r || 'offset', `>= ${r ? 1 : 0} and <= ${t}`, e)
  }
  var ue = /[^+/0-9A-Za-z-_]/g
  function he(e) {
    if (((e = e.split('=')[0]), (e = e.trim().replace(ue, '')), e.length < 2)) return ''
    for (; e.length % 4 !== 0; ) e = e + '='
    return e
  }
  function At(e, t) {
    t = t || 1 / 0
    let r,
      n = e.length,
      i = null,
      o = []
    for (let s = 0; s < n; ++s) {
      if (((r = e.charCodeAt(s)), r > 55295 && r < 57344)) {
        if (!i) {
          if (r > 56319) {
            ;(t -= 3) > -1 && o.push(239, 191, 189)
            continue
          } else if (s + 1 === n) {
            ;(t -= 3) > -1 && o.push(239, 191, 189)
            continue
          }
          i = r
          continue
        }
        if (r < 56320) {
          ;(t -= 3) > -1 && o.push(239, 191, 189), (i = r)
          continue
        }
        r = (((i - 55296) << 10) | (r - 56320)) + 65536
      } else i && (t -= 3) > -1 && o.push(239, 191, 189)
      if (((i = null), r < 128)) {
        if ((t -= 1) < 0) break
        o.push(r)
      } else if (r < 2048) {
        if ((t -= 2) < 0) break
        o.push((r >> 6) | 192, (r & 63) | 128)
      } else if (r < 65536) {
        if ((t -= 3) < 0) break
        o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (r & 63) | 128)
      } else if (r < 1114112) {
        if ((t -= 4) < 0) break
        o.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (r & 63) | 128)
      } else throw new Error('Invalid code point')
    }
    return o
  }
  function fe(e) {
    let t = []
    for (let r = 0; r < e.length; ++r) t.push(e.charCodeAt(r) & 255)
    return t
  }
  function ce(e, t) {
    let r,
      n,
      i,
      o = []
    for (let s = 0; s < e.length && !((t -= 2) < 0); ++s)
      (r = e.charCodeAt(s)), (n = r >> 8), (i = r % 256), o.push(i), o.push(n)
    return o
  }
  function cr(e) {
    return Bt.toByteArray(he(e))
  }
  function et(e, t, r, n) {
    let i
    for (i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i]
    return i
  }
  function A(e, t) {
    return (
      e instanceof t ||
      (e != null &&
        e.constructor != null &&
        e.constructor.name != null &&
        e.constructor.name === t.name)
    )
  }
  function Ut(e) {
    return e !== e
  }
  var pe = (function () {
    let e = '0123456789abcdef',
      t = new Array(256)
    for (let r = 0; r < 16; ++r) {
      let n = r * 16
      for (let i = 0; i < 16; ++i) t[n + i] = e[r] + e[i]
    }
    return t
  })()
  function L(e) {
    return typeof BigInt > 'u' ? le : e
  }
  function le() {
    throw new Error('BigInt not supported')
  }
})
var pr = T((Je, Ft) => {
  typeof window < 'u'
    ? ((window.global = window),
      (global.fetch = window.fetch),
      (Ft.exports = { Buffer: nt().Buffer, Crypto: window.crypto }))
    : (Ft.exports = { Buffer: nt().Buffer, Crypto: crypto })
})
var Lt = {}
Ar(Lt, {
  AVSCTap: () => $,
  ArweaveSigner: () => N,
  DataItem: () => _,
  MAX_TAG_BYTES: () => tt,
  MIN_BINARY_SIZE: () => gr,
  SIG_CONFIG: () => P,
  SignatureConfig: () => B,
  Signer: () => ot,
  createData: () => ge,
  deserializeTags: () => Q,
  indexToType: () => wt,
  serializeTags: () => dt,
  tagsExceedLimit: () => jr
})
var ot = class {
  signer
  publicKey
  signatureType
  signatureLength
  ownerLength
  pem
  static verify(t, r, n, i) {
    throw new Error('You must implement verify method on child')
  }
}
var vt = C(z(), 1)
var w = C(pt(), 1)
async function X(e) {
  if (Array.isArray(e)) {
    let i = (0, w.concatBuffers)([
      (0, w.stringToBuffer)('list'),
      (0, w.stringToBuffer)(e.length.toString())
    ])
    return await Gt(e, await x().hash(i, 'SHA-384'))
  }
  let t = e,
    r = (0, w.concatBuffers)([
      (0, w.stringToBuffer)('blob'),
      (0, w.stringToBuffer)(t.byteLength.toString())
    ]),
    n = (0, w.concatBuffers)([await x().hash(r, 'SHA-384'), await x().hash(t, 'SHA-384')])
  return await x().hash(n, 'SHA-384')
}
async function Gt(e, t) {
  if (e.length < 1) return t
  let r = (0, w.concatBuffers)([t, await X(e[0])]),
    n = await x().hash(r, 'SHA-384')
  return await Gt(e.slice(1), n)
}
var Z = C(Yt(), 1),
  $r = Z.default.default ? Z.default.default : Z.default,
  yt = class extends $r {
    getPublicKey(t) {
      throw new Error('Unimplemented')
    }
  },
  Kr
function x() {
  return (Kr ??= new yt())
}
var B
;(function (e) {
  ;(e[(e.ARWEAVE = 1)] = 'ARWEAVE'),
    (e[(e.ED25519 = 2)] = 'ED25519'),
    (e[(e.ETHEREUM = 3)] = 'ETHEREUM'),
    (e[(e.SOLANA = 4)] = 'SOLANA'),
    (e[(e.INJECTEDAPTOS = 5)] = 'INJECTEDAPTOS'),
    (e[(e.MULTIAPTOS = 6)] = 'MULTIAPTOS'),
    (e[(e.TYPEDETHEREUM = 7)] = 'TYPEDETHEREUM')
})(B || (B = {}))
var P = {
  [B.ARWEAVE]: { sigLength: 512, pubLength: 512, sigName: 'arweave' },
  [B.ED25519]: { sigLength: 64, pubLength: 32, sigName: 'ed25519' },
  [B.ETHEREUM]: { sigLength: 65, pubLength: 65, sigName: 'ethereum' },
  [B.SOLANA]: { sigLength: 64, pubLength: 32, sigName: 'solana' },
  [B.INJECTEDAPTOS]: { sigLength: 64, pubLength: 32, sigName: 'injectedAptos' },
  [B.MULTIAPTOS]: {
    sigLength: 64 * 32 + 4,
    pubLength: 32 * 32 + 1,
    sigName: 'multiAptos'
  },
  [B.TYPEDETHEREUM]: { sigLength: 65, pubLength: 42, sigName: 'typedEthereum' }
}
var N = class {
  signatureType = 1
  ownerLength = P[1].pubLength
  signatureLength = P[1].sigLength
  jwk
  pk
  constructor(t) {
    ;(this.pk = t.n), (this.jwk = t)
  }
  get publicKey() {
    return vt.default.toBuffer(this.pk)
  }
  sign(t) {
    return x().sign(this.jwk, t)
  }
  static async verify(t, r, n) {
    return await x().verify(t, r, n)
  }
}
var wt = { 1: N }
var E = C(z(), 1)
async function v(e) {
  return X([
    (0, w.stringToBuffer)('dataitem'),
    (0, w.stringToBuffer)('1'),
    (0, w.stringToBuffer)(e.signatureType.toString()),
    e.rawOwner,
    e.rawTarget,
    e.rawAnchor,
    e.rawTags,
    e.rawData
  ])
}
async function Hr(e, t) {
  let r = await v(e),
    n = await t.sign(r),
    i = await x().hash(n)
  return { signature: Buffer.from(n), id: Buffer.from(i) }
}
async function Wt(e, t) {
  let { signature: r, id: n } = await Hr(e, t)
  return e.getRaw().set(r, 2), n
}
var $ = class {
  buf
  pos
  constructor(t = Buffer.alloc(tt), r = 0) {
    ;(this.buf = t), (this.pos = r)
  }
  writeTags(t) {
    if (!Array.isArray(t)) throw new Error('input must be array')
    let r = t.length,
      n
    if (r)
      for (this.writeLong(r), n = 0; n < r; n++) {
        let i = t[n]
        if (i?.name === void 0 || i?.value === void 0)
          throw new Error(`Invalid tag format for ${i}, expected {name:string, value: string}`)
        this.writeString(i.name), this.writeString(i.value)
      }
    this.writeLong(0)
  }
  toBuffer() {
    let t = Buffer.alloc(this.pos)
    if (this.pos > this.buf.length)
      throw new Error(`Too many tag bytes (${this.pos} > ${this.buf.length})`)
    return this.buf.copy(t, 0, 0, this.pos), t
  }
  tagsExceedLimit() {
    return this.pos > this.buf.length
  }
  writeLong(t) {
    let r = this.buf,
      n,
      i
    if (t >= -1073741824 && t < 1073741824) {
      i = t >= 0 ? t << 1 : (~t << 1) | 1
      do (r[this.pos] = i & 127), (i >>= 7)
      while (i && (r[this.pos++] |= 128))
    } else {
      n = t >= 0 ? t * 2 : -t * 2 - 1
      do (r[this.pos] = n & 127), (n /= 128)
      while (n >= 1 && (r[this.pos++] |= 128))
    }
    this.pos++, (this.buf = r)
  }
  writeString(t) {
    let r = Buffer.byteLength(t),
      n = this.buf
    this.writeLong(r)
    let i = this.pos
    if (((this.pos += r), !(this.pos > n.length))) {
      if (r > 64) this.buf.write(t, this.pos - r, r, 'utf8')
      else {
        let o, s, u, h
        for (o = 0, s = r; o < s; o++)
          (u = t.charCodeAt(o)),
            u < 128
              ? (n[i++] = u)
              : u < 2048
                ? ((n[i++] = (u >> 6) | 192), (n[i++] = (u & 63) | 128))
                : (u & 64512) === 55296 && ((h = t.charCodeAt(o + 1)) & 64512) === 56320
                  ? ((u = 65536 + ((u & 1023) << 10) + (h & 1023)),
                    o++,
                    (n[i++] = (u >> 18) | 240),
                    (n[i++] = ((u >> 12) & 63) | 128),
                    (n[i++] = ((u >> 6) & 63) | 128),
                    (n[i++] = (u & 63) | 128))
                  : ((n[i++] = (u >> 12) | 224),
                    (n[i++] = ((u >> 6) & 63) | 128),
                    (n[i++] = (u & 63) | 128))
      }
      this.buf = n
    }
  }
  readLong() {
    let t = 0,
      r = 0,
      n = this.buf,
      i,
      o,
      s,
      u
    do (i = n[this.pos++]), (o = i & 128), (t |= (i & 127) << r), (r += 7)
    while (o && r < 28)
    if (o) {
      ;(s = t), (u = 268435456)
      do (i = n[this.pos++]), (s += (i & 127) * u), (u *= 128)
      while (i & 128)
      return (s % 2 ? -(s + 1) : s) / 2
    }
    return (t >> 1) ^ -(t & 1)
  }
  skipLong() {
    let t = this.buf
    for (; t[this.pos++] & 128; );
  }
  readTags() {
    let t = [],
      r
    for (; (r = this.readLong()); )
      for (r < 0 && ((r = -r), this.skipLong()); r--; ) {
        let n = this.readString(),
          i = this.readString()
        t.push({ name: n, value: i })
      }
    return t
  }
  readString() {
    let t = this.readLong(),
      r = this.pos,
      n = this.buf
    if (((this.pos += t), !(this.pos > n.length))) return this.buf.slice(r, r + t).toString()
  }
}
function dt(e) {
  let t = new $()
  return t.writeTags(e), t.toBuffer()
}
function jr(e) {
  let t = new $()
  return t.writeTags(e), t.tagsExceedLimit()
}
function Q(e) {
  return new $(e).readTags()
}
function I(e) {
  let t = 0
  for (let r = e.length - 1; r >= 0; r--) t = t * 256 + e[r]
  return t
}
function Vt(e) {
  if (e > (2 ^ (32 - 1))) throw new Error('Short too long')
  let t = [0, 0]
  for (let r = 0; r < t.length; r++) {
    let n = e & 255
    ;(t[r] = n), (e = (e - n) / 256)
  }
  return Uint8Array.from(t)
}
function xt(e) {
  let t = [0, 0, 0, 0, 0, 0, 0, 0]
  for (let r = 0; r < t.length; r++) {
    let n = e & 255
    ;(t[r] = n), (e = (e - n) / 256)
  }
  return Uint8Array.from(t)
}
var lr = C(pr(), 1),
  M = C(nt(), 1),
  tt = 4096,
  gr = 80,
  _ = class {
    binary
    _id
    constructor(t) {
      this.binary = t
    }
    static isDataItem(t) {
      return t.binary !== void 0
    }
    get signatureType() {
      let t = I(this.binary.subarray(0, 2))
      if (B?.[t] !== void 0) return t
      throw new Error('Unknown signature type: ' + t)
    }
    async isValid() {
      return _.verify(this.binary)
    }
    get id() {
      return (async () => E.default.encode(await this.rawId))()
    }
    set id(t) {
      this._id = E.default.toBuffer(t)
    }
    get rawId() {
      return (async () =>
        M.Buffer.from(await lr.Crypto.subtle.digest('SHA-256', this.rawSignature)))()
    }
    set rawId(t) {
      this._id = t
    }
    get rawSignature() {
      return this.binary.subarray(2, 2 + this.signatureLength)
    }
    get signature() {
      return E.default.encode(this.rawSignature)
    }
    set rawOwner(t) {
      if (t.byteLength != this.ownerLength)
        throw new Error(
          `Expected raw owner (pubkey) to be ${this.ownerLength} bytes, got ${t.byteLength} bytes.`
        )
      this.binary.set(t, 2 + this.signatureLength)
    }
    get rawOwner() {
      return this.binary.subarray(
        2 + this.signatureLength,
        2 + this.signatureLength + this.ownerLength
      )
    }
    get signatureLength() {
      return P[this.signatureType].sigLength
    }
    get owner() {
      return E.default.encode(this.rawOwner)
    }
    get ownerLength() {
      return P[this.signatureType].pubLength
    }
    get rawTarget() {
      let t = this.getTargetStart()
      return this.binary[t] == 1 ? this.binary.subarray(t + 1, t + 33) : M.Buffer.alloc(0)
    }
    get target() {
      return E.default.encode(this.rawTarget)
    }
    get rawAnchor() {
      let t = this.getAnchorStart()
      return this.binary[t] == 1 ? this.binary.subarray(t + 1, t + 33) : M.Buffer.alloc(0)
    }
    get anchor() {
      return this.rawAnchor.toString()
    }
    get rawTags() {
      let t = this.getTagsStart(),
        r = I(this.binary.subarray(t + 8, t + 16))
      return this.binary.subarray(t + 16, t + 16 + r)
    }
    get tags() {
      let t = this.getTagsStart()
      if (I(this.binary.subarray(t, t + 8)) == 0) return []
      let n = I(this.binary.subarray(t + 8, t + 16))
      return Q(M.Buffer.from(this.binary.subarray(t + 16, t + 16 + n)))
    }
    get tagsB64Url() {
      return this.tags.map((r) => ({
        name: E.default.encode(r.name),
        value: E.default.encode(r.value)
      }))
    }
    getStartOfData() {
      let t = this.getTagsStart(),
        r = this.binary.subarray(t + 8, t + 16),
        n = I(r)
      return t + 16 + n
    }
    get rawData() {
      let t = this.getTagsStart(),
        r = this.binary.subarray(t + 8, t + 16),
        n = I(r),
        i = t + 16 + n
      return this.binary.subarray(i, this.binary.length)
    }
    get data() {
      return E.default.encode(this.rawData)
    }
    getRaw() {
      return this.binary
    }
    async sign(t) {
      return (this._id = await Wt(this, t)), this.rawId
    }
    async setSignature(t) {
      this.binary.set(t, 2), (this._id = M.Buffer.from(await x().hash(t)))
    }
    isSigned() {
      return (this._id?.length ?? 0) > 0
    }
    toJSON() {
      return {
        signature: this.signature,
        owner: this.owner,
        target: this.target,
        tags: this.tags.map((t) => ({
          name: E.default.encode(t.name),
          value: E.default.encode(t.value)
        })),
        data: this.data
      }
    }
    static async verify(t) {
      if (t.byteLength < gr) return !1
      let r = new _(t),
        n = r.signatureType,
        i = r.getTagsStart(),
        o = I(t.subarray(i, i + 8)),
        s = t.subarray(i + 8, i + 16),
        u = I(s)
      if (u > tt) return !1
      if (o > 0)
        try {
          if (Q(M.Buffer.from(t.subarray(i + 16, i + 16 + u))).length !== o) return !1
        } catch {
          return !1
        }
      let h = wt[n],
        p = await v(r)
      return await h.verify(r.rawOwner, p, r.rawSignature)
    }
    async getSignatureData() {
      return v(this)
    }
    getTagsStart() {
      let t = this.getTargetStart(),
        r = this.binary[t] == 1,
        n = t + (r ? 33 : 1),
        i = this.binary[n] == 1
      return (n += i ? 33 : 1), n
    }
    getTargetStart() {
      return 2 + this.signatureLength + this.ownerLength
    }
    getAnchorStart() {
      let t = this.getTargetStart() + 1,
        r = this.binary[this.getTargetStart()] == 1
      return (t += r ? 32 : 0), t
    }
  }
var yr = C(z(), 1)
function ge(e, t, r) {
  let n = t.publicKey,
    i = r?.target ? yr.default.toBuffer(r.target) : null,
    o = 1 + (i?.byteLength ?? 0),
    s = r?.anchor ? Buffer.from(r.anchor) : null,
    u = 1 + (s?.byteLength ?? 0),
    h = (r?.tags?.length ?? 0) > 0 ? dt(r.tags) : null,
    p = 16 + (h ? h.byteLength : 0),
    f = Buffer.from(e),
    c = f.byteLength,
    U = 2 + t.signatureLength + t.ownerLength + o + u + p + c,
    l = Buffer.alloc(U)
  if (
    (l.set(Vt(t.signatureType), 0),
    l.set(new Uint8Array(t.signatureLength).fill(0), 2),
    n.byteLength !== t.ownerLength)
  )
    throw new Error(`Owner must be ${t.ownerLength} bytes, but was incorrectly ${n.byteLength}`)
  l.set(n, 2 + t.signatureLength)
  let R = 2 + t.signatureLength + t.ownerLength
  if (((l[R] = i ? 1 : 0), i)) {
    if (i.byteLength !== 32)
      throw new Error(`Target must be 32 bytes but was incorrectly ${i.byteLength}`)
    l.set(i, R + 1)
  }
  let G = R + o,
    Y = G + 1
  if (((l[G] = s ? 1 : 0), s)) {
    if (((Y += s.byteLength), s.byteLength !== 32)) throw new Error('Anchor must be 32 bytes')
    l.set(s, G + 1)
  }
  l.set(xt(r?.tags?.length ?? 0), Y)
  let wr = xt(h?.byteLength ?? 0)
  l.set(wr, Y + 8), h && l.set(h, Y + 16)
  let dr = Y + p
  return l.set(f, dr), new _(l)
}
var _t = { ...Lt }
globalThis.arbundles ??= _t
var wn = _t,
  dn = _t
export {
  $ as AVSCTap,
  N as ArweaveSigner,
  _ as DataItem,
  tt as MAX_TAG_BYTES,
  gr as MIN_BINARY_SIZE,
  P as SIG_CONFIG,
  B as SignatureConfig,
  ot as Signer,
  ge as createData,
  wn as default,
  Q as deserializeTags,
  wt as indexToType,
  dt as serializeTags,
  jr as tagsExceedLimit,
  dn as warparbundles
}
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/

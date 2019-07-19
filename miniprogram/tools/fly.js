!function (e, t) { if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { var n = t(); for (var r in n) ("object" == typeof exports ? exports : e)[r] = n[r] } }(this, function () { return function (e) { function t(r) { if (n[r]) return n[r].exports; var o = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports } var n = {}; return t.m = e, t.c = n, t.i = function (e) { return e }, t.d = function (e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function (e) { var n = e && e.__esModule ? function () { return e.default } : function () { return e }; return t.d(n, "a", n), n }, t.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 11) }([function (e, t, n) { "use strict"; var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }; e.exports = { type: function (e) { return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() }, isObject: function (e, t) { return t ? "object" === this.type(e) : e && "object" === (void 0 === e ? "undefined" : r(e)) }, isFormData: function (e) { return "undefined" != typeof FormData && e instanceof FormData }, trim: function (e) { return e.replace(/(^\s*)|(\s*$)/g, "") }, encode: function (e) { return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") }, formatParams: function (e) { function t(e, r) { var a = s.encode, i = s.type(e); if ("array" == i) e.forEach(function (e, n) { t(e, r + "%5B%5D") }); else if ("object" == i) for (var u in e) r ? t(e[u], r + "%5B" + a(u) + "%5D") : t(e[u], a(u)); else o || (n += "&"), o = !1, n += r + "=" + a(e) } var n = "", o = !0, s = this; return "object" != (void 0 === e ? "undefined" : r(e)) ? e : (t(e, ""), n) }, merge: function (e, t) { for (var n in t) e.hasOwnProperty(n) ? this.isObject(t[n], 1) && this.isObject(e[n], 1) && this.merge(e[n], t[n]) : e[n] = t[n]; return e } } }, function (e, t, n) { function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } function o(e) { return function () { function t() { r(this, t), this.requestHeaders = {}, this.readyState = 0, this.timeout = 0, this.responseURL = "", this.responseHeaders = {} } return a(t, [{ key: "_call", value: function (e) { this[e] && this[e].apply(this, [].splice.call(arguments, 1)) } }, { key: "_changeReadyState", value: function (e) { this.readyState = e, this._call("onreadystatechange") } }, { key: "open", value: function (e, t) { if (this.method = e, t) { if (t = i.trim(t), 0 !== t.indexOf("http") && u) { var n = document.createElement("a"); n.href = t, t = n.href } } else t = location.href; this.responseURL = t, this._changeReadyState(1) } }, { key: "send", value: function (t) { var n = this; if (t = t || null, u) { var r = document.cookie; r && (this.requestHeaders.cookie = r) } var o = this; if (e) { var a = { method: o.method, url: o.responseURL, headers: o.requestHeaders || {}, body: t }; i.merge(a, o._options || {}), "GET" === a.method && (a.body = null), o._changeReadyState(3); var c; o.timeout = o.timeout || 0, o.timeout > 0 && (c = setTimeout(function () { 3 === o.readyState && (n._call("onloadend"), o._changeReadyState(0), o._call("ontimeout")) }, o.timeout)), a.timeout = o.timeout, e(a, function (e) { function t(t) { var n = e[t]; return delete e[t], n } if (3 === o.readyState) { clearTimeout(c), o.status = t("statusCode") - 0; var n = t("responseText"), r = t("statusMessage"); if (o.status) { var a = t("headers"), i = {}; for (var f in a) { var l = a[f], p = f.toLowerCase(); "object" === (void 0 === l ? "undefined" : s(l)) ? i[p] = l : (i[p] = i[p] || [], i[p].push(l)) } var d = i["set-cookie"]; u && d && d.forEach(function (e) { document.cookie = e.replace(/;\s*httpOnly/gi, "") }), o.responseHeaders = i, o.statusText = r || "", o.response = o.responseText = n, o._response = e, o._changeReadyState(4), o._call("onload") } else o.statusText = n, o._call("onerror", { msg: r }); o._call("onloadend") } }) } else console.error("Ajax require adapter") } }, { key: "setRequestHeader", value: function (e, t) { this.requestHeaders[i.trim(e)] = t } }, { key: "getResponseHeader", value: function (e) { return (this.responseHeaders[e.toLowerCase()] || "").toString() || null } }, { key: "getAllResponseHeaders", value: function () { var e = ""; for (var t in this.responseHeaders) e += t + ":" + this.getResponseHeader(t) + "\r\n"; return e || null } }, { key: "abort", value: function (e) { this._changeReadyState(0), this._call("onerror", { msg: e }), this._call("onloadend") } }], [{ key: "setAdapter", value: function (t) { e = t } }]), t }() } var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }, a = function () { function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function (t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(), i = n(0), u = "undefined" != typeof document; e.exports = o }, function (e, t, n) { function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } var o = function () { function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function (t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(), s = n(0), a = "undefined" != typeof document, i = function () { function e(t) { function n(e) { var t; s.merge(e, { lock: function () { t || (e.p = new Promise(function (e) { t = e })) }, unlock: function () { t && (t(), e.p = t = null) } }) } r(this, e), this.engine = t || XMLHttpRequest, this.default = this; var o = this.interceptors = { response: { use: function (e, t) { this.handler = e, this.onerror = t } }, request: { use: function (e) { this.handler = e } } }, a = o.request; n(o.response), n(a), this.config = { method: "GET", baseURL: "", headers: {}, timeout: 0, parseJson: !0, withCredentials: !1 } } return o(e, [{ key: "request", value: function (e, t, n) { var r = this, o = new this.engine, i = "Content-Type", u = i.toLowerCase(), c = this.interceptors, f = c.request, l = c.response, p = f.handler, d = new Promise(function (c, d) { function h(e) { return e && e.then && e.catch } function m(e, t) { e ? e.then(function () { t() }) : t() } function y(n) { function r(e, t, r) { m(l.p, function () { if (e) { r && (t.request = n); var o = e.call(l, t, Promise); t = void 0 === o ? t : o } h(t) || (t = Promise[0 === r ? "resolve" : "reject"](t)), t.then(function (e) { c(e) }).catch(function (e) { d(e) }) }) } function u(e) { e.engine = o, r(l.onerror, e, -1) } function f(e, t) { this.message = e, this.status = t } t = n.body, e = s.trim(n.url); var p = s.trim(n.baseURL || ""); if (e || !a || p || (e = location.href), 0 !== e.indexOf("http")) { var y = "/" === e[0]; if (!p && a) { var v = location.pathname.split("/"); v.pop(), p = location.protocol + "//" + location.host + (y ? "" : v.join("/")) } if ("/" !== p[p.length - 1] && (p += "/"), e = p + (y ? e.substr(1) : e), a) { var g = document.createElement("a"); g.href = e, e = g.href } } var b = s.trim(n.responseType || ""); o.withCredentials = !!n.withCredentials; var x = "GET" === n.method; x && t && ("string" !== s.type(t) && (t = s.formatParams(t)), e += (-1 === e.indexOf("?") ? "?" : "&") + t), o.open(n.method, e); try { o.timeout = n.timeout || 0, "stream" !== b && (o.responseType = b) } catch (e) { } if (!x) { var w = "application/x-www-form-urlencoded"; s.trim((n.headers[i] || "").toLowerCase()) === w ? t = s.formatParams(t) : s.isFormData(t) || -1 === ["object", "array"].indexOf(s.type(t)) || (w = "application/json;charset=utf-8", t = JSON.stringify(t)), n.headers[i] = w } for (var k in n.headers) if (k !== i || !s.isFormData(t) && t && !x) try { o.setRequestHeader(k, n.headers[k]) } catch (e) { } else delete n.headers[k]; o.onload = function () { var e = o.response || o.responseText; n.parseJson && -1 !== (o.getResponseHeader(i) || "").indexOf("json") && !s.isObject(e) && (e = JSON.parse(e)); var t = {}, a = (o.getAllResponseHeaders() || "").split("\r\n"); a.pop(), a.forEach(function (e) { var n = e.split(":")[0]; t[n] = o.getResponseHeader(n) }); var c = o.status, p = o.statusText, d = { data: e, headers: t, status: c, statusText: p }; if (s.merge(d, o._response), c >= 200 && c < 300 || 304 === c) d.engine = o, d.request = n, r(l.handler, d, 0); else { var h = new f(p, c); h.response = d, u(h) } }, o.onerror = function (e) { u(new f(e.msg || "Network Error", 0)) }, o.ontimeout = function () { u(new f("timeout [ " + o.timeout + "ms ]", 1)) }, o._options = n, setTimeout(function () { o.send(x ? null : t) }, 0) } s.isObject(e) && (n = e, e = n.url), n = n || {}, n.headers = n.headers || {}, m(f.p, function () { s.merge(n, r.config); var o = n.headers; o[i] = o[i] || o[u] || "", delete o[u], n.body = t || n.body, e = s.trim(e || ""), n.method = n.method.toUpperCase(), n.url = e; var a = n; p && (a = p.call(f, n, Promise) || n), h(a) || (a = Promise.resolve(a)), a.then(function (e) { e === n ? y(e) : c(e) }, function (e) { d(e) }) }) }); return d.engine = o, d } }, { key: "all", value: function (e) { return Promise.all(e) } }, { key: "spread", value: function (e) { return function (t) { return e.apply(null, t) } } }, { key: "lock", value: function () { this.interceptors.request.lock() } }, { key: "unlock", value: function () { this.interceptors.request.unlock() } }]), e }(); i.default = i, ["get", "post", "put", "patch", "head", "delete"].forEach(function (e) { i.prototype[e] = function (t, n, r) { return this.request(t, n, s.merge({ method: e }, r)) } }), e.exports = i }, , , , function (e, t, n) { "use strict"; e.exports = function (e, t) { var n = { method: e.method, url: e.url, dataType: e.dataType || void 0, header: e.headers, data: e.body || {}, success: function (e) { t({ statusCode: e.statusCode, responseText: e.data, headers: e.header, statusMessage: e.errMsg }) }, fail: function (e) { t({ statusCode: e.statusCode || 0, statusMessage: e.errMsg }) } }; wx.request(n) } }, , , , , function (e, t, n) { "use strict"; var r = n(2), o = n(1), s = n(6), a = o(s); e.exports = function (e) { return new r(e || a) } }]) });
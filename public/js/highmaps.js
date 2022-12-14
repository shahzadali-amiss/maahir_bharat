/*
 Highmaps JS v9.3.3 (2022-02-01)
 
 (c) 2011-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (Y, G) {
    "object" === typeof module && module.exports
        ? ((G["default"] = G), (module.exports = Y.document ? G(Y) : G))
        : "function" === typeof define && define.amd
        ? define("highcharts/highmaps", function () {
              return G(Y);
          })
        : (Y.Highcharts && Y.Highcharts.error(16, !0), (Y.Highcharts = G(Y)));
})("undefined" !== typeof window ? window : this, function (Y) {
    function G(v, b, A, E) {
        v.hasOwnProperty(b) || (v[b] = E.apply(null, A));
    }
    var b = {};
    G(b, "Core/Globals.js", [], function () {
        var v = "undefined" !== typeof Y ? Y : "undefined" !== typeof window ? window : {},
            b;
        (function (b) {
            b.SVG_NS = "http://www.w3.org/2000/svg";
            b.product = "Highcharts";
            b.version = "9.3.3";
            b.win = v;
            b.doc = b.win.document;
            b.svg = b.doc && b.doc.createElementNS && !!b.doc.createElementNS(b.SVG_NS, "svg").createSVGRect;
            b.userAgent = (b.win.navigator && b.win.navigator.userAgent) || "";
            b.isChrome = -1 !== b.userAgent.indexOf("Chrome");
            b.isFirefox = -1 !== b.userAgent.indexOf("Firefox");
            b.isMS = /(edge|msie|trident)/i.test(b.userAgent) && !b.win.opera;
            b.isSafari = !b.isChrome && -1 !== b.userAgent.indexOf("Safari");
            b.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(b.userAgent);
            b.isWebKit = -1 !== b.userAgent.indexOf("AppleWebKit");
            b.deg2rad = (2 * Math.PI) / 360;
            b.hasBidiBug = b.isFirefox && 4 > parseInt(b.userAgent.split("Firefox/")[1], 10);
            b.hasTouch = !!b.win.TouchEvent;
            b.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            b.noop = function () {};
            b.supportsPassiveEvents = (function () {
                var v = !1;
                if (!b.isMS) {
                    var p = Object.defineProperty({}, "passive", {
                        get: function () {
                            v = !0;
                        },
                    });
                    b.win.addEventListener && b.win.removeEventListener && (b.win.addEventListener("testPassive", b.noop, p), b.win.removeEventListener("testPassive", b.noop, p));
                }
                return v;
            })();
            b.charts = [];
            b.dateFormats = {};
            b.seriesTypes = {};
            b.symbolSizes = {};
            b.chartCount = 0;
        })(b || (b = {}));
        ("");
        return b;
    });
    G(b, "Core/Utilities.js", [b["Core/Globals.js"]], function (b) {
        function v(c, l, a, f) {
            var F = l ? "Highcharts error" : "Highcharts warning";
            32 === c && (c = F + ": Deprecated member");
            var d = n(c),
                m = d ? F + " #" + c + ": www.highcharts.com/errors/" + c + "/" : c.toString();
            if ("undefined" !== typeof f) {
                var e = "";
                d && (m += "?");
                r(f, function (c, F) {
                    e += "\n - " + F + ": " + c;
                    d && (m += encodeURI(F) + "=" + encodeURI(c));
                });
                m += e;
            }
            z(b, "displayError", { chart: a, code: c, message: m, params: f }, function () {
                if (l) throw Error(m);
                y.console && -1 === v.messages.indexOf(m) && console.warn(m);
            });
            v.messages.push(m);
        }
        function A(c, l) {
            var F = {};
            r(c, function (a, f) {
                if (B(c[f], !0) && !c.nodeType && l[f]) (a = A(c[f], l[f])), Object.keys(a).length && (F[f] = a);
                else if (B(c[f]) || c[f] !== l[f]) F[f] = c[f];
            });
            return F;
        }
        function E(c, f) {
            return parseInt(c, f || 10);
        }
        function w(c) {
            return "string" === typeof c;
        }
        function D(c) {
            c = Object.prototype.toString.call(c);
            return "[object Array]" === c || "[object Array Iterator]" === c;
        }
        function B(c, f) {
            return !!c && "object" === typeof c && (!f || !D(c));
        }
        function k(c) {
            return B(c) && "number" === typeof c.nodeType;
        }
        function t(c) {
            var f = c && c.constructor;
            return !(!B(c, !0) || k(c) || !f || !f.name || "Object" === f.name);
        }
        function n(c) {
            return "number" === typeof c && !isNaN(c) && Infinity > c && -Infinity < c;
        }
        function h(c) {
            return "undefined" !== typeof c && null !== c;
        }
        function d(c, f, l) {
            var a;
            w(f)
                ? h(l)
                    ? c.setAttribute(f, l)
                    : c && c.getAttribute && ((a = c.getAttribute(f)) || "class" !== f || (a = c.getAttribute(f + "Name")))
                : r(f, function (f, l) {
                      h(f) ? c.setAttribute(l, f) : c.removeAttribute(l);
                  });
            return a;
        }
        function a(c, f) {
            var l;
            c || (c = {});
            for (l in f) c[l] = f[l];
            return c;
        }
        function e() {
            for (var c = arguments, f = c.length, l = 0; l < f; l++) {
                var a = c[l];
                if ("undefined" !== typeof a && null !== a) return a;
            }
        }
        function g(c, f) {
            b.isMS && !b.svg && f && "undefined" !== typeof f.opacity && (f.filter = "alpha(opacity=" + 100 * f.opacity + ")");
            a(c.style, f);
        }
        function x(c, f) {
            return 1e14 < c ? c : parseFloat(c.toPrecision(f || 14));
        }
        function C(c, f, l) {
            var a = b.getStyle || C;
            if ("width" === f)
                return (
                    (f = Math.min(c.offsetWidth, c.scrollWidth)),
                    (l = c.getBoundingClientRect && c.getBoundingClientRect().width),
                    l < f && l >= f - 1 && (f = Math.floor(l)),
                    Math.max(0, f - (a(c, "padding-left", !0) || 0) - (a(c, "padding-right", !0) || 0))
                );
            if ("height" === f) return Math.max(0, Math.min(c.offsetHeight, c.scrollHeight) - (a(c, "padding-top", !0) || 0) - (a(c, "padding-bottom", !0) || 0));
            y.getComputedStyle || v(27, !0);
            if ((c = y.getComputedStyle(c, void 0))) {
                var d = c.getPropertyValue(f);
                e(l, "opacity" !== f) && (d = E(d));
            }
            return d;
        }
        function r(c, f, l) {
            for (var a in c) Object.hasOwnProperty.call(c, a) && f.call(l || c[a], c[a], a, c);
        }
        function q(c, f, l) {
            function a(f, l) {
                var a = c.removeEventListener || b.removeEventListenerPolyfill;
                a && a.call(c, f, l, !1);
            }
            function d(l) {
                var d;
                if (c.nodeName) {
                    if (f) {
                        var m = {};
                        m[f] = !0;
                    } else m = l;
                    r(m, function (c, f) {
                        if (l[f]) for (d = l[f].length; d--; ) a(f, l[f][d].fn);
                    });
                }
            }
            var m = ("function" === typeof c && c.prototype) || c;
            if (Object.hasOwnProperty.call(m, "hcEvents")) {
                var F = m.hcEvents;
                f
                    ? ((m = F[f] || []),
                      l
                          ? ((F[f] = m.filter(function (c) {
                                return l !== c.fn;
                            })),
                            a(f, l))
                          : (d(F), (F[f] = [])))
                    : (d(F), delete m.hcEvents);
            }
        }
        function z(c, l, d, m) {
            d = d || {};
            if (f.createEvent && (c.dispatchEvent || (c.fireEvent && c !== b))) {
                var F = f.createEvent("Events");
                F.initEvent(l, !0, !0);
                d = a(F, d);
                c.dispatchEvent ? c.dispatchEvent(d) : c.fireEvent(l, d);
            } else if (c.hcEvents) {
                d.target ||
                    a(d, {
                        preventDefault: function () {
                            d.defaultPrevented = !0;
                        },
                        target: c,
                        type: l,
                    });
                F = [];
                for (var e = c, q = !1; e.hcEvents; ) Object.hasOwnProperty.call(e, "hcEvents") && e.hcEvents[l] && (F.length && (q = !0), F.unshift.apply(F, e.hcEvents[l])), (e = Object.getPrototypeOf(e));
                q &&
                    F.sort(function (c, f) {
                        return c.order - f.order;
                    });
                F.forEach(function (f) {
                    !1 === f.fn.call(c, d) && d.preventDefault();
                });
            }
            m && !d.defaultPrevented && m.call(c, d);
        }
        var m = b.charts,
            f = b.doc,
            y = b.win;
        (v || (v = {})).messages = [];
        Math.easeInOutSine = function (c) {
            return -0.5 * (Math.cos(Math.PI * c) - 1);
        };
        var c = Array.prototype.find
            ? function (c, f) {
                  return c.find(f);
              }
            : function (c, f) {
                  var l,
                      a = c.length;
                  for (l = 0; l < a; l++) if (f(c[l], l)) return c[l];
              };
        r({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (c, f) {
            b[f] = function (l) {
                var a;
                v(32, !1, void 0, ((a = {}), (a["Highcharts." + f] = "use Array." + c), a));
                return Array.prototype[c].apply(l, [].slice.call(arguments, 1));
            };
        });
        var u,
            l = (function () {
                var c = Math.random().toString(36).substring(2, 9) + "-",
                    f = 0;
                return function () {
                    return "highcharts-" + (u ? "" : c) + f++;
                };
            })();
        y.jQuery &&
            (y.jQuery.fn.highcharts = function () {
                var c = [].slice.call(arguments);
                if (this[0]) return c[0] ? (new b[w(c[0]) ? c.shift() : "Chart"](this[0], c[0], c[1]), this) : m[d(this[0], "data-highcharts-chart")];
            });
        c = {
            addEvent: function (c, f, l, a) {
                void 0 === a && (a = {});
                var d = ("function" === typeof c && c.prototype) || c;
                Object.hasOwnProperty.call(d, "hcEvents") || (d.hcEvents = {});
                d = d.hcEvents;
                b.Point && c instanceof b.Point && c.series && c.series.chart && (c.series.chart.runTrackerClick = !0);
                var m = c.addEventListener || b.addEventListenerPolyfill;
                m && m.call(c, f, l, b.supportsPassiveEvents ? { passive: void 0 === a.passive ? -1 !== f.indexOf("touch") : a.passive, capture: !1 } : !1);
                d[f] || (d[f] = []);
                d[f].push({ fn: l, order: "number" === typeof a.order ? a.order : Infinity });
                d[f].sort(function (c, f) {
                    return c.order - f.order;
                });
                return function () {
                    q(c, f, l);
                };
            },
            arrayMax: function (c) {
                for (var f = c.length, l = c[0]; f--; ) c[f] > l && (l = c[f]);
                return l;
            },
            arrayMin: function (c) {
                for (var f = c.length, l = c[0]; f--; ) c[f] < l && (l = c[f]);
                return l;
            },
            attr: d,
            clamp: function (c, f, l) {
                return c > f ? (c < l ? c : l) : f;
            },
            cleanRecursively: A,
            clearTimeout: function (c) {
                h(c) && clearTimeout(c);
            },
            correctFloat: x,
            createElement: function (c, l, d, m, e) {
                c = f.createElement(c);
                l && a(c, l);
                e && g(c, { padding: "0", border: "none", margin: "0" });
                d && g(c, d);
                m && m.appendChild(c);
                return c;
            },
            css: g,
            defined: h,
            destroyObjectProperties: function (c, f) {
                r(c, function (l, a) {
                    l && l !== f && l.destroy && l.destroy();
                    delete c[a];
                });
            },
            discardElement: function (c) {
                c && c.parentElement && c.parentElement.removeChild(c);
            },
            erase: function (c, f) {
                for (var l = c.length; l--; )
                    if (c[l] === f) {
                        c.splice(l, 1);
                        break;
                    }
            },
            error: v,
            extend: a,
            extendClass: function (c, f) {
                var l = function () {};
                l.prototype = new c();
                a(l.prototype, f);
                return l;
            },
            find: c,
            fireEvent: z,
            getMagnitude: function (c) {
                return Math.pow(10, Math.floor(Math.log(c) / Math.LN10));
            },
            getNestedProperty: function (c, f) {
                for (c = c.split("."); c.length && h(f); ) {
                    var l = c.shift();
                    if ("undefined" === typeof l || "__proto__" === l) return;
                    f = f[l];
                    if (!h(f) || "function" === typeof f || "number" === typeof f.nodeType || f === y) return;
                }
                return f;
            },
            getStyle: C,
            inArray: function (c, f, l) {
                v(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
                return f.indexOf(c, l);
            },
            isArray: D,
            isClass: t,
            isDOMElement: k,
            isFunction: function (c) {
                return "function" === typeof c;
            },
            isNumber: n,
            isObject: B,
            isString: w,
            keys: function (c) {
                v(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
                return Object.keys(c);
            },
            merge: function () {
                var c,
                    f = arguments,
                    l = {},
                    a = function (c, f) {
                        "object" !== typeof c && (c = {});
                        r(f, function (l, d) {
                            "__proto__" !== d && "constructor" !== d && (!B(l, !0) || t(l) || k(l) ? (c[d] = f[d]) : (c[d] = a(c[d] || {}, l)));
                        });
                        return c;
                    };
                !0 === f[0] && ((l = f[1]), (f = Array.prototype.slice.call(f, 2)));
                var d = f.length;
                for (c = 0; c < d; c++) l = a(l, f[c]);
                return l;
            },
            normalizeTickInterval: function (c, f, l, a, d) {
                var m = c;
                l = e(l, 1);
                var q = c / l;
                f ||
                    ((f = d ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10]),
                    !1 === a &&
                        (1 === l
                            ? (f = f.filter(function (c) {
                                  return 0 === c % 1;
                              }))
                            : 0.1 >= l && (f = [1 / l])));
                for (a = 0; a < f.length && !((m = f[a]), (d && m * l >= c) || (!d && q <= (f[a] + (f[a + 1] || f[a])) / 2)); a++);
                return (m = x(m * l, -Math.round(Math.log(0.001) / Math.LN10)));
            },
            objectEach: r,
            offset: function (c) {
                var l = f.documentElement;
                c = c.parentElement || c.parentNode ? c.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
                return { top: c.top + (y.pageYOffset || l.scrollTop) - (l.clientTop || 0), left: c.left + (y.pageXOffset || l.scrollLeft) - (l.clientLeft || 0), width: c.width, height: c.height };
            },
            pad: function (c, f, l) {
                return Array((f || 2) + 1 - String(c).replace("-", "").length).join(l || "0") + c;
            },
            pick: e,
            pInt: E,
            relativeLength: function (c, f, l) {
                return /%$/.test(c) ? (f * parseFloat(c)) / 100 + (l || 0) : parseFloat(c);
            },
            removeEvent: q,
            splat: function (c) {
                return D(c) ? c : [c];
            },
            stableSort: function (c, f) {
                var l = c.length,
                    a,
                    d;
                for (d = 0; d < l; d++) c[d].safeI = d;
                c.sort(function (c, l) {
                    a = f(c, l);
                    return 0 === a ? c.safeI - l.safeI : a;
                });
                for (d = 0; d < l; d++) delete c[d].safeI;
            },
            syncTimeout: function (c, f, l) {
                if (0 < f) return setTimeout(c, f, l);
                c.call(0, l);
                return -1;
            },
            timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 },
            uniqueKey: l,
            useSerialIds: function (c) {
                return (u = e(c, u));
            },
            wrap: function (c, f, l) {
                var a = c[f];
                c[f] = function () {
                    var c = Array.prototype.slice.call(arguments),
                        f = arguments,
                        d = this;
                    d.proceed = function () {
                        a.apply(d, arguments.length ? arguments : f);
                    };
                    c.unshift(a);
                    c = l.apply(this, c);
                    d.proceed = null;
                    return c;
                };
            },
        };
        ("");
        console.log("-------------------------------------")
        console.log(c);
        return c;

    });
    G(b, "Core/Chart/ChartDefaults.js", [], function () {
        return {
            panning: { enabled: !1, type: "x" },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: "#335cad",
            backgroundColor: "#ffffff",
            plotBorderColor: "#cccccc",
        };
    });
    G(b, "Core/Color/Color.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p) {
        var v = p.isNumber,
            E = p.merge,
            w = p.pInt;
        p = (function () {
            function p(v) {
                this.rgba = [NaN, NaN, NaN, NaN];
                this.input = v;
                var k = b.Color;
                if (k && k !== p) return new k(v);
                if (!(this instanceof p)) return new p(v);
                this.init(v);
            }
            p.parse = function (b) {
                return b ? new p(b) : p.None;
            };
            p.prototype.init = function (b) {
                var k;
                if ("object" === typeof b && "undefined" !== typeof b.stops)
                    this.stops = b.stops.map(function (d) {
                        return new p(d[1]);
                    });
                else if ("string" === typeof b) {
                    this.input = b = p.names[b.toLowerCase()] || b;
                    if ("#" === b.charAt(0)) {
                        var t = b.length;
                        var n = parseInt(b.substr(1), 16);
                        7 === t ? (k = [(n & 16711680) >> 16, (n & 65280) >> 8, n & 255, 1]) : 4 === t && (k = [((n & 3840) >> 4) | ((n & 3840) >> 8), ((n & 240) >> 4) | (n & 240), ((n & 15) << 4) | (n & 15), 1]);
                    }
                    if (!k)
                        for (n = p.parsers.length; n-- && !k; ) {
                            var h = p.parsers[n];
                            (t = h.regex.exec(b)) && (k = h.parse(t));
                        }
                }
                k && (this.rgba = k);
            };
            p.prototype.get = function (b) {
                var k = this.input,
                    t = this.rgba;
                if ("object" === typeof k && "undefined" !== typeof this.stops) {
                    var n = E(k);
                    n.stops = [].slice.call(n.stops);
                    this.stops.forEach(function (h, d) {
                        n.stops[d] = [n.stops[d][0], h.get(b)];
                    });
                    return n;
                }
                return t && v(t[0]) ? ("rgb" === b || (!b && 1 === t[3]) ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" === b ? "" + t[3] : "rgba(" + t.join(",") + ")") : k;
            };
            p.prototype.brighten = function (b) {
                var k = this.rgba;
                if (this.stops)
                    this.stops.forEach(function (n) {
                        n.brighten(b);
                    });
                else if (v(b) && 0 !== b) for (var t = 0; 3 > t; t++) (k[t] += w(255 * b)), 0 > k[t] && (k[t] = 0), 255 < k[t] && (k[t] = 255);
                return this;
            };
            p.prototype.setOpacity = function (b) {
                this.rgba[3] = b;
                return this;
            };
            p.prototype.tweenTo = function (b, k) {
                var t = this.rgba,
                    n = b.rgba;
                if (!v(t[0]) || !v(n[0])) return b.input || "none";
                b = 1 !== n[3] || 1 !== t[3];
                return (
                    (b ? "rgba(" : "rgb(") +
                    Math.round(n[0] + (t[0] - n[0]) * (1 - k)) +
                    "," +
                    Math.round(n[1] + (t[1] - n[1]) * (1 - k)) +
                    "," +
                    Math.round(n[2] + (t[2] - n[2]) * (1 - k)) +
                    (b ? "," + (n[3] + (t[3] - n[3]) * (1 - k)) : "") +
                    ")"
                );
            };
            p.names = { white: "#ffffff", black: "#000000" };
            p.parsers = [
                {
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (b) {
                        return [w(b[1]), w(b[2]), w(b[3]), parseFloat(b[4], 10)];
                    },
                },
                {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (b) {
                        return [w(b[1]), w(b[2]), w(b[3]), 1];
                    },
                },
            ];
            p.None = new p("");
            return p;
        })();
        ("");
        return p;
    });
    G(b, "Core/Color/Palettes.js", [], function () {
        return { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ") };
    });
    G(b, "Core/Time.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p) {
        var v = b.win,
            E = p.defined,
            w = p.error,
            D = p.extend,
            B = p.isObject,
            k = p.merge,
            t = p.objectEach,
            n = p.pad,
            h = p.pick,
            d = p.splat,
            a = p.timeUnits,
            e = b.isSafari && v.Intl && v.Intl.DateTimeFormat.prototype.formatRange,
            g = b.isSafari && v.Intl && !v.Intl.DateTimeFormat.prototype.formatRange;
        p = (function () {
            function x(a) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = v.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(a);
            }
            x.prototype.get = function (a, d) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var e = d.getTime(),
                        g = e - this.getTimezoneOffset(d);
                    d.setTime(g);
                    a = d["getUTC" + a]();
                    d.setTime(e);
                    return a;
                }
                return this.useUTC ? d["getUTC" + a]() : d["get" + a]();
            };
            x.prototype.set = function (a, d, q) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === a || "Seconds" === a || ("Minutes" === a && 0 === this.getTimezoneOffset(d) % 36e5)) return d["setUTC" + a](q);
                    var g = this.getTimezoneOffset(d);
                    g = d.getTime() - g;
                    d.setTime(g);
                    d["setUTC" + a](q);
                    a = this.getTimezoneOffset(d);
                    g = d.getTime() + a;
                    return d.setTime(g);
                }
                return this.useUTC || (e && "FullYear" === a) ? d["setUTC" + a](q) : d["set" + a](q);
            };
            x.prototype.update = function (a) {
                var d = h(a && a.useUTC, !0);
                this.options = a = k(!0, this.options || {}, a);
                this.Date = a.Date || v.Date || Date;
                this.timezoneOffset = (this.useUTC = d) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = d && !(!a.getTimezoneOffset && !a.timezone);
            };
            x.prototype.makeTime = function (a, d, e, z, m, f) {
                if (this.useUTC) {
                    var q = this.Date.UTC.apply(0, arguments);
                    var c = this.getTimezoneOffset(q);
                    q += c;
                    var u = this.getTimezoneOffset(q);
                    c !== u ? (q += u - c) : c - 36e5 !== this.getTimezoneOffset(q - 36e5) || g || (q -= 36e5);
                } else q = new this.Date(a, d, h(e, 1), h(z, 0), h(m, 0), h(f, 0)).getTime();
                return q;
            };
            x.prototype.timezoneOffsetFunction = function () {
                var a = this,
                    d = this.options,
                    e = d.getTimezoneOffset,
                    g = d.moment || v.moment;
                if (!this.useUTC)
                    return function (a) {
                        return 6e4 * new Date(a.toString()).getTimezoneOffset();
                    };
                if (d.timezone) {
                    if (g)
                        return function (a) {
                            return 6e4 * -g.tz(a, d.timezone).utcOffset();
                        };
                    w(25);
                }
                return this.useUTC && e
                    ? function (a) {
                          return 6e4 * e(a.valueOf());
                      }
                    : function () {
                          return 6e4 * (a.timezoneOffset || 0);
                      };
            };
            x.prototype.dateFormat = function (a, d, e) {
                if (!E(d) || isNaN(d)) return (b.defaultOptions.lang && b.defaultOptions.lang.invalidDate) || "";
                a = h(a, "%Y-%m-%d %H:%M:%S");
                var q = this,
                    m = new this.Date(d),
                    f = this.get("Hours", m),
                    g = this.get("Day", m),
                    c = this.get("Date", m),
                    u = this.get("Month", m),
                    l = this.get("FullYear", m),
                    r = b.defaultOptions.lang,
                    C = r && r.weekdays,
                    x = r && r.shortWeekdays;
                m = D(
                    {
                        a: x ? x[g] : C[g].substr(0, 3),
                        A: C[g],
                        d: n(c),
                        e: n(c, 2, " "),
                        w: g,
                        b: r.shortMonths[u],
                        B: r.months[u],
                        m: n(u + 1),
                        o: u + 1,
                        y: l.toString().substr(2, 2),
                        Y: l,
                        H: n(f),
                        k: f,
                        I: n(f % 12 || 12),
                        l: f % 12 || 12,
                        M: n(this.get("Minutes", m)),
                        p: 12 > f ? "AM" : "PM",
                        P: 12 > f ? "am" : "pm",
                        S: n(m.getSeconds()),
                        L: n(Math.floor(d % 1e3), 3),
                    },
                    b.dateFormats
                );
                t(m, function (c, f) {
                    for (; -1 !== a.indexOf("%" + f); ) a = a.replace("%" + f, "function" === typeof c ? c.call(q, d) : c);
                });
                return e ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
            };
            x.prototype.resolveDTLFormat = function (a) {
                return B(a, !0) ? a : ((a = d(a)), { main: a[0], from: a[1], to: a[2] });
            };
            x.prototype.getTimeTicks = function (d, e, q, g) {
                var m = this,
                    f = [],
                    y = {},
                    c = new m.Date(e),
                    u = d.unitRange,
                    l = d.count || 1,
                    z;
                g = h(g, 1);
                if (E(e)) {
                    m.set("Milliseconds", c, u >= a.second ? 0 : l * Math.floor(m.get("Milliseconds", c) / l));
                    u >= a.second && m.set("Seconds", c, u >= a.minute ? 0 : l * Math.floor(m.get("Seconds", c) / l));
                    u >= a.minute && m.set("Minutes", c, u >= a.hour ? 0 : l * Math.floor(m.get("Minutes", c) / l));
                    u >= a.hour && m.set("Hours", c, u >= a.day ? 0 : l * Math.floor(m.get("Hours", c) / l));
                    u >= a.day && m.set("Date", c, u >= a.month ? 1 : Math.max(1, l * Math.floor(m.get("Date", c) / l)));
                    if (u >= a.month) {
                        m.set("Month", c, u >= a.year ? 0 : l * Math.floor(m.get("Month", c) / l));
                        var r = m.get("FullYear", c);
                    }
                    u >= a.year && m.set("FullYear", c, r - (r % l));
                    u === a.week && ((r = m.get("Day", c)), m.set("Date", c, m.get("Date", c) - r + g + (r < g ? -7 : 0)));
                    r = m.get("FullYear", c);
                    g = m.get("Month", c);
                    var C = m.get("Date", c),
                        x = m.get("Hours", c);
                    e = c.getTime();
                    (!m.variableTimezone && m.useUTC) || !E(q) || (z = q - e > 4 * a.month || m.getTimezoneOffset(e) !== m.getTimezoneOffset(q));
                    e = c.getTime();
                    for (c = 1; e < q; )
                        f.push(e),
                            (e =
                                u === a.year
                                    ? m.makeTime(r + c * l, 0)
                                    : u === a.month
                                    ? m.makeTime(r, g + c * l)
                                    : !z || (u !== a.day && u !== a.week)
                                    ? z && u === a.hour && 1 < l
                                        ? m.makeTime(r, g, C, x + c * l)
                                        : e + u * l
                                    : m.makeTime(r, g, C + c * l * (u === a.day ? 1 : 7))),
                            c++;
                    f.push(e);
                    u <= a.hour &&
                        1e4 > f.length &&
                        f.forEach(function (c) {
                            0 === c % 18e5 && "000000000" === m.dateFormat("%H%M%S%L", c) && (y[c] = "day");
                        });
                }
                f.info = D(d, { higherRanks: y, totalRange: u * l });
                return f;
            };
            x.prototype.getDateFormat = function (d, e, q, g) {
                var m = this.dateFormat("%m-%d %H:%M:%S.%L", e),
                    f = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                    y = "millisecond";
                for (c in a) {
                    if (d === a.week && +this.dateFormat("%w", e) === q && "00:00:00.000" === m.substr(6)) {
                        var c = "week";
                        break;
                    }
                    if (a[c] > d) {
                        c = y;
                        break;
                    }
                    if (f[c] && m.substr(f[c]) !== "01-01 00:00:00.000".substr(f[c])) break;
                    "week" !== c && (y = c);
                }
                if (c) var u = this.resolveDTLFormat(g[c]).main;
                return u;
            };
            return x;
        })();
        ("");
        return p;
    });
    G(b, "Core/DefaultOptions.js", [b["Core/Chart/ChartDefaults.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palettes.js"], b["Core/Time.js"], b["Core/Utilities.js"]], function (b, p, A, E, w, D) {
        p = p.parse;
        var v = D.merge,
            k = {
                colors: E.colors,
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " ",
                },
                global: {},
                time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0 },
                chart: b,
                title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 },
                subtitle: { text: "", align: "center", widthAdjust: -44 },
                caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" },
                plotOptions: {},
                labels: { style: { position: "absolute", color: "#333333" } },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    className: "highcharts-no-tooltip",
                    layout: "horizontal",
                    labelFormatter: function () {
                        return this.name;
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
                    itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" },
                    itemHoverStyle: { color: "#000000" },
                    itemHiddenStyle: { color: "#cccccc" },
                    shadow: !1,
                    itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: { style: { fontWeight: "bold" } },
                },
                loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } },
                tooltip: {
                    enabled: !0,
                    animation: A.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y",
                    },
                    footerFormat: "", 
                    headerShape: "callout",
                    hideDelay: 500,
                    padding: 8,
                    shape: "callout",
                    shared: !1,
                    snap: A.isTouchDevice ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: p("#f7f7f7").setOpacity(0.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    stickOnContact: !1,
                    style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" },
                    useHTML: !1,
                },
                credits: {
                    enabled: !1,
                    href: "https://www.highcharts.com?credits",
                    position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 },
                    style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
                    text: "Highcharts.com",
                },
            };
        k.chart.styledMode = !1;
        ("");
        var t = new w(v(k.global, k.time));
        b = {
            defaultOptions: k,
            defaultTime: t,
            getOptions: function () {
                return k;
            },
            setOptions: function (n) {
                v(!0, k, n);
                if (n.time || n.global) A.time ? A.time.update(v(k.global, k.time, n.global, n.time)) : (A.time = t);
                return k;
            },
        };
        ("");
        return b;
    });
    G(b, "Core/Animation/Fx.js", [b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = b.parse,
            w = p.win,
            D = A.isNumber,
            B = A.objectEach;
        return (function () {
            function k(k, n, h) {
                this.pos = NaN;
                this.options = n;
                this.elem = k;
                this.prop = h;
            }
            k.prototype.dSetter = function () {
                var k = this.paths,
                    n = k && k[0];
                k = k && k[1];
                var h = this.now || 0,
                    d = [];
                if (1 !== h && n && k)
                    if (n.length === k.length && 1 > h)
                        for (var a = 0; a < k.length; a++) {
                            for (var e = n[a], g = k[a], x = [], C = 0; C < g.length; C++) {
                                var r = e[C],
                                    q = g[C];
                                D(r) && D(q) && ("A" !== g[0] || (4 !== C && 5 !== C)) ? (x[C] = r + h * (q - r)) : (x[C] = q);
                            }
                            d.push(x);
                        }
                    else d = k;
                else d = this.toD || [];
                this.elem.attr("d", d, void 0, !0);
            };
            k.prototype.update = function () {
                var k = this.elem,
                    n = this.prop,
                    h = this.now,
                    d = this.options.step;
                if (this[n + "Setter"]) this[n + "Setter"]();
                else k.attr ? k.element && k.attr(n, h, null, !0) : (k.style[n] = h + this.unit);
                d && d.call(k, h, this);
            };
            k.prototype.run = function (b, n, h) {
                var d = this,
                    a = d.options,
                    e = function (a) {
                        return e.stopped ? !1 : d.step(a);
                    },
                    g =
                        w.requestAnimationFrame ||
                        function (a) {
                            setTimeout(a, 13);
                        },
                    x = function () {
                        for (var a = 0; a < k.timers.length; a++) k.timers[a]() || k.timers.splice(a--, 1);
                        k.timers.length && g(x);
                    };
                b !== n || this.elem["forceAnimate:" + this.prop]
                    ? ((this.startTime = +new Date()), (this.start = b), (this.end = n), (this.unit = h), (this.now = this.start), (this.pos = 0), (e.elem = this.elem), (e.prop = this.prop), e() && 1 === k.timers.push(e) && g(x))
                    : (delete a.curAnim[this.prop], a.complete && 0 === Object.keys(a.curAnim).length && a.complete.call(this.elem));
            };
            k.prototype.step = function (k) {
                var n = +new Date(),
                    h = this.options,
                    d = this.elem,
                    a = h.complete,
                    e = h.duration,
                    g = h.curAnim;
                if (d.attr && !d.element) k = !1;
                else if (k || n >= e + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var x = (g[this.prop] = !0);
                    B(g, function (a) {
                        !0 !== a && (x = !1);
                    });
                    x && a && a.call(d);
                    k = !1;
                } else (this.pos = h.easing((n - this.startTime) / e)), (this.now = this.start + (this.end - this.start) * this.pos), this.update(), (k = !0);
                return k;
            };
            k.prototype.initPath = function (k, n, h) {
                function d(a, f) {
                    for (; a.length < z; ) {
                        var d = a[0],
                            c = f[z - a.length];
                        c && "M" === d[0] && (a[0] = "C" === c[0] ? ["C", d[1], d[2], d[1], d[2], d[1], d[2]] : ["L", d[1], d[2]]);
                        a.unshift(d);
                        x && ((d = a.pop()), a.push(a[a.length - 1], d));
                    }
                }
                function a(a, f) {
                    for (; a.length < z; )
                        if (((f = a[Math.floor(a.length / C) - 1].slice()), "C" === f[0] && ((f[1] = f[5]), (f[2] = f[6])), x)) {
                            var d = a[Math.floor(a.length / C)].slice();
                            a.splice(a.length / 2, 0, f, d);
                        } else a.push(f);
                }
                var e = k.startX,
                    g = k.endX;
                h = h.slice();
                var x = k.isArea,
                    C = x ? 2 : 1;
                n = n && n.slice();
                if (!n) return [h, h];
                if (e && g && g.length) {
                    for (k = 0; k < e.length; k++)
                        if (e[k] === g[0]) {
                            var r = k;
                            break;
                        } else if (e[0] === g[g.length - e.length + k]) {
                            r = k;
                            var q = !0;
                            break;
                        } else if (e[e.length - 1] === g[g.length - e.length + k]) {
                            r = e.length - k;
                            break;
                        }
                    "undefined" === typeof r && (n = []);
                }
                if (n.length && D(r)) {
                    var z = h.length + r * C;
                    q ? (d(n, h), a(h, n)) : (d(h, n), a(n, h));
                }
                return [n, h];
            };
            k.prototype.fillSetter = function () {
                k.prototype.strokeSetter.apply(this, arguments);
            };
            k.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, v(this.start).tweenTo(v(this.end), this.pos), void 0, !0);
            };
            k.timers = [];
            return k;
        })();
    });
    G(b, "Core/Animation/AnimationUtilities.js", [b["Core/Animation/Fx.js"], b["Core/Utilities.js"]], function (b, p) {
        function v(a) {
            return t(a) ? n({ duration: 500, defer: 0 }, a) : { duration: a ? 500 : 0, defer: 0 };
        }
        function E(a, d) {
            for (var e = b.timers.length; e--; ) b.timers[e].elem !== a || (d && d !== b.timers[e].prop) || (b.timers[e].stopped = !0);
        }
        var w = p.defined,
            D = p.getStyle,
            B = p.isArray,
            k = p.isNumber,
            t = p.isObject,
            n = p.merge,
            h = p.objectEach,
            d = p.pick;
        return {
            animate: function (a, d, g) {
                var e,
                    C = "",
                    r,
                    q;
                if (!t(g)) {
                    var z = arguments;
                    g = { duration: z[2], easing: z[3], complete: z[4] };
                }
                k(g.duration) || (g.duration = 400);
                g.easing = "function" === typeof g.easing ? g.easing : Math[g.easing] || Math.easeInOutSine;
                g.curAnim = n(d);
                h(d, function (m, f) {
                    E(a, f);
                    q = new b(a, g, f);
                    r = void 0;
                    "d" === f && B(d.d) ? ((q.paths = q.initPath(a, a.pathArray, d.d)), (q.toD = d.d), (e = 0), (r = 1)) : a.attr ? (e = a.attr(f)) : ((e = parseFloat(D(a, f)) || 0), "opacity" !== f && (C = "px"));
                    r || (r = m);
                    "string" === typeof r && r.match("px") && (r = r.replace(/px/g, ""));
                    q.run(e, r, C);
                });
            },
            animObject: v,
            getDeferredAnimation: function (a, d, g) {
                var e = v(d),
                    h = 0,
                    r = 0;
                (g ? [g] : a.series).forEach(function (a) {
                    a = v(a.options.animation);
                    h = d && w(d.defer) ? e.defer : Math.max(h, a.duration + a.defer);
                    r = Math.min(e.duration, a.duration);
                });
                a.renderer.forExport && (h = 0);
                return { defer: Math.max(0, h - r), duration: Math.min(h, r) };
            },
            setAnimation: function (a, e) {
                e.renderer.globalAnimation = d(a, e.options.chart.animation, !0);
            },
            stop: E,
        };
    });
    G(b, "Core/Renderer/HTML/AST.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p) {
        var v = b.SVG_NS,
            E = p.attr,
            w = p.createElement,
            D = p.error,
            B = p.isFunction,
            k = p.isString,
            t = p.objectEach,
            n = p.splat,
            h =
                (p = b.win.trustedTypes) &&
                B(p.createPolicy) &&
                p.createPolicy("highcharts", {
                    createHTML: function (a) {
                        return a;
                    },
                }),
            d = h ? h.createHTML("") : "";
        try {
            var a = !!new DOMParser().parseFromString(d, "text/html");
        } catch (e) {
            a = !1;
        }
        B = (function () {
            function e(a) {
                this.nodes = "string" === typeof a ? this.parseMarkup(a) : a;
            }
            e.filterUserAttributes = function (a) {
                t(a, function (d, g) {
                    var r = !0;
                    -1 === e.allowedAttributes.indexOf(g) && (r = !1);
                    -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(g) &&
                        (r =
                            k(d) &&
                            e.allowedReferences.some(function (a) {
                                return 0 === d.indexOf(a);
                            }));
                    r || (D("Highcharts warning: Invalid attribute '" + g + "' in config"), delete a[g]);
                });
                return a;
            };
            e.setElementHTML = function (a, d) {
                a.innerHTML = e.emptyHTML;
                d && new e(d).addToDOM(a);
            };
            e.prototype.addToDOM = function (a) {
                function d(a, g) {
                    var q;
                    n(a).forEach(function (a) {
                        var m = a.tagName,
                            f = a.textContent ? b.doc.createTextNode(a.textContent) : void 0;
                        if (m)
                            if ("#text" === m) var y = f;
                            else if (-1 !== e.allowedTags.indexOf(m)) {
                                m = b.doc.createElementNS("svg" === m ? v : g.namespaceURI || v, m);
                                var c = a.attributes || {};
                                t(a, function (a, f) {
                                    "tagName" !== f && "attributes" !== f && "children" !== f && "textContent" !== f && (c[f] = a);
                                });
                                E(m, e.filterUserAttributes(c));
                                f && m.appendChild(f);
                                d(a.children || [], m);
                                y = m;
                            } else D("Highcharts warning: Invalid tagName " + m + " in config");
                        y && g.appendChild(y);
                        q = y;
                    });
                    return q;
                }
                return d(this.nodes, a);
            };
            e.prototype.parseMarkup = function (d) {
                var e = [];
                d = d.trim();
                if (a) d = new DOMParser().parseFromString(h ? h.createHTML(d) : d, "text/html");
                else {
                    var g = w("div");
                    g.innerHTML = d;
                    d = { body: g };
                }
                var r = function (a, d) {
                    var m = a.nodeName.toLowerCase(),
                        f = { tagName: m };
                    "#text" === m && (f.textContent = a.textContent || "");
                    if ((m = a.attributes)) {
                        var e = {};
                        [].forEach.call(m, function (c) {
                            e[c.name] = c.value;
                        });
                        f.attributes = e;
                    }
                    if (a.childNodes.length) {
                        var c = [];
                        [].forEach.call(a.childNodes, function (a) {
                            r(a, c);
                        });
                        c.length && (f.children = c);
                    }
                    d.push(f);
                };
                [].forEach.call(d.body.childNodes, function (a) {
                    return r(a, e);
                });
                return e;
            };
            e.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(
                " "
            );
            e.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            e.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(
                " "
            );
            e.emptyHTML = d;
            return e;
        })();
        ("");
        return B;
    });
    G(b, "Core/FormatUtilities.js", [b["Core/DefaultOptions.js"], b["Core/Utilities.js"]], function (b, p) {
        function v(n, h, d, a) {
            n = +n || 0;
            h = +h;
            var e = E.lang,
                g = (n.toString().split(".")[1] || "").split("e")[0].length,
                x = n.toString().split("e"),
                C = h;
            if (-1 === h) h = Math.min(g, 20);
            else if (!B(h)) h = 2;
            else if (h && x[1] && 0 > x[1]) {
                var r = h + +x[1];
                0 <= r ? ((x[0] = (+x[0]).toExponential(r).split("e")[0]), (h = r)) : ((x[0] = x[0].split(".")[0] || 0), (n = 20 > h ? (x[0] * Math.pow(10, x[1])).toFixed(h) : 0), (x[1] = 0));
            }
            r = (Math.abs(x[1] ? x[0] : n) + Math.pow(10, -Math.max(h, g) - 1)).toFixed(h);
            g = String(t(r));
            var q = 3 < g.length ? g.length % 3 : 0;
            d = k(d, e.decimalPoint);
            a = k(a, e.thousandsSep);
            n = (0 > n ? "-" : "") + (q ? g.substr(0, q) + a : "");
            n = 0 > +x[1] && !C ? "0" : n + g.substr(q).replace(/(\d{3})(?=\d)/g, "$1" + a);
            h && (n += d + r.slice(-h));
            x[1] && 0 !== +n && (n += "e" + x[1]);
            return n;
        }
        var E = b.defaultOptions,
            w = b.defaultTime,
            D = p.getNestedProperty,
            B = p.isNumber,
            k = p.pick,
            t = p.pInt;
        return {
            dateFormat: function (k, h, d) {
                return w.dateFormat(k, h, d);
            },
            format: function (k, h, d) {
                var a = "{",
                    e = !1,
                    g = /f$/,
                    x = /\.([0-9])/,
                    C = E.lang,
                    r = (d && d.time) || w;
                d = (d && d.numberFormatter) || v;
                for (var q = []; k; ) {
                    var z = k.indexOf(a);
                    if (-1 === z) break;
                    var m = k.slice(0, z);
                    if (e) {
                        m = m.split(":");
                        a = D(m.shift() || "", h);
                        if (m.length && "number" === typeof a)
                            if (((m = m.join(":")), g.test(m))) {
                                var f = parseInt((m.match(x) || ["", "-1"])[1], 10);
                                null !== a && (a = d(a, f, C.decimalPoint, -1 < m.indexOf(",") ? C.thousandsSep : ""));
                            } else a = r.dateFormat(m, a);
                        q.push(a);
                    } else q.push(m);
                    k = k.slice(z + 1);
                    a = (e = !e) ? "}" : "{";
                }
                q.push(k);
                return q.join("");
            },
            numberFormat: v,
        };
    });
    G(b, "Core/Renderer/RendererUtilities.js", [b["Core/Utilities.js"]], function (b) {
        var v = b.clamp,
            A = b.pick,
            E = b.stableSort,
            w;
        (function (b) {
            function p(k, b, n) {
                var h = k,
                    d = h.reducedLen || b,
                    a = function (a, d) {
                        return (d.rank || 0) - (a.rank || 0);
                    },
                    e = function (a, d) {
                        return a.target - d.target;
                    },
                    g,
                    x = !0,
                    C = [],
                    r = 0;
                for (g = k.length; g--; ) r += k[g].size;
                if (r > d) {
                    E(k, a);
                    for (r = g = 0; r <= d; ) (r += k[g].size), g++;
                    C = k.splice(g - 1, k.length);
                }
                E(k, e);
                for (
                    k = k.map(function (a) {
                        return { size: a.size, targets: [a.target], align: A(a.align, 0.5) };
                    });
                    x;

                ) {
                    for (g = k.length; g--; ) (d = k[g]), (a = (Math.min.apply(0, d.targets) + Math.max.apply(0, d.targets)) / 2), (d.pos = v(a - d.size * d.align, 0, b - d.size));
                    g = k.length;
                    for (x = !1; g--; )
                        0 < g &&
                            k[g - 1].pos + k[g - 1].size > k[g].pos &&
                            ((k[g - 1].size += k[g].size),
                            (k[g - 1].targets = k[g - 1].targets.concat(k[g].targets)),
                            (k[g - 1].align = 0.5),
                            k[g - 1].pos + k[g - 1].size > b && (k[g - 1].pos = b - k[g - 1].size),
                            k.splice(g, 1),
                            (x = !0));
                }
                h.push.apply(h, C);
                g = 0;
                k.some(function (a) {
                    var d = 0;
                    return (a.targets || []).some(function () {
                        h[g].pos = a.pos + d;
                        if ("undefined" !== typeof n && Math.abs(h[g].pos - h[g].target) > n)
                            return (
                                h.slice(0, g + 1).forEach(function (a) {
                                    return delete a.pos;
                                }),
                                (h.reducedLen = (h.reducedLen || b) - 0.1 * b),
                                h.reducedLen > 0.1 * b && p(h, b, n),
                                !0
                            );
                        d += h[g].size;
                        g++;
                        return !1;
                    });
                });
                E(h, e);
                return h;
            }
            b.distribute = p;
        })(w || (w = {}));
        return w;
    });
    G(b, "Core/Renderer/SVG/SVGElement.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Renderer/HTML/AST.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A, E, w) {
        var v = b.animate,
            B = b.animObject,
            k = b.stop,
            t = E.deg2rad,
            n = E.doc,
            h = E.noop,
            d = E.svg,
            a = E.SVG_NS,
            e = E.win,
            g = w.addEvent,
            x = w.attr,
            C = w.createElement,
            r = w.css,
            q = w.defined,
            z = w.erase,
            m = w.extend,
            f = w.fireEvent,
            y = w.isArray,
            c = w.isFunction,
            u = w.isNumber,
            l = w.isString,
            F = w.merge,
            K = w.objectEach,
            H = w.pick,
            I = w.pInt,
            Z = w.syncTimeout,
            Q = w.uniqueKey;
        b = (function () {
            function b() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = a;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ");
            }
            b.prototype._defaultGetter = function (c) {
                c = H(this[c + "Value"], this[c], this.element ? this.element.getAttribute(c) : null, 0);
                /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
                return c;
            };
            b.prototype._defaultSetter = function (c, a, f) {
                f.setAttribute(a, c);
            };
            b.prototype.add = function (c) {
                var a = this.renderer,
                    f = this.element;
                c && (this.parentGroup = c);
                this.parentInverted = c && c.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && a.buildText(this);
                this.added = !0;
                if (!c || c.handleZ || this.zIndex) var d = this.zIndexSetter();
                d || (c ? c.element : a.box).appendChild(f);
                if (this.onAdd) this.onAdd();
                return this;
            };
            b.prototype.addClass = function (c, a) {
                var f = a ? "" : this.attr("class") || "";
                c = (c || "")
                    .split(/ /g)
                    .reduce(
                        function (c, a) {
                            -1 === f.indexOf(a) && c.push(a);
                            return c;
                        },
                        f ? [f] : []
                    )
                    .join(" ");
                c !== f && this.attr("class", c);
                return this;
            };
            b.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), (this.doTransform = !1));
            };
            b.prototype.align = function (c, a, f) {
                var d = {},
                    e = this.renderer,
                    m = e.alignedObjects,
                    g,
                    q,
                    u;
                if (c) {
                    if (((this.alignOptions = c), (this.alignByTranslate = a), !f || l(f))) (this.alignTo = g = f || "renderer"), z(m, this), m.push(this), (f = void 0);
                } else (c = this.alignOptions), (a = this.alignByTranslate), (g = this.alignTo);
                f = H(f, e[g], "scrollablePlotBox" === g ? e.plotBox : void 0, e);
                g = c.align;
                var y = c.verticalAlign;
                e = (f.x || 0) + (c.x || 0);
                m = (f.y || 0) + (c.y || 0);
                "right" === g ? (q = 1) : "center" === g && (q = 2);
                q && (e += (f.width - (c.width || 0)) / q);
                d[a ? "translateX" : "x"] = Math.round(e);
                "bottom" === y ? (u = 1) : "middle" === y && (u = 2);
                u && (m += (f.height - (c.height || 0)) / u);
                d[a ? "translateY" : "y"] = Math.round(m);
                this[this.placed ? "animate" : "attr"](d);
                this.placed = !0;
                this.alignAttr = d;
                return this;
            };
            b.prototype.alignSetter = function (c) {
                var a = { left: "start", center: "middle", right: "end" };
                a[c] && ((this.alignValue = c), this.element.setAttribute("text-anchor", a[c]));
            };
            b.prototype.animate = function (c, a, f) {
                var d = this,
                    l = B(H(a, this.renderer.globalAnimation, !0));
                a = l.defer;
                H(n.hidden, n.msHidden, n.webkitHidden, !1) && (l.duration = 0);
                0 !== l.duration
                    ? (f && (l.complete = f),
                      Z(function () {
                          d.element && v(d, c, l);
                      }, a))
                    : (this.attr(c, void 0, f),
                      K(
                          c,
                          function (c, a) {
                              l.step && l.step.call(this, c, { prop: a, pos: 1, elem: this });
                          },
                          this
                      ));
                return this;
            };
            b.prototype.applyTextOutline = function (c) {
                var f = this.element;
                -1 !== c.indexOf("contrast") && (c = c.replace(/contrast/g, this.renderer.getContrast(f.style.fill)));
                var d = c.split(" ");
                c = d[d.length - 1];
                if ((d = d[0]) && "none" !== d && E.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    d = d.replace(/(^[\d\.]+)(.*?)$/g, function (c, a, f) {
                        return 2 * Number(a) + f;
                    });
                    this.removeTextOutline();
                    var l = n.createElementNS(a, "tspan");
                    x(l, { class: "highcharts-text-outline", fill: c, stroke: c, "stroke-width": d, "stroke-linejoin": "round" });
                    [].forEach.call(f.childNodes, function (c) {
                        var a = c.cloneNode(!0);
                        a.removeAttribute &&
                            ["fill", "stroke", "stroke-width", "stroke"].forEach(function (c) {
                                return a.removeAttribute(c);
                            });
                        l.appendChild(a);
                    });
                    var e = n.createElementNS(a, "tspan");
                    e.textContent = "\u200b";
                    ["x", "y"].forEach(function (c) {
                        var a = f.getAttribute(c);
                        a && e.setAttribute(c, a);
                    });
                    l.appendChild(e);
                    f.insertBefore(l, f.firstChild);
                }
            };
            b.prototype.attr = function (c, a, f, d) {
                var l = this.element,
                    e = this.symbolCustomAttribs,
                    m,
                    g = this,
                    q,
                    u;
                if ("string" === typeof c && "undefined" !== typeof a) {
                    var y = c;
                    c = {};
                    c[y] = a;
                }
                "string" === typeof c
                    ? (g = (this[c + "Getter"] || this._defaultGetter).call(this, c, l))
                    : (K(
                          c,
                          function (a, f) {
                              q = !1;
                              d || k(this, f);
                              this.symbolName && -1 !== e.indexOf(f) && (m || (this.symbolAttr(c), (m = !0)), (q = !0));
                              !this.rotation || ("x" !== f && "y" !== f) || (this.doTransform = !0);
                              q || ((u = this[f + "Setter"] || this._defaultSetter), u.call(this, a, f, l), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(f) && this.updateShadows(f, a, u));
                          },
                          this
                      ),
                      this.afterSetters());
                f && f.call(this);
                return g;
            };
            b.prototype.clip = function (c) {
                return this.attr("clip-path", c ? "url(" + this.renderer.url + "#" + c.id + ")" : "none");
            };
            b.prototype.crisp = function (c, a) {
                a = a || c.strokeWidth || 0;
                var f = (Math.round(a) % 2) / 2;
                c.x = Math.floor(c.x || this.x || 0) + f;
                c.y = Math.floor(c.y || this.y || 0) + f;
                c.width = Math.floor((c.width || this.width || 0) - 2 * f);
                c.height = Math.floor((c.height || this.height || 0) - 2 * f);
                q(c.strokeWidth) && (c.strokeWidth = a);
                return c;
            };
            b.prototype.complexColor = function (c, a, d) {
                var l = this.renderer,
                    e,
                    m,
                    g,
                    u,
                    r,
                    h,
                    b,
                    da,
                    z,
                    k,
                    x = [],
                    C;
                f(this.renderer, "complexColor", { args: arguments }, function () {
                    c.radialGradient ? (m = "radialGradient") : c.linearGradient && (m = "linearGradient");
                    if (m) {
                        g = c[m];
                        r = l.gradients;
                        h = c.stops;
                        z = d.radialReference;
                        y(g) && (c[m] = g = { x1: g[0], y1: g[1], x2: g[2], y2: g[3], gradientUnits: "userSpaceOnUse" });
                        "radialGradient" === m && z && !q(g.gradientUnits) && ((u = g), (g = F(g, l.getRadialAttr(z, u), { gradientUnits: "userSpaceOnUse" })));
                        K(g, function (c, a) {
                            "id" !== a && x.push(a, c);
                        });
                        K(h, function (c) {
                            x.push(c);
                        });
                        x = x.join(",");
                        if (r[x]) k = r[x].attr("id");
                        else {
                            g.id = k = Q();
                            var f = (r[x] = l.createElement(m).attr(g).add(l.defs));
                            f.radAttr = u;
                            f.stops = [];
                            h.forEach(function (c) {
                                0 === c[1].indexOf("rgba") ? ((e = A.parse(c[1])), (b = e.get("rgb")), (da = e.get("a"))) : ((b = c[1]), (da = 1));
                                c = l.createElement("stop").attr({ offset: c[0], "stop-color": b, "stop-opacity": da }).add(f);
                                f.stops.push(c);
                            });
                        }
                        C = "url(" + l.url + "#" + k + ")";
                        d.setAttribute(a, C);
                        d.gradient = x;
                        c.toString = function () {
                            return C;
                        };
                    }
                });
            };
            b.prototype.css = function (c) {
                var a = this.styles,
                    f = {},
                    l = this.element,
                    e = ["textOutline", "textOverflow", "width"],
                    g = "",
                    q = !a;
                c && c.color && (c.fill = c.color);
                a &&
                    K(c, function (c, d) {
                        a && a[d] !== c && ((f[d] = c), (q = !0));
                    });
                if (q) {
                    a && (c = m(a, f));
                    if (c)
                        if (null === c.width || "auto" === c.width) delete this.textWidth;
                        else if ("text" === l.nodeName.toLowerCase() && c.width) var u = (this.textWidth = I(c.width));
                    this.styles = c;
                    u && !d && this.renderer.forExport && delete c.width;
                    if (l.namespaceURI === this.SVG_NS) {
                        var y = function (c, a) {
                            return "-" + a.toLowerCase();
                        };
                        K(c, function (c, a) {
                            -1 === e.indexOf(a) && (g += a.replace(/([A-Z])/g, y) + ":" + c + ";");
                        });
                        g && x(l, "style", g);
                    } else r(l, c);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), c && c.textOutline && this.applyTextOutline(c.textOutline));
                }
                return this;
            };
            b.prototype.dashstyleSetter = function (c) {
                var a = this["stroke-width"];
                "inherit" === a && (a = 1);
                if ((c = c && c.toLowerCase())) {
                    var f = c
                        .replace("shortdashdotdot", "3,1,1,1,1,1,")
                        .replace("shortdashdot", "3,1,1,1")
                        .replace("shortdot", "1,1,")
                        .replace("shortdash", "3,1,")
                        .replace("longdash", "8,3,")
                        .replace(/dot/g, "1,3,")
                        .replace("dash", "4,3,")
                        .replace(/,$/, "")
                        .split(",");
                    for (c = f.length; c--; ) f[c] = "" + I(f[c]) * H(a, NaN);
                    c = f.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", c);
                }
            };
            b.prototype.destroy = function () {
                var c = this,
                    a = c.element || {},
                    f = c.renderer,
                    d = a.ownerSVGElement,
                    l = (f.isSVG && "SPAN" === a.nodeName && c.parentGroup) || void 0;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                k(c);
                if (c.clipPath && d) {
                    var e = c.clipPath;
                    [].forEach.call(d.querySelectorAll("[clip-path],[CLIP-PATH]"), function (c) {
                        -1 < c.getAttribute("clip-path").indexOf(e.element.id) && c.removeAttribute("clip-path");
                    });
                    c.clipPath = e.destroy();
                }
                if (c.stops) {
                    for (d = 0; d < c.stops.length; d++) c.stops[d].destroy();
                    c.stops.length = 0;
                    c.stops = void 0;
                }
                c.safeRemoveChild(a);
                for (f.styledMode || c.destroyShadows(); l && l.div && 0 === l.div.childNodes.length; ) (a = l.parentGroup), c.safeRemoveChild(l.div), delete l.div, (l = a);
                c.alignTo && z(f.alignedObjects, c);
                K(c, function (a, f) {
                    c[f] && c[f].parentGroup === c && c[f].destroy && c[f].destroy();
                    delete c[f];
                });
            };
            b.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (c) {
                    this.safeRemoveChild(c);
                }, this);
                this.shadows = void 0;
            };
            b.prototype.destroyTextPath = function (c, a) {
                var f = c.getElementsByTagName("text")[0];
                if (f) {
                    if ((f.removeAttribute("dx"), f.removeAttribute("dy"), a.element.setAttribute("id", ""), this.textPathWrapper && f.getElementsByTagName("textPath").length)) {
                        for (c = this.textPathWrapper.element.childNodes; c.length; ) f.appendChild(c[0]);
                        f.removeChild(this.textPathWrapper.element);
                    }
                } else if (c.getAttribute("dx") || c.getAttribute("dy")) c.removeAttribute("dx"), c.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy());
            };
            b.prototype.dSetter = function (c, a, f) {
                y(c) &&
                    ("string" === typeof c[0] && (c = this.renderer.pathToSegments(c)),
                    (this.pathArray = c),
                    (c = c.reduce(function (c, a, f) {
                        return a && a.join ? (f ? c + " " : "") + a.join(" ") : (a || "").toString();
                    }, "")));
                /(NaN| {2}|^$)/.test(c) && (c = "M 0 0");
                this[a] !== c && (f.setAttribute(a, c), (this[a] = c));
            };
            b.prototype.fadeOut = function (c) {
                var a = this;
                a.animate(
                    { opacity: 0 },
                    {
                        duration: H(c, 150),
                        complete: function () {
                            a.attr({ y: -9999 }).hide();
                        },
                    }
                );
            };
            b.prototype.fillSetter = function (c, a, f) {
                "string" === typeof c ? f.setAttribute(a, c) : c && this.complexColor(c, a, f);
            };
            b.prototype.getBBox = function (a, f) {
                var d = this.renderer,
                    l = this.element,
                    e = this.styles,
                    g = this.textStr,
                    u = d.cache,
                    y = d.cacheKeys,
                    h = l.namespaceURI === this.SVG_NS;
                f = H(f, this.rotation, 0);
                var z = d.styledMode ? l && b.prototype.getStyle.call(l, "font-size") : e && e.fontSize,
                    k;
                if (q(g)) {
                    var F = g.toString();
                    -1 === F.indexOf("<") && (F = F.replace(/[0-9]/g, "0"));
                    F += ["", f, z, this.textWidth, e && e.textOverflow, e && e.fontWeight].join();
                }
                F && !a && (k = u[F]);
                if (!k) {
                    if (h || d.forExport) {
                        try {
                            var x =
                                this.fakeTS &&
                                function (c) {
                                    var a = l.querySelector(".highcharts-text-outline");
                                    a && r(a, { display: c });
                                };
                            c(x) && x("none");
                            k = l.getBBox ? m({}, l.getBBox()) : { width: l.offsetWidth, height: l.offsetHeight };
                            c(x) && x("");
                        } catch (V) {
                            ("");
                        }
                        if (!k || 0 > k.width) k = { width: 0, height: 0 };
                    } else k = this.htmlGetBBox();
                    d.isSVG &&
                        ((a = k.width),
                        (d = k.height),
                        h && (k.height = d = { "11px,17": 14, "13px,20": 16 }[(z || "") + "," + Math.round(d)] || d),
                        f && ((h = f * t), (k.width = Math.abs(d * Math.sin(h)) + Math.abs(a * Math.cos(h))), (k.height = Math.abs(d * Math.cos(h)) + Math.abs(a * Math.sin(h)))));
                    if (F && ("" === g || 0 < k.height)) {
                        for (; 250 < y.length; ) delete u[y.shift()];
                        u[F] || y.push(F);
                        u[F] = k;
                    }
                }
                return k;
            };
            b.prototype.getStyle = function (c) {
                return e.getComputedStyle(this.element || this, "").getPropertyValue(c);
            };
            b.prototype.hasClass = function (c) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(c);
            };
            b.prototype.hide = function (c) {
                c ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" });
                return this;
            };
            b.prototype.htmlGetBBox = function () {
                return { height: 0, width: 0, x: 0, y: 0 };
            };
            b.prototype.init = function (c, a) {
                this.element = "span" === a ? C(a) : n.createElementNS(this.SVG_NS, a);
                this.renderer = c;
                f(this, "afterInit");
            };
            b.prototype.invert = function (c) {
                this.inverted = c;
                this.updateTransform();
                return this;
            };
            b.prototype.on = function (c, a) {
                var f = this.onEvents;
                if (f[c]) f[c]();
                f[c] = g(this.element, c, a);
                return this;
            };
            b.prototype.opacitySetter = function (c, a, f) {
                this.opacity = c = Number(Number(c).toFixed(3));
                f.setAttribute(a, c);
            };
            b.prototype.removeClass = function (c) {
                return this.attr(
                    "class",
                    ("" + this.attr("class"))
                        .replace(l(c) ? new RegExp("(^| )" + c + "( |$)") : c, " ")
                        .replace(/ +/g, " ")
                        .trim()
                );
            };
            b.prototype.removeTextOutline = function () {
                var c = this.element.querySelector("tspan.highcharts-text-outline");
                c && this.safeRemoveChild(c);
            };
            b.prototype.safeRemoveChild = function (c) {
                var a = c.parentNode;
                a && a.removeChild(c);
            };
            b.prototype.setRadialReference = function (c) {
                var a = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = c;
                a && a.radAttr && a.animate(this.renderer.getRadialAttr(c, a.radAttr));
                return this;
            };
            b.prototype.setTextPath = function (c, a) {
                var f = this.element,
                    d = this.text ? this.text.element : f,
                    l = { textAnchor: "text-anchor" },
                    m = !1,
                    g = this.textPathWrapper,
                    y = !g;
                a = F(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, a);
                var r = p.filterUserAttributes(a.attributes);
                if (c && a && a.enabled) {
                    g && null === g.element.parentNode ? ((y = !0), (g = g.destroy())) : g && this.removeTextOutline.call(g.parentGroup);
                    this.options && this.options.padding && (r.dx = -this.options.padding);
                    g || ((this.textPathWrapper = g = this.renderer.createElement("textPath")), (m = !0));
                    var z = g.element;
                    (a = c.element.getAttribute("id")) || c.element.setAttribute("id", (a = Q()));
                    if (y)
                        for (d.setAttribute("y", 0), u(r.dx) && d.setAttribute("x", -r.dx), c = [].slice.call(d.childNodes), y = 0; y < c.length; y++) {
                            var b = c[y];
                            (b.nodeType !== e.Node.TEXT_NODE && "tspan" !== b.nodeName) || z.appendChild(b);
                        }
                    m && g && g.add({ element: d });
                    z.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + a);
                    q(r.dy) && (z.parentNode.setAttribute("dy", r.dy), delete r.dy);
                    q(r.dx) && (z.parentNode.setAttribute("dx", r.dx), delete r.dx);
                    K(r, function (c, a) {
                        z.setAttribute(l[a] || a, c);
                    });
                    f.removeAttribute("transform");
                    this.removeTextOutline.call(g);
                    this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 });
                    this.applyTextOutline = this.updateTransform = h;
                } else g && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(f, c), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this;
            };
            b.prototype.shadow = function (c, a, f) {
                var d = [],
                    l = this.element,
                    e = this.oldShadowOptions,
                    g = { color: "#000000", offsetX: this.parentInverted ? -1 : 1, offsetY: this.parentInverted ? -1 : 1, opacity: 0.15, width: 3 },
                    q = !1,
                    u;
                !0 === c ? (u = g) : "object" === typeof c && (u = m(g, c));
                u &&
                    (u &&
                        e &&
                        K(u, function (c, a) {
                            c !== e[a] && (q = !0);
                        }),
                    q && this.destroyShadows(),
                    (this.oldShadowOptions = u));
                if (!u) this.destroyShadows();
                else if (!this.shadows) {
                    var y = u.opacity / u.width;
                    var r = this.parentInverted ? "translate(" + u.offsetY + ", " + u.offsetX + ")" : "translate(" + u.offsetX + ", " + u.offsetY + ")";
                    for (g = 1; g <= u.width; g++) {
                        var h = l.cloneNode(!1);
                        var z = 2 * u.width + 1 - 2 * g;
                        x(h, { stroke: c.color || "#000000", "stroke-opacity": y * g, "stroke-width": z, transform: r, fill: "none" });
                        h.setAttribute("class", (h.getAttribute("class") || "") + " highcharts-shadow");
                        f && (x(h, "height", Math.max(x(h, "height") - z, 0)), (h.cutHeight = z));
                        a ? a.element.appendChild(h) : l.parentNode && l.parentNode.insertBefore(h, l);
                        d.push(h);
                    }
                    this.shadows = d;
                }
                return this;
            };
            b.prototype.show = function (c) {
                return this.attr({ visibility: c ? "inherit" : "visible" });
            };
            b.prototype.strokeSetter = function (c, a, f) {
                this[a] = c;
                this.stroke && this["stroke-width"]
                    ? (b.prototype.fillSetter.call(this, this.stroke, "stroke", f), f.setAttribute("stroke-width", this["stroke-width"]), (this.hasStroke = !0))
                    : "stroke-width" === a && 0 === c && this.hasStroke
                    ? (f.removeAttribute("stroke"), (this.hasStroke = !1))
                    : this.renderer.styledMode && this["stroke-width"] && (f.setAttribute("stroke-width", this["stroke-width"]), (this.hasStroke = !0));
            };
            b.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var c = this.getStyle("stroke-width"),
                    f = 0;
                if (c.indexOf("px") === c.length - 2) f = I(c);
                else if ("" !== c) {
                    var d = n.createElementNS(a, "rect");
                    x(d, { width: c, "stroke-width": 0 });
                    this.element.parentNode.appendChild(d);
                    f = d.getBBox().width;
                    d.parentNode.removeChild(d);
                }
                return f;
            };
            b.prototype.symbolAttr = function (c) {
                var a = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (f) {
                    a[f] = H(c[f], a[f]);
                });
                a.attr({ d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a) });
            };
            b.prototype.textSetter = function (c) {
                c !== this.textStr && (delete this.textPxLength, (this.textStr = c), this.added && this.renderer.buildText(this));
            };
            b.prototype.titleSetter = function (c) {
                var a = this.element,
                    f = a.getElementsByTagName("title")[0] || n.createElementNS(this.SVG_NS, "title");
                a.insertBefore ? a.insertBefore(f, a.firstChild) : a.appendChild(f);
                f.textContent = String(H(c, ""))
                    .replace(/<[^>]*>/g, "")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">");
            };
            b.prototype.toFront = function () {
                var c = this.element;
                c.parentNode.appendChild(c);
                return this;
            };
            b.prototype.translate = function (c, a) {
                return this.attr({ translateX: c, translateY: a });
            };
            b.prototype.updateShadows = function (c, a, f) {
                var d = this.shadows;
                if (d) for (var l = d.length; l--; ) f.call(d[l], "height" === c ? Math.max(a - (d[l].cutHeight || 0), 0) : "d" === c ? this.d : a, c, d[l]);
            };
            b.prototype.updateTransform = function () {
                var c = this.scaleX,
                    a = this.scaleY,
                    f = this.inverted,
                    d = this.rotation,
                    l = this.matrix,
                    e = this.element,
                    m = this.translateX || 0,
                    g = this.translateY || 0;
                f && ((m += this.width), (g += this.height));
                m = ["translate(" + m + "," + g + ")"];
                q(l) && m.push("matrix(" + l.join(",") + ")");
                f ? m.push("rotate(90) scale(-1,1)") : d && m.push("rotate(" + d + " " + H(this.rotationOriginX, e.getAttribute("x"), 0) + " " + H(this.rotationOriginY, e.getAttribute("y") || 0) + ")");
                (q(c) || q(a)) && m.push("scale(" + H(c, 1) + " " + H(a, 1) + ")");
                m.length && e.setAttribute("transform", m.join(" "));
            };
            b.prototype.visibilitySetter = function (c, a, f) {
                "inherit" === c ? f.removeAttribute(a) : this[a] !== c && f.setAttribute(a, c);
                this[a] = c;
            };
            b.prototype.xGetter = function (c) {
                "circle" === this.element.nodeName && ("x" === c ? (c = "cx") : "y" === c && (c = "cy"));
                return this._defaultGetter(c);
            };
            b.prototype.zIndexSetter = function (c, a) {
                var f = this.renderer,
                    d = this.parentGroup,
                    l = (d || f).element || f.box,
                    e = this.element;
                f = l === f.box;
                var m = !1;
                var g = this.added;
                var u;
                q(c) ? (e.setAttribute("data-z-index", c), (c = +c), this[a] === c && (g = !1)) : q(this[a]) && e.removeAttribute("data-z-index");
                this[a] = c;
                if (g) {
                    (c = this.zIndex) && d && (d.handleZ = !0);
                    a = l.childNodes;
                    for (u = a.length - 1; 0 <= u && !m; u--) {
                        d = a[u];
                        g = d.getAttribute("data-z-index");
                        var y = !q(g);
                        if (d !== e)
                            if (0 > c && y && !f && !u) l.insertBefore(e, a[u]), (m = !0);
                            else if (I(g) <= c || (y && (!q(c) || 0 <= c))) l.insertBefore(e, a[u + 1] || null), (m = !0);
                    }
                    m || (l.insertBefore(e, a[f ? 3 : 0] || null), (m = !0));
                }
                return m;
            };
            return b;
        })();
        b.prototype["stroke-widthSetter"] = b.prototype.strokeSetter;
        b.prototype.yGetter = b.prototype.xGetter;
        b.prototype.matrixSetter = b.prototype.rotationOriginXSetter = b.prototype.rotationOriginYSetter = b.prototype.rotationSetter = b.prototype.scaleXSetter = b.prototype.scaleYSetter = b.prototype.translateXSetter = b.prototype.translateYSetter = b.prototype.verticalAlignSetter = function (
            c,
            a
        ) {
            this[a] = c;
            this.doTransform = !0;
        };
        ("");
        return b;
    });
    G(b, "Core/Renderer/RendererRegistry.js", [b["Core/Globals.js"]], function (b) {
        var v;
        (function (v) {
            v.rendererTypes = {};
            var p;
            v.getRendererType = function (b) {
                void 0 === b && (b = p);
                return v.rendererTypes[b] || v.rendererTypes[p];
            };
            v.registerRendererType = function (w, D, B) {
                v.rendererTypes[w] = D;
                if (!p || B) (p = w), (b.Renderer = D);
            };
        })(v || (v = {}));
        return v;
    });
    G(b, "Core/Renderer/SVG/SVGLabel.js", [b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]], function (b, p) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (h, d) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                            };
                        return b(h, d);
                    };
                    return function (h, d) {
                        function a() {
                            this.constructor = h;
                        }
                        b(h, d);
                        h.prototype = null === d ? Object.create(d) : ((a.prototype = d.prototype), new a());
                    };
                })(),
            E = p.defined,
            w = p.extend,
            D = p.isNumber,
            B = p.merge,
            k = p.pick,
            t = p.removeEvent;
        return (function (n) {
            function h(d, a, e, g, b, k, r, q, z, m) {
                var f = n.call(this) || this;
                f.paddingLeftSetter = f.paddingSetter;
                f.paddingRightSetter = f.paddingSetter;
                f.init(d, "g");
                f.textStr = a;
                f.x = e;
                f.y = g;
                f.anchorX = k;
                f.anchorY = r;
                f.baseline = z;
                f.className = m;
                f.addClass("button" === m ? "highcharts-no-tooltip" : "highcharts-label");
                m && f.addClass("highcharts-" + m);
                f.text = d.text(void 0, 0, 0, q).attr({ zIndex: 1 });
                var y;
                "string" === typeof b && ((y = /^url\((.*?)\)$/.test(b)) || f.renderer.symbols[b]) && (f.symbolKey = b);
                f.bBox = h.emptyBBox;
                f.padding = 3;
                f.baselineOffset = 0;
                f.needsBox = d.styledMode || y;
                f.deferredAttr = {};
                f.alignFactor = 0;
                return f;
            }
            v(h, n);
            h.prototype.alignSetter = function (d) {
                d = { left: 0, center: 0.5, right: 1 }[d];
                d !== this.alignFactor && ((this.alignFactor = d), this.bBox && D(this.xSetting) && this.attr({ x: this.xSetting }));
            };
            h.prototype.anchorXSetter = function (d, a) {
                this.anchorX = d;
                this.boxAttr(a, Math.round(d) - this.getCrispAdjust() - this.xSetting);
            };
            h.prototype.anchorYSetter = function (d, a) {
                this.anchorY = d;
                this.boxAttr(a, d - this.ySetting);
            };
            h.prototype.boxAttr = function (d, a) {
                this.box ? this.box.attr(d, a) : (this.deferredAttr[d] = a);
            };
            h.prototype.css = function (d) {
                if (d) {
                    var a = {};
                    d = B(d);
                    h.textProps.forEach(function (e) {
                        "undefined" !== typeof d[e] && ((a[e] = d[e]), delete d[e]);
                    });
                    this.text.css(a);
                    var e = "width" in a;
                    "fontSize" in a || "fontWeight" in a ? this.updateTextPadding() : e && this.updateBoxSize();
                }
                return b.prototype.css.call(this, d);
            };
            h.prototype.destroy = function () {
                t(this.element, "mouseenter");
                t(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                b.prototype.destroy.call(this);
            };
            h.prototype.fillSetter = function (d, a) {
                d && (this.needsBox = !0);
                this.fill = d;
                this.boxAttr(a, d);
            };
            h.prototype.getBBox = function () {
                this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var d = this.padding,
                    a = k(this.paddingLeft, d);
                return { width: this.width, height: this.height, x: this.bBox.x - a, y: this.bBox.y - d };
            };
            h.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? (this.box.strokeWidth() % 2) / 2 : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2) / 2;
            };
            h.prototype.heightSetter = function (d) {
                this.heightSetting = d;
            };
            h.prototype.onAdd = function () {
                var d = this.textStr;
                this.text.add(this);
                this.attr({ text: E(d) ? d : "", x: this.x, y: this.y });
                this.box && E(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
            };
            h.prototype.paddingSetter = function (d, a) {
                D(d) ? d !== this[a] && ((this[a] = d), this.updateTextPadding()) : (this[a] = void 0);
            };
            h.prototype.rSetter = function (d, a) {
                this.boxAttr(a, d);
            };
            h.prototype.shadow = function (d) {
                d && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(d));
                return this;
            };
            h.prototype.strokeSetter = function (d, a) {
                this.stroke = d;
                this.boxAttr(a, d);
            };
            h.prototype["stroke-widthSetter"] = function (d, a) {
                d && (this.needsBox = !0);
                this["stroke-width"] = d;
                this.boxAttr(a, d);
            };
            h.prototype["text-alignSetter"] = function (d) {
                this.textAlign = d;
            };
            h.prototype.textSetter = function (d) {
                "undefined" !== typeof d && this.text.attr({ text: d });
                this.updateTextPadding();
            };
            h.prototype.updateBoxSize = function () {
                var d = this.text.element.style,
                    a = {},
                    e = this.padding,
                    g = (this.bBox = (D(this.widthSetting) && D(this.heightSetting) && !this.textAlign) || !E(this.text.textStr) ? h.emptyBBox : this.text.getBBox());
                this.width = this.getPaddedWidth();
                this.height = (this.heightSetting || g.height || 0) + 2 * e;
                d = this.renderer.fontMetrics(d && d.fontSize, this.text);
                this.baselineOffset = e + Math.min((this.text.firstLineMetrics || d).b, g.height || Infinity);
                this.heightSetting && (this.baselineOffset += (this.heightSetting - d.h) / 2);
                this.needsBox &&
                    (this.box ||
                        ((e = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect()),
                        e.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")),
                        e.add(this)),
                    (e = this.getCrispAdjust()),
                    (a.x = e),
                    (a.y = (this.baseline ? -this.baselineOffset : 0) + e),
                    (a.width = Math.round(this.width)),
                    (a.height = Math.round(this.height)),
                    this.box.attr(w(a, this.deferredAttr)),
                    (this.deferredAttr = {}));
            };
            h.prototype.updateTextPadding = function () {
                var d = this.text;
                this.updateBoxSize();
                var a = this.baseline ? 0 : this.baselineOffset,
                    e = k(this.paddingLeft, this.padding);
                E(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (e += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width));
                if (e !== d.x || a !== d.y) d.attr("x", e), d.hasBoxWidthChanged && (this.bBox = d.getBBox(!0)), "undefined" !== typeof a && d.attr("y", a);
                d.x = e;
                d.y = a;
            };
            h.prototype.widthSetter = function (d) {
                this.widthSetting = D(d) ? d : void 0;
            };
            h.prototype.getPaddedWidth = function () {
                var d = this.padding,
                    a = k(this.paddingLeft, d);
                d = k(this.paddingRight, d);
                return (this.widthSetting || this.bBox.width || 0) + a + d;
            };
            h.prototype.xSetter = function (d) {
                this.x = d;
                this.alignFactor && ((d -= this.alignFactor * this.getPaddedWidth()), (this["forceAnimate:x"] = !0));
                this.xSetting = Math.round(d);
                this.attr("translateX", this.xSetting);
            };
            h.prototype.ySetter = function (d) {
                this.ySetting = this.y = Math.round(d);
                this.attr("translateY", this.ySetting);
            };
            h.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
            h.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return h;
        })(b);
    });
    G(b, "Core/Renderer/SVG/Symbols.js", [b["Core/Utilities.js"]], function (b) {
        function v(b, t, n, h, d) {
            var a = [];
            if (d) {
                var e = d.start || 0,
                    g = B(d.r, n);
                n = B(d.r, h || n);
                var k = (d.end || 0) - 0.001;
                h = d.innerR;
                var C = B(d.open, 0.001 > Math.abs((d.end || 0) - e - 2 * Math.PI)),
                    r = Math.cos(e),
                    q = Math.sin(e),
                    z = Math.cos(k),
                    m = Math.sin(k);
                e = B(d.longArc, 0.001 > k - e - Math.PI ? 0 : 1);
                a.push(["M", b + g * r, t + n * q], ["A", g, n, 0, e, B(d.clockwise, 1), b + g * z, t + n * m]);
                w(h) && a.push(C ? ["M", b + h * z, t + h * m] : ["L", b + h * z, t + h * m], ["A", h, h, 0, e, w(d.clockwise) ? 1 - d.clockwise : 0, b + h * r, t + h * q]);
                C || a.push(["Z"]);
            }
            return a;
        }
        function A(b, t, n, h, d) {
            return d && d.r ? E(b, t, n, h, d) : [["M", b, t], ["L", b + n, t], ["L", b + n, t + h], ["L", b, t + h], ["Z"]];
        }
        function E(b, t, n, h, d) {
            d = (d && d.r) || 0;
            return [
                ["M", b + d, t],
                ["L", b + n - d, t],
                ["C", b + n, t, b + n, t, b + n, t + d],
                ["L", b + n, t + h - d],
                ["C", b + n, t + h, b + n, t + h, b + n - d, t + h],
                ["L", b + d, t + h],
                ["C", b, t + h, b, t + h, b, t + h - d],
                ["L", b, t + d],
                ["C", b, t, b, t, b + d, t],
            ];
        }
        var w = b.defined,
            D = b.isNumber,
            B = b.pick;
        return {
            arc: v,
            callout: function (b, t, n, h, d) {
                var a = Math.min((d && d.r) || 0, n, h),
                    e = a + 6,
                    g = d && d.anchorX;
                d = (d && d.anchorY) || 0;
                var x = E(b, t, n, h, { r: a });
                if (!D(g)) return x;
                b + g >= n
                    ? d > t + e && d < t + h - e
                        ? x.splice(3, 1, ["L", b + n, d - 6], ["L", b + n + 6, d], ["L", b + n, d + 6], ["L", b + n, t + h - a])
                        : x.splice(3, 1, ["L", b + n, h / 2], ["L", g, d], ["L", b + n, h / 2], ["L", b + n, t + h - a])
                    : 0 >= b + g
                    ? d > t + e && d < t + h - e
                        ? x.splice(7, 1, ["L", b, d + 6], ["L", b - 6, d], ["L", b, d - 6], ["L", b, t + a])
                        : x.splice(7, 1, ["L", b, h / 2], ["L", g, d], ["L", b, h / 2], ["L", b, t + a])
                    : d && d > h && g > b + e && g < b + n - e
                    ? x.splice(5, 1, ["L", g + 6, t + h], ["L", g, t + h + 6], ["L", g - 6, t + h], ["L", b + a, t + h])
                    : d && 0 > d && g > b + e && g < b + n - e && x.splice(1, 1, ["L", g - 6, t], ["L", g, t - 6], ["L", g + 6, t], ["L", n - a, t]);
                return x;
            },
            circle: function (b, t, n, h) {
                return v(b + n / 2, t + h / 2, n / 2, h / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: !1 });
            },
            diamond: function (b, t, n, h) {
                return [["M", b + n / 2, t], ["L", b + n, t + h / 2], ["L", b + n / 2, t + h], ["L", b, t + h / 2], ["Z"]];
            },
            rect: A,
            roundedRect: E,
            square: A,
            triangle: function (b, t, n, h) {
                return [["M", b + n / 2, t], ["L", b + n, t + h], ["L", b, t + h], ["Z"]];
            },
            "triangle-down": function (b, t, n, h) {
                return [["M", b, t], ["L", b + n, t], ["L", b + n / 2, t + h], ["Z"]];
            },
        };
    });
    G(b, "Core/Renderer/SVG/TextBuilder.js", [b["Core/Renderer/HTML/AST.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = p.doc,
            w = p.SVG_NS,
            D = p.win,
            B = A.attr,
            k = A.isString,
            t = A.objectEach,
            n = A.pick;
        return (function () {
            function h(d) {
                var a = d.styles;
                this.renderer = d.renderer;
                this.svgElement = d;
                this.width = d.textWidth;
                this.textLineHeight = a && a.lineHeight;
                this.textOutline = a && a.textOutline;
                this.ellipsis = !(!a || "ellipsis" !== a.textOverflow);
                this.noWrap = !(!a || "nowrap" !== a.whiteSpace);
                this.fontSize = a && a.fontSize;
            }
            h.prototype.buildSVG = function () {
                var d = this.svgElement,
                    a = d.element,
                    e = d.renderer,
                    g = n(d.textStr, "").toString(),
                    h = -1 !== g.indexOf("<"),
                    C = a.childNodes;
                e = this.width && !d.added && e.box;
                var r = /<br.*?>/g,
                    q = [g, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                if (q !== d.textCache) {
                    d.textCache = q;
                    delete d.actualWidth;
                    for (q = C.length; q--; ) a.removeChild(C[q]);
                    h || this.ellipsis || this.width || (-1 !== g.indexOf(" ") && (!this.noWrap || r.test(g)))
                        ? "" !== g &&
                          (e && e.appendChild(a),
                          (g = new b(g)),
                          this.modifyTree(g.nodes),
                          g.addToDOM(d.element),
                          this.modifyDOM(),
                          this.ellipsis && -1 !== (a.textContent || "").indexOf("\u2026") && d.attr("title", this.unescapeEntities(d.textStr || "", ["&lt;", "&gt;"])),
                          e && e.removeChild(a))
                        : a.appendChild(v.createTextNode(this.unescapeEntities(g)));
                    k(this.textOutline) && d.applyTextOutline && d.applyTextOutline(this.textOutline);
                }
            };
            h.prototype.modifyDOM = function () {
                var d = this,
                    a = this.svgElement,
                    e = B(a.element, "x");
                a.firstLineMetrics = void 0;
                for (var g; (g = a.element.firstChild); )
                    if (/^[\s\u200B]*$/.test(g.textContent || " ")) a.element.removeChild(g);
                    else break;
                [].forEach.call(a.element.querySelectorAll("tspan.highcharts-br"), function (g, b) {
                    g.nextSibling && g.previousSibling && (0 === b && 1 === g.previousSibling.nodeType && (a.firstLineMetrics = a.renderer.fontMetrics(void 0, g.previousSibling)), B(g, { dy: d.getLineHeight(g.nextSibling), x: e }));
                });
                var b = this.width || 0;
                if (b) {
                    var h = function (g, h) {
                            var m = g.textContent || "",
                                f = m.replace(/([^\^])-/g, "$1- ").split(" "),
                                q = !d.noWrap && (1 < f.length || 1 < a.element.childNodes.length),
                                c = d.getLineHeight(h),
                                u = 0,
                                l = a.actualWidth;
                            if (d.ellipsis)
                                m &&
                                    d.truncate(g, m, void 0, 0, Math.max(0, b - parseInt(d.fontSize || 12, 10)), function (c, a) {
                                        return c.substring(0, a) + "\u2026";
                                    });
                            else if (q) {
                                m = [];
                                for (q = []; h.firstChild && h.firstChild !== g; ) q.push(h.firstChild), h.removeChild(h.firstChild);
                                for (; f.length; )
                                    f.length && !d.noWrap && 0 < u && (m.push(g.textContent || ""), (g.textContent = f.join(" ").replace(/- /g, "-"))),
                                        d.truncate(g, void 0, f, 0 === u ? l || 0 : 0, b, function (c, a) {
                                            return f.slice(0, a).join(" ").replace(/- /g, "-");
                                        }),
                                        (l = a.actualWidth),
                                        u++;
                                q.forEach(function (c) {
                                    h.insertBefore(c, g);
                                });
                                m.forEach(function (a) {
                                    h.insertBefore(v.createTextNode(a), g);
                                    a = v.createElementNS(w, "tspan");
                                    a.textContent = "\u200b";
                                    B(a, { dy: c, x: e });
                                    h.insertBefore(a, g);
                                });
                            }
                        },
                        r = function (d) {
                            [].slice.call(d.childNodes).forEach(function (e) {
                                e.nodeType === D.Node.TEXT_NODE ? h(e, d) : (-1 !== e.className.baseVal.indexOf("highcharts-br") && (a.actualWidth = 0), r(e));
                            });
                        };
                    r(a.element);
                }
            };
            h.prototype.getLineHeight = function (d) {
                var a;
                d = d.nodeType === D.Node.TEXT_NODE ? d.parentElement : d;
                this.renderer.styledMode || (a = d && /(px|em)$/.test(d.style.fontSize) ? d.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(a, d || this.svgElement.element).h;
            };
            h.prototype.modifyTree = function (d) {
                var a = this,
                    e = function (g, b) {
                        var h = g.attributes;
                        h = void 0 === h ? {} : h;
                        var r = g.children,
                            q = g.tagName,
                            z = a.renderer.styledMode;
                        if ("b" === q || "strong" === q) z ? (h["class"] = "highcharts-strong") : (h.style = "font-weight:bold;" + (h.style || ""));
                        else if ("i" === q || "em" === q) z ? (h["class"] = "highcharts-emphasized") : (h.style = "font-style:italic;" + (h.style || ""));
                        k(h.style) && (h.style = h.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
                        "br" === q
                            ? ((h["class"] = "highcharts-br"), (g.textContent = "\u200b"), (b = d[b + 1]) && b.textContent && (b.textContent = b.textContent.replace(/^ +/gm, "")))
                            : "a" === q &&
                              r &&
                              r.some(function (a) {
                                  return "#text" === a.tagName;
                              }) &&
                              (g.children = [{ children: r, tagName: "tspan" }]);
                        "#text" !== q && "a" !== q && (g.tagName = "tspan");
                        g.attributes = h;
                        r &&
                            r
                                .filter(function (a) {
                                    return "#text" !== a.tagName;
                                })
                                .forEach(e);
                    };
                d.forEach(e);
            };
            h.prototype.truncate = function (d, a, e, g, b, h) {
                var r = this.svgElement,
                    q = r.renderer,
                    z = r.rotation,
                    m = [],
                    f = e ? 1 : 0,
                    y = (a || e || "").length,
                    c = y,
                    u,
                    l = function (c, f) {
                        f = f || c;
                        var l = d.parentNode;
                        if (l && "undefined" === typeof m[f])
                            if (l.getSubStringLength)
                                try {
                                    m[f] = g + l.getSubStringLength(0, e ? f + 1 : f);
                                } catch (Z) {
                                    ("");
                                }
                            else q.getSpanWidth && ((d.textContent = h(a || e, c)), (m[f] = g + q.getSpanWidth(r, d)));
                        return m[f];
                    };
                r.rotation = 0;
                var F = l(d.textContent.length);
                if (g + F > b) {
                    for (; f <= y; ) (c = Math.ceil((f + y) / 2)), e && (u = h(e, c)), (F = l(c, u && u.length - 1)), f === y ? (f = y + 1) : F > b ? (y = c - 1) : (f = c);
                    0 === y ? (d.textContent = "") : (a && y === a.length - 1) || (d.textContent = u || h(a || e, c));
                }
                e && e.splice(0, c);
                r.actualWidth = F;
                r.rotation = z;
            };
            h.prototype.unescapeEntities = function (d, a) {
                t(this.renderer.escapes, function (e, g) {
                    (a && -1 !== a.indexOf(e)) || (d = d.toString().replace(new RegExp(e, "g"), g));
                });
                return d;
            };
            return h;
        })();
    });
    G(
        b,
        "Core/Renderer/SVG/SVGRenderer.js",
        [
            b["Core/Renderer/HTML/AST.js"],
            b["Core/Color/Color.js"],
            b["Core/Globals.js"],
            b["Core/Renderer/RendererRegistry.js"],
            b["Core/Renderer/SVG/SVGElement.js"],
            b["Core/Renderer/SVG/SVGLabel.js"],
            b["Core/Renderer/SVG/Symbols.js"],
            b["Core/Renderer/SVG/TextBuilder.js"],
            b["Core/Utilities.js"],
        ],
        function (b, p, A, E, w, D, B, k, t) {
            var n = A.charts,
                h = A.deg2rad,
                d = A.doc,
                a = A.isFirefox,
                e = A.isMS,
                g = A.isWebKit,
                x = A.noop,
                C = A.SVG_NS,
                r = A.symbolSizes,
                q = A.win,
                z = t.addEvent,
                m = t.attr,
                f = t.createElement,
                y = t.css,
                c = t.defined,
                u = t.destroyObjectProperties,
                l = t.extend,
                F = t.isArray,
                K = t.isNumber,
                H = t.isObject,
                I = t.isString,
                v = t.merge,
                Q = t.pick,
                O = t.pInt,
                R = t.uniqueKey,
                T;
            A = (function () {
                function x(c, a, f, d, l, e, m) {
                    this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                    this.init(c, a, f, d, l, e, m);
                }
                x.prototype.init = function (c, f, l, e, g, b, u) {
                    var h = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" }),
                        r = h.element;
                    u || h.css(this.getStyle(e));
                    c.appendChild(r);
                    m(c, "dir", "ltr");
                    -1 === c.innerHTML.indexOf("xmlns") && m(r, "xmlns", this.SVG_NS);
                    this.isSVG = !0;
                    this.box = r;
                    this.boxWrapper = h;
                    this.alignedObjects = [];
                    this.url = this.getReferenceURL();
                    this.createElement("desc").add().element.appendChild(d.createTextNode("Created with Highcharts 9.3.3"));
                    this.defs = this.createElement("defs").add();
                    this.allowHTML = b;
                    this.forExport = g;
                    this.styledMode = u;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(f, l, !1);
                    var x;
                    a &&
                        c.getBoundingClientRect &&
                        ((f = function () {
                            y(c, { left: 0, top: 0 });
                            x = c.getBoundingClientRect();
                            y(c, { left: Math.ceil(x.left) - x.left + "px", top: Math.ceil(x.top) - x.top + "px" });
                        }),
                        f(),
                        (this.unSubPixelFix = z(q, "resize", f)));
                };
                x.prototype.definition = function (c) {
                    return new b([c]).addToDOM(this.defs.element);
                };
                x.prototype.getReferenceURL = function () {
                    if ((a || g) && d.getElementsByTagName("base").length) {
                        if (!c(T)) {
                            var f = R();
                            f = new b([
                                {
                                    tagName: "svg",
                                    attributes: { width: 8, height: 8 },
                                    children: [
                                        { tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: f }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] },
                                        { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": "url(#" + f + ")", fill: "rgba(0,0,0,0.001)" } },
                                    ],
                                },
                            ]).addToDOM(d.body);
                            y(f, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
                            var l = d.elementFromPoint(6, 6);
                            T = "hitme" === (l && l.id);
                            d.body.removeChild(f);
                        }
                        if (T)
                            return q.location.href
                                .split("#")[0]
                                .replace(/<[^>]*>/g, "")
                                .replace(/([\('\)])/g, "\\$1")
                                .replace(/ /g, "%20");
                    }
                    return "";
                };
                x.prototype.getStyle = function (c) {
                    return (this.style = l({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, c));
                };
                x.prototype.setStyle = function (c) {
                    this.boxWrapper.css(this.getStyle(c));
                };
                x.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width;
                };
                x.prototype.destroy = function () {
                    var c = this.defs;
                    this.box = null;
                    this.boxWrapper = this.boxWrapper.destroy();
                    u(this.gradients || {});
                    this.gradients = null;
                    c && (this.defs = c.destroy());
                    this.unSubPixelFix && this.unSubPixelFix();
                    return (this.alignedObjects = null);
                };
                x.prototype.createElement = function (c) {
                    var a = new this.Element();
                    a.init(this, c);
                    return a;
                };
                x.prototype.getRadialAttr = function (c, a) {
                    return { cx: c[0] - c[2] / 2 + (a.cx || 0) * c[2], cy: c[1] - c[2] / 2 + (a.cy || 0) * c[2], r: (a.r || 0) * c[2] };
                };
                x.prototype.buildText = function (c) {
                    new k(c).buildSVG();
                };
                x.prototype.getContrast = function (c) {
                    c = p.parse(c).rgba;
                    c[0] *= 1;
                    c[1] *= 1.2;
                    c[2] *= 0.5;
                    return 459 < c[0] + c[1] + c[2] ? "#000000" : "#FFFFFF";
                };
                x.prototype.button = function (c, a, f, d, m, g, u, q, h, y) {
                    var r = this.label(c, a, f, h, void 0, void 0, y, void 0, "button"),
                        x = this.styledMode,
                        F = 0,
                        C = m ? v(m) : {};
                    c = (C && C.style) || {};
                    C = b.filterUserAttributes(C);
                    r.attr(v({ padding: 8, r: 2 }, C));
                    if (!x) {
                        C = v({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, { style: c }, C);
                        var n = C.style;
                        delete C.style;
                        g = v(C, { fill: "#e6e6e6" }, b.filterUserAttributes(g || {}));
                        var H = g.style;
                        delete g.style;
                        u = v(C, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, b.filterUserAttributes(u || {}));
                        var k = u.style;
                        delete u.style;
                        q = v(C, { style: { color: "#cccccc" } }, b.filterUserAttributes(q || {}));
                        var M = q.style;
                        delete q.style;
                    }
                    z(r.element, e ? "mouseover" : "mouseenter", function () {
                        3 !== F && r.setState(1);
                    });
                    z(r.element, e ? "mouseout" : "mouseleave", function () {
                        3 !== F && r.setState(F);
                    });
                    r.setState = function (c) {
                        1 !== c && (r.state = F = c);
                        r.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][c || 0]);
                        x || r.attr([C, g, u, q][c || 0]).css([n, H, k, M][c || 0]);
                    };
                    x || r.attr(C).css(l({ cursor: "default" }, n));
                    return r
                        .on("touchstart", function (c) {
                            return c.stopPropagation();
                        })
                        .on("click", function (c) {
                            3 !== F && d.call(r, c);
                        });
                };
                x.prototype.crispLine = function (a, f, d) {
                    void 0 === d && (d = "round");
                    var l = a[0],
                        e = a[1];
                    c(l[1]) && l[1] === e[1] && (l[1] = e[1] = Math[d](l[1]) - (f % 2) / 2);
                    c(l[2]) && l[2] === e[2] && (l[2] = e[2] = Math[d](l[2]) + (f % 2) / 2);
                    return a;
                };
                x.prototype.path = function (c) {
                    var a = this.styledMode ? {} : { fill: "none" };
                    F(c) ? (a.d = c) : H(c) && l(a, c);
                    return this.createElement("path").attr(a);
                };
                x.prototype.circle = function (c, a, f) {
                    c = H(c) ? c : "undefined" === typeof c ? {} : { x: c, y: a, r: f };
                    a = this.createElement("circle");
                    a.xSetter = a.ySetter = function (c, a, f) {
                        f.setAttribute("c" + a, c);
                    };
                    return a.attr(c);
                };
                x.prototype.arc = function (c, a, f, d, l, e) {
                    H(c) ? ((d = c), (a = d.y), (f = d.r), (c = d.x)) : (d = { innerR: d, start: l, end: e });
                    c = this.symbol("arc", c, a, f, f, d);
                    c.r = f;
                    return c;
                };
                x.prototype.rect = function (c, a, f, d, l, e) {
                    l = H(c) ? c.r : l;
                    var g = this.createElement("rect");
                    c = H(c) ? c : "undefined" === typeof c ? {} : { x: c, y: a, width: Math.max(f, 0), height: Math.max(d, 0) };
                    this.styledMode || ("undefined" !== typeof e && ((c["stroke-width"] = e), (c = g.crisp(c))), (c.fill = "none"));
                    l && (c.r = l);
                    g.rSetter = function (c, a, f) {
                        g.r = c;
                        m(f, { rx: c, ry: c });
                    };
                    g.rGetter = function () {
                        return g.r || 0;
                    };
                    return g.attr(c);
                };
                x.prototype.setSize = function (c, a, f) {
                    this.width = c;
                    this.height = a;
                    this.boxWrapper.animate(
                        { width: c, height: a },
                        {
                            step: function () {
                                this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
                            },
                            duration: Q(f, !0) ? void 0 : 0,
                        }
                    );
                    this.alignElements();
                };
                x.prototype.g = function (c) {
                    var a = this.createElement("g");
                    return c ? a.attr({ class: "highcharts-" + c }) : a;
                };
                x.prototype.image = function (c, a, f, d, l, e) {
                    var m = { preserveAspectRatio: "none" },
                        g = function (c, a) {
                            c.setAttributeNS ? c.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : c.setAttribute("hc-svg-href", a);
                        };
                    K(a) && (m.x = a);
                    K(f) && (m.y = f);
                    K(d) && (m.width = d);
                    K(l) && (m.height = l);
                    var b = this.createElement("image").attr(m);
                    a = function (a) {
                        g(b.element, c);
                        e.call(b, a);
                    };
                    e ? (g(b.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), (f = new q.Image()), z(f, "load", a), (f.src = c), f.complete && a({})) : g(b.element, c);
                    return b;
                };
                x.prototype.symbol = function (a, e, m, g, b, u) {
                    var q = this,
                        h = /^url\((.*?)\)$/,
                        z = h.test(a),
                        x = !z && (this.symbols[a] ? a : "circle"),
                        F = x && this.symbols[x],
                        C;
                    if (F) {
                        "number" === typeof e && (C = F.call(this.symbols, Math.round(e || 0), Math.round(m || 0), g || 0, b || 0, u));
                        var H = this.path(C);
                        q.styledMode || H.attr("fill", "none");
                        l(H, { symbolName: x || void 0, x: e, y: m, width: g, height: b });
                        u && l(H, u);
                    } else if (z) {
                        var k = a.match(h)[1];
                        var M = (H = this.image(k));
                        M.imgwidth = Q(r[k] && r[k].width, u && u.width);
                        M.imgheight = Q(r[k] && r[k].height, u && u.height);
                        var da = function (c) {
                            return c.attr({ width: c.width, height: c.height });
                        };
                        ["width", "height"].forEach(function (a) {
                            M[a + "Setter"] = function (a, f) {
                                var d = this["img" + f];
                                this[f] = a;
                                c(d) &&
                                    (u && "within" === u.backgroundSize && this.width && this.height && (d = Math.round(d * Math.min(this.width / this.imgwidth, this.height / this.imgheight))),
                                    this.element && this.element.setAttribute(f, d),
                                    this.alignByTranslate || ((a = ((this[f] || 0) - d) / 2), this.attr("width" === f ? { translateX: a } : { translateY: a })));
                            };
                        });
                        c(e) && M.attr({ x: e, y: m });
                        M.isImg = !0;
                        c(M.imgwidth) && c(M.imgheight)
                            ? da(M)
                            : (M.attr({ width: 0, height: 0 }),
                              f("img", {
                                  onload: function () {
                                      var c = n[q.chartIndex];
                                      0 === this.width && (y(this, { position: "absolute", top: "-999em" }), d.body.appendChild(this));
                                      r[k] = { width: this.width, height: this.height };
                                      M.imgwidth = this.width;
                                      M.imgheight = this.height;
                                      M.element && da(M);
                                      this.parentNode && this.parentNode.removeChild(this);
                                      q.imgCount--;
                                      if (!q.imgCount && c && !c.hasLoaded) c.onload();
                                  },
                                  src: k,
                              }),
                              this.imgCount++);
                    }
                    return H;
                };
                x.prototype.clipRect = function (c, a, f, d) {
                    var l = R() + "-",
                        e = this.createElement("clipPath").attr({ id: l }).add(this.defs);
                    c = this.rect(c, a, f, d, 0).add(e);
                    c.id = l;
                    c.clipPath = e;
                    c.count = 0;
                    return c;
                };
                x.prototype.text = function (a, f, d, l) {
                    var e = {};
                    if (l && (this.allowHTML || !this.forExport)) return this.html(a, f, d);
                    e.x = Math.round(f || 0);
                    d && (e.y = Math.round(d));
                    c(a) && (e.text = a);
                    a = this.createElement("text").attr(e);
                    if (!l || (this.forExport && !this.allowHTML))
                        a.xSetter = function (c, a, f) {
                            for (var d = f.getElementsByTagName("tspan"), l = f.getAttribute(a), e = 0, m; e < d.length; e++) (m = d[e]), m.getAttribute(a) === l && m.setAttribute(a, c);
                            f.setAttribute(a, c);
                        };
                    return a;
                };
                x.prototype.fontMetrics = function (c, a) {
                    c = (!this.styledMode && /px/.test(c)) || !q.getComputedStyle ? c || (a && a.style && a.style.fontSize) || (this.style && this.style.fontSize) : a && w.prototype.getStyle.call(a, "font-size");
                    c = /px/.test(c) ? O(c) : 12;
                    a = 24 > c ? c + 3 : Math.round(1.2 * c);
                    return { h: a, b: Math.round(0.8 * a), f: c };
                };
                x.prototype.rotCorr = function (c, a, f) {
                    var d = c;
                    a && f && (d = Math.max(d * Math.cos(a * h), 4));
                    return { x: (-c / 3) * Math.sin(a * h), y: d };
                };
                x.prototype.pathToSegments = function (c) {
                    for (var a = [], f = [], d = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, l = 0; l < c.length; l++)
                        I(f[0]) && K(c[l]) && f.length === d[f[0].toUpperCase()] && c.splice(l, 0, f[0].replace("M", "L").replace("m", "l")), "string" === typeof c[l] && (f.length && a.push(f.slice(0)), (f.length = 0)), f.push(c[l]);
                    a.push(f.slice(0));
                    return a;
                };
                x.prototype.label = function (c, a, f, d, l, e, m, g, b) {
                    return new D(this, c, a, f, d, l, e, m, g, b);
                };
                x.prototype.alignElements = function () {
                    this.alignedObjects.forEach(function (c) {
                        return c.align();
                    });
                };
                return x;
            })();
            l(A.prototype, { Element: w, SVG_NS: C, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: B, draw: x });
            E.registerRendererType("svg", A, !0);
            ("");
            return A;
        }
    );
    G(b, "Core/Renderer/HTML/HTMLElement.js", [b["Core/Globals.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var a = function (d, e) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                            };
                        return a(d, e);
                    };
                    return function (d, e) {
                        function g() {
                            this.constructor = d;
                        }
                        a(d, e);
                        d.prototype = null === e ? Object.create(e) : ((g.prototype = e.prototype), new g());
                    };
                })(),
            w = b.isFirefox,
            D = b.isMS,
            B = b.isWebKit,
            k = b.win,
            t = A.css,
            n = A.defined,
            h = A.extend,
            d = A.pick,
            a = A.pInt;
        return (function (e) {
            function g() {
                return (null !== e && e.apply(this, arguments)) || this;
            }
            v(g, e);
            g.compose = function (a) {
                if (-1 === g.composedClasses.indexOf(a)) {
                    g.composedClasses.push(a);
                    var d = g.prototype,
                        e = a.prototype;
                    e.getSpanCorrection = d.getSpanCorrection;
                    e.htmlCss = d.htmlCss;
                    e.htmlGetBBox = d.htmlGetBBox;
                    e.htmlUpdateTransform = d.htmlUpdateTransform;
                    e.setSpanRotation = d.setSpanRotation;
                }
                return a;
            };
            g.prototype.getSpanCorrection = function (a, d, e) {
                this.xCorr = -a * e;
                this.yCorr = -d;
            };
            g.prototype.htmlCss = function (a) {
                var e = "SPAN" === this.element.tagName && a && "width" in a,
                    g = d(e && a.width, void 0);
                if (e) {
                    delete a.width;
                    this.textWidth = g;
                    var b = !0;
                }
                a && "ellipsis" === a.textOverflow && ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
                this.styles = h(this.styles, a);
                t(this.element, a);
                b && this.htmlUpdateTransform();
                return this;
            };
            g.prototype.htmlGetBBox = function () {
                var a = this.element;
                return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight };
            };
            g.prototype.htmlUpdateTransform = function () {
                if (this.added) {
                    var d = this.renderer,
                        e = this.element,
                        g = this.translateX || 0,
                        b = this.translateY || 0,
                        h = this.x || 0,
                        m = this.y || 0,
                        f = this.textAlign || "left",
                        y = { left: 0, center: 0.5, right: 1 }[f],
                        c = this.styles;
                    c = c && c.whiteSpace;
                    t(e, { marginLeft: g, marginTop: b });
                    !d.styledMode &&
                        this.shadows &&
                        this.shadows.forEach(function (c) {
                            t(c, { marginLeft: g + 1, marginTop: b + 1 });
                        });
                    this.inverted &&
                        [].forEach.call(e.childNodes, function (c) {
                            d.invertChild(c, e);
                        });
                    if ("SPAN" === e.tagName) {
                        var u = this.rotation,
                            l = this.textWidth && a(this.textWidth),
                            F = [u, f, e.innerHTML, this.textWidth, this.textAlign].join(),
                            k = void 0;
                        k = !1;
                        if (l !== this.oldTextWidth) {
                            if (this.textPxLength) var H = this.textPxLength;
                            else t(e, { width: "", whiteSpace: c || "nowrap" }), (H = e.offsetWidth);
                            (l > this.oldTextWidth || H > l) &&
                                (/[ \-]/.test(e.textContent || e.innerText) || "ellipsis" === e.style.textOverflow) &&
                                (t(e, { width: H > l || u ? l + "px" : "auto", display: "block", whiteSpace: c || "normal" }), (this.oldTextWidth = l), (k = !0));
                        }
                        this.hasBoxWidthChanged = k;
                        F !== this.cTT &&
                            ((k = d.fontMetrics(e.style.fontSize, e).b),
                            !n(u) || (u === (this.oldRotation || 0) && f === this.oldAlign) || this.setSpanRotation(u, y, k),
                            this.getSpanCorrection((!n(u) && this.textPxLength) || e.offsetWidth, k, y, u, f));
                        t(e, { left: h + (this.xCorr || 0) + "px", top: m + (this.yCorr || 0) + "px" });
                        this.cTT = F;
                        this.oldRotation = u;
                        this.oldAlign = f;
                    }
                } else this.alignOnAdd = !0;
            };
            g.prototype.setSpanRotation = function (a, d, e) {
                var g = {},
                    b = D && !/Edge/.test(k.navigator.userAgent) ? "-ms-transform" : B ? "-webkit-transform" : w ? "MozTransform" : k.opera ? "-o-transform" : void 0;
                b && ((g[b] = g.transform = "rotate(" + a + "deg)"), (g[b + (w ? "Origin" : "-origin")] = g.transformOrigin = 100 * d + "% " + e + "px"), t(this.element, g));
            };
            g.composedClasses = [];
            return g;
        })(p);
    });
    G(b, "Core/Renderer/HTML/HTMLRenderer.js", [b["Core/Renderer/HTML/AST.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (h, d) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
                            };
                        return b(h, d);
                    };
                    return function (h, d) {
                        function a() {
                            this.constructor = h;
                        }
                        b(h, d);
                        h.prototype = null === d ? Object.create(d) : ((a.prototype = d.prototype), new a());
                    };
                })(),
            D = E.attr,
            B = E.createElement,
            k = E.extend,
            t = E.pick;
        return (function (n) {
            function h() {
                return (null !== n && n.apply(this, arguments)) || this;
            }
            v(h, n);
            h.compose = function (d) {
                -1 === h.composedClasses.indexOf(d) && (h.composedClasses.push(d), (d.prototype.html = h.prototype.html));
                return d;
            };
            h.prototype.html = function (d, a, e) {
                var g = this.createElement("span"),
                    h = g.element,
                    n = g.renderer,
                    r = n.isSVG,
                    q = function (a, d) {
                        ["opacity", "visibility"].forEach(function (f) {
                            a[f + "Setter"] = function (e, c, m) {
                                var l = a.div ? a.div.style : d;
                                p.prototype[f + "Setter"].call(this, e, c, m);
                                l && (l[c] = e);
                            };
                        });
                        a.addedSetters = !0;
                    };
                g.textSetter = function (a) {
                    a !== this.textStr && (delete this.bBox, delete this.oldTextWidth, b.setElementHTML(this.element, t(a, "")), (this.textStr = a), (g.doTransform = !0));
                };
                r && q(g, g.element.style);
                g.xSetter = g.ySetter = g.alignSetter = g.rotationSetter = function (a, d) {
                    "align" === d ? (g.alignValue = g.textAlign = a) : (g[d] = a);
                    g.doTransform = !0;
                };
                g.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), (this.doTransform = !1));
                };
                g.attr({ text: d, x: Math.round(a), y: Math.round(e) }).css({ position: "absolute" });
                n.styledMode || g.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
                h.style.whiteSpace = "nowrap";
                g.css = g.htmlCss;
                r &&
                    (g.add = function (a) {
                        var d = n.box.parentNode,
                            f = [];
                        if ((this.parentGroup = a)) {
                            var e = a.div;
                            if (!e) {
                                for (; a; ) f.push(a), (a = a.parentGroup);
                                f.reverse().forEach(function (c) {
                                    function a(a, f) {
                                        c[f] = a;
                                        "translateX" === f ? (b.left = a + "px") : (b.top = a + "px");
                                        c.doTransform = !0;
                                    }
                                    var l = D(c.element, "class"),
                                        m = c.styles || {};
                                    e = c.div =
                                        c.div ||
                                        B(
                                            "div",
                                            l ? { className: l } : void 0,
                                            {
                                                position: "absolute",
                                                left: (c.translateX || 0) + "px",
                                                top: (c.translateY || 0) + "px",
                                                display: c.display,
                                                opacity: c.opacity,
                                                cursor: m.cursor,
                                                pointerEvents: m.pointerEvents,
                                                visibility: c.visibility,
                                            },
                                            e || d
                                        );
                                    var b = e.style;
                                    k(c, {
                                        classSetter: (function (c) {
                                            return function (a) {
                                                this.element.setAttribute("class", a);
                                                c.className = a;
                                            };
                                        })(e),
                                        on: function () {
                                            f[0].div && g.on.apply({ element: f[0].div, onEvents: c.onEvents }, arguments);
                                            return c;
                                        },
                                        translateXSetter: a,
                                        translateYSetter: a,
                                    });
                                    c.addedSetters || q(c);
                                });
                            }
                        } else e = d;
                        e.appendChild(h);
                        g.added = !0;
                        g.alignOnAdd && g.htmlUpdateTransform();
                        return g;
                    });
                return g;
            };
            h.composedClasses = [];
            return h;
        })(A);
    });
    G(b, "Core/Axis/AxisDefaults.js", [], function () {
        var b;
        (function (b) {
            b.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: { main: "%H:%M:%S.%L", range: !1 },
                    second: { main: "%H:%M:%S", range: !1 },
                    minute: { main: "%H:%M", range: !1 },
                    hour: { main: "%H:%M", range: !1 },
                    day: { main: "%e. %b" },
                    week: { main: "%e. %b" },
                    month: { main: "%b '%y" },
                    year: { main: "%Y" },
                },
                endOnTick: !1,
                gridLineDashStyle: "Solid",
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: "justify",
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: { color: "#666666", cursor: "default", fontSize: "11px" },
                },
                maxPadding: 0.01,
                minorGridLineDashStyle: "Solid",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: 0.01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: { align: "middle", rotation: 0, useHTML: !1, x: 0, y: 0, style: { color: "#666666" } },
                type: "linear",
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                gridLineWidth: void 0,
                tickColor: "#ccd6eb",
            };
            b.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: 0.05,
                minPadding: 0.05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: { x: -8 },
                startOnTick: !0,
                title: { rotation: 270, text: "Values" },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var b = this.axis.chart.numberFormatter;
                        return b(this.total, -1);
                    },
                    style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" },
                },
                gridLineWidth: 1,
                lineWidth: 0,
            };
            b.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } };
            b.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } };
            b.defaultBottomAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
            b.defaultTopAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
        })(b || (b = {}));
        return b;
    });
    G(b, "Core/Foundation.js", [b["Core/Utilities.js"]], function (b) {
        var v = b.addEvent,
            A = b.isFunction,
            E = b.objectEach,
            w = b.removeEvent,
            D;
        (function (b) {
            b.registerEventOptions = function (b, t) {
                b.eventOptions = b.eventOptions || {};
                E(t.events, function (k, h) {
                    b.eventOptions[h] !== k && (b.eventOptions[h] && (w(b, h, b.eventOptions[h]), delete b.eventOptions[h]), A(k) && ((b.eventOptions[h] = k), v(b, h, k)));
                });
            };
        })(D || (D = {}));
        return D;
    });
    G(b, "Core/Axis/Tick.js", [b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = p.deg2rad,
            w = A.clamp,
            D = A.correctFloat,
            B = A.defined,
            k = A.destroyObjectProperties,
            t = A.extend,
            n = A.fireEvent,
            h = A.isNumber,
            d = A.merge,
            a = A.objectEach,
            e = A.pick;
        p = (function () {
            function g(a, d, e, b, g) {
                this.isNewLabel = this.isNew = !0;
                this.axis = a;
                this.pos = d;
                this.type = e || "";
                this.parameters = g || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                n(this, "init");
                e || b || this.addLabel();
            }
            g.prototype.addLabel = function () {
                var a = this,
                    d = a.axis,
                    g = d.options,
                    q = d.chart,
                    z = d.categories,
                    m = d.logarithmic,
                    f = d.names,
                    y = a.pos,
                    c = e(a.options && a.options.labels, g.labels),
                    u = d.tickPositions,
                    l = y === u[0],
                    F = y === u[u.length - 1],
                    k = (!c.step || 1 === c.step) && 1 === d.tickInterval;
                u = u.info;
                var H = a.label,
                    I;
                z = this.parameters.category || (z ? e(z[y], f[y], y) : y);
                m && h(z) && (z = D(m.lin2log(z)));
                if (d.dateTime)
                    if (u) {
                        var v = q.time.resolveDTLFormat(g.dateTimeLabelFormats[(!g.grid && u.higherRanks[y]) || u.unitName]);
                        var p = v.main;
                    } else h(z) && (p = d.dateTime.getXDateFormat(z, g.dateTimeLabelFormats || {}));
                a.isFirst = l;
                a.isLast = F;
                var w = { axis: d, chart: q, dateTimeLabelFormat: p, isFirst: l, isLast: F, pos: y, tick: a, tickPositionInfo: u, value: z };
                n(this, "labelFormat", w);
                var A = function (a) {
                    return c.formatter ? c.formatter.call(a, a) : c.format ? ((a.text = d.defaultLabelFormatter.call(a)), b.format(c.format, a, q)) : d.defaultLabelFormatter.call(a, a);
                };
                g = A.call(w, w);
                var E = v && v.list;
                a.shortenLabel = E
                    ? function () {
                          for (I = 0; I < E.length; I++) if ((t(w, { dateTimeLabelFormat: E[I] }), H.attr({ text: A.call(w, w) }), H.getBBox().width < d.getSlotWidth(a) - 2 * c.padding)) return;
                          H.attr({ text: "" });
                      }
                    : void 0;
                k && d._addedPlotLB && a.moveLabel(g, c);
                B(H) || a.movedLabel
                    ? H && H.textStr !== g && !k && (!H.textWidth || c.style.width || H.styles.width || H.css({ width: null }), H.attr({ text: g }), (H.textPxLength = H.getBBox().width))
                    : ((a.label = H = a.createLabel({ x: 0, y: 0 }, g, c)), (a.rotation = 0));
            };
            g.prototype.createLabel = function (a, e, b) {
                var g = this.axis,
                    h = g.chart;
                if ((a = B(e) && b.enabled ? h.renderer.text(e, a.x, a.y, b.useHTML).add(g.labelGroup) : null)) h.styledMode || a.css(d(b.style)), (a.textPxLength = a.getBBox().width);
                return a;
            };
            g.prototype.destroy = function () {
                k(this, this.axis);
            };
            g.prototype.getPosition = function (a, d, e, b) {
                var g = this.axis,
                    m = g.chart,
                    f = (b && m.oldChartHeight) || m.chartHeight;
                a = {
                    x: a ? D(g.translate(d + e, null, null, b) + g.transB) : g.left + g.offset + (g.opposite ? ((b && m.oldChartWidth) || m.chartWidth) - g.right - g.left : 0),
                    y: a ? f - g.bottom + g.offset - (g.opposite ? g.height : 0) : D(f - g.translate(d + e, null, null, b) - g.transB),
                };
                a.y = w(a.y, -1e5, 1e5);
                n(this, "afterGetPosition", { pos: a });
                return a;
            };
            g.prototype.getLabelPosition = function (a, d, e, g, b, m, f, h) {
                var c = this.axis,
                    u = c.transA,
                    l = c.isLinked && c.linkedParent ? c.linkedParent.reversed : c.reversed,
                    q = c.staggerLines,
                    y = c.tickRotCorr || { x: 0, y: 0 },
                    r = g || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ? 0.5 : 1),
                    k = {},
                    z = b.y;
                B(z) || (z = 0 === c.side ? (e.rotation ? -8 : -e.getBBox().height) : 2 === c.side ? y.y + 8 : Math.cos(e.rotation * v) * (y.y - e.getBBox(!1, 0).height / 2));
                a = a + b.x + r + y.x - (m && g ? m * u * (l ? -1 : 1) : 0);
                d = d + z - (m && !g ? m * u * (l ? 1 : -1) : 0);
                q && ((e = (f / (h || 1)) % q), c.opposite && (e = q - e - 1), (d += (c.labelOffset / q) * e));
                k.x = a;
                k.y = Math.round(d);
                n(this, "afterGetLabelPosition", { pos: k, tickmarkOffset: m, index: f });
                return k;
            };
            g.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
            };
            g.prototype.getMarkPath = function (a, d, e, g, b, m) {
                return m.crispLine(
                    [
                        ["M", a, d],
                        ["L", a + (b ? 0 : -e), d + (b ? e : 0)],
                    ],
                    g
                );
            };
            g.prototype.handleOverflow = function (a) {
                var d = this.axis,
                    g = d.options.labels,
                    b = a.x,
                    h = d.chart.chartWidth,
                    m = d.chart.spacing,
                    f = e(d.labelLeft, Math.min(d.pos, m[3]));
                m = e(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, h - m[1]));
                var y = this.label,
                    c = this.rotation,
                    u = { left: 0, center: 0.5, right: 1 }[d.labelAlign || y.attr("align")],
                    l = y.getBBox().width,
                    F = d.getSlotWidth(this),
                    k = {},
                    H = F,
                    n = 1,
                    x;
                if (c || "justify" !== g.overflow) 0 > c && b - u * l < f ? (x = Math.round(b / Math.cos(c * v) - f)) : 0 < c && b + u * l > m && (x = Math.round((h - b) / Math.cos(c * v)));
                else if (
                    ((h = b + (1 - u) * l),
                    b - u * l < f ? (H = a.x + H * (1 - u) - f) : h > m && ((H = m - a.x + H * u), (n = -1)),
                    (H = Math.min(F, H)),
                    H < F && "center" === d.labelAlign && (a.x += n * (F - H - u * (F - Math.min(l, H)))),
                    l > H || (d.autoRotation && (y.styles || {}).width))
                )
                    x = H;
                x && (this.shortenLabel ? this.shortenLabel() : ((k.width = Math.floor(x) + "px"), (g.style || {}).textOverflow || (k.textOverflow = "ellipsis"), y.css(k)));
            };
            g.prototype.moveLabel = function (d, e) {
                var g = this,
                    b = g.label,
                    h = g.axis,
                    m = h.reversed,
                    f = !1;
                b && b.textStr === d
                    ? ((g.movedLabel = b), (f = !0), delete g.label)
                    : a(h.ticks, function (c) {
                          f || c.isNew || c === g || !c.label || c.label.textStr !== d || ((g.movedLabel = c.label), (f = !0), (c.labelPos = g.movedLabel.xy), delete c.label);
                      });
                if (!f && (g.labelPos || b)) {
                    var y = g.labelPos || b.xy;
                    b = h.horiz ? (m ? 0 : h.width + h.left) : y.x;
                    h = h.horiz ? y.y : m ? h.width + h.left : 0;
                    g.movedLabel = g.createLabel({ x: b, y: h }, d, e);
                    g.movedLabel && g.movedLabel.attr({ opacity: 0 });
                }
            };
            g.prototype.render = function (a, d, g) {
                var b = this.axis,
                    h = b.horiz,
                    m = this.pos,
                    f = e(this.tickmarkOffset, b.tickmarkOffset);
                m = this.getPosition(h, m, f, d);
                f = m.x;
                var y = m.y;
                b = (h && f === b.pos + b.len) || (!h && y === b.pos) ? -1 : 1;
                h = e(g, this.label && this.label.newOpacity, 1);
                g = e(g, 1);
                this.isActive = !0;
                this.renderGridLine(d, g, b);
                this.renderMark(m, g, b);
                this.renderLabel(m, d, h, a);
                this.isNew = !1;
                n(this, "afterRender");
            };
            g.prototype.renderGridLine = function (a, d, g) {
                var b = this.axis,
                    h = b.options,
                    m = {},
                    f = this.pos,
                    y = this.type,
                    c = e(this.tickmarkOffset, b.tickmarkOffset),
                    u = b.chart.renderer,
                    l = this.gridLine,
                    F = h.gridLineWidth,
                    r = h.gridLineColor,
                    k = h.gridLineDashStyle;
                "minor" === this.type && ((F = h.minorGridLineWidth), (r = h.minorGridLineColor), (k = h.minorGridLineDashStyle));
                l ||
                    (b.chart.styledMode || ((m.stroke = r), (m["stroke-width"] = F || 0), (m.dashstyle = k)),
                    y || (m.zIndex = 1),
                    a && (d = 0),
                    (this.gridLine = l = u
                        .path()
                        .attr(m)
                        .addClass("highcharts-" + (y ? y + "-" : "") + "grid-line")
                        .add(b.gridGroup)));
                if (l && (g = b.getPlotLinePath({ value: f + c, lineWidth: l.strokeWidth() * g, force: "pass", old: a }))) l[a || this.isNew ? "attr" : "animate"]({ d: g, opacity: d });
            };
            g.prototype.renderMark = function (a, d, g) {
                var b = this.axis,
                    h = b.options,
                    m = b.chart.renderer,
                    f = this.type,
                    y = b.tickSize(f ? f + "Tick" : "tick"),
                    c = a.x;
                a = a.y;
                var u = e(h["minor" !== f ? "tickWidth" : "minorTickWidth"], !f && b.isXAxis ? 1 : 0);
                h = h["minor" !== f ? "tickColor" : "minorTickColor"];
                var l = this.mark,
                    F = !l;
                y &&
                    (b.opposite && (y[0] = -y[0]),
                    l ||
                        ((this.mark = l = m
                            .path()
                            .addClass("highcharts-" + (f ? f + "-" : "") + "tick")
                            .add(b.axisGroup)),
                        b.chart.styledMode || l.attr({ stroke: h, "stroke-width": u })),
                    l[F ? "attr" : "animate"]({ d: this.getMarkPath(c, a, y[0], l.strokeWidth() * g, b.horiz, m), opacity: d }));
            };
            g.prototype.renderLabel = function (a, d, b, g) {
                var q = this.axis,
                    m = q.horiz,
                    f = q.options,
                    y = this.label,
                    c = f.labels,
                    u = c.step;
                q = e(this.tickmarkOffset, q.tickmarkOffset);
                var l = a.x;
                a = a.y;
                var F = !0;
                y &&
                    h(l) &&
                    ((y.xy = a = this.getLabelPosition(l, a, y, m, c, q, g, u)),
                    (this.isFirst && !this.isLast && !f.showFirstLabel) || (this.isLast && !this.isFirst && !f.showLastLabel) ? (F = !1) : !m || c.step || c.rotation || d || 0 === b || this.handleOverflow(a),
                    u && g % u && (F = !1),
                    F && h(a.y) ? ((a.opacity = b), y[this.isNewLabel ? "attr" : "animate"](a), (this.isNewLabel = !1)) : (y.attr("y", -9999), (this.isNewLabel = !0)));
            };
            g.prototype.replaceMovedLabel = function () {
                var a = this.label,
                    d = this.axis,
                    e = d.reversed;
                if (a && !this.isNew) {
                    var b = d.horiz ? (e ? d.left : d.width + d.left) : a.xy.x;
                    e = d.horiz ? a.xy.y : e ? d.width + d.top : d.top;
                    a.animate({ x: b, y: e, opacity: 0 }, void 0, a.destroy);
                    delete this.label;
                }
                d.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel;
            };
            return g;
        })();
        ("");
        return p;
    });
    G(
        b,
        "Core/Axis/Axis.js",
        [b["Core/Animation/AnimationUtilities.js"], b["Core/Axis/AxisDefaults.js"], b["Core/Color/Color.js"], b["Core/DefaultOptions.js"], b["Core/Foundation.js"], b["Core/Globals.js"], b["Core/Axis/Tick.js"], b["Core/Utilities.js"]],
        function (b, p, A, E, w, D, B, k) {
            var t = b.animObject,
                n = E.defaultOptions,
                h = w.registerEventOptions,
                d = D.deg2rad,
                a = k.arrayMax,
                e = k.arrayMin,
                g = k.clamp,
                x = k.correctFloat,
                C = k.defined,
                r = k.destroyObjectProperties,
                q = k.erase,
                z = k.error,
                m = k.extend,
                f = k.fireEvent,
                y = k.getMagnitude,
                c = k.isArray,
                u = k.isNumber,
                l = k.isString,
                F = k.merge,
                K = k.normalizeTickInterval,
                H = k.objectEach,
                I = k.pick,
                v = k.relativeLength,
                Q = k.removeEvent,
                O = k.splat,
                R = k.syncTimeout;
            b = (function () {
                function b(c, a) {
                    this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                    this.init(c, a);
                }
                b.prototype.init = function (c, a) {
                    var d = a.isX;
                    this.chart = c;
                    this.horiz = c.inverted && !this.isZAxis ? !d : d;
                    this.isXAxis = d;
                    this.coll = this.coll || (d ? "xAxis" : "yAxis");
                    f(this, "init", { userOptions: a });
                    this.opposite = I(a.opposite, this.opposite);
                    this.side = I(a.side, this.side, this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3);
                    this.setOptions(a);
                    var l = this.options,
                        b = l.labels,
                        e = l.type;
                    this.userOptions = a;
                    this.minPixelPadding = 0;
                    this.reversed = I(l.reversed, this.reversed);
                    this.visible = l.visible;
                    this.zoomEnabled = l.zoomEnabled;
                    this.hasNames = "category" === e || !0 === l.categories;
                    this.categories = l.categories || this.hasNames;
                    this.names || ((this.names = []), (this.names.keys = {}));
                    this.plotLinesAndBandsGroups = {};
                    this.positiveValuesOnly = !!this.logarithmic;
                    this.isLinked = C(l.linkedTo);
                    this.ticks = {};
                    this.labelEdge = [];
                    this.minorTicks = {};
                    this.plotLinesAndBands = [];
                    this.alternateBands = {};
                    this.len = 0;
                    this.minRange = this.userMinRange = l.minRange || l.maxZoom;
                    this.range = l.range;
                    this.offset = l.offset || 0;
                    this.min = this.max = null;
                    a = I(l.crosshair, O(c.options.tooltip.crosshairs)[d ? 0 : 1]);
                    this.crosshair = !0 === a ? {} : a;
                    -1 === c.axes.indexOf(this) && (d ? c.axes.splice(c.xAxis.length, 0, this) : c.axes.push(this), c[this.coll].push(this));
                    this.series = this.series || [];
                    c.inverted && !this.isZAxis && d && "undefined" === typeof this.reversed && (this.reversed = !0);
                    this.labelRotation = u(b.rotation) ? b.rotation : void 0;
                    h(this, l);
                    f(this, "afterInit");
                };
                b.prototype.setOptions = function (c) {
                    this.options = F(
                        p.defaultXAxisOptions,
                        "yAxis" === this.coll && p.defaultYAxisOptions,
                        [p.defaultTopAxisOptions, p.defaultRightAxisOptions, p.defaultBottomAxisOptions, p.defaultLeftAxisOptions][this.side],
                        F(n[this.coll], c)
                    );
                    f(this, "afterSetOptions", { userOptions: c });
                };
                b.prototype.defaultLabelFormatter = function (c) {
                    var a = this.axis;
                    c = this.chart.numberFormatter;
                    var d = u(this.value) ? this.value : NaN,
                        f = a.chart.time,
                        l = this.dateTimeLabelFormat,
                        b = n.lang,
                        e = b.numericSymbols;
                    b = b.numericSymbolMagnitude || 1e3;
                    var g = a.logarithmic ? Math.abs(d) : a.tickInterval,
                        m = e && e.length;
                    if (a.categories) var h = "" + this.value;
                    else if (l) h = f.dateFormat(l, d);
                    else if (m && 1e3 <= g) for (; m-- && "undefined" === typeof h; ) (a = Math.pow(b, m + 1)), g >= a && 0 === (10 * d) % a && null !== e[m] && 0 !== d && (h = c(d / a, -1) + e[m]);
                    "undefined" === typeof h && (h = 1e4 <= Math.abs(d) ? c(d, -1) : c(d, -1, void 0, ""));
                    return h;
                };
                b.prototype.getSeriesExtremes = function () {
                    var c = this,
                        a = c.chart,
                        d;
                    f(this, "getSeriesExtremes", null, function () {
                        c.hasVisibleSeries = !1;
                        c.dataMin = c.dataMax = c.threshold = null;
                        c.softThreshold = !c.isXAxis;
                        c.stacking && c.stacking.buildStacks();
                        c.series.forEach(function (f) {
                            if (f.visible || !a.options.chart.ignoreHiddenSeries) {
                                var l = f.options,
                                    b = l.threshold;
                                c.hasVisibleSeries = !0;
                                c.positiveValuesOnly && 0 >= b && (b = null);
                                if (c.isXAxis) {
                                    if (((l = f.xData), l.length)) {
                                        l = c.logarithmic ? l.filter(c.validatePositiveValue) : l;
                                        d = f.getXExtremes(l);
                                        var e = d.min;
                                        var g = d.max;
                                        u(e) || e instanceof Date || ((l = l.filter(u)), (d = f.getXExtremes(l)), (e = d.min), (g = d.max));
                                        l.length && ((c.dataMin = Math.min(I(c.dataMin, e), e)), (c.dataMax = Math.max(I(c.dataMax, g), g)));
                                    }
                                } else if (
                                    ((f = f.applyExtremes()),
                                    u(f.dataMin) && ((e = f.dataMin), (c.dataMin = Math.min(I(c.dataMin, e), e))),
                                    u(f.dataMax) && ((g = f.dataMax), (c.dataMax = Math.max(I(c.dataMax, g), g))),
                                    C(b) && (c.threshold = b),
                                    !l.softThreshold || c.positiveValuesOnly)
                                )
                                    c.softThreshold = !1;
                            }
                        });
                    });
                    f(this, "afterGetSeriesExtremes");
                };
                b.prototype.translate = function (c, a, d, f, l, b) {
                    var e = this.linkedParent || this,
                        g = f && e.old ? e.old.min : e.min,
                        m = e.minPixelPadding;
                    l = (e.isOrdinal || (e.brokenAxis && e.brokenAxis.hasBreaks) || (e.logarithmic && l)) && e.lin2val;
                    var h = 1,
                        y = 0;
                    f = f && e.old ? e.old.transA : e.transA;
                    f || (f = e.transA);
                    d && ((h *= -1), (y = e.len));
                    e.reversed && ((h *= -1), (y -= h * (e.sector || e.len)));
                    a ? ((c = (c * h + y - m) / f + g), l && (c = e.lin2val(c))) : (l && (c = e.val2lin(c)), (c = u(g) ? h * (c - g) * f + y + h * m + (u(b) ? f * b : 0) : void 0));
                    return c;
                };
                b.prototype.toPixels = function (c, a) {
                    return this.translate(c, !1, !this.horiz, null, !0) + (a ? 0 : this.pos);
                };
                b.prototype.toValue = function (c, a) {
                    return this.translate(c - (a ? 0 : this.pos), !0, !this.horiz, null, !0);
                };
                b.prototype.getPlotLinePath = function (c) {
                    function a(c, a, d) {
                        if (("pass" !== n && c < a) || c > d) n ? (c = g(c, a, d)) : (C = !0);
                        return c;
                    }
                    var d = this,
                        l = d.chart,
                        e = d.left,
                        b = d.top,
                        m = c.old,
                        h = c.value,
                        y = c.lineWidth,
                        q = (m && l.oldChartHeight) || l.chartHeight,
                        F = (m && l.oldChartWidth) || l.chartWidth,
                        k = d.transB,
                        r = c.translatedValue,
                        n = c.force,
                        H,
                        z,
                        x,
                        K,
                        C;
                    c = { value: h, lineWidth: y, old: m, force: n, acrossPanes: c.acrossPanes, translatedValue: r };
                    f(this, "getPlotLinePath", c, function (c) {
                        r = I(r, d.translate(h, null, null, m));
                        r = g(r, -1e5, 1e5);
                        H = x = Math.round(r + k);
                        z = K = Math.round(q - r - k);
                        u(r) ? (d.horiz ? ((z = b), (K = q - d.bottom), (H = x = a(H, e, e + d.width))) : ((H = e), (x = F - d.right), (z = K = a(z, b, b + d.height)))) : ((C = !0), (n = !1));
                        c.path =
                            C && !n
                                ? null
                                : l.renderer.crispLine(
                                      [
                                          ["M", H, z],
                                          ["L", x, K],
                                      ],
                                      y || 1
                                  );
                    });
                    return c.path;
                };
                b.prototype.getLinearTickPositions = function (c, a, d) {
                    var f = x(Math.floor(a / c) * c);
                    d = x(Math.ceil(d / c) * c);
                    var l = [],
                        e;
                    x(f + c) === f && (e = 20);
                    if (this.single) return [a];
                    for (a = f; a <= d; ) {
                        l.push(a);
                        a = x(a + c, e);
                        if (a === b) break;
                        var b = a;
                    }
                    return l;
                };
                b.prototype.getMinorTickInterval = function () {
                    var c = this.options;
                    return !0 === c.minorTicks ? I(c.minorTickInterval, "auto") : !1 === c.minorTicks ? null : c.minorTickInterval;
                };
                b.prototype.getMinorTickPositions = function () {
                    var c = this.options,
                        a = this.tickPositions,
                        d = this.minorTickInterval,
                        f = this.pointRangePadding || 0,
                        l = this.min - f;
                    f = this.max + f;
                    var e = f - l,
                        b = [];
                    if (e && e / d < this.len / 3) {
                        var g = this.logarithmic;
                        if (g)
                            this.paddedTicks.forEach(function (c, a, f) {
                                a && b.push.apply(b, g.getLogTickPositions(d, f[a - 1], f[a], !0));
                            });
                        else if (this.dateTime && "auto" === this.getMinorTickInterval()) b = b.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(d), l, f, c.startOfWeek));
                        else for (c = l + ((a[0] - l) % d); c <= f && c !== b[0]; c += d) b.push(c);
                    }
                    0 !== b.length && this.trimTicks(b);
                    return b;
                };
                b.prototype.adjustForMinRange = function () {
                    var c = this.options,
                        d = this.logarithmic,
                        f = this.min,
                        l = this.max,
                        b = 0,
                        g,
                        m,
                        h,
                        u;
                    this.isXAxis &&
                        "undefined" === typeof this.minRange &&
                        !d &&
                        (C(c.min) || C(c.max) || C(c.floor) || C(c.ceiling)
                            ? (this.minRange = null)
                            : (this.series.forEach(function (c) {
                                  h = c.xData;
                                  u = c.xIncrement ? 1 : h.length - 1;
                                  if (1 < h.length) for (g = u; 0 < g; g--) if (((m = h[g] - h[g - 1]), !b || m < b)) b = m;
                              }),
                              (this.minRange = Math.min(5 * b, this.dataMax - this.dataMin))));
                    if (l - f < this.minRange) {
                        var y = this.dataMax - this.dataMin >= this.minRange;
                        var q = this.minRange;
                        var F = (q - l + f) / 2;
                        F = [f - F, I(c.min, f - F)];
                        y && (F[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                        f = a(F);
                        l = [f + q, I(c.max, f + q)];
                        y && (l[2] = d ? d.log2lin(this.dataMax) : this.dataMax);
                        l = e(l);
                        l - f < q && ((F[0] = l - q), (F[1] = I(c.min, l - q)), (f = a(F)));
                    }
                    this.min = f;
                    this.max = l;
                };
                b.prototype.getClosest = function () {
                    var c;
                    this.categories
                        ? (c = 1)
                        : this.series.forEach(function (a) {
                              var d = a.closestPointRange,
                                  f = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                              !a.noSharedTooltip && C(d) && f && (c = C(c) ? Math.min(c, d) : d);
                          });
                    return c;
                };
                b.prototype.nameToX = function (a) {
                    var d = c(this.categories),
                        f = d ? this.categories : this.names,
                        l = a.options.x;
                    a.series.requireSorting = !1;
                    C(l) || (l = this.options.uniqueNames ? (d ? f.indexOf(a.name) : I(f.keys[a.name], -1)) : a.series.autoIncrement());
                    if (-1 === l) {
                        if (!d) var e = f.length;
                    } else e = l;
                    "undefined" !== typeof e && ((this.names[e] = a.name), (this.names.keys[a.name] = e));
                    return e;
                };
                b.prototype.updateNames = function () {
                    var c = this,
                        a = this.names;
                    0 < a.length &&
                        (Object.keys(a.keys).forEach(function (c) {
                            delete a.keys[c];
                        }),
                        (a.length = 0),
                        (this.minRange = this.userMinRange),
                        (this.series || []).forEach(function (a) {
                            a.xIncrement = null;
                            if (!a.points || a.isDirtyData) (c.max = Math.max(c.max, a.xData.length - 1)), a.processData(), a.generatePoints();
                            a.data.forEach(function (d, f) {
                                if (d && d.options && "undefined" !== typeof d.name) {
                                    var l = c.nameToX(d);
                                    "undefined" !== typeof l && l !== d.x && ((d.x = l), (a.xData[f] = l));
                                }
                            });
                        }));
                };
                b.prototype.setAxisTranslation = function () {
                    var c = this,
                        a = c.max - c.min,
                        d = c.linkedParent,
                        e = !!c.categories,
                        b = c.isXAxis,
                        g = c.axisPointRange || 0,
                        m = 0,
                        h = 0,
                        u = c.transA;
                    if (b || e || g) {
                        var y = c.getClosest();
                        d
                            ? ((m = d.minPointOffset), (h = d.pointRangePadding))
                            : c.series.forEach(function (a) {
                                  var d = e ? 1 : b ? I(a.options.pointRange, y, 0) : c.axisPointRange || 0,
                                      f = a.options.pointPlacement;
                                  g = Math.max(g, d);
                                  if (!c.single || e) (a = a.is("xrange") ? !b : b), (m = Math.max(m, a && l(f) ? 0 : d / 2)), (h = Math.max(h, a && "on" === f ? 0 : d));
                              });
                        d = c.ordinal && c.ordinal.slope && y ? c.ordinal.slope / y : 1;
                        c.minPointOffset = m *= d;
                        c.pointRangePadding = h *= d;
                        c.pointRange = Math.min(g, c.single && e ? 1 : a);
                        b && (c.closestPointRange = y);
                    }
                    c.translationSlope = c.transA = u = c.staticScale || c.len / (a + h || 1);
                    c.transB = c.horiz ? c.left : c.bottom;
                    c.minPixelPadding = u * m;
                    f(this, "afterSetAxisTranslation");
                };
                b.prototype.minFromRange = function () {
                    return this.max - this.range;
                };
                b.prototype.setTickInterval = function (c) {
                    var a = this.chart,
                        d = this.logarithmic,
                        l = this.options,
                        e = this.isXAxis,
                        b = this.isLinked,
                        g = l.tickPixelInterval,
                        m = this.categories,
                        h = this.softThreshold,
                        q = l.maxPadding,
                        F = l.minPadding,
                        r = u(l.tickInterval) && 0 <= l.tickInterval ? l.tickInterval : void 0,
                        k = u(this.threshold) ? this.threshold : null;
                    this.dateTime || m || b || this.getTickAmount();
                    var n = I(this.userMin, l.min);
                    var H = I(this.userMax, l.max);
                    if (b) {
                        this.linkedParent = a[this.coll][l.linkedTo];
                        var t = this.linkedParent.getExtremes();
                        this.min = I(t.min, t.dataMin);
                        this.max = I(t.max, t.dataMax);
                        l.type !== this.linkedParent.options.type && z(11, 1, a);
                    } else {
                        if (h && C(k))
                            if (this.dataMin >= k) (t = k), (F = 0);
                            else if (this.dataMax <= k) {
                                var v = k;
                                q = 0;
                            }
                        this.min = I(n, t, this.dataMin);
                        this.max = I(H, v, this.dataMax);
                    }
                    d && (this.positiveValuesOnly && !c && 0 >= Math.min(this.min, I(this.dataMin, this.min)) && z(10, 1, a), (this.min = x(d.log2lin(this.min), 16)), (this.max = x(d.log2lin(this.max), 16)));
                    this.range && C(this.max) && ((this.userMin = this.min = n = Math.max(this.dataMin, this.minFromRange())), (this.userMax = H = this.max), (this.range = null));
                    f(this, "foundExtremes");
                    this.beforePadding && this.beforePadding();
                    this.adjustForMinRange();
                    !(m || this.axisPointRange || (this.stacking && this.stacking.usePercentage) || b) && C(this.min) && C(this.max) && (a = this.max - this.min) && (!C(n) && F && (this.min -= a * F), !C(H) && q && (this.max += a * q));
                    u(this.userMin) || (u(l.softMin) && l.softMin < this.min && (this.min = n = l.softMin), u(l.floor) && (this.min = Math.max(this.min, l.floor)));
                    u(this.userMax) || (u(l.softMax) && l.softMax > this.max && (this.max = H = l.softMax), u(l.ceiling) && (this.max = Math.min(this.max, l.ceiling)));
                    h &&
                        C(this.dataMin) &&
                        ((k = k || 0),
                        !C(n) && this.min < k && this.dataMin >= k
                            ? (this.min = this.options.minRange ? Math.min(k, this.max - this.minRange) : k)
                            : !C(H) && this.max > k && this.dataMax <= k && (this.max = this.options.minRange ? Math.max(k, this.min + this.minRange) : k));
                    u(this.min) && u(this.max) && !this.chart.polar && this.min > this.max && (C(this.options.min) ? (this.max = this.min) : C(this.options.max) && (this.min = this.max));
                    this.tickInterval =
                        this.min === this.max || "undefined" === typeof this.min || "undefined" === typeof this.max
                            ? 1
                            : b && this.linkedParent && !r && g === this.linkedParent.options.tickPixelInterval
                            ? (r = this.linkedParent.tickInterval)
                            : I(r, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, m ? 1 : ((this.max - this.min) * g) / Math.max(this.len, g));
                    if (e && !c) {
                        var p = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
                        this.series.forEach(function (c) {
                            c.forceCrop = c.forceCropping && c.forceCropping();
                            c.processData(p);
                        });
                        f(this, "postProcessData", { hasExtemesChanged: p });
                    }
                    this.setAxisTranslation();
                    f(this, "initialAxisTranslation");
                    this.pointRange && !r && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
                    c = I(
                        l.minTickInterval,
                        this.dateTime &&
                            !this.series.some(function (c) {
                                return c.noSharedTooltip;
                            })
                            ? this.closestPointRange
                            : 0
                    );
                    !r && this.tickInterval < c && (this.tickInterval = c);
                    this.dateTime || this.logarithmic || r || (this.tickInterval = K(this.tickInterval, void 0, y(this.tickInterval), I(l.allowDecimals, 0.5 > this.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                    this.tickAmount || (this.tickInterval = this.unsquish());
                    this.setTickPositions();
                };
                b.prototype.setTickPositions = function () {
                    var c = this.options,
                        a = c.tickPositions,
                        d = this.getMinorTickInterval(),
                        l = this.hasVerticalPanning(),
                        e = "colorAxis" === this.coll,
                        b = (e || !l) && c.startOnTick;
                    l = (e || !l) && c.endOnTick;
                    e = c.tickPositioner;
                    this.tickmarkOffset = this.categories && "between" === c.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0;
                    this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
                    this.single = this.min === this.max && C(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== c.allowDecimals);
                    this.tickPositions = d = a && a.slice();
                    !d &&
                        ((this.ordinal && this.ordinal.positions) || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200))
                            ? (d = this.dateTime
                                  ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, c.units), this.min, this.max, c.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0)
                                  : this.logarithmic
                                  ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max)
                                  : this.getLinearTickPositions(this.tickInterval, this.min, this.max))
                            : ((d = [this.min, this.max]), z(19, !1, this.chart)),
                        d.length > this.len && ((d = [d[0], d.pop()]), d[0] === d[1] && (d.length = 1)),
                        (this.tickPositions = d),
                        e && (e = e.apply(this, [this.min, this.max]))) &&
                        (this.tickPositions = d = e);
                    this.paddedTicks = d.slice(0);
                    this.trimTicks(d, b, l);
                    this.isLinked ||
                        (this.single &&
                            2 > d.length &&
                            !this.categories &&
                            !this.series.some(function (c) {
                                return c.is("heatmap") && "between" === c.options.pointPlacement;
                            }) &&
                            ((this.min -= 0.5), (this.max += 0.5)),
                        a || e || this.adjustTickAmount());
                    f(this, "afterSetTickPositions");
                };
                b.prototype.trimTicks = function (c, a, d) {
                    var l = c[0],
                        e = c[c.length - 1],
                        b = (!this.isOrdinal && this.minPointOffset) || 0;
                    f(this, "trimTicks");
                    if (!this.isLinked) {
                        if (a && -Infinity !== l) this.min = l;
                        else for (; this.min - b > c[0]; ) c.shift();
                        if (d) this.max = e;
                        else for (; this.max + b < c[c.length - 1]; ) c.pop();
                        0 === c.length && C(l) && !this.options.tickPositions && c.push((e + l) / 2);
                    }
                };
                b.prototype.alignToOthers = function () {
                    var c = {},
                        a = this.options,
                        d;
                    !1 !== this.chart.options.chart.alignTicks &&
                        a.alignTicks &&
                        !1 !== a.startOnTick &&
                        !1 !== a.endOnTick &&
                        !this.logarithmic &&
                        this.chart[this.coll].forEach(function (a) {
                            var f = a.options;
                            f = [a.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
                            a.series.length && (c[f] ? (d = !0) : (c[f] = 1));
                        });
                    return d;
                };
                b.prototype.getTickAmount = function () {
                    var c = this.options,
                        a = c.tickPixelInterval,
                        d = c.tickAmount;
                    !C(c.tickInterval) && !d && this.len < a && !this.isRadial && !this.logarithmic && c.startOnTick && c.endOnTick && (d = 2);
                    !d && this.alignToOthers() && (d = Math.ceil(this.len / a) + 1);
                    4 > d && ((this.finalTickAmt = d), (d = 5));
                    this.tickAmount = d;
                };
                b.prototype.adjustTickAmount = function () {
                    var c = this.options,
                        a = this.tickInterval,
                        d = this.tickPositions,
                        f = this.tickAmount,
                        l = this.finalTickAmt,
                        e = d && d.length,
                        b = I(this.threshold, this.softThreshold ? 0 : null);
                    if (this.hasData() && u(this.min) && u(this.max)) {
                        if (e < f) {
                            for (; d.length < f; ) d.length % 2 || this.min === b ? d.push(x(d[d.length - 1] + a)) : d.unshift(x(d[0] - a));
                            this.transA *= (e - 1) / (f - 1);
                            this.min = c.startOnTick ? d[0] : Math.min(this.min, d[0]);
                            this.max = c.endOnTick ? d[d.length - 1] : Math.max(this.max, d[d.length - 1]);
                        } else e > f && ((this.tickInterval *= 2), this.setTickPositions());
                        if (C(l)) {
                            for (a = c = d.length; a--; ) ((3 === l && 1 === a % 2) || (2 >= l && 0 < a && a < c - 1)) && d.splice(a, 1);
                            this.finalTickAmt = void 0;
                        }
                    }
                };
                b.prototype.setScale = function () {
                    var c = !1,
                        a = !1;
                    this.series.forEach(function (d) {
                        c = c || d.isDirtyData || d.isDirty;
                        a = a || (d.xAxis && d.xAxis.isDirty) || !1;
                    });
                    this.setAxisSize();
                    var d = this.len !== (this.old && this.old.len);
                    d || c || a || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers()
                        ? (this.stacking && this.stacking.resetStacks(),
                          (this.forceRedraw = !1),
                          this.getSeriesExtremes(),
                          this.setTickInterval(),
                          this.isDirty || (this.isDirty = d || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max)))
                        : this.stacking && this.stacking.cleanStacks();
                    c && this.panningState && (this.panningState.isDirty = !0);
                    f(this, "afterSetScale");
                };
                b.prototype.setExtremes = function (c, a, d, l, e) {
                    var b = this,
                        g = b.chart;
                    d = I(d, !0);
                    b.series.forEach(function (c) {
                        delete c.kdTree;
                    });
                    e = m(e, { min: c, max: a });
                    f(b, "setExtremes", e, function () {
                        b.userMin = c;
                        b.userMax = a;
                        b.eventArgs = e;
                        d && g.redraw(l);
                    });
                };
                b.prototype.zoom = function (c, a) {
                    var d = this,
                        l = this.dataMin,
                        e = this.dataMax,
                        b = this.options,
                        g = Math.min(l, I(b.min, l)),
                        m = Math.max(e, I(b.max, e));
                    c = { newMin: c, newMax: a };
                    f(this, "zoom", c, function (c) {
                        var a = c.newMin,
                            f = c.newMax;
                        if (a !== d.min || f !== d.max)
                            d.allowZoomOutside || (C(l) && (a < g && (a = g), a > m && (a = m)), C(e) && (f < g && (f = g), f > m && (f = m))),
                                (d.displayBtn = "undefined" !== typeof a || "undefined" !== typeof f),
                                d.setExtremes(a, f, !1, void 0, { trigger: "zoom" });
                        c.zoomed = !0;
                    });
                    return c.zoomed;
                };
                b.prototype.setAxisSize = function () {
                    var c = this.chart,
                        a = this.options,
                        d = a.offsets || [0, 0, 0, 0],
                        f = this.horiz,
                        l = (this.width = Math.round(v(I(a.width, c.plotWidth - d[3] + d[1]), c.plotWidth))),
                        e = (this.height = Math.round(v(I(a.height, c.plotHeight - d[0] + d[2]), c.plotHeight))),
                        b = (this.top = Math.round(v(I(a.top, c.plotTop + d[0]), c.plotHeight, c.plotTop)));
                    a = this.left = Math.round(v(I(a.left, c.plotLeft + d[3]), c.plotWidth, c.plotLeft));
                    this.bottom = c.chartHeight - e - b;
                    this.right = c.chartWidth - l - a;
                    this.len = Math.max(f ? l : e, 0);
                    this.pos = f ? a : b;
                };
                b.prototype.getExtremes = function () {
                    var c = this.logarithmic;
                    return { min: c ? x(c.lin2log(this.min)) : this.min, max: c ? x(c.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
                };
                b.prototype.getThreshold = function (c) {
                    var a = this.logarithmic,
                        d = a ? a.lin2log(this.min) : this.min;
                    a = a ? a.lin2log(this.max) : this.max;
                    null === c || -Infinity === c ? (c = d) : Infinity === c ? (c = a) : d > c ? (c = d) : a < c && (c = a);
                    return this.translate(c, 0, 1, 0, 1);
                };
                b.prototype.autoLabelAlign = function (c) {
                    var a = (I(c, 0) - 90 * this.side + 720) % 360;
                    c = { align: "center" };
                    f(this, "autoLabelAlign", c, function (c) {
                        15 < a && 165 > a ? (c.align = "right") : 195 < a && 345 > a && (c.align = "left");
                    });
                    return c.align;
                };
                b.prototype.tickSize = function (c) {
                    var a = this.options,
                        d = I(a["tick" === c ? "tickWidth" : "minorTickWidth"], "tick" === c && this.isXAxis && !this.categories ? 1 : 0),
                        l = a["tick" === c ? "tickLength" : "minorTickLength"];
                    if (d && l) {
                        "inside" === a[c + "Position"] && (l = -l);
                        var e = [l, d];
                    }
                    c = { tickSize: e };
                    f(this, "afterTickSize", c);
                    return c.tickSize;
                };
                b.prototype.labelMetrics = function () {
                    var c = (this.tickPositions && this.tickPositions[0]) || 0;
                    return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[c] && this.ticks[c].label);
                };
                b.prototype.unsquish = function () {
                    var c = this.options.labels,
                        a = this.horiz,
                        f = this.tickInterval,
                        l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f),
                        e = c.rotation,
                        b = this.labelMetrics(),
                        g = Math.max(this.max - this.min, 0),
                        m = function (c) {
                            var a = c / (l || 1);
                            a = 1 < a ? Math.ceil(a) : 1;
                            a * f > g && Infinity !== c && Infinity !== l && g && (a = Math.ceil(g / f));
                            return x(a * f);
                        },
                        h = f,
                        y,
                        q,
                        F = Number.MAX_VALUE;
                    if (a) {
                        if (!c.staggerLines && !c.step)
                            if (u(e)) var k = [e];
                            else l < c.autoRotationLimit && (k = c.autoRotation);
                        k &&
                            k.forEach(function (c) {
                                if (c === e || (c && -90 <= c && 90 >= c)) {
                                    q = m(Math.abs(b.h / Math.sin(d * c)));
                                    var a = q + Math.abs(c / 360);
                                    a < F && ((F = a), (y = c), (h = q));
                                }
                            });
                    } else c.step || (h = m(b.h));
                    this.autoRotation = k;
                    this.labelRotation = I(y, u(e) ? e : 0);
                    return h;
                };
                b.prototype.getSlotWidth = function (c) {
                    var a = this.chart,
                        d = this.horiz,
                        f = this.options.labels,
                        l = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                        e = a.margin[3];
                    if (c && u(c.slotWidth)) return c.slotWidth;
                    if (d && 2 > f.step) return f.rotation ? 0 : ((this.staggerLines || 1) * this.len) / l;
                    if (!d) {
                        c = f.style.width;
                        if (void 0 !== c) return parseInt(String(c), 10);
                        if (e) return e - a.spacing[3];
                    }
                    return 0.33 * a.chartWidth;
                };
                b.prototype.renderUnsquish = function () {
                    var c = this.chart,
                        a = c.renderer,
                        d = this.tickPositions,
                        f = this.ticks,
                        e = this.options.labels,
                        b = e.style,
                        g = this.horiz,
                        m = this.getSlotWidth(),
                        h = Math.max(1, Math.round(m - 2 * e.padding)),
                        u = {},
                        y = this.labelMetrics(),
                        q = b.textOverflow,
                        F = 0;
                    l(e.rotation) || (u.rotation = e.rotation || 0);
                    d.forEach(function (c) {
                        c = f[c];
                        c.movedLabel && c.replaceMovedLabel();
                        c && c.label && c.label.textPxLength > F && (F = c.label.textPxLength);
                    });
                    this.maxLabelLength = F;
                    if (this.autoRotation) F > h && F > y.h ? (u.rotation = this.labelRotation) : (this.labelRotation = 0);
                    else if (m) {
                        var k = h;
                        if (!q) {
                            var r = "clip";
                            for (h = d.length; !g && h--; ) {
                                var n = d[h];
                                if ((n = f[n].label))
                                    n.styles && "ellipsis" === n.styles.textOverflow ? n.css({ textOverflow: "clip" }) : n.textPxLength > m && n.css({ width: m + "px" }),
                                        n.getBBox().height > this.len / d.length - (y.h - y.f) && (n.specificTextOverflow = "ellipsis");
                            }
                        }
                    }
                    u.rotation && ((k = F > 0.5 * c.chartHeight ? 0.33 * c.chartHeight : F), q || (r = "ellipsis"));
                    if ((this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation))) u.align = this.labelAlign;
                    d.forEach(function (c) {
                        var a = (c = f[c]) && c.label,
                            d = b.width,
                            l = {};
                        a &&
                            (a.attr(u),
                            c.shortenLabel
                                ? c.shortenLabel()
                                : k && !d && "nowrap" !== b.whiteSpace && (k < a.textPxLength || "SPAN" === a.element.tagName)
                                ? ((l.width = k + "px"), q || (l.textOverflow = a.specificTextOverflow || r), a.css(l))
                                : a.styles && a.styles.width && !l.width && !d && a.css({ width: null }),
                            delete a.specificTextOverflow,
                            (c.rotation = u.rotation));
                    }, this);
                    this.tickRotCorr = a.rotCorr(y.b, this.labelRotation || 0, 0 !== this.side);
                };
                b.prototype.hasData = function () {
                    return (
                        this.series.some(function (c) {
                            return c.hasData();
                        }) ||
                        (this.options.showEmpty && C(this.min) && C(this.max))
                    );
                };
                b.prototype.addTitle = function (c) {
                    var a = this.chart.renderer,
                        d = this.horiz,
                        f = this.opposite,
                        l = this.options.title,
                        e = this.chart.styledMode,
                        b;
                    this.axisTitle ||
                        ((b = l.textAlign) || (b = (d ? { low: "left", middle: "center", high: "right" } : { low: f ? "right" : "left", middle: "center", high: f ? "left" : "right" })[l.align]),
                        (this.axisTitle = a
                            .text(l.text || "", 0, 0, l.useHTML)
                            .attr({ zIndex: 7, rotation: l.rotation, align: b })
                            .addClass("highcharts-axis-title")),
                        e || this.axisTitle.css(F(l.style)),
                        this.axisTitle.add(this.axisGroup),
                        (this.axisTitle.isNew = !0));
                    e || l.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" });
                    this.axisTitle[c ? "show" : "hide"](c);
                };
                b.prototype.generateTick = function (c) {
                    var a = this.ticks;
                    a[c] ? a[c].addLabel() : (a[c] = new B(this, c));
                };
                b.prototype.getOffset = function () {
                    var c = this,
                        a = this,
                        d = a.chart,
                        l = a.horiz,
                        e = a.options,
                        b = a.side,
                        g = a.ticks,
                        m = a.tickPositions,
                        h = a.coll,
                        u = a.axisParent,
                        y = d.renderer,
                        q = d.inverted && !a.isZAxis ? [1, 0, 3, 2][b] : b,
                        F = a.hasData(),
                        k = e.title,
                        r = e.labels,
                        n = d.axisOffset;
                    d = d.clipOffset;
                    var z = [-1, 1, 1, -1][b],
                        x = e.className,
                        K,
                        t = 0,
                        v = 0,
                        p = 0;
                    a.showAxis = K = F || e.showEmpty;
                    a.staggerLines = (a.horiz && r.staggerLines) || void 0;
                    if (!a.axisGroup) {
                        var B = function (a, d, f) {
                            return y
                                .g(a)
                                .attr({ zIndex: f })
                                .addClass("highcharts-" + h.toLowerCase() + d + " " + (c.isRadial ? "highcharts-radial-axis" + d + " " : "") + (x || ""))
                                .add(u);
                        };
                        a.gridGroup = B("grid", "-grid", e.gridZIndex);
                        a.axisGroup = B("axis", "", e.zIndex);
                        a.labelGroup = B("axis-labels", "-labels", r.zIndex);
                    }
                    F || a.isLinked
                        ? (m.forEach(function (c) {
                              a.generateTick(c);
                          }),
                          a.renderUnsquish(),
                          (a.reserveSpaceDefault = 0 === b || 2 === b || { 1: "left", 3: "right" }[b] === a.labelAlign),
                          I(r.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) &&
                              m.forEach(function (c) {
                                  p = Math.max(g[c].getLabelSize(), p);
                              }),
                          a.staggerLines && (p *= a.staggerLines),
                          (a.labelOffset = p * (a.opposite ? -1 : 1)))
                        : H(g, function (c, a) {
                              c.destroy();
                              delete g[a];
                          });
                    if (k && k.text && !1 !== k.enabled && (a.addTitle(K), K && !1 !== k.reserveSpace)) {
                        a.titleOffset = t = a.axisTitle.getBBox()[l ? "height" : "width"];
                        var Z = k.offset;
                        v = C(Z) ? 0 : I(k.margin, l ? 5 : 10);
                    }
                    a.renderLine();
                    a.offset = z * I(e.offset, n[b] ? n[b] + (e.margin || 0) : 0);
                    a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
                    k = 0 === b ? -a.labelMetrics().h : 2 === b ? a.tickRotCorr.y : 0;
                    F = Math.abs(p) + v;
                    p && (F = F - k + z * (l ? I(r.y, a.tickRotCorr.y + 8 * z) : r.x));
                    a.axisTitleMargin = I(Z, F);
                    a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(g, m));
                    "colorAxis" !== h &&
                        ((l = this.tickSize("tick")),
                        (n[b] = Math.max(n[b], (a.axisTitleMargin || 0) + t + z * a.offset, F, m && m.length && l ? l[0] + z * a.offset : 0)),
                        (e = !a.axisLine || e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2)),
                        (d[q] = Math.max(d[q], e)));
                    f(this, "afterGetOffset");
                };
                b.prototype.getLinePath = function (c) {
                    var a = this.chart,
                        d = this.opposite,
                        f = this.offset,
                        l = this.horiz,
                        e = this.left + (d ? this.width : 0) + f;
                    f = a.chartHeight - this.bottom - (d ? this.height : 0) + f;
                    d && (c *= -1);
                    return a.renderer.crispLine(
                        [
                            ["M", l ? this.left : e, l ? f : this.top],
                            ["L", l ? a.chartWidth - this.right : e, l ? f : a.chartHeight - this.bottom],
                        ],
                        c
                    );
                };
                b.prototype.renderLine = function () {
                    this.axisLine ||
                        ((this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup)),
                        this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
                };
                b.prototype.getTitlePosition = function () {
                    var c = this.horiz,
                        a = this.left,
                        d = this.top,
                        l = this.len,
                        e = this.options.title,
                        b = c ? a : d,
                        g = this.opposite,
                        m = this.offset,
                        h = e.x,
                        u = e.y,
                        y = this.axisTitle,
                        q = this.chart.renderer.fontMetrics(e.style.fontSize, y);
                    y = Math.max(y.getBBox(null, 0).height - q.h - 1, 0);
                    l = { low: b + (c ? 0 : l), middle: b + l / 2, high: b + (c ? l : 0) }[e.align];
                    a = (c ? d + this.height : a) + (c ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + [-y, y, q.f, -y][this.side];
                    c = { x: c ? l + h : a + (g ? this.width : 0) + m + h, y: c ? a + u - (g ? this.height : 0) + m : l + u };
                    f(this, "afterGetTitlePosition", { titlePosition: c });
                    return c;
                };
                b.prototype.renderMinorTick = function (c, a) {
                    var d = this.minorTicks;
                    d[c] || (d[c] = new B(this, c, "minor"));
                    a && d[c].isNew && d[c].render(null, !0);
                    d[c].render(null, !1, 1);
                };
                b.prototype.renderTick = function (c, a, d) {
                    var f = this.ticks;
                    if (!this.isLinked || (c >= this.min && c <= this.max) || (this.grid && this.grid.isColumn)) f[c] || (f[c] = new B(this, c)), d && f[c].isNew && f[c].render(a, !0, -1), f[c].render(a);
                };
                b.prototype.render = function () {
                    var c = this,
                        a = c.chart,
                        d = c.logarithmic,
                        l = c.options,
                        e = c.isLinked,
                        b = c.tickPositions,
                        g = c.axisTitle,
                        m = c.ticks,
                        h = c.minorTicks,
                        y = c.alternateBands,
                        q = l.stackLabels,
                        F = l.alternateGridColor,
                        k = c.tickmarkOffset,
                        r = c.axisLine,
                        n = c.showAxis,
                        z = t(a.renderer.globalAnimation),
                        x,
                        K;
                    c.labelEdge.length = 0;
                    c.overlap = !1;
                    [m, h, y].forEach(function (c) {
                        H(c, function (c) {
                            c.isActive = !1;
                        });
                    });
                    if (c.hasData() || e) {
                        var C = c.chart.hasRendered && c.old && u(c.old.min);
                        c.minorTickInterval &&
                            !c.categories &&
                            c.getMinorTickPositions().forEach(function (a) {
                                c.renderMinorTick(a, C);
                            });
                        b.length &&
                            (b.forEach(function (a, d) {
                                c.renderTick(a, d, C);
                            }),
                            k && (0 === c.min || c.single) && (m[-1] || (m[-1] = new B(c, -1, null, !0)), m[-1].render(-1)));
                        F &&
                            b.forEach(function (f, l) {
                                K = "undefined" !== typeof b[l + 1] ? b[l + 1] + k : c.max - k;
                                0 === l % 2 &&
                                    f < c.max &&
                                    K <= c.max + (a.polar ? -k : k) &&
                                    (y[f] || (y[f] = new D.PlotLineOrBand(c)),
                                    (x = f + k),
                                    (y[f].options = { from: d ? d.lin2log(x) : x, to: d ? d.lin2log(K) : K, color: F, className: "highcharts-alternate-grid" }),
                                    y[f].render(),
                                    (y[f].isActive = !0));
                            });
                        c._addedPlotLB ||
                            ((c._addedPlotLB = !0),
                            (l.plotLines || []).concat(l.plotBands || []).forEach(function (a) {
                                c.addPlotBandOrLine(a);
                            }));
                    }
                    [m, h, y].forEach(function (c) {
                        var d = [],
                            f = z.duration;
                        H(c, function (c, a) {
                            c.isActive || (c.render(a, !1, 0), (c.isActive = !1), d.push(a));
                        });
                        R(
                            function () {
                                for (var a = d.length; a--; ) c[d[a]] && !c[d[a]].isActive && (c[d[a]].destroy(), delete c[d[a]]);
                            },
                            c !== y && a.hasRendered && f ? f : 0
                        );
                    });
                    r && (r[r.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(r.strokeWidth()) }), (r.isPlaced = !0), r[n ? "show" : "hide"](n));
                    g && n && ((l = c.getTitlePosition()), u(l.y) ? (g[g.isNew ? "attr" : "animate"](l), (g.isNew = !1)) : (g.attr("y", -9999), (g.isNew = !0)));
                    q && q.enabled && c.stacking && c.stacking.renderStackTotals();
                    c.old = { len: c.len, max: c.max, min: c.min, transA: c.transA, userMax: c.userMax, userMin: c.userMin };
                    c.isDirty = !1;
                    f(this, "afterRender");
                };
                b.prototype.redraw = function () {
                    this.visible &&
                        (this.render(),
                        this.plotLinesAndBands.forEach(function (c) {
                            c.render();
                        }));
                    this.series.forEach(function (c) {
                        c.isDirty = !0;
                    });
                };
                b.prototype.getKeepProps = function () {
                    return this.keepProps || b.keepProps;
                };
                b.prototype.destroy = function (c) {
                    var a = this,
                        d = a.plotLinesAndBands,
                        l = this.eventOptions;
                    f(this, "destroy", { keepEvents: c });
                    c || Q(a);
                    [a.ticks, a.minorTicks, a.alternateBands].forEach(function (c) {
                        r(c);
                    });
                    if (d) for (c = d.length; c--; ) d[c].destroy();
                    "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (c) {
                        a[c] && (a[c] = a[c].destroy());
                    });
                    for (var e in a.plotLinesAndBandsGroups) a.plotLinesAndBandsGroups[e] = a.plotLinesAndBandsGroups[e].destroy();
                    H(a, function (c, d) {
                        -1 === a.getKeepProps().indexOf(d) && delete a[d];
                    });
                    this.eventOptions = l;
                };
                b.prototype.drawCrosshair = function (c, a) {
                    var d = this.crosshair,
                        l = I(d && d.snap, !0),
                        e = this.chart,
                        b,
                        g = this.cross;
                    f(this, "drawCrosshair", { e: c, point: a });
                    c || (c = this.cross && this.cross.e);
                    if (d && !1 !== (C(a) || !l)) {
                        l ? C(a) && (b = I("colorAxis" !== this.coll ? a.crosshairPos : null, this.isXAxis ? a.plotX : this.len - a.plotY)) : (b = c && (this.horiz ? c.chartX - this.pos : this.len - c.chartY + this.pos));
                        if (C(b)) {
                            var h = { value: a && (this.isXAxis ? a.x : I(a.stackY, a.y)), translatedValue: b };
                            e.polar && m(h, { isCrosshair: !0, chartX: c && c.chartX, chartY: c && c.chartY, point: a });
                            h = this.getPlotLinePath(h) || null;
                        }
                        if (!C(h)) {
                            this.hideCrosshair();
                            return;
                        }
                        l = this.categories && !this.isRadial;
                        g ||
                            ((this.cross = g = e.renderer
                                .path()
                                .addClass("highcharts-crosshair highcharts-crosshair-" + (l ? "category " : "thin ") + (d.className || ""))
                                .attr({ zIndex: I(d.zIndex, 2) })
                                .add()),
                            e.styledMode ||
                                (g.attr({ stroke: d.color || (l ? A.parse("#ccd6eb").setOpacity(0.25).get() : "#cccccc"), "stroke-width": I(d.width, 1) }).css({ "pointer-events": "none" }),
                                d.dashStyle && g.attr({ dashstyle: d.dashStyle })));
                        g.show().attr({ d: h });
                        l && !d.width && g.attr({ "stroke-width": this.transA });
                        this.cross.e = c;
                    } else this.hideCrosshair();
                    f(this, "afterDrawCrosshair", { e: c, point: a });
                };
                b.prototype.hideCrosshair = function () {
                    this.cross && this.cross.hide();
                    f(this, "afterHideCrosshair");
                };
                b.prototype.hasVerticalPanning = function () {
                    var c = this.chart.options.chart.panning;
                    return !!(c && c.enabled && /y/.test(c.type));
                };
                b.prototype.validatePositiveValue = function (c) {
                    return u(c) && 0 < c;
                };
                b.prototype.update = function (c, a) {
                    var d = this.chart;
                    c = F(this.userOptions, c);
                    this.destroy(!0);
                    this.init(d, c);
                    d.isDirtyBox = !0;
                    I(a, !0) && d.redraw();
                };
                b.prototype.remove = function (c) {
                    for (var a = this.chart, d = this.coll, f = this.series, l = f.length; l--; ) f[l] && f[l].remove(!1);
                    q(a.axes, this);
                    q(a[d], this);
                    a[d].forEach(function (c, a) {
                        c.options.index = c.userOptions.index = a;
                    });
                    this.destroy();
                    a.isDirtyBox = !0;
                    I(c, !0) && a.redraw();
                };
                b.prototype.setTitle = function (c, a) {
                    this.update({ title: c }, a);
                };
                b.prototype.setCategories = function (c, a) {
                    this.update({ categories: c }, a);
                };
                b.defaultOptions = p.defaultXAxisOptions;
                b.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
                return b;
            })();
            ("");
            return b;
        }
    );
    G(b, "Core/Axis/DateTimeAxis.js", [b["Core/Utilities.js"]], function (b) {
        var v = b.addEvent,
            A = b.getMagnitude,
            E = b.normalizeTickInterval,
            w = b.timeUnits,
            D;
        (function (b) {
            function k() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
            }
            function t(d) {
                "datetime" !== d.userOptions.type ? (this.dateTime = void 0) : this.dateTime || (this.dateTime = new h(this));
            }
            var n = [];
            b.compose = function (d) {
                -1 === n.indexOf(d) && (n.push(d), d.keepProps.push("dateTime"), (d.prototype.getTimeTicks = k), v(d, "init", t));
                return d;
            };
            var h = (function () {
                function d(a) {
                    this.axis = a;
                }
                d.prototype.normalizeTimeTickInterval = function (a, d) {
                    var e = d || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null],
                    ];
                    d = e[e.length - 1];
                    var b = w[d[0]],
                        h = d[1],
                        k;
                    for (k = 0; k < e.length && !((d = e[k]), (b = w[d[0]]), (h = d[1]), e[k + 1] && a <= (b * h[h.length - 1] + w[e[k + 1][0]]) / 2); k++);
                    b === w.year && a < 5 * b && (h = [1, 2, 5]);
                    a = E(a / b, h, "year" === d[0] ? Math.max(A(a / b), 1) : 1);
                    return { unitRange: b, count: a, unitName: d[0] };
                };
                d.prototype.getXDateFormat = function (a, d) {
                    var b = this.axis;
                    return b.closestPointRange ? b.chart.time.getDateFormat(b.closestPointRange, a, b.options.startOfWeek, d) || d.year : d.day;
                };
                return d;
            })();
            b.Additions = h;
        })(D || (D = {}));
        return D;
    });
    G(b, "Core/Axis/LogarithmicAxis.js", [b["Core/Utilities.js"]], function (b) {
        var v = b.addEvent,
            A = b.getMagnitude,
            E = b.normalizeTickInterval,
            w = b.pick,
            D;
        (function (b) {
            function k(d) {
                var a = this.logarithmic;
                "logarithmic" !== d.userOptions.type ? (this.logarithmic = void 0) : a || (this.logarithmic = new h(this));
            }
            function t() {
                var d = this.logarithmic;
                d &&
                    ((this.lin2val = function (a) {
                        return d.lin2log(a);
                    }),
                    (this.val2lin = function (a) {
                        return d.log2lin(a);
                    }));
            }
            var n = [];
            b.compose = function (d) {
                -1 === n.indexOf(d) && (n.push(d), d.keepProps.push("logarithmic"), v(d, "init", k), v(d, "afterInit", t));
                return d;
            };
            var h = (function () {
                function d(a) {
                    this.axis = a;
                }
                d.prototype.getLogTickPositions = function (a, d, b, h) {
                    var e = this.axis,
                        g = e.len,
                        q = e.options,
                        k = [];
                    h || (this.minorAutoInterval = void 0);
                    if (0.5 <= a) (a = Math.round(a)), (k = e.getLinearTickPositions(a, d, b));
                    else if (0.08 <= a) {
                        var m = Math.floor(d),
                            f,
                            y = (q = void 0);
                        for (g = 0.3 < a ? [1, 2, 4] : 0.15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; m < b + 1 && !y; m++) {
                            var c = g.length;
                            for (f = 0; f < c && !y; f++) {
                                var u = this.log2lin(this.lin2log(m) * g[f]);
                                u > d && (!h || q <= b) && "undefined" !== typeof q && k.push(q);
                                q > b && (y = !0);
                                q = u;
                            }
                        }
                    } else
                        (d = this.lin2log(d)),
                            (b = this.lin2log(b)),
                            (a = h ? e.getMinorTickInterval() : q.tickInterval),
                            (a = w("auto" === a ? null : a, this.minorAutoInterval, ((q.tickPixelInterval / (h ? 5 : 1)) * (b - d)) / ((h ? g / e.tickPositions.length : g) || 1))),
                            (a = E(a, void 0, A(a))),
                            (k = e.getLinearTickPositions(a, d, b).map(this.log2lin)),
                            h || (this.minorAutoInterval = a / 5);
                    h || (e.tickInterval = a);
                    return k;
                };
                d.prototype.lin2log = function (a) {
                    return Math.pow(10, a);
                };
                d.prototype.log2lin = function (a) {
                    return Math.log(a) / Math.LN10;
                };
                return d;
            })();
            b.Additions = h;
        })(D || (D = {}));
        return D;
    });
    G(b, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [b["Core/Utilities.js"]], function (b) {
        var v = b.erase,
            A = b.extend,
            E = b.isNumber,
            w;
        (function (b) {
            var p = [],
                k;
            b.compose = function (b, h) {
                k || (k = b);
                -1 === p.indexOf(h) && (p.push(h), A(h.prototype, t.prototype));
                return h;
            };
            var t = (function () {
                function b() {}
                b.prototype.getPlotBandPath = function (b, d, a) {
                    void 0 === a && (a = this.options);
                    var e = this.getPlotLinePath({ value: d, force: !0, acrossPanes: a.acrossPanes }),
                        g = [],
                        h = this.horiz;
                    d = !E(this.min) || !E(this.max) || (b < this.min && d < this.min) || (b > this.max && d > this.max);
                    b = this.getPlotLinePath({ value: b, force: !0, acrossPanes: a.acrossPanes });
                    a = 1;
                    if (b && e) {
                        if (d) {
                            var k = b.toString() === e.toString();
                            a = 0;
                        }
                        for (d = 0; d < b.length; d += 2) {
                            var r = b[d],
                                q = b[d + 1],
                                n = e[d],
                                m = e[d + 1];
                            ("M" !== r[0] && "L" !== r[0]) ||
                                ("M" !== q[0] && "L" !== q[0]) ||
                                ("M" !== n[0] && "L" !== n[0]) ||
                                ("M" !== m[0] && "L" !== m[0]) ||
                                (h && n[1] === r[1] ? ((n[1] += a), (m[1] += a)) : h || n[2] !== r[2] || ((n[2] += a), (m[2] += a)), g.push(["M", r[1], r[2]], ["L", q[1], q[2]], ["L", m[1], m[2]], ["L", n[1], n[2]], ["Z"]));
                            g.isFlat = k;
                        }
                    }
                    return g;
                };
                b.prototype.addPlotBand = function (b) {
                    return this.addPlotBandOrLine(b, "plotBands");
                };
                b.prototype.addPlotLine = function (b) {
                    return this.addPlotBandOrLine(b, "plotLines");
                };
                b.prototype.addPlotBandOrLine = function (b, d) {
                    var a = this,
                        e = this.userOptions,
                        g = new k(this, b);
                    this.visible && (g = g.render());
                    if (g) {
                        this._addedPlotLB ||
                            ((this._addedPlotLB = !0),
                            (e.plotLines || []).concat(e.plotBands || []).forEach(function (d) {
                                a.addPlotBandOrLine(d);
                            }));
                        if (d) {
                            var h = e[d] || [];
                            h.push(b);
                            e[d] = h;
                        }
                        this.plotLinesAndBands.push(g);
                    }
                    return g;
                };
                b.prototype.removePlotBandOrLine = function (b) {
                    var d = this.plotLinesAndBands,
                        a = this.options,
                        e = this.userOptions;
                    if (d) {
                        for (var g = d.length; g--; ) d[g].id === b && d[g].destroy();
                        [a.plotLines || [], e.plotLines || [], a.plotBands || [], e.plotBands || []].forEach(function (a) {
                            for (g = a.length; g--; ) (a[g] || {}).id === b && v(a, a[g]);
                        });
                    }
                };
                b.prototype.removePlotBand = function (b) {
                    this.removePlotBandOrLine(b);
                };
                b.prototype.removePlotLine = function (b) {
                    this.removePlotBandOrLine(b);
                };
                return b;
            })();
        })(w || (w = {}));
        return w;
    });
    G(b, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [b["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], b["Core/Utilities.js"]], function (b, p) {
        var v = p.arrayMax,
            E = p.arrayMin,
            w = p.defined,
            D = p.destroyObjectProperties,
            B = p.erase,
            k = p.fireEvent,
            t = p.merge,
            n = p.objectEach,
            h = p.pick;
        p = (function () {
            function d(a, d) {
                this.axis = a;
                d && ((this.options = d), (this.id = d.id));
            }
            d.compose = function (a) {
                return b.compose(d, a);
            };
            d.prototype.render = function () {
                k(this, "render");
                var a = this,
                    d = a.axis,
                    b = d.horiz,
                    x = d.logarithmic,
                    C = a.options,
                    r = C.color,
                    q = h(C.zIndex, 0),
                    z = C.events,
                    m = {},
                    f = d.chart.renderer,
                    y = C.label,
                    c = a.label,
                    u = C.to,
                    l = C.from,
                    F = C.value,
                    K = a.svgElem,
                    H = [],
                    I = w(l) && w(u);
                H = w(F);
                var v = !K,
                    p = { class: "highcharts-plot-" + (I ? "band " : "line ") + (C.className || "") },
                    B = I ? "bands" : "lines";
                x && ((l = x.log2lin(l)), (u = x.log2lin(u)), (F = x.log2lin(F)));
                d.chart.styledMode ||
                    (H
                        ? ((p.stroke = r || "#999999"), (p["stroke-width"] = h(C.width, 1)), C.dashStyle && (p.dashstyle = C.dashStyle))
                        : I && ((p.fill = r || "#e6ebf5"), C.borderWidth && ((p.stroke = C.borderColor), (p["stroke-width"] = C.borderWidth))));
                m.zIndex = q;
                B += "-" + q;
                (x = d.plotLinesAndBandsGroups[B]) ||
                    (d.plotLinesAndBandsGroups[B] = x = f
                        .g("plot-" + B)
                        .attr(m)
                        .add());
                v && (a.svgElem = K = f.path().attr(p).add(x));
                if (H) H = d.getPlotLinePath({ value: F, lineWidth: K.strokeWidth(), acrossPanes: C.acrossPanes });
                else if (I) H = d.getPlotBandPath(l, u, C);
                else return;
                !a.eventsAdded &&
                    z &&
                    (n(z, function (c, d) {
                        K.on(d, function (c) {
                            z[d].apply(a, [c]);
                        });
                    }),
                    (a.eventsAdded = !0));
                (v || !K.d) && H && H.length ? K.attr({ d: H }) : K && (H ? (K.show(!0), K.animate({ d: H })) : K.d && (K.hide(), c && (a.label = c = c.destroy())));
                y && (w(y.text) || w(y.formatter)) && H && H.length && 0 < d.width && 0 < d.height && !H.isFlat
                    ? ((y = t({ align: b && I && "center", x: b ? !I && 4 : 10, verticalAlign: !b && I && "middle", y: b ? (I ? 16 : 10) : I ? 6 : -4, rotation: b && !I && 90 }, y)), this.renderLabel(y, H, I, q))
                    : c && c.hide();
                return a;
            };
            d.prototype.renderLabel = function (a, d, b, h) {
                var e = this.axis,
                    g = e.chart.renderer,
                    q = this.label;
                q ||
                    ((this.label = q = g
                        .text(this.getLabelText(a), 0, 0, a.useHTML)
                        .attr({ align: a.textAlign || a.align, rotation: a.rotation, class: "highcharts-plot-" + (b ? "band" : "line") + "-label " + (a.className || ""), zIndex: h })
                        .add()),
                    e.chart.styledMode || q.css(t({ textOverflow: "ellipsis" }, a.style)));
                h = d.xBounds || [d[0][1], d[1][1], b ? d[2][1] : d[0][1]];
                d = d.yBounds || [d[0][2], d[1][2], b ? d[2][2] : d[0][2]];
                b = E(h);
                g = E(d);
                q.align(a, !1, { x: b, y: g, width: v(h) - b, height: v(d) - g });
                (q.alignValue && "left" !== q.alignValue) || q.css({ width: (90 === q.rotation ? e.height - (q.alignAttr.y - e.top) : e.width - (q.alignAttr.x - e.left)) + "px" });
                q.show(!0);
            };
            d.prototype.getLabelText = function (a) {
                return w(a.formatter) ? a.formatter.call(this) : a.text;
            };
            d.prototype.destroy = function () {
                B(this.axis.plotLinesAndBands, this);
                delete this.axis;
                D(this);
            };
            return d;
        })();
        ("");
        ("");
        return p;
    });
    G(b, "Core/Tooltip.js", [b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Renderer/RendererUtilities.js"], b["Core/Renderer/RendererRegistry.js"], b["Core/Utilities.js"]], function (b, p, A, E, w) {
        var v = b.format,
            B = p.doc,
            k = A.distribute,
            t = w.addEvent,
            n = w.clamp,
            h = w.css,
            d = w.defined,
            a = w.discardElement,
            e = w.extend,
            g = w.fireEvent,
            x = w.isArray,
            C = w.isNumber,
            r = w.isString,
            q = w.merge,
            z = w.pick,
            m = w.splat,
            f = w.syncTimeout;
        b = (function () {
            function b(c, a) {
                this.allowShared = !0;
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = c;
                this.init(c, a);
            }
            b.prototype.applyFilter = function () {
                var c = this.chart;
                c.renderer.definition({
                    tagName: "filter",
                    attributes: { id: "drop-shadow-" + c.index, opacity: 0.5 },
                    children: [
                        { tagName: "feGaussianBlur", attributes: { in: "SourceAlpha", stdDeviation: 1 } },
                        { tagName: "feOffset", attributes: { dx: 1, dy: 1 } },
                        { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", attributes: { type: "linear", slope: 0.3 } }] },
                        { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", attributes: { in: "SourceGraphic" } }] },
                    ],
                });
            };
            b.prototype.bodyFormatter = function (c) {
                return c.map(function (c) {
                    var a = c.series.tooltipOptions;
                    return (a[(c.point.formatPrefix || "point") + "Formatter"] || c.point.tooltipFormatter).call(c.point, a[(c.point.formatPrefix || "point") + "Format"] || "");
                });
            };
            b.prototype.cleanSplit = function (c) {
                this.chart.series.forEach(function (a) {
                    var d = a && a.tt;
                    d && (!d.isActive || c ? (a.tt = d.destroy()) : (d.isActive = !1));
                });
            };
            b.prototype.defaultFormatter = function (c) {
                var a = this.points || m(this);
                var d = [c.tooltipFooterHeaderFormatter(a[0])];
                d = d.concat(c.bodyFormatter(a));
                d.push(c.tooltipFooterHeaderFormatter(a[0], !0));
                return d;
            };
            b.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(!0), (this.tt = this.tt.destroy()));
                this.renderer && ((this.renderer = this.renderer.destroy()), a(this.container));
                w.clearTimeout(this.hideTimer);
                w.clearTimeout(this.tooltipTimeout);
            };
            b.prototype.getAnchor = function (c, a) {
                var d = this.chart,
                    f = d.pointer,
                    b = d.inverted,
                    e = d.plotTop,
                    g = d.plotLeft,
                    h,
                    u,
                    y = 0,
                    q = 0;
                c = m(c);
                this.followPointer && a
                    ? ("undefined" === typeof a.chartX && (a = f.normalize(a)), (f = [a.chartX - g, a.chartY - e]))
                    : c[0].tooltipPos
                    ? (f = c[0].tooltipPos)
                    : (c.forEach(function (c) {
                          h = c.series.yAxis;
                          u = c.series.xAxis;
                          y += c.plotX || 0;
                          q += c.plotLow ? (c.plotLow + (c.plotHigh || 0)) / 2 : c.plotY || 0;
                          u && h && (b ? ((y += e + d.plotHeight - u.len - u.pos), (q += g + d.plotWidth - h.len - h.pos)) : ((y += u.pos - g), (q += h.pos - e)));
                      }),
                      (y /= c.length),
                      (q /= c.length),
                      (f = [b ? d.plotWidth - q : y, b ? d.plotHeight - y : q]),
                      this.shared && 1 < c.length && a && (b ? (f[0] = a.chartX - g) : (f[1] = a.chartY - e)));
                return f.map(Math.round);
            };
            b.prototype.getLabel = function () {
                var c = this,
                    a = this.chart.styledMode,
                    f = this.options,
                    b = this.split && this.allowShared,
                    e = "tooltip" + (d(f.className) ? " " + f.className : ""),
                    g = f.style.pointerEvents || (!this.followPointer && f.stickOnContact ? "auto" : "none"),
                    m = function () {
                        c.inContact = !0;
                    },
                    y = function (a) {
                        var d = c.chart.hoverSeries;
                        c.inContact = c.shouldStickOnContact() && c.chart.pointer.inClass(a.relatedTarget, "highcharts-tooltip");
                        if (!c.inContact && d && d.onMouseOut) d.onMouseOut();
                    },
                    q,
                    k = this.chart.renderer;
                if (c.label) {
                    var r = !c.label.hasClass("highcharts-label");
                    ((b && !r) || (!b && r)) && c.destroy();
                }
                if (!this.label) {
                    if (this.outside) {
                        r = this.chart.options.chart.style;
                        var n = E.getRendererType();
                        this.container = q = p.doc.createElement("div");
                        q.className = "highcharts-tooltip-container";
                        h(q, { position: "absolute", top: "1px", pointerEvents: g, zIndex: Math.max(this.options.style.zIndex || 0, ((r && r.zIndex) || 0) + 3) });
                        t(q, "mouseenter", m);
                        t(q, "mouseleave", y);
                        p.doc.body.appendChild(q);
                        this.renderer = k = new n(q, 0, 0, r, void 0, void 0, k.styledMode);
                    }
                    b
                        ? (this.label = k.g(e))
                        : ((this.label = k.label("", 0, 0, f.shape, void 0, void 0, f.useHTML, void 0, e).attr({ padding: f.padding, r: f.borderRadius })),
                          a || this.label.attr({ fill: f.backgroundColor, "stroke-width": f.borderWidth }).css(f.style).css({ pointerEvents: g }).shadow(f.shadow));
                    a && f.shadow && (this.applyFilter(), this.label.attr({ filter: "url(#drop-shadow-" + this.chart.index + ")" }));
                    if (c.outside && !c.split) {
                        var z = this.label,
                            x = z.xSetter,
                            C = z.ySetter;
                        z.xSetter = function (a) {
                            x.call(z, c.distance);
                            q.style.left = a + "px";
                        };
                        z.ySetter = function (a) {
                            C.call(z, c.distance);
                            q.style.top = a + "px";
                        };
                    }
                    this.label.on("mouseenter", m).on("mouseleave", y).attr({ zIndex: 8 }).add();
                }
                return this.label;
            };
            b.prototype.getPosition = function (c, a, d) {
                var f = this.chart,
                    l = this.distance,
                    b = {},
                    e = (f.inverted && d.h) || 0,
                    g = this.outside,
                    m = g ? B.documentElement.clientWidth - 2 * l : f.chartWidth,
                    h = g ? Math.max(B.body.scrollHeight, B.documentElement.scrollHeight, B.body.offsetHeight, B.documentElement.offsetHeight, B.documentElement.clientHeight) : f.chartHeight,
                    u = f.pointer.getChartPosition(),
                    y = function (b) {
                        var e = "x" === b;
                        return [b, e ? m : h, e ? c : a].concat(
                            g
                                ? [e ? c * u.scaleX : a * u.scaleY, e ? u.left - l + (d.plotX + f.plotLeft) * u.scaleX : u.top - l + (d.plotY + f.plotTop) * u.scaleY, 0, e ? m : h]
                                : [e ? c : a, e ? d.plotX + f.plotLeft : d.plotY + f.plotTop, e ? f.plotLeft : f.plotTop, e ? f.plotLeft + f.plotWidth : f.plotTop + f.plotHeight]
                        );
                    },
                    q = y("y"),
                    k = y("x"),
                    r;
                y = !!d.negative;
                !f.polar && f.hoverSeries && f.hoverSeries.yAxis && f.hoverSeries.yAxis.reversed && (y = !y);
                var n = !this.followPointer && z(d.ttBelow, !f.inverted === y),
                    x = function (c, a, d, f, m, h, y) {
                        var q = g ? ("y" === c ? l * u.scaleY : l * u.scaleX) : l,
                            k = (d - f) / 2,
                            F = f < m - l,
                            r = m + l + f < a,
                            H = m - q - d + k;
                        m = m + q - k;
                        if (n && r) b[c] = m;
                        else if (!n && F) b[c] = H;
                        else if (F) b[c] = Math.min(y - f, 0 > H - e ? H : H - e);
                        else if (r) b[c] = Math.max(h, m + e + d > a ? m : m + e);
                        else return !1;
                    },
                    t = function (c, a, d, f, e) {
                        var g;
                        e < l || e > a - l ? (g = !1) : (b[c] = e < d / 2 ? 1 : e > a - f / 2 ? a - f - 2 : e - d / 2);
                        return g;
                    },
                    C = function (c) {
                        var a = q;
                        q = k;
                        k = a;
                        r = c;
                    },
                    v = function () {
                        !1 !== x.apply(0, q) ? !1 !== t.apply(0, k) || r || (C(!0), v()) : r ? (b.x = b.y = 0) : (C(!0), v());
                    };
                (f.inverted || 1 < this.len) && C();
                v();
                return b;
            };
            b.prototype.hide = function (c) {
                var a = this;
                w.clearTimeout(this.hideTimer);
                c = z(c, this.options.hideDelay);
                this.isHidden ||
                    (this.hideTimer = f(function () {
                        a.getLabel().fadeOut(c ? void 0 : c);
                        a.isHidden = !0;
                    }, c));
            };
            b.prototype.init = function (c, a) {
                this.chart = c;
                this.options = a;
                this.crosshairs = [];
                this.now = { x: 0, y: 0 };
                this.isHidden = !0;
                this.split = a.split && !c.inverted && !c.polar;
                this.shared = a.shared || this.split;
                this.outside = z(a.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY));
            };
            b.prototype.shouldStickOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact);
            };
            b.prototype.isStickyOnContact = function () {
                return !(!this.shouldStickOnContact() || !this.inContact);
            };
            b.prototype.move = function (c, a, d, f) {
                var l = this,
                    b = l.now,
                    g = !1 !== l.options.animation && !l.isHidden && (1 < Math.abs(c - b.x) || 1 < Math.abs(a - b.y)),
                    m = l.followPointer || 1 < l.len;
                e(b, { x: g ? (2 * b.x + c) / 3 : c, y: g ? (b.y + a) / 2 : a, anchorX: m ? void 0 : g ? (2 * b.anchorX + d) / 3 : d, anchorY: m ? void 0 : g ? (b.anchorY + f) / 2 : f });
                l.getLabel().attr(b);
                l.drawTracker();
                g &&
                    (w.clearTimeout(this.tooltipTimeout),
                    (this.tooltipTimeout = setTimeout(function () {
                        l && l.move(c, a, d, f);
                    }, 32)));
            };
            b.prototype.refresh = function (c, a) {
                var d = this.chart,
                    f = this.options,
                    b = m(c),
                    e = b[0],
                    h = [],
                    u = f.formatter || this.defaultFormatter,
                    y = this.shared,
                    q = d.styledMode,
                    k = {};
                if (f.enabled) {
                    w.clearTimeout(this.hideTimer);
                    this.allowShared = !(!x(c) && c.series && c.series.noSharedTooltip);
                    this.followPointer = !this.split && e.series.tooltipOptions.followPointer;
                    c = this.getAnchor(c, a);
                    var r = c[0],
                        n = c[1];
                    y && this.allowShared
                        ? (d.pointer.applyInactiveState(b),
                          b.forEach(function (c) {
                              c.setState("hover");
                              h.push(c.getLabelConfig());
                          }),
                          (k = { x: e.category, y: e.y }),
                          (k.points = h))
                        : (k = e.getLabelConfig());
                    this.len = h.length;
                    u = u.call(k, this);
                    y = e.series;
                    this.distance = z(y.tooltipOptions.distance, 16);
                    if (!1 === u) this.hide();
                    else {
                        if (this.split && this.allowShared) this.renderSplit(u, b);
                        else {
                            var t = r,
                                C = n;
                            a && d.pointer.isDirectTouch && ((t = a.chartX - d.plotLeft), (C = a.chartY - d.plotTop));
                            if (
                                d.polar ||
                                !1 === y.options.clip ||
                                b.some(function (c) {
                                    return c.series.shouldShowTooltip(t, C);
                                })
                            )
                                (a = this.getLabel()),
                                    (f.style.width && !q) || a.css({ width: this.chart.spacingBox.width + "px" }),
                                    a.attr({ text: u && u.join ? u.join("") : u }),
                                    a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + z(e.colorIndex, y.colorIndex)),
                                    q || a.attr({ stroke: f.borderColor || e.color || y.color || "#666666" }),
                                    this.updatePosition({ plotX: r, plotY: n, negative: e.negative, ttBelow: e.ttBelow, h: c[2] || 0 });
                            else {
                                this.hide();
                                return;
                            }
                        }
                        this.isHidden && this.label && this.label.attr({ opacity: 1 }).show();
                        this.isHidden = !1;
                    }
                    g(this, "refresh");
                }
            };
            b.prototype.renderSplit = function (c, a) {
                function d(c, a, d, b, l) {
                    void 0 === l && (l = !0);
                    d ? ((a = V ? 0 : G), (c = n(c - b / 2, P.left, P.right - b - (f.outside ? N : 0)))) : ((a -= ca), (c = l ? c - b - D : c + D), (c = n(c, l ? c : P.left, P.right)));
                    return { x: c, y: a };
                }
                var f = this,
                    b = f.chart,
                    g = f.chart,
                    m = g.chartWidth,
                    h = g.chartHeight,
                    u = g.plotHeight,
                    y = g.plotLeft,
                    q = g.plotTop,
                    x = g.pointer,
                    t = g.scrollablePixelsY;
                t = void 0 === t ? 0 : t;
                var C = g.scrollablePixelsX,
                    v = g.scrollingContainer;
                v = void 0 === v ? { scrollLeft: 0, scrollTop: 0 } : v;
                var p = v.scrollLeft;
                v = v.scrollTop;
                var w = g.styledMode,
                    D = f.distance,
                    M = f.options,
                    A = f.options.positioner,
                    P = f.outside && "number" !== typeof C ? B.documentElement.getBoundingClientRect() : { left: p, right: p + m, top: v, bottom: v + h },
                    E = f.getLabel(),
                    S = this.renderer || b.renderer,
                    V = !(!b.xAxis[0] || !b.xAxis[0].opposite);
                b = x.getChartPosition();
                var N = b.left;
                b = b.top;
                var ca = q + v,
                    ea = 0,
                    G = u - t;
                r(c) && (c = [!1, c]);
                c = c.slice(0, a.length + 1).reduce(function (c, b, l) {
                    if (!1 !== b && "" !== b) {
                        l = a[l - 1] || { isHeader: !0, plotX: a[0].plotX, plotY: u, series: {} };
                        var e = l.isHeader,
                            g = e ? f : l.series;
                        b = b.toString();
                        var m = g.tt,
                            h = l.isHeader;
                        var k = l.series;
                        var r = "highcharts-color-" + z(l.colorIndex, k.colorIndex, "none");
                        m ||
                            ((m = { padding: M.padding, r: M.borderRadius }),
                            w || ((m.fill = M.backgroundColor), (m["stroke-width"] = M.borderWidth)),
                            (m = S.label("", 0, 0, M[h ? "headerShape" : "shape"], void 0, void 0, M.useHTML)
                                .addClass((h ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + r)
                                .attr(m)
                                .add(E)));
                        m.isActive = !0;
                        m.attr({ text: b });
                        w ||
                            m
                                .css(M.style)
                                .shadow(M.shadow)
                                .attr({ stroke: M.borderColor || l.color || k.color || "#333333" });
                        g = g.tt = m;
                        h = g.getBBox();
                        b = h.width + g.strokeWidth();
                        e && ((ea = h.height), (G += ea), V && (ca -= ea));
                        k = l.plotX;
                        k = void 0 === k ? 0 : k;
                        r = l.plotY;
                        r = void 0 === r ? 0 : r;
                        m = l.series;
                        if (l.isHeader) {
                            k = y + k;
                            var F = q + u / 2;
                        } else {
                            var H = m.xAxis,
                                x = m.yAxis;
                            k = H.pos + n(k, -D, H.len + D);
                            m.shouldShowTooltip(0, x.pos - q + r, { ignoreX: !0 }) && (F = x.pos + r);
                        }
                        k = n(k, P.left - D, P.right + D);
                        "number" === typeof F
                            ? ((h = h.height + 1),
                              (r = A ? A.call(f, b, h, l) : d(k, F, e, b)),
                              c.push({ align: A ? 0 : void 0, anchorX: k, anchorY: F, boxWidth: b, point: l, rank: z(r.rank, e ? 1 : 0), size: h, target: r.y, tt: g, x: r.x }))
                            : (g.isActive = !1);
                    }
                    return c;
                }, []);
                !A &&
                    c.some(function (c) {
                        var a = (f.outside ? N : 0) + c.anchorX;
                        return a < P.left && a + c.boxWidth < P.right ? !0 : a < N - P.left + c.boxWidth && P.right - a > a;
                    }) &&
                    (c = c.map(function (c) {
                        var a = d(c.anchorX, c.anchorY, c.point.isHeader, c.boxWidth, !1);
                        return e(c, { target: a.y, x: a.x });
                    }));
                f.cleanSplit();
                k(c, G);
                var aa = N,
                    fa = N;
                c.forEach(function (c) {
                    var a = c.x,
                        d = c.boxWidth;
                    c = c.isHeader;
                    c || (f.outside && N + a < aa && (aa = N + a), !c && f.outside && aa + d > fa && (fa = N + a));
                });
                c.forEach(function (c) {
                    var a = c.x,
                        d = c.anchorX,
                        b = c.pos,
                        l = c.point.isHeader;
                    b = { visibility: "undefined" === typeof b ? "hidden" : "inherit", x: a, y: b + ca, anchorX: d, anchorY: c.anchorY };
                    if (f.outside && a < d) {
                        var e = N - aa;
                        0 < e && (l || ((b.x = a + e), (b.anchorX = d + e)), l && ((b.x = (fa - aa) / 2), (b.anchorX = d + e)));
                    }
                    c.tt.attr(b);
                });
                c = f.container;
                t = f.renderer;
                f.outside && c && t && ((g = E.getBBox()), t.setSize(g.width + g.x, g.height + g.y, !1), (c.style.left = aa + "px"), (c.style.top = b + "px"));
            };
            b.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                else {
                    var c = this.chart,
                        a = this.label,
                        d = this.shared ? c.hoverPoints : c.hoverPoint;
                    if (a && d) {
                        var f = { x: 0, y: 0, width: 0, height: 0 };
                        d = this.getAnchor(d);
                        var b = a.getBBox();
                        d[0] += c.plotLeft - a.translateX;
                        d[1] += c.plotTop - a.translateY;
                        f.x = Math.min(0, d[0]);
                        f.y = Math.min(0, d[1]);
                        f.width = 0 > d[0] ? Math.max(Math.abs(d[0]), b.width - d[0]) : Math.max(Math.abs(d[0]), b.width);
                        f.height = 0 > d[1] ? Math.max(Math.abs(d[1]), b.height - Math.abs(d[1])) : Math.max(Math.abs(d[1]), b.height);
                        this.tracker ? this.tracker.attr(f) : ((this.tracker = a.renderer.rect(f).addClass("highcharts-tracker").add(a)), c.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
                    }
                }
            };
            b.prototype.styledModeFormat = function (c) {
                return c.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"');
            };
            b.prototype.tooltipFooterHeaderFormatter = function (c, a) {
                var d = c.series,
                    f = d.tooltipOptions,
                    b = d.xAxis,
                    e = b && b.dateTime;
                b = { isFooter: a, labelConfig: c };
                var m = f.xDateFormat,
                    h = f[a ? "footerFormat" : "headerFormat"];
                g(this, "headerFormatter", b, function (a) {
                    e && !m && C(c.key) && (m = e.getXDateFormat(c.key, f.dateTimeLabelFormats));
                    e &&
                        m &&
                        ((c.point && c.point.tooltipDateKeys) || ["key"]).forEach(function (c) {
                            h = h.replace("{point." + c + "}", "{point." + c + ":" + m + "}");
                        });
                    d.chart.styledMode && (h = this.styledModeFormat(h));
                    a.text = v(h, { point: c, series: d }, this.chart);
                });
                return b.text;
            };
            b.prototype.update = function (c) {
                this.destroy();
                q(!0, this.chart.options.tooltip.userOptions, c);
                this.init(this.chart, q(!0, this.options, c));
            };
            b.prototype.updatePosition = function (c) {
                var a = this.chart,
                    d = this.options,
                    f = a.pointer,
                    b = this.getLabel();
                f = f.getChartPosition();
                var e = (d.positioner || this.getPosition).call(this, b.width, b.height, c),
                    g = c.plotX + a.plotLeft;
                c = c.plotY + a.plotTop;
                if (this.outside) {
                    d = d.borderWidth + 2 * this.distance;
                    this.renderer.setSize(b.width + d, b.height + d, !1);
                    if (1 !== f.scaleX || 1 !== f.scaleY) h(this.container, { transform: "scale(" + f.scaleX + ", " + f.scaleY + ")" }), (g *= f.scaleX), (c *= f.scaleY);
                    g += f.left - e.x;
                    c += f.top - e.y;
                }
                this.move(Math.round(e.x), Math.round(e.y || 0), g, c);
            };
            return b;
        })();
        ("");
        return b;
    });
    G(b, "Core/Series/Point.js", [b["Core/Renderer/HTML/AST.js"], b["Core/Animation/AnimationUtilities.js"], b["Core/DefaultOptions.js"], b["Core/FormatUtilities.js"], b["Core/Utilities.js"]], function (b, p, A, E, w) {
        var v = p.animObject,
            B = A.defaultOptions,
            k = E.format,
            t = w.addEvent,
            n = w.defined,
            h = w.erase,
            d = w.extend,
            a = w.fireEvent,
            e = w.getNestedProperty,
            g = w.isArray,
            x = w.isFunction,
            C = w.isNumber,
            r = w.isObject,
            q = w.merge,
            z = w.objectEach,
            m = w.pick,
            f = w.syncTimeout,
            y = w.removeEvent,
            c = w.uniqueKey;
        p = (function () {
            function u() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0;
            }
            u.prototype.animateBeforeDestroy = function () {
                var c = this,
                    a = { x: c.startXPos, opacity: 0 },
                    f = c.getGraphicalProps();
                f.singular.forEach(function (d) {
                    c[d] = c[d].animate("dataLabel" === d ? { x: c[d].startXPos, y: c[d].startYPos, opacity: 0 } : a);
                });
                f.plural.forEach(function (a) {
                    c[a].forEach(function (a) {
                        a.element && a.animate(d({ x: c.startXPos }, a.startYPos ? { x: a.startXPos, y: a.startYPos } : {}));
                    });
                });
            };
            u.prototype.applyOptions = function (c, a) {
                var f = this.series,
                    b = f.options.pointValKey || f.pointValKey;
                c = u.prototype.optionsToObject.call(this, c);
                d(this, c);
                this.options = this.options ? d(this.options, c) : c;
                c.group && delete this.group;
                c.dataLabels && delete this.dataLabels;
                b && (this.y = u.prototype.getNestedProperty.call(this, b));
                this.formatPrefix = (this.isNull = m(this.isValid && !this.isValid(), null === this.x || !C(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof a && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                "undefined" === typeof this.x && f ? (this.x = "undefined" === typeof a ? f.autoIncrement() : a) : C(c.x) && f.options.relativeXValue && (this.x = f.autoIncrement(c.x));
                return this;
            };
            u.prototype.destroy = function () {
                function c() {
                    if (a.graphic || a.dataLabel || a.dataLabels) y(a), a.destroyElements();
                    for (m in a) a[m] = null;
                }
                var a = this,
                    d = a.series,
                    b = d.chart;
                d = d.options.dataSorting;
                var e = b.hoverPoints,
                    g = v(a.series.chart.renderer.globalAnimation),
                    m;
                a.legendItem && b.legend.destroyItem(a);
                e && (a.setState(), h(e, a), e.length || (b.hoverPoints = null));
                if (a === b.hoverPoint) a.onMouseOut();
                d && d.enabled ? (this.animateBeforeDestroy(), f(c, g.duration)) : c();
                b.pointCount--;
            };
            u.prototype.destroyElements = function (c) {
                var a = this;
                c = a.getGraphicalProps(c);
                c.singular.forEach(function (c) {
                    a[c] = a[c].destroy();
                });
                c.plural.forEach(function (c) {
                    a[c].forEach(function (c) {
                        c.element && c.destroy();
                    });
                    delete a[c];
                });
            };
            u.prototype.firePointEvent = function (c, d, f) {
                var b = this,
                    l = this.series.options;
                (l.point.events[c] || (b.options && b.options.events && b.options.events[c])) && b.importEvents();
                "click" === c &&
                    l.allowPointSelect &&
                    (f = function (c) {
                        b.select && b.select(null, c.ctrlKey || c.metaKey || c.shiftKey);
                    });
                a(b, c, d, f);
            };
            u.prototype.getClassName = function () {
                return (
                    "highcharts-point" +
                    (this.selected ? " highcharts-point-select" : "") +
                    (this.negative ? " highcharts-negative" : "") +
                    (this.isNull ? " highcharts-null-point" : "") +
                    ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") +
                    (this.options.className ? " " + this.options.className : "") +
                    (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                );
            };
            u.prototype.getGraphicalProps = function (c) {
                var a = this,
                    d = [],
                    f = { singular: [], plural: [] },
                    b;
                c = c || { graphic: 1, dataLabel: 1 };
                c.graphic && d.push("graphic", "upperGraphic", "shadowGroup");
                c.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (b = d.length; b--; ) {
                    var l = d[b];
                    a[l] && f.singular.push(l);
                }
                ["dataLabel", "connector"].forEach(function (d) {
                    var b = d + "s";
                    c[d] && a[b] && f.plural.push(b);
                });
                return f;
            };
            u.prototype.getLabelConfig = function () {
                return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
            };
            u.prototype.getNestedProperty = function (c) {
                if (c) return 0 === c.indexOf("custom.") ? e(c, this.options) : this[c];
            };
            u.prototype.getZone = function () {
                var c = this.series,
                    a = c.zones;
                c = c.zoneAxis || "y";
                var d,
                    f = 0;
                for (d = a[f]; this[c] >= d.value; ) d = a[++f];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = d && d.color && !this.options.color ? d.color : this.nonZonedColor;
                return d;
            };
            u.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
            };
            u.prototype.init = function (d, f, b) {
                this.series = d;
                this.applyOptions(f, b);
                this.id = n(this.id) ? this.id : c();
                this.resolveColor();
                d.chart.pointCount++;
                a(this, "afterInit");
                return this;
            };
            u.prototype.optionsToObject = function (c) {
                var a = this.series,
                    d = a.options.keys,
                    f = d || a.pointArrayMap || ["y"],
                    b = f.length,
                    l = {},
                    e = 0,
                    m = 0;
                if (C(c) || null === c) l[f[0]] = c;
                else if (g(c))
                    for (!d && c.length > b && ((a = typeof c[0]), "string" === a ? (l.name = c[0]) : "number" === a && (l.x = c[0]), e++); m < b; )
                        (d && "undefined" === typeof c[e]) || (0 < f[m].indexOf(".") ? u.prototype.setNestedProperty(l, c[e], f[m]) : (l[f[m]] = c[e])), e++, m++;
                else "object" === typeof c && ((l = c), c.dataLabels && (a._hasPointLabels = !0), c.marker && (a._hasPointMarkers = !0));
                return l;
            };
            u.prototype.resolveColor = function () {
                var c = this.series,
                    a = c.chart.styledMode;
                var d = c.chart.options.chart.colorCount;
                delete this.nonZonedColor;
                if (c.options.colorByPoint) {
                    if (!a) {
                        d = c.options.colors || c.chart.options.colors;
                        var f = d[c.colorCounter];
                        d = d.length;
                    }
                    a = c.colorCounter;
                    c.colorCounter++;
                    c.colorCounter === d && (c.colorCounter = 0);
                } else a || (f = c.color), (a = c.colorIndex);
                this.colorIndex = m(this.options.colorIndex, a);
                this.color = m(this.options.color, f);
            };
            u.prototype.setNestedProperty = function (c, a, d) {
                d.split(".").reduce(function (c, d, f, b) {
                    c[d] = b.length - 1 === f ? a : r(c[d], !0) ? c[d] : {};
                    return c[d];
                }, c);
                return c;
            };
            u.prototype.tooltipFormatter = function (c) {
                var a = this.series,
                    d = a.tooltipOptions,
                    f = m(d.valueDecimals, ""),
                    b = d.valuePrefix || "",
                    l = d.valueSuffix || "";
                a.chart.styledMode && (c = a.chart.tooltip.styledModeFormat(c));
                (a.pointArrayMap || ["y"]).forEach(function (a) {
                    a = "{point." + a;
                    if (b || l) c = c.replace(RegExp(a + "}", "g"), b + a + "}" + l);
                    c = c.replace(RegExp(a + "}", "g"), a + ":,." + f + "f}");
                });
                return k(c, { point: this, series: this.series }, a.chart);
            };
            u.prototype.update = function (c, a, d, f) {
                function b() {
                    e.applyOptions(c);
                    var f = g && e.hasDummyGraphic;
                    f = null === e.y ? !f : f;
                    g && f && ((e.graphic = g.destroy()), delete e.hasDummyGraphic);
                    r(c, !0) &&
                        (g && g.element && c && c.marker && "undefined" !== typeof c.marker.symbol && (e.graphic = g.destroy()),
                        c && c.dataLabels && e.dataLabel && (e.dataLabel = e.dataLabel.destroy()),
                        e.connector && (e.connector = e.connector.destroy()));
                    u = e.index;
                    l.updateParallelArrays(e, u);
                    y.data[u] = r(y.data[u], !0) || r(c, !0) ? e.options : m(c, y.data[u]);
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (h.isDirtyBox = !0);
                    "point" === y.legendType && (h.isDirtyLegend = !0);
                    a && h.redraw(d);
                }
                var e = this,
                    l = e.series,
                    g = e.graphic,
                    h = l.chart,
                    y = l.options,
                    u;
                a = m(a, !0);
                !1 === f ? b() : e.firePointEvent("update", { options: c }, b);
            };
            u.prototype.remove = function (c, a) {
                this.series.removePoint(this.series.data.indexOf(this), c, a);
            };
            u.prototype.select = function (c, a) {
                var d = this,
                    f = d.series,
                    b = f.chart;
                this.selectedStaging = c = m(c, !d.selected);
                d.firePointEvent(c ? "select" : "unselect", { accumulate: a }, function () {
                    d.selected = d.options.selected = c;
                    f.options.data[f.data.indexOf(d)] = d.options;
                    d.setState(c && "select");
                    a ||
                        b.getSelectedPoints().forEach(function (c) {
                            var a = c.series;
                            c.selected &&
                                c !== d &&
                                ((c.selected = c.options.selected = !1), (a.options.data[a.data.indexOf(c)] = c.options), c.setState(b.hoverPoints && a.options.inactiveOtherPoints ? "inactive" : ""), c.firePointEvent("unselect"));
                        });
                });
                delete this.selectedStaging;
            };
            u.prototype.onMouseOver = function (c) {
                var a = this.series.chart,
                    d = a.pointer;
                c = c ? d.normalize(c) : d.getChartCoordinatesFromPoint(this, a.inverted);
                d.runPointActions(c, this);
            };
            u.prototype.onMouseOut = function () {
                var c = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints ||
                    (c.hoverPoints || []).forEach(function (c) {
                        c.setState();
                    });
                c.hoverPoints = c.hoverPoint = null;
            };
            u.prototype.importEvents = function () {
                if (!this.hasImportedEvents) {
                    var c = this,
                        a = q(c.series.options.point, c.options).events;
                    c.events = a;
                    z(a, function (a, d) {
                        x(a) && t(c, d, a);
                    });
                    this.hasImportedEvents = !0;
                }
            };
            u.prototype.setState = function (c, f) {
                var e = this.series,
                    l = this.state,
                    g = e.options.states[c || "normal"] || {},
                    h = B.plotOptions[e.type].marker && e.options.marker,
                    y = h && !1 === h.enabled,
                    u = (h && h.states && h.states[c || "normal"]) || {},
                    q = !1 === u.enabled,
                    k = this.marker || {},
                    r = e.chart,
                    n = h && e.markerAttribs,
                    z = e.halo,
                    x,
                    F = e.stateMarkerGraphic;
                c = c || "";
                if (!((c === this.state && !f) || (this.selected && "select" !== c) || !1 === g.enabled || (c && (q || (y && !1 === u.enabled))) || (c && k.states && k.states[c] && !1 === k.states[c].enabled))) {
                    this.state = c;
                    n && (x = e.markerAttribs(this, c));
                    if (this.graphic && !this.hasDummyGraphic) {
                        l && this.graphic.removeClass("highcharts-point-" + l);
                        c && this.graphic.addClass("highcharts-point-" + c);
                        if (!r.styledMode) {
                            var t = e.pointAttribs(this, c);
                            var M = m(r.options.chart.animation, g.animation);
                            e.options.inactiveOtherPoints &&
                                C(t.opacity) &&
                                ((this.dataLabels || []).forEach(function (c) {
                                    c && c.animate({ opacity: t.opacity }, M);
                                }),
                                this.connector && this.connector.animate({ opacity: t.opacity }, M));
                            this.graphic.animate(t, M);
                        }
                        x && this.graphic.animate(x, m(r.options.chart.animation, u.animation, h.animation));
                        F && F.hide();
                    } else {
                        if (c && u) {
                            l = k.symbol || e.symbol;
                            F && F.currentSymbol !== l && (F = F.destroy());
                            if (x)
                                if (F) F[f ? "animate" : "attr"]({ x: x.x, y: x.y });
                                else l && ((e.stateMarkerGraphic = F = r.renderer.symbol(l, x.x, x.y, x.width, x.height).add(e.markerGroup)), (F.currentSymbol = l));
                            !r.styledMode && F && "inactive" !== this.state && F.attr(e.pointAttribs(this, c));
                        }
                        F && (F[c && this.isInside ? "show" : "hide"](), (F.element.point = this), F.addClass(this.getClassName(), !0));
                    }
                    g = g.halo;
                    x = ((F = this.graphic || F) && F.visibility) || "inherit";
                    g && g.size && F && "hidden" !== x && !this.isCluster
                        ? (z || (e.halo = z = r.renderer.path().add(F.parentGroup)),
                          z.show()[f ? "animate" : "attr"]({ d: this.haloPath(g.size) }),
                          z.attr({ class: "highcharts-halo highcharts-color-" + m(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""), visibility: x, zIndex: -1 }),
                          (z.point = this),
                          r.styledMode || z.attr(d({ fill: this.color || e.color, "fill-opacity": g.opacity }, b.filterUserAttributes(g.attributes || {}))))
                        : z && z.point && z.point.haloPath && z.animate({ d: z.point.haloPath(0) }, null, z.hide);
                    a(this, "afterSetState", { state: c });
                }
            };
            u.prototype.haloPath = function (c) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - c, this.plotY - c, 2 * c, 2 * c);
            };
            return u;
        })();
        ("");
        return p;
    });
    G(b, "Core/Pointer.js", [b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Tooltip.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v = b.parse,
            D = p.charts,
            B = p.noop,
            k = E.addEvent,
            t = E.attr,
            n = E.css,
            h = E.defined,
            d = E.extend,
            a = E.find,
            e = E.fireEvent,
            g = E.isNumber,
            x = E.isObject,
            C = E.objectEach,
            r = E.offset,
            q = E.pick,
            z = E.splat;
        b = (function () {
            function b(a, d) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.eventsToUnbind = [];
                this.chart = a;
                this.hasDragged = !1;
                this.options = d;
                this.init(a, d);
            }
            b.prototype.applyInactiveState = function (a) {
                var d = [],
                    c;
                (a || []).forEach(function (a) {
                    c = a.series;
                    d.push(c);
                    c.linkedParent && d.push(c.linkedParent);
                    c.linkedSeries && (d = d.concat(c.linkedSeries));
                    c.navigatorSeries && d.push(c.navigatorSeries);
                });
                this.chart.series.forEach(function (c) {
                    -1 === d.indexOf(c) ? c.setState("inactive", !0) : c.options.inactiveOtherPoints && c.setAllPointsToState("inactive");
                });
            };
            b.prototype.destroy = function () {
                var a = this;
                this.eventsToUnbind.forEach(function (a) {
                    return a();
                });
                this.eventsToUnbind = [];
                p.chartCount || (b.unbindDocumentMouseUp && (b.unbindDocumentMouseUp = b.unbindDocumentMouseUp()), b.unbindDocumentTouchEnd && (b.unbindDocumentTouchEnd = b.unbindDocumentTouchEnd()));
                clearInterval(a.tooltipTimeout);
                C(a, function (d, c) {
                    a[c] = void 0;
                });
            };
            b.prototype.drag = function (a) {
                var d = this.chart,
                    c = d.options.chart,
                    f = this.zoomHor,
                    b = this.zoomVert,
                    e = d.plotLeft,
                    g = d.plotTop,
                    m = d.plotWidth,
                    h = d.plotHeight,
                    q = this.mouseDownX || 0,
                    k = this.mouseDownY || 0,
                    r = x(c.panning) ? c.panning && c.panning.enabled : c.panning,
                    n = c.panKey && a[c.panKey + "Key"],
                    z = a.chartX,
                    t = a.chartY,
                    C = this.selectionMarker;
                if (!C || !C.touch)
                    if ((z < e ? (z = e) : z > e + m && (z = e + m), t < g ? (t = g) : t > g + h && (t = g + h), (this.hasDragged = Math.sqrt(Math.pow(q - z, 2) + Math.pow(k - t, 2))), 10 < this.hasDragged)) {
                        var p = d.isInsidePlot(q - e, k - g, { visiblePlotOnly: !0 });
                        (!d.hasCartesianSeries && !d.mapView) ||
                            (!this.zoomX && !this.zoomY) ||
                            !p ||
                            n ||
                            C ||
                            ((this.selectionMarker = C = d.renderer
                                .rect(e, g, f ? 1 : m, b ? 1 : h, 0)
                                .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                                .add()),
                            d.styledMode || C.attr({ fill: c.selectionMarkerFill || v("#335cad").setOpacity(0.25).get() }));
                        C && f && ((f = z - q), C.attr({ width: Math.abs(f), x: (0 < f ? 0 : f) + q }));
                        C && b && ((f = t - k), C.attr({ height: Math.abs(f), y: (0 < f ? 0 : f) + k }));
                        p && !C && r && d.pan(a, c.panning);
                    }
            };
            b.prototype.dragStart = function (a) {
                var d = this.chart;
                d.mouseIsDown = a.type;
                d.cancelClick = !1;
                d.mouseDownX = this.mouseDownX = a.chartX;
                d.mouseDownY = this.mouseDownY = a.chartY;
            };
            b.prototype.drop = function (a) {
                var f = this,
                    c = this.chart,
                    b = this.hasPinched;
                if (this.selectionMarker) {
                    var l = this.selectionMarker,
                        m = l.attr ? l.attr("x") : l.x,
                        q = l.attr ? l.attr("y") : l.y,
                        k = l.attr ? l.attr("width") : l.width,
                        r = l.attr ? l.attr("height") : l.height,
                        z = { originalEvent: a, xAxis: [], yAxis: [], x: m, y: q, width: k, height: r },
                        x = !!c.mapView;
                    if (this.hasDragged || b)
                        c.axes.forEach(function (c) {
                            if (c.zoomEnabled && h(c.min) && (b || f[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]]) && g(m) && g(q)) {
                                var d = c.horiz,
                                    e = "touchend" === a.type ? c.minPixelPadding : 0,
                                    l = c.toValue((d ? m : q) + e);
                                d = c.toValue((d ? m + k : q + r) - e);
                                z[c.coll].push({ axis: c, min: Math.min(l, d), max: Math.max(l, d) });
                                x = !0;
                            }
                        }),
                            x &&
                                e(c, "selection", z, function (a) {
                                    c.zoom(d(a, b ? { animation: !1 } : null));
                                });
                    g(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    b && this.scaleGroups();
                }
                c && g(c.index) && (n(c.container, { cursor: c._cursor }), (c.cancelClick = 10 < this.hasDragged), (c.mouseIsDown = this.hasDragged = this.hasPinched = !1), (this.pinchDown = []));
            };
            b.prototype.findNearestKDPoint = function (a, d, c) {
                var f = this.chart,
                    b = f.hoverPoint;
                f = f.tooltip;
                if (b && f && f.isStickyOnContact()) return b;
                var e;
                a.forEach(function (a) {
                    var f = !(a.noSharedTooltip && d) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(c, f);
                    if ((f = x(a, !0) && a.series) && !(f = !x(e, !0))) {
                        f = e.distX - a.distX;
                        var b = e.dist - a.dist,
                            l = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex);
                        f = 0 < (0 !== f && d ? f : 0 !== b ? b : 0 !== l ? l : e.series.index > a.series.index ? -1 : 1);
                    }
                    f && (e = a);
                });
                return e;
            };
            b.prototype.getChartCoordinatesFromPoint = function (a, d) {
                var c = a.series,
                    f = c.xAxis;
                c = c.yAxis;
                var b = a.shapeArgs;
                if (f && c) {
                    var e = q(a.clientX, a.plotX),
                        m = a.plotY || 0;
                    a.isNode && b && g(b.x) && g(b.y) && ((e = b.x), (m = b.y));
                    return d ? { chartX: c.len + c.pos - m, chartY: f.len + f.pos - e } : { chartX: e + f.pos, chartY: m + c.pos };
                }
                if (b && b.x && b.y) return { chartX: b.x, chartY: b.y };
            };
            b.prototype.getChartPosition = function () {
                if (this.chartPosition) return this.chartPosition;
                var a = this.chart.container,
                    d = r(a);
                this.chartPosition = { left: d.left, top: d.top, scaleX: 1, scaleY: 1 };
                var c = a.offsetWidth;
                a = a.offsetHeight;
                2 < c && 2 < a && ((this.chartPosition.scaleX = d.width / c), (this.chartPosition.scaleY = d.height / a));
                return this.chartPosition;
            };
            b.prototype.getCoordinates = function (a) {
                var d = { xAxis: [], yAxis: [] };
                this.chart.axes.forEach(function (c) {
                    d[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) });
                });
                return d;
            };
            b.prototype.getHoverData = function (d, b, c, g, l, m) {
                var f = [];
                g = !(!g || !d);
                var h = { chartX: m ? m.chartX : void 0, chartY: m ? m.chartY : void 0, shared: l };
                e(this, "beforeGetHoverData", h);
                var k =
                    b && !b.stickyTracking
                        ? [b]
                        : c.filter(function (c) {
                              return h.filter ? h.filter(c) : c.visible && !(!l && c.directTouch) && q(c.options.enableMouseTracking, !0) && c.stickyTracking;
                          });
                var u = g || !m ? d : this.findNearestKDPoint(k, l, m);
                b = u && u.series;
                u &&
                    (l && !b.noSharedTooltip
                        ? ((k = c.filter(function (c) {
                              return h.filter ? h.filter(c) : c.visible && !(!l && c.directTouch) && q(c.options.enableMouseTracking, !0) && !c.noSharedTooltip;
                          })),
                          k.forEach(function (c) {
                              var d = a(c.points, function (c) {
                                  return c.x === u.x && !c.isNull;
                              });
                              x(d) && (c.chart.isBoosting && (d = c.getPoint(d)), f.push(d));
                          }))
                        : f.push(u));
                h = { hoverPoint: u };
                e(this, "afterGetHoverData", h);
                return { hoverPoint: h.hoverPoint, hoverSeries: b, hoverPoints: f };
            };
            b.prototype.getPointFromEvent = function (a) {
                a = a.target;
                for (var d; a && !d; ) (d = a.point), (a = a.parentNode);
                return d;
            };
            b.prototype.onTrackerMouseOut = function (a) {
                a = a.relatedTarget || a.toElement;
                var d = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!d || !a || d.stickyTracking || this.inClass(a, "highcharts-tooltip") || (this.inClass(a, "highcharts-series-" + d.index) && this.inClass(a, "highcharts-tracker")))) d.onMouseOut();
            };
            b.prototype.inClass = function (a, d) {
                for (var c; a; ) {
                    if ((c = t(a, "class"))) {
                        if (-1 !== c.indexOf(d)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1;
                    }
                    a = a.parentNode;
                }
            };
            b.prototype.init = function (a, d) {
                this.options = d;
                this.chart = a;
                this.runChartClick = !(!d.chart.events || !d.chart.events.click);
                this.pinchDown = [];
                this.lastValidTouch = {};
                A && ((a.tooltip = new A(a, d.tooltip)), (this.followTouchMove = q(d.tooltip.followTouchMove, !0)));
                this.setDOMEvents();
            };
            b.prototype.normalize = function (a, b) {
                var c = a.touches,
                    f = c ? (c.length ? c.item(0) : q(c.changedTouches, a.changedTouches)[0]) : a;
                b || (b = this.getChartPosition());
                c = f.pageX - b.left;
                f = f.pageY - b.top;
                c /= b.scaleX;
                f /= b.scaleY;
                return d(a, { chartX: Math.round(c), chartY: Math.round(f) });
            };
            b.prototype.onContainerClick = function (a) {
                var f = this.chart,
                    c = f.hoverPoint;
                a = this.normalize(a);
                var b = f.plotLeft,
                    l = f.plotTop;
                f.cancelClick ||
                    (c && this.inClass(a.target, "highcharts-tracker")
                        ? (e(c.series, "click", d(a, { point: c })), f.hoverPoint && c.firePointEvent("click", a))
                        : (d(a, this.getCoordinates(a)), f.isInsidePlot(a.chartX - b, a.chartY - l, { visiblePlotOnly: !0 }) && e(f, "click", a)));
            };
            b.prototype.onContainerMouseDown = function (a) {
                var d = 1 === ((a.buttons || a.button) & 1);
                a = this.normalize(a);
                if (p.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
                if ("undefined" === typeof a.button || d) this.zoomOption(a), d && a.preventDefault && a.preventDefault(), this.dragStart(a);
            };
            b.prototype.onContainerMouseLeave = function (a) {
                var d = D[q(b.hoverChartIndex, -1)],
                    c = this.chart.tooltip;
                (c && c.shouldStickOnContact() && this.inClass(a.relatedTarget, "highcharts-tooltip-container")) ||
                    ((a = this.normalize(a)), d && (a.relatedTarget || a.toElement) && (d.pointer.reset(), (d.pointer.chartPosition = void 0)), c && !c.isHidden && this.reset());
            };
            b.prototype.onContainerMouseEnter = function (a) {
                delete this.chartPosition;
            };
            b.prototype.onContainerMouseMove = function (a) {
                var d = this.chart;
                a = this.normalize(a);
                this.setHoverChartIndex();
                a.preventDefault || (a.returnValue = !1);
                ("mousedown" === d.mouseIsDown || this.touchSelect(a)) && this.drag(a);
                d.openMenu ||
                    (!this.inClass(a.target, "highcharts-tracker") && !d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, { visiblePlotOnly: !0 })) ||
                    (this.inClass(a.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(a));
            };
            b.prototype.onDocumentTouchEnd = function (a) {
                var d = D[q(b.hoverChartIndex, -1)];
                d && d.pointer.drop(a);
            };
            b.prototype.onContainerTouchMove = function (a) {
                if (this.touchSelect(a)) this.onContainerMouseMove(a);
                else this.touch(a);
            };
            b.prototype.onContainerTouchStart = function (a) {
                if (this.touchSelect(a)) this.onContainerMouseDown(a);
                else this.zoomOption(a), this.touch(a, !0);
            };
            b.prototype.onDocumentMouseMove = function (a) {
                var d = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                var b = d.tooltip;
                !c || (b && b.isStickyOnContact()) || d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, { visiblePlotOnly: !0 }) || this.inClass(a.target, "highcharts-tracker") || this.reset();
            };
            b.prototype.onDocumentMouseUp = function (a) {
                var d = D[q(b.hoverChartIndex, -1)];
                d && d.pointer.drop(a);
            };
            b.prototype.pinch = function (a) {
                var b = this,
                    c = b.chart,
                    f = b.pinchDown,
                    l = a.touches || [],
                    g = l.length,
                    m = b.lastValidTouch,
                    h = b.hasZoom,
                    k = {},
                    r = 1 === g && ((b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick) || b.runChartClick),
                    n = {},
                    z = b.selectionMarker;
                1 < g ? (b.initiated = !0) : 1 === g && this.followTouchMove && (b.initiated = !1);
                h && b.initiated && !r && !1 !== a.cancelable && a.preventDefault();
                [].map.call(l, function (c) {
                    return b.normalize(c);
                });
                "touchstart" === a.type
                    ? ([].forEach.call(l, function (c, a) {
                          f[a] = { chartX: c.chartX, chartY: c.chartY };
                      }),
                      (m.x = [f[0].chartX, f[1] && f[1].chartX]),
                      (m.y = [f[0].chartY, f[1] && f[1].chartY]),
                      c.axes.forEach(function (a) {
                          if (a.zoomEnabled) {
                              var d = c.bounds[a.horiz ? "h" : "v"],
                                  b = a.minPixelPadding,
                                  f = a.toPixels(Math.min(q(a.options.min, a.dataMin), a.dataMin)),
                                  e = a.toPixels(Math.max(q(a.options.max, a.dataMax), a.dataMax)),
                                  l = Math.max(f, e);
                              d.min = Math.min(a.pos, Math.min(f, e) - b);
                              d.max = Math.max(a.pos + a.len, l + b);
                          }
                      }),
                      (b.res = !0))
                    : b.followTouchMove && 1 === g
                    ? this.runPointActions(b.normalize(a))
                    : f.length &&
                      (e(c, "touchpan", { originalEvent: a }, function () {
                          z || (b.selectionMarker = z = d({ destroy: B, touch: !0 }, c.plotBox));
                          b.pinchTranslate(f, l, k, z, n, m);
                          b.hasPinched = h;
                          b.scaleGroups(k, n);
                      }),
                      b.res && ((b.res = !1), this.reset(!1, 0)));
            };
            b.prototype.pinchTranslate = function (a, d, c, b, e, g) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, c, b, e, g);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, c, b, e, g);
            };
            b.prototype.pinchTranslateDirection = function (a, d, c, b, e, g, m, h) {
                var f = this.chart,
                    l = a ? "x" : "y",
                    q = a ? "X" : "Y",
                    k = "chart" + q,
                    u = a ? "width" : "height",
                    r = f["plot" + (a ? "Left" : "Top")],
                    n = f.inverted,
                    y = f.bounds[a ? "h" : "v"],
                    z = 1 === d.length,
                    x = d[0][k],
                    t = !z && d[1][k];
                d = function () {
                    "number" === typeof p && 20 < Math.abs(x - t) && (H = h || Math.abs(v - p) / Math.abs(x - t));
                    F = (r - v) / H + x;
                    C = f["plot" + (a ? "Width" : "Height")] / H;
                };
                var C,
                    F,
                    H = h || 1,
                    v = c[0][k],
                    p = !z && c[1][k];
                d();
                c = F;
                if (c < y.min) {
                    c = y.min;
                    var B = !0;
                } else c + C > y.max && ((c = y.max - C), (B = !0));
                B ? ((v -= 0.8 * (v - m[l][0])), "number" === typeof p && (p -= 0.8 * (p - m[l][1])), d()) : (m[l] = [v, p]);
                n || ((g[l] = F - r), (g[u] = C));
                g = n ? 1 / H : H;
                e[u] = C;
                e[l] = c;
                b[n ? (a ? "scaleY" : "scaleX") : "scale" + q] = H;
                b["translate" + q] = g * r + (v - g * x);
            };
            b.prototype.reset = function (a, d) {
                var c = this.chart,
                    b = c.hoverSeries,
                    f = c.hoverPoint,
                    e = c.hoverPoints,
                    g = c.tooltip,
                    m = g && g.shared ? e : f;
                a &&
                    m &&
                    z(m).forEach(function (c) {
                        c.series.isCartesian && "undefined" === typeof c.plotX && (a = !1);
                    });
                if (a)
                    g &&
                        m &&
                        z(m).length &&
                        (g.refresh(m),
                        g.shared && e
                            ? e.forEach(function (c) {
                                  c.setState(c.state, !0);
                                  c.series.isCartesian && (c.series.xAxis.crosshair && c.series.xAxis.drawCrosshair(null, c), c.series.yAxis.crosshair && c.series.yAxis.drawCrosshair(null, c));
                              })
                            : f &&
                              (f.setState(f.state, !0),
                              c.axes.forEach(function (c) {
                                  c.crosshair && f.series[c.coll] === c && c.drawCrosshair(null, f);
                              })));
                else {
                    if (f) f.onMouseOut();
                    e &&
                        e.forEach(function (c) {
                            c.setState();
                        });
                    if (b) b.onMouseOut();
                    g && g.hide(d);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    c.axes.forEach(function (c) {
                        c.hideCrosshair();
                    });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null;
                }
            };
            b.prototype.runPointActions = function (d, e) {
                var c = this.chart,
                    f = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
                    l = f ? f.shared : !1,
                    g = e || c.hoverPoint,
                    m = (g && g.series) || c.hoverSeries;
                e = this.getHoverData(g, m, c.series, (!d || "touchmove" !== d.type) && (!!e || (m && m.directTouch && this.isDirectTouch)), l, d);
                g = e.hoverPoint;
                m = e.hoverSeries;
                var h = e.hoverPoints;
                e = m && m.tooltipOptions.followPointer && !m.tooltipOptions.split;
                l = l && m && !m.noSharedTooltip;
                if (g && (g !== c.hoverPoint || (f && f.isHidden))) {
                    (c.hoverPoints || []).forEach(function (c) {
                        -1 === h.indexOf(c) && c.setState();
                    });
                    if (c.hoverSeries !== m) m.onMouseOver();
                    this.applyInactiveState(h);
                    (h || []).forEach(function (c) {
                        c.setState("hover");
                    });
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!g.series) return;
                    c.hoverPoints = h;
                    c.hoverPoint = g;
                    g.firePointEvent("mouseOver");
                    f && f.refresh(l ? h : g, d);
                } else e && f && !f.isHidden && ((g = f.getAnchor([{}], d)), c.isInsidePlot(g[0], g[1], { visiblePlotOnly: !0 }) && f.updatePosition({ plotX: g[0], plotY: g[1] }));
                this.unDocMouseMove ||
                    ((this.unDocMouseMove = k(c.container.ownerDocument, "mousemove", function (c) {
                        var a = D[b.hoverChartIndex];
                        if (a) a.pointer.onDocumentMouseMove(c);
                    })),
                    this.eventsToUnbind.push(this.unDocMouseMove));
                c.axes.forEach(function (b) {
                    var f = q((b.crosshair || {}).snap, !0),
                        e;
                    f &&
                        (((e = c.hoverPoint) && e.series[b.coll] === b) ||
                            (e = a(h, function (c) {
                                return c.series[b.coll] === b;
                            })));
                    e || !f ? b.drawCrosshair(d, e) : b.hideCrosshair();
                });
            };
            b.prototype.scaleGroups = function (a, d) {
                var c = this.chart;
                c.series.forEach(function (b) {
                    var f = a || b.getPlotBox();
                    b.group && ((b.xAxis && b.xAxis.zoomEnabled) || c.mapView) && (b.group.attr(f), b.markerGroup && (b.markerGroup.attr(f), b.markerGroup.clip(d ? c.clipRect : null)), b.dataLabelsGroup && b.dataLabelsGroup.attr(f));
                });
                c.clipRect.attr(d || c.clipBox);
            };
            b.prototype.setDOMEvents = function () {
                var a = this,
                    d = this.chart.container,
                    c = d.ownerDocument;
                d.onmousedown = this.onContainerMouseDown.bind(this);
                d.onmousemove = this.onContainerMouseMove.bind(this);
                d.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(k(d, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(k(d, "mouseleave", this.onContainerMouseLeave.bind(this)));
                b.unbindDocumentMouseUp || (b.unbindDocumentMouseUp = k(c, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var e = this.chart.renderTo.parentElement; e && "BODY" !== e.tagName; )
                    this.eventsToUnbind.push(
                        k(e, "scroll", function () {
                            delete a.chartPosition;
                        })
                    ),
                        (e = e.parentElement);
                p.hasTouch &&
                    (this.eventsToUnbind.push(k(d, "touchstart", this.onContainerTouchStart.bind(this), { passive: !1 })),
                    this.eventsToUnbind.push(k(d, "touchmove", this.onContainerTouchMove.bind(this), { passive: !1 })),
                    b.unbindDocumentTouchEnd || (b.unbindDocumentTouchEnd = k(c, "touchend", this.onDocumentTouchEnd.bind(this), { passive: !1 })));
            };
            b.prototype.setHoverChartIndex = function () {
                var a = this.chart,
                    d = p.charts[q(b.hoverChartIndex, -1)];
                if (d && d !== a) d.pointer.onContainerMouseLeave({ relatedTarget: !0 });
                (d && d.mouseIsDown) || (b.hoverChartIndex = a.index);
            };
            b.prototype.touch = function (a, d) {
                var c = this.chart,
                    b;
                this.setHoverChartIndex();
                if (1 === a.touches.length)
                    if (((a = this.normalize(a)), (b = c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, { visiblePlotOnly: !0 })) && !c.openMenu)) {
                        d && this.runPointActions(a);
                        if ("touchmove" === a.type) {
                            d = this.pinchDown;
                            var f = d[0] ? 4 <= Math.sqrt(Math.pow(d[0].chartX - a.chartX, 2) + Math.pow(d[0].chartY - a.chartY, 2)) : !1;
                        }
                        q(f, !0) && this.pinch(a);
                    } else d && this.reset();
                else 2 === a.touches.length && this.pinch(a);
            };
            b.prototype.touchSelect = function (a) {
                return !(!this.chart.options.chart.zoomBySingleTouch || !a.touches || 1 !== a.touches.length);
            };
            b.prototype.zoomOption = function (a) {
                var d = this.chart,
                    c = d.options.chart;
                d = d.inverted;
                var b = c.zoomType || "";
                /touch/.test(a.type) && (b = q(c.pinchType, b));
                this.zoomX = a = /x/.test(b);
                this.zoomY = c = /y/.test(b);
                this.zoomHor = (a && !d) || (c && d);
                this.zoomVert = (c && !d) || (a && d);
                this.hasZoom = a || c;
            };
            return b;
        })();
        ("");
        return b;
    });
    G(b, "Core/MSPointer.js", [b["Core/Globals.js"], b["Core/Pointer.js"], b["Core/Utilities.js"]], function (b, p, A) {
        function v() {
            var d = [];
            d.item = function (a) {
                return this[a];
            };
            a(g, function (a) {
                d.push({ pageX: a.pageX, pageY: a.pageY, target: a.target });
            });
            return d;
        }
        function w(a, d, b, e) {
            var g = B[p.hoverChartIndex || NaN];
            ("touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH) || !g || ((g = g.pointer), e(a), g[d]({ type: b, target: a.currentTarget, preventDefault: t, touches: v() }));
        }
        var D =
                (this && this.__extends) ||
                (function () {
                    var a = function (d, b) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                            };
                        return a(d, b);
                    };
                    return function (d, b) {
                        function e() {
                            this.constructor = d;
                        }
                        a(d, b);
                        d.prototype = null === b ? Object.create(b) : ((e.prototype = b.prototype), new e());
                    };
                })(),
            B = b.charts,
            k = b.doc,
            t = b.noop,
            n = b.win,
            h = A.addEvent,
            d = A.css,
            a = A.objectEach,
            e = A.removeEvent,
            g = {},
            x = !!n.PointerEvent;
        return (function (a) {
            function r() {
                return (null !== a && a.apply(this, arguments)) || this;
            }
            D(r, a);
            r.isRequired = function () {
                return !(b.hasTouch || (!n.PointerEvent && !n.MSPointerEvent));
            };
            r.prototype.batchMSEvents = function (a) {
                a(this.chart.container, x ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                a(this.chart.container, x ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(k, x ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
            };
            r.prototype.destroy = function () {
                this.batchMSEvents(e);
                a.prototype.destroy.call(this);
            };
            r.prototype.init = function (b, e) {
                a.prototype.init.call(this, b, e);
                this.hasZoom && d(b.container, { "-ms-touch-action": "none", "touch-action": "none" });
            };
            r.prototype.onContainerPointerDown = function (a) {
                w(a, "onContainerTouchStart", "touchstart", function (a) {
                    g[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget };
                });
            };
            r.prototype.onContainerPointerMove = function (a) {
                w(a, "onContainerTouchMove", "touchmove", function (a) {
                    g[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
                    g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget);
                });
            };
            r.prototype.onDocumentPointerUp = function (a) {
                w(a, "onDocumentTouchEnd", "touchend", function (a) {
                    delete g[a.pointerId];
                });
            };
            r.prototype.setDOMEvents = function () {
                a.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(h);
            };
            return r;
        })(p);
    });
    G(b, "Core/Legend/Legend.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Series/Point.js"], b["Core/Renderer/RendererUtilities.js"], b["Core/Utilities.js"]], function (
        b,
        p,
        A,
        E,
        w,
        D
    ) {
        var v = b.animObject,
            k = b.setAnimation,
            t = p.format;
        b = A.isFirefox;
        var n = A.marginNames;
        A = A.win;
        var h = w.distribute,
            d = D.addEvent,
            a = D.createElement,
            e = D.css,
            g = D.defined,
            x = D.discardElement,
            C = D.find,
            r = D.fireEvent,
            q = D.isNumber,
            z = D.merge,
            m = D.pick,
            f = D.relativeLength,
            y = D.stableSort,
            c = D.syncTimeout;
        w = D.wrap;
        D = (function () {
            function b(c, a) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = c;
                this.init(c, a);
            }
            b.prototype.init = function (c, a) {
                this.chart = c;
                this.setOptions(a);
                a.enabled &&
                    (this.render(),
                    d(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes();
                    }),
                    this.proximate
                        ? (this.unchartrender = d(this.chart, "render", function () {
                              this.legend.proximatePositions();
                              this.legend.positionItems();
                          }))
                        : this.unchartrender && this.unchartrender());
            };
            b.prototype.setOptions = function (c) {
                var a = m(c.padding, 8);
                this.options = c;
                this.chart.styledMode || ((this.itemStyle = c.itemStyle), (this.itemHiddenStyle = z(this.itemStyle, c.itemHiddenStyle)));
                this.itemMarginTop = c.itemMarginTop || 0;
                this.itemMarginBottom = c.itemMarginBottom || 0;
                this.padding = a;
                this.initialItemY = a - 5;
                this.symbolWidth = m(c.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === c.layout && !this.chart.inverted;
                this.baseline = void 0;
            };
            b.prototype.update = function (c, a) {
                var d = this.chart;
                this.setOptions(z(!0, this.options, c));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                m(a, !0) && d.redraw();
                r(this, "afterUpdate");
            };
            b.prototype.colorizeItem = function (c, a) {
                c.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var d = this.options,
                        b = c.legendItem,
                        f = c.legendLine,
                        e = c.legendSymbol,
                        g = this.itemHiddenStyle.color;
                    d = a ? d.itemStyle.color : g;
                    var l = a ? c.color || g : g,
                        m = c.options && c.options.marker,
                        h = { fill: l };
                    b && b.css({ fill: d, color: d });
                    f && f.attr({ stroke: l });
                    e && (m && e.isMarker && ((h = c.pointAttribs()), a || (h.stroke = h.fill = g)), e.attr(h));
                }
                r(this, "afterColorizeItem", { item: c, visible: a });
            };
            b.prototype.positionItems = function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes();
            };
            b.prototype.positionItem = function (c) {
                var a = this,
                    d = this.options,
                    b = d.symbolPadding,
                    f = !d.rtl,
                    e = c._legendItemPos;
                d = e[0];
                e = e[1];
                var l = c.checkbox,
                    m = c.legendGroup;
                m &&
                    m.element &&
                    ((b = { translateX: f ? d : this.legendWidth - d - 2 * b - 4, translateY: e }),
                    (f = function () {
                        r(a, "afterPositionItem", { item: c });
                    }),
                    g(m.translateY) ? m.animate(b, void 0, f) : (m.attr(b), f()));
                l && ((l.x = d), (l.y = e));
            };
            b.prototype.destroyItem = function (c) {
                var a = c.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (a) {
                    c[a] && (c[a] = c[a].destroy());
                });
                a && x(c.checkbox);
            };
            b.prototype.destroy = function () {
                function c(c) {
                    this[c] && (this[c] = this[c].destroy());
                }
                this.getAllItems().forEach(function (a) {
                    ["legendItem", "legendGroup"].forEach(c, a);
                });
                "clipRect up down pager nav box title group".split(" ").forEach(c, this);
                this.display = null;
            };
            b.prototype.positionCheckboxes = function () {
                var c = this.group && this.group.alignAttr,
                    a = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                if (c) {
                    var b = c.translateY;
                    this.allItems.forEach(function (f) {
                        var g = f.checkbox;
                        if (g) {
                            var l = b + d + g.y + (this.scrollOffset || 0) + 3;
                            e(g, { left: c.translateX + f.checkboxOffset + g.x - 20 + "px", top: l + "px", display: this.proximate || (l > b - 6 && l < b + a - 6) ? "" : "none" });
                        }
                    }, this);
                }
            };
            b.prototype.renderTitle = function () {
                var c = this.options,
                    a = this.padding,
                    d = c.title,
                    b = 0;
                d.text &&
                    (this.title ||
                        ((this.title = this.chart.renderer.label(d.text, a - 3, a - 4, null, null, null, c.useHTML, null, "legend-title").attr({ zIndex: 1 })), this.chart.styledMode || this.title.css(d.style), this.title.add(this.group)),
                    d.width || this.title.css({ width: this.maxLegendWidth + "px" }),
                    (c = this.title.getBBox()),
                    (b = c.height),
                    (this.offsetWidth = c.width),
                    this.contentGroup.attr({ translateY: b }));
                this.titleHeight = b;
            };
            b.prototype.setText = function (c) {
                var a = this.options;
                c.legendItem.attr({ text: a.labelFormat ? t(a.labelFormat, c, this.chart) : a.labelFormatter.call(c) });
            };
            b.prototype.renderItem = function (c) {
                var a = this.chart,
                    d = a.renderer,
                    b = this.options,
                    f = this.symbolWidth,
                    e = b.symbolPadding || 0,
                    g = this.itemStyle,
                    l = this.itemHiddenStyle,
                    h = "horizontal" === b.layout ? m(b.itemDistance, 20) : 0,
                    k = !b.rtl,
                    q = !c.series,
                    r = !q && c.series.drawLegendSymbol ? c.series : c,
                    n = r.options,
                    u = this.createCheckboxForItem && n && n.showCheckbox,
                    y = b.useHTML,
                    x = c.options.className,
                    t = c.legendItem;
                n = f + e + h + (u ? 20 : 0);
                t ||
                    ((c.legendGroup = d
                        .g("legend-item")
                        .addClass("highcharts-" + r.type + "-series highcharts-color-" + c.colorIndex + (x ? " " + x : "") + (q ? " highcharts-series-" + c.index : ""))
                        .attr({ zIndex: 1 })
                        .add(this.scrollGroup)),
                    (c.legendItem = t = d.text("", k ? f + e : -e, this.baseline || 0, y)),
                    a.styledMode || t.css(z(c.visible ? g : l)),
                    t.attr({ align: k ? "left" : "right", zIndex: 2 }).add(c.legendGroup),
                    this.baseline ||
                        ((this.fontMetrics = d.fontMetrics(a.styledMode ? 12 : g.fontSize, t)),
                        (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
                        t.attr("y", this.baseline),
                        (this.symbolHeight = b.symbolHeight || this.fontMetrics.f),
                        b.squareSymbol && ((this.symbolWidth = m(b.symbolWidth, Math.max(this.symbolHeight, 16))), (n = this.symbolWidth + e + h + (u ? 20 : 0)), k && t.attr("x", this.symbolWidth + e))),
                    r.drawLegendSymbol(this, c),
                    this.setItemEvents && this.setItemEvents(c, t, y));
                u && !c.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(c);
                this.colorizeItem(c, c.visible);
                (!a.styledMode && g.width) || t.css({ width: (b.itemWidth || this.widthOption || a.spacingBox.width) - n + "px" });
                this.setText(c);
                a = t.getBBox();
                d = (this.fontMetrics && this.fontMetrics.h) || 0;
                c.itemWidth = c.checkboxOffset = b.itemWidth || c.legendItemWidth || a.width + n;
                this.maxItemWidth = Math.max(this.maxItemWidth, c.itemWidth);
                this.totalItemWidth += c.itemWidth;
                this.itemHeight = c.itemHeight = Math.round(c.legendItemHeight || (a.height > 1.5 * d ? a.height : d));
            };
            b.prototype.layoutItem = function (c) {
                var a = this.options,
                    d = this.padding,
                    b = "horizontal" === a.layout,
                    f = c.itemHeight,
                    e = this.itemMarginBottom,
                    g = this.itemMarginTop,
                    l = b ? m(a.itemDistance, 20) : 0,
                    h = this.maxLegendWidth;
                a = a.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : c.itemWidth;
                b && this.itemX - d + a > h && ((this.itemX = d), this.lastLineHeight && (this.itemY += g + this.lastLineHeight + e), (this.lastLineHeight = 0));
                this.lastItemY = g + this.itemY + e;
                this.lastLineHeight = Math.max(f, this.lastLineHeight);
                c._legendItemPos = [this.itemX, this.itemY];
                b ? (this.itemX += a) : ((this.itemY += g + f + e), (this.lastLineHeight = f));
                this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - d - (c.checkbox ? 0 : l) : a) + d, this.offsetWidth);
            };
            b.prototype.getAllItems = function () {
                var c = [];
                this.chart.series.forEach(function (a) {
                    var d = a && a.options;
                    a && m(d.showInLegend, g(d.linkedTo) ? !1 : void 0, !0) && (c = c.concat(a.legendItems || ("point" === d.legendType ? a.data : a)));
                });
                r(this, "afterGetAllItems", { allItems: c });
                return c;
            };
            b.prototype.getAlignment = function () {
                var c = this.options;
                return this.proximate ? c.align.charAt(0) + "tv" : c.floating ? "" : c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0);
            };
            b.prototype.adjustMargins = function (c, a) {
                var d = this.chart,
                    b = this.options,
                    f = this.getAlignment();
                f &&
                    [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (e, l) {
                        e.test(f) && !g(c[l]) && (d[n[l]] = Math.max(d[n[l]], d.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * b[l % 2 ? "x" : "y"] + m(b.margin, 12) + a[l] + (d.titleOffset[l] || 0)));
                    });
            };
            b.prototype.proximatePositions = function () {
                var c = this.chart,
                    a = [],
                    d = "left" === this.options.align;
                this.allItems.forEach(function (b) {
                    var f;
                    var e = d;
                    if (b.yAxis) {
                        b.xAxis.options.reversed && (e = !e);
                        b.points &&
                            (f = C(e ? b.points : b.points.slice(0).reverse(), function (c) {
                                return q(c.plotY);
                            }));
                        e = this.itemMarginTop + b.legendItem.getBBox().height + this.itemMarginBottom;
                        var g = b.yAxis.top - c.plotTop;
                        b.visible ? ((f = f ? f.plotY : b.yAxis.height), (f += g - 0.3 * e)) : (f = g + b.yAxis.height);
                        a.push({ target: f, size: e, item: b });
                    }
                }, this);
                h(a, c.plotHeight).forEach(function (a) {
                    a.item._legendItemPos && (a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos);
                });
            };
            b.prototype.render = function () {
                var c = this.chart,
                    a = c.renderer,
                    d = this.options,
                    b = this.padding,
                    e = this.getAllItems(),
                    g = this.group,
                    m = this.box;
                this.itemX = b;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = f(d.width, c.spacingBox.width - b);
                var h = c.spacingBox.width - 2 * b - d.x;
                -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (h /= 2);
                this.maxLegendWidth = this.widthOption || h;
                g ||
                    ((this.group = g = a
                        .g("legend")
                        .addClass(d.className || "")
                        .attr({ zIndex: 7 })
                        .add()),
                    (this.contentGroup = a.g().attr({ zIndex: 1 }).add(g)),
                    (this.scrollGroup = a.g().add(this.contentGroup)));
                this.renderTitle();
                y(e, function (c, a) {
                    return ((c.options && c.options.legendIndex) || 0) - ((a.options && a.options.legendIndex) || 0);
                });
                d.reversed && e.reverse();
                this.allItems = e;
                this.display = h = !!e.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                e.forEach(this.renderItem, this);
                e.forEach(this.layoutItem, this);
                e = (this.widthOption || this.offsetWidth) + b;
                var k = this.lastItemY + this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += b;
                m || ((this.box = m = a.rect().addClass("highcharts-legend-box").attr({ r: d.borderRadius }).add(g)), (m.isNew = !0));
                c.styledMode || m.attr({ stroke: d.borderColor, "stroke-width": d.borderWidth || 0, fill: d.backgroundColor || "none" }).shadow(d.shadow);
                0 < e && 0 < k && (m[m.isNew ? "attr" : "animate"](m.crisp.call({}, { x: 0, y: 0, width: e, height: k }, m.strokeWidth())), (m.isNew = !1));
                m[h ? "show" : "hide"]();
                c.styledMode && "none" === g.getStyle("display") && (e = k = 0);
                this.legendWidth = e;
                this.legendHeight = k;
                h && this.align();
                this.proximate || this.positionItems();
                r(this, "afterRender");
            };
            b.prototype.align = function (c) {
                void 0 === c && (c = this.chart.spacingBox);
                var a = this.chart,
                    d = this.options,
                    b = c.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? (b += a.titleOffset[0]) : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (b -= a.titleOffset[2]);
                b !== c.y && (c = z(c, { y: b }));
                this.group.align(z(d, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : d.verticalAlign }), !0, c);
            };
            b.prototype.handleOverflow = function (c) {
                var a = this,
                    d = this.chart,
                    b = d.renderer,
                    f = this.options,
                    e = f.y,
                    g = "top" === f.verticalAlign,
                    l = this.padding,
                    h = f.maxHeight,
                    k = f.navigation,
                    q = m(k.animation, !0),
                    r = k.arrowSize || 12,
                    n = this.pages,
                    u = this.allItems,
                    y = function (c) {
                        "number" === typeof c ? v.attr({ height: c }) : v && ((a.clipRect = v.destroy()), a.contentGroup.clip());
                        a.contentGroup.div && (a.contentGroup.div.style.clip = c ? "rect(" + l + "px,9999px," + (l + c) + "px,0)" : "auto");
                    },
                    z = function (c) {
                        a[c] = b
                            .circle(0, 0, 1.3 * r)
                            .translate(r / 2, r / 2)
                            .add(C);
                        d.styledMode || a[c].attr("fill", "rgba(0,0,0,0.0001)");
                        return a[c];
                    },
                    x,
                    t;
                e = d.spacingBox.height + (g ? -e : e) - l;
                var C = this.nav,
                    v = this.clipRect;
                "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (e /= 2);
                h && (e = Math.min(e, h));
                n.length = 0;
                c && 0 < e && c > e && !1 !== k.enabled
                    ? ((this.clipHeight = x = Math.max(e - 20 - this.titleHeight - l, 0)),
                      (this.currentPage = m(this.currentPage, 1)),
                      (this.fullHeight = c),
                      u.forEach(function (c, a) {
                          var d = c._legendItemPos[1],
                              b = Math.round(c.legendItem.getBBox().height),
                              f = n.length;
                          if (!f || (d - n[f - 1] > x && (t || d) !== n[f - 1])) n.push(t || d), f++;
                          c.pageIx = f - 1;
                          t && (u[a - 1].pageIx = f - 1);
                          a === u.length - 1 && d + b - n[f - 1] > x && b <= x && (n.push(d), (c.pageIx = f));
                          d !== t && (t = d);
                      }),
                      v || ((v = a.clipRect = b.clipRect(0, l, 9999, 0)), a.contentGroup.clip(v)),
                      y(x),
                      C ||
                          ((this.nav = C = b.g().attr({ zIndex: 1 }).add(this.group)),
                          (this.up = b.symbol("triangle", 0, 0, r, r).add(C)),
                          z("upTracker").on("click", function () {
                              a.scroll(-1, q);
                          }),
                          (this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation")),
                          d.styledMode || this.pager.css(k.style),
                          this.pager.add(C),
                          (this.down = b.symbol("triangle-down", 0, 0, r, r).add(C)),
                          z("downTracker").on("click", function () {
                              a.scroll(1, q);
                          })),
                      a.scroll(0),
                      (c = e))
                    : C && (y(), (this.nav = C.destroy()), this.scrollGroup.attr({ translateY: 1 }), (this.clipHeight = 0));
                return c;
            };
            b.prototype.scroll = function (a, d) {
                var b = this,
                    f = this.chart,
                    e = this.pages,
                    g = e.length,
                    l = this.clipHeight,
                    h = this.options.navigation,
                    q = this.pager,
                    n = this.padding,
                    u = this.currentPage + a;
                u > g && (u = g);
                0 < u &&
                    ("undefined" !== typeof d && k(d, f),
                    this.nav.attr({ translateX: n, translateY: l + this.padding + 7 + this.titleHeight, visibility: "visible" }),
                    [this.up, this.upTracker].forEach(function (c) {
                        c.attr({ class: 1 === u ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
                    }),
                    q.attr({ text: u + "/" + g }),
                    [this.down, this.downTracker].forEach(function (c) {
                        c.attr({ x: 18 + this.pager.getBBox().width, class: u === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
                    }, this),
                    f.styledMode ||
                        (this.up.attr({ fill: 1 === u ? h.inactiveColor : h.activeColor }),
                        this.upTracker.css({ cursor: 1 === u ? "default" : "pointer" }),
                        this.down.attr({ fill: u === g ? h.inactiveColor : h.activeColor }),
                        this.downTracker.css({ cursor: u === g ? "default" : "pointer" })),
                    (this.scrollOffset = -e[u - 1] + this.initialItemY),
                    this.scrollGroup.animate({ translateY: this.scrollOffset }),
                    (this.currentPage = u),
                    this.positionCheckboxes(),
                    (a = v(m(d, f.renderer.globalAnimation, !0))),
                    c(function () {
                        r(b, "afterScroll", { currentPage: u });
                    }, a.duration));
            };
            b.prototype.setItemEvents = function (c, a, d) {
                var b = this,
                    f = b.chart.renderer.boxWrapper,
                    e = c instanceof E,
                    g = "highcharts-legend-" + (e ? "point" : "series") + "-active",
                    l = b.chart.styledMode,
                    m = function (a) {
                        b.allItems.forEach(function (d) {
                            c !== d &&
                                [d].concat(d.linkedSeries || []).forEach(function (c) {
                                    c.setState(a, !e);
                                });
                        });
                    };
                (d ? [a, c.legendSymbol] : [c.legendGroup]).forEach(function (d) {
                    if (d)
                        d.on("mouseover", function () {
                            c.visible && m("inactive");
                            c.setState("hover");
                            c.visible && f.addClass(g);
                            l || a.css(b.options.itemHoverStyle);
                        })
                            .on("mouseout", function () {
                                b.chart.styledMode || a.css(z(c.visible ? b.itemStyle : b.itemHiddenStyle));
                                m("");
                                f.removeClass(g);
                                c.setState();
                            })
                            .on("click", function (a) {
                                var d = function () {
                                    c.setVisible && c.setVisible();
                                    m(c.visible ? "inactive" : "");
                                };
                                f.removeClass(g);
                                a = { browserEvent: a };
                                c.firePointEvent ? c.firePointEvent("legendItemClick", a, d) : r(c, "legendItemClick", a, d);
                            });
                });
            };
            b.prototype.createCheckboxForItem = function (c) {
                c.checkbox = a("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: c.selected, defaultChecked: c.selected }, this.options.itemCheckboxStyle, this.chart.container);
                d(c.checkbox, "click", function (a) {
                    r(c.series || c, "checkboxClick", { checked: a.target.checked, item: c }, function () {
                        c.select();
                    });
                });
            };
            return b;
        })();
        (/Trident\/7\.0/.test(A.navigator && A.navigator.userAgent) || b) &&
            w(D.prototype, "positionItem", function (c, a) {
                var d = this,
                    b = function () {
                        a._legendItemPos && c.call(d, a);
                    };
                b();
                d.bubbleLegend || setTimeout(b);
            });
        ("");
        return D;
    });
    G(b, "Core/Series/SeriesRegistry.js", [b["Core/Globals.js"], b["Core/DefaultOptions.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v = p.defaultOptions,
            D = E.error,
            B = E.extendClass,
            k = E.merge,
            t;
        (function (n) {
            function h(d, a) {
                var b = v.plotOptions || {},
                    g = a.defaultOptions;
                a.prototype.pointClass || (a.prototype.pointClass = A);
                a.prototype.type = d;
                g && (b[d] = g);
                n.seriesTypes[d] = a;
            }
            n.seriesTypes = b.seriesTypes;
            n.getSeries = function (d, a) {
                void 0 === a && (a = {});
                var b = d.options.chart;
                b = a.type || b.type || b.defaultSeriesType || "";
                var g = n.seriesTypes[b];
                n || D(17, !0, d, { missingModuleFor: b });
                b = new g();
                "function" === typeof b.init && b.init(d, a);
                return b;
            };
            n.registerSeriesType = h;
            n.seriesType = function (d, a, b, g, x) {
                var e = v.plotOptions || {};
                a = a || "";
                e[d] = k(e[a], b);
                h(d, B(n.seriesTypes[a] || function () {}, g));
                n.seriesTypes[d].prototype.type = d;
                x && (n.seriesTypes[d].prototype.pointClass = B(A, x));
                return n.seriesTypes[d];
            };
        })(t || (t = {}));
        return t;
    });
    G(
        b,
        "Core/Chart/Chart.js",
        [
            b["Core/Animation/AnimationUtilities.js"],
            b["Core/Axis/Axis.js"],
            b["Core/FormatUtilities.js"],
            b["Core/Foundation.js"],
            b["Core/Globals.js"],
            b["Core/Legend/Legend.js"],
            b["Core/MSPointer.js"],
            b["Core/DefaultOptions.js"],
            b["Core/Pointer.js"],
            b["Core/Renderer/RendererRegistry.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Core/Renderer/SVG/SVGRenderer.js"],
            b["Core/Time.js"],
            b["Core/Utilities.js"],
            b["Core/Renderer/HTML/AST.js"],
        ],
        function (b, p, A, E, w, D, B, k, t, n, h, d, a, e, g) {
            var x = b.animate,
                C = b.animObject,
                r = b.setAnimation,
                q = A.numberFormat,
                z = E.registerEventOptions,
                m = w.charts,
                f = w.doc,
                y = w.marginNames,
                c = w.svg,
                u = w.win,
                l = k.defaultOptions,
                v = k.defaultTime,
                K = h.seriesTypes,
                H = e.addEvent,
                I = e.attr,
                Z = e.cleanRecursively,
                Q = e.createElement,
                O = e.css,
                R = e.defined,
                T = e.discardElement,
                G = e.erase,
                J = e.error,
                ba = e.extend,
                ha = e.find,
                L = e.fireEvent,
                W = e.getStyle,
                M = e.isArray,
                X = e.isNumber,
                P = e.isObject,
                U = e.isString,
                S = e.merge,
                V = e.objectEach,
                N = e.pick,
                ca = e.pInt,
                ea = e.relativeLength,
                ia = e.removeEvent,
                aa = e.splat,
                fa = e.syncTimeout,
                ja = e.uniqueKey;
            b = (function () {
                function b(c, a, d) {
                    this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                    this.sharedClips = {};
                    this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                    this.getArgs(c, a, d);
                }
                b.chart = function (c, a, d) {
                    return new b(c, a, d);
                };
                b.prototype.getArgs = function (c, a, d) {
                    U(c) || c.nodeName ? ((this.renderTo = c), this.init(a, d)) : this.init(c, a);
                };
                b.prototype.init = function (c, d) {
                    var b = c.plotOptions || {};
                    L(this, "init", { args: arguments }, function () {
                        var f = S(l, c),
                            e = f.chart;
                        V(f.plotOptions, function (c, a) {
                            P(c) && (c.tooltip = (b[a] && S(b[a].tooltip)) || void 0);
                        });
                        f.tooltip.userOptions = (c.chart && c.chart.forExport && c.tooltip.userOptions) || c.tooltip;
                        this.userOptions = c;
                        this.margin = [];
                        this.spacing = [];
                        this.bounds = { h: {}, v: {} };
                        this.labelCollectors = [];
                        this.callback = d;
                        this.isResizing = 0;
                        this.options = f;
                        this.axes = [];
                        this.series = [];
                        this.time = c.time && Object.keys(c.time).length ? new a(c.time) : w.time;
                        this.numberFormatter = e.numberFormatter || q;
                        this.styledMode = e.styledMode;
                        this.hasCartesianSeries = e.showAxes;
                        this.index = m.length;
                        m.push(this);
                        w.chartCount++;
                        z(this, e);
                        this.xAxis = [];
                        this.yAxis = [];
                        this.pointCount = this.colorCounter = this.symbolCounter = 0;
                        L(this, "afterInit");
                        this.firstRender();
                    });
                };
                b.prototype.initSeries = function (c) {
                    var a = this.options.chart;
                    a = c.type || a.type || a.defaultSeriesType;
                    var d = K[a];
                    d || J(17, !0, this, { missingModuleFor: a });
                    a = new d();
                    "function" === typeof a.init && a.init(this, c);
                    return a;
                };
                b.prototype.setSeriesData = function () {
                    this.getSeriesOrderByLinks().forEach(function (c) {
                        c.points || c.data || !c.enabledDataSorting || c.setData(c.options.data, !1);
                    });
                };
                b.prototype.getSeriesOrderByLinks = function () {
                    return this.series.concat().sort(function (c, a) {
                        return c.linkedSeries.length || a.linkedSeries.length ? a.linkedSeries.length - c.linkedSeries.length : 0;
                    });
                };
                b.prototype.orderSeries = function (c) {
                    var a = this.series;
                    c = c || 0;
                    for (var d = a.length; c < d; ++c) a[c] && ((a[c].index = c), (a[c].name = a[c].getName()));
                };
                b.prototype.isInsidePlot = function (c, a, d) {
                    void 0 === d && (d = {});
                    var b = this.inverted,
                        f = this.plotBox,
                        e = this.plotLeft,
                        g = this.plotTop,
                        m = this.scrollablePlotBox,
                        l = 0;
                    var h = 0;
                    d.visiblePlotOnly && this.scrollingContainer && ((h = this.scrollingContainer), (l = h.scrollLeft), (h = h.scrollTop));
                    var k = d.series;
                    f = (d.visiblePlotOnly && m) || f;
                    m = d.inverted ? a : c;
                    a = d.inverted ? c : a;
                    c = { x: m, y: a, isInsidePlot: !0 };
                    if (!d.ignoreX) {
                        var q = (k && (b ? k.yAxis : k.xAxis)) || { pos: e, len: Infinity };
                        m = d.paneCoordinates ? q.pos + m : e + m;
                        (m >= Math.max(l + e, q.pos) && m <= Math.min(l + e + f.width, q.pos + q.len)) || (c.isInsidePlot = !1);
                    }
                    !d.ignoreY &&
                        c.isInsidePlot &&
                        ((b = (k && (b ? k.xAxis : k.yAxis)) || { pos: g, len: Infinity }),
                        (d = d.paneCoordinates ? b.pos + a : g + a),
                        (d >= Math.max(h + g, b.pos) && d <= Math.min(h + g + f.height, b.pos + b.len)) || (c.isInsidePlot = !1));
                    L(this, "afterIsInsidePlot", c);
                    return c.isInsidePlot;
                };
                b.prototype.redraw = function (c) {
                    L(this, "beforeRedraw");
                    var a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                        d = this.series,
                        b = this.pointer,
                        f = this.legend,
                        e = this.userOptions.legend,
                        g = this.renderer,
                        m = g.isHidden(),
                        l = [],
                        h = this.isDirtyBox,
                        k = this.isDirtyLegend;
                    this.setResponsive && this.setResponsive(!1);
                    r(this.hasRendered ? c : !1, this);
                    m && this.temporaryDisplay();
                    this.layOutTitles();
                    for (c = d.length; c--; ) {
                        var q = d[c];
                        if (q.options.stacking || q.options.centerInCategory) {
                            var n = !0;
                            if (q.isDirty) {
                                var u = !0;
                                break;
                            }
                        }
                    }
                    if (u) for (c = d.length; c--; ) (q = d[c]), q.options.stacking && (q.isDirty = !0);
                    d.forEach(function (c) {
                        c.isDirty && ("point" === c.options.legendType ? ("function" === typeof c.updateTotals && c.updateTotals(), (k = !0)) : e && (e.labelFormatter || e.labelFormat) && (k = !0));
                        c.isDirtyData && L(c, "updatedData");
                    });
                    k && f && f.options.enabled && (f.render(), (this.isDirtyLegend = !1));
                    n && this.getStacks();
                    a.forEach(function (c) {
                        c.updateNames();
                        c.setScale();
                    });
                    this.getMargins();
                    a.forEach(function (c) {
                        c.isDirty && (h = !0);
                    });
                    a.forEach(function (c) {
                        var a = c.min + "," + c.max;
                        c.extKey !== a &&
                            ((c.extKey = a),
                            l.push(function () {
                                L(c, "afterSetExtremes", ba(c.eventArgs, c.getExtremes()));
                                delete c.eventArgs;
                            }));
                        (h || n) && c.redraw();
                    });
                    h && this.drawChartBox();
                    L(this, "predraw");
                    d.forEach(function (c) {
                        (h || c.isDirty) && c.visible && c.redraw();
                        c.isDirtyData = !1;
                    });
                    b && b.reset(!0);
                    g.draw();
                    L(this, "redraw");
                    L(this, "render");
                    m && this.temporaryDisplay(!0);
                    l.forEach(function (c) {
                        c.call();
                    });
                };
                b.prototype.get = function (c) {
                    function a(a) {
                        return a.id === c || (a.options && a.options.id === c);
                    }
                    for (var d = this.series, b = ha(this.axes, a) || ha(this.series, a), f = 0; !b && f < d.length; f++) b = ha(d[f].points || [], a);
                    return b;
                };
                b.prototype.getAxes = function () {
                    var c = this,
                        a = this.options,
                        d = (a.xAxis = aa(a.xAxis || {}));
                    a = a.yAxis = aa(a.yAxis || {});
                    L(this, "getAxes");
                    d.forEach(function (c, a) {
                        c.index = a;
                        c.isX = !0;
                    });
                    a.forEach(function (c, a) {
                        c.index = a;
                    });
                    d.concat(a).forEach(function (a) {
                        new p(c, a);
                    });
                    L(this, "afterGetAxes");
                };
                b.prototype.getSelectedPoints = function () {
                    return this.series.reduce(function (c, a) {
                        a.getPointsCollection().forEach(function (a) {
                            N(a.selectedStaging, a.selected) && c.push(a);
                        });
                        return c;
                    }, []);
                };
                b.prototype.getSelectedSeries = function () {
                    return this.series.filter(function (c) {
                        return c.selected;
                    });
                };
                b.prototype.setTitle = function (c, a, d) {
                    this.applyDescription("title", c);
                    this.applyDescription("subtitle", a);
                    this.applyDescription("caption", void 0);
                    this.layOutTitles(d);
                };
                b.prototype.applyDescription = function (c, a) {
                    var d = this,
                        b = "title" === c ? { color: "#333333", fontSize: this.options.isStock ? "16px" : "18px" } : { color: "#666666" };
                    b = this.options[c] = S(!this.styledMode && { style: b }, this.options[c], a);
                    var f = this[c];
                    f && a && (this[c] = f = f.destroy());
                    b &&
                        !f &&
                        ((f = this.renderer
                            .text(b.text, 0, 0, b.useHTML)
                            .attr({ align: b.align, class: "highcharts-" + c, zIndex: b.zIndex || 4 })
                            .add()),
                        (f.update = function (a) {
                            d[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[c]](a);
                        }),
                        this.styledMode || f.css(b.style),
                        (this[c] = f));
                };
                b.prototype.layOutTitles = function (c) {
                    var a = [0, 0, 0],
                        d = this.renderer,
                        b = this.spacingBox;
                    ["title", "subtitle", "caption"].forEach(function (c) {
                        var f = this[c],
                            e = this.options[c],
                            g = e.verticalAlign || "top";
                        c = "title" === c ? ("top" === g ? -3 : 0) : "top" === g ? a[0] + 2 : 0;
                        var m;
                        if (f) {
                            this.styledMode || (m = e.style && e.style.fontSize);
                            m = d.fontMetrics(m, f).b;
                            f.css({ width: (e.width || b.width + (e.widthAdjust || 0)) + "px" });
                            var l = Math.round(f.getBBox(e.useHTML).height);
                            f.align(ba({ y: "bottom" === g ? m : c + m, height: l }, e), !1, "spacingBox");
                            e.floating || ("top" === g ? (a[0] = Math.ceil(a[0] + l)) : "bottom" === g && (a[2] = Math.ceil(a[2] + l)));
                        }
                    }, this);
                    a[0] && "top" === (this.options.title.verticalAlign || "top") && (a[0] += this.options.title.margin);
                    a[2] && "bottom" === this.options.caption.verticalAlign && (a[2] += this.options.caption.margin);
                    var f = !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
                    this.titleOffset = a;
                    L(this, "afterLayOutTitles");
                    !this.isDirtyBox && f && ((this.isDirtyBox = this.isDirtyLegend = f), this.hasRendered && N(c, !0) && this.isDirtyBox && this.redraw());
                };
                b.prototype.getChartSize = function () {
                    var c = this.options.chart,
                        a = c.width;
                    c = c.height;
                    var d = this.renderTo;
                    R(a) || (this.containerWidth = W(d, "width"));
                    R(c) || (this.containerHeight = W(d, "height"));
                    this.chartWidth = Math.max(0, a || this.containerWidth || 600);
                    this.chartHeight = Math.max(0, ea(c, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400));
                };
                b.prototype.temporaryDisplay = function (c) {
                    var a = this.renderTo;
                    if (c) for (; a && a.style; ) a.hcOrigStyle && (O(a, a.hcOrigStyle), delete a.hcOrigStyle), a.hcOrigDetached && (f.body.removeChild(a), (a.hcOrigDetached = !1)), (a = a.parentNode);
                    else
                        for (; a && a.style; ) {
                            f.body.contains(a) || a.parentNode || ((a.hcOrigDetached = !0), f.body.appendChild(a));
                            if ("none" === W(a, "display", !1) || a.hcOricDetached)
                                (a.hcOrigStyle = { display: a.style.display, height: a.style.height, overflow: a.style.overflow }),
                                    (c = { display: "block", overflow: "hidden" }),
                                    a !== this.renderTo && (c.height = 0),
                                    O(a, c),
                                    a.offsetWidth || a.style.setProperty("display", "block", "important");
                            a = a.parentNode;
                            if (a === f.body) break;
                        }
                };
                b.prototype.setClassName = function (c) {
                    this.container.className = "highcharts-container " + (c || "");
                };
                b.prototype.getContainer = function () {
                    var a = this.options,
                        b = a.chart,
                        e = ja(),
                        l,
                        h = this.renderTo;
                    h || (this.renderTo = h = b.renderTo);
                    U(h) && (this.renderTo = h = f.getElementById(h));
                    h || J(13, !0, this);
                    var k = ca(I(h, "data-highcharts-chart"));
                    X(k) && m[k] && m[k].hasRendered && m[k].destroy();
                    I(h, "data-highcharts-chart", this.index);
                    h.innerHTML = g.emptyHTML;
                    b.skipClone || h.offsetWidth || this.temporaryDisplay();
                    this.getChartSize();
                    k = this.chartWidth;
                    var q = this.chartHeight;
                    O(h, { overflow: "hidden" });
                    this.styledMode ||
                        (l = ba(
                            {
                                position: "relative",
                                overflow: "hidden",
                                width: k + "px",
                                height: q + "px",
                                textAlign: "left",
                                lineHeight: "normal",
                                zIndex: 0,
                                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                userSelect: "none",
                                "touch-action": "manipulation",
                                outline: "none",
                            },
                            b.style || {}
                        ));
                    this.container = e = Q("div", { id: e }, l, h);
                    this._cursor = e.style.cursor;
                    this.renderer = new (b.renderer || !c ? n.getRendererType(b.renderer) : d)(e, k, q, void 0, b.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
                    r(void 0, this);
                    this.setClassName(b.className);
                    if (this.styledMode) for (var u in a.defs) this.renderer.definition(a.defs[u]);
                    else this.renderer.setStyle(b.style);
                    this.renderer.chartIndex = this.index;
                    L(this, "afterGetContainer");
                };
                b.prototype.getMargins = function (c) {
                    var a = this.spacing,
                        d = this.margin,
                        b = this.titleOffset;
                    this.resetMargins();
                    b[0] && !R(d[0]) && (this.plotTop = Math.max(this.plotTop, b[0] + a[0]));
                    b[2] && !R(d[2]) && (this.marginBottom = Math.max(this.marginBottom, b[2] + a[2]));
                    this.legend && this.legend.display && this.legend.adjustMargins(d, a);
                    L(this, "getMargins");
                    c || this.getAxisMargins();
                };
                b.prototype.getAxisMargins = function () {
                    var c = this,
                        a = (c.axisOffset = [0, 0, 0, 0]),
                        d = c.colorAxis,
                        b = c.margin,
                        f = function (c) {
                            c.forEach(function (c) {
                                c.visible && c.getOffset();
                            });
                        };
                    c.hasCartesianSeries ? f(c.axes) : d && d.length && f(d);
                    y.forEach(function (d, f) {
                        R(b[f]) || (c[d] += a[f]);
                    });
                    c.setChartSize();
                };
                b.prototype.reflow = function (c) {
                    var a = this,
                        d = a.options.chart,
                        b = a.renderTo,
                        g = R(d.width) && R(d.height),
                        m = d.width || W(b, "width");
                    d = d.height || W(b, "height");
                    b = c ? c.target : u;
                    delete a.pointer.chartPosition;
                    if (!g && !a.isPrinting && m && d && (b === u || b === f)) {
                        if (m !== a.containerWidth || d !== a.containerHeight)
                            e.clearTimeout(a.reflowTimeout),
                                (a.reflowTimeout = fa(
                                    function () {
                                        a.container && a.setSize(void 0, void 0, !1);
                                    },
                                    c ? 100 : 0
                                ));
                        a.containerWidth = m;
                        a.containerHeight = d;
                    }
                };
                b.prototype.setReflow = function (c) {
                    var a = this;
                    !1 === c || this.unbindReflow
                        ? !1 === c && this.unbindReflow && (this.unbindReflow = this.unbindReflow())
                        : ((this.unbindReflow = H(u, "resize", function (c) {
                              a.options && a.reflow(c);
                          })),
                          H(this, "destroy", this.unbindReflow));
                };
                b.prototype.setSize = function (c, a, d) {
                    var b = this,
                        f = b.renderer;
                    b.isResizing += 1;
                    r(d, b);
                    d = f.globalAnimation;
                    b.oldChartHeight = b.chartHeight;
                    b.oldChartWidth = b.chartWidth;
                    "undefined" !== typeof c && (b.options.chart.width = c);
                    "undefined" !== typeof a && (b.options.chart.height = a);
                    b.getChartSize();
                    b.styledMode || (d ? x : O)(b.container, { width: b.chartWidth + "px", height: b.chartHeight + "px" }, d);
                    b.setChartSize(!0);
                    f.setSize(b.chartWidth, b.chartHeight, d);
                    b.axes.forEach(function (c) {
                        c.isDirty = !0;
                        c.setScale();
                    });
                    b.isDirtyLegend = !0;
                    b.isDirtyBox = !0;
                    b.layOutTitles();
                    b.getMargins();
                    b.redraw(d);
                    b.oldChartHeight = null;
                    L(b, "resize");
                    fa(function () {
                        b &&
                            L(b, "endResize", null, function () {
                                --b.isResizing;
                            });
                    }, C(d).duration);
                };
                b.prototype.setChartSize = function (c) {
                    var a = this.inverted,
                        d = this.renderer,
                        b = this.chartWidth,
                        f = this.chartHeight,
                        e = this.options.chart,
                        g = this.spacing,
                        m = this.clipOffset,
                        l,
                        h,
                        k,
                        q;
                    this.plotLeft = l = Math.round(this.plotLeft);
                    this.plotTop = h = Math.round(this.plotTop);
                    this.plotWidth = k = Math.max(0, Math.round(b - l - this.marginRight));
                    this.plotHeight = q = Math.max(0, Math.round(f - h - this.marginBottom));
                    this.plotSizeX = a ? q : k;
                    this.plotSizeY = a ? k : q;
                    this.plotBorderWidth = e.plotBorderWidth || 0;
                    this.spacingBox = d.spacingBox = { x: g[3], y: g[0], width: b - g[3] - g[1], height: f - g[0] - g[2] };
                    this.plotBox = d.plotBox = { x: l, y: h, width: k, height: q };
                    a = 2 * Math.floor(this.plotBorderWidth / 2);
                    b = Math.ceil(Math.max(a, m[3]) / 2);
                    f = Math.ceil(Math.max(a, m[0]) / 2);
                    this.clipBox = { x: b, y: f, width: Math.floor(this.plotSizeX - Math.max(a, m[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, m[2]) / 2 - f)) };
                    c ||
                        (this.axes.forEach(function (c) {
                            c.setAxisSize();
                            c.setAxisTranslation();
                        }),
                        d.alignElements());
                    L(this, "afterSetChartSize", { skipAxes: c });
                };
                b.prototype.resetMargins = function () {
                    L(this, "resetMargins");
                    var c = this,
                        a = c.options.chart;
                    ["margin", "spacing"].forEach(function (d) {
                        var b = a[d],
                            f = P(b) ? b : [b, b, b, b];
                        ["Top", "Right", "Bottom", "Left"].forEach(function (b, e) {
                            c[d][e] = N(a[d + b], f[e]);
                        });
                    });
                    y.forEach(function (a, d) {
                        c[a] = N(c.margin[d], c.spacing[d]);
                    });
                    c.axisOffset = [0, 0, 0, 0];
                    c.clipOffset = [0, 0, 0, 0];
                };
                b.prototype.drawChartBox = function () {
                    var c = this.options.chart,
                        a = this.renderer,
                        d = this.chartWidth,
                        b = this.chartHeight,
                        f = this.styledMode,
                        e = this.plotBGImage,
                        g = c.backgroundColor,
                        m = c.plotBackgroundColor,
                        l = c.plotBackgroundImage,
                        h = this.plotLeft,
                        k = this.plotTop,
                        q = this.plotWidth,
                        r = this.plotHeight,
                        n = this.plotBox,
                        u = this.clipRect,
                        y = this.clipBox,
                        z = this.chartBackground,
                        x = this.plotBackground,
                        t = this.plotBorder,
                        C,
                        v = "animate";
                    z || ((this.chartBackground = z = a.rect().addClass("highcharts-background").add()), (v = "attr"));
                    if (f) var M = (C = z.strokeWidth());
                    else {
                        M = c.borderWidth || 0;
                        C = M + (c.shadow ? 8 : 0);
                        g = { fill: g || "none" };
                        if (M || z["stroke-width"]) (g.stroke = c.borderColor), (g["stroke-width"] = M);
                        z.attr(g).shadow(c.shadow);
                    }
                    z[v]({ x: C / 2, y: C / 2, width: d - C - (M % 2), height: b - C - (M % 2), r: c.borderRadius });
                    v = "animate";
                    x || ((v = "attr"), (this.plotBackground = x = a.rect().addClass("highcharts-plot-background").add()));
                    x[v](n);
                    f || (x.attr({ fill: m || "none" }).shadow(c.plotShadow), l && (e ? (l !== e.attr("href") && e.attr("href", l), e.animate(n)) : (this.plotBGImage = a.image(l, h, k, q, r).add())));
                    u ? u.animate({ width: y.width, height: y.height }) : (this.clipRect = a.clipRect(y));
                    v = "animate";
                    t || ((v = "attr"), (this.plotBorder = t = a.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()));
                    f || t.attr({ stroke: c.plotBorderColor, "stroke-width": c.plotBorderWidth || 0, fill: "none" });
                    t[v](t.crisp({ x: h, y: k, width: q, height: r }, -t.strokeWidth()));
                    this.isDirtyBox = !1;
                    L(this, "afterDrawChartBox");
                };
                b.prototype.propFromSeries = function () {
                    var c = this,
                        a = c.options.chart,
                        d = c.options.series,
                        b,
                        f,
                        e;
                    ["inverted", "angular", "polar"].forEach(function (g) {
                        f = K[a.type || a.defaultSeriesType];
                        e = a[g] || (f && f.prototype[g]);
                        for (b = d && d.length; !e && b--; ) (f = K[d[b].type]) && f.prototype[g] && (e = !0);
                        c[g] = e;
                    });
                };
                b.prototype.linkSeries = function () {
                    var c = this,
                        a = c.series;
                    a.forEach(function (c) {
                        c.linkedSeries.length = 0;
                    });
                    a.forEach(function (a) {
                        var d = a.options.linkedTo;
                        U(d) &&
                            (d = ":previous" === d ? c.series[a.index - 1] : c.get(d)) &&
                            d.linkedParent !== a &&
                            (d.linkedSeries.push(a), (a.linkedParent = d), d.enabledDataSorting && a.setDataSortingOptions(), (a.visible = N(a.options.visible, d.options.visible, a.visible)));
                    });
                    L(this, "afterLinkSeries");
                };
                b.prototype.renderSeries = function () {
                    this.series.forEach(function (c) {
                        c.translate();
                        c.render();
                    });
                };
                b.prototype.renderLabels = function () {
                    var c = this,
                        a = c.options.labels;
                    a.items &&
                        a.items.forEach(function (d) {
                            var b = ba(a.style, d.style),
                                f = ca(b.left) + c.plotLeft,
                                e = ca(b.top) + c.plotTop + 12;
                            delete b.left;
                            delete b.top;
                            c.renderer.text(d.html, f, e).attr({ zIndex: 2 }).css(b).add();
                        });
                };
                b.prototype.render = function () {
                    var c = this.axes,
                        a = this.colorAxis,
                        d = this.renderer,
                        b = this.options,
                        f = function (c) {
                            c.forEach(function (c) {
                                c.visible && c.render();
                            });
                        },
                        e = 0;
                    this.setTitle();
                    this.legend = new D(this, b.legend);
                    this.getStacks && this.getStacks();
                    this.getMargins(!0);
                    this.setChartSize();
                    b = this.plotWidth;
                    c.some(function (c) {
                        if (c.horiz && c.visible && c.options.labels.enabled && c.series.length) return (e = 21), !0;
                    });
                    var g = (this.plotHeight = Math.max(this.plotHeight - e, 0));
                    c.forEach(function (c) {
                        c.setScale();
                    });
                    this.getAxisMargins();
                    var m = 1.1 < b / this.plotWidth,
                        l = 1.05 < g / this.plotHeight;
                    if (m || l)
                        c.forEach(function (c) {
                            ((c.horiz && m) || (!c.horiz && l)) && c.setTickInterval(!0);
                        }),
                            this.getMargins();
                    this.drawChartBox();
                    this.hasCartesianSeries ? f(c) : a && a.length && f(a);
                    this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({ zIndex: 3 }).add());
                    this.renderSeries();
                    this.renderLabels();
                    this.addCredits();
                    this.setResponsive && this.setResponsive();
                    this.hasRendered = !0;
                };
                b.prototype.addCredits = function (c) {
                    var a = this,
                        d = S(!0, this.options.credits, c);
                    d.enabled &&
                        !this.credits &&
                        ((this.credits = this.renderer
                            .text(d.text + (this.mapCredits || ""), 0, 0)
                            .addClass("highcharts-credits")
                            .on("click", function () {
                                d.href && (u.location.href = d.href);
                            })
                            .attr({ align: d.position.align, zIndex: 8 })),
                        a.styledMode || this.credits.css(d.style),
                        this.credits.add().align(d.position),
                        (this.credits.update = function (c) {
                            a.credits = a.credits.destroy();
                            a.addCredits(c);
                        }));
                };
                b.prototype.destroy = function () {
                    var c = this,
                        a = c.axes,
                        d = c.series,
                        b = c.container,
                        f = b && b.parentNode,
                        e;
                    L(c, "destroy");
                    c.renderer.forExport ? G(m, c) : (m[c.index] = void 0);
                    w.chartCount--;
                    c.renderTo.removeAttribute("data-highcharts-chart");
                    ia(c);
                    for (e = a.length; e--; ) a[e] = a[e].destroy();
                    this.scroller && this.scroller.destroy && this.scroller.destroy();
                    for (e = d.length; e--; ) d[e] = d[e].destroy();
                    "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                        var d = c[a];
                        d && d.destroy && (c[a] = d.destroy());
                    });
                    b && ((b.innerHTML = g.emptyHTML), ia(b), f && T(b));
                    V(c, function (a, d) {
                        delete c[d];
                    });
                };
                b.prototype.firstRender = function () {
                    var c = this,
                        a = c.options;
                    if (!c.isReadyToRender || c.isReadyToRender()) {
                        c.getContainer();
                        c.resetMargins();
                        c.setChartSize();
                        c.propFromSeries();
                        c.getAxes();
                        (M(a.series) ? a.series : []).forEach(function (a) {
                            c.initSeries(a);
                        });
                        c.linkSeries();
                        c.setSeriesData();
                        L(c, "beforeRender");
                        t && (B.isRequired() ? (c.pointer = new B(c, a)) : (c.pointer = new t(c, a)));
                        c.render();
                        c.pointer.getChartPosition();
                        if (!c.renderer.imgCount && !c.hasLoaded) c.onload();
                        c.temporaryDisplay(!0);
                    }
                };
                b.prototype.onload = function () {
                    this.callbacks.concat([this.callback]).forEach(function (c) {
                        c && "undefined" !== typeof this.index && c.apply(this, [this]);
                    }, this);
                    L(this, "load");
                    L(this, "render");
                    R(this.index) && this.setReflow(this.options.chart.reflow);
                    this.hasLoaded = !0;
                };
                b.prototype.addSeries = function (c, a, d) {
                    var b = this,
                        f;
                    c &&
                        ((a = N(a, !0)),
                        L(b, "addSeries", { options: c }, function () {
                            f = b.initSeries(c);
                            b.isDirtyLegend = !0;
                            b.linkSeries();
                            f.enabledDataSorting && f.setData(c.data, !1);
                            L(b, "afterAddSeries", { series: f });
                            a && b.redraw(d);
                        }));
                    return f;
                };
                b.prototype.addAxis = function (c, a, d, b) {
                    return this.createAxis(a ? "xAxis" : "yAxis", { axis: c, redraw: d, animation: b });
                };
                b.prototype.addColorAxis = function (c, a, d) {
                    return this.createAxis("colorAxis", { axis: c, redraw: a, animation: d });
                };
                b.prototype.createAxis = function (c, a) {
                    c = new p(this, S(a.axis, { index: this[c].length, isX: "xAxis" === c }));
                    N(a.redraw, !0) && this.redraw(a.animation);
                    return c;
                };
                b.prototype.showLoading = function (c) {
                    var a = this,
                        d = a.options,
                        b = d.loading,
                        f = function () {
                            e && O(e, { left: a.plotLeft + "px", top: a.plotTop + "px", width: a.plotWidth + "px", height: a.plotHeight + "px" });
                        },
                        e = a.loadingDiv,
                        m = a.loadingSpan;
                    e || (a.loadingDiv = e = Q("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, a.container));
                    m || ((a.loadingSpan = m = Q("span", { className: "highcharts-loading-inner" }, null, e)), H(a, "redraw", f));
                    e.className = "highcharts-loading";
                    g.setElementHTML(m, N(c, d.lang.loading, ""));
                    a.styledMode || (O(e, ba(b.style, { zIndex: 10 })), O(m, b.labelStyle), a.loadingShown || (O(e, { opacity: 0, display: "" }), x(e, { opacity: b.style.opacity || 0.5 }, { duration: b.showDuration || 0 })));
                    a.loadingShown = !0;
                    f();
                };
                b.prototype.hideLoading = function () {
                    var c = this.options,
                        a = this.loadingDiv;
                    a &&
                        ((a.className = "highcharts-loading highcharts-loading-hidden"),
                        this.styledMode ||
                            x(
                                a,
                                { opacity: 0 },
                                {
                                    duration: c.loading.hideDuration || 100,
                                    complete: function () {
                                        O(a, { display: "none" });
                                    },
                                }
                            ));
                    this.loadingShown = !1;
                };
                b.prototype.update = function (c, d, b, f) {
                    var e = this,
                        g = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" },
                        m = c.isResponsiveOptions,
                        l = [],
                        h,
                        k;
                    L(e, "update", { options: c });
                    m || e.setResponsive(!1, !0);
                    c = Z(c, e.options);
                    e.userOptions = S(e.userOptions, c);
                    var q = c.chart;
                    if (q) {
                        S(!0, e.options.chart, q);
                        "className" in q && e.setClassName(q.className);
                        "reflow" in q && e.setReflow(q.reflow);
                        if ("inverted" in q || "polar" in q || "type" in q) {
                            e.propFromSeries();
                            var r = !0;
                        }
                        "alignTicks" in q && (r = !0);
                        "events" in q && z(this, q);
                        V(q, function (c, a) {
                            -1 !== e.propsRequireUpdateSeries.indexOf("chart." + a) && (h = !0);
                            -1 !== e.propsRequireDirtyBox.indexOf(a) && (e.isDirtyBox = !0);
                            -1 !== e.propsRequireReflow.indexOf(a) && (m ? (e.isDirtyBox = !0) : (k = !0));
                        });
                        !e.styledMode && q.style && e.renderer.setStyle(e.options.chart.style || {});
                    }
                    !e.styledMode && c.colors && (this.options.colors = c.colors);
                    c.time && (this.time === v && (this.time = new a(c.time)), S(!0, e.options.time, c.time));
                    V(c, function (a, d) {
                        if (e[d] && "function" === typeof e[d].update) e[d].update(a, !1);
                        else if ("function" === typeof e[g[d]]) e[g[d]](a);
                        else "colors" !== d && -1 === e.collectionsWithUpdate.indexOf(d) && S(!0, e.options[d], c[d]);
                        "chart" !== d && -1 !== e.propsRequireUpdateSeries.indexOf(d) && (h = !0);
                    });
                    this.collectionsWithUpdate.forEach(function (a) {
                        if (c[a]) {
                            var d = [];
                            e[a].forEach(function (c, a) {
                                c.options.isInternal || d.push(N(c.options.index, a));
                            });
                            aa(c[a]).forEach(function (c, f) {
                                var g = R(c.id),
                                    m;
                                g && (m = e.get(c.id));
                                !m && e[a] && (m = e[a][d ? d[f] : f]) && g && R(m.options.id) && (m = void 0);
                                m && m.coll === a && (m.update(c, !1), b && (m.touched = !0));
                                !m && b && e.collectionsWithInit[a] && (e.collectionsWithInit[a][0].apply(e, [c].concat(e.collectionsWithInit[a][1] || []).concat([!1])).touched = !0);
                            });
                            b &&
                                e[a].forEach(function (c) {
                                    c.touched || c.options.isInternal ? delete c.touched : l.push(c);
                                });
                        }
                    });
                    l.forEach(function (c) {
                        c.chart && c.remove && c.remove(!1);
                    });
                    r &&
                        e.axes.forEach(function (c) {
                            c.update({}, !1);
                        });
                    h &&
                        e.getSeriesOrderByLinks().forEach(function (c) {
                            c.chart && c.update({}, !1);
                        }, this);
                    r = q && q.width;
                    q = q && (U(q.height) ? ea(q.height, r || e.chartWidth) : q.height);
                    k || (X(r) && r !== e.chartWidth) || (X(q) && q !== e.chartHeight) ? e.setSize(r, q, f) : N(d, !0) && e.redraw(f);
                    L(e, "afterUpdate", { options: c, redraw: d, animation: f });
                };
                b.prototype.setSubtitle = function (c, a) {
                    this.applyDescription("subtitle", c);
                    this.layOutTitles(a);
                };
                b.prototype.setCaption = function (c, a) {
                    this.applyDescription("caption", c);
                    this.layOutTitles(a);
                };
                b.prototype.showResetZoom = function () {
                    function c() {
                        a.zoomOut();
                    }
                    var a = this,
                        d = l.lang,
                        b = a.options.chart.resetZoomButton,
                        f = b.theme,
                        e = f.states,
                        g = "chart" === b.relativeTo || "spacingBox" === b.relativeTo ? null : "scrollablePlotBox";
                    L(this, "beforeShowResetZoom", null, function () {
                        a.resetZoomButton = a.renderer
                            .button(d.resetZoom, null, null, c, f, e && e.hover)
                            .attr({ align: b.position.align, title: d.resetZoomTitle })
                            .addClass("highcharts-reset-zoom")
                            .add()
                            .align(b.position, !1, g);
                    });
                    L(this, "afterShowResetZoom");
                };
                b.prototype.zoomOut = function () {
                    L(this, "selection", { resetSelection: !0 }, this.zoom);
                };
                b.prototype.zoom = function (c) {
                    var a = this,
                        d = a.pointer,
                        b = a.inverted ? d.mouseDownX : d.mouseDownY,
                        f = !1,
                        e;
                    !c || c.resetSelection
                        ? (a.axes.forEach(function (c) {
                              e = c.zoom();
                          }),
                          (d.initiated = !1))
                        : c.xAxis.concat(c.yAxis).forEach(function (c) {
                              var g = c.axis,
                                  m = a.inverted ? g.left : g.top,
                                  l = a.inverted ? m + g.width : m + g.height,
                                  h = g.isXAxis,
                                  k = !1;
                              if ((!h && b >= m && b <= l) || h || !R(b)) k = !0;
                              d[h ? "zoomX" : "zoomY"] && k && ((e = g.zoom(c.min, c.max)), g.displayBtn && (f = !0));
                          });
                    var g = a.resetZoomButton;
                    f && !g ? a.showResetZoom() : !f && P(g) && (a.resetZoomButton = g.destroy());
                    e && a.redraw(N(a.options.chart.animation, c && c.animation, 100 > a.pointCount));
                };
                b.prototype.pan = function (c, a) {
                    var d = this,
                        b = d.hoverPoints;
                    a = "object" === typeof a ? a : { enabled: a, type: "x" };
                    var f = d.options.chart,
                        e = d.options.mapNavigation && d.options.mapNavigation.enabled;
                    f && f.panning && (f.panning = a);
                    var g = a.type,
                        m;
                    L(this, "pan", { originalEvent: c }, function () {
                        b &&
                            b.forEach(function (c) {
                                c.setState();
                            });
                        var a = d.xAxis;
                        "xy" === g ? (a = a.concat(d.yAxis)) : "y" === g && (a = d.yAxis);
                        var f = {};
                        a.forEach(function (a) {
                            if (a.options.panningEnabled && !a.options.isInternal) {
                                var b = a.horiz,
                                    l = c[b ? "chartX" : "chartY"];
                                b = b ? "mouseDownX" : "mouseDownY";
                                var h = d[b],
                                    k = a.minPointOffset || 0,
                                    q = (a.reversed && !d.inverted) || (!a.reversed && d.inverted) ? -1 : 1,
                                    r = a.getExtremes(),
                                    n = a.toValue(h - l, !0) + k * q,
                                    u = a.toValue(h + a.len - l, !0) - (k * q || (a.isXAxis && a.pointRangePadding) || 0),
                                    y = u < n;
                                q = a.hasVerticalPanning();
                                h = y ? u : n;
                                n = y ? n : u;
                                var z = a.panningState;
                                !q ||
                                    a.isXAxis ||
                                    (z && !z.isDirty) ||
                                    a.series.forEach(function (c) {
                                        var a = c.getProcessedData(!0);
                                        a = c.getExtremes(a.yData, !0);
                                        z || (z = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE });
                                        X(a.dataMin) && X(a.dataMax) && ((z.startMin = Math.min(N(c.options.threshold, Infinity), a.dataMin, z.startMin)), (z.startMax = Math.max(N(c.options.threshold, -Infinity), a.dataMax, z.startMax)));
                                    });
                                q = Math.min(N(z && z.startMin, r.dataMin), k ? r.min : a.toValue(a.toPixels(r.min) - a.minPixelPadding));
                                u = Math.max(N(z && z.startMax, r.dataMax), k ? r.max : a.toValue(a.toPixels(r.max) + a.minPixelPadding));
                                a.panningState = z;
                                a.isOrdinal ||
                                    ((k = q - h),
                                    0 < k && ((n += k), (h = q)),
                                    (k = n - u),
                                    0 < k && ((n = u), (h -= k)),
                                    a.series.length &&
                                        h !== r.min &&
                                        n !== r.max &&
                                        h >= q &&
                                        n <= u &&
                                        (a.setExtremes(h, n, !1, !1, { trigger: "pan" }), d.resetZoomButton || e || h === q || n === u || !g.match("y") || (d.showResetZoom(), (a.displayBtn = !1)), (m = !0)),
                                    (f[b] = l));
                            }
                        });
                        V(f, function (c, a) {
                            d[a] = c;
                        });
                        m && d.redraw(!1);
                        O(d.container, { cursor: "move" });
                    });
                };
                return b;
            })();
            ba(b.prototype, {
                callbacks: [],
                collectionsWithInit: { xAxis: [b.prototype.addAxis, [!0]], yAxis: [b.prototype.addAxis, [!1]], series: [b.prototype.addSeries] },
                collectionsWithUpdate: ["xAxis", "yAxis", "series"],
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            });
            ("");
            return b;
        }
    );
    G(b, "Core/Legend/LegendSymbol.js", [b["Core/Utilities.js"]], function (b) {
        var v = b.merge,
            A = b.pick,
            E;
        (function (b) {
            b.drawLineMarker = function (b) {
                var p = this.options,
                    k = b.symbolWidth,
                    t = b.symbolHeight,
                    n = t / 2,
                    h = this.chart.renderer,
                    d = this.legendGroup;
                b = b.baseline - Math.round(0.3 * b.fontMetrics.b);
                var a = {},
                    e = p.marker;
                this.chart.styledMode || ((a = { "stroke-width": p.lineWidth || 0 }), p.dashStyle && (a.dashstyle = p.dashStyle));
                this.legendLine = h
                    .path([
                        ["M", 0, b],
                        ["L", k, b],
                    ])
                    .addClass("highcharts-graph")
                    .attr(a)
                    .add(d);
                e &&
                    !1 !== e.enabled &&
                    k &&
                    ((p = Math.min(A(e.radius, n), n)),
                    0 === this.symbol.indexOf("url") && ((e = v(e, { width: t, height: t })), (p = 0)),
                    (this.legendSymbol = k = h
                        .symbol(this.symbol, k / 2 - p, b - p, 2 * p, 2 * p, e)
                        .addClass("highcharts-point")
                        .add(d)),
                    (k.isMarker = !0));
            };
            b.drawRectangle = function (b, v) {
                var k = b.symbolHeight,
                    t = b.options.squareSymbol;
                v.legendSymbol = this.chart.renderer
                    .rect(t ? (b.symbolWidth - k) / 2 : 0, b.baseline - k + 1, t ? k : b.symbolWidth, k, A(b.options.symbolRadius, k / 2))
                    .addClass("highcharts-point")
                    .attr({ zIndex: 3 })
                    .add(v.legendGroup);
            };
        })(E || (E = {}));
        return E;
    });
    G(b, "Core/Series/SeriesDefaults.js", [], function () {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: { duration: 1e3 },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } },
            },
            point: { events: {} },
            dataLabels: {
                animation: {},
                align: "center",
                defer: !0,
                formatter: function () {
                    var b = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : b(this.y, -1);
                },
                padding: 5,
                style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: { animation: !0 },
                hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } },
                select: { animation: { duration: 0 } },
                inactive: { animation: { duration: 50 }, opacity: 0.2 },
            },
            stickyTracking: !0,
            turboThreshold: 1e3,
            findNearestPointBy: "x",
        };
    });
    G(
        b,
        "Core/Series/Series.js",
        [
            b["Core/Animation/AnimationUtilities.js"],
            b["Core/DefaultOptions.js"],
            b["Core/Foundation.js"],
            b["Core/Globals.js"],
            b["Core/Legend/LegendSymbol.js"],
            b["Core/Series/Point.js"],
            b["Core/Series/SeriesDefaults.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Core/Renderer/SVG/SVGElement.js"],
            b["Core/Utilities.js"],
        ],
        function (b, p, A, E, w, D, B, k, t, n) {
            var h = b.animObject,
                d = b.setAnimation,
                a = p.defaultOptions,
                e = A.registerEventOptions,
                g = E.hasTouch,
                x = E.svg,
                C = E.win,
                r = k.seriesTypes,
                q = n.addEvent,
                z = n.arrayMax,
                m = n.arrayMin,
                f = n.clamp,
                y = n.cleanRecursively,
                c = n.correctFloat,
                u = n.defined,
                l = n.erase,
                v = n.error,
                K = n.extend,
                H = n.find,
                I = n.fireEvent,
                Z = n.getNestedProperty,
                Q = n.isArray,
                O = n.isNumber,
                R = n.isString,
                T = n.merge,
                G = n.objectEach,
                J = n.pick,
                ba = n.removeEvent,
                ha = n.splat,
                L = n.syncTimeout;
            b = (function () {
                function b() {
                    this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0;
                }
                b.prototype.init = function (c, a) {
                    I(this, "init", { options: a });
                    var d = this,
                        b = c.series;
                    this.eventsToUnbind = [];
                    d.chart = c;
                    d.options = d.setOptions(a);
                    a = d.options;
                    d.linkedSeries = [];
                    d.bindAxes();
                    K(d, { name: a.name, state: "", visible: !1 !== a.visible, selected: !0 === a.selected });
                    e(this, a);
                    var f = a.events;
                    if ((f && f.click) || (a.point && a.point.events && a.point.events.click) || a.allowPointSelect) c.runTrackerClick = !0;
                    d.getColor();
                    d.getSymbol();
                    d.parallelArrays.forEach(function (c) {
                        d[c + "Data"] || (d[c + "Data"] = []);
                    });
                    d.isCartesian && (c.hasCartesianSeries = !0);
                    var g;
                    b.length && (g = b[b.length - 1]);
                    d._i = J(g && g._i, -1) + 1;
                    d.opacity = d.options.opacity;
                    c.orderSeries(this.insert(b));
                    a.dataSorting && a.dataSorting.enabled ? d.setDataSortingOptions() : d.points || d.data || d.setData(a.data, !1);
                    I(this, "afterInit");
                };
                b.prototype.is = function (c) {
                    return r[c] && this instanceof r[c];
                };
                b.prototype.insert = function (c) {
                    var a = this.options.index,
                        d;
                    if (O(a)) {
                        for (d = c.length; d--; )
                            if (a >= J(c[d].options.index, c[d]._i)) {
                                c.splice(d + 1, 0, this);
                                break;
                            }
                        -1 === d && c.unshift(this);
                        d += 1;
                    } else c.push(this);
                    return J(d, c.length - 1);
                };
                b.prototype.bindAxes = function () {
                    var c = this,
                        a = c.options,
                        d = c.chart,
                        b;
                    I(this, "bindAxes", null, function () {
                        (c.axisTypes || []).forEach(function (f) {
                            var e = 0;
                            d[f].forEach(function (d) {
                                b = d.options;
                                if ((a[f] === e && !b.isInternal) || ("undefined" !== typeof a[f] && a[f] === b.id) || ("undefined" === typeof a[f] && 0 === b.index)) c.insert(d.series), (c[f] = d), (d.isDirty = !0);
                                b.isInternal || e++;
                            });
                            c[f] || c.optionalAxis === f || v(18, !0, d);
                        });
                    });
                    I(this, "afterBindAxes");
                };
                b.prototype.updateParallelArrays = function (c, a) {
                    var d = c.series,
                        b = arguments,
                        f = O(a)
                            ? function (b) {
                                  var f = "y" === b && d.toYData ? d.toYData(c) : c[b];
                                  d[b + "Data"][a] = f;
                              }
                            : function (c) {
                                  Array.prototype[a].apply(d[c + "Data"], Array.prototype.slice.call(b, 2));
                              };
                    d.parallelArrays.forEach(f);
                };
                b.prototype.hasData = function () {
                    return (this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin) || (this.visible && this.yData && 0 < this.yData.length);
                };
                b.prototype.autoIncrement = function (c) {
                    var a = this.options,
                        d = a.pointIntervalUnit,
                        b = a.relativeXValue,
                        f = this.chart.time,
                        e = this.xIncrement,
                        g;
                    e = J(e, a.pointStart, 0);
                    this.pointInterval = g = J(this.pointInterval, a.pointInterval, 1);
                    b && O(c) && (g *= c);
                    d &&
                        ((a = new f.Date(e)),
                        "day" === d ? f.set("Date", a, f.get("Date", a) + g) : "month" === d ? f.set("Month", a, f.get("Month", a) + g) : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + g),
                        (g = a.getTime() - e));
                    if (b && O(c)) return e + g;
                    this.xIncrement = e + g;
                    return e;
                };
                b.prototype.setDataSortingOptions = function () {
                    var c = this.options;
                    K(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 });
                    u(c.pointRange) || (c.pointRange = 1);
                };
                b.prototype.setOptions = function (c) {
                    var d = this.chart,
                        b = d.options,
                        f = b.plotOptions,
                        e = d.userOptions || {};
                    c = T(c);
                    d = d.styledMode;
                    var g = { plotOptions: f, userOptions: c };
                    I(this, "setOptions", g);
                    var m = g.plotOptions[this.type],
                        l = e.plotOptions || {};
                    this.userOptions = g.userOptions;
                    e = T(m, f.series, e.plotOptions && e.plotOptions[this.type], c);
                    this.tooltipOptions = T(a.tooltip, a.plotOptions.series && a.plotOptions.series.tooltip, a.plotOptions[this.type].tooltip, b.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, c.tooltip);
                    this.stickyTracking = J(c.stickyTracking, l[this.type] && l[this.type].stickyTracking, l.series && l.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                    null === m.marker && delete e.marker;
                    this.zoneAxis = e.zoneAxis;
                    f = this.zones = (e.zones || []).slice();
                    (!e.negativeColor && !e.negativeFillColor) ||
                        e.zones ||
                        ((b = { value: e[this.zoneAxis + "Threshold"] || e.threshold || 0, className: "highcharts-negative" }), d || ((b.color = e.negativeColor), (b.fillColor = e.negativeFillColor)), f.push(b));
                    f.length && u(f[f.length - 1].value) && f.push(d ? {} : { color: this.color, fillColor: this.fillColor });
                    I(this, "afterSetOptions", { options: e });
                    return e;
                };
                b.prototype.getName = function () {
                    return J(this.options.name, "Series " + (this.index + 1));
                };
                b.prototype.getCyclic = function (c, a, d) {
                    var b = this.chart,
                        f = this.userOptions,
                        e = c + "Index",
                        g = c + "Counter",
                        m = d ? d.length : J(b.options.chart[c + "Count"], b[c + "Count"]);
                    if (!a) {
                        var l = J(f[e], f["_" + e]);
                        u(l) || (b.series.length || (b[g] = 0), (f["_" + e] = l = b[g] % m), (b[g] += 1));
                        d && (a = d[l]);
                    }
                    "undefined" !== typeof l && (this[e] = l);
                    this[c] = a;
                };
                b.prototype.getColor = function () {
                    this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? (this.color = "#cccccc") : this.getCyclic("color", this.options.color || a.plotOptions[this.type].color, this.chart.options.colors);
                };
                b.prototype.getPointsCollection = function () {
                    return (this.hasGroupedData ? this.points : this.data) || [];
                };
                b.prototype.getSymbol = function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
                };
                b.prototype.findPointIndex = function (c, a) {
                    var d = c.id,
                        b = c.x,
                        f = this.points,
                        e = this.options.dataSorting,
                        g,
                        m;
                    if (d) (e = this.chart.get(d)), e instanceof D && (g = e);
                    else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue)
                        if (
                            ((g = function (a) {
                                return !a.touched && a.index === c.index;
                            }),
                            e && e.matchByName
                                ? (g = function (a) {
                                      return !a.touched && a.name === c.name;
                                  })
                                : this.options.relativeXValue &&
                                  (g = function (a) {
                                      return !a.touched && a.options.x === c.x;
                                  }),
                            (g = H(f, g)),
                            !g)
                        )
                            return;
                    if (g) {
                        var l = g && g.index;
                        "undefined" !== typeof l && (m = !0);
                    }
                    "undefined" === typeof l && O(b) && (l = this.xData.indexOf(b, a));
                    -1 !== l && "undefined" !== typeof l && this.cropped && (l = l >= this.cropStart ? l - this.cropStart : l);
                    !m && O(l) && f[l] && f[l].touched && (l = void 0);
                    return l;
                };
                b.prototype.updateData = function (c, a) {
                    var d = this.options,
                        b = d.dataSorting,
                        f = this.points,
                        e = [],
                        g = this.requireSorting,
                        m = c.length === f.length,
                        l,
                        h,
                        k,
                        q = !0;
                    this.xIncrement = null;
                    c.forEach(function (c, a) {
                        var h = (u(c) && this.pointClass.prototype.optionsToObject.call({ series: this }, c)) || {},
                            q = h.x;
                        if (h.id || O(q)) {
                            if (
                                ((h = this.findPointIndex(h, k)),
                                -1 === h || "undefined" === typeof h ? e.push(c) : f[h] && c !== d.data[h] ? (f[h].update(c, !1, null, !1), (f[h].touched = !0), g && (k = h + 1)) : f[h] && (f[h].touched = !0),
                                !m || a !== h || (b && b.enabled) || this.hasDerivedData)
                            )
                                l = !0;
                        } else e.push(c);
                    }, this);
                    if (l) for (c = f.length; c--; ) (h = f[c]) && !h.touched && h.remove && h.remove(!1, a);
                    else
                        !m || (b && b.enabled)
                            ? (q = !1)
                            : (c.forEach(function (c, a) {
                                  c !== f[a].y && f[a].update && f[a].update(c, !1, null, !1);
                              }),
                              (e.length = 0));
                    f.forEach(function (c) {
                        c && (c.touched = !1);
                    });
                    if (!q) return !1;
                    e.forEach(function (c) {
                        this.addPoint(c, !1, null, null, !1);
                    }, this);
                    null === this.xIncrement && this.xData && this.xData.length && ((this.xIncrement = z(this.xData)), this.autoIncrement());
                    return !0;
                };
                b.prototype.setData = function (c, a, d, b) {
                    var f = this,
                        e = f.points,
                        g = (e && e.length) || 0,
                        m = f.options,
                        l = f.chart,
                        h = m.dataSorting,
                        k = f.xAxis,
                        q = m.turboThreshold,
                        r = this.xData,
                        n = this.yData,
                        u = f.pointArrayMap;
                    u = u && u.length;
                    var z = m.keys,
                        y,
                        x = 0,
                        t = 1,
                        C = null;
                    c = c || [];
                    var p = c.length;
                    a = J(a, !0);
                    h && h.enabled && (c = this.sortData(c));
                    !1 !== b && p && g && !f.cropped && !f.hasGroupedData && f.visible && !f.isSeriesBoosting && (y = this.updateData(c, d));
                    if (!y) {
                        f.xIncrement = null;
                        f.colorCounter = 0;
                        this.parallelArrays.forEach(function (c) {
                            f[c + "Data"].length = 0;
                        });
                        if (q && p > q)
                            if (((C = f.getFirstValidPoint(c)), O(C))) for (d = 0; d < p; d++) (r[d] = this.autoIncrement()), (n[d] = c[d]);
                            else if (Q(C))
                                if (u)
                                    if (C.length === u) for (d = 0; d < p; d++) (r[d] = this.autoIncrement()), (n[d] = c[d]);
                                    else for (d = 0; d < p; d++) (b = c[d]), (r[d] = b[0]), (n[d] = b.slice(1, u + 1));
                                else if ((z && ((x = z.indexOf("x")), (t = z.indexOf("y")), (x = 0 <= x ? x : 0), (t = 0 <= t ? t : 1)), 1 === C.length && (t = 0), x === t))
                                    for (d = 0; d < p; d++) (r[d] = this.autoIncrement()), (n[d] = c[d][t]);
                                else for (d = 0; d < p; d++) (b = c[d]), (r[d] = b[x]), (n[d] = b[t]);
                            else v(12, !1, l);
                        else for (d = 0; d < p; d++) "undefined" !== typeof c[d] && ((b = { series: f }), f.pointClass.prototype.applyOptions.apply(b, [c[d]]), f.updateParallelArrays(b, d));
                        n && R(n[0]) && v(14, !0, l);
                        f.data = [];
                        f.options.data = f.userOptions.data = c;
                        for (d = g; d--; ) e[d] && e[d].destroy && e[d].destroy();
                        k && (k.minRange = k.userMinRange);
                        f.isDirty = l.isDirtyBox = !0;
                        f.isDirtyData = !!e;
                        d = !1;
                    }
                    "point" === m.legendType && (this.processData(), this.generatePoints());
                    a && l.redraw(d);
                };
                b.prototype.sortData = function (c) {
                    var a = this,
                        d = a.options.dataSorting.sortKey || "y",
                        b = function (c, a) {
                            return (u(a) && c.pointClass.prototype.optionsToObject.call({ series: c }, a)) || {};
                        };
                    c.forEach(function (d, f) {
                        c[f] = b(a, d);
                        c[f].index = f;
                    }, this);
                    c.concat()
                        .sort(function (c, a) {
                            c = Z(d, c);
                            a = Z(d, a);
                            return a < c ? -1 : a > c ? 1 : 0;
                        })
                        .forEach(function (c, a) {
                            c.x = a;
                        }, this);
                    a.linkedSeries &&
                        a.linkedSeries.forEach(function (a) {
                            var d = a.options,
                                f = d.data;
                            (d.dataSorting && d.dataSorting.enabled) ||
                                !f ||
                                (f.forEach(function (d, e) {
                                    f[e] = b(a, d);
                                    c[e] && ((f[e].x = c[e].x), (f[e].index = e));
                                }),
                                a.setData(f, !1));
                        });
                    return c;
                };
                b.prototype.getProcessedData = function (c) {
                    var a = this.xAxis,
                        d = this.options,
                        b = d.cropThreshold,
                        f = c || this.getExtremesFromAll || d.getExtremesFromAll,
                        e = this.isCartesian;
                    c = a && a.val2lin;
                    d = !(!a || !a.logarithmic);
                    var g = 0,
                        m = this.xData,
                        l = this.yData,
                        h = this.requireSorting;
                    var k = !1;
                    var q = m.length;
                    if (a) {
                        k = a.getExtremes();
                        var r = k.min;
                        var n = k.max;
                        k = a.categories && !a.names.length;
                    }
                    if (e && this.sorted && !f && (!b || q > b || this.forceCrop))
                        if (m[q - 1] < r || m[0] > n) (m = []), (l = []);
                        else if (this.yData && (m[0] < r || m[q - 1] > n)) {
                            var u = this.cropData(this.xData, this.yData, r, n);
                            m = u.xData;
                            l = u.yData;
                            g = u.start;
                            u = !0;
                        }
                    for (b = m.length || 1; --b; )
                        if (((a = d ? c(m[b]) - c(m[b - 1]) : m[b] - m[b - 1]), 0 < a && ("undefined" === typeof z || a < z))) var z = a;
                        else 0 > a && h && !k && (v(15, !1, this.chart), (h = !1));
                    return { xData: m, yData: l, cropped: u, cropStart: g, closestPointRange: z };
                };
                b.prototype.processData = function (c) {
                    var a = this.xAxis;
                    if (this.isCartesian && !this.isDirty && !a.isDirty && !this.yAxis.isDirty && !c) return !1;
                    c = this.getProcessedData();
                    this.cropped = c.cropped;
                    this.cropStart = c.cropStart;
                    this.processedXData = c.xData;
                    this.processedYData = c.yData;
                    this.closestPointRange = this.basePointRange = c.closestPointRange;
                    I(this, "afterProcessData");
                };
                b.prototype.cropData = function (c, a, d, b, f) {
                    var e = c.length,
                        g,
                        m = 0,
                        l = e;
                    f = J(f, this.cropShoulder);
                    for (g = 0; g < e; g++)
                        if (c[g] >= d) {
                            m = Math.max(0, g - f);
                            break;
                        }
                    for (d = g; d < e; d++)
                        if (c[d] > b) {
                            l = d + f;
                            break;
                        }
                    return { xData: c.slice(m, l), yData: a.slice(m, l), start: m, end: l };
                };
                b.prototype.generatePoints = function () {
                    var c = this.options,
                        a = c.data,
                        d = this.processedXData,
                        b = this.processedYData,
                        f = this.pointClass,
                        e = d.length,
                        g = this.cropStart || 0,
                        m = this.hasGroupedData,
                        l = c.keys,
                        h = [];
                    c = c.dataGrouping && c.dataGrouping.groupAll ? g : 0;
                    var k,
                        q,
                        r = this.data;
                    if (!r && !m) {
                        var n = [];
                        n.length = a.length;
                        r = this.data = n;
                    }
                    l && m && (this.options.keys = !1);
                    for (q = 0; q < e; q++) {
                        n = g + q;
                        if (m) {
                            var u = new f().init(this, [d[q]].concat(ha(b[q])));
                            u.dataGroup = this.groupMap[c + q];
                            u.dataGroup.options && ((u.options = u.dataGroup.options), K(u, u.dataGroup.options), delete u.dataLabels);
                        } else (u = r[n]) || "undefined" === typeof a[n] || (r[n] = u = new f().init(this, a[n], d[q]));
                        u && ((u.index = m ? c + q : n), (h[q] = u));
                    }
                    this.options.keys = l;
                    if (r && (e !== (k = r.length) || m)) for (q = 0; q < k; q++) q !== g || m || (q += e), r[q] && (r[q].destroyElements(), (r[q].plotX = void 0));
                    this.data = r;
                    this.points = h;
                    I(this, "afterGeneratePoints");
                };
                b.prototype.getXExtremes = function (c) {
                    return { min: m(c), max: z(c) };
                };
                b.prototype.getExtremes = function (c, a) {
                    var d = this.xAxis,
                        b = this.yAxis,
                        f = this.processedXData || this.xData,
                        e = [],
                        g = this.requireSorting ? this.cropShoulder : 0;
                    b = b ? b.positiveValuesOnly : !1;
                    var l,
                        h = 0,
                        q = 0,
                        k = 0;
                    c = c || this.stackedYData || this.processedYData || [];
                    var r = c.length;
                    if (d) {
                        var n = d.getExtremes();
                        h = n.min;
                        q = n.max;
                    }
                    for (l = 0; l < r; l++) {
                        var u = f[l];
                        n = c[l];
                        var y = (O(n) || Q(n)) && (n.length || 0 < n || !b);
                        u = a || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !d || ((f[l + g] || u) >= h && (f[l - g] || u) <= q);
                        if (y && u)
                            if ((y = n.length)) for (; y--; ) O(n[y]) && (e[k++] = n[y]);
                            else e[k++] = n;
                    }
                    c = { activeYData: e, dataMin: m(e), dataMax: z(e) };
                    I(this, "afterGetExtremes", { dataExtremes: c });
                    return c;
                };
                b.prototype.applyExtremes = function () {
                    var c = this.getExtremes();
                    this.dataMin = c.dataMin;
                    this.dataMax = c.dataMax;
                    return c;
                };
                b.prototype.getFirstValidPoint = function (c) {
                    for (var a = c.length, d = 0, b = null; null === b && d < a; ) (b = c[d]), d++;
                    return b;
                };
                b.prototype.translate = function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options,
                        d = a.stacking,
                        b = this.xAxis,
                        e = b.categories,
                        g = this.enabledDataSorting,
                        m = this.yAxis,
                        l = this.points,
                        h = l.length,
                        q = this.pointPlacementToXValue(),
                        k = !!q,
                        r = a.threshold,
                        n = a.startFromThreshold ? r : 0,
                        z = this.zoneAxis || "y",
                        y,
                        x,
                        t = Number.MAX_VALUE;
                    for (y = 0; y < h; y++) {
                        var C = l[y],
                            v = C.x,
                            p = void 0,
                            F = void 0,
                            H = C.y,
                            B = C.low,
                            w = d && m.stacking && m.stacking.stacks[(this.negStacks && H < (n ? 0 : r) ? "-" : "") + this.stackKey];
                        if ((m.positiveValuesOnly && !m.validatePositiveValue(H)) || (b.positiveValuesOnly && !b.validatePositiveValue(v))) C.isNull = !0;
                        C.plotX = x = c(f(b.translate(v, 0, 0, 0, 1, q, "flags" === this.type), -1e5, 1e5));
                        if (d && this.visible && w && w[v]) {
                            var A = this.getStackIndicator(A, v, this.index);
                            C.isNull || ((p = w[v]), (F = p.points[A.key]));
                        }
                        Q(F) &&
                            ((B = F[0]),
                            (H = F[1]),
                            B === n && A.key === w[v].base && (B = J(O(r) && r, m.min)),
                            m.positiveValuesOnly && 0 >= B && (B = null),
                            (C.total = C.stackTotal = p.total),
                            (C.percentage = p.total && (C.y / p.total) * 100),
                            (C.stackY = H),
                            this.irregularWidths || p.setOffset(this.pointXOffset || 0, this.barW || 0));
                        C.yBottom = u(B) ? f(m.translate(B, 0, 1, 0, 1), -1e5, 1e5) : null;
                        this.dataModify && (H = this.dataModify.modifyValue(H, y));
                        C.plotY = void 0;
                        O(H) && ((p = m.translate(H, !1, !0, !1, !0)), "undefined" !== typeof p && (C.plotY = f(p, -1e5, 1e5)));
                        C.isInside = this.isPointInside(C);
                        C.clientX = k ? c(b.translate(v, 0, 0, 0, 1, q)) : x;
                        C.negative = C[z] < (a[z + "Threshold"] || r || 0);
                        C.category = e && "undefined" !== typeof e[C.x] ? e[C.x] : C.x;
                        if (!C.isNull && !1 !== C.visible) {
                            "undefined" !== typeof D && (t = Math.min(t, Math.abs(x - D)));
                            var D = x;
                        }
                        C.zone = this.zones.length ? C.getZone() : void 0;
                        !C.graphic && this.group && g && (C.isNew = !0);
                    }
                    this.closestPointRangePx = t;
                    I(this, "afterTranslate");
                };
                b.prototype.getValidPoints = function (c, a, d) {
                    var b = this.chart;
                    return (c || this.points || []).filter(function (c) {
                        return a && !b.isInsidePlot(c.plotX, c.plotY, { inverted: b.inverted }) ? !1 : !1 !== c.visible && (d || !c.isNull);
                    });
                };
                b.prototype.getClipBox = function () {
                    var c = this.chart,
                        a = this.xAxis,
                        d = this.yAxis,
                        b = T(c.clipBox);
                    a && a.len !== c.plotSizeX && (b.width = a.len);
                    d && d.len !== c.plotSizeY && (b.height = d.len);
                    return b;
                };
                b.prototype.getSharedClipKey = function () {
                    return (this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
                };
                b.prototype.setClip = function () {
                    var c = this.chart,
                        a = this.group,
                        d = this.markerGroup,
                        b = c.sharedClips;
                    c = c.renderer;
                    var f = this.getClipBox(),
                        e = this.getSharedClipKey(),
                        g = b[e];
                    g ? g.animate(f) : (b[e] = g = c.clipRect(f));
                    a && a.clip(!1 === this.options.clip ? void 0 : g);
                    d && d.clip();
                };
                b.prototype.animate = function (c) {
                    var a = this.chart,
                        d = this.group,
                        b = this.markerGroup,
                        f = a.inverted,
                        e = h(this.options.animation),
                        g = [this.getSharedClipKey(), e.duration, e.easing, e.defer].join(),
                        m = a.sharedClips[g],
                        l = a.sharedClips[g + "m"];
                    if (c && d)
                        (e = this.getClipBox()),
                            m
                                ? m.attr("height", e.height)
                                : ((e.width = 0),
                                  f && (e.x = a.plotHeight),
                                  (m = a.renderer.clipRect(e)),
                                  (a.sharedClips[g] = m),
                                  (l = a.renderer.clipRect({ x: f ? (a.plotSizeX || 0) + 99 : -99, y: f ? -a.plotLeft : -a.plotTop, width: 99, height: f ? a.chartWidth : a.chartHeight })),
                                  (a.sharedClips[g + "m"] = l)),
                            d.clip(m),
                            b && b.clip(l);
                    else if (m && !m.hasClass("highcharts-animating")) {
                        a = this.getClipBox();
                        var q = e.step;
                        b &&
                            b.element.childNodes.length &&
                            (e.step = function (c, a) {
                                q && q.apply(a, arguments);
                                l && l.element && l.attr(a.prop, "width" === a.prop ? c + 99 : c);
                            });
                        m.addClass("highcharts-animating").animate(a, e);
                    }
                };
                b.prototype.afterAnimate = function () {
                    var c = this;
                    this.setClip();
                    G(this.chart.sharedClips, function (a, d, b) {
                        a && !c.chart.container.querySelector('[clip-path="url(#' + a.id + ')"]') && (a.destroy(), delete b[d]);
                    });
                    this.finishedAnimating = !0;
                    I(this, "afterAnimate");
                };
                b.prototype.drawPoints = function () {
                    var c = this.points,
                        a = this.chart,
                        d = this.options.marker,
                        b = this[this.specialGroup] || this.markerGroup,
                        f = this.xAxis,
                        e = J(d.enabled, !f || f.isRadial ? !0 : null, this.closestPointRangePx >= d.enabledThreshold * d.radius),
                        g,
                        m;
                    if (!1 !== d.enabled || this._hasPointMarkers)
                        for (g = 0; g < c.length; g++) {
                            var l = c[g];
                            var h = (m = l.graphic) ? "animate" : "attr";
                            var q = l.marker || {};
                            var k = !!l.marker;
                            if (((e && "undefined" === typeof q.enabled) || q.enabled) && !l.isNull && !1 !== l.visible) {
                                var r = J(q.symbol, this.symbol, "rect");
                                var n = this.markerAttribs(l, l.selected && "select");
                                this.enabledDataSorting && (l.startXPos = f.reversed ? -(n.width || 0) : f.width);
                                var u = !1 !== l.isInside;
                                m
                                    ? m[u ? "show" : "hide"](u).animate(n)
                                    : u &&
                                      (0 < (n.width || 0) || l.hasImage) &&
                                      ((l.graphic = m = a.renderer.symbol(r, n.x, n.y, n.width, n.height, k ? q : d).add(b)), this.enabledDataSorting && a.hasRendered && (m.attr({ x: l.startXPos }), (h = "animate")));
                                m && "animate" === h && m[u ? "show" : "hide"](u).animate(n);
                                if (m && !a.styledMode) m[h](this.pointAttribs(l, l.selected && "select"));
                                m && m.addClass(l.getClassName(), !0);
                            } else m && (l.graphic = m.destroy());
                        }
                };
                b.prototype.markerAttribs = function (c, a) {
                    var d = this.options,
                        b = d.marker,
                        f = c.marker || {},
                        e = f.symbol || b.symbol,
                        g = J(f.radius, b.radius);
                    a && ((b = b.states[a]), (a = f.states && f.states[a]), (g = J(a && a.radius, b && b.radius, g + ((b && b.radiusPlus) || 0))));
                    c.hasImage = e && 0 === e.indexOf("url");
                    c.hasImage && (g = 0);
                    c = { x: d.crisp ? Math.floor(c.plotX - g) : c.plotX - g, y: c.plotY - g };
                    g && (c.width = c.height = 2 * g);
                    return c;
                };
                b.prototype.pointAttribs = function (c, a) {
                    var d = this.options.marker,
                        b = c && c.options,
                        f = (b && b.marker) || {},
                        e = b && b.color,
                        g = c && c.color,
                        m = c && c.zone && c.zone.color,
                        l = this.color;
                    c = J(f.lineWidth, d.lineWidth);
                    b = 1;
                    l = e || m || g || l;
                    e = f.fillColor || d.fillColor || l;
                    g = f.lineColor || d.lineColor || l;
                    a = a || "normal";
                    d = d.states[a] || {};
                    a = (f.states && f.states[a]) || {};
                    c = J(a.lineWidth, d.lineWidth, c + J(a.lineWidthPlus, d.lineWidthPlus, 0));
                    e = a.fillColor || d.fillColor || e;
                    g = a.lineColor || d.lineColor || g;
                    b = J(a.opacity, d.opacity, b);
                    return { stroke: g, "stroke-width": c, fill: e, opacity: b };
                };
                b.prototype.destroy = function (c) {
                    var a = this,
                        d = a.chart,
                        b = /AppleWebKit\/533/.test(C.navigator.userAgent),
                        f = a.data || [],
                        e,
                        g,
                        m,
                        h;
                    I(a, "destroy");
                    this.removeEvents(c);
                    (a.axisTypes || []).forEach(function (c) {
                        (h = a[c]) && h.series && (l(h.series, a), (h.isDirty = h.forceRedraw = !0));
                    });
                    a.legendItem && a.chart.legend.destroyItem(a);
                    for (g = f.length; g--; ) (m = f[g]) && m.destroy && m.destroy();
                    a.clips &&
                        a.clips.forEach(function (c) {
                            return c.destroy();
                        });
                    n.clearTimeout(a.animationTimeout);
                    G(a, function (c, a) {
                        c instanceof t && !c.survive && ((e = b && "group" === a ? "hide" : "destroy"), c[e]());
                    });
                    d.hoverSeries === a && (d.hoverSeries = void 0);
                    l(d.series, a);
                    d.orderSeries();
                    G(a, function (d, b) {
                        (c && "hcEvents" === b) || delete a[b];
                    });
                };
                b.prototype.applyZones = function () {
                    var c = this,
                        a = this.chart,
                        d = a.renderer,
                        b = this.zones,
                        e = this.clips || [],
                        g = this.graph,
                        m = this.area,
                        l = Math.max(a.chartWidth, a.chartHeight),
                        h = this[(this.zoneAxis || "y") + "Axis"],
                        q = a.inverted,
                        k,
                        n,
                        r,
                        u,
                        z,
                        y,
                        x,
                        t,
                        C = !1;
                    if (b.length && (g || m) && h && "undefined" !== typeof h.min) {
                        var v = h.reversed;
                        var p = h.horiz;
                        g && !this.showLine && g.hide();
                        m && m.hide();
                        var H = h.getExtremes();
                        b.forEach(function (b, F) {
                            k = v ? (p ? a.plotWidth : 0) : p ? 0 : h.toPixels(H.min) || 0;
                            k = f(J(n, k), 0, l);
                            n = f(Math.round(h.toPixels(J(b.value, H.max), !0) || 0), 0, l);
                            C && (k = n = h.toPixels(H.max));
                            u = Math.abs(k - n);
                            z = Math.min(k, n);
                            y = Math.max(k, n);
                            h.isXAxis ? ((r = { x: q ? y : z, y: 0, width: u, height: l }), p || (r.x = a.plotHeight - r.x)) : ((r = { x: 0, y: q ? y : z, width: l, height: u }), p && (r.y = a.plotWidth - r.y));
                            q && d.isVML && (r = h.isXAxis ? { x: 0, y: v ? z : y, height: r.width, width: a.chartWidth } : { x: r.y - a.plotLeft - a.spacingBox.x, y: 0, width: r.height, height: a.chartHeight });
                            e[F] ? e[F].animate(r) : (e[F] = d.clipRect(r));
                            x = c["zone-area-" + F];
                            t = c["zone-graph-" + F];
                            g && t && t.clip(e[F]);
                            m && x && x.clip(e[F]);
                            C = b.value > H.max;
                            c.resetZones && 0 === n && (n = void 0);
                        });
                        this.clips = e;
                    } else c.visible && (g && g.show(!0), m && m.show(!0));
                };
                b.prototype.invertGroups = function (c) {
                    function a() {
                        ["group", "markerGroup"].forEach(function (a) {
                            d[a] && (b.renderer.isVML && d[a].attr({ width: d.yAxis.len, height: d.xAxis.len }), (d[a].width = d.yAxis.len), (d[a].height = d.xAxis.len), d[a].invert(d.isRadialSeries ? !1 : c));
                        });
                    }
                    var d = this,
                        b = d.chart;
                    d.xAxis && (d.eventsToUnbind.push(q(b, "resize", a)), a(), (d.invertGroups = a));
                };
                b.prototype.plotGroup = function (c, a, d, b, f) {
                    var e = this[c],
                        g = !e;
                    d = { visibility: d, zIndex: b || 0.1 };
                    "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (d.opacity = this.opacity);
                    g && (this[c] = e = this.chart.renderer.g().add(f));
                    e.addClass(
                        "highcharts-" +
                            a +
                            " highcharts-series-" +
                            this.index +
                            " highcharts-" +
                            this.type +
                            "-series " +
                            (u(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") +
                            (this.options.className || "") +
                            (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
                        !0
                    );
                    e.attr(d)[g ? "attr" : "animate"](this.getPlotBox());
                    return e;
                };
                b.prototype.getPlotBox = function () {
                    var c = this.chart,
                        a = this.xAxis,
                        d = this.yAxis;
                    c.inverted && ((a = d), (d = this.xAxis));
                    return { translateX: a ? a.left : c.plotLeft, translateY: d ? d.top : c.plotTop, scaleX: 1, scaleY: 1 };
                };
                b.prototype.removeEvents = function (c) {
                    c || ba(this);
                    this.eventsToUnbind.length &&
                        (this.eventsToUnbind.forEach(function (c) {
                            c();
                        }),
                        (this.eventsToUnbind.length = 0));
                };
                b.prototype.render = function () {
                    var c = this,
                        a = c.chart,
                        d = c.options,
                        b = h(d.animation),
                        f = c.visible ? "inherit" : "hidden",
                        e = d.zIndex,
                        g = c.hasRendered,
                        m = a.seriesGroup,
                        l = a.inverted;
                    a = !c.finishedAnimating && a.renderer.isSVG ? b.duration : 0;
                    I(this, "render");
                    var q = c.plotGroup("group", "series", f, e, m);
                    c.markerGroup = c.plotGroup("markerGroup", "markers", f, e, m);
                    !1 !== d.clip && c.setClip();
                    c.animate && a && c.animate(!0);
                    q.inverted = J(c.invertible, c.isCartesian) ? l : !1;
                    c.drawGraph && (c.drawGraph(), c.applyZones());
                    c.visible && c.drawPoints();
                    c.drawDataLabels && c.drawDataLabels();
                    c.redrawPoints && c.redrawPoints();
                    c.drawTracker && !1 !== c.options.enableMouseTracking && c.drawTracker();
                    c.invertGroups(l);
                    c.animate && a && c.animate();
                    g ||
                        (a && b.defer && (a += b.defer),
                        (c.animationTimeout = L(function () {
                            c.afterAnimate();
                        }, a || 0)));
                    c.isDirty = !1;
                    c.hasRendered = !0;
                    I(c, "afterRender");
                };
                b.prototype.redraw = function () {
                    var c = this.chart,
                        a = this.isDirty || this.isDirtyData,
                        d = this.group,
                        b = this.xAxis,
                        f = this.yAxis;
                    d && (c.inverted && d.attr({ width: c.plotWidth, height: c.plotHeight }), d.animate({ translateX: J(b && b.left, c.plotLeft), translateY: J(f && f.top, c.plotTop) }));
                    this.translate();
                    this.render();
                    a && delete this.kdTree;
                };
                b.prototype.searchPoint = function (c, a) {
                    var d = this.xAxis,
                        b = this.yAxis,
                        f = this.chart.inverted;
                    return this.searchKDTree({ clientX: f ? d.len - c.chartY + d.pos : c.chartX - d.pos, plotY: f ? b.len - c.chartX + b.pos : c.chartY - b.pos }, a, c);
                };
                b.prototype.buildKDTree = function (c) {
                    function a(c, b, f) {
                        var e = c && c.length;
                        if (e) {
                            var g = d.kdAxisArray[b % f];
                            c.sort(function (c, a) {
                                return c[g] - a[g];
                            });
                            e = Math.floor(e / 2);
                            return { point: c[e], left: a(c.slice(0, e), b + 1, f), right: a(c.slice(e + 1), b + 1, f) };
                        }
                    }
                    this.buildingKdTree = !0;
                    var d = this,
                        b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete d.kdTree;
                    L(
                        function () {
                            d.kdTree = a(d.getValidPoints(null, !d.directTouch), b, b);
                            d.buildingKdTree = !1;
                        },
                        d.options.kdNow || (c && "touchstart" === c.type) ? 0 : 1
                    );
                };
                b.prototype.searchKDTree = function (c, a, d) {
                    function b(c, a, d, l) {
                        var h = a.point,
                            q = f.kdAxisArray[d % l],
                            k = h,
                            r = u(c[e]) && u(h[e]) ? Math.pow(c[e] - h[e], 2) : null;
                        var n = u(c[g]) && u(h[g]) ? Math.pow(c[g] - h[g], 2) : null;
                        n = (r || 0) + (n || 0);
                        h.dist = u(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                        h.distX = u(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                        q = c[q] - h[q];
                        n = 0 > q ? "left" : "right";
                        r = 0 > q ? "right" : "left";
                        a[n] && ((n = b(c, a[n], d + 1, l)), (k = n[m] < k[m] ? n : h));
                        a[r] && Math.sqrt(q * q) < k[m] && ((c = b(c, a[r], d + 1, l)), (k = c[m] < k[m] ? c : k));
                        return k;
                    }
                    var f = this,
                        e = this.kdAxisArray[0],
                        g = this.kdAxisArray[1],
                        m = a ? "distX" : "dist";
                    a = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree(d);
                    if (this.kdTree) return b(c, this.kdTree, a, a);
                };
                b.prototype.pointPlacementToXValue = function () {
                    var c = this.options,
                        a = c.pointRange,
                        d = this.xAxis;
                    c = c.pointPlacement;
                    "between" === c && (c = d.reversed ? -0.5 : 0.5);
                    return O(c) ? c * (a || d.pointRange) : 0;
                };
                b.prototype.isPointInside = function (c) {
                    var a = this.chart,
                        d = this.xAxis,
                        b = this.yAxis;
                    return "undefined" !== typeof c.plotY && "undefined" !== typeof c.plotX && 0 <= c.plotY && c.plotY <= (b ? b.len : a.plotHeight) && 0 <= c.plotX && c.plotX <= (d ? d.len : a.plotWidth);
                };
                b.prototype.drawTracker = function () {
                    var c = this,
                        a = c.options,
                        d = a.trackByArea,
                        b = [].concat(d ? c.areaPath : c.graphPath),
                        f = c.chart,
                        e = f.pointer,
                        m = f.renderer,
                        l = f.options.tooltip.snap,
                        h = c.tracker,
                        q = function (a) {
                            if (f.hoverSeries !== c) c.onMouseOver();
                        },
                        k = "rgba(192,192,192," + (x ? 0.0001 : 0.002) + ")";
                    h
                        ? h.attr({ d: b })
                        : c.graph &&
                          ((c.tracker = m
                              .path(b)
                              .attr({ visibility: c.visible ? "visible" : "hidden", zIndex: 2 })
                              .addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line")
                              .add(c.group)),
                          f.styledMode || c.tracker.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: k, fill: d ? k : "none", "stroke-width": c.graph.strokeWidth() + (d ? 0 : 2 * l) }),
                          [c.tracker, c.markerGroup, c.dataLabelsGroup].forEach(function (c) {
                              if (
                                  c &&
                                  (c
                                      .addClass("highcharts-tracker")
                                      .on("mouseover", q)
                                      .on("mouseout", function (c) {
                                          e.onTrackerMouseOut(c);
                                      }),
                                  a.cursor && !f.styledMode && c.css({ cursor: a.cursor }),
                                  g)
                              )
                                  c.on("touchstart", q);
                          }));
                    I(this, "afterDrawTracker");
                };
                b.prototype.addPoint = function (c, a, d, b, f) {
                    var e = this.options,
                        g = this.data,
                        m = this.chart,
                        l = this.xAxis;
                    l = l && l.hasNames && l.names;
                    var h = e.data,
                        q = this.xData,
                        k;
                    a = J(a, !0);
                    var n = { series: this };
                    this.pointClass.prototype.applyOptions.apply(n, [c]);
                    var r = n.x;
                    var u = q.length;
                    if (this.requireSorting && r < q[u - 1]) for (k = !0; u && q[u - 1] > r; ) u--;
                    this.updateParallelArrays(n, "splice", u, 0, 0);
                    this.updateParallelArrays(n, u);
                    l && n.name && (l[r] = n.name);
                    h.splice(u, 0, c);
                    k && (this.data.splice(u, 0, null), this.processData());
                    "point" === e.legendType && this.generatePoints();
                    d && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(n, "shift"), h.shift()));
                    !1 !== f && I(this, "addPoint", { point: n });
                    this.isDirtyData = this.isDirty = !0;
                    a && m.redraw(b);
                };
                b.prototype.removePoint = function (c, a, b) {
                    var f = this,
                        e = f.data,
                        g = e[c],
                        m = f.points,
                        l = f.chart,
                        h = function () {
                            m && m.length === e.length && m.splice(c, 1);
                            e.splice(c, 1);
                            f.options.data.splice(c, 1);
                            f.updateParallelArrays(g || { series: f }, "splice", c, 1);
                            g && g.destroy();
                            f.isDirty = !0;
                            f.isDirtyData = !0;
                            a && l.redraw();
                        };
                    d(b, l);
                    a = J(a, !0);
                    g ? g.firePointEvent("remove", null, h) : h();
                };
                b.prototype.remove = function (c, a, d, b) {
                    function f() {
                        e.destroy(b);
                        g.isDirtyLegend = g.isDirtyBox = !0;
                        g.linkSeries();
                        J(c, !0) && g.redraw(a);
                    }
                    var e = this,
                        g = e.chart;
                    !1 !== d ? I(e, "remove", null, f) : f();
                };
                b.prototype.update = function (c, a) {
                    c = y(c, this.userOptions);
                    I(this, "update", { options: c });
                    var d = this,
                        b = d.chart,
                        f = d.userOptions,
                        e = d.initialType || d.type,
                        g = b.options.plotOptions,
                        m = r[e].prototype,
                        l = d.finishedAnimating && { animation: !1 },
                        h = {},
                        q,
                        k = ["eventOptions", "navigatorSeries", "baseSeries"],
                        n = c.type || f.type || b.options.chart.type,
                        u = !(
                            this.hasDerivedData ||
                            (n && n !== this.type) ||
                            "undefined" !== typeof c.pointStart ||
                            "undefined" !== typeof c.pointInterval ||
                            "undefined" !== typeof c.relativeXValue ||
                            d.hasOptionChanged("dataGrouping") ||
                            d.hasOptionChanged("pointStart") ||
                            d.hasOptionChanged("pointInterval") ||
                            d.hasOptionChanged("pointIntervalUnit") ||
                            d.hasOptionChanged("keys")
                        );
                    n = n || e;
                    u &&
                        (k.push(
                            "data",
                            "isDirtyData",
                            "points",
                            "processedXData",
                            "processedYData",
                            "xIncrement",
                            "cropped",
                            "_hasPointMarkers",
                            "_hasPointLabels",
                            "clips",
                            "nodes",
                            "layout",
                            "mapMap",
                            "mapData",
                            "minY",
                            "maxY",
                            "minX",
                            "maxX"
                        ),
                        !1 !== c.visible && k.push("area", "graph"),
                        d.parallelArrays.forEach(function (c) {
                            k.push(c + "Data");
                        }),
                        c.data && (c.dataSorting && K(d.options.dataSorting, c.dataSorting), this.setData(c.data, !1)));
                    c = T(f, l, { index: "undefined" === typeof f.index ? d.index : f.index, pointStart: J(g && g.series && g.series.pointStart, f.pointStart, d.xData[0]) }, !u && { data: d.options.data }, c);
                    u && c.data && (c.data = d.options.data);
                    k = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(k);
                    k.forEach(function (c) {
                        k[c] = d[c];
                        delete d[c];
                    });
                    g = !1;
                    if (r[n]) {
                        if (((g = n !== d.type), d.remove(!1, !1, !1, !0), g))
                            if (Object.setPrototypeOf) Object.setPrototypeOf(d, r[n].prototype);
                            else {
                                l = Object.hasOwnProperty.call(d, "hcEvents") && d.hcEvents;
                                for (q in m) d[q] = void 0;
                                K(d, r[n].prototype);
                                l ? (d.hcEvents = l) : delete d.hcEvents;
                            }
                    } else v(17, !0, b, { missingModuleFor: n });
                    k.forEach(function (c) {
                        d[c] = k[c];
                    });
                    d.init(b, c);
                    if (u && this.points) {
                        var z = d.options;
                        !1 === z.visible
                            ? ((h.graphic = 1), (h.dataLabel = 1))
                            : d._hasPointLabels || ((c = z.marker), (m = z.dataLabels), !c || (!1 !== c.enabled && (f.marker && f.marker.symbol) === c.symbol) || (h.graphic = 1), m && !1 === m.enabled && (h.dataLabel = 1));
                        this.points.forEach(function (c) {
                            c && c.series && (c.resolveColor(), Object.keys(h).length && c.destroyElements(h), !1 === z.showInLegend && c.legendItem && b.legend.destroyItem(c));
                        }, this);
                    }
                    d.initialType = e;
                    b.linkSeries();
                    g && d.linkedSeries.length && (d.isDirtyData = !0);
                    I(this, "afterUpdate");
                    J(a, !0) && b.redraw(u ? void 0 : !1);
                };
                b.prototype.setName = function (c) {
                    this.name = this.options.name = this.userOptions.name = c;
                    this.chart.isDirtyLegend = !0;
                };
                b.prototype.hasOptionChanged = function (c) {
                    var a = this.options[c],
                        d = this.chart.options.plotOptions,
                        b = this.userOptions[c];
                    return b ? a !== b : a !== J(d && d[this.type] && d[this.type][c], d && d.series && d.series[c], a);
                };
                b.prototype.onMouseOver = function () {
                    var c = this.chart,
                        a = c.hoverSeries;
                    c.pointer.setHoverChartIndex();
                    if (a && a !== this) a.onMouseOut();
                    this.options.events.mouseOver && I(this, "mouseOver");
                    this.setState("hover");
                    c.hoverSeries = this;
                };
                b.prototype.onMouseOut = function () {
                    var c = this.options,
                        a = this.chart,
                        d = a.tooltip,
                        b = a.hoverPoint;
                    a.hoverSeries = null;
                    if (b) b.onMouseOut();
                    this && c.events.mouseOut && I(this, "mouseOut");
                    !d || this.stickyTracking || (d.shared && !this.noSharedTooltip) || d.hide();
                    a.series.forEach(function (c) {
                        c.setState("", !0);
                    });
                };
                b.prototype.setState = function (c, a) {
                    var d = this,
                        b = d.options,
                        f = d.graph,
                        e = b.inactiveOtherPoints,
                        g = b.states,
                        m = J(g[c || "normal"] && g[c || "normal"].animation, d.chart.options.chart.animation),
                        l = b.lineWidth,
                        h = 0,
                        q = b.opacity;
                    c = c || "";
                    if (
                        d.state !== c &&
                        ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (a) {
                            a && (d.state && a.removeClass("highcharts-series-" + d.state), c && a.addClass("highcharts-series-" + c));
                        }),
                        (d.state = c),
                        !d.chart.styledMode)
                    ) {
                        if (g[c] && !1 === g[c].enabled) return;
                        c && ((l = g[c].lineWidth || l + (g[c].lineWidthPlus || 0)), (q = J(g[c].opacity, q)));
                        if (f && !f.dashstyle) for (b = { "stroke-width": l }, f.animate(b, m); d["zone-graph-" + h]; ) d["zone-graph-" + h].animate(b, m), (h += 1);
                        e ||
                            [d.group, d.markerGroup, d.dataLabelsGroup, d.labelBySeries].forEach(function (c) {
                                c && c.animate({ opacity: q }, m);
                            });
                    }
                    a && e && d.points && d.setAllPointsToState(c || void 0);
                };
                b.prototype.setAllPointsToState = function (c) {
                    this.points.forEach(function (a) {
                        a.setState && a.setState(c);
                    });
                };
                b.prototype.setVisible = function (c, a) {
                    var d = this,
                        b = d.chart,
                        f = d.legendItem,
                        e = b.options.chart.ignoreHiddenSeries,
                        g = d.visible,
                        m = (d.visible = c = d.options.visible = d.userOptions.visible = "undefined" === typeof c ? !g : c) ? "show" : "hide";
                    ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (c) {
                        if (d[c]) d[c][m]();
                    });
                    if (b.hoverSeries === d || (b.hoverPoint && b.hoverPoint.series) === d) d.onMouseOut();
                    f && b.legend.colorizeItem(d, c);
                    d.isDirty = !0;
                    d.options.stacking &&
                        b.series.forEach(function (c) {
                            c.options.stacking && c.visible && (c.isDirty = !0);
                        });
                    d.linkedSeries.forEach(function (a) {
                        a.setVisible(c, !1);
                    });
                    e && (b.isDirtyBox = !0);
                    I(d, m);
                    !1 !== a && b.redraw();
                };
                b.prototype.show = function () {
                    this.setVisible(!0);
                };
                b.prototype.hide = function () {
                    this.setVisible(!1);
                };
                b.prototype.select = function (c) {
                    this.selected = c = this.options.selected = "undefined" === typeof c ? !this.selected : c;
                    this.checkbox && (this.checkbox.checked = c);
                    I(this, c ? "select" : "unselect");
                };
                b.prototype.shouldShowTooltip = function (c, a, d) {
                    void 0 === d && (d = {});
                    d.series = this;
                    d.visiblePlotOnly = !0;
                    return this.chart.isInsidePlot(c, a, d);
                };
                b.defaultOptions = B;
                return b;
            })();
            K(b.prototype, {
                axisTypes: ["xAxis", "yAxis"],
                coll: "series",
                colorCounter: 0,
                cropShoulder: 1,
                directTouch: !1,
                drawLegendSymbol: w.drawLineMarker,
                isCartesian: !0,
                kdAxisArray: ["clientX", "plotY"],
                parallelArrays: ["x", "y"],
                pointClass: D,
                requireSorting: !0,
                sorted: !0,
            });
            k.series = b;
            ("");
            ("");
            return b;
        }
    );
    G(
        b,
        "Extensions/ScrollablePlotArea.js",
        [b["Core/Animation/AnimationUtilities.js"], b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"], b["Core/Series/Series.js"], b["Core/Renderer/RendererRegistry.js"], b["Core/Utilities.js"]],
        function (b, p, A, E, w, D) {
            var v = b.stop,
                k = D.addEvent,
                t = D.createElement,
                n = D.merge,
                h = D.pick;
            k(A, "afterSetChartSize", function (d) {
                var a = this.options.chart.scrollablePlotArea,
                    b = a && a.minWidth;
                a = a && a.minHeight;
                if (!this.renderer.forExport) {
                    if (b) {
                        if ((this.scrollablePixelsX = b = Math.max(0, b - this.chartWidth))) {
                            this.scrollablePlotBox = this.renderer.scrollablePlotBox = n(this.plotBox);
                            this.plotBox.width = this.plotWidth += b;
                            this.inverted ? (this.clipBox.height += b) : (this.clipBox.width += b);
                            var g = { 1: { name: "right", value: b } };
                        }
                    } else
                        a &&
                            (this.scrollablePixelsY = b = Math.max(0, a - this.chartHeight)) &&
                            ((this.scrollablePlotBox = this.renderer.scrollablePlotBox = n(this.plotBox)),
                            (this.plotBox.height = this.plotHeight += b),
                            this.inverted ? (this.clipBox.width += b) : (this.clipBox.height += b),
                            (g = { 2: { name: "bottom", value: b } }));
                    g &&
                        !d.skipAxes &&
                        this.axes.forEach(function (a) {
                            g[a.side]
                                ? (a.getPlotLinePath = function () {
                                      var d = g[a.side].name,
                                          b = this[d];
                                      this[d] = b - g[a.side].value;
                                      var e = p.prototype.getPlotLinePath.apply(this, arguments);
                                      this[d] = b;
                                      return e;
                                  })
                                : (a.setAxisSize(), a.setAxisTranslation());
                        });
                }
            });
            k(A, "render", function () {
                this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed();
            });
            A.prototype.setUpScrolling = function () {
                var d = this,
                    a = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
                this.scrollablePixelsX && (a.overflowX = "auto");
                this.scrollablePixelsY && (a.overflowY = "auto");
                this.scrollingParent = t("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, this.renderTo);
                this.scrollingContainer = t("div", { className: "highcharts-scrolling" }, a, this.scrollingParent);
                k(this.scrollingContainer, "scroll", function () {
                    d.pointer && delete d.pointer.chartPosition;
                });
                this.innerContainer = t("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer);
                this.innerContainer.appendChild(this.container);
                this.setUpScrolling = null;
            };
            A.prototype.moveFixedElements = function () {
                var d = this.container,
                    a = this.fixedRenderer,
                    b = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
                        " "
                    ),
                    g;
                this.scrollablePixelsX && !this.inverted
                    ? (g = ".highcharts-yaxis")
                    : this.scrollablePixelsX && this.inverted
                    ? (g = ".highcharts-xaxis")
                    : this.scrollablePixelsY && !this.inverted
                    ? (g = ".highcharts-xaxis")
                    : this.scrollablePixelsY && this.inverted && (g = ".highcharts-yaxis");
                g && b.push(g + ":not(.highcharts-radial-axis)", g + "-labels:not(.highcharts-radial-axis-labels)");
                b.forEach(function (b) {
                    [].forEach.call(d.querySelectorAll(b), function (d) {
                        (d.namespaceURI === a.SVG_NS ? a.box : a.box.parentNode).appendChild(d);
                        d.style.pointerEvents = "auto";
                    });
                });
            };
            A.prototype.applyFixed = function () {
                var d = !this.fixedDiv,
                    a = this.options.chart,
                    b = a.scrollablePlotArea,
                    g = w.getRendererType();
                d
                    ? ((this.fixedDiv = t("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: ((a.style && a.style.zIndex) || 0) + 2, top: 0 }, null, !0)),
                      this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer),
                      (this.renderTo.style.overflow = "visible"),
                      (this.fixedRenderer = a = new g(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style)),
                      (this.scrollableMask = a
                          .path()
                          .attr({ fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": h(b.opacity, 0.85), zIndex: -1 })
                          .addClass("highcharts-scrollable-mask")
                          .add()),
                      k(this, "afterShowResetZoom", this.moveFixedElements),
                      k(this, "afterDrilldown", this.moveFixedElements),
                      k(this, "afterLayOutTitles", this.moveFixedElements))
                    : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
                if (this.scrollableDirty || d) (this.scrollableDirty = !1), this.moveFixedElements();
                a = this.chartWidth + (this.scrollablePixelsX || 0);
                g = this.chartHeight + (this.scrollablePixelsY || 0);
                v(this.container);
                this.container.style.width = a + "px";
                this.container.style.height = g + "px";
                this.renderer.boxWrapper.attr({ width: a, height: g, viewBox: [0, 0, a, g].join(" ") });
                this.chartBackground.attr({ width: a, height: g });
                this.scrollingContainer.style.height = this.chartHeight + "px";
                d && (b.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * b.scrollPositionX), b.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * b.scrollPositionY));
                g = this.axisOffset;
                d = this.plotTop - g[0] - 1;
                b = this.plotLeft - g[3] - 1;
                a = this.plotTop + this.plotHeight + g[2] + 1;
                g = this.plotLeft + this.plotWidth + g[1] + 1;
                var n = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                    C = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                d = this.scrollablePixelsX
                    ? [["M", 0, d], ["L", this.plotLeft - 1, d], ["L", this.plotLeft - 1, a], ["L", 0, a], ["Z"], ["M", n, d], ["L", this.chartWidth, d], ["L", this.chartWidth, a], ["L", n, a], ["Z"]]
                    : this.scrollablePixelsY
                    ? [["M", b, 0], ["L", b, this.plotTop - 1], ["L", g, this.plotTop - 1], ["L", g, 0], ["Z"], ["M", b, C], ["L", b, this.chartHeight], ["L", g, this.chartHeight], ["L", g, C], ["Z"]]
                    : [["M", 0, 0]];
                "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: d });
            };
            k(p, "afterInit", function () {
                this.chart.scrollableDirty = !0;
            });
            k(E, "show", function () {
                this.chart.scrollableDirty = !0;
            });
            ("");
        }
    );
    G(b, "Core/Axis/StackingAxis.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Axis/Axis.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = b.getDeferredAnimation,
            w = A.addEvent,
            D = A.destroyObjectProperties,
            B = A.fireEvent,
            k = A.isNumber,
            t = A.objectEach,
            n;
        (function (b) {
            function d() {
                var a = this.stacking;
                if (a) {
                    var d = a.stacks;
                    t(d, function (a, b) {
                        D(a);
                        d[b] = null;
                    });
                    a && a.stackTotalGroup && a.stackTotalGroup.destroy();
                }
            }
            function a() {
                this.stacking || (this.stacking = new g(this));
            }
            var e = [];
            b.compose = function (b) {
                -1 === e.indexOf(b) && (e.push(b), w(b, "init", a), w(b, "destroy", d));
                return b;
            };
            var g = (function () {
                function a(a) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = a;
                }
                a.prototype.buildStacks = function () {
                    var a = this.axis,
                        d = a.series,
                        b = a.options.reversedStacks,
                        e = d.length,
                        g;
                    if (!a.isXAxis) {
                        this.usePercentage = !1;
                        for (g = e; g--; ) {
                            var f = d[b ? g : e - g - 1];
                            f.setStackedPoints();
                            f.setGroupedPoints();
                        }
                        for (g = 0; g < e; g++) d[g].modifyStacks();
                        B(a, "afterBuildStacks");
                    }
                };
                a.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var a = (this.stacks = this.oldStacks);
                        t(a, function (a) {
                            t(a, function (a) {
                                a.cumulative = a.total;
                            });
                        });
                    }
                };
                a.prototype.resetStacks = function () {
                    var a = this,
                        d = a.stacks;
                    a.axis.isXAxis ||
                        t(d, function (d) {
                            t(d, function (b, e) {
                                k(b.touched) && b.touched < a.stacksTouched ? (b.destroy(), delete d[e]) : ((b.total = null), (b.cumulative = null));
                            });
                        });
                };
                a.prototype.renderStackTotals = function () {
                    var a = this.axis,
                        d = a.chart,
                        b = d.renderer,
                        e = this.stacks;
                    a = v(d, (a.options.stackLabels && a.options.stackLabels.animation) || !1);
                    var g = (this.stackTotalGroup = this.stackTotalGroup || b.g("stack-labels").attr({ visibility: "visible", zIndex: 6, opacity: 0 }).add());
                    g.translate(d.plotLeft, d.plotTop);
                    t(e, function (a) {
                        t(a, function (a) {
                            a.render(g);
                        });
                    });
                    g.animate({ opacity: 1 }, a);
                };
                return a;
            })();
            b.Additions = g;
        })(n || (n = {}));
        return n;
    });
    G(b, "Extensions/Stacking.js", [b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Axis/StackingAxis.js"], b["Core/Utilities.js"]], function (
        b,
        p,
        A,
        E,
        w,
        D,
        B
    ) {
        var k = A.format,
            t = B.correctFloat,
            n = B.defined,
            h = B.destroyObjectProperties,
            d = B.isArray,
            a = B.isNumber,
            e = B.objectEach,
            g = B.pick,
            x = (function () {
                function d(a, d, b, e, f) {
                    var g = a.chart.inverted;
                    this.axis = a;
                    this.isNegative = b;
                    this.options = d = d || {};
                    this.x = e;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = f;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = { align: d.align || (g ? (b ? "left" : "right") : "center"), verticalAlign: d.verticalAlign || (g ? "middle" : b ? "bottom" : "top"), y: d.y, x: d.x };
                    this.textAlign = d.textAlign || (g ? (b ? "right" : "left") : "center");
                }
                d.prototype.destroy = function () {
                    h(this, this.axis);
                };
                d.prototype.render = function (a) {
                    var d = this.axis.chart,
                        b = this.options,
                        e = b.format;
                    e = e ? k(e, this, d) : b.formatter.call(this);
                    this.label
                        ? this.label.attr({ text: e, visibility: "hidden" })
                        : ((this.label = d.renderer.label(e, null, null, b.shape, null, null, b.useHTML, !1, "stack-labels")),
                          (e = { r: b.borderRadius || 0, text: e, rotation: b.rotation, padding: g(b.padding, 5), visibility: "hidden" }),
                          d.styledMode || ((e.fill = b.backgroundColor), (e.stroke = b.borderColor), (e["stroke-width"] = b.borderWidth), this.label.css(b.style)),
                          this.label.attr(e),
                          this.label.added || this.label.add(a));
                    this.label.labelrank = d.plotSizeY;
                };
                d.prototype.setOffset = function (d, b, e, m, f) {
                    var h = this.axis,
                        c = h.chart;
                    m = h.translate(h.stacking.usePercentage ? 100 : m ? m : this.total, 0, 0, 0, 1);
                    e = h.translate(e ? e : 0);
                    e = n(m) && Math.abs(m - e);
                    d = g(f, c.xAxis[0].translate(this.x)) + d;
                    h = n(m) && this.getStackBox(c, this, d, m, b, e, h);
                    b = this.label;
                    e = this.isNegative;
                    d = "justify" === g(this.options.overflow, "justify");
                    var k = this.textAlign;
                    b &&
                        h &&
                        ((f = b.getBBox()),
                        (m = b.padding),
                        (k = "left" === k ? (c.inverted ? -m : m) : "right" === k ? f.width : c.inverted && "center" === k ? f.width / 2 : c.inverted ? (e ? f.width + m : -m) : f.width / 2),
                        (e = c.inverted ? f.height / 2 : e ? -m : f.height),
                        (this.alignOptions.x = g(this.options.x, 0)),
                        (this.alignOptions.y = g(this.options.y, 0)),
                        (h.x -= k),
                        (h.y -= e),
                        b.align(this.alignOptions, null, h),
                        c.isInsidePlot(b.alignAttr.x + k - this.alignOptions.x, b.alignAttr.y + e - this.alignOptions.y) ? b.show() : ((b.alignAttr.y = -9999), (d = !1)),
                        d && w.prototype.justifyDataLabel.call(this.axis, b, this.alignOptions, b.alignAttr, f, h),
                        b.attr({ x: b.alignAttr.x, y: b.alignAttr.y }),
                        g(!d && this.options.crop, !0) && ((c = a(b.x) && a(b.y) && c.isInsidePlot(b.x - m + b.width, b.y) && c.isInsidePlot(b.x + m, b.y)) || b.hide()));
                };
                d.prototype.getStackBox = function (a, d, b, e, f, g, c) {
                    var m = d.axis.reversed,
                        l = a.inverted,
                        h = c.height + c.pos - (l ? a.plotLeft : a.plotTop);
                    d = (d.isNegative && !m) || (!d.isNegative && m);
                    return { x: l ? (d ? e - c.right : e - g + c.pos - a.plotLeft) : b + a.xAxis[0].transB - a.plotLeft, y: l ? c.height - b - f : d ? h - e - g : h - e, width: l ? g : f, height: l ? f : g };
                };
                return d;
            })();
        p.prototype.getStacks = function () {
            var a = this,
                d = a.inverted;
            a.yAxis.forEach(function (a) {
                a.stacking && a.stacking.stacks && a.hasVisibleSeries && (a.stacking.oldStacks = a.stacking.stacks);
            });
            a.series.forEach(function (b) {
                var e = (b.xAxis && b.xAxis.options) || {};
                !b.options.stacking || (!0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries) || (b.stackKey = [b.type, g(b.options.stack, ""), d ? e.top : e.left, d ? e.height : e.width].join());
            });
        };
        D.compose(b);
        w.prototype.setGroupedPoints = function () {
            var a = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length
                ? w.prototype.setStackedPoints.call(this, "group")
                : a &&
                  e(a.stacks, function (d, b) {
                      "group" === b.slice(-5) &&
                          (e(d, function (a) {
                              return a.destroy();
                          }),
                          delete a.stacks[b]);
                  });
        };
        w.prototype.setStackedPoints = function (a) {
            var b = a || this.options.stacking;
            if (b && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var e = this.processedXData,
                    h = this.processedYData,
                    m = [],
                    f = h.length,
                    k = this.options,
                    c = k.threshold,
                    u = g(k.startFromThreshold && c, 0);
                k = k.stack;
                a = a ? this.type + "," + b : this.stackKey;
                var l = "-" + a,
                    C = this.negStacks,
                    p = this.yAxis,
                    v = p.stacking.stacks,
                    B = p.stacking.oldStacks,
                    w,
                    A;
                p.stacking.stacksTouched += 1;
                for (A = 0; A < f; A++) {
                    var D = e[A];
                    var E = h[A];
                    var T = this.getStackIndicator(T, D, this.index);
                    var G = T.key;
                    var J = (w = C && E < (u ? 0 : c)) ? l : a;
                    v[J] || (v[J] = {});
                    v[J][D] || (B[J] && B[J][D] ? ((v[J][D] = B[J][D]), (v[J][D].total = null)) : (v[J][D] = new x(p, p.options.stackLabels, w, D, k)));
                    J = v[J][D];
                    null !== E
                        ? ((J.points[G] = J.points[this.index] = [g(J.cumulative, u)]),
                          n(J.cumulative) || (J.base = G),
                          (J.touched = p.stacking.stacksTouched),
                          0 < T.index && !1 === this.singleStacks && (J.points[G][0] = J.points[this.index + "," + D + ",0"][0]))
                        : (J.points[G] = J.points[this.index] = null);
                    "percent" === b
                        ? ((w = w ? a : l), C && v[w] && v[w][D] ? ((w = v[w][D]), (J.total = w.total = Math.max(w.total, J.total) + Math.abs(E) || 0)) : (J.total = t(J.total + (Math.abs(E) || 0))))
                        : "group" === b
                        ? (d(E) && (E = E[0]), null !== E && (J.total = (J.total || 0) + 1))
                        : (J.total = t(J.total + (E || 0)));
                    J.cumulative = "group" === b ? (J.total || 1) - 1 : g(J.cumulative, u) + (E || 0);
                    null !== E && (J.points[G].push(J.cumulative), (m[A] = J.cumulative), (J.hasValidPoints = !0));
                }
                "percent" === b && (p.stacking.usePercentage = !0);
                "group" !== b && (this.stackedYData = m);
                p.stacking.oldStacks = {};
            }
        };
        w.prototype.modifyStacks = function () {
            var a = this,
                d = a.stackKey,
                b = a.yAxis.stacking.stacks,
                e = a.processedXData,
                g,
                f = a.options.stacking;
            a[f + "Stacker"] &&
                [d, "-" + d].forEach(function (d) {
                    for (var c = e.length, m, l; c--; ) if (((m = e[c]), (g = a.getStackIndicator(g, m, a.index, d)), (l = (m = b[d] && b[d][m]) && m.points[g.key]))) a[f + "Stacker"](l, m, c);
                });
        };
        w.prototype.percentStacker = function (a, d, b) {
            d = d.total ? 100 / d.total : 0;
            a[0] = t(a[0] * d);
            a[1] = t(a[1] * d);
            this.stackedYData[b] = a[1];
        };
        w.prototype.getStackIndicator = function (a, d, b, e) {
            !n(a) || a.x !== d || (e && a.key !== e) ? (a = { x: d, index: 0, key: e }) : a.index++;
            a.key = [b, d, a.index].join();
            return a;
        };
        E.StackItem = x;
        ("");
        return E.StackItem;
    });
    G(b, "Series/Line/LineSeries.js", [b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (k, t) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, h) {
                                    b.__proto__ = h;
                                }) ||
                            function (b, h) {
                                for (var d in h) h.hasOwnProperty(d) && (b[d] = h[d]);
                            };
                        return b(k, t);
                    };
                    return function (k, t) {
                        function n() {
                            this.constructor = k;
                        }
                        b(k, t);
                        k.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n());
                    };
                })(),
            w = A.defined,
            D = A.merge;
        A = (function (p) {
            function k() {
                var b = (null !== p && p.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            v(k, p);
            k.prototype.drawGraph = function () {
                var b = this,
                    k = this.options,
                    h = (this.gappedPath || this.getGraphPath).call(this),
                    d = this.chart.styledMode,
                    a = [["graph", "highcharts-graph"]];
                d || a[0].push(k.lineColor || this.color || "#cccccc", k.dashStyle);
                a = b.getZonesGraphs(a);
                a.forEach(function (a, g) {
                    var e = a[0],
                        n = b[e],
                        r = n ? "animate" : "attr";
                    n ? ((n.endX = b.preventGraphAnimation ? null : h.xMap), n.animate({ d: h })) : h.length && (b[e] = n = b.chart.renderer.path(h).addClass(a[1]).attr({ zIndex: 1 }).add(b.group));
                    n &&
                        !d &&
                        ((e = { stroke: a[2], "stroke-width": k.lineWidth, fill: (b.fillGraph && b.color) || "none" }),
                        a[3] ? (e.dashstyle = a[3]) : "square" !== k.linecap && (e["stroke-linecap"] = e["stroke-linejoin"] = "round"),
                        n[r](e).shadow(2 > g && k.shadow));
                    n && ((n.startX = h.xMap), (n.isArea = h.isArea));
                });
            };
            k.prototype.getGraphPath = function (b, k, h) {
                var d = this,
                    a = d.options,
                    e = [],
                    g = [],
                    n,
                    t = a.step;
                b = b || d.points;
                var r = b.reversed;
                r && b.reverse();
                (t = { right: 1, center: 2 }[t] || (t && 3)) && r && (t = 4 - t);
                b = this.getValidPoints(b, !1, !(a.connectNulls && !k && !h));
                b.forEach(function (q, r) {
                    var m = q.plotX,
                        f = q.plotY,
                        y = b[r - 1];
                    (q.leftCliff || (y && y.rightCliff)) && !h && (n = !0);
                    q.isNull && !w(k) && 0 < r
                        ? (n = !a.connectNulls)
                        : q.isNull && !k
                        ? (n = !0)
                        : (0 === r || n
                              ? (r = [["M", q.plotX, q.plotY]])
                              : d.getPointSpline
                              ? (r = [d.getPointSpline(b, q, r)])
                              : t
                              ? ((r =
                                    1 === t
                                        ? [["L", y.plotX, f]]
                                        : 2 === t
                                        ? [
                                              ["L", (y.plotX + m) / 2, y.plotY],
                                              ["L", (y.plotX + m) / 2, f],
                                          ]
                                        : [["L", m, y.plotY]]),
                                r.push(["L", m, f]))
                              : (r = [["L", m, f]]),
                          g.push(q.x),
                          t && (g.push(q.x), 2 === t && g.push(q.x)),
                          e.push.apply(e, r),
                          (n = !1));
                });
                e.xMap = g;
                return (d.graphPath = e);
            };
            k.prototype.getZonesGraphs = function (b) {
                this.zones.forEach(function (k, h) {
                    h = ["zone-graph-" + h, "highcharts-graph highcharts-zone-graph-" + h + " " + (k.className || "")];
                    this.chart.styledMode || h.push(k.color || this.color, k.dashStyle || this.options.dashStyle);
                    b.push(h);
                }, this);
                return b;
            };
            k.defaultOptions = D(b.defaultOptions, {});
            return k;
        })(b);
        p.registerSeriesType("line", A);
        ("");
        return A;
    });
    G(b, "Series/Area/AreaSeries.js", [b["Core/Color/Color.js"], b["Core/Legend/LegendSymbol.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (d, a) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                            };
                        return b(d, a);
                    };
                    return function (d, a) {
                        function e() {
                            this.constructor = d;
                        }
                        b(d, a);
                        d.prototype = null === a ? Object.create(a) : ((e.prototype = a.prototype), new e());
                    };
                })(),
            D = b.parse,
            B = A.seriesTypes.line;
        b = E.extend;
        var k = E.merge,
            t = E.objectEach,
            n = E.pick;
        E = (function (b) {
            function d() {
                var a = (null !== b && b.apply(this, arguments)) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a;
            }
            v(d, b);
            d.prototype.drawGraph = function () {
                this.areaPath = [];
                b.prototype.drawGraph.apply(this);
                var a = this,
                    d = this.areaPath,
                    g = this.options,
                    h = [["area", "highcharts-area", this.color, g.fillColor]];
                this.zones.forEach(function (d, b) {
                    h.push(["zone-area-" + b, "highcharts-area highcharts-zone-area-" + b + " " + d.className, d.color || a.color, d.fillColor || g.fillColor]);
                });
                h.forEach(function (b) {
                    var e = b[0],
                        h = a[e],
                        k = h ? "animate" : "attr",
                        m = {};
                    h ? ((h.endX = a.preventGraphAnimation ? null : d.xMap), h.animate({ d: d })) : ((m.zIndex = 0), (h = a[e] = a.chart.renderer.path(d).addClass(b[1]).add(a.group)), (h.isArea = !0));
                    a.chart.styledMode || (m.fill = n(b[3], D(b[2]).setOpacity(n(g.fillOpacity, 0.75)).get()));
                    h[k](m);
                    h.startX = d.xMap;
                    h.shiftUnit = g.step ? 2 : 1;
                });
            };
            d.prototype.getGraphPath = function (a) {
                var d = B.prototype.getGraphPath,
                    b = this.options,
                    h = b.stacking,
                    k = this.yAxis,
                    r,
                    q = [],
                    t = [],
                    m = this.index,
                    f = k.stacking.stacks[this.stackKey],
                    y = b.threshold,
                    c = Math.round(k.getThreshold(b.threshold));
                b = n(b.connectNulls, "percent" === h);
                var u = function (d, b, e) {
                    var g = a[d];
                    d = h && f[g.x].points[m];
                    var l = g[e + "Null"] || 0;
                    e = g[e + "Cliff"] || 0;
                    g = !0;
                    if (e || l) {
                        var n = (l ? d[0] : d[1]) + e;
                        var u = d[0] + e;
                        g = !!l;
                    } else !h && a[b] && a[b].isNull && (n = u = y);
                    "undefined" !== typeof n && (t.push({ plotX: p, plotY: null === n ? c : k.getThreshold(n), isNull: g, isCliff: !0 }), q.push({ plotX: p, plotY: null === u ? c : k.getThreshold(u), doCurve: !1 }));
                };
                a = a || this.points;
                h && (a = this.getStackPoints(a));
                for (r = 0; r < a.length; r++) {
                    h || (a[r].leftCliff = a[r].rightCliff = a[r].leftNull = a[r].rightNull = void 0);
                    var l = a[r].isNull;
                    var p = n(a[r].rectPlotX, a[r].plotX);
                    var v = h ? n(a[r].yBottom, c) : c;
                    if (!l || b) b || u(r, r - 1, "left"), (l && !h && b) || (t.push(a[r]), q.push({ x: r, plotX: p, plotY: v })), b || u(r, r + 1, "right");
                }
                r = d.call(this, t, !0, !0);
                q.reversed = !0;
                l = d.call(this, q, !0, !0);
                (v = l[0]) && "M" === v[0] && (l[0] = ["L", v[1], v[2]]);
                l = r.concat(l);
                l.length && l.push(["Z"]);
                d = d.call(this, t, !1, b);
                l.xMap = r.xMap;
                this.areaPath = l;
                return d;
            };
            d.prototype.getStackPoints = function (a) {
                var d = this,
                    b = [],
                    h = [],
                    k = this.xAxis,
                    r = this.yAxis,
                    q = r.stacking.stacks[this.stackKey],
                    z = {},
                    m = r.series,
                    f = m.length,
                    y = r.options.reversedStacks ? 1 : -1,
                    c = m.indexOf(d);
                a = a || this.points;
                if (this.options.stacking) {
                    for (var u = 0; u < a.length; u++) (a[u].leftNull = a[u].rightNull = void 0), (z[a[u].x] = a[u]);
                    t(q, function (c, a) {
                        null !== c.total && h.push(a);
                    });
                    h.sort(function (c, a) {
                        return c - a;
                    });
                    var l = m.map(function (c) {
                        return c.visible;
                    });
                    h.forEach(function (a, e) {
                        var g = 0,
                            u,
                            t;
                        if (z[a] && !z[a].isNull)
                            b.push(z[a]),
                                [-1, 1].forEach(function (b) {
                                    var g = 1 === b ? "rightNull" : "leftNull",
                                        k = 0,
                                        n = q[h[e + b]];
                                    if (n)
                                        for (var r = c; 0 <= r && r < f; ) {
                                            var x = m[r].index;
                                            u = n.points[x];
                                            u || (x === d.index ? (z[a][g] = !0) : l[r] && (t = q[a].points[x]) && (k -= t[1] - t[0]));
                                            r += y;
                                        }
                                    z[a][1 === b ? "rightCliff" : "leftCliff"] = k;
                                });
                        else {
                            for (var x = c; 0 <= x && x < f; ) {
                                if ((u = q[a].points[m[x].index])) {
                                    g = u[1];
                                    break;
                                }
                                x += y;
                            }
                            g = n(g, 0);
                            g = r.translate(g, 0, 1, 0, 1);
                            b.push({ isNull: !0, plotX: k.translate(a, 0, 0, 0, 1), x: a, plotY: g, yBottom: g });
                        }
                    });
                }
                return b;
            };
            d.defaultOptions = k(B.defaultOptions, { threshold: 0 });
            return d;
        })(B);
        b(E.prototype, { singleStacks: !1, drawLegendSymbol: p.drawRectangle });
        A.registerSeriesType("area", E);
        ("");
        return E;
    });
    G(b, "Series/Spline/SplineSeries.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (k, t) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, h) {
                                    b.__proto__ = h;
                                }) ||
                            function (b, h) {
                                for (var d in h) h.hasOwnProperty(d) && (b[d] = h[d]);
                            };
                        return b(k, t);
                    };
                    return function (k, t) {
                        function n() {
                            this.constructor = k;
                        }
                        b(k, t);
                        k.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n());
                    };
                })(),
            E = b.seriesTypes.line,
            w = p.merge,
            D = p.pick;
        p = (function (b) {
            function k() {
                var k = (null !== b && b.apply(this, arguments)) || this;
                k.data = void 0;
                k.options = void 0;
                k.points = void 0;
                return k;
            }
            v(k, b);
            k.prototype.getPointSpline = function (b, k, h) {
                var d = k.plotX || 0,
                    a = k.plotY || 0,
                    e = b[h - 1];
                h = b[h + 1];
                if (e && !e.isNull && !1 !== e.doCurve && !k.isCliff && h && !h.isNull && !1 !== h.doCurve && !k.isCliff) {
                    b = e.plotY || 0;
                    var g = h.plotX || 0;
                    h = h.plotY || 0;
                    var n = 0;
                    var t = (1.5 * d + (e.plotX || 0)) / 2.5;
                    var r = (1.5 * a + b) / 2.5;
                    g = (1.5 * d + g) / 2.5;
                    var q = (1.5 * a + h) / 2.5;
                    g !== t && (n = ((q - r) * (g - d)) / (g - t) + a - q);
                    r += n;
                    q += n;
                    r > b && r > a ? ((r = Math.max(b, a)), (q = 2 * a - r)) : r < b && r < a && ((r = Math.min(b, a)), (q = 2 * a - r));
                    q > h && q > a ? ((q = Math.max(h, a)), (r = 2 * a - q)) : q < h && q < a && ((q = Math.min(h, a)), (r = 2 * a - q));
                    k.rightContX = g;
                    k.rightContY = q;
                }
                k = ["C", D(e.rightContX, e.plotX, 0), D(e.rightContY, e.plotY, 0), D(t, d, 0), D(r, a, 0), d, a];
                e.rightContX = e.rightContY = void 0;
                return k;
            };
            k.defaultOptions = w(E.defaultOptions);
            return k;
        })(E);
        b.registerSeriesType("spline", p);
        ("");
        return p;
    });
    G(b, "Series/AreaSpline/AreaSplineSeries.js", [b["Series/Area/AreaSeries.js"], b["Series/Spline/SplineSeries.js"], b["Core/Legend/LegendSymbol.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A, E, w) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (h, d) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                            };
                        return b(h, d);
                    };
                    return function (h, d) {
                        function a() {
                            this.constructor = h;
                        }
                        b(h, d);
                        h.prototype = null === d ? Object.create(d) : ((a.prototype = d.prototype), new a());
                    };
                })(),
            B = b.prototype,
            k = w.extend,
            t = w.merge;
        w = (function (k) {
            function h() {
                var d = (null !== k && k.apply(this, arguments)) || this;
                d.data = void 0;
                d.points = void 0;
                d.options = void 0;
                return d;
            }
            v(h, k);
            h.defaultOptions = t(p.defaultOptions, b.defaultOptions);
            return h;
        })(p);
        k(w.prototype, { getGraphPath: B.getGraphPath, getStackPoints: B.getStackPoints, drawGraph: B.drawGraph, drawLegendSymbol: A.drawRectangle });
        E.registerSeriesType("areaspline", w);
        ("");
        return w;
    });
    G(
        b,
        "Series/Column/ColumnSeries.js",
        [b["Core/Animation/AnimationUtilities.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Legend/LegendSymbol.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]],
        function (b, p, A, E, w, D, B) {
            var k =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (d, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (c, a) {
                                        c.__proto__ = a;
                                    }) ||
                                function (c, a) {
                                    for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
                                };
                            return a(d, c);
                        };
                        return function (d, c) {
                            function b() {
                                this.constructor = d;
                            }
                            a(d, c);
                            d.prototype = null === c ? Object.create(c) : ((b.prototype = c.prototype), new b());
                        };
                    })(),
                t = b.animObject,
                n = p.parse,
                h = A.hasTouch;
            b = A.noop;
            var d = B.clamp,
                a = B.css,
                e = B.defined,
                g = B.extend,
                x = B.fireEvent,
                v = B.isArray,
                r = B.isNumber,
                q = B.merge,
                z = B.pick,
                m = B.objectEach;
            B = (function (b) {
                function f() {
                    var c = (null !== b && b.apply(this, arguments)) || this;
                    c.borderWidth = void 0;
                    c.data = void 0;
                    c.group = void 0;
                    c.options = void 0;
                    c.points = void 0;
                    return c;
                }
                k(f, b);
                f.prototype.animate = function (c) {
                    var a = this,
                        b = this.yAxis,
                        f = a.options,
                        e = this.chart.inverted,
                        m = {},
                        h = e ? "translateX" : "translateY";
                    if (c) (m.scaleY = 0.001), (c = d(b.toPixels(f.threshold), b.pos, b.pos + b.len)), e ? (m.translateX = c - b.len) : (m.translateY = c), a.clipBox && a.setClip(), a.group.attr(m);
                    else {
                        var k = Number(a.group.attr(h));
                        a.group.animate(
                            { scaleY: 1 },
                            g(t(a.options.animation), {
                                step: function (c, d) {
                                    a.group && ((m[h] = k + d.pos * (b.pos - k)), a.group.attr(m));
                                },
                            })
                        );
                    }
                };
                f.prototype.init = function (c, a) {
                    b.prototype.init.apply(this, arguments);
                    var d = this;
                    c = d.chart;
                    c.hasRendered &&
                        c.series.forEach(function (c) {
                            c.type === d.type && (c.isDirty = !0);
                        });
                };
                f.prototype.getColumnMetrics = function () {
                    var c = this,
                        a = c.options,
                        d = c.xAxis,
                        b = c.yAxis,
                        f = d.options.reversedStacks;
                    f = (d.reversed && !f) || (!d.reversed && f);
                    var e = {},
                        g,
                        m = 0;
                    !1 === a.grouping
                        ? (m = 1)
                        : c.chart.series.forEach(function (a) {
                              var d = a.yAxis,
                                  f = a.options;
                              if (a.type === c.type && (a.visible || !c.chart.options.chart.ignoreHiddenSeries) && b.len === d.len && b.pos === d.pos) {
                                  if (f.stacking && "group" !== f.stacking) {
                                      g = a.stackKey;
                                      "undefined" === typeof e[g] && (e[g] = m++);
                                      var h = e[g];
                                  } else !1 !== f.grouping && (h = m++);
                                  a.columnIndex = h;
                              }
                          });
                    var h = Math.min(Math.abs(d.transA) * ((d.ordinal && d.ordinal.slope) || a.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
                        k = h * a.groupPadding,
                        q = (h - 2 * k) / (m || 1);
                    a = Math.min(a.maxPointWidth || d.len, z(a.pointWidth, q * (1 - 2 * a.pointPadding)));
                    c.columnMetrics = { width: a, offset: (q - a) / 2 + (k + ((c.columnIndex || 0) + (f ? 1 : 0)) * q - h / 2) * (f ? -1 : 1), paddedWidth: q, columnCount: m };
                    return c.columnMetrics;
                };
                f.prototype.crispCol = function (c, a, d, b) {
                    var f = this.chart,
                        e = this.borderWidth,
                        g = -(e % 2 ? 0.5 : 0);
                    e = e % 2 ? 0.5 : 1;
                    f.inverted && f.renderer.isVML && (e += 1);
                    this.options.crisp && ((d = Math.round(c + d) + g), (c = Math.round(c) + g), (d -= c));
                    b = Math.round(a + b) + e;
                    g = 0.5 >= Math.abs(a) && 0.5 < b;
                    a = Math.round(a) + e;
                    b -= a;
                    g && b && (--a, (b += 1));
                    return { x: c, y: a, width: d, height: b };
                };
                f.prototype.adjustForMissingColumns = function (c, a, d, b) {
                    var f = this,
                        e = this.options.stacking;
                    if (!d.isNull && 1 < b.columnCount) {
                        var g = 0,
                            h = 0;
                        m(this.yAxis.stacking && this.yAxis.stacking.stacks, function (c) {
                            if ("number" === typeof d.x && (c = c[d.x.toString()])) {
                                var a = c.points[f.index],
                                    b = c.total;
                                e ? (a && (g = h), c.hasValidPoints && h++) : v(a) && ((g = a[1]), (h = b || 0));
                            }
                        });
                        c = (d.plotX || 0) + ((h - 1) * b.paddedWidth + a) / 2 - a - g * b.paddedWidth;
                    }
                    return c;
                };
                f.prototype.translate = function () {
                    var c = this,
                        a = c.chart,
                        b = c.options,
                        f = (c.dense = 2 > c.closestPointRange * c.xAxis.transA);
                    f = c.borderWidth = z(b.borderWidth, f ? 0 : 1);
                    var g = c.xAxis,
                        m = c.yAxis,
                        h = b.threshold,
                        k = (c.translatedThreshold = m.getThreshold(h)),
                        q = z(b.minPointLength, 5),
                        n = c.getColumnMetrics(),
                        y = n.width,
                        t = (c.pointXOffset = n.offset),
                        x = c.dataMin,
                        p = c.dataMax,
                        v = (c.barW = Math.max(y, 1 + 2 * f));
                    a.inverted && (k -= 0.5);
                    b.pointPadding && (v = Math.ceil(v));
                    w.prototype.translate.apply(c);
                    c.points.forEach(function (f) {
                        var l = z(f.yBottom, k),
                            u = 999 + Math.abs(l),
                            C = f.plotX || 0;
                        u = d(f.plotY, -u, m.len + u);
                        var w = Math.min(u, l),
                            B = Math.max(u, l) - w,
                            F = y,
                            A = C + t,
                            D = v;
                        q &&
                            Math.abs(B) < q &&
                            ((B = q),
                            (C = (!m.reversed && !f.negative) || (m.reversed && f.negative)),
                            r(h) && r(p) && f.y === h && p <= h && (m.min || 0) < h && (x !== p || (m.max || 0) <= h) && (C = !C),
                            (w = Math.abs(w - k) > q ? l - q : k - (C ? q : 0)));
                        e(f.options.pointWidth) && ((F = D = Math.ceil(f.options.pointWidth)), (A -= Math.round((F - y) / 2)));
                        b.centerInCategory && (A = c.adjustForMissingColumns(A, F, f, n));
                        f.barX = A;
                        f.pointWidth = F;
                        f.tooltipPos = a.inverted
                            ? [d(m.len + m.pos - a.plotLeft - u, m.pos - a.plotLeft, m.len + m.pos - a.plotLeft), g.len + g.pos - a.plotTop - A - D / 2, B]
                            : [g.left - a.plotLeft + A + D / 2, d(u + m.pos - a.plotTop, m.pos - a.plotTop, m.len + m.pos - a.plotTop), B];
                        f.shapeType = c.pointClass.prototype.shapeType || "rect";
                        f.shapeArgs = c.crispCol.apply(c, f.isNull ? [A, k, D, 0] : [A, w, D, B]);
                    });
                };
                f.prototype.drawGraph = function () {
                    this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
                };
                f.prototype.pointAttribs = function (c, a) {
                    var d = this.options,
                        b = this.pointAttrToOptions || {},
                        f = b.stroke || "borderColor",
                        e = b["stroke-width"] || "borderWidth",
                        g = (c && c.color) || this.color,
                        m = (c && c[f]) || d[f] || g;
                    b = (c && c.options.dashStyle) || d.dashStyle;
                    var h = (c && c[e]) || d[e] || this[e] || 0,
                        k = z(c && c.opacity, d.opacity, 1);
                    if (c && this.zones.length) {
                        var r = c.getZone();
                        g = c.options.color || (r && (r.color || c.nonZonedColor)) || this.color;
                        r && ((m = r.borderColor || m), (b = r.dashStyle || b), (h = r.borderWidth || h));
                    }
                    a &&
                        c &&
                        ((c = q(d.states[a], (c.options.states && c.options.states[a]) || {})),
                        (a = c.brightness),
                        (g = c.color || ("undefined" !== typeof a && n(g).brighten(c.brightness).get()) || g),
                        (m = c[f] || m),
                        (h = c[e] || h),
                        (b = c.dashStyle || b),
                        (k = z(c.opacity, k)));
                    f = { fill: g, stroke: m, "stroke-width": h, opacity: k };
                    b && (f.dashstyle = b);
                    return f;
                };
                f.prototype.drawPoints = function () {
                    var c = this,
                        a = this.chart,
                        d = c.options,
                        b = a.renderer,
                        f = d.animationLimit || 250,
                        e;
                    c.points.forEach(function (g) {
                        var m = g.graphic,
                            h = !!m,
                            l = m && a.pointCount < f ? "animate" : "attr";
                        if (r(g.plotY) && null !== g.y) {
                            e = g.shapeArgs;
                            m && g.hasNewShapeType() && (m = m.destroy());
                            c.enabledDataSorting && (g.startXPos = c.xAxis.reversed ? -(e ? e.width || 0 : 0) : c.xAxis.width);
                            m || ((g.graphic = m = b[g.shapeType](e).add(g.group || c.group)) && c.enabledDataSorting && a.hasRendered && a.pointCount < f && (m.attr({ x: g.startXPos }), (h = !0), (l = "animate")));
                            if (m && h) m[l](q(e));
                            if (d.borderRadius) m[l]({ r: d.borderRadius });
                            a.styledMode || m[l](c.pointAttribs(g, g.selected && "select")).shadow(!1 !== g.allowShadow && d.shadow, null, d.stacking && !d.borderRadius);
                            m && (m.addClass(g.getClassName(), !0), m.attr({ visibility: g.visible ? "inherit" : "hidden" }));
                        } else m && (g.graphic = m.destroy());
                    });
                };
                f.prototype.drawTracker = function () {
                    var c = this,
                        d = c.chart,
                        b = d.pointer,
                        f = function (c) {
                            var a = b.getPointFromEvent(c);
                            "undefined" !== typeof a && ((b.isDirectTouch = !0), a.onMouseOver(c));
                        },
                        e;
                    c.points.forEach(function (c) {
                        e = v(c.dataLabels) ? c.dataLabels : c.dataLabel ? [c.dataLabel] : [];
                        c.graphic && (c.graphic.element.point = c);
                        e.forEach(function (a) {
                            a.div ? (a.div.point = c) : (a.element.point = c);
                        });
                    });
                    c._hasTracking ||
                        (c.trackerGroups.forEach(function (e) {
                            if (c[e]) {
                                c[e]
                                    .addClass("highcharts-tracker")
                                    .on("mouseover", f)
                                    .on("mouseout", function (c) {
                                        b.onTrackerMouseOut(c);
                                    });
                                if (h) c[e].on("touchstart", f);
                                !d.styledMode && c.options.cursor && c[e].css(a).css({ cursor: c.options.cursor });
                            }
                        }),
                        (c._hasTracking = !0));
                    x(this, "afterDrawTracker");
                };
                f.prototype.remove = function () {
                    var c = this,
                        a = c.chart;
                    a.hasRendered &&
                        a.series.forEach(function (a) {
                            a.type === c.type && (a.isDirty = !0);
                        });
                    w.prototype.remove.apply(c, arguments);
                };
                f.defaultOptions = q(w.defaultOptions, {
                    borderRadius: 0,
                    centerInCategory: !1,
                    groupPadding: 0.2,
                    marker: null,
                    pointPadding: 0.1,
                    minPointLength: 0,
                    cropThreshold: 50,
                    pointRange: null,
                    states: { hover: { halo: !1, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } },
                    dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
                    startFromThreshold: !0,
                    stickyTracking: !1,
                    tooltip: { distance: 6 },
                    threshold: 0,
                    borderColor: "#ffffff",
                });
                return f;
            })(w);
            g(B.prototype, { cropShoulder: 0, directTouch: !0, drawLegendSymbol: E.drawRectangle, getSymbol: b, negStacks: !0, trackerGroups: ["group", "dataLabelsGroup"] });
            D.registerSeriesType("column", B);
            ("");
            ("");
            return B;
        }
    );
    G(b, "Core/Series/DataLabel.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/FormatUtilities.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = b.getDeferredAnimation,
            w = p.format,
            D = A.defined,
            B = A.extend,
            k = A.fireEvent,
            t = A.isArray,
            n = A.merge,
            h = A.objectEach,
            d = A.pick,
            a = A.splat,
            e;
        (function (b) {
            function e(a, c, b, f, e) {
                var g = this,
                    m = this.chart,
                    h = this.isCartesian && m.inverted,
                    l = this.enabledDataSorting,
                    k = d(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                    q = d(a.plotY, -9999),
                    n = c.getBBox(),
                    r = b.rotation,
                    u = b.align,
                    t = m.isInsidePlot(k, Math.round(q), { inverted: h, paneCoordinates: !0, series: g }),
                    y = function (d) {
                        l && g.xAxis && !z && g.setDataLabelStartPos(a, c, e, t, d);
                    },
                    z = "justify" === d(b.overflow, l ? "none" : "justify"),
                    x =
                        this.visible &&
                        !1 !== a.visible &&
                        (a.series.forceDL || (l && !z) || t || (d(b.inside, !!this.options.stacking) && f && m.isInsidePlot(k, h ? f.x + 1 : f.y + f.height - 1, { inverted: h, paneCoordinates: !0, series: g })));
                if (x) {
                    var p = m.renderer.fontMetrics(m.styledMode ? void 0 : b.style.fontSize, c).b;
                    f = B({ x: h ? this.yAxis.len - q : k, y: Math.round(h ? this.xAxis.len - k : q), width: 0, height: 0 }, f);
                    B(b, { width: n.width, height: n.height });
                    r
                        ? ((z = !1),
                          (k = m.renderer.rotCorr(p, r)),
                          (k = { x: f.x + (b.x || 0) + f.width / 2 + k.x, y: f.y + (b.y || 0) + { top: 0, middle: 0.5, bottom: 1 }[b.verticalAlign] * f.height }),
                          y(k),
                          c[e ? "attr" : "animate"](k).attr({ align: u }),
                          (y = (r + 720) % 360),
                          (y = 180 < y && 360 > y),
                          "left" === u ? (k.y -= y ? n.height : 0) : "center" === u ? ((k.x -= n.width / 2), (k.y -= n.height / 2)) : "right" === u && ((k.x -= n.width), (k.y -= y ? 0 : n.height)),
                          (c.placed = !0),
                          (c.alignAttr = k))
                        : (y(f), c.align(b, void 0, f), (k = c.alignAttr));
                    z && 0 <= f.height
                        ? this.justifyDataLabel(c, b, k, n, f, e)
                        : d(b.crop, !0) && (x = m.isInsidePlot(k.x, k.y, { paneCoordinates: !0, series: g }) && m.isInsidePlot(k.x + n.width, k.y + n.height, { paneCoordinates: !0, series: g }));
                    if (b.shape && !r) c[e ? "attr" : "animate"]({ anchorX: h ? m.plotWidth - a.plotY : a.plotX, anchorY: h ? m.plotHeight - a.plotX : a.plotY });
                }
                e && l && (c.placed = !1);
                x || (l && !z) || (c.hide(!0), (c.placed = !1));
            }
            function g(a, c) {
                var d = c.filter;
                return d
                    ? ((c = d.operator), (a = a[d.property]), (d = d.value), (">" === c && a > d) || ("<" === c && a < d) || (">=" === c && a >= d) || ("<=" === c && a <= d) || ("==" === c && a == d) || ("===" === c && a === d) ? !0 : !1)
                    : !0;
            }
            function r() {
                var b = this,
                    c = b.chart,
                    f = b.options,
                    e = b.points,
                    m = b.hasRendered || 0,
                    q = c.renderer,
                    n = f.dataLabels,
                    r,
                    x = n.animation;
                x = n.defer ? v(c, x, b) : { defer: 0, duration: 0 };
                n = z(z(c.options.plotOptions && c.options.plotOptions.series && c.options.plotOptions.series.dataLabels, c.options.plotOptions && c.options.plotOptions[b.type] && c.options.plotOptions[b.type].dataLabels), n);
                k(this, "drawDataLabels");
                if (t(n) || n.enabled || b._hasPointLabels) {
                    var p = b.plotGroup("dataLabelsGroup", "data-labels", m ? "inherit" : "hidden", n.zIndex || 6);
                    p.attr({ opacity: +m });
                    !m && (m = b.dataLabelsGroup) && (b.visible && p.show(!0), m[f.animation ? "animate" : "attr"]({ opacity: 1 }, x));
                    e.forEach(function (e) {
                        r = a(z(n, e.dlOptions || (e.options && e.options.dataLabels)));
                        r.forEach(function (a, m) {
                            var l = a.enabled && (!e.isNull || e.dataLabelOnNull) && g(e, a),
                                k = e.connectors ? e.connectors[m] : e.connector,
                                n = e.dataLabels ? e.dataLabels[m] : e.dataLabel,
                                r = d(a.distance, e.labelDistance),
                                u = !n;
                            if (l) {
                                var t = e.getLabelConfig();
                                var z = d(a[e.formatPrefix + "Format"], a.format);
                                t = D(z) ? w(z, t, c) : (a[e.formatPrefix + "Formatter"] || a.formatter).call(t, a);
                                z = a.style;
                                var y = a.rotation;
                                c.styledMode ||
                                    ((z.color = d(a.color, z.color, b.color, "#000000")),
                                    "contrast" === z.color ? ((e.contrastColor = q.getContrast(e.color || b.color)), (z.color = (!D(r) && a.inside) || 0 > r || f.stacking ? e.contrastColor : "#000000")) : delete e.contrastColor,
                                    f.cursor && (z.cursor = f.cursor));
                                var x = { r: a.borderRadius || 0, rotation: y, padding: a.padding, zIndex: 1 };
                                c.styledMode || ((x.fill = a.backgroundColor), (x.stroke = a.borderColor), (x["stroke-width"] = a.borderWidth));
                                h(x, function (c, a) {
                                    "undefined" === typeof c && delete x[a];
                                });
                            }
                            !n ||
                                (l && D(t) && !!n.div === !!a.useHTML) ||
                                ((e.dataLabel = n = e.dataLabel && e.dataLabel.destroy()),
                                e.dataLabels && (1 === e.dataLabels.length ? delete e.dataLabels : delete e.dataLabels[m]),
                                m || delete e.dataLabel,
                                k && ((e.connector = e.connector.destroy()), e.connectors && (1 === e.connectors.length ? delete e.connectors : delete e.connectors[m])));
                            l &&
                                D(t) &&
                                (n
                                    ? (x.text = t)
                                    : ((e.dataLabels = e.dataLabels || []),
                                      (n = e.dataLabels[m] = y ? q.text(t, 0, -9999, a.useHTML).addClass("highcharts-data-label") : q.label(t, 0, -9999, a.shape, null, null, a.useHTML, null, "data-label")),
                                      m || (e.dataLabel = n),
                                      n.addClass(" highcharts-data-label-color-" + e.colorIndex + " " + (a.className || "") + (a.useHTML ? " highcharts-tracker" : ""))),
                                (n.options = a),
                                n.attr(x),
                                c.styledMode || n.css(z).shadow(a.shadow),
                                n.added || n.add(p),
                                a.textPath && !a.useHTML && (n.setTextPath((e.getDataLabelPath && e.getDataLabelPath(n)) || e.graphic, a.textPath), e.dataLabelPath && !a.textPath.enabled && (e.dataLabelPath = e.dataLabelPath.destroy())),
                                b.alignDataLabel(e, n, a, null, u));
                        });
                    });
                }
                k(this, "afterDrawDataLabels");
            }
            function q(a, c, d, b, f, e) {
                var g = this.chart,
                    m = c.align,
                    h = c.verticalAlign,
                    l = a.box ? 0 : a.padding || 0,
                    k = c.x;
                k = void 0 === k ? 0 : k;
                var n = c.y;
                n = void 0 === n ? 0 : n;
                var q = (d.x || 0) + l;
                if (0 > q) {
                    "right" === m && 0 <= k ? ((c.align = "left"), (c.inside = !0)) : (k -= q);
                    var r = !0;
                }
                q = (d.x || 0) + b.width - l;
                q > g.plotWidth && ("left" === m && 0 >= k ? ((c.align = "right"), (c.inside = !0)) : (k += g.plotWidth - q), (r = !0));
                q = d.y + l;
                0 > q && ("bottom" === h && 0 <= n ? ((c.verticalAlign = "top"), (c.inside = !0)) : (n -= q), (r = !0));
                q = (d.y || 0) + b.height - l;
                q > g.plotHeight && ("top" === h && 0 >= n ? ((c.verticalAlign = "bottom"), (c.inside = !0)) : (n += g.plotHeight - q), (r = !0));
                r && ((c.x = k), (c.y = n), (a.placed = !e), a.align(c, void 0, f));
                return r;
            }
            function z(a, c) {
                var d = [],
                    b;
                if (t(a) && !t(c))
                    d = a.map(function (a) {
                        return n(a, c);
                    });
                else if (t(c) && !t(a))
                    d = c.map(function (c) {
                        return n(a, c);
                    });
                else if (t(a) || t(c)) for (b = Math.max(a.length, c.length); b--; ) d[b] = n(a[b], c[b]);
                else d = n(a, c);
                return d;
            }
            function m(a, c, d, b, f) {
                var e = this.chart,
                    g = e.inverted,
                    m = this.xAxis,
                    h = m.reversed,
                    l = g ? c.height / 2 : c.width / 2;
                a = (a = a.pointWidth) ? a / 2 : 0;
                c.startXPos = g ? f.x : h ? -l - a : m.width - l + a;
                c.startYPos = g ? (h ? this.yAxis.height - l + a : -l - a) : f.y;
                b ? "hidden" === c.visibility && (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 })) : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide);
                e.hasRendered && (d && c.attr({ x: c.startXPos, y: c.startYPos }), (c.placed = !0));
            }
            var f = [];
            b.compose = function (a) {
                if (-1 === f.indexOf(a)) {
                    var c = a.prototype;
                    f.push(a);
                    c.alignDataLabel = e;
                    c.drawDataLabels = r;
                    c.justifyDataLabel = q;
                    c.setDataLabelStartPos = m;
                }
            };
        })(e || (e = {}));
        ("");
        return e;
    });
    G(b, "Series/Column/ColumnDataLabel.js", [b["Core/Series/DataLabel.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = p.series,
            w = A.merge,
            D = A.pick,
            B;
        (function (k) {
            function t(b, d, a, e, g) {
                var h = this.chart.inverted,
                    k = b.series,
                    n = (k.xAxis ? k.xAxis.len : this.chart.plotSizeX) || 0;
                k = (k.yAxis ? k.yAxis.len : this.chart.plotSizeY) || 0;
                var q = b.dlBox || b.shapeArgs,
                    t = D(b.below, b.plotY > D(this.translatedThreshold, k)),
                    m = D(a.inside, !!this.options.stacking);
                q &&
                    ((e = w(q)),
                    0 > e.y && ((e.height += e.y), (e.y = 0)),
                    (q = e.y + e.height - k),
                    0 < q && q < e.height && (e.height -= q),
                    h && (e = { x: k - e.y - e.height, y: n - e.x - e.width, width: e.height, height: e.width }),
                    m || (h ? ((e.x += t ? 0 : e.width), (e.width = 0)) : ((e.y += t ? e.height : 0), (e.height = 0))));
                a.align = D(a.align, !h || m ? "center" : t ? "right" : "left");
                a.verticalAlign = D(a.verticalAlign, h || m ? "middle" : t ? "top" : "bottom");
                v.prototype.alignDataLabel.call(this, b, d, a, e, g);
                a.inside && b.contrastColor && d.css({ color: b.contrastColor });
            }
            var n = [];
            k.compose = function (h) {
                b.compose(v);
                -1 === n.indexOf(h) && (n.push(h), (h.prototype.alignDataLabel = t));
            };
        })(B || (B = {}));
        return B;
    });
    G(b, "Series/Bar/BarSeries.js", [b["Series/Column/ColumnSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (k, t) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, h) {
                                    b.__proto__ = h;
                                }) ||
                            function (b, h) {
                                for (var d in h) h.hasOwnProperty(d) && (b[d] = h[d]);
                            };
                        return b(k, t);
                    };
                    return function (k, t) {
                        function n() {
                            this.constructor = k;
                        }
                        b(k, t);
                        k.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n());
                    };
                })(),
            w = A.extend,
            D = A.merge;
        A = (function (p) {
            function k() {
                var b = (null !== p && p.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            v(k, p);
            k.defaultOptions = D(b.defaultOptions, {});
            return k;
        })(b);
        w(A.prototype, { inverted: !0 });
        p.registerSeriesType("bar", A);
        ("");
        return A;
    });
    G(b, "Series/Scatter/ScatterSeries.js", [b["Series/Column/ColumnSeries.js"], b["Series/Line/LineSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (k, h) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (d, a) {
                                    d.__proto__ = a;
                                }) ||
                            function (d, a) {
                                for (var b in a) a.hasOwnProperty(b) && (d[b] = a[b]);
                            };
                        return b(k, h);
                    };
                    return function (k, h) {
                        function d() {
                            this.constructor = k;
                        }
                        b(k, h);
                        k.prototype = null === h ? Object.create(h) : ((d.prototype = h.prototype), new d());
                    };
                })(),
            D = E.addEvent,
            B = E.extend,
            k = E.merge;
        E = (function (b) {
            function n() {
                var h = (null !== b && b.apply(this, arguments)) || this;
                h.data = void 0;
                h.options = void 0;
                h.points = void 0;
                return h;
            }
            v(n, b);
            n.prototype.applyJitter = function () {
                var b = this,
                    d = this.options.jitter,
                    a = this.points.length;
                d &&
                    this.points.forEach(function (e, g) {
                        ["x", "y"].forEach(function (h, k) {
                            var n = "plot" + h.toUpperCase();
                            if (d[h] && !e.isNull) {
                                var q = b[h + "Axis"];
                                var t = d[h] * q.transA;
                                if (q && !q.isLog) {
                                    var m = Math.max(0, e[n] - t);
                                    q = Math.min(q.len, e[n] + t);
                                    k = 1e4 * Math.sin(g + k * a);
                                    e[n] = m + (q - m) * (k - Math.floor(k));
                                    "x" === h && (e.clientX = e.plotX);
                                }
                            }
                        });
                    });
            };
            n.prototype.drawGraph = function () {
                this.options.lineWidth ? b.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy());
            };
            n.defaultOptions = k(p.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: { x: 0, y: 0 },
                marker: { enabled: !0 },
                tooltip: { headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" },
            });
            return n;
        })(p);
        B(E.prototype, { drawTracker: b.prototype.drawTracker, sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1 });
        D(E, "afterTranslate", function () {
            this.applyJitter();
        });
        A.registerSeriesType("scatter", E);
        ("");
        return E;
    });
    G(b, "Series/CenteredUtilities.js", [b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = b.deg2rad,
            w = A.isNumber,
            D = A.pick,
            B = A.relativeLength,
            k;
        (function (b) {
            b.getCenter = function () {
                var b = this.options,
                    h = this.chart,
                    d = 2 * (b.slicedOffset || 0),
                    a = h.plotWidth - 2 * d,
                    e = h.plotHeight - 2 * d,
                    g = b.center,
                    k = Math.min(a, e),
                    t = b.size,
                    r = b.innerSize || 0;
                "string" === typeof t && (t = parseFloat(t));
                "string" === typeof r && (r = parseFloat(r));
                b = [D(g[0], "50%"), D(g[1], "50%"), D(t && 0 > t ? void 0 : b.size, "100%"), D(r && 0 > r ? void 0 : b.innerSize || 0, "0%")];
                !h.angular || this instanceof p || (b[3] = 0);
                for (g = 0; 4 > g; ++g) (t = b[g]), (h = 2 > g || (2 === g && /%$/.test(t))), (b[g] = B(t, [a, e, k, b[2]][g]) + (h ? d : 0));
                b[3] > b[2] && (b[3] = b[2]);
                return b;
            };
            b.getStartAndEndRadians = function (b, h) {
                b = w(b) ? b : 0;
                h = w(h) && h > b && 360 > h - b ? h : b + 360;
                return { start: v * (b + -90), end: v * (h + -90) };
            };
        })(k || (k = {}));
        ("");
        return k;
    });
    G(b, "Series/Pie/PiePoint.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (d, a) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                            };
                        return b(d, a);
                    };
                    return function (d, a) {
                        function e() {
                            this.constructor = d;
                        }
                        b(d, a);
                        d.prototype = null === a ? Object.create(a) : ((e.prototype = a.prototype), new e());
                    };
                })(),
            w = b.setAnimation,
            D = A.addEvent,
            B = A.defined;
        b = A.extend;
        var k = A.isNumber,
            t = A.pick,
            n = A.relativeLength;
        p = (function (b) {
            function d() {
                var a = (null !== b && b.apply(this, arguments)) || this;
                a.labelDistance = void 0;
                a.options = void 0;
                a.series = void 0;
                return a;
            }
            v(d, b);
            d.prototype.getConnectorPath = function () {
                var a = this.labelPosition,
                    d = this.series.options.dataLabels,
                    b = this.connectorShapes,
                    h = d.connectorShape;
                b[h] && (h = b[h]);
                return h.call(this, { x: a.final.x, y: a.final.y, alignment: a.alignment }, a.connectorPosition, d);
            };
            d.prototype.getTranslate = function () {
                return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
            };
            d.prototype.haloPath = function (a) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, { innerR: d.r - 1, start: d.start, end: d.end });
            };
            d.prototype.init = function () {
                var a = this;
                b.prototype.init.apply(this, arguments);
                this.name = t(this.name, "Slice");
                var d = function (d) {
                    a.slice("select" === d.type);
                };
                D(this, "select", d);
                D(this, "unselect", d);
                return this;
            };
            d.prototype.isValid = function () {
                return k(this.y) && 0 <= this.y;
            };
            d.prototype.setVisible = function (a, d) {
                var b = this,
                    e = this.series,
                    h = e.chart,
                    k = e.options.ignoreHiddenPoint;
                d = t(d, k);
                a !== this.visible &&
                    ((this.visible = this.options.visible = a = "undefined" === typeof a ? !this.visible : a),
                    (e.options.data[e.data.indexOf(this)] = this.options),
                    ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (d) {
                        if (b[d]) b[d][a ? "show" : "hide"](a);
                    }),
                    this.legendItem && h.legend.colorizeItem(this, a),
                    a || "hover" !== this.state || this.setState(""),
                    k && (e.isDirty = !0),
                    d && h.redraw());
            };
            d.prototype.slice = function (a, d, b) {
                var e = this.series;
                w(b, e.chart);
                t(d, !0);
                this.sliced = this.options.sliced = B(a) ? a : !this.sliced;
                e.options.data[e.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
            };
            return d;
        })(p);
        b(p.prototype, {
            connectorShapes: {
                fixedOffset: function (b, d, a) {
                    var e = d.breakAt;
                    d = d.touchingSliceAt;
                    return [["M", b.x, b.y], a.softConnector ? ["C", b.x + ("left" === b.alignment ? -5 : 5), b.y, 2 * e.x - d.x, 2 * e.y - d.y, e.x, e.y] : ["L", e.x, e.y], ["L", d.x, d.y]];
                },
                straight: function (b, d) {
                    d = d.touchingSliceAt;
                    return [
                        ["M", b.x, b.y],
                        ["L", d.x, d.y],
                    ];
                },
                crookedLine: function (b, d, a) {
                    d = d.touchingSliceAt;
                    var e = this.series,
                        g = e.center[0],
                        h = e.chart.plotWidth,
                        k = e.chart.plotLeft;
                    e = b.alignment;
                    var r = this.shapeArgs.r;
                    a = n(a.crookDistance, 1);
                    h = "left" === e ? g + r + (h + k - g - r) * (1 - a) : k + (g - r) * a;
                    a = ["L", h, b.y];
                    g = !0;
                    if ("left" === e ? h > b.x || h < d.x : h < b.x || h > d.x) g = !1;
                    b = [["M", b.x, b.y]];
                    g && b.push(a);
                    b.push(["L", d.x, d.y]);
                    return b;
                },
            },
        });
        return p;
    });
    G(
        b,
        "Series/Pie/PieSeries.js",
        [
            b["Series/CenteredUtilities.js"],
            b["Series/Column/ColumnSeries.js"],
            b["Core/Globals.js"],
            b["Core/Legend/LegendSymbol.js"],
            b["Series/Pie/PiePoint.js"],
            b["Core/Series/Series.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Core/Renderer/SVG/Symbols.js"],
            b["Core/Utilities.js"],
        ],
        function (b, p, A, E, w, D, B, k, t) {
            var n =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (d, b) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, d) {
                                        a.__proto__ = d;
                                    }) ||
                                function (a, d) {
                                    for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                                };
                            return a(d, b);
                        };
                        return function (d, b) {
                            function e() {
                                this.constructor = d;
                            }
                            a(d, b);
                            d.prototype = null === b ? Object.create(b) : ((e.prototype = b.prototype), new e());
                        };
                    })(),
                h = b.getStartAndEndRadians;
            A = A.noop;
            var d = t.clamp,
                a = t.extend,
                e = t.fireEvent,
                g = t.merge,
                x = t.pick,
                v = t.relativeLength;
            t = (function (a) {
                function b() {
                    var d = (null !== a && a.apply(this, arguments)) || this;
                    d.center = void 0;
                    d.data = void 0;
                    d.maxLabelDistance = void 0;
                    d.options = void 0;
                    d.points = void 0;
                    return d;
                }
                n(b, a);
                b.prototype.animate = function (a) {
                    var d = this,
                        b = d.points,
                        e = d.startAngleRad;
                    a ||
                        b.forEach(function (c) {
                            var a = c.graphic,
                                b = c.shapeArgs;
                            a && b && (a.attr({ r: x(c.startR, d.center && d.center[3] / 2), start: e, end: e }), a.animate({ r: b.r, start: b.start, end: b.end }, d.options.animation));
                        });
                };
                b.prototype.drawEmpty = function () {
                    var a = this.startAngleRad,
                        d = this.endAngleRad,
                        b = this.options;
                    if (0 === this.total && this.center) {
                        var e = this.center[0];
                        var c = this.center[1];
                        this.graph ||
                            (this.graph = this.chart.renderer
                                .arc(e, c, this.center[1] / 2, 0, a, d)
                                .addClass("highcharts-empty-series")
                                .add(this.group));
                        this.graph.attr({ d: k.arc(e, c, this.center[2] / 2, 0, { start: a, end: d, innerR: this.center[3] / 2 }) });
                        this.chart.styledMode || this.graph.attr({ "stroke-width": b.borderWidth, fill: b.fillColor || "none", stroke: b.color || "#cccccc" });
                    } else this.graph && (this.graph = this.graph.destroy());
                };
                b.prototype.drawPoints = function () {
                    var a = this.chart.renderer;
                    this.points.forEach(function (d) {
                        d.graphic && d.hasNewShapeType() && (d.graphic = d.graphic.destroy());
                        d.graphic || ((d.graphic = a[d.shapeType](d.shapeArgs).add(d.series.group)), (d.delayedRendering = !0));
                    });
                };
                b.prototype.generatePoints = function () {
                    a.prototype.generatePoints.call(this);
                    this.updateTotals();
                };
                b.prototype.getX = function (a, b, f) {
                    var e = this.center,
                        c = this.radii ? this.radii[f.index] || 0 : e[2] / 2;
                    a = Math.asin(d((a - e[1]) / (c + f.labelDistance), -1, 1));
                    return e[0] + (b ? -1 : 1) * Math.cos(a) * (c + f.labelDistance) + (0 < f.labelDistance ? (b ? -1 : 1) * this.options.dataLabels.padding : 0);
                };
                b.prototype.hasData = function () {
                    return !!this.processedXData.length;
                };
                b.prototype.redrawPoints = function () {
                    var a = this,
                        d = a.chart,
                        b = d.renderer,
                        e = a.options.shadow,
                        c,
                        h,
                        l,
                        k;
                    this.drawEmpty();
                    !e || a.shadowGroup || d.styledMode || (a.shadowGroup = b.g("shadow").attr({ zIndex: -1 }).add(a.group));
                    a.points.forEach(function (f) {
                        var m = {};
                        h = f.graphic;
                        if (!f.isNull && h) {
                            var n = void 0;
                            k = f.shapeArgs;
                            c = f.getTranslate();
                            d.styledMode || ((n = f.shadowGroup), e && !n && (n = f.shadowGroup = b.g("shadow").add(a.shadowGroup)), n && n.attr(c), (l = a.pointAttribs(f, f.selected && "select")));
                            f.delayedRendering
                                ? (h.setRadialReference(a.center).attr(k).attr(c), d.styledMode || h.attr(l).attr({ "stroke-linejoin": "round" }).shadow(e, n), (f.delayedRendering = !1))
                                : (h.setRadialReference(a.center), d.styledMode || g(!0, m, l), g(!0, m, k, c), h.animate(m));
                            h.attr({ visibility: f.visible ? "inherit" : "hidden" });
                            h.addClass(f.getClassName(), !0);
                        } else h && (f.graphic = h.destroy());
                    });
                };
                b.prototype.sortByAngle = function (a, d) {
                    a.sort(function (a, b) {
                        return "undefined" !== typeof a.angle && (b.angle - a.angle) * d;
                    });
                };
                b.prototype.translate = function (a) {
                    this.generatePoints();
                    var d = this.options,
                        b = d.slicedOffset,
                        g = b + (d.borderWidth || 0),
                        c = h(d.startAngle, d.endAngle),
                        k = (this.startAngleRad = c.start);
                    c = (this.endAngleRad = c.end) - k;
                    var l = this.points,
                        n = d.dataLabels.distance;
                    d = d.ignoreHiddenPoint;
                    var q = l.length,
                        r,
                        t = 0;
                    a || (this.center = a = this.getCenter());
                    for (r = 0; r < q; r++) {
                        var z = l[r];
                        var p = k + t * c;
                        !z.isValid() || (d && !z.visible) || (t += z.percentage / 100);
                        var C = k + t * c;
                        var w = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1e3 * p) / 1e3, end: Math.round(1e3 * C) / 1e3 };
                        z.shapeType = "arc";
                        z.shapeArgs = w;
                        z.labelDistance = x(z.options.dataLabels && z.options.dataLabels.distance, n);
                        z.labelDistance = v(z.labelDistance, w.r);
                        this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, z.labelDistance);
                        C = (C + p) / 2;
                        C > 1.5 * Math.PI ? (C -= 2 * Math.PI) : C < -Math.PI / 2 && (C += 2 * Math.PI);
                        z.slicedTranslation = { translateX: Math.round(Math.cos(C) * b), translateY: Math.round(Math.sin(C) * b) };
                        w = (Math.cos(C) * a[2]) / 2;
                        var B = (Math.sin(C) * a[2]) / 2;
                        z.tooltipPos = [a[0] + 0.7 * w, a[1] + 0.7 * B];
                        z.half = C < -Math.PI / 2 || C > Math.PI / 2 ? 1 : 0;
                        z.angle = C;
                        p = Math.min(g, z.labelDistance / 5);
                        z.labelPosition = {
                            natural: { x: a[0] + w + Math.cos(C) * z.labelDistance, y: a[1] + B + Math.sin(C) * z.labelDistance },
                            final: {},
                            alignment: 0 > z.labelDistance ? "center" : z.half ? "right" : "left",
                            connectorPosition: { breakAt: { x: a[0] + w + Math.cos(C) * p, y: a[1] + B + Math.sin(C) * p }, touchingSliceAt: { x: a[0] + w, y: a[1] + B } },
                        };
                    }
                    e(this, "afterTranslate");
                };
                b.prototype.updateTotals = function () {
                    var a = this.points,
                        d = a.length,
                        b = this.options.ignoreHiddenPoint,
                        e,
                        c = 0;
                    for (e = 0; e < d; e++) {
                        var g = a[e];
                        !g.isValid() || (b && !g.visible) || (c += g.y);
                    }
                    this.total = c;
                    for (e = 0; e < d; e++) (g = a[e]), (g.percentage = 0 < c && (g.visible || !b) ? (g.y / c) * 100 : 0), (g.total = c);
                };
                b.defaultOptions = g(D.defaultOptions, {
                    center: [null, null],
                    clip: !1,
                    colorByPoint: !0,
                    dataLabels: {
                        allowOverlap: !0,
                        connectorPadding: 5,
                        connectorShape: "fixedOffset",
                        crookDistance: "70%",
                        distance: 30,
                        enabled: !0,
                        formatter: function () {
                            return this.point.isNull ? void 0 : this.point.name;
                        },
                        softConnector: !0,
                        x: 0,
                    },
                    fillColor: void 0,
                    ignoreHiddenPoint: !0,
                    inactiveOtherPoints: !0,
                    legendType: "point",
                    marker: null,
                    size: null,
                    showInLegend: !1,
                    slicedOffset: 10,
                    stickyTracking: !1,
                    tooltip: { followPointer: !0 },
                    borderColor: "#ffffff",
                    borderWidth: 1,
                    lineWidth: void 0,
                    states: { hover: { brightness: 0.1 } },
                });
                return b;
            })(D);
            a(t.prototype, {
                axisTypes: [],
                directTouch: !0,
                drawGraph: void 0,
                drawLegendSymbol: E.drawRectangle,
                drawTracker: p.prototype.drawTracker,
                getCenter: b.getCenter,
                getSymbol: A,
                isCartesian: !1,
                noSharedTooltip: !0,
                pointAttribs: p.prototype.pointAttribs,
                pointClass: w,
                requireSorting: !1,
                searchPoint: A,
                trackerGroups: ["group", "dataLabelsGroup"],
            });
            B.registerSeriesType("pie", t);
            ("");
            return t;
        }
    );
    G(b, "Series/Pie/PieDataLabel.js", [b["Core/Series/DataLabel.js"], b["Core/Globals.js"], b["Core/Renderer/RendererUtilities.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A, E, w) {
        var v = p.noop,
            B = A.distribute,
            k = E.series,
            t = w.arrayMax,
            n = w.clamp,
            h = w.defined,
            d = w.merge,
            a = w.pick,
            e = w.relativeLength,
            g;
        (function (g) {
            function x() {
                var b = this,
                    e = b.data,
                    c = b.chart,
                    g = b.options.dataLabels || {},
                    m = g.connectorPadding,
                    n = c.plotWidth,
                    q = c.plotHeight,
                    r = c.plotLeft,
                    z = Math.round(c.chartWidth / 3),
                    x = b.center,
                    p = x[2] / 2,
                    v = x[1],
                    C = [[], []],
                    w = [0, 0, 0, 0],
                    A = b.dataLabelPositioners,
                    D,
                    E,
                    G,
                    L,
                    W,
                    M,
                    X,
                    P,
                    U,
                    S,
                    V,
                    N;
                b.visible &&
                    (g.enabled || b._hasPointLabels) &&
                    (e.forEach(function (c) {
                        c.dataLabel && c.visible && c.dataLabel.shortened && (c.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), (c.dataLabel.shortened = !1));
                    }),
                    k.prototype.drawDataLabels.apply(b),
                    e.forEach(function (c) {
                        c.dataLabel &&
                            (c.visible
                                ? (C[c.half].push(c),
                                  (c.dataLabel._pos = null),
                                  !h(g.style.width) &&
                                      !h(c.options.dataLabels && c.options.dataLabels.style && c.options.dataLabels.style.width) &&
                                      c.dataLabel.getBBox().width > z &&
                                      (c.dataLabel.css({ width: Math.round(0.7 * z) + "px" }), (c.dataLabel.shortened = !0)))
                                : ((c.dataLabel = c.dataLabel.destroy()), c.dataLabels && 1 === c.dataLabels.length && delete c.dataLabels));
                    }),
                    C.forEach(function (d, f) {
                        var e = d.length,
                            l = [],
                            k;
                        if (e) {
                            b.sortByAngle(d, f - 0.5);
                            if (0 < b.maxLabelDistance) {
                                var u = Math.max(0, v - p - b.maxLabelDistance);
                                var t = Math.min(v + p + b.maxLabelDistance, c.plotHeight);
                                d.forEach(function (a) {
                                    0 < a.labelDistance &&
                                        a.dataLabel &&
                                        ((a.top = Math.max(0, v - p - a.labelDistance)),
                                        (a.bottom = Math.min(v + p + a.labelDistance, c.plotHeight)),
                                        (k = a.dataLabel.getBBox().height || 21),
                                        (a.distributeBox = { target: a.labelPosition.natural.y - a.top + k / 2, size: k, rank: a.y }),
                                        l.push(a.distributeBox));
                                });
                                u = t + k - u;
                                B(l, u, u / 5);
                            }
                            for (V = 0; V < e; V++) {
                                D = d[V];
                                M = D.labelPosition;
                                L = D.dataLabel;
                                S = !1 === D.visible ? "hidden" : "inherit";
                                U = u = M.natural.y;
                                l && h(D.distributeBox) && ("undefined" === typeof D.distributeBox.pos ? (S = "hidden") : ((X = D.distributeBox.size), (U = A.radialDistributionY(D))));
                                delete D.positionIndex;
                                if (g.justify) P = A.justify(D, p, x);
                                else
                                    switch (g.alignTo) {
                                        case "connectors":
                                            P = A.alignToConnectors(d, f, n, r);
                                            break;
                                        case "plotEdges":
                                            P = A.alignToPlotEdges(L, f, n, r);
                                            break;
                                        default:
                                            P = A.radialDistributionX(b, D, U, u);
                                    }
                                L._attr = { visibility: S, align: M.alignment };
                                N = D.options.dataLabels || {};
                                L._pos = { x: P + a(N.x, g.x) + ({ left: m, right: -m }[M.alignment] || 0), y: U + a(N.y, g.y) - 10 };
                                M.final.x = P;
                                M.final.y = U;
                                a(g.crop, !0) &&
                                    ((W = L.getBBox().width),
                                    (u = null),
                                    P - W < m && 1 === f ? ((u = Math.round(W - P + m)), (w[3] = Math.max(u, w[3]))) : P + W > n - m && 0 === f && ((u = Math.round(P + W - n + m)), (w[1] = Math.max(u, w[1]))),
                                    0 > U - X / 2 ? (w[0] = Math.max(Math.round(-U + X / 2), w[0])) : U + X / 2 > q && (w[2] = Math.max(Math.round(U + X / 2 - q), w[2])),
                                    (L.sideOverflow = u));
                            }
                        }
                    }),
                    0 === t(w) || this.verifyDataLabelOverflow(w)) &&
                    (this.placeDataLabels(),
                    this.points.forEach(function (f) {
                        N = d(g, f.options.dataLabels);
                        if ((E = a(N.connectorWidth, 1))) {
                            var e;
                            G = f.connector;
                            if ((L = f.dataLabel) && L._pos && f.visible && 0 < f.labelDistance) {
                                S = L._attr.visibility;
                                if ((e = !G))
                                    (f.connector = G = c.renderer
                                        .path()
                                        .addClass("highcharts-data-label-connector  highcharts-color-" + f.colorIndex + (f.className ? " " + f.className : ""))
                                        .add(b.dataLabelsGroup)),
                                        c.styledMode || G.attr({ "stroke-width": E, stroke: N.connectorColor || f.color || "#666666" });
                                G[e ? "attr" : "animate"]({ d: f.getConnectorPath() });
                                G.attr("visibility", S);
                            } else G && (f.connector = G.destroy());
                        }
                    }));
            }
            function r() {
                this.points.forEach(function (a) {
                    var d = a.dataLabel,
                        c;
                    d &&
                        a.visible &&
                        ((c = d._pos)
                            ? (d.sideOverflow &&
                                  ((d._attr.width = Math.max(d.getBBox().width - d.sideOverflow, 0)),
                                  d.css({ width: d._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }),
                                  (d.shortened = !0)),
                              d.attr(d._attr),
                              d[d.moved ? "animate" : "attr"](c),
                              (d.moved = !0))
                            : d && d.attr({ y: -9999 }));
                    delete a.distributeBox;
                }, this);
            }
            function q(a) {
                var d = this.center,
                    c = this.options,
                    b = c.center,
                    f = c.minSize || 80,
                    g = null !== c.size;
                if (!g) {
                    if (null !== b[0]) var m = Math.max(d[2] - Math.max(a[1], a[3]), f);
                    else (m = Math.max(d[2] - a[1] - a[3], f)), (d[0] += (a[3] - a[1]) / 2);
                    null !== b[1] ? (m = n(m, f, d[2] - Math.max(a[0], a[2]))) : ((m = n(m, f, d[2] - a[0] - a[2])), (d[1] += (a[0] - a[2]) / 2));
                    m < d[2] ? ((d[2] = m), (d[3] = Math.min(e(c.innerSize || 0, m), m)), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : (g = !0);
                }
                return g;
            }
            var z = [],
                m = {
                    radialDistributionY: function (a) {
                        return a.top + a.distributeBox.pos;
                    },
                    radialDistributionX: function (a, d, c, b) {
                        return a.getX(c < d.top + 2 || c > d.bottom - 2 ? b : c, d.half, d);
                    },
                    justify: function (a, d, c) {
                        return c[0] + (a.half ? -1 : 1) * (d + a.labelDistance);
                    },
                    alignToPlotEdges: function (a, d, c, b) {
                        a = a.getBBox().width;
                        return d ? a + b : c - a - b;
                    },
                    alignToConnectors: function (a, d, c, b) {
                        var f = 0,
                            e;
                        a.forEach(function (c) {
                            e = c.dataLabel.getBBox().width;
                            e > f && (f = e);
                        });
                        return d ? f + b : c - f - b;
                    },
                };
            g.compose = function (a) {
                b.compose(k);
                -1 === z.indexOf(a) && (z.push(a), (a = a.prototype), (a.dataLabelPositioners = m), (a.alignDataLabel = v), (a.drawDataLabels = x), (a.placeDataLabels = r), (a.verifyDataLabelOverflow = q));
            };
        })(g || (g = {}));
        return g;
    });
    G(b, "Extensions/OverlappingDataLabels.js", [b["Core/Chart/Chart.js"], b["Core/Utilities.js"]], function (b, p) {
        function v(b, h) {
            var d = !1;
            if (b) {
                var a = b.newOpacity;
                b.oldOpacity !== a &&
                    (b.alignAttr && b.placed
                        ? (b[a ? "removeClass" : "addClass"]("highcharts-data-label-hidden"),
                          (d = !0),
                          (b.alignAttr.opacity = a),
                          b[b.isOld ? "animate" : "attr"](b.alignAttr, null, function () {
                              h.styledMode || b.css({ pointerEvents: a ? "auto" : "none" });
                          }),
                          w(h, "afterHideOverlappingLabel"))
                        : b.attr({ opacity: a }));
                b.isOld = !0;
            }
            return d;
        }
        var E = p.addEvent,
            w = p.fireEvent,
            D = p.isArray,
            B = p.isNumber,
            k = p.objectEach,
            t = p.pick;
        E(b, "render", function () {
            var b = this,
                h = [];
            (this.labelCollectors || []).forEach(function (d) {
                h = h.concat(d());
            });
            (this.yAxis || []).forEach(function (d) {
                d.stacking &&
                    d.options.stackLabels &&
                    !d.options.stackLabels.allowOverlap &&
                    k(d.stacking.stacks, function (a) {
                        k(a, function (a) {
                            a.label && "hidden" !== a.label.visibility && h.push(a.label);
                        });
                    });
            });
            (this.series || []).forEach(function (d) {
                var a = d.options.dataLabels;
                d.visible &&
                    (!1 !== a.enabled || d._hasPointLabels) &&
                    ((a = function (a) {
                        return a.forEach(function (a) {
                            a.visible &&
                                (D(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : []).forEach(function (d) {
                                    var e = d.options;
                                    d.labelrank = t(e.labelrank, a.labelrank, a.shapeArgs && a.shapeArgs.height);
                                    e.allowOverlap ? ((d.oldOpacity = d.opacity), (d.newOpacity = 1), v(d, b)) : h.push(d);
                                });
                        });
                    }),
                    a(d.nodes || []),
                    a(d.points));
            });
            this.hideOverlappingLabels(h);
        });
        b.prototype.hideOverlappingLabels = function (b) {
            var h = this,
                d = b.length,
                a = h.renderer,
                e,
                g,
                k,
                n = !1;
            var r = function (d) {
                var b,
                    e = d.box ? 0 : d.padding || 0,
                    c = (b = 0),
                    g;
                if (d && (!d.alignAttr || d.placed)) {
                    var m = d.alignAttr || { x: d.attr("x"), y: d.attr("y") };
                    var h = d.parentGroup;
                    d.width || ((b = d.getBBox()), (d.width = b.width), (d.height = b.height), (b = a.fontMetrics(null, d.element).h));
                    var k = d.width - 2 * e;
                    (g = { left: "0", center: "0.5", right: "1" }[d.alignValue]) ? (c = +g * k) : B(d.x) && Math.round(d.x) !== d.translateX && (c = d.x - d.translateX);
                    return { x: m.x + (h.translateX || 0) + e - (c || 0), y: m.y + (h.translateY || 0) + e - b, width: d.width - 2 * e, height: d.height - 2 * e };
                }
            };
            for (g = 0; g < d; g++) if ((e = b[g])) (e.oldOpacity = e.opacity), (e.newOpacity = 1), (e.absoluteBox = r(e));
            b.sort(function (a, d) {
                return (d.labelrank || 0) - (a.labelrank || 0);
            });
            for (g = 0; g < d; g++) {
                var q = (r = b[g]) && r.absoluteBox;
                for (e = g + 1; e < d; ++e) {
                    var t = (k = b[e]) && k.absoluteBox;
                    !q || !t || r === k || 0 === r.newOpacity || 0 === k.newOpacity || t.x >= q.x + q.width || t.x + t.width <= q.x || t.y >= q.y + q.height || t.y + t.height <= q.y || ((r.labelrank < k.labelrank ? r : k).newOpacity = 0);
                }
            }
            b.forEach(function (a) {
                v(a, h) && (n = !0);
            });
            n && w(h, "afterHideAllOverlappingLabels");
        };
    });
    G(b, "Core/Responsive.js", [b["Core/Utilities.js"]], function (b) {
        var p = b.extend,
            v = b.find,
            E = b.isArray,
            w = b.isObject,
            D = b.merge,
            B = b.objectEach,
            k = b.pick,
            t = b.splat,
            n = b.uniqueKey,
            h;
        (function (d) {
            var a = [];
            d.compose = function (d) {
                -1 === a.indexOf(d) && (a.push(d), p(d.prototype, b.prototype));
                return d;
            };
            var b = (function () {
                function a() {}
                a.prototype.currentOptions = function (a) {
                    function d(a, e, f, g) {
                        var c;
                        B(a, function (a, h) {
                            if (!g && -1 < b.collectionsWithUpdate.indexOf(h) && e[h])
                                for (a = t(a), f[h] = [], c = 0; c < Math.max(a.length, e[h].length); c++) e[h][c] && (void 0 === a[c] ? (f[h][c] = e[h][c]) : ((f[h][c] = {}), d(a[c], e[h][c], f[h][c], g + 1)));
                            else w(a) ? ((f[h] = E(a) ? [] : {}), d(a, e[h] || {}, f[h], g + 1)) : (f[h] = "undefined" === typeof e[h] ? null : e[h]);
                        });
                    }
                    var b = this,
                        e = {};
                    d(a, this.options, e, 0);
                    return e;
                };
                a.prototype.matchResponsiveRule = function (a, d) {
                    var b = a.condition;
                    (
                        b.callback ||
                        function () {
                            return this.chartWidth <= k(b.maxWidth, Number.MAX_VALUE) && this.chartHeight <= k(b.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(b.minWidth, 0) && this.chartHeight >= k(b.minHeight, 0);
                        }
                    ).call(this) && d.push(a._id);
                };
                a.prototype.setResponsive = function (a, d) {
                    var b = this,
                        e = this.options.responsive,
                        g = this.currentResponsive,
                        h = [];
                    !d &&
                        e &&
                        e.rules &&
                        e.rules.forEach(function (a) {
                            "undefined" === typeof a._id && (a._id = n());
                            b.matchResponsiveRule(a, h);
                        }, this);
                    d = D.apply(
                        void 0,
                        h
                            .map(function (a) {
                                return v((e || {}).rules || [], function (d) {
                                    return d._id === a;
                                });
                            })
                            .map(function (a) {
                                return a && a.chartOptions;
                            })
                    );
                    d.isResponsiveOptions = !0;
                    h = h.toString() || void 0;
                    h !== (g && g.ruleIds) &&
                        (g && this.update(g.undoOptions, a, !0),
                        h ? ((g = this.currentOptions(d)), (g.isResponsiveOptions = !0), (this.currentResponsive = { ruleIds: h, mergedOptions: d, undoOptions: g }), this.update(d, a, !0)) : (this.currentResponsive = void 0));
                };
                return a;
            })();
        })(h || (h = {}));
        ("");
        ("");
        return h;
    });
    G(
        b,
        "masters/highcharts.src.js",
        [
            b["Core/Globals.js"],
            b["Core/Utilities.js"],
            b["Core/DefaultOptions.js"],
            b["Core/Animation/Fx.js"],
            b["Core/Animation/AnimationUtilities.js"],
            b["Core/Renderer/HTML/AST.js"],
            b["Core/FormatUtilities.js"],
            b["Core/Renderer/RendererUtilities.js"],
            b["Core/Renderer/SVG/SVGElement.js"],
            b["Core/Renderer/SVG/SVGRenderer.js"],
            b["Core/Renderer/HTML/HTMLElement.js"],
            b["Core/Renderer/HTML/HTMLRenderer.js"],
            b["Core/Axis/Axis.js"],
            b["Core/Axis/DateTimeAxis.js"],
            b["Core/Axis/LogarithmicAxis.js"],
            b["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
            b["Core/Axis/Tick.js"],
            b["Core/Tooltip.js"],
            b["Core/Series/Point.js"],
            b["Core/Pointer.js"],
            b["Core/MSPointer.js"],
            b["Core/Legend/Legend.js"],
            b["Core/Chart/Chart.js"],
            b["Core/Series/Series.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Series/Column/ColumnSeries.js"],
            b["Series/Column/ColumnDataLabel.js"],
            b["Series/Pie/PieSeries.js"],
            b["Series/Pie/PieDataLabel.js"],
            b["Core/Series/DataLabel.js"],
            b["Core/Responsive.js"],
            b["Core/Color/Color.js"],
            b["Core/Time.js"],
        ],
        function (b, p, A, E, w, D, B, k, t, n, h, d, a, e, g, x, C, r, q, z, m, f, y, c, u, l, F, K, H, I, G, Q, O) {
            b.animate = w.animate;
            b.animObject = w.animObject;
            b.getDeferredAnimation = w.getDeferredAnimation;
            b.setAnimation = w.setAnimation;
            b.stop = w.stop;
            b.timers = E.timers;
            b.AST = D;
            b.Axis = a;
            b.Chart = y;
            b.chart = y.chart;
            b.Fx = E;
            b.Legend = f;
            b.PlotLineOrBand = x;
            b.Point = q;
            b.Pointer = m.isRequired() ? m : z;
            b.Series = c;
            b.SVGElement = t;
            b.SVGRenderer = n;
            b.Tick = C;
            b.Time = O;
            b.Tooltip = r;
            b.Color = Q;
            b.color = Q.parse;
            d.compose(n);
            h.compose(t);
            b.defaultOptions = A.defaultOptions;
            b.getOptions = A.getOptions;
            b.time = A.defaultTime;
            b.setOptions = A.setOptions;
            b.dateFormat = B.dateFormat;
            b.format = B.format;
            b.numberFormat = B.numberFormat;
            b.addEvent = p.addEvent;
            b.arrayMax = p.arrayMax;
            b.arrayMin = p.arrayMin;
            b.attr = p.attr;
            b.clearTimeout = p.clearTimeout;
            b.correctFloat = p.correctFloat;
            b.createElement = p.createElement;
            b.css = p.css;
            b.defined = p.defined;
            b.destroyObjectProperties = p.destroyObjectProperties;
            b.discardElement = p.discardElement;
            b.distribute = k.distribute;
            b.erase = p.erase;
            b.error = p.error;
            b.extend = p.extend;
            b.extendClass = p.extendClass;
            b.find = p.find;
            b.fireEvent = p.fireEvent;
            b.getMagnitude = p.getMagnitude;
            b.getStyle = p.getStyle;
            b.inArray = p.inArray;
            b.isArray = p.isArray;
            b.isClass = p.isClass;
            b.isDOMElement = p.isDOMElement;
            b.isFunction = p.isFunction;
            b.isNumber = p.isNumber;
            b.isObject = p.isObject;
            b.isString = p.isString;
            b.keys = p.keys;
            b.merge = p.merge;
            b.normalizeTickInterval = p.normalizeTickInterval;
            b.objectEach = p.objectEach;
            b.offset = p.offset;
            b.pad = p.pad;
            b.pick = p.pick;
            b.pInt = p.pInt;
            b.relativeLength = p.relativeLength;
            b.removeEvent = p.removeEvent;
            b.seriesType = u.seriesType;
            b.splat = p.splat;
            b.stableSort = p.stableSort;
            b.syncTimeout = p.syncTimeout;
            b.timeUnits = p.timeUnits;
            b.uniqueKey = p.uniqueKey;
            b.useSerialIds = p.useSerialIds;
            b.wrap = p.wrap;
            F.compose(l);
            I.compose(c);
            e.compose(a);
            g.compose(a);
            H.compose(K);
            x.compose(a);
            G.compose(y);
            return b;
        }
    );
    G(b, "Core/Axis/Color/ColorAxisComposition.js", [b["Core/Color/Color.js"], b["Core/Utilities.js"]], function (b, p) {
        var v = b.parse,
            E = p.addEvent,
            w = p.extend,
            D = p.merge,
            B = p.pick,
            k = p.splat,
            t;
        (function (b) {
            function h() {
                var a = this,
                    d = this.options;
                this.colorAxis = [];
                d.colorAxis &&
                    ((d.colorAxis = k(d.colorAxis)),
                    d.colorAxis.forEach(function (c, d) {
                        c.index = d;
                        new p(a, c);
                    }));
            }
            function d(a) {
                var c = this,
                    d = function (d) {
                        d = a.allItems.indexOf(d);
                        -1 !== d && (c.destroyItem(a.allItems[d]), a.allItems.splice(d, 1));
                    },
                    b = [],
                    f,
                    e;
                (this.chart.colorAxis || []).forEach(function (a) {
                    (f = a.options) &&
                        f.showInLegend &&
                        (f.dataClasses && f.visible ? (b = b.concat(a.getDataClassLegendSymbols())) : f.visible && b.push(a),
                        a.series.forEach(function (a) {
                            if (!a.options.showInLegend || f.dataClasses)
                                "point" === a.options.legendType
                                    ? a.points.forEach(function (a) {
                                          d(a);
                                      })
                                    : d(a);
                        }));
                });
                for (e = b.length; e--; ) a.allItems.unshift(b[e]);
            }
            function a(a) {
                a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor });
            }
            function e() {
                var a = this.chart.colorAxis;
                a &&
                    a.forEach(function (a, c, d) {
                        a.update({}, d);
                    });
            }
            function g() {
                ((this.chart.colorAxis && this.chart.colorAxis.length) || this.colorAttribs) && this.translateColors();
            }
            function n() {
                var a = this.axisTypes;
                a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : (this.axisTypes = ["colorAxis"]);
            }
            function t(a) {
                var c = this,
                    d = a ? "show" : "hide";
                c.visible = c.options.visible = !!a;
                ["graphic", "dataLabel"].forEach(function (a) {
                    if (c[a]) c[a][d]();
                });
                this.series.buildKDTree();
            }
            function r() {
                var a = this,
                    d = this.options.nullColor,
                    b = this.colorAxis,
                    f = this.colorKey;
                (this.data.length ? this.data : this.points).forEach(function (c) {
                    var e = c.getNestedProperty(f);
                    (e = c.options.color || (c.isNull || null === c.value ? d : b && "undefined" !== typeof e ? b.toColor(e, c) : c.color || a.color)) &&
                        c.color !== e &&
                        ((c.color = e), "point" === a.options.legendType && c.legendItem && a.chart.legend.colorizeItem(c, c.visible));
                });
            }
            function q(a) {
                var c = a.prototype.createAxis;
                a.prototype.createAxis = function (a, d) {
                    if ("colorAxis" !== a) return c.apply(this, arguments);
                    var b = new p(this, D(d.axis, { index: this[a].length, isX: !1 }));
                    this.isDirtyLegend = !0;
                    this.axes.forEach(function (a) {
                        a.series = [];
                    });
                    this.series.forEach(function (a) {
                        a.bindAxes();
                        a.isDirtyData = !0;
                    });
                    B(d.redraw, !0) && this.redraw(d.animation);
                    return b;
                };
            }
            function z() {
                this.elem.attr("fill", v(this.start).tweenTo(v(this.end), this.pos), void 0, !0);
            }
            function m() {
                this.elem.attr("stroke", v(this.start).tweenTo(v(this.end), this.pos), void 0, !0);
            }
            var f = [],
                p;
            b.compose = function (c, b, k, x, y) {
                p || (p = c);
                -1 === f.indexOf(b) && (f.push(b), (c = b.prototype), c.collectionsWithUpdate.push("colorAxis"), (c.collectionsWithInit.colorAxis = [c.addColorAxis]), E(b, "afterGetAxes", h), q(b));
                -1 === f.indexOf(k) && (f.push(k), (b = k.prototype), (b.fillSetter = z), (b.strokeSetter = m));
                -1 === f.indexOf(x) && (f.push(x), E(x, "afterGetAllItems", d), E(x, "afterColorizeItem", a), E(x, "afterUpdate", e));
                -1 === f.indexOf(y) && (f.push(y), w(y.prototype, { optionalAxis: "colorAxis", translateColors: r }), w(y.prototype.pointClass.prototype, { setVisible: t }), E(y, "afterTranslate", g), E(y, "bindAxes", n));
            };
            b.pointSetVisible = t;
        })(t || (t = {}));
        return t;
    });
    G(b, "Core/Axis/Color/ColorAxisDefaults.js", [], function () {
        return {
            lineWidth: 0,
            minPadding: 0,
            maxPadding: 0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            startOnTick: !0,
            endOnTick: !0,
            offset: 0,
            marker: { animation: { duration: 50 }, width: 0.01, color: "#999999" },
            labels: { overflow: "justify", rotation: 0 },
            minColor: "#e6ebf5",
            maxColor: "#003399",
            tickLength: 5,
            showInLegend: !0,
        };
    });
    G(
        b,
        "Core/Axis/Color/ColorAxis.js",
        [
            b["Core/Axis/Axis.js"],
            b["Core/Color/Color.js"],
            b["Core/Axis/Color/ColorAxisComposition.js"],
            b["Core/Axis/Color/ColorAxisDefaults.js"],
            b["Core/Globals.js"],
            b["Core/Legend/LegendSymbol.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Core/Utilities.js"],
        ],
        function (b, p, A, E, w, D, B, k) {
            var t =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (d, b) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, d) {
                                        a.__proto__ = d;
                                    }) ||
                                function (a, d) {
                                    for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                                };
                            return a(d, b);
                        };
                        return function (d, b) {
                            function e() {
                                this.constructor = d;
                            }
                            a(d, b);
                            d.prototype = null === b ? Object.create(b) : ((e.prototype = b.prototype), new e());
                        };
                    })(),
                n = p.parse,
                h = w.noop,
                d = B.series,
                a = k.extend,
                e = k.isNumber,
                g = k.merge,
                x = k.pick;
            p = (function (b) {
                function k(a, d) {
                    var e = b.call(this, a, d) || this;
                    e.beforePadding = !1;
                    e.chart = void 0;
                    e.coll = "colorAxis";
                    e.dataClasses = void 0;
                    e.legendItem = void 0;
                    e.legendItems = void 0;
                    e.name = "";
                    e.options = void 0;
                    e.stops = void 0;
                    e.visible = !0;
                    e.init(a, d);
                    return e;
                }
                t(k, b);
                k.compose = function (a, d, b, f) {
                    A.compose(k, a, d, b, f);
                };
                k.prototype.init = function (a, d) {
                    var e = a.options.legend || {},
                        f = d.layout ? "vertical" !== d.layout : "vertical" !== e.layout,
                        h = d.visible;
                    e = g(k.defaultColorAxisOptions, d, { showEmpty: !1, title: null, visible: e.enabled && !1 !== h });
                    this.coll = "colorAxis";
                    this.side = d.side || f ? 2 : 1;
                    this.reversed = d.reversed || !f;
                    this.opposite = !f;
                    b.prototype.init.call(this, a, e);
                    this.userOptions.visible = h;
                    d.dataClasses && this.initDataClasses(d);
                    this.initStops();
                    this.horiz = f;
                    this.zoomEnabled = !1;
                };
                k.prototype.initDataClasses = function (a) {
                    var d = this.chart,
                        b = this.options,
                        f = a.dataClasses.length,
                        e,
                        c = 0,
                        h = d.options.chart.colorCount;
                    this.dataClasses = e = [];
                    this.legendItems = [];
                    (a.dataClasses || []).forEach(function (a, m) {
                        a = g(a);
                        e.push(a);
                        if (d.styledMode || !a.color)
                            "category" === b.dataClassColor
                                ? (d.styledMode || ((m = d.options.colors), (h = m.length), (a.color = m[c])), (a.colorIndex = c), c++, c === h && (c = 0))
                                : (a.color = n(b.minColor).tweenTo(n(b.maxColor), 2 > f ? 0.5 : m / (f - 1)));
                    });
                };
                k.prototype.hasData = function () {
                    return !!(this.tickPositions || []).length;
                };
                k.prototype.setTickPositions = function () {
                    if (!this.dataClasses) return b.prototype.setTickPositions.call(this);
                };
                k.prototype.initStops = function () {
                    this.stops = this.options.stops || [
                        [0, this.options.minColor],
                        [1, this.options.maxColor],
                    ];
                    this.stops.forEach(function (a) {
                        a.color = n(a[1]);
                    });
                };
                k.prototype.setOptions = function (a) {
                    b.prototype.setOptions.call(this, a);
                    this.options.crosshair = this.options.marker;
                };
                k.prototype.setAxisSize = function () {
                    var a = this.legendSymbol,
                        d = this.chart,
                        b = d.options.legend || {},
                        f,
                        e;
                    a
                        ? ((this.left = b = a.attr("x")),
                          (this.top = f = a.attr("y")),
                          (this.width = e = a.attr("width")),
                          (this.height = a = a.attr("height")),
                          (this.right = d.chartWidth - b - e),
                          (this.bottom = d.chartHeight - f - a),
                          (this.len = this.horiz ? e : a),
                          (this.pos = this.horiz ? b : f))
                        : (this.len = (this.horiz ? b.symbolWidth : b.symbolHeight) || k.defaultLegendLength);
                };
                k.prototype.normalizedValue = function (a) {
                    this.logarithmic && (a = this.logarithmic.log2lin(a));
                    return 1 - (this.max - a) / (this.max - this.min || 1);
                };
                k.prototype.toColor = function (a, d) {
                    var b = this.dataClasses,
                        f = this.stops,
                        e;
                    if (b)
                        for (e = b.length; e--; ) {
                            var c = b[e];
                            var g = c.from;
                            f = c.to;
                            if (("undefined" === typeof g || a >= g) && ("undefined" === typeof f || a <= f)) {
                                var h = c.color;
                                d && ((d.dataClass = e), (d.colorIndex = c.colorIndex));
                                break;
                            }
                        }
                    else {
                        a = this.normalizedValue(a);
                        for (e = f.length; e-- && !(a > f[e][0]); );
                        g = f[e] || f[e + 1];
                        f = f[e + 1] || g;
                        a = 1 - (f[0] - a) / (f[0] - g[0] || 1);
                        h = g.color.tweenTo(f.color, a);
                    }
                    return h;
                };
                k.prototype.getOffset = function () {
                    var a = this.legendGroup,
                        d = this.chart.axisOffset[this.side];
                    a && ((this.axisParent = a), b.prototype.getOffset.call(this), this.added || ((this.added = !0), (this.labelLeft = 0), (this.labelRight = this.width)), (this.chart.axisOffset[this.side] = d));
                };
                k.prototype.setLegendColor = function () {
                    var a = this.reversed,
                        d = a ? 1 : 0;
                    a = a ? 0 : 1;
                    d = this.horiz ? [d, 0, a, 0] : [0, a, 0, d];
                    this.legendColor = { linearGradient: { x1: d[0], y1: d[1], x2: d[2], y2: d[3] }, stops: this.stops };
                };
                k.prototype.drawLegendSymbol = function (a, d) {
                    var b = a.padding,
                        e = a.options,
                        g = this.horiz,
                        c = x(e.symbolWidth, g ? k.defaultLegendLength : 12),
                        h = x(e.symbolHeight, g ? 12 : k.defaultLegendLength),
                        l = x(e.labelPadding, g ? 16 : 30);
                    e = x(e.itemDistance, 10);
                    this.setLegendColor();
                    d.legendSymbol = this.chart.renderer
                        .rect(0, a.baseline - 11, c, h)
                        .attr({ zIndex: 1 })
                        .add(d.legendGroup);
                    this.legendItemWidth = c + b + (g ? e : l);
                    this.legendItemHeight = h + b + (g ? l : 0);
                };
                k.prototype.setState = function (a) {
                    this.series.forEach(function (d) {
                        d.setState(a);
                    });
                };
                k.prototype.setVisible = function () {};
                k.prototype.getSeriesExtremes = function () {
                    var a = this.series,
                        b = a.length,
                        e;
                    this.dataMin = Infinity;
                    for (this.dataMax = -Infinity; b--; ) {
                        var f = a[b];
                        var g = (f.colorKey = x(f.options.colorKey, f.colorKey, f.pointValKey, f.zoneAxis, "y"));
                        var c = f.pointArrayMap;
                        var h = f[g + "Min"] && f[g + "Max"];
                        if (f[g + "Data"]) var k = f[g + "Data"];
                        else if (c) {
                            k = [];
                            c = c.indexOf(g);
                            var n = f.yData;
                            if (0 <= c && n) for (e = 0; e < n.length; e++) k.push(x(n[e][c], n[e]));
                        } else k = f.yData;
                        h ? ((f.minColorValue = f[g + "Min"]), (f.maxColorValue = f[g + "Max"])) : ((k = d.prototype.getExtremes.call(f, k)), (f.minColorValue = k.dataMin), (f.maxColorValue = k.dataMax));
                        "undefined" !== typeof f.minColorValue && ((this.dataMin = Math.min(this.dataMin, f.minColorValue)), (this.dataMax = Math.max(this.dataMax, f.maxColorValue)));
                        h || d.prototype.applyExtremes.call(f);
                    }
                };
                k.prototype.drawCrosshair = function (a, d) {
                    var e = d && d.plotX,
                        f = d && d.plotY,
                        g = this.pos,
                        c = this.len;
                    if (d) {
                        var h = this.toPixels(d.getNestedProperty(d.series.colorKey));
                        h < g ? (h = g - 2) : h > g + c && (h = g + c + 2);
                        d.plotX = h;
                        d.plotY = this.len - h;
                        b.prototype.drawCrosshair.call(this, a, d);
                        d.plotX = e;
                        d.plotY = f;
                        this.cross &&
                            !this.cross.addedToColorAxis &&
                            this.legendGroup &&
                            (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),
                            (this.cross.addedToColorAxis = !0),
                            this.chart.styledMode || "object" !== typeof this.crosshair || this.cross.attr({ fill: this.crosshair.color }));
                    }
                };
                k.prototype.getPlotLinePath = function (a) {
                    var d = this.left,
                        g = a.translatedValue,
                        f = this.top;
                    return e(g) ? (this.horiz ? [["M", g - 4, f - 6], ["L", g + 4, f - 6], ["L", g, f], ["Z"]] : [["M", d, g], ["L", d - 6, g + 6], ["L", d - 6, g - 6], ["Z"]]) : b.prototype.getPlotLinePath.call(this, a);
                };
                k.prototype.update = function (a, d) {
                    var e = this.chart.legend;
                    this.series.forEach(function (a) {
                        a.isDirtyData = !0;
                    });
                    ((a.dataClasses && e.allItems) || this.dataClasses) && this.destroyItems();
                    b.prototype.update.call(this, a, d);
                    this.legendItem && (this.setLegendColor(), e.colorizeItem(this, !0));
                };
                k.prototype.destroyItems = function () {
                    var a = this.chart;
                    this.legendItem
                        ? a.legend.destroyItem(this)
                        : this.legendItems &&
                          this.legendItems.forEach(function (d) {
                              a.legend.destroyItem(d);
                          });
                    a.isDirtyLegend = !0;
                };
                k.prototype.destroy = function () {
                    this.chart.isDirtyLegend = !0;
                    this.destroyItems();
                    b.prototype.destroy.apply(this, [].slice.call(arguments));
                };
                k.prototype.remove = function (a) {
                    this.destroyItems();
                    b.prototype.remove.call(this, a);
                };
                k.prototype.getDataClassLegendSymbols = function () {
                    var d = this,
                        b = d.chart,
                        e = d.legendItems,
                        f = b.options.legend,
                        g = f.valueDecimals,
                        c = f.valueSuffix || "",
                        k;
                    e.length ||
                        d.dataClasses.forEach(function (f, m) {
                            var l = f.from,
                                n = f.to,
                                q = b.numberFormatter,
                                r = !0;
                            k = "";
                            "undefined" === typeof l ? (k = "< ") : "undefined" === typeof n && (k = "> ");
                            "undefined" !== typeof l && (k += q(l, g) + c);
                            "undefined" !== typeof l && "undefined" !== typeof n && (k += " - ");
                            "undefined" !== typeof n && (k += q(n, g) + c);
                            e.push(
                                a(
                                    {
                                        chart: b,
                                        name: k,
                                        options: {},
                                        drawLegendSymbol: D.drawRectangle,
                                        visible: !0,
                                        setState: h,
                                        isDataClass: !0,
                                        setVisible: function () {
                                            r = d.visible = !r;
                                            d.series.forEach(function (a) {
                                                a.points.forEach(function (a) {
                                                    a.dataClass === m && a.setVisible(r);
                                                });
                                            });
                                            b.legend.colorizeItem(this, r);
                                        },
                                    },
                                    f
                                )
                            );
                        });
                    return e;
                };
                k.defaultColorAxisOptions = E;
                k.defaultLegendLength = 200;
                k.keepProps = ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"];
                return k;
            })(b);
            Array.prototype.push.apply(b.keepProps, p.keepProps);
            ("");
            return p;
        }
    );
    G(b, "Maps/MapNavigationOptionsDefault.js", [b["Core/DefaultOptions.js"], b["Core/Utilities.js"]], function (b, p) {
        p = p.extend;
        var v = {
            buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "bold" }, theme: { "stroke-width": 1, "text-align": "center" } },
            buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(0.5);
                    },
                    text: "+",
                    y: 0,
                },
                zoomOut: {
                    onclick: function () {
                        this.mapZoom(2);
                    },
                    text: "-",
                    y: 28,
                },
            },
            mouseWheelSensitivity: 1.1,
        };
        p(b.defaultOptions.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" });
        return (b.defaultOptions.mapNavigation = v);
    });
    G(b, "Maps/MapNavigation.js", [b["Core/Chart/Chart.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A) {
        function v(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
        }
        function w(a) {
            this.init(a);
        }
        var D = p.doc,
            B = A.addEvent,
            k = A.extend,
            t = A.isNumber,
            n = A.merge,
            h = A.objectEach,
            d = A.pick;
        w.prototype.init = function (a) {
            this.chart = a;
            a.mapNavButtons = [];
        };
        w.prototype.update = function (a) {
            var b = this.chart,
                g = b.options.mapNavigation,
                t,
                p,
                r,
                q,
                z = function (a) {
                    this.handler.call(b, a);
                    v(a);
                },
                m = b.mapNavButtons;
            a && (g = b.options.mapNavigation = n(b.options.mapNavigation, a));
            for (; m.length; ) m.pop().destroy();
            d(g.enableButtons, g.enabled) &&
                !b.renderer.forExport &&
                h(g.buttons, function (a, d) {
                    a = n(g.buttonOptions, a);
                    !b.styledMode && a.theme && ((t = a.theme), (t.style = n(a.theme.style, a.style)), (r = (p = t.states) && p.hover), (q = p && p.select), delete t.states);
                    var c = b.renderer
                        .button(a.text || "", 0, 0, z, t, r, q, void 0, "zoomIn" === d ? "topbutton" : "bottombutton")
                        .addClass("highcharts-map-navigation highcharts-" + { zoomIn: "zoom-in", zoomOut: "zoom-out" }[d])
                        .attr({ width: a.width, height: a.height, title: b.options.lang[d], padding: a.padding, zIndex: 5 })
                        .add();
                    c.handler = a.onclick;
                    B(c.element, "dblclick", v);
                    m.push(c);
                    k(a, { width: c.width, height: 2 * c.height });
                    if (b.hasLoaded) c.align(a, !1, a.alignTo);
                    else
                        var e = B(b, "load", function () {
                            c.element && c.align(a, !1, a.alignTo);
                            e();
                        });
                });
            this.updateEvents(g);
        };
        w.prototype.updateEvents = function (a) {
            var b = this.chart;
            d(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo
                ? (this.unbindDblClick =
                      this.unbindDblClick ||
                      B(b.container, "dblclick", function (a) {
                          b.pointer.onContainerDblClick(a);
                      }))
                : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            d(a.enableMouseWheelZoom, a.enabled)
                ? (this.unbindMouseWheel =
                      this.unbindMouseWheel ||
                      B(b.container, void 0 !== D.onwheel ? "wheel" : void 0 !== D.onmousewheel ? "mousewheel" : "DOMMouseScroll", function (a) {
                          b.pointer.inClass(a.target, "highcharts-no-mousewheel") || (b.pointer.onContainerMouseWheel(a), v(a));
                          return !1;
                      }))
                : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel());
        };
        k(b.prototype, {
            fitToBox: function (a, d) {
                [
                    ["x", "width"],
                    ["y", "height"],
                ].forEach(function (b) {
                    var e = b[0];
                    b = b[1];
                    a[e] + a[b] > d[e] + d[b] && (a[b] > d[b] ? ((a[b] = d[b]), (a[e] = d[e])) : (a[e] = d[e] + d[b] - a[b]));
                    a[b] > d[b] && (a[b] = d[b]);
                    a[e] < d[e] && (a[e] = d[e]);
                });
                return a;
            },
            mapZoom: function (a, d, b, h, k) {
                this.mapView && (t(a) && (a = Math.log(a) / Math.log(0.5)), this.mapView.zoomBy(a, t(d) && t(b) ? this.mapView.projection.inverse([d, b]) : void 0, t(h) && t(k) ? [h, k] : void 0));
            },
        });
        B(b, "beforeRender", function () {
            this.mapNavigation = new w(this);
            this.mapNavigation.update();
        });
        p.MapNavigation = w;
    });
    G(b, "Maps/MapPointer.js", [b["Core/Pointer.js"], b["Core/Utilities.js"]], function (b, p) {
        var v = p.defined,
            E = p.extend,
            w = p.pick;
        p = p.wrap;
        var D = 0,
            B;
        E(b.prototype, {
            onContainerDblClick: function (b) {
                var k = this.chart;
                b = this.normalize(b);
                k.options.mapNavigation.enableDoubleClickZoomTo
                    ? k.pointer.inClass(b.target, "highcharts-tracker") && k.hoverPoint && k.hoverPoint.zoomTo()
                    : k.isInsidePlot(b.chartX - k.plotLeft, b.chartY - k.plotTop) && k.mapZoom(0.5, void 0, void 0, b.chartX, b.chartY);
            },
            onContainerMouseWheel: function (b) {
                var k = this.chart;
                b = this.normalize(b);
                var n = (v(b.wheelDelta) && -b.wheelDelta / 120) || b.deltaY || b.detail;
                1 <= Math.abs(n) &&
                    ((D += Math.abs(n)),
                    B && clearTimeout(B),
                    (B = setTimeout(function () {
                        D = 0;
                    }, 50)));
                10 > D && k.isInsidePlot(b.chartX - k.plotLeft, b.chartY - k.plotTop) && k.mapView && k.mapView.zoomBy((k.options.mapNavigation.mouseWheelSensitivity - 1) * -n, void 0, [b.chartX, b.chartY], 1 > Math.abs(n) ? !1 : void 0);
            },
        });
        p(b.prototype, "zoomOption", function (b) {
            var k = this.chart.options.mapNavigation;
            w(k.enableTouchZoom, k.enabled) && (this.chart.options.chart.pinchType = "xy");
            b.apply(this, [].slice.call(arguments, 1));
        });
        p(b.prototype, "pinchTranslate", function (b, t, n, h, d, a, e) {
            b.call(this, t, n, h, d, a, e);
            "map" === this.chart.options.chart.type && this.hasZoom && ((b = h.scaleX > h.scaleY), this.pinchTranslateDirection(!b, t, n, h, d, a, e, b ? h.scaleX : h.scaleY));
        });
    });
    G(b, "Series/ColorMapMixin.js", [b["Core/Globals.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = b.noop;
        b = b.seriesTypes;
        var w = A.defined;
        A = A.addEvent;
        A(p, "afterSetState", function (b) {
            this.moveToTopOnHover && this.graphic && this.graphic.attr({ zIndex: b && "hover" === b.state ? 1 : 0 });
        });
        return {
            PointMixin: {
                dataLabelOnNull: !0,
                moveToTopOnHover: !0,
                isValid: function () {
                    return null !== this.value && Infinity !== this.value && -Infinity !== this.value;
                },
            },
            SeriesMixin: {
                pointArrayMap: ["value"],
                axisTypes: ["xAxis", "yAxis", "colorAxis"],
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                getSymbol: v,
                parallelArrays: ["x", "y", "value"],
                colorKey: "value",
                pointAttribs: b.column.prototype.pointAttribs,
                colorAttribs: function (b) {
                    var p = {};
                    !w(b.color) || (b.state && "normal" !== b.state) || (p[this.colorProp || "fill"] = b.color);
                    return p;
                },
            },
        };
    });
    G(b, "Maps/MapViewOptionsDefault.js", [], function () {
        return { center: [0, 0], maxZoom: void 0, padding: 0, projection: void 0, zoom: void 0 };
    });
    G(b, "Maps/Projections/LambertConformalConic.js", [], function () {
        var b =
                Math.sign ||
                function (b) {
                    return 0 === b ? 0 : 0 < b ? 1 : -1;
                },
            p = Math.PI / 180,
            A = Math.PI / 2,
            E = 0,
            w = 0;
        return {
            init: function (v) {
                var B = (v.parallels || []).map(function (b) {
                    return b * p;
                });
                v = B[0] || 0;
                B = B[1] || v;
                var k = Math.cos(v);
                E = v === B ? Math.sin(v) : Math.log(k / Math.cos(B)) / Math.log(Math.tan((A + B) / 2) / Math.tan((A + v) / 2));
                1e-10 > Math.abs(E) && (E = 1e-10 * (b(E) || 1));
                w = (k * Math.pow(Math.tan((A + v) / 2), E)) / E;
            },
            forward: function (b) {
                var v = b[0] * p;
                b = b[1] * p;
                0 < w ? b < -A + 0.000001 && (b = -A + 0.000001) : b > A - 0.000001 && (b = A - 0.000001);
                b = w / Math.pow(Math.tan((A + b) / 2), E);
                return [b * Math.sin(E * v) * 63.78137, 63.78137 * (w - b * Math.cos(E * v))];
            },
            inverse: function (v) {
                var B = v[0] / 63.78137;
                v = w - v[1] / 63.78137;
                var k = b(E) * Math.sqrt(B * B + v * v),
                    t = Math.atan2(B, Math.abs(v)) * b(v);
                0 > v * E && (t -= Math.PI * b(B) * b(v));
                return [t / E / p, (2 * Math.atan(Math.pow(w / k, 1 / E)) - A) / p];
            },
        };
    });
    G(b, "Maps/Projections/EqualEarth.js", [], function () {
        var b = Math.sqrt(3) / 2;
        return {
            forward: function (p) {
                var v = Math.PI / 180,
                    E = Math.asin(b * Math.sin(p[1] * v)),
                    w = E * E,
                    D = w * w * w;
                return [(p[0] * v * Math.cos(E) * 74.03120656864502) / (b * (1.340264 + 3 * -0.081106 * w + D * (7 * 0.000893 + 0.034164 * w))), 74.03120656864502 * E * (1.340264 + -0.081106 * w + D * (0.000893 + 0.003796 * w))];
            },
            inverse: function (p) {
                var v = p[0] / 74.03120656864502;
                p = p[1] / 74.03120656864502;
                var E = 180 / Math.PI,
                    w = p,
                    D;
                for (D = 0; 12 > D; ++D) {
                    var B = w * w;
                    var k = B * B * B;
                    var t = w * (1.340264 + -0.081106 * B + k * (0.000893 + 0.003796 * B)) - p;
                    B = 1.340264 + 3 * -0.081106 * B + k * (7 * 0.000893 + 0.034164 * B);
                    w -= t /= B;
                    if (1e-9 > Math.abs(t)) break;
                }
                B = w * w;
                return [(E * b * v * (1.340264 + 3 * -0.081106 * B + B * B * B * (7 * 0.000893 + 0.034164 * B))) / Math.cos(w), E * Math.asin(Math.sin(w) / b)];
            },
        };
    });
    G(b, "Maps/Projections/Miller.js", [], function () {
        var b = Math.PI / 4,
            p = Math.PI / 180;
        return {
            forward: function (v) {
                return [v[0] * p * 63.78137, 79.7267125 * Math.log(Math.tan(b + 0.4 * v[1] * p))];
            },
            inverse: function (v) {
                return [v[0] / 63.78137 / p, (2.5 * (Math.atan(Math.exp((v[1] / 63.78137) * 0.8)) - b)) / p];
            },
        };
    });
    G(b, "Maps/Projections/Orthographic.js", [], function () {
        var b = Math.PI / 180;
        return {
            forward: function (p) {
                var v = p[0];
                if (-90 > v || 90 < v) return [NaN, NaN];
                p = p[1] * b;
                return [Math.cos(p) * Math.sin(v * b) * 63.78460826781007, 63.78460826781007 * Math.sin(p)];
            },
            inverse: function (p) {
                var v = p[0] / 63.78460826781007;
                p = p[1] / 63.78460826781007;
                var E = Math.sqrt(v * v + p * p),
                    w = Math.asin(E),
                    D = Math.sin(w);
                return [Math.atan2(v * D, E * Math.cos(w)) / b, Math.asin(E && (p * D) / E) / b];
            },
        };
    });
    G(b, "Maps/Projections/WebMercator.js", [], function () {
        var b = Math.PI / 180;
        return {
            forward: function (p) {
                if (85.0511287798 < Math.abs(p[1])) return [NaN, NaN];
                var v = Math.sin(p[1] * b);
                return [63.78137 * p[0] * b, (63.78137 * Math.log((1 + v) / (1 - v))) / 2];
            },
            inverse: function (p) {
                return [p[0] / (63.78137 * b), (2 * Math.atan(Math.exp(p[1] / 63.78137)) - Math.PI / 2) / b];
            },
            maxLatitude: 85.0511287798,
        };
    });
    G(
        b,
        "Maps/Projections/ProjectionRegistry.js",
        [b["Maps/Projections/LambertConformalConic.js"], b["Maps/Projections/EqualEarth.js"], b["Maps/Projections/Miller.js"], b["Maps/Projections/Orthographic.js"], b["Maps/Projections/WebMercator.js"]],
        function (b, p, A, E, w) {
            return { EqualEarth: p, LambertConformalConic: b, Miller: A, Orthographic: E, WebMercator: w };
        }
    );
    G(b, "Maps/Projection.js", [b["Maps/Projections/ProjectionRegistry.js"], b["Core/Utilities.js"]], function (b, p) {
        var v =
                (this && this.__spreadArrays) ||
                function () {
                    for (var b = 0, k = 0, t = arguments.length; k < t; k++) b += arguments[k].length;
                    b = Array(b);
                    var n = 0;
                    for (k = 0; k < t; k++) for (var h = arguments[k], d = 0, a = h.length; d < a; d++, n++) b[n] = h[d];
                    return b;
                },
            E = p.erase,
            w = (2 * Math.PI) / 360,
            D = function (b) {
                -180 > b && (b += 360);
                180 < b && (b -= 360);
                return b;
            };
        return (function () {
            function p(b) {
                void 0 === b && (b = {});
                this.hasGeoProjection = this.hasCoordinates = !1;
                this.maxLatitude = 90;
                this.options = b;
                var k = b.name,
                    n = b.rotation;
                this.rotator = n ? this.getRotator(n) : void 0;
                var h = (this.def = k ? p.registry[k] : void 0),
                    d = this.rotator;
                h && (h.init && h.init(b), (this.maxLatitude = h.maxLatitude || 90), (this.hasGeoProjection = !0));
                d && h
                    ? ((this.forward = function (a) {
                          a = d.forward(a);
                          return h.forward(a);
                      }),
                      (this.inverse = function (a) {
                          a = h.inverse(a);
                          return d.inverse(a);
                      }))
                    : h
                    ? ((this.forward = h.forward), (this.inverse = h.inverse))
                    : d && ((this.forward = d.forward), (this.inverse = d.inverse));
            }
            p.add = function (b, t) {
                p.registry[b] = t;
            };
            p.greatCircle = function (b, t, n) {
                var h = Math.atan2,
                    d = Math.cos,
                    a = Math.sin,
                    e = Math.sqrt,
                    g = b[1] * w,
                    k = b[0] * w,
                    p = t[1] * w,
                    r = t[0] * w,
                    q = p - g,
                    z = r - k;
                q = a(q / 2) * a(q / 2) + d(g) * d(p) * a(z / 2) * a(z / 2);
                q = 2 * h(e(q), e(1 - q));
                var m = Math.round((6371e3 * q) / 5e5);
                z = [];
                n && z.push(b);
                if (1 < m)
                    for (m = b = 1 / m; 0.999 > m; m += b) {
                        var f = a((1 - m) * q) / a(q),
                            v = a(m * q) / a(q),
                            c = f * d(g) * d(k) + v * d(p) * d(r),
                            u = f * d(g) * a(k) + v * d(p) * a(r);
                        f = f * a(g) + v * a(p);
                        f = h(f, e(c * c + u * u));
                        c = h(u, c);
                        z.push([c / w, f / w]);
                    }
                n && z.push(t);
                return z;
            };
            p.insertGreatCircles = function (b) {
                for (var k = b.length - 1; k--; )
                    if (10 < Math.max(Math.abs(b[k][0] - b[k + 1][0]), Math.abs(b[k][1] - b[k + 1][1]))) {
                        var n = p.greatCircle(b[k], b[k + 1]);
                        n.length && b.splice.apply(b, v([k + 1, 0], n));
                    }
            };
            p.toString = function (b) {
                b = b || {};
                var k = b.rotation;
                return [b.name, k && k.join(",")].join(";");
            };
            p.prototype.getRotator = function (b) {
                var k = b[0] * w,
                    n = (b[1] || 0) * w;
                b = (b[2] || 0) * w;
                var h = Math.cos(n),
                    d = Math.sin(n),
                    a = Math.cos(b),
                    e = Math.sin(b);
                if (0 !== k || 0 !== n || 0 !== b)
                    return {
                        forward: function (b) {
                            var g = b[0] * w + k,
                                n = b[1] * w,
                                r = Math.cos(n);
                            b = Math.cos(g) * r;
                            g = Math.sin(g) * r;
                            n = Math.sin(n);
                            r = n * h + b * d;
                            return [Math.atan2(g * a - r * e, b * h - n * d) / w, Math.asin(r * a + g * e) / w];
                        },
                        inverse: function (b) {
                            var g = b[0] * w,
                                n = b[1] * w,
                                r = Math.cos(n);
                            b = Math.cos(g) * r;
                            g = Math.sin(g) * r;
                            n = Math.sin(n);
                            r = n * a - g * e;
                            return [(Math.atan2(g * a + n * e, b * h + r * d) - k) / w, Math.asin(r * h - b * d) / w];
                        },
                    };
            };
            p.prototype.forward = function (b) {
                return b;
            };
            p.prototype.inverse = function (b) {
                return b;
            };
            p.prototype.clipOnAntimeridian = function (b, t) {
                var k = [],
                    h = [b];
                b.forEach(function (a, d) {
                    var e = b[d - 1];
                    if (!d) {
                        if (!t) return;
                        e = b[b.length - 1];
                    }
                    var g = e[0],
                        f = a[0];
                    (-90 > g || 90 < g) && (-90 > f || 90 < f) && 0 < g !== 0 < f && k.push({ i: d, lat: e[1] + ((180 - e[0]) / (a[0] - e[0])) * (a[1] - e[1]), direction: 0 > g ? 1 : -1, previousLonLat: e, lonLat: a });
                });
                if (k.length)
                    if (t) {
                        if (1 === k.length % 2) {
                            var d = k.slice().sort(function (a, b) {
                                return Math.abs(b.lat) - Math.abs(a.lat);
                            })[0];
                            E(k, d);
                        }
                        for (var a = k.length - 2; 0 <= a; ) {
                            var e = k[a].i,
                                g = D(180 + 0.000001 * k[a].direction),
                                x = D(180 - 0.000001 * k[a].direction);
                            e = b.splice.apply(b, v([e, k[a + 1].i - e], p.greatCircle([g, k[a].lat], [g, k[a + 1].lat], !0)));
                            e.push.apply(e, p.greatCircle([x, k[a + 1].lat], [x, k[a].lat], !0));
                            h.push(e);
                            a -= 2;
                        }
                        if (d)
                            for (e = 0; e < h.length; e++)
                                if (((a = h[e]), (x = a.indexOf(d.lonLat)), -1 < x)) {
                                    e = (0 > d.lat ? -1 : 1) * this.maxLatitude;
                                    g = D(180 + 0.000001 * d.direction);
                                    var w = D(180 - 0.000001 * d.direction);
                                    d = p.greatCircle([g, d.lat], [g, e], !0).concat(p.greatCircle([w, e], [w, d.lat], !0));
                                    a.splice.apply(a, v([x, 0], d));
                                    break;
                                }
                    } else for (a = k.length; a--; ) (e = k[a].i), (e = b.splice(e, b.length, [D(180 + 0.000001 * k[a].direction), k[a].lat])), e.unshift([D(180 - 0.000001 * k[a].direction), k[a].lat]), h.push(e);
                return h;
            };
            p.prototype.path = function (b) {
                var k = this,
                    n = this.def,
                    h = this.rotator,
                    d = [],
                    a = "Polygon" === b.type || "MultiPolygon" === b.type,
                    e = this.hasGeoProjection,
                    g = "Orthographic" !== this.options.name,
                    x = g ? h : void 0,
                    v = g ? n || this : this,
                    r = function (b) {
                        b = b.map(function (a) {
                            if (g) {
                                x && (a = x.forward(a));
                                var b = a[0];
                                0.000001 > Math.abs(b - 180) && (b = 180 > b ? 179.999999 : 180.000001);
                                a = [b, a[1]];
                            }
                            return a;
                        });
                        var h = [b];
                        e && (p.insertGreatCircles(b), g && (h = k.clipOnAntimeridian(b, a)));
                        h.forEach(function (b) {
                            if (!(2 > b.length))
                                for (
                                    var f = !1,
                                        g,
                                        c,
                                        h = !1,
                                        m = function (a) {
                                            f ? d.push(["L", a[0], a[1]]) : (d.push(["M", a[0], a[1]]), (f = !0));
                                        },
                                        n = 0;
                                    n < b.length;
                                    n++
                                ) {
                                    var q = b[n],
                                        r = v.forward(q);
                                    isNaN(r[0]) || isNaN(r[1]) || (e && !(q[1] <= k.maxLatitude && q[1] >= -k.maxLatitude))
                                        ? (h = !0)
                                        : (a && !g && ((g = q), b.push(q)),
                                          h &&
                                              c &&
                                              (a && e
                                                  ? p.greatCircle(c, q).forEach(function (a) {
                                                        return m(v.forward(a));
                                                    })
                                                  : (f = !1)),
                                          m(r),
                                          (c = q),
                                          (h = !1));
                                }
                        });
                    };
                "LineString" === b.type
                    ? r(b.coordinates)
                    : "MultiLineString" === b.type
                    ? b.coordinates.forEach(function (a) {
                          return r(a);
                      })
                    : "Polygon" === b.type
                    ? (b.coordinates.forEach(function (a) {
                          return r(a);
                      }),
                      d.length && d.push(["Z"]))
                    : "MultiPolygon" === b.type &&
                      (b.coordinates.forEach(function (a) {
                          a.forEach(function (a) {
                              return r(a);
                          });
                      }),
                      d.length && d.push(["Z"]));
                return d;
            };
            p.registry = b;
            return p;
        })();
    });
    G(b, "Maps/MapView.js", [b["Maps/MapViewOptionsDefault.js"], b["Maps/Projection.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v = A.addEvent,
            w = A.clamp,
            D = A.fireEvent,
            B = A.isNumber,
            k = A.merge,
            t = A.pick,
            n = A.relativeLength;
        return (function () {
            function h(d, a) {
                var e = this;
                this.userOptions = a || {};
                a = k(b, a);
                this.chart = d;
                this.center = a.center;
                this.options = a;
                this.projection = new p(a.projection);
                this.zoom = a.zoom || 0;
                v(d, "afterSetChartSize", function () {
                    if (void 0 === e.minZoom || e.minZoom === e.zoom) e.fitToBounds(void 0, void 0, !1), B(e.userOptions.zoom) && (e.zoom = e.userOptions.zoom), e.userOptions.center && k(!0, e.center, e.userOptions.center);
                });
                var g, h, n;
                a = function (a) {
                    var b = d.pointer.pinchDown,
                        k = d.mouseDownX,
                        m = d.mouseDownY;
                    1 === b.length && ((k = b[0].chartX), (m = b[0].chartY));
                    if ("number" === typeof k && "number" === typeof m) {
                        var f = k + "," + m,
                            r = a.originalEvent;
                        b = r.chartX;
                        r = r.chartY;
                        f !== h && ((h = f), (g = e.projection.forward(e.center)), (n = (e.projection.options.rotation || [0, 0]).slice()));
                        "Orthographic" === e.projection.options.name && 3 > (e.minZoom || Infinity)
                            ? ((f = 440 / (e.getScale() * Math.min(d.plotWidth, d.plotHeight))),
                              n && ((k = (k - b) * f - n[0]), (m = w(-n[1] - (m - r) * f, -80, 80)), e.update({ projection: { rotation: [-k, -m] }, center: [k, m], zoom: e.zoom }, !0, !1)))
                            : ((f = e.getScale()), (m = e.projection.inverse([g[0] + (k - b) / f, g[1] - (m - r) / f])), e.setView(m, void 0, !0, !1));
                        a.preventDefault();
                    }
                };
                v(d, "pan", a);
                v(d, "touchpan", a);
                v(d, "selection", function (a) {
                    if (a.resetSelection) e.zoomBy();
                    else {
                        var b = a.x - d.plotLeft,
                            g = a.y - d.plotTop,
                            h = e.pixelsToProjectedUnits({ x: b, y: g }),
                            f = h.y;
                        h = h.x;
                        b = e.pixelsToProjectedUnits({ x: b + a.width, y: g + a.height });
                        e.fitToBounds({ x1: h, y1: f, x2: b.x, y2: b.y }, void 0, !0, a.originalEvent.touches ? !1 : void 0);
                        /^touch/.test(a.originalEvent.type) || d.showResetZoom();
                        a.preventDefault();
                    }
                });
            }
            h.prototype.fitToBounds = function (b, a, e, g) {
                void 0 === e && (e = !0);
                var d = b || this.getProjectedBounds();
                if (d) {
                    var h = this.chart,
                        k = h.plotWidth;
                    h = h.plotHeight;
                    var q = t(a, b ? 0 : this.options.padding);
                    a = n(q, k);
                    q = n(q, h);
                    k = Math.log(400.979322 / Math.max((d.x2 - d.x1) / ((k - a) / 256), (d.y2 - d.y1) / ((h - q) / 256))) / Math.log(2);
                    b || (this.minZoom = k);
                    b = this.projection.inverse([(d.x2 + d.x1) / 2, (d.y2 + d.y1) / 2]);
                    this.setView(b, k, e, g);
                }
            };
            h.prototype.getProjectedBounds = function () {
                var b = this.chart.series.reduce(function (a, b) {
                    (b = b.getProjectedBounds && b.getProjectedBounds()) && a.push(b);
                    return a;
                }, []);
                return h.compositeBounds(b);
            };
            h.prototype.getScale = function () {
                return (256 / 400.979322) * Math.pow(2, this.zoom);
            };
            h.prototype.redraw = function (b) {
                this.chart.series.forEach(function (a) {
                    a.useMapGeometry && (a.isDirty = !0);
                });
                this.chart.redraw(b);
            };
            h.prototype.setView = function (b, a, e, g) {
                void 0 === e && (e = !0);
                var d = !1;
                b && (this.center = b);
                "number" === typeof a && ("number" === typeof this.minZoom && (a = Math.max(a, this.minZoom)), "number" === typeof this.options.maxZoom && (a = Math.min(a, this.options.maxZoom)), (d = a > this.zoom), (this.zoom = a));
                var h = this.getProjectedBounds();
                if (h && !d) {
                    d = this.projection.forward(this.center);
                    a = this.chart;
                    b = a.plotWidth;
                    a = a.plotHeight;
                    var k = this.getScale(),
                        n = this.projectedUnitsToPixels({ x: h.x1, y: h.y1 }),
                        t = this.projectedUnitsToPixels({ x: h.x2, y: h.y2 });
                    h = [(h.x1 + h.x2) / 2, (h.y1 + h.y2) / 2];
                    var m = n.x,
                        f = t.y;
                    t = t.x;
                    n = n.y;
                    t - m < b ? (d[0] = h[0]) : 0 > m && t < b ? (d[0] += Math.max(m, t - b) / k) : t > b && 0 < m && (d[0] += Math.min(t - b, m) / k);
                    n - f < a ? (d[1] = h[1]) : 0 > f && n < a ? (d[1] -= Math.max(f, n - a) / k) : n > a && 0 < f && (d[1] -= Math.min(n - a, f) / k);
                    this.center = this.projection.inverse(d);
                }
                D(this, "afterSetView");
                e && this.redraw(g);
            };
            h.prototype.projectedUnitsToPixels = function (b) {
                var a = this.getScale(),
                    d = this.projection.forward(this.center);
                return { x: this.chart.plotWidth / 2 - a * (d[0] - b.x), y: this.chart.plotHeight / 2 + a * (d[1] - b.y) };
            };
            h.prototype.pixelsToProjectedUnits = function (b) {
                var a = b.x;
                b = b.y;
                var d = this.getScale(),
                    g = this.projection.forward(this.center);
                return { x: g[0] + (a - this.chart.plotWidth / 2) / d, y: g[1] - (b - this.chart.plotHeight / 2) / d };
            };
            h.prototype.update = function (b, a, e) {
                void 0 === a && (a = !0);
                var d = b.projection;
                d = d && p.toString(d) !== p.toString(this.options.projection);
                k(!0, this.userOptions, b);
                k(!0, this.options, b);
                d &&
                    (this.chart.series.forEach(function (a) {
                        a.clearBounds && a.clearBounds();
                        a.isDirty = !0;
                        a.isDirtyData = !0;
                    }),
                    (this.projection = new p(this.options.projection)),
                    b.center || B(b.zoom) || this.fitToBounds(void 0, void 0, !1));
                (b.center || B(b.zoom)) && this.setView(this.options.center, b.zoom, !1);
                a && this.chart.redraw(e);
            };
            h.prototype.zoomBy = function (b, a, e, g) {
                var d = this.chart,
                    h = this.projection.forward(this.center);
                a = a ? this.projection.forward(a) : [];
                var k = a[0],
                    n = a[1];
                "number" === typeof b
                    ? ((b = this.zoom + b),
                      (a = void 0),
                      e && ((k = e[0]), (n = e[1]), (e = this.getScale()), (k = k - d.plotLeft - d.plotWidth / 2), (d = n - d.plotTop - d.plotHeight / 2), (k = h[0] + k / e), (n = h[1] + d / e)),
                      "number" === typeof k && "number" === typeof n && ((e = 1 - Math.pow(2, this.zoom) / Math.pow(2, b)), (k = h[0] - k), (d = h[1] - n), (h[0] -= k * e), (h[1] += d * e), (a = this.projection.inverse(h))),
                      this.setView(a, b, void 0, g))
                    : this.fitToBounds(void 0, void 0, void 0, g);
            };
            h.compositeBounds = function (b) {
                if (b.length)
                    return b.slice(1).reduce(function (a, b) {
                        a.x1 = Math.min(a.x1, b.x1);
                        a.y1 = Math.min(a.y1, b.y1);
                        a.x2 = Math.max(a.x2, b.x2);
                        a.y2 = Math.max(a.y2, b.y2);
                        return a;
                    }, k(b[0]));
            };
            return h;
        })();
    });
    G(b, "Maps/MapSymbols.js", [b["Core/Renderer/SVG/SVGRenderer.js"]], function (b) {
        function p(b, p, v, D, B, k, t, n) {
            return [
                ["M", b + B, p],
                ["L", b + v - k, p],
                ["C", b + v - k / 2, p, b + v, p + k / 2, b + v, p + k],
                ["L", b + v, p + D - t],
                ["C", b + v, p + D - t / 2, b + v - t / 2, p + D, b + v - t, p + D],
                ["L", b + n, p + D],
                ["C", b + n / 2, p + D, b, p + D - n / 2, b, p + D - n],
                ["L", b, p + B],
                ["C", b, p + B / 2, b + B / 2, p, b + B, p],
                ["Z"],
            ];
        }
        b = b.prototype.symbols;
        b.bottombutton = function (b, v, w, D, B) {
            B = (B && B.r) || 0;
            return p(b - 1, v - 1, w, D, 0, 0, B, B);
        };
        b.topbutton = function (b, v, w, D, B) {
            B = (B && B.r) || 0;
            return p(b - 1, v - 1, w, D, B, B, 0, 0);
        };
        return b;
    });
    G(b, "Core/Chart/MapChart.js", [b["Core/Chart/Chart.js"], b["Core/DefaultOptions.js"], b["Maps/MapView.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, p, A, E, w) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (d, a) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                            };
                        return b(d, a);
                    };
                    return function (d, a) {
                        function e() {
                            this.constructor = d;
                        }
                        b(d, a);
                        d.prototype = null === a ? Object.create(a) : ((e.prototype = a.prototype), new e());
                    };
                })(),
            B = p.getOptions,
            k = w.addEvent,
            t = w.merge,
            n = w.pick;
        b = (function (b) {
            function d() {
                return (null !== b && b.apply(this, arguments)) || this;
            }
            v(d, b);
            d.prototype.init = function (a, d) {
                k(this, "afterInit", function () {
                    this.mapView = new A(this, this.options.mapView);
                });
                var e = B().credits;
                a = t(
                    {
                        chart: { panning: { enabled: !0, type: "xy" }, type: "map" },
                        credits: { mapText: n(e.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'), mapTextFull: n(e.mapTextFull, "{geojson.copyright}") },
                        mapView: {},
                        tooltip: { followTouchMove: !1 },
                    },
                    a
                );
                b.prototype.init.call(this, a, d);
            };
            return d;
        })(b);
        (function (b) {
            b.maps = {};
            b.mapChart = function (d, a, e) {
                return new b(d, a, e);
            };
            b.splitPath = function (b) {
                "string" === typeof b &&
                    ((b = b
                        .replace(/([A-Za-z])/g, " $1 ")
                        .replace(/^\s*/, "")
                        .replace(/\s*$/, "")),
                    (b = b.split(/[ ,;]+/).map(function (a) {
                        return /[A-za-z]/.test(a) ? a : parseFloat(a);
                    })));
                return E.prototype.pathToSegments(b);
            };
        })(b || (b = {}));
        return b;
    });
    G(b, "Series/Map/MapPoint.js", [b["Series/ColorMapMixin.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (p, k) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, k) {
                                    b.__proto__ = k;
                                }) ||
                            function (b, k) {
                                for (var h in k) k.hasOwnProperty(h) && (b[h] = k[h]);
                            };
                        return b(p, k);
                    };
                    return function (p, k) {
                        function t() {
                            this.constructor = p;
                        }
                        b(p, k);
                        p.prototype = null === k ? Object.create(k) : ((t.prototype = k.prototype), new t());
                    };
                })(),
            w = A.extend;
        p = (function (b) {
            function p() {
                var k = (null !== b && b.apply(this, arguments)) || this;
                k.options = void 0;
                k.path = void 0;
                k.series = void 0;
                return k;
            }
            v(p, b);
            p.getProjectedPath = function (b, p) {
                b.projectedPath || (p && b.geometry ? ((p.hasCoordinates = !0), (b.projectedPath = p.path(b.geometry))) : (b.projectedPath = b.path));
                return b.projectedPath || [];
            };
            p.prototype.applyOptions = function (k, p) {
                var n = this.series;
                k = b.prototype.applyOptions.call(this, k, p);
                p = n.joinBy;
                n.mapData && n.mapMap && ((p = b.prototype.getNestedProperty.call(k, p[1])), (n = "undefined" !== typeof p && n.mapMap[p]) ? w(k, n) : (k.value = k.value || null));
                return k;
            };
            p.prototype.onMouseOver = function (k) {
                A.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) b.prototype.onMouseOver.call(this, k);
                else this.series.onMouseOut(k);
            };
            p.prototype.zoomTo = function () {
                var b = this.series.chart;
                b.mapView && this.bounds && (b.mapView.fitToBounds(this.bounds, void 0, !1), (this.series.isDirty = !0), b.redraw());
            };
            return p;
        })(p.seriesTypes.scatter.prototype.pointClass);
        w(p.prototype, { dataLabelOnNull: b.PointMixin.dataLabelOnNull, isValid: b.PointMixin.isValid, moveToTopOnHover: b.PointMixin.moveToTopOnHover });
        return p;
    });
    G(
        b,
        "Series/Map/MapSeries.js",
        [
            b["Core/Animation/AnimationUtilities.js"],
            b["Series/ColorMapMixin.js"],
            b["Series/CenteredUtilities.js"],
            b["Core/Globals.js"],
            b["Core/Legend/LegendSymbol.js"],
            b["Core/Chart/MapChart.js"],
            b["Series/Map/MapPoint.js"],
            b["Maps/MapView.js"],
            b["Core/Series/Series.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Core/Renderer/SVG/SVGRenderer.js"],
            b["Core/Utilities.js"],
        ],
        function (b, p, A, E, w, D, B, k, t, n, h, d) {
            var a =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (c, b) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c;
                                    }) ||
                                function (a, c) {
                                    for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                                };
                            return a(c, b);
                        };
                        return function (c, b) {
                            function d() {
                                this.constructor = c;
                            }
                            a(c, b);
                            c.prototype = null === b ? Object.create(b) : ((d.prototype = b.prototype), new d());
                        };
                    })(),
                e = b.animObject;
            b = E.noop;
            var g = D.maps,
                x = D.splitPath;
            D = n.seriesTypes;
            var v = D.column,
                r = D.scatter;
            D = d.extend;
            var q = d.fireEvent,
                z = d.getNestedProperty,
                m = d.isArray,
                f = d.isNumber,
                y = d.merge,
                c = d.objectEach,
                u = d.pick,
                l = d.splat;
            d = (function (b) {
                function d() {
                    var a = (null !== b && b.apply(this, arguments)) || this;
                    a.chart = void 0;
                    a.data = void 0;
                    a.group = void 0;
                    a.joinBy = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    a.transformGroup = void 0;
                    return a;
                }
                a(d, b);
                d.prototype.animate = function (a) {
                    var c = this.chart,
                        b = this.group,
                        d = e(this.options.animation);
                    c.renderer.isSVG &&
                        (a
                            ? b.attr({ translateX: c.plotLeft + c.plotWidth / 2, translateY: c.plotTop + c.plotHeight / 2, scaleX: 0.001, scaleY: 0.001 })
                            : b.animate({ translateX: c.plotLeft, translateY: c.plotTop, scaleX: 1, scaleY: 1 }, d));
                };
                d.prototype.animateDrilldown = function (a) {
                    var c = this.chart,
                        b = this.group;
                    c.renderer.isSVG &&
                        (a
                            ? b.attr({ translateX: c.plotLeft + c.plotWidth / 2, translateY: c.plotTop + c.plotHeight / 2, scaleX: 0.1, scaleY: 0.1, opacity: 0.01 })
                            : b.animate({ translateX: c.plotLeft, translateY: c.plotTop, scaleX: 1, scaleY: 1, opacity: 1 }));
                };
                d.prototype.animateDrillupFrom = function () {
                    var a = this.chart;
                    a.renderer.isSVG && this.group.animate({ translateX: a.plotLeft + a.plotWidth / 2, translateY: a.plotTop + a.plotHeight / 2, scaleX: 0.1, scaleY: 0.1, opacity: 0.01 });
                };
                d.prototype.animateDrillupTo = function (a) {
                    v.prototype.animateDrillupTo.call(this, a);
                };
                d.prototype.clearBounds = function () {
                    this.points.forEach(function (a) {
                        delete a.bounds;
                        delete a.projectedPath;
                    });
                    delete this.bounds;
                };
                d.prototype.doFullTranslate = function () {
                    return !(!(this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML) && this.hasRendered);
                };
                d.prototype.drawMapDataLabels = function () {
                    t.prototype.drawDataLabels.call(this);
                    this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect);
                };
                d.prototype.drawPoints = function () {
                    var a = this,
                        c = this.chart,
                        b = this.group,
                        d = this.svgTransform,
                        e = c.mapView,
                        f = c.renderer;
                    this.transformGroup || ((this.transformGroup = f.g().add(b)), (this.transformGroup.survive = !0));
                    this.doFullTranslate() &&
                        (c.hasRendered &&
                            !c.styledMode &&
                            this.points.forEach(function (c) {
                                c.shapeArgs && (c.shapeArgs.fill = a.pointAttribs(c, c.state).fill);
                            }),
                        (this.group = this.transformGroup),
                        v.prototype.drawPoints.apply(this),
                        (this.group = b),
                        this.points.forEach(function (b) {
                            if (b.graphic) {
                                var d = "";
                                b.name && (d += "highcharts-name-" + b.name.replace(/ /g, "-").toLowerCase());
                                b.properties && b.properties["hc-key"] && (d += " highcharts-key-" + b.properties["hc-key"].toLowerCase());
                                d && b.graphic.addClass(d);
                                c.styledMode && b.graphic.css(a.pointAttribs(b, (b.selected && "select") || void 0));
                            }
                        }));
                    if (e && d) {
                        var g = u(this.options[(this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"]) || "borderWidth"], 1),
                            h = d.scaleX,
                            k = 0 < d.scaleY ? 1 : -1,
                            m = this.transformGroup;
                        if (f.globalAnimation && c.hasRendered) {
                            var l = Number(m.attr("translateX")),
                                n = Number(m.attr("translateY")),
                                q = Number(m.attr("scaleX"));
                            m.attr({ animator: 0 }).animate(
                                { animator: 1 },
                                {
                                    step: function (a, c) {
                                        a = q + (h - q) * c.pos;
                                        m.attr({ translateX: l + (d.translateX - l) * c.pos, translateY: n + (d.translateY - n) * c.pos, scaleX: a, scaleY: a * k });
                                        b.element.setAttribute("stroke-width", g / a);
                                    },
                                }
                            );
                        } else m.attr(d), b.element.setAttribute("stroke-width", g / h);
                    }
                    this.drawMapDataLabels();
                };
                d.prototype.getProjectedBounds = function () {
                    if (!this.bounds) {
                        var a = Number.MAX_VALUE,
                            c = this.chart.mapView && this.chart.mapView.projection,
                            b = [];
                        (this.points || []).forEach(function (d) {
                            if (d.path || d.geometry) {
                                "string" === typeof d.path ? (d.path = x(d.path)) : m(d.path) && "M" === d.path[0] && (d.path = h.prototype.pathToSegments(d.path));
                                if (!d.bounds) {
                                    var e = B.getProjectedPath(d, c),
                                        g = d.properties,
                                        k = -a,
                                        l = a,
                                        n = -a,
                                        q = a,
                                        r;
                                    e.forEach(function (a) {
                                        var c = a[a.length - 2];
                                        a = a[a.length - 1];
                                        "number" === typeof c && "number" === typeof a && ((l = Math.min(l, c)), (k = Math.max(k, c)), (q = Math.min(q, a)), (n = Math.max(n, a)), (r = !0));
                                    });
                                    r &&
                                        ((e = g && g["hc-middle-x"]),
                                        (e = l + (k - l) * u(d.middleX, f(e) ? e : 0.5)),
                                        (g = g && g["hc-middle-y"]),
                                        (g = u(d.middleY, f(g) ? g : 0.5)),
                                        d.geometry || (g = 1 - g),
                                        (d.bounds = { midX: e, midY: n - (n - q) * g, x1: l, y1: q, x2: k, y2: n }),
                                        (d.labelrank = u(d.labelrank, (k - l) * (n - q))));
                                }
                                d.bounds && b.push(d.bounds);
                            }
                        });
                        this.bounds = k.compositeBounds(b);
                    }
                    return this.bounds;
                };
                d.prototype.hasData = function () {
                    return !!this.processedXData.length;
                };
                d.prototype.pointAttribs = function (a, c) {
                    var b = a.series.chart,
                        d = b.mapView;
                    c = b.styledMode ? this.colorAttribs(a) : v.prototype.pointAttribs.call(this, a, c);
                    (a = a.options[(this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"]) || "borderWidth"]) && d && (a /= d.getScale());
                    c.dashstyle && d && this.options.borderWidth && (a = this.options.borderWidth / d.getScale());
                    c["stroke-width"] = u(a, "inherit");
                    return c;
                };
                d.prototype.setData = function (a, b, d, e) {
                    var h = this.options,
                        k = this.chart.options.chart,
                        l = k && k.map,
                        n = h.mapData,
                        q = this.joinBy,
                        r = h.keys || this.pointArrayMap,
                        p = [],
                        u = {},
                        v = this.chart.mapTransforms;
                    !n && l && (n = "string" === typeof l ? g[l] : l);
                    a &&
                        a.forEach(function (c, b) {
                            var d = 0;
                            if (f(c)) a[b] = { value: c };
                            else if (m(c)) {
                                a[b] = {};
                                !h.keys && c.length > r.length && "string" === typeof c[0] && ((a[b]["hc-key"] = c[0]), ++d);
                                for (var e = 0; e < r.length; ++e, ++d) r[e] && "undefined" !== typeof c[d] && (0 < r[e].indexOf(".") ? B.prototype.setNestedProperty(a[b], c[d], r[e]) : (a[b][r[e]] = c[d]));
                            }
                            q && "_i" === q[0] && (a[b]._i = b);
                        });
                    (this.chart.mapTransforms = v = k.mapTransforms || (n && n["hc-transform"]) || v) &&
                        c(v, function (a) {
                            a.rotation && ((a.cosAngle = Math.cos(a.rotation)), (a.sinAngle = Math.sin(a.rotation)));
                        });
                    if (n) {
                        "FeatureCollection" === n.type && ((this.mapTitle = n.title), (n = E.geojson(n, this.type, this)));
                        this.mapData = n;
                        this.mapMap = {};
                        for (v = 0; v < n.length; v++) (k = n[v]), (l = k.properties), (k._i = v), q[0] && l && l[q[0]] && (k[q[0]] = l[q[0]]), (u[k[q[0]]] = k);
                        this.mapMap = u;
                        if (a && q[1]) {
                            var x = q[1];
                            a.forEach(function (a) {
                                a = z(x, a);
                                u[a] && p.push(u[a]);
                            });
                        }
                        if (h.allAreas) {
                            a = a || [];
                            if (q[1]) {
                                var w = q[1];
                                a.forEach(function (a) {
                                    p.push(z(w, a));
                                });
                            }
                            p =
                                "|" +
                                p
                                    .map(function (a) {
                                        return a && a[q[0]];
                                    })
                                    .join("|") +
                                "|";
                            n.forEach(function (c) {
                                (q[0] && -1 !== p.indexOf("|" + c[q[0]] + "|")) || (a.push(y(c, { value: null })), (e = !1));
                            });
                        }
                    }
                    t.prototype.setData.call(this, a, b, d, e);
                    this.processData();
                    this.generatePoints();
                };
                d.prototype.setOptions = function (a) {
                    a = t.prototype.setOptions.call(this, a);
                    var c = a.joinBy;
                    null === c && (c = "_i");
                    c = this.joinBy = l(c);
                    c[1] || (c[1] = c[0]);
                    return a;
                };
                d.prototype.translate = function () {
                    var a = this.doFullTranslate(),
                        c = this.chart.mapView,
                        b = c && c.projection;
                    !this.chart.hasRendered || (!this.isDirtyData && this.hasRendered) || (this.processData(), this.generatePoints(), delete this.bounds, this.getProjectedBounds());
                    var d;
                    if (c) {
                        var e = c.getScale(),
                            g = c.projection.forward(c.center);
                        c = c.projection.hasCoordinates ? -1 : 1;
                        this.svgTransform = d = { scaleX: e, scaleY: e * c, translateX: this.chart.plotWidth / 2 - g[0] * e, translateY: this.chart.plotHeight / 2 - g[1] * e * c };
                    }
                    this.points.forEach(function (c) {
                        d && c.bounds && f(c.bounds.midX) && f(c.bounds.midY) && ((c.plotX = c.bounds.midX * d.scaleX + d.translateX), (c.plotY = c.bounds.midY * d.scaleY + d.translateY));
                        a && ((c.shapeType = "path"), (c.shapeArgs = { d: B.getProjectedPath(c, b) }));
                    });
                    q(this, "afterTranslate");
                };
                d.defaultOptions = y(r.defaultOptions, {
                    animation: !1,
                    dataLabels: {
                        crop: !1,
                        formatter: function () {
                            var a = this.series.chart.numberFormatter,
                                c = this.point.value;
                            return f(c) ? a(c, -1) : "";
                        },
                        inside: !0,
                        overflow: !1,
                        padding: 0,
                        verticalAlign: "middle",
                    },
                    marker: null,
                    nullColor: "#f7f7f7",
                    stickyTracking: !1,
                    tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>" },
                    turboThreshold: 0,
                    allAreas: !0,
                    borderColor: "#cccccc",
                    borderWidth: 1,
                    joinBy: "hc-key",
                    states: { hover: { halo: null, brightness: 0.2 }, normal: { animation: !0 }, select: { color: "#cccccc" }, inactive: { opacity: 1 } },
                });
                return d;
            })(r);
            D(d.prototype, {
                type: "map",
                axisTypes: p.SeriesMixin.axisTypes,
                colorAttribs: p.SeriesMixin.colorAttribs,
                colorKey: p.SeriesMixin.colorKey,
                directTouch: !0,
                drawDataLabels: b,
                drawGraph: b,
                drawLegendSymbol: w.drawRectangle,
                forceDL: !0,
                getCenter: A.getCenter,
                getExtremesFromAll: !0,
                getSymbol: p.SeriesMixin.getSymbol,
                isCartesian: !1,
                parallelArrays: p.SeriesMixin.parallelArrays,
                pointArrayMap: p.SeriesMixin.pointArrayMap,
                pointClass: B,
                preserveAspectRatio: !0,
                searchPoint: b,
                trackerGroups: p.SeriesMixin.trackerGroups,
                useMapGeometry: !0,
            });
            n.registerSeriesType("map", d);
            ("");
            return d;
        }
    );
    G(b, "Series/MapLine/MapLineSeries.js", [b["Series/Map/MapSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (k, n) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, d) {
                                    b.__proto__ = d;
                                }) ||
                            function (b, d) {
                                for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
                            };
                        return b(k, n);
                    };
                    return function (k, n) {
                        function h() {
                            this.constructor = k;
                        }
                        b(k, n);
                        k.prototype = null === n ? Object.create(n) : ((h.prototype = n.prototype), new h());
                    };
                })(),
            w = p.series,
            D = A.extend,
            B = A.merge;
        A = (function (k) {
            function p() {
                var b = (null !== k && k.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            v(p, k);
            p.prototype.pointAttribs = function (k, h) {
                k = b.prototype.pointAttribs.call(this, k, h);
                k.fill = this.options.fillColor;
                return k;
            };
            p.defaultOptions = B(b.defaultOptions, { lineWidth: 1, fillColor: "none" });
            return p;
        })(b);
        D(A.prototype, { type: "mapline", colorProp: "stroke", drawLegendSymbol: w.prototype.drawLegendSymbol, pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" } });
        p.registerSeriesType("mapline", A);
        ("");
        return A;
    });
    G(b, "Series/MapPoint/MapPointPoint.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (p, k) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, k) {
                                    b.__proto__ = k;
                                }) ||
                            function (b, k) {
                                for (var h in k) k.hasOwnProperty(h) && (b[h] = k[h]);
                            };
                        return b(p, k);
                    };
                    return function (p, k) {
                        function t() {
                            this.constructor = p;
                        }
                        b(p, k);
                        p.prototype = null === k ? Object.create(k) : ((t.prototype = k.prototype), new t());
                    };
                })(),
            E = p.isNumber,
            w = p.merge;
        return (function (b) {
            function p() {
                var k = (null !== b && b.apply(this, arguments)) || this;
                k.options = void 0;
                k.series = void 0;
                return k;
            }
            v(p, b);
            p.prototype.applyOptions = function (k, p) {
                k = "undefined" !== typeof k.lat && "undefined" !== typeof k.lon ? w(k, this.series.chart.fromLatLonToPoint(k)) : k;
                return b.prototype.applyOptions.call(this, k, p);
            };
            p.prototype.isValid = function () {
                return !!(this.options.geometry || (E(this.x) && E(this.y)));
            };
            return p;
        })(b.seriesTypes.scatter.prototype.pointClass);
    });
    G(b, "Series/MapPoint/MapPointSeries.js", [b["Core/Globals.js"], b["Series/MapPoint/MapPointPoint.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v =
            (this && this.__extends) ||
            (function () {
                var b = function (d, a) {
                    b =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (a, b) {
                                a.__proto__ = b;
                            }) ||
                        function (a, b) {
                            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                        };
                    return b(d, a);
                };
                return function (d, a) {
                    function e() {
                        this.constructor = d;
                    }
                    b(d, a);
                    d.prototype = null === a ? Object.create(a) : ((e.prototype = a.prototype), new e());
                };
            })();
        b = b.noop;
        var D = A.seriesTypes.scatter,
            B = E.extend,
            k = E.fireEvent,
            t = E.isNumber,
            n = E.merge;
        E = (function (b) {
            function d() {
                var a = (null !== b && b.apply(this, arguments)) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a;
            }
            v(d, b);
            d.prototype.drawDataLabels = function () {
                b.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect);
            };
            d.prototype.translate = function () {
                var a = this,
                    b = this.chart.mapView;
                this.processedXData || this.processData();
                this.generatePoints();
                if (b) {
                    var d = b.projection,
                        h = d.forward,
                        n = d.hasCoordinates;
                    this.points.forEach(function (d) {
                        var e = d.x;
                        e = void 0 === e ? void 0 : e;
                        var g = d.y;
                        g = void 0 === g ? void 0 : g;
                        var k = d.options.geometry;
                        (k = k && "Point" === k.type && k.coordinates) ? ((g = h(k)), (e = g[0]), (g = g[1])) : d.bounds && ((e = d.bounds.midX), (g = d.bounds.midY));
                        t(e) && t(g) ? ((e = b.projectedUnitsToPixels({ x: e, y: g })), (d.plotX = e.x), (d.plotY = n ? e.y : a.chart.plotHeight - e.y)) : ((d.plotX = void 0), (d.plotY = void 0));
                        d.isInside = a.isPointInside(d);
                        d.zone = a.zones.length ? d.getZone() : void 0;
                    });
                }
                k(this, "afterTranslate");
            };
            d.defaultOptions = n(D.defaultOptions, {
                dataLabels: {
                    crop: !1,
                    defer: !1,
                    enabled: !0,
                    formatter: function () {
                        return this.point.name;
                    },
                    overflow: !1,
                    style: { color: "#000000" },
                },
            });
            return d;
        })(D);
        B(E.prototype, { type: "mappoint", axisTypes: ["colorAxis"], forceDL: !0, isCartesian: !1, pointClass: p, searchPoint: b, useMapGeometry: !0 });
        A.registerSeriesType("mappoint", E);
        ("");
        return E;
    });
    G(b, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
        return {
            borderColor: void 0,
            borderWidth: 2,
            className: void 0,
            color: void 0,
            connectorClassName: void 0,
            connectorColor: void 0,
            connectorDistance: 60,
            connectorWidth: 1,
            enabled: !1,
            labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: "10px", color: "#000000" }, x: 0, y: 0 },
            maxSize: 60,
            minSize: 10,
            legendIndex: 0,
            ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 },
            sizeBy: "area",
            sizeByAbsoluteValue: !1,
            zIndex: 1,
            zThreshold: 0,
        };
    });
    G(b, "Series/Bubble/BubbleLegendItem.js", [b["Core/Color/Color.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v = b.parse,
            D = A.noop,
            B = E.arrayMax,
            k = E.arrayMin,
            t = E.isNumber,
            n = E.merge,
            h = E.pick,
            d = E.stableSort;
        ("");
        return (function () {
            function a(a, b) {
                this.options = this.symbols = this.visible = this.selected = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = D;
                this.init(a, b);
            }
            a.prototype.init = function (a, b) {
                this.options = a;
                this.visible = !0;
                this.chart = b.chart;
                this.legend = b;
            };
            a.prototype.addToLegend = function (a) {
                a.splice(this.options.legendIndex, 0, this);
            };
            a.prototype.drawLegendSymbol = function (a) {
                var b = this.chart,
                    e = this.options,
                    k = h(a.options.itemDistance, 20),
                    n = e.ranges,
                    q = e.connectorDistance;
                this.fontMetrics = b.renderer.fontMetrics(e.labels.style.fontSize);
                n && n.length && t(n[0].value)
                    ? (d(n, function (a, b) {
                          return b.value - a.value;
                      }),
                      (this.ranges = n),
                      this.setOptions(),
                      this.render(),
                      (a = this.getMaxLabelSize()),
                      (n = this.ranges[0].radius),
                      (b = 2 * n),
                      (q = q - n + a.width),
                      (q = 0 < q ? q : 0),
                      (this.maxLabel = a),
                      (this.movementX = "left" === e.labels.align ? q : 0),
                      (this.legendItemWidth = b + q + k),
                      (this.legendItemHeight = b + this.fontMetrics.h / 2))
                    : (a.options.bubbleLegend.autoRanges = !0);
            };
            a.prototype.setOptions = function () {
                var a = this.ranges,
                    b = this.options,
                    d = this.chart.series[b.seriesIndex],
                    k = this.legend.baseline,
                    r = { zIndex: b.zIndex, "stroke-width": b.borderWidth },
                    q = { zIndex: b.zIndex, "stroke-width": b.connectorWidth },
                    p = { align: this.legend.options.rtl || "left" === b.labels.align ? "right" : "left", zIndex: b.zIndex },
                    m = d.options.marker.fillOpacity,
                    f = this.chart.styledMode;
                a.forEach(function (e, c) {
                    f || ((r.stroke = h(e.borderColor, b.borderColor, d.color)), (r.fill = h(e.color, b.color, 1 !== m ? v(d.color).setOpacity(m).get("rgba") : d.color)), (q.stroke = h(e.connectorColor, b.connectorColor, d.color)));
                    a[c].radius = this.getRangeRadius(e.value);
                    a[c] = n(a[c], { center: a[0].radius - a[c].radius + k });
                    f || n(!0, a[c], { bubbleAttribs: n(r), connectorAttribs: n(q), labelAttribs: p });
                }, this);
            };
            a.prototype.getRangeRadius = function (a) {
                var b = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, b.ranges[b.ranges.length - 1].value, b.ranges[0].value, b.minSize, b.maxSize, a);
            };
            a.prototype.render = function () {
                var a = this.chart.renderer,
                    b = this.options.zThreshold;
                this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] });
                this.legendSymbol = a.g("bubble-legend");
                this.legendItem = a.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (a) {
                    a.value >= b && this.renderRange(a);
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels();
            };
            a.prototype.renderRange = function (a) {
                var b = this.options,
                    d = b.labels,
                    e = this.chart,
                    h = e.series[b.seriesIndex],
                    k = e.renderer,
                    n = this.symbols;
                e = n.labels;
                var m = a.center,
                    f = Math.abs(a.radius),
                    p = b.connectorDistance || 0,
                    c = d.align,
                    t = b.connectorWidth,
                    l = this.ranges[0].radius || 0,
                    v = m - f - b.borderWidth / 2 + t / 2,
                    w = this.fontMetrics;
                w = w.f / 2 - (w.h - w.f) / 2;
                var B = k.styledMode;
                p = this.legend.options.rtl || "left" === c ? -p : p;
                "center" === c && ((p = 0), (b.connectorDistance = 0), (a.labelAttribs.align = "center"));
                c = v + b.labels.y;
                var D = l + p + b.labels.x;
                n.bubbleItems.push(
                    k
                        .circle(l, m + ((v % 1 ? 1 : 0.5) - (t % 2 ? 0 : 0.5)), f)
                        .attr(B ? {} : a.bubbleAttribs)
                        .addClass((B ? "highcharts-color-" + h.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (b.className || ""))
                        .add(this.legendSymbol)
                );
                n.connectors.push(
                    k
                        .path(
                            k.crispLine(
                                [
                                    ["M", l, v],
                                    ["L", l + p, v],
                                ],
                                b.connectorWidth
                            )
                        )
                        .attr(B ? {} : a.connectorAttribs)
                        .addClass((B ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (b.connectorClassName || ""))
                        .add(this.legendSymbol)
                );
                a = k
                    .text(this.formatLabel(a), D, c + w)
                    .attr(B ? {} : a.labelAttribs)
                    .css(B ? {} : d.style)
                    .addClass("highcharts-bubble-legend-labels " + (b.labels.className || ""))
                    .add(this.legendSymbol);
                e.push(a);
                a.placed = !0;
                a.alignAttr = { x: D, y: c + w };
            };
            a.prototype.getMaxLabelSize = function () {
                var a, b;
                this.symbols.labels.forEach(function (d) {
                    b = d.getBBox(!0);
                    a = a ? (b.width > a.width ? b : a) : b;
                });
                return a || {};
            };
            a.prototype.formatLabel = function (a) {
                var b = this.options,
                    d = b.labels.formatter;
                b = b.labels.format;
                var e = this.chart.numberFormatter;
                return b ? p.format(b, a) : d ? d.call(a) : e(a.value, 1);
            };
            a.prototype.hideOverlappingLabels = function () {
                var a = this.chart,
                    b = this.symbols;
                !this.options.labels.allowOverlap &&
                    b &&
                    (a.hideOverlappingLabels(b.labels),
                    b.labels.forEach(function (a, d) {
                        a.newOpacity ? a.newOpacity !== a.oldOpacity && b.connectors[d].show() : b.connectors[d].hide();
                    }));
            };
            a.prototype.getRanges = function () {
                var a = this.legend.bubbleLegend,
                    b = a.options.ranges,
                    d,
                    p = Number.MAX_VALUE,
                    r = -Number.MAX_VALUE;
                a.chart.series.forEach(function (a) {
                    a.isBubble &&
                        !a.ignoreSeries &&
                        ((d = a.zData.filter(t)), d.length && ((p = h(a.options.zMin, Math.min(p, Math.max(k(d), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE)))), (r = h(a.options.zMax, Math.max(r, B(d))))));
                });
                var q = p === r ? [{ value: r }] : [{ value: p }, { value: (p + r) / 2 }, { value: r, autoRanges: !0 }];
                b.length && b[0].radius && q.reverse();
                q.forEach(function (a, d) {
                    b && b[d] && (q[d] = n(b[d], a));
                });
                return q;
            };
            a.prototype.predictBubbleSizes = function () {
                var a = this.chart,
                    b = this.fontMetrics,
                    d = a.legend.options,
                    h = d.floating,
                    k = (d = "horizontal" === d.layout) ? a.legend.lastLineHeight : 0,
                    n = a.plotSizeX,
                    p = a.plotSizeY,
                    m = a.series[this.options.seriesIndex],
                    f = m.getPxExtremes();
                a = Math.ceil(f.minPxSize);
                f = Math.ceil(f.maxPxSize);
                var t = Math.min(p, n);
                m = m.options.maxSize;
                if (h || !/%$/.test(m)) b = f;
                else if (((m = parseFloat(m)), (b = ((t + k - b.h / 2) * m) / 100 / (m / 100 + 1)), (d && p - b >= n) || (!d && n - b >= p))) b = f;
                return [a, Math.ceil(b)];
            };
            a.prototype.updateRanges = function (a, b) {
                var d = this.legend.options.bubbleLegend;
                d.minSize = a;
                d.maxSize = b;
                d.ranges = this.getRanges();
            };
            a.prototype.correctSizes = function () {
                var a = this.legend,
                    b = this.chart.series[this.options.seriesIndex].getPxExtremes();
                1 < Math.abs(Math.ceil(b.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, b.maxPxSize), a.render());
            };
            return a;
        })();
    });
    G(b, "Series/Bubble/BubbleLegendComposition.js", [b["Series/Bubble/BubbleLegendDefaults.js"], b["Series/Bubble/BubbleLegendItem.js"], b["Core/DefaultOptions.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        var v = A.setOptions,
            D = E.addEvent,
            B = E.objectEach,
            k = E.wrap,
            t;
        (function (n) {
            function h(b, e, g) {
                var h = this.legend,
                    f = 0 <= d(this);
                if (h && h.options.enabled && h.bubbleLegend && h.options.bubbleLegend.autoRanges && f) {
                    var k = h.bubbleLegend.options;
                    f = h.bubbleLegend.predictBubbleSizes();
                    h.bubbleLegend.updateRanges(f[0], f[1]);
                    k.placed ||
                        ((h.group.placed = !1),
                        h.allItems.forEach(function (a) {
                            a.legendGroup.translateY = null;
                        }));
                    h.render();
                    this.getMargins();
                    this.axes.forEach(function (a) {
                        a.visible && a.render();
                        k.placed ||
                            (a.setScale(),
                            a.updateNames(),
                            B(a.ticks, function (a) {
                                a.isNew = !0;
                                a.isNewLabel = !0;
                            }));
                    });
                    k.placed = !0;
                    this.getMargins();
                    b.call(this, e, g);
                    h.bubbleLegend.correctSizes();
                    t(h, a(h));
                } else b.call(this, e, g), h && h.options.enabled && h.bubbleLegend && (h.render(), t(h, a(h)));
            }
            function d(a) {
                a = a.series;
                for (var b = 0; b < a.length; ) {
                    if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length) return b;
                    b++;
                }
                return -1;
            }
            function a(a) {
                a = a.allItems;
                var b = [],
                    d = a.length,
                    e,
                    f = 0;
                for (e = 0; e < d; e++)
                    if ((a[e].legendItemHeight && (a[e].itemHeight = a[e].legendItemHeight), a[e] === a[d - 1] || (a[e + 1] && a[e]._legendItemPos[1] !== a[e + 1]._legendItemPos[1]))) {
                        b.push({ height: 0 });
                        var g = b[b.length - 1];
                        for (f; f <= e; f++) a[f].itemHeight > g.height && (g.height = a[f].itemHeight);
                        g.step = e;
                    }
                return b;
            }
            function e(a) {
                var b = this.bubbleLegend,
                    e = this.options,
                    g = e.bubbleLegend,
                    f = d(this.chart);
                b && b.ranges && b.ranges.length && (g.ranges.length && (g.autoRanges = !!g.ranges[0].autoRanges), this.destroyItem(b));
                0 <= f && e.enabled && g.enabled && ((g.seriesIndex = f), (this.bubbleLegend = new p(g, this)), this.bubbleLegend.addToLegend(a.allItems));
            }
            function g() {
                var a = this.chart,
                    b = this.visible,
                    e = this.chart.legend;
                e && e.bubbleLegend && ((this.visible = !b), (this.ignoreSeries = b), (a = 0 <= d(a)), e.bubbleLegend.visible !== a && (e.update({ bubbleLegend: { enabled: a } }), (e.bubbleLegend.visible = a)), (this.visible = b));
            }
            function t(a, b) {
                var d = a.options.rtl,
                    e,
                    f,
                    g,
                    c = 0;
                a.allItems.forEach(function (a, h) {
                    e = a.legendGroup.translateX;
                    f = a._legendItemPos[1];
                    if ((g = a.movementX) || (d && a.ranges)) (g = d ? e - a.options.maxSize / 2 : e + g), a.legendGroup.attr({ translateX: g });
                    h > b[c].step && c++;
                    a.legendGroup.attr({ translateY: Math.round(f + b[c].height / 2) });
                    a._legendItemPos[1] = f + b[c].height / 2;
                });
            }
            var w = [];
            n.compose = function (a, d, n) {
                -1 === w.indexOf(a) && (w.push(a), v({ legend: { bubbleLegend: b } }), k(a.prototype, "drawChartBox", h));
                -1 === w.indexOf(d) && (w.push(d), D(d, "afterGetAllItems", e));
                -1 === w.indexOf(n) && (w.push(n), D(n, "legendItemClick", g));
            };
        })(t || (t = {}));
        return t;
    });
    G(b, "Series/Bubble/BubblePoint.js", [b["Core/Series/Point.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p, A) {
        var v =
            (this && this.__extends) ||
            (function () {
                var b = function (p, v) {
                    b =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (b, p) {
                                b.__proto__ = p;
                            }) ||
                        function (b, p) {
                            for (var k in p) p.hasOwnProperty(k) && (b[k] = p[k]);
                        };
                    return b(p, v);
                };
                return function (p, v) {
                    function k() {
                        this.constructor = p;
                    }
                    b(p, v);
                    p.prototype = null === v ? Object.create(v) : ((k.prototype = v.prototype), new k());
                };
            })();
        A = A.extend;
        p = (function (p) {
            function w() {
                var b = (null !== p && p.apply(this, arguments)) || this;
                b.options = void 0;
                b.series = void 0;
                return b;
            }
            v(w, p);
            w.prototype.haloPath = function (p) {
                return b.prototype.haloPath.call(this, 0 === p ? 0 : (this.marker ? this.marker.radius || 0 : 0) + p);
            };
            return w;
        })(p.seriesTypes.scatter.prototype.pointClass);
        A(p.prototype, { ttBelow: !1 });
        return p;
    });
    G(
        b,
        "Series/Bubble/BubbleSeries.js",
        [
            b["Core/Axis/Axis.js"],
            b["Series/Bubble/BubbleLegendComposition.js"],
            b["Series/Bubble/BubblePoint.js"],
            b["Core/Color/Color.js"],
            b["Core/Globals.js"],
            b["Core/Series/Series.js"],
            b["Core/Series/SeriesRegistry.js"],
            b["Core/Utilities.js"],
        ],
        function (b, p, A, E, w, D, B, k) {
            var t =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, d) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, c) {
                                        a.__proto__ = c;
                                    }) ||
                                function (a, c) {
                                    for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                                };
                            return a(b, d);
                        };
                        return function (b, d) {
                            function e() {
                                this.constructor = b;
                            }
                            a(b, d);
                            b.prototype = null === d ? Object.create(d) : ((e.prototype = d.prototype), new e());
                        };
                    })(),
                n = E.parse;
            E = w.noop;
            var h = B.seriesTypes;
            w = h.column;
            var d = h.scatter;
            h = k.addEvent;
            var a = k.arrayMax,
                e = k.arrayMin,
                g = k.clamp,
                v = k.extend,
                C = k.isNumber,
                r = k.merge,
                q = k.pick;
            k = (function (b) {
                function h() {
                    var a = (null !== b && b.apply(this, arguments)) || this;
                    a.data = void 0;
                    a.maxPxSize = void 0;
                    a.minPxSize = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    a.radii = void 0;
                    a.yData = void 0;
                    a.zData = void 0;
                    return a;
                }
                t(h, b);
                h.prototype.animate = function (a) {
                    !a &&
                        this.points.length < this.options.animationLimit &&
                        this.points.forEach(function (a) {
                            var c = a.graphic;
                            c && c.width && (this.hasRendered || c.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), c.animate(this.markerAttribs(a), this.options.animation));
                        }, this);
                };
                h.prototype.getRadii = function () {
                    var a = this,
                        b = this.zData,
                        c = this.yData,
                        d = [],
                        e = this.chart.bubbleZExtremes;
                    var g = this.getPxExtremes();
                    var h = g.minPxSize,
                        k = g.maxPxSize;
                    if (!e) {
                        var m = Number.MAX_VALUE,
                            n = -Number.MAX_VALUE,
                            p;
                        this.chart.series.forEach(function (b) {
                            b.bubblePadding && (b.visible || !a.chart.options.chart.ignoreHiddenSeries) && (b = b.getZExtremes()) && ((m = Math.min(m || b.zMin, b.zMin)), (n = Math.max(n || b.zMax, b.zMax)), (p = !0));
                        });
                        p ? ((e = { zMin: m, zMax: n }), (this.chart.bubbleZExtremes = e)) : (e = { zMin: 0, zMax: 0 });
                    }
                    var q = 0;
                    for (g = b.length; q < g; q++) {
                        var r = b[q];
                        d.push(this.getRadius(e.zMin, e.zMax, h, k, r, c[q]));
                    }
                    this.radii = d;
                };
                h.prototype.getRadius = function (a, b, c, d, e, g) {
                    var f = this.options,
                        h = "width" !== f.sizeBy,
                        k = f.zThreshold,
                        l = b - a,
                        m = 0.5;
                    if (null === g || null === e) return null;
                    if (C(e)) {
                        f.sizeByAbsoluteValue && ((e = Math.abs(e - k)), (l = Math.max(b - k, Math.abs(a - k))), (a = 0));
                        if (e < a) return c / 2 - 1;
                        0 < l && (m = (e - a) / l);
                    }
                    h && 0 <= m && (m = Math.sqrt(m));
                    return Math.ceil(c + m * (d - c)) / 2;
                };
                h.prototype.hasData = function () {
                    return !!this.processedXData.length;
                };
                h.prototype.pointAttribs = function (a, b) {
                    var c = this.options.marker.fillOpacity;
                    a = D.prototype.pointAttribs.call(this, a, b);
                    1 !== c && (a.fill = n(a.fill).setOpacity(c).get("rgba"));
                    return a;
                };
                h.prototype.translate = function () {
                    b.prototype.translate.call(this);
                    this.getRadii();
                    this.translateBubble();
                };
                h.prototype.translateBubble = function () {
                    for (var a = this.data, b = this.radii, c = this.getPxExtremes().minPxSize, d = a.length; d--; ) {
                        var e = a[d],
                            g = b ? b[d] : 0;
                        C(g) && g >= c / 2 ? ((e.marker = v(e.marker, { radius: g, width: 2 * g, height: 2 * g })), (e.dlBox = { x: e.plotX - g, y: e.plotY - g, width: 2 * g, height: 2 * g })) : (e.shapeArgs = e.plotY = e.dlBox = void 0);
                    }
                };
                h.prototype.getPxExtremes = function () {
                    var a = Math.min(this.chart.plotWidth, this.chart.plotHeight),
                        b = function (b) {
                            if ("string" === typeof b) {
                                var c = /%$/.test(b);
                                b = parseInt(b, 10);
                            }
                            return c ? (a * b) / 100 : b;
                        },
                        c = b(q(this.options.minSize, 8));
                    b = Math.max(b(q(this.options.maxSize, "20%")), c);
                    return { minPxSize: c, maxPxSize: b };
                };
                h.prototype.getZExtremes = function () {
                    var b = this.options,
                        d = (this.zData || []).filter(C);
                    if (d.length) {
                        var c = q(b.zMin, g(e(d), !1 === b.displayNegative ? b.zThreshold || 0 : -Number.MAX_VALUE, Number.MAX_VALUE));
                        b = q(b.zMax, a(d));
                        if (C(c) && C(b)) return { zMin: c, zMax: b };
                    }
                };
                h.compose = p.compose;
                h.defaultOptions = r(d.defaultOptions, {
                    dataLabels: {
                        formatter: function () {
                            var a = this.series.chart.numberFormatter,
                                b = this.point.z;
                            return C(b) ? a(b, -1) : "";
                        },
                        inside: !0,
                        verticalAlign: "middle",
                    },
                    animationLimit: 250,
                    marker: { lineColor: null, lineWidth: 1, fillOpacity: 0.5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" },
                    minSize: 8,
                    maxSize: "20%",
                    softThreshold: !1,
                    states: { hover: { halo: { size: 5 } } },
                    tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
                    turboThreshold: 0,
                    zThreshold: 0,
                    zoneAxis: "z",
                });
                return h;
            })(d);
            v(k.prototype, {
                alignDataLabel: w.prototype.alignDataLabel,
                applyZones: E,
                bubblePadding: !0,
                buildKDTree: E,
                directTouch: !0,
                isBubble: !0,
                pointArrayMap: ["y", "z"],
                pointClass: A,
                parallelArrays: ["x", "y", "z"],
                trackerGroups: ["group", "dataLabelsGroup"],
                specialGroup: "group",
                zoneAxis: "z",
            });
            h(k, "updatedData", function (a) {
                delete a.target.chart.bubbleZExtremes;
            });
            b.prototype.beforePadding = function () {
                var a = this,
                    b = this.len,
                    d = this.chart,
                    e = 0,
                    c = b,
                    g = this.isXAxis,
                    h = g ? "xData" : "yData",
                    k = this.min,
                    n = this.max - k,
                    p = b / n,
                    r;
                this.series.forEach(function (b) {
                    if (b.bubblePadding && (b.visible || !d.options.chart.ignoreHiddenSeries)) {
                        r = a.allowZoomOutside = !0;
                        var f = b[h];
                        g && b.getRadii(0, 0, b);
                        if (0 < n)
                            for (var m = f.length; m--; )
                                if (C(f[m]) && a.dataMin <= f[m] && f[m] <= a.max) {
                                    var l = (b.radii && b.radii[m]) || 0;
                                    e = Math.min((f[m] - k) * p - l, e);
                                    c = Math.max((f[m] - k) * p + l, c);
                                }
                    }
                });
                r &&
                    0 < n &&
                    !this.logarithmic &&
                    ((c -= b),
                    (p *= (b + Math.max(0, e) - Math.min(c, b)) / b),
                    [
                        ["min", "userMin", e],
                        ["max", "userMax", c],
                    ].forEach(function (b) {
                        "undefined" === typeof q(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / p);
                    }));
            };
            B.registerSeriesType("bubble", k);
            ("");
            ("");
            return k;
        }
    );
    G(b, "Series/MapBubble/MapBubblePoint.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p) {
        var v =
            (this && this.__extends) ||
            (function () {
                var b = function (p, k) {
                    b =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (b, k) {
                                b.__proto__ = k;
                            }) ||
                        function (b, k) {
                            for (var h in k) k.hasOwnProperty(h) && (b[h] = k[h]);
                        };
                    return b(p, k);
                };
                return function (p, k) {
                    function t() {
                        this.constructor = p;
                    }
                    b(p, k);
                    p.prototype = null === k ? Object.create(k) : ((t.prototype = k.prototype), new t());
                };
            })();
        b = b.seriesTypes;
        var E = b.map,
            w = p.merge;
        return (function (b) {
            function p() {
                return (null !== b && b.apply(this, arguments)) || this;
            }
            v(p, b);
            p.prototype.applyOptions = function (k, p) {
                return k && "undefined" !== typeof k.lat && "undefined" !== typeof k.lon
                    ? b.prototype.applyOptions.call(this, w(k, this.series.chart.fromLatLonToPoint(k)), p)
                    : E.prototype.pointClass.prototype.applyOptions.call(this, k, p);
            };
            p.prototype.isValid = function () {
                return "number" === typeof this.z;
            };
            return p;
        })(b.bubble.prototype.pointClass);
    });
    G(b, "Series/MapBubble/MapBubbleSeries.js", [b["Series/Bubble/BubbleSeries.js"], b["Series/MapBubble/MapBubblePoint.js"], b["Series/Map/MapSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (
        b,
        p,
        A,
        E,
        w
    ) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (h, d) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                            };
                        return b(h, d);
                    };
                    return function (h, d) {
                        function a() {
                            this.constructor = h;
                        }
                        b(h, d);
                        h.prototype = null === d ? Object.create(d) : ((a.prototype = d.prototype), new a());
                    };
                })(),
            B = E.seriesTypes.mappoint,
            k = w.extend,
            t = w.merge;
        w = (function (k) {
            function h() {
                var b = (null !== k && k.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            v(h, k);
            h.prototype.translate = function () {
                B.prototype.translate.call(this);
                this.getRadii();
                this.translateBubble();
            };
            h.compose = b.compose;
            h.defaultOptions = t(b.defaultOptions, { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } });
            return h;
        })(b);
        k(w.prototype, {
            type: "mapbubble",
            axisTypes: ["colorAxis"],
            getProjectedBounds: A.prototype.getProjectedBounds,
            isCartesian: !1,
            pointArrayMap: ["z"],
            pointClass: p,
            setData: A.prototype.setData,
            setOptions: A.prototype.setOptions,
            useMapGeometry: !0,
            xyFromShape: !0,
        });
        E.registerSeriesType("mapbubble", w);
        ("");
        return w;
    });
    G(b, "Series/Heatmap/HeatmapPoint.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, p) {
        var v =
                (this && this.__extends) ||
                (function () {
                    var b = function (k, n) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, d) {
                                    b.__proto__ = d;
                                }) ||
                            function (b, d) {
                                for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
                            };
                        return b(k, n);
                    };
                    return function (k, n) {
                        function h() {
                            this.constructor = k;
                        }
                        b(k, n);
                        k.prototype = null === n ? Object.create(n) : ((h.prototype = n.prototype), new h());
                    };
                })(),
            E = p.clamp,
            w = p.defined,
            D = p.extend,
            B = p.pick;
        b = (function (b) {
            function k() {
                var k = (null !== b && b.apply(this, arguments)) || this;
                k.options = void 0;
                k.series = void 0;
                k.value = void 0;
                k.x = void 0;
                k.y = void 0;
                return k;
            }
            v(k, b);
            k.prototype.applyOptions = function (k, h) {
                k = b.prototype.applyOptions.call(this, k, h);
                k.formatPrefix = k.isNull || null === k.value ? "null" : "point";
                return k;
            };
            k.prototype.getCellAttributes = function () {
                var b = this.series,
                    h = b.options,
                    d = (h.colsize || 1) / 2,
                    a = (h.rowsize || 1) / 2,
                    e = b.xAxis,
                    g = b.yAxis,
                    k = this.options.marker || b.options.marker;
                b = b.pointPlacementToXValue();
                var p = B(this.pointPadding, h.pointPadding, 0),
                    r = {
                        x1: E(Math.round(e.len - (e.translate(this.x - d, !1, !0, !1, !0, -b) || 0)), -e.len, 2 * e.len),
                        x2: E(Math.round(e.len - (e.translate(this.x + d, !1, !0, !1, !0, -b) || 0)), -e.len, 2 * e.len),
                        y1: E(Math.round(g.translate(this.y - a, !1, !0, !1, !0) || 0), -g.len, 2 * g.len),
                        y2: E(Math.round(g.translate(this.y + a, !1, !0, !1, !0) || 0), -g.len, 2 * g.len),
                    };
                [
                    ["width", "x"],
                    ["height", "y"],
                ].forEach(function (a) {
                    var b = a[0];
                    a = a[1];
                    var d = a + "1",
                        e = a + "2",
                        g = Math.abs(r[d] - r[e]),
                        c = (k && k.lineWidth) || 0,
                        h = Math.abs(r[d] + r[e]) / 2;
                    b = k && k[b];
                    w(b) && b < g && ((b = b / 2 + c / 2), (r[d] = h - b), (r[e] = h + b));
                    p && ("y" === a && ((d = e), (e = a + "1")), (r[d] += p), (r[e] -= p));
                });
                return r;
            };
            k.prototype.haloPath = function (b) {
                if (!b) return [];
                var h = this.shapeArgs;
                return ["M", h.x - b, h.y - b, "L", h.x - b, h.y + h.height + b, h.x + h.width + b, h.y + h.height + b, h.x + h.width + b, h.y - b, "Z"];
            };
            k.prototype.isValid = function () {
                return Infinity !== this.value && -Infinity !== this.value;
            };
            return k;
        })(b.seriesTypes.scatter.prototype.pointClass);
        D(b.prototype, { dataLabelOnNull: !0, moveToTopOnHover: !0, ttBelow: !1 });
        return b;
    });
    G(
        b,
        "Series/Heatmap/HeatmapSeries.js",
        [b["Core/Color/Color.js"], b["Series/ColorMapMixin.js"], b["Series/Heatmap/HeatmapPoint.js"], b["Core/Legend/LegendSymbol.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]],
        function (b, p, A, E, w, D, B) {
            var k =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, d) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, b) {
                                        a.__proto__ = b;
                                    }) ||
                                function (a, b) {
                                    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                                };
                            return a(b, d);
                        };
                        return function (b, d) {
                            function e() {
                                this.constructor = b;
                            }
                            a(b, d);
                            b.prototype = null === d ? Object.create(d) : ((e.prototype = d.prototype), new e());
                        };
                    })(),
                t = w.series,
                n = w.seriesTypes,
                h = n.column,
                d = n.scatter,
                a = D.prototype.symbols,
                e = B.extend,
                g = B.fireEvent,
                v = B.isNumber,
                C = B.merge,
                r = B.pick;
            D = (function (h) {
                function n() {
                    var a = (null !== h && h.apply(this, arguments)) || this;
                    a.colorAxis = void 0;
                    a.data = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    a.valueMax = NaN;
                    a.valueMin = NaN;
                    return a;
                }
                k(n, h);
                n.prototype.drawPoints = function () {
                    var a = this;
                    if ((this.options.marker || {}).enabled || this._hasPointMarkers)
                        t.prototype.drawPoints.call(this),
                            this.points.forEach(function (b) {
                                b.graphic &&
                                    (b.graphic[a.chart.styledMode ? "css" : "animate"](a.colorAttribs(b)),
                                    a.options.borderRadius && b.graphic.attr({ r: a.options.borderRadius }),
                                    ((b.shapeArgs || {}).r = a.options.borderRadius),
                                    ((b.shapeArgs || {}).d = b.graphic.pathArray),
                                    null === b.value && b.graphic.addClass("highcharts-null-point"));
                            });
                };
                n.prototype.getExtremes = function () {
                    var a = t.prototype.getExtremes.call(this, this.valueData),
                        b = a.dataMin;
                    a = a.dataMax;
                    v(b) && (this.valueMin = b);
                    v(a) && (this.valueMax = a);
                    return t.prototype.getExtremes.call(this);
                };
                n.prototype.getValidPoints = function (a, b) {
                    return t.prototype.getValidPoints.call(this, a, b, !0);
                };
                n.prototype.hasData = function () {
                    return !!this.processedXData.length;
                };
                n.prototype.init = function () {
                    t.prototype.init.apply(this, arguments);
                    var b = this.options;
                    b.pointRange = r(b.pointRange, b.colsize || 1);
                    this.yAxis.axisPointRange = b.rowsize || 1;
                    a.ellipse = a.circle;
                };
                n.prototype.markerAttribs = function (a, b) {
                    var d = a.marker || {},
                        c = this.options.marker || {},
                        e = a.shapeArgs || {},
                        f = {};
                    if (a.hasImage) return { x: a.plotX, y: a.plotY };
                    if (b) {
                        var g = c.states[b] || {};
                        var h = (d.states && d.states[b]) || {};
                        [
                            ["width", "x"],
                            ["height", "y"],
                        ].forEach(function (a) {
                            f[a[0]] = (h[a[0]] || g[a[0]] || e[a[0]]) + (h[a[0] + "Plus"] || g[a[0] + "Plus"] || 0);
                            f[a[1]] = e[a[1]] + (e[a[0]] - f[a[0]]) / 2;
                        });
                    }
                    return b ? f : e;
                };
                n.prototype.pointAttribs = function (a, d) {
                    var e = t.prototype.pointAttribs.call(this, a, d),
                        c = this.options || {},
                        f = this.chart.options.plotOptions || {},
                        g = f.series || {},
                        h = f.heatmap || {};
                    f = (a && a.options.borderColor) || c.borderColor || h.borderColor || g.borderColor;
                    g = (a && a.options.borderWidth) || c.borderWidth || h.borderWidth || g.borderWidth || e["stroke-width"];
                    e.stroke = (a && a.marker && a.marker.lineColor) || (c.marker && c.marker.lineColor) || f || this.color;
                    e["stroke-width"] = g;
                    d &&
                        ((a = C(c.states[d], c.marker && c.marker.states[d], (a && a.options.states && a.options.states[d]) || {})),
                        (d = a.brightness),
                        (e.fill =
                            a.color ||
                            b
                                .parse(e.fill)
                                .brighten(d || 0)
                                .get()),
                        (e.stroke = a.lineColor));
                    return e;
                };
                n.prototype.setClip = function (a) {
                    var b = this.chart;
                    t.prototype.setClip.apply(this, arguments);
                    (!1 !== this.options.clip || a) && this.markerGroup.clip((a || this.clipBox) && this.sharedClipKey ? b.sharedClips[this.sharedClipKey] : b.clipRect);
                };
                n.prototype.translate = function () {
                    var b = this.options,
                        d = (b.marker && b.marker.symbol) || "rect",
                        h = a[d] ? d : "rect",
                        c = -1 !== ["circle", "square"].indexOf(h);
                    this.generatePoints();
                    this.points.forEach(function (b) {
                        var f = b.getCellAttributes(),
                            g = {};
                        g.x = Math.min(f.x1, f.x2);
                        g.y = Math.min(f.y1, f.y2);
                        g.width = Math.max(Math.abs(f.x2 - f.x1), 0);
                        g.height = Math.max(Math.abs(f.y2 - f.y1), 0);
                        var k = (b.hasImage = 0 === ((b.marker && b.marker.symbol) || d || "").indexOf("url"));
                        if (c) {
                            var m = Math.abs(g.width - g.height);
                            g.x = Math.min(f.x1, f.x2) + (g.width < g.height ? 0 : m / 2);
                            g.y = Math.min(f.y1, f.y2) + (g.width < g.height ? m / 2 : 0);
                            g.width = g.height = Math.min(g.width, g.height);
                        }
                        m = { plotX: (f.x1 + f.x2) / 2, plotY: (f.y1 + f.y2) / 2, clientX: (f.x1 + f.x2) / 2, shapeType: "path", shapeArgs: C(!0, g, { d: a[h](g.x, g.y, g.width, g.height) }) };
                        k && (b.marker = { width: g.width, height: g.height });
                        e(b, m);
                    });
                    g(this, "afterTranslate");
                };
                n.defaultOptions = C(d.defaultOptions, {
                    animation: !1,
                    borderRadius: 0,
                    borderWidth: 0,
                    nullColor: "#f7f7f7",
                    dataLabels: {
                        formatter: function () {
                            var a = this.series.chart.numberFormatter,
                                b = this.point.value;
                            return v(b) ? a(b, -1) : "";
                        },
                        inside: !0,
                        verticalAlign: "middle",
                        crop: !1,
                        overflow: !1,
                        padding: 0,
                    },
                    marker: { symbol: "rect", radius: 0, lineColor: void 0, states: { hover: { lineWidthPlus: 0 }, select: {} } },
                    clip: !0,
                    pointRange: null,
                    tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" },
                    states: { hover: { halo: !1, brightness: 0.2 } },
                });
                return n;
            })(d);
            e(D.prototype, {
                alignDataLabel: h.prototype.alignDataLabel,
                axisTypes: p.SeriesMixin.axisTypes,
                colorAttribs: p.SeriesMixin.colorAttribs,
                colorKey: p.SeriesMixin.colorKey,
                directTouch: !0,
                drawLegendSymbol: E.drawRectangle,
                getExtremesFromAll: !0,
                getSymbol: t.prototype.getSymbol,
                parallelArrays: p.SeriesMixin.parallelArrays,
                pointArrayMap: ["y", "value"],
                pointClass: A,
                trackerGroups: p.SeriesMixin.trackerGroups,
            });
            w.registerSeriesType("heatmap", D);
            ("");
            ("");
            return D;
        }
    );
    G(b, "Extensions/GeoJSON.js", [b["Core/Chart/Chart.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, p, A, E) {
        function v(b, d) {
            var a,
                e = !1,
                g = b.x,
                h = b.y;
            b = 0;
            for (a = d.length - 1; b < d.length; a = b++) {
                var k = d[b][1] > h;
                var n = d[a][1] > h;
                k !== n && g < ((d[a][0] - d[b][0]) * (h - d[b][1])) / (d[a][1] - d[b][1]) + d[b][0] && (e = !e);
            }
            return e;
        }
        var D = p.format,
            B = A.win,
            k = E.error,
            t = E.extend,
            n = E.merge;
        p = E.wrap;
        ("");
        b.prototype.transformFromLatLon = function (b, d) {
            var a = this.options.chart.proj4 || B.proj4;
            if (!a) return k(21, !1, this), { x: 0, y: null };
            var e = d.jsonmarginX;
            e = void 0 === e ? 0 : e;
            var g = d.jsonmarginY;
            g = void 0 === g ? 0 : g;
            var h = d.jsonres;
            h = void 0 === h ? 1 : h;
            var n = d.scale;
            n = void 0 === n ? 1 : n;
            var p = d.xoffset;
            p = void 0 === p ? 0 : p;
            var q = d.xpan;
            q = void 0 === q ? 0 : q;
            var t = d.yoffset;
            t = void 0 === t ? 0 : t;
            var m = d.ypan;
            m = void 0 === m ? 0 : m;
            b = a(d.crs, [b.lon, b.lat]);
            a = d.cosAngle || (d.rotation && Math.cos(d.rotation));
            var f = d.sinAngle || (d.rotation && Math.sin(d.rotation));
            d = d.rotation ? [b[0] * a + b[1] * f, -b[0] * f + b[1] * a] : b;
            return { x: ((d[0] - p) * n + q) * h + e, y: -(((t - d[1]) * n + m) * h - g) };
        };
        b.prototype.transformToLatLon = function (b, d) {
            if (!this.options.chart.proj4 && !B.proj4) k(21, !1, this);
            else if (null !== b.y) {
                var a = d.jsonmarginX,
                    e = d.jsonmarginY,
                    g = d.jsonres;
                g = void 0 === g ? 1 : g;
                var h = d.scale;
                h = void 0 === h ? 1 : h;
                var n = d.xoffset,
                    p = d.xpan,
                    q = d.yoffset,
                    t = d.ypan;
                b = { x: ((b.x - (void 0 === a ? 0 : a)) / g - (void 0 === p ? 0 : p)) / h + (void 0 === n ? 0 : n), y: ((b.y - (void 0 === e ? 0 : e)) / g + (void 0 === t ? 0 : t)) / h + (void 0 === q ? 0 : q) };
                a = d.cosAngle || (d.rotation && Math.cos(d.rotation));
                e = d.sinAngle || (d.rotation && Math.sin(d.rotation));
                d = B.proj4(d.crs, "WGS84", d.rotation ? { x: b.x * a + b.y * -e, y: b.x * e + b.y * a } : b);
                return { lat: d.y, lon: d.x };
            }
        };
        b.prototype.fromPointToLatLon = function (b) {
            var d = this.mapTransforms;
            if (d) {
                for (var a in d) if (Object.hasOwnProperty.call(d, a) && d[a].hitZone && v(b, d[a].hitZone.coordinates[0])) return this.transformToLatLon(b, d[a]);
                return this.transformToLatLon(b, d["default"]);
            }
            k(22, !1, this);
        };
        b.prototype.fromLatLonToPoint = function (b) {
            var d = this.mapTransforms,
                a;
            if (!d) return k(22, !1, this), { x: 0, y: null };
            for (a in d)
                if (Object.hasOwnProperty.call(d, a) && d[a].hitZone) {
                    var e = this.transformFromLatLon(b, d[a]);
                    if (v(e, d[a].hitZone.coordinates[0])) return e;
                }
            return this.transformFromLatLon(b, d["default"]);
        };
        A.geojson = function (b, d, a) {
            void 0 === d && (d = "map");
            var e = [];
            b.features.forEach(function (a) {
                var b = a.geometry || {},
                    g = b.type;
                b = b.coordinates;
                a = a.properties;
                var h;
                ("map" !== d && "mapbubble" !== d) || ("Polygon" !== g && "MultiPolygon" !== g)
                    ? "mapline" !== d || ("LineString" !== g && "MultiLineString" !== g)
                        ? "mappoint" === d && "Point" === g && b.length && (h = { geometry: { coordinates: b, type: g } })
                        : b.length && (h = { geometry: { coordinates: b, type: g } })
                    : b.length && (h = { geometry: { coordinates: b, type: g } });
                h && e.push(t(h, { name: a.name || a.NAME, properties: a }));
            });
            a && b.copyrightShort && ((a.chart.mapCredits = D(a.chart.options.credits.mapText, { geojson: b })), (a.chart.mapCreditsFull = D(a.chart.options.credits.mapTextFull, { geojson: b })));
            return e;
        };
        p(b.prototype, "addCredits", function (b, d) {
            d = n(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            b.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull });
        });
    });
    G(b, "masters/modules/map.src.js", [b["Core/Globals.js"], b["Core/Axis/Color/ColorAxis.js"], b["Series/MapBubble/MapBubbleSeries.js"], b["Core/Chart/MapChart.js"]], function (b, p, A, E) {
        b.ColorAxis = p;
        b.MapChart = E;
        b.mapChart = b.Map = E.mapChart;
        b.maps = E.maps;
        p.compose(b.Chart, b.Fx, b.Legend, b.Series);
        A.compose(b.Chart, b.Legend, b.Series);
    });
    G(b, "masters/highmaps.src.js", [b["masters/highcharts.src.js"]], function (b) {
        b.product = "Highmaps";
        return b;
    });
    b["masters/highmaps.src.js"]._modules = b;
    return b["masters/highmaps.src.js"];
});
//# sourceMappingURL=highmaps.js.map

/*! Sidr - v1.2.1 - 2013-11-06
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function (e) {
    var t = !1,
        n = !1,
        i = {
            isUrl: function (e) {
                var t = RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
                return t.test(e) ? !0 : !1
            },
            loadContent: function (e, t) {
                e.html(t)
            },
            addPrefix: function (e) {
                var t = e.attr("id"),
                    n = e.attr("class");
                "string" == typeof t && "" !== t && e.attr("id", t.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")), "string" == typeof n && "" !== n && "sidr-inner" !== n && e.attr("class", n.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")), e.removeAttr("style")
            },
            execute: function (i, o, a) {
                "function" == typeof o ? (a = o, o = "sidr") : o || (o = "sidr");
                var s, l, u, c = e("#" + o),
                    f = e(c.data("body")),
                    d = e("html"),
                    p = c.outerWidth(!0),
                    h = c.data("speed"),
                    x = "sidr" === o ? "sidr-open" : "sidr-open " + o + "-open";
                if ("open" === i || "toogle" === i && !c.is(":visible")) {
                    if (c.is(":visible") || t) return;
                    if (n !== !1) return r.close(n, function () {
                        r.open(o)
                    }), void 0;
                    t = !0, "left" === g ? (s = {
                        left: p + "px"
                    }, l = {
                        left: "0px"
                    }) : (s = {
                        right: p + "px"
                    }, l = {
                        right: "0px"
                    }), u = d.scrollTop(), d.css("overflow-x", "hidden").addClass(x).scrollTop(u), f.css({
                        width: f.width(),
                        position: "absolute"
                    }).animate(s, h, function () {
                        e(this).addClass(x);
                    }), c.css("display", "block").animate(l, h, function () {
                        t = !1, n = o, "function" == typeof a && a(o)
                    })
                } else {
                    if (!c.is(":visible") || t) return;
                    t = !0, "left" === g ? (s = {
                        left: 0
                    }, l = {
                        left: "-" + p + "px"
                    }) : (s = {
                        right: 0
                    }, l = {
                        right: "-" + p + "px"
                    }), u = d.scrollTop(), d.removeAttr("style").removeClass(x).scrollTop(u), f.animate(s, h, function () {
                        e(this).removeClass(x);
                    }), c.animate(l, h, function () {
                        c.removeAttr("style"), f.removeAttr("style"), e("html").removeAttr("style"), t = !1, n = !1, "function" == typeof a && a(o)
                    })
                }
            }
        },
        r = {
            open: function (e, t) {
                i.execute("open", e, t)
            },
            close: function (e, t) {
                i.execute("close", e, t)
            },
            toogle: function (e, t) {
                i.execute("toogle", e, t)
            }
        };
    e.sidr = function (t) {
        return r[t] ? r[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof t && "string" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sidr"), void 0) : r.toogle.apply(this, arguments)
    },

    e.fn.sidr = function (t) {
        var n = e.extend({
                name: "sidr",
                speed: 200,
                side: "left",
                source: null,
                renaming: !0,
                body: "body"
            }, t),
            o = n.name,
            a = e("#" + o);

        if (0 === a.length && (a = e("<div />").attr("id", o).appendTo(e("body"))), a.addClass("sidr").addClass(n.side).data({

            speed: n.speed,
            side: n.side,
            body: n.body

        }), "function" == typeof n.source) {
            var s = n.source(o);
            i.loadContent(a, s)
        } else if ("string" == typeof n.source && i.isUrl(n.source)) e.get(n.source, function (e) {
            i.loadContent(a, e)
        });
        else if ("string" == typeof n.source) {
            var l = "",
                u = n.source.split(",");
            if (e.each(u, function (t, n) {
                l += '<div class="sidr-inner">' + e(n).html() + "</div>"
            }), n.renaming) {
                var c = e("<div />").html(l);
                c.find("*").each(function (t, n) {
                    var r = e(n);
                    i.addPrefix(r)
                }), l = c.html()
            }
            i.loadContent(a, l)
        } else null !== n.source && e.error("Invalid Sidr Source");
        return this.each(function () {
            var t = e(this),
                n = t.data("sidr");
            n || (t.data("sidr", o), t.click(function (e) {
                e.preventDefault(), r.toogle(o)
            }))
        })
    }
})(jQuery);

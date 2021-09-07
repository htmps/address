(function(n) {
    function h(n, t) {
        var u, f, r;
        if ($province = $("select[data-address-type='province'][data-address-zone='" + n + "']"), $province) {
            for (u = ['<option value="" hidden> Tỉnh thành<\/option>'], f = 0; f < i.length; f++) {
                if (r = i[f], r.id == t) {
                    u.push("<option value='" + r.id + "' selected>" + r.name + "<\/option>");
                    continue
                }
                u.push("<option value='" + r.id + "'>" + r.name + "<\/option>")
            }
            $province.html(u.join(""))
        }
    }

    function s(n, t, i) {
        var r = $("select[data-address-type='district'][data-address-zone='" + n + "']"),
            s, e, o, u;
        if (r) {
            if (!t) {
                r.val("");
                r.attr("disabled", "disabled");
                r.html("");
                return
            }
            for (s = f.filter(function(n) {
                    return n.province_id == t
                }), e = ['<option value="" hidden> Quận/Huyện<\/option>'], o = 0; o < s.length; o++) {
                if (u = s[o], u.id == i) {
                    e.push("<option value='" + u.id + "' selected>" + u.name + "<\/option>");
                    continue
                }
                e.push("<option value='" + u.id + "'>" + u.name + "<\/option>")
            }
            r.removeAttr("disabled");
            r.html(e.join(""))
        }
    }

    function r(n, t, i) {
        var r = $("select[data-address-type='ward'][data-address-zone='" + n + "']"),
            f, s, o, u;
        if (r) {
            if (!t) {
                r.val("");
                r.attr("disabled", "disabled");
                r.html("");
                return
            }
            for (f = ['<option value="" hidden> Phường/Xã<\/option>'], s = e.filter(function(n) {
                    return n.district_id == t
                }), o = 0; o < s.length; o++) {
                if (u = s[o], u.id == i) {
                    f.push("<option value='" + u.id + "' selected>" + u.name + "<\/option>");
                    continue
                }
                f.push("<option value='" + u.id + "'>" + u.name + "<\/option>")
            }
            r.removeAttr("disabled");
            r.html(f.join(""))
        }
    }

    function c() {
        return o ? {
            then: function(n) {
                return n()
            }
        } : fetch("https://cdn.jsdelivr.net/gh/htmps/address/addresses.json").then(function(n) {
            return n.json()
        }).then(function(n) {
            i = n.provinces;
            f = n.districts.filter(function(n) {
                return n.id != 69
            });
            e = n.wards;
            o = !0
        })
    }

    function u() {}

    function t(n, t) {
        $('select[data-address-type="' + t + '"][data-address-zone="' + n + '"]').trigger("address:change")
    }
    var i = [],
        f = [],
        e = [],
        o = !1;
    u.prototype.bind = function() {
        $("body").on("change", "select[data-address-type]", function(n) {
            var u = n.target.getAttribute("data-address-type"),
                i = n.target.getAttribute("data-address-zone");
            u === "province" ? (t(i, "province"), s(i, n.target.value, undefined), t(i, "district"), r(i, "", undefined), t(i, "ward")) : u === "district" && (t(i, "district"), r(i, n.target.value, undefined), t(i, "ward"))
        });
        return this
    };
    u.prototype.refresh = function(n) {
        var i = {},
            u;
        ($("[data-address-zone]").each(function() {
            var n = $(this),
                r = n.data("address-type"),
                t, u;
            r && (t = n.data("address-zone"), u = i[t] || (i[t] = {}), u[r] = n.val() || n.attr("value"))
        }), u = Object.keys(i), u.length != 0) && c().then(function() {
            u.forEach(function(n) {
                var u = i[n];
                h(n, u.province);
                t(n, "province");
                s(n, u.province, u.district);
                t(n, "district");
                r(n, u.district, u.ward);
                t(n, "ward")
            });
            n && n()
        })
    };
    n.Address = new u;
})(window);
$(function() {
    Address.bind().refresh();
});

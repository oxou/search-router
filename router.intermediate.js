function a(a, b) {
    window.location.href = a.replace("{0}", d(c(b)));
}

var r = {
    twitter:       q => a("https://twitter.com/search?q={0}&src=typed_query", q),
    ebay:          q => a("https://www.ebay.com/sch/i.html?_nkw={0}", q),
    amazon:        q => a("https://www.amazon.com/s?k={0}", q),
    google:        q => a("https://www.google.com/search?q={0}&hl=en", q),
    duckduckgo:    q => a("https://duckduckgo.com/?q={0}&ia=web", q),
    bing:          q => a("https://www.bing.com/search?q={0}", q),
    wikipedia:     q => a("https://www.wikipedia.org/search-redirect.php?family=Wikipedia&language=en&search={0}", q),
    facebook:      q => a("https://www.facebook.com/search/top/?q={0}", q),
    stackoverflow: q => a("https://stackoverflow.com/search?q={0}", q),
    youtube:       q => a("https://www.youtube.com/results?search_query={0}", q),
    yandex:        q => a("https://yandex.com/search/?text={0}", q),
    php:           q => a("https://www.php.net/manual-lookup.php?pattern={0}&scope=quickref", q),
    thepiratebay:  q => a("https://thepiratebay.org/search.php?q={0}&all=on&search=Pirate+Search&page=0&orderby=", q)
};

Object.assign(r, {
    tw:       r.twitter,
    amz:      r.amazon,
    ggl:      r.google,
    ddg:      r.duckduckgo,
    wiki:     r.wikipedia,
    fb:       r.facebook,
    so:       r.stackoverflow,
    yt:       r.youtube,
    ydx:      r.yandex,
    tpb:      r.thepiratebay,
    _default: r.google
});

var c = decodeURIComponent;
var d = encodeURIComponent;

function b() {
    var y = window.location.search;

    if (y == '')
        return {};

    var arr = y.split('&').map(part => {
        if (part[0] === '?')
            part = part.substring(1);

        if (part.includes('='))
            part = part.split('=', 2)

        return part;
    });

    var obj = {};

    for (let i = 0, j = arr.length; i < j; i++) {
        var name = arr[i][0];
        var data = arr[i][1];
        obj[name] = c(data);
    }

    return obj;
}

var u = b();
var x = u.q !== undefined;

if (x) {
    var y = u.q.replace(/\+/g, ' ').trim();
    var u = null;

    if (y[0] === '\\') {
        r["_default"](y.substring(1));
        throw 'x';
    }

    var i = y.split(' ', 1).join('');
    u = y.substring(i.length + 1);

    if (typeof r[i] === "function")
        r[i](u);
    else
        r["_default"](y);
} else {
    a("help.htm");
}

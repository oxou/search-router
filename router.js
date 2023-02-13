
/*
 * Copyright (C) 2023 Nurudin Imsirovic <github.com/oxou>
 *
 * Search Router,
 * Routes searches from a single page to different websites based on keywords.
 *
 * Created: 2023-02-12 03:38 PM
 * Updated: 2023-02-13 04:42 AM
 */

function routeTo(url, query) {
    window.location.href = url.replace("{0}", el(dl(query)));
}

var routes = {
    twitter:       q => routeTo("https://twitter.com/search?q={0}&src=typed_query", q),
    ebay:          q => routeTo("https://www.ebay.com/sch/i.html?_nkw={0}", q),
    amazon:        q => routeTo("https://www.amazon.com/s?k={0}", q),
    google:        q => routeTo("https://www.google.com/search?q={0}&hl=en", q),
    duckduckgo:    q => routeTo("https://duckduckgo.com/?q={0}&ia=web", q),
    bing:          q => routeTo("https://www.bing.com/search?q={0}", q),
    wikipedia:     q => routeTo("https://www.wikipedia.org/search-redirect.php?family=Wikipedia&language=en&search={0}", q),
    facebook:      q => routeTo("https://www.facebook.com/search/top/?q={0}", q),
    stackoverflow: q => routeTo("https://stackoverflow.com/search?q={0}", q),
    youtube:       q => routeTo("https://www.youtube.com/results?search_query={0}", q),
    yandex:        q => routeTo("https://yandex.com/search/?text={0}", q),
    php:           q => routeTo("https://www.php.net/manual-lookup.php?pattern={0}&scope=quickref", q)
};

// Aliases can be instantiated only after their parents
Object.assign(routes, {
    tw:       routes.twitter,
    amz:      routes.amazon,
    ggl:      routes.google,
    ddg:      routes.duckduckgo,
    wiki:     routes.wikipedia,
    fb:       routes.facebook,
    so:       routes.stackoverflow,
    yt:       routes.youtube,
    ydx:      routes.yandex,
    _default: routes.google // must always be defined last
});

var dl = decodeURIComponent;
var el = encodeURIComponent;

function getUrlParams() {
    var query = window.location.search;

    if (query == '')
        return {};

    var arr = query.split('&').map(part => {
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
        obj[name] = dl(data);
    }

    return obj;
}

var urlParams = getUrlParams();
var doSearch = urlParams.q !== undefined;

if (doSearch) {
    var query = urlParams.q.replace(/\+/g, ' ').trim();
    var queryTrunc = null;

    if (query[0] === '\\') {
        routes["_default"](query.substring(1));
        throw 'x';
    }

    var route = query.split(' ', 1).join('');
    queryTrunc = query.substring(route.length + 1);

    /* Check that the router exists */
    if (typeof routes[route] === "function")
        routes[route](queryTrunc);
    else
        routes["_default"](query);
} else {
    routeTo("help.htm");
}

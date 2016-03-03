const cheerio = require('cheerio');
const url = require('url');

function hrefIsIcon(href) {
    return /((icon.*\.(png|jpg))|(\w+\.ico))/.test(href);
}

function getDomainUrl(someUrl) {
    const parsedUrl = url.parse(someUrl);
    parsedUrl.pathname = null;
    return parsedUrl.format()
}

function linkTagLinks($, rootUrl) {
    const links = [];
    $('link').each(function(index, element) {
        const href = $(element).attr('href');
        const resolved = url.resolve(rootUrl, href);
        if (!hrefIsIcon(resolved)) {
            return;
        }
        links.push(resolved);
    });
    return links;
}

function metaTagLinks($, rootUrl) {
    const links = [];
    $('meta').each((index, element) => {
        const property = $(element).attr('property');
        if (property !== 'og:image') {
            return;
        }

        const graphImageUrl = $(element).attr('content');
        const resolved = url.resolve(rootUrl, graphImageUrl);
        links.push(resolved);
    });

    return links
}

function getIconLinks(rootUrl, dom) {
    var $ = cheerio.load(dom);
    let iconLinks = [];

    iconLinks = iconLinks.concat(linkTagLinks($, rootUrl));
    iconLinks = iconLinks.concat(metaTagLinks($, rootUrl));

    iconLinks.push(url.resolve(getDomainUrl(rootUrl), 'apple-touch-icon.png'));
    return iconLinks;
}

module.exports = getIconLinks;

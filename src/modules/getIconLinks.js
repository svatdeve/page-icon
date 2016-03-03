const cheerio = require('cheerio');
const url = require('url');

function hrefIsIcon(href) {
    return /((icon.*\.(png|jpg))|(\w+\.ico))$/.test(href);
}

function getDomainUrl(someUrl) {
    const parsedUrl = url.parse(someUrl);
    parsedUrl.pathname = null;
    return parsedUrl.format()
}

function getIconLinks(rootUrl, dom) {
    var $ = cheerio.load(dom);
    const icons = [];
    $('link').each(function(index, element) {
        const href = $(element).attr('href');
        const resolved = url.resolve(rootUrl, href);
        if (!hrefIsIcon(resolved)) {
            return;
        }
        icons.push(resolved);
    });

    icons.push(url.resolve(getDomainUrl(rootUrl), 'apple-touch-icon.png'));

    return icons;
}

module.exports = getIconLinks;

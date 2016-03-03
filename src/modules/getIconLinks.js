const cheerio = require('cheerio');
const url = require('url');

function hrefIsIcon(href) {
    return /((icon.*\.(png|jpg))|(\w+\.ico))$/.test(href);
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
    return icons;
}

module.exports = getIconLinks;

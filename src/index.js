import 'source-map-support/register';

// for promise problems with node v0.12
require('babel-polyfill');

const url = require('url');
const getPage = require('./modules/getPage');
const getIconLinks = require('./modules/getIconLinks');
const downloadIcons = require('./modules/download/downloadIcons');
const findBestIcon = require('./modules/findBestIcon');

function isHttps(pageUrl) {
    return url.parse(pageUrl).protocol === 'https:';
}

function makeHttps(pageUrl) {
    const parsed = url.parse(pageUrl);
    parsed.protocol = 'https:';
    return url.format(parsed);
}

function main(pageUrl, options={}) {

    const bestWithPref = function(icons) {
          return findBestIcon(icons, options.ext);
    };

    return getPage(pageUrl)
        .then(function (dom) {
            return getIconLinks(pageUrl, dom);
        })
        .then(downloadIcons)
        .then(bestWithPref)
        .then(result => {
            if (result || isHttps(pageUrl)) {
                return result;
            }

            const httpsUrl = makeHttps(pageUrl);
            return main(httpsUrl, options);
        });
}

module.exports = main;

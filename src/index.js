import 'source-map-support/register';

// for promise problems with node v0.12
require('babel-polyfill');

const getPage = require('./modules/getPage');
const getIconLinks = require('./modules/getIconLinks');
const downloadIcons = require('./modules/download/downloadIcons');
const findBestIcon = require('./modules/findBestIcon');

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
}

module.exports = main;

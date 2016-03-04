import 'source-map-support/register';

const getPage = require('./modules/getPage');
const getIconLinks = require('./modules/getIconLinks');
const downloadIcons = require('./modules/download/downloadIcons');
const findBestIcon = require('./modules/findBestIcon');

function main(pageUrl) {
    return getPage(pageUrl)
        .then(function (dom) {
            return getIconLinks(pageUrl, dom);
        })
        .then(downloadIcons)
        .then(findBestIcon)
}

module.exports = main;

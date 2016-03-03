const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');
const path = require('path');

function getPage(pageUrl) {
    return new Promise(function(resolve, reject) {
        axios.get(pageUrl)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (response) {
                reject(response);
            });
    });
}

function getIconLinks(rootUrl, dom) {
    var $ = cheerio.load(dom);
    const icons = [];
    $('link').each(function(i, elem) {
        const href = $(this).attr('href');
        const resolved = url.resolve(rootUrl, href);
        if (!hrefIsIcon(resolved)) {
            return;
        }
        icons.push(resolved);
    });

    console.log(icons);
    return icons;
}

function hrefIsIcon(href) {
    return /\w\.(png|jpg|ico)/.test(href);
}

function saveToFile(data) {
    return new Promise(function(resolve, reject) {
        const saveDir = path.join(__dirname, 'someicon.ico');
        fs.writeFile(saveDir, data, function (error) {
            if (error) {
                reject(error);
                return;
            }
            resolve(saveDir);
        });
    });
}

function downloadIcon(iconUrl) {

    const iconData = new Promise(function (resolve, reject) {
        axios.get(iconUrl, {responseType: 'arraybuffer'})
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error);
            })

    });

    return iconData.then(saveToFile);
}

function downloadIcons(iconUrls) {
    const promises = iconUrls.map(downloadIcon);
    return Promise.all(promises);
}


function findBestIcon(iconPaths) {
    return new Promise(function (resolve, reject) {
        resolve(iconPaths[0]);
    });
}

function main(pageUrl) {
    return getPage(pageUrl)
        .then(function (dom) {
            return getIconLinks(pageUrl, dom);
        })
        .then(downloadIcons)
        .then(findBestIcon)
}

module.exports = main;

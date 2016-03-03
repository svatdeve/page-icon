const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');

const root = 'http://www.facebook.com';

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

function getIconLinks(dom) {
    var $ = cheerio.load(dom);
    const icons = [];
    $('link').each(function(i, elem) {
        const href = $(this).attr('href');
        const resolved = url.resolve(root, href);
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

function saveToFile(data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(__dirname + 'someicon.ico', data, function (error) {
            console.log(data);
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

function main(pageUrl) {
    getPage(pageUrl)
        .then(getIconLinks)
        .then(downloadIcons)
        .catch(function(error) {
            console.error(error);
        })
}

main(root);
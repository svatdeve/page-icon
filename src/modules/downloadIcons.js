const axios = require('axios');
const url = require('url');

function getExtension(downloadUrl) {
    return downloadUrl.match(/\.(png|jpg|ico)/)[0];
}

function getSiteDomain(siteUrl) {
    return url.parse(siteUrl).hostname;
}

function downloadIcon(iconUrl) {
    const iconData = new Promise(function(resolve, reject) {
        axios.get(iconUrl, {responseType: 'arraybuffer'})
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                if (error.status === 404) {
                    resolve();
                    return;
                }
                reject(error);
            });
    });

    return iconData.then(iconData => {
        if (!iconData) {
            return new Promise(resolve => resolve());
        }
        return {
            source: getSiteDomain(iconUrl),
            type: getExtension(iconUrl),
            data: iconData
        };
    });
}

function downloadIcons(iconUrls) {
    const promises = iconUrls.map(downloadIcon);
    return Promise.all(promises)
        .then((iconPaths) => {
            return iconPaths.filter(element => !!element);
        });
}

module.exports = downloadIcons;

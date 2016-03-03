function findBestIcon(iconPaths) {
    return new Promise(function (resolve, reject) {
        resolve(iconPaths[0]);
    });
}

module.exports = findBestIcon;

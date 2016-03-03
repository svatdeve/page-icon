const fs = require('fs');

function getFileSize(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, function(error, fileInfo) {
            if (error) {
                reject(error);
                return;
            }

            const fileSizeKB = fileInfo.size / 1000;
            resolve({
                sizeKB: fileSizeKB,
                path: filePath
            });
        });
    });
}

function getFileSizes(filePaths) {
    const getFileSizePromises = filePaths.map(getFileSize);
    return Promise.all(getFileSizePromises)
}

function sortFileBySizes(fileSizes) {
    return fileSizes.sort(function(a, b){
        if (a.sizeKB < b.sizeKB) {
            return 1;
        } else {
            return -1;
        }
    });
}

function findBestIcon(iconPaths) {
    return getFileSizes(iconPaths).then(fileSizes => {
        // sort descending
        const sortedFileSizes = sortFileBySizes(fileSizes);
        return sortedFileSizes[0].path;
    });
}

module.exports = findBestIcon;

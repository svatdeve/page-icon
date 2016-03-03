const pageIcon = require('./../src/index');
const fs = require("fs"); //Load the filesystem module
const chai = require('chai');
const expect = chai.expect;

const ICON_SIZE_THRESHOLD_KB = 0.5;

const SITE_URLS = [
    'https://www.facebook.com/',
    'http://stackoverflow.com/questions/16301503/can-i-use-requirepath-join-to-safely-concatenate-urls'
];

function checkIfIsIcon(iconPath) {
    return new Promise((resolve, reject) => {
        fs.stat(iconPath, function(error, fileInfo) {
            if (error) {
                reject(error);
                return;
            }

            const fileSizeKB = fileInfo.size / 1000;
            const isIcon = fileSizeKB > ICON_SIZE_THRESHOLD_KB;
            resolve(isIcon);
        });
    });
}

describe('Page Icon', function () {
    this.timeout(10000);

    it('Can download all icons', function(done) {

        const downloadTests = SITE_URLS.map(function (siteUrl) {
            return new Promise(function (resolve, reject) {
                pageIcon(siteUrl)
                    .then(function(iconPath) {
                        if (!iconPath) {
                            throw `No icon found for url: ${siteUrl}`;
                        }

                        return checkIfIsIcon(iconPath);
                    })
                    .then(function(isIcon) {
                        expect(isIcon).to.be.true;
                        resolve();
                    })
                    .catch(reject);
            });
        });

        Promise.all(downloadTests)
            .then(function() {
                done();
            })
            .catch(done);
    })
});

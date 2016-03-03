const pageIcon = require('./../lib/index');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const url = require('url');
const expect = chai.expect;
const ICON_SIZE_THRESHOLD_KB = 0.5;

const SITE_URLS = [
    'https://www.facebook.com/',
    'http://stackoverflow.com/questions/16301503/can-i-use-requirepath-join-to-safely-concatenate-urls'
];

const ICON_DIR = path.join(__dirname, '..', 'out');

function isIconValid(icon) {
    const fileSizeKB = icon.data.length / 1000;
    return fileSizeKB > ICON_SIZE_THRESHOLD_KB;
}

function saveToFile(icon) {
    const filePath = path.join(ICON_DIR, `${icon.source}${icon.type}`);
    return new Promise(function(resolve, reject) {
        fs.writeFile(filePath, icon.data, function(error) {
            if (error) {
                reject(error);
                return;
            }
            resolve(filePath);
        });
    });
}

describe('Page Icon', function() {
    this.timeout(10000);

    it('Can download all icons', function(done) {

        const downloadTests = SITE_URLS.map(function(siteUrl) {
            return new Promise(function(resolve, reject) {
                pageIcon(siteUrl)
                    .then(function(icon) {
                        if (!icon) {
                            throw `No icon found for url: ${siteUrl}`;
                        }

                        return icon;
                    })
                    .then(function(icon) {
                        expect(isIconValid(icon)).to.be.true;
                        return icon;
                    })
                    .then(saveToFile)
                    .then(() => {
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

const pageIcon = require('./../lib/index');
const helpers = require('./helpers');
const fs = require('fs');
const chai = require('chai');
const path = require('path');
const url = require('url');

const expect = chai.expect;
const {isIconValid, saveToFile} = helpers;

const SITE_URLS = [
    'https://www.facebook.com/',
    'http://stackoverflow.com/questions/16301503/can-i-use-requirepath-join-to-safely-concatenate-urls',
    'https://web.whatsapp.com'
];

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

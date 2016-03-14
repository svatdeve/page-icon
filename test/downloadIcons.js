const downloadIcon = require('./../lib/modules/download/downloadIcon');
const fs = require('fs');
const path = require('path');
const chai = require('chai');

const expect = chai.expect;

const ICON_URL = 'https://web.whatsapp.com/favicon.ico';
const NOT_ICON_URL = 'http://jiahaog.github.io/nativefier-icons';

const ICON_PATH = path.join(__dirname, '..','out', 'test_icon.ico');

describe('Download Icons', function() {
    this.timeout(10000);
    it('Can download icons', function(done) {
        downloadIcon(ICON_URL)
            .then(icon => {
                if (!icon) {
                    throw 'Icon not found';
                }
                fs.writeFileSync(ICON_PATH, icon.data);
                done();
            })
            .catch(done);
    });

    it('Will return null if icon is not found', function(done) {
        downloadIcon(NOT_ICON_URL)
            .then(icon => {
                expect(icon).to.equal(null, 'Invalid icon should return null');
                done();
            })
            .catch(done);
    })
});

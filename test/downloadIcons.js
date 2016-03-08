const downloadIcon = require('./../lib/modules/download/downloadIcon');
const fs = require('fs');
const path = require('path');

const ICON_URL = 'https://web.whatsapp.com/favicon.ico';

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
});

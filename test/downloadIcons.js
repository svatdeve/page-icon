const downloadIcon = require('./../lib/modules/download/downloadIcon');
const fs = require('fs');

const ICON_URL = 'https://web.whatsapp.com/favicon.ico';

describe('Download Icons', function() {
    this.timeout(10000);
    it('Can download Icons', function(done) {
        downloadIcon(ICON_URL)
            .then(icon => {
                if (!icon) {
                    throw 'Icon not found';
                }
                fs.writeFileSync(__dirname + 'testicon.ico', icon.data);
                done();
            })
            .catch(done);
    })
});

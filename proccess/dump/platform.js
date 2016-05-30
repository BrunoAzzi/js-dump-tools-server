var s3Dump = require('../../lib/s3.js');
var exec = require('child_process').exec;

var getPlatformInfo = function (apiKey, lastDate, callback) {
        var count = 0;
        var trigger = true;

        s3Dump.getlastMonthPlatformDump(apiKey, lastDate, () => {
            exec("zcat /tmp/platformDumps/*.gz > /tmp/platform"+apiKey, (error, stdout, stderr) => {
                count++;
                if (count == 9){
                    callback("/tmp/platform"+apiKey);
                }
            });
        });
    };

module.exports = {
    downloadLastMonth: getPlatformInfo
};

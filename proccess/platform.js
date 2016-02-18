var s3Dump = require('./../lib/s3.js');
var oboe = require('oboe');
var utf8 = require('utf8');
var moment = require('moment')
require('shelljs');
const fs = require('fs');
const zlib = require('zlib');
const gunzip = zlib.createGunzip();

global.dumpTools = {
        platform: {
            data: []
        }
    };

var getPlatformInfo = function (apiKey) {

        var callback = function (platformDumpUrl) {
            cd("tmp/platformDumps/"+apiKey);
            exec("zcat *.gz > "+apiKey);

            console.log("it works");
        };

        s3Dump.getlastMonthPlatformDump(apiKey, moment(), callback);
    };

getPlatformInfo('kliper');

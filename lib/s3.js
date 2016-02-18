var s3 = require('s3');
var moment = require('moment');
require('shelljs/global')

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: "us-east-1"
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

var getPlatformDump = function (clientApiKey, dateString, callback) {
        var params = {
            localFile: "./tmp/platformDumps/" + clientApiKey + dateString + ".gz",
            s3Params: {
                Bucket: "platform-dumps-virginia",
                Key: "buyOrders/" + dateString + "/" + clientApiKey + ".gz"
                // other options supported by getObject
                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
            }
        };

        var downloader = client.downloadFile(params);

        downloader.on('error', function(err) {
            console.error("unable to download:", err.stack);
        });
        downloader.on('progress', function() {
            console.log("progress", downloader.progressAmount, downloader.progressTotal);
        });
        downloader.on('end', function() {
            console.log("done downloading");
            if(callback) callback(params.localFile);
        });

    },

    getlastMonthPlatformDump = function (apiKey, endDate, callback) {
        var currentDate = moment(endDate);
        currentDate.month(currentDate.month() -1);

        while (currentDate < endDate) {

            getPlatformDump(apiKey, currentDate.format("YYYY-MM-DD"), callback);

            //mv ./$API_KEY.gz ./$API_KEY\($i\).gz

            currentDate.date(currentDate.date() +1);
        }

    },

    createStringDate = function (year, month, day) {
        return year + "-" + (month + 1) + "-" + day;
    },

    getClientDump = function (clientApiKey) {
    var params = {
        localFile: "./tmp/clientDumps/" + clientApiKey + ".gz",
        s3Params: {
            Bucket: "integra-3-repo",
            Key: "dumps/" + clientApiKey + "/" + "" + ".gz"
            // other options supported by getObject
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
        }
    };

    var downloader = client.downloadFile(params);

    downloader.on('error', function(err) {
      console.error("unable to download:", err.stack);
    });
    downloader.on('progress', function() {
      console.log("progress", downloader.progressAmount, downloader.progressTotal);
    });
    downloader.on('end', function() {
      console.log("done downloading");
    });
};

module.exports = {
    getClientDump: getClientDump,
    getPlatformDump: getPlatformDump,
    getlastMonthPlatformDump: getlastMonthPlatformDump
};

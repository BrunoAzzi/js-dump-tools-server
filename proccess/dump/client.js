require('../routes/s3.js');
var babayparse = require('babyparse');

var getClientInfo = function (apiKey) {
    var dumpUrl = getClientDump(apiKey);
    var client = {
        apiKey: apiKey,
        dump: dumpUrl
    };

    var parsedResult = babyparse.parse(client.dump);
    console.log(data);
};

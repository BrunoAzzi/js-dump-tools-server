var plat = require('platformjs');
var http = require('http');

plat.conf = {
  username: process.env.PLAT_USER,
  password: process.env.PLAT_PASSWORD
};

var getClientApiKeys = function () {
    plat.v1.client.list().then(function (value)  {
        var clientList = [];
        for(client of value){
            clientList.push(client.apiKey);
        }
        return clientList;
    }).catch(console.trace);
    return null;
};

module.exports = {
    getClientApiKeys: getClientApiKeys
};

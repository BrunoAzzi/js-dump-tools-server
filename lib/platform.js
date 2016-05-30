var plat = require('platformjs');
var http = require('http');

plat.conf = {
  username: process.env.PLAT_USER,
  password: process.env.PLAT_PASSWORD
};

var getClientApiKeys = function () {
    plat.v1.client.list().then(function (value) {
        var clientList = [];
        for(client of value){
            clientList.push(client.apiKey);
        }
        console.log( clientList);
    }).catch(console.trace);
};

var getTransactionById = function (store, oid) {
    return plat.get('clients/'+store+'/transactions/'+oid);
};

var getProductById = function (store, id) {
    return plat.v2.product.get(store, id);
}


module.exports = {
    getTransactionById: getTransactionById,
    getClientApiKeys: getClientApiKeys,
    getProductById: getProductById
};

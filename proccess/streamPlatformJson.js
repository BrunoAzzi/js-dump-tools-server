var fs = require('fs');
var ldj = require('ldjson-stream');
var data = [];

fs.createReadStream('/home/azzi/Downloads/offcorss')
    .pipe(ldj.parse())
    .on('data', function(obj) {
        var teste = {};
        obj.items.forEach(function (item) {
            teste = {
                oid: obj.id,
                uid: obj.userId,
                timestamp: obj.date,
                pid: item.product.id,
                sku: item.product.sku,
                price: +item.product.price,
                quantity: +item.quantity
            };
        });

        data.push(teste);

        console.log(teste);
    })
    .on('end', function() {
        console.log('end');
        console.log(data);
    });

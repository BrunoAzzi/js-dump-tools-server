var fs = require('fs');
var ldj = require('ldjson-stream');
var data = [];

fs.createReadStream('/home/azzi/Downloads/offcorss.orders.vtex.json.bak')
  .pipe(ldj.parse())
  .on('data', function(obj) {
      var teste = {};
      obj.items.forEach(function (item) {
          teste = {
              oid: obj.orderId,
              uid: obj.clientProfileData.userProfileId,
              timestamp: obj.creationDate,
              pid: item.productId,
              sku: item.sellerSku,
              price: +item.sellingPrice/100,
              quantity: +item.quantity
          };
      });

      data.push(teste);

      console.log(teste);
  })
    .on('end', function() {
        //pegar extent days filtrar dias e baixar dump do platform a partir disso;

        console.log('end');
        console.log(data);
    });

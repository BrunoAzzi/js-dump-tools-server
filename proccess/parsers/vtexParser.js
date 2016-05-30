var Transform = require( 'stream' ).Transform,
    moment = require( 'moment' ),
    util = require( 'util' ),

    formatter = function ( input ) {
        // console.log(input);
        var data = {
            orderId: input.orderId,
            userId: input.clientProfileData.userProfileId,
            timestamp: moment( input.creationDate, ["YYYY-MM-DD HH:mm:ss"] ),
            products: []
        };

        input.items.forEach( function ( item ) {
            data.products.push({
                productId: item.productId,
                sku: item.sellerSku,
                price: +item.sellingPrice/100,
                quantity: +item.quantity
            });
        });

        return data;
    };

util.inherits(vtexParse, Transform);

function vtexParse () {
    Transform.call(this, { "objectMode": true });
}

vtexParse.prototype._transform = function (input, encoding, processed) {
    this.push( formatter( input ) );
    processed();
};

module.exports = {
    parseStream: function () { return new vtexParse() },
    parse: formatter
}

var Transform = require("stream").Transform,
    util = require("util"),
    moment = require( 'moment' );

    formatter = function ( input ) {
        var data = {
            orderId: input.id,
            userId: input.userId,
            timestamp: moment( input.date, ["YYYY-MM-DD HH:mm:ss"] ),
            products: []
        };

        input.items.forEach( function ( item ) {
            data.products.push({
                productId: item.product.id,
                sku: item.product.sku,
                price: +item.product.price,
                quantity: +item.quantity
            });
        });

        return data;
    };

util.inherits(platformParse, Transform);

function platformParse () {
    Transform.call(this, { "objectMode": true });
}

platformParse.prototype._transform = function (input, encoding, processed) {
    this.push( formatter( input ) );
    processed();
};

module.exports = {
    parseStream: function () { return new platformParse() },
    parse: formatter
}

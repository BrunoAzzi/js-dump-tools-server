var Transform = require( 'stream' ).Transform,
    util = require( 'util' ),
    moment = require( 'moment' ),
    HEADERS = require( '../util/constants.js' ).HEADERS,
    headers = [],
    orderItems = [],
    lastOrderId = false;

util.inherits(csvParse, Transform);

function csvParse () {
    Transform.call(this, { "objectMode": true });
}

var data = {
    products: []
};

csvParse.prototype._transform = function (input, encoding, processed) {

    if ( !headers || headers.length <= 0 ) {
        input.forEach( function ( header ) {
            headers.push( header.toLowerCase() );
        });
        processed();
        return;
    }

    if ( !lastOrderId ) {
        lastOrderId = input[headers.indexOf(HEADERS.ORDER_ID)];
    }

    if ( input[headers.indexOf(HEADERS.ORDER_ID)] === lastOrderId ) {
        var product = {};

        headers.forEach( function ( header, index ) {

            switch ( header ) {
                case HEADERS.ORDER_ID:
                    data.orderId = input[index];
                    break;
                case HEADERS.USER_ID:
                    data.userId = input[index];
                    break;
                case HEADERS.TIMESTAMP:
                    data.timestamp = input[index];
                    break;
                case HEADERS.PRODUCT_ID:
                    product.productId = input[index];
                    break;
                case HEADERS.SKU:
                    product.sku = input[index];
                    break;
                case HEADERS.PRICE:
                    product.price = input[index];
                    break;
                case HEADERS.QUANTITY:
                    product.quantity = input[index];
                    break;
            }
        });

        if (Object.keys(product).length > 0 && product.productId){
            data.products.push(product);
        }

    } else {
        this.push( data );
    }

    lastOrderId = input[headers.indexOf(HEADERS.ORDER_ID)];

    processed();
};

module.exports = {
    parseStream: function () { return new csvParse() }
}

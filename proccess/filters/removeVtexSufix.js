var Transform = require( 'stream' ).Transform,
    moment = require( 'moment' ),
    util = require( 'util' );

util.inherits(removeVtexSufix, Transform);

function removeVtexSufix () {
    Transform.call(this, { "objectMode": true });
};

removeVtexSufix.prototype._transform = function (input, encoding, processed) {
    input.orderId = input.orderId.replace(/(-01)/g , '');
    this.push( input );
    processed();
};

module.exports = {
    filter: function () { return new removeVtexSufix() }
};

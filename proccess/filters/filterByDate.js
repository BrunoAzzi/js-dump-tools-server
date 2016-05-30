var Transform = require( 'stream' ).Transform,
    moment = require( 'moment' ),
    util = require( 'util' ),
    HEADERS = require( '../util/constants.js' ).HEADERS,
    headers = [];

util.inherits(filterByDate, Transform);


function filterByDate (options) {
    options.lastDay = options.lastDay.subtract(10, 'days');
    this.options = options;
    Transform.call(this, { "objectMode": true });
};

filterByDate.prototype._transform = function (input, encoding, processed) {

    if ( !headers || headers.length <= 0 ) {
        input.forEach( function ( header ) {
            headers.push( header.toLowerCase() );
        });
        this.push( input );
        processed();
        return;
    }

    if (moment(input[headers.indexOf(HEADERS.TIMESTAMP)]).isAfter(this.options.lastDay)) {
        this.push( input );
    }

    processed();
};

module.exports = {
    filter: function (options) { return new filterByDate(options) }
};

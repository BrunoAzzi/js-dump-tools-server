var Transform = require( 'stream' ).Transform,
    moment = require( 'moment' ),
    util = require( 'util' ),
    lastDay = false;

util.inherits(getLasDay, Transform);

function getLasDay () {
    Transform.call(this, { "objectMode": true });
};

getLasDay.prototype._transform = function (input, encoding, processed) {
    var inputDate = moment(input.timestamp);
    if ( !lastDay ) { lastDay = inputDate; }
    if ( inputDate.isAfter( lastDay ) ) { lastDay = inputDate; }
    this.push( lastDay.toString() );
    processed();
};

module.exports = {
    fetch: function () { return new getLasDay() }
};

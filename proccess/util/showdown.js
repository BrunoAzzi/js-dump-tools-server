var Transform = require("stream").Transform,
    util = require("util");

util.inherits(showdown, Transform);

function showdown () {
    Transform.call(this, { "objectMode": true });
}

showdown.prototype._transform = function (input, encoding, processed) {
    this.push(JSON.stringify(input)+"\n");
    processed();
};

module.exports = {
    print: function () { return new showdown() }
}

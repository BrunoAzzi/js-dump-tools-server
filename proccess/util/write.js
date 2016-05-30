var Transform = require("stream").Transform,
    util = require("util");

util.inherits(showdown, Transform);

function writeFile () {
    Transform.call(this, { "objectMode": true });
}

writeFile.prototype._transform = function (input, encoding, processed) {
    console.log(input);
    processed();
};

module.exports = {
    write: function () { return new writeFile() }
}

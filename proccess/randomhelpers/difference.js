var platform = require('./../lib/platform.js');

Array.prototype.intersection = function (array) {
    var a = new Set(this),
        b = new Set(array),
        intersection = new Set( [...a].filter(x => b.has(x)) );

    return Array.from(intersection);
};

Array.prototype.difference = function (array) {
    var a = new Set(this),
        b = new Set(array),
        difference = new Set( [...a].filter(x => !b.has(x)) );

    return Array.from(difference);
};

var argv = require( 'yargs' ).argv;
var fs = require('fs');

var vtexData = JSON.parse(fs.readFileSync(argv._[0], 'utf8'));
// var platformData = JSON.parse(fs.readFileSync(argv._[1], 'utf8'));
//
// // console.log(new Set(vtexData));
// // console.log(new Set(platformData));
//
// var difference = vtexData.difference( platformData );

    vtexData.forEach(function (id) {
        platform.getProductById(argv._[1], id).then(function (json) {
            console.log(id + " " + json.status);
        }, function (error) {
            console.log(id + " ERROR");
        })
    });

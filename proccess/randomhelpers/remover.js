var fs = require( 'fs' );
var platform = require( '../lib/platform.js' );
var argv = require('yargs').argv;
var showdown= require('./util/showdown.js');
const execFile = require('child_process').execFileSync;

var ids = JSON.parse(fs.readFileSync(argv._[0], 'utf8'));

    ids.forEach( function (id) {
        execFile('plat-v2-update-product-attribute', [argv._[1], id, 'status', 'REMOVED'] );
    });

    execFile( 'curl', ['-XPOST', '-u', 'bruno.azzi:bruno.azzi', 'http://feeds.dc.chaordicsystems.com/v1/clients/sepha-v5/import'] );

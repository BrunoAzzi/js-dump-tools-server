var argv = require('yargs').argv;
const execFile = require('child_process').execFile;

    argv._.forEach( function ( apikey ) {
        execFile(
            'curl',
            ['-XPOST', '-u', 'bruno.azzi:bruno.azzi',
                'http://feeds.dc.chaordicsystems.com/v1/clients/' + apikey + '/import'],
            function (stdout, stderr, err) {
                console.log(stderr);
            });
    });

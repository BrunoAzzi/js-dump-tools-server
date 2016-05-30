var argv = require('yargs').argv;
const execFile = require('child_process').execFile;

execFile( 'curl', ['-XPUT', '-u', 'bruno.azzi:bruno.azzi', '-d', '@'+argv._[0],
                    '-H', 'Content-type: application/json',
                   'http://feeds.dc.chaordicsystems.com/v1/clients/'+ argv._[1]],
                   function (stdout, stderr, err) {
                       console.log(stderr);
                   });

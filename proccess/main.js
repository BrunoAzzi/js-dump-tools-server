var fs = require('fs'),
    ldj = require('ndjson'),
    csv = require('csv'),
    exec = require('child_process').exec;
    parser = require('./parsers/main.js'),
    filter = require( './filters/main.js' ),
    showdown = require( './util/showdown.js' ),
    getLatestDay = require( './fetcher/main.js' ).getLatestDay,
    dump = require( './dump/platform.js' ),
    test = require( './test/main.js' ),
    writeClientData = fs.createWriteStream('/tmp/clientPreparedData.json'),
    writePlatformData = fs.createWriteStream( '/tmp/platformPeparedData.json' ),
    // writeClientDataSummary = fs.createWriteStream('/tmp/clientPreparedDataSummary.json'),
    argv = require( 'yargs' ).argv,
    moment = require('moment');

    if ( argv.vtex ) {
        fs.createReadStream( argv._[0] )
            .pipe( ldj.parse() )
            .pipe( parser.vtexParseStream() )
            .pipe( filter.removeVtexSufix() )
            .pipe( showdown.print() )
            .pipe( writeClientData )
                .on( 'finish', function () {
                    var extentDays = d3.extent( clientData, function ( row ) { return row.timestamp; } ),
                        filteredData = lastTenDays.filter( clientData, extentDays[1] );
                    //TODO faz download do dump do platform utilizando extentDays retorna local do arquivo baixado
                    //TODO testa passando as duas url de arquivos
                });
    } else {
        var lastDay = false;
        exec('(head -n 1 ' + argv._[0] + ' && tail -n +2 ' + argv._[0] + ' | sort -r -t ";" -k 7 ) > /tmp/sortedClientCsv.csv', (data) => {
            exec("sed -n '2p' /tmp/sortedClientCsv.csv | awk -F ';' '{ print $7 }' ", (error, stdout, stderr) => {
                lastDay = moment(stdout, 'YYYY-MM-DD HH:mm:SS');
                dump.downloadLastMonth( argv.apikey, lastDay, (platformlocalfile) => {
                    console.log("Done download");

                    fs.createReadStream( platformlocalfile )
                    .pipe( ldj.parse() )
                    .pipe( parser.platformParseStream() )
                    .pipe( showdown.print() )
                    .pipe( writePlatformData )
                    .on('finish', () => {
                        console.log("finish platform data");

                        fs.createReadStream( '/tmp/sortedClientCsv.csv' )
                            .pipe( csv.parse( { delimiter: argv.delimiter || ";" } ) )
                            .pipe( filter.filterByDate( {lastDay}) )
                            .pipe( parser.csvParseStream() )
                            // .on('data', (data) => {
                            //     console.log(data[0]);
                            // });
                            .pipe( showdown.print() )
                            .pipe( writeClientData )
                            .on('finish', () => {
                                console.log("finish client data");
                            })
                    })
                });
            });
        });
    }

var csvParser = require( './csvParser.js' ),
    vtexParser = require( './vtexParser.js' ),
    platformParser = require( './platformParser.js' );

module.exports = {
    csvParseStream: csvParser.parseStream,
    vtexParseStream: vtexParser.parseStream,
    platformParseStream: platformParser.parseStream,
    vtexParse: vtexParser.parse,
    platformParse: platformParser.parse
}

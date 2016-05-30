var fs = require('fs'),
    ldj = require('ndjson'),
    moment = require('moment'),
    lastDay = false;

var fetch = function (url, callback) {
    fs.createReadStream(url)
    .pipe(ldj.parse())
    .on('data', (data) => {
        if (data.timestamp) {
            var inputDate = moment(data.timestamp);
            if ( !lastDay ) { lastDay = inputDate; }
            if ( inputDate.isAfter( lastDay ) ) { lastDay = inputDate; }
        }
    })
    .on('end', () => {
        callback(lastDay.toString())
    })
}

module.exports = {
    getLatestDay: fetch
}

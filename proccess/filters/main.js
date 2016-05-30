var removeVtexSufix = require( './removeVtexSufix.js' ),
    lastTenDays = require( './lastTenDays.js' ),
    filterByDate = require( './filterByDate.js' );

module.exports = {
    removeVtexSufix: removeVtexSufix.filter,
    lastTenDays: lastTenDays.filter,
    filterByDate: filterByDate.filter
}

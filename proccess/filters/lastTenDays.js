var getLastTenDays = function(data, date) {
        var beginDate = date,
            filteredData = [];

        beginDate.subtract(10, 'days');

        filteredData = data.filter( function(row) {
            return row.timestamp.isAfter(beginDate);
        });

        return filteredData;

    };

module.exports = {
    filter: getLastTenDays
}

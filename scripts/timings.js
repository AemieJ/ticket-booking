const { Table } = require('console-table-printer');

const timings = new Table({
    columns: [
        {name: 'period', alignment: 'left'}, 
        {name: 'index', alignment: 'center'},
        {name: 'time', alignment: 'right'},
    ]
});

timings.addRows([
    {period: 'Moring', index: 'M', time: '11 AM'},
    {period: 'Afternoon', index: 'A', time: '2:30 PM'},
    {period: 'Evening', index: 'E', time: '6:00 PM'},
    {period: 'Night', index: 'N', time: '12 AM'}
])

module.exports = timings;
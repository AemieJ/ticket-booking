const { Table } = require('console-table-printer');

const coke = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

coke.addRows([
    {size: 'S', prize: 65},
    {size: 'M', prize: 90},
    {size: 'L', prize: 120},
])

module.exports = coke;
const { Table } = require('console-table-printer');

const cheese = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

cheese.addRows([
    {size: 'S', prize: 155},
    {size: 'M', prize: 180},
    {size: 'L', prize: 210},
])

module.exports = cheese;
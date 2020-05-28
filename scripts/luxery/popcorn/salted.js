const { Table } = require('console-table-printer');

const salted = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

salted.addRows([
    {size: 'S', prize: 120},
    {size: 'M', prize: 150},
    {size: 'L', prize: 180},
])

module.exports = salted;
const { Table } = require('console-table-printer');

const caramel = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

caramel.addRows([
    {size: 'S', prize: 135},
    {size: 'M', prize: 175},
    {size: 'L', prize: 195},
]);

module.exports = caramel;
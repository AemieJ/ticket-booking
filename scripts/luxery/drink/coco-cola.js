const { Table } = require('console-table-printer');

const cc = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

cc.addRows([
    {size: 'S', prize: 80},
    {size: 'M', prize: 110},
    {size: 'L', prize: 140},
])

module.exports = cc;
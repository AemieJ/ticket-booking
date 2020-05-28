const { Table } = require('console-table-printer');

const sprite = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

sprite.addRows([
    {size: 'S', prize: 45},
    {size: 'M', prize: 80},
    {size: 'L', prize: 100},
])

module.exports = sprite;
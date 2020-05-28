const { Table } = require('console-table-printer');

const md = new Table({
    columns: [
        {name: 'size', alignment: 'left'}, 
        {name: 'prize', alignment: 'center'},
    ]
});

md.addRows([
    {size: 'S', prize: 65},
    {size: 'M', prize: 90},
    {size: 'L', prize: 120},
])

module.exports = md;
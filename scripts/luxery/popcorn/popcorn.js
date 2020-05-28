const { Table } = require('console-table-printer');

const popcorn = new Table({
    columns: [
        {name: 'index', alignment: 'left'}, 
        {name: 'flavor', alignment: 'right'},
    ]
});

popcorn.addRows([
    {index: 1, flavor: 'Salted'},
    {index: 2, flavor: 'Cheese'},
    {index: 3, flavor: 'Caramel'},
]);

module.exports = popcorn;
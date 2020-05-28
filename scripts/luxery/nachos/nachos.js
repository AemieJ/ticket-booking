const { Table } = require('console-table-printer');

const nachos = new Table({
    columns: [
        {name: 'index', alignment: 'left'}, 
        {name: 'flavor', alignment: 'right'},
        {name: 'price', alignment: 'center'},
    ]
});

nachos.addRows([
    {index: 1, flavor: 'Salted', price: 210},
    {index: 2, flavor: 'Cheese', price: 230},
]);

module.exports = nachos;
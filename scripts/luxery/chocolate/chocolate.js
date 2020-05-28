const { Table } = require('console-table-printer');

const nachos = new Table({
    columns: [
        {name: 'index', alignment: 'left'}, 
        {name: 'flavor', alignment: 'right'},
        {name: 'price', alignment: 'center'},
    ]
});

nachos.addRows([
    {index: 1, flavor: 'Bounty', price: 20},
    {index: 2, flavor: 'Mars', price: 45},
    {index: 3, flavor: 'Galaxy', price: 60},
]);

module.exports = nachos;
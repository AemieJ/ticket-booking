const { Table } = require('console-table-printer');

const luxery = new Table({
    columns: [
        {name: 'index', alignment: 'left'}, 
        {name: 'name', alignment: 'right'},
    ]
});

luxery.addRows([
    {index: 1, name: 'Popcorn'},
    {index: 2, name: 'Nachos'},
    {index: 3, name: 'Chocolate'},
    {index: 4, name: 'Drink'},
]);

module.exports = luxery;
const { Table } = require('console-table-printer');

const drink = new Table({
    columns: [
        {name: 'index', alignment: 'left'}, 
        {name: 'flavor', alignment: 'right'},
    ]
});

drink.addRows([
    {index: 1, flavor: 'Coco-Cola'},
    {index: 2, flavor: 'Coke'},
    {index: 3, flavor: 'Mountain Dew'},
    {index: 4, flavor: 'Sprite'},
]);

module.exports = drink;
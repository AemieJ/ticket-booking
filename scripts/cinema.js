const { Table } = require('console-table-printer');

const cinema = new Table({
    columns: [
        {name: 'cinema', alignment: 'left'}, 
        {name: 'price', alignment: 'right'},
    ]
});

cinema.addRows([
    {cinema: 'Max', price: 280},
    {cinema: 'Gold', price: 375},
    {cinema: '3D', price: 320},
]);

module.exports = cinema;
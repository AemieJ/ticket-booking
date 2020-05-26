const { Table } = require('console-table-printer');

const movies = new Table({
    columns: [
        {name: 'index', alignment: 'left'}, 
        {name: 'movie', alignment: 'center'},
        {name: 'language', alignment: 'center'},
        {name: 'genre', alignment: 'center'}
    ]
});

movies.addRows([
    {index: 1, movie: 'Housefull 4', language: 'Hindi', genre: 'Comedy'},
    {index: 2, movie: 'Lights Out', language: 'English', genre: 'Horror'},
    {index: 3, movie: 'John Wick', language: 'English', genre: 'Action'},
    {index: 4, movie: 'Frozen 2', language: 'English', genre: 'Animated Kids'},
])

module.exports = movies;
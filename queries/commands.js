const mysql = require('mysql');
const util = require('util');
const fs = require('fs');
const config = require('../config/config');

const connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

// SQL TABLE
const deleteTable = fs.readFileSync('./queries/delete.sql').toString();
const createTable = fs.readFileSync('./queries/create-test.sql').toString();
const insertTable = fs.readFileSync('./queries/insert.sql').toString();

const deleteQuery = async() => {
    try {
        await query(deleteTable);
    } finally {
        console.log('Table is deleted');
    }
};

const createQuery = async() => {
    try {
        await query(createTable);
    } finally {
        console.log('Table is created');
    }
};

const insertDefaultValues = async() => {
    try {
        await query(insertTable);
    } finally {
        console.log('Default values are inserted into table');
    }
};

deleteQuery();
createQuery();
insertDefaultValues();
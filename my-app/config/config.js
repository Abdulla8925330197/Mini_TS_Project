"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
console.log('Dialect:', process.env.DB_DIALECT); 
var config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.HOST,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        username: 'root',
        password: '',
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: '',
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
module.exports = config;

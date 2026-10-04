// db/pool.js
const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'bookstore_inventory',
  password: '1234',
  port: 5432,
});

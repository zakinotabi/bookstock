// db/pool.js
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

module.exports = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: {
          rejectUnauthorized: false, // Required for secure cloud connections like Neon
        },
      }
    : {
        host: 'localhost',
        user: 'postgres',
        database: 'bookstore_inventory',
        password: '1234',
        port: 5432,
      },
);

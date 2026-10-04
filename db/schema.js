require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  stock INT DEFAULT 0
);

INSERT INTO books (title, author, category, price, stock) 
VALUES ('testbook', 'testperson', 'testcategory', 00.99, 10);

`;

(async () => {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
})();

const pool = require('../pool');

async function getDashboardQuery() {
  const dashQuery = `
  SELECT
  COUNT (*) AS total_books,
  (SELECT COUNT(*) FROM categories) AS total_category,
  COUNT (CASE WHEN stock > 0 AND stock < 5 THEN 1 END) AS low_stock,
  COUNT (CASE WHEN stock = 0 THEN 1 END) AS out_of_stock
  FROM books
  `;
  const { rows } = await pool.query(dashQuery);
  return rows;
}

async function getNeedsAttQuery() {
  const { rows } = await pool.query(`
    SELECT books.*, categories.name AS category_name
    FROM books
    LEFT JOIN categories ON categories.id = books.category_id
    ORDER BY stock ASC
    `);
  return rows;
}

async function getRecentStockQuery() {
  const { rows } = await pool.query(`
    SELECT books.*, categories.name AS category_name
    FROM books
    LEFT JOIN categories ON categories.id = books.category_id
    ORDER BY id DESC
    `);
  return rows;
}

module.exports = {
  getDashboardQuery,
  getNeedsAttQuery,
  getRecentStockQuery,
};

// WHY { rows }
// What pool.query() actually returns under the hood:
// {
//   command: 'SELECT',
//   rowCount: 2,
//   oid: null,
//   rows: [ { id: 1, title: 'THE BOOK 1' }, { id: 2, title: 'THE BOOK 2' } ], // <--- THIS IS WHAT WE WANT!
//   fields: [ ... ]
// }

// Basically it means
// const result = await pool.query('SELECT * FROM books');
// const rows = result.rows;

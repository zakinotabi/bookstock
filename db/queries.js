const pool = require('./pool');

async function getAllBooksQuery() {
  const { rows } = await pool.query('SELECT * FROM books');
  return rows;
}

async function getAllBooksCatQuery() {
  const { rows } = await pool.query('SELECT DISTINCT category FROM books');
  return rows;
}

module.exports = {
  getAllBooksQuery,
  getAllBooksCatQuery,
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

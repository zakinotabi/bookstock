const pool = require('./pool');

async function getAllBooks() {
  const { rows } = await pool.query('SELECT * FROM books');
  console.log('🚀 ~ getAllBooks ~ rows:', rows);
  return rows;
}

getAllBooks();

module.exports = {
  getAllBooks,
};

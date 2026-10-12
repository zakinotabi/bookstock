const pool = require('../pool');

async function getAllBooksQuery() {
  const { rows } = await pool.query('SELECT * FROM books');
  return rows;
}

async function addBook(title, author, categoryId, price, stock) {
  const insertBook = `
    INSERT INTO Books (title, author, category_id, price, stock)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const { rows } = await pool.query(insertBook, [title, author, categoryId, price, stock]);
  return rows;
}

async function editBook(currentBookId, title, author, categoryId, price, stock) {
  const updateBook = `
    UPDATE Books
    SET title = $1, author = $2, category_id = $3, price = $4, stock = $5
    WHERE id = $6
    RETURNING *;
  `;
  const { rows } = await pool.query(updateBook, [title, author, categoryId, price, stock, currentBookId]);
  return rows;
}

async function deleteBook(currentBookId) {
  const updateBook = 'DELETE FROM books WHERE id = $1';
  const { rows } = await pool.query(updateBook, [currentBookId]);
  return rows;
}

module.exports = {
  getAllBooksQuery,
  deleteBook,
  editBook,
  addBook,
};

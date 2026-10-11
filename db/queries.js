const pool = require('./pool');

async function getDashboardQuery() {
  const dashQuery = `
  SELECT
  COUNT (*) AS total_books,
  COUNT (DISTINCT category_id) AS total_category,
  COUNT (CASE WHEN stock > 0 AND stock < 5 THEN 1 END) AS low_stock,
  COUNT (CASE WHEN stock = 0 THEN 1 END) AS out_of_stock
  FROM books
  `;
  const { rows } = await pool.query(dashQuery);
  return rows;
}

async function getNeedsAttQuery() {
  const { rows } = await pool.query('SELECT * FROM books WHERE stock < 10 ORDER BY stock ASC');
  return rows;
}

async function getRecentStockQuery() {
  const { rows } = await pool.query('SELECT * FROM books ORDER BY id DESC');
  return rows;
}

async function getAllBooksQuery() {
  const { rows } = await pool.query('SELECT * FROM books');
  return rows;
}

async function getAllBooksCatQuery() {
  const catQuery = `
  SELECT
  categories.*,
  (SELECT COUNT(*) FROM books WHERE books.category_id = categories.id) AS total_in_stock
  FROM categories
  ORDER BY name ASC
  `;
  const { rows } = await pool.query(catQuery);
  return rows;
}

async function addCategory(name) {
  const insertCat = 'INSERT INTO categories (name) VALUES ($1) RETURNING *;';
  const { rows } = await pool.query(insertCat, [name]);
  return rows;
}
async function editCategory(oldName, newName) {
  const editCat = 'UPDATE categories SET name = $1 WHERE name = $2 RETURNING *';
  const { rows } = await pool.query(editCat, [newName, oldName]);
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
  deleteBook,
  editBook,
  addBook,
  getDashboardQuery,
  getNeedsAttQuery,
  getRecentStockQuery,
  getAllBooksQuery,
  getAllBooksCatQuery,
  addCategory,
  editCategory,
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

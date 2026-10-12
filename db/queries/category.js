const pool = require('../pool');

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

module.exports = {
  getAllBooksCatQuery,
  addCategory,
  editCategory,
};

const db = require('../db/queries');

async function getBooks(req, res) {
  const books = await db.getAllBooks();
  // res.send(`Books in inventory: ${JSON.stringify(books)}`);
  res.render('index', { booksList: books });
}

module.exports = {
  getBooks,
};

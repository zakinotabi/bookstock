const booksQueries = require('../db/queries/books');
const categoryQueries = require('../db/queries/category');

async function getBooksRender(req, res) {
  const categories = await categoryQueries.getAllBooksCatQuery();
  const books = await booksQueries.getAllBooksQuery();

  res.render('books', {
    booksList: books,
    categoriesList: categories,
  });
}

async function sendAddBookData(req, res) {
  const { title, author, categoryId, price, stock } = req.body;
  await booksQueries.addBook(title, author, categoryId, price, stock);
  res.redirect('/books');
}

async function sendEditBookData(req, res) {
  const { currentBookId, title, author, categoryId, price, stock } = req.body;
  await booksQueries.editBook(currentBookId, title, author, categoryId, price, stock);
  res.redirect('/books');
}

async function sendDeleteBookData(req, res) {
  const { currentBookId } = req.body;
  await booksQueries.deleteBook(currentBookId);
  res.redirect('/books');
}

module.exports = {
  sendDeleteBookData,
  sendEditBookData,
  sendAddBookData,
  getBooksRender,
};

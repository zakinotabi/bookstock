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

  const books = await booksQueries.getAllBooksQuery();
  res.redirect('/books');
}

async function sendDeleteBookData(req, res) {
  const { currentBookId } = req.body;
  await booksQueries.deleteBook(currentBookId);
  res.redirect('/books');
}

async function filterBooksByCatRender(req, res) {
  const { id } = req.params;

  const books = id === 'all' ? await booksQueries.getAllBooksQuery() : await booksQueries.getBooksByCatQuery(id);

  res.render('partials/booksTable', {
    booksList: books,
  });
}

async function viewBooksByCatRender(req, res) {
  const { id } = req.params;
  const categories = await categoryQueries.getAllBooksCatQuery();
  const books = await booksQueries.getBooksByCatQuery(id);
  res.render('books', {
    booksList: books,
    categoriesList: categories,
  });
}

module.exports = {
  sendDeleteBookData,
  sendEditBookData,
  sendAddBookData,
  getBooksRender,
  filterBooksByCatRender,
  viewBooksByCatRender,
};

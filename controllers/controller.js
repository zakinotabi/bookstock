const queries = require('../db/queries');

async function getBooksStatesRender(req, res) {
  const count = await queries.getDashboardQuery();
  const needsAtt = await queries.getNeedsAttQuery();
  const recent = await queries.getRecentStockQuery();

  res.render('home', {
    booksStates: count[0],
    needsAttention: needsAtt,
    recentStock: recent,
  });
}

async function getBooksCatRender(req, res) {
  const categories = await queries.getAllBooksCatQuery();
  const allBooks = await queries.getAllBooksQuery();

  res.render('categories', {
    categoriesList: categories,
    allBooks: allBooks,
  });
}

async function getBooksRender(req, res) {
  const categories = await queries.getAllBooksCatQuery();
  const books = await queries.getAllBooksQuery();

  res.render('books', {
    booksList: books,
    categoriesList: categories,
  });
}

async function sendAddCatData(req, res) {
  const { category } = req.body;
  await queries.addCategory(category);
  res.redirect('/categories');
}

async function sendEditCatData(req, res) {
  const { oldCategory, newCategory } = req.body;
  await queries.editCategory(oldCategory, newCategory);
  res.redirect('/categories');
}

async function sendAddBookData(req, res) {
  const { title, author, categoryId, price, stock } = req.body;
  await queries.addBook(title, author, categoryId, price, stock);
  res.redirect('/books');
}

async function sendEditBookData(req, res) {
  const { currentBookId, title, author, categoryId, price, stock } = req.body;
  await queries.editBook(currentBookId, title, author, categoryId, price, stock);
  res.redirect('/books');
}

async function sendDeleteBookData(req, res) {
  const { currentBookId } = req.body;
  await queries.deleteBook(currentBookId);
  res.redirect('/books');
}

module.exports = {
  sendDeleteBookData,
  sendEditBookData,
  sendAddBookData,
  sendEditCatData,
  sendAddCatData,
  getBooksStatesRender,
  getBooksRender,
  getBooksCatRender,
};

// What res.render('index', { booksList: books }) actually does:
// 1. Looks in your views/ folder for "index.ejs".
// 2. Hands the "books" array to "index.ejs" under the variable name "booksList".
// 3. Compiles the EJS + Data into standard HTML.
// 4. Sends that HTML to the user's browser.
// but we still need to route it

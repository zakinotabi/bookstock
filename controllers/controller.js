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

async function getBooksRender(req, res) {
  const books = await queries.getAllBooksQuery();
  // res.send(`Books in inventory: ${JSON.stringify(books)}`);
  res.render('books', { booksList: books });
}
async function getBooksCatRender(req, res) {
  const categories = await queries.getAllBooksCatQuery();
  // res.send(`Books in inventory: ${JSON.stringify(books)}`);
  res.render('categories', { categoriesList: categories });
}

module.exports = {
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

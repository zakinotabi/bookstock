const homeQueries = require('../db/queries/home');

async function getBooksStatesRender(req, res) {
  const count = await homeQueries.getDashboardQuery();
  const needsAtt = await homeQueries.getNeedsAttQuery();
  const recent = await homeQueries.getRecentStockQuery();

  res.render('home', {
    booksStates: count[0],
    needsAttention: needsAtt,
    recentStock: recent,
  });
}

module.exports = {
  getBooksStatesRender,
};

// What res.render('index', { booksList: books }) actually does:
// 1. Looks in your views/ folder for "index.ejs".
// 2. Hands the "books" array to "index.ejs" under the variable name "booksList".
// 3. Compiles the EJS + Data into standard HTML.
// 4. Sends that HTML to the user's browser.
// but we still need to route it

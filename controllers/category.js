const categoryQueries = require('../db/queries/category');
const booksQueries = require('../db/queries/books');

async function getBooksCatRender(req, res) {
  const categories = await categoryQueries.getAllBooksCatQuery();
  const allBooks = await booksQueries.getAllBooksQuery();

  res.render('categories', {
    categoriesList: categories,
    allBooks: allBooks,
  });
}

async function sendAddCatData(req, res) {
  const { category } = req.body;
  await categoryQueries.addCategory(category);
  res.redirect('/categories');
}

async function sendEditCatData(req, res) {
  const { oldCategory, newCategory } = req.body;
  await categoryQueries.editCategory(oldCategory, newCategory);
  res.redirect('/categories');
}

module.exports = {
  sendEditCatData,
  sendAddCatData,
  getBooksCatRender,
};

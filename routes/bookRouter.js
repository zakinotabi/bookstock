const { Router } = require('express');
const bookRouter = Router();
const bookController = require('../controllers/books');

// So '/' here means '/books'
bookRouter.get('/', bookController.getBooksRender);
bookRouter.get('/category/filter/:id', bookController.filterBooksByCatRender);
bookRouter.get('/category/view/:id', bookController.viewBooksByCatRender);
bookRouter.post('/add', bookController.sendAddBookData);
bookRouter.post('/edit', bookController.sendEditBookData);
bookRouter.post('/delete', bookController.sendDeleteBookData);

module.exports = bookRouter;

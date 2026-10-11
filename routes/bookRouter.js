const { Router } = require('express');
const bookRouter = Router();
const bookController = require('../controllers/controller');

// So '/' here means '/books'
bookRouter.get('/', bookController.getBooksRender);
bookRouter.post('/add', bookController.sendAddBookData);
bookRouter.post('/edit', bookController.sendEditBookData);
bookRouter.post('/delete', bookController.sendDeleteBookData);

module.exports = bookRouter;

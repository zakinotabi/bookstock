const { Router } = require('express');
const bookRouter = Router();
const bookController = require('../controllers/controller');

// So '/' here means '/books'
bookRouter.get('/', bookController.getBooksRender);

// bookRouter.get('/edit', bookController.getEditBookForm);

module.exports = bookRouter;

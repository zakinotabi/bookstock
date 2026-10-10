const { Router } = require('express');
const homeRouter = Router();
const bookController = require('../controllers/controller');

// So '/' here means '/books'
homeRouter.get('/', bookController.getBooksStatesRender);

module.exports = homeRouter;

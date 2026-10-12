const { Router } = require('express');
const homeRouter = Router();
const homeController = require('../controllers/home');

// So '/' here means '/books'
homeRouter.get('/', homeController.getBooksStatesRender);

module.exports = homeRouter;

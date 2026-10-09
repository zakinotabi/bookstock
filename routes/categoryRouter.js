const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/controller');

// Mounted at '/categories' in app.js
categoryRouter.get('/', categoryController.getBooksCatRender);

module.exports = categoryRouter;

const { Router } = require('express');
const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  res.render('home'); // Renders home page
});

module.exports = homeRouter;

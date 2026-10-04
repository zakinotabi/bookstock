require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

const bookController = require('./controllers/controller');

app.set('view engine', 'ejs');

app.get('/', bookController.getBooks);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

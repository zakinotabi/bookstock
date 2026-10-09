require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Import Routers
const homeRouter = require('./routes/homeRouter');
const categoryRouter = require('./routes/categoryRouter');
const bookRouter = require('./routes/bookRouter');

// Configuration
app.set('view engine', 'ejs');

// Mount Routers with Prefixes
app.use('/', homeRouter);
app.use('/categories', categoryRouter);
app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

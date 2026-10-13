require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const path = require('path');

// Import Neon and connect using your environment variable
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Import Routers
const homeRouter = require('./routes/homeRouter');
const categoryRouter = require('./routes/categoryRouter');
const bookRouter = require('./routes/bookRouter');

// This middleware parses incoming URL-encoded form data (like from <form>)
app.use(express.urlencoded({ extended: true }));

// css
app.use(express.static(path.join(__dirname, 'public')));

// Configuration
app.set('view engine', 'ejs');

// Mount Routers with Prefixes
app.use('/', homeRouter);
app.use('/categories', categoryRouter);
app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Bookstore Inventory System - Ready to build!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  stock INT DEFAULT 0
);

INSERT INTO books (title, author, category, price, stock) VALUES 
('1984', 'George Orwell', 'Classic Fiction', 14.99, 12),
('Crime and Punishment', 'Fyodor Dostoevsky', 'Classic Fiction', 16.50, 8),
('Notes from Underground', 'Fyodor Dostoevsky', 'Philosophy', 11.99, 6),
('The Stranger', 'Albert Camus', 'Classic Fiction', 13.50, 10),
('The Metamorphosis', 'Franz Kafka', 'Classic Fiction', 9.99, 5),
('Goodbye Things', 'Fumio Sasaki', 'Self-Help', 15.00, 7),
('The Heart of Buddha’s Teaching', 'Thich Nhat Hanh', 'Religion & Spirituality', 16.99, 4),
('The Holy Quran', 'Traditional', 'Religion & Spirituality', 25.00, 9),
('The Holy Bible', 'Traditional', 'Religion & Spirituality', 22.00, 11),
('Clean Code', 'Robert C. Martin', 'Technology', 34.99, 0),
('Atomic Habits', 'James Clear', 'Self-Help', 16.00, 10),
('Dune', 'Frank Herbert', 'Science Fiction', 18.99, 0),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'History', 22.50, 3),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 15.99, 14),
('Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', 19.99, 0),
('Meditations', 'Marcus Aurelius', 'Philosophy', 9.99, 8),
('The Alchemist', 'Paulo Coelho', 'Adventure', 12.50, 2),
('Becoming', 'Michelle Obama', 'Biography', 20.00, 0),
('Zero to One', 'Peter Thiel', 'Business', 22.00, 1),
('The Art of War', 'Sun Tzu', 'Philosophy', 8.50, 0);
`;

(async () => {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
})();

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category_id INT NOT NULL REFERENCES categories(id),
  price NUMERIC(6, 2) NOT NULL,
  stock INT DEFAULT 0
);

INSERT INTO categories (name) VALUES
('Classic Fiction'),
('Philosophy'),
('Self-Help'),
('Religion & Spirituality'),
('Technology'),
('Science Fiction'),
('History'),
('Fantasy'),
('Psychology'),
('Adventure'),
('Biography'),
('Business')
ON CONFLICT (name) DO NOTHING;

INSERT INTO books (title, author, category_id, price, stock) VALUES
('1984', 'George Orwell', (SELECT id FROM categories WHERE name = 'Classic Fiction'), 14.99, 12),
('Crime and Punishment', 'Fyodor Dostoevsky', (SELECT id FROM categories WHERE name = 'Classic Fiction'), 16.50, 8),
('Notes from Underground', 'Fyodor Dostoevsky', (SELECT id FROM categories WHERE name = 'Philosophy'), 11.99, 6),
('The Stranger', 'Albert Camus', (SELECT id FROM categories WHERE name = 'Classic Fiction'), 13.50, 10),
('The Metamorphosis', 'Franz Kafka', (SELECT id FROM categories WHERE name = 'Classic Fiction'), 9.99, 5),
('Goodbye Things', 'Fumio Sasaki', (SELECT id FROM categories WHERE name = 'Self-Help'), 15.00, 7),
('The Heart of Buddha’s Teaching', 'Thich Nhat Hanh', (SELECT id FROM categories WHERE name = 'Religion & Spirituality'), 16.99, 4),
('The Holy Quran', 'Traditional', (SELECT id FROM categories WHERE name = 'Religion & Spirituality'), 25.00, 9),
('The Holy Bible', 'Traditional', (SELECT id FROM categories WHERE name = 'Religion & Spirituality'), 22.00, 11),
('Clean Code', 'Robert C. Martin', (SELECT id FROM categories WHERE name = 'Technology'), 34.99, 0),
('Atomic Habits', 'James Clear', (SELECT id FROM categories WHERE name = 'Self-Help'), 16.00, 10),
('Dune', 'Frank Herbert', (SELECT id FROM categories WHERE name = 'Science Fiction'), 18.99, 0),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', (SELECT id FROM categories WHERE name = 'History'), 22.50, 3),
('The Hobbit', 'J.R.R. Tolkien', (SELECT id FROM categories WHERE name = 'Fantasy'), 15.99, 14),
('Thinking, Fast and Slow', 'Daniel Kahneman', (SELECT id FROM categories WHERE name = 'Psychology'), 19.99, 0),
('Meditations', 'Marcus Aurelius', (SELECT id FROM categories WHERE name = 'Philosophy'), 9.99, 8),
('The Alchemist', 'Paulo Coelho', (SELECT id FROM categories WHERE name = 'Adventure'), 12.50, 2),
('Becoming', 'Michelle Obama', (SELECT id FROM categories WHERE name = 'Biography'), 20.00, 0),
('Zero to One', 'Peter Thiel', (SELECT id FROM categories WHERE name = 'Business'), 22.00, 1),
('The Art of War', 'Sun Tzu', (SELECT id FROM categories WHERE name = 'Philosophy'), 8.50, 0);
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

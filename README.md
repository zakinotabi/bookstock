# bookstock# BookStock 📚

A simple book inventory website I built for The Odin Project's [Inventory Application](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application) lesson.

It has full CRUD (create, read, update, delete) and category filtering as a bonus. I didn't have time to add search or other filters.

**Stack:** Node.js, Express, EJS, PostgreSQL (Neon), Vercel.

## How the code is split

```
db/
  pool.js      -> connection to the database
  queries/     -> all the SQL lives here
controllers/   -> the middle man
routes/        -> maps URLs to controllers
views/         -> EJS pieces
  partials/    -> reusable EJS pieces
    scripts/   -> reusable JS events
public/
  schema.js    -> creates the tables
  css/         -> styles
```

The flow for one request:

**router -> controller -> queries -> database**, then back up: **queries -> controller -> EJS render**

---

## My experience building it

### Node + PostgreSQL was confusing at the start

The hardest part at first was understanding how Node and PostgreSQL even talk to each other. Every tutorial mixed pgAdmin, raw SQL scripts and ORMs like Prisma. That made the setup feel way more complicated than it is.
Like The controller is the middle. It takes the request from the router, asks `queries.js` for data, then hands that data to `res.render()`. The router doesn't know SQL. The queries don't know about EJS, this is the idea I was searching for how the code spilt and it flows.

I also wondered if we gonna fill the tables using UI, and that's when I discovered what `schema.js` is for.

The "invisible link" bugged me too. In the end it's just Node sending plain SQL text over the network to port 5432. `pool.js` creates a Pool, which is a reusable set of connections so the app stays fast.

Using `.env` to hide our sensitive values.

### SQL took me the longest

- A `category_id` column in `books` points to a row in `categories`. Storing the id instead of the name doesn't cost extra queries, because a `JOIN` gets both at once.
- `LEFT JOIN ... ON` matches each book to its category. `AS category_name` is just a label for the result column, not a table alias.
- Keep table names consistent inside one query. Writing `category` in one place and `categories` in another gave me the "missing FROM-clause entry" error.
- Query order: `SELECT` -> `FROM` -> `JOIN` -> `WHERE` -> `GROUP BY` -> `ORDER BY` (always last).
- A subquery inside `SELECT` must return **one value per row**.
- An **id is not an array index**. `category_id: 10` does not mean `categories[10]`. I should use `find` by id, never position.

### EJS

- Partials are for markup (`include`). I got confused using them for a plain `.js` file.
- Browser code and server code are separate. If the browser runs a file, it has to be sent to it, so a "private" script still ends up in the page.
- EJS isn't flexible. It has no real components, props, or layouts built in, and it's mostly include and plain JS in the template. It's fine for a small app like this, but I can see why people move to React or similar.

### Deploying

Neon is the database, GitHub is the code, Vercel runs the site. I had to figure out which does what. A wrong Neon password in the environment variables crashes the server, and I really like Vercel.

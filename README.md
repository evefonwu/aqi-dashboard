pnpm add postgres
pnpm add zod

https://www.npmjs.com/package/postgres

```js
// Create your sql database instance

import postgres from "postgres";
const sql = postgres({
  /* options */
}); // will use psql environment variables

// and execute sql

async function insertUser({ name, age }) {
  const users = await sql`
    insert into users
      (name, age)
    values
      (${name}, ${age})
    returning name, age
  `;
  // users = Result [{ name: "Murray", age: 68 }]
  return users;
}
```

# did i create a locations table?

```sql
-- CREATE TABLE IF NOT EXISTS users (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
-- );

CREATE TABLE IF NOT EXISTS locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  zipcode VARCHAR(255) NOT NULL,
  date DATE NOT NULL
);
```

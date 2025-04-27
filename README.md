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

# create a locations table

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

# worked on locations page and add new location

key routes implemented:

- app/locations
  page with locations listing and link to add
- app/locations/create
  page with form to add new location

organization:

app/lib/

- sql.md
  scratch pad for raw sql, eg create table via neon console
- actions.ts
  server actions that run sql to create, update, delete records from db
- queries.ts

components/locations

- create-form.tsx (react client component, form/event handling)
  shadcn for styled accessible components,
  react-hook-forms for validations,
  form action to invoke server actions
- table.tsx

# resolve error: "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted."

resolve error from missing quotes for string value "require"; not the function require

const sql = postgres(process.env.POSTGRES_URL!, { ssl: require });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

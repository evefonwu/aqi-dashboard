# Project In Progress ~

Notes/Log -

pnpm add postgres

https://www.npmjs.com/package/postgres

# worked on locations page and add new location

key routes implemented:

app/

- locations/
  page with locations listing and link to add
- locations/create/
  page with form to add new location nickname, stub location
- locations/search/
  page to work on autocomplete location search component

organization:

app/lib/

- sql.md
  scratch pad for raw sql, eg create table via neon console
- actions.ts
  server actions that run sql to create, delete records from db
- queries.ts
  run sql to retrieve data to populate table
- actions-uslocations.ts
  server action to run sql to search locations from db for autocomplete

components/locations

- create-form.tsx (react client component, form/event handling)
  shadcn for styled accessible components,
  react-hook-forms for validations,
  form action to invoke server actions
- table.tsx listing user locations
- autocomplete locations search component

scripts/

- notes.md: create table and indices for quick autocomplete location search
- seed.ts: populate db table with 40k+ records of city, state, zip

QA every step of the way:

- Code review
- Checking console.log, any errors, warnings
- Running Lighthouse, how's the Accessibility score?

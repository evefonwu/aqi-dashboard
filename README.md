# Project In Progress ~

Notes/Log -

pnpm add postgres

https://www.npmjs.com/package/postgres

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

QA every step of the way:

- Code review
- Checking console.log, any errors, warnings
- Running Lighthouse, how's the Accessibility score?

user experience:

from create-form page
add a cancel button to redirect back to table listing

this can be a dialog box?

# move onto edit the items

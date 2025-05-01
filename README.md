creating an API endpoint to fetch data from AirNow API:

- storing API environment variables server-side
- retrieving user saved locations from database
- api route will fetch air quality data for all saved locations with a Promise.all for a combined result

client-side data fetching with useSWR for caching, automatic refreshes and retries

# Project In Progress ~

Notes/Log -

# styling ui, make consistent, truncate text

styling ui, review everything, make consistent:

- put every section in a card wrapper
- be specific, add description
- add aria-label
- check layout, responsive at key breakpoints?

layouts:

- root layout: horizontally center items within, py: 10,
- navbar: fixed width 350px
- responsive page card width: w-[350px] md:w-[500px]
- corresponding fallback ui skeletons within card width limits
- data table fields: nickname w-[130px] location w-[200px]
- fix width data table fields, text truncate overflowing text

icons:

- link has arrow -> icon
- action buttons have +/- icons

# working on site navigation

nav: about page, air quality page, locations page

# worked on locations page and add new location

pnpm add postgres

https://www.npmjs.com/package/postgres

key routes implemented:

app/

- locations/
  page with locations listing and link to add
- locations/create/
  page with form to add new location with nickname
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
- definitions.ts
  type definitions

components/locations

- create-form.tsx (react client component, form/event handling)
  shadcn for styled accessible components,
  react-hook-forms for validations,
  integrated autocomplete location search for form validations,
  form action to invoke server actions
- table.tsx listing user locations
- autocomplete.tsx
  autocomplete suggests as user types city, state or zipcode

scripts/

- notes.md: create table and indices for quick autocomplete location search
- seed.ts: populate db table with 40k+ records of city, state, zip

QA every step of the way:

- Code review
- Checking console.log, any errors, warnings
- Running Lighthouse, how's the Accessibility score?

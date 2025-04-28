```sql
-- CREATE TABLE IF NOT EXISTS users (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
-- );

CREATE TABLE IF NOT EXISTS userLocations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nickname VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  zipcode VARCHAR(255) NOT NULL,
  date DATE NOT NULL
);
```

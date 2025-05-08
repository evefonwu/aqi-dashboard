```sql
--- storing elemental values city, state instead of derived 'location' value
CREATE TABLE IF NOT EXISTS user_locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nickname VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50),
  zipcode VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

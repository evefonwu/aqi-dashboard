// pnpm i dotenv

// scripts/seed.ts
import fs from "fs";
import path from "path";
import postgres from "postgres";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize postgres client
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Read the JSON file at scripts/us-citystatezip.json
    const locationsPath = path.join(
      process.cwd(),
      "scripts",
      "us-citystatezip.json"
    );
    const locationsData = JSON.parse(fs.readFileSync(locationsPath, "utf8"));

    console.log(`Found ${locationsData.length} locations to import...`);

    // Create a temporary table for bulk insertion
    await sql`
      CREATE TEMP TABLE temp_uslocations (
        zip VARCHAR(10),
        city VARCHAR(100),
        state VARCHAR(2)
      )
    `;

    // Process in batches to avoid memory issues with large files
    const batchSize = 5000;
    let processed = 0;

    for (let i = 0; i < locationsData.length; i += batchSize) {
      const batch = locationsData.slice(i, i + batchSize);

      // Prepare batch data for insertion
      const values = batch.map(
        (loc: { zip: string; city: string; state: string }) => ({
          zip: loc.zip,
          city: loc.city,
          state: loc.state,
        })
      );

      // Insert batch into temp table
      await sql`INSERT INTO temp_uslocations ${sql(values)}`;

      processed += batch.length;
      console.log(
        `Processed ${processed} of ${locationsData.length} locations...`
      );
    }

    // Insert from temp table to actual table, avoiding duplicates
    const result = await sql`
      INSERT INTO uslocations (zip, city, state)
      SELECT DISTINCT zip, city, state FROM temp_uslocations
      ON CONFLICT DO NOTHING
    `;

    console.log(
      `Successfully seeded ${result.count} unique locations into the database.`
    );

    // Drop temp table
    await sql`DROP TABLE temp_uslocations`;
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sql.end();
    console.log("Database connection closed.");
  }
}

// Run the seed function
seedDatabase();

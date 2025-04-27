import postgres from "postgres";

import { Location, LocationForm } from "./definitions";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function fetchLocations() {
  console.log("Getting locations data from database...");
  try {
    const data = await sql<Location[]>`SELECT * from locations`;
    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrieve locations data");
  }
}

export async function fetchLocationById(id: string) {
  try {
    const data = await sql<LocationForm[]>`
      SELECT 
        locations.id,
        locations.location 
      FROM locations
      WHERE locations.id = ${id}
    `;

    console.log("fetchLocationById returns:", data);
    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch location by ID.");
  }
}

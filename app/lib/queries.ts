import postgres from "postgres";

import { Location } from "./definitions";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function fetchLocations() {
  console.log("Getting user locations data from database...");
  try {
    const data = await sql<Location[]>`SELECT * from userLocations`;
    return data;
  } catch (error) {
    console.error("database error:", error);
    throw new Error("failed to retrieve user locations data");
  }
}

import postgres from "postgres";

import { Location } from "./definitions";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function queryLocations() {
  console.log("Getting locations data from database...");
  try {
    const data = await sql<Location[]>`SELECT * from locations`;
    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrieve locations data");
  }
}

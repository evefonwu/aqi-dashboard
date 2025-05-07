import postgres from "postgres";

import { UserSavedLocation } from "./definitions";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function fetchLocations() {
  // console.log("Getting user locations data from database...");

  try {
    const data = await sql<UserSavedLocation[]>`SELECT * from userLocations`;
    return data;
  } catch (error) {
    console.error("database error:", error);
    return [];
  }
}

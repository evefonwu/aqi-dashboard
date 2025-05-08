import postgres from "postgres";
import { UserLocation } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchLocations() {
  try {
    const data = await sql<UserLocation[]>`SELECT * from user_locations`;
    return data;
  } catch (error) {
    console.error("database error:", error);
    return [];
  }
}

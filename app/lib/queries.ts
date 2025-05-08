import postgres from "postgres";
import { UserLocations } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchLocations() {
  try {
    const data = await sql<UserLocations[]>`SELECT * from user_locations`;
    return data;
  } catch (error) {
    console.error("database error:", error);
    return [];
  }
}

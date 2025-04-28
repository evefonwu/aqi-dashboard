"use server";

import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type Location = {
  id: number;
  zip: string;
  city: string;
  state: string;
};

export type LocationSearchResult = {
  id: number;
  zip: string;
  city: string;
  state: string;
  label: string; // Formatted display for the autocomplete
};

/**
 * Search for locations based on user input
 * @param query The user's search query (partial city, state, or ZIP)
 * @param limit Maximum number of results to return
 */
export async function searchLocations(
  query: string,
  limit: number = 10
): Promise<LocationSearchResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    // Clean the input query
    const sanitizedQuery = query.trim();
    console.log("sanitized query", sanitizedQuery);

    // Search using the search_vector for best performance
    const locations = await sql<Location[]>`
      SELECT id, zip, city, state
      FROM uslocations
      WHERE search_vector @@ plainto_tsquery('english', ${sanitizedQuery})
      OR city ILIKE ${`%${sanitizedQuery}%`}
      OR state ILIKE ${`%${sanitizedQuery}%`}
      OR zip LIKE ${`${sanitizedQuery}%`}
      ORDER BY 
        CASE
          WHEN city ILIKE ${`${sanitizedQuery}%`} THEN 1
          WHEN zip = ${sanitizedQuery} THEN 2
          WHEN state = ${sanitizedQuery} THEN 3
          ELSE 4
        END,
        city
      LIMIT ${limit}
    `;

    // Format the results for display in the autocomplete
    return locations.map((location) => ({
      id: location.id,
      zip: location.zip,
      city: location.city,
      state: location.state,
      label: `${location.city}, ${location.state} ${location.zip}`,
    }));
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
}

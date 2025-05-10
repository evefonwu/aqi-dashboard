import { NextResponse } from "next/server";
import { UserLocation } from "@/app/lib/definitions";
import { fetchLocations } from "@/app/lib/queries";

// server-side env vars
const base = process.env.AIRNOW_BASE_URL;
const apikey = process.env.AIRNOW_API_KEY;

// fetch observed AirNow AQI data, today by zipcode
async function fetchAirQualityData(zip: string) {
  try {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const url = `${base}&zipCode=${zip}&date=${today}&distance=150&API_KEY=${apikey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`AirNow API responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data for zip ${zip}:`, error);
    return { error: `Failed to fetch data for zip ${zip}` };
  }
}

// GET endpoint to fetch air quality for all saved locations
export async function GET() {
  try {
    const locations = await fetchLocations();
    const airQualityPromises = locations.map(async (loc: UserLocation) => {
      const airQualityData = await fetchAirQualityData(loc.zipcode);
      return {
        id: loc.id,
        nickname: loc.nickname,
        city: loc.city,
        state: loc.state,
        zipcode: loc.zipcode,
        airQualityData,
      };
    });
    const results = await Promise.all(airQualityPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.error(
      "Error in fetching air quality data for saved locations:",
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch air quality data for saved locations" },
      { status: 500 }
    );
  }
}

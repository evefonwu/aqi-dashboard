// app/api/air-quality/route.ts

import { NextResponse } from "next/server";
import { fetchLocations } from "@/app/lib/queries";
import { UserSavedLocation } from "@/app/lib/definitions";

// server-side env vars
const base = process.env.AIRNOW_BASE_URL;
const apikey = process.env.AIRNOW_API_KEY;

const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

function getAirNowUrl(zip: string) {
  // construct API URL for observed AirNow AQI data, today by zipcode
  const url = `${base}&zipCode=${zip}&date=${today}&distance=150&API_KEY=${apikey}`;
  return url;
}

async function fetchAirQualityData(zip: string) {
  try {
    const response = await fetch(getAirNowUrl(zip));
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
    // retrieve all saved locations from db
    const locations = await fetchLocations();

    if (!locations || locations.length === 0) {
      return NextResponse.json(
        { message: "No saved locations found" },
        { status: 404 }
      );
    }

    // multiple requests in parallel
    const airQualityPromises = locations.map(async (loc: UserSavedLocation) => {
      const airQualityData = await fetchAirQualityData(loc.zipcode);
      return {
        id: loc.id,
        nickname: loc.nickname,
        location: loc.location,
        zipcode: loc.zipcode,
        airQualityData,
      };
    });
    const results = await Promise.all(airQualityPromises);

    // return combined results
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in air quality API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch air quality data for saved locations" },
      { status: 500 }
    );
  }
}

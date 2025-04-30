// API endpoint

import { NextRequest, NextResponse } from "next/server";

// server-side env vars
const base = process.env.AIRNOW_BASE_URL;
const apikey = process.env.AIRNOW_API_KEY;

const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

function getAirNowUrl(zip: string) {
  // construct API URL for observed AirNow AQI data, today by zipcode
  const url = `${base}&zipCode=${zip}&date=${today}&distance=150&API_KEY=${apikey}`;
  return url;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const zip = searchParams.get("zip");

  if (!zip) {
    return NextResponse.json(
      { error: "Zip code is required" },
      { status: 400 }
    );
  }

  try {
    const url = getAirNowUrl(zip);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`AirNow API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch air quality data" },
      { status: 500 }
    );
  }
}

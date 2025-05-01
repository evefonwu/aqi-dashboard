"use client";

import { SWRConfig } from "swr";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, XCircle } from "lucide-react";

// Define types
interface AirQualityReading {
  DateObserved: string;
  HourObserved: number;
  LocalTimeZone: string;
  ReportingArea: string;
  StateCode: string;
  Latitude: number;
  Longitude: number;
  ParameterName: string;
  AQI: number;
  Category: {
    Number: number;
    Name: string;
  };
}

interface LocationAirQualityData {
  id: number;
  location: string;
  zipcode: string;
  airQualityData: AirQualityReading[] | { error: string };
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

// Helper function to convert hour to 12-hour format with AM/PM
function formatHour(hour: number, timezone: string): string {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${formattedHour}:00 ${period} ${timezone}`;
}

// Find the reading with highest AQI value from an array of readings
function getHighestAQIReading(
  readings: AirQualityReading[]
): AirQualityReading | null {
  if (!readings || readings.length === 0) return null;

  return readings.reduce((highest, current) => {
    return current.AQI > highest.AQI ? current : highest;
  }, readings[0]);
}

// Import or define color utility functions
export const getColor = (level: number) => {
  switch (level) {
    case 1:
      return "bg-[#00E400]";
    case 2:
      return "bg-[#FFFF00]";
    case 3:
      return "bg-[#FF7E00]";
    case 4:
      return "bg-[#FF0000]";
    case 5:
      return "bg-[#99004C]";
    case 6:
      return "bg-[#7E0023]";
    default:
      return "bg-gray-300";
  }
};

export const levels = [
  { level: 1, category: "Good", range: "0-50", color: getColor(1) },
  { level: 2, category: "Moderate", range: "51-100", color: getColor(2) },
  {
    level: 3,
    category: "Unhealthy for Sensitive Groups",
    range: "101-150",
    color: getColor(3),
  },
  { level: 4, category: "Unhealthy", range: "151-200", color: getColor(4) },
  {
    level: 5,
    category: "Very Unhealthy",
    range: "201-300",
    color: getColor(5),
  },
  { level: 6, category: "Hazardous", range: "301-500", color: getColor(6) },
];

// Function to get appropriate AQI level from AQI value
function getAQILevel(aqi: number): number {
  if (aqi <= 50) return 1;
  if (aqi <= 100) return 2;
  if (aqi <= 150) return 3;
  if (aqi <= 200) return 4;
  if (aqi <= 300) return 5;
  return 6;
}

// Component for Air Quality data display
function AirQualityDisplay() {
  // Use SWR hook to fetch data
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    LocationAirQualityData[]
  >("/api/air-quality", fetcher, {
    refreshInterval: 3 * 60 * 60 * 1000, // Refresh every 3 hours
    dedupingInterval: 5000, // Deduplicate requests within 5 seconds
    revalidateOnFocus: true, // Revalidate when window gets focus
    revalidateOnReconnect: true, // Revalidate when browser regains connection
  });

  // Function to manually refresh data
  const refreshData = () => {
    mutate();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="space-y-4 w-full max-w-6xl">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="mb-4 max-w-6xl mx-auto border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700">Error: {error.message}</span>
            </div>
            <Button
              variant="outline"
              onClick={refreshData}
              size="sm"
              className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <Card className="max-w-6xl mx-auto">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            No saved locations found. Add locations to see air quality data.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Prepare table data - filter out locations with errors or no data
  const tableData = data
    .map((loc) => {
      // Skip locations with error data
      if ("error" in loc.airQualityData) {
        return null;
      }

      // Skip locations with empty data
      if (
        Array.isArray(loc.airQualityData) &&
        loc.airQualityData.length === 0
      ) {
        return null;
      }

      // Get the highest AQI reading
      const highestReading = getHighestAQIReading(
        loc.airQualityData as AirQualityReading[]
      );
      if (!highestReading) {
        return null;
      }

      return {
        location: loc.location,
        zipcode: loc.zipcode,
        reading: highestReading,
      };
    })
    .filter(Boolean); // Remove null entries

  // Data loaded state - table format
  return (
    <div className="grid gap-8">
      <Table>
        <TableCaption>
          Showing highest AQI readings for each location. Air quality data
          automatically refreshes every 3 hours.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">AQI</TableHead>
            <TableHead className="w-[80px] text-center"></TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-6 text-muted-foreground"
              >
                No valid air quality data available
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item, index) => {
              const reading = item!.reading;
              const aqiLevel = getAQILevel(reading.AQI);
              return (
                <TableRow key={`${item!.location}-${index}`}>
                  <TableCell className="text-center">
                    <div
                      className={`h-3 w-3 sm:h-6 sm:w-6 rounded-full mx-auto ${getColor(
                        aqiLevel
                      )}`}
                    ></div>
                  </TableCell>
                  <TableCell className="text-center font-medium text-lg">
                    {reading.AQI}
                    <div className="mt-1 text-xs text-muted-foreground">
                      {levels.find((level) => level.level === aqiLevel)
                        ?.category || reading.Category.Name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">
                        {item!.location} ({reading.ParameterName})
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {formatHour(
                          reading.HourObserved,
                          reading.LocalTimeZone
                        )}{" "}
                        {reading.DateObserved}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <div className="">
        <Button
          onClick={refreshData}
          disabled={isValidating}
          className="flex items-center"
        >
          {isValidating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {isValidating && !isLoading && (
        <div className="mb-2 text-sm text-muted-foreground flex items-center">
          <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
          <span>Updating data in background...</span>
        </div>
      )}
    </div>
  );
}

// SWR Provider wrapper component
export default function Dashboard() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        errorRetryCount: 3,
      }}
    >
      <AirQualityDisplay />
    </SWRConfig>
  );
}

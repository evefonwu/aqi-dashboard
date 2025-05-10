"use client";

import useSWR, { SWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/skeletons";
import {
  formatHour,
  truncateName,
  truncateLocation,
  getAQILevel,
  getAQIColor,
} from "./utils";

import { RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AirQualityReading, LocationAirQualityData } from "./definitions";

function getHighestAQIReading(
  readings: AirQualityReading[]
): AirQualityReading | null {
  if (!readings || readings.length === 0) return null;

  return readings.reduce((highest, current) => {
    return current.AQI > highest.AQI ? current : highest;
  }, readings[0]);
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch air quality data: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
};

const swrKey = "/api/air-quality";

function AirQualityDisplay() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    LocationAirQualityData[]
  >(swrKey, fetcher);

  function refreshData() {
    mutate();
  }

  if (isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-center py-6 text-muted-foreground">
            Error: Failed to retrieve data.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={refreshData}
          aria-label="Try again to load air quality dashboard data"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-center py-6 text-muted-foreground">
        To add your locations, go to the Locations page.
      </p>
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

      // Get the highest AQI reading of multiple categories,
      // eg. Ozone, PM2.5
      const highestReading = getHighestAQIReading(
        loc.airQualityData as AirQualityReading[]
      );
      if (!highestReading) {
        return null;
      }

      return {
        nickname: loc.nickname,
        city: loc.city,
        state: loc.state,
        zipcode: loc.zipcode,
        reading: highestReading,
      };
    })
    .filter(Boolean); // Remove null entries

  // Data loaded state - table format
  return (
    <div className="grid gap-8">
      <Table>
        {/* <TableCaption>
          Showing highest AQI reading of multiple categories (eg Ozone, PM2.5)
        </TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">AQI</TableHead>
            <TableHead className="w-[130px] text-center"></TableHead>
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
                <TableRow key={`${item!.zipcode}-${index}`}>
                  <TableCell className="text-center">
                    <div
                      className={`h-6 w-6 rounded-full mx-auto ${getAQIColor(
                        aqiLevel
                      )}`}
                    ></div>
                  </TableCell>
                  <TableCell className="text-center font-medium text-lg">
                    {reading.AQI}
                    <div className="mt-1 text-xs text-muted-foreground">
                      <p className="text-wrap">{reading.Category.Name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">
                        {truncateName(item!.nickname)} in{" "}
                        {truncateLocation(item!.city)}
                        {/* ({reading.ParameterName}) */}
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

      <div>
        <Button
          onClick={refreshData}
          variant="outline"
          disabled={isValidating}
          aria-label="Refresh air quality dashboard data"
        >
          {isValidating ? (
            <>
              <span>Refresh Data</span>
              <RefreshCw className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Refresh Data</span>
              <RefreshCw className="h-4 w-4" />
            </>
          )}
        </Button>
        {isValidating && !isLoading && (
          <div className="mb-2 text-sm text-muted-foreground flex items-center">
            <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
            <span>Refreshing data...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3 * 60 * 60 * 1000, // refresh every 3hrs
        dedupingInterval: 5 * 1000, // dedup requests within 5s
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

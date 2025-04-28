"use client";

import { useState } from "react";
import { LocationAutocomplete } from "@/components/locations/autocomplete";
import { LocationSearchResult } from "@/app/lib/actions-uslocations";

export default function Page() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResult | null>(null);

  const handleLocationSelect = (location: LocationSearchResult | null) => {
    setSelectedLocation(location);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl mb-8 text-center">Location Search</h1>
      <div className="max-w-md mx-auto">
        <LocationAutocomplete
          onLocationSelect={handleLocationSelect}
          className="w-full"
        />
        {selectedLocation && (
          <div className="mt-6 p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Selected Location:</h3>
            <p>
              City:{" "}
              <span className="font-semibold">{selectedLocation.city}</span>
            </p>
            <p>
              State:{" "}
              <span className="font-semibold">{selectedLocation.state}</span>
            </p>
            <p>
              ZIP: <span className="font-semibold">{selectedLocation.zip}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

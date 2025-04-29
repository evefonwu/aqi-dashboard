"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useDebounce } from "@/components/hooks/useDebounce";
import { searchLocations } from "@/app/lib/actions-uslocations";
import { LocationSearchResult } from "@/app/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationAutocompleteProps {
  onLocationSelect?: (location: LocationSearchResult | null) => void;
  placeholder?: string;
  className?: string;
}

export function LocationAutocomplete({
  onLocationSelect,
  placeholder = "Enter city, state or ZIP code",
  className,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<LocationSearchResult[]>([]);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResult | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedQuery.length < 2) {
        setLocations([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchLocations(debouncedQuery);
        setLocations(results);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedQuery]);

  const handleSelect = (location: LocationSearchResult) => {
    setQuery(location.label);
    setSelectedLocation(location);
    // reset
    setLocations([]);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  return (
    <Command className={cn("rounded-md border shadow-md", className)}>
      <CommandInput
        placeholder={placeholder}
        value={query}
        onValueChange={setQuery}
      />
      <CommandEmpty></CommandEmpty>
      {loading ? (
        <div className="p-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full mt-2" />
          <Skeleton className="h-8 w-full mt-2" />
        </div>
      ) : (
        <CommandGroup heading="Suggestions">
          {locations.map((location) => (
            <CommandItem
              key={location.id}
              value={location.label}
              onSelect={() => handleSelect(location)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedLocation?.id === location.id
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              {location.label}
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </Command>
  );
}

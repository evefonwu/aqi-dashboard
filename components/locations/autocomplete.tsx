"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/components/hooks/useDebounce";
import { LocationSearchResult } from "@/app/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import { searchLocations } from "@/app/lib/actions-uslocations";

export function LocationAutocomplete({
  onLocationSelect,
}: {
  onLocationSelect: (location: LocationSearchResult | null) => void;
}) {
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResult | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchLocations(debouncedQuery);
        setSuggestions(results);
        setOpen(results.length > 0);
      } catch (error) {
        console.error("Failed to retrieve locations for autocomplete:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedQuery]);

  const handleSelect = (value: string) => {
    const location = suggestions.find((item) => item.label === value);
    if (location) {
      setQuery(location.label);
      setSelectedLocation(location);
      setSuggestions([]);
      onLocationSelect(location);
      setOpen(false);
    }
  };

  return (
    <Command className="rounded-md border shadow-md">
      <CommandInput
        placeholder="Enter city, state or ZIP code"
        value={query}
        onValueChange={setQuery}
      />
      {open && (
        <CommandList>
          {loading ? (
            <div className="p-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full mt-2" />
              <Skeleton className="h-8 w-full mt-2" />
            </div>
          ) : (
            <CommandGroup heading="Suggestions">
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.id}
                  value={suggestion.label}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation?.id === suggestion.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {suggestion.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
}

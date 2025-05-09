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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResult | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedSearchTerm.length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchLocations(debouncedSearchTerm);
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
  }, [debouncedSearchTerm]);

  const handleSelect = (value: string) => {
    const location = suggestions.find((item) => item.label === value);
    if (location) {
      setSearchTerm(location.label);
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
        value={searchTerm}
        onValueChange={setSearchTerm}
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

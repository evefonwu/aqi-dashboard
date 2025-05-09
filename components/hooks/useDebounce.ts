import { useEffect, useState } from "react";

/**
 * A custom hook that debounces a value
 * @param value The value to debounce (eg search term as user types)
 * @param delay The delay in milliseconds, default to 300ms
 * @returns The debounced value (eg debounced search term to fetch data with)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after specified delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes or component unmounts
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

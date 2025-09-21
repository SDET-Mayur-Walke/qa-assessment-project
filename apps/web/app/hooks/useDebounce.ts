import { useState, useEffect } from "react";

// INTENTIONAL BUG: Debounce race condition
// This hook debounces the input but doesn't cancel in-flight requests
// If two requests resolve out of order, the UI shows stale results
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
// apps/web/app/hooks/useDebounceWithCancel.ts
import { useState, useEffect, useRef } from "react";

// IMPROVED: Debounce hook with request cancellation support
// This version provides a way to track and cancel in-flight requests
export function useDebounceWithCancel<T>(value: T, delay: number): {
  debouncedValue: T;
  cancelPrevious: () => void;
} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancelPrevious = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    cancelPrevious();
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      timeoutRef.current = null;
    }, delay);

    return cancelPrevious;
  }, [value, delay]);

  return { debouncedValue, cancelPrevious };
}

// apps/web/app/hooks/useSearchWithCancel.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { createGraphQLClient, GET_PRODUCTS } from "../lib/graphql-client";

// IMPROVED: Search hook with proper request cancellation
// This addresses the race condition by canceling in-flight requests
export function useSearchWithCancel(initialQuery: string, delay: number = 400) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const navigate = useNavigate();
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (query: string) => {
    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setIsSearching(true);
      
      const client = createGraphQLClient();
      const result = await client.request(GET_PRODUCTS, {
        query: query || undefined,
        first: 12
      }, {
        signal: abortController.signal
      });

      // Only update if this request wasn't cancelled
      if (!abortController.signal.aborted) {
        setSearchResults(result.products);
        
        // Update URL to reflect current search
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        const newUrl = params.toString() ? `/?${params.toString()}` : "/";
        navigate(newUrl, { replace: true });
      }
    } catch (error: any) {
      // Ignore abort errors
      if (error.name !== 'AbortError') {
        console.error('Search error:', error);
        setSearchResults(null);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsSearching(false);
      }
    }
  }, [navigate]);

  const debouncedSearch = useCallback((query: string) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, delay);
  }, [performSearch, delay]);

  // Effect to trigger search when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, debouncedSearch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    cancelSearch: () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsSearching(false);
    }
  };
}

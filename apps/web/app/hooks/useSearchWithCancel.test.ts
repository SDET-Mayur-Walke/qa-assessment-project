// apps/web/app/hooks/useSearchWithCancel.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchWithCancel } from './useSearchWithCancel';

// Mock the GraphQL client and navigation
vi.mock('../lib/graphql-client', () => ({
  createGraphQLClient: vi.fn(() => ({
    request: vi.fn().mockResolvedValue({ products: [] })
  })),
  GET_PRODUCTS: 'mock-query'
}));

vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn(() => vi.fn())
}));

describe('useSearchWithCancel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle search state correctly', async () => {
    const { result } = renderHook(() => 
      useSearchWithCancel('', 100)
    );

    // Initial state
    expect(result.current.searchQuery).toBe('');
    expect(result.current.isSearching).toBe(false);
    expect(result.current.searchResults).toBe(null);

    // Set search query
    act(() => {
      result.current.setSearchQuery('coffee');
    });

    expect(result.current.searchQuery).toBe('coffee');
  });

  it('should handle search cancellation properly', async () => {
    const { result } = renderHook(() => 
      useSearchWithCancel('', 100)
    );

    // Start search
    act(() => {
      result.current.setSearchQuery('coffee');
    });

    // Cancel search
    act(() => {
      result.current.cancelSearch();
    });

    expect(result.current.isSearching).toBe(false);
  });
});

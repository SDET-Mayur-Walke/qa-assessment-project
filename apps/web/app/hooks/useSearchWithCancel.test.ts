// apps/web/app/hooks/useSearchWithCancel.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchWithCancel } from './useSearchWithCancel';

// Mock the GraphQL client and navigation
vi.mock('../lib/graphql-client', () => ({
  createGraphQLClient: vi.fn(() => ({
    request: vi.fn()
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

  it('should cancel previous requests when new search is initiated', async () => {
    const mockRequest = vi.fn();
    const mockNavigate = vi.fn();
    
    // Mock the GraphQL client
    const { createGraphQLClient } = await import('../lib/graphql-client');
    vi.mocked(createGraphQLClient).mockReturnValue({
      request: mockRequest
    });
    
    const { useNavigate } = await import('@remix-run/react');
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    // Mock AbortController
    const mockAbort = vi.fn();
    global.AbortController = vi.fn(() => ({
      abort: mockAbort,
      signal: { aborted: false }
    })) as any;

    const { result } = renderHook(() => 
      useSearchWithCancel('', 100)
    );

    // Trigger first search
    act(() => {
      result.current.setSearchQuery('coffee');
    });

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 50));

    // Trigger second search quickly (should cancel first)
    act(() => {
      result.current.setSearchQuery('tea');
    });

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 150));

    // Verify that abort was called (indicating request cancellation)
    expect(mockAbort).toHaveBeenCalled();
  });

  it('should handle search cancellation properly', async () => {
    const mockRequest = vi.fn();
    const mockNavigate = vi.fn();
    
    const { createGraphQLClient } = await import('../lib/graphql-client');
    vi.mocked(createGraphQLClient).mockReturnValue({
      request: mockRequest
    });
    
    const { useNavigate } = await import('@remix-run/react');
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    const mockAbort = vi.fn();
    global.AbortController = vi.fn(() => ({
      abort: mockAbort,
      signal: { aborted: false }
    })) as any;

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

    expect(mockAbort).toHaveBeenCalled();
    expect(result.current.isSearching).toBe(false);
  });
});

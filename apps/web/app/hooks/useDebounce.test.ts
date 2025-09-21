// apps/web/app/hooks/useDebounce.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce Hook', () => {
  // Test 1: Returns initial value immediately
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  // Test 2: Debounces value changes
  it('should debounce value changes by specified delay', async () => {
    vi.useFakeTimers();
    
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change value
    rerender({ value: 'updated', delay: 500 });
    
    // Should still be initial value immediately
    expect(result.current).toBe('initial');
    
    // Fast forward time by 499ms - should still be initial
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial');
    
    // Fast forward by 1ms more - should now be updated
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
    
    vi.useRealTimers();
  });

  // Test 3: Clears previous timeout when value changes rapidly
  it('should clear previous timeout when value changes rapidly', async () => {
    vi.useFakeTimers();
    
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change value multiple times rapidly
    rerender({ value: 'first', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'second', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'final', delay: 500 });
    
    // Should still be initial value
    expect(result.current).toBe('initial');
    
    // Advance time by 500ms from last change
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Should be the final value, not intermediate values
    expect(result.current).toBe('final');
    
    vi.useRealTimers();
  });

  // Test 4: Works with different data types
  it('should work with different data types', () => {
    // Test with number
    const { result: numberResult } = renderHook(() => useDebounce(42, 100));
    expect(numberResult.current).toBe(42);

    // Test with object
    const obj = { id: 1, name: 'test' };
    const { result: objResult } = renderHook(() => useDebounce(obj, 100));
    expect(objResult.current).toBe(obj);

    // Test with array
    const arr = [1, 2, 3];
    const { result: arrResult } = renderHook(() => useDebounce(arr, 100));
    expect(arrResult.current).toBe(arr);
  });

  // Test 5: Cleans up timeout on unmount
  it('should clean up timeout when component unmounts', () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change value to trigger timeout
    rerender({ value: 'updated', delay: 500 });
    
    // Unmount before timeout completes
    unmount();
    
    // Should have called clearTimeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    vi.useRealTimers();
    clearTimeoutSpy.mockRestore();
  });
});

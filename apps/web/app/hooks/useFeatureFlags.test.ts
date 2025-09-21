// apps/web/app/hooks/useFeatureFlags.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFeatureFlags } from './useFeatureFlags';

describe('useFeatureFlags Hook', () => {
  // Test 1: Returns empty flags object initially
  it('should return empty flags object initially', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    expect(result.current.flags).toEqual({});
    expect(typeof result.current.setFlag).toBe('function');
    expect(typeof result.current.toggleFlag).toBe('function');
    expect(typeof result.current.clearFlags).toBe('function');
  });

  // Test 2: Sets flag correctly
  it('should set flag to specified value', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    act(() => {
      result.current.setFlag('FEATURE_NEW_CART', true);
    });
    
    expect(result.current.flags).toEqual({
      'FEATURE_NEW_CART': true
    });
  });

  // Test 3: Toggles flag value
  it('should toggle flag value', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    // Set initial flag
    act(() => {
      result.current.setFlag('BUG_DEBOUNCE_RACE', false);
    });
    
    expect(result.current.flags).toEqual({
      'BUG_DEBOUNCE_RACE': false
    });
    
    // Toggle the flag
    act(() => {
      result.current.toggleFlag('BUG_DEBOUNCE_RACE');
    });
    
    expect(result.current.flags).toEqual({
      'BUG_DEBOUNCE_RACE': true
    });
    
    // Toggle again
    act(() => {
      result.current.toggleFlag('BUG_DEBOUNCE_RACE');
    });
    
    expect(result.current.flags).toEqual({
      'BUG_DEBOUNCE_RACE': false
    });
  });

  // Test 4: Toggles undefined flag to true
  it('should toggle undefined flag to true', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    act(() => {
      result.current.toggleFlag('NEW_FEATURE');
    });
    
    expect(result.current.flags).toEqual({
      'NEW_FEATURE': true
    });
  });

  // Test 5: Clears all flags
  it('should clear all flags', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    // Set multiple flags
    act(() => {
      result.current.setFlag('FEATURE_A', true);
      result.current.setFlag('FEATURE_B', false);
      result.current.setFlag('FEATURE_C', true);
    });
    
    expect(result.current.flags).toEqual({
      'FEATURE_A': true,
      'FEATURE_B': false,
      'FEATURE_C': true
    });
    
    // Clear all flags
    act(() => {
      result.current.clearFlags();
    });
    
    expect(result.current.flags).toEqual({});
  });

  // Test 6: Maintains multiple flags independently
  it('should maintain multiple flags independently', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    act(() => {
      result.current.setFlag('FEATURE_A', true);
      result.current.setFlag('FEATURE_B', false);
    });
    
    expect(result.current.flags).toEqual({
      'FEATURE_A': true,
      'FEATURE_B': false
    });
    
    // Update one flag without affecting others
    act(() => {
      result.current.setFlag('FEATURE_A', false);
    });
    
    expect(result.current.flags).toEqual({
      'FEATURE_A': false,
      'FEATURE_B': false
    });
    
    // Toggle one flag without affecting others
    act(() => {
      result.current.toggleFlag('FEATURE_B');
    });
    
    expect(result.current.flags).toEqual({
      'FEATURE_A': false,
      'FEATURE_B': true
    });
  });

  // Test 7: Overwrites existing flag values
  it('should overwrite existing flag values when setting', () => {
    const { result } = renderHook(() => useFeatureFlags());
    
    act(() => {
      result.current.setFlag('TEST_FLAG', true);
    });
    
    expect(result.current.flags.TEST_FLAG).toBe(true);
    
    act(() => {
      result.current.setFlag('TEST_FLAG', false);
    });
    
    expect(result.current.flags.TEST_FLAG).toBe(false);
  });
});

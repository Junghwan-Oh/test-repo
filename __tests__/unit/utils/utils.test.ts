import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, getCharacteristicEmoji, getCharacteristicLabel } from '@/lib/utils';

describe('cn()', () => {
  // 기본 동작 테스트
  it('should merge class names correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('should handle conditional classes', () => {
    expect(cn('px-2', false && 'py-1')).toBe('px-2');
    expect(cn('px-2', true && 'py-1')).toBe('px-2 py-1');
  });

  it('should remove duplicate classes', () => {
    expect(cn('px-2', 'px-2')).toBe('px-2');
  });

  it('should handle Tailwind conflicts (last one wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  // Edge cases
  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  it('should handle undefined values', () => {
    expect(cn(undefined)).toBe('');
    expect(cn('px-2', undefined, 'py-1')).toBe('px-2 py-1');
  });

  it('should handle null values', () => {
    expect(cn(null)).toBe('');
    expect(cn('px-2', null, 'py-1')).toBe('px-2 py-1');
  });

  it('should handle array of classes', () => {
    expect(cn(['px-2', 'py-1'])).toBe('px-2 py-1');
    expect(cn(['px-2'], 'py-1')).toBe('px-2 py-1');
  });

  it('should handle object with boolean values', () => {
    expect(cn({ 'px-2': true, 'py-1': false })).toBe('px-2');
    expect(cn({ 'px-2': true, 'py-1': true })).toBe('px-2 py-1');
  });
});

describe('formatCurrency()', () => {
  // 정상 케이스
  it('should format positive integer correctly', () => {
    expect(formatCurrency(1000)).toBe('₩1,000');
  });

  it('should format large numbers with commas', () => {
    expect(formatCurrency(1000000)).toBe('₩1,000,000');
    expect(formatCurrency(999999999)).toBe('₩999,999,999');
  });

  it('should include currency symbol (₩)', () => {
    expect(formatCurrency(500)).toBe('₩500');
    expect(formatCurrency(500).startsWith('₩')).toBe(true);
  });

  // Edge cases
  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('₩0');
  });

  it('should handle negative numbers', () => {
    expect(formatCurrency(-1000)).toBe('-₩1,000');
  });

  it('should round decimal numbers', () => {
    expect(formatCurrency(1000.99)).toBe('₩1,001');
    expect(formatCurrency(1000.49)).toBe('₩1,000');
    expect(formatCurrency(1000.5)).toBe('₩1,001');
  });

  it('should handle very large numbers', () => {
    expect(formatCurrency(999999999)).toBe('₩999,999,999');
  });

  it('should handle very small numbers', () => {
    expect(formatCurrency(1)).toBe('₩1');
  });
});

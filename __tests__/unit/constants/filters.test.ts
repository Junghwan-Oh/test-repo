/**
 * Unit Tests: constants/filters.ts
 *
 * Test Coverage:
 * - BUDGET_OPTIONS - validates budget filter options
 * - REGION_OPTIONS - validates region filter options
 * - ENVIRONMENT_OPTIONS - validates environment filter options
 * - SEASON_OPTIONS - validates season filter options
 *
 * Total: 8 tests
 */

import { describe, it, expect } from 'vitest';
import {
  BUDGET_OPTIONS,
  REGION_OPTIONS,
  ENVIRONMENT_OPTIONS,
  SEASON_OPTIONS,
} from '@/constants/filters';

describe('BUDGET_OPTIONS', () => {
  it('should contain exactly 3 options', () => {
    expect(BUDGET_OPTIONS).toHaveLength(3);
  });

  it('should include all budget ranges', () => {
    expect(BUDGET_OPTIONS).toContain('100만원 미만');
    expect(BUDGET_OPTIONS).toContain('100~200만원');
    expect(BUDGET_OPTIONS).toContain('200만원 이상');

    // Verify exact order
    expect(BUDGET_OPTIONS[0]).toBe('100만원 미만');
    expect(BUDGET_OPTIONS[1]).toBe('100~200만원');
    expect(BUDGET_OPTIONS[2]).toBe('200만원 이상');
  });
});

describe('REGION_OPTIONS', () => {
  it('should contain exactly 7 options', () => {
    expect(REGION_OPTIONS).toHaveLength(7);
  });

  it('should include all regions with "전체" first', () => {
    // Check if all regions are present
    expect(REGION_OPTIONS).toContain('전체');
    expect(REGION_OPTIONS).toContain('수도권');
    expect(REGION_OPTIONS).toContain('경상도');
    expect(REGION_OPTIONS).toContain('전라도');
    expect(REGION_OPTIONS).toContain('강원도');
    expect(REGION_OPTIONS).toContain('제주도');
    expect(REGION_OPTIONS).toContain('충청도');

    // Verify "전체" is first
    expect(REGION_OPTIONS[0]).toBe('전체');

    // Verify exact order
    expect(REGION_OPTIONS).toEqual([
      '전체',
      '수도권',
      '경상도',
      '전라도',
      '강원도',
      '제주도',
      '충청도',
    ]);
  });
});

describe('ENVIRONMENT_OPTIONS', () => {
  it('should contain exactly 4 options', () => {
    expect(ENVIRONMENT_OPTIONS).toHaveLength(4);
  });

  it('should include all environment types', () => {
    expect(ENVIRONMENT_OPTIONS).toContain('자연친화');
    expect(ENVIRONMENT_OPTIONS).toContain('도심선호');
    expect(ENVIRONMENT_OPTIONS).toContain('카페작업');
    expect(ENVIRONMENT_OPTIONS).toContain('코워킹 필수');

    // Verify exact order
    expect(ENVIRONMENT_OPTIONS[0]).toBe('자연친화');
    expect(ENVIRONMENT_OPTIONS[1]).toBe('도심선호');
    expect(ENVIRONMENT_OPTIONS[2]).toBe('카페작업');
    expect(ENVIRONMENT_OPTIONS[3]).toBe('코워킹 필수');
  });
});

describe('SEASON_OPTIONS', () => {
  it('should contain exactly 4 options', () => {
    expect(SEASON_OPTIONS).toHaveLength(4);
  });

  it('should include all seasons in order', () => {
    expect(SEASON_OPTIONS).toContain('봄');
    expect(SEASON_OPTIONS).toContain('여름');
    expect(SEASON_OPTIONS).toContain('가을');
    expect(SEASON_OPTIONS).toContain('겨울');

    // Verify seasonal order (Spring → Summer → Fall → Winter)
    expect(SEASON_OPTIONS[0]).toBe('봄');
    expect(SEASON_OPTIONS[1]).toBe('여름');
    expect(SEASON_OPTIONS[2]).toBe('가을');
    expect(SEASON_OPTIONS[3]).toBe('겨울');

    // Verify exact array
    expect(SEASON_OPTIONS).toEqual(['봄', '여름', '가을', '겨울']);
  });
});

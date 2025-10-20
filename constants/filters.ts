/**
 * 필터 시스템 상수 정의
 * Phase 2: 각 필터별 옵션 배열 및 상수 값
 */

import { BudgetType, RegionType, EnvironmentType, SeasonType } from '@/types/filters';

/**
 * 예산 필터 옵션 배열
 */
export const BUDGET_OPTIONS = [
  '100만원 미만',
  '100~200만원',
  '200만원 이상',
] as const satisfies readonly BudgetType[];

/**
 * 지역 필터 옵션 배열
 */
export const REGION_OPTIONS = [
  '전체',
  '수도권',
  '경상도',
  '전라도',
  '강원도',
  '제주도',
  '충청도',
] as const satisfies readonly RegionType[];

/**
 * 환경 필터 옵션 배열
 */
export const ENVIRONMENT_OPTIONS = [
  '자연친화',
  '도심선호',
  '카페작업',
  '코워킹 필수',
] as const satisfies readonly EnvironmentType[];

/**
 * 최고계절 필터 옵션 배열
 */
export const SEASON_OPTIONS = [
  '봄',
  '여름',
  '가을',
  '겨울',
] as const satisfies readonly SeasonType[];

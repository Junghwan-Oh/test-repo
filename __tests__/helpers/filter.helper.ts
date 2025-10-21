import { Page } from '@playwright/test';

/**
 * Filter Helper
 * 필터 조작 관련 헬퍼 함수
 */

/**
 * 예산 필터 선택
 */
export async function selectBudgetFilter(page: Page, value: string): Promise<void> {
  const budgetSelect = page.locator('select').nth(0);
  await budgetSelect.selectOption(value);
  await page.waitForTimeout(500); // 필터링 애니메이션 대기
}

/**
 * 지역 필터 선택
 */
export async function selectRegionFilter(page: Page, value: string): Promise<void> {
  const regionSelect = page.locator('select').nth(1);
  await regionSelect.selectOption(value);
  await page.waitForTimeout(500);
}

/**
 * 환경 필터 선택
 */
export async function selectEnvironmentFilter(page: Page, value: string): Promise<void> {
  const environmentSelect = page.locator('select').nth(2);
  await environmentSelect.selectOption(value);
  await page.waitForTimeout(500);
}

/**
 * 계절 필터 선택
 */
export async function selectSeasonFilter(page: Page, value: string): Promise<void> {
  const seasonSelect = page.locator('select').nth(3);
  await seasonSelect.selectOption(value);
  await page.waitForTimeout(500);
}

/**
 * 모든 필터 초기화
 */
export async function resetAllFilters(page: Page): Promise<void> {
  const resetButton = page.getByRole('button', { name: /초기화/i });
  await resetButton.click();
  await page.waitForTimeout(500);
}

/**
 * 활성 필터 개수 조회
 */
export async function getActiveFilterCount(page: Page): Promise<number> {
  const countElement = page.locator('[data-testid="active-filter-count"]').first();
  const text = await countElement.textContent();
  const match = text?.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/**
 * 현재 선택된 예산 필터 값 조회
 */
export async function getSelectedBudget(page: Page): Promise<string> {
  const budgetSelect = page.locator('select').nth(0);
  return (await budgetSelect.inputValue()) || '';
}

/**
 * 현재 선택된 지역 필터 값 조회
 */
export async function getSelectedRegion(page: Page): Promise<string> {
  const regionSelect = page.locator('select').nth(1);
  return (await regionSelect.inputValue()) || '';
}

/**
 * 현재 선택된 환경 필터 값 조회
 */
export async function getSelectedEnvironment(page: Page): Promise<string> {
  const environmentSelect = page.locator('select').nth(2);
  return (await environmentSelect.inputValue()) || '';
}

/**
 * 현재 선택된 계절 필터 값 조회
 */
export async function getSelectedSeason(page: Page): Promise<string> {
  const seasonSelect = page.locator('select').nth(3);
  return (await seasonSelect.inputValue()) || '';
}

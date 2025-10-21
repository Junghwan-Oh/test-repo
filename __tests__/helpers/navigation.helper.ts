import { Page } from '@playwright/test';

/**
 * Navigation Helper
 * 페이지 네비게이션 관련 헬퍼 함수
 */

/**
 * 홈페이지로 이동
 */
export async function goToHomePage(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

/**
 * 도시 상세 페이지로 이동
 */
export async function goToCityDetail(page: Page, cityId: string): Promise<void> {
  await page.goto(`/cities/${cityId}`);
  await page.waitForLoadState('networkidle');
}

/**
 * 관련 도시 카드 클릭
 */
export async function clickRelatedCity(page: Page, index: number): Promise<void> {
  await page.locator('[data-testid="related-city-card"]').nth(index).click();
  await page.waitForLoadState('networkidle');
}

/**
 * 뒤로 가기
 */
export async function navigateBack(page: Page): Promise<void> {
  await page.goBack();
  await page.waitForLoadState('networkidle');
}

/**
 * 앞으로 가기
 */
export async function navigateForward(page: Page): Promise<void> {
  await page.goForward();
  await page.waitForLoadState('networkidle');
}

/**
 * 페이지 새로고침
 */
export async function refreshPage(page: Page): Promise<void> {
  await page.reload();
  await page.waitForLoadState('networkidle');
}

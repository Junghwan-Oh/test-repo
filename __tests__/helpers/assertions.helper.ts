import { Page, expect } from '@playwright/test';

/**
 * Assertions Helper
 * 커스텀 assertion 헬퍼 함수
 */

/**
 * 도시 카드가 표시되는지 확인
 */
export async function assertCityCardVisible(
  page: Page,
  cityId: string,
  message?: string
): Promise<void> {
  const card = page.locator(`[data-testid="city-card-${cityId}"]`);
  await expect(card, message || `도시 카드 ${cityId}가 표시되어야 함`).toBeVisible();
}

/**
 * 필터가 적용되었는지 확인
 */
export async function assertFilterApplied(
  page: Page,
  filterType: 'budget' | 'region' | 'environment' | 'season',
  value: string,
  message?: string
): Promise<void> {
  const selectIndex = { budget: 0, region: 1, environment: 2, season: 3 }[filterType];
  const select = page.locator('select').nth(selectIndex);
  const currentValue = await select.inputValue();

  expect(
    currentValue,
    message || `${filterType} 필터가 ${value}로 적용되어야 함`
  ).toBe(value);
}

/**
 * 선호도 상태 확인 (좋아요/싫어요)
 */
export async function assertPreferenceState(
  page: Page,
  cityId: string,
  preferenceType: 'like' | 'dislike' | 'none',
  message?: string
): Promise<void> {
  const likeButton = page.locator(`[data-testid="like-button-${cityId}"]`);
  const dislikeButton = page.locator(`[data-testid="dislike-button-${cityId}"]`);

  if (preferenceType === 'like') {
    await expect(likeButton, message || '좋아요 버튼이 활성화되어야 함').toHaveClass(
      /active|selected/
    );
  } else if (preferenceType === 'dislike') {
    await expect(dislikeButton, message || '싫어요 버튼이 활성화되어야 함').toHaveClass(
      /active|selected/
    );
  } else {
    await expect(likeButton, message || '좋아요 버튼이 비활성화되어야 함').not.toHaveClass(
      /active|selected/
    );
    await expect(dislikeButton, message || '싫어요 버튼이 비활성화되어야 함').not.toHaveClass(
      /active|selected/
    );
  }
}

/**
 * URL에 특정 파라미터가 포함되어 있는지 확인
 */
export async function assertURLContains(
  page: Page,
  param: string,
  message?: string
): Promise<void> {
  const url = page.url();
  expect(url, message || `URL에 ${param}이 포함되어야 함`).toContain(param);
}

/**
 * 도시 카드 개수 확인
 */
export async function assertCityCardCount(
  page: Page,
  expectedCount: number,
  message?: string
): Promise<void> {
  const cards = page.locator('[data-testid="city-card"]');
  await expect(cards, message || `도시 카드가 ${expectedCount}개 표시되어야 함`).toHaveCount(
    expectedCount
  );
}

/**
 * 페이지 제목 확인
 */
export async function assertPageTitle(
  page: Page,
  expectedTitle: string,
  message?: string
): Promise<void> {
  await expect(page, message || `페이지 제목이 ${expectedTitle}이어야 함`).toHaveTitle(
    expectedTitle
  );
}

/**
 * 요소의 텍스트 내용 확인
 */
export async function assertElementText(
  page: Page,
  selector: string,
  expectedText: string,
  message?: string
): Promise<void> {
  const element = page.locator(selector);
  await expect(element, message || `${selector}의 텍스트가 ${expectedText}이어야 함`).toHaveText(
    expectedText
  );
}

/**
 * 요소가 보이는지 확인
 */
export async function assertElementVisible(
  page: Page,
  selector: string,
  message?: string
): Promise<void> {
  const element = page.locator(selector);
  await expect(element, message || `${selector}가 보여야 함`).toBeVisible();
}

/**
 * 요소가 숨겨져 있는지 확인
 */
export async function assertElementHidden(
  page: Page,
  selector: string,
  message?: string
): Promise<void> {
  const element = page.locator(selector);
  await expect(element, message || `${selector}가 숨겨져 있어야 함`).toBeHidden();
}

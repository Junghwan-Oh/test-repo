import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

/**
 * 홈페이지 기본 기능 E2E 테스트
 *
 * 테스트 시나리오:
 * 1. http://localhost:4000으로 이동
 * 2. 로고가 존재하는지 확인
 * 3. 도시 카드들이 존재하는지 확인
 * 4. 처음 접속 시 필터가 적용 안 돼 있는걸 확인
 * 5. 필터가 적용 안 돼 있으면 모든 도시가 표시되는지 확인
 */

test.describe('홈페이지 기본 기능', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    // Desktop viewport로 설정 (필터가 보이도록)
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    homePage = new HomePage(page);
    await homePage.navigate();

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');
  });

  test('홈페이지로 정상적으로 이동한다', async ({ page }) => {
    // URL 확인
    expect(page.url()).toContain('localhost');

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/노마드 코리아/i);
  });

  test('홈페이지에 로고가 존재한다', async ({ page }) => {
    // 로고 텍스트가 있는 링크 확인
    const logo = page.getByRole('link', { name: /노마드 코리아/i });

    await expect(logo).toBeVisible();

    // 로고 클릭 시 홈으로 이동하는지 확인
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('홈페이지에 도시 카드들이 존재한다', async () => {
    // 도시 카드 컨테이너 확인
    await expect(homePage.cityGrid).toBeVisible();

    // 도시 카드가 최소 1개 이상 존재
    const cityCardCount = await homePage.getCityCardCount();
    expect(cityCardCount).toBeGreaterThan(0);

    // 첫 번째 도시 카드가 보이는지 확인
    const cityCards = homePage.cityCards;
    await expect(cityCards.first()).toBeVisible();
  });

  test('홈페이지에 처음 접속하면 필터가 적용되지 않는다', async ({ page }) => {
    // 필터 바가 존재하는지 확인
    await expect(homePage.filterBar).toBeVisible();

    // Desktop viewport에서 필터 select들이 보이는지 확인
    await expect(homePage.budgetSelect).toBeVisible();
    await expect(homePage.regionSelect).toBeVisible();
    await expect(homePage.environmentSelect).toBeVisible();
    await expect(homePage.seasonSelect).toBeVisible();

    // 각 필터 select의 기본값이 "전체"인지 확인
    const budgetValue = await homePage.budgetSelect.inputValue();
    const regionValue = await homePage.regionSelect.inputValue();
    const environmentValue = await homePage.environmentSelect.inputValue();
    const seasonValue = await homePage.seasonSelect.inputValue();

    // 모든 필터가 기본값(전체)이어야 함
    expect(budgetValue).toBe('전체');
    expect(regionValue).toBe('전체');
    expect(environmentValue).toBe('전체');
    expect(seasonValue).toBe('전체');
  });

  test('필터가 적용되지 않으면 모든 도시가 표시된다', async () => {
    // 도시 카드 개수 확인 (데이터베이스에 저장된 12개 도시)
    const cityCardCount = await homePage.getCityCardCount();
    expect(cityCardCount).toBe(12);

    // 처음 몇 개의 도시 카드가 화면에 보이는지 확인
    const allCards = homePage.cityCards;
    const count = Math.min(await allCards.count(), 4); // 처음 4개만 확인

    for (let i = 0; i < count; i++) {
      await expect(allCards.nth(i)).toBeVisible();
    }
  });

  test('도시 카드에 필수 정보가 표시된다', async () => {
    const firstCard = homePage.cityCards.first();

    // 도시 카드가 보이는지 확인
    await expect(firstCard).toBeVisible();

    // 도시 이름이 있는지 확인
    const cityName = firstCard.locator('h3').first();
    await expect(cityName).toBeVisible();
    const nameText = await cityName.textContent();
    expect(nameText).toBeTruthy();
    expect(nameText!.length).toBeGreaterThan(0);

    // 도시 이미지가 있는지 확인
    const cityImage = firstCard.locator('img').first();
    await expect(cityImage).toBeVisible();
  });

  test('필터 UI 요소들이 모두 존재한다', async () => {
    // 필터 바 확인
    await expect(homePage.filterBar).toBeVisible();

    // Desktop에서 각 필터 select 확인
    await expect(homePage.budgetSelect).toBeVisible();
    await expect(homePage.regionSelect).toBeVisible();
    await expect(homePage.environmentSelect).toBeVisible();
    await expect(homePage.seasonSelect).toBeVisible();

    // 초기화 버튼은 필터가 적용되지 않은 상태에서는 보이지 않음
    // (activeFilterCount > 0일 때만 표시됨)
  });
});

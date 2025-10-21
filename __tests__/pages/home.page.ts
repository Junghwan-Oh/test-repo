import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Home Page Object Model
 * 메인 페이지 (/) 관련 요소 및 액션
 */
export class HomePage extends BasePage {
  readonly heroBanner: Locator;
  readonly filterBar: Locator;
  readonly cityGrid: Locator;
  readonly cityCards: Locator;

  // 필터 selects
  readonly budgetSelect: Locator;
  readonly regionSelect: Locator;
  readonly environmentSelect: Locator;
  readonly seasonSelect: Locator;
  readonly resetButton: Locator;
  readonly activeFilterCount: Locator;

  constructor(page: Page) {
    super(page);

    // 메인 섹션
    this.heroBanner = page.locator('[data-testid="hero-banner"]').first();
    this.filterBar = page.locator('[data-testid="filter-bar"]').first();
    this.cityGrid = page.locator('[data-testid="city-grid"]').first();
    this.cityCards = page.locator('[data-testid="city-card"]');

    // 필터 요소
    this.budgetSelect = page.locator('[data-testid="budget-select"]');
    this.regionSelect = page.locator('[data-testid="region-select"]');
    this.environmentSelect = page.locator('[data-testid="environment-select"]');
    this.seasonSelect = page.locator('[data-testid="season-select"]');
    this.resetButton = page.getByRole('button', { name: /초기화/i });
    this.activeFilterCount = page.locator('[data-testid="active-filter-count"]').first();
  }

  /**
   * 홈페이지로 이동
   */
  async navigate(): Promise<void> {
    await this.goto('/');
  }

  /**
   * 도시 카드 클릭
   */
  async clickCityCard(cityId: string): Promise<void> {
    await this.page.locator(`[data-testid="city-card-${cityId}"]`).click();
  }

  /**
   * 도시 카드 개수 가져오기
   */
  async getCityCardCount(): Promise<number> {
    return await this.cityCards.count();
  }

  /**
   * 필터 선택
   */
  async selectBudget(value: string): Promise<void> {
    await this.budgetSelect.selectOption(value);
  }

  async selectRegion(value: string): Promise<void> {
    await this.regionSelect.selectOption(value);
  }

  async selectEnvironment(value: string): Promise<void> {
    await this.environmentSelect.selectOption(value);
  }

  async selectSeason(value: string): Promise<void> {
    await this.seasonSelect.selectOption(value);
  }

  /**
   * 필터 초기화
   */
  async resetFilters(): Promise<void> {
    await this.resetButton.click();
  }

  /**
   * 활성 필터 개수 가져오기
   */
  async getActiveFilterCount(): Promise<number> {
    const text = await this.activeFilterCount.textContent();
    const match = text?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}

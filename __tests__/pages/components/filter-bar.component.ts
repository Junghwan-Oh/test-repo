import { Page, Locator } from '@playwright/test';

/**
 * Filter Bar Component Object Model
 * FilterBar 컴포넌트 관련 요소 및 액션
 */
export class FilterBarComponent {
  readonly page: Page;
  readonly container: Locator;

  // 필터 Select 요소
  readonly budgetSelect: Locator;
  readonly regionSelect: Locator;
  readonly environmentSelect: Locator;
  readonly seasonSelect: Locator;

  // 초기화 버튼 및 카운트
  readonly resetButton: Locator;
  readonly activeFilterCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('[data-testid="filter-bar"]').first();

    // 필터 Select (label 텍스트로 찾기)
    this.budgetSelect = this.container.locator('select').nth(0);
    this.regionSelect = this.container.locator('select').nth(1);
    this.environmentSelect = this.container.locator('select').nth(2);
    this.seasonSelect = this.container.locator('select').nth(3);

    // 초기화 및 카운트
    this.resetButton = this.container.getByRole('button', { name: /초기화/i });
    this.activeFilterCount = this.container.locator('[data-testid="active-filter-count"]').first();
  }

  /**
   * 예산 필터 선택
   */
  async selectBudget(value: string): Promise<void> {
    await this.budgetSelect.selectOption(value);
  }

  /**
   * 지역 필터 선택
   */
  async selectRegion(value: string): Promise<void> {
    await this.regionSelect.selectOption(value);
  }

  /**
   * 환경 필터 선택
   */
  async selectEnvironment(value: string): Promise<void> {
    await this.environmentSelect.selectOption(value);
  }

  /**
   * 계절 필터 선택
   */
  async selectSeason(value: string): Promise<void> {
    await this.seasonSelect.selectOption(value);
  }

  /**
   * 모든 필터 초기화
   */
  async resetAllFilters(): Promise<void> {
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

  /**
   * 현재 선택된 예산 필터 값 가져오기
   */
  async getSelectedBudget(): Promise<string> {
    return (await this.budgetSelect.inputValue()) || '';
  }

  /**
   * 현재 선택된 지역 필터 값 가져오기
   */
  async getSelectedRegion(): Promise<string> {
    return (await this.regionSelect.inputValue()) || '';
  }

  /**
   * 현재 선택된 환경 필터 값 가져오기
   */
  async getSelectedEnvironment(): Promise<string> {
    return (await this.environmentSelect.inputValue()) || '';
  }

  /**
   * 현재 선택된 계절 필터 값 가져오기
   */
  async getSelectedSeason(): Promise<string> {
    return (await this.seasonSelect.inputValue()) || '';
  }
}

import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * City Detail Page Object Model
 * 도시 상세 페이지 (/cities/[id]) 관련 요소 및 액션
 */
export class CityDetailPage extends BasePage {
  readonly cityHero: Locator;
  readonly cityName: Locator;
  readonly cityRating: Locator;

  // 좋아요/싫어요 버튼
  readonly likeButton: Locator;
  readonly dislikeButton: Locator;
  readonly likeCount: Locator;
  readonly dislikeCount: Locator;

  // 정보 카드
  readonly infoCards: Locator;
  readonly costCard: Locator;
  readonly infrastructureCard: Locator;
  readonly regionCard: Locator;

  // 특성 섹션
  readonly characteristicsSection: Locator;
  readonly characteristicBadges: Locator;
  readonly environmentTags: Locator;
  readonly generalTags: Locator;
  readonly bestSeasons: Locator;

  // 관련 도시
  readonly relatedCities: Locator;
  readonly relatedCityCards: Locator;

  // 네비게이션
  readonly backButton: Locator;
  readonly shareButton: Locator;

  constructor(page: Page) {
    super(page);

    // 히어로 섹션
    this.cityHero = page.locator('[data-testid="city-hero"]').first();
    this.cityName = page.locator('[data-testid="city-name"]').first();
    this.cityRating = page.locator('[data-testid="city-rating"]').first();

    // 좋아요/싫어요
    this.likeButton = page.locator('[data-testid="like-button"]').first();
    this.dislikeButton = page.locator('[data-testid="dislike-button"]').first();
    this.likeCount = page.locator('[data-testid="like-count"]').first();
    this.dislikeCount = page.locator('[data-testid="dislike-count"]').first();

    // 정보 카드
    this.infoCards = page.locator('[data-testid="info-cards"]').first();
    this.costCard = page.locator('[data-testid="cost-card"]').first();
    this.infrastructureCard = page.locator('[data-testid="infrastructure-card"]').first();
    this.regionCard = page.locator('[data-testid="region-card"]').first();

    // 특성 섹션
    this.characteristicsSection = page.locator('[data-testid="characteristics-section"]').first();
    this.characteristicBadges = page.locator('[data-testid="characteristic-badge"]');
    this.environmentTags = page.locator('[data-testid="environment-tag"]');
    this.generalTags = page.locator('[data-testid="general-tag"]');
    this.bestSeasons = page.locator('[data-testid="best-season"]');

    // 관련 도시
    this.relatedCities = page.locator('[data-testid="related-cities"]').first();
    this.relatedCityCards = page.locator('[data-testid="related-city-card"]');

    // 네비게이션
    this.backButton = page.getByRole('button', { name: /뒤로/i });
    this.shareButton = page.getByRole('button', { name: /공유/i });
  }

  /**
   * 특정 도시 상세 페이지로 이동
   */
  async navigate(cityId: string): Promise<void> {
    await this.goto(`/cities/${cityId}`);
  }

  /**
   * 좋아요 버튼 클릭
   */
  async clickLike(): Promise<void> {
    await this.likeButton.click();
  }

  /**
   * 싫어요 버튼 클릭
   */
  async clickDislike(): Promise<void> {
    await this.dislikeButton.click();
  }

  /**
   * 공유 버튼 클릭
   */
  async clickShare(): Promise<void> {
    await this.shareButton.click();
  }

  /**
   * 뒤로 가기 버튼 클릭
   */
  async clickBack(): Promise<void> {
    await this.backButton.click();
  }

  /**
   * 관련 도시 카드 클릭
   */
  async clickRelatedCity(index: number): Promise<void> {
    await this.relatedCityCards.nth(index).click();
  }

  /**
   * 도시 이름 가져오기
   */
  async getCityName(): Promise<string> {
    return (await this.cityName.textContent()) || '';
  }

  /**
   * 좋아요 개수 가져오기
   */
  async getLikeCount(): Promise<number> {
    const text = await this.likeCount.textContent();
    return parseInt(text || '0', 10);
  }

  /**
   * 싫어요 개수 가져오기
   */
  async getDislikeCount(): Promise<number> {
    const text = await this.dislikeCount.textContent();
    return parseInt(text || '0', 10);
  }

  /**
   * 관련 도시 개수 가져오기
   */
  async getRelatedCityCount(): Promise<number> {
    return await this.relatedCityCards.count();
  }
}

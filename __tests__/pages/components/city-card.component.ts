import { Page, Locator } from '@playwright/test';

/**
 * City Card Component Object Model
 * CityCard 컴포넌트 관련 요소 및 액션
 */
export class CityCardComponent {
  readonly page: Page;
  readonly card: Locator;

  // 카드 요소
  readonly cityImage: Locator;
  readonly cityName: Locator;
  readonly cityRegion: Locator;
  readonly rating: Locator;
  readonly ratingStars: Locator;
  readonly reviewCount: Locator;

  // 좋아요/싫어요
  readonly likeCount: Locator;
  readonly dislikeCount: Locator;
  readonly likeButton: Locator;
  readonly dislikeButton: Locator;

  // 정보 그리드
  readonly monthlyCost: Locator;
  readonly monthlyRent: Locator;

  constructor(page: Page, cityId: string) {
    this.page = page;
    this.card = page.locator(`[data-testid="city-card-${cityId}"]`);

    // 카드 요소
    this.cityImage = this.card.locator('[data-testid="city-image"]').first();
    this.cityName = this.card.locator('[data-testid="city-name"]').first();
    this.cityRegion = this.card.locator('[data-testid="city-region"]').first();
    this.rating = this.card.locator('[data-testid="rating"]').first();
    this.ratingStars = this.card.locator('[data-testid="rating-stars"]').first();
    this.reviewCount = this.card.locator('[data-testid="review-count"]').first();

    // 좋아요/싫어요
    this.likeCount = this.card.locator('[data-testid="like-count"]').first();
    this.dislikeCount = this.card.locator('[data-testid="dislike-count"]').first();
    this.likeButton = this.card.locator('[data-testid="like-button"]').first();
    this.dislikeButton = this.card.locator('[data-testid="dislike-button"]').first();

    // 정보 그리드
    this.monthlyCost = this.card.locator('[data-testid="monthly-cost"]').first();
    this.monthlyRent = this.card.locator('[data-testid="monthly-rent"]').first();
  }

  /**
   * 카드 클릭 (상세 페이지로 이동)
   */
  async click(): Promise<void> {
    await this.card.click();
  }

  /**
   * 카드가 보이는지 확인
   */
  async isVisible(): Promise<boolean> {
    return await this.card.isVisible();
  }

  /**
   * 도시 이름 가져오기
   */
  async getCityName(): Promise<string> {
    return (await this.cityName.textContent()) || '';
  }

  /**
   * 도시 지역 가져오기
   */
  async getCityRegion(): Promise<string> {
    return (await this.cityRegion.textContent()) || '';
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
   * 평점 가져오기
   */
  async getRating(): Promise<number> {
    const text = await this.rating.textContent();
    const match = text?.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  /**
   * 월 생활비 가져오기
   */
  async getMonthlyCost(): Promise<string> {
    return (await this.monthlyCost.textContent()) || '';
  }

  /**
   * 월세 가져오기
   */
  async getMonthlyRent(): Promise<string> {
    return (await this.monthlyRent.textContent()) || '';
  }
}

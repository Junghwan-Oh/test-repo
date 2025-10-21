import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object Model
 * 모든 페이지 클래스의 기본 클래스
 */
export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
  }

  /**
   * 페이지 로딩 대기
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * 특정 URL로 이동
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * 스크린샷 캡처
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * 페이지 제목 가져오기
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * 현재 URL 가져오기
   */
  getCurrentURL(): string {
    return this.page.url();
  }
}

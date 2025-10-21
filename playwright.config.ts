import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 테스트 디렉토리
  testDir: './__tests__/e2e',

  // 테스트 매칭 패턴
  testMatch: '**/*.spec.ts',

  // 병렬 실행
  fullyParallel: true,

  // CI 환경에서는 워커 1개, 로컬에서는 자동
  workers: process.env.CI ? 1 : undefined,

  // CI 환경에서 2번 재시도
  retries: process.env.CI ? 2 : 0,

  // 리포터 설정
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
    ['junit', { outputFile: 'test-results/e2e-junit.xml' }],
    ['list'],
  ],

  // 전역 타임아웃 설정
  timeout: 30 * 1000, // 30초
  expect: {
    timeout: 5 * 1000, // 5초
  },

  // 전역 설정
  use: {
    // 기본 URL
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Trace 설정 (첫 재시도 시에만 기록)
    trace: 'on-first-retry',

    // 스크린샷 (실패 시에만)
    screenshot: 'only-on-failure',

    // 비디오 (실패 시에만 보관)
    video: 'retain-on-failure',

    // 네비게이션 타임아웃
    navigationTimeout: 15 * 1000,

    // 액션 타임아웃
    actionTimeout: 10 * 1000,
  },

  // 프로젝트 (브라우저 및 디바이스 설정)
  projects: [
    // 데스크톱 브라우저
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // 모바일 브라우저
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },

    // 태블릿
    {
      name: 'tablet-ipad',
      use: { ...devices['iPad Pro'] },
    },
  ],

  // 로컬 개발 서버 설정
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2분
  },

  // 테스트 결과 디렉토리
  outputDir: 'test-results/',
});

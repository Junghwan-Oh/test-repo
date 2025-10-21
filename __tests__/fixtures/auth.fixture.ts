import { test as base } from '@playwright/test';

/**
 * Authentication Fixture
 * 인증 관련 테스트 데이터 및 상태
 */

export type AuthFixtures = {
  authenticatedUser: {
    userId: string;
    email: string;
    password: string;
  };
  anonymousUser: null;
};

export const authFixture = base.extend<AuthFixtures>({
  /**
   * 인증된 사용자 Fixture
   */
  authenticatedUser: async ({}, use) => {
    const user = {
      userId: 'test-user-id-123',
      email: 'test@example.com',
      password: 'TestPassword123!',
    };
    await use(user);
  },

  /**
   * 비인증 사용자 Fixture
   */
  anonymousUser: async ({}, use) => {
    await use(null);
  },
});

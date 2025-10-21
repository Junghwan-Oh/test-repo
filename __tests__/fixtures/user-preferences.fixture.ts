import { test as base } from '@playwright/test';

/**
 * User Preferences Fixture
 * 사용자 선호도 관련 테스트 데이터
 */

export type UserPreferencesFixtures = {
  likedCities: string[];
  dislikedCities: string[];
  emptyPreferences: {
    liked: string[];
    disliked: string[];
  };
};

export const userPreferencesFixture = base.extend<UserPreferencesFixtures>({
  /**
   * 좋아요 누른 도시 목록
   */
  likedCities: async ({}, use) => {
    const cityIds = ['1', '3', '5']; // 제주시, 부산, 속초시
    await use(cityIds);
  },

  /**
   * 싫어요 누른 도시 목록
   */
  dislikedCities: async ({}, use) => {
    const cityIds = ['2', '7']; // 강릉시, 춘천시
    await use(cityIds);
  },

  /**
   * 빈 선호도 (초기 상태)
   */
  emptyPreferences: async ({}, use) => {
    const preferences = {
      liked: [],
      disliked: [],
    };
    await use(preferences);
  },
});

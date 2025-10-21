/**
 * Mock User Data
 * E2E 테스트용 사용자 데이터
 */

export const mockAuthenticatedUser = {
  userId: 'test-user-id-123',
  email: 'test@example.com',
  password: 'TestPassword123!',
  name: '테스트 사용자',
  createdAt: '2024-01-01T00:00:00Z',
};

export const mockAnonymousUser = null;

export const mockUserPreferences = {
  likedCities: ['1', '3', '5'], // 제주시, 부산, 속초시
  dislikedCities: ['2', '7'], // 강릉시, 춘천시
};

export const mockEmptyPreferences = {
  likedCities: [],
  dislikedCities: [],
};

/**
 * LocalStorage 데이터 Mock
 */
export const mockLocalStorageData = {
  preferences: JSON.stringify({
    liked: ['1', '3'],
    disliked: ['2'],
  }),
  auth: JSON.stringify({
    userId: 'test-user-id-123',
    email: 'test@example.com',
  }),
};

/**
 * Session Storage 데이터 Mock
 */
export const mockSessionStorageData = {
  tempPreferences: JSON.stringify({
    liked: ['1'],
    disliked: [],
  }),
};

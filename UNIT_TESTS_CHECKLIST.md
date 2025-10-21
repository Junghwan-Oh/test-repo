# 유닛 테스트 작성 체크리스트

## 📋 목차
1. [테스트 개요](#테스트-개요)
2. [🔴 HIGH PRIORITY - 핵심 비즈니스 로직](#-high-priority---핵심-비즈니스-로직)
3. [lib/utils.ts 테스트](#libutilsts-테스트)
4. [lib/adapters/city-adapter.ts 테스트](#libadapterscity-adapterts-테스트)
5. [lib/data.ts 테스트](#libdatats-테스트)
6. [constants/filters.ts 테스트](#constantsfiltersts-테스트)
7. [테스트 실행 순서](#테스트-실행-순서)

---

## 테스트 개요

### 목표
- **전체 커버리지**: 80% 이상
- **순수 함수 커버리지**: 100%
- **총 테스트 케이스 수**: 약 85개

### 우선순위
1. 🔴 **HIGH PRIORITY**: lib/api/cities-client.ts - 사용자 선호도 관리 (필수, 최우선)
2. 🔴 **Priority 1**: lib/utils.ts, lib/adapters/city-adapter.ts (100% 필수)
3. 🟡 **Priority 2**: lib/data.ts (90% 목표)
4. 🟢 **Priority 3**: constants/filters.ts (선택사항)

---

## 🔴 HIGH PRIORITY - 핵심 비즈니스 로직

### lib/api/cities-client.ts 테스트

**파일 위치**: `__tests__/unit/api/cities-client.test.ts`
**목표 커버리지**: 100% (최우선 필수)
**총 테스트 케이스**: 24개

#### 1. toggleCityLike() 함수 테스트

```typescript
describe('toggleCityLike()', () => {
  // 기본 좋아요 동작 (6개 핵심 시나리오)
  ✅ should add like when no existing preference (null → like)
  ✅ should remove like when clicking like again (like → null)
  ✅ should change from like to dislike (like → dislike)
  ✅ should add dislike when no existing preference (null → dislike)
  ✅ should remove dislike when clicking dislike again (dislike → null)
  ✅ should change from dislike to like (dislike → like)

  // 에러 처리 (8개)
  ✅ should handle unauthenticated user
  ✅ should return error message for unauthenticated user
  ✅ should handle Supabase connection error
  ✅ should handle database fetch error
  ✅ should handle database insert error
  ✅ should handle database update error
  ✅ should handle database delete error
  ✅ should handle network timeout

  // Edge cases (4개)
  ✅ should handle concurrent requests (race condition)
  ✅ should handle invalid cityId
  ✅ should handle invalid likeType
  ✅ should handle missing user session

  // Fallback 로직 (2개)
  ✅ should fallback to localStorage when Supabase fails
  ✅ should sync localStorage to Supabase when connection restored
});
```

**테스트 케이스 상세**:

| # | 카테고리 | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|----------|-------------|------|-----------|------|
| **핵심 시나리오** |
| 1 | 좋아요 추가 | add like (null → like) | cityId, 'like', no existing | `{ success: true }` | DB INSERT 호출 |
| 2 | 좋아요 취소 | remove like (like → null) | cityId, 'like', existing like | `{ success: true }` | DB DELETE 호출 |
| 3 | 좋아요→싫어요 | change like to dislike | cityId, 'dislike', existing like | `{ success: true }` | DB UPDATE 호출 |
| 4 | 싫어요 추가 | add dislike (null → dislike) | cityId, 'dislike', no existing | `{ success: true }` | DB INSERT 호출 |
| 5 | 싫어요 취소 | remove dislike (dislike → null) | cityId, 'dislike', existing dislike | `{ success: true }` | DB DELETE 호출 |
| 6 | 싫어요→좋아요 | change dislike to like | cityId, 'like', existing dislike | `{ success: true }` | DB UPDATE 호출 |
| **에러 처리** |
| 7 | 인증 실패 | unauthenticated user | cityId, 'like', no auth | `{ success: false, error: '로그인이 필요합니다.' }` | 에러 메시지 |
| 8 | DB 연결 실패 | Supabase connection error | cityId, 'like', network error | `{ success: false, error: ... }` | 연결 에러 |
| 9 | 조회 실패 | database fetch error | cityId, 'like', SELECT 에러 | `{ success: false, error: '좋아요 상태를 확인하는데 실패했습니다.' }` | SELECT 에러 |
| 10 | 삽입 실패 | database insert error | cityId, 'like', INSERT 에러 | `{ success: false, error: '좋아요를 추가하는데 실패했습니다.' }` | INSERT 에러 |
| 11 | 업데이트 실패 | database update error | cityId, 'like', UPDATE 에러 | `{ success: false, error: '좋아요를 변경하는데 실패했습니다.' }` | UPDATE 에러 |
| 12 | 삭제 실패 | database delete error | cityId, 'like', DELETE 에러 | `{ success: false, error: '좋아요를 취소하는데 실패했습니다.' }` | DELETE 에러 |
| 13 | 네트워크 타임아웃 | network timeout | cityId, 'like', timeout | `{ success: false, error: ... }` | 시간 초과 |
| 14 | 세션 만료 | missing user session | cityId, 'like', expired session | `{ success: false, error: '로그인이 필요합니다.' }` | 세션 만료 |
| **Edge Cases** |
| 15 | 동시 요청 | concurrent requests | 동시에 2번 클릭 | 마지막 요청만 반영 | race condition |
| 16 | 잘못된 ID | invalid cityId | '', 'like' | `{ success: false }` | 빈 문자열 |
| 17 | 잘못된 타입 | invalid likeType | cityId, 'invalid' | TypeScript 컴파일 에러 | 타입 안전성 |
| 18 | null cityId | null cityId | null, 'like' | `{ success: false }` | null 처리 |
| **Fallback 로직** |
| 19 | localStorage 저장 | Supabase fail → localStorage | cityId, 'like', DB 에러 | localStorage에 저장됨 | fallback |
| 20 | 복구 시 동기화 | localStorage → Supabase sync | DB 복구 시 | localStorage 데이터 sync | 동기화 |

---

#### 2. fetchUserCityLikes() 함수 테스트

```typescript
describe('fetchUserCityLikes()', () => {
  // 정상 케이스
  ✅ should return user's liked cities
  ✅ should return empty array when no likes exist
  ✅ should filter by current user only

  // 에러 처리
  ✅ should return empty array for unauthenticated user
  ✅ should handle database fetch error
  ✅ should handle network error

  // Edge cases
  ✅ should handle missing user session
  ✅ should handle invalid response format
});
```

**테스트 케이스 상세**:

| # | 카테고리 | 테스트 이름 | 기대 출력 | 설명 |
|---|----------|-------------|-----------|------|
| 21 | 정상 | return liked cities | `[{ id, user_id, city_id, like_type, created_at }]` | 사용자 좋아요 목록 |
| 22 | 정상 | empty array no likes | `[]` | 좋아요 없음 |
| 23 | 정상 | filter by user | 현재 사용자만 | 다른 사용자 데이터 제외 |
| 24 | 에러 | unauthenticated | `[]` | 인증 실패 시 빈 배열 |
| 25 | 에러 | database error | `[]` | DB 에러 시 빈 배열 |
| 26 | 에러 | network error | `[]` | 네트워크 에러 |
| 27 | Edge | missing session | `[]` | 세션 없음 |
| 28 | Edge | invalid format | `[]` | 응답 형식 오류 |

---

### Mock 전략

#### Supabase Client Mock
```typescript
// vitest.config.ts에서 설정
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      eq: vi.fn(),
      maybeSingle: vi.fn()
    }))
  }))
}));
```

#### localStorage Mock
```typescript
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock as any;
```

#### 네트워크 에러 시뮬레이션
```typescript
// MSW (Mock Service Worker) 사용
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/auth/v1/*', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'Network error' }));
  })
);
```

---

---

## lib/utils.ts 테스트

**파일 위치**: `__tests__/unit/utils/utils.test.ts`
**목표 커버리지**: 100%
**총 테스트 케이스**: 18개

### 1. cn() 함수 테스트

```typescript
describe('cn()', () => {
  // 기본 동작 테스트
  ✅ should merge class names correctly
  ✅ should handle conditional classes
  ✅ should remove duplicate classes
  ✅ should handle Tailwind conflicts (last one wins)

  // Edge cases
  ✅ should handle empty input
  ✅ should handle undefined values
  ✅ should handle null values
  ✅ should handle array of classes
  ✅ should handle object with boolean values
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|-------------|------|-----------|------|
| 1 | merge class names correctly | `cn('px-2', 'py-1')` | `'px-2 py-1'` | 기본 병합 |
| 2 | handle conditional classes | `cn('px-2', false && 'py-1')` | `'px-2'` | false 조건 제거 |
| 3 | remove duplicate classes | `cn('px-2', 'px-2')` | `'px-2'` | 중복 제거 |
| 4 | handle Tailwind conflicts | `cn('px-2', 'px-4')` | `'px-4'` | 나중 값 우선 |
| 5 | handle empty input | `cn()` | `''` | 빈 문자열 |
| 6 | handle undefined | `cn(undefined)` | `''` | undefined 무시 |
| 7 | handle null | `cn(null)` | `''` | null 무시 |
| 8 | handle array | `cn(['px-2', 'py-1'])` | `'px-2 py-1'` | 배열 지원 |
| 9 | handle object | `cn({ 'px-2': true, 'py-1': false })` | `'px-2'` | 객체 조건 |

---

### 2. formatCurrency() 함수 테스트

```typescript
describe('formatCurrency()', () => {
  // 정상 케이스
  ✅ should format positive integer correctly
  ✅ should format large numbers with commas
  ✅ should include currency symbol (₩)

  // Edge cases
  ✅ should handle zero
  ✅ should handle negative numbers
  ✅ should round decimal numbers
  ✅ should handle very large numbers
  ✅ should handle very small numbers
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|-------------|------|-----------|------|
| 1 | format positive integer | `1000` | `'₩1,000'` | 천 단위 쉼표 |
| 2 | format large numbers | `1000000` | `'₩1,000,000'` | 백만 단위 |
| 3 | include currency symbol | `500` | `'₩500'` | 원화 기호 |
| 4 | handle zero | `0` | `'₩0'` | 0원 |
| 5 | handle negative | `-1000` | `-₩1,000` | 음수 |
| 6 | round decimals | `1000.99` | `'₩1,001'` | 반올림 |
| 7 | very large numbers | `999999999` | `'₩999,999,999'` | 9억 |
| 8 | very small numbers | `1` | `'₩1'` | 1원 |

---

### 3. getCharacteristicEmoji() 함수 테스트

```typescript
describe('getCharacteristicEmoji()', () => {
  // 정상 케이스 - 모든 특성 타입 테스트
  ✅ should return 🏖️ for "coastal"
  ✅ should return 🏔️ for "mountain"
  ✅ should return 🏙️ for "urban"
  ✅ should return 🎨 for "cultural"

  // Edge cases
  ✅ should return 📍 for unknown characteristic
  ✅ should return 📍 for empty string
  ✅ should return 📍 for null/undefined
  ✅ should be case-sensitive
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|-------------|------|-----------|------|
| 1 | coastal | `'coastal'` | `'🏖️'` | 해안 도시 |
| 2 | mountain | `'mountain'` | `'🏔️'` | 산악 도시 |
| 3 | urban | `'urban'` | `'🏙️'` | 대도시 |
| 4 | cultural | `'cultural'` | `'🎨'` | 문화 도시 |
| 5 | unknown | `'unknown'` | `'📍'` | 기본값 |
| 6 | empty string | `''` | `'📍'` | 빈 문자열 |
| 7 | null/undefined | `null as any` | `'📍'` | null 처리 |
| 8 | case-sensitive | `'COASTAL'` | `'📍'` | 대소문자 구분 |

---

### 4. getCharacteristicLabel() 함수 테스트

```typescript
describe('getCharacteristicLabel()', () => {
  // 정상 케이스 - 모든 특성 타입 테스트
  ✅ should return "해안" for "coastal"
  ✅ should return "산악" for "mountain"
  ✅ should return "대도시" for "urban"
  ✅ should return "문화" for "cultural"

  // Edge cases
  ✅ should return original string for unknown characteristic
  ✅ should return empty string for empty input
  ✅ should be case-sensitive
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|-------------|------|-----------|------|
| 1 | coastal | `'coastal'` | `'해안'` | 해안 라벨 |
| 2 | mountain | `'mountain'` | `'산악'` | 산악 라벨 |
| 3 | urban | `'urban'` | `'대도시'` | 도시 라벨 |
| 4 | cultural | `'cultural'` | `'문화'` | 문화 라벨 |
| 5 | unknown | `'unknown'` | `'unknown'` | 원본 반환 |
| 6 | empty string | `''` | `''` | 빈 문자열 |
| 7 | case-sensitive | `'COASTAL'` | `'COASTAL'` | 대소문자 구분 |

---

## lib/adapters/city-adapter.ts 테스트

**파일 위치**: `__tests__/unit/adapters/city-adapter.test.ts`
**목표 커버리지**: 100%
**총 테스트 케이스**: 15개

### 1. adaptCityData() 함수 테스트

```typescript
describe('adaptCityData()', () => {
  // 타입 변환 테스트 - snake_case → camelCase
  ✅ should convert id correctly
  ✅ should convert image_url to imageUrl
  ✅ should convert average_rating to averageRating
  ✅ should convert review_count to reviewCount
  ✅ should convert likes_count to likesCount
  ✅ should convert dislikes_count to dislikesCount
  ✅ should convert average_rent to averageRent
  ✅ should convert average_living_cost to averageLivingCost
  ✅ should convert cafe_count to cafeCount
  ✅ should convert cafe_density to cafeDensity
  ✅ should convert internet_score to internetScore
  ✅ should convert transport_score to transportScore
  ✅ should convert best_season to bestSeason
  ✅ should convert created_at to Date object
  ✅ should convert updated_at to Date object

  // null/undefined 처리
  ✅ should handle null likes_count (default to 0)
  ✅ should handle null dislikes_count (default to 0)
  ✅ should handle undefined likes_count
  ✅ should handle undefined dislikes_count

  // 배열 필드 변환
  ✅ should convert tags array correctly
  ✅ should convert characteristics array correctly
  ✅ should convert environments array correctly

  // 전체 객체 변환
  ✅ should convert complete city data correctly
  ✅ should preserve all original fields
});
```

**테스트 케이스 상세**:

| # | 카테고리 | 테스트 이름 | 검증 내용 | 설명 |
|---|----------|-------------|-----------|------|
| 1 | 필드 변환 | convert id | `supabaseCity.id === result.id` | ID 보존 |
| 2 | 필드 변환 | convert image_url | `supabaseCity.image_url === result.imageUrl` | snake → camel |
| 3 | 필드 변환 | convert average_rating | `supabaseCity.average_rating === result.averageRating` | 평점 변환 |
| 4 | 필드 변환 | convert review_count | `supabaseCity.review_count === result.reviewCount` | 리뷰 수 |
| 5 | null 처리 | handle null likes_count | `adaptCityData({ likes_count: null }).likesCount === 0` | 기본값 0 |
| 6 | null 처리 | handle null dislikes_count | `adaptCityData({ dislikes_count: null }).dislikesCount === 0` | 기본값 0 |
| 7 | null 처리 | handle undefined likes_count | `adaptCityData({ likes_count: undefined }).likesCount === 0` | undefined 처리 |
| 8 | null 처리 | handle undefined dislikes_count | `adaptCityData({ dislikes_count: undefined }).dislikesCount === 0` | undefined 처리 |
| 9 | 배열 변환 | convert tags | `Array.isArray(result.tags)` | 배열 보존 |
| 10 | 배열 변환 | convert characteristics | `result.characteristics.length > 0` | 특성 배열 |
| 11 | 배열 변환 | convert environments | `result.environments.length > 0` | 환경 배열 |
| 12 | Date 변환 | convert created_at | `result.createdAt instanceof Date` | Date 객체 |
| 13 | Date 변환 | convert updated_at | `result.updatedAt instanceof Date` | Date 객체 |
| 14 | 전체 객체 | complete conversion | 모든 필드 존재 확인 | 완전성 |
| 15 | 전체 객체 | preserve all fields | 필드 누락 없음 | 데이터 무결성 |

---

### 2. adaptCitiesData() 함수 테스트

```typescript
describe('adaptCitiesData()', () => {
  // 배열 변환 테스트
  ✅ should convert empty array
  ✅ should convert array with one city
  ✅ should convert array with multiple cities
  ✅ should preserve array order
  ✅ should convert all cities correctly

  // Edge cases
  ✅ should handle array with null elements
  ✅ should handle array with undefined elements
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|-------------|------|-----------|------|
| 1 | empty array | `[]` | `[]` | 빈 배열 |
| 2 | one city | `[city1]` | `[adaptedCity1]` | 단일 도시 |
| 3 | multiple cities | `[city1, city2, city3]` | `[adapted1, adapted2, adapted3]` | 여러 도시 |
| 4 | preserve order | `[city1, city2]` | 순서 유지 확인 | 순서 보존 |
| 5 | all fields converted | 모든 도시 검증 | 모든 필드 변환됨 | 완전성 |

---

## lib/data.ts 테스트

**파일 위치**: `__tests__/unit/data/data.test.ts`
**목표 커버리지**: 90%
**총 테스트 케이스**: 20개

### 1. cities 배열 테스트

```typescript
describe('cities array', () => {
  // 데이터 검증
  ✅ should contain 12 cities
  ✅ should have unique IDs
  ✅ should have valid structure for each city
  ✅ should have all required fields
  ✅ should have valid data types
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 검증 내용 | 설명 |
|---|-------------|-----------|------|
| 1 | 12 cities | `cities.length === 12` | 도시 개수 |
| 2 | unique IDs | 중복 ID 없음 | ID 유일성 |
| 3 | valid structure | 모든 도시가 City 타입 | 타입 검증 |
| 4 | required fields | name, region, budget 등 필수 필드 존재 | 필수 필드 |
| 5 | valid data types | averageRating: number, tags: string[] | 타입 정확성 |

---

### 2. featuredCity 테스트

```typescript
describe('featuredCity', () => {
  ✅ should be the second city (강릉시)
  ✅ should have name "강릉시"
  ✅ should be a valid City object
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 검증 내용 | 설명 |
|---|-------------|-----------|------|
| 1 | second city | `featuredCity === cities[1]` | 인덱스 1 |
| 2 | name | `featuredCity.name === '강릉시'` | 이름 확인 |
| 3 | valid object | City 타입 검증 | 구조 확인 |

---

### 3. getCityById() 함수 테스트

```typescript
describe('getCityById()', () => {
  // 정상 케이스
  ✅ should return city when valid ID is provided
  ✅ should return correct city for each ID (1-12)
  ✅ should return city with matching ID

  // Edge cases
  ✅ should return undefined for non-existent ID
  ✅ should return undefined for empty string
  ✅ should return undefined for null
  ✅ should return undefined for undefined
  ✅ should be case-sensitive for IDs
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 입력 | 기대 출력 | 설명 |
|---|-------------|------|-----------|------|
| 1 | valid ID '1' | `'1'` | 제주시 객체 | ID 1 찾기 |
| 2 | valid ID '2' | `'2'` | 강릉시 객체 | ID 2 찾기 |
| 3 | valid ID '12' | `'12'` | 포항 객체 | ID 12 찾기 |
| 4 | non-existent ID | `'999'` | `undefined` | 없는 ID |
| 5 | empty string | `''` | `undefined` | 빈 문자열 |
| 6 | null | `null as any` | `undefined` | null 처리 |
| 7 | undefined | `undefined as any` | `undefined` | undefined 처리 |
| 8 | case-sensitive | `'1' vs '01'` | 다른 결과 | 대소문자 |

---

### 4. getRelatedCities() 함수 테스트

```typescript
describe('getRelatedCities()', () => {
  // 정상 케이스
  ✅ should return related cities for valid city ID
  ✅ should return at most 'limit' cities
  ✅ should not include the current city
  ✅ should return cities sorted by score (highest first)

  // 점수 계산 로직 테스트
  ✅ should prioritize cities from same region (+10 points)
  ✅ should prioritize cities with common characteristics (+5 per match)
  ✅ should prioritize cities with common environments (+3 per match)
  ✅ should prioritize cities with similar budget (+2 points)

  // 정렬 로직 테스트
  ✅ should sort by score (primary) and rating (secondary)
  ✅ should handle tie-breaking with average rating

  // Edge cases
  ✅ should return empty array for non-existent city ID
  ✅ should return empty array for null city ID
  ✅ should handle limit = 0
  ✅ should handle limit > available cities
  ✅ should handle default limit (4)

  // 실제 데이터 테스트
  ✅ should return correct related cities for 제주시 (ID: '1')
  ✅ should return correct related cities for 강릉시 (ID: '2')
  ✅ should return correct related cities for 부산 (ID: '3')
});
```

**테스트 케이스 상세**:

| # | 카테고리 | 테스트 이름 | 검증 내용 | 설명 |
|---|----------|-------------|-----------|------|
| 1 | 기본 동작 | return related cities | `result.length > 0` | 관련 도시 반환 |
| 2 | 기본 동작 | respect limit | `result.length <= limit` | limit 준수 |
| 3 | 기본 동작 | exclude current city | `!result.includes(currentCity)` | 현재 도시 제외 |
| 4 | 기본 동작 | sorted by score | 점수 내림차순 확인 | 정렬 확인 |
| 5 | 점수 계산 | same region +10 | 같은 지역 도시 우선 | 지역 점수 |
| 6 | 점수 계산 | common characteristics | 공통 특성 개수 * 5 | 특성 점수 |
| 7 | 점수 계산 | common environments | 공통 환경 개수 * 3 | 환경 점수 |
| 8 | 점수 계산 | similar budget | 생활비 차이 <= 20만원 | 예산 점수 |
| 9 | 정렬 | score + rating | 점수 같으면 평점 높은 순 | 2차 정렬 |
| 10 | Edge case | non-existent ID | `[]` | 빈 배열 |
| 11 | Edge case | null ID | `[]` | 빈 배열 |
| 12 | Edge case | limit = 0 | `[]` | 빈 배열 |
| 13 | Edge case | limit > available | 사용 가능한 모든 도시 | 최대값 |
| 14 | Edge case | default limit | `result.length === 4` | 기본값 4 |
| 15 | 실제 데이터 | 제주시 related | 강릉시 포함 (같은 coastal) | 알고리즘 검증 |
| 16 | 실제 데이터 | 강릉시 related | 제주시 포함 | 알고리즘 검증 |
| 17 | 실제 데이터 | 부산 related | 대도시 우선 | 알고리즘 검증 |

---

## constants/filters.ts 테스트

**파일 위치**: `__tests__/unit/constants/filters.test.ts`
**목표 커버리지**: 100% (선택사항)
**총 테스트 케이스**: 8개

### 1. BUDGET_OPTIONS 테스트

```typescript
describe('BUDGET_OPTIONS', () => {
  ✅ should contain exactly 3 options
  ✅ should include "100만원 미만"
  ✅ should include "100~200만원"
  ✅ should include "200만원 이상"
  ✅ should be readonly
  ✅ should satisfy BudgetType
});
```

**테스트 케이스 상세**:

| # | 테스트 이름 | 검증 내용 | 설명 |
|---|-------------|-----------|------|
| 1 | 3 options | `length === 3` | 개수 확인 |
| 2 | includes "100만원 미만" | `includes('100만원 미만')` | 옵션 존재 |
| 3 | includes "100~200만원" | `includes('100~200만원')` | 옵션 존재 |
| 4 | includes "200만원 이상" | `includes('200만원 이상')` | 옵션 존재 |

---

### 2. REGION_OPTIONS 테스트

```typescript
describe('REGION_OPTIONS', () => {
  ✅ should contain exactly 7 options
  ✅ should include all regions
  ✅ should start with "전체"
  ✅ should be readonly
  ✅ should satisfy RegionType
});
```

---

### 3. ENVIRONMENT_OPTIONS 테스트

```typescript
describe('ENVIRONMENT_OPTIONS', () => {
  ✅ should contain exactly 4 options
  ✅ should include all environments
  ✅ should be readonly
  ✅ should satisfy EnvironmentType
});
```

---

### 4. SEASON_OPTIONS 테스트

```typescript
describe('SEASON_OPTIONS', () => {
  ✅ should contain exactly 4 options
  ✅ should include all seasons (봄, 여름, 가을, 겨울)
  ✅ should be readonly
  ✅ should satisfy SeasonType
});
```

---

## 테스트 실행 순서

### Phase 1: 환경 설정 (완료 후 다음 단계)
```bash
# 테스트 라이브러리 설치
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event msw

# vitest.config.ts 작성
# __tests__ 디렉토리 생성
```

### Phase 2: 🔴 lib/api/cities-client.ts 테스트 (24개 테스트, 최우선)
```bash
# 파일 생성
__tests__/unit/api/cities-client.test.ts

# Mock 설정
1. Supabase client mock
2. localStorage mock
3. MSW 서버 설정 (네트워크 에러 시뮬레이션)

# 테스트 작성 순서
1. toggleCityLike() - 핵심 시나리오 (6개)
2. toggleCityLike() - 에러 처리 (8개)
3. toggleCityLike() - Edge cases (4개)
4. toggleCityLike() - Fallback 로직 (2개)
5. fetchUserCityLikes() - 정상/에러/Edge (8개)

# 실행
pnpm test __tests__/unit/api
```

### Phase 3: lib/utils.ts 테스트 (18개 테스트)
```bash
# 파일 생성
__tests__/unit/utils/utils.test.ts

# 테스트 작성 순서
1. cn() - 9개 테스트
2. formatCurrency() - 8개 테스트
3. getCharacteristicEmoji() - 8개 테스트
4. getCharacteristicLabel() - 7개 테스트

# 실행
pnpm test __tests__/unit/utils
```

### Phase 4: lib/adapters/city-adapter.ts 테스트 (15개 테스트)
```bash
# 파일 생성
__tests__/unit/adapters/city-adapter.test.ts

# 테스트 작성 순서
1. adaptCityData() - 기본 변환 테스트
2. adaptCityData() - null/undefined 처리
3. adaptCityData() - 배열 필드 변환
4. adaptCitiesData() - 배열 변환 테스트

# 실행
pnpm test __tests__/unit/adapters
```

### Phase 5: lib/data.ts 테스트 (20개 테스트)
```bash
# 파일 생성
__tests__/unit/data/data.test.ts

# 테스트 작성 순서
1. cities 배열 검증 - 5개 테스트
2. featuredCity 검증 - 3개 테스트
3. getCityById() - 8개 테스트
4. getRelatedCities() - 17개 테스트

# 실행
pnpm test __tests__/unit/data
```

### Phase 6: constants/filters.ts 테스트 (8개 테스트, 선택)
```bash
# 파일 생성
__tests__/unit/constants/filters.test.ts

# 테스트 작성 순서
1. BUDGET_OPTIONS - 2개 테스트
2. REGION_OPTIONS - 2개 테스트
3. ENVIRONMENT_OPTIONS - 2개 테스트
4. SEASON_OPTIONS - 2개 테스트

# 실행
pnpm test __tests__/unit/constants
```

### Phase 7: 전체 테스트 실행 및 커버리지 확인
```bash
# 전체 유닛 테스트 실행
pnpm test:unit

# 커버리지 확인
pnpm test:coverage

# 목표: 80% 이상
```

---

## 테스트 작성 체크리스트

### 🔴 HIGH PRIORITY - lib/api/cities-client.ts (최우선)
- [ ] toggleCityLike() - 핵심 시나리오 (6개)
  - [ ] 좋아요 추가 (null → like)
  - [ ] 좋아요 취소 (like → null)
  - [ ] 좋아요→싫어요 (like → dislike)
  - [ ] 싫어요 추가 (null → dislike)
  - [ ] 싫어요 취소 (dislike → null)
  - [ ] 싫어요→좋아요 (dislike → like)
- [ ] toggleCityLike() - 에러 처리 (8개)
  - [ ] 인증되지 않은 사용자
  - [ ] Supabase 연결 에러
  - [ ] DB fetch 에러
  - [ ] DB insert 에러
  - [ ] DB update 에러
  - [ ] DB delete 에러
  - [ ] 네트워크 타임아웃
  - [ ] 세션 만료
- [ ] toggleCityLike() - Edge cases (4개)
  - [ ] 동시 요청 (race condition)
  - [ ] 잘못된 cityId
  - [ ] 잘못된 likeType
  - [ ] null cityId
- [ ] toggleCityLike() - Fallback 로직 (2개)
  - [ ] Supabase 실패 → localStorage
  - [ ] 복구 시 localStorage → Supabase 동기화
- [ ] fetchUserCityLikes() - 정상 케이스 (3개)
- [ ] fetchUserCityLikes() - 에러 처리 (3개)
- [ ] fetchUserCityLikes() - Edge cases (2개)
- [ ] **소계: 24개 테스트**

### lib/utils.ts (Priority 🔴)
- [ ] cn() - 9개 테스트
- [ ] formatCurrency() - 8개 테스트
- [ ] getCharacteristicEmoji() - 8개 테스트
- [ ] getCharacteristicLabel() - 7개 테스트
- [ ] **소계: 18개 테스트**

### lib/adapters/city-adapter.ts (Priority 🔴)
- [ ] adaptCityData() - 필드 변환 테스트 (10개)
- [ ] adaptCityData() - null/undefined 처리 (4개)
- [ ] adaptCityData() - 배열 변환 (3개)
- [ ] adaptCityData() - 전체 객체 (2개)
- [ ] adaptCitiesData() - 배열 변환 (5개)
- [ ] **소계: 15개 테스트**

### lib/data.ts (Priority 🟡)
- [ ] cities 배열 검증 (5개)
- [ ] featuredCity 검증 (3개)
- [ ] getCityById() - 정상 케이스 (3개)
- [ ] getCityById() - Edge cases (5개)
- [ ] getRelatedCities() - 기본 동작 (4개)
- [ ] getRelatedCities() - 점수 계산 (4개)
- [ ] getRelatedCities() - 정렬 로직 (2개)
- [ ] getRelatedCities() - Edge cases (5개)
- [ ] getRelatedCities() - 실제 데이터 (3개)
- [ ] **소계: 20개 테스트**

### constants/filters.ts (Priority 🟢, 선택)
- [ ] BUDGET_OPTIONS (2개)
- [ ] REGION_OPTIONS (2개)
- [ ] ENVIRONMENT_OPTIONS (2개)
- [ ] SEASON_OPTIONS (2개)
- [ ] **소계: 8개 테스트**

---

## 총 테스트 개수

| 파일 | 우선순위 | 테스트 개수 | 상태 |
|------|---------|------------|------|
| lib/api/cities-client.ts | 🔴 **HIGH PRIORITY** | 24개 | ⏳ 대기 |
| lib/utils.ts | 🔴 필수 | 18개 | ⏳ 대기 |
| lib/adapters/city-adapter.ts | 🔴 필수 | 15개 | ⏳ 대기 |
| lib/data.ts | 🟡 중요 | 20개 | ⏳ 대기 |
| constants/filters.ts | 🟢 선택 | 8개 | ⏳ 대기 |
| **합계** | | **85개** | |

---

## 예상 작업 시간

| Phase | 작업 내용 | 예상 시간 |
|-------|----------|----------|
| Phase 1 | 환경 설정 (Vitest, MSW, mocks) | 45분 |
| Phase 2 | lib/api/cities-client.ts (24개, 최우선) | 2시간 |
| Phase 3 | lib/utils.ts (18개) | 1시간 |
| Phase 4 | lib/adapters (15개) | 45분 |
| Phase 5 | lib/data.ts (20개) | 1.5시간 |
| Phase 6 | constants (8개, 선택) | 20분 |
| Phase 7 | 커버리지 개선 | 30분 |
| **합계** | | **약 6.5시간** |

---

**작성일**: 2025-01-21
**작성자**: Claude Code
**프로젝트**: Nomad Korea
**총 테스트 케이스**: 61개

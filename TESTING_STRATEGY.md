# Nomad Korea 테스트 전략 및 구조 설계

## 📋 목차
1. [현재 프로젝트 구조 분석](#현재-프로젝트-구조-분석)
2. [테스트 프레임워크 선택](#테스트-프레임워크-선택)
3. [테스트 계층 구조](#테스트-계층-구조)
4. [테스트 대상 분류](#테스트-대상-분류)
5. [테스트 파일 구조](#테스트-파일-구조)
6. [Mock 전략](#mock-전략)
7. [커버리지 목표](#커버리지-목표)
8. [테스트 실행 전략](#테스트-실행-전략)

---

## 현재 프로젝트 구조 분석

### 프로젝트 개요
- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **백엔드**: Supabase (PostgreSQL + Auth)
- **상태 관리**: React Hooks (useState, useMemo)
- **패키지 매니저**: pnpm

### 디렉토리 구조

```
nomad-korea/
├── app/                      # Next.js App Router
│   ├── auth/
│   │   └── confirm/
│   ├── cities/
│   │   └── [id]/             # 동적 라우트
│   ├── error/
│   ├── login/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/               # React 컴포넌트
│   ├── ui/                   # shadcn/ui 컴포넌트
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── category-tabs.tsx
│   ├── city-card.tsx         # Client Component
│   ├── city-characteristics-section.tsx
│   ├── city-detail-hero.tsx
│   ├── city-detail-navigation.tsx
│   ├── city-grid.tsx
│   ├── city-info-cards.tsx
│   ├── city-like-buttons.tsx # Client Component (상태 관리)
│   ├── city-list-client.tsx  # Client Component
│   ├── filter-bar.tsx        # Client Component (필터 상태)
│   ├── header.tsx
│   ├── hero-banner.tsx
│   └── related-cities.tsx
│
├── lib/                      # 비즈니스 로직 & 유틸리티
│   ├── adapters/
│   │   └── city-adapter.ts   # Supabase ↔ App 타입 변환
│   ├── api/
│   │   ├── cities.ts         # Server-side API
│   │   └── cities-client.ts  # Client-side API
│   ├── data.ts               # 로컬 더미 데이터
│   ├── types.ts              # TypeScript 타입 정의
│   └── utils.ts              # 유틸리티 함수
│
├── utils/                    # Supabase 클라이언트
│   └── supabase/
│       ├── client.ts
│       ├── middleware.ts
│       └── server.ts
│
├── types/                    # 전역 타입 정의
│   └── filters.ts
│
├── constants/                # 상수 정의
│   └── filters.ts
│
└── middleware.ts             # Next.js 미들웨어

```

### 테스트 가능한 코드 분류

#### 1. 순수 함수 (Pure Functions) - ✅ 테스트 용이
```typescript
// lib/utils.ts
- cn()                         // Tailwind 클래스 병합
- formatCurrency()             // 통화 포맷팅
- getCharacteristicEmoji()     // 특성 → 이모지 매핑
- getCharacteristicLabel()     // 특성 → 라벨 매핑
```

#### 2. 데이터 변환 함수 - ✅ 테스트 용이
```typescript
// lib/adapters/city-adapter.ts
- adaptCityData()              // Supabase → App 타입 변환
- adaptCitiesData()            // 배열 변환
```

#### 3. API 함수 (Server) - ⚠️ Mock 필요
```typescript
// lib/api/cities.ts
- fetchCities()                // 도시 목록 조회
- fetchCityById()              // 도시 상세 조회
- fetchRelatedCities()         // 관련 도시 조회
```

#### 4. API 함수 (Client) - ⚠️ Mock 필요
```typescript
// lib/api/cities-client.ts
- toggleCityLike()             // 좋아요/싫어요 토글
- fetchUserCityLikes()         // 사용자 좋아요 목록
```

#### 5. React 컴포넌트 - ⚠️ RTL 필요
```typescript
// Server Components
- app/page.tsx
- app/cities/[id]/page.tsx
- components/hero-banner.tsx
- components/city-grid.tsx
- components/related-cities.tsx

// Client Components (상태 관리)
- components/city-card.tsx
- components/city-like-buttons.tsx
- components/filter-bar.tsx
- components/city-list-client.tsx
```

---

## 테스트 프레임워크 선택

### 추천 스택

| 도구 | 용도 | 이유 |
|------|------|------|
| **Vitest** | 단위 테스트 러너 | - Vite 기반 (빠른 속도)<br>- Jest 호환 API<br>- ESM 네이티브 지원<br>- TypeScript 기본 지원 |
| **React Testing Library (RTL)** | React 컴포넌트 테스트 | - 사용자 중심 테스트<br>- Next.js 공식 추천<br>- 접근성 중시 |
| **MSW (Mock Service Worker)** | API Mock | - 네트워크 레벨 모킹<br>- Supabase API 모킹 |
| **@testing-library/user-event** | 사용자 이벤트 시뮬레이션 | - 실제 사용자 행동 모방<br>- 비동기 이벤트 지원 |
| **@supabase/supabase-js (Mock)** | Supabase 클라이언트 Mock | - 데이터베이스 쿼리 모킹 |

### 대안: Jest

Jest도 사용 가능하지만, Vitest가 다음 이유로 더 적합:
- ⚡ 더 빠른 속도 (ESM, Vite 기반)
- 🔧 Next.js 15 + Turbopack과 호환성 우수
- 📦 별도 변환 설정 불필요
- 🎯 TypeScript 기본 지원

---

## 테스트 계층 구조

### 1. 단위 테스트 (Unit Tests) - 70%

**대상**: 순수 함수, 데이터 변환, 유틸리티

```
__tests__/
├── unit/
│   ├── utils/
│   │   ├── utils.test.ts              # lib/utils.ts 테스트
│   │   ├── formatCurrency.test.ts
│   │   ├── characteristicHelpers.test.ts
│   │   └── cn.test.ts
│   │
│   ├── adapters/
│   │   ├── city-adapter.test.ts       # Supabase ↔ App 변환 테스트
│   │   └── type-conversion.test.ts
│   │
│   ├── data/
│   │   ├── city-data.test.ts          # lib/data.ts 테스트
│   │   ├── getCityById.test.ts
│   │   └── getRelatedCities.test.ts
│   │
│   └── constants/
│       └── filters.test.ts            # 상수 검증
```

### 2. 통합 테스트 (Integration Tests) - 20%

**대상**: API 함수, 컴포넌트 간 상호작용

```
__tests__/
├── integration/
│   ├── api/
│   │   ├── cities-server.test.ts      # Server API 통합 테스트
│   │   ├── cities-client.test.ts      # Client API 통합 테스트
│   │   └── supabase-integration.test.ts
│   │
│   └── components/
│       ├── city-like-flow.test.tsx    # 좋아요 전체 플로우
│       ├── filter-flow.test.tsx       # 필터링 플로우
│       └── navigation-flow.test.tsx   # 페이지 네비게이션
```

### 3. 컴포넌트 테스트 (Component Tests) - 10%

**대상**: UI 컴포넌트, 사용자 상호작용

```
__tests__/
├── components/
│   ├── ui/
│   │   ├── button.test.tsx
│   │   ├── card.test.tsx
│   │   └── badge.test.tsx
│   │
│   ├── city-card.test.tsx             # 도시 카드 렌더링
│   ├── city-like-buttons.test.tsx     # 좋아요 버튼 상태 관리
│   ├── filter-bar.test.tsx            # 필터 UI
│   ├── city-grid.test.tsx             # 그리드 렌더링
│   └── related-cities.test.tsx        # 관련 도시 추천
```

---

## 테스트 대상 분류

### Priority 1: 핵심 비즈니스 로직 (필수) 🔴

#### lib/utils.ts
```typescript
✅ formatCurrency()
  - 입력: 1000000
  - 출력: "₩1,000,000"
  - Edge cases: 0, 음수, 소수점

✅ getCharacteristicEmoji()
  - 입력: 'coastal'
  - 출력: '🏖️'
  - Edge cases: 알 수 없는 특성

✅ getCharacteristicLabel()
  - 입력: 'mountain'
  - 출력: '산악'
  - Edge cases: 알 수 없는 특성
```

#### lib/adapters/city-adapter.ts
```typescript
✅ adaptCityData()
  - snake_case → camelCase 변환
  - 타입 정확성 검증
  - null/undefined 처리

✅ adaptCitiesData()
  - 배열 변환
  - 빈 배열 처리
```

#### lib/data.ts
```typescript
✅ getCityById()
  - 존재하는 ID: 도시 반환
  - 존재하지 않는 ID: undefined

✅ getRelatedCities()
  - 지능형 추천 알고리즘 검증
  - 점수 계산 로직
  - limit 파라미터 동작
```

### Priority 2: API 함수 (중요) 🟡

#### lib/api/cities.ts (Server)
```typescript
⚠️ fetchCities()
  - 필터링 동작 (budget, region, environment, season)
  - 정렬 동작 (likes, rating, name)
  - 에러 처리

⚠️ fetchCityById()
  - 존재하는 ID
  - 존재하지 않는 ID
  - 에러 처리

⚠️ fetchRelatedCities()
  - 추천 알고리즘
  - limit 파라미터
```

#### lib/api/cities-client.ts (Client)
```typescript
⚠️ toggleCityLike()
  - 좋아요 추가
  - 좋아요 취소
  - 좋아요 → 싫어요 전환
  - 인증 에러 처리

⚠️ fetchUserCityLikes()
  - 인증된 사용자
  - 비인증 사용자
```

### Priority 3: React 컴포넌트 (선택) 🟢

#### Client Components
```typescript
⚠️ CityLikeButtons
  - 초기 상태 렌더링
  - 클릭 이벤트 (좋아요/싫어요)
  - 옵티미스틱 업데이트
  - 에러 시 롤백

⚠️ FilterBar
  - 필터 선택
  - 필터 초기화
  - 활성 필터 카운트

⚠️ CityCard
  - 데이터 렌더링
  - 클릭 네비게이션
```

#### Server Components
```typescript
⚠️ CityGrid
  - 빈 리스트 처리
  - 도시 카드 렌더링

⚠️ RelatedCities
  - 관련 도시 표시
  - 빈 리스트 처리
```

---

## 테스트 파일 구조

### 파일명 규칙

```
src 파일                       테스트 파일
────────────────────────────────────────────────────
lib/utils.ts              →  __tests__/unit/utils/utils.test.ts
lib/adapters/
  city-adapter.ts         →  __tests__/unit/adapters/city-adapter.test.ts
lib/api/cities.ts         →  __tests__/integration/api/cities-server.test.ts
lib/api/cities-client.ts  →  __tests__/integration/api/cities-client.test.ts
components/
  city-card.tsx           →  __tests__/components/city-card.test.tsx
  city-like-buttons.tsx   →  __tests__/components/city-like-buttons.test.tsx
```

### 디렉토리 구조

```
nomad-korea/
├── __tests__/                    # 테스트 루트
│   ├── setup.ts                  # 전역 테스트 설정
│   ├── mocks/                    # Mock 데이터 & 함수
│   │   ├── supabase.ts           # Supabase 클라이언트 Mock
│   │   ├── city-data.ts          # 테스트용 도시 데이터
│   │   └── handlers.ts           # MSW 핸들러
│   │
│   ├── unit/                     # 단위 테스트
│   │   ├── utils/
│   │   │   ├── utils.test.ts
│   │   │   ├── formatCurrency.test.ts
│   │   │   └── characteristicHelpers.test.ts
│   │   ├── adapters/
│   │   │   └── city-adapter.test.ts
│   │   ├── data/
│   │   │   ├── getCityById.test.ts
│   │   │   └── getRelatedCities.test.ts
│   │   └── constants/
│   │       └── filters.test.ts
│   │
│   ├── integration/              # 통합 테스트
│   │   ├── api/
│   │   │   ├── cities-server.test.ts
│   │   │   └── cities-client.test.ts
│   │   └── components/
│   │       ├── city-like-flow.test.tsx
│   │       └── filter-flow.test.tsx
│   │
│   └── components/               # 컴포넌트 테스트
│       ├── ui/
│       │   ├── button.test.tsx
│       │   └── card.test.tsx
│       ├── city-card.test.tsx
│       ├── city-like-buttons.test.tsx
│       ├── filter-bar.test.tsx
│       └── city-grid.test.tsx
│
├── vitest.config.ts              # Vitest 설정
└── package.json                  # 테스트 스크립트 추가
```

---

## Mock 전략

### 1. Supabase 클라이언트 Mock

```typescript
// __tests__/mocks/supabase.ts

import { vi } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';

export const mockSupabaseClient = {
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: mockCity, error: null }),
    insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    update: vi.fn().mockResolvedValue({ data: null, error: null }),
    delete: vi.fn().mockResolvedValue({ data: null, error: null }),
  })),
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
  },
} as unknown as SupabaseClient;

// Mock 데이터
export const mockCity = {
  id: 'test-uuid-1',
  name: '테스트시',
  region: '제주도',
  // ... 나머지 필드
};

export const mockUser = {
  id: 'user-uuid-1',
  email: 'test@example.com',
};
```

### 2. MSW (Mock Service Worker)

```typescript
// __tests__/mocks/handlers.ts

import { http, HttpResponse } from 'msw';

export const handlers = [
  // Supabase API Mock
  http.get('https://qzmxjjklzoopdlsajlfa.supabase.co/rest/v1/cities', () => {
    return HttpResponse.json([mockCity]);
  }),

  http.post('https://qzmxjjklzoopdlsajlfa.supabase.co/rest/v1/city_likes', () => {
    return HttpResponse.json({ success: true });
  }),
];
```

### 3. Next.js Router Mock

```typescript
// __tests__/mocks/next-router.ts

import { vi } from 'vitest';

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
}));
```

---

## 커버리지 목표

### 전체 목표: 80% 이상

| 카테고리 | 목표 커버리지 | 우선순위 |
|----------|--------------|----------|
| **lib/utils.ts** | 100% | 🔴 최우선 |
| **lib/adapters/** | 100% | 🔴 최우선 |
| **lib/data.ts** | 90% | 🔴 최우선 |
| **lib/api/** | 80% | 🟡 중요 |
| **components/** (Client) | 70% | 🟡 중요 |
| **components/** (Server) | 60% | 🟢 선택 |
| **app/** (Pages) | 50% | 🟢 선택 |

### 측정 방법

```bash
# 커버리지 리포트 생성
pnpm test:coverage

# 커버리지 HTML 리포트 열기
open coverage/index.html
```

---

## 테스트 실행 전략

### package.json 스크립트

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:unit": "vitest run __tests__/unit",
    "test:integration": "vitest run __tests__/integration",
    "test:components": "vitest run __tests__/components"
  }
}
```

### CI/CD 파이프라인

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### 로컬 개발 워크플로우

1. **Watch 모드로 개발**
   ```bash
   pnpm test:watch
   ```

2. **특정 파일 테스트**
   ```bash
   pnpm test lib/utils
   ```

3. **UI 모드로 디버깅**
   ```bash
   pnpm test:ui
   ```

4. **커밋 전 전체 테스트**
   ```bash
   pnpm test:coverage
   ```

---

## 테스트 작성 가이드라인

### 1. 테스트 구조 (AAA 패턴)

```typescript
describe('formatCurrency', () => {
  it('should format Korean currency correctly', () => {
    // Arrange (준비)
    const amount = 1000000;

    // Act (실행)
    const result = formatCurrency(amount);

    // Assert (검증)
    expect(result).toBe('₩1,000,000');
  });
});
```

### 2. 테스트 이름 규칙

```typescript
// ✅ Good: 행동 중심, 명확한 설명
it('should return city when valid ID is provided', () => {});
it('should return undefined when city is not found', () => {});

// ❌ Bad: 모호한 설명
it('works', () => {});
it('test getCityById', () => {});
```

### 3. Edge Cases 테스트

```typescript
describe('formatCurrency', () => {
  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('₩0');
  });

  it('should handle negative numbers', () => {
    expect(formatCurrency(-1000)).toBe('-₩1,000');
  });

  it('should handle decimal numbers', () => {
    expect(formatCurrency(1000.99)).toBe('₩1,001');
  });
});
```

### 4. Mock 사용 최소화

```typescript
// ✅ Good: 순수 함수는 Mock 없이 테스트
it('should convert city data correctly', () => {
  const input = { name: 'Seoul', image_url: 'http://...' };
  const output = adaptCityData(input);
  expect(output.imageUrl).toBe('http://...');
});

// ⚠️ Only when necessary: API 함수만 Mock 사용
it('should fetch cities from Supabase', async () => {
  mockSupabase.from().select().mockResolvedValue({ data: [mockCity] });
  const cities = await fetchCities();
  expect(cities).toHaveLength(1);
});
```

---

## 다음 단계

### Phase 1: 환경 설정 (1시간)
1. Vitest, RTL 설치
2. vitest.config.ts 작성
3. __tests__ 디렉토리 생성
4. Mock 설정 파일 작성

### Phase 2: 단위 테스트 작성 (3시간)
1. lib/utils.ts 테스트
2. lib/adapters/city-adapter.ts 테스트
3. lib/data.ts 테스트

### Phase 3: 통합 테스트 작성 (2시간)
1. API 함수 테스트 (Supabase Mock)
2. 컴포넌트 통합 테스트

### Phase 4: 커버리지 개선 (1시간)
1. 커버리지 측정
2. 누락된 테스트 추가
3. 80% 목표 달성

---

**작성일**: 2025-01-21
**작성자**: Claude Code
**프로젝트**: Nomad Korea

# Nomad Korea 테스트 가이드

## 📋 테스트 구조

```
__tests__/
├── unit/                           # 유닛 테스트 (Vitest)
│   ├── api/                        # API 레이어 테스트
│   ├── utils/                      # 유틸리티 함수 테스트
│   ├── adapters/                   # 데이터 어댑터 테스트
│   ├── data/                       # 데이터 레이어 테스트
│   └── constants/                  # 상수 테스트
│
├── e2e/                            # E2E 테스트 (Playwright)
│   ├── auth/                       # 인증 테스트
│   ├── cities/                     # 도시 기능 테스트
│   ├── filters/                    # 필터 시스템 테스트
│   ├── preferences/                # 좋아요/싫어요 테스트
│   ├── responsive/                 # 반응형 디자인 테스트
│   ├── performance/                # 성능 테스트
│   └── accessibility/              # 접근성 테스트
│
├── fixtures/                       # Playwright Fixtures
│   ├── auth.fixture.ts
│   ├── city-data.fixture.ts
│   └── user-preferences.fixture.ts
│
├── helpers/                        # E2E 헬퍼 함수
│   ├── navigation.helper.ts
│   ├── filter.helper.ts
│   └── assertions.helper.ts
│
├── pages/                          # Page Object Model (POM)
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── city-detail.page.ts
│   └── components/
│       ├── filter-bar.component.ts
│       └── city-card.component.ts
│
├── mocks/                          # Mock 데이터
│   ├── cities.mock.ts
│   └── user.mock.ts
│
└── setup.ts                        # 유닛 테스트 setup
```

---

## 🧪 유닛 테스트 (Vitest)

### 실행 방법

```bash
# 모든 유닛 테스트 실행
pnpm test

# UI 모드로 실행
pnpm test:ui

# 커버리지 리포트 생성
pnpm test:coverage
```

### 테스트 현황

- **총 테스트**: 112개
- **통과율**: 100%
- **커버리지**: 100% (핵심 모듈)

---

## 🎭 E2E 테스트 (Playwright)

### 실행 방법

```bash
# 모든 E2E 테스트 실행 (헤드리스)
pnpm test:e2e

# UI 모드로 실행 (인터랙티브)
pnpm test:e2e:ui

# 디버그 모드로 실행
pnpm test:e2e:debug

# 브라우저 창 띄우기 (headed)
pnpm test:e2e:headed

# 테스트 리포트 보기
pnpm test:e2e:report
```

### 브라우저 설정

- **Desktop**: Chromium, Firefox, WebKit (Safari)
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)
- **Tablet**: iPad Pro

### 테스트 계획

| 기능 영역 | 파일 수 | 테스트 케이스 | 우선순위 |
|----------|--------|-------------|---------|
| Auth | 3 | 12 | 🔴 High |
| Cities | 4 | 28 | 🔴 High |
| Filters | 4 | 24 | 🔴 High |
| Preferences | 3 | 18 | 🔴 High |
| Responsive | 3 | 15 | 🟡 Medium |
| Performance | 3 | 12 | 🟡 Medium |
| Accessibility | 3 | 15 | 🟢 Low |
| **Total** | **23** | **124** | - |

---

## 📦 Page Object Model (POM)

### 사용 예시

```typescript
import { test } from '@playwright/test';
import { HomePage } from '@/__tests__/pages/home.page';

test('도시 카드 클릭 시 상세 페이지로 이동', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.clickCityCard('1');

  expect(page.url()).toContain('/cities/1');
});
```

### 주요 POM 클래스

- `BasePage`: 모든 페이지의 기본 클래스
- `HomePage`: 메인 페이지 (`/`)
- `CityDetailPage`: 도시 상세 페이지 (`/cities/[id]`)
- `FilterBarComponent`: 필터바 컴포넌트
- `CityCardComponent`: 도시 카드 컴포넌트

---

## 🔧 Fixtures

### 사용 예시

```typescript
import { test } from '@playwright/test';
import { authFixture } from '@/__tests__/fixtures/auth.fixture';
import { cityDataFixture } from '@/__tests__/fixtures/city-data.fixture';

const testWithAuth = test.extend(authFixture);
const testWithCity = test.extend(cityDataFixture);

testWithAuth('인증된 사용자로 테스트', async ({ page, authenticatedUser }) => {
  // authenticatedUser fixture 사용
  console.log(authenticatedUser.email); // test@example.com
});

testWithCity('제주시 데이터로 테스트', async ({ page, jejuCity }) => {
  // jejuCity fixture 사용
  console.log(jejuCity.name); // 제주시
});
```

### 주요 Fixtures

- `authFixture`: 인증 관련 fixture (authenticated/anonymous user)
- `cityDataFixture`: 도시 데이터 fixture (제주시, 강릉시, 부산)
- `userPreferencesFixture`: 사용자 선호도 fixture (liked/disliked cities)

---

## 🛠️ Helpers

### Navigation Helper

```typescript
import { goToHomePage, goToCityDetail } from '@/__tests__/helpers/navigation.helper';

await goToHomePage(page);
await goToCityDetail(page, '1');
```

### Filter Helper

```typescript
import {
  selectBudgetFilter,
  resetAllFilters,
  getActiveFilterCount
} from '@/__tests__/helpers/filter.helper';

await selectBudgetFilter(page, '100만원 미만');
const count = await getActiveFilterCount(page); // 1
await resetAllFilters(page);
```

### Assertions Helper

```typescript
import {
  assertCityCardVisible,
  assertFilterApplied
} from '@/__tests__/helpers/assertions.helper';

await assertCityCardVisible(page, '1', '제주시 카드가 보여야 함');
await assertFilterApplied(page, 'budget', '100만원 미만');
```

---

## 📊 Mock 데이터

### Cities Mock

```typescript
import { mockCities, mockCitiesByBudget } from '@/__tests__/mocks/cities.mock';

const allCities = mockCities; // 12개 도시
const under1M = mockCitiesByBudget.under1M; // 100만원 미만 도시
```

### User Mock

```typescript
import { mockAuthenticatedUser, mockUserPreferences } from '@/__tests__/mocks/user.mock';

const user = mockAuthenticatedUser;
const liked = mockUserPreferences.likedCities; // ['1', '3', '5']
```

---

## 🔍 테스트 작성 가이드

### 1. 유닛 테스트 작성

```typescript
// __tests__/unit/utils/example.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/utils/example';

describe('myFunction', () => {
  it('should return correct value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### 2. E2E 테스트 작성

```typescript
// __tests__/e2e/cities/example.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '@/__tests__/pages/home.page';

test.describe('도시 목록 테스트', () => {
  test('도시 카드가 표시됨', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    const count = await homePage.getCityCardCount();
    expect(count).toBeGreaterThan(0);
  });
});
```

---

## 📝 Best Practices

### 1. 테스트 독립성

각 테스트는 독립적으로 실행 가능해야 함

```typescript
test.beforeEach(async ({ page }) => {
  // 매 테스트마다 초기 상태로 리셋
  await page.goto('/');
});
```

### 2. 명확한 Assertion 메시지

```typescript
await expect(
  page.locator('.city-card'),
  '예산 필터 적용 시 5개 도시가 표시되어야 함'
).toHaveCount(5);
```

### 3. Page Object Model 사용

```typescript
// ❌ Bad
await page.locator('[data-testid="city-card"]').click();

// ✅ Good
const homePage = new HomePage(page);
await homePage.clickCityCard('1');
```

### 4. 재사용 가능한 Helper 함수

```typescript
// ❌ Bad (중복 코드)
await page.locator('select').nth(0).selectOption('100만원 미만');
await page.waitForTimeout(500);

// ✅ Good (Helper 사용)
await selectBudgetFilter(page, '100만원 미만');
```

---

## 🚀 CI/CD 통합

### GitHub Actions

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📈 다음 단계

1. **High Priority 테스트 작성** (Auth, Cities, Filters, Preferences)
2. **Medium Priority 테스트 작성** (Responsive, Performance)
3. **Low Priority 테스트 작성** (Accessibility)
4. **CI/CD 통합**
5. **Visual Regression Testing** (Percy, Chromatic)

---

**문서 업데이트**: 2025-10-21
**프로젝트**: Nomad Korea
**테스트 프레임워크**: Vitest, Playwright

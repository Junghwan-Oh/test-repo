# E2E 테스트 폴더 구조 설계 (Playwright)

## 📋 목차

1. [추천 폴더 구조](#추천-폴더-구조)
2. [폴더별 역할 설명](#폴더별-역할-설명)
3. [설정 파일 구조](#설정-파일-구조)
4. [테스트 조직화 전략](#테스트-조직화-전략)
5. [Fixture 및 Helper 조직화](#fixture-및-helper-조직화)
6. [Best Practices](#best-practices)
7. [대안 구조 비교](#대안-구조-비교)

---

## 🎯 추천 폴더 구조

```
nomad-korea/
├── __tests__/
│   ├── unit/                           # 기존 유닛 테스트 (112 tests)
│   │   ├── api/
│   │   ├── utils/
│   │   ├── adapters/
│   │   ├── data/
│   │   └── constants/
│   │
│   ├── e2e/                            # E2E 테스트 (새로 추가)
│   │   ├── auth/                       # 인증 관련 E2E 테스트
│   │   │   ├── login.spec.ts
│   │   │   ├── logout.spec.ts
│   │   │   └── protected-routes.spec.ts
│   │   │
│   │   ├── cities/                     # 도시 기능 E2E 테스트
│   │   │   ├── city-list.spec.ts       # 도시 목록 페이지
│   │   │   ├── city-detail.spec.ts     # 도시 상세 페이지
│   │   │   ├── city-navigation.spec.ts # 네비게이션 (메인→상세→관련도시)
│   │   │   └── city-sharing.spec.ts    # 공유 기능
│   │   │
│   │   ├── filters/                    # 필터 기능 E2E 테스트
│   │   │   ├── filter-basic.spec.ts    # 단일 필터
│   │   │   ├── filter-combination.spec.ts # 다중 필터 조합
│   │   │   ├── filter-persistence.spec.ts # URL 쿼리 파라미터
│   │   │   └── filter-reset.spec.ts    # 필터 초기화
│   │   │
│   │   ├── preferences/                # 좋아요/싫어요 E2E 테스트
│   │   │   ├── like-dislike-toggle.spec.ts  # 토글 동작
│   │   │   ├── preference-persistence.spec.ts # 상태 지속성
│   │   │   └── preference-fallback.spec.ts  # Fallback 동작
│   │   │
│   │   ├── responsive/                 # 반응형 디자인 E2E 테스트
│   │   │   ├── mobile.spec.ts          # 모바일 (375px)
│   │   │   ├── tablet.spec.ts          # 태블릿 (768px)
│   │   │   └── desktop.spec.ts         # 데스크톱 (1920px)
│   │   │
│   │   ├── performance/                # 성능 테스트
│   │   │   ├── page-load.spec.ts       # 페이지 로딩 시간
│   │   │   ├── ssg-validation.spec.ts  # SSG 사전 생성 확인
│   │   │   └── lighthouse.spec.ts      # Lighthouse 점수
│   │   │
│   │   └── accessibility/              # 접근성 테스트
│   │       ├── keyboard-navigation.spec.ts  # 키보드 네비게이션
│   │       ├── screen-reader.spec.ts   # 스크린 리더
│   │       └── aria-labels.spec.ts     # ARIA 레이블
│   │
│   ├── fixtures/                       # Playwright Fixtures
│   │   ├── auth.fixture.ts             # 인증 상태 fixture
│   │   ├── city-data.fixture.ts        # 도시 데이터 fixture
│   │   └── user-preferences.fixture.ts # 사용자 선호도 fixture
│   │
│   ├── helpers/                        # E2E 테스트 헬퍼 함수
│   │   ├── navigation.helper.ts        # 네비게이션 헬퍼
│   │   ├── auth.helper.ts              # 인증 헬퍼
│   │   ├── filter.helper.ts            # 필터 조작 헬퍼
│   │   └── assertions.helper.ts        # 커스텀 assertion
│   │
│   ├── pages/                          # Page Object Model (POM)
│   │   ├── base.page.ts                # 기본 페이지 클래스
│   │   ├── home.page.ts                # 메인 페이지 POM
│   │   ├── city-detail.page.ts         # 도시 상세 페이지 POM
│   │   ├── login.page.ts               # 로그인 페이지 POM
│   │   └── components/                 # 컴포넌트 POM
│   │       ├── filter-bar.component.ts
│   │       ├── city-card.component.ts
│   │       └── navigation.component.ts
│   │
│   ├── mocks/                          # E2E 테스트용 Mock 데이터
│   │   ├── cities.mock.ts              # 도시 Mock 데이터
│   │   ├── user.mock.ts                # 사용자 Mock 데이터
│   │   └── supabase.mock.ts            # Supabase API Mock
│   │
│   └── setup.ts                        # 기존 유닛 테스트 setup
│
├── playwright.config.ts                # Playwright 설정 파일
├── playwright-auth.setup.ts            # 인증 상태 글로벌 setup
├── vitest.config.ts                    # 기존 Vitest 설정
└── package.json

```

---

## 📂 폴더별 역할 설명

### 1. `__tests__/e2e/` - E2E 테스트 루트

**목적**: 모든 End-to-End 테스트를 기능별로 조직화

**조직화 원칙**:
- **기능 중심 (Feature-based)**: 각 기능별로 디렉토리 분리
- **도메인 중심 (Domain-based)**: 비즈니스 도메인 반영
- **독립성**: 각 테스트 파일은 독립적으로 실행 가능

#### 1.1 `auth/` - 인증 테스트

**파일 목록**:
- `login.spec.ts`: 로그인 플로우 (이메일/비밀번호, OAuth)
- `logout.spec.ts`: 로그아웃 플로우
- `protected-routes.spec.ts`: 보호된 라우트 접근 제어

**테스트 범위**:
- Supabase Auth 통합
- 인증 상태 지속성 (localStorage, cookie)
- 리다이렉션 플로우

#### 1.2 `cities/` - 도시 기능 테스트

**파일 목록**:
- `city-list.spec.ts`: 도시 목록 렌더링, 정렬, 페이지네이션
- `city-detail.spec.ts`: 상세 페이지 모든 섹션 렌더링
- `city-navigation.spec.ts`: 메인→상세→관련도시 네비게이션
- `city-sharing.spec.ts`: Web Share API, Clipboard fallback

**테스트 범위**:
- SSG 사전 생성된 페이지 로딩
- 동적 라우팅 (`/cities/[id]`)
- 관련 도시 추천 알고리즘 UI 반영
- 404 에러 처리

#### 1.3 `filters/` - 필터 시스템 테스트

**파일 목록**:
- `filter-basic.spec.ts`: 단일 필터 선택 및 결과
- `filter-combination.spec.ts`: 다중 필터 AND 조합
- `filter-persistence.spec.ts`: URL 쿼리 파라미터 동기화
- `filter-reset.spec.ts`: 초기화 버튼, 활성 필터 카운트

**테스트 범위**:
- 4개 필터 (예산, 지역, 환경, 계절)
- 필터 적용 시 CityGrid 업데이트
- URL 상태 관리 (useSearchParams)
- 브라우저 뒤로가기 지원

#### 1.4 `preferences/` - 사용자 선호도 테스트

**파일 목록**:
- `like-dislike-toggle.spec.ts`: 좋아요/싫어요 버튼 토글
- `preference-persistence.spec.ts`: 새로고침 후 상태 유지
- `preference-fallback.spec.ts`: Supabase 에러 시 localStorage

**테스트 범위**:
- 6가지 상태 전환 (null↔like↔dislike)
- UI 실시간 업데이트
- 네트워크 에러 핸들링

#### 1.5 `responsive/` - 반응형 디자인 테스트

**파일 목록**:
- `mobile.spec.ts`: 모바일 (375px, 768px 이하)
- `tablet.spec.ts`: 태블릿 (768px ~ 1024px)
- `desktop.spec.ts`: 데스크톱 (1024px 이상)

**테스트 범위**:
- Grid 레이아웃 변화 (1열→2열→4열)
- 네비게이션 메뉴 변화 (햄버거 메뉴)
- 터치 이벤트 (모바일)

#### 1.6 `performance/` - 성능 테스트

**파일 목록**:
- `page-load.spec.ts`: Core Web Vitals (LCP, FID, CLS)
- `ssg-validation.spec.ts`: 12개 도시 페이지 SSG 확인
- `lighthouse.spec.ts`: Lighthouse CI 통합

**테스트 범위**:
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.8s

#### 1.7 `accessibility/` - 접근성 테스트

**파일 목록**:
- `keyboard-navigation.spec.ts`: Tab, Enter, Space 키 동작
- `screen-reader.spec.ts`: ARIA 레이블, role 속성
- `aria-labels.spec.ts`: 모든 인터랙티브 요소 레이블

**테스트 범위**:
- WCAG 2.1 AA 준수
- axe-core 통합
- 키보드만으로 모든 기능 사용 가능

---

### 2. `__tests__/fixtures/` - Playwright Fixtures

**목적**: 테스트 환경 설정 재사용

**파일 목록**:

#### 2.1 `auth.fixture.ts`
```typescript
// 예시 구조 (코드 작성 X)
export const authFixture = {
  // 로그인된 사용자 상태
  authenticatedUser: { userId: '...', email: '...' },
  // 비로그인 상태
  anonymousUser: null,
  // 인증 쿠키
  authCookies: [...],
};
```

#### 2.2 `city-data.fixture.ts`
```typescript
// 예시 구조 (코드 작성 X)
export const cityDataFixture = {
  // 제주시 데이터
  jejuCity: { id: '1', name: '제주시', ... },
  // 12개 전체 도시
  allCities: [...],
  // 필터링된 도시
  filteredCities: { budget: [...], region: [...] },
};
```

#### 2.3 `user-preferences.fixture.ts`
```typescript
// 예시 구조 (코드 작성 X)
export const userPreferencesFixture = {
  // 좋아요 누른 도시들
  likedCities: ['1', '3', '5'],
  // 싫어요 누른 도시들
  dislikedCities: ['2', '7'],
  // localStorage 데이터
  localStorageData: { ... },
};
```

---

### 3. `__tests__/helpers/` - E2E 헬퍼 함수

**목적**: 테스트 코드 중복 제거 및 재사용성 향상

**파일 목록**:

#### 3.1 `navigation.helper.ts`
- `goToHomePage()`: 메인 페이지 이동
- `goToCityDetail(cityId)`: 도시 상세 페이지 이동
- `clickRelatedCity(index)`: 관련 도시 카드 클릭
- `navigateBackToHome()`: 뒤로 가기

#### 3.2 `auth.helper.ts`
- `loginWithEmail(email, password)`: 이메일 로그인
- `loginWithOAuth(provider)`: OAuth 로그인
- `logout()`: 로그아웃
- `getAuthState()`: 현재 인증 상태 조회

#### 3.3 `filter.helper.ts`
- `selectBudgetFilter(option)`: 예산 필터 선택
- `selectRegionFilter(option)`: 지역 필터 선택
- `selectEnvironmentFilter(option)`: 환경 필터 선택
- `selectSeasonFilter(option)`: 계절 필터 선택
- `resetAllFilters()`: 모든 필터 초기화
- `getActiveFilterCount()`: 활성 필터 개수 조회

#### 3.4 `assertions.helper.ts`
- `assertCityCardVisible(cityId)`: 도시 카드 표시 확인
- `assertFilterApplied(filterType, value)`: 필터 적용 확인
- `assertPreferenceState(cityId, type)`: 선호도 상태 확인
- `assertURLContains(param)`: URL 파라미터 확인

---

### 4. `__tests__/pages/` - Page Object Model (POM)

**목적**: 페이지 구조 캡슐화, 유지보수성 향상

**조직화 원칙**:
- **페이지 단위**: 각 라우트별로 POM 클래스 생성
- **컴포넌트 단위**: 재사용 컴포넌트는 별도 POM
- **상속 구조**: BasePage → 개별 페이지 클래스

#### 4.1 `base.page.ts`
```typescript
// 예시 구조 (코드 작성 X)
export class BasePage {
  // 공통 locator: header, footer, navigation
  readonly header: Locator;
  readonly footer: Locator;

  // 공통 메서드
  async waitForPageLoad(): Promise<void> {}
  async takeScreenshot(name: string): Promise<void> {}
}
```

#### 4.2 `home.page.ts`
```typescript
// 예시 구조 (코드 작성 X)
export class HomePage extends BasePage {
  // Locators
  readonly heroBanner: Locator;
  readonly filterBar: Locator;
  readonly cityGrid: Locator;

  // Actions
  async selectFilter(type, value): Promise<void> {}
  async clickCityCard(cityId): Promise<void> {}

  // Assertions
  async assertCityCount(expected): Promise<void> {}
}
```

#### 4.3 `city-detail.page.ts`
```typescript
// 예시 구조 (코드 작성 X)
export class CityDetailPage extends BasePage {
  // Locators
  readonly cityHero: Locator;
  readonly infoCards: Locator;
  readonly relatedCities: Locator;
  readonly likeButton: Locator;
  readonly dislikeButton: Locator;

  // Actions
  async clickLikeButton(): Promise<void> {}
  async clickShareButton(): Promise<void> {}
  async clickRelatedCity(index): Promise<void> {}

  // Assertions
  async assertCityName(expected): Promise<void> {}
  async assertPreferenceCount(likes, dislikes): Promise<void> {}
}
```

#### 4.4 `components/filter-bar.component.ts`
```typescript
// 예시 구조 (코드 작성 X)
export class FilterBarComponent {
  // Locators
  readonly budgetSelect: Locator;
  readonly regionSelect: Locator;
  readonly environmentSelect: Locator;
  readonly seasonSelect: Locator;
  readonly resetButton: Locator;
  readonly activeCount: Locator;

  // Actions
  async selectBudget(value): Promise<void> {}
  async resetFilters(): Promise<void> {}

  // Getters
  async getActiveFilterCount(): Promise<number> {}
}
```

#### 4.5 `components/city-card.component.ts`
```typescript
// 예시 구조 (코드 작성 X)
export class CityCardComponent {
  // Locators
  readonly cityImage: Locator;
  readonly cityName: Locator;
  readonly rating: Locator;
  readonly likeCount: Locator;
  readonly dislikeCount: Locator;

  // Actions
  async clickCard(): Promise<void> {}

  // Getters
  async getCityName(): Promise<string> {}
  async getLikeCount(): Promise<number> {}
}
```

---

### 5. `__tests__/mocks/` - Mock 데이터

**목적**: E2E 테스트용 일관된 Mock 데이터 제공

**파일 목록**:

#### 5.1 `cities.mock.ts`
- 12개 도시 전체 데이터
- 필터링 시나리오별 데이터
- 빈 결과 시나리오

#### 5.2 `user.mock.ts`
- 인증된 사용자 데이터
- 비인증 사용자 데이터
- 사용자 선호도 데이터

#### 5.3 `supabase.mock.ts`
- Supabase API 응답 Mock
- 에러 시나리오 Mock
- 네트워크 지연 시뮬레이션

---

## ⚙️ 설정 파일 구조

### 1. `playwright.config.ts`

**핵심 설정**:
```typescript
// 예시 구조 (코드 작성 X)
export default defineConfig({
  // 테스트 디렉토리
  testDir: './__tests__/e2e',

  // 테스트 매칭 패턴
  testMatch: '**/*.spec.ts',

  // 병렬 실행
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  // 재시도
  retries: process.env.CI ? 2 : 0,

  // 타임아웃
  timeout: 30 * 1000,
  expect: { timeout: 5 * 1000 },

  // 브라우저 설정
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],

  // 기본 URL
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // 로컬 서버
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },

  // 리포터
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
});
```

### 2. `playwright-auth.setup.ts`

**목적**: 인증 상태를 글로벌로 설정하여 각 테스트에서 재사용

**설정 내용**:
- Supabase 로그인 플로우 자동화
- 인증 쿠키 저장 (`.auth/user.json`)
- 테스트 시작 전 자동 로그인

---

## 🎨 테스트 조직화 전략

### 전략 1: 기능 중심 (Feature-based) ✅ 추천

**장점**:
- 비즈니스 요구사항과 직접 매핑
- 기능 추가/변경 시 테스트 위치 명확
- 도메인 전문가와 협업 용이

**구조**:
```
e2e/
├── auth/
├── cities/
├── filters/
└── preferences/
```

### 전략 2: 페이지 중심 (Page-based)

**장점**:
- 라우팅 구조와 일치
- 페이지별 E2E 플로우 명확

**단점**:
- 여러 페이지에 걸친 기능 테스트 시 위치 모호

**구조**:
```
e2e/
├── home-page/
├── city-detail-page/
├── login-page/
└── profile-page/
```

### 전략 3: 사용자 여정 중심 (User Journey-based)

**장점**:
- 실제 사용자 시나리오 반영
- 엔드투엔드 플로우 테스트 용이

**단점**:
- 테스트 파일이 길어질 수 있음
- 특정 기능만 테스트하기 어려움

**구조**:
```
e2e/
├── new-user-journey/
├── returning-user-journey/
├── preference-management-journey/
└── city-exploration-journey/
```

---

## 🛠️ Fixture 및 Helper 조직화

### Fixture 사용 시나리오

#### 시나리오 1: 인증된 사용자 상태로 테스트
```typescript
// 예시 (코드 작성 X)
test('인증된 사용자는 좋아요 버튼을 누를 수 있다', async ({ page, authenticatedUser }) => {
  // authenticatedUser fixture 자동 로드
});
```

#### 시나리오 2: 특정 도시 데이터로 테스트
```typescript
// 예시 (코드 작성 X)
test('제주시 상세 페이지 렌더링', async ({ page, jejuCityData }) => {
  // jejuCityData fixture 자동 로드
});
```

### Helper 사용 시나리오

#### 시나리오 1: 필터 조작
```typescript
// 예시 (코드 작성 X)
test('예산 필터 적용', async ({ page }) => {
  await filterHelper.selectBudgetFilter(page, '100만원 미만');
  await filterHelper.assertFilterApplied(page, 'budget', '100만원 미만');
});
```

#### 시나리오 2: 네비게이션
```typescript
// 예시 (코드 작성 X)
test('도시 상세 페이지 이동', async ({ page }) => {
  await navigationHelper.goToHomePage(page);
  await navigationHelper.goToCityDetail(page, '1');
  await assertionsHelper.assertURLContains(page, '/cities/1');
});
```

---

## ✅ Best Practices

### 1. 테스트 파일 명명 규칙

**규칙**:
- `*.spec.ts` 확장자 사용 (Playwright 권장)
- 케밥 케이스 사용 (`city-detail.spec.ts`)
- 기능 설명이 명확한 이름

**예시**:
- ✅ `filter-combination.spec.ts`
- ✅ `like-dislike-toggle.spec.ts`
- ❌ `test1.spec.ts`
- ❌ `cityTest.spec.ts`

### 2. 테스트 독립성

**원칙**:
- 각 테스트는 독립적으로 실행 가능
- 테스트 간 의존성 제거
- `beforeEach`에서 상태 초기화

**예시**:
```typescript
// 예시 (코드 작성 X)
test.beforeEach(async ({ page }) => {
  // 매 테스트마다 홈페이지로 이동
  await page.goto('/');
  // 필터 초기화
  await filterHelper.resetAllFilters(page);
});
```

### 3. Page Object Model 사용

**장점**:
- Locator 변경 시 한 곳만 수정
- 테스트 코드 가독성 향상
- 재사용성 증가

### 4. 명확한 Assertion

**원칙**:
- 한 테스트에 하나의 목적
- 명확한 에러 메시지
- 커스텀 matcher 활용

**예시**:
```typescript
// 예시 (코드 작성 X)
// ❌ 모호한 assertion
await expect(page.locator('.city-card')).toHaveCount(5);

// ✅ 명확한 assertion
await expect(page.locator('.city-card'),
  '예산 100만원 미만 필터 적용 시 5개 도시가 표시되어야 함'
).toHaveCount(5);
```

### 5. 테스트 데이터 관리

**원칙**:
- Mock 데이터는 `__tests__/mocks/`에서 관리
- Fixture로 재사용
- 실제 데이터와 동기화 유지

### 6. 스크린샷 및 비디오

**원칙**:
- 실패한 테스트만 스크린샷/비디오 저장
- CI 환경에서 자동 업로드
- 로컬 개발 시 디버깅 용도

### 7. 병렬 실행 고려

**원칙**:
- `fullyParallel: true` 설정
- 테스트 간 상태 공유 금지
- CI에서는 worker 1개로 실행 (안정성)

---

## 🔄 대안 구조 비교

### 대안 1: Flat 구조 (단순)

```
__tests__/e2e/
├── auth-login.spec.ts
├── auth-logout.spec.ts
├── city-list.spec.ts
├── city-detail.spec.ts
├── filter-basic.spec.ts
├── filter-combination.spec.ts
└── ...
```

**장점**:
- 구조 단순
- 파일 찾기 쉬움 (적은 파일 수)

**단점**:
- 파일 수 증가 시 관리 어려움
- 기능별 그룹화 없음

**추천 여부**: ❌ (테스트 파일 20개 이하일 때만)

---

### 대안 2: 3-Tier 구조 (복잡)

```
__tests__/e2e/
├── core/                  # 핵심 기능
│   ├── cities/
│   └── filters/
├── features/              # 부가 기능
│   ├── preferences/
│   └── sharing/
├── quality/               # 품질 검증
│   ├── performance/
│   ├── accessibility/
│   └── responsive/
└── integration/           # 통합 테스트
    └── api/
```

**장점**:
- 테스트 우선순위 명확
- 대규모 프로젝트에 적합

**단점**:
- 과도한 중첩
- 테스트 위치 찾기 어려움

**추천 여부**: ❌ (Nomad Korea 프로젝트 규모에는 과도)

---

### 대안 3: 추천 구조 (균형)

```
__tests__/e2e/
├── auth/
├── cities/
├── filters/
├── preferences/
├── responsive/
├── performance/
└── accessibility/
```

**장점**:
- 기능별 명확한 분리
- 적절한 중첩 레벨 (1~2단계)
- 확장 가능

**단점**:
- 없음

**추천 여부**: ✅ **강력 추천**

---

## 📊 테스트 커버리지 목표

### E2E 테스트 범위

| 기능 영역 | 예상 테스트 파일 수 | 예상 테스트 케이스 수 | 우선순위 |
|----------|-------------------|---------------------|---------|
| **Auth** | 3 | 12 | 🔴 High |
| **Cities** | 4 | 28 | 🔴 High |
| **Filters** | 4 | 24 | 🔴 High |
| **Preferences** | 3 | 18 | 🔴 High |
| **Responsive** | 3 | 15 | 🟡 Medium |
| **Performance** | 3 | 12 | 🟡 Medium |
| **Accessibility** | 3 | 15 | 🟢 Low |
| **Total** | **23** | **124** | - |

### 예상 작업 시간

- **Setup**: 1.5시간 (Playwright 설치, 설정, Fixture 작성)
- **High Priority** (Auth + Cities + Filters + Preferences): 6시간
- **Medium Priority** (Responsive + Performance): 3시간
- **Low Priority** (Accessibility): 2시간
- **Total**: **12.5시간**

---

## 🎯 다음 단계

### 1단계: Playwright 설치 및 설정 (1.5시간)
- Playwright 패키지 설치
- `playwright.config.ts` 작성
- `playwright-auth.setup.ts` 작성
- 디렉토리 구조 생성

### 2단계: Page Object Model 작성 (2시간)
- `BasePage` 클래스
- `HomePage` 클래스
- `CityDetailPage` 클래스
- 컴포넌트 POM (FilterBar, CityCard)

### 3단계: Fixture 및 Helper 작성 (1.5시간)
- 인증 Fixture
- 도시 데이터 Fixture
- 네비게이션 Helper
- 필터 Helper

### 4단계: High Priority 테스트 작성 (6시간)
- Auth 테스트 (12개)
- Cities 테스트 (28개)
- Filters 테스트 (24개)
- Preferences 테스트 (18개)

### 5단계: Medium/Low Priority 테스트 작성 (5시간)
- Responsive 테스트 (15개)
- Performance 테스트 (12개)
- Accessibility 테스트 (15개)

---

## 🔍 추가 권장사항

### 1. CI/CD 통합
- GitHub Actions에 Playwright 추가
- 매 PR마다 E2E 테스트 자동 실행
- 실패한 테스트 스크린샷 자동 업로드

### 2. Visual Regression Testing
- Playwright의 `toHaveScreenshot()` 활용
- 디자인 변경 감지
- Percy 또는 Chromatic 통합 고려

### 3. 테스트 리포트
- HTML 리포터로 시각화
- JUnit XML로 CI 통합
- Allure Report 고려

### 4. 모니터링
- 테스트 실행 시간 추적
- Flaky 테스트 감지 및 리팩토링
- Coverage 트렌드 분석

---

## 📝 요약

### 최종 추천 구조

✅ **폴더 구조**: 기능 중심 (Feature-based)
✅ **Page Object Model**: 페이지별 + 컴포넌트별 POM
✅ **Fixture**: 인증, 도시 데이터, 사용자 선호도
✅ **Helper**: 네비게이션, 필터, Assertion
✅ **테스트 파일**: `*.spec.ts` 명명 규칙

### 예상 결과

- **총 테스트 파일**: 23개
- **총 테스트 케이스**: 124개
- **작업 시간**: 12.5시간
- **커버리지**: High Priority 기능 100%

### 다음 작업

사용자 승인 후:
1. Playwright 설치 및 설정
2. 디렉토리 구조 생성
3. POM, Fixture, Helper 작성
4. 우선순위별 테스트 작성

---

**문서 작성일**: 2025-10-21
**작성자**: Claude Code
**프로젝트**: Nomad Korea
**목적**: E2E 테스트 폴더 구조 설계

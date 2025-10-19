# 노마드 코리아 - 프로젝트 구조

## 📁 전체 디렉토리 구조

```
nomad-korea/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (메타데이터, 폰트)
│   ├── page.tsx                 # 홈페이지 (서버 컴포넌트)
│   └── globals.css              # 전역 CSS (Tailwind + 커스텀 스타일)
│
├── components/                   # React 컴포넌트
│   ├── ui/                      # Shadcn UI 기본 컴포넌트
│   │   ├── badge.tsx           # 뱃지 컴포넌트
│   │   ├── button.tsx          # 버튼 컴포넌트
│   │   ├── card.tsx            # 카드 컴포넌트
│   │   └── input.tsx           # 인풋 컴포넌트
│   │
│   ├── header.tsx               # 헤더 (서버 컴포넌트)
│   ├── hero-banner.tsx          # 히어로 배너 (서버 컴포넌트)
│   ├── category-tabs.tsx        # 카테고리 탭 (클라이언트 컴포넌트)
│   ├── filter-bar.tsx           # 필터 바 (클라이언트 컴포넌트)
│   ├── city-card.tsx            # 도시 카드 (서버 컴포넌트)
│   └── city-grid.tsx            # 도시 그리드 (서버 컴포넌트)
│
├── lib/                          # 유틸리티 및 데이터
│   ├── types.ts                 # TypeScript 타입 정의
│   ├── utils.ts                 # 유틸리티 함수 (cn, formatters)
│   └── data.ts                  # 더미 데이터 (12개 도시)
│
├── public/                       # 정적 파일
│
├── .eslintrc.json               # ESLint 설정
├── .gitignore                   # Git 무시 파일
├── components.json              # Shadcn 설정
├── next.config.ts               # Next.js 설정
├── package.json                 # 프로젝트 의존성
├── postcss.config.mjs           # PostCSS 설정
├── tailwind.config.ts           # Tailwind CSS 설정
├── tsconfig.json                # TypeScript 설정
├── README.md                    # 프로젝트 README
├── INSTALLATION.md              # 설치 가이드
└── PROJECT_STRUCTURE.md         # 이 파일
```

## 🗂️ 주요 파일 설명

### App Router (`app/`)

#### `layout.tsx`
- 루트 레이아웃 컴포넌트
- 메타데이터 설정 (제목, 설명)
- 폰트 설정 (Inter)
- 전역 스타일 적용

#### `page.tsx`
- 홈페이지 메인 컴포넌트 (서버 컴포넌트)
- 모든 하위 컴포넌트 조합
- 구조:
  - Header
  - HeroBanner
  - CategoryTabs
  - FilterBar
  - CityGrid
  - Footer

#### `globals.css`
- Tailwind CSS 디렉티브
- CSS 변수 정의 (컬러, 테마)
- 커스텀 유틸리티 클래스

### Components (`components/`)

#### 서버 컴포넌트 (Server Components)

**`header.tsx`**
- 상단 헤더
- 로고, 검색바, 로그인/회원가입 버튼
- 반응형: 모바일에서 검색바 하단 배치

**`hero-banner.tsx`**
- 이달의 추천 도시 배너
- Props: `city` (City 타입)
- 배경 이미지 + 그라데이션 오버레이
- CTA 버튼 2개

**`city-card.tsx`**
- 개별 도시 카드
- Props: `city` (City 타입)
- 정보: 이미지, 평점, 생활비, 인프라 점수, 태그
- Hover 효과: 이미지 확대, 그림자

**`city-grid.tsx`**
- 도시 카드 그리드 레이아웃
- Props: `cities` (City[] 타입)
- 반응형: 4열(데스크톱) / 2열(태블릿) / 1열(모바일)
- "더 많은 도시 보기" 버튼
- 빈 결과 처리

#### 클라이언트 컴포넌트 (Client Components)

**`category-tabs.tsx`**
- 지역 카테고리 탭
- 상태 관리: `useState`
- 탭: 전체/수도권/강원/충청/전라/경상/제주
- 반응형: 가로 스크롤 가능

**`filter-bar.tsx`**
- 정렬 및 필터 바
- 상태 관리: `useState` (sortBy, costFilter, sizeFilter)
- 정렬: 인기순/평점/생활비/최신리뷰
- 필터: 생활비 범위, 도시 규모
- 반응형: 모바일에서 필터 버튼으로 축약

#### UI 컴포넌트 (`ui/`)

**`button.tsx`**
- 버튼 컴포넌트
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon

**`card.tsx`**
- 카드 컴포넌트
- 서브 컴포넌트: CardHeader, CardTitle, CardDescription, CardContent, CardFooter

**`badge.tsx`**
- 뱃지 컴포넌트
- Variants: default, secondary, destructive, outline

**`input.tsx`**
- 인풋 컴포넌트
- 검색바 등에 사용

### Lib (`lib/`)

#### `types.ts`
- TypeScript 타입 정의
- 주요 타입:
  - `Region`: 지역 타입
  - `CafeDensity`: 카페 밀집도
  - `Characteristic`: 도시 특성
  - `City`: 도시 메인 인터페이스

#### `utils.ts`
- 유틸리티 함수
- 함수:
  - `cn()`: Tailwind 클래스 병합
  - `formatCurrency()`: 통화 포맷
  - `getCharacteristicEmoji()`: 특성별 이모지
  - `getCharacteristicLabel()`: 특성별 라벨

#### `data.ts`
- 더미 데이터
- 12개 도시 정보 (제주시, 강릉, 부산, 전주, 속초, 대전, 광주, 경주, 여수, 춘천, 서귀포, 포항)
- `featuredCity`: 이달의 추천 도시 (강릉)

## 🎨 디자인 시스템

### 컬러 팔레트 (Tailwind Config)

```typescript
primary: #3B82F6      // 파란색 (신뢰, 여행)
secondary: #10B981    // 녹색 (자연, 성장)
accent: #F59E0B       // 주황색 (활동, 에너지)
background: #FFFFFF   // 배경
surface: #F9FAFB      // 카드 배경
foreground: #111827   // 텍스트
muted: #6B7280        // 보조 텍스트
border: #E5E7EB       // 테두리
destructive: #EF4444  // 에러
```

### 타이포그래피

- **폰트**: Inter (Google Fonts)
- **크기**:
  - 제목 1: 24px, Bold
  - 제목 2: 20px, Semibold
  - 본문: 16px, Regular
  - 캡션: 14px, Medium

### 반응형 브레이크포인트

```
sm: 640px   (모바일)
md: 768px   (태블릿)
lg: 1024px  (데스크톱)
xl: 1280px  (대형 데스크톱)
```

## 🧩 컴포넌트 계층 구조

```
App (page.tsx)
├── Header
│   ├── Logo
│   ├── SearchBar (Input)
│   └── Auth Buttons (Button)
├── Main
│   ├── HeroBanner
│   │   ├── Image
│   │   └── CTA Buttons (Button)
│   ├── CategoryTabs (Client)
│   ├── FilterBar (Client)
│   │   └── Select Dropdowns
│   └── CityGrid
│       └── CityCard[]
│           ├── Image
│           ├── Badges (Badge)
│           └── Info Sections
└── Footer
```

## 🔄 데이터 흐름

```
1. data.ts (더미 데이터)
   ↓
2. page.tsx (서버에서 데이터 가져오기)
   ↓
3. CityGrid (props로 전달)
   ↓
4. CityCard (개별 도시 렌더링)
```

## 🚀 성능 최적화

### 이미지 최적화
- Next.js `Image` 컴포넌트 사용
- Lazy Loading 자동 적용
- Unsplash 이미지 최적화

### 서버 컴포넌트 우선
- 대부분의 컴포넌트를 서버 컴포넌트로 구현
- 상태 관리가 필요한 경우만 클라이언트 컴포넌트

### Tailwind CSS
- 미사용 스타일 자동 제거 (PurgeCSS)
- JIT 모드로 빠른 빌드

## 📦 의존성

### 메인 의존성
- `next`: ^15.0.0
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `tailwindcss`: ^3.4.0
- `lucide-react`: ^0.344.0 (아이콘)
- `class-variance-authority`: ^0.7.0 (CVA)
- `clsx`: ^2.1.0
- `tailwind-merge`: ^2.2.0

### 개발 의존성
- `typescript`: ^5
- `@types/react`: ^19
- `@types/node`: ^20
- `eslint`: ^8
- `tailwindcss-animate`: ^1.0.7

## 🎯 다음 단계

현재는 **UI만 구현**되었습니다. 향후 개발 계획:

1. **상태 관리**: Zustand 또는 React Context
2. **API 연동**: 백엔드 API 개발 및 연동
3. **라우팅**: 도시 상세 페이지 추가
4. **인증**: NextAuth.js 도입
5. **데이터베이스**: Prisma + PostgreSQL
6. **배포**: Vercel

## 📝 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Shadcn/ui 문서](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**마지막 업데이트**: 2025년 10월
**버전**: 1.0.0 (MVP - UI Only)

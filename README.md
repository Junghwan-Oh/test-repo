# 노마드 코리아 - 대한민국 노마드 도시 평가 사이트

디지털 노마드를 위한 한국 도시 정보와 평가를 한눈에 비교할 수 있는 플랫폼입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## 시작하기

### 1. 의존성 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
nomad-korea/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # Shadcn UI 컴포넌트
│   ├── header.tsx        # 헤더 (서버 컴포넌트)
│   ├── hero-banner.tsx   # 히어로 배너 (서버 컴포넌트)
│   ├── category-tabs.tsx # 카테고리 탭 (클라이언트 컴포넌트)
│   ├── filter-bar.tsx    # 필터 바 (클라이언트 컴포넌트)
│   ├── city-card.tsx     # 도시 카드 (서버 컴포넌트)
│   └── city-grid.tsx     # 도시 그리드 (서버 컴포넌트)
├── lib/                   # 유틸리티 및 데이터
│   ├── types.ts          # TypeScript 타입 정의
│   ├── utils.ts          # 유틸리티 함수
│   └── data.ts           # 더미 데이터 (12개 도시)
└── public/                # 정적 파일

```

## 주요 기능 (UI Only)

### ✅ 구현된 UI

- **헤더**: 로고, 검색바, 로그인/회원가입 버튼
- **히어로 배너**: 이달의 추천 도시 (강릉)
- **카테고리 탭**: 지역별 필터 (전체/수도권/강원/충청/전라/경상/제주)
- **필터 바**: 정렬(인기순/평점/생활비) 및 필터(생활비/도시규모)
- **도시 카드 그리드**: 12개 도시 카드 (4열 그리드)
  - 도시 이미지 (Unsplash)
  - 평점 및 리뷰 수
  - 월 생활비
  - 카페 밀집도
  - 인터넷/교통 점수
  - 특성 태그
- **반응형 레이아웃**: 데스크톱(4열) / 태블릿(2열) / 모바일(1열)
- **푸터**: 사이트 정보 및 링크

### ⚠️ 미구현 (기능)

현재 버전은 **UI만 구현**되었으며, 실제 기능은 동작하지 않습니다:

- 검색 기능
- 필터링 로직
- 정렬 로직
- 페이지 라우팅
- 사용자 인증
- 리뷰 작성
- 찜하기 기능

## 데이터

`lib/data.ts`에 12개 도시의 더미 데이터가 포함되어 있습니다:

1. 제주시
2. 강릉시
3. 부산
4. 전주시
5. 속초시
6. 대전
7. 광주
8. 경주
9. 여수
10. 춘천
11. 서귀포
12. 포항

## 이미지

도시 이미지는 Unsplash API를 통해 동적으로 로드됩니다.

## 배포

### Vercel (권장)

```bash
npm run build
vercel deploy
```

## 향후 개발 계획

- [ ] 실제 필터링/정렬 로직 구현
- [ ] 도시 상세 페이지
- [ ] 사용자 인증 시스템
- [ ] 리뷰 작성 및 관리
- [ ] 찜하기 기능
- [ ] 도시 비교 기능
- [ ] 지도 뷰

## 라이선스

MIT

---

**개발**: 2025년 10월
**버전**: 1.0.0 (MVP - UI Only)

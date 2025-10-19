# 노마드 코리아 - 빠른 시작 가이드

## ⚡ 5분 안에 시작하기

### 1️⃣ 의존성 설치

```bash
cd nomad-korea
npm install
```

> **참고**: npm에서 권한 오류가 발생하면 `yarn` 또는 `pnpm`을 사용하세요.

### 2️⃣ 개발 서버 실행

```bash
npm run dev
```

### 3️⃣ 브라우저에서 확인

```
http://localhost:3000
```

완료! 🎉

---

## 📋 체크리스트

프로젝트를 실행하기 전에 다음을 확인하세요:

- [ ] Node.js 18.17 이상 설치됨
- [ ] npm/yarn/pnpm 설치됨
- [ ] 인터넷 연결 (Unsplash 이미지 로드용)

---

## 🎯 무엇을 볼 수 있나요?

### 구현된 UI

✅ **헤더**
- 로고, 검색바 (UI만)
- 로그인/회원가입 버튼

✅ **히어로 배너**
- 이달의 추천 도시: 강릉
- 배경 이미지 + CTA 버튼

✅ **카테고리 탭**
- 전체/수도권/강원/충청/전라/경상/제주

✅ **필터 바**
- 정렬: 인기순/평점/생활비/최신리뷰
- 필터: 생활비/도시규모

✅ **도시 카드 그리드**
- 12개 도시 카드
- 평점, 생활비, 카페 밀집도, 인프라 점수
- 반응형: 4열(PC) / 2열(태블릿) / 1열(모바일)

✅ **푸터**
- 사이트 정보 및 링크

### 미구현 (기능 없음)

❌ 검색 기능 (UI만)
❌ 필터링 로직 (UI만)
❌ 페이지 라우팅
❌ 사용자 인증
❌ 리뷰 작성
❌ 찜하기 기능

---

## 🗂️ 파일 구조

```
nomad-korea/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── ui/                 # Shadcn 컴포넌트
│   ├── header.tsx
│   ├── hero-banner.tsx
│   ├── category-tabs.tsx
│   ├── filter-bar.tsx
│   ├── city-card.tsx
│   └── city-grid.tsx
├── lib/
│   ├── types.ts            # 타입 정의
│   ├── utils.ts            # 유틸리티
│   └── data.ts             # 더미 데이터 (12개 도시)
└── ...
```

---

## 🔧 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 실행 |
| `npm run lint` | ESLint 검사 |

---

## 🎨 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Shadcn/ui
- **Icons**: Lucide React
- **Images**: Unsplash API

---

## 🚀 다음 단계

1. **코드 탐색**: `app/page.tsx`부터 시작
2. **컴포넌트 수정**: `components/` 폴더
3. **데이터 변경**: `lib/data.ts`에서 도시 정보 수정
4. **스타일 변경**: `tailwind.config.ts`에서 테마 커스터마이징

---

## 💡 팁

### 반응형 테스트

브라우저 개발자 도구(F12)에서:
- 모바일: 375px
- 태블릿: 768px
- 데스크톱: 1440px

### 이미지 변경

`lib/data.ts`에서 `imageUrl` 수정:
```typescript
imageUrl: 'https://images.unsplash.com/photo-xxxxx?w=800&h=450'
```

### 컬러 변경

`tailwind.config.ts`에서 primary/secondary/accent 색상 수정

---

## ❓ 문제 해결

### Port 3000 사용 중

```bash
npm run dev -- -p 3001
```

### TypeScript 오류

```bash
rm -rf .next
npm run dev
```

### npm 권한 오류 (Windows)

```bash
# Yarn 사용 (권장)
npm install -g yarn
yarn install
yarn dev
```

---

## 📚 더 많은 정보

- [README.md](./README.md) - 프로젝트 전체 개요
- [INSTALLATION.md](./INSTALLATION.md) - 상세 설치 가이드
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - 프로젝트 구조 상세

---

## 🎉 즐거운 코딩 되세요!

문제가 있으면 이슈를 남겨주세요.

**버전**: 1.0.0 (MVP - UI Only)
**날짜**: 2025년 10월

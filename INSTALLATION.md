# 설치 및 실행 가이드

## 사전 요구사항

- Node.js 18.17 이상
- npm, yarn, 또는 pnpm

## 설치 단계

### 1. 프로젝트 디렉토리로 이동

```bash
cd nomad-korea
```

### 2. 의존성 설치

**npm 사용:**
```bash
npm install
```

**yarn 사용:**
```bash
yarn install
```

**pnpm 사용:**
```bash
pnpm install
```

### 3. 개발 서버 실행

**npm 사용:**
```bash
npm run dev
```

**yarn 사용:**
```bash
yarn dev
```

**pnpm 사용:**
```bash
pnpm dev
```

### 4. 브라우저에서 확인

개발 서버가 실행되면 브라우저에서 다음 주소로 접속하세요:

```
http://localhost:3000
```

## 빌드 및 프로덕션 실행

### 빌드

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### 프로덕션 서버 실행

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## 문제 해결

### npm 권한 오류가 발생하는 경우

Windows에서 npm 캐시 권한 문제가 발생할 수 있습니다. 다음 방법을 시도해보세요:

1. **관리자 권한으로 실행**
   - 터미널을 관리자 권한으로 실행

2. **npm 캐시 정리**
   ```bash
   npm cache clean --force
   ```

3. **yarn 사용** (권장)
   ```bash
   npm install -g yarn
   yarn install
   yarn dev
   ```

### Port 3000이 이미 사용 중인 경우

```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### TypeScript 오류가 발생하는 경우

```bash
# TypeScript 캐시 정리
rm -rf .next
npm run dev
```

## 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |

## 환경 변수 (선택사항)

현재 프로젝트는 환경 변수가 필요하지 않습니다. 향후 API 연동 시 `.env.local` 파일을 생성하여 사용할 수 있습니다.

```env
# .env.local (예시)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 지원

문제가 발생하면 다음을 확인하세요:

1. Node.js 버전이 18.17 이상인지 확인
2. 모든 의존성이 올바르게 설치되었는지 확인
3. `.next` 폴더를 삭제하고 다시 실행

더 많은 정보는 [Next.js 문서](https://nextjs.org/docs)를 참조하세요.

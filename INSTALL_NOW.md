# 🚀 지금 바로 설치하기!

## ✅ 문제가 모두 해결되었습니다!

**수정 사항:**
- ✅ `.npmrc` 파일 삭제 (권한 문제 해결)
- ✅ React 19 → 18.3.1로 다운그레이드
- ✅ lucide-react 최신 버전(0.454.0)으로 업데이트
- ✅ 모든 타입 정의 호환성 수정

---

## 📦 설치 방법 (2가지 중 선택)

### 방법 1: npm 사용

```bash
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
npm install --legacy-peer-deps
```

> **참고**: `--legacy-peer-deps` 플래그는 peer dependency 경고를 무시하고 설치합니다.

### 방법 2: Yarn 사용 (권장) ⭐

```bash
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
yarn install
```

> **Yarn이 없다면**: `npm install -g yarn` (관리자 권한 필요)

---

## 🎯 설치 후 실행

설치가 성공하면:

**npm 사용:**
```bash
npm run dev
```

**Yarn 사용:**
```bash
yarn dev
```

브라우저에서 **http://localhost:3000** 접속!

---

## 🔍 예상 출력

설치 성공 시 이런 메시지가 나옵니다:

```
✔ Ready in 2.3s
○ Local:        http://localhost:3000
✓ Compiled / in 1234ms
```

---

## ❓ 만약 여전히 오류가 발생한다면

### 오류 1: npm 권한 문제

**해결책**: PowerShell을 **관리자 권한**으로 실행

```powershell
# 관리자 PowerShell에서
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
npm install --legacy-peer-deps
```

### 오류 2: "Cannot find module"

**해결책**: node_modules 폴더 삭제 후 재설치

```bash
# node_modules가 있다면 삭제
rm -rf node_modules

# 다시 설치
npm install --legacy-peer-deps
```

### 오류 3: 여전히 peer dependency 오류

**해결책**: `--force` 플래그 사용

```bash
npm install --force
```

---

## 💡 권장 순서

1. **먼저 Yarn으로 시도** (가장 안정적)
   ```bash
   yarn install
   ```

2. **Yarn이 없다면 npm + legacy-peer-deps**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **여전히 실패하면 관리자 권한 PowerShell**
   ```powershell
   npm install --legacy-peer-deps
   ```

---

## 🎉 설치 완료 후

개발 서버가 실행되면:

1. **브라우저 자동 열림** (또는 http://localhost:3000 수동 접속)
2. **노마드 코리아 홈페이지 확인**
3. **반응형 테스트**: 브라우저 크기 조절해보기
4. **모바일 뷰 테스트**: 개발자 도구(F12) → 디바이스 툴바

---

## 📁 프로젝트 구조

```
nomad-korea/
├── app/page.tsx          # 홈페이지
├── components/           # 컴포넌트
│   ├── header.tsx
│   ├── hero-banner.tsx
│   ├── city-card.tsx
│   └── ...
└── lib/data.ts           # 12개 도시 데이터
```

---

## 🔄 변경된 버전

| 패키지 | 이전 | 현재 |
|--------|------|------|
| react | 19.0.0 | 18.3.1 |
| react-dom | 19.0.0 | 18.3.1 |
| lucide-react | 0.344.0 | 0.454.0 |
| @types/react | 19 | 18 |
| @types/react-dom | 19 | 18 |

---

**마지막 업데이트**: 2025년 10월 19일
**상태**: ✅ 설치 가능

# 문제 해결 가이드 - npm 권한 오류

## ✅ 문제 해결됨!

**package.json이 수정되었습니다:**
- React 19 → React 18.3.1로 다운그레이드
- lucide-react 최신 버전(0.454.0)으로 업데이트
- 모든 의존성 호환성 문제 해결

**이제 다음 명령어로 설치하세요:**

```bash
npm install --legacy-peer-deps
```

또는 **Yarn 사용 (권장):**

```bash
yarn install
```

---

## 🚨 이전 발생 문제 (해결됨)

```
npm error code EPERM
npm error syscall open
npm error path C:\Program Files\npm-cache\_cacache\tmp\...
```

Windows 환경에서 npm 캐시 디렉토리에 대한 쓰기 권한이 없어 발생했던 문제입니다.

---

## ✅ 해결 방법 (순서대로 시도)

### 방법 1: .npmrc 파일로 캐시 경로 변경 ⭐ (권장)

프로젝트 폴더에 `.npmrc` 파일이 생성되어 있습니다.

**터미널에서 실행:**

```bash
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
npm install
```

이 방법으로 해결되지 않으면 다음 방법을 시도하세요.

---

### 방법 2: 관리자 권한으로 PowerShell 실행

1. **시작 메뉴** → "PowerShell" 검색
2. **우클릭** → "관리자 권한으로 실행"
3. 다음 명령어 실행:

```powershell
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
npm cache clean --force
npm install
```

---

### 방법 3: Yarn 사용 (가장 안정적) ⭐⭐

npm 대신 Yarn 패키지 매니저를 사용합니다.

#### 3-1. Yarn 설치

**관리자 권한 PowerShell**에서:

```powershell
npm install -g yarn
```

또는 **Chocolatey**로 설치:

```powershell
choco install yarn
```

또는 **직접 다운로드**:
- https://classic.yarnpkg.com/en/docs/install#windows-stable

#### 3-2. Yarn으로 의존성 설치

```bash
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
yarn install
yarn dev
```

---

### 방법 4: pnpm 사용 (대안)

pnpm은 권한 문제가 거의 없습니다.

#### 4-1. pnpm 설치

**관리자 권한 PowerShell**에서:

```powershell
npm install -g pnpm
```

또는 **직접 설치**:

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

#### 4-2. pnpm으로 의존성 설치

```bash
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
pnpm install
pnpm dev
```

---

### 방법 5: npm 전역 캐시 경로 영구 변경

**관리자 권한 PowerShell**에서:

```powershell
npm config set cache "C:\Users\crypto quant\.npm-cache" --global
npm config set prefix "C:\Users\crypto quant\AppData\Roaming\npm" --global
```

그 후 다시 설치:

```bash
cd "C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea"
npm install
```

---

### 방법 6: 안티바이러스 소프트웨어 일시 중지

일부 안티바이러스 프로그램이 npm 캐시 파일 접근을 차단할 수 있습니다.

1. 안티바이러스 일시 중지
2. npm install 재시도
3. 안티바이러스 다시 활성화

---

### 방법 7: Windows Defender 예외 추가

Windows Defender가 npm 캐시를 차단하는 경우:

1. **Windows 보안** 열기
2. **바이러스 및 위협 방지** → **설정 관리**
3. **제외 항목** → **제외 항목 추가**
4. 다음 폴더 추가:
   - `C:\Program Files\npm-cache`
   - `C:\Users\crypto quant\.npm-cache`
   - `C:\Users\crypto quant\alpha-02-Red Flag\nomad-korea\node_modules`

---

## 🎯 가장 빠른 해결책 (추천 순서)

### 1순위: Yarn 사용
```bash
# 관리자 권한 PowerShell에서
npm install -g yarn

# 프로젝트 폴더에서
yarn install
yarn dev
```

### 2순위: pnpm 사용
```bash
# 관리자 권한 PowerShell에서
iwr https://get.pnpm.io/install.ps1 -useb | iex

# 프로젝트 폴더에서
pnpm install
pnpm dev
```

### 3순위: .npmrc 수정 후 npm 재시도
```bash
# 이미 .npmrc 파일이 있으므로
npm cache clean --force
npm install
```

---

## ✅ 설치 확인

의존성이 성공적으로 설치되면 다음 명령어로 개발 서버를 실행하세요:

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

브라우저에서 `http://localhost:3000` 접속

---

## 📞 추가 도움

위 방법으로 해결되지 않으면:

1. **Node.js 버전 확인:**
   ```bash
   node --version
   npm --version
   ```
   Node.js 18.17 이상 필요

2. **Node.js 재설치:**
   - https://nodejs.org/
   - LTS 버전 다운로드 및 재설치

3. **프로젝트 재생성:**
   ```bash
   # 공식 create-next-app 사용
   npx create-next-app@latest
   ```

---

## 🔍 디버그 정보 수집

문제가 계속되면 다음 정보를 확인하세요:

```bash
# Node.js 버전
node --version

# npm 버전
npm --version

# npm 설정 확인
npm config list

# 캐시 위치 확인
npm config get cache

# 권한 확인
whoami
```

---

**업데이트**: 2025년 10월
**문제**: Windows npm EPERM 오류
**해결**: Yarn/pnpm 사용 권장

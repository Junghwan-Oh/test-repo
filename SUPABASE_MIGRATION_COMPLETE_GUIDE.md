# Supabase 마이그레이션 완전 가이드

## 📌 목차
1. [Supabase CLI 설치 (선택사항)](#supabase-cli-설치)
2. [마이그레이션 실행 방법](#마이그레이션-실행-방법)
3. [마이그레이션 파일 목록](#마이그레이션-파일-목록)
4. [검증 방법](#검증-방법)
5. [트러블슈팅](#트러블슈팅)

---

## Supabase CLI 설치

### ❓ `npm install -g supabase` 필요한가요?

**답변**: **선택사항**입니다.

#### CLI가 필요한 경우
- 로컬에서 Supabase 개발 환경 실행
- 마이그레이션 파일을 자동으로 적용 (`supabase db push`)
- TypeScript 타입 자동 생성 (`supabase gen types`)
- 로컬 데이터베이스 초기화 및 테스트

#### CLI 없이도 가능한 작업 (현재 프로젝트)
- ✅ Supabase Dashboard SQL Editor에서 마이그레이션 수동 실행
- ✅ 웹 인터페이스로 데이터베이스 관리
- ✅ 프로덕션 환경 운영

### 설치 방법 (선택사항)

```bash
# npm으로 글로벌 설치
npm install -g supabase

# 또는 pnpm으로 설치
pnpm add -g supabase

# 설치 확인
supabase --version
```

---

## 마이그레이션 실행 방법

### 방법 1: Supabase Dashboard (추천) ⭐

**장점**:
- CLI 설치 불필요
- 브라우저에서 바로 실행 가능
- 에러 메시지 시각적으로 확인 가능
- 트랜잭션 롤백 자동 지원

**단점**:
- 파일을 하나씩 복사/붙여넣기 해야 함
- 대량 마이그레이션 시 번거로움

#### 실행 단계

1. **Supabase Dashboard 접속**
   - URL: https://supabase.com/dashboard/project/YOUR_PROJECT_ID
   - 로그인

2. **SQL Editor 열기**
   - 왼쪽 메뉴 → `SQL Editor` 클릭
   - `+ New query` 버튼 클릭

3. **마이그레이션 파일 순차 실행** (순서 중요!)

   **✅ Step 1: 테이블 생성 (필수)**
   ```bash
   파일: supabase/migrations/20250121000001_create_cities_and_likes_tables.sql
   ```
   - 파일 내용 전체 복사
   - SQL Editor에 붙여넣기
   - `Run` 또는 `Ctrl + Enter` 실행

   **✅ Step 2: 초기 데이터 (필수)**
   ```bash
   파일: supabase/migrations/20250121000002_insert_initial_cities_data.sql
   ```
   - 파일 내용 전체 복사
   - SQL Editor에 붙여넣기
   - `Run` 실행

   **✅ Step 3: RLS 정책 추가 (필수)**
   ```bash
   파일: supabase/migrations/20250121000003_fix_city_stats_rls.sql
   ```
   - 파일 내용 전체 복사
   - SQL Editor에 붙여넣기
   - `Run` 실행

   **✅ Step 4: 트리거 생성 (필수)**
   ```bash
   파일: supabase/migrations/20250121000004_create_triggers.sql
   ```
   - 파일 내용 전체 복사
   - SQL Editor에 붙여넣기
   - ⚠️ "Destructive operation" 경고 나옴 → `Confirm` 클릭
   - `Run` 실행

   **✅ Step 5: 통계 재계산 (필수)**
   ```bash
   파일: supabase/migrations/20250121000005_recalculate_city_stats.sql
   ```
   - 파일 내용 전체 복사
   - SQL Editor에 붙여넣기
   - `Run` 실행

4. **실행 결과 확인**
   - 각 쿼리 실행 후 `Success` 메시지 확인
   - 에러 발생 시 에러 메시지 확인 후 [트러블슈팅](#트러블슈팅) 섹션 참고

---

### 방법 2: Supabase CLI (고급)

**장점**:
- 모든 마이그레이션 파일 자동 실행
- 로컬 개발 환경 구축 가능
- Git과 연동하여 마이그레이션 버전 관리

**단점**:
- CLI 설치 및 설정 필요
- 초기 학습 곡선

#### 실행 단계

```bash
# 1. Supabase CLI 설치 (아직 안 했다면)
npm install -g supabase

# 2. Supabase 로그인
supabase login

# 3. 프로젝트 링크 (최초 1회만)
supabase link --project-ref YOUR_PROJECT_ID
# 예: supabase link --project-ref qzmxjjklzoopdlsajlfa

# 4. 데이터베이스 비밀번호 입력 프롬프트 나오면 입력

# 5. 마이그레이션 실행
supabase db push

# 6. 실행 결과 확인
# "All migrations applied successfully" 메시지 확인
```

#### CLI 추가 명령어

```bash
# 마이그레이션 상태 확인
supabase migration list

# 로컬 Supabase 시작 (Docker 필요)
supabase start

# 로컬 Supabase 중지
supabase stop

# TypeScript 타입 생성
supabase gen types typescript --local > lib/database.types.ts
```

---

## 마이그레이션 파일 목록

### 📁 `supabase/migrations/`

| 파일명 | 설명 | 필수 여부 | 실행 순서 |
|--------|------|----------|----------|
| `20250121000001_create_cities_and_likes_tables.sql` | 테이블 생성 (cities, city_likes, city_stats) | ✅ 필수 | 1️⃣ |
| `20250121000002_insert_initial_cities_data.sql` | 12개 도시 초기 데이터 삽입 | ✅ 필수 | 2️⃣ |
| `20250121000003_fix_city_stats_rls.sql` | city_stats RLS 정책 추가 | ✅ 필수 | 3️⃣ |
| `20250121000004_create_triggers.sql` | city_likes 변경 시 city_stats 자동 업데이트 트리거 | ✅ 필수 | 4️⃣ |
| `20250121000005_recalculate_city_stats.sql` | 기존 데이터 기반 통계 재계산 | ✅ 필수 | 5️⃣ |

### 각 마이그레이션 상세 설명

#### 1️⃣ 20250121000001_create_cities_and_likes_tables.sql

**생성 내용**:
- `cities` 테이블: 도시 기본 정보
- `city_likes` 테이블: 사용자별 좋아요/싫어요
- `city_stats` 테이블: 도시별 좋아요/싫어요 통계
- RLS 정책: 기본 읽기/쓰기 권한
- Extension: uuid-ossp (UUID 생성)

**주요 컬럼**:
```sql
cities:
  - id (uuid, PK)
  - name (도시명)
  - region (지역)
  - budget (예산 범위)
  - cafe_count, cafe_density (카페 정보)
  - average_rating, review_count (평점)
  - characteristics, environments, tags (배열)

city_likes:
  - id (uuid, PK)
  - user_id (uuid, FK → auth.users)
  - city_id (uuid, FK → cities)
  - like_type ('like' | 'dislike')
  - UNIQUE(user_id, city_id)

city_stats:
  - city_id (uuid, PK, FK → cities)
  - likes_count (integer)
  - dislikes_count (integer)
```

#### 2️⃣ 20250121000002_insert_initial_cities_data.sql

**삽입 데이터**:
- 제주시, 강릉시, 부산, 전주시, 속초시, 대전
- 광주, 경주, 여수, 춘천, 서귀포, 포항
- 총 12개 도시

**각 도시 정보**:
- 이미지 URL (Unsplash)
- 평균 평점, 리뷰 수
- 좋아요/싫어요 초기값 (0, 0)
- 월세, 생활비 정보
- 카페 수, 인터넷 점수, 교통 점수
- 특성, 환경, 태그, 베스트 시즌

#### 3️⃣ 20250121000003_fix_city_stats_rls.sql

**추가 정책**:
```sql
-- city_stats 테이블에 INSERT/UPDATE/DELETE 권한 추가
-- 트리거가 자동으로 통계를 업데이트할 수 있도록 허용
CREATE POLICY "Allow automatic stats insert" ON city_stats FOR INSERT ...
CREATE POLICY "Allow automatic stats update" ON city_stats FOR UPDATE ...
CREATE POLICY "Allow automatic stats delete" ON city_stats FOR DELETE ...
```

**왜 필요한가?**:
- 초기 마이그레이션에서는 SELECT 정책만 있었음
- 트리거가 city_stats를 업데이트하려면 INSERT/UPDATE 권한 필요
- 이 정책이 없으면 좋아요 클릭 시 "RLS policy violation" 에러 발생

#### 4️⃣ 20250121000004_create_triggers.sql

**생성 내용**:
```sql
-- 1. 트리거 함수
CREATE FUNCTION update_city_stats() RETURNS TRIGGER ...

-- 2. INSERT 트리거
CREATE TRIGGER update_city_stats_on_insert AFTER INSERT ON city_likes ...

-- 3. UPDATE 트리거
CREATE TRIGGER update_city_stats_on_update AFTER UPDATE ON city_likes ...

-- 4. DELETE 트리거
CREATE TRIGGER update_city_stats_on_delete AFTER DELETE ON city_likes ...
```

**동작 방식**:
1. 사용자가 좋아요 클릭 → `city_likes` 테이블에 INSERT
2. INSERT 트리거 발동 → `update_city_stats()` 함수 실행
3. 해당 도시의 좋아요/싫어요 개수를 COUNT
4. `city_stats` 테이블에 UPSERT (업데이트 또는 삽입)

**⚠️ 경고 메시지**:
- Supabase Dashboard에서 "Destructive operation" 경고
- `DROP TRIGGER IF EXISTS` 구문 때문
- **안전함**: 기존 트리거가 없으므로 삭제할 것이 없음
- "Confirm" 클릭하여 계속 진행

#### 5️⃣ 20250121000005_recalculate_city_stats.sql

**실행 내용**:
```sql
-- 모든 도시에 대해 city_stats 재계산
INSERT INTO city_stats (city_id, likes_count, dislikes_count)
SELECT
  c.id,
  COUNT(CASE WHEN cl.like_type = 'like' THEN 1 END),
  COUNT(CASE WHEN cl.like_type = 'dislike' THEN 1 END)
FROM cities c
LEFT JOIN city_likes cl ON c.id = cl.city_id
GROUP BY c.id
ON CONFLICT (city_id) DO UPDATE ...
```

**왜 필요한가?**:
- 트리거는 앞으로 발생하는 변경사항만 반영
- 과거에 이미 추가된 `city_likes` 데이터는 트리거가 처리 못함
- 이 마이그레이션으로 기존 데이터 기반 통계 재계산

---

## 검증 방법

### ✅ 1. 테이블 생성 확인

```sql
-- Supabase Dashboard → SQL Editor에서 실행
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 기대 결과:
-- cities
-- city_likes
-- city_stats
```

### ✅ 2. 초기 데이터 확인

```sql
-- 도시 개수 확인 (12개여야 함)
SELECT COUNT(*) FROM cities;

-- 도시 목록 확인
SELECT id, name, region, budget, best_season
FROM cities
ORDER BY name;

-- city_stats 초기화 확인 (12개 행, 모두 0)
SELECT city_id, likes_count, dislikes_count
FROM city_stats;
```

### ✅ 3. RLS 정책 확인

```sql
-- RLS 활성화 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- 모든 테이블에서 rowsecurity = true 확인

-- RLS 정책 목록 확인
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 기대 결과:
-- cities: Allow everyone to read cities
-- city_likes: Allow users to read their own likes, insert, update, delete
-- city_stats: Allow everyone to read stats, Allow automatic stats insert/update/delete
```

### ✅ 4. 트리거 확인

```sql
-- 트리거 목록 조회
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY trigger_name;

-- 기대 결과:
-- update_city_stats_on_delete | DELETE | city_likes
-- update_city_stats_on_insert | INSERT | city_likes
-- update_city_stats_on_update | UPDATE | city_likes
```

### ✅ 5. 트리거 동작 테스트 (옵션)

```sql
-- 1. 테스트 사용자 ID (본인의 auth.users.id)
-- Supabase Dashboard → Authentication → Users에서 확인

-- 2. 좋아요 추가
INSERT INTO city_likes (user_id, city_id, like_type)
VALUES (
  'YOUR_USER_ID',  -- 본인 user_id
  (SELECT id FROM cities WHERE name = '제주시'),
  'like'
);

-- 3. city_stats 자동 업데이트 확인
SELECT c.name, cs.likes_count, cs.dislikes_count
FROM city_stats cs
JOIN cities c ON cs.city_id = c.id
WHERE c.name = '제주시';

-- 기대 결과: likes_count = 1

-- 4. 테스트 데이터 삭제 (정리)
DELETE FROM city_likes
WHERE user_id = 'YOUR_USER_ID'
AND city_id = (SELECT id FROM cities WHERE name = '제주시');
```

---

## 트러블슈팅

### 🔴 문제 1: "relation already exists" 에러

**에러 메시지**:
```
ERROR: relation "cities" already exists
```

**원인**: 테이블이 이미 존재함

**해결 방법**:

#### Option A: 기존 테이블 삭제 후 재실행 (주의!)
```sql
-- ⚠️ 경고: 모든 데이터가 삭제됩니다!
DROP TABLE IF EXISTS city_likes CASCADE;
DROP TABLE IF EXISTS city_stats CASCADE;
DROP TABLE IF EXISTS cities CASCADE;

-- 다시 마이그레이션 1번부터 실행
```

#### Option B: 건너뛰고 다음 마이그레이션 실행
- 테이블이 이미 정상적으로 생성되어 있다면 다음 마이그레이션으로 이동

---

### 🔴 문제 2: "new row violates row-level security policy"

**에러 메시지**:
```
ERROR: new row violates row-level security policy for table "city_stats"
```

**원인**:
- `20250121000003_fix_city_stats_rls.sql` 마이그레이션을 실행하지 않음
- city_stats에 INSERT/UPDATE 권한이 없음

**해결 방법**:
```bash
1. 20250121000003_fix_city_stats_rls.sql 파일 실행
2. RLS 정책 확인 쿼리로 검증
```

---

### 🔴 문제 3: "permission denied for schema public"

**에러 메시지**:
```
ERROR: permission denied for schema public
```

**원인**:
- 데이터베이스 권한 부족
- Supabase 무료 플랜의 제한

**해결 방법**:
1. Supabase Dashboard에서 관리자 계정으로 로그인 확인
2. SQL Editor에서 `postgres` 역할로 실행
3. 프로젝트 Owner 권한 확인

---

### 🔴 문제 4: "function uuid_generate_v4() does not exist"

**에러 메시지**:
```
ERROR: function uuid_generate_v4() does not exist
```

**원인**: uuid-ossp extension 미설치

**해결 방법**:
```sql
-- 먼저 실행
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 다시 마이그레이션 실행
```

---

### 🔴 문제 5: 트리거가 동작하지 않음

**증상**:
- 좋아요 클릭해도 city_stats의 likes_count가 증가하지 않음
- city_stats가 모두 0으로 표시됨

**원인**:
- `20250121000004_create_triggers.sql` 마이그레이션 미실행
- 트리거 생성 중 에러 발생

**해결 방법**:
```sql
-- 1. 트리거 존재 확인
SELECT trigger_name
FROM information_schema.triggers
WHERE event_object_table = 'city_likes';

-- 결과가 비어있다면 트리거가 없음

-- 2. 20250121000004_create_triggers.sql 다시 실행

-- 3. 통계 재계산
-- 20250121000005_recalculate_city_stats.sql 실행
```

---

### 🔴 문제 6: CLI에서 "Project not linked" 에러

**에러 메시지**:
```
Error: Project not linked. Run supabase link first.
```

**해결 방법**:
```bash
# 프로젝트 링크
supabase link --project-ref YOUR_PROJECT_ID

# 예시
supabase link --project-ref qzmxjjklzoopdlsajlfa

# 비밀번호 입력 프롬프트 나오면 입력
```

---

## 📊 마이그레이션 후 데이터베이스 구조

```
┌─────────────────────────────────────────────┐
│              Supabase Database              │
├─────────────────────────────────────────────┤
│                                              │
│  📁 cities (12 rows)                        │
│  ├─ id (uuid, PK)                           │
│  ├─ name, region, description               │
│  ├─ budget, cafe_count, cafe_density        │
│  ├─ average_rating, review_count            │
│  ├─ characteristics[] (배열)                │
│  ├─ environments[] (배열)                   │
│  └─ tags[] (배열)                           │
│                                              │
│  📁 city_likes (0 rows 초기)                │
│  ├─ id (uuid, PK)                           │
│  ├─ user_id (uuid, FK → auth.users)        │
│  ├─ city_id (uuid, FK → cities)            │
│  ├─ like_type ('like' | 'dislike')         │
│  └─ UNIQUE(user_id, city_id)               │
│                                              │
│  📁 city_stats (12 rows)                    │
│  ├─ city_id (uuid, PK, FK → cities)        │
│  ├─ likes_count (integer, default 0)       │
│  ├─ dislikes_count (integer, default 0)    │
│  └─ updated_at (timestamp)                  │
│                                              │
│  ⚙️ Triggers                                │
│  ├─ update_city_stats_on_insert            │
│  ├─ update_city_stats_on_update            │
│  └─ update_city_stats_on_delete            │
│     → update_city_stats() 함수 실행         │
│                                              │
│  🔒 RLS Policies                            │
│  ├─ cities: 모든 사용자 읽기 가능           │
│  ├─ city_likes: 본인 데이터만 CRUD         │
│  └─ city_stats: 모든 사용자 읽기,          │
│                 트리거 자동 쓰기            │
└─────────────────────────────────────────────┘
```

---

## 🎯 마이그레이션 체크리스트

실행 전 체크리스트:

- [ ] Supabase 프로젝트 생성 완료
- [ ] 환경 변수 설정 완료 (.env.local)
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Supabase Dashboard 접속 가능

실행 후 체크리스트:

- [ ] 5개 마이그레이션 파일 모두 실행
- [ ] `cities` 테이블에 12개 도시 데이터 확인
- [ ] `city_stats` 테이블에 12개 행 확인
- [ ] RLS 정책 확인 (모든 테이블에 활성화)
- [ ] 트리거 3개 생성 확인
- [ ] 애플리케이션에서 도시 목록 표시 확인
- [ ] 좋아요/싫어요 버튼 동작 확인
- [ ] 페이지 새로고침 후 데이터 유지 확인

---

## 📚 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase CLI 가이드](https://supabase.com/docs/guides/cli)
- [PostgreSQL 트리거 문서](https://www.postgresql.org/docs/current/sql-createtrigger.html)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🆘 추가 도움이 필요하신가요?

1. **Supabase Discord**: https://discord.supabase.com
2. **GitHub Issues**: https://github.com/supabase/supabase/issues
3. **Stack Overflow**: `supabase` 태그로 질문

---

**마지막 업데이트**: 2025-01-21
**작성자**: Claude Code
**프로젝트**: Nomad Korea

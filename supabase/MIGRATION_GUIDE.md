# Supabase 마이그레이션 가이드

## 📋 마이그레이션 실행 방법

### 방법 1: Supabase 대시보드에서 실행 (추천)

1. **Supabase 프로젝트 대시보드 접속**
   - https://supabase.com/dashboard/project/qzmxjjklzoopdlsajlfa

2. **SQL Editor로 이동**
   - 왼쪽 메뉴에서 `SQL Editor` 클릭

3. **마이그레이션 파일 실행**

   #### Step 1: 테이블 생성
   - `supabase/migrations/20250121000001_create_cities_and_likes_tables.sql` 파일 내용을 복사
   - SQL Editor에 붙여넣기
   - `Run` 버튼 클릭

   #### Step 2: 초기 데이터 삽입
   - `supabase/migrations/20250121000002_insert_initial_cities_data.sql` 파일 내용을 복사
   - SQL Editor에 붙여넣기
   - `Run` 버튼 클릭

4. **테이블 확인**
   - 왼쪽 메뉴에서 `Table Editor` 클릭
   - `cities`, `city_likes`, `city_stats` 테이블이 생성되었는지 확인
   - `cities` 테이블에 12개 도시 데이터가 있는지 확인

---

### 방법 2: Supabase CLI 사용 (로컬 개발)

```bash
# Supabase CLI 설치 (이미 설치된 경우 생략)
npm install -g supabase

# Supabase 로그인
supabase login

# 프로젝트 링크
supabase link --project-ref qzmxjjklzoopdlsajlfa

# 마이그레이션 실행
supabase db push
```

---

## ✅ 마이그레이션 검증

### 1. 테이블 생성 확인

```sql
-- 테이블 목록 조회
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- 결과: cities, city_likes, city_stats
```

### 2. 데이터 삽입 확인

```sql
-- 도시 개수 확인 (12개여야 함)
SELECT COUNT(*) FROM cities;

-- 도시 목록 조회
SELECT id, name, region, budget, best_season FROM cities;
```

### 3. RLS 정책 확인

```sql
-- RLS 활성화 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- RLS 정책 목록 조회
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

### 4. 트리거 확인

```sql
-- 트리거 목록 조회
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

---

## 🔧 트러블슈팅

### 문제 1: "relation already exists" 에러
**원인**: 테이블이 이미 존재함
**해결**: 기존 테이블 삭제 후 재실행

```sql
DROP TABLE IF EXISTS city_likes CASCADE;
DROP TABLE IF EXISTS city_stats CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
```

### 문제 2: "permission denied for schema public" 에러
**원인**: RLS 정책 문제
**해결**: Supabase 대시보드에서 관리자 권한으로 실행

### 문제 3: UUID 생성 실패
**원인**: uuid-ossp extension 미설치
**해결**: 마이그레이션 파일 첫 줄 확인 (`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

---

## 📊 생성된 스키마 구조

### cities 테이블
- **목적**: 도시 기본 정보 저장
- **행 수**: 12개
- **RLS**: 모든 사용자 읽기 가능

### city_likes 테이블
- **목적**: 사용자별 좋아요/싫어요 저장
- **행 수**: 0개 (초기)
- **RLS**: 본인 데이터만 CRUD 가능
- **제약**: UNIQUE(user_id, city_id)

### city_stats 테이블
- **목적**: 도시별 좋아요/싫어요 통계
- **행 수**: 12개
- **RLS**: 모든 사용자 읽기 가능
- **자동 업데이트**: city_likes 변경 시 트리거로 자동 갱신

---

## 🎯 다음 단계

마이그레이션 완료 후:

1. ✅ TypeScript 타입 생성
   ```bash
   npx supabase gen types typescript --project-id qzmxjjklzoopdlsajlfa > lib/database.types.ts
   ```

2. ✅ API 함수 구현 (`lib/api/cities.ts`)

3. ✅ 프론트엔드 연동 (`app/page.tsx`)

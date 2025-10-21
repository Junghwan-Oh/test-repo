# 🚀 Supabase 백엔드 연동 완료 - 설정 가이드

## ✅ 현재 진행 상황

- **Phase 1-3 완료**: 데이터베이스 스키마 설계, API 함수 구현 완료
- **다음 단계**: Supabase에서 마이그레이션 SQL 실행 필요

---

## 📋 마이그레이션 실행 방법 (필수)

### 1단계: Supabase 대시보드 접속

https://supabase.com/dashboard/project/qzmxjjklzoopdlsajlfa

### 2단계: SQL Editor 열기

왼쪽 메뉴에서 **SQL Editor** 클릭

### 3단계: 마이그레이션 SQL 실행

#### 3-1. 테이블 생성

`supabase/migrations/20250121000001_create_cities_and_likes_tables.sql` 파일을 열어서:

1. 전체 내용 복사 (Ctrl+A, Ctrl+C)
2. SQL Editor에 붙여넣기 (Ctrl+V)
3. **Run** 버튼 클릭 ▶️

예상 시간: 약 10초

#### 3-2. 초기 데이터 삽입

`supabase/migrations/20250121000002_insert_initial_cities_data.sql` 파일을 열어서:

1. 전체 내용 복사
2. SQL Editor에 붙여넣기
3. **Run** 버튼 클릭 ▶️

예상 시간: 약 5초

### 4단계: 테이블 확인

왼쪽 메뉴에서 **Table Editor** 클릭

다음 3개 테이블이 보여야 합니다:
- ✅ `cities` (12 rows)
- ✅ `city_likes` (0 rows)
- ✅ `city_stats` (12 rows)

---

## 🎯 생성된 데이터베이스 구조

### cities 테이블
- **역할**: 도시 기본 정보
- **데이터**: 12개 도시 (제주시, 강릉시, 부산, 전주시, 속초시, 대전, 광주, 경주, 여수, 춘천, 서귀포, 포항)
- **필드**: 이름, 지역, 설명, 이미지, 평점, 생활비, 카페 정보, 태그, 특성, 환경, 최고계절 등

### city_likes 테이블
- **역할**: 사용자별 좋아요/싫어요 기록
- **RLS**: 본인 데이터만 CRUD 가능
- **제약**: 한 사용자당 한 도시에 하나의 반응만

### city_stats 테이블
- **역할**: 도시별 좋아요/싫어요 통계
- **자동 업데이트**: city_likes 변경 시 트리거로 자동 갱신
- **RLS**: 모든 사용자 읽기 가능

---

## 🔧 다음 단계 (코드 연동)

마이그레이션 완료 후 다음 명령어로 개발 서버를 실행하면 Supabase와 연동된 웹사이트를 확인할 수 있습니다:

```bash
pnpm dev
```

### 주요 변경 사항

1. **도시 데이터**: 이제 Supabase에서 실시간으로 가져옴
2. **필터링**: 서버 측에서 빠르게 처리
3. **좋아요/싫어요**: 사용자별로 저장되며 새로고침 후에도 유지
4. **통계**: 실시간으로 모든 사용자의 좋아요 반영

---

## 🚨 트러블슈팅

### "relation already exists" 에러
**해결**: 기존 테이블 삭제 후 재실행

```sql
DROP TABLE IF EXISTS city_likes CASCADE;
DROP TABLE IF EXISTS city_stats CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
```

### 데이터가 보이지 않음
**해결**:
1. Table Editor에서 `cities` 테이블에 12개 행이 있는지 확인
2. 없으면 2단계 마이그레이션 SQL 다시 실행

### TypeScript 에러
**해결**: Supabase 타입 생성

```bash
npx supabase gen types typescript --project-id qzmxjjklzoopdlsajlfa > lib/database.types.ts
```

---

## 📞 지원

문제가 발생하면:
1. `supabase/MIGRATION_GUIDE.md` 참고
2. Supabase 대시보드에서 **Database > Logs** 확인
3. 프로젝트 콘솔에서 에러 메시지 확인

---

**마이그레이션을 완료한 후** Phase 4-8이 자동으로 적용됩니다! 🎉

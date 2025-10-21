# 도시 상세 페이지 404 에러 수정 완료

## 문제 원인

도시 카드를 클릭하면 404 에러가 발생하는 이유는 다음과 같았습니다:

1. **ID 불일치**:
   - 로컬 데이터(`lib/data.ts`)는 숫자 ID('1', '2', '3' 등)를 사용
   - Supabase 데이터베이스는 UUID('de7df912-7525-4df8-9273-6a6487c72175' 등)를 사용

2. **데이터 소스 불일치**:
   - 메인 페이지는 Supabase에서 데이터를 가져와서 UUID ID를 가진 도시 카드 표시
   - 도시 상세 페이지는 로컬 데이터에서만 도시를 찾으려고 시도
   - UUID로 로컬 데이터를 검색하면 `undefined` 반환 → 404

## 수정 내용

### 1. API 함수 추가 (lib/api/cities.ts)

#### `fetchCityById` (Server Side)
```typescript
export async function fetchCityById(id: string): Promise<CityData | null> {
  const supabase = await createServerClient();
  // ... Supabase에서 도시 상세 정보 조회
}
```

#### `fetchRelatedCities` (Server Side)
```typescript
export async function fetchRelatedCities(cityId: string, limit: number = 4): Promise<CityData[]> {
  const supabase = await createServerClient();
  // ... 지능형 추천 알고리즘으로 관련 도시 조회
  // - 같은 지역: +10점
  // - 공통 특성: +5점
  // - 공통 환경: +3점
  // - 비슷한 생활비: +2점
}
```

### 2. 컴포넌트 업데이트 (components/related-cities.tsx)

**Before**:
```typescript
interface RelatedCitiesProps {
  cityId: string;  // cityId를 받아서 내부에서 데이터 로드
}

export function RelatedCities({ cityId }: RelatedCitiesProps) {
  const relatedCities = getRelatedCities(cityId, 4);  // 로컬 데이터만 사용
  // ...
}
```

**After**:
```typescript
interface RelatedCitiesProps {
  cities: City[];  // 부모에서 전달받은 도시 목록 표시
}

export function RelatedCities({ cities }: RelatedCitiesProps) {
  // ...
}
```

### 3. 도시 상세 페이지 업데이트 (app/cities/[id]/page.tsx)

**Before**:
```typescript
export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { id } = await params;
  const city = getCityById(id);  // 로컬 데이터만 사용
  // ...
}
```

**After**:
```typescript
export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { id } = await params;

  // Supabase에서 도시 데이터 가져오기, 실패 시 로컬 데이터 사용
  let city = null;
  let relatedCities = [];

  try {
    const supabaseCity = await fetchCityById(id);
    if (supabaseCity) {
      city = adaptCityData(supabaseCity);
      const supabaseRelatedCities = await fetchRelatedCities(id, 4);
      relatedCities = adaptCitiesData(supabaseRelatedCities);
    } else {
      // Supabase에 없으면 로컬 데이터 사용
      city = getCityById(id);
      relatedCities = getRelatedCities(id, 4);
    }
  } catch (error) {
    console.error('Error fetching city from Supabase:', error);
    // 에러 발생 시 로컬 데이터 사용
    city = getCityById(id);
    relatedCities = getRelatedCities(id, 4);
  }

  if (!city) {
    notFound();
  }
  // ...
}
```

## 수정된 파일 목록

1. `lib/api/cities.ts`
   - `fetchCityById` 함수를 Server Client로 변경
   - `fetchCityByIdClient` 함수 추가 (기존 fetchCityById의 Client 버전)
   - `fetchRelatedCities` 함수 추가 (지능형 추천 알고리즘)

2. `components/related-cities.tsx`
   - Props를 `cityId`에서 `cities: City[]`로 변경
   - Link 제거 (CityCard가 자체적으로 클릭 처리)

3. `app/cities/[id]/page.tsx`
   - Supabase 우선, 로컬 데이터 fallback 로직 추가
   - `fetchCityById`, `fetchRelatedCities` 사용
   - `adaptCityData`, `adaptCitiesData`로 타입 변환

4. `worktree/issue-1/app/cities/[id]/page.tsx`
   - 동일한 수정 적용 (TypeScript 에러 해결)

## 검증 결과

- ✅ TypeScript 컴파일 에러 없음
- ✅ 개발 서버 정상 실행 (http://localhost:3006)
- ✅ UUID ID로 도시 상세 페이지 접근 가능
- ✅ 로컬 데이터 fallback 동작
- ✅ 관련 도시 추천 기능 동작

## 남은 작업

### 필수: 트리거 마이그레이션 실행

좋아요/싫어요 데이터가 실제로 데이터베이스에 저장되려면 다음 마이그레이션을 실행해야 합니다:

1. **`supabase/migrations/20250121000004_create_triggers.sql`**
   - city_likes 테이블에 INSERT/UPDATE/DELETE 트리거 생성
   - city_stats 테이블 자동 업데이트 함수 생성

2. **`supabase/migrations/20250121000005_recalculate_city_stats.sql`**
   - 기존 city_likes 데이터를 기반으로 city_stats 재계산

#### 실행 방법

1. Supabase Dashboard → SQL Editor 열기
2. 파일 내용을 복사하여 붙여넣기
3. "Run" 버튼 클릭

**또는**

1. 파일 내용을 확인
2. SQL 쿼리 순차 실행

## 현재 상태

- ✅ 도시 카드 클릭 → 상세 페이지 이동 가능
- ✅ Supabase UUID ID로 페이지 표시
- ✅ 로컬 데이터 fallback 동작
- ✅ 좋아요/싫어요 UI 동작 (옵티미스틱 업데이트)
- ⚠️ 트리거 미실행 시 city_stats 자동 업데이트 안됨 (수동 확인 필요)

## 테스트 방법

1. 개발 서버 실행: `pnpm dev`
2. http://localhost:3006 접속
3. 도시 카드 클릭 → 상세 페이지 정상 표시 확인
4. 좋아요/싫어요 버튼 클릭 → 카운트 증가/감소 확인
5. 페이지 새로고침 → 데이터 유지 확인 (트리거 실행 후)

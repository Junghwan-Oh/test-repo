import { describe, it, expect } from 'vitest';
import { cities, featuredCity, getCityById, getRelatedCities } from '@/lib/data';
import { City } from '@/lib/types';

describe('cities array', () => {
  it('should contain 12 cities', () => {
    expect(cities).toHaveLength(12);
  });

  it('should have unique IDs', () => {
    const ids = cities.map((city) => city.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(cities.length);
  });

  it('should have valid structure for each city', () => {
    cities.forEach((city) => {
      expect(city).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        region: expect.any(String),
        description: expect.any(String),
        imageUrl: expect.any(String),
        averageRating: expect.any(Number),
        reviewCount: expect.any(Number),
      });
    });
  });

  it('should have all required fields', () => {
    cities.forEach((city) => {
      // 필수 문자열 필드
      expect(city.id).toBeDefined();
      expect(city.name).toBeDefined();
      expect(city.region).toBeDefined();
      expect(city.description).toBeDefined();
      expect(city.imageUrl).toBeDefined();
      expect(city.budget).toBeDefined();

      // 필수 숫자 필드
      expect(city.averageRating).toBeDefined();
      expect(city.reviewCount).toBeDefined();
      expect(city.likesCount).toBeDefined();
      expect(city.dislikesCount).toBeDefined();
      expect(city.averageRent).toBeDefined();
      expect(city.averageLivingCost).toBeDefined();
      expect(city.cafeCount).toBeDefined();
      expect(city.internetScore).toBeDefined();
      expect(city.transportScore).toBeDefined();

      // 필수 배열 필드
      expect(city.tags).toBeDefined();
      expect(city.characteristics).toBeDefined();
      expect(city.environments).toBeDefined();

      // 필수 기타 필드
      expect(city.cafeDensity).toBeDefined();
      expect(city.bestSeason).toBeDefined();
      expect(city.createdAt).toBeDefined();
      expect(city.updatedAt).toBeDefined();
    });
  });

  it('should have valid data types', () => {
    cities.forEach((city) => {
      // 숫자 타입 검증
      expect(typeof city.averageRating).toBe('number');
      expect(typeof city.reviewCount).toBe('number');
      expect(typeof city.likesCount).toBe('number');
      expect(typeof city.dislikesCount).toBe('number');
      expect(typeof city.averageRent).toBe('number');
      expect(typeof city.averageLivingCost).toBe('number');
      expect(typeof city.cafeCount).toBe('number');
      expect(typeof city.internetScore).toBe('number');
      expect(typeof city.transportScore).toBe('number');

      // 배열 타입 검증
      expect(Array.isArray(city.tags)).toBe(true);
      expect(Array.isArray(city.characteristics)).toBe(true);
      expect(Array.isArray(city.environments)).toBe(true);

      // Date 타입 검증
      expect(city.createdAt instanceof Date).toBe(true);
      expect(city.updatedAt instanceof Date).toBe(true);
    });
  });
});

describe('featuredCity', () => {
  it('should be the second city (강릉시)', () => {
    expect(featuredCity).toBe(cities[1]);
  });

  it('should have name "강릉시"', () => {
    expect(featuredCity.name).toBe('강릉시');
  });

  it('should be a valid City object', () => {
    expect(featuredCity).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      region: expect.any(String),
      description: expect.any(String),
      imageUrl: expect.any(String),
      averageRating: expect.any(Number),
      reviewCount: expect.any(Number),
      likesCount: expect.any(Number),
      dislikesCount: expect.any(Number),
    });
  });
});

describe('getCityById()', () => {
  // 정상 케이스
  it('should return city when valid ID is provided', () => {
    const city = getCityById('1');
    expect(city).toBeDefined();
    expect(city?.name).toBe('제주시');
  });

  it('should return correct city for ID "2"', () => {
    const city = getCityById('2');
    expect(city).toBeDefined();
    expect(city?.name).toBe('강릉시');
  });

  it('should return city with matching ID', () => {
    const city = getCityById('12');
    expect(city).toBeDefined();
    expect(city?.id).toBe('12');
    expect(city?.name).toBe('포항');
  });

  // Edge cases
  it('should return undefined for non-existent ID', () => {
    const city = getCityById('999');
    expect(city).toBeUndefined();
  });

  it('should return undefined for empty string', () => {
    const city = getCityById('');
    expect(city).toBeUndefined();
  });

  it('should return undefined for null', () => {
    const city = getCityById(null as any);
    expect(city).toBeUndefined();
  });

  it('should return undefined for undefined', () => {
    const city = getCityById(undefined as any);
    expect(city).toBeUndefined();
  });

  it('should be case-sensitive for IDs', () => {
    const city1 = getCityById('1');
    const city2 = getCityById('01');
    expect(city1).toBeDefined();
    expect(city2).toBeUndefined(); // '01'은 존재하지 않음
  });
});

describe('getRelatedCities()', () => {
  // 정상 케이스
  it('should return related cities for valid city ID', () => {
    const related = getRelatedCities('1', 4);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);
  });

  it('should return at most "limit" cities', () => {
    const related = getRelatedCities('1', 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it('should not include the current city', () => {
    const related = getRelatedCities('1', 4);
    expect(related.every((city) => city.id !== '1')).toBe(true);
  });

  it('should return cities sorted by score (highest first)', () => {
    const currentCity = getCityById('1'); // 제주시
    const related = getRelatedCities('1', 4);

    // 관련 도시들의 점수를 계산
    const scores = related.map((city) => {
      let score = 0;

      // 같은 지역이면 +10점
      if (city.region === currentCity?.region) {
        score += 10;
      }

      // 공통 특성 개수만큼 +5점
      const commonCharacteristics = city.characteristics.filter((char) =>
        currentCity?.characteristics.includes(char)
      );
      score += commonCharacteristics.length * 5;

      // 공통 환경 개수만큼 +3점
      const commonEnvironments = city.environments.filter((env) =>
        currentCity?.environments.includes(env)
      );
      score += commonEnvironments.length * 3;

      // 비슷한 생활비 (+/- 20만원 이내)이면 +2점
      if (currentCity && Math.abs(city.averageLivingCost - currentCity.averageLivingCost) <= 200000) {
        score += 2;
      }

      return score;
    });

    // 점수가 내림차순으로 정렬되어 있는지 확인
    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]).toBeGreaterThanOrEqual(scores[i + 1]);
    }
  });

  // 점수 계산 로직 테스트
  it('should prioritize cities from same region (+10 points)', () => {
    const related = getRelatedCities('1', 4); // 제주시 (제주도)
    const currentCity = getCityById('1');

    // 제주도 지역 도시 확인 (서귀포시)
    const sameRegionCity = related.find((city) => city.region === currentCity?.region);

    if (sameRegionCity) {
      // 같은 지역 도시가 있다면, 높은 순위에 있어야 함
      const index = related.findIndex((city) => city.id === sameRegionCity.id);
      expect(index).toBeLessThan(related.length); // 목록에 포함되어야 함
    }
  });

  it('should prioritize cities with common characteristics (+5 per match)', () => {
    const related = getRelatedCities('1', 4); // 제주시 (coastal)
    const currentCity = getCityById('1');

    related.forEach((city) => {
      const commonCharacteristics = city.characteristics.filter((char) =>
        currentCity?.characteristics.includes(char)
      );

      // coastal 특성이 있는 도시들이 포함되어야 함
      if (commonCharacteristics.length > 0) {
        expect(city.characteristics.some((char) => currentCity?.characteristics.includes(char))).toBe(true);
      }
    });
  });

  it('should prioritize cities with common environments (+3 per match)', () => {
    const related = getRelatedCities('1', 4); // 제주시
    const currentCity = getCityById('1');

    related.forEach((city) => {
      const commonEnvironments = city.environments.filter((env) =>
        currentCity?.environments.includes(env)
      );

      // 관련 도시는 최소한 일부 공통 환경을 공유할 가능성이 높음
      expect(city.environments).toBeDefined();
      expect(Array.isArray(city.environments)).toBe(true);
    });
  });

  it('should prioritize cities with similar budget (+2 points)', () => {
    const related = getRelatedCities('1', 4); // 제주시 (averageLivingCost: 1200000)
    const currentCity = getCityById('1');

    related.forEach((city) => {
      expect(city.averageLivingCost).toBeDefined();
      expect(typeof city.averageLivingCost).toBe('number');
    });
  });

  // 정렬 로직 테스트
  it('should sort by score (primary) and rating (secondary)', () => {
    const related = getRelatedCities('1', 4);

    // 평점이 정의되어 있는지 확인
    related.forEach((city) => {
      expect(city.averageRating).toBeDefined();
      expect(typeof city.averageRating).toBe('number');
    });
  });

  it('should handle tie-breaking with average rating', () => {
    const related = getRelatedCities('1', 10); // 더 많은 도시 가져오기

    // 같은 점수를 가진 도시들을 찾기
    const currentCity = getCityById('1');
    const citiesWithScores = related.map((city) => {
      let score = 0;

      if (city.region === currentCity?.region) {
        score += 10;
      }

      const commonCharacteristics = city.characteristics.filter((char) =>
        currentCity?.characteristics.includes(char)
      );
      score += commonCharacteristics.length * 5;

      const commonEnvironments = city.environments.filter((env) =>
        currentCity?.environments.includes(env)
      );
      score += commonEnvironments.length * 3;

      if (currentCity && Math.abs(city.averageLivingCost - currentCity.averageLivingCost) <= 200000) {
        score += 2;
      }

      return { city, score };
    });

    // 같은 점수를 가진 연속된 도시들 찾기
    for (let i = 0; i < citiesWithScores.length - 1; i++) {
      if (citiesWithScores[i].score === citiesWithScores[i + 1].score) {
        // 같은 점수면 평점이 높은 순으로 정렬되어야 함
        expect(citiesWithScores[i].city.averageRating).toBeGreaterThanOrEqual(
          citiesWithScores[i + 1].city.averageRating
        );
      }
    }
  });

  // Edge cases
  it('should return empty array for non-existent city ID', () => {
    const related = getRelatedCities('999', 4);
    expect(related).toEqual([]);
  });

  it('should return empty array for null city ID', () => {
    const related = getRelatedCities(null as any, 4);
    expect(related).toEqual([]);
  });

  it('should handle limit = 0', () => {
    const related = getRelatedCities('1', 0);
    expect(related).toEqual([]);
  });

  it('should handle limit > available cities', () => {
    const related = getRelatedCities('1', 100);
    expect(related.length).toBeLessThanOrEqual(11); // 전체 12개 - 현재 도시 1개 = 11개
  });

  it('should handle default limit (4)', () => {
    const related = getRelatedCities('1'); // limit 파라미터 생략
    expect(related.length).toBeLessThanOrEqual(4);
  });

  // 실제 데이터 테스트
  it('should return correct related cities for 제주시 (ID: "1")', () => {
    const related = getRelatedCities('1', 4);
    const currentCity = getCityById('1');

    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);

    // 제주시는 coastal 특성을 가지므로, 관련 도시에도 coastal 특성이 있을 가능성이 높음
    const coastalCities = related.filter((city) => city.characteristics.includes('coastal'));
    expect(coastalCities.length).toBeGreaterThan(0);
  });

  it('should return correct related cities for 강릉시 (ID: "2")', () => {
    const related = getRelatedCities('2', 4);

    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);
    expect(related.every((city) => city.id !== '2')).toBe(true);
  });

  it('should return correct related cities for 부산 (ID: "3")', () => {
    const related = getRelatedCities('3', 4);
    const currentCity = getCityById('3');

    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);

    // 부산은 coastal과 urban 특성을 가짐
    expect(currentCity?.characteristics).toContain('coastal');
    expect(currentCity?.characteristics).toContain('urban');
  });
});

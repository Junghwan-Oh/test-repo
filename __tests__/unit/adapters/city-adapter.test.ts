/**
 * Unit Tests: lib/adapters/city-adapter.ts
 *
 * Test Coverage:
 * - adaptCityData() - field conversion (snake_case → camelCase)
 * - adaptCityData() - null/undefined handling
 * - adaptCityData() - array conversion
 * - adaptCityData() - complete object conversion
 * - adaptCitiesData() - array conversion
 *
 * Total: 15 tests
 */

import { describe, it, expect } from 'vitest';
import { adaptCityData, adaptCitiesData } from '@/lib/adapters/city-adapter';
import type { CityData } from '@/lib/api/cities';

describe('adaptCityData()', () => {
  // Mock Supabase city data
  const mockSupabaseCity: CityData = {
    id: 'test-city-1',
    name: '테스트시',
    region: '수도권',
    description: '테스트 도시 설명입니다.',
    image_url: 'https://example.com/test-city.jpg',
    average_rating: 4.5,
    review_count: 100,
    likes_count: 50,
    dislikes_count: 5,
    average_rent: 500000,
    average_living_cost: 1000000,
    budget: '100~200만원',
    cafe_count: 120,
    cafe_density: 'high',
    internet_score: 4,
    transport_score: 5,
    tags: ['카페', '자연', '힐링'],
    characteristics: ['coastal', 'cultural'],
    environments: ['자연친화', '카페작업'],
    best_season: '봄',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-21T00:00:00.000Z',
  };

  describe('Field Conversion - snake_case → camelCase', () => {
    it('should convert id correctly', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.id).toBe(mockSupabaseCity.id);
    });

    it('should convert image_url to imageUrl', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.imageUrl).toBe(mockSupabaseCity.image_url);
      expect(result.imageUrl).toBe('https://example.com/test-city.jpg');
    });

    it('should convert average_rating to averageRating', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.averageRating).toBe(mockSupabaseCity.average_rating);
      expect(result.averageRating).toBe(4.5);
    });

    it('should convert review_count to reviewCount', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.reviewCount).toBe(mockSupabaseCity.review_count);
      expect(result.reviewCount).toBe(100);
    });

    it('should convert likes_count to likesCount', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.likesCount).toBe(mockSupabaseCity.likes_count);
      expect(result.likesCount).toBe(50);
    });

    it('should convert dislikes_count to dislikesCount', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.dislikesCount).toBe(mockSupabaseCity.dislikes_count);
      expect(result.dislikesCount).toBe(5);
    });

    it('should convert average_rent to averageRent', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.averageRent).toBe(mockSupabaseCity.average_rent);
      expect(result.averageRent).toBe(500000);
    });

    it('should convert average_living_cost to averageLivingCost', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.averageLivingCost).toBe(mockSupabaseCity.average_living_cost);
      expect(result.averageLivingCost).toBe(1000000);
    });

    it('should convert cafe_count to cafeCount', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.cafeCount).toBe(mockSupabaseCity.cafe_count);
      expect(result.cafeCount).toBe(120);
    });

    it('should convert cafe_density to cafeDensity', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.cafeDensity).toBe(mockSupabaseCity.cafe_density);
      expect(result.cafeDensity).toBe('high');
    });

    it('should convert internet_score to internetScore', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.internetScore).toBe(mockSupabaseCity.internet_score);
      expect(result.internetScore).toBe(4);
    });

    it('should convert transport_score to transportScore', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.transportScore).toBe(mockSupabaseCity.transport_score);
      expect(result.transportScore).toBe(5);
    });

    it('should convert best_season to bestSeason', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.bestSeason).toBe(mockSupabaseCity.best_season);
      expect(result.bestSeason).toBe('봄');
    });

    it('should convert created_at to Date object', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.createdAt.toISOString()).toBe('2025-01-01T00:00:00.000Z');
    });

    it('should convert updated_at to Date object', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.updatedAt.toISOString()).toBe('2025-01-21T00:00:00.000Z');
    });
  });

  describe('Null/Undefined Handling', () => {
    it('should handle null likes_count (default to 0)', () => {
      const cityWithNullLikes = { ...mockSupabaseCity, likes_count: null };
      const result = adaptCityData(cityWithNullLikes as any);
      expect(result.likesCount).toBe(0);
    });

    it('should handle null dislikes_count (default to 0)', () => {
      const cityWithNullDislikes = { ...mockSupabaseCity, dislikes_count: null };
      const result = adaptCityData(cityWithNullDislikes as any);
      expect(result.dislikesCount).toBe(0);
    });

    it('should handle undefined likes_count (default to 0)', () => {
      const cityWithUndefinedLikes = { ...mockSupabaseCity, likes_count: undefined };
      const result = adaptCityData(cityWithUndefinedLikes as any);
      expect(result.likesCount).toBe(0);
    });

    it('should handle undefined dislikes_count (default to 0)', () => {
      const cityWithUndefinedDislikes = { ...mockSupabaseCity, dislikes_count: undefined };
      const result = adaptCityData(cityWithUndefinedDislikes as any);
      expect(result.dislikesCount).toBe(0);
    });
  });

  describe('Array Field Conversion', () => {
    it('should convert tags array correctly', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(Array.isArray(result.tags)).toBe(true);
      expect(result.tags).toHaveLength(3);
      expect(result.tags).toEqual(['카페', '자연', '힐링']);
    });

    it('should convert characteristics array correctly', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(Array.isArray(result.characteristics)).toBe(true);
      expect(result.characteristics).toHaveLength(2);
      expect(result.characteristics).toEqual(['coastal', 'cultural']);
    });

    it('should convert environments array correctly', () => {
      const result = adaptCityData(mockSupabaseCity);
      expect(Array.isArray(result.environments)).toBe(true);
      expect(result.environments).toHaveLength(2);
      expect(result.environments).toEqual(['자연친화', '카페작업']);
    });
  });

  describe('Complete Object Conversion', () => {
    it('should convert complete city data correctly', () => {
      const result = adaptCityData(mockSupabaseCity);

      // Check all required fields exist
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('region');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('imageUrl');
      expect(result).toHaveProperty('averageRating');
      expect(result).toHaveProperty('reviewCount');
      expect(result).toHaveProperty('likesCount');
      expect(result).toHaveProperty('dislikesCount');
      expect(result).toHaveProperty('averageRent');
      expect(result).toHaveProperty('averageLivingCost');
      expect(result).toHaveProperty('budget');
      expect(result).toHaveProperty('cafeCount');
      expect(result).toHaveProperty('cafeDensity');
      expect(result).toHaveProperty('internetScore');
      expect(result).toHaveProperty('transportScore');
      expect(result).toHaveProperty('tags');
      expect(result).toHaveProperty('characteristics');
      expect(result).toHaveProperty('environments');
      expect(result).toHaveProperty('bestSeason');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });

    it('should preserve all original field values', () => {
      const result = adaptCityData(mockSupabaseCity);

      expect(result.id).toBe('test-city-1');
      expect(result.name).toBe('테스트시');
      expect(result.region).toBe('수도권');
      expect(result.description).toBe('테스트 도시 설명입니다.');
      expect(result.imageUrl).toBe('https://example.com/test-city.jpg');
      expect(result.averageRating).toBe(4.5);
      expect(result.reviewCount).toBe(100);
      expect(result.likesCount).toBe(50);
      expect(result.dislikesCount).toBe(5);
      expect(result.averageRent).toBe(500000);
      expect(result.averageLivingCost).toBe(1000000);
      expect(result.budget).toBe('100~200만원');
      expect(result.cafeCount).toBe(120);
      expect(result.cafeDensity).toBe('high');
      expect(result.internetScore).toBe(4);
      expect(result.transportScore).toBe(5);
      expect(result.tags).toEqual(['카페', '자연', '힐링']);
      expect(result.characteristics).toEqual(['coastal', 'cultural']);
      expect(result.environments).toEqual(['자연친화', '카페작업']);
      expect(result.bestSeason).toBe('봄');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });
});

describe('adaptCitiesData()', () => {
  const mockCity1: CityData = {
    id: 'city-1',
    name: '제주시',
    region: '제주도',
    description: '제주도의 중심 도시',
    image_url: 'https://example.com/jeju.jpg',
    average_rating: 4.8,
    review_count: 200,
    likes_count: 100,
    dislikes_count: 10,
    average_rent: 600000,
    average_living_cost: 1200000,
    budget: '100~200만원',
    cafe_count: 150,
    cafe_density: 'high',
    internet_score: 5,
    transport_score: 4,
    tags: ['바다', '자연', '힐링'],
    characteristics: ['coastal'],
    environments: ['자연친화'],
    best_season: '봄',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-15T00:00:00.000Z',
  };

  const mockCity2: CityData = {
    id: 'city-2',
    name: '강릉시',
    region: '강원도',
    description: '동해안의 아름다운 도시',
    image_url: 'https://example.com/gangneung.jpg',
    average_rating: 4.6,
    review_count: 150,
    likes_count: 80,
    dislikes_count: 8,
    average_rent: 550000,
    average_living_cost: 1100000,
    budget: '100~200만원',
    cafe_count: 130,
    cafe_density: 'medium',
    internet_score: 4,
    transport_score: 4,
    tags: ['바다', '카페', '커피'],
    characteristics: ['coastal'],
    environments: ['자연친화', '카페작업'],
    best_season: '여름',
    created_at: '2025-01-02T00:00:00.000Z',
    updated_at: '2025-01-16T00:00:00.000Z',
  };

  const mockCity3: CityData = {
    id: 'city-3',
    name: '부산',
    region: '경상도',
    description: '한국의 제2도시',
    image_url: 'https://example.com/busan.jpg',
    average_rating: 4.7,
    review_count: 300,
    likes_count: 150,
    dislikes_count: 15,
    average_rent: 700000,
    average_living_cost: 1400000,
    budget: '100~200만원',
    cafe_count: 200,
    cafe_density: 'high',
    internet_score: 5,
    transport_score: 5,
    tags: ['대도시', '바다', '문화'],
    characteristics: ['coastal', 'urban'],
    environments: ['도심선호', '카페작업'],
    best_season: '가을',
    created_at: '2025-01-03T00:00:00.000Z',
    updated_at: '2025-01-17T00:00:00.000Z',
  };

  describe('Array Conversion', () => {
    it('should convert empty array', () => {
      const result = adaptCitiesData([]);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should convert array with one city', () => {
      const result = adaptCitiesData([mockCity1]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('city-1');
      expect(result[0].name).toBe('제주시');
      expect(result[0].imageUrl).toBe('https://example.com/jeju.jpg');
    });

    it('should convert array with multiple cities', () => {
      const result = adaptCitiesData([mockCity1, mockCity2, mockCity3]);
      expect(result).toHaveLength(3);

      // Check first city
      expect(result[0].id).toBe('city-1');
      expect(result[0].name).toBe('제주시');

      // Check second city
      expect(result[1].id).toBe('city-2');
      expect(result[1].name).toBe('강릉시');

      // Check third city
      expect(result[2].id).toBe('city-3');
      expect(result[2].name).toBe('부산');
    });

    it('should preserve array order', () => {
      const result = adaptCitiesData([mockCity2, mockCity1, mockCity3]);

      // Order should match input
      expect(result[0].id).toBe('city-2');
      expect(result[1].id).toBe('city-1');
      expect(result[2].id).toBe('city-3');
    });

    it('should convert all cities correctly with camelCase fields', () => {
      const result = adaptCitiesData([mockCity1, mockCity2, mockCity3]);

      result.forEach((city) => {
        // All cities should have camelCase fields
        expect(city).toHaveProperty('imageUrl');
        expect(city).toHaveProperty('averageRating');
        expect(city).toHaveProperty('reviewCount');
        expect(city).toHaveProperty('likesCount');
        expect(city).toHaveProperty('dislikesCount');
        expect(city).toHaveProperty('averageRent');
        expect(city).toHaveProperty('averageLivingCost');
        expect(city).toHaveProperty('cafeCount');
        expect(city).toHaveProperty('cafeDensity');
        expect(city).toHaveProperty('internetScore');
        expect(city).toHaveProperty('transportScore');
        expect(city).toHaveProperty('bestSeason');
        expect(city).toHaveProperty('createdAt');
        expect(city).toHaveProperty('updatedAt');

        // All should have Date objects
        expect(city.createdAt).toBeInstanceOf(Date);
        expect(city.updatedAt).toBeInstanceOf(Date);
      });
    });
  });
});

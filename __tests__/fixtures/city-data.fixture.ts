import { test as base } from '@playwright/test';
import type { City } from '@/types/city';

/**
 * City Data Fixture
 * 도시 데이터 관련 테스트 Fixture
 */

export type CityDataFixtures = {
  jejuCity: City;
  gangneungCity: City;
  busanCity: City;
};

export const cityDataFixture = base.extend<CityDataFixtures>({
  /**
   * 제주시 데이터
   */
  jejuCity: async ({}, use) => {
    const city: City = {
      id: '1',
      name: '제주시',
      region: '제주도',
      image: '/images/cities/jeju.jpg',
      rating: 4.5,
      reviewCount: 128,
      likesCount: 95,
      dislikesCount: 8,
      monthlyCost: 1200000,
      monthlyRent: 500000,
      characteristics: ['해안', '자연'],
      environment: ['자연친화', '카페작업'],
      tags: ['조용함', '카페많음', '힐링'],
      bestSeason: '봄',
      description: '아름다운 자연환경과 여유로운 라이프스타일을 즐길 수 있는 도시',
    };
    await use(city);
  },

  /**
   * 강릉시 데이터
   */
  gangneungCity: async ({}, use) => {
    const city: City = {
      id: '2',
      name: '강릉시',
      region: '강원도',
      image: '/images/cities/gangneung.jpg',
      rating: 4.3,
      reviewCount: 89,
      likesCount: 78,
      dislikesCount: 12,
      monthlyCost: 900000,
      monthlyRent: 400000,
      characteristics: ['해안', '자연'],
      environment: ['자연친화', '카페작업'],
      tags: ['조용함', '카페많음', '커피'],
      bestSeason: '여름',
      description: '아름다운 해변과 커피 문화가 발달한 동해안 도시',
    };
    await use(city);
  },

  /**
   * 부산 데이터
   */
  busanCity: async ({}, use) => {
    const city: City = {
      id: '3',
      name: '부산',
      region: '경상도',
      image: '/images/cities/busan.jpg',
      rating: 4.6,
      reviewCount: 256,
      likesCount: 165,
      dislikesCount: 22,
      monthlyCost: 1500000,
      monthlyRent: 600000,
      characteristics: ['해안', '대도시'],
      environment: ['도심선호', '코워킹 필수'],
      tags: ['활기참', '교통편리', '맛집'],
      bestSeason: '가을',
      description: '대한민국 제2의 도시이자 국제적인 항구 도시',
    };
    await use(city);
  },
});

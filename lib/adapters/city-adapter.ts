/**
 * City Data Adapter
 * Supabase 데이터를 기존 City 타입으로 변환
 */

import type { City } from '@/lib/types';
import type { CityData } from '@/lib/api/cities';

/**
 * Supabase CityData를 기존 City 타입으로 변환
 */
export function adaptCityData(supabaseCity: CityData): City {
  return {
    id: supabaseCity.id,
    name: supabaseCity.name,
    region: supabaseCity.region as any, // RegionType
    description: supabaseCity.description,
    imageUrl: supabaseCity.image_url,

    // 평가 지표
    averageRating: supabaseCity.average_rating,
    reviewCount: supabaseCity.review_count,
    likesCount: supabaseCity.likes_count || 0,
    dislikesCount: supabaseCity.dislikes_count || 0,

    // 생활비
    averageRent: supabaseCity.average_rent,
    averageLivingCost: supabaseCity.average_living_cost,
    budget: supabaseCity.budget as any, // BudgetType

    // 노마드 인프라
    cafeCount: supabaseCity.cafe_count,
    cafeDensity: supabaseCity.cafe_density as any, // CafeDensity
    internetScore: supabaseCity.internet_score,
    transportScore: supabaseCity.transport_score,

    // 특성 태그
    tags: supabaseCity.tags,
    characteristics: supabaseCity.characteristics as any[], // Characteristic[]
    environments: supabaseCity.environments as any[], // EnvironmentType[]
    bestSeason: supabaseCity.best_season as any, // SeasonType

    // 메타데이터
    createdAt: new Date(supabaseCity.created_at),
    updatedAt: new Date(supabaseCity.updated_at),
  };
}

/**
 * 여러 개의 CityData를 City 배열로 변환
 */
export function adaptCitiesData(supabaseCities: CityData[]): City[] {
  return supabaseCities.map(adaptCityData);
}

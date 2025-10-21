import { createClient as createBrowserClient } from '@/utils/supabase/client';
import { createClient as createServerClient } from '@/utils/supabase/server';
import type { BudgetType, RegionType, EnvironmentType, SeasonType } from '@/types/filters';

// 필터 옵션 타입
export interface FilterOptions {
  budget?: BudgetType | "전체";
  region?: RegionType | "전체";
  environment?: EnvironmentType | "전체";
  season?: SeasonType | "전체";
  sortBy?: 'likes' | 'rating' | 'name';
}

// 도시 데이터 타입 (Supabase 응답)
export interface CityData {
  id: string;
  name: string;
  region: string;
  description: string;
  image_url: string;
  average_rating: number;
  review_count: number;
  average_rent: number;
  average_living_cost: number;
  budget: string;
  cafe_count: number;
  cafe_density: string;
  internet_score: number;
  transport_score: number;
  tags: string[];
  characteristics: string[];
  environments: string[];
  best_season: string;
  created_at: string;
  updated_at: string;
  // city_stats join
  likes_count?: number;
  dislikes_count?: number;
}

// 사용자 좋아요 상태 타입
export interface UserCityLike {
  id: string;
  user_id: string;
  city_id: string;
  like_type: 'like' | 'dislike';
  created_at: string;
}

/**
 * 도시 목록 조회 (필터링, 정렬 포함) - Server Side
 */
export async function fetchCities(filters?: FilterOptions): Promise<CityData[]> {
  const supabase = await createServerClient();

  let query = supabase
    .from('cities')
    .select(`
      *,
      city_stats!inner(likes_count, dislikes_count)
    `);

  // 필터 적용
  if (filters?.budget && filters.budget !== '전체') {
    query = query.eq('budget', filters.budget);
  }

  if (filters?.region && filters.region !== '전체') {
    query = query.eq('region', filters.region);
  }

  if (filters?.environment && filters.environment !== '전체') {
    query = query.contains('environments', [filters.environment]);
  }

  if (filters?.season && filters.season !== '전체') {
    query = query.eq('best_season', filters.season);
  }

  // 정렬
  const sortBy = filters?.sortBy || 'likes';
  if (sortBy === 'likes') {
    query = query.order('likes_count', { ascending: false, referencedTable: 'city_stats' });
  } else if (sortBy === 'rating') {
    query = query.order('average_rating', { ascending: false });
  } else if (sortBy === 'name') {
    query = query.order('name', { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching cities:', error);
    throw new Error('도시 목록을 불러오는데 실패했습니다.');
  }

  // city_stats 데이터를 펼쳐서 반환
  return (data || []).map((city: any) => ({
    ...city,
    likes_count: city.city_stats?.likes_count || 0,
    dislikes_count: city.city_stats?.dislikes_count || 0,
    city_stats: undefined, // city_stats 제거
  }));
}

/**
 * 도시 목록 조회 (클라이언트 사이드)
 */
export async function fetchCitiesClient(filters?: FilterOptions): Promise<CityData[]> {
  const supabase = createBrowserClient();

  let query = supabase
    .from('cities')
    .select(`
      *,
      city_stats!inner(likes_count, dislikes_count)
    `);

  // 필터 적용
  if (filters?.budget && filters.budget !== '전체') {
    query = query.eq('budget', filters.budget);
  }

  if (filters?.region && filters.region !== '전체') {
    query = query.eq('region', filters.region);
  }

  if (filters?.environment && filters.environment !== '전체') {
    query = query.contains('environments', [filters.environment]);
  }

  if (filters?.season && filters.season !== '전체') {
    query = query.eq('best_season', filters.season);
  }

  // 정렬
  const sortBy = filters?.sortBy || 'likes';
  if (sortBy === 'likes') {
    query = query.order('likes_count', { ascending: false, referencedTable: 'city_stats' });
  } else if (sortBy === 'rating') {
    query = query.order('average_rating', { ascending: false });
  } else if (sortBy === 'name') {
    query = query.order('name', { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching cities:', error);
    throw new Error('도시 목록을 불러오는데 실패했습니다.');
  }

  // city_stats 데이터를 펼쳐서 반환
  return (data || []).map((city: any) => ({
    ...city,
    likes_count: city.city_stats?.likes_count || 0,
    dislikes_count: city.city_stats?.dislikes_count || 0,
    city_stats: undefined,
  }));
}

/**
 * 도시 상세 조회 (Server Side)
 */
export async function fetchCityById(id: string): Promise<CityData | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      city_stats(likes_count, dislikes_count)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching city:', error);
    return null;
  }

  return {
    ...data,
    likes_count: data.city_stats?.likes_count || 0,
    dislikes_count: data.city_stats?.dislikes_count || 0,
    city_stats: undefined,
  };
}

/**
 * 도시 상세 조회 (Client Side)
 */
export async function fetchCityByIdClient(id: string): Promise<CityData | null> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      city_stats(likes_count, dislikes_count)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching city:', error);
    return null;
  }

  return {
    ...data,
    likes_count: data.city_stats?.likes_count || 0,
    dislikes_count: data.city_stats?.dislikes_count || 0,
    city_stats: undefined,
  };
}

/**
 * 좋아요/싫어요 토글
 */
export async function toggleCityLike(
  cityId: string,
  likeType: 'like' | 'dislike'
): Promise<{ success: boolean; error?: string }> {
  const supabase = createBrowserClient();

  // 현재 사용자 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: '로그인이 필요합니다.' };
  }

  // 기존 좋아요/싫어요 확인
  const { data: existing, error: fetchError } = await supabase
    .from('city_likes')
    .select('*')
    .eq('user_id', user.id)
    .eq('city_id', cityId)
    .maybeSingle();

  if (fetchError) {
    console.error('Error fetching existing like:', fetchError);
    return { success: false, error: '좋아요 상태를 확인하는데 실패했습니다.' };
  }

  // 같은 타입을 다시 누른 경우 삭제
  if (existing && existing.like_type === likeType) {
    const { error: deleteError } = await supabase
      .from('city_likes')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      console.error('Error deleting like:', deleteError);
      return { success: false, error: '좋아요를 취소하는데 실패했습니다.' };
    }

    return { success: true };
  }

  // 다른 타입으로 변경하거나 새로 추가
  const { error: upsertError } = await supabase.from('city_likes').upsert(
    {
      user_id: user.id,
      city_id: cityId,
      like_type: likeType,
    },
    {
      onConflict: 'user_id,city_id',
    }
  );

  if (upsertError) {
    console.error('Error upserting like:', upsertError);
    return { success: false, error: '좋아요를 저장하는데 실패했습니다.' };
  }

  return { success: true };
}

/**
 * 사용자의 모든 좋아요/싫어요 조회
 */
export async function fetchUserCityLikes(): Promise<UserCityLike[]> {
  const supabase = createBrowserClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from('city_likes')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching user likes:', error);
    return [];
  }

  return data || [];
}

/**
 * 도시별 통계 조회
 */
export async function fetchCityStats(cityId: string): Promise<{
  likesCount: number;
  dislikesCount: number;
} | null> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from('city_stats')
    .select('*')
    .eq('city_id', cityId)
    .single();

  if (error) {
    console.error('Error fetching city stats:', error);
    return null;
  }

  return {
    likesCount: data.likes_count,
    dislikesCount: data.dislikes_count,
  };
}

/**
 * 관련 도시 추천 (Server Side)
 */
export async function fetchRelatedCities(cityId: string, limit: number = 4): Promise<CityData[]> {
  const supabase = await createServerClient();

  // 현재 도시 정보 가져오기
  const currentCity = await fetchCityById(cityId);
  if (!currentCity) return [];

  // 모든 도시 가져오기 (현재 도시 제외)
  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      city_stats(likes_count, dislikes_count)
    `)
    .neq('id', cityId);

  if (error || !data) {
    console.error('Error fetching related cities:', error);
    return [];
  }

  // 유사도 점수 계산
  const citiesWithScore = data.map((city: any) => {
    let score = 0;

    // 같은 지역: +10점
    if (city.region === currentCity.region) {
      score += 10;
    }

    // 공통 특성 개수 * 5점
    const commonCharacteristics = city.characteristics.filter((char: string) =>
      currentCity.characteristics.includes(char)
    );
    score += commonCharacteristics.length * 5;

    // 공통 환경 개수 * 3점
    const commonEnvironments = city.environments.filter((env: string) =>
      currentCity.environments.includes(env)
    );
    score += commonEnvironments.length * 3;

    // 비슷한 생활비 범위: +2점
    if (city.budget === currentCity.budget) {
      score += 2;
    }

    return {
      ...city,
      likes_count: city.city_stats?.likes_count || 0,
      dislikes_count: city.city_stats?.dislikes_count || 0,
      city_stats: undefined,
      score,
    };
  });

  // 점수 기준으로 정렬하고 상위 N개 반환
  return citiesWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...city }) => city);
}

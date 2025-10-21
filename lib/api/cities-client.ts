/**
 * Client-side Supabase API functions
 * 클라이언트 컴포넌트에서만 사용
 */

import { createClient } from '@/utils/supabase/client';

// 사용자 좋아요 상태 타입
export interface UserCityLike {
  id: string;
  user_id: string;
  city_id: string;
  like_type: 'like' | 'dislike';
  created_at: string;
}

/**
 * 좋아요/싫어요 토글 (클라이언트 전용)
 */
export async function toggleCityLike(
  cityId: string,
  likeType: 'like' | 'dislike'
): Promise<{ success: boolean; error?: string }> {
  console.log('[toggleCityLike] 시작:', { cityId, likeType });
  const supabase = createClient();

  // 현재 사용자 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.log('[toggleCityLike] 인증 실패:', authError);
    return { success: false, error: '로그인이 필요합니다.' };
  }

  console.log('[toggleCityLike] 사용자 확인:', user.id);

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

  console.log('[toggleCityLike] 기존 데이터:', existing);

  // 같은 타입을 다시 누른 경우 삭제
  if (existing && existing.like_type === likeType) {
    console.log('[toggleCityLike] 삭제 시도');
    const { error: deleteError } = await supabase
      .from('city_likes')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      console.error('[toggleCityLike] 삭제 실패:', deleteError);
      return { success: false, error: '좋아요를 취소하는데 실패했습니다.' };
    }

    console.log('[toggleCityLike] 삭제 성공');
    return { success: true };
  }

  // 다른 타입으로 변경하거나 새로 생성
  if (existing) {
    // 기존 기록 업데이트
    console.log('[toggleCityLike] 업데이트 시도');
    const { error: updateError } = await supabase
      .from('city_likes')
      .update({ like_type: likeType })
      .eq('id', existing.id);

    if (updateError) {
      console.error('[toggleCityLike] 업데이트 실패:', updateError);
      return { success: false, error: '좋아요를 변경하는데 실패했습니다.' };
    }
    console.log('[toggleCityLike] 업데이트 성공');
  } else {
    // 새로 생성
    const insertData = {
      user_id: user.id,
      city_id: cityId,
      like_type: likeType,
    };
    console.log('[toggleCityLike] 삽입 시도:', insertData);

    const { data: insertResult, error: insertError } = await supabase
      .from('city_likes')
      .insert(insertData)
      .select();

    if (insertError) {
      console.error('[toggleCityLike] 삽입 실패:', insertError);
      console.error('[toggleCityLike] 에러 상세:', JSON.stringify(insertError, null, 2));
      return { success: false, error: '좋아요를 추가하는데 실패했습니다.' };
    }
    console.log('[toggleCityLike] 삽입 성공:', insertResult);
  }

  console.log('[toggleCityLike] 완료');
  return { success: true };
}

/**
 * 사용자가 좋아요/싫어요를 누른 도시 목록 조회 (클라이언트 전용)
 */
export async function fetchUserCityLikes(): Promise<UserCityLike[]> {
  const supabase = createClient();

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

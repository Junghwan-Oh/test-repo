"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toggleCityLike, fetchUserCityLikes } from "@/lib/api/cities-client";
import { useRouter } from "next/navigation";

interface CityLikeButtonsProps {
  cityId: string;
  initialLikesCount: number;
  initialDislikesCount: number;
}

export function CityLikeButtons({
  cityId,
  initialLikesCount,
  initialDislikesCount,
}: CityLikeButtonsProps) {
  const router = useRouter();
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [dislikesCount, setDislikesCount] = useState(initialDislikesCount);
  const [userLikeType, setUserLikeType] = useState<'like' | 'dislike' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousLikesCount, setPreviousLikesCount] = useState(initialLikesCount);
  const [previousDislikesCount, setPreviousDislikesCount] = useState(initialDislikesCount);

  // 사용자의 좋아요/싫어요 상태 로드
  useEffect(() => {
    async function loadUserLike() {
      try {
        const userLikes = await fetchUserCityLikes();
        const userLike = userLikes.find((like) => like.city_id === cityId);
        if (userLike) {
          setUserLikeType(userLike.like_type);
        }
      } catch (error) {
        // 로그인하지 않은 경우 무시
      }
    }

    loadUserLike();
  }, [cityId]);

  // 좋아요 클릭 핸들러
  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation(); // 이벤트 전파 중지

    if (isLoading) return;
    setIsLoading(true);

    try {
      // Optimistic Update
      const wasLiked = userLikeType === 'like';
      const wasDisliked = userLikeType === 'dislike';

      // 이전 상태 저장 (롤백용)
      setPreviousLikesCount(likesCount);
      setPreviousDislikesCount(dislikesCount);
      const previousUserLikeType = userLikeType;

      if (wasLiked) {
        // 좋아요 취소
        setLikesCount(likesCount - 1);
        setUserLikeType(null);
      } else if (wasDisliked) {
        // 싫어요 → 좋아요
        setDislikesCount(dislikesCount - 1);
        setLikesCount(likesCount + 1);
        setUserLikeType('like');
      } else {
        // 새로 좋아요
        setLikesCount(likesCount + 1);
        setUserLikeType('like');
      }

      // API 호출
      const result = await toggleCityLike(cityId, 'like');

      if (!result.success) {
        // 실패 시 롤백
        setLikesCount(previousLikesCount);
        setDislikesCount(previousDislikesCount);
        setUserLikeType(previousUserLikeType);

        if (result.error === '로그인이 필요합니다.') {
          router.push('/login');
        }
      }
      // 성공 시 Optimistic Update가 이미 적용되었으므로 추가 작업 불필요
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      // 롤백
      setLikesCount(previousLikesCount);
      setDislikesCount(previousDislikesCount);
      setUserLikeType(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 싫어요 클릭 핸들러
  const handleDislikeClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation(); // 이벤트 전파 중지

    if (isLoading) return;
    setIsLoading(true);

    try {
      // Optimistic Update
      const wasLiked = userLikeType === 'like';
      const wasDisliked = userLikeType === 'dislike';

      // 이전 상태 저장 (롤백용)
      setPreviousLikesCount(likesCount);
      setPreviousDislikesCount(dislikesCount);
      const previousUserLikeType = userLikeType;

      if (wasDisliked) {
        // 싫어요 취소
        setDislikesCount(dislikesCount - 1);
        setUserLikeType(null);
      } else if (wasLiked) {
        // 좋아요 → 싫어요
        setLikesCount(likesCount - 1);
        setDislikesCount(dislikesCount + 1);
        setUserLikeType('dislike');
      } else {
        // 새로 싫어요
        setDislikesCount(dislikesCount + 1);
        setUserLikeType('dislike');
      }

      // API 호출
      const result = await toggleCityLike(cityId, 'dislike');

      if (!result.success) {
        // 실패 시 롤백
        setLikesCount(previousLikesCount);
        setDislikesCount(previousDislikesCount);
        setUserLikeType(previousUserLikeType);

        if (result.error === '로그인이 필요합니다.') {
          router.push('/login');
        }
      }
      // 성공 시 Optimistic Update가 이미 적용되었으므로 추가 작업 불필요
    } catch (error) {
      console.error('싫어요 처리 실패:', error);
      // 롤백
      setLikesCount(previousLikesCount);
      setDislikesCount(previousDislikesCount);
      setUserLikeType(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <button
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`flex items-center gap-1.5 transition-colors ${
          userLikeType === 'like'
            ? 'text-green-600'
            : 'text-muted-foreground hover:text-green-600'
        } disabled:opacity-50`}
      >
        <ThumbsUp className={`h-4 w-4 ${userLikeType === 'like' ? 'fill-current' : ''}`} />
        <span className="font-medium">{likesCount}</span>
      </button>
      <button
        onClick={handleDislikeClick}
        disabled={isLoading}
        className={`flex items-center gap-1.5 transition-colors ${
          userLikeType === 'dislike'
            ? 'text-red-600'
            : 'text-muted-foreground hover:text-red-600'
        } disabled:opacity-50`}
      >
        <span className="font-medium">{dislikesCount}</span>
        <ThumbsDown className={`h-4 w-4 ${userLikeType === 'dislike' ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}

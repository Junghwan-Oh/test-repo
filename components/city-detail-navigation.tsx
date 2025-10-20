'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CityDetailNavigationProps {
  cityName: string;
}

export function CityDetailNavigation({ cityName }: CityDetailNavigationProps) {
  const router = useRouter();

  const handleShare = async () => {
    // Web Share API 지원 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cityName} - 노마드 코리아`,
          text: `${cityName}에서의 디지털 노마드 라이프를 확인해보세요!`,
          url: window.location.href,
        });
      } catch (error) {
        // 사용자가 공유를 취소한 경우 무시
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
          // Fallback: 클립보드에 복사
          fallbackCopyToClipboard();
        }
      }
    } else {
      // Web Share API 미지원 시 클립보드에 복사
      fallbackCopyToClipboard();
    }
  };

  const fallbackCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert('링크가 클립보드에 복사되었습니다!');
      },
      (err) => {
        console.error('Failed to copy:', err);
      }
    );
  };

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 뒤로 가기 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로 가기
          </Button>

          {/* 공유 버튼 */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}

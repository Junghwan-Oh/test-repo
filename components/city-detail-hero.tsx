import Image from 'next/image';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { City } from '@/lib/types';

interface CityDetailHeroProps {
  city: City;
}

export function CityDetailHero({ city }: CityDetailHeroProps) {
  // 좋아요 비율 계산
  const totalVotes = city.likesCount + city.dislikesCount;
  const likePercentage = totalVotes > 0 ? Math.round((city.likesCount / totalVotes) * 100) : 0;

  return (
    <section className="relative w-full">
      {/* 배경 이미지 */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src={city.imageUrl}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* 텍스트 콘텐츠 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-6xl">
            {/* 지역 태그 */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {city.region}
              </span>
            </div>

            {/* 도시 이름 */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {city.name}
            </h1>

            {/* 설명 */}
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
              {city.description}
            </p>

            {/* 평점 및 통계 */}
            <div className="flex flex-wrap items-center gap-6">
              {/* 평점 */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-bold text-white">
                  {city.averageRating.toFixed(1)}
                </span>
                <span className="text-white/80 text-sm">
                  / 5.0
                </span>
              </div>

              {/* 리뷰 수 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-medium">
                  {city.reviewCount}개 리뷰
                </span>
              </div>

              {/* 좋아요/싫어요 */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-green-400" />
                  <span className="text-white font-medium">
                    {city.likesCount}
                  </span>
                </div>
                <div className="h-4 w-px bg-white/30" />
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4 text-red-400" />
                  <span className="text-white font-medium">
                    {city.dislikesCount}
                  </span>
                </div>
                <span className="text-green-400 text-sm ml-2">
                  ({likePercentage}% 추천)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

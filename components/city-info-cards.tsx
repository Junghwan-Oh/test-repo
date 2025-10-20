import { Wifi, Train, Coffee, Home, MapPin, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { City } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface CityInfoCardsProps {
  city: City;
}

export function CityInfoCards({ city }: CityInfoCardsProps) {
  // 카페 밀집도 한글 변환
  const cafeDensityLabel = {
    low: '낮음',
    medium: '보통',
    high: '높음',
  };

  // 점수를 별로 표시하는 함수
  const renderScore = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i < score ? 'bg-accent' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8">도시 정보</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 생활비 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-accent" />
                생활비
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">월 생활비 총액</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(city.averageLivingCost)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  예산: {city.budget}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-1">평균 월세</div>
                <div className="text-xl font-semibold text-foreground">
                  {formatCurrency(city.averageRent)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 노마드 인프라 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-accent" />
                노마드 인프라
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">카페 밀집도</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {cafeDensityLabel[city.cafeDensity]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {city.cafeCount}+ 개
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                  <Wifi className="h-4 w-4" />
                  인터넷 품질
                </div>
                {renderScore(city.internetScore)}
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                  <Train className="h-4 w-4" />
                  교통 편의성
                </div>
                {renderScore(city.transportScore)}
              </div>
            </CardContent>
          </Card>

          {/* 지역 및 환경 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                지역 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">지역</div>
                <div className="text-lg font-semibold">{city.region}</div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-2">선호 환경</div>
                <div className="flex flex-wrap gap-2">
                  {city.environments.map((env) => (
                    <span
                      key={env}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                    >
                      {env}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Sun className="h-4 w-4" />
                  베스트 시즌
                </div>
                <div className="text-lg font-semibold">{city.bestSeason}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

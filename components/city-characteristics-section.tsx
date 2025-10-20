import { Badge } from '@/components/ui/badge';
import { City } from '@/lib/types';
import { getCharacteristicEmoji, getCharacteristicLabel } from '@/lib/utils';

interface CityCharacteristicsSectionProps {
  city: City;
}

export function CityCharacteristicsSection({ city }: CityCharacteristicsSectionProps) {
  return (
    <section className="py-12 bg-surface/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8">도시 특성</h2>

        <div className="space-y-8">
          {/* 도시 특성 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">특성</h3>
            <div className="flex flex-wrap gap-3">
              {city.characteristics.map((char) => (
                <Badge
                  key={char}
                  variant="outline"
                  className="text-base px-4 py-2 bg-background hover:bg-accent/10 transition-colors"
                >
                  <span className="mr-2 text-xl">{getCharacteristicEmoji(char)}</span>
                  {getCharacteristicLabel(char)}
                </Badge>
              ))}
            </div>
          </div>

          {/* 환경 선호 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">적합한 환경</h3>
            <div className="flex flex-wrap gap-3">
              {city.environments.map((env) => (
                <Badge
                  key={env}
                  variant="secondary"
                  className="text-base px-4 py-2"
                >
                  {env}
                </Badge>
              ))}
            </div>
          </div>

          {/* 태그 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">태그</h3>
            <div className="flex flex-wrap gap-3">
              {city.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className="text-sm px-3 py-1 bg-accent/20 text-foreground hover:bg-accent/30 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 베스트 시즌 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">방문하기 좋은 계절</h3>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-accent/5 px-6 py-3 rounded-full border border-accent/20">
              <span className="text-2xl">
                {city.bestSeason === '봄' && '🌸'}
                {city.bestSeason === '여름' && '🌊'}
                {city.bestSeason === '가을' && '🍁'}
                {city.bestSeason === '겨울' && '❄️'}
              </span>
              <span className="text-lg font-semibold text-foreground">
                {city.bestSeason}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

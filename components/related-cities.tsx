import { CityCard } from '@/components/city-card';
import { City } from '@/lib/types';

interface RelatedCitiesProps {
  cities: City[];
}

export function RelatedCities({ cities }: RelatedCitiesProps) {
  // 관련 도시가 없으면 렌더링하지 않음
  if (cities.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">이런 도시는 어때요?</h2>
          <p className="text-muted-foreground">
            비슷한 특성을 가진 다른 도시들을 둘러보세요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}

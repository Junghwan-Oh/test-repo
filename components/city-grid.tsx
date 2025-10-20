import Link from "next/link";
import { CityCard } from "@/components/city-card";
import { City } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface CityGridProps {
  cities: City[];
}

export function CityGrid({ cities }: CityGridProps) {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link key={city.id} href={`/cities/${city.id}`} className="block">
              <CityCard city={city} />
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {cities.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              더 많은 도시 보기
            </Button>
          </div>
        )}

        {/* Empty State */}
        {cities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🏙️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              다른 필터 조건으로 다시 검색해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

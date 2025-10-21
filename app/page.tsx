import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryTabs } from "@/components/category-tabs";
import { CityListClient } from "@/components/city-list-client";
import { cities, featuredCity } from "@/lib/data";
import { fetchCities } from "@/lib/api/cities";
import { adaptCitiesData } from "@/lib/adapters/city-adapter";

/**
 * 홈페이지 - Server Component
 * Supabase에서 도시 데이터를 가져오거나, 실패 시 로컬 데이터 사용
 */
export default async function HomePage() {
  // Supabase에서 도시 데이터 가져오기 (fallback: 로컬 데이터)
  let citiesData = cities;
  let dataSource: 'supabase' | 'local' = 'local';

  try {
    const supabaseCities = await fetchCities({ sortBy: 'likes' });
    if (supabaseCities && supabaseCities.length > 0) {
      citiesData = adaptCitiesData(supabaseCities);
      dataSource = 'supabase';
    }
  } catch (error) {
    console.warn('Supabase 데이터 로드 실패, 로컬 데이터 사용:', error);
    // 로컬 데이터 사용 (이미 citiesData = cities로 설정됨)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <section className="container mx-auto px-4 py-8">
          <HeroBanner city={featuredCity} />
        </section>

        {/* Category Tabs */}
        <CategoryTabs />

        {/* Data Source Indicator (개발 모드에서만 표시) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="container mx-auto px-4 py-2">
            <div className="bg-muted/50 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground">
              데이터 소스: <strong className={dataSource === 'supabase' ? 'text-green-600' : 'text-yellow-600'}>
                {dataSource === 'supabase' ? '✅ Supabase (실시간)' : '⚠️ Local (가짜 데이터)'}
              </strong>
              {dataSource === 'local' && (
                <span className="ml-2">
                  - Supabase 마이그레이션을 실행하세요 (SUPABASE_SETUP.md 참고)
                </span>
              )}
            </div>
          </div>
        )}

        {/* City List (Client Component) */}
        <CityListClient initialCities={citiesData} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-bold">노마드 코리아</div>
            <p className="text-sm text-muted-foreground text-center">
              디지털 노마드를 위한 한국 도시 정보 플랫폼
            </p>
            <div className="text-sm text-muted-foreground">
              © 2025 노마드 코리아. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

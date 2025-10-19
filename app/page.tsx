import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryTabs } from "@/components/category-tabs";
import { FilterBar } from "@/components/filter-bar";
import { CityGrid } from "@/components/city-grid";
import { cities, featuredCity } from "@/lib/data";

export default function HomePage() {
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

        {/* Filter Bar */}
        <FilterBar />

        {/* City Grid */}
        <CityGrid cities={cities} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">노마드 코리아</h3>
              <p className="text-sm text-muted-foreground">
                디지털 노마드를 위한 한국 도시 정보 플랫폼
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">바로가기</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>도시 둘러보기</li>
                <li>리뷰 작성하기</li>
                <li>커뮤니티</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQ</li>
                <li>문의하기</li>
                <li>이용약관</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 노마드 코리아. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

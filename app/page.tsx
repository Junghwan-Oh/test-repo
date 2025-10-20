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

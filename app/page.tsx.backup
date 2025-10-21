"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryTabs } from "@/components/category-tabs";
import { FilterBar } from "@/components/filter-bar";
import { CityGrid } from "@/components/city-grid";
import { cities, featuredCity } from "@/lib/data";
import type { BudgetType, RegionType, EnvironmentType, SeasonType } from "@/types/filters";
import type { City } from "@/lib/types";

export default function HomePage() {
  // Filter states
  const [budgetFilter, setBudgetFilter] = useState<BudgetType | "전체">("전체");
  const [regionFilter, setRegionFilter] = useState<RegionType>("전체");
  const [environmentFilter, setEnvironmentFilter] = useState<EnvironmentType | "전체">("전체");
  const [seasonFilter, setSeasonFilter] = useState<SeasonType | "전체">("전체");

  // Filter cities based on selected filters
  const filteredCities = useMemo(() => {
    return cities.filter((city: City) => {
      // Budget filter
      if (budgetFilter !== "전체" && city.budget !== budgetFilter) {
        return false;
      }

      // Region filter
      if (regionFilter !== "전체" && city.region !== regionFilter) {
        return false;
      }

      // Environment filter
      if (environmentFilter !== "전체" && !city.environments.includes(environmentFilter)) {
        return false;
      }

      // Season filter
      if (seasonFilter !== "전체" && city.bestSeason !== seasonFilter) {
        return false;
      }

      return true;
    });
  }, [budgetFilter, regionFilter, environmentFilter, seasonFilter]);

  // Reset all filters
  const handleResetFilters = () => {
    setBudgetFilter("전체");
    setRegionFilter("전체");
    setEnvironmentFilter("전체");
    setSeasonFilter("전체");
  };

  // Count active filters
  const activeFilterCount = [
    budgetFilter !== "전체",
    regionFilter !== "전체",
    environmentFilter !== "전체",
    seasonFilter !== "전체",
  ].filter(Boolean).length;

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
        <FilterBar
          budgetFilter={budgetFilter}
          setBudgetFilter={setBudgetFilter}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          environmentFilter={environmentFilter}
          setEnvironmentFilter={setEnvironmentFilter}
          seasonFilter={seasonFilter}
          setSeasonFilter={setSeasonFilter}
          onResetFilters={handleResetFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* City Grid */}
        <CityGrid cities={filteredCities} />
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

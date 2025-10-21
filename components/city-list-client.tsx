"use client";

import { useState, useMemo, useEffect } from "react";
import { FilterBar } from "@/components/filter-bar";
import { CityGrid } from "@/components/city-grid";
import type { BudgetType, RegionType, EnvironmentType, SeasonType } from "@/types/filters";
import type { City } from "@/lib/types";

interface CityListClientProps {
  initialCities: City[];
}

export function CityListClient({ initialCities }: CityListClientProps) {
  // Filter states
  const [budgetFilter, setBudgetFilter] = useState<BudgetType | "전체">("전체");
  const [regionFilter, setRegionFilter] = useState<RegionType>("전체");
  const [environmentFilter, setEnvironmentFilter] = useState<EnvironmentType | "전체">("전체");
  const [seasonFilter, setSeasonFilter] = useState<SeasonType | "전체">("전체");
  const [cities, setCities] = useState<City[]>(initialCities);

  // Filter cities based on selected filters (클라이언트 측 필터링)
  const filteredCities = useMemo(() => {
    return cities
      .filter((city: City) => {
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
      })
      .sort((a, b) => b.likesCount - a.likesCount); // 좋아요 순 정렬
  }, [cities, budgetFilter, regionFilter, environmentFilter, seasonFilter]);

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
    <>
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
    </>
  );
}

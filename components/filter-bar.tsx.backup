"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BUDGET_OPTIONS,
  REGION_OPTIONS,
  ENVIRONMENT_OPTIONS,
  SEASON_OPTIONS,
} from "@/constants/filters";
import type { BudgetType, RegionType, EnvironmentType, SeasonType } from "@/types/filters";

const sortOptions = [
  { id: "popular", label: "인기순" },
  { id: "rating", label: "평점 높은 순" },
  { id: "cost-low", label: "생활비 낮은 순" },
  { id: "recent", label: "최신 리뷰 많은 순" },
];

interface FilterBarProps {
  budgetFilter: BudgetType | "전체";
  setBudgetFilter: (value: BudgetType | "전체") => void;
  regionFilter: RegionType;
  setRegionFilter: (value: RegionType) => void;
  environmentFilter: EnvironmentType | "전체";
  setEnvironmentFilter: (value: EnvironmentType | "전체") => void;
  seasonFilter: SeasonType | "전체";
  setSeasonFilter: (value: SeasonType | "전체") => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export function FilterBar({
  budgetFilter,
  setBudgetFilter,
  regionFilter,
  setRegionFilter,
  environmentFilter,
  setEnvironmentFilter,
  seasonFilter,
  setSeasonFilter,
  onResetFilters,
  activeFilterCount,
}: FilterBarProps) {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Row - Sort and Reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">정렬:</span>
              <div className="relative">
                <select
                  defaultValue="popular"
                  className="appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Filter count and reset button */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  필터 {activeFilterCount}개 적용중
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetFilters}
                  className="h-8 gap-1"
                >
                  <X className="h-3 w-3" />
                  초기화
                </Button>
              </div>
            )}
          </div>

          {/* Filters Section */}
          <div className="w-full">
            {/* Mobile Filter Button */}
            <Button variant="outline" className="md:hidden w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              필터
            </Button>

            {/* Desktop Filters - Grid Layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Budget Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground font-medium">예산</label>
                <div className="relative">
                  <select
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value as BudgetType | "전체")}
                    className="w-full appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                  >
                    <option value="전체">전체</option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Region Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground font-medium">지역</label>
                <div className="relative">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value as RegionType)}
                    className="w-full appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                  >
                    {REGION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Environment Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground font-medium">환경</label>
                <div className="relative">
                  <select
                    value={environmentFilter}
                    onChange={(e) => setEnvironmentFilter(e.target.value as EnvironmentType | "전체")}
                    className="w-full appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                  >
                    <option value="전체">전체</option>
                    {ENVIRONMENT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Season Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground font-medium">최고계절</label>
                <div className="relative">
                  <select
                    value={seasonFilter}
                    onChange={(e) => setSeasonFilter(e.target.value as SeasonType | "전체")}
                    className="w-full appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                  >
                    <option value="전체">전체</option>
                    {SEASON_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

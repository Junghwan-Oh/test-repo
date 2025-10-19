"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const sortOptions = [
  { id: "popular", label: "인기순" },
  { id: "rating", label: "평점 높은 순" },
  { id: "cost-low", label: "생활비 낮은 순" },
  { id: "recent", label: "최신 리뷰 많은 순" },
];

const costFilters = [
  { id: "all", label: "전체" },
  { id: "low", label: "~100만원" },
  { id: "medium", label: "100-150만원" },
  { id: "high", label: "150만원 이상" },
];

const sizeFilters = [
  { id: "all", label: "전체" },
  { id: "large", label: "대도시" },
  { id: "medium", label: "중소도시" },
  { id: "small", label: "소도시" },
];

export function FilterBar() {
  const [sortBy, setSortBy] = useState("popular");
  const [costFilter, setCostFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");

  return (
    <div className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left Side - Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">정렬:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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

          {/* Right Side - Filters */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <Button variant="outline" className="md:hidden w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              필터
            </Button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cost Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">생활비:</span>
                <div className="relative">
                  <select
                    value={costFilter}
                    onChange={(e) => setCostFilter(e.target.value)}
                    className="appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                  >
                    {costFilters.map((filter) => (
                      <option key={filter.id} value={filter.id}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Size Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">도시규모:</span>
                <div className="relative">
                  <select
                    value={sizeFilter}
                    onChange={(e) => setSizeFilter(e.target.value)}
                    className="appearance-none bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-surface/80 transition-colors"
                  >
                    {sizeFilters.map((filter) => (
                      <option key={filter.id} value={filter.id}>
                        {filter.label}
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

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "전체" },
  { id: "seoul", label: "수도권" },
  { id: "gangwon", label: "강원" },
  { id: "chungcheong", label: "충청" },
  { id: "jeolla", label: "전라" },
  { id: "gyeongsang", label: "경상" },
  { id: "jeju", label: "제주" },
];

export function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-foreground hover:bg-surface/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

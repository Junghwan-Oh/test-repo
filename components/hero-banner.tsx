import Image from "next/image";
import { Button } from "@/components/ui/button";
import { City } from "@/lib/types";
import { getCharacteristicEmoji } from "@/lib/utils";

interface HeroBannerProps {
  city: City;
}

export function HeroBanner({ city }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <Image
        src={city.imageUrl}
        alt={city.name}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium bg-accent px-3 py-1 rounded-full">
              이달의 추천 도시
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {getCharacteristicEmoji(city.characteristics[0])} {city.name}
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            &ldquo;{city.description}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              자세히 보기
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              모든 도시 둘러보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

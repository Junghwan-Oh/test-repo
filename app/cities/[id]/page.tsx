import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCityById, cities, getRelatedCities } from '@/lib/data';
import { fetchCityById, fetchRelatedCities } from '@/lib/api/cities';
import { adaptCityData, adaptCitiesData } from '@/lib/adapters/city-adapter';
import { CityDetailNavigation } from '@/components/city-detail-navigation';
import { CityDetailHero } from '@/components/city-detail-hero';
import { CityInfoCards } from '@/components/city-info-cards';
import { CityCharacteristicsSection } from '@/components/city-characteristics-section';
import { RelatedCities } from '@/components/related-cities';

interface CityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// generateStaticParams: 모든 도시 페이지를 SSG로 사전 생성
export async function generateStaticParams() {
  return cities.map((city) => ({
    id: city.id,
  }));
}

// generateMetadata: 도시별 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: CityDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const city = getCityById(id);

  if (!city) {
    return {
      title: '도시를 찾을 수 없습니다 - 노마드 코리아',
    };
  }

  const title = `${city.name} - 디지털 노마드를 위한 도시 가이드`;
  const description = `${city.description}. 월 생활비 ${Math.round(city.averageLivingCost / 10000)}만원, 평점 ${city.averageRating}/5.0. ${city.tags.slice(0, 3).join(', ')} 등의 특징을 가진 ${city.region}의 노마드 친화 도시입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: city.imageUrl,
          width: 1200,
          height: 630,
          alt: `${city.name} 사진`,
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [city.imageUrl],
    },
    keywords: [
      city.name,
      city.region,
      '디지털 노마드',
      '노마드 코리아',
      '원격근무',
      '워케이션',
      ...city.tags,
      ...city.characteristics.map((char) => {
        const labelMap: Record<string, string> = {
          coastal: '해안 도시',
          mountain: '산악 도시',
          urban: '대도시',
          cultural: '문화 도시',
        };
        return labelMap[char] || char;
      }),
    ],
  };
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { id } = await params;

  // Supabase에서 도시 데이터 가져오기, 실패 시 로컬 데이터 사용
  let city = null;
  let relatedCities = [];

  try {
    const supabaseCity = await fetchCityById(id);
    if (supabaseCity) {
      city = adaptCityData(supabaseCity);
      const supabaseRelatedCities = await fetchRelatedCities(id, 4);
      relatedCities = adaptCitiesData(supabaseRelatedCities);
    } else {
      // Supabase에 없으면 로컬 데이터 사용
      city = getCityById(id);
      relatedCities = getRelatedCities(id, 4);
    }
  } catch (error) {
    console.error('Error fetching city from Supabase:', error);
    // 에러 발생 시 로컬 데이터 사용
    city = getCityById(id);
    relatedCities = getRelatedCities(id, 4);
  }

  // 도시를 찾지 못한 경우 404 페이지 표시
  if (!city) {
    notFound();
  }

  // JSON-LD 구조화된 데이터
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: city.name,
    description: city.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: city.region,
      addressCountry: 'KR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: city.averageRating,
      bestRating: 5,
      reviewCount: city.reviewCount,
    },
    image: city.imageUrl,
    keywords: city.tags.join(', '),
  };

  return (
    <>
      {/* JSON-LD 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* 네비게이션 */}
        <CityDetailNavigation cityName={city.name} />

        {/* 히어로 섹션 */}
        <CityDetailHero city={city} />

        {/* 정보 카드 섹션 */}
        <CityInfoCards city={city} />

        {/* 특성 섹션 */}
        <CityCharacteristicsSection city={city} />

        {/* 관련 도시 추천 */}
        <RelatedCities cities={relatedCities} />
      </div>
    </>
  );
}

-- 12개 도시 초기 데이터 삽입
INSERT INTO cities (
  name, region, description, image_url,
  average_rating, review_count,
  average_rent, average_living_cost, budget,
  cafe_count, cafe_density, internet_score, transport_score,
  tags, characteristics, environments, best_season,
  created_at, updated_at
) VALUES
(
  '제주시', '제주도', '바다와 카페의 노마드 천국',
  'https://images.unsplash.com/photo-1599571991850-d4640fea3e4a?w=800&h=450&fit=crop',
  4.5, 128,
  800000, 1200000, '100~200만원',
  300, 'high', 5, 3,
  ARRAY['조용함', '카페많음', '자연환경좋음'],
  ARRAY['coastal'],
  ARRAY['자연친화', '카페작업'],
  '봄',
  '2025-01-01'::TIMESTAMPTZ, '2025-01-15'::TIMESTAMPTZ
),
(
  '강릉시', '강원도', '바다와 카페, 그리고 코딩의 조화',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  4.2, 96,
  500000, 900000, '100만원 미만',
  150, 'high', 4, 3,
  ARRAY['카페많음', '조용함', '힐링'],
  ARRAY['coastal'],
  ARRAY['자연친화', '카페작업'],
  '여름',
  '2025-01-02'::TIMESTAMPTZ, '2025-01-16'::TIMESTAMPTZ
),
(
  '부산', '경상도', '대도시의 편리함과 바다의 여유',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=450&fit=crop',
  4.3, 215,
  600000, 1100000, '100~200만원',
  500, 'high', 5, 5,
  ARRAY['대도시', '교통편리', '다양한먹거리'],
  ARRAY['coastal', 'urban'],
  ARRAY['도심선호', '카페작업', '코워킹 필수'],
  '가을',
  '2025-01-03'::TIMESTAMPTZ, '2025-01-17'::TIMESTAMPTZ
),
(
  '전주시', '전라도', '한옥마을과 맛의 도시',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  4.0, 82,
  400000, 850000, '100만원 미만',
  120, 'medium', 4, 4,
  ARRAY['문화체험', '맛집많음', '저렴한생활비'],
  ARRAY['cultural'],
  ARRAY['도심선호', '카페작업'],
  '봄',
  '2025-01-04'::TIMESTAMPTZ, '2025-01-18'::TIMESTAMPTZ
),
(
  '속초시', '강원도', '동해바다와 설악산 사이',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=450&fit=crop',
  4.1, 67,
  450000, 800000, '100만원 미만',
  80, 'medium', 4, 2,
  ARRAY['자연환경좋음', '조용함', '해산물'],
  ARRAY['coastal', 'mountain'],
  ARRAY['자연친화'],
  '여름',
  '2025-01-05'::TIMESTAMPTZ, '2025-01-19'::TIMESTAMPTZ
),
(
  '대전', '충청도', '중부권 교통의 중심',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  3.9, 104,
  500000, 950000, '100만원 미만',
  200, 'medium', 5, 5,
  ARRAY['교통편리', '과학도시', '중소도시'],
  ARRAY['urban'],
  ARRAY['도심선호', '코워킹 필수'],
  '가을',
  '2025-01-06'::TIMESTAMPTZ, '2025-01-20'::TIMESTAMPTZ
),
(
  '광주', '전라도', '예술과 민주의 도시',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  3.8, 89,
  450000, 900000, '100만원 미만',
  180, 'medium', 4, 4,
  ARRAY['문화예술', '저렴한생활비', '맛집많음'],
  ARRAY['cultural', 'urban'],
  ARRAY['도심선호', '카페작업'],
  '봄',
  '2025-01-07'::TIMESTAMPTZ, '2025-01-21'::TIMESTAMPTZ
),
(
  '경주', '경상도', '천년 역사가 살아있는 곳',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  4.2, 73,
  400000, 800000, '100만원 미만',
  90, 'medium', 4, 3,
  ARRAY['역사문화', '조용함', '힐링'],
  ARRAY['cultural'],
  ARRAY['자연친화', '카페작업'],
  '가을',
  '2025-01-08'::TIMESTAMPTZ, '2025-01-22'::TIMESTAMPTZ
),
(
  '여수', '전라도', '밤바다가 아름다운 항구도시',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  4.3, 92,
  500000, 950000, '100만원 미만',
  110, 'medium', 4, 3,
  ARRAY['야경명소', '해산물', '관광지'],
  ARRAY['coastal'],
  ARRAY['자연친화', '카페작업'],
  '여름',
  '2025-01-09'::TIMESTAMPTZ, '2025-01-23'::TIMESTAMPTZ
),
(
  '춘천', '강원도', '호수와 닭갈비의 도시',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  3.9, 78,
  450000, 850000, '100만원 미만',
  100, 'medium', 4, 4,
  ARRAY['자연환경좋음', '조용함', '저렴한생활비'],
  ARRAY['mountain'],
  ARRAY['자연친화', '카페작업'],
  '가을',
  '2025-01-10'::TIMESTAMPTZ, '2025-01-24'::TIMESTAMPTZ
),
(
  '서귀포', '제주도', '제주의 숨은 보석',
  'https://images.unsplash.com/photo-1599571991850-d4640fea3e4a?w=800&h=450&fit=crop',
  4.4, 105,
  700000, 1100000, '100~200만원',
  150, 'high', 4, 2,
  ARRAY['자연환경좋음', '조용함', '카페많음'],
  ARRAY['coastal'],
  ARRAY['자연친화', '카페작업'],
  '봄',
  '2025-01-11'::TIMESTAMPTZ, '2025-01-25'::TIMESTAMPTZ
),
(
  '포항', '경상도', '동해의 일출과 함께',
  'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=450&fit=crop',
  3.7, 54,
  400000, 850000, '100만원 미만',
  85, 'medium', 4, 3,
  ARRAY['해돋이명소', '조용함', '저렴한생활비'],
  ARRAY['coastal', 'urban'],
  ARRAY['자연친화', '도심선호'],
  '겨울',
  '2025-01-12'::TIMESTAMPTZ, '2025-01-26'::TIMESTAMPTZ
);

-- 각 도시별 초기 통계 데이터 생성
INSERT INTO city_stats (city_id, likes_count, dislikes_count)
SELECT id, 0, 0 FROM cities;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cities 테이블 생성
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,

  -- 평가 지표
  average_rating NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,

  -- 생활비
  average_rent INTEGER NOT NULL,
  average_living_cost INTEGER NOT NULL,
  budget TEXT NOT NULL,

  -- 노마드 인프라
  cafe_count INTEGER NOT NULL,
  cafe_density TEXT NOT NULL,
  internet_score INTEGER NOT NULL CHECK (internet_score >= 1 AND internet_score <= 5),
  transport_score INTEGER NOT NULL CHECK (transport_score >= 1 AND transport_score <= 5),

  -- 특성 태그
  tags TEXT[] NOT NULL DEFAULT '{}',
  characteristics TEXT[] NOT NULL DEFAULT '{}',
  environments TEXT[] NOT NULL DEFAULT '{}',
  best_season TEXT NOT NULL,

  -- 메타데이터
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- City Likes 테이블 생성 (사용자별 좋아요/싫어요)
CREATE TABLE city_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  like_type TEXT NOT NULL CHECK (like_type IN ('like', 'dislike')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- 한 사용자당 한 도시에 하나의 반응만
  UNIQUE(user_id, city_id)
);

-- City Stats 테이블 생성 (도시별 통계)
CREATE TABLE city_stats (
  city_id UUID PRIMARY KEY REFERENCES cities(id) ON DELETE CASCADE,
  likes_count INTEGER NOT NULL DEFAULT 0,
  dislikes_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_cities_region ON cities(region);
CREATE INDEX idx_cities_budget ON cities(budget);
CREATE INDEX idx_cities_best_season ON cities(best_season);
CREATE INDEX idx_cities_environments ON cities USING GIN(environments);
CREATE INDEX idx_city_likes_user_id ON city_likes(user_id);
CREATE INDEX idx_city_likes_city_id ON city_likes(city_id);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- cities 테이블에 updated_at 트리거 추가
CREATE TRIGGER update_cities_updated_at
  BEFORE UPDATE ON cities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- city_stats 테이블에 updated_at 트리거 추가
CREATE TRIGGER update_city_stats_updated_at
  BEFORE UPDATE ON city_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- city_likes 변경 시 city_stats 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_city_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- INSERT/UPDATE 시
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    INSERT INTO city_stats (city_id, likes_count, dislikes_count)
    VALUES (
      NEW.city_id,
      (SELECT COUNT(*) FROM city_likes WHERE city_id = NEW.city_id AND like_type = 'like'),
      (SELECT COUNT(*) FROM city_likes WHERE city_id = NEW.city_id AND like_type = 'dislike')
    )
    ON CONFLICT (city_id) DO UPDATE
    SET
      likes_count = (SELECT COUNT(*) FROM city_likes WHERE city_id = NEW.city_id AND like_type = 'like'),
      dislikes_count = (SELECT COUNT(*) FROM city_likes WHERE city_id = NEW.city_id AND like_type = 'dislike'),
      updated_at = NOW();
  END IF;

  -- DELETE 시
  IF (TG_OP = 'DELETE') THEN
    UPDATE city_stats
    SET
      likes_count = (SELECT COUNT(*) FROM city_likes WHERE city_id = OLD.city_id AND like_type = 'like'),
      dislikes_count = (SELECT COUNT(*) FROM city_likes WHERE city_id = OLD.city_id AND like_type = 'dislike'),
      updated_at = NOW()
    WHERE city_id = OLD.city_id;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- city_likes 트리거 추가
CREATE TRIGGER update_stats_on_city_like_change
  AFTER INSERT OR UPDATE OR DELETE ON city_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_city_stats();

-- RLS (Row Level Security) 활성화
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_stats ENABLE ROW LEVEL SECURITY;

-- RLS 정책: cities (모든 사용자 읽기 가능)
CREATE POLICY "Cities are viewable by everyone"
  ON cities FOR SELECT
  USING (true);

-- RLS 정책: city_stats (모든 사용자 읽기 가능)
CREATE POLICY "City stats are viewable by everyone"
  ON city_stats FOR SELECT
  USING (true);

-- RLS 정책: city_likes (본인 데이터만 조회 가능)
CREATE POLICY "Users can view their own likes"
  ON city_likes FOR SELECT
  USING (auth.uid() = user_id);

-- RLS 정책: city_likes (본인 데이터만 삽입 가능)
CREATE POLICY "Users can insert their own likes"
  ON city_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS 정책: city_likes (본인 데이터만 업데이트 가능)
CREATE POLICY "Users can update their own likes"
  ON city_likes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS 정책: city_likes (본인 데이터만 삭제 가능)
CREATE POLICY "Users can delete their own likes"
  ON city_likes FOR DELETE
  USING (auth.uid() = user_id);

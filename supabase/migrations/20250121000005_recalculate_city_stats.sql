-- Recalculate city_stats based on existing city_likes data
-- 기존 city_likes 데이터를 기반으로 city_stats를 재계산

-- 모든 도시의 통계를 재계산하여 업데이트
INSERT INTO city_stats (city_id, likes_count, dislikes_count)
SELECT
  c.id as city_id,
  COALESCE((SELECT COUNT(*) FROM city_likes WHERE city_id = c.id AND like_type = 'like'), 0) as likes_count,
  COALESCE((SELECT COUNT(*) FROM city_likes WHERE city_id = c.id AND like_type = 'dislike'), 0) as dislikes_count
FROM cities c
ON CONFLICT (city_id)
DO UPDATE SET
  likes_count = EXCLUDED.likes_count,
  dislikes_count = EXCLUDED.dislikes_count,
  updated_at = NOW();

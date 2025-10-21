-- Create triggers to automatically update city_stats when city_likes changes
-- city_likes 변경 시 city_stats를 자동으로 업데이트하는 트리거 생성

-- 트리거 함수: city_stats 업데이트
CREATE OR REPLACE FUNCTION update_city_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- city_stats 테이블에서 해당 도시의 통계 업데이트
  INSERT INTO city_stats (city_id, likes_count, dislikes_count)
  VALUES (
    COALESCE(NEW.city_id, OLD.city_id),
    (SELECT COUNT(*) FROM city_likes WHERE city_id = COALESCE(NEW.city_id, OLD.city_id) AND like_type = 'like'),
    (SELECT COUNT(*) FROM city_likes WHERE city_id = COALESCE(NEW.city_id, OLD.city_id) AND like_type = 'dislike')
  )
  ON CONFLICT (city_id)
  DO UPDATE SET
    likes_count = EXCLUDED.likes_count,
    dislikes_count = EXCLUDED.dislikes_count,
    updated_at = NOW();

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- INSERT 트리거
DROP TRIGGER IF EXISTS update_city_stats_on_insert ON city_likes;
CREATE TRIGGER update_city_stats_on_insert
AFTER INSERT ON city_likes
FOR EACH ROW
EXECUTE FUNCTION update_city_stats();

-- UPDATE 트리거
DROP TRIGGER IF EXISTS update_city_stats_on_update ON city_likes;
CREATE TRIGGER update_city_stats_on_update
AFTER UPDATE ON city_likes
FOR EACH ROW
EXECUTE FUNCTION update_city_stats();

-- DELETE 트리거
DROP TRIGGER IF EXISTS update_city_stats_on_delete ON city_likes;
CREATE TRIGGER update_city_stats_on_delete
AFTER DELETE ON city_likes
FOR EACH ROW
EXECUTE FUNCTION update_city_stats();

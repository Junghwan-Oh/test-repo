-- Fix city_stats RLS policies for automatic trigger updates
-- city_stats 테이블에 INSERT, UPDATE, DELETE 정책 추가

-- INSERT 정책: 트리거가 자동으로 통계 삽입 가능
CREATE POLICY "Allow automatic stats insert"
ON city_stats FOR INSERT
TO public
WITH CHECK (true);

-- UPDATE 정책: 트리거가 자동으로 통계 업데이트 가능
CREATE POLICY "Allow automatic stats update"
ON city_stats FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- DELETE 정책: 트리거가 자동으로 통계 삭제 가능
CREATE POLICY "Allow automatic stats delete"
ON city_stats FOR DELETE
TO public
USING (true);

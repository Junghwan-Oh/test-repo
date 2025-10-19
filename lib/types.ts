export type Region = 'seoul' | 'gangwon' | 'chungcheong' | 'jeolla' | 'gyeongsang' | 'jeju';
export type CafeDensity = 'low' | 'medium' | 'high';
export type Characteristic = 'coastal' | 'mountain' | 'urban' | 'cultural';

export interface City {
  id: string;
  name: string;
  region: Region;
  description: string;
  imageUrl: string;

  // 평가 지표
  averageRating: number; // 0-5
  reviewCount: number;

  // 생활비
  averageRent: number; // 월세 (원)
  averageLivingCost: number; // 월 생활비 (원)

  // 노마드 인프라
  cafeCount: number;
  cafeDensity: CafeDensity;
  internetScore: number; // 1-5
  transportScore: number; // 1-5

  // 특성 태그
  tags: string[];
  characteristics: Characteristic[];

  // 메타데이터
  createdAt: Date;
  updatedAt: Date;
}

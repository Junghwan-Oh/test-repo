import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).replace('₩', '₩');
}

export function getCharacteristicEmoji(characteristic: string): string {
  const emojiMap: Record<string, string> = {
    coastal: '🏖️',
    mountain: '🏔️',
    urban: '🏙️',
    cultural: '🎨',
  };
  return emojiMap[characteristic] || '📍';
}

export function getCharacteristicLabel(characteristic: string): string {
  const labelMap: Record<string, string> = {
    coastal: '해안',
    mountain: '산악',
    urban: '대도시',
    cultural: '문화',
  };
  return labelMap[characteristic] || characteristic;
}

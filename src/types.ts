export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  badge?: string;
  detail?: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  subtext?: string;
}

export interface TestimonialItem {
  id: string;
  stars: number;
  text: string;
  author: string;
  role: string;
  avatarInitials: string;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export type GoldUnitType = 'gram' | 'piece';

export interface GoldProduct {
  id: string;
  name: string;
  shortName: string;
  type: GoldUnitType;
  purity: number; // e.g. 0.995, 0.916, 0.585
  unitWeightGrams?: number;
  buyPrice: number;
  sellPrice: number;
  changeRate: number;
  category: 'sarrafiye' | 'taki' | 'kulce' | 'ons';
  description: string;
  laborCostPerGram?: number;
}

export interface BasketItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unit: 'gram' | 'adet';
  unitBuyPrice: number;
  unitSellPrice: number;
  totalBuy: number;
  totalSell: number;
  addedAt: string;
}

export interface PriceAlert {
  id: string;
  productName: string;
  targetPrice: number;
  condition: 'above' | 'below';
  currentPrice: number;
  active: boolean;
  createdAt: string;
}

export interface Style {
  id: string
  name: string
  nameZh: string
  description: string
  history: string
  characteristics: string[]
  colorPalette: string[]
  commonMotifs: string[]
  imageUrl: string
  substyleIds: string[]
}

export interface Brand {
  id: string
  name: string
  type: 'major' | 'indie'
  country: 'jp' | 'cn' | 'kr' | 'other'
  priceRange: 'budget' | 'mid' | 'high' | 'luxury'
  website: string
  description: string
  styleIds: string[]
  logoUrl: string
  imageUrl: string
  foundedYear?: number
}

export interface WardrobeItem {
  id: string
  type: 'style' | 'brand'
  itemId: string
  addedAt: string
}

export type Country = 'jp' | 'cn' | 'kr' | 'other'
export type PriceRange = 'budget' | 'mid' | 'high' | 'luxury'
export type BrandType = 'major' | 'indie'

export const COUNTRY_LABELS: Record<Country, string> = {
  jp: '日本',
  cn: '中国',
  kr: '韩国',
  other: '其他',
}

export const PRICE_LABELS: Record<PriceRange, string> = {
  budget: '平价',
  mid: '中端',
  high: '高端',
  luxury: '奢华',
}

export const BRAND_TYPE_LABELS: Record<BrandType, string> = {
  major: '大牌',
  indie: '独立品牌',
}

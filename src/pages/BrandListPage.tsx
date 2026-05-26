import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import brandsData from '../data/brands.json'
import { useWardrobeContext } from '../hooks/WardrobeContext'
import type { Country, PriceRange, BrandType } from '../types'
import { COUNTRY_LABELS, PRICE_LABELS, BRAND_TYPE_LABELS } from '../types'

function countryLabel(c: string): string {
  return COUNTRY_LABELS[c as Country] ?? c
}
function priceLabel(p: string): string {
  return PRICE_LABELS[p as PriceRange] ?? p
}
function typeLabel(t: string): string {
  return BRAND_TYPE_LABELS[t as BrandType] ?? t
}
import SearchInput from '../components/shared/SearchInput'
import FavoriteButton from '../components/shared/FavoriteButton'
import Tag from '../components/shared/Tag'
import EmptyState from '../components/shared/EmptyState'
import { Link } from 'react-router-dom'

const countries: { value: Country | 'all'; label: string }[] = [
  { value: 'all', label: '全部国家' },
  { value: 'jp', label: '🇯🇵 日本' },
  { value: 'cn', label: '🇨🇳 中国' },
  { value: 'kr', label: '🇰🇷 韩国' },
  { value: 'other', label: '其他' },
]

const prices: { value: PriceRange | 'all'; label: string }[] = [
  { value: 'all', label: '全部价位' },
  { value: 'budget', label: '平价' },
  { value: 'mid', label: '中端' },
  { value: 'high', label: '高端' },
  { value: 'luxury', label: '奢华' },
]

const types: { value: BrandType | 'all'; label: string }[] = [
  { value: 'all', label: '全部类型' },
  { value: 'major', label: '大牌' },
  { value: 'indie', label: '独立品牌' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVar = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function BrandListPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState<Country | 'all'>('all')
  const [price, setPrice] = useState<PriceRange | 'all'>('all')
  const [type, setType] = useState<BrandType | 'all'>('all')
  const { isFavorited, toggleFavorite } = useWardrobeContext()

  const filtered = useMemo(
    () =>
      brandsData.filter((b) => {
        if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.description.includes(search)) return false
        if (country !== 'all' && b.country !== country) return false
        if (price !== 'all' && b.priceRange !== price) return false
        if (type !== 'all' && b.type !== type) return false
        return true
      }),
    [search, country, price, type],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-800">品牌图鉴</h1>
        <p className="mt-2 text-sm text-stone-500">探索 {brandsData.length} 个 Lolita 品牌</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="搜索品牌名称..." />
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <Tag
              key={t.value}
              label={t.label}
              active={type === t.value}
              onClick={() => setType(t.value)}
            />
          ))}
          <span className="mx-1 self-center text-stone-300">|</span>
          {countries.map((c) => (
            <Tag
              key={c.value}
              label={c.label}
              active={country === c.value}
              onClick={() => setCountry(c.value)}
            />
          ))}
          <span className="mx-1 self-center text-stone-300">|</span>
          {prices.map((p) => (
            <Tag
              key={p.value}
              label={p.label}
              active={price === p.value}
              onClick={() => setPrice(p.value)}
            />
          ))}
        </div>
        <p className="text-xs text-stone-400">找到 {filtered.length} 个品牌</p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🏷️" title="没有匹配的品牌" description="试试调整筛选条件" />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((brand) => (
            <motion.div key={brand.id} variants={itemVar} className="group relative">
              <div className="overflow-hidden rounded-xl border border-rose-200/40 bg-white shadow-sm transition-shadow hover:shadow-md">
                <Link to={`/brands/${brand.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-100 to-rose-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-4 text-center font-serif text-2xl font-semibold text-wine/25">
                        {brand.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-stone-800">
                      {brand.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-stone-500">
                      {brand.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">
                        {countryLabel(brand.country)}
                      </span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                        {priceLabel(brand.priceRange)}
                      </span>
                      <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs text-purple-700">
                        {typeLabel(brand.type)}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="absolute right-3 top-3 z-10">
                  <FavoriteButton
                    isFavorited={isFavorited('brand', brand.id)}
                    onToggle={() => toggleFavorite('brand', brand.id)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

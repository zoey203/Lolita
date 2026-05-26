import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useWardrobeContext } from '../hooks/WardrobeContext'
import stylesData from '../data/styles.json'
import brandsData from '../data/brands.json'
import EmptyState from '../components/shared/EmptyState'
import { COUNTRY_LABELS, PRICE_LABELS } from '../types'
import type { Country, PriceRange, Brand, Style } from '../types'

type Tab = 'styles' | 'brands'

function cLabel(c: string) { return COUNTRY_LABELS[c as Country] ?? c }
function pLabel(p: string) { return PRICE_LABELS[p as PriceRange] ?? p }

export default function WardrobePage() {
  const [tab, setTab] = useState<Tab>('styles')
  const { items, isFavorited, toggleFavorite, removeItem } = useWardrobeContext()

  const styleItems = items
    .filter((i) => i.type === 'style')
    .map((i) => stylesData.find((s) => s.id === i.itemId))
    .filter(Boolean)

  const brandItems = items
    .filter((i) => i.type === 'brand')
    .map((i) => brandsData.find((b) => b.id === i.itemId))
    .filter(Boolean)

  const currentItems = tab === 'styles' ? styleItems : brandItems

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-800">我的衣橱</h1>
        <p className="mt-2 text-sm text-stone-500">
          收藏的风格和品牌灵感板
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2">
        <TabButton active={tab === 'styles'} onClick={() => setTab('styles')} count={styleItems.length}>
          风格收藏
        </TabButton>
        <TabButton active={tab === 'brands'} onClick={() => setTab('brands')} count={brandItems.length}>
          品牌收藏
        </TabButton>
      </div>

      {currentItems.length === 0 ? (
        <EmptyState
          icon={tab === 'styles' ? '🎀' : '🏷️'}
          title={tab === 'styles' ? '还没有收藏风格' : '还没有收藏品牌'}
          description={tab === 'styles' ? '去风格百科探索并收藏你喜欢的风格吧' : '去品牌图鉴发现并收藏你感兴趣的品牌吧'}
          action={
            <Link
              to={tab === 'styles' ? '/styles' : '/brands'}
              className="inline-block rounded-full bg-wine px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-wine-light"
            >
              {tab === 'styles' ? '探索风格' : '探索品牌'}
            </Link>
          }
        />
      ) : (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {currentItems.map((item) => {
              if (!item) return null
              const isStyle = tab === 'styles'
              const itemId = item.id
              const favorited = isFavorited(isStyle ? 'style' : 'brand', itemId)
              const wardrobeItem = items.find(
                (i) => i.type === (isStyle ? 'style' : 'brand') && i.itemId === itemId,
              )

              return (
                <motion.div
                  key={itemId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="overflow-hidden rounded-xl border border-rose-200/40 bg-white shadow-sm"
                >
                  <Link to={`/${isStyle ? 'styles' : 'brands'}/${itemId}`} className="block">
                    <div
                      className="relative aspect-[4/3]"
                      style={{
                        background: isStyle
                          ? `linear-gradient(135deg, ${(item as any).colorPalette?.[0] || '#F9A8D4'}40, ${(item as any).colorPalette?.[1] || '#FDE4F0'}60)`
                          : 'linear-gradient(135deg, #f5f0eb, #faf5f0)',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-3xl text-wine/20">
                          {isStyle ? (item as any).nameZh?.[0] : item.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-semibold text-stone-800">
                        {isStyle ? (item as any).nameZh : item.name}
                      </h3>
                      {isStyle && (
                        <p className="mt-0.5 text-xs text-stone-400">{(item as Style).name}</p>
                      )}
                      <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                        {item.description}
                      </p>
                      {!isStyle && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                            {cLabel((item as Brand).country)}
                          </span>
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                            {pLabel((item as Brand).priceRange)}
                          </span>
                        </div>
                      )}
                      {wardrobeItem && (
                        <p className="mt-2 text-xs text-stone-400">
                          收藏于 {new Date(wardrobeItem.addedAt).toLocaleDateString('zh-CN')}
                        </p>
                      )}
                    </div>
                  </Link>
                  <div className="flex border-t border-rose-100/60">
                    <button
                      onClick={() => toggleFavorite(isStyle ? 'style' : 'brand', itemId)}
                      className="flex-1 py-2.5 text-center text-xs text-stone-500 transition-colors hover:bg-rose-50 hover:text-wine"
                    >
                      {favorited ? '♥ 已收藏' : '♡ 收藏'}
                    </button>
                    <button
                      onClick={() => {
                        const wi = items.find(
                          (i) => i.type === (isStyle ? 'style' : 'brand') && i.itemId === itemId,
                        )
                        if (wi) removeItem(wi.id)
                      }}
                      className="flex-1 py-2.5 text-center text-xs text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      移除
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean
  onClick: () => void
  count: number
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-wine text-white'
          : 'bg-white text-stone-500 hover:bg-rose-50'
      }`}
    >
      {children}
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
          active ? 'bg-white/20 text-white' : 'bg-rose-100 text-wine'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

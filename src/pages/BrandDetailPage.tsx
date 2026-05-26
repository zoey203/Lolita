import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import brandsData from '../data/brands.json'
import stylesData from '../data/styles.json'
import { useWardrobeContext } from '../hooks/WardrobeContext'
import { COUNTRY_LABELS, PRICE_LABELS, BRAND_TYPE_LABELS } from '../types'
import type { Country, PriceRange, BrandType } from '../types'
import Breadcrumb from '../components/shared/Breadcrumb'
import FavoriteButton from '../components/shared/FavoriteButton'
import Tag from '../components/shared/Tag'

function cLabel(c: string) { return COUNTRY_LABELS[c as Country] ?? c }
function pLabel(p: string) { return PRICE_LABELS[p as PriceRange] ?? p }
function tLabel(t: string) { return BRAND_TYPE_LABELS[t as BrandType] ?? t }

export default function BrandDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isFavorited, toggleFavorite } = useWardrobeContext()

  const brand = brandsData.find((b) => b.id === id)
  if (!brand) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-stone-500">品牌未找到</p>
        <button onClick={() => navigate('/brands')} className="mt-4 text-sm text-wine underline">
          返回品牌图鉴
        </button>
      </div>
    )
  }

  const relatedStyles = stylesData.filter((s) => brand.styleIds.includes(s.id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: '首页', to: '/' },
          { label: '品牌图鉴', to: '/brands' },
          { label: brand.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div>
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-rose-50 to-stone-100"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-serif text-6xl font-bold text-wine/25">{brand.name}</span>
                {brand.foundedYear && (
                  <p className="mt-1 text-sm text-wine/40">Est. {brand.foundedYear}</p>
                )}
              </div>
            </div>
            <div className="absolute right-4 top-4">
              <FavoriteButton
                isFavorited={isFavorited('brand', brand.id)}
                onToggle={() => toggleFavorite('brand', brand.id)}
              />
            </div>
          </motion.div>

          {/* Info tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            <Tag label={cLabel(brand.country)} className="bg-blue-50 text-blue-700" />
            <Tag label={pLabel(brand.priceRange)} className="bg-amber-50 text-amber-700" />
            <Tag label={tLabel(brand.type)} className="bg-purple-50 text-purple-700" />
            {brand.foundedYear && (
              <Tag label={`创立于 ${brand.foundedYear}`} className="bg-stone-100 text-stone-600" />
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-800">品牌简介</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{brand.description}</p>
          </motion.div>

          {/* Website */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-800">官方网站</h2>
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-rose-200/40 bg-white px-4 py-2.5 text-sm text-wine transition-colors hover:bg-rose-50"
            >
              {brand.website}
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>

          {/* Related Styles */}
          {relatedStyles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <h2 className="font-serif text-xl font-semibold text-stone-800">主打风格</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedStyles.map((style) => (
                  <Link
                    key={style.id}
                    to={`/styles/${style.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-rose-200/40 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div
                      className="h-14 w-14 flex-shrink-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${style.colorPalette[0]}, ${style.colorPalette[1]})`,
                      }}
                    />
                    <div>
                      <h3 className="font-serif text-base font-semibold text-stone-800">{style.nameZh}</h3>
                      <p className="mt-0.5 line-clamp-2 text-xs text-stone-500">{style.description.slice(0, 50)}…</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-rose-200/40 bg-white p-5">
            <h3 className="font-serif text-sm font-semibold text-stone-700">品牌信息</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone-400">国家</dt>
                <dd className="font-medium text-stone-700">{cLabel(brand.country)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">价位</dt>
                <dd className="font-medium text-stone-700">{pLabel(brand.priceRange)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">类型</dt>
                <dd className="font-medium text-stone-700">{tLabel(brand.type)}</dd>
              </div>
              {brand.foundedYear && (
                <div className="flex justify-between">
                  <dt className="text-stone-400">创立</dt>
                  <dd className="font-medium text-stone-700">{brand.foundedYear} 年</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-stone-400">主打风格</dt>
                <dd className="text-right font-medium text-stone-700">
                  {relatedStyles.map((s) => s.nameZh).join('、')}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}

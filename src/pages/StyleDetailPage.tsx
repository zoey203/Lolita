import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import stylesData from '../data/styles.json'
import brandsData from '../data/brands.json'
import { useWardrobeContext } from '../hooks/WardrobeContext'
import Breadcrumb from '../components/shared/Breadcrumb'
import FavoriteButton from '../components/shared/FavoriteButton'
import Tag from '../components/shared/Tag'
import Card from '../components/shared/Card'

function StyleHero({ style }: { style: typeof stylesData[number] }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative aspect-[16/9] overflow-hidden rounded-2xl"
      style={!style.imageUrl || imgError ? {
        background: `linear-gradient(135deg, ${style.colorPalette[0]}50, ${style.colorPalette[1]}70, ${style.colorPalette[2]}40)`,
      } : undefined}
    >
      {style.imageUrl && !imgError ? (
        <img
          src={style.imageUrl}
          alt={style.nameZh}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="font-serif text-8xl text-white/40 select-none">{style.nameZh[0]}</span>
            <h1 className="font-serif text-4xl font-bold text-white/80">{style.nameZh}</h1>
            <p className="mt-1 text-sm text-white/50">{style.name}</p>
          </div>
        </div>
      )}
      {style.imageUrl && !imgError && (
        <div className="absolute bottom-6 left-6 rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
          <h1 className="font-serif text-3xl font-bold text-white">{style.nameZh}</h1>
          <p className="text-sm text-white/70">{style.name}</p>
        </div>
      )}
      <div className="absolute right-4 top-4">
        <FavoriteButton
          isFavorited={useWardrobeContext().isFavorited('style', style.id)}
          onToggle={() => useWardrobeContext().toggleFavorite('style', style.id)}
          size="md"
        />
      </div>
    </motion.div>
  )
}

export default function StyleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const style = stylesData.find((s) => s.id === id)
  if (!style) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-stone-500">风格未找到</p>
        <button onClick={() => navigate('/styles')} className="mt-4 text-sm text-wine underline">
          返回风格百科
        </button>
      </div>
    )
  }

  const relatedBrands = brandsData.filter((b) => b.styleIds.includes(style.id))
  const relatedStyles = stylesData.filter((s) => style.substyleIds.includes(s.id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: '首页', to: '/' },
          { label: '风格百科', to: '/styles' },
          { label: style.nameZh },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div>
          <StyleHero style={style} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-800">风格简介</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{style.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-800">历史渊源</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{style.history}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-800">特征标签</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {style.characteristics.map((c) => (
                <Tag key={c} label={c} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="font-serif text-xl font-semibold text-stone-800">常见图案</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {style.commonMotifs.map((m) => (
                <Tag key={m} label={m} />
              ))}
            </div>
          </motion.div>

          {relatedBrands.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-10"
            >
              <h2 className="font-serif text-xl font-semibold text-stone-800">代表品牌</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedBrands.map((brand) => (
                  <Card
                    key={brand.id}
                    to={`/brands/${brand.id}`}
                    imageUrl={brand.imageUrl}
                    title={brand.name}
                    subtitle={brand.description.slice(0, 60) + '…'}
                    tags={[
                      brand.country === 'jp' ? '🇯🇵 日本' : brand.country === 'cn' ? '🇨🇳 中国' : '',
                      brand.priceRange === 'budget' ? '平价' : brand.priceRange === 'mid' ? '中端' : brand.priceRange === 'high' ? '高端' : '奢华',
                    ].filter(Boolean)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Color Palette */}
            <div className="rounded-xl border border-rose-200/40 bg-white p-5">
              <h3 className="font-serif text-sm font-semibold text-stone-700">代表色系</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {style.colorPalette.map((c) => (
                  <div key={c} className="text-center">
                    <div
                      className="mx-auto h-10 w-10 rounded-lg border border-stone-200 shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                    <p className="mt-1 text-xs text-stone-400">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Styles */}
            {relatedStyles.length > 0 && (
              <div className="rounded-xl border border-rose-200/40 bg-white p-5">
                <h3 className="font-serif text-sm font-semibold text-stone-700">相关风格</h3>
                <div className="mt-3 space-y-2">
                  {relatedStyles.map((rs) => (
                    <Link
                      key={rs.id}
                      to={`/styles/${rs.id}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-rose-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-full border border-stone-200"
                          style={{ backgroundColor: rs.colorPalette[0] }}
                        />
                        <span className="text-sm font-medium text-stone-700">{rs.nameZh}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

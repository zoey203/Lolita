import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import stylesData from '../data/styles.json'
import type { Style } from '../types'
import brandsData from '../data/brands.json'

function StylePreviewImage({ style }: { style: Style }) {
  const [imgError, setImgError] = useState(false)
  if (style.imageUrl && !imgError) {
    return (
      <img
        src={style.imageUrl}
        alt={style.nameZh}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    )
  }
  return (
    <>
      <div
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${style.colorPalette[0]}30, ${style.colorPalette[1]}50, ${style.colorPalette[0]}20)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-4xl text-wine/30 select-none">{style.nameZh[0]}</span>
      </div>
    </>
  )
}

const featuredStyles = stylesData.slice(0, 6)
const featuredBrands = brandsData
  .filter((b) => b.type === 'major')
  .slice(0, 6)

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-100/60 via-cream to-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-serif text-4xl font-bold tracking-tight text-wine sm:text-5xl lg:text-6xl"
          >
            Lolita 図鑑
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-500 sm:text-lg"
          >
            探索 Lolita 时尚的缤纷世界——从甜美的 Sweet 到暗黑的 Gothic，从经典日牌到新锐国牌，发现属于你的风格表达。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/styles"
              className="rounded-full bg-wine px-7 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-wine-light hover:shadow-lg"
            >
              探索风格
            </Link>
            <Link
              to="/brands"
              className="rounded-full border border-wine/30 bg-white px-7 py-3 text-sm font-medium text-wine transition-all hover:bg-rose-50"
            >
              浏览品牌
            </Link>
          </motion.div>
        </div>
        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Featured Styles */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-stone-800 sm:text-3xl">风格百科</h2>
              <p className="mt-1 text-sm text-stone-500">从甜美到暗黑，了解每一种风格</p>
            </div>
            <Link
              to="/styles"
              className="text-sm font-medium text-wine transition-colors hover:text-wine-light"
            >
              查看全部 &rarr;
            </Link>
          </div>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStyles.map((style, i) => (
            <motion.div
              key={style.id}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/styles/${style.id}`}
                className="group block overflow-hidden rounded-xl border border-rose-200/40 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <StylePreviewImage style={style} />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-800">
                    {style.nameZh}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                    {style.description}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {style.colorPalette.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 rounded-full border border-stone-200"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Brands */}
      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-stone-800 sm:text-3xl">精选品牌</h2>
                <p className="mt-1 text-sm text-stone-500">知名日牌与崭露头角的国牌</p>
              </div>
              <Link
                to="/brands"
                className="text-sm font-medium text-wine transition-colors hover:text-wine-light"
              >
                查看全部 &rarr;
              </Link>
            </div>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBrands.map((brand, i) => (
              <motion.div
                key={brand.id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/brands/${brand.id}`}
                  className="group block overflow-hidden rounded-xl border border-rose-200/40 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-100 to-rose-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-2xl font-semibold text-wine/20">{brand.name}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-stone-800">{brand.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs text-wine">
                        {brand.country === 'jp' ? '🇯🇵 日本' : brand.country === 'cn' ? '🇨🇳 中国' : brand.country === 'kr' ? '🇰🇷 韩国' : '其他'}
                      </span>
                      <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-500">
                        {brand.priceRange === 'budget' ? '平价' : brand.priceRange === 'mid' ? '中端' : brand.priceRange === 'high' ? '高端' : '奢华'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-r from-wine via-wine-light to-rose-400 p-10 text-center text-white shadow-lg sm:p-14"
        >
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">开启你的 Lolita 之旅</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80">
            收藏你喜欢的风格和品牌，建立专属衣橱灵感板，开始探索这个充满美学的文化世界。
          </p>
          <Link
            to="/styles"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-wine transition-all hover:bg-rose-50 hover:shadow-md"
          >
            开始探索 &rarr;
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

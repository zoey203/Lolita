import { useState } from 'react'
import { motion } from 'framer-motion'
import stylesData from '../data/styles.json'
import type { Style } from '../types'
import { useWardrobeContext } from '../hooks/WardrobeContext'
import SearchInput from '../components/shared/SearchInput'
import FavoriteButton from '../components/shared/FavoriteButton'
import EmptyState from '../components/shared/EmptyState'
import { Link } from 'react-router-dom'

function StyleImage({ style }: { style: Style }) {
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
          background: `linear-gradient(135deg, ${style.colorPalette[0]}40, ${style.colorPalette[1]}60, ${style.colorPalette[0]}30)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-6xl text-white/50 select-none">{style.nameZh[0]}</span>
      </div>
    </>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function StyleListPage() {
  const [search, setSearch] = useState('')
  const { isFavorited, toggleFavorite } = useWardrobeContext()

  const filtered = stylesData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nameZh.includes(search) ||
      s.description.includes(search),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-800">风格百科</h1>
        <p className="mt-2 text-sm text-stone-500">
          探索 Lolita 时尚的 {stylesData.length} 种子风格
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="搜索风格名称或描述..." />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="没有匹配的风格" description="试试其他关键词" />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((style) => (
            <motion.div key={style.id} variants={item} className="group relative">
              <div className="overflow-hidden rounded-xl border border-rose-200/40 bg-white shadow-sm transition-shadow hover:shadow-md">
                <Link to={`/styles/${style.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <StyleImage style={style} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-stone-800">
                          {style.nameZh}
                        </h3>
                        <p className="mt-0.5 text-xs text-stone-400">{style.name}</p>
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">
                      {style.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {style.characteristics.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs text-wine"
                        >
                          {c.length > 15 ? c.slice(0, 15) + '…' : c}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      {style.colorPalette.slice(0, 5).map((c) => (
                        <span
                          key={c}
                          className="h-3.5 w-3.5 rounded-full border border-stone-200"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
                <div className="absolute right-3 top-3 z-10">
                  <FavoriteButton
                    isFavorited={isFavorited('style', style.id)}
                    onToggle={() => toggleFavorite('style', style.id)}
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

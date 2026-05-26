import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface CardProps {
  to: string
  imageUrl: string
  title: string
  subtitle?: string
  tags?: string[]
  action?: ReactNode
  fallbackColor?: string
  fallbackChar?: string
  className?: string
}

export default function Card({
  to,
  imageUrl,
  title,
  subtitle,
  tags,
  action,
  fallbackColor = '#F9A8D4',
  fallbackChar,
  className = '',
}: CardProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = imageUrl && !imgError

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group overflow-hidden rounded-xl border border-rose-200/40 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <Link to={to} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {showImage ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${fallbackColor}30, ${fallbackColor}50, ${fallbackColor}20)`,
              }}
            >
              <span className="font-serif text-6xl text-white/50 select-none">
                {fallbackChar || title[0]}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-stone-800">{title}</h3>
          {subtitle && (
            <p className="mt-1 line-clamp-2 text-sm text-stone-500">{subtitle}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs text-wine"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      {action && <div className="border-t border-rose-100/60 px-4 py-2.5">{action}</div>}
    </motion.div>
  )
}

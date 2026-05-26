import { motion } from 'framer-motion'

interface FavoriteButtonProps {
  isFavorited: boolean
  onToggle: () => void
  size?: 'sm' | 'md'
}

export default function FavoriteButton({ isFavorited, onToggle, size = 'md' }: FavoriteButtonProps) {
  const sizeClass = size === 'sm' ? 'p-1 text-lg' : 'p-2 text-2xl'

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      className={`rounded-full transition-colors ${sizeClass} ${
        isFavorited ? 'text-red-400' : 'text-stone-300 hover:text-red-300'
      }`}
      aria-label={isFavorited ? '取消收藏' : '收藏'}
    >
      <motion.span
        key={isFavorited ? 'filled' : 'outline'}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {isFavorited ? '♥' : '♡'}
      </motion.span>
    </motion.button>
  )
}

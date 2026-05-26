interface TagProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export default function Tag({ label, active = false, onClick, className = '' }: TagProps) {
  const base = `inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${className}`
  const activeClass = active
    ? 'bg-wine text-white'
    : 'bg-rose-50 text-stone-600 hover:bg-rose-100 cursor-pointer'

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${activeClass}`}>
        {label}
      </button>
    )
  }

  return <span className={`${base} ${active ? 'bg-wine text-white' : 'bg-rose-50 text-wine'}`}>{label}</span>
}

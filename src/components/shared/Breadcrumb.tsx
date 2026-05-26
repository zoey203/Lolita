import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: Crumb[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-stone-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-stone-300">/</span>}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-wine">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-600">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

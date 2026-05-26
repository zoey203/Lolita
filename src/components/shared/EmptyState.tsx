import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({ icon = '💝', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl">{icon}</span>
      <h3 className="mt-4 font-serif text-lg font-semibold text-stone-600">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-stone-400">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

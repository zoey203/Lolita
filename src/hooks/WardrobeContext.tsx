import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useWardrobe } from './useWardrobe'
import type { WardrobeItem } from '../types'

interface WardrobeContextType {
  items: WardrobeItem[]
  isFavorited: (type: 'style' | 'brand', itemId: string) => boolean
  toggleFavorite: (type: 'style' | 'brand', itemId: string) => void
  removeItem: (id: string) => void
}

const WardrobeContext = createContext<WardrobeContextType | null>(null)

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const wardrobe = useWardrobe()
  return <WardrobeContext.Provider value={wardrobe}>{children}</WardrobeContext.Provider>
}

export function useWardrobeContext() {
  const ctx = useContext(WardrobeContext)
  if (!ctx) throw new Error('useWardrobeContext must be used within WardrobeProvider')
  return ctx
}

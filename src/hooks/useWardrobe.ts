import { useState, useCallback } from 'react'
import type { WardrobeItem } from '../types'

const STORAGE_KEY = 'lolita-wardrobe'

function loadWardrobe(): WardrobeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWardrobe(items: WardrobeItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

let uid = Date.now()
function nextId(): string {
  return `${uid++}-${Math.random().toString(36).slice(2, 8)}`
}

export function useWardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>(loadWardrobe)

  const isFavorited = useCallback(
    (type: 'style' | 'brand', itemId: string) =>
      items.some((i) => i.type === type && i.itemId === itemId),
    [items],
  )

  const toggleFavorite = useCallback(
    (type: 'style' | 'brand', itemId: string) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.type === type && i.itemId === itemId)
        const next = existing
          ? prev.filter((i) => i.id !== existing.id)
          : [...prev, { id: nextId(), type, itemId, addedAt: new Date().toISOString() }]
        saveWardrobe(next)
        return next
      })
    },
    [],
  )

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id)
      saveWardrobe(next)
      return next
    })
  }, [])

  return { items, isFavorited, toggleFavorite, removeItem }
}

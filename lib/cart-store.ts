'use client'

import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => {
  // Restore from localStorage on initialization
  const storedCart = typeof window !== 'undefined' ? localStorage.getItem('cart-storage') : null
  const initialItems = storedCart ? JSON.parse(storedCart) : []

  return {
    items: initialItems,
    addItem: (item) => {
      set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id)
        let newItems: CartItem[]

        if (existingItem) {
          newItems = state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        } else {
          newItems = [...state.items, item]
        }

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart-storage', JSON.stringify(newItems))
        }

        return { items: newItems }
      })
    },
    removeItem: (id) => {
      set((state) => {
        const newItems = state.items.filter((i) => i.id !== id)
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart-storage', JSON.stringify(newItems))
        }
        return { items: newItems }
      })
    },
    updateQuantity: (id, quantity) => {
      set((state) => {
        const newItems = state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        )
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart-storage', JSON.stringify(newItems))
        }
        return { items: newItems }
      })
    },
    clearCart: () => {
      set({ items: [] })
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart-storage')
      }
    },
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    getTotalItems: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0)
    },
  }
})

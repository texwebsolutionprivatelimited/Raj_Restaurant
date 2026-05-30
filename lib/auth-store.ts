'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  phone: string
  address?: string
  city?: string
  pincode?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}
const savedUsers =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('users') || '{}')
    : {}
const mockUsers: Record<string, { password: string; user: User }> = {
  ...(savedUsers as Record<string, { password: string; user: User }>),

  'user@example.com': {
    password: 'password123',
    user: {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      phone: '+91-9876543210',
    },
  },
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          const mockUser = mockUsers[email]
          if (!mockUser || mockUser.password !== password) {
            throw new Error('Invalid email or password')
          }

          const token = `token_${Date.now()}`
          set({
            user: mockUser.user,
            isAuthenticated: true,
            token,
            loading: false,
          })
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ loading: true })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          if (mockUsers[email]) {
            localStorage.setItem(
              'users',
              JSON.stringify(mockUsers)
            )
            throw new Error('User already exists')
          }

          const newUser: User = {
            id: `user_${Date.now()}`,
            email,
            name,
            phone: '',
          }

          mockUsers[email] = { password, user: newUser }

          const token = `token_${Date.now()}`
          set({
            user: newUser,
            isAuthenticated: true,
            token,
            loading: false,
          })
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        })
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

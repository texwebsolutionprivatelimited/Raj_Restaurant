'use client'

import { create } from 'zustand'
import { toast } from 'sonner'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (message: string, type: NotificationType, duration?: number) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  addNotification: (message: string, type: NotificationType, duration = 3000) => {
    const id = `notification_${Date.now()}`

    // Use sonner toast for UI display
    if (type === 'success') {
      toast.success(message)
    } else if (type === 'error') {
      toast.error(message)
    } else if (type === 'warning') {
      toast.warning(message)
    } else {
      toast.info(message)
    }

    set((state) => ({
      notifications: [...state.notifications, { id, message, type, duration }],
    }))

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeNotification(id)
      }, duration)
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },

  clearAll: () => {
    set({ notifications: [] })
  },
}))

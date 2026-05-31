"use client";

import { create } from "zustand";
import { toast } from "sonner";

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  addNotification: (message, type, duration = 3000) => {
    const id = `notification_${Date.now()}`;

    // Use sonner toast for UI display
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else {
      toast.info(message);
    }

    set((state) => ({
      notifications: [...state.notifications, { id, message, type, duration }],
    }));

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  },
}));

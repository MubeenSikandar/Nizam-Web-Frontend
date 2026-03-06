import { create } from "zustand";
import type { ToastData, ToastType } from "@/components/UI/Toast";

interface ToastState {
  toasts: ToastData[];
  add: (toast: Omit<ToastData, "id">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  add: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),

  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clear: () => set({ toasts: [] }),
}));

// ── Convenience helpers ───────────────────────────────────────
export const toast = {
  success: (title: string, message?: string, duration?: number) =>
    useToastStore.getState().add({ type: "success", title, message, duration }),

  error: (title: string, message?: string, duration?: number) =>
    useToastStore.getState().add({ type: "error", title, message, duration }),

  warning: (title: string, message?: string, duration?: number) =>
    useToastStore.getState().add({ type: "warning", title, message, duration }),

  info: (title: string, message?: string, duration?: number) =>
    useToastStore.getState().add({ type: "info", title, message, duration }),
};

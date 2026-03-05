import { create } from "zustand";
import type { UserResponse } from "@/types/auth";

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (
    user: UserResponse,
    accessToken: string,
    refreshToken: string,
  ) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setAuth: (user, accessToken, refreshToken) =>
    set({ user, accessToken, refreshToken }),

  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

  clear: () => set({ user: null, accessToken: null, refreshToken: null }),
}));

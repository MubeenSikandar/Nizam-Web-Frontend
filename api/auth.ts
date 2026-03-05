import { api } from "@/lib/axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export const authApi = {
  register: async (body: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/api/auth/register", body);
    return data;
  },

  login: async (body: LoginRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/api/auth/login", body);
    return data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await api.post("/api/auth/logout", { refresh_token: refreshToken });
  },
};

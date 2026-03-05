import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiError, LoginRequest, RegisterRequest } from "@/types/auth";

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (body: RegisterRequest) => authApi.register(body),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token, data.refresh_token);
      router.push("/dashboard");
    },
    onError: (error: AxiosError<ApiError>) => {
      // error.response.data.error.message is the human-readable string
      // bubble it up to the form via the mutation's error state
    },
  });
};

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (body: LoginRequest) => authApi.login(body),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token, data.refresh_token);
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const { refreshToken, clear } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(refreshToken!),
    onSettled: () => {
      clear();
      router.push("/login");
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiError, LoginRequest, RegisterRequest } from "@/types/auth";
import { toast } from "@/store/toastStore";

// Maps backend error codes to human-readable messages
const mapBackendError = (code: string, message: string): string => {
  switch (code) {
    case "CONFLICT":
      if (message.includes("slug"))
        return "This workspace URL is already taken.";
      if (message.includes("email")) return "This email is already registered.";
      return message;
    case "VALIDATION_ERROR":
      return message;
    case "RATE_LIMIT_EXCEEDED":
      return "Too many attempts. Please wait a moment.";
    case "INVALID_CREDENTIALS":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (body: RegisterRequest) => authApi.register(body),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token, data.refresh_token);
      toast.success(
        "Workspace Created",
        `Welcome to Nizam, ${data.user.name_en}.`,
      );
      router.push("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      const code = error?.response?.data?.error?.code ?? "";
      const message = error?.response?.data?.error?.message ?? "";
      toast.error("Registration Failed", mapBackendError(code, message));
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
      toast.success("Welcome back", `Good to see you, ${data.user.name_en}.`);
      router.push("/onboarding");
    },
    onError: (error: AxiosError<ApiError>) => {
      const code = error?.response?.data?.error?.code ?? "";
      const message = error?.response?.data?.error?.message ?? "";
      toast.error("Login Failed", mapBackendError(code, message));
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

export { mapBackendError };

export interface UserResponse {
  id: string;
  org_id: string;
  email: string;
  name_en: string;
  name_ur: string | null;
  role: "admin" | "manager" | "member";
  department: string | null;
  avatar_url: string | null;
  lang_pref: "en" | "ur";
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}

export interface RegisterRequest {
  org_name: string;
  org_slug: string;
  name_en: string;
  name_ur?: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

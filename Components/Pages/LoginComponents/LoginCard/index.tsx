"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Typography from "@/components/UI/Typography";
import ArrowRight from "@/Assets/Arrow_Right.svg";
import KeyLight from "@/Assets/Key_Light.svg";
import KeyDark from "@/Assets/Key_Dark.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const LoginCard = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: login, isPending } = useLogin();

  const clearError = (field: string) =>
    setErrors((e) => ({ ...e, [field]: "" }));

  const handleLogin = () => {
    const errs: Record<string, string> = {};

    if (!email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(email)) errs.email = "Enter a valid email address.";

    if (!password) errs.password = "Password is required.";
    else if (password.length < 8)
      errs.password = "Password must be at least 8 characters.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    login({ email: email.trim(), password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex flex-col items-start justify-center p-10 gap-3 glass w-full">
      <Typography variant="h1">Sign In</Typography>
      <Typography variant="subtitle">
        Welcome back. Please enter your credentials.
      </Typography>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Work Email"
          variant="email"
          placeholder="johndoe@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) clearError("email");
          }}
          onBlur={() => {
            if (email && !isValidEmail(email))
              setErrors((e) => ({
                ...e,
                email: "Enter a valid email address.",
              }));
          }}
          onKeyDown={handleKeyDown}
        />
        {errors.email && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {errors.email}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Password"
          variant="password"
          placeholder="***********"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) clearError("password");
          }}
          onKeyDown={handleKeyDown}
        />
        {errors.password && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {errors.password}
          </Typography>
        )}
      </div>

      <div className="flex items-center justify-center w-full pt-2">
        <Button
          variant="primary"
          size="lg"
          iconRight={<Image src={ArrowRight} width={14} height={14} alt="" />}
          className="w-full!"
          onClick={handleLogin}
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Login To Workspace"}
        </Button>
      </div>

      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-border" />
        <Typography variant="subtitle">Enterprise Access</Typography>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Button
        variant="primary"
        size="lg"
        icon={
          <Image
            src={isDark ? KeyDark : KeyLight}
            width={23}
            height={12}
            alt="Key"
          />
        }
        className="bg-[#334155]! border-[#334155]! w-full! shadow-none!"
        disabled={isPending}
      >
        Login with SSO
      </Button>

      <div className="flex items-center justify-center w-full h-px bg-border mt-2" />

      <div className="flex items-center justify-center gap-1 w-full">
        <Typography variant="subtitle">Don&apos;t have a workspace?</Typography>
        <Typography
          variant="body"
          className="text-primary cursor-pointer hover:text-primary-hover transition-colors duration-200"
          onClick={() => router.push("/register")}
        >
          Register Company
        </Typography>
      </div>
    </div>
  );
};

export default LoginCard;

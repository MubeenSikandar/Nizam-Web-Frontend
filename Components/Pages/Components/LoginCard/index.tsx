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

const LoginCard = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const router = useRouter();

  return (
    <div className="flex flex-col items-start justify-center p-10 gap-3 glass w-full">
      <Typography variant="h1">Sign In</Typography>
      <Typography variant="subtitle">
        Welcome back. Please enter your credentials.
      </Typography>
      <Input
        label="Work Email"
        variant="email"
        placeholder="JohnDoe@Company.com"
      />
      <Input label="Password" variant="password" placeholder="***********" />
      <div className="flex items-center justify-center w-full pt-2">
        <Button
          variant="primary"
          size="lg"
          iconRight={<Image src={ArrowRight} width={14} height={14} alt="" />}
          className="w-full!"
          onClick={() => router.push("onboarding")}
        >
          Login To Workspace
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

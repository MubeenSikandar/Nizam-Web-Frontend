"use client";

import Typography from "@/components/UI/Typography";
import SecurityLockIconDark from "@/Assets/Security_Lock_Dark.svg";
import SecurityLockIconLight from "@/Assets/Security_Lock_Light.svg";
import VerifiedUserLight from "@/Assets/Verified_User_Light.svg";
import VerifiedUserDark from "@/Assets/Verified_User_Dark.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

const LoginContent = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-start justify-center gap-5 flex-col">
      <div className="flex items-start justify-center gap-5 flex-col">
        <div className="flex items-start justify-center gap-0 flex-col">
          <Typography variant="h1" className="text-6xl font-extrabold!">
            Secure Collaboration
          </Typography>

          <div className="flex items-center justify-start gap-3 w-full flex-wrap">
            <Typography variant="h1" className="text-7xl font-extrabold!">
              for
            </Typography>
            <Typography
              variant="h1"
              className="text-7xl font-extrabold! text-primary"
            >
              Pakistani
            </Typography>
          </div>

          <Typography
            variant="h1"
            className="text-7xl font-extrabold! text-primary"
          >
            Corporations.
          </Typography>
        </div>

        <Typography variant="subtitle" className="text-wrap max-w-xl">
          Empowering local enterprises with sovereign, encrypted communication
          tools designed for the unique needs of Pakistan&apos;s business
          landscape.
        </Typography>
      </div>
      <div className="flex items-center justify-center gap-5 w-full">
        <div className="glass p-4 flex items-start justify-start gap-1 flex-col w-full rounded-2xl!">
          <Image
            src={isDark ? SecurityLockIconDark : SecurityLockIconLight}
            width={16}
            height={20}
            alt="Security Lock"
          />
          <Typography variant="body">Data Sovereignty</Typography>
          <Typography variant="subtitle">
            Local hosting options available.
          </Typography>
        </div>

        <div className="glass p-4 h-35.5 flex items-start justify-start gap-1 flex-col w-full rounded-2xl!">
          <Image
            src={isDark ? VerifiedUserDark : VerifiedUserLight}
            width={16}
            height={20}
            alt="Verified User"
          />
          <Typography variant="body">SSO Ready</Typography>
          <Typography variant="subtitle">SAML & AD integration.</Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;

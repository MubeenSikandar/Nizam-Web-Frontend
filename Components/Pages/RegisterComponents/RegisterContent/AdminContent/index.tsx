"use client";
import Typography from "@/components/UI/Typography";
import Admin_Dark from "@/Assets/Admin_Dark.svg";
import Admin_Light from "@/Assets/Admin_Light.svg";
import Industry_Dark from "@/Assets/Industry_Dark.svg";
import Industry_Light from "@/Assets/Industry_Light.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

const AdminContent = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-start justify-start flex-col w-full gap-5 h-full">
      <div className="glass flex items-center justify-center p-2">
        <Typography variant="overline" className="text-primary font-bold!">
          STEP 02: ADMIN SETUP
        </Typography>
      </div>

      <div className="flex items-start justify-center gap-4 flex-col">
        <div className="flex items-start justify-center flex-col">
          <Typography variant="h1" className="text-5xl">
            Establish the
          </Typography>
          <Typography variant="h1" className="text-5xl text-primary">
            Workspace Owner.
          </Typography>
        </div>
        <Typography variant="caption" className="text-xl!">
          Every organization on Nizam needs a primary administrator. This person
          will manage security settings, billing, and user permissions for your
          corporation.
        </Typography>
      </div>

      <div className="glass flex items-start justify-center flex-col p-3 gap-1 w-full rounded-lg!">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={isDark ? Admin_Dark : Admin_Light}
            width={20}
            height={18}
            alt="Admin"
          />
          <Typography variant="body" className="text-lg!">
            Full Administrative Control
          </Typography>
        </div>
        <Typography variant="subtitle" className="pl-6">
          Access to all workspace management features.
        </Typography>
      </div>

      <div className="glass flex items-start justify-center flex-col p-3 gap-1 w-full rounded-lg!">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={isDark ? Industry_Dark : Industry_Light}
            width={20}
            height={18}
            alt="Encryption"
          />
          <Typography variant="body" className="text-lg!">
            Sovereign Encryption Keys
          </Typography>
        </div>
        <Typography variant="subtitle" className="pl-6">
          Your admin holds the keys to corporate data.
        </Typography>
      </div>
    </div>
  );
};

export default AdminContent;

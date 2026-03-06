"use client";

import Typography from "@/components/UI/Typography";
import Scalabe_Dark from "@/Assets/Scalable_Dark.svg";
import Scalabe_Light from "@/Assets/Scalable_Light.svg";
import Industry_Dark from "@/Assets/Industry_Dark.svg";
import Industry_Light from "@/Assets/Industry_Light.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

const OrganizationContent = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-start justify-start flex-col w-full gap-5 h-full">
      <div className="glass flex items-center justify-center p-2">
        <Typography variant="overline" className="text-primary font-bold!">
          STEP 01: SETUP
        </Typography>
      </div>
      <div className="flex items-start justify-center gap-4 flex-col">
        <div className="flex items-start justify-center flex-col">
          <div className="flex items-start justify-center gap-3">
            <Typography variant="h1" className="text-5xl">
              Create Your
            </Typography>
            <Typography variant="h1" className="text-5xl text-primary">
              Corporate
            </Typography>
          </div>
          <Typography variant="h1" className="text-5xl text-primary">
            Workspace
          </Typography>
        </div>
        <Typography variant="caption" className="text-xl!">
          Establish your company&apos;s presence on Nizam. This information
          helps us tailor the collaboration environment to your specific
          industry needs.
        </Typography>
      </div>
      <div className="glass flex items-start justify-center flex-col p-3 gap-1 w-full rounded-lg!">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={isDark ? Industry_Dark : Industry_Light}
            width={20}
            height={18}
            alt="Industry"
          />
          <Typography variant="body" className="text-lg!">
            Industry-Specific Modules
          </Typography>
        </div>
        <Typography variant="subtitle" className="pl-6">
          Custom tools for Textiles, Manufacturing, and more.
        </Typography>
      </div>
      <div className="glass flex items-start justify-center flex-col p-3 gap-1 w-full rounded-lg!">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={isDark ? Scalabe_Dark : Scalabe_Light}
            width={20}
            height={18}
            alt="Industry"
          />
          <Typography variant="body" className="text-lg!">
            Scalable Architecture
          </Typography>
        </div>
        <Typography variant="subtitle" className="pl-6">
          Designed for 50 to 50,000+ employees.
        </Typography>
      </div>
    </div>
  );
};

export default OrganizationContent;

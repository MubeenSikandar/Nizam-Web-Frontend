"use client";
import Typography from "@/components/UI/Typography";
import Image from "next/image";
import { useTheme } from "next-themes";
import Shield_Light from "@/Assets/Encryption_Light.svg";
import Shield_Dark from "@/Assets/Encryption_Dark.svg";
import Integrity_Dark from "@/Assets/Integrity_Dark.svg";
import Integrity_Light from "@/Assets/Integrity_Light.svg";

const ReviewContent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-start justify-start flex-col w-full gap-5 h-full">
      <div className="glass flex items-center justify-center p-2">
        <Typography variant="overline" className="text-primary font-bold!">
          STEP 03: REVIEW
        </Typography>
      </div>

      <div className="flex items-start justify-center gap-4 flex-col">
        <div className="flex items-start justify-center flex-col">
          <Typography variant="h1" className="text-5xl">
            Verify your
          </Typography>
          <Typography variant="h1" className="text-5xl text-primary">
            Corporate Identity.
          </Typography>
        </div>
        <Typography variant="caption" className="text-xl!">
          Please review all information before finalizing your workspace setup.
          Once confirmed, your administrative dashboard will be provisioned
          instantly.
        </Typography>
      </div>

      <div className="glass flex items-start justify-center flex-col p-3 gap-1 w-full rounded-lg!">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={isDark ? Integrity_Dark : Integrity_Light}
            width={20}
            height={18}
            alt="Data Integrity"
          />
          <Typography variant="body" className="text-lg!">
            Data Integrity Check
          </Typography>
        </div>
        <Typography variant="subtitle" className="pl-7">
          All fields validated before provisioning your workspace.
        </Typography>
      </div>

      <div className="glass flex items-start justify-center flex-col p-3 gap-1 w-full rounded-lg!">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={isDark ? Shield_Dark : Shield_Light}
            width={20}
            height={18}
            alt="Secure"
          />

          <Typography variant="body" className="text-lg!">
            Secure Connection Established
          </Typography>
        </div>
        <Typography variant="subtitle" className="pl-7">
          End-to-end encrypted. Data hosted in Pakistan.
        </Typography>
      </div>
    </div>
  );
};

export default ReviewContent;

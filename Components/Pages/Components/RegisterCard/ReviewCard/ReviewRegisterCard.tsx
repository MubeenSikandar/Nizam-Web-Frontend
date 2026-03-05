"use client";
import Button from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import ArrowRight from "@/Assets/Arrow_Right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RegisterData } from "@/components/Pages/Auth/Register";

interface Props {
  data: RegisterData;
  onBack: () => void;
}

interface RowProps {
  label: string;
  value: string;
}

const Row = ({ label, value }: RowProps) => (
  <div className="flex items-start justify-between w-full gap-4">
    <Typography variant="caption" className="text-sm! shrink-0">
      {label}
    </Typography>
    <Typography variant="body" className="text-sm! text-right">
      {value || "—"}
    </Typography>
  </div>
);

const ReviewRegisterCard = ({ data, onBack }: Props) => {
  const router = useRouter();

  const handleFinalize = async () => {
    // POST to /api/auth/register here
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-start justify-center p-10 gap-4 glass w-full">
      <Typography variant="h1">Review & Confirm</Typography>
      <Typography variant="subtitle">
        Check your company and admin details below.
      </Typography>

      {/* Organization Section */}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between w-full">
          <Typography variant="overline" className="text-primary">
            Company Information
          </Typography>
          <Typography
            variant="caption"
            className="text-primary cursor-pointer hover:text-primary-hover transition-colors duration-200"
            onClick={onBack}
          >
            ✎ Edit
          </Typography>
        </div>
        <div className="glass rounded-lg! p-4 flex flex-col gap-2.5 w-full">
          <Row label="Company Name" value={data.companyName} />
          <div className="w-full h-px bg-border" />
          <Row label="Workspace URL" value={`${data.slug}.nizam.pk`} />
          <div className="w-full h-px bg-border" />
          <Row label="Industry" value={data.industry} />
          <div className="w-full h-px bg-border" />
          <Row label="Company Size" value={`${data.companySize} employees`} />
          <div className="w-full h-px bg-border" />
          <Row label="Headquarters" value={data.city} />
        </div>
      </div>

      {/* Admin Section */}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between w-full">
          <Typography variant="overline" className="text-primary">
            Primary Administrator
          </Typography>
          <Typography
            variant="caption"
            className="text-primary cursor-pointer hover:text-primary-hover transition-colors duration-200"
            onClick={onBack}
          >
            ✎ Edit
          </Typography>
        </div>
        <div className="glass rounded-lg! p-4 flex flex-col gap-2.5 w-full">
          <Row label="Full Name" value={data.fullName} />
          <div className="w-full h-px bg-border" />
          <Row label="Designation" value={data.designation} />
          <div className="w-full h-px bg-border" />
          <Row label="Work Email" value={data.email} />
          <div className="w-full h-px bg-border" />
          <Row label="Phone" value={data.phone} />
          <div className="w-full h-px bg-border" />
          <Row label="Password" value="••••••••••••" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-3 w-full pt-2">
        <Button
          variant="secondary"
          size="lg"
          className="w-full!"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-full!"
          onClick={handleFinalize}
          iconRight={<Image src={ArrowRight} width={14} height={14} alt="" />}
        >
          Finalize Setup
        </Button>
      </div>

      <Typography variant="caption" className="text-center w-full">
        By clicking Finalize Setup, you acknowledge that all information is
        accurate and represents the legal entity stated.
      </Typography>
    </div>
  );
};

export default ReviewRegisterCard;

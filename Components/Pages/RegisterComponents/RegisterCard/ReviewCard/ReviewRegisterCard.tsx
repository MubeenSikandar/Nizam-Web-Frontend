"use client";
import Button from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import { AxiosError } from "axios";
import { useRegister, mapBackendError } from "@/hooks/useAuth";
import type { ApiError } from "@/types/auth";
import { RegisterData } from "@/components/Pages/Auth/Register";

interface Props {
  data: RegisterData;
  onBack: () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
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
  const { mutate: register, isPending, error } = useRegister();

  const handleFinalize = () => {
    register({
      org_name: data.companyName,
      org_slug: data.slug,
      name_en: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone || undefined,
    });
  };

  const backendError = error
    ? mapBackendError(
        (error as AxiosError<ApiError>)?.response?.data?.error?.code ?? "",
        (error as AxiosError<ApiError>)?.response?.data?.error?.message ?? "",
      )
    : null;

  const slugError = backendError?.includes("workspace URL")
    ? backendError
    : null;
  const emailError = backendError?.includes("email") ? backendError : null;
  const generalError =
    !slugError && !emailError && backendError ? backendError : null;

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
          {slugError && (
            <Typography variant="caption" className="text-red-500">
              {slugError}
            </Typography>
          )}
          <div className="w-full h-px bg-border" />
          <Row label="Industry" value={data.industry} />
          <div className="w-full h-px bg-border" />
          <Row label="Company Size" value={data.companySize} />
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
          {emailError && (
            <Typography variant="caption" className="text-red-500">
              {emailError}
            </Typography>
          )}
          <div className="w-full h-px bg-border" />
          <Row label="Phone" value={data.phone} />
          <div className="w-full h-px bg-border" />
          <Row label="Password" value="••••••••••••" />
        </div>
      </div>

      {generalError && (
        <div className="w-full px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10">
          <Typography variant="caption" className="text-red-500">
            {generalError}
          </Typography>
        </div>
      )}

      <div className="flex items-center justify-center gap-3 w-full pt-2">
        <Button
          variant="secondary"
          size="lg"
          className="w-full!"
          onClick={onBack}
          disabled={isPending}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-full!"
          onClick={handleFinalize}
          disabled={isPending}
        >
          {isPending ? "Setting up..." : "Finalize Setup"}
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

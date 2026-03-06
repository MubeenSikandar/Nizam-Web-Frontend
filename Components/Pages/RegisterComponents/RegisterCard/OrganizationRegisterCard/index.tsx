"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Typography from "@/components/UI/Typography";
import Dropdown from "@/components/UI/Dropdown";
import ArrowRight from "@/Assets/Arrow_Right.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterData } from "@/components/Pages/Auth/Register";

interface Props {
  data: RegisterData;
  onNext: (partial: Partial<RegisterData>) => void;
  errors?: Record<string, string>;
}

const INDUSTRIES = [
  "Textile",
  "Manufacturing",
  "Banking",
  "FMCG",
  "Telecom",
  "Real Estate",
  "Other",
];

const COMPANY_SIZES = ["10–50", "50–200", "200–500", "500–2000", "2000+"];

const CITIES = ["Karachi", "Lahore", "Islamabad", "Other"];

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const OrganizationRegisterCard = ({ data, onNext, errors }: Props) => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState(data.companyName);
  const [slug, setSlug] = useState(data.slug);
  const [slugEdited, setSlugEdited] = useState(false);
  const [industry, setIndustry] = useState(data.industry);
  const [companySize, setCompanySize] = useState(data.companySize);
  const [city, setCity] = useState(data.city);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const allErrors = { ...errors, ...localErrors };

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
    if (!slugEdited) setSlug(generateSlug(value));
    if (localErrors.companyName)
      setLocalErrors((e) => ({ ...e, companyName: "" }));
  };

  const handleSlugChange = (value: string) => {
    setSlugEdited(true);
    setSlug(generateSlug(value));
    if (localErrors.slug) setLocalErrors((e) => ({ ...e, slug: "" }));
  };

  const handleContinue = () => {
    const errs: Record<string, string> = {};

    if (!companyName.trim()) errs.companyName = "Company name is required.";
    if (!slug.trim()) errs.slug = "Workspace URL is required.";
    else if (!/^[a-z0-9-]+$/.test(slug))
      errs.slug = "Only lowercase letters, numbers, and hyphens.";
    if (!industry) errs.industry = "Please select an industry.";
    if (!companySize) errs.companySize = "Please select a company size.";
    if (!city) errs.city = "Please select a headquarters city.";

    if (Object.keys(errs).length > 0) {
      setLocalErrors(errs);
      return;
    }

    onNext({ companyName, slug, industry, companySize, city });
  };

  return (
    <div className="flex flex-col items-start justify-center p-10 gap-3 glass w-full">
      <Typography variant="h1">Your Organization</Typography>
      <Typography variant="subtitle">
        Set up your corporate workspace on Nizam.
      </Typography>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Company Name"
          variant="text"
          placeholder="e.g. Indus Textiles Ltd."
          value={companyName}
          onChange={(e) => handleCompanyNameChange(e.target.value)}
        />
        {allErrors.companyName && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.companyName}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Workspace URL"
          variant="text"
          placeholder="your-company"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
        />
        {slug && (
          <Typography variant="caption" className="pl-1">
            {slug}.nizam.pk
          </Typography>
        )}
        {allErrors.slug && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.slug}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Dropdown
          label="Industry"
          placeholder="Select Industry"
          options={INDUSTRIES}
          value={industry}
          onChange={(v) => {
            setIndustry(v);
            setLocalErrors((e) => ({ ...e, industry: "" }));
          }}
        />
        {allErrors.industry && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.industry}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Dropdown
          label="Company Size"
          placeholder="Select Size"
          options={COMPANY_SIZES.map((s) => `${s} employees`)}
          value={companySize}
          onChange={(v) => {
            setCompanySize(v);
            setLocalErrors((e) => ({ ...e, companySize: "" }));
          }}
        />
        {allErrors.companySize && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.companySize}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Dropdown
          label="Headquarters"
          placeholder="Select City"
          options={CITIES}
          value={city}
          onChange={(v) => {
            setCity(v);
            setLocalErrors((e) => ({ ...e, city: "" }));
          }}
        />
        {allErrors.city && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.city}
          </Typography>
        )}
      </div>

      <div className="flex items-center justify-center w-full pt-2">
        <Button
          variant="primary"
          size="lg"
          iconRight={<Image src={ArrowRight} width={14} height={14} alt="" />}
          className="w-full!"
          onClick={handleContinue}
        >
          Continue to Admin Setup
        </Button>
      </div>

      <div className="flex items-center justify-center w-full h-px bg-border mt-2" />

      <div className="flex items-center justify-center gap-1 w-full">
        <Typography variant="subtitle">Already have a workspace?</Typography>
        <Typography
          variant="body"
          className="text-primary cursor-pointer hover:text-primary-hover transition-colors duration-200"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Typography>
      </div>
    </div>
  );
};

export default OrganizationRegisterCard;

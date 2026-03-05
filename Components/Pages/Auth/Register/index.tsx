"use client";
import { useState } from "react";
import Header from "@/components/Pages/Components/Header";
import Typography from "@/components/UI/Typography";

// Content (left side)
import OrganizationContent from "@/components/Pages/Components/RegisterContent/OrganizationContent";
import AdminContent from "@/components/Pages/Components/RegisterContent/AdminContent";
import ReviewContent from "@/components/Pages/Components/RegisterContent/ReviewContent";

// Cards (right side)
import OrganizationRegisterCard from "@/components/Pages/Components/RegisterCard/OrganizationRegisterCard";
import AdminAccountRegisterCard from "@/components/Pages/Components/RegisterCard/AdminAccountRegisterCard";
import ReviewRegisterCard from "@/components/Pages/Components/RegisterCard/ReviewCard/ReviewRegisterCard";

export type RegisterData = {
  // Step 1
  companyName: string;
  slug: string;
  industry: string;
  companySize: string;
  city: string;
  // Step 2
  fullName: string;
  designation: string;
  email: string;
  phone: string;
  password: string;
};

const STEPS = [
  { label: "Organization" },
  { label: "Admin Account" },
  { label: "Review" },
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegisterData>({
    companyName: "",
    slug: "",
    industry: "",
    companySize: "",
    city: "",
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    password: "",
  });

  const next = (partial: Partial<RegisterData>) => {
    setData((prev) => ({ ...prev, ...partial }));
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  return (
    <div className="flex items-center h-full justify-between flex-col py-10 px-[10%] w-full gap-10">
      <Header />

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 w-full">
        {STEPS.map((s, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isComplete = step > stepNum;
          return (
            <div
              key={s.label}
              className="flex items-center gap-2 flex-1 last:flex-none"
            >
              <div className="flex items-center justify-center flex-col gap-1">
                <div
                  className={`flex items-center justify-center p-3 rounded-full w-12 transition-colors duration-300 ${
                    isActive || isComplete ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <Typography variant="body" className="font-black!">
                    {stepNum}
                  </Typography>
                </div>
                <Typography
                  variant="body"
                  className={
                    isActive || isComplete ? "text-primary" : "text-[#1E293B]"
                  }
                >
                  {s.label}
                </Typography>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mb-6 transition-colors duration-300 ${
                    isComplete ? "bg-primary" : "bg-[#1E293B]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Content + Card */}
      <div className="flex items-center justify-between w-full">
        <div className="w-[40%]">
          {step === 1 && <OrganizationContent />}
          {step === 2 && <AdminContent />}
          {step === 3 && <ReviewContent />}
        </div>
        <div className="flex items-center justify-center w-[50%]">
          {step === 1 && <OrganizationRegisterCard data={data} onNext={next} />}
          {step === 2 && (
            <AdminAccountRegisterCard data={data} onNext={next} onBack={back} />
          )}
          {step === 3 && <ReviewRegisterCard data={data} onBack={back} />}
        </div>
      </div>
    </div>
  );
};

export default Register;

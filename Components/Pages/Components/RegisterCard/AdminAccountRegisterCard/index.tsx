"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Typography from "@/components/UI/Typography";
import ArrowRight from "@/Assets/Arrow_Right.svg";

import Image from "next/image";
import { useState } from "react";
import { RegisterData } from "@/components/Pages/Auth/Register";

interface Props {
  data: RegisterData;
  onNext: (partial: Partial<RegisterData>) => void;
  onBack: () => void;
}

const AdminAccountRegisterCard = ({ data, onNext, onBack }: Props) => {
  const [fullName, setFullName] = useState(data.fullName);
  const [designation, setDesignation] = useState(data.designation);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [password, setPassword] = useState(data.password);
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    onNext({ fullName, designation, email, phone, password });
  };

  return (
    <div className="flex flex-col items-start justify-center p-10 gap-3 glass w-full">
      <Typography variant="h1">Admin Account</Typography>
      <Typography variant="subtitle">
        Create the root account for your organization.
      </Typography>

      <Input
        label="Full Name"
        variant="text"
        placeholder="e.g. Zaryab Ahmed"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <Input
        label="Designation"
        variant="text"
        placeholder="e.g. Chief Technology Officer"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />

      <Input
        label="Work Email"
        variant="email"
        placeholder="admin@company.com.pk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Phone Number"
        variant="text"
        placeholder="+92 300 0000000"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Input
        label="Password"
        variant="password"
        placeholder="Minimum 12 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Terms checkbox */}
      <div className="flex items-start gap-3 w-full pt-1">
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-primary cursor-pointer"
        />
        <label htmlFor="terms" className="cursor-pointer">
          <Typography variant="caption" className="text-sm!">
            I confirm I am authorized to register this organization and agree to
            the{" "}
            <span className="text-primary hover:text-primary-hover transition-colors duration-200 cursor-pointer">
              Enterprise Terms of Service
            </span>
            .
          </Typography>
        </label>
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
          iconRight={<Image src={ArrowRight} width={14} height={14} alt="" />}
          className="w-full!"
          onClick={handleContinue}
          disabled={!agreed}
        >
          Continue to Review
        </Button>
      </div>

      <div className="flex items-center justify-center w-full h-px bg-border mt-2" />

      <div className="flex items-center justify-center gap-1 w-full">
        <Typography variant="subtitle">Already have an account?</Typography>
        <Typography
          variant="body"
          className="text-primary cursor-pointer hover:text-primary-hover transition-colors duration-200"
          onClick={() => (window.location.href = "/login")}
        >
          Sign In
        </Typography>
      </div>
    </div>
  );
};

export default AdminAccountRegisterCard;

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
  errors?: Record<string, string>;
}

const isValidName = (value: string): boolean =>
  // Only letters (including Urdu/Arabic unicode), spaces, dots, hyphens
  // No numbers, no special chars like @#$%
  /^[\p{L}\s.\-']+$/u.test(value.trim());

const isValidDesignation = (value: string): boolean =>
  // Letters, spaces, dots, hyphens, ampersand — "Chief Technology Officer", "VP & GM"
  /^[\p{L}\s.\-'&/]+$/u.test(value.trim());

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPakistaniPhone = (value: string): boolean => {
  // Accepts:
  // +923001234567
  // 03001234567
  // 3001234567
  // +92 300 1234567 (with spaces)
  // 0300-1234567 (with dash)
  const cleaned = value.replace(/[\s\-()]/g, "");
  return /^(\+92|0092|0)?3[0-9]{9}$/.test(cleaned);
};

const isStrongPassword = (value: string): string | null => {
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(value))
    return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(value))
    return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(value)) return "Password must contain at least one number.";
  if (!/[^A-Za-z0-9]/.test(value))
    return "Password must contain at least one special character.";
  return null;
};

const AdminAccountRegisterCard = ({
  data,
  onNext,
  onBack,
  errors = {},
}: Props) => {
  const [fullName, setFullName] = useState(data.fullName);
  const [designation, setDesignation] = useState(data.designation);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [password, setPassword] = useState(data.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const allErrors = { ...errors, ...localErrors };

  const clearError = (field: string) =>
    setLocalErrors((e) => ({ ...e, [field]: "" }));

  const handleContinue = () => {
    const errs: Record<string, string> = {};

    // Full Name
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    else if (fullName.trim().length < 2)
      errs.fullName = "Full name must be at least 2 characters.";
    else if (!isValidName(fullName))
      errs.fullName =
        "Full name must contain only letters, spaces, or hyphens. No numbers or symbols.";

    // Designation
    if (!designation.trim()) errs.designation = "Designation is required.";
    else if (!isValidDesignation(designation))
      errs.designation =
        "Designation must contain only letters and standard punctuation.";

    // Email
    if (!email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(email)) errs.email = "Enter a valid email address.";

    // Phone (optional but validated if provided)
    if (phone.trim() && !isValidPakistaniPhone(phone))
      errs.phone =
        "Enter a valid Pakistani number e.g. +923001234567 or 03001234567.";

    // Password
    if (!password) {
      errs.password = "Password is required.";
    } else {
      const passwordError = isStrongPassword(password);
      if (passwordError) errs.password = passwordError;
    }

    // Confirm Password
    if (!confirmPassword)
      errs.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match.";

    // Terms
    if (!agreed) errs.agreed = "You must agree to the Terms of Service.";

    if (Object.keys(errs).length > 0) {
      setLocalErrors(errs);
      return;
    }

    onNext({ fullName, designation, email, phone, password });
  };

  return (
    <div className="flex flex-col items-start justify-center p-10 gap-3 glass w-full">
      <Typography variant="h1">Admin Account</Typography>
      <Typography variant="subtitle">
        Create the root account for your organization.
      </Typography>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Full Name"
          variant="text"
          placeholder="e.g. Zaryab Ahmed"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            clearError("fullName");
          }}
        />
        {allErrors.fullName && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.fullName}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Designation"
          variant="text"
          placeholder="e.g. Chief Technology Officer"
          value={designation}
          onChange={(e) => {
            setDesignation(e.target.value);
            clearError("designation");
          }}
        />
        {allErrors.designation && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.designation}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Work Email"
          variant="email"
          placeholder="admin@company.com.pk"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
        />
        {allErrors.email && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.email}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Phone Number"
          variant="text"
          placeholder="+92 300 0000000"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            clearError("phone");
          }}
        />
        {allErrors.phone && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.phone}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Password"
          variant="password"
          placeholder="Minimum 8 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError("password");
            // Re-validate confirm if already touched
            if (confirmPassword && e.target.value !== confirmPassword) {
              setLocalErrors((err) => ({
                ...err,
                confirmPassword: "Passwords do not match.",
              }));
            } else {
              clearError("confirmPassword");
            }
          }}
        />
        {allErrors.password && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.password}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          label="Confirm Password"
          variant="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (e.target.value !== password) {
              setLocalErrors((err) => ({
                ...err,
                confirmPassword: "Passwords do not match.",
              }));
            } else {
              clearError("confirmPassword");
            }
          }}
        />
        {allErrors.confirmPassword && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.confirmPassword}
          </Typography>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full pt-1">
        <div className="flex items-start gap-3 w-full">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              clearError("agreed");
            }}
            className="mt-1 accent-primary cursor-pointer"
          />
          <label htmlFor="terms" className="cursor-pointer">
            <Typography variant="caption" className="text-sm!">
              I confirm I am authorized to register this organization and agree
              to the{" "}
              <span className="text-primary hover:text-primary-hover transition-colors duration-200 cursor-pointer">
                Enterprise Terms of Service
              </span>
              .
            </Typography>
          </label>
        </div>
        {allErrors.agreed && (
          <Typography variant="caption" className="text-red-500 pl-1">
            {allErrors.agreed}
          </Typography>
        )}
      </div>

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

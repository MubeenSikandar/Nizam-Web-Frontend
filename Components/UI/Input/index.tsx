"use client";

import { forwardRef, InputHTMLAttributes, useState, useId } from "react";

type InputVariant = "email" | "password" | "text";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  variant: InputVariant;
  label?: string;
  error?: string;
  hint?: string;
}

const EyeOpen = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { variant, label, error, hint, className = "", disabled, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();

    const isPassword = variant === "password";
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : variant;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "100%",
        }}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
              color: error ? "var(--destructive)" : "var(--foreground-muted)",
              letterSpacing: "0.01em",
              transition: "color 0.2s ease",
            }}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Left icon */}
          <span
            style={{
              position: "absolute",
              left: "14px",
              color: error ? "var(--destructive)" : "var(--foreground-subtle)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              transition: "color 0.2s ease",
            }}
          >
            {variant === "email" ? <MailIcon /> : <LockIcon />}
          </span>

          {/* Input field */}
          <input
            {...props}
            ref={ref}
            id={id}
            type={inputType}
            disabled={disabled}
            style={{
              width: "100%",
              height: "48px",
              paddingLeft: "44px",
              paddingRight: isPassword ? "48px" : "16px",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
              color: "var(--foreground)",
              background: "var(--surface)",
              border: `1px solid ${error ? "var(--destructive)" : "var(--border)"}`,
              borderRadius: "10px",
              outline: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "text",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = error
                ? "var(--destructive)"
                : "var(--primary)";
              e.currentTarget.style.boxShadow = error
                ? "0 0 0 3px color-mix(in srgb, var(--destructive) 12%, transparent)"
                : "0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error
                ? "var(--destructive)"
                : "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          {/* Eye toggle — password only */}
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--foreground-subtle)",
                padding: "4px",
                borderRadius: "4px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--foreground-subtle)";
              }}
            >
              {showPassword ? <EyeClosed /> : <EyeOpen />}
            </button>
          )}
        </div>

        {/* Error or hint */}
        {(error || hint) && (
          <span
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-body)",
              color: error ? "var(--destructive)" : "var(--foreground-subtle)",
              paddingLeft: "2px",
            }}
          >
            {error ?? hint}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;

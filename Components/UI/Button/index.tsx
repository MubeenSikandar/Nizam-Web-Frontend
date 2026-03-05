import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-[family-name:var(--font-body)] font-medium",
  "rounded-lg border transition-all duration-200",
  "cursor-pointer select-none outline-none",
  "focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:pointer-events-none",
  "active:scale-[0.97]",
].join(" ");

const variants: Record<Variant, string> = {
  primary: [
    "bg-[var(--primary)] text-[var(--primary-foreground)]",
    "border-[var(--primary)]",
    "hover:bg-[var(--primary-hover)] hover:border-[var(--primary-hover)]",
    "shadow-sm hover:shadow-md hover:shadow-[color-mix(in_srgb,var(--primary)_25%,transparent)]",
  ].join(" "),
  secondary: [
    "bg-[var(--surface-raised)] text-[var(--foreground)]",
    "border-[var(--border)]",
    "hover:bg-[var(--surface)] hover:border-[var(--primary)]",
    "hover:text-[var(--primary)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--foreground-muted)]",
    "border-transparent",
    "hover:bg-[color-mix(in_srgb,var(--primary)_8%,transparent)]",
    "hover:text-[var(--primary)]",
  ].join(" "),
  outline: [
    "bg-transparent text-[var(--primary)]",
    "border-[var(--primary)]",
    "hover:bg-[color-mix(in_srgb,var(--primary)_8%,transparent)]",
  ].join(" "),
  destructive: [
    "bg-[var(--destructive)] text-white",
    "border-[var(--destructive)]",
    "hover:opacity-90",
    "shadow-sm",
  ].join(" "),
};

const sizes: Record<Size, string> = {
  sm: "h-8  px-3 text-xs  gap-1.5",
  md: "h-10 px-4 text-sm  gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

const Spinner = () => (
  <svg
    className="animate-spin"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <Spinner /> : icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}

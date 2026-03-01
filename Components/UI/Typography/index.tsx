import { JSX } from "react";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "subtitle"
  | "body"
  | "body-sm"
  | "caption"
  | "overline"
  | "code"
  | "label";

type Tag = keyof JSX.IntrinsicElements;

interface TypographyProps {
  variant?: Variant;
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  urdu?: boolean; // switches to Urdu-appropriate font + RTL
}

const variantStyles: Record<Variant, string> = {
  h1: "font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight leading-tight",
  h2: "font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight leading-snug",
  h3: "font-[family-name:var(--font-display)] text-2xl font-medium leading-snug",
  h4: "font-[family-name:var(--font-display)] text-xl font-medium leading-snug",
  h5: "font-[family-name:var(--font-display)] text-lg font-medium leading-normal",
  subtitle:
    "font-[family-name:var(--font-body)] text-base font-medium leading-relaxed",
  body: "font-[family-name:var(--font-body)] text-base font-normal leading-relaxed",
  "body-sm":
    "font-[family-name:var(--font-body)] text-sm font-normal leading-relaxed",
  caption:
    "font-[family-name:var(--font-body)] text-xs font-normal leading-normal",
  overline:
    "font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest",
  code: "font-mono text-sm",
  label: "font-[family-name:var(--font-body)] text-sm font-medium leading-none",
};

const variantColors: Record<Variant, string> = {
  h1: "text-[var(--foreground)]",
  h2: "text-[var(--foreground)]",
  h3: "text-[var(--foreground)]",
  h4: "text-[var(--foreground)]",
  h5: "text-[var(--foreground)]",
  subtitle: "text-[var(--foreground-muted)]",
  body: "text-[var(--foreground)]",
  "body-sm": "text-[var(--foreground-muted)]",
  caption: "text-[var(--foreground-subtle)]",
  overline: "text-[var(--foreground-subtle)]",
  code: "text-[var(--primary)] bg-[var(--surface-raised)] px-1.5 py-0.5 rounded",
  label: "text-[var(--foreground)]",
};

// Default HTML tag per variant
const defaultTag: Record<Variant, Tag> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  subtitle: "p",
  body: "p",
  "body-sm": "p",
  caption: "span",
  overline: "span",
  code: "code",
  label: "label",
};

const Typography = ({
  variant = "body",
  as,
  children,
  className = "",
  muted = false,
  urdu = false,
}: TypographyProps) => {
  const Tag = (as ?? defaultTag[variant]) as Tag;

  const colorClass = muted
    ? "text-[var(--foreground-muted)]"
    : variantColors[variant];

  const urduClass = urdu
    ? "font-[family-name:var(--font-urdu)] text-right leading-loose"
    : "";

  const combined = [variantStyles[variant], colorClass, urduClass, className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={combined}>{children}</Tag>;
};

export default Typography;

export interface FieldErrors {
  companyName?: string;
  slug?: string;
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const validateRegister = (data: {
  companyName: string;
  slug: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
}): FieldErrors => {
  const errors: FieldErrors = {};

  if (!data.companyName.trim())
    errors.companyName = "Company name is required.";

  if (!data.slug.trim()) errors.slug = "Workspace URL is required.";
  else if (!/^[a-z0-9-]+$/.test(data.slug))
    errors.slug = "Only lowercase letters, numbers, and hyphens.";

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";

  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";

  if (!data.password) errors.password = "Password is required.";
  else if (data.password.length < 8)
    errors.password = "Password must be at least 8 characters.";

  return errors;
};

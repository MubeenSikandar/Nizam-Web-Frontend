"use client";
import Typography from "@/components/UI/Typography";

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className = "",
}: DropdownProps) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <Typography variant="label">{label}</Typography>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-4 pr-10 py-3 rounded-lg bg-transparent border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

"use client";

import NizamLogo from "@/components/Logo";
import ThemeSwitch from "@/components/ThemeSwitch";
import Typography from "@/components/UI/Typography";

const NavLink = ({ label }: { label: string }) => (
  <Typography
    variant="h4"
    className="cursor-pointer transition-colors duration-200 hover:text-[var(--primary)] hover:opacity-80"
  >
    {label}
  </Typography>
);

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 rounded-full w-full glass">
      <div className="flex items-center justify-center gap-2">
        <NizamLogo />
        <div className="flex items-center justify-center gap-3">
          <Typography variant="h1">Nizam</Typography>
          <Typography variant="h4" urdu>
            ( نظام)
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-center w-[30%] gap-4">
        <div className="flex items-center justify-between w-full gap-3">
          <Typography
            variant="body"
            className="hover:text-primary cursor-pointer transform-3d duration-100 text-lg"
          >
            <li>Solution</li>
          </Typography>
          <Typography
            variant="body"
            className="hover:text-primary cursor-pointer transform-3d duration-100 text-lg"
          >
            <li>Support</li>
          </Typography>
          <Typography
            variant="body"
            className="hover:text-primary cursor-pointer transform-3d duration-100 text-lg"
          >
            <li>Security</li>
          </Typography>
        </div>
        <div className="flex items-center cursor-pointer justify-center gap-3">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;

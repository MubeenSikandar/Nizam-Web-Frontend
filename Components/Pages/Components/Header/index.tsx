"use client";

import NizamLogo from "@/Components/Logo";
import ThemeSwitch from "@/Components/ThemeSwitch";
import Typography from "@/Components/UI/Typography";
import LanguageSwitch from "@/Context/LanguageSwitch";
import { useLanguage } from "@/Context/LanguageContext";

const NavLink = ({ label }: { label: string }) => (
  <Typography
    variant="h4"
    className="cursor-pointer transition-colors duration-200 hover:text-[var(--primary)] hover:opacity-80"
  >
    {label}
  </Typography>
);

const Header = () => {
  const { t } = useLanguage();

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
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-between gap-3">
          <NavLink label={t("nav.solution")} />
          <NavLink label={t("nav.security")} />
          <NavLink label={t("nav.support")} />
        </div>
        <div className="flex items-center justify-center gap-3">
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;

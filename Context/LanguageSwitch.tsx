"use client";

import { useLanguage } from "./LanguageContext";

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <button
      onClick={toggleLanguage}
      aria-label={isUrdu ? "Switch to English" : "Switch to Urdu"}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "0",
        height: "36px",
        width: "80px",
        borderRadius: "999px",
        border: "1px solid var(--border)",
        background: "transparent",
        cursor: "pointer",
        transition: "border-color 0.25s ease, background 0.25s ease",
        outline: "none",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.background =
          "color-mix(in srgb, var(--primary) 6%, transparent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {/* Sliding pill — uses translateX so GPU handles the animation */}
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: "3px",
          width: "calc(50% - 7px)",
          height: "calc(100% - 6px)",
          borderRadius: "999px",
          background: "var(--primary)",
          opacity: 0.2,
          transform: isUrdu ? "translateX(calc(11px - 30%))" : "translateX(0)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* EN side */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          fontSize: "11px",
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          letterSpacing: "0.06em",
          color: !isUrdu ? "var(--primary)" : "var(--foreground-subtle)",
          transition: "color 0.25s ease",
          userSelect: "none",
        }}
      >
        EN
      </span>

      {/* Divider */}
      <span
        style={{
          width: "1px",
          height: "14px",
          background: "var(--border)",
          flexShrink: 0,
          zIndex: 1,
        }}
      />

      {/* UR side */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          fontSize: "13px",
          fontFamily: "var(--font-urdu, serif)",
          color: isUrdu ? "var(--primary)" : "var(--foreground-subtle)",
          transition: "color 0.25s ease",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        ار
      </span>
    </button>
  );
}

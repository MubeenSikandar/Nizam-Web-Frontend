"use client";
import { useEffect, useState } from "react";
import Typography from "@/components/UI/Typography";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastItemProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

const toastStyles: Record<ToastType, string> = {
  success: "border-green-500/30 bg-green-500/10",
  error: "border-red-500/30 bg-red-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
  info: "border-blue-500/30 bg-blue-500/10",
};

const toastTitleStyles: Record<ToastType, string> = {
  success: "text-green-400",
  error: "text-red-400",
  warning: "text-yellow-400",
  info: "text-blue-400",
};

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const iconStyles: Record<ToastType, string> = {
  success: "bg-green-500/20 text-green-400",
  error: "bg-red-500/20 text-red-400",
  warning: "bg-yellow-500/20 text-yellow-400",
  info: "bg-blue-500/20 text-blue-400",
};

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10);

    // Trigger leave animation before removal
    const leaveTimer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration ?? 4000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
    };
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`
        flex items-start gap-3 w-full max-w-sm p-4 rounded-xl border
        backdrop-blur-md shadow-lg
        transition-all duration-300 ease-out
        ${toastStyles[toast.type]}
        ${
          visible && !leaving
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`
          flex items-center justify-center rounded-full
          w-7 h-7 shrink-0 text-sm font-bold
          ${iconStyles[toast.type]}
        `}
      >
        {toastIcons[toast.type]}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <Typography
          variant="label"
          className={`${toastTitleStyles[toast.type]}`}
        >
          {toast.title}
        </Typography>
        {toast.message && (
          <Typography variant="caption" className="text-foreground-muted">
            {toast.message}
          </Typography>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          setLeaving(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="shrink-0 text-foreground-muted hover:text-foreground transition-colors duration-200 text-lg leading-none mt-0.5"
      >
        ×
      </button>
    </div>
  );
};

export default ToastItem;

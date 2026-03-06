"use client";
import { useToastStore } from "@/store/toastStore";
import ToastItem from ".";

const ToastContainer = () => {
  const { toasts, remove } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={remove} />
      ))}
    </div>
  );
};

export default ToastContainer;

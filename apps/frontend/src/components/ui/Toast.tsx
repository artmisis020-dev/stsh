import type { ToastType } from "../../hooks/useToast.js";

type ToastProps = {
  message: string;
  type: ToastType;
  onDismiss: () => void;
};

export function Toast({ message, type, onDismiss }: ToastProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className={`fixed right-6 top-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl shadow-black/50 transition-all ${
        isSuccess
          ? "border-emerald-400/30 bg-[var(--bg-surface)] text-emerald-200"
          : "border-[var(--accent-red)]/40 bg-[var(--bg-surface)] text-[var(--text-error)]"
      }`}
    >
      <span className="mt-0.5 shrink-0 text-base leading-none">
        {isSuccess ? "✓" : "✕"}
      </span>
      <p className="text-sm leading-6">{message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="ml-2 shrink-0 text-xs opacity-50 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}

import type { ButtonHTMLAttributes } from "react";
import { useI18n } from "../../i18n/I18nProvider";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPending?: boolean;
};

export function SubmitButton({
  children,
  isPending = false,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { messages } = useI18n();

  return (
    <button
      type="submit"
      disabled={disabled || isPending}
      className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
      {...props}
    >
      {isPending ? messages.ui.pendingAction : children}
    </button>
  );
}

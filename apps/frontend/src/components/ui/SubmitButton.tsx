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
      className="rounded-full bg-[var(--accent-gold)] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-gold-dark)] disabled:cursor-not-allowed disabled:bg-[var(--bg-disabled)] disabled:text-[var(--text-muted)]"
      {...props}
    >
      {isPending ? messages.ui.pendingAction : children}
    </button>
  );
}

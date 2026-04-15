import type { InputHTMLAttributes } from "react";

const INPUT_CLASS_NAME =
  "w-full rounded-2xl border border-[var(--border-main)] bg-black/40 px-4 py-3 text-sm text-[var(--text-main)] outline-none transition placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent-gold)]";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
  return <input className={INPUT_CLASS_NAME} {...props} />;
}

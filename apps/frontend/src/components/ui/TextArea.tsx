import type { TextareaHTMLAttributes } from "react";

const TEXTAREA_CLASS_NAME =
  "min-h-28 w-full rounded-2xl border border-[var(--border-main)] bg-black/40 px-4 py-3 text-sm text-[var(--text-main)] outline-none transition placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent-gold)]";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  return <textarea className={TEXTAREA_CLASS_NAME} {...props} />;
}

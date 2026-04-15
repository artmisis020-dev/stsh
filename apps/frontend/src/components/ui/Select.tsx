import type { SelectHTMLAttributes } from "react";

const SELECT_CLASS_NAME =
  "w-full rounded-2xl border border-[var(--border-main)] bg-black/40 px-4 py-3 text-sm text-[var(--text-main)] outline-none transition focus:border-[var(--accent-gold)]";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: SelectProps) {
  return <select className={SELECT_CLASS_NAME} {...props} />;
}

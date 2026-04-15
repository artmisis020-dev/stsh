import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-[var(--border-main)] bg-black/40 text-[var(--accent-gold)] focus:ring-[var(--accent-gold)]"
      {...props}
    />
  );
}

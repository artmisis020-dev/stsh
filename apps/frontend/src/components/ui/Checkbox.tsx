import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
      {...props}
    />
  );
}

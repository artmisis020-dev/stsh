import type { InputHTMLAttributes } from "react";

const INPUT_CLASS_NAME =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-cyan-400";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
  return <input className={INPUT_CLASS_NAME} {...props} />;
}

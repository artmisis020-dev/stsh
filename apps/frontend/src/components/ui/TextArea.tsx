import type { TextareaHTMLAttributes } from "react";

const TEXTAREA_CLASS_NAME =
  "min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-cyan-400";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  return <textarea className={TEXTAREA_CLASS_NAME} {...props} />;
}

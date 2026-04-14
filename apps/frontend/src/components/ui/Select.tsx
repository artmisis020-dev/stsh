import type { SelectHTMLAttributes } from "react";

const SELECT_CLASS_NAME =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-cyan-400";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: SelectProps) {
  return <select className={SELECT_CLASS_NAME} {...props} />;
}

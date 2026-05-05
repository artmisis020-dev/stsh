import type { ReactNode } from "react";

type FormFieldProps = {
  htmlFor: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ htmlFor, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--accent-khaki)]" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-[var(--text-error)]">{error}</p> : null}
    </div>
  );
}

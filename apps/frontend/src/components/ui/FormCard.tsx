import type { ReactNode } from "react";

type FormCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  aside?: ReactNode;
};

export function FormCard({
  eyebrow,
  title,
  description,
  children,
  aside,
}: FormCardProps) {
  return (
    <div className="grid gap-8 ">
      <section className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-surface)]/95 p-8 shadow-2xl shadow-black/45">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent-gold)]">{eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-main)]">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{description}</p>
        <div className="mt-8">{children}</div>
      </section>
      {aside ? (
        <aside className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-surface-soft)]/95 p-8">
          {aside}
        </aside>
      ) : null}
    </div>
  );
}

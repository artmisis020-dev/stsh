import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-surface)]/92 p-6 shadow-xl shadow-black/35">
      <h3 className="text-xl font-semibold text-[var(--text-main)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

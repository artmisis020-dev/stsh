import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

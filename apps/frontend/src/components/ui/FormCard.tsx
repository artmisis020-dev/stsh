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
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">{eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
        <div className="mt-8">{children}</div>
      </section>
      {aside ? (
        <aside className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          {aside}
        </aside>
      ) : null}
    </div>
  );
}

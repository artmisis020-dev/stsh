import type { ReactNode } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { Navigation } from "./Navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { messages } = useI18n();

  return (
    <main className="min-h-screen bg-[var(--bg-main)] px-6 py-12 text-[var(--text-main)]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-[var(--border-main)] bg-[var(--bg-surface)]/95 p-6 shadow-2xl shadow-black/50 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent-gold)]">
              {messages.ui.brandName}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-main)]">
              {messages.ui.brandSubtitle}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <LanguageSwitcher />
            <Navigation />
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

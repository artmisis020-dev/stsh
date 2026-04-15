import { Outlet, Link, useLocation } from "react-router-dom";
import { CapacityIndicatorSection } from "../components/admin/CapacityIndicatorSection.js";
import { AppShell } from "../components/layout/AppShell.js";
import { APP_ROUTES } from "../constants/routes.js";
import { useTerminalKitCapacity } from "../hooks/useTerminalKitCapacity.js";
import { useI18n } from "../i18n/I18nProvider.js";

export function AdminLayout() {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const terminalKitCapacityQuery = useTerminalKitCapacity();
  const location = useLocation();

  const isMainAdminPage = location.pathname === APP_ROUTES.admin;

  return (
    <AppShell>
      <div className="flex gap-2">
        <div className="flex-2 rounded-3xl border border-[var(--border-main)] bg-[var(--bg-surface)]/95 p-8 shadow-2xl shadow-black/45">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent-gold)]">
                {isMainAdminPage ? pageCopy.eyebrow : pageCopy.historyEyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-main)]">
                {isMainAdminPage ? pageCopy.title : pageCopy.historyTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--text-muted)]">
                {isMainAdminPage ? pageCopy.description : pageCopy.historyDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <CapacityIndicatorSection capacity={terminalKitCapacityQuery.data ?? null} />
        </div>
      </div>

      {isMainAdminPage && (
        <div className="mt-4 flex gap-4">
          <Link
            className="rounded-full border border-[var(--border-main)] bg-black/30 px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
            to={APP_ROUTES.adminHistory}
          >
            {pageCopy.openHistoryLabel}
          </Link>
          <Link
            className="rounded-full border border-[var(--border-main)] bg-black/30 px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
            to={APP_ROUTES.adminListOfTerminalKits}
          >
            {pageCopy.openTerminalKITSLabel}
          </Link>
          <Link
            className="rounded-full border border-[var(--border-main)] bg-black/30 px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
            to={APP_ROUTES.adminListOfUsers}
          >
            {pageCopy.openUsersPageLabel}
          </Link>
        </div>
      )}

      {!isMainAdminPage && (
        <div className="mt-4 flex gap-4">
          <Link
            className="rounded-full border border-[var(--border-main)] bg-black/30 px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
            to={APP_ROUTES.admin}
          >
            {pageCopy.backToAdminLabel}
          </Link>
        </div>
      )}

      <div className="mt-8">
        <Outlet />
      </div>
    </AppShell>
  );
}

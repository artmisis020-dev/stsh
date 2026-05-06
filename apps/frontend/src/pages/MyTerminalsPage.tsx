import type { TerminalKitDto } from "@starshield/shared";
import { AppShell } from "../components/layout/AppShell";
import { SectionCard } from "../components/ui/SectionCard";
import { CopyButton } from "../components/ui/CopyButton";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useTerminalKitsByUserId } from "../hooks/useTerminalKitsByUserId";
import { useI18n } from "../i18n/I18nProvider";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function MyTerminalsPage() {
  const { messages } = useI18n();
  const { data, isLoading } = useTerminalKitsByUserId();
  const terminalKits: TerminalKitDto[] = data ?? [];
  const { copiedValue, copyToClipboard } = useCopyToClipboard();
  const pageCopy = messages.client.terminalsPage;
  const adminCopy = messages.admin.page;
  const uiCopy = messages.ui;

  return (
    <AppShell>
      <SectionCard title={pageCopy.title} description={pageCopy.description}>
        {isLoading ? (
          <p className="text-sm text-slate-400">{uiCopy.pendingAction}</p>
        ) : terminalKits.length === 0 ? (
          <p className="text-sm text-slate-400">{pageCopy.emptyTerminals}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="pb-3 pr-4">{adminCopy.terminalKitColumnLabel}</th>
                  <th className="pb-3 pr-4">{adminCopy.currentStateColumnLabel}</th>
                  <th className="pb-3 pr-4">{uiCopy.createdAtLabel}</th>
                  <th className="pb-3">{adminCopy.updatedAtColumnLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {terminalKits.map((kit) => (
                  <tr key={kit.id} className="align-top">
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-white">{kit.terminalKit}</span>
                        <CopyButton
                          label={copiedValue === kit.terminalKit ? uiCopy.copiedLabel : uiCopy.copyLabel}
                          onClick={() => copyToClipboard(kit.terminalKit)}
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-slate-300">
                      {kit.currentState ?? adminCopy.unknownStateLabel}
                    </td>
                    <td className="py-4 pr-4 text-slate-400">{formatDate(kit.createdAt)}</td>
                    <td className="py-4 text-slate-400">{formatDate(kit.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </AppShell>
  );
}

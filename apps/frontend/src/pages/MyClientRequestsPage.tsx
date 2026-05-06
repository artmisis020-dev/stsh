import { ActionStatus } from "@starshield/shared";
import type { ClientRequestDto, TerminalKitActionDto } from "@starshield/shared";
import { AppShell } from "../components/layout/AppShell";
import { SectionCard } from "../components/ui/SectionCard";
import { CopyButton } from "../components/ui/CopyButton";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useMyClientRequests } from "../hooks/useMyClientRequests";
import { useI18n } from "../i18n/I18nProvider";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function deriveStatus(actions: TerminalKitActionDto[], copy: {
  statusCompleted: string;
  statusFailed: string;
  statusWithProvider: string;
  statusPending: string;
}): string {
  if (actions.length === 0) return copy.statusPending;
  if (actions.every((a) => a.status === ActionStatus.Completed)) return copy.statusCompleted;
  if (actions.some((a) => a.status === ActionStatus.Failed)) return copy.statusFailed;
  if (actions.some((a) => a.status === ActionStatus.PendingProvider)) return copy.statusWithProvider;
  return copy.statusPending;
}

export function MyClientRequestsPage() {
  const { messages } = useI18n();
  const { data, isLoading } = useMyClientRequests();
  const requests: ClientRequestDto[] = data ?? [];
  const { copiedValue, copyToClipboard } = useCopyToClipboard();
  const pageCopy = messages.client.requestsPage;
  const uiCopy = messages.ui;

  return (
    <AppShell>
      <SectionCard title={pageCopy.title} description={pageCopy.description}>
        {isLoading ? (
          <p className="text-sm text-slate-400">{uiCopy.pendingAction}</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-slate-400">{pageCopy.emptyRequests}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="pb-3 pr-4">{uiCopy.clientRequestLabel}</th>
                  <th className="pb-3 pr-4">{uiCopy.statusLabel}</th>
                  <th className="pb-3 pr-4">{pageCopy.actionsCountLabel}</th>
                  <th className="pb-3 pr-4">{uiCopy.createdAtLabel}</th>
                  <th className="pb-3">{uiCopy.updatedAtLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {requests.map((req) => (
                  <tr key={req.id} className="align-top">
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-white">{req.id.slice(0, 8)}…</span>
                        <CopyButton
                          label={copiedValue === req.id ? uiCopy.copiedLabel : uiCopy.copyLabel}
                          onClick={() => copyToClipboard(req.id)}
                        />
                      </div>
                      {req.comment ? (
                        <p className="mt-1 max-w-xs truncate text-xs text-slate-400">{req.comment}</p>
                      ) : null}
                    </td>
                    <td className="py-4 pr-4 text-slate-300">
                      {deriveStatus(req.actions, pageCopy)}
                    </td>
                    <td className="py-4 pr-4 text-slate-400">{req.actions.length}</td>
                    <td className="py-4 pr-4 text-slate-400">{formatDate(req.createdAt)}</td>
                    <td className="py-4 text-slate-400">{formatDate(req.updatedAt)}</td>
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

import type { TerminalKitActionHistoryDto } from "@starshield/shared";
import { useI18n } from "../../i18n/I18nProvider";
import { CopyButton } from "../ui/CopyButton";
import { SectionCard } from "../ui/SectionCard";

type ActionHistorySectionProps = {
  actions: TerminalKitActionHistoryDto[];
  copiedValue: string | null;
  onCopy: (value: string) => void;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function ActionHistorySection({
  actions,
  copiedValue,
  onCopy,
}: ActionHistorySectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;

  return (
    <SectionCard
      title={pageCopy.historySectionTitle}
      description={pageCopy.historySectionDescription}
    >
      {actions.length === 0 ? (
        <p className="text-sm text-slate-400">{pageCopy.emptyHistory}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="pb-3 pr-4">{pageCopy.terminalKitColumnLabel}</th>
                <th className="pb-3 pr-4">{messages.ui.clientRequestLabel}</th>
                <th className="pb-3 pr-4">{pageCopy.dateColumnLabel}</th>
                <th className="pb-3 pr-4">{pageCopy.previousStateColumnLabel}</th>
                <th className="pb-3">{pageCopy.nextStateColumnLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {actions.map((action) => (
                <tr key={action.id} className="align-top">
                  <td className="py-4 pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-white">{action.terminalKit}</span>
                      <CopyButton
                        label={
                          copiedValue === action.terminalKit
                            ? messages.ui.copiedLabel
                            : messages.ui.copyLabel
                        }
                        onClick={() => onCopy(action.terminalKit)}
                      />
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-slate-300">{action.clientRequestId}</td>
                  <td className="py-4 pr-4 text-slate-400">{formatDate(action.createdAt)}</td>
                  <td className="py-4 pr-4 text-slate-300">
                    {action.previousState ?? pageCopy.unknownStateLabel}
                  </td>
                  <td className="py-4 text-slate-300">
                    {action.resultingState ?? pageCopy.unknownStateLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}

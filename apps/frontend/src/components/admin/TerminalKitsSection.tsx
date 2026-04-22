import type { TerminalKitDto } from "@starshield/shared";
import { useI18n } from "../../i18n/I18nProvider.js";
import { CopyButton } from "../ui/CopyButton.js";
import { SectionCard } from "../ui/SectionCard.js";

type TerminalKitsSectionProps = {
  terminalKits: TerminalKitDto[];
  copiedValue: string | null;
  onCopy: (value: string) => void;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function TerminalKitsSection({
  terminalKits,
  copiedValue,
  onCopy,
}: TerminalKitsSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;

  return (
    <SectionCard
      title={pageCopy.terminalKitsSectionTitle}
      description={pageCopy.terminalKitsSectionDescription}
    >
      {terminalKits.length === 0 ? (
        <p className="text-sm text-slate-400">{pageCopy.emptyTerminalKits}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="pb-3 pr-4">{pageCopy.terminalKitColumnLabel}</th>
                <th className="pb-3 pr-4">{pageCopy.currentStateColumnLabel}</th>
                <th className="pb-3">{pageCopy.updatedAtColumnLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {terminalKits.map((terminalKit) => (
                <tr key={terminalKit.id} className="align-top">
                  <td className="py-4 pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-white">{terminalKit.terminalKit}</span>
                      <CopyButton
                        label={
                          copiedValue === terminalKit.terminalKit
                            ? messages.ui.copiedLabel
                            : messages.ui.copyLabel
                        }
                        onClick={() => onCopy(terminalKit.terminalKit)}
                      />
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-slate-300">
                    {terminalKit.currentState ?? pageCopy.unknownStateLabel}
                  </td>
                  <td className="py-4 text-slate-400">{formatDate(terminalKit.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}

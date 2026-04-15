import { ActionHistorySection } from "../components/admin/ActionHistorySection.js";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { useTerminalKitActionHistory } from "../hooks/useTerminalKitActionHistory.js";

export function AdminHistoryPage() {
  const historyQuery = useTerminalKitActionHistory();
  const { copiedValue, copyToClipboard } = useCopyToClipboard();


  return (
    <ActionHistorySection
      actions={historyQuery.data ?? []}
      copiedValue={copiedValue}
      onCopy={copyToClipboard}
    />
  );
}

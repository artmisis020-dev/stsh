import { TerminalKitsSection } from "../components/admin/TerminalKitsSection.js";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { useTerminalKits } from "../hooks/useTerminalKits.js";

export const AdminTerminalsPage = () => {
    const terminalKitsQuery = useTerminalKits();
    const { copiedValue, copyToClipboard } = useCopyToClipboard();

    return (
        <div>
            <TerminalKitsSection
                terminalKits={terminalKitsQuery.data ?? []}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
            />

        </div>
    );
}
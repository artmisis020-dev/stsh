import { TerminalKitsSection } from "../components/admin/TerminalKitsSection.js";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";
import { useTerminalKits } from "../hooks/useTerminalKits.js";

export const AdminTerminalsPage = () => {
    const terminalKitsQuery = useTerminalKits();
    const { copiedValue, copyToClipboard } = useCopyToClipboard();

    return (
        <div>
            <h2 className="text-3xl font-bold text-[var(--text-main)]">Terminal KITs</h2>
            <TerminalKitsSection
                terminalKits={terminalKitsQuery.data ?? []}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
            />

        </div>
    );
}
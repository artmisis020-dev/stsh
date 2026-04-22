import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export const TerminalKitActionCell = ({
    handleActionClick,
    isSelected,
    isSingleSelection = false,
}: {
    handleActionClick: () => void;
    isSelected: boolean;
    isSingleSelection?: boolean;
}) => {

    const removeLabel = isSingleSelection ? "Remove from selection" : "Remove all";
    const addLabel = isSingleSelection ? "Add to selection" : "Add all";
    return (
        <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xs border border-[var(--border-main)]  text-[var(--accent-gold)] transition hover:border-[var(--accent-gold)] cursor-pointer"
            onClick={handleActionClick}
            aria-label={
                isSelected
                    ? removeLabel
                    : addLabel
            }
            title={isSelected ? removeLabel : addLabel}
        >
            {isSelected ? (
                <MinusIcon className="h-4 w-4" />
            ) : (
                <PlusIcon className="h-4 w-4" />
            )}
        </button>
    )
}
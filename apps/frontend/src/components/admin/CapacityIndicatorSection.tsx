import type { TerminalKitCapacityDto } from "@starshield/shared";
import { useI18n } from "../../i18n/I18nProvider.js";
import { SectionCard } from "../ui/SectionCard.js";

type CapacityIndicatorSectionProps = {
  capacity: TerminalKitCapacityDto | null;
};

export function CapacityIndicatorSection({ capacity }: CapacityIndicatorSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const activeCount = capacity?.activeCount ?? 0;
  const limit = capacity?.limit ?? 150;
  const remaining = capacity?.remaining ?? limit;

  return (
    <SectionCard
      title={pageCopy.capacitySectionTitle}
      description={pageCopy.capacitySectionDescription}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-semibold tracking-tight text-[var(--text-main)]">
              {activeCount}
              <span className="ml-2 text-lg text-[var(--text-muted)]">/ {limit}</span>
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {pageCopy.capacityRemainingLabel}: {remaining}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

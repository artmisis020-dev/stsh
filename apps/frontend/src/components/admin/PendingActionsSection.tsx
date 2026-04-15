import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { TerminalKitActionDto } from "@starshield/shared";
import {
  PROVIDER_REQUEST_DEFAULT_VALUES,
} from "../../constants/admin.js";
import { useI18n } from "../../i18n/I18nProvider.js";
import type { ProviderRequestCreateFormValues } from "../../types/admin.js";
import { Checkbox } from "../ui/Checkbox.js";
import { CopyButton } from "../ui/CopyButton.js";
import { FormField } from "../ui/FormField.js";
import { SectionCard } from "../ui/SectionCard.js";
import { SubmitButton } from "../ui/SubmitButton.js";
import { TextArea } from "../ui/TextArea.js";
import { TextInput } from "../ui/TextInput.js";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";

type PendingActionsSectionProps = {
  actions: TerminalKitActionDto[];
  isSubmitting: boolean;
  onCreateProviderRequest: (values: ProviderRequestCreateFormValues) => void;
};

export function PendingActionsSection({
  actions,
  isSubmitting,
  onCreateProviderRequest,
}: PendingActionsSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<{ externalId: string; comment?: string }>({
    defaultValues: PROVIDER_REQUEST_DEFAULT_VALUES,
  });
  const externalIdValue = watch("externalId");
  const selectedCount = useMemo(() => selectedActionIds.length, [selectedActionIds]);
  const { copiedValue, copyToClipboard } = useCopyToClipboard();


  const toggleSelection = (actionId: string) => {
    setSelectedActionIds((current) =>
      current.includes(actionId)
        ? current.filter((id) => id !== actionId)
        : [...current, actionId],
    );
  };

  const submit = ({ externalId, comment }: { externalId: string; comment?: string }) => {
    onCreateProviderRequest({
      externalId,
      actionIds: selectedActionIds,
      comment,
    });
    reset(PROVIDER_REQUEST_DEFAULT_VALUES);
    setSelectedActionIds([]);
  };
  console.log('externalIdValue', !externalIdValue)
  return (
    <SectionCard
      title={pageCopy.actionsSectionTitle}
      description={pageCopy.actionsSectionDescription}
    >
      {actions.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">{pageCopy.emptyActions}</p>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            {actions.map((action) => (
              <label
                key={action.id}
                className="flex cursor-pointer items-start gap-4 rounded-2xl border border-[var(--border-main)] bg-black/35 p-4 transition hover:border-[var(--accent-khaki)]"
              >
                <Checkbox
                  checked={selectedActionIds.includes(action.id)}
                  onChange={() => toggleSelection(action.id)}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-[var(--text-main)]">{action.actionType}</p>
                    <span className="rounded-full border border-[var(--border-main)] bg-[var(--bg-surface-soft)] px-2 py-1 text-xs text-[var(--accent-khaki)]">
                      {messages.ui.statusLabel}: {action.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--accent-khaki)]">{messages.ui.actionIdLabel}:</span>
                      <span className="break-all">{action.id}</span>
                      <CopyButton
                        label={copiedValue === action.id ? messages.ui.copiedLabel : messages.ui.copyLabel}
                        onClick={() => copyToClipboard(action.id)}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--accent-khaki)]">{messages.ui.terminalKitIdLabel}:</span>
                      <span className="break-all">{action.terminalKitId}</span>
                      <CopyButton
                        label={copiedValue === action.terminalKitId ? messages.ui.copiedLabel : messages.ui.copyLabel}
                        onClick={() => copyToClipboard(action.terminalKitId)}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--accent-khaki)]">{messages.ui.clientRequestLabel}:</span>
                      <span className="break-all">{action.clientRequestId}</span>
                      <CopyButton
                        label={copiedValue === action.clientRequestId ? messages.ui.copiedLabel : messages.ui.copyLabel}
                        onClick={() => copyToClipboard(action.clientRequestId)}
                      />
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <FormField
              htmlFor="externalId"
              label={pageCopy.externalIdLabel}
              error={errors.externalId?.message}
            >
              <TextInput
                id="externalId"
                placeholder={pageCopy.externalIdPlaceholder}
                {...register("externalId", {
                  required: pageCopy.externalIdRequiredMessage,
                })}
              />
            </FormField>
            <FormField
              htmlFor="comment"
              label={pageCopy.commentLabel}
            >
              <TextArea
                id="comment"
                placeholder={pageCopy.commentPlaceholder}
                {...register("comment")}
              />
            </FormField>
            <p className="text-sm text-[var(--text-muted)]">{pageCopy.selectedActionsLabel}: {selectedCount}</p>
            <SubmitButton
              isPending={isSubmitting}
              disabled={selectedCount === 0 || !externalIdValue.trim()}
            >
              {pageCopy.createProviderRequestLabel}
            </SubmitButton>
          </form>
        </div>
      )}
    </SectionCard>
  );
}

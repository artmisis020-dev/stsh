import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { IdActionDto } from "@starshield/shared";
import {
  PROVIDER_REQUEST_DEFAULT_VALUES,
} from "../../constants/admin";
import { useI18n } from "../../i18n/I18nProvider";
import type { ProviderRequestCreateFormValues } from "../../types/admin";
import { Checkbox } from "../ui/Checkbox";
import { FormField } from "../ui/FormField";
import { SectionCard } from "../ui/SectionCard";
import { SubmitButton } from "../ui/SubmitButton";
import { TextInput } from "../ui/TextInput";

type PendingActionsSectionProps = {
  actions: IdActionDto[];
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
  } = useForm<{ externalId: string }>({
    defaultValues: PROVIDER_REQUEST_DEFAULT_VALUES,
  });

  const selectedCount = useMemo(() => selectedActionIds.length, [selectedActionIds]);

  const toggleSelection = (actionId: string) => {
    setSelectedActionIds((current) =>
      current.includes(actionId)
        ? current.filter((id) => id !== actionId)
        : [...current, actionId],
    );
  };

  const submit = ({ externalId }: { externalId: string }) => {
    onCreateProviderRequest({
      externalId,
      actionIds: selectedActionIds,
    });
    reset(PROVIDER_REQUEST_DEFAULT_VALUES);
    setSelectedActionIds([]);
  };

  return (
    <SectionCard
      title={pageCopy.actionsSectionTitle}
      description={pageCopy.actionsSectionDescription}
    >
      {actions.length === 0 ? (
        <p className="text-sm text-slate-400">{pageCopy.emptyActions}</p>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            {actions.map((action) => (
              <label
                key={action.id}
                className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <Checkbox
                  checked={selectedActionIds.includes(action.id)}
                  onChange={() => toggleSelection(action.id)}
                />
                <div className="min-w-0">
                  <p className="font-medium text-white">{action.actionType}</p>
                  <p className="mt-1 break-all text-sm text-slate-400">
                    {messages.ui.actionIdLabel}: {action.id}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {messages.ui.statusLabel}: {action.status} • {messages.ui.clientRequestLabel}: {action.clientRequestId}
                  </p>
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
            <p className="text-sm text-slate-400">{pageCopy.selectedActionsLabel}: {selectedCount}</p>
            <SubmitButton
              isPending={isSubmitting}
              disabled={selectedCount === 0}
            >
              {pageCopy.createProviderRequestLabel}
            </SubmitButton>
          </form>
        </div>
      )}
    </SectionCard>
  );
}

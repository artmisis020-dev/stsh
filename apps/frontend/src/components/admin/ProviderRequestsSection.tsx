import { useForm } from "react-hook-form";
import type { ProviderRequestDto } from "@starshield/shared";
import {
  PROVIDER_RESULT_DEFAULT_VALUES,
} from "../../constants/admin";
import { IdState } from "@starshield/shared";
import { useI18n } from "../../i18n/I18nProvider";
import type { ProviderResultFormValues } from "../../types/admin";
import { FormField } from "../ui/FormField";
import { SectionCard } from "../ui/SectionCard";
import { Select } from "../ui/Select";
import { SubmitButton } from "../ui/SubmitButton";
import { TextInput } from "../ui/TextInput";

type ProviderRequestsSectionProps = {
  providerRequests: ProviderRequestDto[];
  isSubmitting: boolean;
  onSubmitProviderResult: (values: ProviderResultFormValues) => void;
};

export function ProviderRequestsSection({
  providerRequests,
  isSubmitting,
  onSubmitProviderResult,
}: ProviderRequestsSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const resultStateOptions = [
    { label: messages.admin.resultStates.active, value: IdState.Active },
    { label: messages.admin.resultStates.deactivatedTemp, value: IdState.DeactivatedTemp },
    { label: messages.admin.resultStates.deactivatedPerm, value: IdState.DeactivatedPerm },
  ];
  const { register, handleSubmit, reset } = useForm<ProviderResultFormValues>({
    defaultValues: PROVIDER_RESULT_DEFAULT_VALUES,
  });

  const submit = (values: ProviderResultFormValues) => {
    onSubmitProviderResult(values);
    reset(PROVIDER_RESULT_DEFAULT_VALUES);
  };

  return (
    <SectionCard
      title={pageCopy.providerRequestsSectionTitle}
      description={pageCopy.providerRequestsSectionDescription}
    >
      <div className="space-y-6">
        {providerRequests.length === 0 ? (
          <p className="text-sm text-slate-400">{pageCopy.emptyProviderRequests}</p>
        ) : (
          <div className="space-y-3">
            {providerRequests.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <p className="font-medium text-white">{request.externalId}</p>
                <p className="mt-1 break-all text-sm text-slate-400">
                  {messages.ui.providerRequestIdLabel}: {request.id}
                </p>
                <p className="mt-1 text-sm text-slate-400">{messages.ui.statusLabel}: {request.status}</p>
              </div>
            ))}
          </div>
        )}

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
          <FormField
            htmlFor="providerRequestId"
            label={pageCopy.providerRequestIdLabel}
          >
            <TextInput
              id="providerRequestId"
              placeholder={pageCopy.providerRequestIdPlaceholder}
              {...register("providerRequestId", { required: pageCopy.providerRequestIdRequiredMessage })}
            />
          </FormField>

          <FormField htmlFor="actionId" label={pageCopy.actionIdLabel}>
            <TextInput
              id="actionId"
              placeholder={pageCopy.actionIdPlaceholder}
              {...register("actionId", { required: pageCopy.actionIdRequiredMessage })}
            />
          </FormField>

          <FormField htmlFor="resultingState" label={pageCopy.resultingStateLabel}>
            <Select id="resultingState" {...register("resultingState")}>
              {resultStateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>

          <label className="flex items-center gap-3 self-end rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
              {...register("success")}
            />
            {pageCopy.successLabel}
          </label>

          <div className="md:col-span-2">
            <SubmitButton isPending={isSubmitting}>
              {pageCopy.submitResultLabel}
            </SubmitButton>
          </div>
        </form>
      </div>
    </SectionCard>
  );
}

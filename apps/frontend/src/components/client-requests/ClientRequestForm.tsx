import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ActionType, type SubmitClientRequestDto } from "@starshield/shared";
import {
  CLIENT_REQUEST_DEFAULT_VALUES,
  isValidKitId,
  normalizeKitId,
} from "../../constants/client-request";
import { useI18n } from "../../i18n/I18nProvider";
import { FormCard } from "../ui/FormCard";
import { FormField } from "../ui/FormField";
import { Select } from "../ui/Select";
import { StatusPill } from "../ui/StatusPill";
import { SubmitButton } from "../ui/SubmitButton";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";

type ClientRequestFormProps = {
  healthStatusLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: SubmitClientRequestDto) => void;
};

export function ClientRequestForm({
  healthStatusLabel,
  isSubmitting,
  onSubmit,
}: ClientRequestFormProps) {
  const { messages } = useI18n();
  const pageCopy = messages.clientRequest.page;
  const actionTypeOptions = [
    { label: messages.clientRequest.actionTypes.activate, value: ActionType.Activate },
    { label: messages.clientRequest.actionTypes.deactivateTemp, value: ActionType.DeactivateTemp },
    { label: messages.clientRequest.actionTypes.deactivatePerm, value: ActionType.DeactivatePerm },
  ];
  const [payloadPreview, setPayloadPreview] = useState<SubmitClientRequestDto | null>(null);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmitClientRequestDto>({
    defaultValues: CLIENT_REQUEST_DEFAULT_VALUES,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "actions",
  });
  const watchedActions = watch("actions");
  const lastAction = watchedActions[watchedActions.length - 1];
  const isLastIdValid = isValidKitId(lastAction?.idValue ?? "");

  const handleAddId = () => {
    if (!isLastIdValid) {
      return;
    }

    append({
      idValue: "",
      actionType: lastAction?.actionType ?? CLIENT_REQUEST_DEFAULT_VALUES.actions[0].actionType,
    });
  };

  const handleFormSubmit = (values: SubmitClientRequestDto) => {
    setPayloadPreview(values);
    onSubmit(values);
  };

  return (
    <FormCard
      eyebrow={pageCopy.eyebrow}
      title={pageCopy.title}
      description={pageCopy.description}
      aside={
        <div>
          <h3 className="text-lg font-semibold text-white">{pageCopy.previewTitle}</h3>
          <p className="mt-2 text-sm text-slate-400">{pageCopy.previewDescription}</p>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-cyan-200">
            {payloadPreview
              ? JSON.stringify(payloadPreview, null, 2)
              : messages.ui.idlePreview}
          </pre>
        </div>
      }
    >
      <div className="mb-6">
        <StatusPill label={messages.ui.apiHealth} value={healthStatusLabel} />
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField
          htmlFor="comment"
          label={pageCopy.commentLabel}
          error={errors.comment?.message}
        >
          <TextArea
            id="comment"
            placeholder={pageCopy.commentPlaceholder}
            {...register("comment")}
          />
        </FormField>

        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{pageCopy.idsSectionTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {pageCopy.idsSectionDescription}
            </p>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-3xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
                  <FormField
                    htmlFor={`idValue-${field.id}`}
                    label={`${pageCopy.idValueLabel} ${index + 1}`}
                    error={errors.actions?.[index]?.idValue?.message}
                  >
                    <TextInput
                      id={`idValue-${field.id}`}
                      placeholder={pageCopy.idValuePlaceholder}
                      {...register(`actions.${index}.idValue`, {
                        required: pageCopy.idRequiredMessage,
                        validate: (value) => {
                          if (!isValidKitId(value)) {
                            return pageCopy.idFormatMessage;
                          }

                          return true;
                        },
                        setValueAs: normalizeKitId,
                      })}
                    />
                  </FormField>

                  <FormField
                    htmlFor={`actionType-${field.id}`}
                    label={pageCopy.actionTypeLabel}
                  >
                    <Select
                      id={`actionType-${field.id}`}
                      {...register(`actions.${index}.actionType`)}
                    >
                      {actionTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <div className="flex items-end">
                    <button
                      type="button"
                      className="rounded-full border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-rose-300 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      {pageCopy.removeIdLabel}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!isLastIdValid}
            onClick={handleAddId}
          >
            {pageCopy.addIdLabel}
          </button>
        </section>

        <div>
          <SubmitButton isPending={isSubmitting}>{pageCopy.submitLabel}</SubmitButton>
        </div>
      </form>
    </FormCard>
  );
}

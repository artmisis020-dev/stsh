import { useFieldArray, useForm } from "react-hook-form";
import { ActionType, type SubmitClientRequestDto } from "@starshield/shared";
import {
  CLIENT_REQUEST_DEFAULT_VALUES,
  isValidKitId,
  normalizeKitId,
} from "../../constants/client-request.js";
import { useI18n } from "../../i18n/I18nProvider.js";
import { FormCard } from "../ui/FormCard.js";
import { FormField } from "../ui/FormField.js";
import { Select } from "../ui/Select.js";
import { StatusPill } from "../ui/StatusPill.js";
import { SubmitButton } from "../ui/SubmitButton.js";
import { TextArea } from "../ui/TextArea.js";
import { TextInput } from "../ui/TextInput.js";

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
  const isLastTerminalKitValid = isValidKitId(lastAction?.terminalKit ?? "");

  const handleAddId = () => {
    if (!isLastTerminalKitValid) {
      return;
    }

    append({
      terminalKit: "KIT",
      actionType: lastAction?.actionType ?? CLIENT_REQUEST_DEFAULT_VALUES.actions[0].actionType,
    });
  };

  const handleFormSubmit = (values: SubmitClientRequestDto) => {
    onSubmit(values);
  };

  return (
    <FormCard
      eyebrow={pageCopy.eyebrow}
      title={pageCopy.title}
      description={pageCopy.description}

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
            <h3 className="text-lg font-semibold text-white">
              {pageCopy.terminalKitsSectionTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {pageCopy.terminalKitsSectionDescription}
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
                    htmlFor={`terminalKit-${field.id}`}
                    label={`${pageCopy.terminalKitLabel} ${index + 1}`}
                    error={errors.actions?.[index]?.terminalKit?.message}
                  >
                    <TextInput
                      id={`terminalKit-${field.id}`}
                      placeholder={pageCopy.terminalKitPlaceholder}
                      {...register(`actions.${index}.terminalKit`, {
                        required: pageCopy.terminalKitRequiredMessage,
                        validate: (value) => {
                          if (!isValidKitId(value)) {
                            return pageCopy.terminalKitFormatMessage;
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
            disabled={!isLastTerminalKitValid}
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

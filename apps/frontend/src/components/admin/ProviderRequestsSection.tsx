import { Fragment, useState } from "react";
import { ActionType, TerminalKitState, type ProviderRequestDto, type ClientRequestDto } from "@starshield/shared";
import {
  PROVIDER_RESULT_DEFAULT_VALUES,
} from "../../constants/admin.js";
import { useI18n } from "../../i18n/I18nProvider.js";
import type { ProviderResultFormValues } from "../../types/admin.js";
import { SectionCard } from "../ui/SectionCard.js";
import { useForm } from "react-hook-form";

type ProviderRequestsSectionProps = {
  providerRequests: ProviderRequestDto[];
  isSubmitting: boolean;
  onSubmitProviderResult: (values: ProviderResultFormValues) => void;
  clientRequests: ClientRequestDto[];

};

export function ProviderRequestsSection({
  providerRequests,
  clientRequests,
  isSubmitting,
  onSubmitProviderResult,
}: ProviderRequestsSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const [expandedRequestIds, setExpandedRequestIds] = useState<Set<string>>(new Set());
  const resultStateOptions = [
    { label: messages.admin.resultStates.active, value: TerminalKitState.Active },
    { label: messages.admin.resultStates.deactivatedTemp, value: TerminalKitState.DeactivatedTemp },
    { label: messages.admin.resultStates.deactivatedPerm, value: TerminalKitState.DeactivatedPerm },
  ];
  const { register, handleSubmit, reset } = useForm<ProviderResultFormValues>({
    defaultValues: PROVIDER_RESULT_DEFAULT_VALUES,
  });

  const toggleRequestExpansion = (id: string) => {
    setExpandedRequestIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getResultingStateForAction = (actionType: ActionType): TerminalKitState => {
    switch (actionType) {
      case ActionType.Activate:
        return TerminalKitState.Active;
      case ActionType.DeactivateTemp:
        return TerminalKitState.DeactivatedTemp;
      case ActionType.DeactivatePerm:
        return TerminalKitState.DeactivatedPerm;
    }
  };

  const formatState = (value: TerminalKitState | null): string => {
    if (!value) {
      return "—";
    }

    return value
      .split("_")
      .map((segment) => segment[0].toUpperCase() + segment.slice(1))
      .join(" ");
  };

  const formatActionType = (value: ActionType): string =>
    value[0].toUpperCase() + value.slice(1).replace(/([A-Z])/g, " $1");

  const displayTerminalKit = (requestAction: ProviderRequestDto["actions"][number]) =>
    requestAction.terminalKit;

  const handleMarkActionResult = (
    requestId: string,
    action: ProviderRequestDto["actions"][number],
    success: boolean,
  ) => {
    onSubmitProviderResult({
      providerRequestId: requestId,
      actionId: action.id,
      success,
      resultingState: success
        ? getResultingStateForAction(action.actionType)
        : action.previousState ?? TerminalKitState.Active,
    });
  };

  const submit = (values: ProviderResultFormValues) => {
    onSubmitProviderResult(values);
    reset(PROVIDER_RESULT_DEFAULT_VALUES);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    {pageCopy.providerRequestTableIdHeader}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    {pageCopy.providerRequestTableDateCreatedHeader}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    {pageCopy.providerRequestTableDateUpdatedHeader}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    {pageCopy.providerRequestTableStatusHeader}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                    {pageCopy.providerRequestTableCommentHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {providerRequests.map((request, index) => (
                  <Fragment key={`${request.id}-group`}>
                    <tr
                      key={`${request.id}-summary`}
                      className={
                        index % 2 === 0
                          ? "border-b border-slate-800"
                          : "border-b border-slate-800 bg-slate-950/30"
                      }
                    >
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-left text-slate-300 hover:text-white"
                          onClick={() => toggleRequestExpansion(request.id)}
                        >
                          <span
                            className={`inline-block transition-transform ${expandedRequestIds.has(request.id) ? "rotate-90" : ""
                              }`}
                          >
                            ▶
                          </span>
                          <span className="font-mono text-xs">{request.id}</span>
                        </button>
                        <div className="mt-1 text-xs text-slate-500">{request.externalId}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{formatDate(request.createdAt)}</td>
                      <td className="px-4 py-3 text-slate-400">{formatDate(request.updatedAt)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-medium ${request.status === "pending"
                            ? "bg-blue-500/20 text-blue-300"
                            : request.status === "completed"
                              ? "bg-green-500/20 text-green-300"
                              : request.status === "failed"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-slate-400">
                        {request.comment || <span className="italic text-slate-500">—</span>}
                      </td>
                    </tr>

                    {expandedRequestIds.has(request.id) && (
                      <tr key={`${request.id}-details`} className="bg-slate-950/80">
                        <td colSpan={5} className="px-4 py-4">
                          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/50">
                                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                    {pageCopy.providerRequestActionTableTerminalKitHeader}
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                    {pageCopy.providerRequestActionTableTypeHeader}
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                    {pageCopy.providerRequestActionTableTransitionHeader}
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                    {pageCopy.providerRequestActionTableStatusHeader}
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-300">
                                    {pageCopy.providerRequestActionTableResultHeader}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {request.actions.length === 0 ? (
                                  <tr>
                                    <td colSpan={5} className="px-4 py-3 text-sm text-slate-400">
                                      {pageCopy.providerRequestActionNoItems}
                                    </td>
                                  </tr>
                                ) : (
                                  request.actions.map((action) => (
                                    <tr
                                      key={action.id}
                                      className="border-b border-slate-800"
                                    >
                                      <td className="px-4 py-3 text-slate-300">
                                        {displayTerminalKit(action)}
                                      </td>
                                      <td className="px-4 py-3 text-slate-400">
                                        {formatActionType(action.actionType)}
                                      </td>
                                      <td className="px-4 py-3 text-slate-400">
                                        {formatState(action.previousState)} → {formatState(action.resultingState ?? getResultingStateForAction(action.actionType))}
                                      </td>
                                      <td className="px-4 py-3">
                                        <span
                                          className={`inline-block rounded px-2 py-1 text-xs font-medium ${action.status === "pending_admin"
                                            ? "bg-slate-500/20 text-slate-300"
                                            : action.status === "pending_provider"
                                              ? "bg-blue-500/20 text-blue-300"
                                              : action.status === "completed"
                                                ? "bg-green-500/20 text-green-300"
                                                : "bg-red-500/20 text-red-300"
                                            }`}
                                        >
                                          {action.status}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">
                                          <button
                                            type="button"
                                            className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-green-300 hover:text-green-200 disabled:cursor-not-allowed disabled:opacity-40"
                                            disabled={action.status !== "pending_provider"}
                                            onClick={() => handleMarkActionResult(request.id, action, true)}
                                          >
                                            {pageCopy.providerRequestActionMarkDone}
                                          </button>
                                          <button
                                            type="button"
                                            className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-red-300 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40"
                                            disabled={action.status !== "pending_provider"}
                                            onClick={() => handleMarkActionResult(request.id, action, false)}
                                          >
                                            {pageCopy.providerRequestActionMarkRejected}
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Submit Results Form */}
        {/* <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
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
        </form> */}
      </div>
    </SectionCard>
  );
}

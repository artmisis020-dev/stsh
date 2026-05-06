import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { TerminalKitActionDto, ClientRequestDto, ActionType } from "@starshield/shared";
import {
  PROVIDER_REQUEST_DEFAULT_VALUES,
  TERMINAL_KIT_ACTION_TYPE_LABELS,
} from "../../constants/admin.js";
import { useI18n } from "../../i18n/I18nProvider.js";
import type { ProviderRequestCreateFormValues } from "../../types/admin.js";
import { CopyButton } from "../ui/CopyButton.js";
import { DataTable } from "../ui/DataTable.js";
import { FormField } from "../ui/FormField.js";
import { SectionCard } from "../ui/SectionCard.js";
import { SubmitButton } from "../ui/SubmitButton.js";
import { TextArea } from "../ui/TextArea.js";
import { TextInput } from "../ui/TextInput.js";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard.js";
import type { ColumnDef } from "@tanstack/react-table";
import { TerminalKitActionCell } from "./TerminalKitActionCell.js";

type PendingActionsSectionProps = {
  actions: TerminalKitActionDto[];
  clientRequests: ClientRequestDto[];
  isSubmitting: boolean;
  onCreateProviderRequest: (values: ProviderRequestCreateFormValues) => void;
};

export function PendingActionsSection({
  actions,
  clientRequests,
  isSubmitting,
  onCreateProviderRequest,
}: PendingActionsSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const clientRequestMessage = messages.clientRequest;
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
  const formatDate = (value: string) => new Date(value).toLocaleString();

  const addToSelection = (actionId: string) => {
    setSelectedActionIds((current) =>
      current.includes(actionId) ? current : [...current, actionId],
    );
  };

  const removeFromSelection = (actionId: string) => {
    setSelectedActionIds((current) => current.filter((id) => id !== actionId));
  };

  const addManyToSelection = (actionIds: string[]) => {
    setSelectedActionIds((current) => [
      ...current,
      ...actionIds.filter((actionId) => !current.includes(actionId)),
    ]);
  };

  const removeManyFromSelection = (actionIds: string[]) => {
    setSelectedActionIds((current) => current.filter((id) => !actionIds.includes(id)));
  };

  const clientRequestColumns: ColumnDef<ClientRequestDto>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: messages.ui.clientRequestLabel,
        cell: ({ row }) => {
          const value = row.original.id;
          return (
            <div className="flex items-center gap-2">
              <span className="break-all">{value}</span>
              <CopyButton
                label={copiedValue === value ? messages.ui.copiedLabel : messages.ui.copyLabel}
                onClick={() => copyToClipboard(value)}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "userLogin",
        header: messages.ui.userLabel,
        cell: ({ row }) => {
          const value = row.original.userLogin;
          return (
            <span className="font-medium text-[var(--accent-gold)]">{value}</span>
          );
        },
      },
      {
        id: "actionsCount",
        header: pageCopy.clientRequestActionsCountLabel,
        cell: ({ row }) => row.original.actions.length,
      },
      {
        accessorKey: "createdAt",
        header: messages.ui.createdAtLabel,
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
      {
        accessorKey: "updatedAt",
        header: messages.ui.updatedAtLabel,
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
      {
        accessorKey: "comment",
        header: pageCopy.commentLabel,
        cell: ({ getValue }) => {
          const value = (getValue() as string) || "";
          return value.trim() ? value : "—";
        },
      },
    ],
    [copiedValue, copyToClipboard, messages.ui, pageCopy.commentLabel, pageCopy.clientRequestActionsCountLabel]
  );


  const submit = ({ externalId, comment }: { externalId: string; comment?: string }) => {
    onCreateProviderRequest({
      externalId,
      actionIds: selectedActionIds,
      comment,
    });
    reset(PROVIDER_REQUEST_DEFAULT_VALUES);
    setSelectedActionIds([]);
  };

  const hasPendingAdminAction = (request: ClientRequestDto) =>
    request.actions?.some((action) => action.status === "pending_admin") ?? false;

  const pendingAdminClientRequests = useMemo(() =>
    clientRequests
      .filter(hasPendingAdminAction)
      .map((request) => ({
        ...request,
        actions: request.actions.filter((action) => action.status === "pending_admin"),
      })), [clientRequests]);

  const selectableActions = useMemo(
    () => pendingAdminClientRequests.flatMap((request) => request.actions),
    [pendingAdminClientRequests],
  );

  const selectedActionItems = useMemo(
    () => selectableActions.filter((action) => selectedActionIds.includes(action.id)),
    [selectableActions, selectedActionIds],
  );

  const selectedKits = useMemo(
    () => [...new Set(selectedActionItems.map((action) => action.terminalKit))],
    [selectedActionItems],
  );

  const getNestedClientRequestActionColumns = (
    requestActions: TerminalKitActionDto[],
  ): ColumnDef<TerminalKitActionDto>[] => {
    const requestActionIds = requestActions.map((action) => action.id);
    const areAllRequestActionsSelected =
      requestActionIds.length > 0 &&
      requestActionIds.every((actionId) => selectedActionIds.includes(actionId));

    return [
      {
        id: "toggleSelection",
        header: () => (

          <TerminalKitActionCell
            handleActionClick={() =>
              areAllRequestActionsSelected
                ? removeManyFromSelection(requestActionIds)
                : addManyToSelection(requestActionIds)}
            isSelected={areAllRequestActionsSelected}
          />
        ),
        cell: ({ row }) => {
          const isSelected = selectedActionIds.includes(row.original.id);
          return (

            <TerminalKitActionCell
              handleActionClick={() =>
                isSelected
                  ? removeFromSelection(row.original.id)
                  : addToSelection(row.original.id)}
              isSelected={isSelected}
              isSingleSelection
            />

          );
        },
      },
      {
        accessorKey: "terminalKit",
        header: messages.ui.terminalKitLabel,
        cell: ({ row }) => row.original.terminalKit,
      },
      {
        accessorKey: "actionType",
        header: messages.ui.actionTypeLabel,
        cell: ({ getValue }) => {
          const value = getValue() as ActionType;
          const messageLabelKey = TERMINAL_KIT_ACTION_TYPE_LABELS[value] || value;
          return clientRequestMessage.actionTypes[messageLabelKey];
        },
      },
      {
        accessorKey: "status",
        header: messages.ui.statusLabel,
      },
      {
        accessorKey: "updatedAt",
        header: messages.ui.updatedAtLabel,
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
    ];
  };

  return (
    <SectionCard
      title={pageCopy.clientRequestsTableTitle}
      description={pageCopy.clientRequestsTableDescription}
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <DataTable
            data={pendingAdminClientRequests}
            columns={clientRequestColumns}
            emptyMessage={pageCopy.emptyClientRequests}
            getRowId={(row) => row.id}
            renderExpandedRow={(request) => (
              <DataTable
                data={request.actions}
                columns={getNestedClientRequestActionColumns(request.actions)}
                emptyMessage={pageCopy.emptyActions}
                getRowId={(row) => row.id}
                className="rounded-xl"
              />
            )}
          />
        </section>

        <section className="space-y-6">
          {actions.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">{pageCopy.emptyActions}</p>
          ) : (
            <>
              {/* <DataTable
                data={sortedActions}
                columns={actionColumns}
                emptyMessage={pageCopy.emptyActions}
              /> */}

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
                {selectedKits.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedKits.map((terminalKit) => (
                      <span
                        key={terminalKit}
                        className="rounded-full border border-[var(--border-main)] bg-black/20 px-3 py-1 text-xs font-medium text-[var(--text-main)]"
                      >
                        {terminalKit}
                      </span>
                    ))}
                  </div>
                ) : null}
                <SubmitButton
                  isPending={isSubmitting}
                  disabled={selectedCount === 0 || !externalIdValue.trim()}
                >
                  {pageCopy.createProviderRequestLabel}
                </SubmitButton>
              </form>
            </>
          )}
        </section>
      </div>
    </SectionCard>
  );
}

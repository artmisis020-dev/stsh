import { AppShell } from "../components/layout/AppShell";
import { PendingActionsSection } from "../components/admin/PendingActionsSection";
import { PendingUsersSection } from "../components/admin/PendingUsersSection";
import { ProviderRequestsSection } from "../components/admin/ProviderRequestsSection";
import { useApproveUser } from "../hooks/useApproveUser";
import { useCreateProviderRequest } from "../hooks/useCreateProviderRequest";
import { usePendingAdminActions } from "../hooks/usePendingAdminActions";
import { usePendingUsers } from "../hooks/usePendingUsers";
import { useProviderRequests } from "../hooks/useProviderRequests";
import { useRejectUser } from "../hooks/useRejectUser";
import { useSubmitProviderResults } from "../hooks/useSubmitProviderResults";
import { useI18n } from "../i18n/I18nProvider";
import type {
  ProviderRequestCreateFormValues,
  ProviderResultFormValues,
} from "../types/admin";

export function AdminPage() {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;
  const pendingUsersQuery = usePendingUsers();
  const pendingActionsQuery = usePendingAdminActions();
  const providerRequestsQuery = useProviderRequests();
  const approveUserMutation = useApproveUser();
  const rejectUserMutation = useRejectUser();
  const createProviderRequestMutation = useCreateProviderRequest();
  const submitProviderResultsMutation = useSubmitProviderResults();

  const handleCreateProviderRequest = (values: ProviderRequestCreateFormValues) => {
    createProviderRequestMutation.mutate(values);
  };

  const handleSubmitProviderResult = (values: ProviderResultFormValues) => {
    submitProviderResultsMutation.mutate({
      id: values.providerRequestId,
      payload: {
        results: [
          {
            actionId: values.actionId,
            success: values.success,
            resultingState: values.resultingState,
          },
        ],
      },
    });
  };

  return (
    <AppShell>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          {pageCopy.eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          {pageCopy.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
          {pageCopy.description}
        </p>
      </div>

      <div className="mt-8 grid gap-8">
        <PendingUsersSection
          users={pendingUsersQuery.data ?? []}
          isApproving={approveUserMutation.isPending}
          isRejecting={rejectUserMutation.isPending}
          onApprove={(id) => approveUserMutation.mutate(id)}
          onReject={(id) => rejectUserMutation.mutate(id)}
        />

        <PendingActionsSection
          actions={pendingActionsQuery.data ?? []}
          isSubmitting={createProviderRequestMutation.isPending}
          onCreateProviderRequest={handleCreateProviderRequest}
        />

        <ProviderRequestsSection
          providerRequests={providerRequestsQuery.data ?? []}
          isSubmitting={submitProviderResultsMutation.isPending}
          onSubmitProviderResult={handleSubmitProviderResult}
        />
      </div>
    </AppShell>
  );
}

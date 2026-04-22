import { PendingActionsSection } from "../components/admin/PendingActionsSection.js";
import { ProviderRequestsSection } from "../components/admin/ProviderRequestsSection.js";
import { useCreateProviderRequest } from "../hooks/useCreateProviderRequest.js";
import { useGetAllClientRequests } from "../hooks/useGetAllClientRequests.js";
import { usePendingAdminActions } from "../hooks/usePendingAdminActions.js";
import { useProviderRequests } from "../hooks/useProviderRequests.js";
import { useSubmitProviderResults } from "../hooks/useSubmitProviderResults.js";
import type {
  ProviderRequestCreateFormValues,
  ProviderResultFormValues,
} from "../types/admin.js";

export function AdminPage() {
  const pendingActionsQuery = usePendingAdminActions();
  const providerRequestsQuery = useProviderRequests();
  const clientRequestsQuery = useGetAllClientRequests();
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
    <div className="grid gap-8">

      <PendingActionsSection
        actions={pendingActionsQuery.data ?? []}
        clientRequests={clientRequestsQuery.data ?? []}
        isSubmitting={createProviderRequestMutation.isPending}
        onCreateProviderRequest={handleCreateProviderRequest}
      />

      <ProviderRequestsSection
        providerRequests={providerRequestsQuery.data ?? []}
        clientRequests={clientRequestsQuery.data ?? []}
        isSubmitting={submitProviderResultsMutation.isPending}
        onSubmitProviderResult={handleSubmitProviderResult}
      />
    </div>
  );
}

import { PendingUsersSection } from "../components/admin/PendingUsersSection.js";
import { useApproveUser } from "../hooks/useApproveUser.js";
import { usePendingUsers } from "../hooks/usePendingUsers.js";
import { useRejectUser } from "../hooks/useRejectUser.js";

export function AdminUsersPage() {
    const pendingUsersQuery = usePendingUsers();
    const approveUserMutation = useApproveUser();
    const rejectUserMutation = useRejectUser();
    return (
        <div>
            <PendingUsersSection
                users={pendingUsersQuery.data ?? []}
                isApproving={approveUserMutation.isPending}
                isRejecting={rejectUserMutation.isPending}
                onApprove={(id) => approveUserMutation.mutate(id)}
                onReject={(id) => rejectUserMutation.mutate(id)}
            />
        </div>
    );
}

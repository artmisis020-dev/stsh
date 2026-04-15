import type { UserDto } from "@starshield/shared";
import { useI18n } from "../../i18n/I18nProvider";
import { SectionCard } from "../ui/SectionCard";
import { SubmitButton } from "../ui/SubmitButton";

type PendingUsersSectionProps = {
  users: UserDto[];
  isApproving: boolean;
  isRejecting: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export function PendingUsersSection({
  users,
  isApproving,
  isRejecting,
  onApprove,
  onReject,
}: PendingUsersSectionProps) {
  const { messages } = useI18n();
  const pageCopy = messages.admin.page;

  return (
    <SectionCard
      title={pageCopy.usersSectionTitle}
      description={pageCopy.usersSectionDescription}
    >
      {users.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">{pageCopy.emptyUsers}</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--border-main)] bg-black/35 p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="font-medium text-[var(--text-main)]">{user.email}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {messages.ui.statusLabel}: {user.status} • {messages.ui.roleLabel}: {user.role}
                </p>
              </div>
              <div className="flex gap-3">
                <SubmitButton
                  type="button"
                  isPending={isApproving}
                  onClick={() => onApprove(user.id)}
                >
                  {pageCopy.approveLabel}
                </SubmitButton>
                <button
                  type="button"
                  className="rounded-full border border-[var(--accent-red)]/70 bg-[var(--accent-red)]/10 px-5 py-3 text-sm font-semibold text-[#f2c6c6] transition hover:border-[var(--accent-red)] hover:bg-[var(--accent-red)]/20 hover:text-white"
                  disabled={isRejecting}
                  onClick={() => onReject(user.id)}
                >
                  {pageCopy.rejectLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

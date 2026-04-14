import type { SubmitClientRequestDto } from "@starshield/shared";
import { AppShell } from "../components/layout/AppShell";
import { ClientRequestForm } from "../components/client-requests/ClientRequestForm";
import { useApiHealth } from "../hooks/useApiHealth";
import { useSubmitClientRequest } from "../hooks/useSubmitClientRequest";
import { useI18n } from "../i18n/I18nProvider";

export function IdsFormPage() {
  const { messages } = useI18n();
  const healthQuery = useApiHealth();
  const submitClientRequestMutation = useSubmitClientRequest();

  const handleSubmit = (values: SubmitClientRequestDto) => {
    submitClientRequestMutation.mutate(values);
  };

  const healthStatusLabel = healthQuery.isLoading
    ? messages.ui.checking
    : healthQuery.isError
      ? messages.ui.unavailable
      : messages.ui.connected;

  return (
    <AppShell>
      <ClientRequestForm
        healthStatusLabel={healthStatusLabel}
        isSubmitting={submitClientRequestMutation.isPending}
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}

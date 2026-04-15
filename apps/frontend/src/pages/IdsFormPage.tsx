import type { SubmitClientRequestDto } from "@starshield/shared";
import { AppShell } from "../components/layout/AppShell.js";
import { ClientRequestForm } from "../components/client-requests/ClientRequestForm.js";
import { useApiHealth } from "../hooks/useApiHealth.js";
import { useSubmitClientRequest } from "../hooks/useSubmitClientRequest.js";
import { useI18n } from "../i18n/I18nProvider.js";

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

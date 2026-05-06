import { useState } from "react";
import type { SubmitClientRequestDto } from "@starshield/shared";
import { AppShell } from "../components/layout/AppShell.js";
import { ClientRequestForm } from "../components/client-requests/ClientRequestForm.js";
import { Toast } from "../components/ui/Toast.js";
import { useApiErrorMessage } from "../hooks/useApiErrorMessage.js";
import { useApiHealth } from "../hooks/useApiHealth.js";
import { useSubmitClientRequest } from "../hooks/useSubmitClientRequest.js";
import { useToast } from "../hooks/useToast.js";
import { useI18n } from "../i18n/I18nProvider.js";

export function IdsFormPage() {
  const { messages } = useI18n();
  const healthQuery = useApiHealth();
  const submitClientRequestMutation = useSubmitClientRequest();
  const getErrorMessage = useApiErrorMessage();
  const { toast, showToast, hideToast } = useToast();
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (values: SubmitClientRequestDto) => {
    submitClientRequestMutation.mutate(values, {
      onSuccess: () => {
        showToast(messages.clientRequest.page.successMessage, "success");
        submitClientRequestMutation.reset();
        setFormKey((k) => k + 1);
      },
    });
  };

  const healthStatusLabel = healthQuery.isLoading
    ? messages.ui.checking
    : healthQuery.isError
      ? messages.ui.unavailable
      : messages.ui.connected;

  const errorMessage = submitClientRequestMutation.error
    ? getErrorMessage(submitClientRequestMutation.error)
    : undefined;

  return (
    <AppShell>
      {toast ? (
        <Toast message={toast.message} type={toast.type} onDismiss={hideToast} />
      ) : null}
      <ClientRequestForm
        key={formKey}
        healthStatusLabel={healthStatusLabel}
        isSubmitting={submitClientRequestMutation.isPending}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}

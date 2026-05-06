import { AuthPage } from "../components/auth/AuthPage.js";
import { APP_ROUTES } from "../constants/routes.js";
import { useApiErrorMessage } from "../hooks/useApiErrorMessage.js";
import { useRegister } from "../hooks/useRegister.js";
import { useI18n } from "../i18n/I18nProvider.js";

export function RegisterPage() {
  const registerMutation = useRegister();
  const { messages } = useI18n();
  const getErrorMessage = useApiErrorMessage();

  return (
    <AuthPage
      content={{
        ...messages.auth.register,
        alternateLinkHref: APP_ROUTES.login,
      }}
      isPending={registerMutation.isPending}
      errorMessage={registerMutation.error ? getErrorMessage(registerMutation.error) : undefined}
      showLoginField
      submitAuthForm={registerMutation.mutate}
    />
  );
}

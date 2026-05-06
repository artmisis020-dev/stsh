import { AuthPage } from "../components/auth/AuthPage.js";
import { APP_ROUTES } from "../constants/routes.js";
import { useApiErrorMessage } from "../hooks/useApiErrorMessage.js";
import { useLogin } from "../hooks/useLogin.js";
import { useI18n } from "../i18n/I18nProvider.js";

export function LoginPage() {
  const loginMutation = useLogin();
  const { messages } = useI18n();
  const getErrorMessage = useApiErrorMessage();

  return (
    <AuthPage
      content={{
        ...messages.auth.login,
        alternateLinkHref: APP_ROUTES.register,
      }}
      isPending={loginMutation.isPending}
      errorMessage={loginMutation.error ? getErrorMessage(loginMutation.error) : undefined}
      submitAuthForm={loginMutation.mutate}
    />
  );
}

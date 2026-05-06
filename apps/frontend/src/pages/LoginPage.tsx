import { AuthPage } from "../components/auth/AuthPage.js";
import { APP_ROUTES } from "../constants/routes.js";
import { getApiErrorMessage } from "../helpers/api-error.js";
import { useLogin } from "../hooks/useLogin.js";
import { useI18n } from "../i18n/I18nProvider.js";

export function LoginPage() {
  const loginMutation = useLogin();
  const { messages } = useI18n();

  return (
    <AuthPage
      content={{
        ...messages.auth.login,
        alternateLinkHref: APP_ROUTES.register,
      }}
      isPending={loginMutation.isPending}
      errorMessage={loginMutation.error ? getApiErrorMessage(loginMutation.error) : undefined}
      submitAuthForm={loginMutation.mutate}
    />
  );
}

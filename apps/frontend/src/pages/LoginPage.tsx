import { AuthPage } from "../components/auth/AuthPage";
import { APP_ROUTES } from "../constants/routes";
import { useLogin } from "../hooks/useLogin";
import { useI18n } from "../i18n/I18nProvider";

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
      submitAuthForm={loginMutation.mutate}
    />
  );
}

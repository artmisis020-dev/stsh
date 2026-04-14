import { AuthPage } from "../components/auth/AuthPage";
import { APP_ROUTES } from "../constants/routes";
import { useRegister } from "../hooks/useRegister";
import { useI18n } from "../i18n/I18nProvider";

export function RegisterPage() {
  const registerMutation = useRegister();
  const { messages } = useI18n();

  return (
    <AuthPage
      content={{
        ...messages.auth.register,
        alternateLinkHref: APP_ROUTES.login,
      }}
      isPending={registerMutation.isPending}
      submitAuthForm={registerMutation.mutate}
    />
  );
}

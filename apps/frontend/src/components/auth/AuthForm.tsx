import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormCard } from "../ui/FormCard";
import { FormField } from "../ui/FormField";
import { SubmitButton } from "../ui/SubmitButton";
import { TextInput } from "../ui/TextInput";
import type { AuthFormValues } from "../../types/forms";
import { AUTH_FORM_DEFAULT_VALUES } from "../../constants/auth";
import { useI18n } from "../../i18n/I18nProvider";

type AuthFormContent = {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  alternateLabel: string;
  alternateLinkLabel: string;
  alternateLinkHref: string;
};

type AuthFormProps = {
  content: AuthFormContent;
  isPending: boolean;
  onSubmit: (values: AuthFormValues) => void;
  successMessage?: string;
  errorMessage?: string;
  showLoginField?: boolean;
};

export function AuthForm({
  content,
  isPending,
  onSubmit,
  successMessage,
  errorMessage,
  showLoginField,
}: AuthFormProps) {
  const { messages } = useI18n();
  const formCopy = messages.auth.form;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: AUTH_FORM_DEFAULT_VALUES,
  });

  return (
    <FormCard
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {showLoginField ? (
          <FormField htmlFor="login" label={formCopy.loginLabel} error={errors.login?.message}>
            <TextInput
              id="login"
              type="text"
              placeholder={formCopy.loginPlaceholder}
              {...register("login", {
                required: formCopy.loginRequiredMessage,
              })}
            />
          </FormField>
        ) : null}

        <FormField htmlFor="email" label={formCopy.emailLabel} error={errors.email?.message}>
          <TextInput
            id="email"
            type="email"
            placeholder={formCopy.emailPlaceholder}
            {...register("email", {
              required: formCopy.emailRequiredMessage,
            })}
          />
        </FormField>

        <FormField
          htmlFor="password"
          label={formCopy.passwordLabel}
          error={errors.password?.message}
        >
          <TextInput
            id="password"
            type="password"
            placeholder={formCopy.passwordPlaceholder}
            {...register("password", {
              required: formCopy.passwordRequiredMessage,
              minLength: {
                value: 8,
                message: formCopy.passwordMinLengthMessage,
              },
            })}
          />
        </FormField>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <SubmitButton isPending={isPending}>{content.submitLabel}</SubmitButton>
          <p className="text-sm text-slate-400">
            {content.alternateLabel}{" "}
            <Link className="font-medium text-cyan-300 hover:text-cyan-200" to={content.alternateLinkHref}>
              {content.alternateLinkLabel}
            </Link>
          </p>
        </div>
        <div className="mt-4">
          {successMessage ? (
            <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {successMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="rounded-2xl border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-4 py-3 text-sm text-[var(--text-error)]">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </form>
    </FormCard>
  );
}

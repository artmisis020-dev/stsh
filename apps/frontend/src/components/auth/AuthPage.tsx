import { useState } from "react";
import type { LoginDto, RegisterDto } from "@starshield/shared";
import { AppShell } from "../layout/AppShell.js";
import { AuthForm } from "./AuthForm.js";
import type { AuthFormValues } from "../../types/forms.js";

type AuthPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  successMessage: string;
  alternateLabel: string;
  alternateLinkLabel: string;
  alternateLinkHref: string;
};

type AuthMutationOptions = {
  onSuccess: () => void;
};

type AuthPageProps = {
  content: AuthPageContent;
  isPending: boolean;
  errorMessage?: string;
  showLoginField?: boolean;
  submitAuthForm: (
    values: LoginDto | RegisterDto,
    options: AuthMutationOptions,
  ) => void;
};

export function AuthPage({ content, isPending, errorMessage, showLoginField, submitAuthForm }: AuthPageProps) {
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleSubmit = (values: AuthFormValues) => {
    setSuccessMessage(undefined);
    submitAuthForm(values, {
      onSuccess: () => {
        setSuccessMessage(content.successMessage);
      },
    });
  };

  return (
    <AppShell>
      <AuthForm
        content={content}
        isPending={isPending}
        onSubmit={handleSubmit}
        successMessage={successMessage}
        errorMessage={errorMessage}
        showLoginField={showLoginField}
      />
    </AppShell>
  );
}

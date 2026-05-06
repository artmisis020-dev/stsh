import type { AxiosError } from "axios";
import { ErrorCode } from "@starshield/shared";
import { useI18n } from "../i18n/I18nProvider.js";
import type { TranslationMessages } from "../i18n/types.js";

type ErrorResponse = { message?: string | string[]; code?: string };

const CODE_MAP: Record<string, keyof TranslationMessages["errors"]> = {
  [ErrorCode.InvalidCredentials]: "authInvalidCredentials",
  [ErrorCode.UserNotApproved]: "authUserNotApproved",
  [ErrorCode.UserEmailAlreadyExists]: "authUserEmailExists",
  [ErrorCode.UserLoginAlreadyExists]: "authUserLoginExists",
  [ErrorCode.DuplicateTerminalKits]: "clientDuplicateKits",
  [ErrorCode.ActiveActionInProgress]: "clientActiveAction",
  [ErrorCode.OnlyActivationAllowed]: "clientOnlyActivationAllowed",
  [ErrorCode.AlreadyActive]: "clientAlreadyActive",
  [ErrorCode.PermDeactivatedCannotActivate]: "clientPermDeactivated",
  [ErrorCode.OnlyActiveCanBeDeactivated]: "clientNotActive",
};

export function useApiErrorMessage() {
  const { messages } = useI18n();

  return (error: unknown): string => {
    const axiosError = error as AxiosError<ErrorResponse>;
    const data = axiosError.response?.data;

    if (data?.code) {
      const key = CODE_MAP[data.code];
      if (key) return messages.errors[key];
    }

    const message = data?.message;
    if (message) return Array.isArray(message) ? message.join(", ") : message;

    return (error as Error).message || messages.errors.unexpected;
  };
}

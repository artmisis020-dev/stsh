import { TerminalKitState } from "@starshield/shared";

export const PROVIDER_RESULT_DEFAULT_VALUES = {
  providerRequestId: "",
  actionId: "",
  success: true,
  resultingState: TerminalKitState.Active,
} as const;

export const PROVIDER_REQUEST_DEFAULT_VALUES = {
  externalId: "",
  comment: "",
} as const;

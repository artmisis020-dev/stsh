import { TerminalKitState, ActionType} from "@starshield/shared";
import { TranslationMessages } from "../i18n/types.js";

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


export const TERMINAL_KIT_ACTION_TYPE_LABELS: Record<ActionType, keyof TranslationMessages['clientRequest']['actionTypes']> = {
  activate: "activate",
  deactivate_temp: "deactivateTemp",
  deactivate_perm: "deactivatePerm",
};
import { ActionType, type SubmitClientRequestDto } from "@starshield/shared";

export const KIT_ID_RULES = {
  minLength: 10,
  maxLength: 12,
  pattern: /^KIT\d{7,9}$/i,
} as const;

export function normalizeKitId(value: string) {
  return value.trim().toUpperCase();
}

export function isValidKitId(value: string) {
  const normalizedValue = normalizeKitId(value);

  return (
    normalizedValue.length >= KIT_ID_RULES.minLength &&
    normalizedValue.length <= KIT_ID_RULES.maxLength &&
    KIT_ID_RULES.pattern.test(normalizedValue)
  );
}

export const CLIENT_REQUEST_DEFAULT_VALUES: SubmitClientRequestDto = {
  comment: "",
  actions: [
    {
      terminalKit: "KIT",
      actionType: ActionType.Activate,
    },
  ],
};

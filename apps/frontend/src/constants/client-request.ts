import { ActionType, type SubmitClientRequestDto } from "@starshield/shared";

export const ACTION_TYPE_OPTIONS = [
  { label: "Activate ID", value: ActionType.Activate },
  { label: "Temporary deactivation", value: ActionType.DeactivateTemp },
  { label: "Permanent deactivation", value: ActionType.DeactivatePerm },
] as const;

export const IDS_PAGE_CONTENT = {
  eyebrow: "Client Requests",
  title: "Create an ID action request",
  description:
    "Submit activation or deactivation requests for IDs. The backend payload preview below mirrors the shared DTO structure.",
  submitLabel: "Submit request",
  addIdLabel: "Add one more ID",
  removeIdLabel: "Remove ID",
  previewTitle: "Payload preview",
  previewDescription:
    "This preview is generated from the submitted form and uses shared frontend-backend types.",
  commentLabel: "Comment",
  commentPlaceholder: "Add optional context for the admin team",
  idsSectionTitle: "IDs to process",
  idsSectionDescription:
    "A Starlink Kit ID is usually a 10-12 character alphanumeric code, commonly starting with KIT, for example KIT00000000.",
  idValueLabel: "KIT ID",
  idValuePlaceholder: "Example: KIT00000000",
  actionTypeLabel: "Action type",
  idRequiredMessage: "KIT ID is required.",
  idFormatMessage:
    "Enter a valid Starlink Kit ID using 10-12 letters or numbers, for example KIT00000000.",
} as const;

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
      idValue: "",
      actionType: ActionType.Activate,
    },
  ],
};

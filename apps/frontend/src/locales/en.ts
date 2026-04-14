import type { TranslationMessages } from "../i18n/types";

export const enMessages: TranslationMessages = {
  ui: {
    brandName: "Starshield",
    brandSubtitle: "ID Management System",
    pendingAction: "Please wait...",
    idlePreview: "Submit the form to preview payload",
    checking: "checking",
    unavailable: "unavailable",
    connected: "connected",
    language: "Language",
    english: "English",
    ukrainian: "Ukrainian",
    apiHealth: "API health:",
    statusLabel: "Status",
    roleLabel: "Role",
    actionIdLabel: "Action ID",
    clientRequestLabel: "Client request",
    providerRequestIdLabel: "Provider request ID",
  },
  navigation: {
    login: "Login",
    register: "Register",
    ids: "IDs Form",
    admin: "Admin",
  },
  auth: {
    login: {
      eyebrow: "Client Access",
      title: "Sign in to Starshield",
      description:
        "Access your ID request workspace, monitor approvals, and send activation or deactivation requests.",
      submitLabel: "Login",
      successMessage: "Login request sent successfully.",
      alternateLabel: "Need an account?",
      alternateLinkLabel: "Register",
    },
    register: {
      eyebrow: "New Client",
      title: "Create your account",
      description:
        "Register for access to the ID management system. Your account stays pending until an administrator approves it.",
      submitLabel: "Register",
      successMessage: "Registration submitted. Wait for admin approval.",
      alternateLabel: "Already registered?",
      alternateLinkLabel: "Go to login",
    },
    form: {
      asideTitle: "Access flow",
      asideDescription:
        "Clients register first, wait for admin approval, and then submit ID activation or deactivation requests.",
      emailLabel: "Email",
      emailPlaceholder: "client@example.com",
      emailRequiredMessage: "Email is required.",
      passwordLabel: "Password",
      passwordPlaceholder: "Minimum 8 characters",
      passwordRequiredMessage: "Password is required.",
      passwordMinLengthMessage: "Password must be at least 8 characters.",
    },
  },
  clientRequest: {
    actionTypes: {
      activate: "Activate ID",
      deactivateTemp: "Temporary deactivation",
      deactivatePerm: "Permanent deactivation",
    },
    page: {
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
        "Enter a valid Starlink Kit ID in KIT format, for example KIT00000000.",
    },
  },
  admin: {
    page: {
      eyebrow: "Admin Control",
      title: "Operations dashboard",
      description:
        "Review pending users, process ID actions, create provider requests, and record provider email results.",
      usersSectionTitle: "Pending users",
      usersSectionDescription:
        "Approve or reject newly registered clients before they can access the request workflow.",
      actionsSectionTitle: "Pending ID actions",
      actionsSectionDescription:
        "Select pending actions and bundle them into a provider request with an external reference.",
      providerRequestsSectionTitle: "Provider requests",
      providerRequestsSectionDescription:
        "Track existing provider requests and manually enter returned results from the provider email.",
      approveLabel: "Approve",
      rejectLabel: "Reject",
      createProviderRequestLabel: "Create provider request",
      externalIdLabel: "Provider external ID",
      externalIdPlaceholder: "EMAIL-REQ-2026-001",
      externalIdRequiredMessage: "Provider external ID is required.",
      selectedActionsLabel: "Selected actions",
      providerRequestIdLabel: "Provider request ID",
      providerRequestIdPlaceholder: "Paste provider request ID",
      providerRequestIdRequiredMessage: "Provider request ID is required.",
      actionIdLabel: "Action ID",
      actionIdPlaceholder: "Paste action ID",
      actionIdRequiredMessage: "Action ID is required.",
      resultingStateLabel: "Resulting state",
      successLabel: "Operation successful",
      submitResultLabel: "Submit provider result",
      emptyUsers: "No pending users right now.",
      emptyActions: "No pending ID actions available.",
      emptyProviderRequests: "No provider requests have been created yet.",
    },
    resultStates: {
      active: "Active",
      deactivatedTemp: "Temporarily deactivated",
      deactivatedPerm: "Permanently deactivated",
    },
  },
};

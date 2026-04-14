export type SupportedLanguage = "en" | "uk";

export type TranslationMessages = {
  ui: {
    brandName: string;
    brandSubtitle: string;
    pendingAction: string;
    idlePreview: string;
    checking: string;
    unavailable: string;
    connected: string;
    language: string;
    english: string;
    ukrainian: string;
    apiHealth: string;
    statusLabel: string;
    roleLabel: string;
    actionIdLabel: string;
    clientRequestLabel: string;
    providerRequestIdLabel: string;
  };
  navigation: {
    login: string;
    register: string;
    ids: string;
    admin: string;
  };
  auth: {
    login: {
      eyebrow: string;
      title: string;
      description: string;
      submitLabel: string;
      successMessage: string;
      alternateLabel: string;
      alternateLinkLabel: string;
    };
    register: {
      eyebrow: string;
      title: string;
      description: string;
      submitLabel: string;
      successMessage: string;
      alternateLabel: string;
      alternateLinkLabel: string;
    };
    form: {
      asideTitle: string;
      asideDescription: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailRequiredMessage: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      passwordRequiredMessage: string;
      passwordMinLengthMessage: string;
    };
  };
  clientRequest: {
    actionTypes: {
      activate: string;
      deactivateTemp: string;
      deactivatePerm: string;
    };
    page: {
      eyebrow: string;
      title: string;
      description: string;
      submitLabel: string;
      addIdLabel: string;
      removeIdLabel: string;
      previewTitle: string;
      previewDescription: string;
      commentLabel: string;
      commentPlaceholder: string;
      idsSectionTitle: string;
      idsSectionDescription: string;
      idValueLabel: string;
      idValuePlaceholder: string;
      actionTypeLabel: string;
      idRequiredMessage: string;
      idFormatMessage: string;
    };
  };
  admin: {
    page: {
      eyebrow: string;
      title: string;
      description: string;
      usersSectionTitle: string;
      usersSectionDescription: string;
      actionsSectionTitle: string;
      actionsSectionDescription: string;
      providerRequestsSectionTitle: string;
      providerRequestsSectionDescription: string;
      approveLabel: string;
      rejectLabel: string;
      createProviderRequestLabel: string;
      externalIdLabel: string;
      externalIdPlaceholder: string;
      externalIdRequiredMessage: string;
      selectedActionsLabel: string;
      providerRequestIdLabel: string;
      providerRequestIdPlaceholder: string;
      providerRequestIdRequiredMessage: string;
      actionIdLabel: string;
      actionIdPlaceholder: string;
      actionIdRequiredMessage: string;
      resultingStateLabel: string;
      successLabel: string;
      submitResultLabel: string;
      emptyUsers: string;
      emptyActions: string;
      emptyProviderRequests: string;
    };
    resultStates: {
      active: string;
      deactivatedTemp: string;
      deactivatedPerm: string;
    };
  };
};

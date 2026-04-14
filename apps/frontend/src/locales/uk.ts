import type { TranslationMessages } from "../i18n/types";

export const ukMessages: TranslationMessages = {
  ui: {
    brandName: "Starshield",
    brandSubtitle: "Система керування ID",
    pendingAction: "Зачекайте...",
    idlePreview: "Надішліть форму, щоб побачити payload",
    checking: "перевірка",
    unavailable: "недоступно",
    connected: "підключено",
    language: "Мова",
    english: "Англійська",
    ukrainian: "Українська",
    apiHealth: "Стан API:",
    statusLabel: "Статус",
    roleLabel: "Роль",
    actionIdLabel: "ID дії",
    clientRequestLabel: "Клієнтський запит",
    providerRequestIdLabel: "ID запиту провайдера",
  },
  navigation: {
    login: "Вхід",
    register: "Реєстрація",
    ids: "Форма ID",
    admin: "Адмін",
  },
  auth: {
    login: {
      eyebrow: "Доступ клієнта",
      title: "Увійти в Starshield",
      description:
        "Отримайте доступ до робочого простору заявок, відстежуйте погодження та надсилайте запити на активацію або деактивацію.",
      submitLabel: "Увійти",
      successMessage: "Запит на вхід успішно надіслано.",
      alternateLabel: "Потрібен акаунт?",
      alternateLinkLabel: "Зареєструватися",
    },
    register: {
      eyebrow: "Новий клієнт",
      title: "Створіть акаунт",
      description:
        "Зареєструйте доступ до системи керування ID. Ваш акаунт буде очікувати погодження адміністратора.",
      submitLabel: "Зареєструватися",
      successMessage: "Реєстрацію надіслано. Очікуйте погодження адміністратора.",
      alternateLabel: "Вже зареєстровані?",
      alternateLinkLabel: "Перейти до входу",
    },
    form: {
      asideTitle: "Сценарій доступу",
      asideDescription:
        "Клієнти спочатку реєструються, очікують погодження адміністратора, а потім надсилають запити на активацію або деактивацію ID.",
      emailLabel: "Email",
      emailPlaceholder: "client@example.com",
      emailRequiredMessage: "Email є обов'язковим.",
      passwordLabel: "Пароль",
      passwordPlaceholder: "Мінімум 8 символів",
      passwordRequiredMessage: "Пароль є обов'язковим.",
      passwordMinLengthMessage: "Пароль має містити щонайменше 8 символів.",
    },
  },
  clientRequest: {
    actionTypes: {
      activate: "Активувати ID",
      deactivateTemp: "Тимчасова деактивація",
      deactivatePerm: "Постійна деактивація",
    },
    page: {
      eyebrow: "Запити клієнта",
      title: "Створення запиту на дію з ID",
      description:
        "Надсилайте запити на активацію або деактивацію ID. Попередній перегляд payload нижче відображає структуру спільного DTO.",
      submitLabel: "Надіслати запит",
      addIdLabel: "Додати ще один ID",
      removeIdLabel: "Видалити ID",
      previewTitle: "Попередній перегляд payload",
      previewDescription:
        "Цей попередній перегляд формується зі значень форми та використовує спільні типи frontend/backend.",
      commentLabel: "Коментар",
      commentPlaceholder: "Додайте необов'язковий контекст для команди адміністраторів",
      idsSectionTitle: "ID для обробки",
      idsSectionDescription:
        "Starlink Kit ID зазвичай є буквено-цифровим кодом довжиною 10-12 символів, найчастіше починається з KIT, наприклад KIT00000000.",
      idValueLabel: "KIT ID",
      idValuePlaceholder: "Приклад: KIT00000000",
      actionTypeLabel: "Тип дії",
      idRequiredMessage: "KIT ID є обов'язковим.",
      idFormatMessage:
        "Введіть коректний Starlink Kit ID у форматі KIT, наприклад KIT00000000.",
    },
  },
  admin: {
    page: {
      eyebrow: "Адмін-контроль",
      title: "Панель операцій",
      description:
        "Переглядайте користувачів у черзі, опрацьовуйте дії з ID, створюйте запити провайдеру та заносьте результати з email.",
      usersSectionTitle: "Користувачі в очікуванні",
      usersSectionDescription:
        "Погоджуйте або відхиляйте нових клієнтів перед тим, як вони отримають доступ до workflow запитів.",
      actionsSectionTitle: "ID дії в очікуванні",
      actionsSectionDescription:
        "Оберіть дії в очікуванні та об'єднайте їх у запит до провайдера із зовнішнім референсом.",
      providerRequestsSectionTitle: "Запити провайдеру",
      providerRequestsSectionDescription:
        "Відстежуйте існуючі запити провайдеру та вручну вносьте результати з email-відповіді.",
      approveLabel: "Погодити",
      rejectLabel: "Відхилити",
      createProviderRequestLabel: "Створити запит провайдеру",
      externalIdLabel: "Зовнішній ID провайдера",
      externalIdPlaceholder: "EMAIL-REQ-2026-001",
      externalIdRequiredMessage: "Зовнішній ID провайдера є обов'язковим.",
      selectedActionsLabel: "Обрано дій",
      providerRequestIdLabel: "ID запиту провайдера",
      providerRequestIdPlaceholder: "Вставте ID запиту провайдера",
      providerRequestIdRequiredMessage: "ID запиту провайдера є обов'язковим.",
      actionIdLabel: "ID дії",
      actionIdPlaceholder: "Вставте ID дії",
      actionIdRequiredMessage: "ID дії є обов'язковим.",
      resultingStateLabel: "Кінцевий стан",
      successLabel: "Операція успішна",
      submitResultLabel: "Надіслати результат провайдера",
      emptyUsers: "Наразі немає користувачів у черзі.",
      emptyActions: "Немає ID дій у стані очікування.",
      emptyProviderRequests: "Запити провайдеру ще не створювалися.",
    },
    resultStates: {
      active: "Активний",
      deactivatedTemp: "Тимчасово деактивований",
      deactivatedPerm: "Постійно деактивований",
    },
  },
};

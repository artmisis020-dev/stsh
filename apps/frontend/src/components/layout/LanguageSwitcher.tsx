import { useI18n } from "../../i18n/I18nProvider";

export function LanguageSwitcher() {
  const { language, setLanguage, messages } = useI18n();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--text-muted)]">{messages.ui.language}</span>
      <div className="flex rounded-full border border-[var(--border-main)] bg-black/40 p-1">
        <button
          type="button"
          className={`rounded-full px-3 py-1 text-sm transition ${
            language === "en"
              ? "bg-[var(--accent-gold)] text-black"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
          onClick={() => setLanguage("en")}
        >
          {messages.ui.english}
        </button>
        <button
          type="button"
          className={`rounded-full px-3 py-1 text-sm transition ${
            language === "uk"
              ? "bg-[var(--accent-gold)] text-black"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
          onClick={() => setLanguage("uk")}
        >
          {messages.ui.ukrainian}
        </button>
      </div>
    </div>
  );
}

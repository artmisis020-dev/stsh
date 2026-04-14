import { useI18n } from "../../i18n/I18nProvider";

export function LanguageSwitcher() {
  const { language, setLanguage, messages } = useI18n();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-400">{messages.ui.language}</span>
      <div className="flex rounded-full border border-slate-700 bg-slate-950/60 p-1">
        <button
          type="button"
          className={`rounded-full px-3 py-1 text-sm transition ${
            language === "en"
              ? "bg-cyan-400 text-slate-950"
              : "text-slate-300 hover:text-white"
          }`}
          onClick={() => setLanguage("en")}
        >
          {messages.ui.english}
        </button>
        <button
          type="button"
          className={`rounded-full px-3 py-1 text-sm transition ${
            language === "uk"
              ? "bg-cyan-400 text-slate-950"
              : "text-slate-300 hover:text-white"
          }`}
          onClick={() => setLanguage("uk")}
        >
          {messages.ui.ukrainian}
        </button>
      </div>
    </div>
  );
}

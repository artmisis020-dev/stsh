import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/routes";
import { useI18n } from "../../i18n/I18nProvider";

const baseLinkClassName =
  "rounded-full border px-4 py-2 text-sm font-medium transition";

export function Navigation() {
  const { messages } = useI18n();
  const navigationLinks = [
    { label: messages.navigation.login, href: APP_ROUTES.login },
    { label: messages.navigation.register, href: APP_ROUTES.register },
    { label: messages.navigation.terminalKits, href: APP_ROUTES.terminalKits },
    { label: messages.navigation.admin, href: APP_ROUTES.admin },
  ];

  return (
    <nav className="flex flex-wrap gap-3">
      {navigationLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            `${baseLinkClassName} ${
              isActive
                ? "border-[var(--accent-gold)] bg-[var(--accent-gold)] text-black"
                : "border-[var(--border-main)] bg-black/35 text-[var(--text-main)] hover:border-[var(--accent-khaki)] hover:text-[var(--accent-gold)]"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

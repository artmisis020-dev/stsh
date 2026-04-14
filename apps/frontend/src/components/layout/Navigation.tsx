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
    { label: messages.navigation.ids, href: APP_ROUTES.ids },
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
                ? "border-cyan-400 bg-cyan-400 text-slate-950"
                : "border-slate-700 bg-slate-950/60 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

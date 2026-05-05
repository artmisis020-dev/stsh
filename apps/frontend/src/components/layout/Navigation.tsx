import { NavLink, useNavigate } from "react-router-dom";
import { UserRole } from "@starshield/shared";
import { APP_ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import { useI18n } from "../../i18n/I18nProvider";

const baseLinkClassName =
  "rounded-full border px-4 py-2 text-sm font-medium transition";

const activeLinkClassName =
  "border-[var(--accent-gold)] bg-[var(--accent-gold)] text-black";

const inactiveLinkClassName =
  "border-[var(--border-main)] bg-black/35 text-[var(--text-main)] hover:border-[var(--accent-khaki)] hover:text-[var(--accent-gold)]";

export function Navigation() {
  const { messages } = useI18n();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(APP_ROUTES.login);
  };

  if (!isAuthenticated) {
    return (
      <nav className="flex flex-wrap gap-3">
        {[
          { label: messages.navigation.login, href: APP_ROUTES.login },
          { label: messages.navigation.register, href: APP_ROUTES.register },
        ].map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `${baseLinkClassName} ${isActive ? activeLinkClassName : inactiveLinkClassName}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    );
  }

  const links =
    user?.role === UserRole.Admin
      ? [{ label: messages.navigation.admin, href: APP_ROUTES.admin }]
      : [{ label: messages.navigation.terminalKits, href: APP_ROUTES.terminalKits }];

  return (
    <nav className="flex flex-wrap gap-3">
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            `${baseLinkClassName} ${isActive ? activeLinkClassName : inactiveLinkClassName}`
          }
        >
          {link.label}
        </NavLink>
      ))}
      <button
        onClick={handleLogout}
        className={`${baseLinkClassName} ${inactiveLinkClassName}`}
      >
        {messages.navigation.logout}
      </button>
    </nav>
  );
}

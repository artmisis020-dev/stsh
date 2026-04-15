export const APP_ROUTES = {
  login: "/login",
  register: "/register",
  terminalKits: "/terminal-kits",
  admin: "/admin",
  adminHistory: "/admin/history",
  adminListOfUsers: "/admin/users",
  adminListOfTerminalKits: "/admin/terminal-kits",
} as const;

export const DEFAULT_ROUTE = APP_ROUTES.login;

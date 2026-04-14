export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api",
  timeoutMs: 10000,
} as const;

export const API_ENDPOINTS = {
  health: "/health",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  users: {
    pending: "/users/pending",
    approve: (id: string) => `/users/${id}/approve`,
    reject: (id: string) => `/users/${id}/reject`,
  },
  clientRequests: {
    base: "/client-requests",
    my: "/client-requests/my",
  },
  idActions: {
    pendingAdmin: "/id-actions/pending-admin",
  },
  providerRequests: {
    base: "/provider-requests",
    results: (id: string) => `/provider-requests/${id}/results`,
  },
} as const;

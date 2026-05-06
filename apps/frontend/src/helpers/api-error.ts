import type { AxiosError } from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred.";

  const axiosError = error as AxiosError<{ message: string | string[] }>;
  const message = axiosError.response?.data?.message;

  if (message) {
    return Array.isArray(message) ? message.join(", ") : message;
  }

  return (error as Error).message || "An unexpected error occurred.";
}

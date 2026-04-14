import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ActionType, type SubmitClientRequestDto } from "@starshield/shared";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
});

const actionTypeOptions = [
  ActionType.Activate,
  ActionType.DeactivateTemp,
  ActionType.DeactivatePerm,
] as const;

export default function App() {
  const [payloadPreview, setPayloadPreview] =
    useState<SubmitClientRequestDto | null>(null);
  const healthQuery = useQuery({
    queryKey: ["api-health"],
    queryFn: async () => {
      const response = await api.get("/health");
      return response.data;
    },
    retry: false,
  });
  const { register, handleSubmit, reset } = useForm<SubmitClientRequestDto>({
    defaultValues: {
      comment: "",
      actions: [
        {
          idValue: "",
          actionType: ActionType.Activate,
        },
      ],
    },
  });

  const onSubmit = async (values: SubmitClientRequestDto) => {
    setPayloadPreview(values);

    try {
      await api.post("/client-requests", values);
    } catch {
      // Keep the scaffold usable before the backend endpoint exists.
    }

    reset(values);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            Starshield
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            ID management frontend
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Vite + React + TypeScript starter with Tailwind, React Query, Axios,
            and React Hook Form wired in for the client request workflow.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            API health:{" "}
            <span className="ml-2 font-medium text-cyan-300">
              {healthQuery.isLoading
                ? "checking"
                : healthQuery.isError
                  ? "unavailable"
                  : "connected"}
            </span>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200" htmlFor="comment">
                Comment
              </label>
              <textarea
                id="comment"
                className="min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
                placeholder="Optional request context for the admin team"
                {...register("comment")}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="idValue">
                  ID value
                </label>
                <input
                  id="idValue"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
                  placeholder="Enter an identifier"
                  {...register("actions.0.idValue", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="actionType">
                  Action type
                </label>
                <select
                  id="actionType"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
                  {...register("actions.0.actionType")}
                >
                  {actionTypeOptions.map((actionType) => (
                    <option key={actionType} value={actionType}>
                      {actionType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Submit request draft
            </button>
          </form>
        </section>

        <aside className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <h2 className="text-lg font-semibold text-white">Live payload preview</h2>
          <p className="mt-2 text-sm text-slate-400">
            This confirms shared DTOs are available to the Vite frontend.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-cyan-200">
            {payloadPreview
              ? JSON.stringify(payloadPreview, null, 2)
              : "Submit the form to preview payload"}
          </pre>
        </aside>
      </div>
    </main>
  );
}

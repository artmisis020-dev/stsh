type StatusPillProps = {
  label: string;
  value: string;
};

export function StatusPill({ label, value }: StatusPillProps) {
  return (
    <p className="inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
      {label}
      <span className="ml-2 font-medium text-cyan-300">{value}</span>
    </p>
  );
}

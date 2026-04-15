type StatusPillProps = {
  label: string;
  value: string;
};

export function StatusPill({ label, value }: StatusPillProps) {
  return (
    <p className="inline-flex rounded-full border border-[var(--accent-olive)]/60 bg-[var(--accent-olive)]/20 px-3 py-1 text-xs text-[var(--accent-khaki)]">
      {label}
      <span className="ml-2 font-medium text-[#cfe0c7]">{value}</span>
    </p>
  );
}

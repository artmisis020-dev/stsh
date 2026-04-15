type CopyButtonProps = {
  label: string;
  onClick: () => void;
};

export function CopyButton({ label, onClick }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-full border border-[var(--border-main)] bg-black/35 px-2.5 py-1 text-xs font-medium text-[var(--text-main)] transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
    >
      {label}
    </button>
  );
}

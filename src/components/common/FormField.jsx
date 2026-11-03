
export default function FormField({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-error">{error}</span>}
    </label>
  );
}

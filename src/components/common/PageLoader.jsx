export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

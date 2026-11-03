
export function EventCardSkeleton() {
  return (
    <div className="card overflow-hidden border border-base-300 bg-base-100">
      <div className="skeleton aspect-[16/10] w-full rounded-none"></div>
      <div className="space-y-3 p-5">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton h-20 w-full"></div>
      ))}
    </div>
  );
}

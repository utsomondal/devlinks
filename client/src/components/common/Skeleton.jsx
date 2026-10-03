export const SkeletonLine = ({ className = "" }) => (
  <div className={`skeleton h-4 w-full rounded-lg ${className}`} />
);

export const SkeletonCard = ({ className = "" }) => (
  <div
    className={`rounded-2xl border border-base-300/50 bg-base-100/60 p-4 ${className}`}
  >
    <div className="skeleton mb-3 h-9 w-9 rounded-xl" />
    <div className="skeleton mb-2 h-6 w-16 rounded-lg" />
    <div className="skeleton h-3 w-20 rounded-lg" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
    <div className="space-y-2">
      <div className="skeleton h-6 w-24 rounded-full" />
      <div className="skeleton h-10 w-64 max-w-full rounded-lg" />
      <div className="skeleton h-4 w-80 max-w-full rounded-lg" />
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <div className="skeleton h-64 w-full rounded-3xl" />
        <div className="skeleton h-48 w-full rounded-3xl" />
      </div>
      <div className="skeleton h-96 w-full rounded-3xl" />
    </div>
  </div>
);

export const LinksListSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex items-center gap-3 rounded-xl border border-base-300/50 p-3"
      >
        <div className="skeleton h-4 w-4 rounded" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="skeleton h-4 w-28 rounded-lg" />
          <div className="skeleton h-3 w-40 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

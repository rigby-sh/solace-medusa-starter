export default function SkeletonProductActions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-[35px] w-[100px] animate-pulse bg-skeleton-primary"></div>
      <div className="h-[1px] animate-pulse bg-skeleton-primary"></div>
      <div>
        <div className="h-[22px] w-[60px] animate-pulse bg-skeleton-primary" />
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[48px] w-[48px] animate-pulse bg-skeleton-primary"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-[48px] w-[96px] animate-pulse bg-skeleton-primary" />
        <div className="h-[48px] w-[332px] animate-pulse rounded-3xl bg-skeleton-primary" />
      </div>
    </div>
  )
}

const SkeletonCartDropdownItems = () => {
  return (
    <div className="no-scrollbar grid max-h-[402px] grid-cols-1 gap-y-3 overflow-y-scroll overscroll-contain p-5">
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="flex animate-pulse" key={index}>
          <div className="h-[90px] w-[100px] rounded-none bg-skeleton-primary"></div>

          <div className="flex w-full justify-between px-4 py-3">
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between">
                  <div className="mr-4 flex w-[220px] flex-col gap-1">
                    <div className="h-5 w-3/4 rounded bg-skeleton-primary"></div>
                    <div className="mt-2 h-4 w-1/2 rounded bg-skeleton-primary"></div>
                    <div className="mt-2 h-4 w-1/2 rounded bg-skeleton-primary"></div>
                    <div className="mt-3 h-5 w-1/3 rounded bg-skeleton-primary"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-6 w-6 rounded-full bg-skeleton-primary"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonCartDropdownItems

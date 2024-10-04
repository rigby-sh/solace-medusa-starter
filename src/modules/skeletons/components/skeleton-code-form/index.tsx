const SkeletonCodeForm = () => {
  return (
    <div className="flex w-full flex-col bg-gray-50">
      <div className="grid grid-cols-[1fr_48px] gap-x-2 p-5">
        <div className="h-12 animate-pulse bg-gray-100"></div>
        <div className="h-12 animate-pulse bg-gray-100"></div>
      </div>
    </div>
  )
}

export default SkeletonCodeForm

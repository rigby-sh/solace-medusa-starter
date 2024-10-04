import SkeletonButton from '@modules/skeletons/components/skeleton-button'
import SkeletonCartTotals from '@modules/skeletons/components/skeleton-cart-totals'
import SkeletonCodeForm from '@modules/skeletons/components/skeleton-code-form'

const SkeletonOrderSummary = () => {
  return (
    <div className="flex w-full flex-col gap-2 large:w-[326px] xl:w-[437px]">
      <SkeletonCodeForm />
      <div className="flex flex-col gap-5 bg-gray-50 p-5">
        <SkeletonCartTotals header={false} />
        <SkeletonButton />
      </div>
    </div>
  )
}

export default SkeletonOrderSummary

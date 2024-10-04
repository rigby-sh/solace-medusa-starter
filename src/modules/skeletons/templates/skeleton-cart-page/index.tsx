import repeat from '@lib/util/repeat'
import { Container } from '@modules/common/components/container'
import SkeletonCartItem from '@modules/skeletons/components/skeleton-cart-item'
import SkeletonOrderSummary from '@modules/skeletons/components/skeleton-order-summary'

const SkeletonCartPage = () => {
  return (
    <Container className="flex items-center justify-center">
      <div className="flex w-full flex-col gap-6 large:flex-row large:justify-between large:gap-0">
        <div className="flex max-w-[765px] shrink grow flex-col gap-4 large:mr-12">
          {repeat(4).map((index) => (
            <SkeletonCartItem key={index} />
          ))}
        </div>
        <div className="relative">
          <div className="sticky top-12 flex flex-col gap-y-8">
            <SkeletonOrderSummary />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SkeletonCartPage

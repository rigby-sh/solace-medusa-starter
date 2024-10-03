import repeat from '@lib/util/repeat'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import Item from '@modules/order/components/item'
import SkeletonLineItem from '@modules/skeletons/components/skeleton-line-item'

type ItemsProps = {
  items: HttpTypes.StoreCartLineItem[] | HttpTypes.StoreOrderLineItem[] | null
}

const Items = ({ items }: ItemsProps) => {
  return (
    <Box className="flex flex-col">
      {items?.length
        ? items
            .sort((a, b) => {
              return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1
            })
            .map((item) => {
              return <Item key={item.id} item={item} />
            })
        : repeat(5).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </Box>
  )
}

export default Items

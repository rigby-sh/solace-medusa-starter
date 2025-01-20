'use client'

import repeat from '@lib/util/repeat'
import { HttpTypes } from '@medusajs/types'
import { clx } from '@medusajs/ui'
import Item from '@modules/cart/components/item'
import { Box } from '@modules/common/components/box'
import SkeletonLineItem from '@modules/skeletons/components/skeleton-line-item'

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
}

const ItemsPreviewTemplate = ({ items }: ItemsTemplateProps) => {
  const hasOverflow = items && items.length > 4

  return (
    <Box
      className={clx({
        'no-scrollbar max-h-[420px] overflow-x-hidden overflow-y-scroll pl-[1px]':
          hasOverflow,
      })}
    >
      <Box
        data-testid="items-table"
        className="flex flex-col gap-y-2 border-none"
      >
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1
              })
              .map((item) => {
                return <Item key={item.id} item={item} type="preview" />
              })
          : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </Box>
    </Box>
  )
}

export default ItemsPreviewTemplate

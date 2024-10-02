'use client'

import { useState } from 'react'

import { updateLineItem } from '@lib/data/cart'
import { HttpTypes } from '@medusajs/types'
import ErrorMessage from '@modules/checkout/components/error-message'
import { Box } from '@modules/common/components/box'
import DeleteButton from '@modules/common/components/delete-button'
import { Heading } from '@modules/common/components/heading'
import LineItemOptions from '@modules/common/components/line-item-options'
import LineItemPrice from '@modules/common/components/line-item-price'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@modules/common/components/select'
import Spinner from '@modules/common/icons/spinner'
import Thumbnail from '@modules/products/components/thumbnail'

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: 'full' | 'preview'
}

const Item = ({ item, type = 'full' }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQuantity =
    item.variant.inventory_quantity > 0 ? item.variant.inventory_quantity : 10

  return (
    <Box className="flex bg-primary small:h-[172px]">
      <Box>
        <LocalizedClientLink href={`/products/${handle}`}>
          <Thumbnail
            className="h-[92px] rounded-none small:h-full"
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Box>
      <Box className="flex w-full justify-between p-5">
        <Box className="flex h-full flex-col gap-3 small:justify-between small:gap-0">
          <Box>
            <LocalizedClientLink href={`/products/${handle}`}>
              <Heading as="h3" className="line-clamp-2 text-md font-medium">
                {item.product_title}
              </Heading>
            </LocalizedClientLink>
            <LineItemOptions
              variant={item.variant}
              data-testid="product-variant"
            />
          </Box>
          <Box className="block w-max small:hidden">
            <LineItemPrice item={item} style="tight" />
          </Box>
          <Box className="flex items-center gap-2">
            <Box className="flex w-[108px] flex-col gap-2">
              <Select
                value={null}
                onValueChange={(quantity) => {
                  changeQuantity(+quantity)
                }}
              >
                <SelectTrigger>{item.quantity}</SelectTrigger>
                <SelectContent>
                  {Array.from(
                    {
                      length: Math.min(maxQuantity, 10),
                    },
                    (_, i) => (
                      <SelectItem
                        key={i}
                        value={String(i + 1)}
                        className="w-[108px]"
                      >
                        {i + 1}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <ErrorMessage error={error} />
            </Box>
            {updating && <Spinner />}
          </Box>
        </Box>
        <Box className="flex flex-col items-end justify-between">
          <DeleteButton id={item.id} className="w-12" />
          <Box className="hidden small:block">
            <LineItemPrice item={item} style="tight" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default Item

'use client'

import { useState } from 'react'

import { updateLineItem } from '@lib/data/cart'
import { cn } from '@lib/util/cn'
import { HttpTypes } from '@medusajs/types'
import ErrorMessage from '@modules/checkout/components/error-message'
import { Box } from '@modules/common/components/box'
import DeleteButton from '@modules/common/components/delete-button'
import { Heading } from '@modules/common/components/heading'
import LineItemOptions from '@modules/common/components/line-item-options'
import LineItemPrice from '@modules/common/components/line-item-price'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import { Spinner } from '@modules/common/icons'
import Thumbnail from '@modules/products/components/thumbnail'

import ItemQtySelect from '../item-qty-select'

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
    <Box className="flex bg-primary small:h-[172px]" data-testid="cart-item">
      <Box>
        <LocalizedClientLink href={`/products/${handle}`}>
          <Thumbnail
            className="h-[92px] max-w-[92px] rounded-none small:h-full small:max-w-[146px]"
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
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
          {type === 'full' ? (
            <Box className="flex items-center gap-2">
              <Box className="flex w-[108px] flex-col gap-2">
                <ItemQtySelect
                  qty={item.quantity}
                  maxQuantity={maxQuantity}
                  action={changeQuantity}
                />
                <ErrorMessage error={error} />
              </Box>
              {updating && <Spinner />}
            </Box>
          ) : (
            <Text>{item.quantity} item</Text>
          )}
        </Box>
        <Box
          className={cn('flex flex-col items-end justify-between', {
            'justify-end': type === 'preview',
          })}
        >
          {type === 'full' && (
            <DeleteButton id={item.id} className="w-12 hover:bg-transparent" />
          )}
          <Box className="hidden small:block">
            <LineItemPrice item={item} style="tight" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default Item

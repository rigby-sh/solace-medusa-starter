import React from 'react'

import { cn } from '@lib/util/cn'
import { getPercentageDiff } from '@lib/util/get-precentage-diff'
import { getPricesForVariant } from '@lib/util/get-product-price'
import { convertToLocale } from '@lib/util/money'
import { HttpTypes } from '@medusajs/types'

import { Text } from '../text'

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  className?: string
  style?: 'default' | 'tight'
  isInCartDropdown?: boolean
}

const LineItemPrice = ({
  item,
  className,
  style = 'default',
  isInCartDropdown = false,
}: LineItemPriceProps) => {
  const { currency_code, calculated_price_number, original_price_number } =
    getPricesForVariant(item.variant) ?? {}

  const adjustmentsSum = (item.adjustments || []).reduce(
    (acc, adjustment) => adjustment.amount + acc,
    0
  )

  const originalPrice = original_price_number * item.quantity
  const currentPrice = calculated_price_number * item.quantity - adjustmentsSum
  const hasReducedPrice = currentPrice < originalPrice

  return (
    <div
      className={cn(
        'flex flex-row-reverse items-center gap-2',
        className,
        isInCartDropdown
          ? 'small:flex-row-reverse'
          : 'small:flex-col small:items-end small:gap-0'
      )}
    >
      {hasReducedPrice && (
        <>
          <div>
            {style === 'default' && (
              <span className="text-basic-primary">Original: </span>
            )}
            <Text
              size="md"
              className="text-secondary line-through"
              data-testid="product-original-price"
            >
              {convertToLocale({
                amount: originalPrice,
                currency_code,
              })}
            </Text>
          </div>
          {style === 'default' && (
            <span className="text-ui-fg-interactive">
              -{getPercentageDiff(originalPrice, currentPrice || 0)}%
            </span>
          )}
        </>
      )}
      <span className="text-lg text-basic-primary" data-testid="product-price">
        {convertToLocale({
          amount: currentPrice,
          currency_code,
        })}
      </span>
    </div>
  )
}

export default LineItemPrice

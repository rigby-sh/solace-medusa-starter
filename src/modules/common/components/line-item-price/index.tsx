import React from 'react'

import { getPercentageDiff } from '@lib/util/get-precentage-diff'
import { getPricesForVariant } from '@lib/util/get-product-price'
import { convertToLocale } from '@lib/util/money'
import { HttpTypes } from '@medusajs/types'

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: 'default' | 'tight'
}

const LineItemPrice = ({ item, style = 'default' }: LineItemPriceProps) => {
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
    <div className="flex flex-col items-end gap-x-2 text-basic-primary">
      <div className="flex flex-row-reverse items-center gap-2 small:flex-col small:items-end small:gap-0">
        {hasReducedPrice && (
          <>
            <p>
              {style === 'default' && (
                <span className="text-basic-primary">Original: </span>
              )}
              <span
                className="text-md text-secondary line-through"
                data-testid="product-original-price"
              >
                {convertToLocale({
                  amount: originalPrice,
                  currency_code,
                })}
              </span>
            </p>
            {style === 'default' && (
              <span className="text-ui-fg-interactive">
                -{getPercentageDiff(originalPrice, currentPrice || 0)}%
              </span>
            )}
          </>
        )}
        <span
          className="text-lg text-basic-primary"
          data-testid="product-price"
        >
          {convertToLocale({
            amount: currentPrice,
            currency_code,
          })}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice

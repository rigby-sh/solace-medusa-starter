'use client'

import React from 'react'

import { convertToLocale } from '@lib/util/money'
import { Box } from '@modules/common/components/box'
import Divider from '@modules/common/components/divider'

type CartTotalsProps = {
  totals: {
    item_subtotal?: number | null
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    shipping_total,
    discount_total,
    item_subtotal,
  } = totals

  return (
    <Box className="flex flex-col gap-4 text-md text-secondary small:gap-5">
      <Box className="flex flex-col gap-2">
        <Box className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">
            Subtotal (excl. shipping and taxes)
          </span>
          <span
            data-value={item_subtotal || 0}
            className="text-lg text-basic-primary"
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </Box>
        {!!discount_total && (
          <Box className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-secondary"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{' '}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </Box>
        )}
        <Box className="flex items-center justify-between">
          <span>Delivery</span>
          <span
            className="text-lg text-basic-primary"
            data-value={shipping_total || 0}
          >
            {convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </span>
        </Box>
        <Box className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">Taxes</span>
          <span
            data-value={tax_total || 0}
            className="text-lg text-basic-primary"
          >
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </Box>
      </Box>
      <Divider />
      <Box className="flex items-center justify-between">
        <span>Total</span>
        <span
          className="text-xl font-semibold text-basic-primary"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </Box>
    </Box>
  )
}

export default CartTotals

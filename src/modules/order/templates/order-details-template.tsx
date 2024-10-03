'use client'

import React from 'react'

import { XMark } from '@medusajs/icons'
import { HttpTypes } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import Help from '@modules/order/components/help'
import Items from '@modules/order/components/items'
import OrderDetails from '@modules/order/components/order-details'
import OrderSummary from '@modules/order/components/order-summary'
import ShippingDetails from '@modules/order/components/shipping-details'

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl-semi">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex items-center gap-2 text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex h-full w-full flex-col gap-4 bg-white"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} />
        <Items items={order.items} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate

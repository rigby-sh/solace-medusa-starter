'use client'

import React from 'react'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ArrowLeftIcon } from '@modules/common/icons'
import Items from '@modules/order/components/items'
import OrderDetails from '@modules/order/components/order-details'
import OrderSummary from '@modules/order/components/order-summary'
import ShippingDetails from '@modules/order/components/shipping-details'

import PaymentDetails from '../components/payment-details'

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder & { status: string }
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <Box className="flex flex-col justify-center gap-6 small:gap-8">
      <Button variant="tonal" size="sm" asChild className="w-max">
        <LocalizedClientLink
          href="/account/orders"
          data-testid="back-to-overview-button"
        >
          <ArrowLeftIcon />
          Order history
        </LocalizedClientLink>
      </Button>
      <Heading as="h2" className="text-2xl small:text-3xl">
        Order #{order.display_id}
      </Heading>
      <Box
        className="flex h-full w-full flex-col gap-4"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} />
        <Items items={order.items} />
        <OrderSummary order={order} />
        <ShippingDetails order={order} />
        <PaymentDetails order={order} />
      </Box>
    </Box>
  )
}

export default OrderDetailsTemplate

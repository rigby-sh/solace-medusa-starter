'use client'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { BoxIcon } from '@modules/common/icons'

import OrderCard from '../order-card'

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    )
  }

  return (
    <Box
      className="flex w-full flex-col items-center gap-6"
      data-testid="no-orders-container"
    >
      <BoxIcon />
      <Box className="flex flex-col items-center gap-2">
        <Heading as="h2" className="text-xl text-basic-primary small:text-2xl">
          No order updates
        </Heading>
        <Text className="max-w-[438px] text-center text-md text-secondary">
          No latest updates on your orders. Start shopping to see your latest
          order activity here.
        </Text>
      </Box>
    </Box>
  )
}

export default OrderOverview

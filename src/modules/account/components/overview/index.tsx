import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

import OrderCard from '../order-card'
import { NoOrders, OrderType } from '../order-overview'

type OverviewProps = {
  orders: OrderType[] | null
}

const Overview = ({ orders }: OverviewProps) => {
  return (
    <Box
      data-testid="overview-page-wrapper"
      className="flex flex-col gap-4 small:gap-6"
    >
      <Box className="flex items-center justify-between">
        <Heading as="h2" className="text-xl small:text-2xl">
          Latest order updates
        </Heading>
        <Button variant="text" size="sm" asChild className="w-max">
          <LocalizedClientLink href={`/account/orders`}>
            View all
          </LocalizedClientLink>
        </Button>
      </Box>
      <Box className="flex flex-col gap-4">
        {orders && orders.length > 0 ? (
          orders.slice(0, 2).map((order) => {
            return <OrderCard key={order.id} order={order} />
          })
        ) : (
          <Box className="py-10">
            <NoOrders />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Overview

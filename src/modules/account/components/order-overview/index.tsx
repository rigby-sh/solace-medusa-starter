import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { BoxIcon } from '@modules/common/icons'
import { Pagination } from '@modules/store/components/pagination'
import { ORDERS_LIMIT } from 'app/[countryCode]/(main)/account/@dashboard/orders/page'

import OrderCard from '../order-card'

const OrderOverview = ({
  orders,
  page,
}: {
  orders: HttpTypes.StoreOrder[]
  page: string
}) => {
  const totalPages = Math.ceil(orders.length / ORDERS_LIMIT)
  const pageNumber = page ? parseInt(page) : 1

  if (orders?.length) {
    return (
      <Box className="flex flex-col gap-8">
        <Box className="flex w-full flex-col gap-4">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </Box>
        {totalPages > 1 && (
          <Pagination
            data-testid="orders-pagination"
            page={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Box>
    )
  }

  return <NoOrders />
}

export function NoOrders() {
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

import { HttpTypes } from '@medusajs/types'
import { Text } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import Divider from '@modules/common/components/divider'

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const formattedOrderDate = new Date(order.created_at).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
  )

  return (
    <Box className="rounded-xl bg-primary p-2 medium:grid medium:grid-cols-[1fr,auto,1fr]">
      <Box className="p-4">
        <Text size="large">Order number</Text>
        <Text size="base" className="text-secondary">
          #{order.display_id}
        </Text>
      </Box>
      <Box className="p-4">
        <Divider alignment="vertical" />
      </Box>
      <Box className="p-4">
        <Text size="large">Order date</Text>
        <Text size="base" className="text-secondary">
          {formattedOrderDate}
        </Text>
      </Box>
    </Box>
  )
}

export default OrderDetails

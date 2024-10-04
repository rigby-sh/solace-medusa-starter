import { paymentInfoMap } from '@lib/constants'
import { HttpTypes } from '@medusajs/types'
import { Text } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <Box className="rounded-xl bg-primary p-2">
      <Box className="p-4">
        <Text size="large">Delivery method</Text>
        <Text size="base" className="text-secondary">
          {order.shipping_methods[0].name}
        </Text>
      </Box>

      <Box className="p-4">
        <Text size="large">Payment method</Text>
        <Text size="base" className="text-secondary">
          {paymentInfoMap[payment.provider_id].title}
        </Text>
      </Box>
    </Box>
  )
}

export default PaymentDetails

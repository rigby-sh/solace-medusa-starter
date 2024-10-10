import { getFulfillmentStatus } from '@lib/util/format-order'
import { convertToLocale } from '@lib/util/money'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'

import Thumbnail from './thumbnail'

export default async function OrderCard({
  order,
}: {
  order: HttpTypes.StoreOrder
}) {
  const countryCode = order.shipping_address?.country_code
  const fulfillmentStatus = getFulfillmentStatus(order.fulfillment_status)

  return (
    <Box className="flex flex-col bg-primary large:flex-row">
      <Box className="flex justify-between p-4 large:p-5 large:pr-0">
        <Box className="flex min-w-[160px] flex-col gap-4 text-md text-basic-primary">
          <Text>{fulfillmentStatus}</Text>
          <div className="flex flex-col gap-1">
            <Text>
              {new Date(order.created_at)
                .toLocaleDateString(countryCode, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                .replace('.', '')}
            </Text>
            <Text className="text-secondary">#{order.display_id}</Text>
          </div>
          <Text className="text-lg">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </Text>
        </Box>
        <Button
          variant="tonal"
          size="sm"
          asChild
          className="flex justify-end large:hidden"
        >
          <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
            View order
          </LocalizedClientLink>
        </Button>
      </Box>
      <Box className="flex w-full justify-between gap-1 p-4 large:p-5 large:pl-0">
        <Box className="flex flex-wrap items-center gap-2 large:py-5">
          {order.items.slice(0, 2).map((item, index) => (
            <Thumbnail
              key={index}
              thumbnail={item.thumbnail}
              href={`/${countryCode}/products/${item.product_handle}`}
              size="big"
              className="xl:hidden"
            />
          ))}
          {order.items.slice(0, 5).map((item, index) => (
            <Thumbnail
              key={index}
              thumbnail={item.thumbnail}
              href={`/${countryCode}/products/${item.product_handle}`}
              className="hidden xl:block"
            />
          ))}
          {order.items.length > 2 && (
            <Thumbnail
              more={`+${order.items.length - 2}`}
              href={`/${countryCode}/account/orders/details/${order.id}`}
              size="big"
              className="xl:hidden"
            />
          )}
          {order.items.length > 5 && (
            <Thumbnail
              more={`+${order.items.length - 5}`}
              href={`/${countryCode}/account/orders/details/${order.id}`}
              className="hidden xl:block"
            />
          )}
        </Box>
        <Button
          variant="tonal"
          size="sm"
          asChild
          className="hidden w-max justify-end large:flex"
        >
          <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
            View order
          </LocalizedClientLink>
        </Button>
      </Box>
    </Box>
  )
}

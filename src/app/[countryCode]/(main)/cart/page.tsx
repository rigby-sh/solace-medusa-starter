import { Metadata } from 'next'

import { enrichLineItems, retrieveCart } from '@lib/data/cart'
import { getCustomer } from '@lib/data/customer'
import { getProductsList } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'
import CartTemplate from '@modules/cart/templates'
import { Container } from '@modules/common/components/container'
import { ProductCarousel } from '@modules/products/components/product-carousel'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart',
}

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems
  }

  return cart
}

export default async function Cart({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)
  const cart = await fetchCart()
  const customer = await getCustomer()
  const {
    response: { products },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      limit: 9,
    },
    countryCode,
  })

  return (
    <Container className="max-w-full bg-secondary !p-0">
      <CartTemplate cart={cart} customer={customer} />
      <ProductCarousel
        products={products}
        title="You may also like"
        regionId={region.id}
      />
    </Container>
  )
}

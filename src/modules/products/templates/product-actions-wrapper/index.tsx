import { getProductsById } from '@lib/data/products'
import { HttpTypes } from '@medusajs/types'
import ProductActions from '@modules/products/components/product-actions'
import { VariantColor } from 'types/strapi'

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
  cartItems,
  colors,
}: {
  id: string
  region: HttpTypes.StoreRegion
  cartItems: HttpTypes.StoreCartLineItem[]
  colors: VariantColor[]
}) {
  const [product] = await getProductsById({
    ids: [id],
    regionId: region.id,
  })

  if (!product) {
    return null
  }

  return (
    <ProductActions
      product={product}
      region={region}
      cartItems={cartItems}
      colors={colors}
    />
  )
}

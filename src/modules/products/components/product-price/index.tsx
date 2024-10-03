import React from 'react'

import { getProductPrice } from '@lib/util/get-product-price'
import { HttpTypes } from '@medusajs/types'

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse bg-gray-100" />
  }

  return (
    <div className="flex items-center gap-x-2">
      <span className="text-2xl text-basic-primary">
        {!variant && 'From '}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === 'sale' && (
        <>
          <p>
            <span
              className="text-md text-secondary line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
        </>
      )}
    </div>
  )
}

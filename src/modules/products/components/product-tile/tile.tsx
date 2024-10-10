import { useMemo } from 'react'

import { StoreProduct } from '@medusajs/types'
import { Badge } from '@modules/common/components/badge'
import { Box } from '@modules/common/components/box'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

import { ProductActions } from './action'
import { LoadingImage } from './loading-image'
import ProductPrice from './price'

export function ProductTileClient({
  product,
  cheapestPrice,
}: {
  product: StoreProduct
  cheapestPrice: {
    calculated_price_number: any
    calculated_price: string
    original_price_number: any
    original_price: string
    currency_code: any
    price_type: any
    percentage_diff: string
  }
}) {
  const isNew = useMemo(() => {
    const createdAt = new Date(product.created_at)
    const currentDate = new Date()
    const differenceInDays =
      (currentDate.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)

    return differenceInDays <= 7
  }, [product.created_at])

  return (
    <Box className="group flex flex-col">
      <Box className="relative h-[290px] small:h-[504px]">
        {isNew && (
          <Box className="absolute left-3 top-3 z-10 small:left-5 small:top-5">
            <Badge label="New product" variant="brand" />
          </Box>
        )}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <LoadingImage
            src={product.thumbnail}
            alt={product.title}
            priority
            className="h-full w-full object-cover"
          />
        </LocalizedClientLink>
        <ProductActions product={product} />
      </Box>
      <ProductInfo product={product} cheapestPrice={cheapestPrice} />
    </Box>
  )
}

function ProductInfo({
  product,
  cheapestPrice,
}: {
  product: StoreProduct
  cheapestPrice: {
    calculated_price_number: number
    calculated_price: string
    original_price_number: number
    original_price: string
    currency_code: string
    price_type: string
    percentage_diff: string
  }
}) {
  return (
    <Box className="flex flex-col gap-3 p-4 small:gap-6 small:p-5">
      <div className="flex flex-col gap-4">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="mx-auto w-max"
        >
          <Heading
            title={product.title}
            as="h3"
            className="line-clamp-2 text-center text-lg text-basic-primary"
          >
            {product.title}
          </Heading>
        </LocalizedClientLink>
        <ProductPrice price={cheapestPrice} />
      </div>
    </Box>
  )
}

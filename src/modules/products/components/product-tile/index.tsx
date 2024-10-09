'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { addToCart } from '@lib/data/cart'
import { cn } from '@lib/util/cn'
import { getProductPrice } from '@lib/util/get-product-price'
import { StoreProduct } from '@medusajs/types'
import { Badge } from '@modules/common/components/badge'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { BagIcon, Spinner } from '@modules/common/icons'

import ProductPrice from './price'

export default function ProductTile({ product }: { product: StoreProduct }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const countryCode = useParams().countryCode as string
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isNew = useMemo(() => {
    const createdAt = new Date(product.created_at)
    const currentDate = new Date()
    const differenceInDays =
      (currentDate.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)

    return differenceInDays <= 7
  }, [product.created_at])

  const handleAddToCart = async () => {
    if (!product.id) return null

    setIsAddingToCart(true)
    try {
      const { id: variantId } = product.variants.reduce(
        (cheaperVariant, currentVariant) => {
          const { original_amount: cheaperPrice } =
            cheaperVariant.calculated_price
          const { original_amount: currentPrice } =
            currentVariant.calculated_price

          return cheaperPrice < currentPrice ? cheaperVariant : currentVariant
        }
      )

      await addToCart({
        variantId,
        quantity: 1,
        countryCode,
      })
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Box className="group flex flex-col">
      <Box className="relative h-[290px] small:h-[504px]">
        {isNew && (
          <Box className="absolute left-3 top-3 z-10 small:left-5 small:top-5">
            <Badge label="New product" variant="brand" />
          </Box>
        )}

        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </LocalizedClientLink>
        <Button
          withIcon
          disabled={isAddingToCart}
          className={cn(
            'absolute bottom-3 right-3 opacity-100 transition-opacity duration-300 group-hover:opacity-100 small:bottom-5 small:right-5 large:opacity-0',
            { '!px-4': isAddingToCart }
          )}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? <Spinner /> : <BagIcon />}
        </Button>
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

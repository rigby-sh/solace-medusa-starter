'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import { addToCart } from '@lib/data/cart'
import { cn } from '@lib/util/cn'
import { StoreProduct } from '@medusajs/types'
import { Button } from '@modules/common/components/button'
import { BagIcon, Spinner } from '@modules/common/icons'

export function ProductActions({ product }: { product: StoreProduct }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const countryCode = useParams().countryCode as string

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
    <Button
      withIcon
      disabled={isAddingToCart}
      className={cn(
        'absolute bottom-3 right-3 opacity-100 transition-opacity duration-300 group-hover:opacity-100 small:bottom-5 small:right-5 large:opacity-0',
        { 'pointer-events-none !px-4': isAddingToCart }
      )}
      onClick={handleAddToCart}
    >
      {isAddingToCart ? <Spinner /> : <BagIcon />}
    </Button>
  )
}

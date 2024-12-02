'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import { addToCart } from '@lib/data/cart'
import { getProductByHandle } from '@lib/data/products'
import { cn } from '@lib/util/cn'
import { Button } from '@modules/common/components/button'
import { toast } from '@modules/common/components/toast'
import { BagIcon, Spinner } from '@modules/common/icons'

export function ProductActions({
  productId,
  productHandle,
  regionId,
}: {
  productId: string
  productHandle: string
  regionId: string
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const countryCode = useParams().countryCode as string

  const handleAddToCart = async () => {
    if (!productId || !regionId) return null

    try {
      setIsAddingToCart(true)
      const detailedProduct = await getProductByHandle(productHandle, regionId)
      const cheapestVariant = detailedProduct.variants.reduce(
        (cheapest, current) =>
          cheapest.calculated_price.original_amount <
          current.calculated_price.original_amount
            ? cheapest
            : current
      )

      if (cheapestVariant.inventory_quantity <= 0) {
        return toast('error', 'Product is out of stock')
      }

      await addToCart({
        variantId: cheapestVariant.id,
        quantity: 1,
        countryCode,
      })

      toast('success', 'Product was added to cart!')
    } catch (error) {
      toast('error', error)
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

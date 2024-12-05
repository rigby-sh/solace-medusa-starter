'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import { addToCartCheapestVariant } from '@lib/data/cart'
import { useCartStore } from '@lib/store/useCartStore'
import { cn } from '@lib/util/cn'
import { Button } from '@modules/common/components/button'
import { toast } from '@modules/common/components/toast'
import { BagIcon, Spinner } from '@modules/common/icons'

export function ProductActions({
  productHandle,
  regionId,
}: {
  productHandle: string
  regionId: string
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { openCartDropdown } = useCartStore()
  const countryCode = useParams().countryCode as string

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    try {
      const result = await addToCartCheapestVariant({
        productHandle,
        regionId,
        countryCode,
      })

      if (result.success) {
        setTimeout(() => {
          openCartDropdown()

          toast('success', result.message)
        }, 1000)
      } else {
        toast('error', result.error)
      }
    } catch (error) {
      toast('error', 'An unexpected error occurred')
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

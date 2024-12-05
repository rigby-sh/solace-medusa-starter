'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'

import { addToCart } from '@lib/data/cart'
import { useCartStore } from '@lib/store/useCartStore'
import { HttpTypes } from '@medusajs/types'
import ItemQtySelect from '@modules/cart/components/item-qty-select'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import Divider from '@modules/common/components/divider'
import { Text } from '@modules/common/components/text'
import { toast } from '@modules/common/components/toast'
import OptionSelect from '@modules/products/components/product-actions/option-select'
import { isEqual } from 'lodash'
import { VariantColor } from 'types/strapi'

import ProductPrice from '../product-price'

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  cartItems: HttpTypes.StoreCartLineItem[]
  colors: VariantColor[]
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant['options']
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  cartItems,
  colors,
  disabled,
}: ProductActionsProps) {
  const { openCartDropdown } = useCartStore()
  const actionsRef = useRef<HTMLDivElement>(null)
  const [qty, setQty] = useState(1)
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: qty,
        countryCode,
      })
    } catch (error) {
      toast('error', error)
    } finally {
      setTimeout(() => {
        openCartDropdown()
        toast('success', 'Product was added to cart!')
      }, 1000)

      setIsAdding(false)
    }
  }

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  // Get the max quantity
  const maxQuantity = useMemo(() => {
    if (!selectedVariant || !cartItems) return 10

    const cartQuantity =
      cartItems.reduce((sum, item) => {
        if (item.variant_id === selectedVariant?.id) {
          return sum + item.quantity
        }
        return sum
      }, 0) || 0

    if (
      selectedVariant?.inventory_quantity !== null &&
      selectedVariant?.inventory_quantity !== undefined
    ) {
      return Math.max(0, selectedVariant.inventory_quantity - cartQuantity)
    }

    return 10 - cartQuantity
  }, [selectedVariant, cartItems])

  // Preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    } else if (product.variants && product.variants.length > 1) {
      const sortedVariants = [...product.variants].sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      )
      const firstAlphabeticalVariant = sortedVariants[0]
      if (firstAlphabeticalVariant) {
        const variantOptions = optionsAsKeymap(firstAlphabeticalVariant.options)
        setOptions(variantOptions ?? {})
      }
    }
  }, [product.variants])

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        <ProductPrice product={product} variant={selectedVariant} />
        <Divider />
        <div>
          {product.variants.length > 0 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      variantsColors={colors}
                      title={option.title ?? ''}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <Box className="flex items-center gap-x-3">
          <Box className="min-w-[96px]">
            <ItemQtySelect
              qty={qty}
              maxQuantity={maxQuantity}
              action={setQty}
            />
          </Box>
          <Button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              maxQuantity === 0
            }
            className="w-full"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            {!selectedVariant
              ? 'Select variant'
              : !inStock
                ? 'Out of stock'
                : 'Add to cart'}
          </Button>
        </Box>
        {maxQuantity === 0 && inStock && (
          <Text size="sm" className="text-negative">
            You cannot add more items to your cart - you already have the
            maximum number in cart.
          </Text>
        )}
      </div>
    </>
  )
}

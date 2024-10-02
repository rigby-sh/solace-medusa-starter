'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { FILTER_KEYS } from '@lib/constants'
import { useActiveFilterHandles } from '@lib/hooks/use-active-filter-handle'
import { useClearFiltersUrl } from '@lib/hooks/use-clear-filters-url'
import { StoreCollection, StoreProductCategory } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { PRICING_OPTIONS } from '@modules/search/const'

import ActiveFilterItem from './active-filter-item'

type ActiveProductFiltersProps = {
  currentCategory?: StoreProductCategory
  collectionsOptions?: StoreCollection[]
  countryCode: string
}

export default function ActiveProductFilters({
  currentCategory,
  collectionsOptions,
  countryCode,
}: ActiveProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCollectionHandles = useActiveFilterHandles({
    key: FILTER_KEYS.COLLECTION_KEY,
  })
  const activeCollections = collectionsOptions?.filter((collection) => {
    return activeCollectionHandles?.includes(collection.handle)
  })

  const activePricesHandles = useActiveFilterHandles({
    key: FILTER_KEYS.PRICE_KEY,
  })
  const activePrices = PRICING_OPTIONS?.filter((price) => {
    return activePricesHandles?.includes(price.handle)
  })

  const clearAllUrl = useClearFiltersUrl()

  const handleRemoveFilter = (key: string, handle: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const values = params.get(key)?.split(',') || []
    const newValues = values.filter((value) => value !== handle)

    if (newValues.length > 0) {
      params.set(key, newValues.join(','))
    } else {
      params.delete(key)
    }

    const basePath = currentCategory
      ? `/${countryCode}/categories/${currentCategory.handle}`
      : `/${countryCode}/shop`

    router.push(
      params.toString() ? `${basePath}?${params.toString()}` : `${basePath}`
    )
  }

  if (
    !currentCategory &&
    activeCollections?.length === 0 &&
    activePrices?.length === 0
  ) {
    return null
  }

  return (
    <Box className="flex flex-wrap gap-4 gap-y-2">
      {activeCollections?.length > 0 && (
        <ActiveFilterItem
          label="Collection"
          filterKey={FILTER_KEYS.COLLECTION_KEY}
          options={activeCollections?.map((collection) => ({
            label: collection.title,
            handle: collection.handle,
          }))}
          handleRemoveFilter={handleRemoveFilter}
        />
      )}
      {activePrices?.length > 0 && (
        <ActiveFilterItem
          label="Price"
          filterKey={FILTER_KEYS.PRICE_KEY}
          options={activePrices}
          handleRemoveFilter={handleRemoveFilter}
        />
      )}
      <Button asChild variant="text" className="py-2">
        <LocalizedClientLink href={clearAllUrl}>
          Clear filters
        </LocalizedClientLink>
      </Button>
    </Box>
  )
}

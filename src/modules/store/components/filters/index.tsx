'use client'

import { StoreCollection } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import {
  Select,
  SelectContent,
  SelectTrigger,
} from '@modules/common/components/select'
import { PRICING_OPTIONS } from '@modules/search/const'

import { FilterItems } from './filter-item'

export default function ProductFilters({
  collections,
}: {
  collections: StoreCollection[]
}) {
  // TODO: Add rest of filters after meilisearch connection
  const collectionOptions = collections.map((collection) => ({
    handle: collection.handle,
    label: collection.title,
  }))

  const priceOptions = PRICING_OPTIONS.map((po) => ({
    ...po,
    // For logic
    // disabled: !priceDistribution?.[po.handle],
  }))

  return (
    <>
      <Box className="flex w-full items-center gap-2">
        {collectionOptions && collectionOptions.length > 0 && (
          <Select value={null} onValueChange={() => {}}>
            <SelectTrigger className="mt-2">Collections</SelectTrigger>
            <SelectContent className="w-full">
              <FilterItems items={collectionOptions} param="collection" />
            </SelectContent>
          </Select>
        )}
        <Select value={null} onValueChange={() => {}}>
          <SelectTrigger className="mt-2">Price</SelectTrigger>
          <SelectContent>
            <FilterItems items={priceOptions} param="price" />
          </SelectContent>
        </Select>
      </Box>
    </>
  )
}

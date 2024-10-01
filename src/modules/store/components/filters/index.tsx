'use client'

import React from 'react'

import { StoreCollection } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import Divider from '@modules/common/components/divider'
import {
  Select,
  SelectContent,
  SelectTrigger,
} from '@modules/common/components/select'
import { PRICING_OPTIONS } from '@modules/search/const'

import { FilterItems } from './filter-item'
import FilterWrapper from './filter-wrapper'

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
      <Box className="flex flex-col gap-4 small:hidden">
        <FilterWrapper
          title="Collections"
          content={<FilterItems items={collectionOptions} param="collection" />}
        />
        <Divider />
        <FilterWrapper
          title="Price"
          content={<FilterItems items={priceOptions} param="price" />}
        />
      </Box>
      <Box className="hidden items-center gap-2 small:flex">
        {collectionOptions && collectionOptions.length > 0 && (
          <Select value={null} onValueChange={() => {}}>
            <SelectTrigger>Collections</SelectTrigger>
            <SelectContent className="w-full">
              <FilterItems items={collectionOptions} param="collection" />
            </SelectContent>
          </Select>
        )}
        <Select value={null} onValueChange={() => {}}>
          <SelectTrigger>Price</SelectTrigger>
          <SelectContent>
            <FilterItems items={priceOptions} param="price" />
          </SelectContent>
        </Select>
      </Box>
    </>
  )
}

import { Suspense } from 'react'

import { StoreCollection } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import RefinementList from '@modules/store/components/refinement-list'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

import ProductFilters from '../components/filters'
import PaginatedProducts from './paginated-products'

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  collections,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  collections: StoreCollection[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'

  return (
    <div
      className="content-container flex flex-col py-6 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Box className="mb-12">
          <ProductFilters collections={collections} />
        </Box>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate

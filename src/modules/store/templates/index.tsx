import { Suspense } from 'react'

import { StoreCollection } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

import ProductFilters from '../components/filters'
import ProductFiltersDrawer from '../components/filters/filter-dialog'
import RefinementList from '../components/refinement-list'
import StoreBreadcrumbs from './breadcrumbs'
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
    <Container className="!py-8">
      <Box className="mb-6 flex flex-col gap-4 small:mb-12">
        <StoreBreadcrumbs />
        <Heading as="h1" className="text-4xl text-basic-primary small:text-5xl">
          All products
        </Heading>
        {/* TODO: Fetch products count after meilisearch connection */}
        <Text className="text-md text-secondary">50 products</Text>
        <Box className="grid w-full grid-cols-2 items-center justify-between gap-2 small:flex small:flex-wrap">
          <Box className="hidden small:flex">
            <ProductFilters collections={collections} />
          </Box>
          <ProductFiltersDrawer>
            <ProductFilters collections={collections} />
          </ProductFiltersDrawer>
          <RefinementList sortBy={sortBy || 'created_at'} />
        </Box>
      </Box>
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          countryCode={countryCode}
        />
      </Suspense>
    </Container>
  )
}

export default StoreTemplate

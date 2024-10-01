import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { HttpTypes, StoreCollection } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import ProductFilters from '@modules/store/components/filters'
import ProductFiltersDrawer from '@modules/store/components/filters/filter-dialog'
import RefinementList from '@modules/store/components/refinement-list'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'
import PaginatedProducts from '@modules/store/templates/paginated-products'

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
  collections,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
  collections: StoreCollection[]
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'

  const category = categories[categories.length - 1]

  if (!category || !countryCode) notFound()

  return (
    <Container className="!py-8">
      <Box className="mb-6 flex flex-col gap-4 small:mb-12">
        <StoreBreadcrumbs category={category} />
        <Heading as="h1" className="text-4xl text-basic-primary small:text-5xl">
          {category.name}
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

import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'
import PaginatedProducts from '@modules/store/templates/paginated-products'

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
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

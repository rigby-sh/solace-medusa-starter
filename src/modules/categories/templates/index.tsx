import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { HttpTypes, StoreCollection, StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { ProductCarousel } from '@modules/products/components/product-carousel'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import ProductFilters from '@modules/store/components/filters'
import ActiveProductFilters from '@modules/store/components/filters/active-filters'
import ProductFiltersDrawer from '@modules/store/components/filters/filters-drawer'
import RefinementList from '@modules/store/components/refinement-list'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'
import PaginatedProducts from '@modules/store/templates/paginated-products'

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
  recommendedProducts,
  collections,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
  recommendedProducts: StoreProduct[]
  collections: StoreCollection[]
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'

  const category = categories[categories.length - 1]

  if (!category || !countryCode) notFound()

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs breadcrumb={category} />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
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
          <ActiveProductFilters
            countryCode={countryCode}
            currentCategory={category}
            collectionsOptions={collections}
          />
        </Box>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </Container>
      <ProductCarousel
        products={recommendedProducts}
        title="Recommended products"
      />
    </>
  )
}

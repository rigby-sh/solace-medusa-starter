import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getRegion } from '@lib/data/regions'
import { HttpTypes, StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { ProductCarousel } from '@modules/products/components/product-carousel'
import { search } from '@modules/search/actions'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import ProductFilters from '@modules/store/components/filters'
import ActiveProductFilters from '@modules/store/components/filters/active-filters'
import ProductFiltersDrawer from '@modules/store/components/filters/filters-drawer'
import RefinementList from '@modules/store/components/refinement-list'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'
import PaginatedProducts from '@modules/store/templates/paginated-products'
import { ProductFilters as ProductFiltersType } from 'types/global'

export default async function CategoryTemplate({
  sortBy,
  page,
  collection,
  type,
  material,
  price,
  filters,
  countryCode,
  categories,
  recommendedProducts,
}: {
  sortBy?: SortOptions
  page?: string
  collection?: string[]
  type?: string[]
  material?: string[]
  price?: string[]
  filters: ProductFiltersType
  countryCode: string
  categories: HttpTypes.StoreProductCategory[]
  recommendedProducts: StoreProduct[]
}) {
  const pageNumber = page ? parseInt(page) : 1
  const category = categories[categories.length - 1]
  const region = await getRegion(countryCode)

  if (!category || !region) notFound()

  const { results, count } = await search({
    currency_code: region.currency_code,
    category_id: category.id,
    order: sortBy,
    page: pageNumber,
    collection,
    type,
    material,
    price,
  })

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs breadcrumb={category.name} />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            {category.name}
          </Heading>
          <Text className="text-md text-secondary">
            {count === 1 ? `${count} product` : `${count} products`}
          </Text>
          <Box className="grid w-full grid-cols-2 items-center justify-between gap-2 small:flex small:flex-wrap">
            <Box className="hidden small:flex">
              <ProductFilters filters={filters} />
            </Box>
            <ProductFiltersDrawer>
              <ProductFilters filters={filters} />
            </ProductFiltersDrawer>
            <RefinementList sortBy={sortBy || 'created_at'} />
          </Box>
          <ActiveProductFilters
            filters={filters}
            currentCategory={category}
            countryCode={countryCode}
          />
        </Box>
        <Suspense fallback={<SkeletonProductGrid />}>
          {results && results.length > 0 ? (
            <PaginatedProducts
              products={results}
              page={pageNumber}
              total={count}
              countryCode={countryCode}
            />
          ) : (
            <p className="py-10 text-center text-lg text-secondary">
              No products.
            </p>
          )}
        </Suspense>
      </Container>
      <ProductCarousel
        products={recommendedProducts}
        regionId={region.id}
        title="Recommended products"
      />
    </>
  )
}

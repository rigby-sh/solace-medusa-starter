import { Suspense } from 'react'

import { storeSortOptions } from '@lib/constants'
import { getRegion } from '@lib/data/regions'
import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import RefinementList from '@modules/common/components/sort'
import { Text } from '@modules/common/components/text'
import { ProductCarousel } from '@modules/products/components/product-carousel'
import { search } from '@modules/search/actions'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import { ProductFilters as ProductFiltersType } from 'types/global'

import ProductFilters from '../components/filters'
import ActiveProductFilters from '../components/filters/active-filters'
import ProductFiltersDrawer from '../components/filters/filters-drawer'
import StoreBreadcrumbs from './breadcrumbs'
import PaginatedProducts from './paginated-products'

export default async function StoreTemplate({
  sortBy,
  page,
  collection,
  type,
  material,
  price,
  filters,
  countryCode,
  recommendedProducts,
}: {
  sortBy?: string
  page?: string
  collection?: string[]
  type?: string[]
  material?: string[]
  price?: string[]
  filters: ProductFiltersType
  countryCode: string
  recommendedProducts: StoreProduct[]
}) {
  const pageNumber = page ? parseInt(page) : 1
  const region = await getRegion(countryCode)

  const { results, count } = await search({
    currency_code: region.currency_code,
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
          <StoreBreadcrumbs />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            All products
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
            <RefinementList
              options={storeSortOptions}
              sortBy={sortBy || 'relevance'}
            />
          </Box>
        </Box>
        <ActiveProductFilters countryCode={countryCode} filters={filters} />
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

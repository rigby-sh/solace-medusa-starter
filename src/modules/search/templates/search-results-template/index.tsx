import React, { Suspense } from 'react'

import { storeSortOptions } from '@lib/constants'
import { getProductsList, getStoreFilters } from '@lib/data/products'
import { safeDecodeURIComponent } from '@lib/util/safe-decode-uri'
import { StoreRegion } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import RefinementList from '@modules/common/components/sort'
import { Text } from '@modules/common/components/text'
import { SearchResultsIcon } from '@modules/common/icons'
import { ProductCarousel } from '@modules/products/components/product-carousel'
import { search } from '@modules/search/actions'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import SkeletonProductsCarousel from '@modules/skeletons/templates/skeleton-products-carousel'
import ProductFilters from '@modules/store/components/filters'
import ActiveProductFilters from '@modules/store/components/filters/active-filters'
import ProductFiltersDrawer from '@modules/store/components/filters/filters-drawer'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'
import PaginatedProducts from '@modules/store/templates/paginated-products'

export const runtime = 'edge'

type SearchResultsTemplateProps = {
  query: string
  sortBy?: string
  page?: string
  collection?: string[]
  type?: string[]
  material?: string[]
  price?: string[]
  region: StoreRegion
  countryCode: string
}

export default async function SearchResultsTemplate({
  query,
  sortBy,
  page,
  collection,
  type,
  material,
  price,
  region,
  countryCode,
}: SearchResultsTemplateProps) {
  const pageNumber = page ? parseInt(page) : 1
  const filters = await getStoreFilters()

  const { results, count } = await search({
    currency_code: region.currency_code,
    query,
    order: sortBy,
    page: pageNumber,
    collection,
    type,
    material,
    price,
  })

  // TODO: Add logic in future
  const {
    response: { products: recommendedProducts },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      limit: 9,
    },
    countryCode: countryCode,
  })

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        {results && results.length > 0 ? (
          <>
            <Box className="flex flex-col gap-4">
              <StoreBreadcrumbs
                breadcrumb={`"${safeDecodeURIComponent(query)}"`}
              />
              <Heading
                as="h1"
                className="text-4xl text-basic-primary small:text-5xl"
              >
                &quot;{safeDecodeURIComponent(query)}&quot;
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
            <ActiveProductFilters
              filters={filters}
              currentQuery={query}
              countryCode={countryCode}
            />
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                products={results}
                page={pageNumber}
                total={count}
                countryCode={countryCode}
              />
            </Suspense>
          </>
        ) : (
          <Box className="flex flex-col items-center gap-6 p-0 small:pb-14 small:pt-6">
            <SearchResultsIcon />
            <Box className="flex flex-col items-center gap-2">
              <Heading as="h3" className="text-xl small:text-2xl">
                No results for &quot;{safeDecodeURIComponent(query)}&quot;
              </Heading>
              <p className="text-center text-md text-secondary">
                Please try again using a different spelling or phrase
              </p>
            </Box>
          </Box>
        )}
      </Container>
      {recommendedProducts && (
        <Suspense fallback={<SkeletonProductsCarousel />}>
          <ProductCarousel
            products={recommendedProducts}
            regionId={region.id}
            title="Recommended products"
          />
        </Suspense>
      )}
    </>
  )
}

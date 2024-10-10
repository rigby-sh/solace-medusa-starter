import React, { Suspense } from 'react'

import { getRegion } from '@lib/data/regions'
import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { SearchResultsIcon } from '@modules/common/icons'
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

type SearchResultsTemplateProps = {
  query: string
  sortBy?: SortOptions
  page?: string
  collection?: string[]
  type?: string[]
  material?: string[]
  price?: string[]
  filters: ProductFiltersType
  countryCode: string
  recommendedProducts: StoreProduct[]
}

export default async function SearchResultsTemplate({
  query,
  sortBy,
  page,
  collection,
  type,
  material,
  price,
  filters,
  countryCode,
  recommendedProducts,
}: SearchResultsTemplateProps) {
  const region = await getRegion(countryCode)
  const pageNumber = page ? parseInt(page) : 1

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

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        {results && results.length > 0 ? (
          <>
            <Box className="flex flex-col gap-4">
              <StoreBreadcrumbs breadcrumb={`"${query}"`} />
              <Heading
                as="h1"
                className="text-4xl text-basic-primary small:text-5xl"
              >
                &quot;{query}&quot;
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
                <RefinementList sortBy={sortBy || 'relevance'} />
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
                No results for {`"${query}"`}
              </Heading>
              <p className="text-center text-md text-secondary">
                Please try again using a different spelling or phrase
              </p>
            </Box>
          </Box>
        )}
      </Container>
      <ProductCarousel
        products={recommendedProducts}
        regionId={region.id}
        title="Recommended products"
      />
    </>
  )
}

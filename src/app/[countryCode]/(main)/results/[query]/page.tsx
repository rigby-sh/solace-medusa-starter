import { Metadata } from 'next'

import { getProductsList, getStoreFilters } from '@lib/data/products'
import SearchResultsTemplate from '@modules/search/templates/search-results-template'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Explore all of our products.',
}

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
    collection?: string
    type?: string
    material?: string
    price?: string
  }
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { query } = params
  const { sortBy, page, collection, type, material, price } = searchParams
  const filters = await getStoreFilters()

  // TODO: Add logic in future
  const {
    response: { products: recommendedProducts },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      limit: 9,
    },
    countryCode: params.countryCode,
  })

  return (
    <SearchResultsTemplate
      query={query}
      sortBy={sortBy}
      page={page}
      filters={filters}
      collection={collection?.split(',')}
      type={type?.split(',')}
      material={material?.split(',')}
      price={price?.split(',')}
      countryCode={params.countryCode}
      recommendedProducts={recommendedProducts}
    />
  )
}

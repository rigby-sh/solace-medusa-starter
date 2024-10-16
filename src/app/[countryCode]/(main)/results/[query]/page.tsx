import { Metadata } from 'next'

import { getRegion } from '@lib/data/regions'
import SearchResultsTemplate from '@modules/search/templates/search-results-template'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Explore all of our products.',
}

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: string
    page?: string
    collection?: string
    type?: string
    material?: string
    price?: string
  }
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { sortBy, page, collection, type, material, price } = searchParams
  const { query, countryCode } = params

  const region = await getRegion(countryCode)

  return (
    <SearchResultsTemplate
      query={query}
      sortBy={sortBy}
      page={page}
      collection={collection?.split(',')}
      type={type?.split(',')}
      material={material?.split(',')}
      price={price?.split(',')}
      region={region}
      countryCode={params.countryCode}
    />
  )
}

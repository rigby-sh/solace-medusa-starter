import { Metadata } from 'next'

import { getRegion } from '@lib/data/regions'
import { safeDecodeURIComponent } from '@lib/util/safe-decode-uri'
import SearchResultsTemplate from '@modules/search/templates/search-results-template'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Explore all of our products.',
}

type Params = {
  params: Promise<{ query: string; countryCode: string }>
  searchParams: Promise<{
    sortBy?: string
    page?: string
    collection?: string
    type?: string
    material?: string
    price?: string
  }>
}

export default async function SearchResults(props: Params) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page, collection, type, material, price } = searchParams
  const { query, countryCode } = params
  const decodedQuery = safeDecodeURIComponent(query)

  const region = await getRegion(countryCode)

  return (
    <SearchResultsTemplate
      query={decodedQuery}
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

'use server'

import { SEARCH_INDEX_NAME, searchClient } from '@lib/search-client'
import { PRODUCT_LIMIT } from 'app/[countryCode]/(main)/collections/[handle]/page'

import { getDefaultSearchFilters } from './const'

type SearchParams = {
  regionId: string
  categoryHandle?: string
  page?: number
  query?: string
}

export async function search({
  page = 1,
  regionId,
  categoryHandle,
  query,
}: SearchParams) {
  const filterQueries = [getDefaultSearchFilters(regionId)]

  if (categoryHandle) {
    filterQueries.push(`categories.handle = ${categoryHandle}`)
  }

  const { results } = await searchClient.search({
    queries: [
      {
        q: query,
        indexUid: SEARCH_INDEX_NAME,
        filter: filterQueries.join(' AND '),
        limit: PRODUCT_LIMIT,
        offset: (page - 1) * PRODUCT_LIMIT,
        sort: ['created_at:desc'],
      },
    ],
  })

  return {
    ...results[0],
    estimatedTotalHits: results[0].estimatedTotalHits ?? 0,
  }
}

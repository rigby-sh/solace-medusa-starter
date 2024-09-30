import { Metadata } from 'next'

import { getCollectionsList } from '@lib/data/collections'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import StoreTemplate from '@modules/store/templates'

export const metadata: Metadata = {
  title: 'Shop - All products',
  description: 'Explore all of our products.',
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page } = searchParams
  const collections = await getCollectionsList()

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      collections={collections.collections}
    />
  )
}

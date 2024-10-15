import { Metadata } from 'next'

import { getProductsList, getStoreFilters } from '@lib/data/products'
import StoreTemplate from '@modules/store/templates'

export const metadata: Metadata = {
  title: 'Shop - All products',
  description: 'Explore all of our products.',
}

type Params = {
  searchParams: {
    sortBy?: string
    page?: string
    collection?: string
    type?: string
    material?: string
    price?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
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
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      collection={collection?.split(',')}
      type={type?.split(',')}
      material={material?.split(',')}
      price={price?.split(',')}
      filters={filters}
      countryCode={params.countryCode}
      recommendedProducts={recommendedProducts}
    />
  )
}

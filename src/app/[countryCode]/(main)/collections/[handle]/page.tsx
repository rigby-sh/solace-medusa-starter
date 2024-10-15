import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  getCollectionByHandle,
  getCollectionsList,
} from '@lib/data/collections'
import { getProductsList, getStoreFilters } from '@lib/data/products'
import { listRegions } from '@lib/data/regions'
import { StoreCollection, StoreRegion } from '@medusajs/types'
import CollectionTemplate from '@modules/collections/templates'

type Props = {
  params: { handle: string; countryCode: string }
  searchParams: {
    sortBy?: string
    page?: string
    type?: string
    material?: string
    price?: string
  }
}

export async function generateStaticParams() {
  const { collections } = await getCollectionsList()

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | Solace Medusa Starter`,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { sortBy, page, type, material, price } = searchParams
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

  const currentCollection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!currentCollection) {
    notFound()
  }

  return (
    <CollectionTemplate
      sortBy={sortBy}
      page={page}
      filters={filters}
      type={type?.split(',')}
      material={material?.split(',')}
      price={price?.split(',')}
      recommendedProducts={recommendedProducts}
      currentCollection={currentCollection}
      countryCode={params.countryCode}
    />
  )
}

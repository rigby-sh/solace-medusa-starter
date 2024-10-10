import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCategoryByHandle, listCategories } from '@lib/data/categories'
import { getProductsList, getStoreFilters } from '@lib/data/products'
import { listRegions } from '@lib/data/regions'
import { StoreProductCategory, StoreRegion } from '@medusajs/types'
import CategoryTemplate from '@modules/categories/templates'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

type Props = {
  params: { category: string[]; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
    collection?: string
    type?: string
    material?: string
    price?: string
  }
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(params.category)

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(' | ')

    const description =
      product_categories[product_categories.length - 1].description ??
      `${title} category.`

    return {
      title: `${title} | Solace Medusa Starter`,
      description,
      alternates: {
        canonical: `${params.category.join('/')}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page, collection, type, material, price } = searchParams
  const filters = await getStoreFilters()

  const { product_categories } = await getCategoryByHandle(params.category)

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

  if (!product_categories) {
    notFound()
  }

  return (
    <CategoryTemplate
      categories={product_categories}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      filters={filters}
      collection={collection?.split(',')}
      type={type?.split(',')}
      material={material?.split(',')}
      price={price?.split(',')}
      recommendedProducts={recommendedProducts}
    />
  )
}

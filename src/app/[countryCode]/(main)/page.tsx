import { Suspense } from 'react'
import { Metadata } from 'next'

import { getCollectionsList } from '@lib/data/collections'
import {
  getCollectionsData,
  getExploreBlogData,
  getHeroBannerData,
  getMidBannerData,
} from '@lib/data/fetch'
import { getProductsList } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'
import { Banner } from '@modules/home/components/banner'
import Collections from '@modules/home/components/collections'
import { ExploreBlog } from '@modules/home/components/explore-blog'
import Hero from '@modules/home/components/hero'
import { ProductCarousel } from '@modules/products/components/product-carousel'
import SkeletonProductsCarousel from '@modules/skeletons/templates/skeleton-products-carousel'

export const metadata: Metadata = {
  title: 'Solace Medusa Starter Template',
  description:
    'A performant frontend ecommerce starter template with Next.js 14 and Medusa 2.0.',
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const [{ collections: collectionsList }, { products }] = await Promise.all([
    getCollectionsList(),
    getProductsList({
      pageParam: 0,
      queryParams: { limit: 9 },
      countryCode: countryCode,
    }).then(({ response }) => response),
  ])

  const region = await getRegion(countryCode)

  if (!products || !collectionsList || !region) {
    return null
  }

  // CMS data
  const [
    strapiCollections,
    {
      data: { HeroBanner },
    },
    {
      data: { MidBanner },
    },
    { data: posts },
  ] = await Promise.all([
    getCollectionsData(),
    getHeroBannerData(),
    getMidBannerData(),
    getExploreBlogData(),
  ])

  return (
    <>
      {HeroBanner && <Hero data={HeroBanner} />}
      {strapiCollections && (
        <Collections
          cmsCollections={strapiCollections}
          medusaCollections={collectionsList}
        />
      )}
      <Suspense fallback={<SkeletonProductsCarousel />}>
        <ProductCarousel
          products={products}
          regionId={region.id}
          title="Our bestsellers"
          viewAll={{
            link: '/shop',
            text: 'View all',
          }}
        />
      </Suspense>
      {MidBanner && <Banner data={MidBanner} />}
      {posts && posts.length > 0 && <ExploreBlog posts={posts} />}
    </>
  )
}

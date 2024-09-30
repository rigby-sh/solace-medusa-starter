import { Metadata } from 'next'

import { getCollectionsWithProducts } from '@lib/data/collections'
import { getHeroBannerData } from '@lib/data/fetch'
import { getRegion } from '@lib/data/regions'
import FeaturedProducts from '@modules/home/components/featured-products'
import Hero from '@modules/home/components/hero'

export const metadata: Metadata = {
  title: 'Medusa Next.js Starter Template',
  description:
    'A performant frontend ecommerce starter template with Next.js 14 and Medusa.',
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  const {
    data: { HeroBanner },
  } = await getHeroBannerData()

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero data={HeroBanner} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}

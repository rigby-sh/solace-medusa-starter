import { notFound } from 'next/navigation'

import { getAllBlogSlugs, getBlogPostBySlug } from '@lib/data/fetch'
import { listRegions } from '@lib/data/regions'
import { StoreRegion } from '@medusajs/types'
import BlogPostTemplate from '@modules/blog/templates/blogPostTemplate'

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()

  if (!slugs) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  return slugs.flatMap((slug) =>
    countryCodes.map((countryCode) => ({
      slug,
      countryCode,
    }))
  )
}

export async function generateMetadata({ params }) {
  const article = await getBlogPostBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.Title,
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string; countryCode: string }
}) {
  const { slug, countryCode } = params
  const article = await getBlogPostBySlug(slug)

  if (!article) {
    notFound()
  }

  return <BlogPostTemplate article={article} countryCode={countryCode} />
}

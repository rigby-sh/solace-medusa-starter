import { notFound } from 'next/navigation'

import { getBlogPostBySlug } from '@lib/data/fetch'
import BlogTemplate from '@modules/blog/templates'

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

  return <BlogTemplate article={article} countryCode={countryCode} />
}

import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { blogSortOptions } from '@lib/constants'
import { getBlogPosts } from '@lib/data/fetch'
import { getRegion } from '@lib/data/regions'
import { cn } from '@lib/util/cn'
import { StoreProduct } from '@medusajs/types'
import { BlogTile } from '@modules/blog/components/blog-tile'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { Text } from '@modules/common/components/text'
import { SearchResultsIcon } from '@modules/common/icons'
import { ProductCarousel } from '@modules/products/components/product-carousel'
import SkeletonBlogPosts from '@modules/skeletons/templates/skeleton-post-tile'
import SkeletonProductsCarousel from '@modules/skeletons/templates/skeleton-products-carousel'
import { Pagination } from '@modules/store/components/pagination'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'

import Filters from '../components/filters'
import RefinementList from '../components/refinement-list'

// TODO: For change in future
export const POSTS_LIMIT = 2

export default async function BlogTemplate({
  sortBy,
  page,
  categories,
  currentCategory,
  query,
  countryCode,
  recommendedProducts,
}: {
  sortBy?: string
  page?: string
  categories?: any
  currentCategory?: string
  query?: string
  countryCode: string
  recommendedProducts: StoreProduct[]
}) {
  const region = await getRegion(countryCode)
  if (!region) notFound()

  const orderBy = sortBy === 'asc' ? 'createdAt:asc' : 'createdAt:desc'

  const {
    data: posts,
    meta: {
      pagination: { total: count },
    },
  } = await getBlogPosts({
    sortBy: orderBy,
    query,
    category: currentCategory,
  })

  const totalPages = Math.ceil(count / POSTS_LIMIT)
  const pageNumber = page ? parseInt(page) : 1
  const offset = (pageNumber - 1) * POSTS_LIMIT

  const categoryFilters =
    categories &&
    categories.map((category) => ({
      value: category.Slug,
      label: category.Title,
    }))

  return (
    <Container className="min-h-screen max-w-full !p-0 medium:bg-secondary">
      <Container className="!py-8">
        <StoreBreadcrumbs breadcrumb="Blog" />
        <Heading as="h1" className="mt-4 text-4xl medium:text-5xl">
          Blog
        </Heading>
        <Box className="mb-8 mt-6 grid grid-cols-12 medium:mb-16 medium:mt-12">
          <Box className="col-span-12 medium:col-span-3 medium:mb-10">
            <PostCount count={count} className="block medium:hidden" />
            <Filters data={categoryFilters} countryCode={countryCode} />
            {/* Mobile view */}
            <Box className="z-30 mt-2 block medium:hidden">
              <RefinementList options={blogSortOptions} sortBy={sortBy} />
            </Box>
          </Box>
          <Box className="col-span-12 space-y-12 medium:col-span-8 medium:col-start-5">
            {/* Desktop view */}
            <Box className="hidden items-center justify-between medium:flex">
              <PostCount count={count} />
              <RefinementList options={blogSortOptions} sortBy={sortBy} />
            </Box>
            <Suspense fallback={<SkeletonBlogPosts />}>
              {posts && posts.length > 0 ? (
                <Box className="!mt-6 grid grid-cols-1 gap-2 large:grid-cols-2">
                  {posts
                    .slice(offset, pageNumber * POSTS_LIMIT)
                    .map((post, id) => {
                      return <BlogTile key={id} post={post} />
                    })}
                </Box>
              ) : (
                <NoPosts />
              )}
            </Suspense>
            {totalPages > 1 && (
              <Pagination
                page={pageNumber}
                totalPages={totalPages}
                data-testid="blog-posts-pagination"
              />
            )}
          </Box>
        </Box>
      </Container>
      <Suspense fallback={<SkeletonProductsCarousel />}>
        <ProductCarousel
          products={recommendedProducts}
          regionId={region.id}
          title="Recommended products"
        />
      </Suspense>
    </Container>
  )
}

function PostCount({
  count,
  className,
}: {
  count: number
  className?: string
}) {
  return (
    <Text className={cn('text-secondary', className)}>
      {count === 1 ? `${count} post` : `${count} posts`}
    </Text>
  )
}

function NoPosts() {
  return (
    <Box className="flex flex-col items-center gap-6 p-0 small:pb-14 small:pt-6">
      <SearchResultsIcon />
      <Box className="flex flex-col items-center gap-2">
        <Heading as="h3" className="text-xl small:text-2xl">
          No posts found
        </Heading>
        <p className="text-center text-md text-secondary">
          We couldn&apos;t find any posts matching your search
        </p>
      </Box>
    </Box>
  )
}

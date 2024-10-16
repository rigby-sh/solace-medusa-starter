import Image from 'next/image'

import BlogBreadcrumbs from '@modules/blog/components/blog-breadcrumbs'
import { BlogContent } from '@modules/blog/components/blog-content'
import { BlogInfo } from '@modules/blog/components/blog-info'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { BlogPost } from 'types/strapi'

export default async function BlogPostTemplate({
  article,
  countryCode,
}: {
  countryCode: string
  article: BlogPost
}) {
  const readTime = (content: string) => {
    const wordsPerMinute = 200
    const noOfWords = content.split(/\s/g).length
    const minutes = noOfWords / wordsPerMinute
    return Math.ceil(minutes)
  }

  return (
    <Container className="flex flex-col gap-6 !py-8 medium:gap-8">
      <Box className="flex flex-col gap-4">
        <BlogBreadcrumbs blogTitle={article.Title} countryCode={countryCode} />
        <Heading as="h1" className="text-4xl text-basic-primary small:text-5xl">
          {article.Title}
        </Heading>
      </Box>
      <Box className="grid grid-cols-12">
        <Box className="col-span-12 medium:col-span-3">
          {/* TODO: Add content menu here */}
        </Box>
        <Box className="col-span-12 medium:col-span-9">
          <Box className="relative h-[400px] w-full">
            <Image
              src={article.FeaturedImage.url}
              alt={`${article.FeaturedImage.alternativeText ? article.FeaturedImage.alternativeText : article.Title}`}
              fill
              className="w-full object-cover"
            />
          </Box>
          <BlogInfo
            createdAt={article.createdAt}
            readTime={readTime(article.Content)}
          />
          <BlogContent content={article.Content} />
        </Box>
      </Box>
    </Container>
  )
}

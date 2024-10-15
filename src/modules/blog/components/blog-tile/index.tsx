import Image from 'next/image'

import { Box } from '@modules/common/components/box'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import { BlogPost } from 'types/strapi'

export function BlogTile({ post }: { post: BlogPost }) {
  return (
    <Box className="flex min-w-40 flex-col overflow-hidden bg-secondary">
      <Box className="h-[224px] overflow-hidden large:h-[280px]">
        <LocalizedClientLink href={`/blog/${post.Slug}`}>
          <Image
            className="h-full w-full object-cover object-center"
            src={post.FeaturedImage.url}
            alt={post.FeaturedImage.alternativeText ?? 'Blog post image'}
            width={600}
            height={600}
            priority
          />
        </LocalizedClientLink>
      </Box>
      <Box className="flex flex-col gap-4 p-4 small:gap-6 small:p-5">
        <div className="flex flex-col gap-1">
          <LocalizedClientLink href={`/blog/${post.Slug}`}>
            <Heading
              as="h3"
              className="line-clamp-2 text-lg font-medium text-basic-primary"
            >
              {post.Title}
            </Heading>
          </LocalizedClientLink>
          <div className="w-full">
            <Text
              className="line-clamp-2 text-secondary"
              size="md"
              title={post.Content}
            >
              {post.Content}
            </Text>
          </div>
        </div>
      </Box>
    </Box>
  )
}

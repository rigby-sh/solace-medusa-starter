'use client'

import { BlogTile } from '@modules/blog/components/blog-tile'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import useEmblaCarousel from 'embla-carousel-react'
import { BlogPost } from 'types/strapi'

export function ExploreBlog({ posts }: { posts: BlogPost[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    loop: false,
  })

  return (
    <Container className="overflow-hidden">
      <Box className="flex flex-col gap-6 small:gap-12">
        <Box className="flex items-center justify-between">
          <Heading
            as="h2"
            className="text-2xl text-basic-primary small:text-3xl"
          >
            Get inspired
          </Heading>
          <Button className="hidden w-max large:flex" variant="tonal" asChild>
            <LocalizedClientLink href="/blog">Read more</LocalizedClientLink>
          </Button>
        </Box>
        <Box className="hidden items-center gap-2 large:grid large:grid-cols-3">
          {posts.map((post, id) => {
            return <BlogTile key={id} post={post} />
          })}
        </Box>
        <div ref={emblaRef} className="block large:hidden">
          <Box className="flex gap-2">
            {posts.map((post, id) => {
              return (
                <Box key={id} className="flex-[0_0_calc(72.666%-8px)]">
                  <BlogTile key={id} post={post} />
                </Box>
              )
            })}
          </Box>
        </div>
        <Button
          className="mx-auto flex w-max large:hidden"
          variant="tonal"
          asChild
        >
          <LocalizedClientLink href="/blog">Read more</LocalizedClientLink>
        </Button>
      </Box>
    </Container>
  )
}

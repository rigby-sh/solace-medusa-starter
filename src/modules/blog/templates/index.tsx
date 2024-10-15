import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { BlogPost } from 'types/strapi'

import BlogBreadcrumbs from '../components/blog-breadcrumbs'

export default async function BlogTemplate({
  article,
  countryCode,
}: {
  countryCode: string
  article: BlogPost
}) {
  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <BlogBreadcrumbs
            blogTitle={article.Title}
            countryCode={countryCode}
          />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            {article.Title}
          </Heading>
        </Box>
      </Container>
    </>
  )
}

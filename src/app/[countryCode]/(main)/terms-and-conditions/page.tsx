import { Metadata } from 'next'

import { getContentPage } from '@lib/data/fetch'
import { serializeMdx } from '@lib/util/serializeMdx'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import SidebarBookmarks from '@modules/content/components/sidebar-bookmarks'
import { MDXRemote } from '@modules/mdx/MDXRemote'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Review the terms governing the use of our website, products and services, including user responsibilities, legal rights, and policies.',
}

export default async function TermsAndConditionsPage() {
  const {
    data: { PageContent },
  } = await getContentPage('terms-and-condition', 'terms-and-conditions')

  const mdxSource = await serializeMdx(PageContent)

  const bookmarks = mdxSource.frontmatter.headings.map((heading) => {
    return {
      id: heading.id,
      label: heading.title,
    }
  })

  return (
    <Container className="min-h-screen max-w-full bg-secondary !p-0">
      <Container className="!py-8">
        <StoreBreadcrumbs breadcrumb="Terms & Conditions" />
        <Heading as="h1" className="mt-4 text-4xl medium:text-5xl">
          Terms & Conditions
        </Heading>
        <Box className="mt-6 grid grid-cols-12 medium:mt-12">
          <Box className="col-span-12 mb-10 medium:col-span-3 medium:mb-0">
            <SidebarBookmarks data={bookmarks} />
          </Box>
          <Box className="col-span-12 space-y-10 medium:col-span-8 medium:col-start-5">
            <MDXRemote source={mdxSource} />
          </Box>
        </Box>
      </Container>
    </Container>
  )
}

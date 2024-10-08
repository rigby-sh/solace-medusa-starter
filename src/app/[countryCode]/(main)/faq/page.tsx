import { Metadata } from 'next'

import { getFAQ } from '@lib/data/fetch'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import { FAQAccordion } from '@modules/content/components/faq-accordion'
import SidebarBookmarks from '@modules/content/components/sidebar-bookmarks'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Find quick answers to common questions about our products/services.',
}

export default async function FAQPage() {
  const {
    data: { FAQSection },
  } = await getFAQ()

  const bookmarks = FAQSection.map((section) => {
    return {
      id: section.Bookmark,
      label: section.Title,
    }
  })

  return (
    <Container className="!p min-h-screen max-w-full bg-secondary !p-0">
      <Container>
        <Heading as="h1" className="text-4xl medium:text-5xl">
          Frequently asked questions
        </Heading>
        <Box className="mt-6 grid grid-cols-12 medium:mt-12">
          <Box className="col-span-12 mb-10 medium:col-span-3 medium:mb-0">
            <SidebarBookmarks data={bookmarks} />
          </Box>

          <Box className="col-span-12 space-y-10 medium:col-span-8 medium:col-start-5">
            {FAQSection.map((section, id) => (
              <FAQAccordion key={id} data={section} />
            ))}
          </Box>
        </Box>
      </Container>
    </Container>
  )
}

import { Metadata } from 'next'

import { getFAQ } from '@lib/data/fetch'
import { Container } from '@modules/common/components/container'
import { FAQAccordion } from '@modules/content/components/faq-accordion'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Find quick answers to common questions about our products/services.',
}

export default async function FAQPage() {
  const {
    data: { FAQSection },
  } = await getFAQ()

  return (
    <Container className="!p max-w-full bg-secondary !p-0">
      <Container className="flex flex-col gap-10">
        {FAQSection.map((section, id) => (
          <FAQAccordion key={id} data={section} />
        ))}
      </Container>
    </Container>
  )
}
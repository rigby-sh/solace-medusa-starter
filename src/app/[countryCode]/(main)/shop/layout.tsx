import { Metadata } from 'next'

import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'

interface StorePageLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Shop - All products',
  description: 'Explore all of our products.',
}

export default function StorePageLayout({ children }: StorePageLayoutProps) {
  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            All products
          </Heading>
        </Box>
      </Container>
      {children}
    </>
  )
}

import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

import ProductTile from '../product-tile'
import CarouselWrapper from './carousel-wrapper'

interface ViewAllProps {
  link: string
  text?: string
}

interface ProductCarouselProps {
  products: StoreProduct[]
  regionId: string
  title: string
  viewAll?: ViewAllProps
}

export function ProductCarousel({
  products,
  regionId,
  title,
  viewAll,
}: ProductCarouselProps) {
  return (
    <Container className="overflow-hidden">
      <Box className="flex flex-col gap-6 small:gap-12">
        <CarouselWrapper title={title} productsCount={products.length}>
          <Box className="flex gap-2">
            {products.map((item, index) => (
              <Box
                className="flex-[0_0_calc(72.666%-8px)] small:flex-[0_0_calc(62.666%-8px)] medium:flex-[0_0_calc(42.666%-8px)] xl:flex-[0_0_calc(33.333%-8px)] 2xl:flex-[0_0_calc(30.333%-8px)]"
                key={index}
              >
                <ProductTile product={item} regionId={regionId} />
              </Box>
            ))}
          </Box>
        </CarouselWrapper>
        {viewAll && (
          <LocalizedClientLink
            href={viewAll.link}
            className="bg-action-primary text-fg-on-action-primary hover:bg-action-primary-hover mx-auto w-max rounded px-4 py-2"
          >
            {viewAll.text || 'View all'}
          </LocalizedClientLink>
        )}
      </Box>
    </Container>
  )
}

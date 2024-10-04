'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@lib/util/cn'
import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ArrowLeftIcon, ArrowRightIcon } from '@modules/common/icons'
import ProductTile from '@modules/products/components/product-tile'
import useEmblaCarousel from 'embla-carousel-react'

interface ViewAllProps {
  link: string
  text?: string
}

interface ProductCarouselProps {
  products: StoreProduct[]
  title: string
  viewAll?: ViewAllProps
}

export function ProductCarousel({
  products,
  title,
  viewAll,
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    loop: false,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const isLessThanFourProducts = products.length < 4
  const isLessThanThreeProducts = products.length < 3
  const isLessThanTwoProducts = products.length < 2

  return (
    <Container className="overflow-hidden">
      <Box className="flex flex-col gap-6 small:gap-12">
        <Box className="flex justify-between">
          <Heading
            as="h2"
            className="text-2xl text-basic-primary small:text-3xl"
          >
            {title}
          </Heading>
          <Box
            className={cn('hidden gap-2 small:flex', {
              'xl:hidden': isLessThanFourProducts,
              'medium:hidden': isLessThanThreeProducts,
              'small:hidden': isLessThanTwoProducts,
            })}
          >
            <Button
              withIcon
              variant="icon"
              className="bg-fg-secondary text-action-primary hover:bg-fg-secondary-hover hover:text-action-primary-hover active:bg-fg-secondary-pressed active:text-action-primary-pressed"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              withIcon
              variant="icon"
              className="bg-fg-secondary text-action-primary hover:bg-fg-secondary-hover hover:text-action-primary-hover active:bg-fg-secondary-pressed active:text-action-primary-pressed"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ArrowRightIcon />
            </Button>
          </Box>
        </Box>
        <div ref={emblaRef}>
          <Box className="flex gap-2">
            {products.map((item, index) => (
              <Box
                className="flex-[0_0_calc(72.666%-8px)] small:flex-[0_0_calc(62.666%-8px)] medium:flex-[0_0_calc(42.666%-8px)] xl:flex-[0_0_calc(33.333%-8px)] 2xl:flex-[0_0_calc(30.333%-8px)]"
                key={index}
              >
                <ProductTile product={item} />
              </Box>
            ))}
          </Box>
        </div>
        {viewAll && (
          <Button className="mx-auto w-max" asChild>
            <LocalizedClientLink href={viewAll.link}>
              {viewAll.text || 'View all'}
            </LocalizedClientLink>
          </Button>
        )}
      </Box>
    </Container>
  )
}

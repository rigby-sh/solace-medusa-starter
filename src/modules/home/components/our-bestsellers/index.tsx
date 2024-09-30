'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ArrowLeftIcon } from '@modules/common/icons/arrow-left'
import { ArrowRightIcon } from '@modules/common/icons/arrow-right'
import ProductTile from '@modules/products/components/product-tile'
import useEmblaCarousel from 'embla-carousel-react'

export function OurBestsellers({ products }: { products: StoreProduct[] }) {
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

  return (
    <Container className="overflow-hidden">
      <Box className="flex flex-col gap-6 small:gap-12">
        <Box className="flex justify-between">
          <Heading
            as="h2"
            className="text-basic-primary text-2xl small:text-3xl"
          >
            Our bestsellers
          </Heading>
          <Box className="hidden gap-2 small:flex">
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
            {products.map((item, index) => {
              return (
                <Box
                  className="flex-[0_0_calc(72.666%-8px)] small:flex-[0_0_calc(62.666%-8px)] xl:flex-[0_0_calc(33.333%-8px)] medium:flex-[0_0_calc(42.666%-8px)] 2xl:flex-[0_0_calc(30.333%-8px)]"
                  key={index}
                >
                  <ProductTile product={item} />
                </Box>
              )
            })}
          </Box>
        </div>
        <Button className="mx-auto w-max" asChild>
          <LocalizedClientLink href="/shop">View all</LocalizedClientLink>
        </Button>
      </Box>
    </Container>
  )
}

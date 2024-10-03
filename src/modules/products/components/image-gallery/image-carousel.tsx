'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import useEmblaCarousel from 'embla-carousel-react'

type ImageCarouselProps = {
  images: { id: string; url: string }[]
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress())) * 100

    setScrollProgress(progress)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onScroll()
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)

    return () => {
      emblaApi.off('scroll', onScroll)
      emblaApi.off('reInit', onScroll)
    }
  }, [emblaApi, onScroll])

  const slideWidth = 100 / images.length
  const isOnlyOneImage = images.length === 1

  return (
    <>
      <div
        className="overflow-hidden medium:hidden"
        ref={isOnlyOneImage ? null : emblaRef}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div
              className="relative aspect-[29/34] max-h-[400px] w-full shrink-0"
              key={image.id}
            >
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                priority={index <= 2}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 780px"
              />
            </div>
          ))}
        </div>
      </div>

      {!isOnlyOneImage && (
        <div className="absolute bottom-4 left-4 right-4 h-1 bg-primary/30 medium:hidden">
          <div
            className="absolute h-full bg-primary transition-all duration-200 ease-out"
            style={{
              width: `${slideWidth}%`,
              left: `${scrollProgress * (1 - 1 / images.length)}%`,
            }}
          />
        </div>
      )}
    </>
  )
}

export default ImageCarousel

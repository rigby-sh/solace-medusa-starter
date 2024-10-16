'use client'

import { useState } from 'react'

import { cn } from '@lib/util/cn'
import { HttpTypes } from '@medusajs/types'
import { Button } from '@modules/common/components/button'

import { LoadingImage } from '../product-tile/loading-image'
import { MAX_INITIAL_IMAGES } from './consts'
import { GalleryDialog } from './gallery-dialog'
import ImageCarousel from './image-carousel'

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  title: string
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [additionalImages, setAdditionalImages] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (index) => {
    setSelectedImage(index)
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="hidden grid-cols-2 gap-1 medium:grid">
        {images
          .slice(0, MAX_INITIAL_IMAGES + additionalImages)
          .map((image, index) => (
            <div
              className={cn(
                'relative w-full shrink-0',
                index === 0
                  ? 'col-span-2 aspect-[29/20] max-h-[540px]'
                  : 'col-span-1 aspect-[29/34] max-h-[440px]'
              )}
              key={image.id}
            >
              <LoadingImage
                src={image.url}
                alt={`${title} - product image`}
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 780px"
                className="cursor-pointer object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
      </div>
      {additionalImages + MAX_INITIAL_IMAGES < images.length && (
        <Button
          className="mx-auto hidden w-fit outline-none medium:flex"
          variant="tonal"
          size="sm"
          onClick={() => {
            additionalImages + MAX_INITIAL_IMAGES < images.length &&
              setAdditionalImages((prev) => prev + 2)
          }}
        >
          See more images
        </Button>
      )}
      <GalleryDialog
        activeImg={selectedImage}
        onChange={setSelectedImage}
        images={images}
        title={title}
      />
      <ImageCarousel images={images} openDialog={setSelectedImage} />
    </div>
  )
}

export default ImageGallery
